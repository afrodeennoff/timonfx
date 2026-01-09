
import React from 'react';
import { ModuleCard, Testimonial, PropFirm } from './types';

export const BRAND_NAME = "TIMON";

/**
 * GLOBAL MOTION STANDARD (Source of Truth: Pricing Section)
 * Applied site-wide for all entry and interaction logic.
 */
export const MOTION_RULES = {
  ease: [0.22, 1, 0.36, 1] as any,
  easeString: "cubic-bezier(0.22, 1, 0.36, 1)",
  microDuration: 0.2,
  hoverDuration: 0.4,
  revealDuration: 0.6,
  stagger: 0.08,
  viewport: { once: true, margin: "-10%" }
};

/**
 * GLOBAL VISUAL STYLE (Source of Truth: Prop Firm Section)
 * Applied site-wide to every card, panel, and surfaced block.
 */
export const GLASS_STYLES = {
  // Semi-solid dark background with defined 15% opacity border
  card: "bg-[#080808] border border-white/15 shadow-2xl rounded-[2.5rem] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
  cardHover: "hover:border-white/25 hover:bg-[#0a0a0a]",
  // Interactive element standards
  button: "px-6 py-3 bg-white/[0.03] text-white border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full inline-flex items-center justify-center whitespace-nowrap",
  buttonHover: "hover:bg-brand-purple/10 hover:border-brand-purple/40",
  accentButton: "px-6 py-3 bg-brand-purple text-white shadow-[0_15px_35px_-10px_rgba(139,92,246,0.5)] rounded-full transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] inline-flex items-center justify-center whitespace-nowrap",
  accentButtonHover: "hover:brightness-110"
};

/**
 * DEPTH PRESETS (Source: Pricing)
 */
export const DEPTH_PRESETS = {
  perspective: 1600,
  maxRotation: 0.5,
  zDepth: 12,
  scale: 1.005,
  spring: { stiffness: 150, damping: 25, mass: 1.2 }
};

const checkKillSwitch = () => {
  if (typeof window === 'undefined') return true;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const prefers_reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return isTouch || prefers_reduced;
};

export const MOTION_KILL_SWITCH = checkKillSwitch();

export const VARIANTS = {
  // Law: Opacity + Transform (15px rise)
  reveal: {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: MOTION_RULES.revealDuration, ease: MOTION_RULES.ease }
    }
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: MOTION_RULES.stagger,
        delayChildren: 0.05
      }
    }
  },
  // Standard card hover motion (lift amount: -8px)
  cardHover: {
    y: -8,
    scale: 1.005,
    transition: { duration: MOTION_RULES.hoverDuration, ease: MOTION_RULES.ease }
  },
  buttonHover: {
    scale: 1.01,
    y: -1,
    transition: { duration: 0.3, ease: MOTION_RULES.ease }
  },
  buttonTap: { opacity: 0.9, scale: 0.98, y: 0 },
  buttonFocus: { outline: "none" },
  inputFocus: { borderColor: "rgba(139,92,246,0.2)", transition: { duration: 0.2 } }
};

export const PROP_FIRMS: PropFirm[] = [
  {
    id: "fp",
    name: "FundingPips",
    marketType: "CFD",
    accountSize: "$5K – $200K",
    profitSplit: "Up to 90%",
    payoutCap: "Plan based",
    maxAllocation: "Scaling available",
    coupon: "TIMON",
    url: "https://fundingpips.com"
  },
  {
    id: "ft",
    name: "FundingTicks",
    marketType: "FUTURES",
    accountSize: "$25K – $150K",
    profitSplit: "Up to 90%",
    payoutCap: "Rule based",
    maxAllocation: "Multi-account allowed",
    coupon: "TIMON",
    url: "https://fundingticks.com"
  },
  {
    id: "apex",
    name: "Apex Trader Funding",
    marketType: "FUTURES",
    accountSize: "$25K – $300K",
    profitSplit: "100% up to $25K, then 90%",
    payoutCap: "Account based",
    maxAllocation: "Multiple accounts allowed",
    coupon: "TIMON",
    url: "https://apextraderfunding.com"
  },
  {
    id: "5ers",
    name: "The5ers",
    marketType: "CFD",
    accountSize: "$5K – $200K",
    profitSplit: "Up to 100%",
    payoutCap: "None stated",
    maxAllocation: "Scales over time",
    coupon: "TIMON",
    url: "https://the5ers.com"
  },
  {
    id: "fn",
    name: "FundedNext",
    marketType: "CFD",
    accountSize: "$6K – $300K",
    profitSplit: "Up to 95%",
    payoutCap: "Plan dependent",
    maxAllocation: "Scaling available",
    coupon: "TIMON",
    url: "https://fundednext.com"
  },
  {
    id: "ti",
    name: "Tradeify",
    marketType: "CFD",
    accountSize: "$10K – $200K",
    profitSplit: "Up to 90%",
    payoutCap: "Plan based",
    maxAllocation: "Varies",
    coupon: "TIMON",
    url: "https://tradeify.com"
  },
  {
    id: "bg",
    name: "Blue Guardian",
    marketType: "CFD",
    accountSize: "$10K – $200K",
    profitSplit: "Up to 90%",
    payoutCap: "Rule dependent",
    maxAllocation: "Scaling available",
    coupon: "TIMON",
    url: "https://blueguardian.com"
  },
  {
    id: "lt",
    name: "Lucid Trading",
    marketType: "FUTURES",
    accountSize: "$50K – $250K",
    profitSplit: "Up to 90%",
    payoutCap: "Rule based",
    maxAllocation: "Limited by plan",
    coupon: "TIMON",
    url: "https://lucidtrading.com"
  }
];

