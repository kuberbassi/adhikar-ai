import React from 'react';
import { Shield, Lock, Eye, Trash2, Server, Share2, Bell, Globe } from 'lucide-react';

const PrivacyPolicyPage = () => (
    <div className="py-16 animate-fade-in-up max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-ink)] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[var(--color-ink-faint)] font-ui mb-10">Last updated: 17 February 2026</p>

        <div className="space-y-8 font-body text-[var(--color-ink-light)] leading-relaxed text-sm">
            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[var(--color-accent)]" /> Overview
                </h2>
                <p>Adhikar.ai ("the Service") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you use our AI-powered legal assistance service. By using the Service, you consent to the data practices described in this policy.</p>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[var(--color-accent)]" /> Information We Collect
                </h2>
                <p className="mb-3">We collect the following categories of information:</p>

                <h3 className="font-display font-bold text-[var(--color-ink)] mt-4 mb-2">a) Information You Provide</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Personal Details:</strong> Full name, email address, phone number, and residential address — used to populate legal notice drafts.</li>
                    <li><strong>Case Details:</strong> The complaint or issue you describe, including service/product information, date of incident, opponent details, and desired resolution.</li>
                    <li><strong>Evidence Files:</strong> Documents, photographs, or images you upload as supporting evidence. These are processed <strong>client-side</strong> (in your browser) and are not uploaded to our servers unless explicitly attached to a case record.</li>
                </ul>

                <h3 className="font-display font-bold text-[var(--color-ink)] mt-4 mb-2">b) Information Collected Automatically</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Case Records:</strong> AI-generated analyses, drafts, and reference numbers stored in Firebase for audit trail purposes.</li>
                    <li><strong>Activity Logs:</strong> Timestamps and actions (e.g., "Case analysed", "Draft generated") for your case history.</li>
                    <li><strong>Technical Data:</strong> Browser type, device information, and anonymised usage patterns to improve service quality.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[var(--color-accent)]" /> How We Use Your Data
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Case Analysis:</strong> Your complaint details are sent to Groq's AI infrastructure (Llama 3.3 70B) for legal analysis and draft generation. Groq processes this data in accordance with their privacy policy.</li>
                    <li><strong>Draft Generation:</strong> Your personal details (name, address, phone, email) are included in the AI prompt to generate personalised legal notice drafts.</li>
                    <li><strong>Case Records:</strong> Analyses, drafts, and redacted user details are stored in Google Firebase for your legal protection and to provide an audit trail.</li>
                    <li><strong>Service Improvement:</strong> Anonymised, aggregated data may be used to improve AI accuracy and service quality. We do <strong>not</strong> use your personal case details for AI model training.</li>
                    <li><strong>We do NOT sell, rent, or trade</strong> your personal data to any third party for marketing purposes.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-[var(--color-accent)]" /> Third-Party Data Sharing
                </h2>
                <p className="mb-3">Your data is shared with the following third-party services solely to provide the Service's functionality:</p>
                <div className="space-y-3">
                    <div className="paper-card p-4">
                        <p><strong>Groq Inc.</strong> — Your case description and personal details are sent to Groq's servers for AI processing. Groq operates under a zero data retention policy for API requests.</p>
                    </div>
                    <div className="paper-card p-4">
                        <p><strong>Google Firebase (Firestore)</strong> — Case records, draft content, and redacted user details are stored securely in Firebase's cloud infrastructure with encryption at rest and in transit.</p>
                    </div>
                    <div className="paper-card p-4">
                        <p><strong>Vercel</strong> — Application hosting. Vercel may collect standard web server logs (IP addresses, request timestamps).</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Server className="w-5 h-5 text-[var(--color-accent)]" /> Data Security
                </h2>
                <p className="mb-3">We implement the following security measures to protect your data:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>All data transmission is encrypted using <strong>HTTPS/TLS</strong>.</li>
                    <li>Case records are stored in Firebase with <strong>encryption at rest</strong>.</li>
                    <li>Personal details in stored records are <strong>partially redacted</strong> (e.g., phone numbers are stored for record-keeping but not displayed publicly).</li>
                    <li>Evidence files are processed <strong>client-side</strong> in your browser — they are not uploaded to our servers unless attached to a case.</li>
                    <li>API keys and credentials are stored as <strong>environment variables</strong> and are never exposed to the client.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-[var(--color-accent)]" /> Data Retention & Deletion
                </h2>
                <p className="mb-3">Case records are stored securely for your legal protection and to maintain an audit trail. Our retention practices are as follows:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Case Records:</strong> Retained for as long as needed for legal purposes or until you request deletion.</li>
                    <li><strong>AI Processing:</strong> Groq does not retain your data after processing the API request.</li>
                    <li><strong>Right to Deletion:</strong> You may request complete deletion of all your case data at any time by emailing <a href="mailto:privacy@adhikar.ai" className="text-[var(--color-accent)] hover:underline">privacy@adhikar.ai</a>. We will process deletion requests within 30 days.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[var(--color-accent)]" /> Your Rights
                </h2>
                <p className="mb-3">Under applicable Indian law, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Access</strong> the personal data we hold about you.</li>
                    <li><strong>Correct</strong> any inaccurate or incomplete data.</li>
                    <li><strong>Delete</strong> your data ("Right to Erasure").</li>
                    <li><strong>Withdraw consent</strong> for data processing at any time.</li>
                    <li><strong>Grievance redressal</strong> — raise a complaint if you believe your data has been mishandled.</li>
                </ul>
                <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:privacy@adhikar.ai" className="text-[var(--color-accent)] hover:underline">privacy@adhikar.ai</a>.</p>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[var(--color-accent)]" /> Cookies & Tracking
                </h2>
                <p>Adhikar.ai does not use cookies for advertising or tracking purposes. We may use essential cookies or local storage to maintain your session state during a case analysis workflow. No third-party advertising trackers are present on this site.</p>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3">Changes to This Policy</h2>
                <p>We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this page periodically. Continued use of the Service after changes are posted constitutes acceptance of the revised policy.</p>
            </section>

            <div className="paper-card-warm p-5">
                <p className="text-xs text-[var(--color-ink-faint)] font-ui">
                    ⚖ This Privacy Policy is governed by the laws of the Republic of India, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023. For questions, concerns, or data deletion requests, contact us at <a href="mailto:privacy@adhikar.ai" className="text-[var(--color-accent)] hover:underline">privacy@adhikar.ai</a>.
                </p>
            </div>
        </div>
    </div>
);

export default PrivacyPolicyPage;
