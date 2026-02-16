// ─── Server-side seed data loader ───
// Reads the client-side legalDatabase.js (ES module) and parses it for CommonJS use

const fs = require('fs');
const path = require('path');

function loadSeedData() {
    try {
        const filePath = path.join(__dirname, '..', '..', 'client', 'src', 'data', 'legalDatabase.js');
        let content = fs.readFileSync(filePath, 'utf-8');

        // Extract the array content between "const legalDatabase = [" and "];"
        const startMatch = content.indexOf('const legalDatabase = [');
        if (startMatch === -1) return [];

        const arrayStart = content.indexOf('[', startMatch);
        // Find the matching closing bracket
        let depth = 0;
        let arrayEnd = -1;
        for (let i = arrayStart; i < content.length; i++) {
            if (content[i] === '[') depth++;
            if (content[i] === ']') {
                depth--;
                if (depth === 0) {
                    arrayEnd = i;
                    break;
                }
            }
        }

        if (arrayEnd === -1) return [];

        const arrayStr = content.substring(arrayStart, arrayEnd + 1);
        // Use eval in a controlled way (this is server-side internal file only)
        const data = eval(arrayStr);
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error('Failed to load seed data:', err.message);
        return [];
    }
}

module.exports = { loadSeedData };
