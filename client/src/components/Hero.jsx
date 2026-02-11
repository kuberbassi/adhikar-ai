import React from 'react';
import { Scale, ShieldCheck, Zap, Sparkles, ArrowRight, FileCheck, Brain, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ onStart }) => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-indigo-400/25 to-cyan-400/20 blur-[90px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Badge */}
      <div className="mb-6 inline-flex items-center px-5 py-2.5 rounded-full glass gradient-border text-blue-200 text-sm font-medium animate-fade-in-up">
        <Sparkles className="w-4 h-4 mr-2 text-cyan-300" />
        AI-Powered Legal Intelligence
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-[1.05] animate-fade-in-up delay-100">
        <span className="gradient-text">Justice, Simplified.</span>
      </h1>

      <p className="text-lg md:text-xl text-slate-300 max-w-3xl mb-12 animate-fade-in-up delay-200">
        AI-crafted legal notices, evidence intelligence, and dispute resolution — all in one elegant workflow.
        Upload once. Receive a court-ready draft in minutes.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
        <button
          onClick={onStart}
          className="group px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold text-lg transition-all flex items-center justify-center shadow-[0_20px_50px_-15px_rgba(59,130,246,0.8)] hover:shadow-[0_25px_60px_-10px_rgba(59,130,246,0.9)] hover:-translate-y-0.5"
        >
          <Scale className="w-5 h-5 mr-2" />
          Start Your Claim
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
        <Link to="/how-it-works" className="px-10 py-4 glass gradient-border text-white rounded-2xl font-semibold text-lg transition-all hover:brightness-125 hover:-translate-y-0.5 text-center">
          How it Works
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-in-up delay-400">
        {[
          { value: "10,000+", label: "Notices Drafted" },
          { value: "98%", label: "Success Rate" },
          { value: "50+", label: "Legal Categories" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {[
          { icon: <Zap className="w-6 h-6 text-blue-400" />, title: "Instant Analysis", desc: "Our AI scans your evidence and identifies legal violations in seconds." },
          { icon: <Scale className="w-6 h-6 text-indigo-400" />, title: "Official Notices", desc: "Generate professionally drafted legal notices ready to send." },
          { icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />, title: "Secure & Private", desc: "Your data is encrypted end-to-end with the highest security standards." }
        ].map((feature, i) => (
          <div key={i} className={`p-7 rounded-3xl glass gradient-border text-left hover:-translate-y-1.5 transition-all duration-300 animate-fade-in-up delay-${(i + 4) * 100}`}>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* How it Works */}
      <div className="mt-28 w-full max-w-5xl animate-fade-in-up delay-600">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-slate-400 mb-14 max-w-2xl mx-auto">Three simple steps from evidence to a court-ready legal notice.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-cyan-500/40" />

          {[
            { step: "01", icon: <FileCheck className="w-7 h-7 text-blue-400" />, title: "Upload Evidence", desc: "Drag & drop screenshots, PDFs, or describe your issue in detail." },
            { step: "02", icon: <Brain className="w-7 h-7 text-indigo-400" />, title: "AI Analyzes", desc: "Our AI identifies violations, references relevant laws & sections." },
            { step: "03", icon: <Send className="w-7 h-7 text-cyan-400" />, title: "Send Notice", desc: "Download or email your professionally drafted legal notice." },
          ].map((item, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 w-24 h-24 rounded-3xl glass gradient-border flex items-center justify-center mb-6 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                {item.icon}
              </div>
              <span className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-2">Step {item.step}</span>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
