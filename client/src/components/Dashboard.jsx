import React, { useState, useEffect, useRef } from 'react';
import { FileText, Download, Mail, CheckCircle, AlertTriangle, Shield, TrendingUp, ArrowLeft, Printer, Edit3, Image, Eye, X } from 'lucide-react';

const severityConfig = {
  low: { label: "Low", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", bar: "bg-yellow-400" },
  medium: { label: "Medium", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", bar: "bg-orange-400" },
  high: { label: "High", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", bar: "bg-red-400" },
  critical: { label: "Critical", color: "text-red-500", bg: "bg-red-600/10 border-red-600/20", bar: "bg-red-500" },
};

const Dashboard = ({ analysis, caseDetails, userDetails, evidenceFile, onBack }) => {
  const [draft, setDraft] = useState("");
  const [isDrafting, setIsDrafting] = useState(true);
  const [refNumber, setRefNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const draftRef = useRef(null);

  const severity = severityConfig[analysis.severity] || severityConfig.low;

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const response = await fetch('/api/draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            analysis,
            caseDetails,
            userDetails: {
              fullName: userDetails?.fullName || "John Doe",
              address: userDetails?.address || "123 Citizen Street, New Delhi",
              phone: userDetails?.phone || "",
              email: userDetails?.email || "",
              opponentName: userDetails?.opponentName || "XYZ E-commerce Ltd",
              opponentAddress: userDetails?.opponentAddress || "Business Park, Sector 44, Gurgaon",
              serviceDetails: userDetails?.serviceDetails || "Services/Products",
              dateOfEvent: userDetails?.dateOfEvent || "N/A",
              resolutionRequested: userDetails?.resolutionRequested || "Full Refund / Compensation"
            }
          })
        });
        const data = await response.json();
        setDraft(data.draft);
        setRefNumber(data.refNumber || "");
      } catch (error) {
        console.error("Drafting failed", error);
        setDraft("Error generating draft. Please ensure the backend server is running.");
      } finally {
        setIsDrafting(false);
      }
    };
    fetchDraft();
  }, [analysis, caseDetails, userDetails]);


  const handleDownloadPDF = () => {
    // Convert plain-text draft into structured HTML
    const htmlContent = draft
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '<div style="height:8px;"></div>';
        if (/^[A-Z][A-Z\s\/\-:,.()]+$/.test(trimmed) && trimmed.length < 80) {
          return `<p style="font-weight:bold; margin:14px 0 4px 0; font-size:12pt;">${trimmed}</p>`;
        }
        if (/^[=\-_]{3,}/.test(trimmed)) {
          return '<hr style="border:none; border-top:1.5px solid #000; margin:10px 0;">';
        }
        return `<p style="margin:3px 0;">${trimmed}</p>`;
      })
      .join('');

    // Use a hidden iframe to avoid about:blank flash
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head>
      <title>Legal Notice - ${refNumber || 'Adhikar.ai'}</title>
      <style>
        @page { size: A4; margin: 2cm 2.5cm; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; color: #000; background: #fff; text-align: justify; }
        .header { text-align: center; border-bottom: 3px double #000; padding-bottom: 12px; margin-bottom: 18px; }
        .header h1 { font-size: 18pt; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 2px; }
        .header .ref { font-size: 10pt; color: #444; }
        .content p { text-indent: 0; }
        .footer { margin-top: 36px; padding-top: 12px; border-top: 1px solid #999; font-size: 9pt; color: #666; text-align: center; }
      </style>
    </head><body>
      <div class="header"><h1>Legal Notice</h1>
        <div class="ref">${refNumber ? `Ref: ${refNumber}` : ''} &nbsp;|&nbsp; Adhikar.ai</div>
      </div>
      <div class="content">${htmlContent}</div>
      <div class="footer">Generated via Adhikar.ai — AI Legal Assistant. Please review with a qualified legal professional before use.</div>
    </body></html>`);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    }, 400);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Legal Notice - ${analysis.violation} | Ref: ${refNumber}`);
    const body = encodeURIComponent(draft);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-8 md:py-14 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-3">
            <ArrowLeft className="w-4 h-4" /> Back to Upload
          </button>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Case Dashboard</h2>
          {refNumber && <p className="text-slate-500 text-sm mt-1">Reference: {refNumber}</p>}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium transition-all ${isEditing ? 'border border-yellow-500/40 text-yellow-400' : 'gradient-border text-white hover:brightness-125'}`}
          >
            <Edit3 className="w-4 h-4" /> {isEditing ? 'Editing...' : 'Edit Draft'}
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-2.5 glass gradient-border text-white rounded-xl text-sm font-medium transition-all hover:brightness-125"
          >
            <Printer className="w-4 h-4" /> Download PDF
          </button>
          <button
            onClick={handleSendEmail}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-blue-600/20"
          >
            <Mail className="w-4 h-4" /> Send via Email
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Analysis Card */}
          <div className="glass gradient-border p-7 rounded-3xl animate-slide-in-left">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-slate-400 uppercase text-xs font-bold tracking-widest">Legal Analysis</h3>
              <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${severity.bg} ${severity.color}`}>
                {severity.label} Severity
              </div>
            </div>

            <div className="flex items-start mb-5">
              <div className="p-2.5 bg-green-500/10 rounded-xl mr-3 border border-green-500/20">
                <CheckCircle className="text-green-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">{analysis.violation}</h4>
                <p className="text-green-400 text-sm font-semibold">Violation Detected</p>
              </div>
            </div>

            {/* Confidence bar */}
            <div className="mb-5">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">AI Confidence</span>
                <span className="text-white font-bold">{(analysis.confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                  style={{ width: `${analysis.confidence * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <InfoBlock label="Relevant Act" value={analysis.act} />
              <InfoBlock label="Key Section" value={analysis.section} />
            </div>

            <p className="text-slate-400 text-sm italic mt-4 leading-relaxed">
              "{analysis.summary}"
            </p>
          </div>

          {/* Recommendations */}
          {analysis.recommendations && (
            <div className="glass gradient-border p-7 rounded-3xl animate-slide-in-left delay-200">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-white font-bold">Recommendations</h3>
              </div>
              <ul className="space-y-3">
                {analysis.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-blue-400">{i + 1}</span>
                    </div>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl animate-slide-in-left delay-300">
            <div className="flex items-center mb-3 text-blue-400">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <h4 className="font-bold">Next Steps</h4>
            </div>
            <ul className="text-slate-300 text-sm space-y-2.5 list-none">
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> Review the generated draft carefully</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> Click "Edit Draft" to customize text</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> Send via Registered Post or Email</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> Keep a copy for your records</li>
            </ul>
          </div>

          {/* Attached Evidence */}
          {evidenceFile && (
            <div className="bg-emerald-600/10 border border-emerald-500/20 p-6 rounded-3xl animate-slide-in-left delay-400">
              <div className="flex items-center mb-3 text-emerald-400">
                <Image className="w-5 h-5 mr-2" />
                <h4 className="font-bold">Attached Evidence</h4>
              </div>
              <div className="bg-black/20 rounded-2xl p-3 border border-white/5">
                {evidenceFile.type?.startsWith('image/') ? (
                  <img
                    src={evidenceFile.dataUrl}
                    alt="Evidence"
                    className="w-full max-h-40 object-contain rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setShowEvidence(true)}
                  />
                ) : (
                  <div className="flex items-center gap-3 p-2">
                    <FileText className="w-8 h-8 text-emerald-400" />
                    <div>
                      <p className="text-white text-sm font-medium">{evidenceFile.name}</p>
                      <p className="text-slate-500 text-xs">{(evidenceFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                  <p className="text-slate-500 text-xs truncate">{evidenceFile.name} — {(evidenceFile.size / 1024).toFixed(1)} KB</p>
                  <button
                    onClick={() => setShowEvidence(true)}
                    className="flex items-center gap-1 text-emerald-400 text-xs hover:text-emerald-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Evidence Fullscreen Modal */}
          {showEvidence && evidenceFile && (
            <div
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
              onClick={() => setShowEvidence(false)}
            >
              <div style={{ position: 'relative', width: evidenceFile.type?.startsWith('image/') ? 'auto' : '90vw', maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setShowEvidence(false)}
                  style={{ position: 'absolute', top: '-16px', right: '-16px', zIndex: 10, background: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                {evidenceFile.type?.startsWith('image/') ? (
                  <img src={evidenceFile.dataUrl} alt="Evidence" style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} />
                ) : (
                  <iframe src={evidenceFile.dataUrl} title="Evidence PDF" style={{ width: '100%', height: '80vh', borderRadius: '12px', border: 'none', background: '#fff' }} />
                )}
                <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '12px' }}>{evidenceFile.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Draft Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-bold text-xl flex items-center">
              <FileText className="w-6 h-6 mr-2 text-blue-400" />
              Legal Notice Draft
            </h3>
            <div className="flex items-center gap-2 text-xs">
              {isEditing && <span className="text-yellow-400 font-medium mr-2">✏️ Edit Mode</span>}
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-medium">AI Generated</span>
            </div>
          </div>

          <div className="relative" ref={draftRef}>
            {isDrafting ? (
              <div className="h-[650px] glass gradient-border rounded-3xl flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500/30 border-t-blue-500 mb-5" />
                <p className="text-slate-400 animate-pulse font-medium">Generating your legal notice...</p>
              </div>
            ) : isEditing ? (
              /* Edit Mode — full textarea */
              <textarea
                className="legal-document-editor w-full min-h-[calc(100vh-180px)] resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500/30 rounded-xl"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                spellCheck="false"
                placeholder="Start typing your legal notice..."
              />
            ) : (
              /* Read Mode — styled document preview */
              <div className="legal-document-editor min-h-[calc(100vh-180px)] overflow-y-auto rounded-xl cursor-pointer" onClick={() => setIsEditing(true)}>
                {draft}
              </div>
            )}
          </div>

          {/* Bottom action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleDownloadPDF}
              className="py-4 glass gradient-border text-white rounded-2xl font-bold transition-all hover:brightness-125 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download as PDF
            </button>
            <button
              onClick={handleSendEmail}
              className="py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-[0_15px_40px_-15px_rgba(59,130,246,0.7)] flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Send via Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBlock = ({ label, value }) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
    <p className="text-slate-500 text-xs mb-0.5 font-medium">{label}</p>
    <p className="text-white font-semibold text-sm">{value}</p>
  </div>
);

export default Dashboard;
