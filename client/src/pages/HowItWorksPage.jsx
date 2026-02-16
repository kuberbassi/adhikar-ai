import React from 'react';
import { FileCheck, BookOpen, Send, Shield, Scale, Zap } from 'lucide-react';

const HowItWorksPage = () => (
    <div className="py-16 animate-fade-in-up">
        <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-ink)] mb-4">How Adhikar.ai Works</h1>
            <p className="text-[var(--color-ink-muted)] max-w-2xl mx-auto font-body">
                From your complaint to a court-ready legal notice in three simple steps.
            </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
            {[
                { step: "01", icon: <FileCheck className="w-7 h-7 text-[var(--color-accent)]" />, title: "Describe Your Issue", desc: "Tell us what happened in plain language. No legal jargon needed. Simply explain the situation — what went wrong, who is responsible, and what you want resolved. Optionally upload evidence like receipts, photos, or contracts." },
                { step: "02", icon: <BookOpen className="w-7 h-7 text-[var(--color-amber)]" />, title: "AI Analyzes Your Case", desc: "Our AI engine, powered by Llama 3.3 70B, analyzes your complaint against a comprehensive database of 20+ Indian legal acts. It identifies the specific violation, applicable law, relevant section, and severity. The analysis typically completes in under 10 seconds." },
                { step: "03", icon: <Send className="w-7 h-7 text-[var(--color-green)]" />, title: "Receive Your Legal Notice", desc: "A professionally drafted legal notice is generated following established Indian legal conventions. Review it, edit if needed, and download as a PDF. Send it via registered post to the opposing party. The 15-day legal notice period begins from receipt." },
            ].map((item, i) => (
                <div key={i} className="paper-card p-8 flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl paper-card-warm flex items-center justify-center paper-shadow">
                            {item.icon}
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-ui font-bold text-[var(--color-accent)] tracking-widest uppercase">Step {item.step}</span>
                        <h3 className="text-xl font-display font-bold text-[var(--color-ink)] mt-1 mb-2">{item.title}</h3>
                        <p className="text-sm text-[var(--color-ink-light)] leading-relaxed font-body">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16 paper-card p-8">
            <h3 className="text-xl font-display font-bold text-[var(--color-ink)] mb-6 text-center">What Makes Us Different</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: <Zap className="w-5 h-5 text-[var(--color-amber)]" />, title: "Speed", desc: "Analysis in seconds, not days" },
                    { icon: <Shield className="w-5 h-5 text-[var(--color-green)]" />, title: "Security", desc: "Every case record stored securely" },
                    { icon: <Scale className="w-5 h-5 text-[var(--color-accent)]" />, title: "Accuracy", desc: "Validated against 20+ Indian acts" },
                ].map((item, i) => (
                    <div key={i} className="text-center">
                        <div className="mx-auto mb-3 w-10 h-10 rounded-xl bg-[var(--color-parchment)] border border-[var(--color-border)] flex items-center justify-center">{item.icon}</div>
                        <h4 className="font-display font-bold text-[var(--color-ink)] text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-[var(--color-ink-muted)] font-body">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default HowItWorksPage;
