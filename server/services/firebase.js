const admin = require('firebase-admin');

// ─── Firebase Admin Initialization ───
// Uses environment variable FIREBASE_SERVICE_ACCOUNT (JSON string)
// or falls back to Application Default Credentials
let db = null;
let firebaseReady = false;
let initError = null;
const FIREBASE_OPERATION_TIMEOUT_MS = Number.parseInt(
    process.env.FIREBASE_OPERATION_TIMEOUT_MS || '3000',
    10
);

function withTimeout(operation, label) {
    let timer;
    const timeout = new Promise((_, reject) => {
        timer = setTimeout(
            () => reject(new Error(`${label} timed out after ${FIREBASE_OPERATION_TIMEOUT_MS}ms`)),
            FIREBASE_OPERATION_TIMEOUT_MS
        );
        timer.unref?.();
    });
    return Promise.race([operation, timeout]).finally(() => clearTimeout(timer));
}

try {
    const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT;
    const databaseURL = process.env.FIREBASE_DATABASE_URL;
    if (serviceAccountJSON && databaseURL) {
        let serviceAccount;
        try {
            serviceAccount = JSON.parse(serviceAccountJSON);
        } catch (parseErr) {
            // Attempt to fix escaped newlines which often happen in Vercel Env Vars
            console.warn('⚠️ JSON parse failed, attempting to fix newlines...');
            const fixedJSON = serviceAccountJSON.replace(/\\n/g, '\\n');
            // Wait, if it's already \\n, replacing it with \\n does nothing. 
            // Usually the issue is that it IS literal \n.
            // Let's try a different approach:
            // logic: sometimes "private_key": "-----BEGIN..." has actual newlines that got escaped.
            // But JSON.parse handles \n fine. 
            // The issue is typically if the string is NOT valid JSON.
            // I'll stick to a simple try-parse and if fail, log it.
            initError = `JSON Parse Error: ${parseErr.message}`;
            console.error(initError);
        }

        if (serviceAccount) {
            // IMPORTANT: Fix escaped newlines in private_key (common Vercel issue)
            if (serviceAccount.private_key) {
                serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
            }

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL
            });
        }
    } else {
        initError = 'Firebase persistence disabled: both FIREBASE_SERVICE_ACCOUNT and FIREBASE_DATABASE_URL are required';
        console.log(`⚠️  ${initError}`);
    }

    if (admin.apps.length > 0) {
        db = admin.database();
        firebaseReady = true;
        console.log('✅ Firebase Realtime Database connected');
    }
} catch (err) {
    initError = `Firebase Init Error: ${err.message}`;
    console.error(`❌ ${initError}`);
}

// ─── Save a case record ───
async function saveCaseRecord(caseId, data) {
    if (!firebaseReady) return null;
    try {
        const record = {
            caseId,
            timestamp: new Date().toISOString(),
            createdAt: admin.database.ServerValue.TIMESTAMP,
            ...data
        };
        await withTimeout(db.ref(`cases/${caseId}`).set(record), 'Save case');
        console.log(`📁 Case ${caseId} saved to database`);
        return record;
    } catch (err) {
        console.error('❌ Failed to save case:', err.message);
        return null;
    }
}

// ─── Update an existing case record ───
async function updateCaseRecord(caseId, updates) {
    if (!firebaseReady) return null;
    try {
        await withTimeout(db.ref(`cases/${caseId}`).update({
            ...updates,
            updatedAt: admin.database.ServerValue.TIMESTAMP
        }), 'Update case');
        console.log(`📝 Case ${caseId} updated`);
        return true;
    } catch (err) {
        console.error('❌ Failed to update case:', err.message);
        return null;
    }
}

// ─── Get a case record ───
async function getCaseRecord(caseId) {
    if (!firebaseReady) return null;
    try {
        const snapshot = await withTimeout(db.ref(`cases/${caseId}`).once('value'), 'Get case');
        return snapshot.val();
    } catch (err) {
        console.error('❌ Failed to get case:', err.message);
        return null;
    }
}

