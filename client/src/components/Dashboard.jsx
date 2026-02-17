import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import {
  Scale, AlertTriangle, CheckCircle, Download, Mail, Edit3,
  ArrowLeft, Shield, BookOpen, Paperclip, Copy, ExternalLink, Info, FileText
} from 'lucide-react';

const Dashboard = ({ analysis, caseDetails, caseId, userDetails, evidenceFile, onBack }) => {
  const [editMode, setEditMode] = useState(false);
  const [draftContent, setDraftContent] = useState('');
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || '';

  const generateDraft = async () => {
    setLoadingDraft(true);
    try {
      const response = await fetch(`${API_URL}/api/draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userDetails,
          analysis,
          caseDetails,
          caseId,
          evidence: evidenceFile ? { name: evidenceFile.name, type: evidenceFile.name.split('.').pop().toUpperCase() } : null
        })
      });
      const data = await response.json();
      setDraftContent(data.draft);
      setRefNumber(data.refNumber);
      setDraftLoaded(true);
    } catch (err) {
      console.error('Draft generation failed:', err);
    } finally {
      setLoadingDraft(false);
    }
  };

  React.useEffect(() => {
    if (!draftLoaded) generateDraft();
  }, []);

  /* ═══════════════════════════════════════════
     PROFESSIONAL LEGAL NOTICE PDF GENERATOR
     ═══════════════════════════════════════════ */
  const downloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const marginL = 22;
    const marginR = 22;
    const contentW = pageW - marginL - marginR;
    let y = 0;
    let pageNum = 1;

    const drawPageBorder = () => {
      doc.setDrawColor(139, 105, 20);
      doc.setLineWidth(0.6);
      doc.rect(12, 10, pageW - 24, pageH - 20);
      doc.setDrawColor(200, 180, 140);
      doc.setLineWidth(0.2);
      doc.rect(14, 12, pageW - 28, pageH - 24);
    };

    const drawPageNumber = () => {
      doc.setFont('times', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150, 130, 100);
      doc.text(`Page ${pageNum}`, pageW / 2, pageH - 14, { align: 'center' });
    };

    const addNewPage = () => {
      doc.addPage();
      pageNum++;
      y = 22;
      drawPageBorder();
      // Reset text style for body content
      doc.setFont('times', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(30, 30, 30);
    };

    const checkPageBreak = (needed = 12) => {
      if (y > pageH - 30 - needed) addNewPage();
    };

    // ── Page 1 border ──
    drawPageBorder();

    // ── Header ──
    y = 24;
    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(44, 36, 24);
    doc.text('LEGAL NOTICE', pageW / 2, y, { align: 'center' });

    y += 5;
    doc.setDrawColor(139, 105, 20);
    doc.setLineWidth(1);
    doc.line(marginL + 35, y, pageW - marginL - 35, y);
    doc.setLineWidth(0.3);
    doc.line(marginL + 25, y + 2, pageW - marginL - 25, y + 2);

    // ── Under the Provisions of... ──
    y += 10;
    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(100, 80, 50);
    const provisionsText = `Under the provisions of ${analysis.act || 'applicable Indian law'}`;
    doc.text(provisionsText, pageW / 2, y, { align: 'center' });

    // ── Reference & Date row ──
    y += 12;
    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(44, 36, 24);
    doc.text(`Ref: ${refNumber || 'ADH/2026/XXXX'}`, marginL, y);
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
    doc.text(`Date: ${dateStr}`, pageW - marginR, y, { align: 'right' });

    // ── Divider ──
    y += 6;
    doc.setDrawColor(139, 105, 20);
    doc.setLineWidth(0.5);
    doc.line(marginL, y, pageW - marginR, y);

    // ── TO block ──
    y += 9;
    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.text('TO:', marginL, y);
    doc.setFont('times', 'normal');
    y += 6;
    const opponentName = userDetails?.opponentName || '[Opponent Name]';
    const opponentAddr = userDetails?.opponentAddress || '[Opponent Address]';
    doc.text(opponentName, marginL + 6, y);
    y += 5;
    const addrLines = doc.splitTextToSize(opponentAddr, contentW - 10);
    addrLines.forEach(line => {
      checkPageBreak();
      doc.text(line, marginL + 6, y);
      y += 5;
    });

    // ── FROM block ──
    y += 5;
    doc.setFont('times', 'bold');
    doc.text('FROM:', marginL, y);
    doc.setFont('times', 'normal');
    y += 6;
    doc.text(userDetails?.fullName || '[Your Name]', marginL + 6, y);
    y += 5;
    if (userDetails?.address) {
      const fromAddr = doc.splitTextToSize(userDetails.address, contentW - 10);
      fromAddr.forEach(line => {
        checkPageBreak();
        doc.text(line, marginL + 6, y);
        y += 5;
      });
    }
    if (userDetails?.email) {
      doc.text(`Email: ${userDetails.email}`, marginL + 6, y);
      y += 5;
    }
    if (userDetails?.phone) {
      doc.text(`Phone: ${userDetails.phone}`, marginL + 6, y);
      y += 5;
    }

    // ── Subject line ──
    y += 5;
    doc.setDrawColor(200, 180, 140);
    doc.setLineWidth(0.3);
    doc.line(marginL, y, pageW - marginR, y);
    y += 8;
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('SUBJECT:', marginL, y);
    doc.setFont('times', 'normal');
    doc.setFontSize(10.5);
    y += 7;
    const subjectText = `Legal Notice regarding ${analysis.violation || 'the matter at hand'} under ${analysis.act || 'applicable law'}, ${analysis.section || 'relevant sections'}`;
    const subjectLines = doc.splitTextToSize(subjectText, contentW);
    subjectLines.forEach(line => {
      checkPageBreak();
      doc.text(line, marginL, y);
      y += 5.5;
    });

    // ── Divider before body ──
    y += 4;
    doc.setDrawColor(139, 105, 20);
    doc.setLineWidth(0.8);
    doc.line(marginL, y, pageW - marginR, y);

    // ── Body text ──
    y += 10;
    doc.setFont('times', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(30, 30, 30);

    // Sanitize characters that jsPDF cannot render (causes width miscalculation)
    const sanitized = draftContent.replace(/\u20B9/g, 'Rs.').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
    const paragraphs = sanitized.split('\n');
    let contentStarted = false;

    paragraphs.forEach(para => {
      const trimmed = para.trim();
      if (!trimmed) {
        if (contentStarted) y += 3;
        return;
      }

      // Skip redundant header info if we haven't started the main content yet
      // This avoids duplicating the TO, FROM, DATE, SUBJECT, Phone, Email which we already drew
      if (!contentStarted) {
        const isHeader = /^(TO:|TO,|FROM:|FROM,|SUBJECT:|DATE:|REF NUMBER:|REF NO\.|REF:|LEGAL NOTICE|NOTICE)/i.test(trimmed)
          || /^(Phone:|Email:|Mob:|Tel:|Fax:)/i.test(trimmed)
          || trimmed.includes('════')
          || trimmed.includes('────')
          || trimmed.includes('___');

        if (isHeader) return;

        // Only start body content at a clear salutation or numbered section heading
        if (/^(Dear|Respected|Sir|Madam)/i.test(trimmed) || /^\d+\.\s+(BACKGROUND|GRIEVANCE|FACTS|LEGAL|DEMAND|STATEMENT)/i.test(trimmed)) {
          contentStarted = true;
        } else {
          // Skip everything else (opponent names, addresses, phone numbers, etc.)
          return;
        }
      }

      // Decorative separators from AI output
      if (trimmed.startsWith('═') || trimmed.startsWith('─') || trimmed.startsWith('___')) {
        y += 2;
        checkPageBreak();
        doc.setDrawColor(180, 160, 120);
        doc.setLineWidth(0.2);
        doc.line(marginL, y, pageW - marginR, y);
        y += 4;
        return;
      }

      // Check if line is a section heading
      const isHeading = /^(TO:|FROM:|SUBJECT:|BACKGROUND|GRIEVANCE|LEGAL BASIS|DEMAND|CONSEQUENCE|CC:|SIGNATURE|RE:|NOTICE|DISCLAIMER|PRAYER|RELIEF|FACTS|STATEMENT)/i.test(trimmed)
        || (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 60 && !/^\d/.test(trimmed))
        || (/^[A-Z][A-Za-z\s\/]+:$/.test(trimmed) && trimmed.length < 40);

      // Check if numbered paragraph (1. BACKGROUND or 1. Some text)
      const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/);

      if (isHeading) {
        y += 4;
        checkPageBreak(10);
        doc.setFont('times', 'bold');
        doc.setFontSize(11);
        const headLines = doc.splitTextToSize(trimmed, contentW - 4);
        headLines.forEach(line => {
          checkPageBreak();
          doc.text(line, marginL, y);
          y += 6;
        });
        doc.setFont('times', 'normal');
        doc.setFontSize(10.5);
      } else if (numberedMatch) {
        // Numbered paragraphs with proper indentation
        y += 3;
        checkPageBreak(10);
        doc.setFont('times', 'bold');
        doc.setFontSize(10.5);
        doc.text(`${numberedMatch[1]}.`, marginL, y);
        doc.setFont('times', 'normal');
        const bodyLines = doc.splitTextToSize(numberedMatch[2], contentW - 12);
        bodyLines.forEach((line, idx) => {
          checkPageBreak();
          doc.text(line, marginL + 10, y);
          y += 5.5;
        });
      } else {
        const bodyLines = doc.splitTextToSize(trimmed, contentW - 2);
        bodyLines.forEach(line => {
          checkPageBreak();
          doc.text(line, marginL, y);
          y += 5;
        });
        y += 1;
      }
    });

    // ── Signature Block ──
    y += 15;
    checkPageBreak(40);
    doc.setDrawColor(200, 180, 140);
    doc.setLineWidth(0.3);
    doc.line(marginL, y, pageW - marginR, y);
    y += 10;
    doc.setFont('times', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(30, 30, 30);
    doc.text('Yours faithfully,', marginL, y);
    y += 15;
    doc.setFont('times', 'bold');
    doc.text(userDetails?.fullName || '[Your Name]', marginL, y);
    doc.setFont('times', 'normal');
    y += 6;
    if (userDetails?.address) {
      const sigAddr = doc.splitTextToSize(userDetails.address, contentW / 2);
      sigAddr.forEach(line => {
        doc.text(line, marginL, y);
        y += 5;
      });
    }
    y += 3;
    doc.text(`Date: ${dateStr}`, marginL, y);
    y += 5;
    doc.text('Place: ___________________', marginL, y);

    // ── Verification Section ──
    y += 15;
    checkPageBreak(30);
    doc.setDrawColor(139, 105, 20);
    doc.setLineWidth(0.5);
    doc.line(marginL, y, pageW - marginR, y);
    y += 8;
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('VERIFICATION', marginL, y);
    y += 8;
    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    const verificationText = `I, ${userDetails?.fullName || '[Your Name]'}, do hereby verify that the contents of the above notice are true and correct to the best of my knowledge and belief and nothing has been concealed therein.`;
    const verLines = doc.splitTextToSize(verificationText, contentW);
    verLines.forEach(line => {
      checkPageBreak();
      doc.text(line, marginL, y);
      y += 5.5;
    });
    y += 10;
    doc.text('Signature: ___________________', marginL, y);
    y += 6;
    doc.text(`Date: ${dateStr}`, marginL, y);

    // ── Evidence Annexure (if evidence attached) ──
    if (evidenceFile) {
      addNewPage();
      y = 24;
      doc.setFont('times', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(44, 36, 24);
      doc.text('ANNEXURE — SUPPORTING EVIDENCE', pageW / 2, y, { align: 'center' });

      y += 5;
      doc.setDrawColor(139, 105, 20);
      doc.setLineWidth(0.8);
      doc.line(marginL + 20, y, pageW - marginL - 20, y);

      y += 12;
      doc.setFont('times', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(30, 30, 30);

      doc.setFont('times', 'bold');
      doc.text('Document Details:', marginL, y);
      doc.setFont('times', 'normal');
      y += 7;
      doc.text(`File Name: ${evidenceFile.name || 'Unknown'}`, marginL + 6, y);
      y += 5.5;
      doc.text(`Date Attached: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}`, marginL + 6, y);
      y += 5.5;

      const isImage = evidenceFile.name && /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(evidenceFile.name);
      doc.text(`File Type: ${isImage ? 'Photographic Evidence' : 'Documentary Evidence'}`, marginL + 6, y);
      y += 10;

      // Embed image if it's a photo
      if (isImage && evidenceFile.data) {
        try {
          const imgProps = doc.getImageProperties(evidenceFile.data);
          const maxW = contentW - 20;
          const maxH = 120;
          let imgW = imgProps.width;
          let imgH = imgProps.height;
          const scale = Math.min(maxW / imgW, maxH / imgH, 1);
          imgW *= scale;
          imgH *= scale;

          checkPageBreak(imgH + 20);

          // Image border
          doc.setDrawColor(180, 160, 120);
          doc.setLineWidth(0.3);
          const imgX = marginL + (contentW - imgW) / 2;
          doc.rect(imgX - 2, y - 2, imgW + 4, imgH + 4);
          doc.addImage(evidenceFile.data, 'JPEG', imgX, y, imgW, imgH);
          y += imgH + 8;

          doc.setFont('times', 'italic');
          doc.setFontSize(8);
          doc.setTextColor(120, 100, 70);
          doc.text('Photographic evidence as submitted by the complainant', pageW / 2, y, { align: 'center' });
          y += 8;
        } catch {
          doc.text('[Image could not be embedded — see attached file]', marginL + 6, y);
          y += 8;
        }
      } else {
        doc.setFont('times', 'italic');
        doc.setFontSize(10);
        doc.text('[Documentary evidence attached separately — see original file]', marginL + 6, y);
        y += 8;
      }

      // Note about evidence
      y += 5;
      doc.setFont('times', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80, 60, 40);
      const evidenceNote = 'Note: This evidence is submitted as part of the legal notice and may be presented before the appropriate forum/court as supporting documentation. The authenticity of this evidence is hereby affirmed by the complainant.';
      const noteLines = doc.splitTextToSize(evidenceNote, contentW);
      noteLines.forEach(line => {
        checkPageBreak();
        doc.text(line, marginL, y);
        y += 4.5;
      });
    }

    // ── Footer on last page ──
    y += 12;
    checkPageBreak(20);
    doc.setDrawColor(139, 105, 20);
    doc.setLineWidth(0.5);
    doc.line(marginL, y, pageW - marginR, y);
    y += 7;
    doc.setFont('times', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(120, 100, 70);
    doc.text('Generated by Adhikar.ai — AI Legal Notice Generator', pageW / 2, y, { align: 'center' });
    y += 4;
    doc.text('This document is AI-generated and should be reviewed by a qualified advocate before use.', pageW / 2, y, { align: 'center' });
    y += 4;
    if (caseId) {
      doc.text(`Case ID: ${caseId}`, pageW / 2, y, { align: 'center' });
    }

    // ── Add page numbers to all pages ──
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('times', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150, 130, 100);
      doc.text(`Page ${i} of ${totalPages}`, pageW / 2, pageH - 14, { align: 'center' });
    }

    doc.save(`Legal-Notice-${refNumber || 'draft'}.pdf`);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Legal Notice — ${refNumber}`);
    const body = encodeURIComponent(draftContent);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const severityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'tag-red';
      case 'high': return 'tag-red';
      case 'medium': return 'tag-gold';
      case 'low': return 'tag-green';
      default: return 'tag-blue';
    }
  };

  return (
    <div className="py-12 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] text-sm font-ui mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Form
          </button>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-ink)]">Case Analysis</h1>
          {caseId && (
            <p className="text-xs text-[var(--color-ink-faint)] font-ui mt-1">Case ID: {caseId}</p>
          )}
        </div>
        <div className="flex gap-3">
          <button onClick={downloadPDF} disabled={!draftLoaded} className="btn-primary px-5 py-2.5 flex items-center gap-2 font-ui text-sm disabled:opacity-50">
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button onClick={handleEmail} disabled={!draftLoaded} className="btn-outline px-5 py-2.5 flex items-center gap-2 font-ui text-sm disabled:opacity-50">
            <Mail className="w-4 h-4" /> Email
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Analysis Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* Violation Card */}
          <div className="paper-card-accent p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="icon-box icon-box-gold">
                <Scale className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-[var(--color-ink)]">{analysis.violation}</h3>
                <p className="text-sm text-[var(--color-ink-muted)] font-ui mt-0.5">{analysis.act}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[var(--color-border-light)]">
                <span className="text-sm text-[var(--color-ink-muted)] font-ui">Section</span>
                <span className="text-sm font-semibold text-[var(--color-ink)] font-ui">{analysis.section}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--color-border-light)]">
                <span className="text-sm text-[var(--color-ink-muted)] font-ui">Confidence</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-[var(--color-parchment)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-500" style={{ width: `${(analysis.confidence || 0) * 100}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-ink)] font-ui">{((analysis.confidence || 0) * 100).toFixed(0)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[var(--color-ink-muted)] font-ui">Severity</span>
                <span className={`tag text-xs ${severityColor(analysis.severity)}`}>
                  {analysis.severity?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="paper-card p-6">
            <h4 className="font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--color-accent)]" /> Analysis
            </h4>
            <p className="text-sm text-[var(--color-ink-light)] leading-relaxed font-body">{analysis.summary}</p>
          </div>

          {/* Recommendations */}
          <div className="paper-card p-6">
            <h4 className="font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--color-green)]" /> Next Steps
            </h4>
            <ul className="space-y-2.5">
              {(analysis.recommendations || []).map((rec, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--color-ink-light)] font-body">
                  <CheckCircle className="w-4 h-4 text-[var(--color-green)] flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evidence */}
          {evidenceFile && (
            <div className="paper-card p-6">
              <h4 className="font-display font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-[var(--color-amber)]" /> Attached Evidence
              </h4>

              {/* Image preview */}
              {evidenceFile.data && evidenceFile.data.startsWith('data:image') && (
                <div className="mb-4 rounded-lg overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-warm)]">
                  <img
                    src={evidenceFile.data}
                    alt="Evidence"
                    className="w-full h-auto max-h-64 object-contain"
                  />
                </div>
              )}

              {/* PDF placeholder */}
              {evidenceFile.data && evidenceFile.data.startsWith('data:application/pdf') && (
                <div className="mb-4 p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-warm)] text-center">
                  <FileText className="w-10 h-10 text-[var(--color-accent)] mx-auto mb-2" />
                  <p className="text-sm font-ui text-[var(--color-ink-muted)]">PDF Document Attached</p>
                </div>
              )}

              {/* File details */}
              <div className="bg-[var(--color-parchment)] p-3 rounded-lg border border-[var(--color-border)] text-sm font-ui space-y-1.5">
                <div className="flex items-center gap-2 text-[var(--color-ink-light)]">
                  <Paperclip className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" />
                  <span className="font-semibold" style={{ wordBreak: 'break-all' }}>{evidenceFile.name}</span>
                </div>
                <p className="text-xs text-[var(--color-ink-faint)] pl-[22px]">
                  Captured on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Evidentiary value note */}
              <div className="mt-3 p-3 rounded-lg border border-[rgba(139,105,20,0.12)] bg-[rgba(139,105,20,0.04)] text-xs text-[var(--color-ink-muted)] font-ui leading-relaxed">
                <p className="font-semibold text-[var(--color-accent)] mb-1">⚖ Evidentiary Value</p>
                This document is timestamped and stored securely as supporting evidence for Case {caseId || '—'}.
                Photographs, screenshots, receipts, and contracts strengthen your legal notice by providing proof of the disputed transaction or incident.
                Keep original copies safe for court proceedings.
              </div>
            </div>
          )}
        </div>

        {/* Right: Legal Notice Draft */}
        <div className="lg:col-span-2">
          <div className="paper-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <h3 className="font-display font-bold text-[var(--color-ink)]">Legal Notice</h3>
                {refNumber && <span className="tag tag-gold text-xs">{refNumber}</span>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-[var(--color-parchment)] transition-colors text-[var(--color-ink-muted)]" title="Copy">
                  {copied ? <CheckCircle className="w-4 h-4 text-[var(--color-green)]" /> : <Copy className="w-4 h-4" />}
                </button>
                <button onClick={() => setEditMode(!editMode)} className={`p-2 rounded-lg hover:bg-[var(--color-parchment)] transition-colors ${editMode ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink-muted)]'}`} title="Edit">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {loadingDraft ? (
              <div className="p-16 text-center">
                <div className="inline-flex items-center gap-3 text-[var(--color-ink-muted)] font-ui text-sm">
                  <div className="animate-spin w-5 h-5 border-2 border-[var(--color-accent)] border-t-transparent rounded-full" />
                  Drafting your legal notice...
                </div>
              </div>
            ) : (
              editMode ? (
                <textarea
                  value={draftContent}
                  onChange={e => setDraftContent(e.target.value)}
                  className="legal-document-editor min-h-[600px] outline-none resize-y border-none rounded-none"
                />
              ) : (
                <div className="legal-document-editor min-h-[600px] notebook-lines">
                  {draftContent}
                </div>
              )
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-4 flex items-start gap-2 p-4 rounded-xl bg-[rgba(139,105,20,0.05)] border border-[rgba(139,105,20,0.12)]">
            <Info className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[var(--color-ink-muted)] font-ui leading-relaxed">
              This AI-generated draft is for informational purposes only and does not constitute legal advice.
              Please review with a qualified advocate before use. All case records are stored securely for your protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
