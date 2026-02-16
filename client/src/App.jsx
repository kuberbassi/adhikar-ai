import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import LoadingOverlay from './components/LoadingOverlay';
import SolutionsPage from './pages/SolutionsPage';

import LegalDatabasePage from './pages/LegalDatabasePage';
import HowItWorksPage from './pages/HowItWorksPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import { Scale, Menu, X } from 'lucide-react';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [caseDetails, setCaseDetails] = useState("");
  const [caseId, setCaseId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleAnalysisComplete = (data, details, uDetails, evidence) => {
    setAnalysis(data);
    setCaseDetails(details);
    setCaseId(data.caseId || null);
    setUserDetails(uDetails);
    setEvidenceFile(evidence || null);
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    navigate('/dashboard');
  };

  const goHome = () => {
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/solutions", label: "Solutions" },
    { to: "/legal-database", label: "Legal Database" },
    { to: "/how-it-works", label: "How it Works" },
  ];

  return (
    <div className="min-h-screen parchment-bg relative">
      {/* Loading Overlay */}
      {showLoading && <LoadingOverlay onComplete={handleLoadingComplete} />}

      {/* Navbar */}
      <nav className="navbar-glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={goHome}>
            <Scale className="w-6 h-6 text-[var(--color-accent)] mr-2" />
            <span className="text-xl font-display font-bold text-[var(--color-ink)]">
              Adhikar<span className="text-[var(--color-accent)]">.ai</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-8 font-ui text-sm font-medium text-[var(--color-ink-muted)]">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-[var(--color-ink)] transition-colors relative ${location.pathname === link.to ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/upload"
              className="btn-primary px-6 py-2.5 font-ui text-sm"
            >
              Start Claim
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[var(--color-ink)] p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 pb-6 space-y-3 animate-fade-in border-t border-[var(--color-border)] pt-4 bg-[var(--color-surface)]">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors py-1 font-ui text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/upload"
              className="block w-full btn-primary py-3 font-ui text-sm text-center mt-3"
            >
              Start Claim
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<Hero onStart={() => navigate('/upload')} />} />
          <Route path="/upload" element={
            <div className="py-16">
              <div className="text-center mb-10 animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-ink)] mb-3">Start Your Legal Claim</h2>
                <p className="text-[var(--color-ink-muted)] max-w-xl mx-auto font-body">
                  Describe your situation below. Our AI will analyze your case and prepare a professional legal notice.
                </p>
              </div>
              <FileUpload onAnalysisComplete={handleAnalysisComplete} />
            </div>
          } />
          <Route path="/dashboard" element={
            analysis ? (
              <Dashboard
                analysis={analysis}
                caseDetails={caseDetails}
                caseId={caseId}
                userDetails={userDetails}
                evidenceFile={evidenceFile}
                onBack={() => navigate('/upload')}
              />
            ) : (
              <div className="py-32 text-center">
                <p className="text-[var(--color-ink-muted)] text-lg mb-6">No analysis data found. Please start a new claim first.</p>
                <Link to="/upload" className="btn-primary px-8 py-3 font-ui inline-block">
                  Start a Claim
                </Link>
              </div>
            )
          } />
          <Route path="/solutions" element={<SolutionsPage />} />

          <Route path="/legal-database" element={<LegalDatabasePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

          {/* 404 */}
          <Route path="*" element={
            <div className="py-32 text-center">
              <h2 className="text-6xl font-display font-bold text-[var(--color-ink)] mb-4">404</h2>
              <p className="text-[var(--color-ink-muted)] text-lg mb-8">Page not found.</p>
              <Link to="/" className="btn-primary px-8 py-3 font-ui inline-block">
                Go Home
              </Link>
            </div>
          } />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-12 px-6 mt-20 footer-decorated">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center mb-4 cursor-pointer" onClick={goHome}>
                <Scale className="w-5 h-5 text-[var(--color-accent)] mr-2" />
                <span className="text-lg font-display font-bold text-[var(--color-ink)]">Adhikar<span className="text-[var(--color-accent)]">.ai</span></span>
              </div>
              <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed font-body">
                AI-powered legal assistant making justice accessible to every Indian citizen.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-[var(--color-ink)] font-ui font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2.5 text-sm text-[var(--color-ink-muted)] font-ui">
                <li><Link to="/solutions" className="hover:text-[var(--color-ink)] transition-colors">Solutions</Link></li>

                <li><Link to="/how-it-works" className="hover:text-[var(--color-ink)] transition-colors">How it Works</Link></li>
                <li><Link to="/upload" className="hover:text-[var(--color-ink)] transition-colors">Start a Claim</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-[var(--color-ink)] font-ui font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-2.5 text-sm text-[var(--color-ink-muted)] font-ui">
                <li><Link to="/legal-database" className="hover:text-[var(--color-ink)] transition-colors">Legal Database</Link></li>
                <li><a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-ink)] transition-colors">Consumer Helpline</a></li>
                <li><a href="https://services.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-ink)] transition-colors">Government Services</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-[var(--color-ink)] font-ui font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2.5 text-sm text-[var(--color-ink-muted)] font-ui">
                <li><Link to="/privacy" className="hover:text-[var(--color-ink)] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[var(--color-ink)] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--color-ink-faint)] text-sm font-ui">
              © {new Date().getFullYear()} Adhikar.ai — Making justice accessible to every citizen.
            </p>
            <p className="text-[var(--color-ink-faint)] text-xs font-ui">
              ⚖ This is an AI drafting tool, not a substitute for professional legal advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
