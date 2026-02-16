import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Shield, FileText, Zap, Database, Brain } from 'lucide-react';

const SolutionsPage = () => (
    <div className="py-16 animate-fade-in-up">
        <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-ink)] mb-4">Our Solutions</h1>
            <p className="text-[var(--color-ink-muted)] max-w-2xl mx-auto font-body">
                Adhikar.ai combines artificial intelligence with Indian legal expertise to give you the tools for justice.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
                { icon: <Brain className="w-7 h-7 text-[var(--color-accent)]" />, title: "AI Case Analysis", desc: "Describe your issue in plain language. Our AI identifies legal violations, applicable acts, and specific sections within seconds." },
                { icon: <FileText className="w-7 h-7 text-[var(--color-amber)]" />, title: "Legal Notice Drafting", desc: "Generate professionally formatted legal notices ready for dispatch. Each draft follows established Indian legal notice conventions." },
                { icon: <Shield className="w-7 h-7 text-[var(--color-green)]" />, title: "Evidence Vault", desc: "Upload and securely store evidence related to your case. All files are linked to your case record for future reference." },
                { icon: <Database className="w-7 h-7 text-[var(--color-blue)]" />, title: "Legal Database", desc: "Access a comprehensive database of 20+ Indian acts and their key sections — from consumer rights to criminal law." },
                { icon: <Scale className="w-7 h-7 text-[var(--color-red)]" />, title: "Case Record Storage", desc: "Every analysis and draft is saved securely with a unique case ID, creating a legal audit trail for your protection." },
                { icon: <Zap className="w-7 h-7 text-[var(--color-accent-light)]" />, title: "Instant PDF Export", desc: "Download your legal notice as a professionally formatted PDF document, ready for printing and registered post." },
            ].map((item, i) => (
                <div key={i} className="paper-card p-7 hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-parchment)] border border-[var(--color-border)]">
                        {item.icon}
                    </div>
                    <h3 className="text-lg font-display font-bold text-[var(--color-ink)] mb-2">{item.title}</h3>
                    <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed font-body">{item.desc}</p>
                </div>
            ))}
        </div>

        <div className="text-center mt-14">
            <Link to="/upload" className="btn-primary px-8 py-3 font-ui inline-block">Start Your Claim →</Link>
        </div>
    </div>
);

export default SolutionsPage;