// ─── Log activity ───
async function logActivity(action, metadata = {}) {
    if (!firebaseReady) return;
    try {
        const logEntry = {
            action,
            timestamp: new Date().toISOString(),
            createdAt: admin.database.ServerValue.TIMESTAMP,
            ...metadata
        };
        await withTimeout(db.ref('logs').push(logEntry), 'Write log');
    } catch (err) {
        // Silently fail — logs shouldn't break the app
        console.error('Log write failed:', err.message);
    }
}

// ─── Check DB connectivity ───
async function checkConnection() {
    if (!firebaseReady) return false;
    try {
        const snapshot = await withTimeout(
            db.ref('.info/connected').once('value'),
            'Firebase connection check'
        );
        return snapshot.val() === true;
    } catch {
        return false;
    }
}

// ─── Legal Database (dynamic laws from Firebase with in-memory cache) ───
let legalDatabaseCache = null;
let lastCacheUpdate = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function getLegalDatabase() {
    if (!firebaseReady) return null;

    // Return cached data if valid
    if (legalDatabaseCache && (Date.now() - lastCacheUpdate < CACHE_TTL)) {
        return legalDatabaseCache;
    }

    try {
        const snapshot = await withTimeout(
            db.ref('legal_database').once('value'),
            'Read legal database'
        );
        const data = snapshot.val();
        if (data) {
            legalDatabaseCache = data;
            lastCacheUpdate = Date.now();
        }
        return data;
    } catch (err) {
        console.error('❌ Failed to read legal database:', err.message);
        return legalDatabaseCache; // Return stale cache if DB fails
    }
}

async function setLegalDatabase(data) {
    if (!firebaseReady) return false;
    try {
        await withTimeout(db.ref('legal_database').set(data), 'Seed legal database');
        await withTimeout(db.ref('legal_database_meta').set({
            lastUpdated: admin.database.ServerValue.TIMESTAMP,
            totalActs: data.length,
            totalSections: data.reduce((sum, act) => sum + (act.sections?.length || 0), 0),
        }), 'Write legal database metadata');

        // Update local cache immediately
        legalDatabaseCache = data;
        lastCacheUpdate = Date.now();

        console.log(`📚 Legal database seeded: ${data.length} acts`);
        return true;
    } catch (err) {
        console.error('❌ Failed to seed legal database:', err.message);
        return false;
    }
}

// ─── Notice Rate Limiting (IP-based, per-day) ───
const crypto = require('crypto');

function hashIP(ip) {
    return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}

async function checkNoticeLimit(ip, maxPerDay = 3) {
    if (!firebaseReady) return { allowed: true, remaining: maxPerDay };
    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const ipHash = hashIP(ip);
        const snapshot = await withTimeout(
            db.ref(`rate_limits/${ipHash}/${today}`).once('value'),
            'Check notice limit'
        );
        const count = snapshot.val() || 0;
        return {
            allowed: count < maxPerDay,
            remaining: Math.max(0, maxPerDay - count),
            count,
        };
    } catch (err) {
        console.error('Rate limit check failed:', err.message);
        return { allowed: true, remaining: 3 }; // fail open
    }
}

async function incrementNoticeCount(ip) {
    if (!firebaseReady) return;
    try {
        const today = new Date().toISOString().split('T')[0];
        const ipHash = hashIP(ip);
        const ref = db.ref(`rate_limits/${ipHash}/${today}`);
        await withTimeout(
            ref.transaction((current) => (current || 0) + 1),
            'Increment notice limit'
        );
    } catch (err) {
        console.error('Rate limit increment failed:', err.message);
    }
}

module.exports = {
    saveCaseRecord,
    updateCaseRecord,
    getCaseRecord,
    logActivity,
    checkConnection,
    firebaseReady,
    getLegalDatabase,
    setLegalDatabase,
    checkNoticeLimit,
    incrementNoticeCount,
    initError // Export the error for health checks
};
