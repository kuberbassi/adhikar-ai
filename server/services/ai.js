const Groq = require('groq-sdk');

// Initialize Groq client
let groq = null;
if (process.env.GROQ_API_KEY) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    console.log('✅ Groq AI initialized (Llama 3.3 70B)');
} else {
    console.log('⚠️  GROQ_API_KEY not set — using keyword fallback');
}

const MODEL = 'llama-3.3-70b-versatile';

// ─── Known Legal Acts Database ───
// The AI is strictly limited to referencing ONLY these acts
const KNOWN_ACTS = [
    // Constitutional & Fundamental Rights
    "Constitution of India, 1950",
    "Right to Information Act, 2005",
    // Criminal Law
    "Indian Penal Code, 1860",
    "Bharatiya Nyaya Sanhita, 2023",
    "Code of Criminal Procedure, 1973",
    "Indian Evidence Act, 1872",
    "Arms Act, 1959",
    "NDPS Act, 1985",
    // Consumer & Financial
    "Consumer Protection Act, 2019",
    "Negotiable Instruments Act, 1881",
    "Prevention of Money Laundering Act, 2002",
    "Insolvency and Bankruptcy Code, 2016",
    // Civil & Contract
    "Indian Contract Act, 1872",
    "Specific Relief Act, 1963",
    "Limitation Act, 1963",
    "Code of Civil Procedure, 1908",
    "Indian Stamp Act, 1899",
    // Property
    "Transfer of Property Act, 1882",
    "Registration Act, 1908",
    "Real Estate (Regulation and Development) Act, 2016",
    "Rent Control Act",
    "Right to Fair Compensation and Transparency in Land Acquisition Act, 2013",
    // Family
    "Hindu Marriage Act, 1955",
    "Hindu Succession Act, 1956",
    "Protection of Women from Domestic Violence Act, 2005",
    "Dowry Prohibition Act, 1961",
    "Guardians and Wards Act, 1890",
    "Indian Succession Act, 1925",
    "Maintenance and Welfare of Parents and Senior Citizens Act, 2007",
    // Labour
    "Industrial Disputes Act, 1947",
    "Payment of Wages Act, 1936",
    "Payment of Gratuity Act, 1972",
    "Employees' Provident Funds Act, 1952",
    "Sexual Harassment of Women at Workplace Act, 2013",
    "Minimum Wages Act, 1948",
    // Cyber
    "Information Technology Act, 2000",
    // Women & Children
    "Protection of Children from Sexual Offences Act, 2012",
    "Juvenile Justice Act, 2015",
    // Social Justice
    "Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989",
    "Rights of Persons with Disabilities Act, 2016",
    // Environmental
    "Environment Protection Act, 1986",
    "National Green Tribunal Act, 2010",
    "Water (Prevention and Control of Pollution) Act, 1974",
    // Dispute Resolution
    "Arbitration and Conciliation Act, 1996",
    "Legal Services Authorities Act, 1987",
    // Transport
    "Motor Vehicles Act, 1988",
    // Corporate
    "Companies Act, 2013",
    "Competition Act, 2002",
    // Food & Public Health
    "Food Safety and Standards Act, 2006",
    // Anti-Corruption
    "Prevention of Corruption Act, 1988",
];

const ACTS_LIST = KNOWN_ACTS.map((a, i) => `${i + 1}. ${a}`).join('\n');

/**
 * Analyze a legal case using AI
 */
async function analyzeCase(details, evidence = null) {
    if (!groq) return null;

    try {
        const completion = await groq.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: 'system',
                    content: `You are an expert Indian legal AI assistant. Your task is to analyze a user's complaint and identify the most relevant Indian law that has been violated.

CRITICAL RULES — YOU MUST FOLLOW THESE STRICTLY:
1. You MUST respond with ONLY a valid JSON object. No markdown, no code blocks, no extra text.
2. You may ONLY reference acts from this EXACT list — do NOT invent, fabricate, or hallucinate any act or section:
${ACTS_LIST}

3. For each act, ONLY cite sections that you are CONFIDENT actually exist. If you are unsure about a specific section number, use "Relevant Section" instead.
4. Set confidence between 0.80 and 0.97. NEVER set confidence above 0.97.
5. If you are not confident about the applicable law, set confidence to 0.75 and recommend professional consultation.
6. Do NOT provide legal advice. You are a DRAFTING TOOL, not a lawyer.

Response format (STRICT JSON):
{
  "violation": "Name of violation (e.g., Unfair Trade Practice)",
  "act": "Full name of the Indian Act from the list above",
  "section": "Relevant section (e.g., Section 35)",
  "confidence": 0.92,
  "severity": "low|medium|high|critical",
  "summary": "2-3 sentence factual explanation of the legal violation",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4"]
}`
                },
                {
                    role: 'user',
                    content: `Analyze this legal complaint and identify the violation:\n\n${details}\n\n${evidence ? `EVIDENCE PROVIDED: The user has attached a file named "${evidence.name}" (Type: ${evidence.type}). Consider this evidence as supporting the complaint.` : ''}`
                }
            ],
            temperature: 0.1,
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

        // ─── Post-Response Validation ───
        if (!result.violation || !result.act || !result.section) {
            console.warn('⚠️  AI response missing required fields');
            return null;
        }

        // Validate that the act is in our known database
        const actIsKnown = KNOWN_ACTS.some(known =>
            result.act.toLowerCase().includes(known.toLowerCase()) ||
            known.toLowerCase().includes(result.act.toLowerCase())
        );

        if (!actIsKnown) {
            console.warn(`⚠️  AI cited unknown act: "${result.act}" — rejecting`);
            return null; // Falls back to keyword analysis
        }

        // Cap confidence
        if (result.confidence > 0.97) result.confidence = 0.97;
        if (result.confidence < 0.5) result.confidence = 0.75;

        return result;
    } catch (err) {
        console.error('AI Analysis error:', err.message);
        return null;
    }
}

