const Groq = require('groq-sdk');

// Initialize Groq client — only if API key is available
let groq = null;
if (process.env.GROQ_API_KEY) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    console.log('✅ Groq AI initialized (Llama 3.3 70B)');
} else {
    console.log('⚠️  GROQ_API_KEY not set — using keyword fallback');
}

const MODEL = 'llama-3.3-70b-versatile';

/**
 * Analyze a legal case using AI
 * Returns structured JSON with violation, act, section, severity, etc.
 */
async function analyzeCase(details) {
    if (!groq) return null; // fallback to keywords

    try {
        const completion = await groq.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: 'system',
                    content: `You are an expert Indian legal AI assistant. Analyze the user's complaint and identify the most relevant Indian law that has been violated.

You MUST respond with ONLY a valid JSON object (no markdown, no code blocks, no extra text) in this exact format:
{
  "violation": "Name of the violation (e.g., Unfair Trade Practice / Defective Product)",
  "act": "Full name of the Indian Act (e.g., Consumer Protection Act, 2019)",
  "section": "Relevant section (e.g., Section 35)",
  "confidence": 0.95,
  "severity": "low|medium|high|critical",
  "summary": "2-3 sentence explanation of the legal violation and what it means for the complainant",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4"]
}

Key Indian laws to consider:
- Consumer Protection Act, 2019 (defective products, unfair trade, refunds, service deficiency)
- Indian Penal Code, 1860 (fraud §420, cheating §415, criminal breach of trust §406)
- Rent Control Act (landlord-tenant disputes, security deposits, eviction)
- Industrial Disputes Act, 1947 (wrongful termination §25-F, unpaid wages)
- Information Technology Act, 2000 (cyber fraud §66C, data theft §43)
- Right to Information Act, 2005 (government transparency)
- Motor Vehicles Act, 1988 (road accidents, insurance claims)
- Indian Contract Act, 1872 (breach of contract §73)

Always set confidence between 0.80 and 0.99. Be specific about sections.`
                },
                {
                    role: 'user',
                    content: `Analyze this legal complaint and identify the violation:\n\n${details}`
                }
            ],
            temperature: 0.3,
            max_tokens: 800,
        });

        const text = completion.choices[0]?.message?.content?.trim();
        if (!text) return null;

        // Parse JSON — handle potential markdown code blocks
        let jsonStr = text;
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
        }

        const result = JSON.parse(jsonStr);

        // Validate required fields
        if (result.violation && result.act && result.section) {
            return result;
        }
        return null;
    } catch (err) {
        console.error('AI Analysis error:', err.message);
        return null;
    }
}

/**
 * Generate a legal notice draft using AI
 */
async function generateDraft(userDetails, analysis, caseDetails) {
    if (!groq) return null; // fallback to template

    try {
        const completion = await groq.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: 'system',
                    content: `You are an expert Indian legal notice drafter. Generate a formal, professionally worded legal notice in English.

The notice must follow this structure:
1. Reference number (use format ADH/2026/XXXX where XXXX is random 4 digits)
2. Date
3. TO: Opponent details
4. FROM: Complainant details
5. SUBJECT line citing the relevant act
6. BODY with sections:
   - Background/Facts
   - Grievance
   - Legal Basis (cite specific act and section)
   - Demand (what the complainant wants)
   - Consequence of Non-Compliance (mention 15-day deadline, legal action, damages)
7. Signature block
8. CC: Relevant authorities

Use formal legal language. Be specific. Reference actual Indian law sections.
Do NOT use markdown formatting — output plain text only.
Use Unicode borders like ═══ and ─── for visual separation.`
                },
                {
                    role: 'user',
                    content: `Generate a legal notice with these details:

COMPLAINANT:
Name: ${userDetails.fullName || '[Name]'}
Address: ${userDetails.address || '[Address]'}
Phone: ${userDetails.phone || ''}
Email: ${userDetails.email || ''}

OPPONENT:
Name: ${userDetails.opponentName || '[Opponent]'}
Address: ${userDetails.opponentAddress || '[Address]'}

VIOLATION: ${analysis.violation}
ACT: ${analysis.act}
SECTION: ${analysis.section}

SERVICE/PRODUCT: ${userDetails.serviceDetails || 'Not specified'}
DATE OF INCIDENT: ${userDetails.dateOfEvent || 'Not specified'}
RESOLUTION SOUGHT: ${userDetails.resolutionRequested || 'Appropriate compensation and resolution'}

COMPLAINT DETAILS: ${caseDetails || 'As per the analysis above'}`
                }
            ],
            temperature: 0.4,
            max_tokens: 2000,
        });

        return completion.choices[0]?.message?.content?.trim() || null;
    } catch (err) {
        console.error('AI Draft error:', err.message);
        return null;
    }
}

module.exports = { analyzeCase, generateDraft };
