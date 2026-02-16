import React, { useState } from 'react';
import axios from 'axios';
import { FileText, User, ArrowRight, ArrowLeft, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const FileUpload = ({ onAnalysisComplete }) => {
  // Step wizard state
  const [step, setStep] = useState(1);

  // Step 1: Case details
  const [caseDetails, setCaseDetails] = useState('');

  // Step 2: User details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [opponentAddress, setOpponentAddress] = useState('');
  const [dateOfEvent, setDateOfEvent] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');
  const [resolutionRequested, setResolutionRequested] = useState('');

  // Step 3: Evidence
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  // Loading & errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const handleSubmit = async () => {
    if (!caseDetails.trim()) {
      setError('Please describe your legal issue.');
      setStep(1);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/analyze`, {
        details: caseDetails,
        evidence: file ? { name: file.name, type: file.name.split('.').pop().toUpperCase() } : null
      });

      const userDetails = {
        fullName, email, phone, address,
        opponentName, opponentAddress,
        dateOfEvent, serviceDetails, resolutionRequested,
      };

      // Convert file to data URL for parent
      let evidenceData = null;
      if (file) {
        const reader = new FileReader();
        evidenceData = await new Promise((resolve) => {
          reader.onload = (e) => resolve({ name: file.name, data: e.target.result });
          reader.readAsDataURL(file);
        });
      }

      onAnalysisComplete(response.data, caseDetails, userDetails, evidenceData);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canGoNext = () => {
    if (step === 1) return caseDetails.trim().length >= 20;
    if (step === 2) return fullName.trim() && opponentName.trim();
    return true;
  };

  // Step Progress
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-10 font-ui">
      {[
        { num: 1, label: "Your Issue" },
        { num: 2, label: "Details" },
        { num: 3, label: "Review" }
      ].map((s, i) => (
        <React.Fragment key={s.num}>
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
              ${step >= s.num
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-parchment)] text-[var(--color-ink-faint)] border border-[var(--color-border)]'}
            `}>
              {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
            </div>
            <span className={`text-xs ${step >= s.num ? 'text-[var(--color-accent)] font-semibold' : 'text-[var(--color-ink-faint)]'}`}>
              {s.label}
            </span>
          </div>
          {i < 2 && (
            <div className={`w-16 md:w-24 h-0.5 mx-2 mb-6 rounded ${step > s.num ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <StepIndicator />

      <div className="paper-card p-8 md:p-10">
        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 rounded-xl bg-[rgba(166,61,47,0.06)] border border-[rgba(166,61,47,0.15)] text-[var(--color-red)] text-sm font-ui">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Step 1: Describe Issue */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[var(--color-parchment)] border border-[var(--color-border)] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[var(--color-ink)]">What happened?</h3>
                <p className="text-sm text-[var(--color-ink-muted)] font-ui">Describe your legal issue in detail.</p>
              </div>
            </div>

            <textarea
              value={caseDetails}
              onChange={(e) => setCaseDetails(e.target.value)}
              placeholder="Example: My landlord has refused to return my security deposit of ₹50,000 despite completing the full lease term and leaving the property in good condition..."
              className="input-warm min-h-[200px] resize-y"
              rows={8}
            />
            <p className="text-xs text-[var(--color-ink-faint)] mt-2 font-ui">
              {caseDetails.length < 20 ? `At least 20 characters required (${caseDetails.length}/20)` : `${caseDetails.length} characters`}
            </p>
          </div>
        )}

        {/* Step 2: Your Details */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[var(--color-parchment)] border border-[var(--color-border)] flex items-center justify-center">
                <User className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[var(--color-ink)]">Your Details</h3>
                <p className="text-sm text-[var(--color-ink-muted)] font-ui">For the legal notice header. Fields marked * are required.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui font-medium text-[var(--color-ink-light)] mb-1.5">Your Full Name *</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" className="input-warm" />
                </div>
                <div>
                  <label className="block text-sm font-ui font-medium text-[var(--color-ink-light)] mb-1.5">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@email.com" className="input-warm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui font-medium text-[var(--color-ink-light)] mb-1.5">Phone</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className="input-warm" />
                </div>
                <div>
                  <label className="block text-sm font-ui font-medium text-[var(--color-ink-light)] mb-1.5">Date of Incident</label>
                  <input type="date" value={dateOfEvent} onChange={e => setDateOfEvent(e.target.value)} className="input-warm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-ui font-medium text-[var(--color-ink-light)] mb-1.5">Your Address</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main Street, City, State" className="input-warm" />
              </div>

              <div className="border-t border-[var(--color-border-light)] pt-4 mt-2">
                <p className="text-xs text-[var(--color-ink-faint)] font-ui uppercase tracking-wider mb-3">Opposing Party</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-ui font-medium text-[var(--color-ink-light)] mb-1.5">Opponent Name *</label>
                    <input type="text" value={opponentName} onChange={e => setOpponentName(e.target.value)} placeholder="Company/Person name" className="input-warm" />
                  </div>
                  <div>
                    <label className="block text-sm font-ui font-medium text-[var(--color-ink-light)] mb-1.5">Opponent Address</label>
                    <input type="text" value={opponentAddress} onChange={e => setOpponentAddress(e.target.value)} placeholder="Their address" className="input-warm" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-ui font-medium text-[var(--color-ink-light)] mb-1.5">Service/Product Details</label>
                <input type="text" value={serviceDetails} onChange={e => setServiceDetails(e.target.value)} placeholder="What service or product is this about?" className="input-warm" />
              </div>

              <div>
                <label className="block text-sm font-ui font-medium text-[var(--color-ink-light)] mb-1.5">Resolution Requested</label>
                <input type="text" value={resolutionRequested} onChange={e => setResolutionRequested(e.target.value)} placeholder="What outcome do you want? (e.g., Full refund of ₹50,000)" className="input-warm" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[var(--color-parchment)] border border-[var(--color-border)] flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[var(--color-green)]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[var(--color-ink)]">Review & Submit</h3>
                <p className="text-sm text-[var(--color-ink-muted)] font-ui">Verify your details and optionally attach evidence.</p>
              </div>
            </div>

            {/* Summary */}
            <div className="paper-card-warm p-5 mb-6">
              <h4 className="font-ui font-semibold text-sm text-[var(--color-ink)] mb-3">Summary</h4>
              <div className="space-y-2 text-sm font-body text-[var(--color-ink-light)]">
                <p><span className="font-ui font-medium text-[var(--color-ink)]">Issue:</span> {caseDetails.substring(0, 150)}{caseDetails.length > 150 ? '...' : ''}</p>
                <p><span className="font-ui font-medium text-[var(--color-ink)]">Complainant:</span> {fullName || 'Not specified'}</p>
                <p><span className="font-ui font-medium text-[var(--color-ink)]">Against:</span> {opponentName || 'Not specified'}</p>
                {dateOfEvent && <p><span className="font-ui font-medium text-[var(--color-ink)]">Date:</span> {dateOfEvent}</p>}
                {resolutionRequested && <p><span className="font-ui font-medium text-[var(--color-ink)]">Seeking:</span> {resolutionRequested}</p>}
              </div>
            </div>

            {/* Evidence Upload */}
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer
                ${dragging ? 'border-[var(--color-accent)] bg-[var(--color-accent-glow)]' : 'border-[var(--color-border)] hover:border-[var(--color-accent-light)]'}
              `}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input id="file-input" type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx" />
              {file ? (
                <div className="flex items-center justify-center gap-3 text-[var(--color-green)]">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-ui text-sm font-medium">{file.name}</span>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 mx-auto text-[var(--color-ink-faint)] mb-2" />
                  <p className="text-sm text-[var(--color-ink-muted)] font-ui">Drop evidence here or <span className="text-[var(--color-accent)] font-medium">browse</span></p>
                  <p className="text-xs text-[var(--color-ink-faint)] mt-1 font-ui">Images, PDFs, or documents (optional)</p>
                </>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-[var(--color-ink-faint)] mt-4 font-ui leading-relaxed">
              ⚖ By submitting, you agree to our <a href="/terms" className="text-[var(--color-accent)] hover:underline">Terms of Service</a>.
              Adhikar.ai provides AI-assisted drafting and does not constitute legal advice.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--color-border-light)]">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors font-ui text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canGoNext()}
              className={`flex items-center gap-2 font-ui text-sm px-6 py-3 rounded-xl transition-all
                ${canGoNext() ? 'btn-primary' : 'bg-[var(--color-parchment)] text-[var(--color-ink-faint)] cursor-not-allowed'}
              `}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary flex items-center gap-2 font-ui text-sm px-8 py-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  Submit Claim <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
