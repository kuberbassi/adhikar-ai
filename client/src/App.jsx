import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import LoadingOverlay from './components/LoadingOverlay';
import SolutionsPage from './pages/SolutionsPage';
import PricingPage from './pages/PricingPage';
import LegalDatabasePage from './pages/LegalDatabasePage';
import HowItWorksPage from './pages/HowItWorksPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import { Scale, Menu, X } from 'lucide-react';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [caseDetails, setCaseDetails] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleAnalysisComplete = (data, details, uDetails) => {
    setAnalysis(data);
    setCaseDetails(details);
    setUserDetails(uDetails);
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
    { to: "/pricing", label: "Pricing" },
    { to: "/legal-database", label: "Legal Database" },
    { to: "/how-it-works", label: "How it Works" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-slate-200 relative">
      <div className="mesh-bg" />

      {/* Loading Overlay */}
      {showLoading && <LoadingOverlay onComplete={handleLoadingComplete} />}

      {/* Navbar */}
      <nav className="border-b border-white/[0.06] bg-[var(--color-surface)]/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={goHome}>
            <Scale className="w-7 h-7 text-blue-500 mr-2.5" />
            <span className="text-xl font-extrabold text-white tracking-tight">Adhikar<span className="text-blue-400">.ai</span></span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-400">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-white transition-colors ${location.pathname === link.to ? 'text-white' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/upload"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl transition-all font-semibold shadow-md shadow-blue-600/20"
            >
              Start Claim
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 pb-6 space-y-3 animate-fade-in border-t border-white/[0.06] pt-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-slate-300 hover:text-white transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/upload"
              className="block w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition-all text-center mt-3"
            >
              Start Claim
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<Hero onStart={() => navigate('/upload')} />} />
          <Route path="/upload" element={
            <div className="py-20">
              <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Start Your Legal Claim</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Provide your details and evidence below. Our AI will analyze your case and generate a professional legal notice.
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
                userDetails={userDetails}
                onBack={() => navigate('/upload')}
              />
            ) : (
              <div className="py-32 text-center">
                <p className="text-slate-400 text-lg mb-6">No analysis data found. Please start a new claim first.</p>
                <Link to="/upload" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all">
                  Start a Claim
                </Link>
              </div>
            )
          } />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/legal-database" element={<LegalDatabasePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

          {/* 404 */}
          <Route path="*" element={
            <div className="py-32 text-center">
              <h2 className="text-6xl font-extrabold text-white mb-4">404</h2>
              <p className="text-slate-400 text-lg mb-8">Page not found.</p>
              <Link to="/" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all">
                Go Home
              </Link>
            </div>
          } />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center mb-4 cursor-pointer" onClick={goHome}>
                <Scale className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-lg font-bold text-white">Adhikar<span className="text-blue-400">.ai</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                AI-powered legal assistant making justice accessible to every Indian citizen.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link to="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
                <li><Link to="/upload" className="hover:text-white transition-colors">Start a Claim</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link to="/legal-database" className="hover:text-white transition-colors">Legal Database</Link></li>
                <li><a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Consumer Helpline</a></li>
                <li><a href="https://services.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Government Services</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} Adhikar.ai — Making justice accessible to every citizen.
            </p>
            <div className="flex gap-4 text-slate-600 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
