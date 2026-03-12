import { useState, useEffect, useRef } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --stone: #f5f0ea;
    --bark: #2c2419;
    --moss: #4a5e3a;
    --sage: #8fa67d;
    --clay: #c4855a;
    --mist: #d4cfc8;
    --water: #6b8fa3;
    --cream: #faf7f2;
    --ink: #1a1510;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--stone);
    color: var(--ink);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app {
    max-width: 390px;
    margin: 0 auto;
    min-height: 100vh;
    background: var(--cream);
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 60px rgba(0,0,0,0.12);
  }

  /* Organic background texture */
  .app::before {
    content: '';
    position: fixed;
    top: -20%;
    right: -30%;
    width: 70%;
    height: 70%;
    background: radial-gradient(ellipse, rgba(143,166,125,0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* ===== HEADER ===== */
  .header {
    padding: 56px 28px 24px;
    position: relative;
  }

  .header-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 6px;
  }

  .header-title {
    font-family: 'Fraunces', serif;
    font-size: 34px;
    font-weight: 300;
    line-height: 1.1;
    color: var(--bark);
    letter-spacing: -0.02em;
  }

  .header-title em {
    font-style: italic;
    color: var(--moss);
  }

  /* ===== STATUS RING ===== */
  .status-section {
    padding: 8px 28px 28px;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .ring-container {
    position: relative;
    width: 96px;
    height: 96px;
    flex-shrink: 0;
  }

  .ring-svg {
    transform: rotate(-90deg);
  }

  .ring-bg {
    fill: none;
    stroke: var(--mist);
    stroke-width: 5;
  }

  .ring-progress {
    fill: none;
    stroke: var(--moss);
    stroke-width: 5;
    stroke-linecap: round;
    stroke-dasharray: 251;
    stroke-dashoffset: 251;
    transition: stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .ring-progress.animate {
    stroke-dashoffset: var(--offset);
  }

  .ring-inner {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .ring-number {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 300;
    color: var(--bark);
    line-height: 1;
  }

  .ring-unit {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--sage);
    margin-top: 2px;
  }

  .status-info {
    flex: 1;
  }

  .status-mode {
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-weight: 300;
    color: var(--bark);
    margin-bottom: 4px;
  }

  .status-desc {
    font-size: 13px;
    color: #7a7060;
    line-height: 1.5;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 8px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }

  .badge-protect {
    background: rgba(74,94,58,0.1);
    color: var(--moss);
  }

  .badge-ready {
    background: rgba(107,143,163,0.12);
    color: var(--water);
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  /* ===== SECTION DIVIDER ===== */
  .divider {
    height: 1px;
    background: linear-gradient(to right, transparent, var(--mist) 20%, var(--mist) 80%, transparent);
    margin: 0 28px;
  }

  /* ===== TIMELINE ===== */
  .section {
    padding: 24px 28px;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .section-title {
    font-family: 'Fraunces', serif;
    font-size: 18px;
    font-weight: 300;
    color: var(--bark);
  }

  .section-action {
    font-size: 12px;
    color: var(--sage);
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.04em;
  }

  .timeline {
    position: relative;
    padding-left: 16px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 8px;
    bottom: 8px;
    width: 1px;
    background: linear-gradient(to bottom, var(--moss), var(--mist));
  }

  .timeline-item {
    position: relative;
    margin-bottom: 20px;
    padding-left: 20px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .timeline-item:hover {
    transform: translateX(2px);
  }

  .timeline-item:last-child {
    margin-bottom: 0;
  }

  .timeline-dot {
    position: absolute;
    left: -12px;
    top: 7px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--cream);
    box-shadow: 0 0 0 1px var(--mist);
  }

  .dot-protect { background: var(--moss); box-shadow: 0 0 0 1px var(--moss); }
  .dot-batch { background: var(--water); box-shadow: 0 0 0 1px var(--water); }
  .dot-check { background: var(--clay); box-shadow: 0 0 0 1px var(--clay); }
  .dot-future { background: var(--mist); box-shadow: 0 0 0 1px var(--mist); }

  .timeline-time {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 2px;
  }

  .timeline-label {
    font-size: 15px;
    color: var(--bark);
    font-weight: 400;
  }

  .timeline-sub {
    font-size: 12px;
    color: #9a907f;
    margin-top: 2px;
  }

  .timeline-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 600;
    margin-left: 6px;
    vertical-align: middle;
  }

  .count-batch { background: rgba(107,143,163,0.15); color: var(--water); }
  .count-check { background: rgba(196,133,90,0.15); color: var(--clay); }

  /* ===== INBOX PREVIEW ===== */
  .inbox-cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .inbox-card {
    background: white;
    border-radius: 14px;
    padding: 14px 16px;
    border: 1px solid var(--mist);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .inbox-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 14px 0 0 14px;
  }

  .card-urgent::before { background: var(--clay); }
  .card-normal::before { background: var(--water); }
  .card-low::before { background: var(--mist); }

  .inbox-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  }

  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .card-from {
    font-size: 13px;
    font-weight: 500;
    color: var(--bark);
  }

  .card-time {
    font-size: 11px;
    color: var(--sage);
    font-weight: 400;
  }

  .card-subject {
    font-size: 13px;
    color: #555048;
    line-height: 1.4;
    margin-bottom: 4px;
  }

  .card-priority {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 10px;
  }

  .priority-urgent { background: rgba(196,133,90,0.12); color: var(--clay); }
  .priority-batch { background: rgba(107,143,163,0.12); color: var(--water); }
  .priority-low { background: rgba(143,166,125,0.12); color: var(--sage); }

  /* ===== PATTERNS ===== */
  .patterns-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .pattern-card {
    background: white;
    border-radius: 14px;
    padding: 16px;
    border: 1px solid var(--mist);
  }

  .pattern-icon {
    font-size: 22px;
    margin-bottom: 8px;
  }

  .pattern-value {
    font-family: 'Fraunces', serif;
    font-size: 24px;
    font-weight: 300;
    color: var(--bark);
    line-height: 1;
    margin-bottom: 2px;
  }

  .pattern-label {
    font-size: 11px;
    color: #9a907f;
    font-weight: 400;
    line-height: 1.4;
  }

  /* ===== TOGGLE SECTION ===== */
  .protect-toggle {
    margin: 0 28px 28px;
    background: var(--moss);
    border-radius: 20px;
    padding: 20px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .protect-toggle::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .protect-toggle.off {
    background: var(--mist);
  }

  .toggle-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .toggle-emoji {
    font-size: 22px;
  }

  .toggle-text-main {
    font-family: 'Fraunces', serif;
    font-size: 16px;
    font-weight: 300;
    color: white;
    line-height: 1.2;
  }

  .protect-toggle.off .toggle-text-main {
    color: var(--bark);
  }

  .toggle-text-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.7);
    margin-top: 1px;
  }

  .protect-toggle.off .toggle-text-sub {
    color: var(--sage);
  }

  .toggle-switch {
    width: 44px;
    height: 26px;
    background: rgba(255,255,255,0.25);
    border-radius: 13px;
    position: relative;
    transition: background 0.3s ease;
    flex-shrink: 0;
  }

  .protect-toggle.off .toggle-switch {
    background: rgba(0,0,0,0.12);
  }

  .toggle-knob {
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }

  .protect-toggle:not(.off) .toggle-knob {
    transform: translateX(18px);
  }

  /* ===== BOTTOM NAV ===== */
  .bottom-nav {
    position: sticky;
    bottom: 0;
    background: rgba(250,247,242,0.92);
    backdrop-filter: blur(16px);
    border-top: 1px solid var(--mist);
    padding: 12px 28px 28px;
    display: flex;
    justify-content: space-around;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    padding: 4px 12px;
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .nav-item.active {
    background: rgba(74,94,58,0.08);
  }

  .nav-icon {
    font-size: 20px;
    line-height: 1;
  }

  .nav-label {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--sage);
  }

  .nav-item.active .nav-label {
    color: var(--moss);
  }

  /* ===== LEARN VIEW ===== */
  .learn-view {
    padding: 0 28px 120px;
  }

  .learn-header {
    padding: 56px 0 24px;
  }

  .learn-description {
    font-size: 14px;
    color: #7a7060;
    line-height: 1.7;
    margin-top: 8px;
  }

  .preference-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid var(--mist);
  }

  .preference-row:last-child { border-bottom: none; }

  .pref-left {}
  .pref-name {
    font-size: 15px;
    color: var(--bark);
    margin-bottom: 2px;
  }
  .pref-detail {
    font-size: 12px;
    color: #9a907f;
  }

  .time-pill {
    background: rgba(74,94,58,0.08);
    color: var(--moss);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid rgba(74,94,58,0.15);
  }

  .time-pill:hover {
    background: rgba(74,94,58,0.15);
  }

  .insight-box {
    background: linear-gradient(135deg, rgba(74,94,58,0.06), rgba(107,143,163,0.06));
    border: 1px solid rgba(74,94,58,0.12);
    border-radius: 16px;
    padding: 18px;
    margin-top: 20px;
  }

  .insight-title {
    font-family: 'Fraunces', serif;
    font-size: 15px;
    font-weight: 400;
    color: var(--bark);
    margin-bottom: 8px;
  }

  .insight-text {
    font-size: 13px;
    color: #7a7060;
    line-height: 1.6;
  }

  .insight-text strong {
    color: var(--moss);
    font-weight: 500;
  }

  /* ===== INBOX FULL VIEW ===== */
  .inbox-view {
    padding: 0 28px 120px;
  }

  .inbox-header {
    padding: 56px 0 20px;
  }

  .batch-banner {
    background: rgba(107,143,163,0.1);
    border: 1px solid rgba(107,143,163,0.2);
    border-radius: 14px;
    padding: 14px 16px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .batch-icon { font-size: 20px; }

  .batch-text {
    flex: 1;
    font-size: 13px;
    color: var(--water);
    line-height: 1.5;
  }

  .batch-count {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 300;
    color: var(--water);
  }

  .filter-pills {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
  }

  .filter-pill {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid var(--mist);
    background: white;
    color: #7a7060;
  }

  .filter-pill.active {
    background: var(--bark);
    color: white;
    border-color: var(--bark);
  }

  /* ===== SETTINGS VIEW ===== */
  .settings-view {
    padding: 0 28px 120px;
  }

  .settings-header {
    padding: 56px 0 24px;
  }

  .settings-group {
    margin-bottom: 28px;
  }

  .settings-group-title {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 10px;
  }

  .settings-card {
    background: white;
    border-radius: 16px;
    border: 1px solid var(--mist);
    overflow: hidden;
  }

  .settings-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid var(--mist);
    cursor: pointer;
  }

  .settings-row:last-child { border-bottom: none; }

  .settings-row-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .settings-emoji { font-size: 16px; }

  .settings-name {
    font-size: 14px;
    color: var(--bark);
  }

  .settings-value {
    font-size: 13px;
    color: var(--sage);
  }

  .mini-toggle {
    width: 36px;
    height: 22px;
    border-radius: 11px;
    background: var(--moss);
    position: relative;
    cursor: pointer;
    transition: background 0.25s ease;
  }

  .mini-toggle.off { background: var(--mist); }

  .mini-knob {
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }

  .mini-toggle:not(.off) .mini-knob {
    transform: translateX(14px);
  }

  /* ===== ANIMATIONS ===== */
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in {
    animation: slideUp 0.4s ease forwards;
  }

  .animate-in:nth-child(2) { animation-delay: 0.05s; opacity: 0; }
  .animate-in:nth-child(3) { animation-delay: 0.1s; opacity: 0; }
  .animate-in:nth-child(4) { animation-delay: 0.15s; opacity: 0; }
  .animate-in:nth-child(5) { animation-delay: 0.2s; opacity: 0; }

  /* ===== DO NOT DISTURB OVERLAY ===== */
  .dnd-overlay {
    position: fixed;
    inset: 0;
    background: rgba(26,21,16,0.6);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: flex;
    align-items: flex-end;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .dnd-sheet {
    background: var(--cream);
    border-radius: 28px 28px 0 0;
    padding: 8px 28px 48px;
    width: 100%;
    animation: slideSheet 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes slideSheet {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  .sheet-handle {
    width: 36px;
    height: 4px;
    background: var(--mist);
    border-radius: 2px;
    margin: 12px auto 28px;
  }

  .sheet-title {
    font-family: 'Fraunces', serif;
    font-size: 26px;
    font-weight: 300;
    color: var(--bark);
    margin-bottom: 8px;
  }

  .sheet-desc {
    font-size: 14px;
    color: #7a7060;
    line-height: 1.6;
    margin-bottom: 28px;
  }

  .duration-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }

  .duration-btn {
    padding: 16px;
    border-radius: 14px;
    border: 1.5px solid var(--mist);
    background: white;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .duration-btn:hover, .duration-btn.selected {
    border-color: var(--moss);
    background: rgba(74,94,58,0.05);
  }

  .duration-number {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 300;
    color: var(--bark);
    line-height: 1;
    margin-bottom: 2px;
  }

  .duration-unit {
    font-size: 12px;
    color: var(--sage);
    font-weight: 500;
  }

  .start-btn {
    width: 100%;
    padding: 18px;
    background: var(--moss);
    color: white;
    border: none;
    border-radius: 16px;
    font-family: 'Fraunces', serif;
    font-size: 18px;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.02em;
  }

  .start-btn:hover { background: var(--bark); }
`;

const TIMELINE_DATA = [
  { time: "7:00 AM", label: "Morning quiet", sub: "No interruptions — protected", type: "protect", dot: "dot-protect" },
  { time: "9:00 AM", label: "Morning batch", sub: "Review overnight messages", count: 12, countType: "count-batch", type: "batch", dot: "dot-batch" },
  { time: "12:30 PM", label: "Quick check", sub: "Lunch window scan", count: 4, countType: "count-check", type: "check", dot: "dot-check" },
  { time: "4:00 PM", label: "Afternoon batch", sub: "Deep inbox + replies", count: 8, countType: "count-batch", type: "batch", dot: "dot-batch" },
  { time: "6:30 PM", label: "Evening quiet", sub: "Devices put to rest", type: "protect", dot: "dot-protect" },
];

const INBOX_DATA = [
  { from: "Dr. Reyes", subject: "Your 3pm appt tomorrow — confirm?", time: "Now", priority: "urgent", type: "card-urgent", priorityLabel: "Needs reply" },
  { from: "Mom", subject: "Are you free this weekend?", time: "2h ago", priority: "batch", type: "card-normal", priorityLabel: "Batch review" },
  { from: "LinkedIn", subject: "15 people viewed your profile", time: "4h ago", priority: "low", type: "card-low", priorityLabel: "Low signal" },
  { from: "Slack – Design", subject: "Thread: Q1 review deck feedback", time: "5h ago", priority: "batch", type: "card-normal", priorityLabel: "Batch review" },
  { from: "Newsletter", subject: "The week's best reads on attention", time: "6h ago", priority: "low", type: "card-low", priorityLabel: "Low signal" },
];

const PATTERN_DATA = [
  { icon: "🌅", value: "68%", label: "of your focus happens before noon" },
  { icon: "📬", value: "3×", label: "is your ideal batch frequency" },
  { icon: "🌙", value: "9 PM", label: "when you feel most relief disconnecting" },
  { icon: "⏱", value: "22 min", label: "avg to regain focus after checking email" },
];

const SETTINGS_DATA = {
  schedule: [
    { emoji: "🌅", name: "Morning quiet", value: "7–9 AM" },
    { emoji: "📬", name: "Batch windows", value: "3 per day" },
    { emoji: "🌙", name: "Evening quiet", value: "6:30 PM+" },
  ],
  notify: [
    { emoji: "🚨", name: "True urgent only", toggle: true, on: true },
    { emoji: "🔕", name: "Mute during focus", toggle: true, on: true },
    { emoji: "📊", name: "Weekly insight report", toggle: true, on: false },
    { emoji: "🎯", name: "Learn from my choices", toggle: true, on: true },
  ],
  sources: [
    { emoji: "✉️", name: "Gmail", value: "Connected" },
    { emoji: "💬", name: "iMessage", value: "Connected" },
    { emoji: "💼", name: "Slack", value: "Connected" },
    { emoji: "📱", name: "WhatsApp", value: "Add" },
  ]
};

export default function Stillwater() {
  const [tab, setTab] = useState("home");
  const [protectOn, setProtectOn] = useState(true);
  const [showDND, setShowDND] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [filterActive, setFilterActive] = useState("All");
  const [ringAnimated, setRingAnimated] = useState(false);
  const [settingToggles, setSettingToggles] = useState({ 0: true, 1: true, 2: false, 3: true });

  useEffect(() => {
    const t = setTimeout(() => setRingAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  // % of day protected: 13/16 waking hrs
  const protectedPct = 0.62;
  const circumference = 251;
  const offset = circumference - (circumference * protectedPct);

  return (
    <>
      <style>{FONTS}{styles}</style>
      <div className="app">

        {/* ===== HOME ===== */}
        {tab === "home" && (
          <>
            <div className="header animate-in">
              <div className="header-label">Wednesday · March 11</div>
              <div className="header-title">Still<em>water</em></div>
            </div>

            <div className="status-section animate-in">
              <div className="ring-container">
                <svg className="ring-svg" width="96" height="96" viewBox="0 0 96 96">
                  <circle className="ring-bg" cx="48" cy="48" r="40" />
                  <circle
                    className={`ring-progress ${ringAnimated ? "animate" : ""}`}
                    style={{ "--offset": offset }}
                    cx="48" cy="48" r="40"
                  />
                </svg>
                <div className="ring-inner">
                  <div className="ring-number">62%</div>
                  <div className="ring-unit">protected</div>
                </div>
              </div>
              <div className="status-info">
                <div className="status-mode">Morning quiet</div>
                <div className="status-desc">No notifications until 9 AM. Your focus is protected.</div>
                <div className="status-badge badge-protect">
                  <span className="badge-dot" />
                  Active now
                </div>
              </div>
            </div>

            {/* Main protect toggle */}
            <div
              className={`protect-toggle ${protectOn ? "" : "off"} animate-in`}
              onClick={() => { setProtectOn(!protectOn); if (!protectOn) {} else setShowDND(true); }}
            >
              <div className="toggle-left">
                <span className="toggle-emoji">{protectOn ? "🌿" : "📬"}</span>
                <div>
                  <div className="toggle-text-main">
                    {protectOn ? "Protect this time" : "Open to messages"}
                  </div>
                  <div className="toggle-text-sub">
                    {protectOn ? "Tap to pause protection" : "Tap to restore quiet"}
                  </div>
                </div>
              </div>
              <div className="toggle-switch">
                <div className="toggle-knob" />
              </div>
            </div>

            <div className="divider" />

            {/* Today's timeline */}
            <div className="section animate-in">
              <div className="section-header">
                <div className="section-title">Today's rhythm</div>
                <div className="section-action" onClick={() => setTab("learn")}>Edit</div>
              </div>
              <div className="timeline">
                {TIMELINE_DATA.map((item, i) => (
                  <div key={i} className="timeline-item">
                    <div className={`timeline-dot ${item.dot}`} />
                    <div className="timeline-time">{item.time}</div>
                    <div className="timeline-label">
                      {item.label}
                      {item.count && (
                        <span className={`timeline-count ${item.countType}`}>{item.count}</span>
                      )}
                    </div>
                    <div className="timeline-sub">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="divider" />

            {/* Inbox preview */}
            <div className="section animate-in">
              <div className="section-header">
                <div className="section-title">Next batch preview</div>
                <div className="section-action" onClick={() => setTab("inbox")}>See all 24</div>
              </div>
              <div className="inbox-cards">
                {INBOX_DATA.slice(0, 3).map((msg, i) => (
                  <div key={i} className={`inbox-card ${msg.type}`}>
                    <div className="card-top">
                      <div className="card-from">{msg.from}</div>
                      <div className="card-time">{msg.time}</div>
                    </div>
                    <div className="card-subject">{msg.subject}</div>
                    <span className={`card-priority priority-${msg.priority}`}>{msg.priorityLabel}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: 100 }} />
          </>
        )}

        {/* ===== INBOX ===== */}
        {tab === "inbox" && (
          <div className="inbox-view">
            <div className="inbox-header">
              <div className="header-label">Batched messages</div>
              <div className="header-title" style={{ fontSize: 28 }}>Your <em>queue</em></div>
            </div>

            <div className="batch-banner">
              <span className="batch-icon">⏳</span>
              <div className="batch-text">
                Next batch window opens at <strong>9:00 AM</strong>. Stillwater is holding 24 items.
              </div>
              <div className="batch-count">24</div>
            </div>

            <div className="filter-pills">
              {["All", "Urgent", "Email", "Texts", "Slack", "Low signal"].map(f => (
                <div
                  key={f}
                  className={`filter-pill ${filterActive === f ? "active" : ""}`}
                  onClick={() => setFilterActive(f)}
                >{f}</div>
              ))}
            </div>

            <div className="inbox-cards">
              {INBOX_DATA.map((msg, i) => (
                <div key={i} className={`inbox-card ${msg.type} animate-in`} style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}>
                  <div className="card-top">
                    <div className="card-from">{msg.from}</div>
                    <div className="card-time">{msg.time}</div>
                  </div>
                  <div className="card-subject">{msg.subject}</div>
                  <span className={`card-priority priority-${msg.priority}`}>{msg.priorityLabel}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== LEARN ===== */}
        {tab === "learn" && (
          <div className="learn-view">
            <div className="learn-header">
              <div className="header-label">Intelligence</div>
              <div className="header-title" style={{ fontSize: 28 }}>Your <em>patterns</em></div>
              <div className="learn-description">
                Stillwater learns when you're most focused, what you ignore, and what genuinely needs you — then builds a schedule around that.
              </div>
            </div>

            <div className="patterns-grid" style={{ marginBottom: 24 }}>
              {PATTERN_DATA.map((p, i) => (
                <div key={i} className="pattern-card animate-in" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                  <div className="pattern-icon">{p.icon}</div>
                  <div className="pattern-value">{p.value}</div>
                  <div className="pattern-label">{p.label}</div>
                </div>
              ))}
            </div>

            <div className="divider" style={{ margin: "0 0 24px" }} />

            <div className="section-title" style={{ marginBottom: 4 }}>Your schedule</div>
            <div style={{ fontSize: 13, color: "#9a907f", marginBottom: 16 }}>Tap to adjust</div>

            <div>
              {[
                { name: "Morning quiet block", detail: "No alerts, no badges", value: "7 – 9 AM" },
                { name: "Morning batch window", detail: "Deep review session", value: "9 – 9:30 AM" },
                { name: "Midday check", detail: "Quick scan only", value: "12:30 PM" },
                { name: "Afternoon batch", detail: "Full triage + replies", value: "4 – 5 PM" },
                { name: "Evening quiet block", detail: "Device winds down with you", value: "6:30 PM+" },
              ].map((p, i) => (
                <div key={i} className="preference-row animate-in" style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}>
                  <div className="pref-left">
                    <div className="pref-name">{p.name}</div>
                    <div className="pref-detail">{p.detail}</div>
                  </div>
                  <div className="time-pill">{p.value}</div>
                </div>
              ))}
            </div>

            <div className="insight-box">
              <div className="insight-title">💡 What Stillwater noticed</div>
              <div className="insight-text">
                You open email most often at <strong>8:52 AM</strong> — right before your best focus time. Moving your first batch to 9:15 AM could recover <strong>~40 min of deep work</strong> per day.
              </div>
            </div>
          </div>
        )}

        {/* ===== SETTINGS ===== */}
        {tab === "settings" && (
          <div className="settings-view">
            <div className="settings-header">
              <div className="header-label">Configuration</div>
              <div className="header-title" style={{ fontSize: 28 }}>Your <em>rules</em></div>
            </div>

            <div className="settings-group">
              <div className="settings-group-title">Schedule</div>
              <div className="settings-card">
                {SETTINGS_DATA.schedule.map((r, i) => (
                  <div key={i} className="settings-row">
                    <div className="settings-row-left">
                      <span className="settings-emoji">{r.emoji}</span>
                      <span className="settings-name">{r.name}</span>
                    </div>
                    <span className="settings-value">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="settings-group">
              <div className="settings-group-title">Notifications & learning</div>
              <div className="settings-card">
                {SETTINGS_DATA.notify.map((r, i) => (
                  <div key={i} className="settings-row" onClick={() => setSettingToggles(t => ({ ...t, [i]: !t[i] }))}>
                    <div className="settings-row-left">
                      <span className="settings-emoji">{r.emoji}</span>
                      <span className="settings-name">{r.name}</span>
                    </div>
                    <div className={`mini-toggle ${settingToggles[i] ? "" : "off"}`}>
                      <div className="mini-knob" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="settings-group">
              <div className="settings-group-title">Connected sources</div>
              <div className="settings-card">
                {SETTINGS_DATA.sources.map((r, i) => (
                  <div key={i} className="settings-row">
                    <div className="settings-row-left">
                      <span className="settings-emoji">{r.emoji}</span>
                      <span className="settings-name">{r.name}</span>
                    </div>
                    <span className="settings-value" style={{ color: r.value === "Add" ? "var(--clay)" : "var(--sage)" }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="insight-box" style={{ marginTop: 0 }}>
              <div className="insight-title">🌿 The philosophy</div>
              <div className="insight-text">
                Stillwater doesn't try to make you more productive. It protects your right to be a human — present, rested, and in control of your own attention.
              </div>
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div className="bottom-nav">
          {[
            { id: "home", icon: "🌿", label: "Today" },
            { id: "inbox", icon: "📬", label: "Queue" },
            { id: "learn", icon: "📊", label: "Patterns" },
            { id: "settings", icon: "⚙️", label: "Rules" },
          ].map(n => (
            <div key={n.id} className={`nav-item ${tab === n.id ? "active" : ""}`} onClick={() => setTab(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </div>
          ))}
        </div>

        {/* DND Sheet */}
        {showDND && (
          <div className="dnd-overlay" onClick={() => setShowDND(false)}>
            <div className="dnd-sheet" onClick={e => e.stopPropagation()}>
              <div className="sheet-handle" />
              <div className="sheet-title">Take a real break</div>
              <div className="sheet-desc">
                How long do you need? Stillwater will hold everything, surface only genuine emergencies, and give you back this time.
              </div>
              <div className="duration-grid">
                {[
                  { number: "30", unit: "minutes" },
                  { number: "1", unit: "hour" },
                  { number: "2", unit: "hours" },
                  { number: "Until\n8 AM", unit: "tomorrow" },
                ].map((d, i) => (
                  <div
                    key={i}
                    className={`duration-btn ${selectedDuration === i ? "selected" : ""}`}
                    onClick={() => setSelectedDuration(i)}
                  >
                    <div className="duration-number" style={{ whiteSpace: "pre-line", fontSize: i === 3 ? 18 : 28 }}>{d.number}</div>
                    <div className="duration-unit">{d.unit}</div>
                  </div>
                ))}
              </div>
              <button className="start-btn" onClick={() => { setShowDND(false); setProtectOn(true); }}>
                Begin quiet time
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
