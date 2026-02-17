import React from 'react';
import { Scale, AlertTriangle, FileText, ShieldCheck, Users, Ban, Gavel } from 'lucide-react';

const TermsOfServicePage = () => (
    <div className="py-16 animate-fade-in-up max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-ink)] mb-2">Terms of Service</h1>
        <p className="text-sm text-[var(--color-ink-faint)] font-ui mb-10">Last updated: 17 February 2026</p>

        <div className="space-y-8 font-body text-[var(--color-ink-light)] leading-relaxed text-sm">
            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[var(--color-accent)]" /> 1. Acceptance of Terms
                </h2>
                <p>By accessing and using Adhikar.ai ("the Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must discontinue use of the Service immediately. These terms constitute a legally binding agreement between you ("User") and Adhikar.ai ("we", "us", "our").</p>
            </section>

            <section className="paper-card p-5 border-l-4 border-l-[var(--color-amber)]">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[var(--color-amber)] flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-display font-bold text-[var(--color-ink)] mb-1">Critical Disclaimer — Please Read Carefully</h3>
                        <p>Adhikar.ai is an <strong>AI-assisted legal drafting tool</strong>. It does <strong>NOT</strong> provide legal advice, legal representation, or act as your lawyer. It is <strong>NOT</strong> a substitute for consultation with a qualified, licensed legal professional (Advocate). All AI-generated documents — including case analyses, legal notices, and recommendations — are drafting aids only and <strong>must be reviewed by a licensed advocate</strong> before being sent, filed, or relied upon in any legal proceeding.</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[var(--color-accent)]" /> 2. Service Description
                </h2>
                <p className="mb-3">Adhikar.ai provides the following AI-powered services for Indian legal matters:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Case Analysis:</strong> AI-powered identification of applicable Indian laws, relevant sections, and potential violations based on user-described complaints.</li>
                    <li><strong>Legal Notice Drafting:</strong> Automated generation of formal legal notice drafts using the Llama 3.3 70B language model via Groq inference.</li>
                    <li><strong>Evidence Attachment:</strong> Client-side processing of supporting documents (images, PDFs) for inclusion in case records.</li>
                    <li><strong>PDF Export:</strong> Generation of professionally formatted, print-ready legal notice documents.</li>
                    <li><strong>Case Record Storage:</strong> Secure storage of case records via Google Firebase for audit trail purposes.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" /> 3. No Attorney-Client Relationship
                </h2>
                <p>Use of Adhikar.ai does <strong>not</strong> create an attorney-client relationship, a solicitor-client relationship, or any form of legal representation. The Service is an informational and drafting tool designed to help users understand their legal rights under Indian law and generate preliminary legal documents. No communication through this platform is privileged or confidential in the legal sense.</p>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[var(--color-accent)]" /> 4. User Responsibilities
                </h2>
                <p className="mb-3">By using the Service, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Provide <strong>accurate, truthful, and complete</strong> information about your case and personal details.</li>
                    <li><strong>Review all generated documents</strong> with a qualified legal professional (Advocate enrolled under the Advocates Act, 1961) before sending, filing, or relying on them.</li>
                    <li>Not use the Service for <strong>frivolous, vexatious, malicious, or fraudulent</strong> claims or purposes.</li>
                    <li>Comply with all applicable Indian laws, including but not limited to the Indian Penal Code, 1860 (or Bharatiya Nyaya Sanhita, 2023), the Information Technology Act, 2000, and the Consumer Protection Act, 2019.</li>
                    <li>Not submit any content that is illegal, defamatory, threatening, or violates the rights of any third party.</li>
                    <li>Accept sole responsibility for the accuracy and legal validity of any notice you send based on AI-generated drafts.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Ban className="w-5 h-5 text-[var(--color-accent)]" /> 5. AI Limitations & Accuracy
                </h2>
                <p className="mb-3">You acknowledge and understand that:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>The AI may occasionally produce <strong>inaccurate, incomplete, or outdated</strong> legal information ("hallucinations").</li>
                    <li>AI-generated section numbers, case citations, and legal interpretations <strong>must be independently verified</strong>.</li>
                    <li>The Service is trained on publicly available legal texts and may not reflect the most recent amendments or judicial interpretations.</li>
                    <li>Confidence scores displayed by the AI are <strong>estimates</strong> and do not guarantee legal accuracy.</li>
                    <li>The AI is restricted to a curated database of Indian laws but users must verify that cited acts and sections are applicable to their specific situation.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-[var(--color-accent)]" /> 6. Limitation of Liability
                </h2>
                <p className="mb-3">To the maximum extent permitted by applicable Indian law:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Adhikar.ai shall <strong>not be liable</strong> for any direct, indirect, incidental, consequential, or punitive damages arising from the use of AI-generated content.</li>
                    <li>We are not responsible for any legal consequences, financial losses, or adverse outcomes resulting from the use of drafted notices or case analyses.</li>
                    <li>The Service is provided <strong>"as is"</strong> and <strong>"as available"</strong> without warranties of any kind, express or implied.</li>
                    <li>Users accept sole responsibility for verifying all AI-generated content before acting upon it.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3">7. Third-Party Services</h2>
                <p>The Service utilises the following third-party providers to deliver its functionality. By using Adhikar.ai, you also agree to their respective terms:</p>
                <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
                    <li><strong>Groq Inc.</strong> — AI inference (Llama 3.3 70B model) for case analysis and draft generation.</li>
                    <li><strong>Google Firebase</strong> — Secure case record storage and authentication.</li>
                    <li><strong>Vercel</strong> — Application hosting and deployment.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3">8. Intellectual Property</h2>
                <p>The Adhikar.ai name, logo, design, and underlying technology are the intellectual property of the Adhikar.ai team. AI-generated legal drafts are provided for personal use by the requesting user. You may not resell, redistribute, or commercially exploit AI-generated documents without prior written consent.</p>
            </section>

            <section>
                <h2 className="text-xl font-display font-bold text-[var(--color-ink)] mb-3">9. Modifications to Terms</h2>
                <p>We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the Service after changes are posted constitutes acceptance of the revised terms.</p>
            </section>

            <div className="paper-card-warm p-5">
                <p className="text-xs text-[var(--color-ink-faint)] font-ui">
                    ⚖ These terms are governed by the laws of the Republic of India. Any disputes arising from the use of this Service shall be subject to the exclusive jurisdiction of the courts in New Delhi, India. For questions regarding these terms, contact us at <a href="mailto:legal@adhikar.ai" className="text-[var(--color-accent)] hover:underline">legal@adhikar.ai</a>.
                </p>
            </div>
        </div>
    </div>
);

export default TermsOfServicePage;
