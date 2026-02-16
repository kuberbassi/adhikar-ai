const express = require('express');
const router = express.Router();
const { generateDraft } = require('../services/ai');
const { updateCaseRecord, logActivity } = require('../services/firebase');

router.post('/', async (req, res) => {
    const { userDetails, analysis, caseDetails, caseId, evidence } = req.body;

    if (!userDetails || !analysis) {
        return res.status(400).json({ error: 'User details and analysis are required' });
    }

    const refNumber = `ADH/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
    const date = new Date().toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    // ──────────────────────────────────────────────
    // Try AI-powered draft first (Groq + Llama 3.3)
    // ──────────────────────────────────────────────
    const aiDraft = await generateDraft(userDetails, analysis, caseDetails, evidence);
    if (aiDraft) {
        console.log(`🤖 AI Draft generated (${aiDraft.length} chars)${caseId ? ` [Case: ${caseId}]` : ''}`);

        // Update case record with draft
        if (caseId) {
            await updateCaseRecord(caseId, {
                draft: aiDraft,
                refNumber,
                status: 'drafted',
                userDetailsRedacted: {
                    fullName: userDetails.fullName || '[Redacted]',
                    email: userDetails.email || '[Redacted]',
                    phone: userDetails.phone || '[Redacted]'
                }
            });
        }

        return res.json({ draft: aiDraft, refNumber });
    }

    // ──────────────────────────────────────────────
    // Fallback: template-based draft
    // ──────────────────────────────────────────────
    console.log(`📋 Using template fallback${caseId ? ` [Case: ${caseId}]` : ''}`);

    const draft = `
═══════════════════════════════════════════════════════
                         LEGAL NOTICE
═══════════════════════════════════════════════════════

Ref No: ${refNumber}
Date: ${date}

TO,
${userDetails.opponentName || "[Opponent Name]"}
${userDetails.opponentAddress || "[Opponent Address]"}

FROM,
${userDetails.fullName || "[Your Full Name]"}
${userDetails.address || "[Your Address]"}
${userDetails.email ? `Email: ${userDetails.email}` : ""}
${userDetails.phone ? `Phone: ${userDetails.phone}` : ""}

───────────────────────────────────────────────────────
SUBJECT: LEGAL NOTICE FOR ${analysis.violation.toUpperCase()} UNDER ${analysis.act.toUpperCase()}
───────────────────────────────────────────────────────

Dear Sir/Madam,

Under the instructions and on behalf of my client, ${userDetails.fullName || "[Your Name]"}, I hereby serve upon you this Legal Notice as follows:

1. BACKGROUND
   My client states that ${userDetails.serviceDetails ? `in relation to ${userDetails.serviceDetails}, ` : ""}a dispute has arisen concerning the above-mentioned matter${userDetails.dateOfEvent ? `, which occurred on ${userDetails.dateOfEvent}` : ""}.

2. GRIEVANCE
   It has come to our attention that your actions/omissions constitute a violation of the rights of my client. Specifically, your conduct amounts to "${analysis.violation}" as defined under ${analysis.act}, ${analysis.section}.

3. LEGAL BASIS
   Under ${analysis.act}, ${analysis.section}, such conduct is punishable and the aggrieved party is entitled to seek appropriate relief, including but not limited to compensation, damages, and legal costs.

4. DEMAND
   ${userDetails.resolutionRequested
            ? `My client hereby demands: ${userDetails.resolutionRequested}.`
            : "My client hereby demands appropriate compensation and immediate resolution of this matter."}

5. CONSEQUENCE OF NON-COMPLIANCE
   If you fail to comply with the above demand within 15 (FIFTEEN) days from the receipt of this notice, my client shall be constrained to initiate appropriate legal proceedings against you before the competent court/forum, at your risk, cost, and consequences. This notice is being sent without prejudice to any other legal remedies available to my client.

   You are hereby advised to treat this notice with the seriousness it deserves.

Yours faithfully,

${userDetails.fullName || "[Your Name]"}
${userDetails.address || "[Address]"}

───────────────────────────────────────────────────────
CC:
  1. District Consumer Disputes Redressal Commission
  2. Relevant Regulatory Authority
═══════════════════════════════════════════════════════
   DISCLAIMER: This notice is generated by Adhikar.ai — an AI Legal Assistant.
   This is a drafting aid only. Please review with a qualified advocate before use.
   Adhikar.ai does not provide legal advice and is not a substitute for a lawyer.
═══════════════════════════════════════════════════════
`.trim();

    // Update case record with draft
    if (caseId) {
        await updateCaseRecord(caseId, {
            draft,
            refNumber,
            status: 'drafted',
            userDetailsRedacted: {
                fullName: userDetails.fullName || '[Redacted]',
                email: userDetails.email || '[Redacted]',
                phone: userDetails.phone || '[Redacted]'
            }
        });
    }

    setTimeout(() => {
        res.json({ draft, refNumber });
    }, 1500);
});

module.exports = router;
