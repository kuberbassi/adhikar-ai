const express = require('express');
const router = express.Router();
const { analyzeCase } = require('../services/ai');

router.post('/', async (req, res) => {
    const { details } = req.body;

    if (!details) {
        return res.status(400).json({ error: 'Case details are required' });
    }

    // ──────────────────────────────────────────────
    // Try AI-powered analysis first (Groq + Llama 3.3)
    // ──────────────────────────────────────────────
    const aiResult = await analyzeCase(details);
    if (aiResult) {
        console.log(`🤖 AI Analysis: ${aiResult.violation} (${aiResult.act})`);
        return res.json(aiResult);
    }

    // ──────────────────────────────────────────────
    // Fallback: keyword-based analysis
    // ──────────────────────────────────────────────
    console.log('📋 Using keyword fallback for analysis');
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

    // Consumer Protection — refund / broken / defective / warranty / overcharged
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
    // Rental / Landlord disputes
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
    // Employment disputes
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
    // Fraud / Scam
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
    // Service delay / non-delivery
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

    // Simulate processing delay for keyword fallback
    setTimeout(() => {
        res.json(analysis);
    }, 1500);
});

module.exports = router;
