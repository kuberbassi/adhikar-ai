const path = require('path');
try {
    console.log('Requiring analyze.js...');
    const mod = require('./routes/analyze.js');
    console.log('Successfully loaded analyze.js');
} catch (err) {
    console.log('--- ERROR START ---');
    console.log('NAME:', err.name);
    console.log('MESSAGE:', err.message);
    console.log('STACK:', err.stack);
    console.log('--- ERROR END ---');
}
