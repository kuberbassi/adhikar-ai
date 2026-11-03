import React, { useState } from 'react';
import {
    Gamepad2,
    Film,
    Music,
    Code,
    Sparkles,
    ShieldAlert,
    CheckCircle2,
    AlertTriangle,
    FileText,
    Copy,
    Check,
    Scale,
    BookOpen,
    Send,
    ArrowRight,
    Lock,
    Unlock,
    Layers,
    Info,
    ExternalLink
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const PRESET_SCENARIOS = [
    {
        id: 'game-steam',
        domain: 'games',
        icon: Gamepad2,
        title: 'Indie Game Asset & Audio Licensing',
        description: 'Commercial Steam release with purchased 3D asset store models and third-party sound tracks.',
        prompt: "I am releasing an indie action game on Steam for $14.99. I purchased 3D character models from an asset store and want to use a popular anime song as the main boss music. What licenses must I verify, does Indian copyright law protect my game code, and can Steam ban my game?"
    },
    {
        id: 'youtube-fairuse',
        domain: 'streaming',
        icon: Film,
        title: 'YouTube Streaming & Anime/Music Clips',
        description: 'Using background music and anime scenes in videos, commentary, and stream overlays.',
        prompt: "I run a YouTube gaming and commentary channel in India. Can I play popular anime theme songs as background music or show anime fight clips while discussing games? Is this covered under Indian Fair Dealing, or will I get copyright strikes?"
    },
    {
        id: 'freelance-theft',
        domain: 'freelance',
        icon: Scale,
        title: 'Freelance Design / Video: Client Not Paying',
        description: 'Client deployed logo and marketing video commercially without paying the ₹45,000 final invoice.',
        prompt: "A commercial client hired me to design their brand logo and promotional 3D motion video. I delivered the final renders, but they stopped replying and have not paid the remaining ₹45,000 invoice. They are already running Instagram ads with my video. Who owns the copyright, and how do I send a Cease & Desist?"
    },
    {
        id: 'software-gpl',
        domain: 'software',
        icon: Code,
        title: 'Commercial SaaS with GPL & MIT Code',
        description: 'Selling proprietary software incorporating open-source libraries.',
        prompt: "We are launching a commercial B2B SaaS web application in India. Our frontend uses MIT libraries, but our backend uses a module licensed under GNU GPL v3. Do we have to make our entire proprietary SaaS source code public?"
    },
    {
        id: 'online-gaming-rules',
        domain: 'games',
        icon: Layers,
        title: 'Online Real-Money & Skill Gaming in India',
        description: 'Launching a fantasy card esports game with entry fees under IT Rules 2023.',
        prompt: "I want to publish a mobile card esports game where Indian players pay ₹50 to enter a tournament and winners get cash prizes. Does this violate the Public Gambling Act, and what do the 2023 Online Gaming Rules require for Self-Regulatory Bodies (SRBs)?"
    },
    {
        id: 'brand-cloning',
        domain: 'freelance',
        icon: Lock,
        title: 'Competitor Cloning Logo & Website UI',
        description: 'A competitor copied brand typography, website layout, and packaging.',
        prompt: "A competitor in our city copied our brand logo font, identical color palette, and cloned our website layout. We haven't received a registered trademark certificate yet. Can we take them down under passing-off or copyright infringement?"
    }
];

const DOMAINS = [
    { id: 'all', label: 'All Domains' },
    { id: 'games', label: '🎮 Video Games', icon: Gamepad2 },
    { id: 'streaming', label: '🎬 YouTube & Media', icon: Film },
    { id: 'freelance', label: '🎨 Freelance & IP', icon: Scale },
    { id: 'software', label: '💻 Software & Code', icon: Code },
];

const CHEAT_SHEET_DATA = [
    {
        topic: 'Music Rights in Media',
        badge: 'Sync vs Master',
        desc: 'Music has TWO separate copyrights: The Musical Composition (held by songwriter/publisher, requiring a Synchronization License) and the Sound Recording (held by record label, requiring a Master Rights License). You need BOTH to legally play a recorded pop/anime song in a video or game.'
    },
    {
        topic: 'Fair Dealing (India) vs Fair Use (US)',
        badge: 'Section 52 Limit',
        desc: 'Unlike US broad 4-factor "Fair Use", Indian law (Section 52, Copyright Act 1957) is strictly enumerated: Only covers private/personal research, criticism/review of that work, and reporting of current events. Adding music just for mood or background is NEVER fair dealing in India.'
    },
    {
        topic: 'Freelance Copyright Rule',
        badge: 'Section 17 & 19',
        desc: 'Under Indian law, an independent contractor or freelancer is the first owner of copyright. Copyright NEVER automatically transfers to the client until a written assignment is signed AND agreed payment consideration is fulfilled.'
    },
    {
        topic: 'Open Source Copyleft',
        badge: 'GPL vs MIT',
        desc: 'MIT and Apache 2.0 are permissive: you can keep your derivative code closed-source. GNU GPL v2/v3 is "viral/copyleft": if you distribute binary software containing GPL code, your entire derivative work must be licensed under GPL and source code made available.'
    },
    {
        topic: 'Game Engine Royalties',
        badge: 'Unreal vs Unity',
        desc: 'Unreal Engine 5 charges 0% until your game surpasses $1,000,000 USD gross lifetime revenue (then 5%). Godot Engine is 100% free under MIT. Always audit your asset store purchases for "Editorial Use" restrictions.'
    }
];

const DigitalRightsAdvisorPage = () => {
    const [query, setQuery] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('all');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [copiedNotice, setCopiedNotice] = useState(false);
    const [copiedSummary, setCopiedSummary] = useState(false);
    const [showCheatSheet, setShowCheatSheet] = useState(false);

    const handleAnalyze = async (textToAnalyze = query, domainToUse = selectedDomain) => {
        const text = textToAnalyze.trim();
        if (!text || text.length < 5) {
            setError('Please describe your case or scenario (at least 5 characters).');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const res = await axios.post(`${API_URL}/api/ip-advisor`, {
                query: text,
                domain: domainToUse
            });

            if (res.data) {
                setResult(res.data);
                // Scroll smoothly to results
                setTimeout(() => {
                    const el = document.getElementById('results-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        } catch (err) {
            console.error('IP Advisor request failed:', err);
            setError(err.response?.data?.error || 'Unable to connect to the IP Advisor. Please check your network or try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPreset = (preset) => {
        setQuery(preset.prompt);
        setSelectedDomain(preset.domain);
        handleAnalyze(preset.prompt, preset.domain);
    };

    const copyToClipboard = (text, setFlag) => {
        navigator.clipboard.writeText(text);
        setFlag(true);
        setTimeout(() => setFlag(false), 2500);
    };

    const getRiskBadge = (level) => {
        switch ((level || '').toLowerCase()) {
            case 'low':
                return {
                    bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    bar: 'bg-emerald-500',
                    icon: CheckCircle2,
                    label: 'Low Legal Risk (Safe with Standard Terms)'
                };
            case 'moderate':
            case 'medium':
                return {
                    bg: 'bg-amber-50 text-amber-800 border-amber-200',
                    bar: 'bg-amber-500',
                    icon: AlertTriangle,
                    label: 'Moderate Risk (Specific License / Terms Required)'
                };
            case 'high':
            case 'critical':
            default:
                return {
                    bg: 'bg-red-50 text-red-800 border-red-200',
                    bar: 'bg-red-500',
                    icon: ShieldAlert,
                    label: 'High Legal Risk (Infringement / Strike Danger)'
                };
        }
    };

    return (
        <div className="py-12 md:py-16 animate-fade-in-up">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-[var(--color-accent-dark)] border border-amber-300/60 text-xs font-ui font-semibold mb-4 tracking-wide shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)] animate-pulse" />
                    NEW: AI INTELLECTUAL PROPERTY & DIGITAL MEDIA ADVISOR
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-ink)] mb-4 leading-tight">
                    Check Any Copyright, Game, or Digital Media Case
                </h1>
                <p className="text-[var(--color-ink-muted)] text-base md:text-lg font-body leading-relaxed">
                    Ask in plain words — Adhikar.ai matches your scenario against Indian & International IP law,
                    identifies required licenses, flags legal risks, and drafts ready-to-use demand notices.
                </p>

                {/* Quick Toggle Cheat Sheet */}
                <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                        onClick={() => setShowCheatSheet(!showCheatSheet)}
                        className="inline-flex items-center gap-1.5 text-xs font-ui font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors underline underline-offset-4"
                    >
                        <BookOpen className="w-3.5 h-3.5" />
                        {showCheatSheet ? 'Hide Licensing Cheat Sheet' : 'Quick Reference: Licensing & Fair Dealing Matrix'}
                    </button>
                </div>
            </div>

            {/* Collapsible Cheat Sheet */}
            {showCheatSheet && (
                <div className="max-w-4xl mx-auto mb-10 p-6 paper-card border border-amber-300/60 bg-amber-50/40 rounded-xl animate-fade-in">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-200">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-[var(--color-accent)]" />
                            <h3 className="font-display font-bold text-sm text-[var(--color-ink)]">
                                Digital Creator & Game Developer Legal Blueprint
                            </h3>
                        </div>
                        <span className="text-[11px] font-ui text-[var(--color-ink-muted)]">Citing Copyright Act 1957</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {CHEAT_SHEET_DATA.map((item, idx) => (
                            <div key={idx} className="p-3 bg-white/80 rounded-lg border border-amber-100 shadow-xs">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="font-display font-semibold text-xs text-[var(--color-ink)]">{item.topic}</span>
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-ui font-medium bg-amber-100 text-amber-800">{item.badge}</span>
                                </div>
                                <p className="text-xs text-[var(--color-ink-muted)] font-body leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Interactive Form Card */}
            <div className="max-w-4xl mx-auto paper-card p-6 md:p-8 shadow-md rounded-2xl mb-12">
                {/* Domain Selector */}
                <div className="mb-5">
                    <label className="block text-xs font-ui font-semibold text-[var(--color-ink-light)] uppercase tracking-wider mb-2.5">
                        Select Scenario Category:
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {DOMAINS.map(d => (
                            <button
                                key={d.id}
                                onClick={() => setSelectedDomain(d.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-ui font-medium transition-all flex items-center gap-1.5 ${
                                    selectedDomain === d.id
                                        ? 'bg-[var(--color-accent)] text-white shadow-xs'
                                        : 'bg-[var(--color-surface-warm)] text-[var(--color-ink-light)] hover:bg-[var(--color-border-light)] border border-[var(--color-border)]'
                                }`}
                            >
                                {d.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Case Input Area */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-ui font-semibold text-[var(--color-ink-light)] uppercase tracking-wider">
                            Describe Your Case or Scenario in Plain Language:
                        </label>
                        <span className="text-[11px] font-ui text-[var(--color-ink-faint)]">
                            {query.length} characters
                        </span>
                    </div>
                    <div className="relative">
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAnalyze();
                                }
                            }}
                            rows={5}
                            placeholder="Example: I'm developing a game on Steam and bought 3D assets from an online store. I also want to use an anime soundtrack for the boss fight. Do I need a license? Will I get taken down or sued?"
                            className="w-full p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] font-body text-sm md:text-base focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all placeholder:text-[var(--color-ink-faint)]"
                        />
                    </div>
                    <p className="text-[11px] text-[var(--color-ink-faint)] font-ui mt-1.5 flex items-center gap-1">
                        <Info className="w-3 h-3" /> Tip: Press <kbd className="px-1 py-0.5 rounded bg-stone-200 text-stone-700 text-[10px]">Ctrl + Enter</kbd> to analyze immediately.
                    </p>
                </div>

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[var(--color-border-light)]">
                    <span className="text-xs text-[var(--color-ink-muted)] font-ui">
                        ⚖ Free legal scenario evaluation citing 500+ Indian laws.
                    </span>
                    <button
                        onClick={() => handleAnalyze()}
                        disabled={loading || !query.trim()}
                        className="w-full sm:w-auto btn-primary px-7 py-3 font-ui text-sm flex items-center justify-center gap-2 font-semibold shadow-sm hover:shadow transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Analyzing Case Law...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" /> Analyze Legal Rights & Licenses
                            </>
                        )}
                    </button>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mt-4 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-ui flex items-center gap-2 animate-fade-in">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-600" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Preset Chips */}
                <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-1.5 mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                        <span className="text-xs font-ui font-semibold text-[var(--color-ink-light)] uppercase tracking-wider">
                            Or Test Real-World Scenarios:
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {PRESET_SCENARIOS.map((preset) => {
                            const IconComponent = preset.icon;
                            return (
                                <button
                                    key={preset.id}
                                    onClick={() => handleSelectPreset(preset)}
                                    className="p-3 text-left rounded-xl bg-[var(--color-surface-warm)] hover:bg-[var(--color-paper)] border border-[var(--color-border)] hover:border-[var(--color-accent-light)] transition-all group flex items-start gap-2.5 cursor-pointer shadow-2xs hover:shadow-sm"
                                >
                                    <div className="p-1.5 rounded-lg bg-amber-100/70 text-[var(--color-accent-dark)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors mt-0.5 flex-shrink-0">
                                        <IconComponent className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-display font-bold text-xs text-[var(--color-ink)] group-hover:text-[var(--color-accent-dark)] transition-colors truncate">
                                            {preset.title}
                                        </p>
                                        <p className="text-[11px] text-[var(--color-ink-muted)] font-ui line-clamp-1 mt-0.5">
                                            {preset.description}
                                        </p>
                                    </div>
                                    <ArrowRight className="w-3 h-3 text-[var(--color-ink-faint)] group-hover:text-[var(--color-accent)] transition-colors mt-1" />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <div id="results-section" className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                    {/* Executive Summary Card */}
                    {(() => {
                        const risk = getRiskBadge(result.riskLevel);
                        const RiskIcon = risk.icon;
                        return (
                            <div className="paper-card p-6 md:p-8 rounded-2xl border-2 border-[var(--color-border)] relative overflow-hidden shadow-lg">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[var(--color-border-light)]">
                                    <div>
                                        <span className="text-xs font-ui font-semibold text-[var(--color-accent)] uppercase tracking-wider block mb-1">
                                            Legal Assessment & Verdict
                                        </span>
                                        <h2 className="text-xl md:text-2xl font-display font-bold text-[var(--color-ink)]">
                                            Executive Legal Verdict
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`px-3.5 py-1.5 rounded-full border text-xs font-ui font-semibold flex items-center gap-1.5 ${risk.bg}`}>
                                            <RiskIcon className="w-4 h-4" />
                                            <span>{risk.label}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 space-y-4">
                                    <div className="p-4 rounded-xl bg-[var(--color-surface-warm)] border border-[var(--color-border-light)]">
                                        <p className="font-display font-semibold text-base text-[var(--color-ink)] leading-relaxed">
                                            ⚖ {result.verdict}
                                        </p>
                                        <p className="text-sm text-[var(--color-ink-muted)] font-body mt-2 leading-relaxed">
                                            {result.summary}
                                        </p>
                                    </div>

                                    {/* Risk Bar */}
                                    {result.riskScore !== undefined && (
                                        <div className="pt-2">
                                            <div className="flex justify-between text-xs font-ui text-[var(--color-ink-muted)] mb-1">
                                                <span>Calculated Infringement / Compliance Exposure</span>
                                                <span className="font-semibold text-[var(--color-ink)]">{result.riskScore}%</span>
                                            </div>
                                            <div className="w-full h-2.5 rounded-full bg-[var(--color-border)] overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-700 ${risk.bar}`}
                                                    style={{ width: `${result.riskScore}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })()}

                    {/* Applicable Laws & Statutes */}
                    <div className="paper-card p-6 md:p-8 rounded-2xl shadow-md">
                        <div className="flex items-center gap-2 mb-5">
                            <Scale className="w-5 h-5 text-[var(--color-accent)]" />
                            <h3 className="text-lg md:text-xl font-display font-bold text-[var(--color-ink)]">
                                Applicable Indian Statutes & Sections
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {result.applicableLaws?.map((law, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-[var(--color-surface-warm)] border border-[var(--color-border-light)] hover:border-[var(--color-accent-light)] transition-all">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                        <span className="font-display font-bold text-sm md:text-base text-[var(--color-ink)]">
                                            {law.act}
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-md text-xs font-ui font-semibold bg-amber-100 text-[var(--color-accent-dark)] border border-amber-200/80 w-fit">
                                            {law.sections}
                                        </span>
                                    </div>
                                    <p className="font-ui font-semibold text-xs text-[var(--color-accent)] mb-1">
                                        {law.title}
                                    </p>
                                    <p className="text-sm text-[var(--color-ink-muted)] font-body leading-relaxed">
                                        {law.explanation}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Licenses & Authorizations Needed */}
                    {result.licensesRequired && result.licensesRequired.length > 0 && (
                        <div className="paper-card p-6 md:p-8 rounded-2xl shadow-md">
                            <div className="flex items-center gap-2 mb-5">
                                <Lock className="w-5 h-5 text-[var(--color-accent)]" />
                                <h3 className="text-lg md:text-xl font-display font-bold text-[var(--color-ink)]">
                                    Required Licenses & Clearances
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {result.licensesRequired.map((lic, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-[var(--color-surface-warm)] border border-[var(--color-border-light)] flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <span className="font-display font-bold text-sm text-[var(--color-ink)]">{lic.name}</span>
                                                <span className="px-2 py-0.5 rounded text-[10px] font-ui font-semibold bg-stone-100 text-stone-700 border border-stone-200">{lic.type}</span>
                                            </div>
                                            <p className="text-xs text-[var(--color-ink-muted)] font-body leading-relaxed mb-3">
                                                <strong>How to obtain:</strong> {lic.howToObtain}
                                            </p>
                                        </div>
                                        <div className="pt-2 border-t border-[var(--color-border-light)] flex items-center justify-between text-[11px] font-ui text-[var(--color-ink-faint)]">
                                            <span>Complexity: <strong>{lic.estimatedComplexity}</strong></span>
                                            <span>Cost: <strong>{lic.typicalCost}</strong></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step-by-Step Playbook + Do's & Don'ts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Playbook */}
                        <div className="paper-card p-6 rounded-2xl shadow-md">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)]" />
                                <h3 className="text-base font-display font-bold text-[var(--color-ink)]">
                                    Actionable Step-by-Step Playbook
                                </h3>
                            </div>
                            <ul className="space-y-3 font-ui text-xs text-[var(--color-ink-light)] leading-relaxed">
                                {result.actionSteps?.map((step, idx) => (
                                    <li key={idx} className="p-2.5 rounded-lg bg-[var(--color-surface-warm)] border border-[var(--color-border-light)]">
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Do's and Don'ts */}
                        <div className="paper-card p-6 rounded-2xl shadow-md">
                            <div className="flex items-center gap-2 mb-4">
                                <Layers className="w-5 h-5 text-[var(--color-accent)]" />
                                <h3 className="text-base font-display font-bold text-[var(--color-ink)]">
                                    Key Do's & Don'ts Checklist
                                </h3>
                            </div>
                            <div className="space-y-3 text-xs font-ui">
                                {result.dosAndDonts?.dos?.map((item, idx) => (
                                    <div key={idx} className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/80 text-emerald-900 flex items-start gap-2">
                                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                                {result.dosAndDonts?.donts?.map((item, idx) => (
                                    <div key={idx} className="p-2 rounded-lg bg-red-50/60 border border-red-200/80 text-red-900 flex items-start gap-2">
                                        <AlertTriangle className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Ready-to-Send Legal Notice / Cease & Desist Template */}
                    {result.noticeTemplate && (
                        <div className="paper-card p-6 md:p-8 rounded-2xl shadow-md border border-[var(--color-accent-light)]">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[var(--color-border-light)]">
                                <div>
                                    <span className="text-xs font-ui font-semibold text-[var(--color-accent)] uppercase tracking-wider block">
                                        Customized Legal Document Draft
                                    </span>
                                    <h3 className="text-lg font-display font-bold text-[var(--color-ink)]">
                                        Ready-to-Send Legal Notice / Cease & Desist
                                    </h3>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(result.noticeTemplate, setCopiedNotice)}
                                    className="btn-primary !py-2 !px-4 text-xs font-ui flex items-center gap-1.5 self-start sm:self-auto"
                                >
                                    {copiedNotice ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copiedNotice ? 'Copied to Clipboard!' : 'Copy Notice Text'}
                                </button>
                            </div>
                            <div className="p-4 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed max-h-96 whitespace-pre-wrap select-all">
                                {result.noticeTemplate}
                            </div>
                            <p className="text-[11px] text-[var(--color-ink-faint)] font-ui mt-3">
                                ⚖ Fill in your bracketed details (names, dates, URLs) before sending via registered post or platform grievance email.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DigitalRightsAdvisorPage;

