import React from 'react';
import { FileCheck, Brain, Send, Shield, Zap, Scale, ArrowRight, CheckCircle, Upload, FileText, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
    return (
        <div className="py-20 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                    <span className="gradient-text">How Adhikar.ai Works</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    From describing your issue to sending a court-ready legal notice — in just 3 simple steps.
                </p>
            </div>

            {/* Steps */}
            <div className="max-w-5xl mx-auto space-y-24">
                {/* Step 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in-up">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest mb-4">
                            STEP 01
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Describe Your Issue & Upload Evidence</h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Tell us what happened in plain language. No legal jargon needed — our AI understands natural language.
                            You can also upload screenshots, invoices, or any relevant documents as supporting evidence.
                        </p>
                        <ul className="space-y-3">
                            {["Type your complaint in simple words", "Upload screenshots or PDFs of proof", "Fill in your details and opponent info", "All data is encrypted end-to-end"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="p-8 rounded-3xl glass gradient-border">
                            <div className="space-y-4">
                                <div className="h-3 w-24 bg-white/10 rounded-full" />
                                <div className="h-24 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-slate-600 text-sm">
                                    <FileText className="w-5 h-5 mr-2" /> Describe your issue here...
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="h-10 bg-white/5 rounded-xl border border-white/10" />
                                    <div className="h-10 bg-white/5 rounded-xl border border-white/10" />
                                </div>
                                <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center">
                                    <Upload className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                    <p className="text-slate-500 text-xs">Drag & drop evidence</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/30 animate-float">
                            1
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in-up">
                    <div className="order-2 md:order-1 relative">
                        <div className="p-8 rounded-3xl glass gradient-border">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <Brain className="w-6 h-6 text-indigo-400" />
                                    <span className="text-white font-semibold">AI Analysis Engine</span>
                                </div>
                                <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-2xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-green-400 text-sm font-semibold">Violation Detected</span>
                                    </div>
                                    <p className="text-white text-sm">Consumer Protection Act, 2019</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <p className="text-slate-500 text-xs mb-1">Confidence</p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[98%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                                        </div>
                                        <span className="text-white font-bold text-sm">98%</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <p className="text-slate-500 text-xs mb-1">Section</p>
                                    <p className="text-white font-semibold text-sm">Section 35</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-600/30 animate-float" style={{ animationDelay: "0.5s" }}>
                            2
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest mb-4">
                            STEP 02
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">AI Analyzes Your Case</h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Our AI engine scans your description and evidence, cross-references with Indian legal statutes,
                            identifies the exact violation, relevant Act, and applicable Section with a confidence score.
                        </p>
                        <ul className="space-y-3">
                            {["Scans text for legal keywords", "Cross-references 6+ Indian legal acts", "Identifies violation type and severity", "Provides actionable recommendations"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in-up">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest mb-4">
                            STEP 03
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Download & Send Your Legal Notice</h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Review the professionally formatted legal notice, customize any details, then download as PDF or send directly via email.
                            The notice includes all required legal references and formal language.
                        </p>
                        <ul className="space-y-3">
                            {["Court-ready professional formatting", "All legal references auto-included", "Download as PDF for registered post", "Send directly via email with one click"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="p-8 rounded-3xl glass gradient-border">
                            <div className="space-y-3">
                                <div className="text-center mb-4">
                                    <FileText className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                                    <p className="text-white font-semibold text-sm">Legal Notice Ready</p>
                                </div>
                                <div className="h-20 bg-[#fffef9] rounded-xl p-3">
                                    <div className="space-y-1.5">
                                        <div className="h-1.5 w-full bg-slate-200 rounded" />
                                        <div className="h-1.5 w-[85%] bg-slate-200 rounded" />
                                        <div className="h-1.5 w-[70%] bg-slate-200 rounded" />
                                        <div className="h-1.5 w-[90%] bg-slate-200 rounded" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="py-2.5 bg-white/5 border border-white/10 rounded-xl text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                                        <FileCheck className="w-3.5 h-3.5" /> PDF
                                    </div>
                                    <div className="py-2.5 bg-blue-600 rounded-xl text-center text-xs text-white flex items-center justify-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5" /> Email
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-600/30 animate-float" style={{ animationDelay: "1s" }}>
                            3
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-24 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
                <p className="text-slate-400 mb-8">It's free, fast, and confidential.</p>
                <Link
                    to="/upload"
                    className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_20px_50px_-15px_rgba(59,130,246,0.8)] hover:-translate-y-0.5"
                >
                    <Scale className="w-5 h-5" />
                    Start Your Free Claim
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

export default HowItWorksPage;
