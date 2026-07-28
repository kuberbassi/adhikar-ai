import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Check, CheckCircle2, Clock3, FileText,
  Landmark, LockKeyhole, Scale, ShieldCheck, Sparkles
} from 'lucide-react';

const capabilities = [
  { icon: <Scale className="w-5 h-5" aria-hidden="true" />, title: 'Law-aware analysis', desc: 'Maps your situation to relevant Indian acts and specific provisions.' },
  { icon: <FileText className="w-5 h-5" aria-hidden="true" />, title: 'Professional drafting', desc: 'Creates a structured legal notice you can review, edit, and export.' },
  { icon: <LockKeyhole className="w-5 h-5" aria-hidden="true" />, title: 'Evidence-ready record', desc: 'Keeps case details and supporting documents together with a case ID.' },
];

const steps = [
  ['01', 'Tell us what happened', 'Write naturally—no legal terminology required.'],
  ['02', 'Review the legal analysis', 'See the applicable law, section, severity, and next steps.'],
  ['03', 'Download your notice', 'Edit the draft and export a professionally formatted PDF.'],
];

const Hero = ({ onStart }) => (
  <div className="home-page">
    <section className="hero-premium">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="hero-copy">
        <div className="eyebrow-pill animate-fade-in-up"><Sparkles className="w-3.5 h-3.5" /> Legal clarity, powered by AI</div>
        <h1 className="hero-title animate-fade-in-up delay-100">Understand your rights.<span>Act with confidence.</span></h1>
        <p className="hero-lede animate-fade-in-up delay-200">
          Describe your issue in everyday language. Adhikar.ai finds the relevant Indian law and helps you prepare a clear, professional legal notice.
        </p>
        <div className="hero-actions animate-fade-in-up delay-300">
          <button onClick={onStart} className="btn-primary btn-large group">Analyze my case <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></button>
          <Link to="/legal-database" className="btn-quiet"><BookOpen className="w-4 h-4" /> Explore 51 acts</Link>
        </div>
        <div className="hero-assurance animate-fade-in-up delay-400">
          <span><Check className="w-4 h-4" /> Free to start</span>
          <span><Check className="w-4 h-4" /> No legal jargon</span>
          <span><Check className="w-4 h-4" /> Editable output</span>
        </div>
      </div>

      <div className="hero-visual animate-fade-in-up delay-200">
        <div className="case-preview">
          <div className="case-preview-top">
            <div><p className="micro-label">Case intelligence</p><h2>Security deposit dispute</h2></div>
            <span className="status-live"><span /> Analysis ready</span>
          </div>
          <div className="case-question">“My landlord has not returned my deposit despite repeated requests…”</div>
          <div className="case-match">
            <div className="match-icon"><Landmark className="w-5 h-5" /></div>
            <div className="min-w-0"><p className="micro-label">Relevant legal route</p><h3>Consumer protection & contract law</h3><p>Potential deficiency in service and breach of agreed terms.</p></div>
            <span className="confidence-pill">High match</span>
          </div>
          <div className="case-progress">
            <div className="progress-heading"><span>Notice preparation</span><span>3 of 3</span></div>
            <div className="progress-track"><span /></div>
          </div>
          <div className="case-ready"><CheckCircle2 className="w-5 h-5" /><div><strong>Draft ready to review</strong><span>Includes legal basis, demand, and response deadline</span></div></div>
        </div>
        <div className="floating-trust"><ShieldCheck className="w-5 h-5" /><div><strong>Verified references</strong><span>Curated legal database</span></div></div>
      </div>
    </section>

    <section className="trust-strip" aria-label="Platform statistics">
      <div><strong>51</strong><span>Indian acts covered</span></div>
      <div><strong>386</strong><span>Key provisions indexed</span></div>
      <div><strong>&lt;10 sec</strong><span>Typical analysis time</span></div>
      <div><strong>₹0</strong><span>To analyze your case</span></div>
    </section>

    <section className="section-block">
      <div className="section-heading">
        <span className="micro-label">Built for real legal problems</span>
        <h2>From uncertainty to a clear next step</h2>
        <p>Practical tools that help you understand, document, and communicate your claim.</p>
      </div>
      <div className="capability-grid">
        {capabilities.map(({ icon, title, desc }, index) => (
          <article className="capability-card" key={title}>
            <div className="capability-number">0{index + 1}</div>
            <div className="capability-icon">{icon}</div>
            <h3>{title}</h3><p>{desc}</p>
            <Link to={index === 0 ? '/legal-database' : '/how-it-works'}>Learn more <ArrowRight className="w-3.5 h-3.5" /></Link>
          </article>
        ))}
      </div>
    </section>

    <section className="process-panel">
      <div className="process-intro">
        <span className="micro-label">Simple by design</span>
        <h2>Three steps. One clear path forward.</h2>
        <p>You stay in control at every stage. Review the analysis and edit the notice before using it.</p>
        <div className="process-note"><Clock3 className="w-5 h-5" /><span><strong>Built for speed</strong>Most cases take only a few minutes from description to draft.</span></div>
      </div>
      <div className="process-steps">
        {steps.map(([number, title, desc]) => <div className="process-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}
        <button onClick={onStart} className="btn-primary btn-large group">Start your free analysis <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></button>
      </div>
    </section>

    <section className="final-cta">
      <div><span className="micro-label">Your rights should feel accessible</span><h2>Ready to understand where you stand?</h2></div>
      <button onClick={onStart} className="btn-light group">Analyze my case <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></button>
    </section>
  </div>
);

export default Hero;
