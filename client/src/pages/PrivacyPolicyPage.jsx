import React from 'react';
import { Shield, Lock, Eye, Trash2 } from 'lucide-react';

const PrivacyPolicyPage = () => (
    <div className="py-16 animate-fade-in-up max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-ink)] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[var(--color-ink-faint)] font-ui mb-10">Last updated: February 2026</p>

        <div className="space-y-8 font-body text-[var(--color-ink-light)] leading-relaxed text-sm">
            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[var(--color-accent)]" /> Overview
                </h2>
                <p>Adhikar.ai is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our AI legal assistance service.</p>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[var(--color-accent)]" /> Information We Collect
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Case Details:</strong> The complaint or issue you describe for legal analysis.</li>
                    <li><strong>Contact Information:</strong> Name, email, phone, and address you provide for the legal notice.</li>
                    <li><strong>Evidence Files:</strong> Documents or images you upload (processed client-side).</li>
                    <li><strong>Usage Data:</strong> Anonymized analytics about how you interact with the service.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[var(--color-accent)]" /> How We Use Your Data
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>To analyze your case and generate legal notices using AI.</li>
                    <li>To store case records for your legal protection and audit trail.</li>
                    <li>To improve our AI models and service quality (anonymized data only).</li>
                    <li>We do NOT sell your personal data to third parties.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-[var(--color-accent)]" /> Data Retention & Deletion
                </h2>
                <p>Case records are stored securely for your legal protection. You may request deletion of your data at any time by contacting us at <a href="mailto:privacy@adhikar.ai" className="text-[var(--color-accent)] hover:underline">privacy@adhikar.ai</a>.</p>
            </section>

            <div className="paper-card-warm p-5">
                <p className="text-xs text-[var(--color-ink-faint)] font-ui">
                    ⚖ For questions about this privacy policy, contact us at privacy@adhikar.ai. This policy is subject to change; updates will be posted on this page.
                </p>
            </div>
        </div>
    </div>
);

export default PrivacyPolicyPage;
