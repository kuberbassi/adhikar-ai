import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, X, User, MapPin, Phone, Mail } from 'lucide-react';

const FileUpload = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [caseDetails, setCaseDetails] = useState("");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    opponentName: "",
    opponentAddress: "",
    serviceDetails: "",
    dateOfEvent: "",
    resolutionRequested: ""
  });

  const updateField = (field, value) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!caseDetails) return alert("Please describe your issue first.");

    setIsUploading(true);
    setProgress(10);
    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ details: caseDetails })
      });
      setProgress(50);
      const analysis = await response.json();
      setProgress(100);

      // Pass analysis + user details to parent
      onAnalysisComplete(analysis, caseDetails, userDetails);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Analysis failed. Is the backend server running on port 5000?");
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <div className="p-10 md:p-14 rounded-[36px] glass gradient-border soft-shadow">
        {/* Progress bar */}
        {progress > 0 && (
          <div className="mb-8">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Describe Issue */}
        <div className="mb-8">
          <label className="block text-white text-lg font-bold mb-3">Describe Your Issue</label>
          <textarea
            className="w-full h-32 p-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30 outline-none transition-all resize-none text-sm"
            placeholder="E.g., I bought a phone from XYZ Store for ₹25,000 but it arrived defective and they won't give me a refund..."
            value={caseDetails}
            onChange={(e) => setCaseDetails(e.target.value)}
          />
        </div>

        {/* User Details Grid */}
        <div className="mb-8">
          <label className="block text-white text-lg font-bold mb-4">Your Details</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField icon={<User className="w-4 h-4" />} placeholder="Your Full Name" value={userDetails.fullName} onChange={(v) => updateField('fullName', v)} />
            <InputField icon={<MapPin className="w-4 h-4" />} placeholder="Your Address" value={userDetails.address} onChange={(v) => updateField('address', v)} />
            <InputField icon={<Phone className="w-4 h-4" />} placeholder="Phone Number" value={userDetails.phone} onChange={(v) => updateField('phone', v)} />
            <InputField icon={<Mail className="w-4 h-4" />} placeholder="Email Address" value={userDetails.email} onChange={(v) => updateField('email', v)} />
          </div>
        </div>

        {/* Opponent Details */}
        <div className="mb-8">
          <label className="block text-white text-lg font-bold mb-4">Opponent / Company Details</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField icon={<User className="w-4 h-4" />} placeholder="Opponent / Company Name" value={userDetails.opponentName} onChange={(v) => updateField('opponentName', v)} />
            <InputField icon={<MapPin className="w-4 h-4" />} placeholder="Opponent Address" value={userDetails.opponentAddress} onChange={(v) => updateField('opponentAddress', v)} />
            <InputField placeholder="Product / Service Details" value={userDetails.serviceDetails} onChange={(v) => updateField('serviceDetails', v)} />
            <InputField placeholder="Date of Incident" value={userDetails.dateOfEvent} onChange={(v) => updateField('dateOfEvent', v)} type="date" />
          </div>
          <div className="mt-4">
            <InputField placeholder="What resolution do you seek? (e.g., Full Refund of ₹25,000)" value={userDetails.resolutionRequested} onChange={(v) => updateField('resolutionRequested', v)} />
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 cursor-pointer group
            ${isDragging
              ? 'border-blue-400 bg-blue-500/10 scale-[1.01]'
              : file
                ? 'border-green-500/40 bg-green-500/5'
                : 'border-white/15 bg-white/[0.03] hover:border-blue-400/50 hover:bg-blue-500/5'
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf,.png,.jpg,.jpeg,.webp"
          />
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${file ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5 border border-white/10 group-hover:scale-110'
            }`}>
            {file ? <CheckCircle className="text-green-400 w-7 h-7" /> : <Upload className="text-blue-400 w-7 h-7" />}
          </div>
          <p className="text-white font-medium mb-1">
            {file ? (
              <span className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4 text-green-400" />
                {file.name}
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="ml-1 p-0.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </span>
            ) : "Upload Evidence (Screenshots / PDFs)"}
          </p>
          <p className="text-slate-500 text-sm">
            {file ? `${(file.size / 1024).toFixed(1)} KB` : "Drag and drop or click to browse"}
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleUpload}
          disabled={isUploading || !caseDetails}
          className={`w-full mt-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${isUploading
              ? 'bg-white/10 cursor-not-allowed text-slate-400'
              : !caseDetails
                ? 'bg-white/5 cursor-not-allowed text-slate-500'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_20px_50px_-15px_rgba(59,130,246,0.8)] hover:shadow-[0_25px_60px_-10px_rgba(59,130,246,0.9)] hover:-translate-y-0.5'
            }`}
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-3" />
              Processing...
            </>
          ) : "Analyze & Generate Draft"}
        </button>
      </div>
    </div>
  );
};

/* Reusable input field */
const InputField = ({ icon, placeholder, value, onChange, type = "text" }) => (
  <div className="relative">
    {icon && (
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
        {icon}
      </div>
    )}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30 outline-none transition-all ${icon ? 'pl-10 pr-4' : 'px-4'}`}
    />
  </div>
);

export default FileUpload;
