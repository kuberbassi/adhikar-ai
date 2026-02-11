import React from 'react';
import { Shield, Lock, Eye, Server, Trash2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
    return (
        <div className="py-20 px-6 max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white">Privacy Policy</h1>
                        <p className="text-slate-500 text-sm">Last updated: February 11, 2026</p>
                    </div>
                </div>

                <div className="glass gradient-border rounded-3xl p-8 md:p-12 space-y-10">
                    <Section
                        icon={<Eye className="w-5 h-5 text-blue-400" />}
                        title="1. Information We Collect"
                    >
                        <p>When you use Adhikar.ai, we may collect the following types of information:</p>
                        <ul className="list-disc ml-6 space-y-2 mt-3">
                            <li><strong>Personal Information:</strong> Name, email address, phone number, and postal address that you provide in the legal notice form.</li>
                            <li><strong>Case Details:</strong> Descriptions of your dispute, uploaded evidence files (images, PDFs), and opponent details.</li>
                            <li><strong>Usage Data:</strong> Pages visited, features used, and interaction patterns for improving our service.</li>
                            <li><strong>Device Information:</strong> Browser type, operating system, and IP address for security purposes.</li>
                        </ul>
                    </Section>

                    <Section
                        icon={<Lock className="w-5 h-5 text-indigo-400" />}
                        title="2. How We Use Your Information"
                    >
                        <ul className="list-disc ml-6 space-y-2">
                            <li>To perform AI-powered legal analysis of your case details</li>
                            <li>To generate personalized legal notices based on your information</li>
                            <li>To communicate with you regarding your service requests</li>
                            <li>To improve and optimize our AI models and user experience</li>
                            <li>To ensure platform security and prevent fraudulent usage</li>
                        </ul>
                    </Section>

                    <Section
                        icon={<Server className="w-5 h-5 text-cyan-400" />}
                        title="3. Data Storage & Security"
                    >
                        <p>
                            Your data is stored on secure, encrypted servers. We implement industry-standard security measures including:
                        </p>
                        <ul className="list-disc ml-6 space-y-2 mt-3">
                            <li>End-to-end encryption for all data transmission (TLS 1.3)</li>
                            <li>AES-256 encryption for stored data at rest</li>
                            <li>Regular security audits and vulnerability assessments</li>
                            <li>Access controls limiting data access to authorized personnel only</li>
                        </ul>
                        <p className="mt-3">
                            We retain your case data for a maximum of 90 days after your last session, after which it is automatically and permanently deleted.
                        </p>
                    </Section>

                    <Section
                        icon={<Trash2 className="w-5 h-5 text-red-400" />}
                        title="4. Your Rights"
                    >
                        <p>Under applicable data protection laws, you have the right to:</p>
                        <ul className="list-disc ml-6 space-y-2 mt-3">
                            <li><strong>Access:</strong> Request a copy of all personal data we hold about you</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
                            <li><strong>Deletion:</strong> Request permanent deletion of your personal data</li>
                            <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                            <li><strong>Withdrawal:</strong> Withdraw consent for data processing at any time</li>
                        </ul>
                    </Section>

                    <Section
                        icon={<Shield className="w-5 h-5 text-green-400" />}
                        title="5. Third-Party Sharing"
                    >
                        <p>
                            We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.
                            Your data may only be shared:
                        </p>
                        <ul className="list-disc ml-6 space-y-2 mt-3">
                            <li>With your explicit consent</li>
                            <li>To comply with legal obligations or valid legal process</li>
                            <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
                        </ul>
                    </Section>

                    <Section
                        icon={<Mail className="w-5 h-5 text-amber-400" />}
                        title="6. Contact Us"
                    >
                        <p>
                            If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                        </p>
                        <div className="mt-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-white font-semibold">Adhikar.ai Privacy Team</p>
                            <p className="text-slate-400 text-sm">Email: privacy@adhikar.ai</p>
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

export default PrivacyPolicyPage;
