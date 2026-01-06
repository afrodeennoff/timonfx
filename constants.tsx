
import { ModuleCard, Testimonial, PropFirm } from './types';

export const BRAND_NAME = "ORK";

export const ANIM_CONSTANTS = {
  ease: [0.19, 1, 0.22, 1] as [number, number, number, number], 
  duration: 0.6,
  stagger: 0.04,
  viewport: { once: true, amount: 0.15 }
};

export const VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: ANIM_CONSTANTS.ease }
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05
      }
    }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.99 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: ANIM_CONSTANTS.ease }
  },
  rowReveal: {
    initial: { opacity: 0, x: -4 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
  }
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

// Locked Education Section
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
    id: "m3",
    title: "1:1 // MENTORSHIP",
    objective: "Direct, execution-focused feedback to identify weaknesses, correct errors, and stabilize performance.",
    checklist: ["Individual Performance Audit", "Specific Weakness Identification", "Custom Risk Adjustment"],
    mistakes: ["Blind Spot Negligence", "Inconsistent Risk Parameters"]
  },
  {
    id: "m4",
    title: "TRADER // COMMUNITY",
    objective: "A focused environment for professional traders to share ideas, review setups, and maintain accountability.",
    checklist: ["Setup Validation", "Peer Review", "High-Signal Intel Share"],
    mistakes: ["Echo Chamber Trading", "External Noise Contamination"]
  },
  {
    id: "m5",
    title: "LIFETIME // ACCESS",
    objective: "One-time access to all current and future educational content, execution tools, and updates.",
    checklist: ["Perpetual Resource Library", "Future Strategy Updates", "Permanent Desk Access"],
    mistakes: ["Methodology Drift", "Static Analysis"]
  },
  {
    id: "m6",
    title: "FUNDED // PATHWAY",
    objective: "Structured guidance to prepare for prop firm evaluations and manage funded accounts with consistency.",
    checklist: ["Evaluation Roadmap", "Drawdown Management", "Payout Consistency Plan"],
    mistakes: ["Aggressive Rule Breaking", "Evaluation Tilt"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", quote: "Execution is clear now. I wait for structure.", context: "PROP TRADER" },
  { id: "t2", quote: "Risk is controlled. Consistency is the result.", context: "SESSION TRADER" },
  { id: "t3", quote: "Entries are precise. No guessing at the open.", context: "FUTURES TRADER" },
  { id: "t4", quote: "The noise is gone. I only trade liquidity.", context: "SENIOR ANALYST" }
];

export const FAQ_DATA = [
  { q: "Is this for beginners?", a: "This is for traders who have some experience but want a more professional process." },
  { q: "What's the win rate?", a: "We focus on the quality of trades and risk management. Numbers follow discipline." },
  { q: "Does this work for Crypto?", a: "Price action is universal. If the market has liquidity and volume, the process applies." }
];
