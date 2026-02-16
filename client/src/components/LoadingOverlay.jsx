import React, { useState, useEffect } from 'react';
import { Scale, Search, FileText, CheckCircle, Shield } from 'lucide-react';

const steps = [
    { icon: <Search className="w-7 h-7" />, title: "Reading your complaint...", subtitle: "Understanding the facts" },
    { icon: <Scale className="w-7 h-7" />, title: "Identifying violations...", subtitle: "Cross-referencing legal database" },
    { icon: <FileText className="w-7 h-7" />, title: "Drafting legal notice...", subtitle: "Generating court-ready document" },
    { icon: <Shield className="w-7 h-7" />, title: "Securing your records...", subtitle: "Saving case for legal protection" },
    { icon: <CheckCircle className="w-7 h-7" />, title: "Ready!", subtitle: "Your case analysis is complete" },
];

const LoadingOverlay = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const stepDuration = 1200;
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const target = ((currentStep + 1) / steps.length) * 100;
                if (prev < target) return Math.min(prev + 1.5, target);
                return prev;
            });
        }, 30);

        const stepInterval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev >= steps.length - 1) {
                    clearInterval(stepInterval);
                    clearInterval(progressInterval);
                    setProgress(100);
                    setTimeout(onComplete, 600);
                    return prev;
                }
                return prev + 1;
            });
        }, stepDuration);

        return () => {
            clearInterval(stepInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(247, 244, 239, 0.95)', backdropFilter: 'blur(8px)' }}>
            <div className="text-center max-w-md mx-auto px-6 animate-scale-in">
                {/* Quill animation */}
                <div className="mb-8 relative">
                    <div className="mx-auto w-20 h-20 rounded-2xl paper-card flex items-center justify-center text-[var(--color-accent)] animate-float paper-shadow-lg">
                        {steps[currentStep].icon}
                    </div>
                    {/* Writing line */}
                    <div className="mt-4 mx-auto w-40 h-[2px] bg-[var(--color-border)] rounded overflow-hidden">
                        <div className="h-full bg-[var(--color-accent)] rounded" style={{ width: `${progress}%`, transition: 'width 0.3s ease' }} />
                    </div>
                </div>

                {/* Step text */}
                <div className="animate-fade-in" key={currentStep}>
                    <h3 className="text-xl font-display font-bold text-[var(--color-ink)] mb-1">{steps[currentStep].title}</h3>
                    <p className="text-sm text-[var(--color-ink-muted)] font-body">{steps[currentStep].subtitle}</p>
                </div>

                {/* Step dots */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-[var(--color-accent)]' :
                                    i < currentStep ? 'w-2 bg-[var(--color-accent-light)]' :
                                        'w-2 bg-[var(--color-border)]'
                                }`}
                        />
                    ))}
                </div>

                <p className="text-xs text-[var(--color-ink-faint)] font-ui mt-8">
                    Powered by Adhikar.ai Legal Intelligence
                </p>
            </div>
        </div>
    );
};

export default LoadingOverlay;
