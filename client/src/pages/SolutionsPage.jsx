import React from 'react';
import { Shield, Users, Briefcase, Home, CreditCard, Scale, Zap, Globe, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const solutions = [
    {
        icon: <CreditCard className="w-7 h-7 text-blue-400" />,
        title: "Consumer Disputes",
        desc: "Bought a defective product? Denied a refund? Our AI identifies violations under the Consumer Protection Act, 2019 and drafts a notice citing the exact section.",
        tags: ["Refunds", "Defective Products", "Warranty Issues", "Overcharging"],
        act: "Consumer Protection Act, 2019"
    },
    {
        icon: <Home className="w-7 h-7 text-indigo-400" />,
        title: "Rental & Landlord Disputes",
        desc: "Security deposit not returned? Unfair eviction? We reference the Rent Control Act and generate notices that protect your tenancy rights.",
        tags: ["Security Deposit", "Eviction", "Rent Increase", "Maintenance"],
        act: "Rent Control Act"
    },
    {
        icon: <Briefcase className="w-7 h-7 text-cyan-400" />,
        title: "Employment Issues",
        desc: "Wrongful termination or unpaid salary? Our system identifies violations under the Industrial Disputes Act and helps you demand what you're owed.",
        tags: ["Wrongful Termination", "Unpaid Wages", "PF Issues", "Harassment"],
        act: "Industrial Disputes Act, 1947"
    },
    {
        icon: <Shield className="w-7 h-7 text-red-400" />,
        title: "Fraud & Cheating",
        desc: "Been scammed online or offline? We help you file formal legal notices under IPC Section 420 and guide you through the FIR process.",
        tags: ["Online Scams", "Fake Products", "Misleading Ads", "Identity Theft"],
        act: "Indian Penal Code, Section 420"
    },
    {
        icon: <Globe className="w-7 h-7 text-green-400" />,
        title: "Service Deficiency",
        desc: "Delayed delivery? Poor service quality? We cite the Consumer Protection Act to hold service providers accountable.",
        tags: ["Late Delivery", "Poor Quality", "Non-Delivery", "Broken Promises"],
        act: "Consumer Protection Act, 2019 §2(11)"
    },
    {
        icon: <FileText className="w-7 h-7 text-amber-400" />,
        title: "General Legal Notices",
        desc: "For any other dispute — property, civil matters, or contractual disagreements — our AI drafts a professionally formatted legal notice.",
        tags: ["Property", "Contracts", "Civil Matters", "Agreements"],
        act: "Indian Penal Code (General)"
    }
];

const SolutionsPage = () => {
    return (
        <div className="py-20 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass gradient-border text-blue-200 text-sm font-medium mb-6">
                    <Zap className="w-4 h-4 mr-2 text-cyan-300" />
                    AI-Powered Solutions
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                    <span className="gradient-text">Every Dispute. One Platform.</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                    From consumer fraud to rental disputes — Adhikar.ai covers 6 major legal categories with intelligent analysis and professionally drafted notices.
                </p>
            </div>

            {/* Solutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutions.map((sol, i) => (
                    <div
                        key={i}
                        className={`p-8 rounded-3xl glass gradient-border hover:-translate-y-1.5 transition-all duration-300 animate-fade-in-up`}
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                            {sol.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{sol.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">{sol.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {sol.tags.map((tag, j) => (
                                <span key={j} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/5 border border-white/10 text-slate-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-blue-400 font-semibold">📖 {sol.act}</p>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-16 animate-fade-in-up delay-600">
                <Link
                    to="/upload"
                    className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_20px_50px_-15px_rgba(59,130,246,0.8)] hover:-translate-y-0.5"
                >
                    <Scale className="w-5 h-5" />
                    Start Your Claim Now
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

export default SolutionsPage;
