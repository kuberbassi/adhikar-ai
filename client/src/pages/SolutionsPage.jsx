import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Shield, FileText, Zap, Database, Brain, Gamepad2, ArrowRight } from 'lucide-react';

const SolutionsPage = () => (
    <div className="py-16 animate-fade-in-up">
        <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-ink)] mb-4">Our Solutions</h1>
            <p className="text-[var(--color-ink-muted)] max-w-2xl mx-auto font-body">
                Adhikar.ai combines state-of-the-art AI with deep Indian legal expertise to democratize justice for every citizen, creator, and business.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
                {
                    icon: <Brain className="w-7 h-7 text-[var(--color-accent)]" />,
                    title: "AI Case Analysis",
                    desc: "Describe your issue in plain language. Our AI identifies legal violations, applicable acts, and specific sections within seconds.",
                    link: "/upload",
                    btnText: "Analyze a Case"
                },
                {
                    icon: <Gamepad2 className="w-7 h-7 text-[var(--color-accent-dark)]" />,
                    title: "IP, Gaming & Digital Rights Advisor",
                    badge: "NEW",
                    desc: "Assess copyright risks, game asset store terms, YouTube/streaming fair dealing, music sync licenses, and freelance IP theft with instant Cease & Desist notices.",
                    link: "/digital-rights",
                    btnText: "Check Digital Rights"
                },
                {
                    icon: <FileText className="w-7 h-7 text-[var(--color-amber)]" />,
                    title: "Court-Ready Legal Notice Drafting",
                    desc: "Generate professionally formatted legal notices ready for dispatch. Each draft follows established Indian legal notice conventions and formats.",
                    link: "/upload",
                    btnText: "Draft Notice"
                },
                {
                    icon: <Database className="w-7 h-7 text-[var(--color-blue)]" />,
                    title: "Comprehensive Legal Database",
                    desc: "Access a verified database of 55+ Indian acts and 420+ key sections — including constitutional law, copyright, consumer protection, and cyber regulations.",
                    link: "/legal-database",
                    btnText: "Browse 55+ Acts"
                },
                {
                    icon: <Shield className="w-7 h-7 text-[var(--color-green)]" />,
                    title: "Evidence Vault & Case Records",
                    desc: "Attach receipts, agreements, and screenshots. Every analysis is saved securely with a unique case ID, creating a verified legal audit trail.",
                    link: "/upload",
                    btnText: "Start a Claim"
                },
                {
                    icon: <Zap className="w-7 h-7 text-[var(--color-accent-light)]" />,
                    title: "Instant PDF Export & Filing",
                    desc: "Download your legal notice as a professionally formatted PDF document, formatted for printing, registered post, or digital grievance submission.",
                    link: "/upload",
                    btnText: "Export Notice"
                },
            ].map((item, i) => (
                <div key={i} className="paper-card p-7 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-parchment)] border border-[var(--color-border)]">
                                {item.icon}
                            </div>
                            {item.badge && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-ui font-bold bg-amber-200 text-amber-900 border border-amber-300">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-display font-bold text-[var(--color-ink)] mb-2">{item.title}</h3>
                        <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed font-body mb-5">{item.desc}</p>
                    </div>
                    <Link
                        to={item.link}
                        className="inline-flex items-center gap-1.5 text-xs font-ui font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
                    >
                        {item.btnText} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            ))}
        </div>

        <div className="text-center mt-14 flex items-center justify-center gap-4 flex-wrap">
            <Link to="/upload" className="btn-primary px-8 py-3 font-ui inline-block">Start Your Claim →</Link>
            <Link to="/digital-rights" className="btn-quiet px-8 py-3 font-ui inline-block">Explore IP & Gaming Advisor</Link>
        </div>
    </div>
);

export default SolutionsPage;
