import { ModuleCard, Testimonial, PropFirm } from './types';

export const BRAND_NAME = "ORK";

/**
 * GLOBAL MOTION SYSTEM - Institutional Refinement
 */
export const ANIM_SYSTEM = {
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  hoverDuration: 0.16,  // Institutional standard: 160ms
  revealDuration: 0.32, // Transition standard: 320ms
  stagger: 0.08,
  viewport: { once: true, margin: "-10%" }
};

/**
 * UNIFIED GLASS SYSTEM - Refined glow & depth
 */
export const GLASS_STYLES = {
  card: "bg-zinc-950/40 backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-[2.5rem] transition-all duration-300",
  cardHover: "hover:border-white/20 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.1)]",
  button: "bg-white/5 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-300 rounded-full",
  buttonHover: "hover:bg-white/10 hover:border-white/25 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]",
  accentButton: "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.05)] rounded-full",
  accentButtonHover: "hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]"
};

export const GLOBAL_3D_PRESET = {
  perspective: 1200,
  maxRotation: 1.5,
  zDepth: 8,    
  scale: 1.0 
};

const checkKillSwitch = () => {
  if (typeof window === 'undefined') return true;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return isTouch || prefersReduced;
};

export const MOTION_KILL_SWITCH = checkKillSwitch();

export const VARIANTS = {
  reveal: {
    initial: { opacity: 0, y: 8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: ANIM_SYSTEM.revealDuration, ease: ANIM_SYSTEM.ease }
    }
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: ANIM_SYSTEM.stagger,
        delayChildren: 0.05
      }
    }
  },
  buttonHover: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderColor: "rgba(255, 255, 255, 0.25)",
    transition: { duration: ANIM_SYSTEM.hoverDuration, ease: ANIM_SYSTEM.ease }
  },
  cardHover: {
    borderColor: "rgba(255, 255, 255, 0.2)",
    transition: { duration: ANIM_SYSTEM.hoverDuration, ease: ANIM_SYSTEM.ease }
  },
  buttonTap: { opacity: 0.95 },
  buttonFocus: { outline: "none", boxShadow: "0 0 0 2px rgba(139,92,246,0.4)" },
  inputFocus: { borderColor: "rgba(139,92,246,0.4)", transition: { duration: ANIM_SYSTEM.hoverDuration } }
};

export const PROP_FIRMS: PropFirm[] = [
  {
    id: "f-topstep",
    rank: 1,
    name: "TOPSTEP",
    type: "FUTURES",
    platforms: ["Tradovate", "NinjaTrader"],
    drawdownType: "END-OF-DAY",
    maxLeverage: "1:100",
    profitTarget: "6%",
    maxDrawdown: "3%",
    maxAllocation: "$150,000",
    accountType: "COMBINE",
    payoutSpeed: "WEEKLY",
    payoutPolicy: "90/10 Split",
    yearsInOperation: "12 YEARS",
    assets: ["CME", "CBOT"],
    firmRules: ["Consistency Rule", "Daily Loss Limit"],
    startingPrice: "$49",
    couponCode: "TIMON",
    discount: "20% OFF",
    link: "https://topstep.com",
    isRecommended: true,
    description: "Primary futures funding provider. End-of-Day drawdown logic supports disciplined risk control."
  },
  {
    id: "f-apex",
    rank: 2,
    name: "APEX",
    type: "FUTURES",
    platforms: ["Rithmic", "Tradovate"],
    drawdownType: "TRAILING",
    maxLeverage: "1:20",
    profitTarget: "6%",
    maxDrawdown: "4%",
    maxAllocation: "$300,000",
    accountType: "EVALUATION",
    payoutSpeed: "BI-WEEKLY",
    payoutPolicy: "100% First 25k",
    yearsInOperation: "3 YEARS",
    assets: ["CME Futures"],
    firmRules: ["Trailing Threshold", "High Leverage"],
    startingPrice: "$167",
    couponCode: "TIMON80",
    discount: "80% OFF",
    link: "https://apextraderfunding.com",
    description: "Maximum capital access. Best suited for traders comfortable managing trailing drawdowns."
  },
  {
    id: "c-ftmo",
    rank: 3,
    name: "FTMO",
    type: "CFD",
    platforms: ["MT4", "MT5", "DXTrade"],
    drawdownType: "STAT",
    maxLeverage: "1:100",
    profitTarget: "10%",
    maxDrawdown: "10%",
    maxAllocation: "$200,000",
    accountType: "CHALLENGE",
    payoutSpeed: "BI-WEEKLY",
    payoutPolicy: "80/20 to 90/10",
    yearsInOperation: "9 YEARS",
    assets: ["Forex", "Indices", "Crypto"],
    firmRules: ["5% Daily Loss", "10% Max Loss"],
    startingPrice: "€155",
    couponCode: "TIMON-ORK",
    discount: "MAX ALPHA",
    link: "https://ftmo.com",
    isRecommended: true,
    description: "Reliable CFD liquidity. Established track record with professional trading standards."
  }
];

export const MODULES: ModuleCard[] = [
  {
    id: "m1",
    title: "MARKET // OUTLOOK",
    objective: "Analysis focused on structure, liquidity, and key execution zones to prepare traders before the week begins.",
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
    objective: "Structured guidance to prepare for prop firm evaluations and manage funded accounts with consistency.",
    checklist: ["Evaluation Roadmap", "Drawdown Management", "Payout Consistency Plan"],
    mistakes: ["Aggressive Rule Breaking", "Evaluation Tilt"]
  },
  {
    id: "m3",
    title: "1:1 // MENTORSHIP",
    objective: "Direct, execution-focused feedback to identify weaknesses, correct errors, and stabilize performance.",
    checklist: ["Individual Performance Audit", "Specific Weakness Identification", "Custom Risk Adjustment"],
    mistakes: ["Blind Spot Negligence", "Inconsistent Risk Parameters"]
  },
  {
    id: "m4",
    title: "TRADER // COMMUNITY",
    objective: "A focused environment for traders to share ideas, review setups, and maintain accountability.",
    checklist: ["Setup Validation", "Peer Review", "High-Signal Intel Share"],
    mistakes: ["Echo Chamber Trading", "External Noise Contamination"]
  },
  {
    id: "m5",
    title: "LIFETIME // ACCESS",
    objective: "One-time entry to all current and future trading content, execution tools, and updates.",
    checklist: ["Perpetual Resource Library", "Future Strategy Updates", "Permanent Desk Access"],
    mistakes: ["Methodology Drift", "Static Analysis"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", quote: "Execution is clear now. I wait for structure.", context: "TRADER" },
  { id: "t2", quote: "Risk is controlled. Consistency is the result.", context: "SESSION TRADER" },
  { id: "t3", quote: "Entries are precise. No guessing at the open.", context: "FUTURES TRADER" },
  { id: "t4", quote: "The noise is gone. I only trade liquidity.", context: "SENIOR ANALYST" }
];

export const FAQ_DATA = [
  { q: "Is this for beginners?", a: "This is for traders who have some experience but want a more professional method." },
  { q: "Does this work for Crypto?", a: "Price action is universal. If the market has liquidity and volume, the approach applies." },
  { q: "What's the win rate?", a: "We focus on the quality of trades and risk management. Numbers follow discipline." }
];