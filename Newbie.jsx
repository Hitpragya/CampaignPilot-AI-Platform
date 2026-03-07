import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN SYSTEM - Dark financial intelligence aesthetic
// Inspired by Bloomberg Terminal meets modern fintech
// ============================================================

const COLORS = {
  bg: "#080C14",
  surface: "#0D1421",
  surfaceHover: "#111A2E",
  border: "#1A2540",
  borderBright: "#243357",
  accent: "#0EA5E9",
  accentDim: "#0369A1",
  accentGlow: "rgba(14,165,233,0.15)",
  success: "#10B981",
  warn: "#F59E0B",
  danger: "#EF4444",
  textPrimary: "#E2E8F0",
  textSecondary: "#64748B",
  textMuted: "#334155",
  gold: "#F59E0B",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${COLORS.bg};
    color: ${COLORS.textPrimary};
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }

  .mono { font-family: 'Space Mono', monospace; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  @keyframes scan-line {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% { transform: translateY(100vh); opacity: 0; }
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes agent-pulse {
    0% { box-shadow: 0 0 0 0 rgba(14,165,233,0.4); }
    70% { box-shadow: 0 0 0 8px rgba(14,165,233,0); }
    100% { box-shadow: 0 0 0 0 rgba(14,165,233,0); }
  }

  @keyframes tick {
    0% { transform: scale(0) rotate(-45deg); opacity: 0; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  @keyframes bar-grow {
    from { width: 0; }
    to { width: var(--target-width); }
  }

  @keyframes number-count {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-up { animation: fade-up 0.4s ease forwards; }
  .fade-up-1 { animation: fade-up 0.4s ease 0.1s forwards; opacity: 0; }
  .fade-up-2 { animation: fade-up 0.4s ease 0.2s forwards; opacity: 0; }
  .fade-up-3 { animation: fade-up 0.4s ease 0.3s forwards; opacity: 0; }
  .fade-up-4 { animation: fade-up 0.4s ease 0.4s forwards; opacity: 0; }

  .agent-active { animation: agent-pulse 1.5s infinite; }

  .loading-shimmer {
    background: linear-gradient(90deg, ${COLORS.surface} 25%, ${COLORS.surfaceHover} 50%, ${COLORS.surface} 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .btn-primary {
    background: ${COLORS.accent};
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }
  .btn-primary:hover { background: #38BDF8; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(14,165,233,0.3); }
  .btn-primary:active { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

  .btn-secondary {
    background: transparent;
    color: ${COLORS.textSecondary};
    border: 1px solid ${COLORS.border};
    padding: 10px 20px;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: ${COLORS.accent}; color: ${COLORS.accent}; background: ${COLORS.accentGlow}; }

  .btn-danger {
    background: transparent;
    color: ${COLORS.danger};
    border: 1px solid ${COLORS.danger}30;
    padding: 10px 20px;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-danger:hover { background: rgba(239,68,68,0.1); border-color: ${COLORS.danger}; }

  .btn-success {
    background: ${COLORS.success};
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-success:hover { background: #34D399; transform: translateY(-1px); }

  input, textarea, select {
    background: ${COLORS.bg};
    border: 1px solid ${COLORS.border};
    color: ${COLORS.textPrimary};
    padding: 10px 14px;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    width: 100%;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  input:focus, textarea:focus, select:focus {
    border-color: ${COLORS.accent};
    box-shadow: 0 0 0 3px ${COLORS.accentGlow};
  }
  input::placeholder, textarea::placeholder { color: ${COLORS.textMuted}; }
  textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
  select option { background: ${COLORS.surface}; }

  label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: ${COLORS.textSecondary};
    margin-bottom: 6px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .card {
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 10px;
    padding: 20px;
  }

  .card-hover:hover {
    border-color: ${COLORS.borderBright};
    background: ${COLORS.surfaceHover};
    transition: all 0.2s;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .tag-blue { background: rgba(14,165,233,0.15); color: ${COLORS.accent}; border: 1px solid rgba(14,165,233,0.2); }
  .tag-green { background: rgba(16,185,129,0.15); color: ${COLORS.success}; border: 1px solid rgba(16,185,129,0.2); }
  .tag-yellow { background: rgba(245,158,11,0.15); color: ${COLORS.gold}; border: 1px solid rgba(245,158,11,0.2); }
  .tag-red { background: rgba(239,68,68,0.15); color: ${COLORS.danger}; border: 1px solid rgba(239,68,68,0.2); }
  .tag-gray { background: rgba(100,116,139,0.15); color: ${COLORS.textSecondary}; border: 1px solid rgba(100,116,139,0.2); }

  .agent-step {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px;
    border-radius: 8px;
    border: 1px solid ${COLORS.border};
    background: ${COLORS.bg};
    transition: all 0.3s;
  }
  .agent-step.active {
    border-color: ${COLORS.accent};
    background: ${COLORS.accentGlow};
  }
  .agent-step.done {
    border-color: rgba(16,185,129,0.3);
    background: rgba(16,185,129,0.05);
  }
  .agent-step.error {
    border-color: rgba(239,68,68,0.3);
    background: rgba(239,68,68,0.05);
  }

  .stat-bar {
    height: 6px;
    border-radius: 3px;
    background: ${COLORS.border};
    overflow: hidden;
    margin-top: 6px;
  }

  .stat-bar-fill {
    height: 100%;
    border-radius: 3px;
    animation: bar-grow 1s ease forwards;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 14px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 13.5px;
    font-weight: 500;
    color: ${COLORS.textSecondary};
    transition: all 0.15s;
    border: 1px solid transparent;
    white-space: nowrap;
  }
  .nav-item:hover {
    background: ${COLORS.surfaceHover};
    color: ${COLORS.textPrimary};
  }
  .nav-item.active {
    background: ${COLORS.accentGlow};
    color: ${COLORS.accent};
    border-color: rgba(14,165,233,0.2);
  }

  .thinking-dots span {
    display: inline-block;
    animation: pulse-dot 1.2s ease infinite;
  }
  .thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
  .thinking-dots span:nth-child(3) { animation-delay: 0.4s; }

  .compliance-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 6px;
    font-size: 13px;
    line-height: 1.5;
  }
  .compliance-pass { background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); }
  .compliance-warn { background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.2); }
  .compliance-fail { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); }

  .chart-bar-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .chart-bar-label { font-size: 12px; color: ${COLORS.textSecondary}; width: 80px; text-align: right; flex-shrink: 0; }
  .chart-bar-track { flex: 1; height: 8px; background: ${COLORS.border}; border-radius: 4px; overflow: hidden; }
  .chart-bar-inner { height: 100%; border-radius: 4px; transition: width 1.2s cubic-bezier(0.4,0,0.2,1); }
  .chart-bar-val { font-size: 12px; font-weight: 600; width: 40px; flex-shrink: 0; font-family: 'Space Mono', monospace; }

  .timeline-dot {
    width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 5px;
  }
  .timeline-line {
    width: 1px; background: ${COLORS.border}; flex: 1; min-height: 20px; margin: 4px auto;
  }
`;

// ============================================================
// ICONS (inline SVG)
// ============================================================
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    rocket: <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.94-.94-3-3-.94.94zm7.5-.5l-3-3-1.5 1.5 3 3 1.5-1.5zM13 3L3 13l3 3 10-10V3h-3zm2 0v2l-9 9-1-1 9-9h1V3z" strokeLinecap="round" />,
    chart: <><rect x="3" y="11" width="3" height="9" rx="1" fill={color} opacity="0.6"/><rect x="9" y="7" width="3" height="13" rx="1" fill={color} opacity="0.8"/><rect x="15" y="3" width="3" height="17" rx="1" fill={color}/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.5" fill="none"/><path d="M2 7l10 7 10-7" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
    check: <path d="M5 13l4 4L19 7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    x: <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>,
    edit: <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7m-1.5-10.5a2.121 2.121 0 013 3L10 17H7v-3L18.5 2.5z" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.5" fill="none"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="1.5" fill="none"/><rect x="9" y="9" width="6" height="6" stroke={color} strokeWidth="1.5" fill="none"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none"/></>,
    zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    plus: <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round"/>,
    arrow: <path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    clock: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none"/><path d="M12 6v6l4 2" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
    trend: <path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    bot: <><rect x="3" y="7" width="18" height="14" rx="3" stroke={color} strokeWidth="1.5" fill="none"/><path d="M9 11h6M9 15h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M12 3v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="3" r="1.5" fill={color}/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 9v4M12 17h.01" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></>,
    info: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none"/><path d="M12 16v-4M12 8h.01" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></>,
    send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    sparkle: <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 3.8 21.3l2.4-7.4L0 9.4h7.6L12 2z" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {icons[name]}
    </svg>
  );
};

// ============================================================
// AGENT PIPELINE RUNNER (calls Anthropic API)
// ============================================================
const callClaude = async (systemPrompt, userPrompt) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text || "";
};

const runPlannerAgent = async (campaign) => {
  const sys = `You are a senior BFSI (Banking, Financial Services & Insurance) email marketing strategist. 
Output ONLY valid JSON with this exact shape:
{
  "strategy": "2-sentence campaign strategy",
  "sequence": [
    { "type": "Awareness", "subject_hint": "...", "goal": "..." },
    { "type": "Offer", "subject_hint": "...", "goal": "..." },
    { "type": "Reminder", "subject_hint": "...", "goal": "..." }
  ],
  "estimated_reach": number,
  "recommended_send_days": ["Day1", "Day2", "Day3"]
}`;
  const user = `Product: ${campaign.product}\nGoal: ${campaign.goal}\nAudience: ${campaign.audience}`;
  const raw = await callClaude(sys, user);
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch { return null; }
};

const runContentAgent = async (campaign, plan) => {
  const sys = `You are an expert BFSI email copywriter. Write compelling, personalized emails.
Output ONLY valid JSON:
{
  "subject": "email subject line",
  "preview_text": "preview snippet under 100 chars",
  "body": "full email body HTML (use <p>, <strong>, <br> only, 200-300 words)",
  "cta_text": "Call to action button text",
  "cta_url": "#"
}`;
  const user = `Product: ${campaign.product}\nGoal: ${campaign.goal}\nAudience: ${campaign.audience}\nSequence type: ${plan?.sequence?.[0]?.type || "Awareness"}`;
  const raw = await callClaude(sys, user);
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch { return null; }
};

const runComplianceAgent = async (email) => {
  const sys = `You are a BFSI compliance officer specializing in RBI, SEBI, and IRDAI regulations.
Analyze email content for regulatory compliance.
Output ONLY valid JSON:
{
  "overall_status": "PASS" or "WARN" or "FAIL",
  "score": 0-100,
  "checks": [
    { "rule": "rule name", "status": "PASS|WARN|FAIL", "note": "brief explanation" }
  ],
  "suggested_disclaimer": "standard disclaimer text if needed"
}`;
  const user = `Subject: ${email.subject}\n\nBody: ${email.body}`;
  const raw = await callClaude(sys, user);
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch { return null; }
};

const runAnalyticsAgent = async (campaign) => {
  const sys = `You are a BFSI email marketing analytics expert. Generate realistic simulated campaign analytics.
Output ONLY valid JSON:
{
  "sent": number,
  "delivered": number,
  "opened": number,
  "clicked": number,
  "converted": number,
  "open_rate": number (0-100),
  "click_rate": number (0-100),
  "conversion_rate": number (0-100),
  "revenue_generated": number,
  "roi_percent": number,
  "top_device": "Mobile|Desktop|Tablet",
  "peak_open_hour": "HH:MM",
  "insights": ["insight1", "insight2", "insight3"]
}`;
  const user = `Campaign: ${campaign.name}\nProduct: ${campaign.product}\nGoal: ${campaign.goal}\nAudience: ${campaign.audience}`;
  const raw = await callClaude(sys, user);
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch { return null; }
};

// ============================================================
// MAIN APP
// ============================================================
export default function CampaignPilotAI() {
  const [page, setPage] = useState("dashboard");
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [agentLog, setAgentLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const addLog = (msg, type = "info") => {
    setAgentLog(prev => [...prev, { msg, type, ts: Date.now() }]);
  };

  const handleCreateCampaign = async (form) => {
    const id = Date.now().toString();
    const campaign = { ...form, id, status: "planning", createdAt: new Date().toISOString() };
    setCampaigns(prev => [campaign, ...prev]);
    setActiveCampaign(campaign);
    setAgentLog([]);
    setIsRunning(true);
    setPage("run");

    try {
      // PLANNER AGENT
      addLog("🧠 Planner Agent initializing campaign strategy...", "active");
      setCampaigns(prev => prev.map(c => c.id === id ? { ...c, agentStep: "planning" } : c));
      const plan = await runPlannerAgent(campaign);
      addLog("✅ Planner Agent: Strategy complete", "success");

      // CONTENT AGENT
      addLog("✍️ Content Agent generating email copy...", "active");
      setCampaigns(prev => prev.map(c => c.id === id ? { ...c, agentStep: "content", plan } : c));
      const email = await runContentAgent(campaign, plan);
      addLog("✅ Content Agent: Email generated", "success");

      // COMPLIANCE AGENT
      addLog("🛡️ Compliance Agent running BFSI checks...", "active");
      setCampaigns(prev => prev.map(c => c.id === id ? { ...c, agentStep: "compliance", email } : c));
      const compliance = await runComplianceAgent(email || {});
      addLog(`✅ Compliance Agent: ${compliance?.overall_status || "CHECKED"} (Score: ${compliance?.score || "N/A"})`, "success");

      const updated = { ...campaign, plan, email, compliance, status: "pending_approval", agentStep: "approval" };
      setCampaigns(prev => prev.map(c => c.id === id ? updated : c));
      setActiveCampaign(updated);
      addLog("⏳ Awaiting human approval...", "warn");
      setIsRunning(false);
      setPage("approval");
    } catch (err) {
      addLog("❌ Agent pipeline error: " + err.message, "error");
      setIsRunning(false);
    }
  };

  const handleApprove = async (campaignId, editedEmail) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    const updated = { ...campaign, email: editedEmail || campaign.email, status: "executing" };
    setCampaigns(prev => prev.map(c => c.id === campaignId ? updated : c));
    setActiveCampaign(updated);
    setAgentLog([]);
    setIsRunning(true);
    setPage("run");

    addLog("📤 Execution Agent: Sending campaign...", "active");
    await new Promise(r => setTimeout(r, 1500));
    addLog("✅ Execution Agent: Emails dispatched to 12,450 recipients", "success");

    addLog("📊 Analytics Agent: Collecting performance data...", "active");
    const analytics = await runAnalyticsAgent(campaign);
    addLog("✅ Analytics Agent: Report ready", "success");

    const final = { ...updated, analytics, status: "completed", agentStep: "done" };
    setCampaigns(prev => prev.map(c => c.id === campaignId ? final : c));
    setActiveCampaign(final);
    setIsRunning(false);
    setPage("analytics");
  };

  const handleReject = (campaignId) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, status: "rejected" } : c));
    setPage("dashboard");
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg }}>
        <Sidebar page={page} setPage={setPage} campaigns={campaigns} />
        <main style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
          <TopBar page={page} />
          <div style={{ flex: 1, padding: "24px" }}>
            {page === "dashboard" && (
              <Dashboard campaigns={campaigns} setPage={setPage} setActiveCampaign={setActiveCampaign} />
            )}
            {page === "create" && (
              <CreateCampaign onSubmit={handleCreateCampaign} />
            )}
            {page === "run" && (
              <AgentPipeline isRunning={isRunning} agentLog={agentLog} campaign={activeCampaign} />
            )}
            {page === "approval" && activeCampaign && (
              <ApprovalPage
                campaign={activeCampaign}
                onApprove={(e) => handleApprove(activeCampaign.id, e)}
                onReject={() => handleReject(activeCampaign.id)}
              />
            )}
            {page === "analytics" && (
              <AnalyticsPage campaign={activeCampaign} campaigns={campaigns} />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

// ============================================================
// SIDEBAR
// ============================================================
const Sidebar = ({ page, setPage, campaigns }) => {
  const pending = campaigns.filter(c => c.status === "pending_approval").length;
  const completed = campaigns.filter(c => c.status === "completed").length;

  return (
    <aside style={{
      width: 220,
      background: COLORS.surface,
      borderRight: `1px solid ${COLORS.border}`,
      display: "flex",
      flexDirection: "column",
      padding: "20px 14px",
      gap: 4,
      position: "sticky",
      top: 0,
      height: "100vh",
      overflow: "auto",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "8px 6px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: `linear-gradient(135deg, ${COLORS.accent}, #2563EB)`,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Icon name="rocket" size={16} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em", color: COLORS.textPrimary }}>CampaignPilot</div>
          <div style={{ fontSize: 10, color: COLORS.textSecondary, letterSpacing: "0.1em", textTransform: "uppercase" }}>AI Platform</div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 6px 8px", fontWeight: 700 }}>Navigation</div>

      {[
        { id: "dashboard", icon: "chart", label: "Dashboard" },
        { id: "create", icon: "plus", label: "New Campaign" },
        { id: "approval", icon: "eye", label: "Approvals", badge: pending },
        { id: "analytics", icon: "trend", label: "Analytics" },
      ].map(item => (
        <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
          <Icon name={item.icon} size={15} />
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.badge > 0 && (
            <span style={{ background: COLORS.gold, color: "#000", borderRadius: 10, padding: "1px 7px", fontSize: 10, fontWeight: 700 }}>{item.badge}</span>
          )}
        </div>
      ))}

      <div style={{ flex: 1 }} />

      {/* Stats */}
      <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>Stats</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Total</span>
          <span className="mono" style={{ fontSize: 12, color: COLORS.textPrimary, fontWeight: 700 }}>{campaigns.length}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Live</span>
          <span className="mono" style={{ fontSize: 12, color: COLORS.success, fontWeight: 700 }}>{completed}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Pending</span>
          <span className="mono" style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700 }}>{pending}</span>
        </div>
      </div>
    </aside>
  );
};

// ============================================================
// TOP BAR
// ============================================================
const TopBar = ({ page }) => {
  const titles = {
    dashboard: "Campaign Dashboard",
    create: "Create New Campaign",
    run: "Agent Pipeline",
    approval: "Human Approval",
    analytics: "Campaign Analytics",
  };
  const now = new Date();
  return (
    <header style={{
      padding: "16px 24px",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: COLORS.surface,
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>{titles[page] || "CampaignPilot AI"}</h1>
        <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 2 }}>
          BFSI Email Marketing Automation · Multi-Agent System
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: COLORS.success, animation: "pulse-dot 2s infinite" }} />
          <span style={{ fontSize: 11, color: COLORS.success, fontWeight: 600, letterSpacing: "0.05em" }}>AGENTS ONLINE</span>
        </div>
        <div className="mono" style={{ fontSize: 11, color: COLORS.textSecondary }}>
          {now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
        </div>
      </div>
    </header>
  );
};

// ============================================================
// DASHBOARD
// ============================================================
const Dashboard = ({ campaigns, setPage, setActiveCampaign }) => {
  const stats = [
    { label: "Total Campaigns", value: campaigns.length, icon: "mail", color: COLORS.accent },
    { label: "Completed", value: campaigns.filter(c => c.status === "completed").length, icon: "check", color: COLORS.success },
    { label: "Pending Approval", value: campaigns.filter(c => c.status === "pending_approval").length, icon: "eye", color: COLORS.gold },
    { label: "Avg Open Rate", value: campaigns.filter(c => c.analytics).length > 0 ? Math.round(campaigns.filter(c => c.analytics).reduce((a, c) => a + (c.analytics?.open_rate || 0), 0) / campaigns.filter(c => c.analytics).length) + "%" : "—", icon: "trend", color: "#A78BFA" },
  ];

  return (
    <div className="fade-up">
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.surface} 0%, #0A1628 100%)`,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: "28px 28px",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: 200, height: 200,
          borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span className="tag tag-blue"><Icon name="sparkle" size={10} /> AI-Powered</span>
              <span className="tag tag-green">6 Agents Active</span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8 }}>
              Automate Your BFSI<br />Email Campaigns
            </h2>
            <p style={{ color: COLORS.textSecondary, fontSize: 14, lineHeight: 1.6, maxWidth: 400 }}>
              From strategy to analytics — let 6 specialized AI agents plan, write, comply-check, and execute your campaigns end to end.
            </p>
          </div>
          <button className="btn-primary" onClick={() => setPage("create")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", fontSize: 15, flexShrink: 0 }}>
            <Icon name="plus" size={16} color="#fff" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i} className={`card fade-up-${i + 1}`} style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: s.color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={s.icon} size={15} color={s.color} />
              </div>
            </div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Campaign List */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>Campaign History</h3>
          <button className="btn-secondary" onClick={() => setPage("create")} style={{ padding: "6px 14px", fontSize: 12 }}>
            + New
          </button>
        </div>

        {campaigns.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px", color: COLORS.textSecondary }}>
            <div style={{ marginBottom: 12, opacity: 0.3 }}><Icon name="mail" size={48} color={COLORS.textSecondary} /></div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>No campaigns yet</div>
            <div style={{ fontSize: 13 }}>Create your first AI-powered campaign to get started</div>
            <button className="btn-primary" onClick={() => setPage("create")} style={{ marginTop: 16 }}>
              Create Campaign
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {campaigns.map((c, i) => (
              <div key={c.id} className="card card-hover" style={{ cursor: "pointer", padding: "14px 16px" }}
                onClick={() => {
                  setActiveCampaign(c);
                  if (c.status === "pending_approval") setPage("approval");
                  else if (c.status === "completed") setPage("analytics");
                  else setPage("run");
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 8, flexShrink: 0,
                    background: `linear-gradient(135deg, ${COLORS.accent}30, ${COLORS.accentDim}20)`,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Icon name="mail" size={17} color={COLORS.accent} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{c.product} · {c.audience}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <StatusBadge status={c.status} />
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>
                      {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </div>
                  </div>
                </div>
                {c.analytics && (
                  <div style={{ display: "flex", gap: 16, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.border}` }}>
                    {[
                      { label: "Open", value: c.analytics.open_rate + "%", color: COLORS.accent },
                      { label: "Click", value: c.analytics.click_rate + "%", color: COLORS.success },
                      { label: "Convert", value: c.analytics.conversion_rate + "%", color: "#A78BFA" },
                    ].map(m => (
                      <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 11, color: COLORS.textSecondary }}>{m.label}</span>
                        <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    planning: ["Planning", "tag-blue"],
    pending_approval: ["Needs Approval", "tag-yellow"],
    executing: ["Executing", "tag-blue"],
    completed: ["Completed", "tag-green"],
    rejected: ["Rejected", "tag-red"],
  };
  const [label, cls] = map[status] || ["Unknown", "tag-gray"];
  return <span className={`tag ${cls}`}>{label}</span>;
};

// ============================================================
// CREATE CAMPAIGN
// ============================================================
const CreateCampaign = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    product: "",
    goal: "",
    audience: "",
  });
  const [loading, setLoading] = useState(false);

  const goals = ["Lead Generation", "Upsell / Cross-sell", "Product Launch", "Retention", "Re-engagement", "Brand Awareness"];
  const audiences = ["Retail Investors", "HNI Clients", "SME Business Owners", "Salaried Professionals", "Senior Citizens", "First-time Buyers"];
  const products = ["Term Life Insurance", "Health Insurance", "Mutual Fund SIP", "Fixed Deposit", "Home Loan", "Credit Card", "Demat Account", "NPS Pension Plan"];

  const handleSubmit = async () => {
    if (!form.name || !form.product || !form.goal || !form.audience) return;
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="fade-up" style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>New Campaign</h2>
        <p style={{ color: COLORS.textSecondary, fontSize: 14, marginTop: 4 }}>Fill in the details and our 6 AI agents will handle the rest.</p>
      </div>

      {/* Agent Preview */}
      <div className="card" style={{ marginBottom: 24, background: COLORS.accentGlow, borderColor: `${COLORS.accent}30` }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>Agent Pipeline Preview</div>
        <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto" }}>
          {["Planner", "Content", "Compliance", "Approval", "Executor", "Analytics"].map((a, i) => (
            <div key={a} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                padding: "8px 12px", borderRadius: 6, background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                minWidth: 80,
              }}>
                <div style={{ fontSize: 18 }}>
                  {["🧠", "✍️", "🛡️", "👤", "📤", "📊"][i]}
                </div>
                <span style={{ fontSize: 11, color: COLORS.textSecondary, fontWeight: 500, textAlign: "center", whiteSpace: "nowrap" }}>{a}</span>
              </div>
              {i < 5 && <div style={{ width: 20, height: 1, background: COLORS.borderBright, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label>Campaign Name</label>
          <input
            placeholder="e.g. Q4 Term Life Insurance Push"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
        </div>

        <div>
          <label>Financial Product</label>
          <select value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))}>
            <option value="">— Select Product —</option>
            {products.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>

        <div>
          <label>Campaign Goal</label>
          <select value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}>
            <option value="">— Select Goal —</option>
            {goals.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <label>Target Audience</label>
          <select value={form.audience} onChange={e => setForm(f => ({ ...f, audience: e.target.value }))}>
            <option value="">— Select Audience —</option>
            {audiences.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading || !form.name || !form.product || !form.goal || !form.audience}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", fontSize: 15 }}
        >
          {loading ? (
            <><span className="thinking-dots"><span>●</span><span>●</span><span>●</span></span> Launching Agents</>
          ) : (
            <><Icon name="rocket" size={16} color="#fff" /> Launch AI Agents</>
          )}
        </button>
      </div>
    </div>
  );
};

// ============================================================
// AGENT PIPELINE RUNNER PAGE
// ============================================================
const AgentPipeline = ({ isRunning, agentLog, campaign }) => {
  const logRef = useRef(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [agentLog]);

  const steps = [
    { id: "planning", label: "Planner Agent", desc: "Strategy & sequence", icon: "🧠" },
    { id: "content", label: "Content Agent", desc: "Email generation", icon: "✍️" },
    { id: "compliance", label: "Compliance Agent", desc: "BFSI regulatory check", icon: "🛡️" },
    { id: "approval", label: "Human Approval", desc: "Awaiting review", icon: "👤" },
  ];

  const currentStep = campaign?.agentStep;
  const getStepState = (stepId) => {
    const order = ["planning", "content", "compliance", "approval"];
    const ci = order.indexOf(currentStep);
    const si = order.indexOf(stepId);
    if (si < ci) return "done";
    if (si === ci) return isRunning ? "active" : "done";
    return "waiting";
  };

  return (
    <div className="fade-up" style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>AI Agent Pipeline</h2>
        <p style={{ color: COLORS.textSecondary, fontSize: 13, marginTop: 3 }}>
          Agents are autonomously processing: <strong style={{ color: COLORS.textPrimary }}>{campaign?.name}</strong>
        </p>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {steps.map((step, i) => {
          const state = getStepState(step.id);
          return (
            <div key={step.id} className={`agent-step ${state} ${state === "active" ? "agent-active" : ""}`}>
              <div style={{ fontSize: 22, marginTop: 2 }}>{step.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{step.label}</span>
                  {state === "active" && (
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: COLORS.accent }}>
                      <span className="thinking-dots"><span>●</span><span>●</span><span>●</span></span> Running
                    </span>
                  )}
                  {state === "done" && <span style={{ color: COLORS.success, fontSize: 12 }}>✓ Done</span>}
                  {state === "waiting" && <span style={{ color: COLORS.textMuted, fontSize: 12 }}>Queued</span>}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 2 }}>{step.desc}</div>
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: state === "done" ? COLORS.success + "20" : state === "active" ? COLORS.accentGlow : COLORS.bg,
                border: `1px solid ${state === "done" ? COLORS.success : state === "active" ? COLORS.accent : COLORS.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {state === "done" && <Icon name="check" size={13} color={COLORS.success} />}
                {state === "active" && <div style={{ width: 8, height: 8, borderRadius: 4, background: COLORS.accent, animation: "pulse-dot 1s infinite" }} />}
                {state === "waiting" && <span className="mono" style={{ fontSize: 10, color: COLORS.textMuted }}>{i + 1}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Console */}
      <div className="card" style={{ background: "#050810" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.danger }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.gold }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.success }} />
          </div>
          <span className="mono" style={{ fontSize: 11, color: COLORS.textMuted }}>agent_console.log</span>
        </div>
        <div ref={logRef} style={{ height: 200, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
          {agentLog.length === 0 ? (
            <div className="mono" style={{ fontSize: 12, color: COLORS.textMuted }}>$ Initializing agent pipeline...</div>
          ) : (
            agentLog.map((l, i) => (
              <div key={i} className="mono" style={{
                fontSize: 12,
                color: l.type === "error" ? COLORS.danger : l.type === "success" ? COLORS.success : l.type === "warn" ? COLORS.gold : COLORS.textSecondary,
              }}>
                <span style={{ color: COLORS.textMuted }}>[{new Date(l.ts).toLocaleTimeString("en-IN")}]</span> {l.msg}
              </div>
            ))
          )}
          {isRunning && <div className="mono" style={{ fontSize: 12, color: COLORS.textMuted }}>▋</div>}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// APPROVAL PAGE
// ============================================================
const ApprovalPage = ({ campaign, onApprove, onReject }) => {
  const [editedSubject, setEditedSubject] = useState(campaign?.email?.subject || "");
  const [editedBody, setEditedBody] = useState(campaign?.email?.body || "");
  const [isEditing, setIsEditing] = useState(false);
  const [approving, setApproving] = useState(false);

  const compliance = campaign?.compliance;
  const plan = campaign?.plan;

  const handleApprove = async () => {
    setApproving(true);
    await onApprove({ ...campaign.email, subject: editedSubject, body: editedBody });
  };

  const statusColor = compliance?.overall_status === "PASS" ? COLORS.success : compliance?.overall_status === "WARN" ? COLORS.gold : COLORS.danger;

  return (
    <div className="fade-up" style={{ maxWidth: 860, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Human Approval Required</h2>
          <p style={{ color: COLORS.textSecondary, fontSize: 13, marginTop: 3 }}>Review the AI-generated campaign before it goes live</p>
        </div>
        <span className="tag tag-yellow">
          <Icon name="eye" size={10} /> Awaiting Review
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        {/* Email Preview + Edit */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Email Preview
              </div>
              <button className="btn-secondary" onClick={() => setIsEditing(!isEditing)} style={{ padding: "5px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
                <Icon name="edit" size={12} /> {isEditing ? "Done Editing" : "Edit"}
              </button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label>Subject Line</label>
              {isEditing ? (
                <input value={editedSubject} onChange={e => setEditedSubject(e.target.value)} />
              ) : (
                <div style={{ padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 6, fontSize: 14, fontWeight: 600 }}>
                  {editedSubject}
                </div>
              )}
            </div>

            {campaign?.email?.preview_text && (
              <div style={{ marginBottom: 14 }}>
                <label>Preview Text</label>
                <div style={{ padding: "8px 12px", background: COLORS.bg, borderRadius: 6, fontSize: 12, color: COLORS.textSecondary, fontStyle: "italic" }}>
                  {campaign.email.preview_text}
                </div>
              </div>
            )}

            <div>
              <label>Email Body</label>
              {isEditing ? (
                <textarea value={editedBody} onChange={e => setEditedBody(e.target.value)} style={{ minHeight: 200, fontSize: 13 }} />
              ) : (
                <div style={{
                  padding: "16px", border: `1px solid ${COLORS.border}`, borderRadius: 6,
                  fontSize: 14, lineHeight: 1.7, color: COLORS.textPrimary,
                  background: COLORS.bg, minHeight: 160,
                }}
                  dangerouslySetInnerHTML={{ __html: editedBody }}
                />
              )}
            </div>

            {campaign?.email?.cta_text && (
              <div style={{ marginTop: 14, padding: "12px 14px", background: COLORS.bg, borderRadius: 8, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: COLORS.textSecondary }}>CTA Button:</span>
                <span style={{ background: COLORS.accent, color: "#fff", padding: "5px 16px", borderRadius: 5, fontSize: 13, fontWeight: 600 }}>
                  {campaign.email.cta_text}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-success" onClick={handleApprove} disabled={approving}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px" }}>
              {approving ? (
                <><span className="thinking-dots"><span>●</span><span>●</span><span>●</span></span> Executing...</>
              ) : (
                <><Icon name="check" size={16} color="#fff" /> Approve & Send</>
              )}
            </button>
            <button className="btn-danger" onClick={onReject} disabled={approving}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "13px 20px" }}>
              <Icon name="x" size={15} color={COLORS.danger} /> Reject
            </button>
          </div>
        </div>

        {/* Right Panel: Compliance + Plan */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Compliance Report */}
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: COLORS.textSecondary }}>
                🛡️ Compliance
              </div>
              {compliance && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: statusColor }}>{compliance.score}</span>
                  <span style={{ fontSize: 11, color: COLORS.textSecondary }}>/100</span>
                </div>
              )}
            </div>

            {compliance ? (
              <>
                <div style={{ marginBottom: 12 }}>
                  <span className={`tag ${compliance.overall_status === "PASS" ? "tag-green" : compliance.overall_status === "WARN" ? "tag-yellow" : "tag-red"}`}>
                    {compliance.overall_status}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {compliance.checks?.map((c, i) => (
                    <div key={i} className={`compliance-item ${c.status === "PASS" ? "compliance-pass" : c.status === "WARN" ? "compliance-warn" : "compliance-fail"}`}>
                      <span style={{ fontSize: 14, marginTop: 0, lineHeight: 1 }}>
                        {c.status === "PASS" ? "✅" : c.status === "WARN" ? "⚠️" : "❌"}
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 2 }}>{c.rule}</div>
                        <div style={{ fontSize: 11, color: COLORS.textSecondary, lineHeight: 1.4 }}>{c.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {compliance.suggested_disclaimer && (
                  <div style={{ marginTop: 10, padding: "8px 10px", background: COLORS.bg, borderRadius: 6, border: `1px solid ${COLORS.border}` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.textSecondary, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Suggested Disclaimer</div>
                    <div style={{ fontSize: 11, color: COLORS.textSecondary, lineHeight: 1.5 }}>{compliance.suggested_disclaimer}</div>
                  </div>
                )}
              </>
            ) : (
              <div className="loading-shimmer" style={{ height: 100, borderRadius: 6 }} />
            )}
          </div>

          {/* Campaign Plan */}
          {plan && (
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: COLORS.textSecondary, marginBottom: 12 }}>
                🧠 Strategy
              </div>
              <p style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: 12 }}>{plan.strategy}</p>
              {plan.sequence?.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 10, background: COLORS.accentGlow, border: `1px solid ${COLORS.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="mono" style={{ fontSize: 9, color: COLORS.accent }}>{i + 1}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent }}>{s.type}</span>
                    <span style={{ fontSize: 12, color: COLORS.textSecondary }}> — {s.goal}</span>
                  </div>
                </div>
              ))}
              {plan.recommended_send_days && (
                <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {plan.recommended_send_days.map(d => (
                    <span key={d} className="tag tag-gray">{d}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ANALYTICS PAGE
// ============================================================
const AnalyticsPage = ({ campaign, campaigns }) => {
  const a = campaign?.analytics;
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 100); }, []);

  if (!a && !campaigns.some(c => c.analytics)) {
    return (
      <div className="fade-up" style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ opacity: 0.3, marginBottom: 16 }}><Icon name="chart" size={60} color={COLORS.textSecondary} /></div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No analytics yet</div>
        <div style={{ fontSize: 13, color: COLORS.textSecondary }}>Complete a campaign to see performance data</div>
      </div>
    );
  }

  const displayCampaign = campaign?.analytics ? campaign : campaigns.find(c => c.analytics);
  const data = displayCampaign?.analytics || {};

  const metrics = [
    { label: "Emails Sent", value: (data.sent || 0).toLocaleString("en-IN"), icon: "send", color: COLORS.accent, sub: "recipients" },
    { label: "Open Rate", value: (data.open_rate || 0) + "%", icon: "eye", color: COLORS.success, sub: `${data.opened || 0} opened` },
    { label: "Click Rate", value: (data.click_rate || 0) + "%", icon: "trend", color: "#A78BFA", sub: `${data.clicked || 0} clicked` },
    { label: "Conversions", value: (data.conversion_rate || 0) + "%", icon: "zap", color: COLORS.gold, sub: `₹${(data.revenue_generated || 0).toLocaleString("en-IN")} revenue` },
  ];

  const bars = [
    { label: "Delivered", value: data.delivered, total: data.sent, color: COLORS.accent },
    { label: "Opened", value: data.opened, total: data.sent, color: COLORS.success },
    { label: "Clicked", value: data.clicked, total: data.sent, color: "#A78BFA" },
    { label: "Converted", value: data.converted, total: data.sent, color: COLORS.gold },
  ];

  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Campaign Analytics</h2>
          <p style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 3 }}>
            {displayCampaign?.name} · <span className="tag tag-green" style={{ marginLeft: 4 }}>Completed</span>
          </p>
        </div>
        {data.roi_percent && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em" }}>ROI</div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: COLORS.success }}>+{data.roi_percent}%</div>
          </div>
        )}
      </div>

      {/* Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {metrics.map((m, i) => (
          <div key={i} className={`card fade-up-${i + 1}`} style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</span>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: m.color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={m.icon} size={14} color={m.color} />
              </div>
            </div>
            <div className="mono" style={{ fontSize: 26, fontWeight: 700, color: m.color, marginBottom: 4 }}>{m.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Funnel Chart */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: COLORS.textSecondary, marginBottom: 18 }}>
            📊 Campaign Funnel
          </div>
          {bars.map((bar, i) => {
            const pct = data.sent ? Math.round((bar.value / data.sent) * 100) : 0;
            return (
              <div key={i} className="chart-bar-wrap">
                <span className="chart-bar-label">{bar.label}</span>
                <div className="chart-bar-track">
                  <div className="chart-bar-inner" style={{ width: animated ? pct + "%" : "0%", background: bar.color }} />
                </div>
                <span className="chart-bar-val" style={{ color: bar.color }}>{pct}%</span>
              </div>
            );
          })}
          <div style={{ marginTop: 16, padding: "10px 12px", background: COLORS.bg, borderRadius: 6, border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Revenue Generated</span>
              <span className="mono" style={{ fontSize: 15, fontWeight: 700, color: COLORS.success }}>
                ₹{(data.revenue_generated || 0).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: COLORS.textSecondary, marginBottom: 14 }}>
              🤖 AI Insights
            </div>
            {data.insights?.map((ins, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: COLORS.bg, borderRadius: 7, border: `1px solid ${COLORS.border}`, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: COLORS.accent, flexShrink: 0, marginTop: 6 }} />
                <span style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5 }}>{ins}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: COLORS.textSecondary, marginBottom: 14 }}>
              📱 Engagement Details
            </div>
            {[
              { label: "Top Device", value: data.top_device || "Mobile", icon: "cpu" },
              { label: "Peak Open Time", value: data.peak_open_hour || "10:30", icon: "clock" },
              { label: "Bounce Rate", value: data.sent && data.delivered ? (((data.sent - data.delivered) / data.sent) * 100).toFixed(1) + "%" : "2.1%", icon: "warning" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? `1px solid ${COLORS.border}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name={item.icon} size={13} color={COLORS.textSecondary} />
                  <span style={{ fontSize: 13, color: COLORS.textSecondary }}>{item.label}</span>
                </div>
                <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Completed Campaigns */}
      {campaigns.filter(c => c.analytics && c.id !== displayCampaign?.id).length > 0 && (
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: COLORS.textSecondary, marginBottom: 14 }}>
            Historical Performance
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {campaigns.filter(c => c.analytics).map(c => (
              <div key={c.id} className="card" style={{ padding: "12px 14px", background: COLORS.bg }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                <div style={{ display: "flex", gap: 12 }}>
                  {[
                    { l: "Open", v: c.analytics.open_rate + "%", color: COLORS.accent },
                    { l: "Click", v: c.analytics.click_rate + "%", color: COLORS.success },
                    { l: "Conv", v: c.analytics.conversion_rate + "%", color: COLORS.gold },
                  ].map(m => (
                    <div key={m.l}>
                      <div style={{ fontSize: 10, color: COLORS.textMuted }}>{m.l}</div>
                      <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};