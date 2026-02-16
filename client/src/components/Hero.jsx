import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Shield, FileText, Zap, BookOpen, ArrowRight, CheckCircle, Users, Clock, Award } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <div className="relative">
      {/* Hero Section with legal doodle background */}
      <section className="hero-bg py-20 md:py-28 relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-12 left-8 opacity-[0.06] animate-float hidden lg:block">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="#8B6914" strokeWidth="1.2">
            <line x1="30" y1="5" x2="30" y2="38" />
            <line x1="14" y1="16" x2="46" y2="16" />
            <circle cx="30" cy="5" r="4" />
            <path d="M14 16 L8 30 L20 30 Z" />
            <path d="M46 16 L40 30 L52 30 Z" />
            <rect x="22" y="38" width="16" height="5" rx="1" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-12 opacity-[0.05] animate-float hidden lg:block" style={{ animationDelay: '1.5s' }}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="#8B6914" strokeWidth="1">
            <rect x="5" y="2" width="40" height="46" rx="3" />
            <line x1="12" y1="12" x2="38" y2="12" />
            <line x1="12" y1="19" x2="38" y2="19" />
            <line x1="12" y1="26" x2="30" y2="26" />
            <line x1="12" y1="33" x2="35" y2="33" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-[5%] opacity-[0.04] hidden lg:block">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#C4A44A" strokeWidth="0.8">
            <path d="M30 5 C24 12 18 22 10 35 L8 38 L12 36 C22 25 28 15 33 8 Z" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 tag tag-gold mb-6 animate-fade-in-up">
            <Scale className="w-3.5 h-3.5" />
            <span>AI-Powered Legal Intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[var(--color-ink)] leading-[1.1] mb-6 animate-fade-in-up delay-100">
            Justice,{' '}
            <span className="relative inline-block">
              <span className="gradient-text-warm">Simplified</span>
              <span className="underline-sketch absolute left-0 right-0 bottom-0"></span>
            </span>
            <span className="text-[var(--color-accent)]">.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[var(--color-ink-light)] max-w-2xl mx-auto mb-10 leading-relaxed font-body animate-fade-in-up delay-200">
            Describe your dispute in plain language. Our AI identifies the exact Indian law violated,
            cites specific sections, and drafts a court-ready legal notice — all in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
            <button onClick={onStart} className="btn-primary px-8 py-3.5 font-ui text-base flex items-center gap-2 group">
              Start Your Claim
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link to="/how-it-works" className="btn-outline px-8 py-3.5 font-ui text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              How It Works
            </Link>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl mx-auto mb-4 animate-fade-in-up delay-400">
            {[
              { icon: <Shield className="w-4 h-4 text-[var(--color-green)]" />, value: "21+", label: "Acts Covered" },
              { icon: <Clock className="w-4 h-4 text-[var(--color-amber)]" />, value: "<10s", label: "Analysis Time" },
              { icon: <Users className="w-4 h-4 text-[var(--color-blue)]" />, value: "100%", label: "Free to Use" },
              { icon: <Award className="w-4 h-4 text-[var(--color-accent)]" />, value: "AI", label: "Powered by Llama" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  {stat.icon}
                  <span className="text-2xl font-display font-bold text-[var(--color-ink)]">{stat.value}</span>
                </div>
                <span className="text-xs text-[var(--color-ink-faint)] font-ui">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section Ornament ── */}
      <div className="section-separator"></div>

      {/* Feature Cards Section — with scattered doodle tile */}
      <section className="doodle-scroll-tile py-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-ink)] mb-3 animate-fade-in-up">
            Everything You Need for Legal Protection
          </h2>
          <p className="text-[var(--color-ink-muted)] max-w-xl mx-auto font-body text-sm animate-fade-in-up delay-100">
            From complaint to court-ready document, powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: <Scale className="w-6 h-6 text-[var(--color-accent)]" />,
              title: "AI Case Analysis",
              desc: "Identifies the exact act and section violated from 21+ Indian legal acts in seconds.",
              color: "gold"
            },
            {
              icon: <FileText className="w-6 h-6 text-[var(--color-amber)]" />,
              title: "Legal Notice Drafting",
              desc: "Generates professionally formatted notices following established Indian legal conventions.",
              color: "amber"
            },
            {
              icon: <Shield className="w-6 h-6 text-[var(--color-green)]" />,
              title: "Case Record Vault",
              desc: "Every analysis is saved with unique case IDs, creating a tamper-proof audit trail.",
              color: "green"
            },
            {
              icon: <BookOpen className="w-6 h-6 text-[var(--color-blue)]" />,
              title: "Legal Database",
              desc: "75+ key sections across 21 acts — consumer, criminal, property, family, and more.",
              color: "blue"
            },
            {
              icon: <Zap className="w-6 h-6 text-[var(--color-accent-light)]" />,
              title: "Instant PDF Export",
              desc: "Download ready-to-print PDF notices with proper legal formatting and reference numbers.",
              color: "gold"
            },
            {
              icon: <CheckCircle className="w-6 h-6 text-[var(--color-green)]" />,
              title: "Anti-Hallucination AI",
              desc: "Validated against known law database. Every citation is verified before delivery.",
              color: "green"
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="paper-card-accent p-7 group animate-fade-in-up"
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              <div className="icon-box icon-box-gold mb-4 group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-display font-bold text-[var(--color-ink)] mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed font-body">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section Ornament ── */}
      <div className="section-separator"></div>

      {/* How It Works — Quick Steps */}
      <section className="py-4 graph-paper-bg rounded-2xl mb-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-ink)] mb-3">
            Three Steps to Justice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
          {[
            { step: "01", title: "Describe", desc: "Tell us what happened in plain language.", icon: <FileText className="w-5 h-5 text-[var(--color-accent)]" /> },
            { step: "02", title: "Analyze", desc: "AI identifies the violation and applicable law.", icon: <Scale className="w-5 h-5 text-[var(--color-amber)]" /> },
            { step: "03", title: "Receive", desc: "Get a court-ready legal notice to download.", icon: <CheckCircle className="w-5 h-5 text-[var(--color-green)]" /> },
          ].map((item, i) => (
            <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="mx-auto mb-4 w-16 h-16 rounded-2xl paper-card flex items-center justify-center paper-shadow">
                {item.icon}
              </div>
              <span className="text-[10px] font-ui font-bold text-[var(--color-accent)] tracking-[0.2em] uppercase">Step {item.step}</span>
              <h3 className="text-lg font-display font-bold text-[var(--color-ink)] mt-1 mb-1">{item.title}</h3>
              <p className="text-sm text-[var(--color-ink-muted)] font-body">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={onStart} className="btn-primary px-8 py-3.5 font-ui text-base inline-flex items-center gap-2 group">
            Start Your Free Claim
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