export const MODULES: ModuleCard[] = [
  {
    id: "m1",
    title: "MARKET // OUTLOOK",
    objective: "Analysis focused on structure, liquidity, and key zones to prepare before the week begins.",
    checklist: ["Structural Mapping", "Liquidity Node Identification", "Zone Validation"],
    mistakes: ["Reactive Bias", "Over-leveraging Opening Volatility"]
  },
  {
    id: "m2",
    title: "WEEKEND // REVIEW",
    objective: "Dedicated sessions to review trade logs, clarify concepts, and reinforce execution discipline.",
    checklist: ["Trade Log De-brief", "Technical Recalibration", "Process Refinement"],
    mistakes: ["Repeating Execution Errors", "Ignoring Journal Data"]
  },
  {
    id: "m6",
    title: "FUNDED // PATHWAY",
    objective: "Structured guidance to prepare for evaluations and manage funded accounts with consistency.",
    checklist: ["Evaluation Roadmap", "Drawdown Management", "Payout Consistency Plan"],
    mistakes: ["Aggressive Rule Breaking", "Evaluation Tilt"]
  },
  {
    id: "m3",
    title: "1:1 // MENTORSHIP",
    objective: "Direct, execution-focused feedback to identify weaknesses, correct errors, and stabilize performance.",
    checklist: ["Individual Performance Audit", "Specific Weakness Identification", "Custom Risk Adjustment"],
    mistakes: ["Blind Spot Negligence", "Inconsistent Risk Rules"]
  },
  {
    id: "m4",
    title: "TRADER // COMMUNITY",
    objective: "A focused environment to share ideas, review setups, and maintain accountability.",
    checklist: ["Setup Validation", "Peer Review", "High-Signal Intel Share"],
    mistakes: ["Echo Chamber Trading", "External Noise Contamination"]
  },
  {
    id: "m5",
    title: "LIFETIME // ACCESS",
    objective: "One-time entry to all current and future content, execution tools, and updates.",
    checklist: ["Perpetual Resource Library", "Future Strategy Updates", "Permanent Desk Access"],
    mistakes: ["Methodology Drift", "Static Analysis"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { 
    id: "t1", 
    quote: "The clarity at 09:27 is real. No more guessing the open window.", 
    context: "Futures Trader" 
  },
  { 
    id: "t2", 
    quote: "My evaluation pass rate doubled after adopting the structural logic here.", 
    context: "Funded Associate" 
  },
  { 
    id: "t3", 
    quote: "Practical, no-nonsense approach. It's built for those who treat this as a career.", 
    context: "Prop Trader" 
  },
  { 
    id: "t4", 
    quote: "Liquidity node identification is the edge I was missing for three years.", 
    context: "Senior Analyst" 
  }
];

export const FAQ_DATA = [
  { q: "Is this program beginner-friendly?", a: "No — You need at least 1–2 years of experience in ICT Trading." },
  { q: "Can I trade any market?", a: "The core method is built around NQ futures, but concepts apply to all markets." },
  { q: "How long will it take to become consistent?", a: "Depends on discipline, but most traders improve in 4–8 weeks." },
  { q: "Do you guarantee profits?", a: "No — trading involves risk. We teach a method that improves your edge and discipline." },
  { q: "Is there a refund?", a: "No refunds after course access is given." }
];

export const PRICING_DIFFERENTIATORS = [
  { id: 'pd1', label: 'STRATEGY_FOCUS', description: 'Refining methods for peak market performance.' },
  { id: 'pd2', label: 'REAL-TIME_EXECUTION', description: 'Surgical entries and exits under direct mentorship.' },
  { id: 'pd3', label: 'CAPITAL_PRESERVATION', description: 'Building unbreakable risk management habits.' },
];

export const SOCIAL_LINKS = [
  {
    name: 'X',
    href: 'https://x.com/timon_ict?s=21',
    icon: (
      <svg fill="currentColor" viewBox="0 0 16 16">
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@timontrades?si=G0skb3MDzyNA-0md',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/FPrEk8fhwp',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.369-.443.739-.668 1.11a18.18 18.18 0 00-5.32 0c-.225-.371-.458-.74-.668-1.11a.074.074 0 00-.079-.037A19.736 19.736 0 003.683 4.37a.074.074 0 00-.037.079C3.725 6.014 3.94 7.622 4.27 9.14a.074.074 0 00.037.079c1.74.887 3.497 1.45 5.286 1.748a.074.074 0 00.079-.037c.188-.24.36-.502.515-.765a.074.074 0 00-.037-.116c-.465-.2-.915-.41-1.348-.649a.074.074 0 01-.022-.093c.172-.27.33-.552.47-.834a.074.074 0 01.079-.022c3.483 1.054 7.02 1.054 10.486 0a.074.074 0 01.079.022c.14.282.298.564.47.834a.074.074 0 01-.022.093c-.433.239-.883.449-1.348.649a.074.074 0 00-.037.116c.155.263.327.525.515.765a.074.074 0 00.079.037c1.79-.2" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/timon.fx?igsh=MWRwbjYxZXpqcWNvOQ%3D%3D&utm_source=qr',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];
