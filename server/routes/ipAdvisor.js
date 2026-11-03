const express = require('express');
const router = express.Router();
const { analyzeIPCase } = require('../services/ai');

// ─── Deterministic Rule-Based Fallback Knowledge Engine ───
function getFallbackIPAnalysis(query, domain = 'all') {
    const q = (query || '').toLowerCase();

    // 1. Video Games / Indie Game Dev / Asset Store
    if (q.includes('game') || q.includes('steam') || q.includes('unity') || q.includes('unreal') || q.includes('asset') || q.includes('3d') || q.includes('mod') || domain === 'games') {
        const hasMusic = q.includes('music') || q.includes('song') || q.includes('sound');
        const hasAsset = q.includes('model') || q.includes('asset') || q.includes('store') || q.includes('bought');

        return {
            summary: "Commercial video game distribution involving third-party assets, engine code, or audio elements subject to Indian and international copyright and EULA regulations.",
            verdict: hasMusic
                ? "You cannot distribute commercial games containing copyrighted music without an explicit Commercial Synchronization and Master Use License. Asset store models require verified commercial single/multi-seat license."
                : "Game code and original creative assets are protected as Computer Programmes and Artistic Works under Section 14 of the Copyright Act, 1957. Third-party assets require commercial redistribution rights.",
            riskLevel: hasMusic ? "High" : "Moderate",
            riskScore: hasMusic ? 82 : 45,
            applicableLaws: [
                {
                    act: "Copyright Act, 1957",
                    sections: "Section 14(b) & Section 51",
                    title: "Exclusive Rights in Computer Programmes & Infringement",
                    explanation: "Video games are legally classified as 'computer programmes' combined with artistic, musical, and cinematographic works. Commercial distribution without licenses constitutes direct infringement under Section 51."
                },
                {
                    act: "Copyright Act, 1957",
                    sections: "Section 63",
                    title: "Criminal Sanction for Software / Media Infringement",
                    explanation: "Commercial distribution of infringing game copies or assets exposes developers to potential criminal liability (imprisonment up to 3 years and fines up to ₹2 Lakhs)."
                },
                {
                    act: "Information Technology Act, 2000",
                    sections: "Section 79 & IT Rules",
                    title: "Platform Terms & Store Notice",
                    explanation: "Steam, Epic Games Store, Google Play, and Apple App Store operate zero-tolerance DMCA takedown procedures upon receiving verified infringement notices."
                }
            ],
            licensesRequired: [
                {
                    name: "Commercial Game Distribution License / EULA",
                    type: "3D Asset / Engine",
                    required: true,
                    howToObtain: "Verify vendor license terms on Unity Asset Store, Fab, or CGTrader (ensure 'Standard / Commercial Use' is selected, not Editorial or Personal).",
                    estimatedComplexity: "Low",
                    typicalCost: "Included in commercial asset purchase ($10 - $150 per pack)"
                },
                {
                    name: "Commercial Synchronization & Master Rights License",
                    type: "Music & Audio",
                    required: hasMusic,
                    howToObtain: "License through royalty-free commercial music libraries (Epidemic Sound, Artlist, AudioJungle) or contact rights holders directly. Do NOT use anime/pop songs without direct publisher agreement.",
                    estimatedComplexity: hasMusic ? "High" : "Low",
                    typicalCost: hasMusic ? "Custom negotiated ($500 - $10,000+) or $15/mo for royalty-free" : "N/A"
                },
                {
                    name: "Game Engine Commercial Royalty Agreement",
                    type: "Engine Middleware",
                    required: true,
                    howToObtain: "Unreal Engine (5% royalty applies only after first $1,000,000 USD gross revenue); Unity (Standard subscription tier depending on studio revenue); Godot (100% Free / MIT License).",
                    estimatedComplexity: "Low",
                    typicalCost: "Free upfront (revenue-share threshold applies)"
                }
            ],
            actionSteps: [
                "1. Audit all assets in your build folder: verify invoice receipts and commercial license tier for every 3D model, shader, font, and sound effect.",
                "2. Ensure all fonts used in UI have desktop & embedded app licenses (many free Google fonts like Inter/Outfit use SIL Open Font License, which is safe for games).",
                "3. Remove any fan-art, anime music, or trademarked logos (e.g. real car brands, gun logos) unless you hold written licensing agreements.",
                "4. Draft a custom End User License Agreement (EULA) and Privacy Policy covering data collection if the game connects to multiplayer or cloud servers."
            ],
            dosAndDonts: {
                dos: [
                    "Maintain an offline 'Licenses' folder with PDF invoices for every single purchased asset pack",
                    "Credit third-party asset creators in your game's end credits if required by CC-BY or store terms",
                    "Register copyright in India for your game's original source code, lore script, and unique character designs"
                ],
                donts: [
                    "Never use assets labeled 'Editorial Use Only' in a commercial release",
                    "Do not rip music from YouTube or anime assuming 'giving credit' avoids copyright strikes",
                    "Never ignore a platform DMCA notice — respond with proof of license within 10 business days"
                ]
            },
            noticeTemplate: `LEGAL NOTICE / LICENSING CLEARANCE DEMAND
To: [Platform / Store / Developer Name]
Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}

SUBJECT: Notice of Intellectual Property Ownership & Compliance — [Game Title]

Dear Sir/Madam,

I am writing on behalf of [Your Studio/Name], creator and copyright holder of the interactive software title "[Game Title]".

We hereby confirm that all proprietary code, artistic assets, and audiovisual materials included in this release have been authored by our team or acquired under verified commercial redistribution licenses in full accordance with Section 14 and Section 18 of the Indian Copyright Act, 1957.

Should your platform or legal representatives require inspection of our chain-of-title or asset invoices, please contact us within 14 days at [Your Email].

Sincerely,
[Your Name / Studio Lead]
Adhikar.ai Verified Intellectual Property Reference`
        };
    }

    // 2. YouTube / Streaming / Content Creators / Music
    if (q.includes('youtube') || q.includes('stream') || q.includes('anime') || q.includes('clip') || q.includes('strike') || q.includes('twitch') || q.includes('fair use') || domain === 'music' || domain === 'streaming') {
        return {
            summary: "Digital audiovisual content creation involving third-party music, video excerpts, or broadcast clips on social media and streaming platforms.",
            verdict: "Indian law provides for 'Fair Dealing' under Section 52 of the Copyright Act, which is strictly narrower than US 'Fair Use'. Using background music or anime clips for entertainment or gameplay does NOT qualify as Fair Dealing and is subject to copyright strikes.",
            riskLevel: "High",
            riskScore: 78,
            applicableLaws: [
                {
                    act: "Copyright Act, 1957",
                    sections: "Section 52(1)(a)",
                    title: "Fair Dealing Exemptions (Strictly Enumerated)",
                    explanation: "Section 52 only exempts fair dealing for: (i) private or personal use, including research; (ii) criticism or review of that work; (iii) reporting of current events. General video background music or aesthetic anime montages do not qualify."
                },
                {
                    act: "Copyright Act, 1957",
                    sections: "Section 14(a)(iii) & 14(e)",
                    title: "Communication to the Public & Sound Recording Rights",
                    explanation: "Broadcasting sound recordings or video clips to an online audience constitutes 'communication to the public', exclusively reserved for the copyright owner or licensing societies (like IPRS/PPL)."
                },
                {
                    act: "Information Technology (Intermediary Guidelines) Rules, 2021",
                    sections: "Rule 3(1)(b) & Rule 3(2)",
                    title: "Intermediary Takedowns & Safe Harbour",
                    explanation: "YouTube and Twitch are mandated by Indian and US law (DMCA & IT Rules) to take down infringing content upon receiving automated Content ID or manual copyright owner notices."
                }
            ],
            licensesRequired: [
                {
                    name: "Commercial Synchronization (Sync) License",
                    type: "Music Composition",
                    required: true,
                    howToObtain: "Obtained from music publishers (or creator subscriptions like Epidemic Sound, Lickd, Uppbeat). Sync licenses permit syncing audio with video.",
                    estimatedComplexity: "Moderate",
                    typicalCost: "Subscription ($10 - $25/mo) or direct publisher quote ($500+)"
                },
                {
                    name: "Master Recording License",
                    type: "Audio Recording",
                    required: true,
                    howToObtain: "Obtained from the record label holding the specific recorded master track.",
                    estimatedComplexity: "High",
                    typicalCost: "Often paired with Sync license"
                }
            ],
            actionSteps: [
                "1. If you received a Content ID claim (revenue sharing): Decide whether you want to monetize. If yes, replace the track using YouTube Audio Library or submit proof of license.",
                "2. If you received a formal Copyright Strike: Do NOT submit a fraudulent counter-notification unless you possess written ownership or genuine Section 52 review/criticism defense.",
                "3. For reaction or review channels: Add substantial commentary, transformative transformation, and critique to stay within Section 52(1)(a)(ii).",
                "4. Switch to pre-cleared royalty-free platforms (YouTube Creator Music, Streambeats, Artlist) to eliminate demonetization risks."
            ],
            dosAndDonts: {
                dos: [
                    "Always provide clear critique and on-screen commentary if relying on criticism/review exceptions",
                    "Keep video clip lengths to the minimum necessary to substantiate your spoken review",
                    "Subscribe to vetted music licensing platforms that grant automatic YouTube channel whitelisting"
                ],
                donts: [
                    "Never believe that adding 'No copyright infringement intended' in video descriptions provides any legal immunity",
                    "Do not speed up or pitch-shift songs to trick algorithms; this violates the author's moral rights under Section 57",
                    "Do not dispute a strike without legal proof, as false counter-notices can lead to channel termination and civil liability"
                ]
            },
            noticeTemplate: `FORMAL RESPONSE / COUNTER-REPRESENTATION TO COPYRIGHT CLAIM
To: Grievance Officer / Platform Copyright Review Team
Platform: [YouTube / Twitch / Instagram]
Content URL: [Insert Video URL]

SUBJECT: Clarification of Fair Dealing under Section 52, Indian Copyright Act, 1957

Respected Sir/Madam,

I am writing in reference to the copyright action filed against my video "[Video Title]".

I respectfully submit that the disputed excerpt is incorporated strictly for the purpose of bona fide criticism, comparative review, and analysis of the underlying creative work, which is explicitly protected under Section 52(1)(a)(ii) of the Copyright Act, 1957.

The original work constitutes less than [X]% of my complete video, and transformative commentary, education, and opinion have been supplied throughout. No substantial economic harm is caused to the original market value.

I request that the claim be re-evaluated under statutory fair dealing provisions and the restriction lifted.

Sincerely,
[Your Name / Channel Name]
Adhikar.ai Creator Rights Advisory`
        };
    }

    // 3. Freelance / Unpaid Work / Client Theft
    if (q.includes('freelance') || q.includes('client') || q.includes('unpaid') || q.includes('pay') || q.includes('invoice') || q.includes('logo') || q.includes('video editing') || domain === 'freelance') {
        return {
            summary: "Client utilizing creative deliverables (branding, video edit, code, or graphic design) commercially without full payment or formal copyright assignment.",
            verdict: "Unless an explicit written contract transfers copyright upon creation, copyright remains with the independent freelancer until payment is completed. Using unpaid deliverables constitutes both breach of contract and willful copyright infringement under Section 51.",
            riskLevel: "High",
            riskScore: 85,
            applicableLaws: [
                {
                    act: "Copyright Act, 1957",
                    sections: "Section 17 & Section 19",
                    title: "First Ownership & Statutory Mode of Assignment",
                    explanation: "Under Section 17, an independent contractor/freelancer is the first owner of copyright. Under Section 19, assignment is invalid unless in writing signed by the assignor, conditioned upon the agreed consideration (payment)."
                },
                {
                    act: "Copyright Act, 1957",
                    sections: "Section 51 & 63",
                    title: "Copyright Infringement & Criminal Penalties",
                    explanation: "Displaying, publishing, or broadcasting your artwork/video commercially without paying consideration is unauthorized exploitation, punishable with civil damages and up to 3 years imprisonment."
                },
                {
                    act: "Indian Contract Act, 1872",
                    sections: "Section 73",
                    title: "Compensation for Breach of Contract",
                    explanation: "Entitles the unpaid creator to compensation for any loss or damage naturally arising in the usual course from the client's breach of the agreed freelance fee."
                }
            ],
            licensesRequired: [
                {
                    name: "Commercial Copyright Assignment Agreement",
                    type: "Intellectual Property Transfer",
                    required: true,
                    howToObtain: "Draft a written assignment clause: 'Copyright in the final deliverables shall transfer to Client strictly upon receipt of full and final payment.'",
                    estimatedComplexity: "Low",
                    typicalCost: "Free to draft (standard contract term)"
                }
            ],
            actionSteps: [
                "1. Immediately send a formal Legal Notice / Cease & Desist demanding either payment of the unpaid balance within 7 days or immediate removal of the creative work from all public channels.",
                "2. Compile all evidence: WhatsApp/email briefs, invoices, delivery timestamps, watermarked previews, and live screenshots of client using your work.",
                "3. If the client ignores notice, file platform copyright takedown notices (Instagram, YouTube, hosting providers) as the undisputed copyright owner under IT Rules 2021.",
                "4. You can also file a summary suit for commercial debt recovery in the jurisdictional Civil / Commercial Court."
            ],
            dosAndDonts: {
                dos: [
                    "Always deliver low-res watermarked previews until final milestone payment is confirmed",
                    "Include explicit clause: 'Ownership of deliverables remains with designer until 100% payment clears'",
                    "Issue a formal Cease & Desist before initiating public disputes"
                ],
                donts: [
                    "Never send final editable source files (PSD, AI, Premiere project, source code) before receiving balance payment",
                    "Do not defame the client on public social media without sticking strictly to objective documentary facts",
                    "Do not assume verbal agreements transfer copyright; Section 19 requires written signed assignment"
                ]
            },
            noticeTemplate: `LEGAL NOTICE OF COPYRIGHT INFRINGEMENT & DEMAND FOR IMMEDIATE PAYMENT
To: [Client Name / Company Name]
Address: [Client Address / Email]
Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}

SUBJECT: Notice of Unauthorized Commercial Exploitation of Copyrighted Work & Final Demand for Payment of Unpaid Invoice [Invoice #]

Dear Sir/Madam,

I am writing to issue this formal notice regarding creative services rendered by me, [Your Name], for [Project Name / Description of Deliverables].

1. Pursuant to our agreement, the agreed professional fee of ₹[Amount] remains unpaid despite issuance of Invoice #[Invoice Number] on [Date].
2. Under Section 17 of the Copyright Act, 1957, I am the sole and exclusive first owner of the copyright subsisting in the deliverables. Under Section 19, copyright transfer is strictly contingent upon full consideration being disbursed.
3. You have wrongfully deployed and commercially broadcasted my creative work on [Website URL / Instagram Handle / Marketing channels] without license or payment, constituting willful infringement under Section 51.

I HEREBY CALL UPON YOU TO:
a) Remit the outstanding balance of ₹[Amount] to my designated bank account within SEVEN (7) DAYS of receipt; OR
b) Cease and desist from all commercial use and remove the infringing materials immediately.

Failing compliance, I shall proceed with formal platform takedown notices and civil/criminal proceedings under Sections 55, 63 of the Copyright Act and Section 73 of the Indian Contract Act at your sole risk and costs.

Sincerely,
[Your Name / Creative Professional]
Contact: [Your Phone / Email]
Drafted via Adhikar.ai`
        };
    }

    // 4. Software / Open Source / GPL vs MIT
    if (q.includes('software') || q.includes('gpl') || q.includes('mit') || q.includes('apache') || q.includes('open source') || q.includes('saas') || domain === 'software') {
        return {
            summary: "Commercialization of software or SaaS product incorporating third-party open-source components, libraries, or dual-licensed modules.",
            verdict: "Permissive licenses (MIT, Apache 2.0, BSD) permit closed-source commercial distribution provided you retain original copyright notices. Copyleft licenses (GPL v2/v3, AGPL) legally require derivative works to be released under the same open-source license.",
            riskLevel: q.includes('gpl') ? "High" : "Low",
            riskScore: q.includes('gpl') ? 70 : 25,
            applicableLaws: [
                {
                    act: "Copyright Act, 1957",
                    sections: "Section 14(b) & Section 30",
                    title: "Licensing of Computer Software",
                    explanation: "Software source code and object code are protected as literary works. Using open-source software outside the scope of its license constitutes copyright infringement under Indian and international law."
                },
                {
                    act: "Indian Contract Act, 1872",
                    sections: "Section 10 & 73",
                    title: "Enforceability of Click-wrap & Open Source Licenses",
                    explanation: "Open source licenses constitute legally binding contracts. Breaching license terms (e.g., failing to publish GPL derivative source code) terminates your license to use the code."
                }
            ],
            licensesRequired: [
                {
                    name: "Open Source License Compliance (MIT / Apache / BSD)",
                    type: "Permissive License",
                    required: true,
                    howToObtain: "Retain the original copyright header and license text in your software's documentation or 'About / Licenses' page.",
                    estimatedComplexity: "Low",
                    typicalCost: "Free (Attribution only)"
                },
                {
                    name: "Commercial Dual License (if avoiding GPL/AGPL)",
                    type: "Proprietary Commercial License",
                    required: q.includes('gpl'),
                    howToObtain: "Purchase a commercial OEM/proprietary license directly from the library vendor to avoid copyleft source code disclosure obligations.",
                    estimatedComplexity: "Moderate",
                    typicalCost: "Varies by vendor ($500 - $10,000/yr)"
                }
            ],
            actionSteps: [
                "1. Run an automated Software Bill of Materials (SBOM) tool (e.g. `npm audit`, Syft, or FOSSA) to detect any copyleft (GPL, AGPL) dependencies in your codebase.",
                "2. If selling a closed-source proprietary product: replace any GPL libraries with MIT, Apache 2.0, or BSD-3 alternatives.",
                "3. Ensure your app or web service contains a dedicated Third-Party Notices section acknowledging all open-source libraries used.",
                "4. Draft a clear End User License Agreement (EULA) or Terms of Service setting out user permissions and liability limitations."
            ],
            dosAndDonts: {
                dos: [
                    "Include all original author license notices in your software's distribution bundle",
                    "Use separate microservices via API boundaries if interacting with AGPL software to avoid derivative contamination",
                    "Maintain an updated open source audit report for potential investors or acquirers"
                ],
                donts: [
                    "Never strip out the original author copyright notices from open-source code",
                    "Do not distribute closed-source binaries that statically link to GPL-licensed libraries",
                    "Never bundle GNU GPL code into proprietary mobile apps on Apple App Store without reviewing compliance"
                ]
            },
            noticeTemplate: `OPEN SOURCE COMPLIANCE NOTICE & ATTRIBUTION
Project: [Your Software / SaaS Name]
Version: 1.0.0

This software incorporates third-party open source software components governed by the following licenses:

1. [Component Name] — Copyright (c) [Year] [Author Name]
   Licensed under the MIT License: https://opensource.org/licenses/MIT
   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files...

[Full compliance statements maintained in accordance with Section 30, Copyright Act 1957]`
        };
    }

    // 5. Default General IP / Digital Media Scenario
    return {
        summary: "Digital media, branding, or creative work intellectual property assessment under Indian law.",
        verdict: "Original creative works, brand identifiers, and digital media enjoy statutory protection in India under the Copyright Act, 1957, Trade Marks Act, 1999, and IT Rules 2021. Commercial use requires prior written licensing authorization.",
        riskLevel: "Moderate",
        riskScore: 50,
        applicableLaws: [
            {
                act: "Copyright Act, 1957",
                sections: "Section 14 & Section 51",
                title: "Exclusive Rights & Infringement Standards",
                explanation: "Protects creators against unauthorized reproduction, broadcasting, adaptation, or public commercial distribution."
            },
            {
                act: "Trade Marks Act, 1999",
                sections: "Section 29",
                title: "Infringement of Distinctive Brand Names & Logos",
                explanation: "Protects registered brand names, slogans, and logos from misleading imitation in trade."
            },
            {
                act: "Information Technology (Intermediary Guidelines) Rules, 2021",
                sections: "Rule 3(1)(b)",
                title: "Platform Content Regulation & Grievance Redressal",
                explanation: "Mandates expeditious removal of infringing digital media content across hosting platforms within statutory timelines."
            }
        ],
        licensesRequired: [
            {
                name: "Commercial Creative & Media License",
                type: "Content Licensing",
                required: true,
                howToObtain: "Direct written agreement with copyright proprietor or authorized licensing agency.",
                estimatedComplexity: "Moderate",
                typicalCost: "Varies depending on territorial scope and media format"
            }
        ],
        actionSteps: [
            "1. Document the exact timeline of creation and keep timestamped source files as proof of priority.",
            "2. If an infringement has occurred, send a formal Cease & Desist letter granting 7-14 days for amicable compliance.",
            "3. Submit formal grievance reports to the platform's designated Resident Grievance Officer under IT Rules 2021.",
            "4. Consult an IP attorney if commercial damages exceed ₹1,00,000 for District Court injunctive relief."
        ],
        dosAndDonts: {
            dos: [
                "Execute clear written contracts specifying IP assignment and royalty terms",
                "Register trademarks and copyright for core brand identity and software assets",
                "Keep verified proof of license for every third-party asset used"
            ],
            donts: [
                "Never rely on verbal assurances of copyright or trademark clearance",
                "Do not copy competitor UI layouts or brand names deceptively",
                "Never ignore legal notices or cease & desist communications"
            ]
        },
        noticeTemplate: `FORMAL CEASE AND DESIST NOTICE FOR INTELLECTUAL PROPERTY INFRINGEMENT
To: [Opposing Party / Company Name]
Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}

SUBJECT: Cease and Desist from Unauthorized Use of Proprietary Intellectual Property

Dear Sir/Madam,

I represent [Your Name / Entity], the lawful proprietor of copyright and proprietary rights in [Description of Work / Asset / Brand Name].

It has come to our attention that you have engaged in the unauthorized commercial display, reproduction, and distribution of the aforesaid property on [Platform / URL].

Under Section 51 of the Copyright Act, 1957 and applicable laws, such unauthorized acts constitute actionable civil and criminal infringement.

WE HEREBY DEMAND THAT YOU:
1. Immediately cease and desist all use and distribution of the infringing material;
2. Permanently remove and delete the infringing content from all servers and platforms within SEVEN (7) DAYS;
3. Provide written confirmation of compliance.

Should you fail to comply, we reserve all rights to initiate injunctive and damages proceedings without further notice.

Sincerely,
[Your Name]
Adhikar.ai IP Advisory System`
    };
}

// ─── POST /api/ip-advisor ───
router.post('/', async (req, res) => {
    try {
        const { query, domain } = req.body;
        if (!query || query.trim().length < 5) {
            return res.status(400).json({
                error: 'Please describe your scenario or question (at least 5 characters).'
            });
        }

        // Try AI first
        const aiStart = Date.now();
        const aiResult = await analyzeIPCase(query, domain);
        const duration = (Date.now() - aiStart) / 1000;

        if (aiResult && aiResult.summary && aiResult.applicableLaws) {
            console.log(`💡 IP Advisor AI: "${aiResult.verdict?.substring(0, 50)}..." in ${duration.toFixed(1)}s`);
            return res.json({
                ...aiResult,
                source: 'ai',
                timestamp: new Date().toISOString()
            });
        }

        // Fallback to deterministic legal knowledge engine
        console.log(`📚 IP Advisor using rule-based knowledge fallback`);
        const fallbackResult = getFallbackIPAnalysis(query, domain);
        return res.json({
            ...fallbackResult,
            source: 'knowledge-base',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('IP Advisor error:', err.message);
        const fallback = getFallbackIPAnalysis(req.body?.query, req.body?.domain);
        return res.json({
            ...fallback,
            source: 'emergency-fallback',
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = router;