/**
 * Generate a legal notice draft using AI
 */
async function generateDraft(userDetails, analysis, caseDetails, evidence = null, currentDate = null) {
    if (!groq) return null;

    const today = currentDate || new Date().toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    try {
        const completion = await groq.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: 'system',
                    content: `You are an expert Indian legal notice drafter. Generate a formal, professionally worded legal notice in English.

CRITICAL RULES:
1. Only cite acts and sections from established Indian law. 
   - For Consumer Protection Act 2019: Use Section 2(7) for "consumer", 2(10) for "defect", 2(11) for "deficiency", 2(47) for "unfair trade practice", and Section 84/85 for "product liability".
2. Use formal legal language. 
3. Do NOT use markdown formatting — output plain text only.
4. Use Unicode borders like ═══ and ─── for visual separation.
5. TODAY'S DATE IS: ${today}. Use this date for the notice. Do NOT hallucinate future dates.
6. INCLUDE basic "TO:" and "FROM:" blocks with the provided addresses at the top of the notice. This is essential for the user's text view and emails.
7. ALWAYS include the following disclaimer at the very end:
   "DISCLAIMER: This notice is generated by Adhikar.ai, an AI-assisted legal drafting tool. It does not constitute legal advice. Please have this notice reviewed by a qualified legal professional before use."
8. Use ONLY the phone number and email provided below. Do NOT invent, fabricate, or hallucinate any contact details. If a phone or email is not provided, simply omit it.

The notice must follow this structure:
1. Reference Number (ADH/2026/XXXX)
2. Date
3. TO: Opponent Name and Address
4. FROM: Complainant Name, Address, Phone, and Email (use ONLY what is provided)
5. SUBJECT line citing the relevant act and violation
6. Salutation (Dear Sir/Madam)
7. BODY with sections:
   - Background/Facts
   - Grievance
   - Legal Basis (cite specific act and section)
   - Demand (what the complainant wants)
   - Consequence of Non-Compliance (Standard 15-day deadline warning)
8. Signature block: "Yours faithfully, ${userDetails.fullName || '[Your Name]'}"
9. CC: Relevant authorities
10. DISCLAIMER`
                },
                {
                    role: 'user',
                    content: `Generate a legal notice with these details:
Today's Date: ${today}

COMPLAINANT:
Name: ${userDetails.fullName || '[Name]'}
Address: ${userDetails.address || '[Address]'}
Phone: ${userDetails.phone || 'Not provided'}
Email: ${userDetails.email || 'Not provided'}

OPPONENT:
Name: ${userDetails.opponentName || '[Opponent]'}
Address: ${userDetails.opponentAddress || '[Address]'}

VIOLATION: ${analysis.violation}
ACT: ${analysis.act}
SECTION: ${analysis.section}

SERVICE/PRODUCT: ${userDetails.serviceDetails || 'Not specified'}
DATE OF INCIDENT: ${userDetails.dateOfEvent || 'Not specified'}
RESOLUTION SOUGHT: ${userDetails.resolutionRequested || 'Appropriate compensation and resolution'}

COMPLAINT DETAILS: ${caseDetails || 'As per the analysis above'}
                    
EVIDENCE ATTACHED: ${evidence ? `Filename: "${evidence.name}" (${evidence.type}). Please explicitly mention this evidence in the notice body (e.g., "A copy of the ${evidence.type} is attached herewith as Annexure A").` : 'None provided'}`
                }
            ],
            temperature: 0.1, // Lower temperature to reduce hallucinations
            max_tokens: 2000,
        });

        let draftText = completion.choices[0]?.message?.content?.trim() || null;

        // Ensure disclaimer is always present
        if (draftText && !draftText.includes('DISCLAIMER')) {
            draftText += `\n\n═══════════════════════════════════════════════════════\nDISCLAIMER: This notice is generated by Adhikar.ai, an AI-assisted legal drafting tool.\nIt does not constitute legal advice. Please have this notice reviewed by a qualified\nlegal professional before use. Adhikar.ai is not a substitute for a lawyer.\n═══════════════════════════════════════════════════════`;
        }

        return draftText;
    } catch (err) {
        console.error('AI Draft error:', err.message);
        return null;
    }
}

module.exports = { analyzeCase, generateDraft, KNOWN_ACTS };
