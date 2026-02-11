import React, { useState } from 'react';
import { Check, X, Zap, Crown, Building, ArrowRight, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
    {
        name: "Starter",
        price: "Free",
        period: "forever",
        desc: "Perfect for individuals with a single dispute to resolve.",
        icon: <Zap className="w-6 h-6 text-blue-400" />,
        color: "blue",
        features: [
            { text: "1 Legal Notice per month", included: true },
            { text: "AI-powered case analysis", included: true },
            { text: "Consumer & Rental categories", included: true },
            { text: "Download as PDF", included: true },
            { text: "Email support", included: true },
            { text: "Priority processing", included: false },
            { text: "All 6 legal categories", included: false },
            { text: "Lawyer review", included: false },
        ],
        cta: "Get Started Free",
        popular: false
    },
    {
        name: "Professional",
        price: "₹499",
        period: "/month",
        desc: "For individuals and small businesses handling multiple cases.",
        icon: <Crown className="w-6 h-6 text-indigo-400" />,
        color: "indigo",
        features: [
            { text: "Unlimited Legal Notices", included: true },
            { text: "AI-powered case analysis", included: true },
            { text: "All 6 legal categories", included: true },
            { text: "Download as PDF", included: true },
            { text: "Priority email + chat support", included: true },
            { text: "Priority processing (2x faster)", included: true },
            { text: "Case history & tracking", included: true },
            { text: "Lawyer review (2/month)", included: false },
        ],
        cta: "Start 14-Day Free Trial",
        popular: true
    },
    {
        name: "Enterprise",
        price: "₹1,999",
        period: "/month",
        desc: "Full-suite solution for legal firms and corporate legal departments.",
        icon: <Building className="w-6 h-6 text-cyan-400" />,
        color: "cyan",
        features: [
            { text: "Unlimited Legal Notices", included: true },
            { text: "AI-powered case analysis", included: true },
            { text: "All 6 legal categories", included: true },
            { text: "Download as PDF + Word", included: true },
            { text: "Dedicated account manager", included: true },
            { text: "Instant processing", included: true },
            { text: "Unlimited case history", included: true },
            { text: "Lawyer review (unlimited)", included: true },
        ],
        cta: "Contact Sales",
        popular: false
    }
];

const PricingPage = () => {
    const [annual, setAnnual] = useState(false);

    return (
        <div className="py-20 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                    <span className="gradient-text">Simple, Transparent Pricing</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                    Start free. Upgrade when your needs grow. No hidden charges.
                </p>

                {/* Toggle */}
                <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1.5">
                    <button
                        onClick={() => setAnnual(false)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setAnnual(true)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${annual ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                    >
                        Annual <span className="text-green-400 text-xs ml-1">Save 20%</span>
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {plans.map((plan, i) => (
                    <div
                        key={i}
                        className={`relative p-8 rounded-3xl transition-all duration-300 animate-fade-in-up ${plan.popular
                                ? 'glass border-2 border-blue-500/40 shadow-[0_0_60px_-15px_rgba(59,130,246,0.4)] scale-[1.02]'
                                : 'glass gradient-border hover:-translate-y-1'
                            }`}
                        style={{ animationDelay: `${i * 150}ms` }}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                                MOST POPULAR
                            </div>
                        )}

                        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                            {plan.icon}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                        <p className="text-slate-500 text-sm mb-5">{plan.desc}</p>

                        <div className="mb-6">
                            <span className="text-4xl font-extrabold text-white">
                                {plan.price === "Free" ? "Free" : annual ? `₹${Math.round(parseInt(plan.price.replace('₹', '').replace(',', '')) * 0.8).toLocaleString('en-IN')}` : plan.price}
                            </span>
                            {plan.price !== "Free" && (
                                <span className="text-slate-500 text-sm">{plan.period}</span>
                            )}
                        </div>

                        <ul className="space-y-3 mb-8">
                            {plan.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-2.5 text-sm">
                                    {f.included ? (
                                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    ) : (
                                        <X className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                    )}
                                    <span className={f.included ? 'text-slate-300' : 'text-slate-600'}>{f.text}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/upload"
                            className={`block w-full py-3.5 rounded-xl font-bold text-center transition-all ${plan.popular
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_15px_40px_-15px_rgba(59,130,246,0.7)]'
                                    : 'glass gradient-border text-white hover:brightness-125'
                                }`}
                        >
                            {plan.cta}
                        </Link>
                    </div>
                ))}
            </div>

            {/* FAQ-like note */}
            <div className="text-center mt-16 p-8 rounded-3xl glass gradient-border max-w-3xl mx-auto animate-fade-in-up delay-500">
                <h3 className="text-white font-bold text-lg mb-2">🎓 Hackathon Demo Mode</h3>
                <p className="text-slate-400 text-sm">
                    During this hackathon demo, all features are unlocked for free. No credit card required.
                    The pricing above represents our planned business model for production launch.
                </p>
            </div>
        </div>
    );
};

export default PricingPage;
