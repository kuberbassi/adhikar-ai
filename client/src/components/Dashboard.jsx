import React, { useState, useEffect, useRef } from 'react';
import { FileText, Download, Mail, CheckCircle, AlertTriangle, Shield, TrendingUp, ArrowLeft, Printer } from 'lucide-react';

const severityConfig = {
  low: { label: "Low", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", bar: "bg-yellow-400" },
  medium: { label: "Medium", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", bar: "bg-orange-400" },
  high: { label: "High", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", bar: "bg-red-400" },
  critical: { label: "Critical", color: "text-red-500", bg: "bg-red-600/10 border-red-600/20", bar: "bg-red-500" },
};

const Dashboard = ({ analysis, caseDetails, userDetails, onBack }) => {
  const [draft, setDraft] = useState("");
  const [isDrafting, setIsDrafting] = useState(true);
  const [refNumber, setRefNumber] = useState("");
  const draftRef = useRef(null);

  const severity = severityConfig[analysis.severity] || severityConfig.low;

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/draft', {
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
    window.print();
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
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> Fill in any missing or placeholder details</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> Send via Registered Post or Email</li>
              <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">→</span> Keep a copy for your records</li>
            </ul>
          </div>
        </div>

        {/* Draft Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-bold text-xl flex items-center">
              <FileText className="w-6 h-6 mr-2 text-blue-400" />
              Legal Notice Draft
            </h3>
            <div className="flex items-center gap-2 text-xs">
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
            ) : (
              <div className="legal-document min-h-[650px] overflow-y-auto whitespace-pre-wrap text-sm rounded-3xl">
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
