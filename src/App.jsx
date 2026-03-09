import { useState, useEffect, useRef } from "react";

const CMA_LOGO = "data:image/jpeg;base64,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";


const MODULES = [
  { id: "module1_website", label: "Website & UX", icon: "◈", color: "#C8A96E" },
  { id: "module2_seo", label: "SEO Audit", icon: "◎", color: "#7EB8A4" },
  { id: "module3_social", label: "Social Media", icon: "◇", color: "#9B8BB4" },
  { id: "module4_content", label: "Content Marketing", icon: "⬡", color: "#E87B6B" },
  { id: "module5_shareOfVoice", label: "Share of Voice", icon: "◉", color: "#5B9BD5" },
  { id: "module6_authority", label: "Brand Authority", icon: "◈", color: "#C8A96E" },
  { id: "module7_paidAds", label: "Paid Advertising", icon: "◎", color: "#7EB8A4" },
  { id: "module8_innovation", label: "Digital Maturity", icon: "◇", color: "#9B8BB4" },
];

const ANALYSIS_PHASES = [
  { id: "pagespeed", label: "Running PageSpeed analysis" },
  { id: "scraping", label: "Scraping website content" },
  { id: "searching", label: "Searching web for intelligence" },
  { id: "social", label: "Auditing social media presence" },
  { id: "seo", label: "Analyzing SEO signals" },
  { id: "competitors", label: "Benchmarking competitors" },
  { id: "paid", label: "Investigating paid advertising" },
  { id: "authority", label: "Assessing brand authority" },
  { id: "compiling", label: "Compiling Digital Maturity Score" },
];

const SOCIAL_PLATFORMS = ["linkedin", "instagram", "twitter", "facebook", "youtube", "tiktok"];

function normalizeUrl(input) {
  let url = input.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) url = "https://" + url;
  try { return new URL(url).href; } catch { return null; }
}

function extractDomain(url) {
  try { return new URL(url).hostname.replace("www.", ""); } catch { return url; }
}

function getMaturityColor(stage) {
  const colors = { 1: "#666", 2: "#E87B6B", 3: "#C8A96E", 4: "#7EB8A4", 5: "#5B9BD5" };
  return colors[stage] || "#666";
}

function getScoreColor(score) {
  if (score >= 8) return "#7EB8A4";
  if (score >= 6) return "#C8A96E";
  if (score >= 4) return "#9B8BB4";
  return "#E87B6B";
}

function getPerformanceColor(score) {
  if (score >= 90) return "#7EB8A4";
  if (score >= 50) return "#C8A96E";
  return "#E87B6B";
}

const inputStyle = (hasError = false) => ({
  width: "100%",
  background: "#FAFAFA",
  border: `1px solid ${hasError ? "#E87B6B44" : "#141414"}`,
  borderRadius: "8px",
  padding: "0.875rem 1.25rem",
  color: "#1A1A1A",
  fontSize: "0.82rem",
  fontFamily: "monospace",
  outline: "none",
});

function ScoreRing({ score, max = 10, color, size = 110 }) {
  const pct = (score / max) * 100;
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#E8E8E8" strokeWidth="6" />
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color}
        strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }} />
    </svg>
  );
}

function AnalysisLoader({ currentPhase }) {
  const currentIndex = ANALYSIS_PHASES.findIndex(p => p.id === currentPhase);
  return (
    <div style={{ padding: "1rem 0" }}>
      <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", border: "2px solid #1A1A1A", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 1.5rem", animation: "spin 1s linear infinite" }} />
        <p style={{ color: "#1A1A1A", fontSize: "0.8rem", fontFamily: "monospace", letterSpacing: "0.1em" }}>
          {ANALYSIS_PHASES[currentIndex]?.label || "Analyzing..."}
        </p>
        <p style={{ color: "#111111", fontSize: "0.7rem", fontFamily: "monospace", marginTop: "0.5rem" }}>
          This may take 60-90 seconds — Claude is searching the web
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {ANALYSIS_PHASES.map((phase, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <div key={phase.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", opacity: done || active ? 1 : 0.25, transition: "opacity 0.4s ease" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, background: done ? "#7EB8A4" : active ? "#1A1A1A" : "#E8E8E8", border: `1px solid ${done ? "#7EB8A4" : active ? "#1A1A1A" : "#D0D0D0"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "#000" }}>
                {done ? "✓" : active ? "•" : ""}
              </div>
              <span style={{ fontSize: "0.78rem", color: done ? "#7EB8A4" : active ? "#FFFFFF" : "#AAAAAA", fontFamily: "monospace" }}>{phase.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ label, value, color = "#C8A96E" }) {
  return (
    <div style={{ background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "8px", padding: "0.875rem", textAlign: "center" }}>
      <div style={{ fontSize: "1.2rem", fontWeight: 700, color, fontFamily: "monospace", marginBottom: "0.25rem" }}>{value}</div>
      <div style={{ fontSize: "0.62rem", color: "#111111", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "monospace" }}>{label}</div>
    </div>
  );
}

function SectionHeader({ label, color = "#444" }) {
  return (
    <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color, textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.75rem" }}>
      {label}
    </div>
  );
}

function ListItems({ items, color }) {
  if (!items?.length) return null;
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ fontSize: "0.78rem", color, marginBottom: "0.3rem", paddingLeft: "0.75rem", lineHeight: 1.6, fontFamily: "sans-serif" }}>· {item}</div>
      ))}
    </div>
  );
}

