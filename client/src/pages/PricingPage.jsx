import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Scale } from 'lucide-react';

const PricingPage = () => (
    <div className="py-16 animate-fade-in-up">
        <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-ink)] mb-4">Simple Pricing</h1>
            <p className="text-[var(--color-ink-muted)] max-w-2xl mx-auto font-body">
                Access to justice should not depend on your budget. Start for free.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="paper-card p-7">
                <h3 className="font-display font-bold text-lg text-[var(--color-ink)] mb-1">Citizen</h3>
                <p className="text-sm text-[var(--color-ink-muted)] font-ui mb-4">For individuals</p>
                <p className="text-4xl font-display font-bold text-[var(--color-ink)] mb-6">₹0 <span className="text-sm font-normal text-[var(--color-ink-faint)]">/ forever</span></p>
                <ul className="space-y-2.5 mb-8">
                    {["3 case analyses/month", "Legal notice drafting", "Legal database access", "PDF export", "Email support"].map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-ink-light)] font-body">
                            <CheckCircle className="w-4 h-4 text-[var(--color-green)] flex-shrink-0" /> {f}
                        </li>
                    ))}
                </ul>
                <Link to="/upload" className="block w-full btn-outline py-3 font-ui text-sm text-center">Get Started</Link>
            </div>

            {/* Pro */}
            <div className="paper-card p-7 border-2 border-[var(--color-accent)] relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 tag tag-gold text-xs">Most Popular</span>
                <h3 className="font-display font-bold text-lg text-[var(--color-ink)] mb-1">Professional</h3>
                <p className="text-sm text-[var(--color-ink-muted)] font-ui mb-4">For regular users</p>
                <p className="text-4xl font-display font-bold text-[var(--color-ink)] mb-6">₹499 <span className="text-sm font-normal text-[var(--color-ink-faint)]">/ month</span></p>
                <ul className="space-y-2.5 mb-8">
                    {["Unlimited analyses", "Priority AI drafting", "Case history archive", "Evidence vault", "Priority support", "Audit trail access"].map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-ink-light)] font-body">
                            <CheckCircle className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" /> {f}
                        </li>
                    ))}
                </ul>
                <Link to="/upload" className="block w-full btn-primary py-3 font-ui text-sm text-center">Start Free Trial</Link>
            </div>

            {/* Enterprise */}
            <div className="paper-card p-7">
                <h3 className="font-display font-bold text-lg text-[var(--color-ink)] mb-1">Enterprise</h3>
                <p className="text-sm text-[var(--color-ink-muted)] font-ui mb-4">For law firms & NGOs</p>
                <p className="text-4xl font-display font-bold text-[var(--color-ink)] mb-6">Custom</p>
                <ul className="space-y-2.5 mb-8">
                    {["Everything in Professional", "Custom integrations", "Bulk case processing", "Dedicated account manager", "SLA guarantee", "API access"].map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-ink-light)] font-body">
                            <CheckCircle className="w-4 h-4 text-[var(--color-blue)] flex-shrink-0" /> {f}
                        </li>
                    ))}
                </ul>
                <a href="mailto:contact@adhikar.ai" className="block w-full btn-outline py-3 font-ui text-sm text-center">Contact Sales</a>
            </div>
        </div>
    </div>
);

export default PricingPage;
