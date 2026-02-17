import React, { useState, useEffect } from 'react';
import { Cookie, Shield, ChevronDown, ChevronUp, X } from 'lucide-react';

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('adhikar_cookie_consent');
        if (!consent) {
            // Slight delay so it feels natural, not jarring
            const timer = setTimeout(() => {
                setVisible(true);
                requestAnimationFrame(() => setAnimateIn(true));
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('adhikar_cookie_consent', JSON.stringify({
            accepted: true,
            essential: true,
            analytics: true,
            timestamp: new Date().toISOString()
        }));
        dismiss();
    };

    const handleAcceptEssential = () => {
        localStorage.setItem('adhikar_cookie_consent', JSON.stringify({
            accepted: true,
            essential: true,
            analytics: false,
            timestamp: new Date().toISOString()
        }));
        dismiss();
    };

    const dismiss = () => {
        setAnimateIn(false);
        setTimeout(() => setVisible(false), 400);
    };

    if (!visible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[9998] pointer-events-none"
                style={{
                    background: animateIn
                        ? 'linear-gradient(to top, rgba(20,15,8,0.4) 0%, transparent 50%)'
                        : 'transparent',
                    transition: 'background 0.5s ease',
                }}
            />

            {/* Banner */}
            <div
                className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4 md:px-6 md:pb-6"
                style={{
                    transform: animateIn ? 'translateY(0)' : 'translateY(110%)',
                    opacity: animateIn ? 1 : 0,
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                }}
            >
                <div
                    className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,252,245,0.97) 0%, rgba(250,245,230,0.97) 100%)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(139,105,20,0.15)',
                        boxShadow: '0 -4px 30px rgba(20,15,8,0.12), 0 0 0 1px rgba(139,105,20,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                    }}
                >
                    {/* Header */}
                    <div className="px-5 pt-5 pb-0 md:px-6 md:pt-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: 'linear-gradient(135deg, #8B6914 0%, #B8941F 100%)',
                                        boxShadow: '0 2px 8px rgba(139,105,20,0.3)',
                                    }}
                                >
                                    <Cookie className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3
                                        className="font-display font-bold text-base"
                                        style={{ color: 'var(--color-ink, #1a1612)' }}
                                    >
                                        We Value Your Privacy
                                    </h3>
                                    <p
                                        className="text-xs mt-0.5"
                                        style={{ color: 'var(--color-ink-faint, #8a7e6a)' }}
                                    >
                                        Your data, your choice
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleAcceptEssential}
                                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-[rgba(139,105,20,0.08)] transition-colors"
                                aria-label="Dismiss"
                            >
                                <X className="w-4 h-4" style={{ color: 'var(--color-ink-faint, #8a7e6a)' }} />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-5 py-4 md:px-6">
                        <p
                            className="text-sm leading-relaxed"
                            style={{ color: 'var(--color-ink-light, #4a4035)' }}
                        >
                            Adhikar.ai uses essential cookies to keep the site running and optional analytics to improve our service.
                            We <strong>never</strong> sell your data or use advertising trackers.{' '}
                            <a
                                href="/privacy"
                                className="inline-flex items-center gap-1 font-medium hover:underline"
                                style={{ color: 'var(--color-accent, #8B6914)' }}
                            >
                                <Shield className="w-3 h-3" /> Read our Privacy Policy
                            </a>
                        </p>

                        {/* Expandable details */}
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1.5 mt-3 text-xs font-medium transition-colors hover:underline"
                            style={{ color: 'var(--color-accent, #8B6914)' }}
                        >
                            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            {expanded ? 'Hide details' : 'Cookie details'}
                        </button>

                        <div
                            style={{
                                maxHeight: expanded ? '200px' : '0',
                                opacity: expanded ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'max-height 0.35s ease, opacity 0.3s ease',
                            }}
                        >
                            <div className="mt-3 space-y-2.5">
                                <CookieRow
                                    name="Essential"
                                    description="Session state, form data, consent preferences"
                                    required
                                />
                                <CookieRow
                                    name="Analytics"
                                    description="Anonymised usage patterns to improve the service"
                                />
                                <CookieRow
                                    name="AI Processing"
                                    description="Your case data is sent to Groq for analysis (not stored by Groq)"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div
                        className="px-5 py-4 md:px-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3"
                        style={{
                            borderTop: '1px solid rgba(139,105,20,0.1)',
                            background: 'rgba(139,105,20,0.03)',
                        }}
                    >
                        <button
                            onClick={handleAcceptAll}
                            className="flex-1 py-2.5 px-5 rounded-xl text-sm font-display font-bold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                                background: 'linear-gradient(135deg, #8B6914 0%, #6B4F0E 100%)',
                                boxShadow: '0 2px 10px rgba(139,105,20,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                            }}
                        >
                            Accept All Cookies
                        </button>
                        <button
                            onClick={handleAcceptEssential}
                            className="flex-1 py-2.5 px-5 rounded-xl text-sm font-display font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                                color: 'var(--color-accent, #8B6914)',
                                background: 'rgba(139,105,20,0.06)',
                                border: '1px solid rgba(139,105,20,0.2)',
                            }}
                        >
                            Essential Only
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const CookieRow = ({ name, description, required }) => (
    <div
        className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg"
        style={{ background: 'rgba(139,105,20,0.04)', border: '1px solid rgba(139,105,20,0.08)' }}
    >
        <div className="min-w-0">
            <p className="text-xs font-bold" style={{ color: 'var(--color-ink, #1a1612)' }}>
                {name}
                {required && (
                    <span
                        className="ml-1.5 text-[10px] font-normal px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(139,105,20,0.1)', color: 'var(--color-accent, #8B6914)' }}
                    >
                        Required
                    </span>
                )}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-ink-faint, #8a7e6a)' }}>
                {description}
            </p>
        </div>
        <div
            className="flex-shrink-0 w-8 h-[18px] rounded-full relative"
            style={{
                background: required
                    ? 'linear-gradient(135deg, #8B6914 0%, #B8941F 100%)'
                    : 'rgba(139,105,20,0.2)',
                cursor: required ? 'not-allowed' : 'default',
                opacity: required ? 1 : 0.6,
            }}
        >
            <div
                className="absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white"
                style={{
                    left: required ? '14px' : '2px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    transition: 'left 0.2s ease',
                }}
            />
        </div>
    </div>
);

export default CookieConsent;
