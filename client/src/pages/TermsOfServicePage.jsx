import React from 'react';
import { FileText, AlertTriangle, CheckCircle, Ban, Scale, Globe, CreditCard, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfServicePage = () => {
    return (
        <div className="py-20 px-6 max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white">Terms of Service</h1>
                        <p className="text-slate-500 text-sm">Last updated: February 11, 2026</p>
                    </div>
                </div>

                <div className="glass gradient-border rounded-3xl p-8 md:p-12 space-y-10">
                    {/* Important Notice */}
                    <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                            <span className="text-amber-400 font-bold text-sm">Important Disclaimer</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Adhikar.ai is an AI-powered legal assistance tool. It is <strong>not a substitute</strong> for professional legal advice from a qualified lawyer.
                            All generated documents should be reviewed by a legal professional before being sent or filed.
                        </p>
                    </div>

                    <Section
                        icon={<CheckCircle className="w-5 h-5 text-green-400" />}
                        title="1. Acceptance of Terms"
                    >
                        <p>
                            By accessing or using Adhikar.ai ("the Service"), you agree to be bound by these Terms of Service.
                            If you do not agree to these terms, you must not use the Service. These terms apply to all users,
                            visitors, and others who access the Service.
                        </p>
                    </Section>

                    <Section
                        icon={<Scale className="w-5 h-5 text-blue-400" />}
                        title="2. Description of Service"
                    >
                        <p>Adhikar.ai provides the following services:</p>
                        <ul className="list-disc ml-6 space-y-2 mt-3">
                            <li>AI-powered analysis of legal disputes based on user-provided information</li>
                            <li>Automated generation of legal notice drafts referencing Indian laws and statutes</li>
                            <li>Access to a searchable database of Indian legal acts and sections</li>
                            <li>Tools for downloading and sharing generated legal notices</li>
                        </ul>
                        <p className="mt-3">
                            The Service uses artificial intelligence to analyze text inputs and generate legal documents.
                            The accuracy of outputs depends on the quality and completeness of information provided by the user.
                        </p>
                    </Section>

                    <Section
                        icon={<Globe className="w-5 h-5 text-cyan-400" />}
                        title="3. User Obligations"
                    >
                        <p>As a user of Adhikar.ai, you agree to:</p>
                        <ul className="list-disc ml-6 space-y-2 mt-3">
                            <li>Provide accurate, truthful, and complete information when using the Service</li>
                            <li>Use the Service only for lawful purposes and legitimate legal disputes</li>
                            <li>Not use the Service to generate false, fraudulent, or malicious legal notices</li>
                            <li>Not attempt to reverse-engineer, decompile, or exploit the AI system</li>
                            <li>Not use automated bots or scripts to access the Service</li>
                            <li>Comply with all applicable local, state, and national laws</li>
                        </ul>
                    </Section>

                    <Section
                        icon={<Ban className="w-5 h-5 text-red-400" />}
                        title="4. Limitation of Liability"
                    >
                        <p>
                            To the maximum extent permitted by law:
                        </p>
                        <ul className="list-disc ml-6 space-y-2 mt-3">
                            <li>Adhikar.ai provides the Service on an <strong>"as-is"</strong> and <strong>"as-available"</strong> basis without any warranties</li>
                            <li>We do not guarantee the legal accuracy, completeness, or suitability of AI-generated content</li>
                            <li>We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of the Service</li>
                            <li>Users are solely responsible for reviewing and verifying all generated legal documents before use</li>
                            <li>Our total liability shall not exceed the amount paid by you, if any, in the 12 months preceding the claim</li>
                        </ul>
                    </Section>

                    <Section
                        icon={<FileText className="w-5 h-5 text-indigo-400" />}
                        title="5. Intellectual Property"
                    >
                        <p>
                            All content, features, and functionality of the Service — including but not limited to text, graphics,
                            logos, icons, AI models, and software — are the exclusive property of Adhikar.ai and are protected
                            by Indian and international copyright, trademark, and other intellectual property laws.
                        </p>
                        <p className="mt-3">
                            Legal notices generated through the Service are owned by the user who created them.
                            However, Adhikar.ai retains the right to use anonymized, aggregated data to improve the Service.
                        </p>
                    </Section>

                    <Section
                        icon={<CreditCard className="w-5 h-5 text-green-400" />}
                        title="6. Pricing & Payments"
                    >
                        <p>
                            Adhikar.ai offers both free and paid tiers. By subscribing to a paid plan:
                        </p>
                        <ul className="list-disc ml-6 space-y-2 mt-3">
                            <li>You authorize us to charge the applicable subscription fees to your payment method</li>
                            <li>Subscriptions auto-renew unless cancelled before the renewal date</li>
                            <li>Refunds are available within 7 days of purchase if no notices have been generated</li>
                            <li>We reserve the right to modify pricing with 30 days' advance notice</li>
                        </ul>
                    </Section>

                    <Section
                        icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
                        title="7. Termination"
                    >
                        <p>
                            We may suspend or terminate your access to the Service at any time, without prior notice, if:
                        </p>
                        <ul className="list-disc ml-6 space-y-2 mt-3">
                            <li>You violate these Terms of Service</li>
                            <li>You use the Service for unlawful, fraudulent, or abusive purposes</li>
                            <li>We are required to do so by law</li>
                        </ul>
                        <p className="mt-3">
                            Upon termination, your right to use the Service will immediately cease. Provisions that by their nature
                            should survive termination will survive.
                        </p>
                    </Section>

                    <Section
                        icon={<Scale className="w-5 h-5 text-blue-400" />}
                        title="8. Governing Law"
                    >
                        <p>
                            These Terms are governed by and construed in accordance with the laws of India.
                            Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
                        </p>
                    </Section>

                    <Section
                        icon={<Mail className="w-5 h-5 text-cyan-400" />}
                        title="9. Contact"
                    >
                        <p>For questions about these Terms, please contact:</p>
                        <div className="mt-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-white font-semibold">Adhikar.ai Legal Team</p>
                            <p className="text-slate-400 text-sm">Email: legal@adhikar.ai</p>
                            <p className="text-slate-400 text-sm">Address: New Delhi, India</p>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
};

const Section = ({ icon, title, children }) => (
    <div>
        <div className="flex items-center gap-2.5 mb-4">
            {icon}
            <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <div className="text-slate-400 text-sm leading-relaxed">
            {children}
        </div>
    </div>
);

export default TermsOfServicePage;
