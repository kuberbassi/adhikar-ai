const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const analyzeRoute = require('./routes/analyze');
const draftRoute = require('./routes/draft');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Routes
app.use('/api/analyze', analyzeRoute);
app.use('/api/draft', draftRoute);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Adhikar.ai API',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.send('Adhikar.ai API is running...');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`✅ Adhikar.ai server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
