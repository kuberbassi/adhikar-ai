import React from 'react';
import { Scale, AlertTriangle } from 'lucide-react';

const TermsOfServicePage = () => (
    <div className="py-16 animate-fade-in-up max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-ink)] mb-2">Terms of Service</h1>
        <p className="text-sm text-[var(--color-ink-faint)] font-ui mb-10">Last updated: February 2026</p>

        <div className="space-y-8 font-body text-[var(--color-ink-light)] leading-relaxed text-sm">
            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3">1. Acceptance of Terms</h2>
                <p>By accessing and using Adhikar.ai, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.</p>
            </section>

            <section className="paper-card p-5 border-l-4 border-l-[var(--color-amber)]">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[var(--color-amber)] flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-display font-bold text-[var(--color-ink)] mb-1">Important Disclaimer</h3>
                        <p>Adhikar.ai is an AI-assisted legal drafting tool. It does NOT provide legal advice and is NOT a substitute for consultation with a qualified legal professional. All generated documents should be reviewed by a licensed advocate before use.</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3">2. Service Description</h2>
                <p>Adhikar.ai provides AI-powered case analysis and legal notice drafting services for Indian legal matters. Our AI analyzes user-provided complaints, identifies applicable laws, and generates draft legal notices.</p>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3">3. No Attorney-Client Relationship</h2>
                <p>Use of Adhikar.ai does not create an attorney-client relationship. The service is an informational tool designed to assist users in understanding their legal rights and generating preliminary legal documents.</p>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3">4. User Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Provide accurate and truthful information about your case.</li>
                    <li>Review all generated documents with a qualified legal professional before use.</li>
                    <li>Do not use the service for frivolous, malicious, or fraudulent claims.</li>
                    <li>Comply with all applicable Indian laws related to legal notices.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3">5. Limitation of Liability</h2>
                <p>Adhikar.ai shall not be liable for any damages arising from the use of AI-generated content. Users acknowledge that AI may occasionally produce inaccurate or incomplete information and accept sole responsibility for verifying all content before use.</p>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3">6. Data Storage</h2>
                <p>Case records are stored securely for legal protection purposes. By using the service, you consent to the storage of your case data as described in our <a href="/privacy" className="text-[var(--color-accent)] hover:underline">Privacy Policy</a>.</p>
            </section>

            <div className="paper-card-warm p-5">
                <p className="text-xs text-[var(--color-ink-faint)] font-ui">
                    ⚖ These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of Indian courts.
                </p>
            </div>
        </div>
    </div>
);

export default TermsOfServicePage;
