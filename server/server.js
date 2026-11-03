const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { rateLimit, ipKeyGenerator } = require('express-rate-limit');
// Prefer developer-specific secrets pulled into .env.local, then fill any
// missing local defaults from .env. Both files are ignored by Git.
require('dotenv').config({ path: ['.env.local', '.env'] });

const analyzeRoute = require('./routes/analyze');
const draftRoute = require('./routes/draft');
const ipAdvisorRoute = require('./routes/ipAdvisor');
const { checkConnection, logActivity, getCaseRecord, getLegalDatabase, setLegalDatabase, initError } = require('./services/firebase');
const { loadSeedData } = require('./services/seedData');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable 'trust proxy' for Vercel/Load Balancers
app.set('trust proxy', 1);

// ─── Security Middleware ───
if (process.env.NODE_ENV === 'development') {
    app.use(helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false
    }));
} else {
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Needed for some PDF libs
                connectSrc: ["'self'", "https://*.firebaseio.com", "https://*.googleapis.com"],
                imgSrc: ["'self'", "data:", "https:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
        crossOriginEmbedderPolicy: false
    }));
}

// ─── CORS ───
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:3000', 'http://adhikar.ai.kuberbassi.com', 'https://adhikar.ai.kuberbassi.com'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        // Allow all origins in production for now (temporary fix)
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true
}));

// ─── Rate Limiting ───
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                  // 100 requests per window per IP
    message: {
        error: 'Too many requests',
        message: 'Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Use a consistent key even when behind proxies (Vercel). Prefer X-Forwarded-For.
    keyGenerator: (req /*, res*/) => {
        const fwd = req.headers['x-forwarded-for'] || req.headers['forwarded'];
        const ip = fwd
            ? String(fwd).split(',')[0].trim()
            : req.ip || req.socket.remoteAddress;
        return ip ? ipKeyGenerator(ip) : 'unknown';
    },
});
app.use('/api/', apiLimiter);

// ─── Body Parsing ───
app.use(bodyParser.json({ limit: '10mb' }));

// ─── Input Sanitization Middleware ───
app.use((req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        const sanitize = (obj) => {
            for (const key in obj) {
                if (typeof obj[key] === 'string') {
                    obj[key] = obj[key]
                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                        .replace(/<[^>]*>/g, '');
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    sanitize(obj[key]);
                }
            }
        };
        sanitize(req.body);
    }
    next();
});

// ─── Request Logging Middleware ───
app.use('/api/', (req, res, next) => {
    const start = Date.now();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            path: req.originalUrl,
            ip: ip,
            statusCode: res.statusCode,
            responseTimeMs: duration,
            userAgent: req.headers['user-agent'] || 'unknown'
        };
        // Fire-and-forget log
        logActivity('api_request', logData).catch(() => { });
        console.log(`📡 ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
    });

    // Set request timeout (60 seconds)
    req.setTimeout(60000, () => {
        res.status(408).json({ error: 'Request timeout', message: 'The request took too long to process.' });
    });

    next();
});

// ─── Routes ───
app.use('/api/analyze', analyzeRoute);
app.use('/api/draft', draftRoute);
app.use('/api/ip-advisor', ipAdvisorRoute);

// ─── Audit Trail Endpoint ───
app.get('/api/audit/:caseId', async (req, res) => {
    try {
        const { caseId } = req.params;
        if (!caseId || caseId.length < 8) {
            return res.status(400).json({ error: 'Invalid case ID' });
        }
        const record = await getCaseRecord(caseId);
        if (!record) {
            return res.status(404).json({ error: 'Case not found' });
        }
        res.json(record);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve case record' });
    }
});

// ─── Legal Database API ───
// GET: Fetch laws from Firebase, fallback to seed file
app.get('/api/laws', async (req, res) => {
    try {
        const dbLaws = await getLegalDatabase();
        if (dbLaws && Array.isArray(dbLaws) && dbLaws.length > 0) {
            return res.json({ source: 'firebase', data: dbLaws, count: dbLaws.length });
        }
        // Fallback: return seed data from client file
        const laws = loadSeedData();
        return res.json({ source: 'seed', data: laws, count: laws.length });
    } catch (err) {
        console.error('Failed to fetch laws:', err.message);
        res.status(500).json({ error: 'Failed to fetch legal database' });
    }
});

// POST: Seed Firebase with the hardcoded legal database
app.post('/api/laws/seed', async (req, res) => {
    try {
        const seedToken = process.env.LAWS_SEED_TOKEN;
        const providedToken = req.get('authorization')?.replace(/^Bearer\s+/i, '');
        const tokensMatch = seedToken && providedToken &&
            seedToken.length === providedToken.length &&
            crypto.timingSafeEqual(Buffer.from(seedToken), Buffer.from(providedToken));

        if (!tokensMatch) {
            return res.status(seedToken ? 401 : 503).json({
                error: seedToken ? 'Unauthorized' : 'Legal database seeding is not configured'
            });
        }

        const laws = loadSeedData();
        if (!Array.isArray(laws) || laws.length === 0) {
            return res.status(400).json({ error: 'No seed data found' });
        }
        const success = await setLegalDatabase(laws);
        if (success) {
            const totalSections = laws.reduce((sum, act) => sum + (act.sections?.length || 0), 0);
            await logActivity('legal_database_seeded', { acts: laws.length, sections: totalSections });
            return res.json({ success: true, acts: laws.length, sections: totalSections });
        }
        res.status(500).json({ error: 'Firebase write failed. Check Firebase configuration.' });
    } catch (err) {
        console.error('Seed failed:', err.message);
        res.status(500).json({ error: 'Failed to seed legal database' });
    }
});


// ─── Health Check ───
app.get('/api/health', async (req, res) => {
    const dbConnected = await checkConnection();
    res.json({
        status: dbConnected ? 'ok' : 'error',
        service: 'Adhikar.ai API',
        timestamp: new Date().toISOString(),
        database: dbConnected ? 'connected' : 'disconnected',
        initError: initError || null, // Show why it failed
        uptime: Math.floor(process.uptime()) + 's'
    });
});

app.get('/', (req, res) => {
    res.send('Adhikar.ai API is running...');
});

// ─── Global Error Handler ───
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    logActivity('server_error', {
        message: err.message,
        path: req.originalUrl,
        method: req.method
    }).catch(() => { });
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// ─── Graceful Shutdown ───
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err.message);
    logActivity('uncaught_exception', { message: err.message }).catch(() => { });
});

process.on('unhandledRejection', (reason) => {
    console.error('❌ Unhandled Rejection:', reason);
    logActivity('unhandled_rejection', { message: String(reason) }).catch(() => { });
});

process.on('SIGTERM', () => {
    console.log('🔄 SIGTERM received — shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🔄 SIGINT received — shutting down gracefully...');
    process.exit(0);
});

// ─── Start Server ───
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`✅ Adhikar.ai server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