function ModuleCard({ module, score, children }) {
  const [expanded, setExpanded] = useState(false);
  const color = getScoreColor(score);
  return (
    <div style={{ border: `1px solid ${expanded ? module.color + "33" : "#141414"}`, borderRadius: "10px", overflow: "hidden", marginBottom: "0.75rem" }}>
      <div onClick={() => setExpanded(!expanded)} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem", cursor: "pointer", background: expanded ? `${module.color}05` : "transparent", transition: "background 0.3s" }}>
        <span style={{ color: module.color, fontSize: "1rem", flexShrink: 0 }}>{module.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.875rem", color: "#2C2C2C", fontFamily: "sans-serif", fontWeight: 500 }}>{module.label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1rem", fontWeight: 700, color, fontFamily: "monospace" }}>{score}/10</span>
              <span style={{ fontSize: "0.7rem", color: "#111111", fontFamily: "monospace" }}>{expanded ? "▲" : "▼"}</span>
            </div>
          </div>
          <div style={{ height: "3px", background: "#E8E8E8", borderRadius: "2px", marginTop: "0.5rem", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${score * 10}%`, background: color, borderRadius: "2px", transition: "width 1.2s ease" }} />
          </div>
        </div>
      </div>
      {expanded && (
        <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "1px solid #E8E8E8" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function VitalsGrid({ data, label }) {
  if (!data) return null;
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.62rem", color: "#111111", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: "0.5rem" }}>{label}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
        <StatCard label="Performance" value={`${data.performanceScore}/100`} color={getPerformanceColor(data.performanceScore)} />
        <StatCard label="SEO" value={`${data.seoScore}/100`} color={getPerformanceColor(data.seoScore)} />
        <StatCard label="Accessibility" value={`${data.accessibilityScore}/100`} color={getPerformanceColor(data.accessibilityScore)} />
        <StatCard label="Best Practices" value={`${data.bestPracticesScore}/100`} color={getPerformanceColor(data.bestPracticesScore)} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.4rem", marginTop: "0.4rem" }}>
        <StatCard label="FCP" value={data.fcp} color="#666" />
        <StatCard label="LCP" value={data.lcp} color="#666" />
        <StatCard label="CLS" value={data.cls} color="#666" />
        <StatCard label="TBT" value={data.tbt} color="#666" />
        <StatCard label="TTI" value={data.tti} color="#666" />
      </div>
    </div>
  );
}

// ── PDF GENERATOR ─────────────────────────────────────────────────────────────
async function generatePDFReport(results, url, companyName) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;
  const domain = extractDomain(url);

  // shorthand for module8
  const m8 = results.module8_innovation || {};

  function addPage() { doc.addPage(); y = 24; drawPageChrome(); }
  function checkBreak(needed = 20) { if (y + needed > 275) addPage(); }
  function hex(h) { return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; }
  function setColor(h) { const [r,g,b] = hex(h); doc.setTextColor(r,g,b); }
  function setFill(h) { const [r,g,b] = hex(h); doc.setFillColor(r,g,b); }
  function setDraw(h) { const [r,g,b] = hex(h); doc.setDrawColor(r,g,b); }

  function drawPageChrome() {
    setFill("#FFFFFF"); doc.rect(0, 0, 210, 297, "F");
    setFill("#1A1A1A"); doc.rect(0, 0, 5, 297, "F");
    setColor("#888888"); doc.setFontSize(6.5); doc.setFont("helvetica", "normal");
    doc.text("Confidential — Cerebre Plus Digital Maturity Audit", margin, 291);
    doc.text(domain, pageWidth - margin - 30, 291);
  }

  function sectionTitle(label, color = "#111111") {
    checkBreak(12);
    setColor(color); doc.setFontSize(6.5); doc.setFont("helvetica", "bold");
    doc.text(label.toUpperCase(), margin, y);
    y += 5;
  }

  function bodyText(text, color = "#333333", indent = 0) {
    if (!text) return;
    setColor(color); doc.setFontSize(7.5); doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(String(text), contentWidth - indent);
    checkBreak(lines.length * 4 + 2);
    doc.text(lines, margin + indent, y);
    y += lines.length * 4 + 2;
  }

  function bulletList(items, color = "#333333") {
    if (!items?.length) return;
    items.forEach(item => {
      checkBreak(6);
      setColor(color); doc.setFontSize(7.5); doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(`· ${item}`, contentWidth - 5);
      doc.text(lines, margin + 3, y);
      y += lines.length * 4 + 1;
    });
    y += 2;
  }

  function scoreBar(label, score, max, color) {
    checkBreak(10);
    setColor("#111111"); doc.setFontSize(7); doc.setFont("helvetica", "normal");
    doc.text(label.toUpperCase(), margin, y);
    setColor(color); doc.text(`${score}/${max}`, margin + contentWidth - 10, y);
    setFill("#E8E8E8"); doc.roundedRect(margin, y + 1.5, contentWidth - 14, 2.5, 1, 1, "F");
    setFill(color); doc.roundedRect(margin, y + 1.5, (contentWidth - 14) * (score / max), 2.5, 1, 1, "F");
    y += 9;
  }

  function moduleHeader(label, score, color) {
    checkBreak(16);
    setFill("#F5F5F5"); doc.roundedRect(margin, y, contentWidth, 12, 2, 2, "F");
    setDraw(color); doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentWidth, 12, 2, 2, "S");
    setColor(color); doc.setFontSize(9); doc.setFont("helvetica", "bold");
    doc.text(label, margin + 4, y + 8);
    doc.text(`${score}/10`, margin + contentWidth - 14, y + 8);
    y += 17;
  }

  function kvRow(label, value, valueColor = "#444444") {
    if (!value) return;
    checkBreak(8);
    setColor("#111111"); doc.setFontSize(6.5); doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, margin, y);
    setColor(valueColor); doc.setFontSize(7); doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(String(value), contentWidth - 35);
    doc.text(lines, margin + 32, y);
    y += Math.max(lines.length * 4, 5) + 2;
  }

  function signalGrid(signals) {
    if (!signals) return;
    const entries = Object.entries(signals);
    const cols = 2;
    const colW = (contentWidth - 2) / cols;
    for (let i = 0; i < entries.length; i += cols) {
      checkBreak(8);
      for (let j = 0; j < cols; j++) {
        if (!entries[i + j]) break;
        const [key, val] = entries[i + j];
        const x = margin + j * (colW + 2);
        setFill("#F8F8F8"); doc.roundedRect(x, y - 3, colW, 7, 1, 1, "F");
        setColor("#666666"); doc.setFontSize(6); doc.setFont("helvetica", "normal");
        doc.text(key.toUpperCase(), x + 2, y + 1);
        setColor(val ? "#7EB8A4" : "#E87B6B"); doc.setFont("helvetica", "bold");
        doc.text(val ? "YES" : "NO", x + colW - 10, y + 1);
      }
      y += 9;
    }
    y += 2;
  }

  function platformRow(platform, data) {
    if (!data) return;
    checkBreak(16);
    setFill("#F8F8F8"); doc.roundedRect(margin, y, contentWidth, 14, 1, 1, "F");
    setColor("#1A1A1A"); doc.setFontSize(7.5); doc.setFont("helvetica", "bold");
    doc.text(platform.toUpperCase(), margin + 3, y + 5);
    setColor(data.present ? "#7EB8A4" : "#E87B6B"); doc.setFontSize(6.5);
    doc.text(data.present ? "ACTIVE" : "NOT FOUND", margin + contentWidth - 20, y + 5);
    if (data.present) {
      setColor("#444444"); doc.setFontSize(6.5); doc.setFont("helvetica", "normal");
      doc.text(`Followers: ${data.followersObserved || "N/A"}`, margin + 3, y + 10);
      doc.text(`Frequency: ${data.postingFrequency || "N/A"}`, margin + 55, y + 10);
      const eng = data.engagementRateEstimate || data.engagementObservation || "N/A";
      const engLines = doc.splitTextToSize(`Engagement: ${eng}`, contentWidth - 6);
      doc.text(engLines[0], margin + 110, y + 10);
    }
    y += 18;
  }

  // ── COVER PAGE ──────────────────────────────────────────────────────────
  drawPageChrome();
  doc.addImage("data:image/jpeg;base64,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", "JPEG", 20, 18, 40, 18);

  setColor("#999999"); doc.setFontSize(7); doc.setFont("helvetica", "normal");
  doc.text("DIGITAL MATURITY AUDIT REPORT", margin, 56);

  setColor("#1A1A1A"); doc.setFontSize(28); doc.setFont("helvetica", "bold");
  doc.text("Digital Maturity", margin, 76);
  doc.text("Audit Report", margin, 90);

  setColor("#1A1A1A"); doc.setFontSize(14); doc.setFont("helvetica", "normal");
  doc.text(companyName || domain, margin, 108);
  setColor("#666666"); doc.setFontSize(8);
  doc.text(url, margin, 116);
  doc.text(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }), margin, 124);

  // Overall score block
  const brandScore = results.brandHealthScore ?? results.overallDigitalScore ?? 0;
  setFill("#F5F5F5"); doc.roundedRect(margin, 138, contentWidth, 44, 3, 3, "F");
  const overallColor = brandScore >= 8 ? "#7EB8A4" : brandScore >= 6 ? "#C8A96E" : brandScore >= 4 ? "#9B8BB4" : "#E87B6B";
  const [or,og,ob] = hex(overallColor);
  doc.setTextColor(or,og,ob); doc.setFontSize(42); doc.setFont("helvetica", "bold");
  doc.text(String(brandScore), margin + 12, 172);
  setColor("#999999"); doc.setFontSize(10);
  doc.text("/10", margin + 12, 181);
  doc.setTextColor(or,og,ob); doc.setFontSize(9); doc.setFont("helvetica", "bold");
  doc.text("BRAND HEALTH SCORE", margin + 50, 153);
  const matStage = m8.digitalMaturityStage ?? 0;
  const matLabel = m8.digitalMaturityLabel ?? "";
  const matColor = matStage >= 4 ? "#7EB8A4" : matStage >= 3 ? "#C8A96E" : "#E87B6B";
  const [mr,mg,mb] = hex(matColor);
  doc.setTextColor(mr,mg,mb); doc.setFontSize(11);
  doc.text(`Stage ${matStage}: ${matLabel}`, margin + 50, 163);
  setColor("#555555"); doc.setFontSize(8); doc.setFont("helvetica", "normal");
  const sumLines = doc.splitTextToSize(results.executiveSummary || "", 95);
  doc.text(sumLines.slice(0,3), margin + 50, 172);

  // Module score bars
  y = 194;
  const ps = results.pillarScores || {};
  const moduleScores = [
    ["Website & UX", results.module1_website?.uxScore ?? ps.websiteUX ?? 0, "#C8A96E"],
    ["SEO", results.module2_seo?.seoScore ?? ps.seoStrength ?? 0, "#7EB8A4"],
    ["Social Media", results.module3_social?.socialMaturityScore ?? ps.socialMediaMaturity ?? 0, "#9B8BB4"],
    ["Content Marketing", results.module4_content?.contentMaturityScore ?? ps.contentMarketing ?? 0, "#E87B6B"],
    ["Share of Voice", results.module5_shareOfVoice?.shareOfVoiceScore ?? ps.shareOfVoice ?? 0, "#5B9BD5"],
    ["Brand Authority", results.module6_authority?.authorityScore ?? ps.digitalAuthority ?? 0, "#C8A96E"],
    ["Paid Advertising", results.module7_paidAds?.paidAdsScore ?? ps.paidMedia ?? 0, "#7EB8A4"],
    ["Digital Maturity", matStage * 2, "#9B8BB4"],
  ];
  moduleScores.forEach(([label, score, color]) => scoreBar(label, score ?? 0, 10, color));

  // ── PAGE 2 — OVERVIEW + RECOMMENDATION ────────────────────────────────
  addPage();
  setColor("#999999"); doc.setFontSize(7); doc.setFont("helvetica", "normal");
  doc.text("COMPANY OVERVIEW & RECOMMENDATION", margin, y); y += 8;

  if (results.companyOverview) { sectionTitle("Company Overview", "#1A1A1A"); bodyText(results.companyOverview); y += 4; }
  if (results.executiveSummary) { sectionTitle("Executive Summary", "#1A1A1A"); bodyText(results.executiveSummary); y += 4; }

  if (results.recommendation) {
    checkBreak(25);
    const recC = results.recommendation.startsWith("RECOMMEND") ? "#7EB8A4" : results.recommendation.startsWith("CONDITIONAL") ? "#C8A96E" : "#E87B6B";
    setFill("#F8F8F8"); doc.roundedRect(margin, y, contentWidth, 20, 2, 2, "F");
    setDraw(recC); doc.setLineWidth(0.3); doc.roundedRect(margin, y, contentWidth, 20, 2, 2, "S");
    setColor("#888888"); doc.setFontSize(6.5); doc.setFont("helvetica", "bold");
    doc.text("CEREBRE RECOMMENDATION", margin + 4, y + 6);
    setColor(recC); doc.setFontSize(8);
    const recLines = doc.splitTextToSize(results.recommendation, contentWidth - 8);
    doc.text(recLines, margin + 4, y + 13);
    y += 25;
  }

  if (results.engagementRationale) { sectionTitle("Engagement Rationale", "#444444"); bodyText(results.engagementRationale); y += 4; }

  if (results.competitors?.length) {
    sectionTitle("Competitor Landscape", "#E87B6B");
    results.competitors.forEach(c => {
      checkBreak(14);
      setColor("#1A1A1A"); doc.setFontSize(8); doc.setFont("helvetica", "bold");
      doc.text(c.name || "Unknown", margin, y);
      setColor("#888888"); doc.setFontSize(6.5); doc.setFont("helvetica", "normal");
      doc.text(c.website || "", margin + contentWidth - 40, y);
      y += 5;
      bodyText(c.keyDigitalStrength || c.keyDifferentiator || "", "#444444", 3);
      y += 2;
    });
  }

  // ── PAGE 3 — MODULE 1: WEBSITE ─────────────────────────────────────────
  addPage();
  moduleHeader("MODULE 1 — WEBSITE & UX", results.module1_website?.uxScore ?? 0, "#C8A96E");

  if (results.module1_website?.coreWebVitals?.mobile) {
    sectionTitle("Mobile Core Web Vitals (MEASURED)", "#7EB8A4");
    const m = results.module1_website.coreWebVitals.mobile;
    const vitals = [["Performance", `${m.performanceScore}/100`], ["SEO", `${m.seoScore}/100`], ["Accessibility", `${m.accessibilityScore}/100`], ["Best Practices", `${m.bestPracticesScore}/100`], ["FCP", m.fcp], ["LCP", m.lcp], ["CLS", m.cls], ["TBT", m.tbt], ["TTI", m.tti]];
    const colW = contentWidth / 3;
    for (let i = 0; i < vitals.length; i += 3) {
      checkBreak(10);
      for (let j = 0; j < 3; j++) {
        if (!vitals[i+j]) break;
        const [vL, vV] = vitals[i+j];
        const x = margin + j * colW;
        setFill("#F8F8F8"); doc.roundedRect(x, y - 4, colW - 2, 10, 1, 1, "F");
        setColor("#444444"); doc.setFontSize(6); doc.setFont("helvetica", "normal");
        doc.text(vL.toUpperCase(), x + 2, y);
        setColor("#1A1A1A"); doc.setFontSize(7.5); doc.setFont("helvetica", "bold");
        doc.text(String(vV), x + 2, y + 5);
      }
      y += 13;
    }
    y += 2;
  }

  if (results.module1_website?.coreWebVitals?.desktop) {
    sectionTitle("Desktop Core Web Vitals (MEASURED)", "#7EB8A4");
    const d = results.module1_website.coreWebVitals.desktop;
    const vitals = [["Performance", `${d.performanceScore}/100`], ["SEO", `${d.seoScore}/100`], ["Accessibility", `${d.accessibilityScore}/100`], ["Best Practices", `${d.bestPracticesScore}/100`], ["FCP", d.fcp], ["LCP", d.lcp], ["CLS", d.cls], ["TBT", d.tbt], ["TTI", d.tti]];
    const colW = contentWidth / 3;
    for (let i = 0; i < vitals.length; i += 3) {
      checkBreak(10);
      for (let j = 0; j < 3; j++) {
        if (!vitals[i+j]) break;
        const [vL, vV] = vitals[i+j];
        const x = margin + j * colW;
        setFill("#0a0a0a"); doc.roundedRect(x, y - 4, colW - 2, 10, 1, 1, "F");
        setColor("#444444"); doc.setFontSize(6); doc.setFont("helvetica", "normal");
        doc.text(vL.toUpperCase(), x + 2, y);
        setColor("#7EB8A4"); doc.setFontSize(7.5); doc.setFont("helvetica", "bold");
        doc.text(String(vV), x + 2, y + 5);
      }
      y += 13;
    }
    y += 2;
  }

  if (results.module1_website?.siteArchitectureAnalysis) { sectionTitle("Site Architecture"); bodyText(results.module1_website.siteArchitectureAnalysis); y += 3; }
  if (results.module1_website?.navigationLogic) { sectionTitle("Navigation Logic"); bodyText(results.module1_website.navigationLogic); y += 3; }
  if (results.module1_website?.conversionPathways) { sectionTitle("Conversion Pathways"); bodyText(results.module1_website.conversionPathways); y += 3; }
  if (results.module1_website?.valuePropositionClarity) { sectionTitle("Value Proposition Clarity"); bodyText(results.module1_website.valuePropositionClarity); y += 3; }
  if (results.module1_website?.uxFrictionPoints?.length) { sectionTitle("UX Friction Points", "#E87B6B"); bulletList(results.module1_website.uxFrictionPoints, "#E87B6B"); }
  if (results.module1_website?.trustWeaknesses?.length) { sectionTitle("Trust Weaknesses", "#E87B6B"); bulletList(results.module1_website.trustWeaknesses, "#E87B6B"); }
  if (results.module1_website?.missedEngagementTriggers?.length) { sectionTitle("Missed Engagement Triggers", "#9B8BB4"); bulletList(results.module1_website.missedEngagementTriggers, "#9B8BB4"); }
  if (results.module1_website?.competitorUXComparison) { sectionTitle("Competitor UX Comparison"); bodyText(results.module1_website.competitorUXComparison); y += 3; }
  if (results.module1_website?.brandCredibilityImpact) { sectionTitle("Brand Credibility Impact"); bodyText(results.module1_website.brandCredibilityImpact); y += 3; }
  if (results.module1_website?.recommendations?.length) { sectionTitle("Recommendations", "#7EB8A4"); bulletList(results.module1_website.recommendations, "#7EB8A4"); }

  // ── PAGE 4 — MODULE 2: SEO ─────────────────────────────────────────────
  addPage();
  moduleHeader("MODULE 2 — SEO AUDIT", results.module2_seo?.seoScore ?? 0, "#7EB8A4");

  if (results.module2_seo?.technicalSEOSignals) { sectionTitle("Technical SEO Signals (SCRAPED)", "#7EB8A4"); signalGrid(results.module2_seo.technicalSEOSignals); }
  kvRow("Domain Authority", results.module2_seo?.domainAuthorityEstimate, "#C8A96E");
  kvRow("Backlink Quality", results.module2_seo?.backlinkQuality, "#888888");
  kvRow("Indexed Pages", results.module2_seo?.indexedPagesEstimate, "#888888");
  kvRow("Missed Monthly Traffic", results.module2_seo?.missedMonthlyTrafficEstimate, "#E87B6B");
  kvRow("Revenue Opportunity", results.module2_seo?.revenueOpportunityEstimate, "#7EB8A4");
  y += 3;
  if (results.module2_seo?.topRankingKeywords?.length) { sectionTitle("Top Ranking Keywords", "#7EB8A4"); bulletList(results.module2_seo.topRankingKeywords, "#7EB8A4"); }
  if (results.module2_seo?.keywordGaps?.length) { sectionTitle("Keyword Gaps", "#E87B6B"); bulletList(results.module2_seo.keywordGaps, "#E87B6B"); }
  if (results.module2_seo?.contentGaps?.length) { sectionTitle("Content Gaps", "#9B8BB4"); bulletList(results.module2_seo.contentGaps, "#9B8BB4"); }
  if (results.module2_seo?.technicalIssues?.length) { sectionTitle("Technical Issues", "#E87B6B"); bulletList(results.module2_seo.technicalIssues, "#E87B6B"); }
  if (results.module2_seo?.competitorSEOBenchmark) { sectionTitle("Competitor SEO Benchmark"); bodyText(results.module2_seo.competitorSEOBenchmark); y += 3; }
  if (results.module2_seo?.recommendations?.length) { sectionTitle("Recommendations", "#7EB8A4"); bulletList(results.module2_seo.recommendations, "#7EB8A4"); }

  // ── PAGE 5 — MODULE 3: SOCIAL ──────────────────────────────────────────
  addPage();
  moduleHeader("MODULE 3 — SOCIAL MEDIA", results.module3_social?.socialMaturityScore ?? 0, "#9B8BB4");

  if (results.module3_social?.platforms) {
    sectionTitle("Platform Analysis (OBSERVED)", "#9B8BB4");
    SOCIAL_PLATFORMS.forEach(p => platformRow(p, results.module3_social.platforms[p]));
    y += 3;
  }
  if (results.module3_social?.neglectedPlatforms?.length) { sectionTitle("Neglected Platforms", "#E87B6B"); bulletList(results.module3_social.neglectedPlatforms, "#E87B6B"); }
  if (results.module3_social?.lowEngagementSignals?.length) { sectionTitle("Low Engagement Signals", "#E87B6B"); bulletList(results.module3_social.lowEngagementSignals, "#E87B6B"); }
  if (results.module3_social?.brandVoiceConsistency) { sectionTitle("Brand Voice Consistency"); bodyText(results.module3_social.brandVoiceConsistency); y += 3; }
  if (results.module3_social?.underutilizedFormats?.length) { sectionTitle("Underutilized Formats", "#9B8BB4"); bulletList(results.module3_social.underutilizedFormats, "#9B8BB4"); }
  if (results.module3_social?.competitorSocialComparison) { sectionTitle("Competitor Comparison"); bodyText(results.module3_social.competitorSocialComparison); y += 3; }
  if (results.module3_social?.recommendations?.length) { sectionTitle("Recommendations", "#7EB8A4"); bulletList(results.module3_social.recommendations, "#7EB8A4"); }

  // ── PAGE 6 — MODULE 4: CONTENT ─────────────────────────────────────────
  addPage();
  moduleHeader("MODULE 4 — CONTENT MARKETING", results.module4_content?.contentMaturityScore ?? 0, "#E87B6B");

  kvRow("Blog Presence", results.module4_content?.blogPresence);
  kvRow("Educational Resources", results.module4_content?.educationalResources);
  kvRow("ESG / Sustainability", results.module4_content?.sustainabilityESGContent);
  kvRow("Industry Leadership", results.module4_content?.industryLeadershipContent);
  kvRow("Media Mentions", results.module4_content?.mediaMentions);
  kvRow("Email Marketing", results.module4_content?.emailMarketingPresence);
  kvRow("Topic Cluster Strategy", results.module4_content?.topicClusterStrategy);
  y += 3;
  if (results.module4_content?.contentGaps?.length) { sectionTitle("Content Gaps", "#E87B6B"); bulletList(results.module4_content.contentGaps, "#E87B6B"); }
  if (results.module4_content?.storytellingWeaknesses?.length) { sectionTitle("Storytelling Weaknesses", "#E87B6B"); bulletList(results.module4_content.storytellingWeaknesses, "#E87B6B"); }
  if (results.module4_content?.competitorContentComparison) { sectionTitle("Competitor Content Comparison"); bodyText(results.module4_content.competitorContentComparison); y += 3; }
  if (results.module4_content?.recommendations?.length) { sectionTitle("Recommendations", "#7EB8A4"); bulletList(results.module4_content.recommendations, "#7EB8A4"); }

  // ── PAGE 7 — MODULES 5 + 6 ────────────────────────────────────────────
  addPage();
  moduleHeader("MODULE 5 — SHARE OF VOICE", results.module5_shareOfVoice?.shareOfVoiceScore ?? 0, "#5B9BD5");

  if (results.module5_shareOfVoice?.digitalPositioning) {
    checkBreak(14);
    setFill("#EEF4FB"); doc.roundedRect(margin, y, contentWidth, 12, 2, 2, "F");
    setColor("#5B9BD5"); doc.setFontSize(9); doc.setFont("helvetica", "bold");
    doc.text(results.module5_shareOfVoice.digitalPositioning, margin + 4, y + 8);
    y += 17;
  }
  kvRow("Search Visibility", results.module5_shareOfVoice?.searchVisibility);
  kvRow("Social Engagement Volume", results.module5_shareOfVoice?.socialEngagementVolume);
  kvRow("Online Mentions", results.module5_shareOfVoice?.onlineMentions);
  kvRow("News Coverage", results.module5_shareOfVoice?.newsCoverageFrequency);
  if (results.module5_shareOfVoice?.brandPerceptionRisk) { sectionTitle("Brand Perception Risk", "#E87B6B"); bodyText(results.module5_shareOfVoice.brandPerceptionRisk, "#E87B6B"); y += 3; }
  if (results.module5_shareOfVoice?.competitorShareComparison) { sectionTitle("Competitor Share Comparison"); bodyText(results.module5_shareOfVoice.competitorShareComparison); y += 3; }

  y += 6;
  moduleHeader("MODULE 6 — BRAND AUTHORITY", results.module6_authority?.authorityScore ?? 0, "#C8A96E");

  kvRow("High Authority Backlinks", results.module6_authority?.highAuthorityBacklinks);
  kvRow("Media Citations", results.module6_authority?.mediaCitations);
  kvRow("ESG Storytelling", results.module6_authority?.esgStorytelling);
  kvRow("Transparency Signals", results.module6_authority?.transparencySignals);
  kvRow("Crisis Response", results.module6_authority?.crisisResponseVisibility);
  if (results.module6_authority?.credibilityGapVsLeaders) { sectionTitle("Credibility Gap", "#E87B6B"); bodyText(results.module6_authority.credibilityGapVsLeaders, "#E87B6B"); y += 3; }
  if (results.module6_authority?.recommendations?.length) { sectionTitle("Recommendations", "#7EB8A4"); bulletList(results.module6_authority.recommendations, "#7EB8A4"); }

  // ── PAGE 8 — MODULE 7: PAID ADS ───────────────────────────────────────
  addPage();
  moduleHeader("MODULE 7 — PAID ADVERTISING", results.module7_paidAds?.paidAdsScore ?? 0, "#7EB8A4");

  const adChannels = [
    ["Google Search Ads", results.module7_paidAds?.googleSearchAds],
    ["Display Ads", results.module7_paidAds?.displayAds],
    ["LinkedIn Ads", results.module7_paidAds?.linkedinAds],
    ["YouTube Ads", results.module7_paidAds?.youtubeAds],
    ["Meta / Facebook Ads", results.module7_paidAds?.metaAds],
    ["Sponsored Content", results.module7_paidAds?.sponsoredContent],
  ];
  sectionTitle("Ad Channel Status (OBSERVED)", "#7EB8A4");
  adChannels.forEach(([label, val]) => {
    if (!val) return;
    checkBreak(10);
    const isActive = typeof val === "string" && val.toLowerCase().includes("active");
    const isInactive = typeof val === "string" && val.toLowerCase().includes("inactive");
    const statusColor = isActive ? "#7EB8A4" : isInactive ? "#E87B6B" : "#666666";
    setFill("#F8F8F8"); doc.roundedRect(margin, y - 3, contentWidth, 9, 1, 1, "F");
    setColor("#1A1A1A"); doc.setFontSize(7); doc.setFont("helvetica", "bold");
    doc.text(label, margin + 3, y + 3);
    setColor(statusColor); doc.setFontSize(7); doc.setFont("helvetica", "normal");
    const valLines = doc.splitTextToSize(val, contentWidth - 45);
    doc.text(valLines[0], margin + 42, y + 3);
    y += 12;
  });
  y += 3;
  kvRow("Paid Traffic Gap", results.module7_paidAds?.paidTrafficGap, "#E87B6B");
  kvRow("Estimated Monthly Spend", results.module7_paidAds?.estimatedPaidSpend, "#C8A96E");
  if (results.module7_paidAds?.competitorPaidComparison) { sectionTitle("Competitor Paid Comparison"); bodyText(results.module7_paidAds.competitorPaidComparison); y += 3; }
  if (results.module7_paidAds?.recommendations?.length) { sectionTitle("Recommendations", "#7EB8A4"); bulletList(results.module7_paidAds.recommendations, "#7EB8A4"); }

  // ── PAGE 9 — MODULE 8: DIGITAL MATURITY ───────────────────────────────
  addPage();
  moduleHeader("MODULE 8 — DIGITAL MATURITY", matStage * 2, "#9B8BB4");

  const stageColor = getMaturityColor(matStage);
  checkBreak(20);
  setFill("#F5F5F5"); doc.roundedRect(margin, y, contentWidth, 18, 2, 2, "F");
  setDraw(stageColor); doc.setLineWidth(0.3); doc.roundedRect(margin, y, contentWidth, 18, 2, 2, "S");
  const [sr,sg,sb] = hex(stageColor);
  doc.setTextColor(sr,sg,sb); doc.setFontSize(20); doc.setFont("helvetica", "bold");
  doc.text(String(matStage), margin + 6, y + 13);
  setColor("#888888"); doc.setFontSize(8); doc.setFont("helvetica", "normal");
  doc.text("MATURITY STAGE", margin + 18, y + 7);
  doc.setTextColor(sr,sg,sb); doc.setFontSize(10); doc.setFont("helvetica", "bold");
  doc.text(matLabel, margin + 18, y + 14);
  y += 23;

  if (m8.maturityJustification) { sectionTitle("Classification Justification"); bodyText(m8.maturityJustification); y += 3; }
  if (m8.strengths?.length) { sectionTitle("Digital Strengths", "#7EB8A4"); bulletList(m8.strengths, "#7EB8A4"); }
  if (m8.criticalWeaknesses?.length) { sectionTitle("Critical Weaknesses", "#E87B6B"); bulletList(m8.criticalWeaknesses, "#E87B6B"); }
  if (m8.keyTransformationsRequired?.length) { sectionTitle("Key Transformations Required", "#9B8BB4"); bulletList(m8.keyTransformationsRequired, "#9B8BB4"); }
  kvRow("Time to Next Level", m8.estimatedTimeToNextLevel, "#333333");

  // ── PAGE 10 — STRATEGIC RECOMMENDATIONS ───────────────────────────────
  addPage();
  setColor("#999999"); doc.setFontSize(7); doc.setFont("helvetica", "normal");
  doc.text("STRATEGIC RECOMMENDATIONS", margin, y); y += 8;

  // Top 10 Strategic Gaps
  if (results.top10StrategicGaps?.length) {
    sectionTitle("Top 10 Strategic Gaps", "#1A1A1A");
    results.top10StrategicGaps.forEach(g => {
      checkBreak(14);
      const impactColor = g.impact === "High" ? "#E87B6B" : g.impact === "Medium" ? "#B8860B" : "#888888";
      setColor(impactColor); doc.setFontSize(7); doc.setFont("helvetica", "bold");
      doc.text(`${g.rank}. ${g.gap}`, margin, y);
      setColor("#888888"); doc.setFontSize(6); doc.setFont("helvetica", "normal");
      doc.text(g.impact || "", margin + contentWidth - 15, y);
      y += 4;
      bodyText(g.detail, "#666666", 4);
      y += 2;
    });
    y += 3;
  }

  // Strategic Roadmap — now an object not array
  const roadmap = results.strategicRoadmap;
  if (roadmap && typeof roadmap === "object") {
    sectionTitle("Strategic Roadmap", "#1A1A1A");
    const phases = [
      ["Quick Wins (0–3 months)", roadmap.quickWins],
      ["Growth Levers (3–12 months)", roadmap.midTermGrowth],
      ["Digital Transformation (12+ months)", roadmap.longTermTransformation],
    ];
    const phaseColors = ["#C8A96E", "#7EB8A4", "#9B8BB4"];
    phases.forEach(([label, phase], i) => {
      if (!phase) return;
      checkBreak(20);
      setColor(phaseColors[i]); doc.setFontSize(8); doc.setFont("helvetica", "bold");
      doc.text(label, margin, y);
      y += 5;
      bulletList(phase.actions || [], "#555555");
      y += 2;
    });
  }

  // Tech Stack
  if (results.techStackRecommendations?.length) {
    sectionTitle("Recommended Tech Stack", "#1A1A1A");
    results.techStackRecommendations.forEach(t => {
      checkBreak(14);
      setFill("#F8F8F8"); doc.roundedRect(margin, y - 3, contentWidth, 12, 1, 1, "F");
      setColor("#888888"); doc.setFontSize(6); doc.setFont("helvetica", "bold");
      doc.text(t.category?.toUpperCase() || "", margin + 3, y + 1);
      setColor("#1A1A1A"); doc.setFontSize(8); doc.setFont("helvetica", "bold");
      doc.text(t.tool || "", margin + 3, y + 7);
      setColor("#444444"); doc.setFontSize(7); doc.setFont("helvetica", "normal");
      const reasonLines = doc.splitTextToSize(t.reason || "", contentWidth - 45);
      doc.text(reasonLines[0], margin + 42, y + 4);
      y += 15;
    });
  }

  // Forecast
  if (results.forecastModel) {
    const fm = results.forecastModel;
    checkBreak(30);
    sectionTitle("12-Month Forecast", "#7EB8A4");
    kvRow("Traffic Growth", fm.trafficGrowthForecast, "#7EB8A4");
    kvRow("Engagement Growth", fm.engagementGrowthForecast, "#7EB8A4");
    kvRow("Revenue Opportunity", fm.revenueOpportunityForecast, "#1A7A4A");
  }

  doc.save(`cerebreplus-audit-${domain}-${Date.now()}.pdf`);
}

// ── RESULTS VIEW ──────────────────────────────────────────────────────────────
function ResultsView({ results, url, companyName, onReset }) {
  const domain = extractDomain(url);
  // ALL module8 references now use module8_innovation
  const m8 = results.module8_innovation || {};
  const maturityStage = m8.digitalMaturityStage ?? 0;
  const maturityLabel = m8.digitalMaturityLabel ?? "";
  const maturityColor = getMaturityColor(maturityStage);
  const brandScore = results.brandHealthScore ?? results.overallDigitalScore ?? 0;
  const overallColor = getScoreColor(brandScore);

  const recColor = results.recommendation?.startsWith("RECOMMEND") ? "#7EB8A4"
    : results.recommendation?.startsWith("CONDITIONAL") ? "#C8A96E" : "#E87B6B";
  const recBg = results.recommendation?.startsWith("RECOMMEND") ? "rgba(126,184,164,0.10)"
    : results.recommendation?.startsWith("CONDITIONAL") ? "rgba(200,169,110,0.10)" : "rgba(232,123,107,0.10)";
  const recBorder = results.recommendation?.startsWith("RECOMMEND") ? "rgba(126,184,164,0.3)"
    : results.recommendation?.startsWith("CONDITIONAL") ? "rgba(200,169,110,0.3)" : "rgba(232,123,107,0.3)";

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.62rem", letterSpacing: "0.25em", color: "#111111", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}>Brand Health Tracker Audit</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", color: "#1A1A1A", fontWeight: 600, marginBottom: "0.25rem" }}>{results.brandName || domain}</h2>
        <span style={{ fontSize: "0.7rem", color: "#111111", fontFamily: "monospace" }}>
          {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>

      {/* Company Overview */}
      {results.companyOverview && (
        <div style={{ padding: "1.25rem", background: "#FAFAFA", border: "1px solid #E0E0E0", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <SectionHeader label="Company Overview" />
          <p style={{ fontSize: "0.83rem", color: "#111111", lineHeight: 1.8, fontFamily: "sans-serif" }}>{results.companyOverview}</p>
        </div>
      )}

      {/* Overall Score + Maturity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ background: "#FAFAFA", border: "1px solid #E0E0E0", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", marginBottom: "0.5rem" }}>
            <ScoreRing score={brandScore} max={10} color={overallColor} size={100} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 700, color: overallColor, fontFamily: "monospace", lineHeight: 1 }}>{brandScore}</span>
              <span style={{ fontSize: "0.5rem", color: "#111111", fontFamily: "monospace" }}>/10</span>
            </div>
          </div>
          <div style={{ fontSize: "0.62rem", color: "#111111", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "monospace" }}>Brand Health Score</div>
        </div>
        <div style={{ background: "#FAFAFA", border: "1px solid #E0E0E0", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: 700, color: maturityColor, fontFamily: "monospace", lineHeight: 1, marginBottom: "0.35rem" }}>
            {maturityStage || "?"}
          </div>
          <div style={{ fontSize: "0.72rem", color: maturityColor, fontFamily: "monospace", textAlign: "center", marginBottom: "0.25rem" }}>
            {maturityLabel}
          </div>
          <div style={{ fontSize: "0.6rem", color: "#111111", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "monospace" }}>Maturity Stage</div>
        </div>
      </div>

      {/* Executive Summary */}
      {results.executiveSummary && (
        <div style={{ padding: "1.25rem", background: "#FAFAFA", border: "1px solid #E0E0E0", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <SectionHeader label="Executive Summary" />
          <p style={{ fontSize: "0.83rem", color: "#111111", lineHeight: 1.8, fontFamily: "sans-serif" }}>{results.executiveSummary}</p>
        </div>
      )}

      {/* Recommendation */}
      {results.recommendation && (
        <div style={{ padding: "1.25rem", background: recBg, border: `1px solid ${recBorder}`, borderRadius: "8px", marginBottom: "1.5rem" }}>
          <SectionHeader label="Cerebre Recommendation" color="#444" />
          <p style={{ fontSize: "0.9rem", fontWeight: 700, fontFamily: "monospace", color: recColor, lineHeight: 1.6 }}>{results.recommendation}</p>
          {results.engagementRationale && (
            <p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif", marginTop: "0.75rem" }}>{results.engagementRationale}</p>
          )}
        </div>
      )}

      {/* Module Scores */}
      <SectionHeader label="Module Scores — tap to expand" />
      <div style={{ marginBottom: "2rem" }}>

        {/* Module 1 */}
        <ModuleCard module={MODULES[0]} score={results.module1_website?.uxScore ?? 0}>
          <div style={{ paddingTop: "1rem" }}>
            <VitalsGrid data={results.module1_website?.coreWebVitals?.mobile} label="Mobile Core Web Vitals (MEASURED)" />
            <VitalsGrid data={results.module1_website?.coreWebVitals?.desktop} label="Desktop Core Web Vitals (MEASURED)" />
            {results.module1_website?.siteArchitectureAnalysis && <div style={{ marginBottom: "1rem" }}><SectionHeader label="Site Architecture" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module1_website.siteArchitectureAnalysis}</p></div>}
            {results.module1_website?.navigationLogic && <div style={{ marginBottom: "1rem" }}><SectionHeader label="Navigation Logic" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module1_website.navigationLogic}</p></div>}
            {results.module1_website?.conversionPathways && <div style={{ marginBottom: "1rem" }}><SectionHeader label="Conversion Pathways" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module1_website.conversionPathways}</p></div>}
            {results.module1_website?.valuePropositionClarity && <div style={{ marginBottom: "1rem" }}><SectionHeader label="Value Proposition" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module1_website.valuePropositionClarity}</p></div>}
            {results.module1_website?.uxFrictionPoints?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="UX Friction Points" color="#E87B6B" /><ListItems items={results.module1_website.uxFrictionPoints} color="#E87B6B" /></div>}
            {results.module1_website?.trustWeaknesses?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Trust Weaknesses" color="#E87B6B" /><ListItems items={results.module1_website.trustWeaknesses} color="#E87B6B" /></div>}
            {results.module1_website?.missedEngagementTriggers?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Missed Engagement Triggers" color="#9B8BB4" /><ListItems items={results.module1_website.missedEngagementTriggers} color="#9B8BB4" /></div>}
            {results.module1_website?.competitorUXComparison && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Competitor UX Comparison" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module1_website.competitorUXComparison}</p></div>}
            {results.module1_website?.recommendations?.length > 0 && <div><SectionHeader label="Recommendations" color="#7EB8A4" /><ListItems items={results.module1_website.recommendations} color="#7EB8A4" /></div>}
          </div>
        </ModuleCard>

        {/* Module 2 */}
        <ModuleCard module={MODULES[1]} score={results.module2_seo?.seoScore ?? 0}>
          <div style={{ paddingTop: "1rem" }}>
            {results.module2_seo?.technicalSEOSignals && (
              <div style={{ marginBottom: "1rem" }}>
                <SectionHeader label="Technical SEO Signals (SCRAPED)" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                  {Object.entries(results.module2_seo.technicalSEOSignals).map(([key, val]) => (
                    <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0.75rem", background: "#F8F8F8", borderRadius: "4px", border: "1px solid #E0E0E0" }}>
                      <span style={{ fontSize: "0.7rem", color: "#111111", fontFamily: "monospace", textTransform: "uppercase" }}>{key}</span>
                      <span style={{ fontSize: "0.7rem", color: val ? "#7EB8A4" : "#E87B6B", fontFamily: "monospace", fontWeight: 700 }}>{val ? "YES" : "NO"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
              {results.module2_seo?.domainAuthorityEstimate && <div style={{ padding: "0.75rem", background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "6px" }}><div style={{ fontSize: "0.6rem", color: "#111111", fontFamily: "monospace", textTransform: "uppercase", marginBottom: "0.25rem" }}>Domain Authority</div><div style={{ fontSize: "0.78rem", color: "#C8A96E", fontFamily: "sans-serif" }}>{results.module2_seo.domainAuthorityEstimate}</div></div>}
              {results.module2_seo?.missedMonthlyTrafficEstimate && <div style={{ padding: "0.75rem", background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "6px" }}><div style={{ fontSize: "0.6rem", color: "#111111", fontFamily: "monospace", textTransform: "uppercase", marginBottom: "0.25rem" }}>Missed Monthly Traffic</div><div style={{ fontSize: "0.78rem", color: "#E87B6B", fontFamily: "sans-serif" }}>{results.module2_seo.missedMonthlyTrafficEstimate}</div></div>}
              {results.module2_seo?.revenueOpportunityEstimate && <div style={{ padding: "0.75rem", background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "6px", gridColumn: "span 2" }}><div style={{ fontSize: "0.6rem", color: "#111111", fontFamily: "monospace", textTransform: "uppercase", marginBottom: "0.25rem" }}>Revenue Opportunity</div><div style={{ fontSize: "0.78rem", color: "#7EB8A4", fontFamily: "sans-serif" }}>{results.module2_seo.revenueOpportunityEstimate}</div></div>}
            </div>
            {results.module2_seo?.keywordGaps?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Keyword Gaps" color="#E87B6B" /><ListItems items={results.module2_seo.keywordGaps} color="#E87B6B" /></div>}
            {results.module2_seo?.contentGaps?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Content Gaps" color="#9B8BB4" /><ListItems items={results.module2_seo.contentGaps} color="#9B8BB4" /></div>}
            {results.module2_seo?.technicalIssues?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Technical Issues" color="#E87B6B" /><ListItems items={results.module2_seo.technicalIssues} color="#E87B6B" /></div>}
            {results.module2_seo?.competitorSEOBenchmark && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Competitor SEO Benchmark" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module2_seo.competitorSEOBenchmark}</p></div>}
            {results.module2_seo?.recommendations?.length > 0 && <div><SectionHeader label="Recommendations" color="#7EB8A4" /><ListItems items={results.module2_seo.recommendations} color="#7EB8A4" /></div>}
          </div>
        </ModuleCard>

        {/* Module 3 */}
        <ModuleCard module={MODULES[2]} score={results.module3_social?.socialMaturityScore ?? 0}>
          <div style={{ paddingTop: "1rem" }}>
            {results.module3_social?.platforms && (
              <div style={{ marginBottom: "1rem" }}>
                <SectionHeader label="Platform Analysis (OBSERVED)" />
                {SOCIAL_PLATFORMS.map(platform => {
                  const p = results.module3_social.platforms[platform];
                  if (!p) return null;
                  return (
                    <div key={platform} style={{ padding: "0.75rem", background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "6px", marginBottom: "0.4rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                        <span style={{ fontSize: "0.75rem", color: "#C8A96E", fontFamily: "monospace", textTransform: "uppercase", fontWeight: 700 }}>{platform}</span>
                        <span style={{ fontSize: "0.65rem", color: p.present ? "#7EB8A4" : "#E87B6B", fontFamily: "monospace" }}>{p.present ? "ACTIVE" : "NOT FOUND"}</span>
                      </div>
                      {p.present && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.25rem" }}>
                          <div style={{ fontSize: "0.68rem", color: "#111111", fontFamily: "sans-serif" }}>Followers: <span style={{ color: "#111111" }}>{p.followersObserved || p.subscribersObserved}</span></div>
                          <div style={{ fontSize: "0.68rem", color: "#111111", fontFamily: "sans-serif" }}>Frequency: <span style={{ color: "#111111" }}>{p.postingFrequency}</span></div>
                          <div style={{ fontSize: "0.68rem", color: "#111111", fontFamily: "sans-serif", gridColumn: "span 2" }}>Engagement: <span style={{ color: "#111111" }}>{p.engagementRateEstimate || p.engagementObservation}</span></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {results.module3_social?.neglectedPlatforms?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Neglected Platforms" color="#E87B6B" /><ListItems items={results.module3_social.neglectedPlatforms} color="#E87B6B" /></div>}
            {results.module3_social?.underutilizedFormats?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Underutilized Formats" color="#9B8BB4" /><ListItems items={results.module3_social.underutilizedFormats} color="#9B8BB4" /></div>}
            {results.module3_social?.brandVoiceConsistency && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Brand Voice Consistency" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module3_social.brandVoiceConsistency}</p></div>}
            {results.module3_social?.competitorSocialComparison && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Competitor Comparison" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module3_social.competitorSocialComparison}</p></div>}
            {results.module3_social?.recommendations?.length > 0 && <div><SectionHeader label="Recommendations" color="#7EB8A4" /><ListItems items={results.module3_social.recommendations} color="#7EB8A4" /></div>}
          </div>
        </ModuleCard>

        {/* Module 4 */}
        <ModuleCard module={MODULES[3]} score={results.module4_content?.contentMaturityScore ?? 0}>
          <div style={{ paddingTop: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem", marginBottom: "1rem" }}>
              {[["Blog", results.module4_content?.blogPresence], ["Media Mentions", results.module4_content?.mediaMentions], ["ESG / Sustainability", results.module4_content?.sustainabilityESGContent], ["Email Marketing", results.module4_content?.emailMarketingPresence]].map(([label, val]) => val && (
                <div key={label} style={{ padding: "0.75rem", background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "6px" }}>
                  <div style={{ fontSize: "0.6rem", color: "#111111", fontFamily: "monospace", textTransform: "uppercase", marginBottom: "0.25rem" }}>{label}</div>
                  <div style={{ fontSize: "0.72rem", color: "#111111", fontFamily: "sans-serif", lineHeight: 1.5 }}>{val}</div>
                </div>
              ))}
            </div>
            {results.module4_content?.contentGaps?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Content Gaps" color="#E87B6B" /><ListItems items={results.module4_content.contentGaps} color="#E87B6B" /></div>}
            {results.module4_content?.competitorContentComparison && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Competitor Comparison" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module4_content.competitorContentComparison}</p></div>}
            {results.module4_content?.recommendations?.length > 0 && <div><SectionHeader label="Recommendations" color="#7EB8A4" /><ListItems items={results.module4_content.recommendations} color="#7EB8A4" /></div>}
          </div>
        </ModuleCard>

        {/* Module 5 */}
        <ModuleCard module={MODULES[4]} score={results.module5_shareOfVoice?.shareOfVoiceScore ?? 0}>
          <div style={{ paddingTop: "1rem" }}>
            {results.module5_shareOfVoice?.digitalPositioning && (
              <div style={{ padding: "1rem", background: "rgba(91,155,213,0.08)", border: "1px solid rgba(91,155,213,0.2)", borderRadius: "6px", marginBottom: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#5B9BD5", fontFamily: "monospace" }}>{results.module5_shareOfVoice.digitalPositioning}</div>
              </div>
            )}
            {[["Search Visibility", results.module5_shareOfVoice?.searchVisibility], ["Social Engagement Volume", results.module5_shareOfVoice?.socialEngagementVolume], ["Online Mentions", results.module5_shareOfVoice?.onlineMentions], ["News Coverage", results.module5_shareOfVoice?.newsCoverageFrequency]].map(([label, val]) => val && (
              <div key={label} style={{ marginBottom: "0.75rem" }}><SectionHeader label={label} /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{val}</p></div>
            ))}
            {results.module5_shareOfVoice?.brandPerceptionRisk && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Brand Perception Risk" color="#E87B6B" /><p style={{ fontSize: "0.78rem", color: "#E87B6B", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module5_shareOfVoice.brandPerceptionRisk}</p></div>}
            {results.module5_shareOfVoice?.competitorShareComparison && <div><SectionHeader label="Competitor Share Comparison" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module5_shareOfVoice.competitorShareComparison}</p></div>}
          </div>
        </ModuleCard>

        {/* Module 6 */}
        <ModuleCard module={MODULES[5]} score={results.module6_authority?.authorityScore ?? 0}>
          <div style={{ paddingTop: "1rem" }}>
            {[["High Authority Backlinks", results.module6_authority?.highAuthorityBacklinks], ["Media Citations", results.module6_authority?.mediaCitations], ["ESG Storytelling", results.module6_authority?.esgStorytelling], ["Transparency Signals", results.module6_authority?.transparencySignals], ["Crisis Response", results.module6_authority?.crisisResponseVisibility]].map(([label, val]) => val && (
              <div key={label} style={{ marginBottom: "0.75rem" }}><SectionHeader label={label} /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{val}</p></div>
            ))}
            {results.module6_authority?.credibilityGapVsLeaders && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Credibility Gap" color="#E87B6B" /><p style={{ fontSize: "0.78rem", color: "#E87B6B", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module6_authority.credibilityGapVsLeaders}</p></div>}
            {results.module6_authority?.recommendations?.length > 0 && <div><SectionHeader label="Recommendations" color="#7EB8A4" /><ListItems items={results.module6_authority.recommendations} color="#7EB8A4" /></div>}
          </div>
        </ModuleCard>

        {/* Module 7 */}
        <ModuleCard module={MODULES[6]} score={results.module7_paidAds?.paidAdsScore ?? 0}>
          <div style={{ paddingTop: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem", marginBottom: "1rem" }}>
              {[["Google Search", results.module7_paidAds?.googleSearchAds], ["Display Ads", results.module7_paidAds?.displayAds], ["LinkedIn Ads", results.module7_paidAds?.linkedinAds], ["YouTube Ads", results.module7_paidAds?.youtubeAds], ["Meta Ads", results.module7_paidAds?.metaAds], ["Sponsored", results.module7_paidAds?.sponsoredContent]].map(([label, val]) => val && (
                <div key={label} style={{ padding: "0.6rem", background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "6px" }}>
                  <div style={{ fontSize: "0.6rem", color: "#111111", fontFamily: "monospace", textTransform: "uppercase", marginBottom: "0.2rem" }}>{label}</div>
                  <div style={{ fontSize: "0.7rem", color: typeof val === "string" && val.toLowerCase().includes("active") ? "#7EB8A4" : typeof val === "string" && val.toLowerCase().includes("inactive") ? "#E87B6B" : "#666", fontFamily: "monospace" }}>{val}</div>
                </div>
              ))}
            </div>
            {results.module7_paidAds?.paidTrafficGap && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Paid Traffic Gap" color="#E87B6B" /><p style={{ fontSize: "0.78rem", color: "#E87B6B", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module7_paidAds.paidTrafficGap}</p></div>}
            {results.module7_paidAds?.estimatedPaidSpend && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Estimated Paid Spend" /><p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{results.module7_paidAds.estimatedPaidSpend}</p></div>}
            {results.module7_paidAds?.recommendations?.length > 0 && <div><SectionHeader label="Recommendations" color="#7EB8A4" /><ListItems items={results.module7_paidAds.recommendations} color="#7EB8A4" /></div>}
          </div>
        </ModuleCard>

        {/* Module 8 — NOW USES module8_innovation EVERYWHERE */}
        <ModuleCard module={MODULES[7]} score={maturityStage * 2}>
          <div style={{ paddingTop: "1rem" }}>
            <div style={{ padding: "1rem", background: `${maturityColor}10`, border: `1px solid ${maturityColor}30`, borderRadius: "6px", marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: maturityColor, fontFamily: "monospace", marginBottom: "0.5rem" }}>
                Stage {maturityStage}: {maturityLabel}
              </div>
              <p style={{ fontSize: "0.78rem", color: "#111111", lineHeight: 1.7, fontFamily: "sans-serif" }}>{m8.maturityJustification}</p>
            </div>
            {m8.strengths?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Digital Strengths" color="#7EB8A4" /><ListItems items={m8.strengths} color="#7EB8A4" /></div>}
            {m8.criticalWeaknesses?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Critical Weaknesses" color="#E87B6B" /><ListItems items={m8.criticalWeaknesses} color="#E87B6B" /></div>}
            {m8.keyTransformationsRequired?.length > 0 && <div style={{ marginBottom: "0.75rem" }}><SectionHeader label="Key Transformations Required" color="#9B8BB4" /><ListItems items={m8.keyTransformationsRequired} color="#9B8BB4" /></div>}
            {m8.estimatedTimeToNextLevel && <div><SectionHeader label="Time to Next Level" /><p style={{ fontSize: "0.78rem", color: "#C8A96E", lineHeight: 1.7, fontFamily: "monospace" }}>{m8.estimatedTimeToNextLevel}</p></div>}
          </div>
        </ModuleCard>
      </div>

      {/* Competitors */}
      {results.competitors?.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <SectionHeader label="Competitor Landscape (OBSERVED)" />
          {results.competitors.map((c, i) => (
            <div key={i} style={{ padding: "0.875rem", background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "6px", marginBottom: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.8rem", color: "#C8A96E", fontFamily: "monospace", fontWeight: 700 }}>{c.name}</span>
                <span style={{ fontSize: "0.68rem", color: "#111111", fontFamily: "monospace" }}>{c.website}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#111111", fontFamily: "sans-serif", lineHeight: 1.6 }}>{c.keyDigitalStrength || c.keyDifferentiator}</p>
            </div>
          ))}
        </div>
      )}

      {/* Top 10 Strategic Gaps */}
      {results.top10StrategicGaps?.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <SectionHeader label="Top 10 Strategic Gaps" />
          {results.top10StrategicGaps.map((g, i) => (
            <div key={i} style={{ padding: "0.875rem", background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "6px", marginBottom: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.8rem", color: "#C8A96E", fontFamily: "monospace", fontWeight: 700 }}>#{g.rank} {g.gap}</span>
                <span style={{ fontSize: "0.65rem", color: g.impact === "High" ? "#E87B6B" : g.impact === "Medium" ? "#C8A96E" : "#666", fontFamily: "monospace", background: "#EBEBEB", padding: "0.15rem 0.4rem", borderRadius: "3px" }}>{g.impact}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#111111", fontFamily: "sans-serif", lineHeight: 1.6 }}>{g.detail}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tech Stack */}
      {results.techStackRecommendations?.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <SectionHeader label="Recommended Tech Stack" />
          {results.techStackRecommendations.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "6px", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.62rem", color: "#111111", fontFamily: "monospace", background: "#EBEBEB", padding: "0.2rem 0.4rem", borderRadius: "3px", flexShrink: 0, alignSelf: "flex-start" }}>{t.category}</span>
              <div>
                <div style={{ fontSize: "0.8rem", color: "#C8A96E", fontFamily: "monospace", marginBottom: "0.2rem" }}>{t.tool}</div>
                <div style={{ fontSize: "0.73rem", color: "#111111", fontFamily: "sans-serif" }}>{t.reason}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Strategic Roadmap — now an object */}
      {results.strategicRoadmap && typeof results.strategicRoadmap === "object" && !Array.isArray(results.strategicRoadmap) && (
        <div style={{ marginBottom: "2rem" }}>
          <SectionHeader label="Strategic Roadmap" />
          {[
            { key: "quickWins", color: "#C8A96E" },
            { key: "midTermGrowth", color: "#7EB8A4" },
            { key: "longTermTransformation", color: "#9B8BB4" },
          ].map(({ key, color }) => {
            const phase = results.strategicRoadmap[key];
            if (!phase) return null;
            return (
              <div key={key} style={{ borderLeft: `2px solid ${color}`, paddingLeft: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.78rem", color, fontFamily: "monospace", fontWeight: 700 }}>{phase.timeframe}</span>
                  <span style={{ fontSize: "0.62rem", color: "#111111", fontFamily: "monospace", background: "#F2F2F2", padding: "0.15rem 0.4rem", borderRadius: "2px" }}>{phase.focus}</span>
                </div>
                <ListItems items={phase.actions} color="#555" />
              </div>
            );
          })}
        </div>
      )}

      {/* Buttons */}
      <button
        onClick={() => generatePDFReport(results, url, companyName || extractDomain(url))}
        style={{ width: "100%", background: "#1A1A1A", border: "none", color: "#FFFFFF", padding: "1rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}
      >
        Download Full Audit Report (PDF)
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "#111111", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.25rem" }}>Qualification Decision</div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => alert("Prospect marked as QUALIFIED")} style={{ flex: 1, background: "rgba(126,184,164,0.12)", border: "1px solid #7EB8A4", color: "#7EB8A4", padding: "0.9rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "monospace" }}>Qualify</button>
          <button onClick={() => alert("Prospect marked as NOT READY")} style={{ flex: 1, background: "rgba(232,123,107,0.12)", border: "1px solid #E87B6B", color: "#E87B6B", padding: "0.9rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "monospace" }}>Not Ready</button>
        </div>
        <textarea placeholder="Internal notes about this prospect..." style={{ width: "100%", background: "#FAFAFA", border: "1px solid #E0E0E0", borderRadius: "6px", padding: "0.875rem", color: "#1A1A1A", fontSize: "0.8rem", fontFamily: "sans-serif", outline: "none", resize: "vertical", minHeight: "80px" }} />
        <button onClick={onReset} style={{ background: "transparent", border: "1px solid #D8D8D8", color: "#111111", padding: "0.875rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "monospace" }}>Audit Another Prospect</button>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("input");
  const [url, setUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [currentPhase, setCurrentPhase] = useState("pagespeed");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [socialInputs, setSocialInputs] = useState(["", "", "", "", "", ""]);
  const [competitorInputs, setCompetitorInputs] = useState([
    { name: "", website: "", instagram: "" },
    { name: "", website: "", instagram: "" },
    { name: "", website: "", instagram: "" },
    { name: "", website: "", instagram: "" },
    { name: "", website: "", instagram: "" },
  ]);
  const [extraInputs, setExtraInputs] = useState(["", "", ""]);
  const inputRef = useRef(null);
  const phaseInterval = useRef(null);

  useEffect(() => {
    if (screen === "input" && inputRef.current) inputRef.current.focus();
  }, [screen]);

  function startPhaseAnimation() {
    let i = 0;
    setCurrentPhase(ANALYSIS_PHASES[0].id);
    phaseInterval.current = setInterval(() => {
      i++;
      if (i < ANALYSIS_PHASES.length) setCurrentPhase(ANALYSIS_PHASES[i].id);
    }, 10000);
  }

  function stopPhaseAnimation() {
    if (phaseInterval.current) clearInterval(phaseInterval.current);
  }

  async function handleAnalyze() {
    const normalized = normalizeUrl(url);
    if (!normalized) { setError("Please enter a valid website URL"); return; }
    setError("");
    setScreen("analyzing");
    startPhaseAnimation();
    try {
      const response = await fetch("https://cerebre-backend.onrender.com/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          websiteUrl: normalized,
          socialUrls: {
            instagram: socialInputs[0],
            linkedin: socialInputs[1],
            twitter: socialInputs[2],
            facebook: socialInputs[3],
            youtube: socialInputs[4],
            tiktok: socialInputs[5],
          },
          competitorUrls: competitorInputs.filter(c => c.name || c.website),
          extraUrls: extraInputs.filter(u => u.trim()),
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Audit failed");
      }
      const data = await response.json();
      stopPhaseAnimation();
      setResults(data);
      setScreen("results");
    } catch (err) {
      stopPhaseAnimation();
      setError(err.message || "Analysis failed. Please try again.");
      setScreen("input");
    }
  }

  function handleReset() {
    setScreen("input");
    setUrl("");
    setCompanyName("");
    setResults(null);
    setError("");
  }

  return (
    <>
      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } body { background: #FFFFFF; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ minHeight: "100vh", background: "#FFFFFF", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "3rem 1rem" }}>
        <div style={{ width: "100%", maxWidth: "640px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "3rem" }}>
            <img src={CMA_LOGO} alt="Cerebre Media Africa" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "#111111", fontFamily: "monospace", textTransform: "uppercase" }}>Cerebre Plus</span>
          </div>

          <div style={{ background: "#FFFFFF", border: "1px solid #E0E0E0", borderRadius: "16px", padding: "clamp(1.75rem, 5vw, 3rem)", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>

            {screen === "input" && (
              <div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "#1A1A1A", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "1.25rem" }}>Digital Maturity Audit Engine</div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "#C8A96E", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid #141414" }}>01 — Company Info</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <input ref={inputRef} value={url} onChange={e => setUrl(e.target.value)} placeholder="Website URL (required) — https://example.com" style={inputStyle(error && !url)} />
                      <input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Company name" style={inputStyle()} />
                      <input value={extraInputs[0]} onChange={e => { const u = [...extraInputs]; u[0] = e.target.value; setExtraInputs(u); }} placeholder="Blog or news page URL (optional)" style={inputStyle()} />
                      <input value={extraInputs[1]} onChange={e => { const u = [...extraInputs]; u[1] = e.target.value; setExtraInputs(u); }} placeholder="Main product or service page URL (optional)" style={inputStyle()} />
                      <input value={extraInputs[2]} onChange={e => { const u = [...extraInputs]; u[2] = e.target.value; setExtraInputs(u); }} placeholder="Landing page URL (optional)" style={inputStyle()} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "#9B8BB4", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid #141414" }}>02 — Social Media Profiles</div>
                    <p style={{ fontSize: "0.75rem", color: "#111111", fontFamily: "sans-serif", marginBottom: "0.75rem", lineHeight: 1.6 }}>Paste their profile URLs so we can audit each platform accurately.</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {[["Instagram", 0], ["LinkedIn", 1], ["Twitter / X", 2], ["Facebook", 3], ["YouTube", 4], ["TikTok", 5]].map(([platform, i]) => (
                        <input key={platform} value={socialInputs[i]} onChange={e => { const u = [...socialInputs]; u[i] = e.target.value; setSocialInputs(u); }} placeholder={`${platform} profile URL`} style={inputStyle()} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "#E87B6B", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid #141414" }}>03 — Competitors</div>
                    <p style={{ fontSize: "0.75rem", color: "#111111", fontFamily: "sans-serif", marginBottom: "0.75rem", lineHeight: 1.6 }}>Do you know who their competitors are? Enter up to 5. Leave blank and the engine will find them automatically.</p>
                    {competitorInputs.map((comp, i) => (
                      <div key={i} style={{ background: "#F8F8F8", border: "1px solid #E0E0E0", borderRadius: "8px", padding: "0.875rem", marginBottom: "0.5rem" }}>
                        <div style={{ fontSize: "0.6rem", color: "#111111", fontFamily: "monospace", textTransform: "uppercase", marginBottom: "0.5rem" }}>Competitor {i + 1}</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          <input value={comp.name} onChange={e => { const u = [...competitorInputs]; u[i] = { ...u[i], name: e.target.value }; setCompetitorInputs(u); }} placeholder="Company name" style={inputStyle()} />
                          <input value={comp.website} onChange={e => { const u = [...competitorInputs]; u[i] = { ...u[i], website: e.target.value }; setCompetitorInputs(u); }} placeholder="Website URL" style={inputStyle()} />
                          <input value={comp.instagram} onChange={e => { const u = [...competitorInputs]; u[i] = { ...u[i], instagram: e.target.value }; setCompetitorInputs(u); }} placeholder="Instagram profile URL (optional)" style={inputStyle()} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {error && <p style={{ color: "#E87B6B", fontSize: "0.75rem", fontFamily: "monospace" }}>{error}</p>}
                  <button onClick={handleAnalyze} disabled={!url} style={{ background: url ? "#1A1A1A" : "#E0E0E0", border: "none", color: url ? "#FFFFFF" : "#999999", padding: "1.1rem", borderRadius: "8px", cursor: url ? "pointer" : "not-allowed", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "monospace" }}>
                    Run Full Digital Audit →
                  </button>
                </div>
              </div>
            )}

            {screen === "analyzing" && (
              <div>
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "#111111", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}>Auditing</div>
                  <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "#1A1A1A", fontWeight: 500 }}>{companyName || extractDomain(url)}</h2>
                </div>
                <AnalysisLoader currentPhase={currentPhase} />
              </div>
            )}

            {screen === "results" && results && (
              <ResultsView results={results} url={url} companyName={companyName} onReset={handleReset} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}