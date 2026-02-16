const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { analyzeCase } = require('../services/ai');
const { saveCaseRecord, logActivity, checkNoticeLimit, incrementNoticeCount } = require('../services/firebase');

// ─── Notice Rate Limiting ───
// Set ENABLE_NOTICE_LIMIT=true in .env to activate (OFF by default for testing)
const NOTICE_LIMIT_ENABLED = process.env.ENABLE_NOTICE_LIMIT === 'true';
const MAX_NOTICES_PER_DAY = parseInt(process.env.MAX_NOTICES_PER_DAY || '3', 10);

router.post('/', async (req, res) => {
    try {
        const { details, evidence } = req.body;

        if (!details) {
            return res.status(400).json({ error: 'Case details are required' });
        }

        const caseId = uuidv4();
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

        // ── Check daily notice limit (if enabled) ──
        if (NOTICE_LIMIT_ENABLED) {
            const limitCheck = await checkNoticeLimit(ip, MAX_NOTICES_PER_DAY);
            if (!limitCheck.allowed) {
                console.log(`🚫 Rate limit reached for IP (${limitCheck.count}/${MAX_NOTICES_PER_DAY})`);
                return res.status(429).json({
                    error: 'Daily notice limit reached',
                    message: `You have used all ${MAX_NOTICES_PER_DAY} free notices for today. Please try again tomorrow.`,
                    remaining: 0,
                    limit: MAX_NOTICES_PER_DAY,
                });
            }
        }

        // ──────────────────────────────────────────────
        // Try AI-powered analysis first (Groq + Llama 3.3)
        // ──────────────────────────────────────────────
        const aiResult = await analyzeCase(details, evidence);
        if (aiResult) {
            console.log(`🤖 AI Analysis: ${aiResult.violation} (${aiResult.act}) [Case: ${caseId}]`);

            // Save to database for legal protection
            await saveCaseRecord(caseId, {
                ip,
                userAgent: req.headers['user-agent'] || 'unknown',
                caseDetails: details,
                analysis: aiResult,
                status: 'analyzed',
                source: 'ai'
            });

            // Increment daily notice counter (if limit tracking enabled)
            if (NOTICE_LIMIT_ENABLED) {
                await incrementNoticeCount(ip);
            }

            return res.json({ ...aiResult, caseId });
        }

        // ──────────────────────────────────────────────
        // Fallback: keyword-based analysis
        // ──────────────────────────────────────────────
        console.log(`📋 Using keyword fallback [Case: ${caseId}]`);
        const lowerDetails = details.toLowerCase();

        let analysis = {
            violation: "General Legal Inquiry",
            act: "Indian Penal Code (General)",
            section: "N/A",
            confidence: 0.85,
            severity: "low",
            summary: "Based on the provided details, this appears to be a general legal matter. We recommend consulting a qualified legal professional for specific advice.",
            recommendations: [
                "Consult a legal professional for personalized guidance",
                "Gather all related documents and evidence",
                "Maintain a chronological record of all events"
            ]
        };

    // Consumer Protection
    if (lowerDetails.includes('refund') || lowerDetails.includes('broken') || lowerDetails.includes('defective') || lowerDetails.includes('warranty') || lowerDetails.includes('overcharged')) {
        analysis = {
            violation: "Unfair Trade Practice / Defective Product",
            act: "Consumer Protection Act, 2019",
            section: "Section 35",
            confidence: 0.98,
            severity: "high",
            summary: "The incident described involves a potential violation of consumer rights under the Consumer Protection Act, 2019. Specifically, it pertains to the failure to provide a refund or the delivery of a defective product/service.",
            recommendations: [
                "File a complaint with the Consumer Disputes Redressal Commission",
                "Send the legal notice via registered post as proof of delivery",
                "Keep copies of all purchase receipts and warranty documents",
                "You may also approach the National Consumer Helpline (1800-11-4000)"
            ]
        };
    }
    // Rental / Landlord
    else if (lowerDetails.includes('rent') || lowerDetails.includes('landlord') || lowerDetails.includes('deposit') || lowerDetails.includes('tenant') || lowerDetails.includes('eviction')) {
        analysis = {
            violation: "Rental / Tenancy Dispute",
            act: "The Rent Control Act",
            section: "Section 12",
            confidence: 0.92,
            severity: "medium",
            summary: "The details suggest a dispute between a landlord and tenant regarding rent, security deposit, or unlawful eviction, governed by the Rent Control Act of the respective state.",
            recommendations: [
                "Approach the Rent Control Tribunal in your jurisdiction",
                "Ensure you have a copy of the rental agreement",
                "Collect evidence of rent payments (bank statements, receipts)",
                "Send the legal notice within 30 days of the incident"
            ]
        };
    }
    // Employment
    else if (lowerDetails.includes('fired') || lowerDetails.includes('salary') || lowerDetails.includes('terminated') || lowerDetails.includes('employer') || lowerDetails.includes('wages')) {
        analysis = {
            violation: "Unfair Labour Practice / Wrongful Termination",
            act: "Industrial Disputes Act, 1947",
            section: "Section 25-F",
            confidence: 0.90,
            severity: "high",
            summary: "The incident indicates a potential case of wrongful termination or non-payment of wages. Under the Industrial Disputes Act, employers must follow due procedure before termination and ensure timely disbursement of wages.",
            recommendations: [
                "File a complaint with the Labour Commissioner",
                "Approach the Industrial Tribunal if wages are unpaid for over 30 days",
                "Keep copies of your appointment letter, salary slips, and termination letter",
                "You may also contact the Employees' Provident Fund Organisation (EPFO) for PF-related issues"
            ]
        };
    }
    // Fraud
    else if (lowerDetails.includes('fraud') || lowerDetails.includes('cheated') || lowerDetails.includes('scam') || lowerDetails.includes('fake') || lowerDetails.includes('misleading')) {
        analysis = {
            violation: "Fraud / Cheating",
            act: "Indian Penal Code, 1860",
            section: "Section 420",
            confidence: 0.94,
            severity: "critical",
            summary: "The details suggest an act of fraud or cheating, which is a criminal offence under Section 420 of the Indian Penal Code. Victims of fraud are entitled to lodge an FIR and pursue both criminal and civil remedies.",
            recommendations: [
                "Lodge an FIR at the nearest police station immediately",
                "File a complaint on the National Cyber Crime Portal if it involved online fraud",
                "Preserve all evidence — screenshots, emails, transaction records",
                "Consult a criminal lawyer for filing a private complaint under CrPC"
            ]
        };
    }
    // Service delay
    else if (lowerDetails.includes('delay') || lowerDetails.includes('not delivered') || lowerDetails.includes('late delivery') || lowerDetails.includes('service') || lowerDetails.includes('delivery')) {
        analysis = {
            violation: "Deficiency in Service",
            act: "Consumer Protection Act, 2019",
            section: "Section 2(11)",
            confidence: 0.91,
            severity: "medium",
            summary: "The complaint pertains to deficiency in service — including delayed or non-delivery of goods/services. Under the Consumer Protection Act 2019, any shortcoming in quality, nature, or performance constitutes service deficiency.",
            recommendations: [
                "Document timeline of the expected vs actual delivery dates",
                "Contact customer support and save all correspondence",
                "File a complaint on the INGRAM portal or Consumer Helpline",
                "Approach the District Consumer Forum for claims up to ₹1 Crore"
            ]
        };
    }
    // Motor vehicle / accident
    else if (lowerDetails.includes('accident') || lowerDetails.includes('vehicle') || lowerDetails.includes('car') || lowerDetails.includes('bike') || lowerDetails.includes('insurance claim') || lowerDetails.includes('road')) {
        analysis = {
            violation: "Motor Vehicle Accident / Insurance Claim",
            act: "Motor Vehicles Act, 1988",
            section: "Section 166",
            confidence: 0.89,
            severity: "high",
            summary: "The complaint relates to a motor vehicle accident or insurance claim. Under Section 166 of the Motor Vehicles Act, victims of road accidents can claim compensation through the Motor Accidents Claims Tribunal (MACT).",
            recommendations: [
                "File a claim with the Motor Accidents Claims Tribunal (MACT)",
                "Collect the FIR copy and medical reports",
                "Obtain witness statements and photographs of the accident scene",
                "File insurance claim within the stipulated period"
            ]
        };
    }
    // Domestic violence
    else if (lowerDetails.includes('domestic') || lowerDetails.includes('violence') || lowerDetails.includes('abuse') || lowerDetails.includes('beaten') || lowerDetails.includes('harassment')) {
        analysis = {
            violation: "Domestic Violence",
            act: "Protection of Women from Domestic Violence Act, 2005",
            section: "Section 12",
            confidence: 0.93,
            severity: "critical",
            summary: "The complaint indicates domestic violence. Under the Protection of Women from Domestic Violence Act, 2005, the aggrieved person can seek protection orders, residence orders, and monetary relief.",
            recommendations: [
                "Contact Women Helpline (181) immediately",
                "File a complaint with the Protection Officer or police",
                "Apply for a protection order under Section 18",
                "Seek legal aid from the District Legal Services Authority"
            ]
        };
    }
    // Cheque bounce
    else if (lowerDetails.includes('cheque') || lowerDetails.includes('check') || lowerDetails.includes('bounce') || lowerDetails.includes('dishonour')) {
        analysis = {
            violation: "Dishonour of Cheque",
            act: "Negotiable Instruments Act, 1881",
            section: "Section 138",
            confidence: 0.96,
            severity: "high",
            summary: "The complaint relates to dishonour of a cheque. Under Section 138 of the Negotiable Instruments Act, issuing a cheque that bounces due to insufficient funds is a criminal offence punishable with imprisonment up to 2 years or fine up to twice the cheque amount.",
            recommendations: [
                "Send a legal notice within 30 days of receiving the bank memo",
                "The drawer has 15 days to make payment after receiving the notice",
                "File a complaint under Section 138 NI Act within 1 month of notice expiry",
                "Approach the Magistrate Court with the original cheque and bank memo"
            ]
        };
    }
    // Property disputes
    else if (lowerDetails.includes('property') || lowerDetails.includes('land') || lowerDetails.includes('builder') || lowerDetails.includes('flat') || lowerDetails.includes('rera') || lowerDetails.includes('real estate')) {
        analysis = {
            violation: "Real Estate / Property Dispute",
            act: "Real Estate (Regulation and Development) Act, 2016",
            section: "Section 18",
            confidence: 0.90,
            severity: "high",
            summary: "The complaint relates to a real estate or property dispute. Under RERA, buyers can seek compensation for project delays, false promises, or deficiencies in construction quality from the Real Estate Regulatory Authority.",
            recommendations: [
                "File a complaint with the State RERA Authority",
                "Collect the sale agreement, payment receipts, and correspondence",
                "Check if the project is RERA-registered on the state RERA website",
                "You can claim refund with interest for delayed possession"
            ]
        };
    }
    // Contract breach
    else if (lowerDetails.includes('contract') || lowerDetails.includes('agreement') || lowerDetails.includes('breach') || lowerDetails.includes('promise') || lowerDetails.includes('deal')) {
        analysis = {
            violation: "Breach of Contract",
            act: "Indian Contract Act, 1872",
            section: "Section 73",
            confidence: 0.88,
            severity: "medium",
            summary: "The complaint relates to a breach of contract. Under Section 73 of the Indian Contract Act, the party suffering from a breach is entitled to compensation for any loss or damage caused by the breach.",
            recommendations: [
                "Gather all contract/agreement documents",
                "Document specific clauses that were violated",
                "Send a legal notice demanding specific performance or compensation",
                "Approach the Civil Court for recovery of damages"
            ]
        };
    }

    // Save fallback analysis to database too
    await saveCaseRecord(caseId, {
        ip,
        userAgent: req.headers['user-agent'] || 'unknown',
        caseDetails: details,
        analysis,
        status: 'analyzed',
        source: 'keyword_fallback'
    });

    setTimeout(() => {
        res.json({ ...analysis, caseId });
    }, 1500);
});

module.exports = router;
