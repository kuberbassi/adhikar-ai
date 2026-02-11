import React, { useState, useEffect } from 'react';
import { Scale, BookOpen, PenTool, CheckCircle, Sparkles } from 'lucide-react';

const steps = [
    {
        icon: <Scale className="w-8 h-8" />,
        title: "Analyzing Evidence",
        subtitle: "Scanning your documents for legal violations...",
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20",
        glow: "shadow-blue-500/30"
    },
    {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Consulting Legal Database",
        subtitle: "Cross-referencing with Indian legal statutes...",
        color: "text-indigo-400",
        bg: "bg-indigo-500/10 border-indigo-500/20",
        glow: "shadow-indigo-500/30"
    },
    {
        icon: <PenTool className="w-8 h-8" />,
        title: "Drafting Legal Notice",
        subtitle: "Generating a court-ready document for your case...",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10 border-cyan-500/20",
        glow: "shadow-cyan-500/30"
    }
];

const LoadingOverlay = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const stepDuration = 2000; // 2s per step
        const ticker = setInterval(() => {
            setProgress(prev => {
                const target = ((currentStep + 1) / steps.length) * 100;
                if (prev >= target) return target;
                return prev + 1.5;
            });
        }, 50);

        const stepTimer = setTimeout(() => {
            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                clearInterval(ticker);
                setProgress(100);
                setTimeout(() => onComplete(), 600);
            }
        }, stepDuration);

        return () => {
            clearTimeout(stepTimer);
            clearInterval(ticker);
        };
    }, [currentStep, onComplete]);

    const step = steps[currentStep];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1224]/95 backdrop-blur-xl">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-cyan-500/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-lg px-6">
                {/* Animated icon */}
                <div className={`w-24 h-24 rounded-3xl ${step.bg} border flex items-center justify-center mb-8 animate-pulse-glow shadow-lg ${step.glow} animate-scale-in`} key={currentStep}>
                    <div className={step.color}>
                        {step.icon}
                    </div>
                </div>

                {/* Text */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-fade-in" key={`title-${currentStep}`}>
                    {step.title}
                </h2>
                <p className="text-slate-400 mb-10 animate-fade-in" key={`sub-${currentStep}`}>
                    {step.subtitle}
                </p>

                {/* Progress bar */}
                <div className="w-80 h-2 bg-slate-800/80 rounded-full overflow-hidden mb-6">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Step indicators */}
                <div className="flex items-center gap-3">
                    {steps.map((s, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${i < currentStep
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : i === currentStep
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse'
                                        : 'bg-white/5 text-slate-600 border border-white/10'
                                }`}>
                                {i < currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`w-12 h-0.5 rounded-full transition-all duration-500 ${i < currentStep ? 'bg-green-500/40' : 'bg-white/10'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* AI sparkle text */}
                <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
                    <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                    <span>Powered by Adhikar.ai Intelligence Engine</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
