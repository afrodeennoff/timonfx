
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MOTION_RULES, GLASS_STYLES, VARIANTS } from '../constants';

const GridBackground = () => (
  <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:150px_150px] md:bg-[size:200px_200px]" />
  </div>
);

const MarketTicker: React.FC<{ symbol: string; price: string; change: string; isUp: boolean }> = ({ symbol, price, change, isUp }) => (
  <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-1.5 border-r border-white/10 shrink-0">
    <span className="mono text-[9px] md:text-[11px] font-black text-white tracking-widest">{symbol}</span>
    <span className="mono text-[9px] md:text-[11px] text-zinc-300 tracking-wider tabular-nums">{price}</span>
    <span className={`mono text-[8px] md:text-[10px] font-bold ${isUp ? 'text-green-500' : 'text-brand-red'}`}>{change}</span>
  </div>
);

const OrderButton: React.FC<{ type: 'BUY' | 'SELL'; onClick: () => void }> = ({ type, onClick }) => (
  <motion.button
    whileHover={{ 
        backgroundColor: type === 'BUY' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 30, 30, 0.12)', 
        borderColor: type === 'BUY' ? 'rgba(34, 197, 94, 0.35)' : 'rgba(255, 30, 30, 0.35)',
        y: -1
    }}
    whileTap={{ y: 0.5, opacity: 0.85 }}
    onClick={onClick}
    className={`flex-1 py-3 md:py-3.5 flex flex-col items-center justify-center border backdrop-blur-md transition-all duration-400 rounded-[1.25rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] whitespace-nowrap group/btn relative overflow-hidden ${
      type === 'BUY' 
        ? 'border-green-500/20 bg-green-500/5' 
        : 'border-red-500/20 bg-red-500/5'
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none" />
    <span className={`mono text-[9px] md:text-[11px] font-black tracking-[0.2em] mb-0.5 relative z-10 ${type === 'BUY' ? 'text-green-500' : 'text-brand-red'}`}>
      {type} MKT
    </span>
    <span className="mono text-[6px] md:text-[8px] text-zinc-500 uppercase tracking-widest font-bold relative z-10">EXECUTE</span>
  </motion.button>
);

export const ExecutionTerminal: React.FC = () => {
  const [qty, setQty] = useState(1);
  const [stopLoss, setStopLoss] = useState(5);
  const [takeProfit, setTakeProfit] = useState(10);
  const [pnl, setPnl] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPnl(prev => prev + (Math.random() - 0.5) * 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={VARIANTS.reveal}
      className={`h-full flex flex-col relative overflow-hidden group/main ${GLASS_STYLES.card} shadow-2xl w-full max-w-[100vw]`}
    >
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaa1_1px,transparent_1px),linear-gradient(to_bottom,#aaa1_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      <div className="absolute inset-[1px] rounded-[2.5rem] pointer-events-none opacity-0 group-hover/main:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 rounded-[2.5rem] border border-brand-purple/20 blur-[2px] opacity-70" />
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 opacity-50" />
      </div>

      {/* Header Bar */}
      <div className="h-10 md:h-12 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-xl px-2 relative z-10 w-full overflow-hidden">
        <div className="flex items-center overflow-x-auto scrollbar-hide min-w-0 flex-1">
          <MarketTicker symbol="ES" price="4450.25" change="+12.50" isUp={true} />
          <div className="hidden sm:flex">
             <MarketTicker symbol="NQ" price="15240" change="-45.0" isUp={false} />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 px-3 md:px-4 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 shadow-[0_0_6px_rgba(34,197,94,0.3)]" />
            <span className="mono text-[9px] text-zinc-600 uppercase tracking-widest font-black">STABLE_LATENCY</span>
          </div>
          <span className="mono text-[10px] md:text-[12px] text-white font-black tracking-widest tabular-nums">$50,420.00</span>
        </div>
      </div>

      {/* Main Terminal View */}
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden z-10">
        <div className="flex-1 relative bg-brand-black/40 overflow-hidden min-h-[250px] md:min-h-0">
          <GridBackground />
          <div className="absolute top-3 left-3 md:top-5 md:left-5 z-10 flex gap-1.5 md:gap-2">
             {['1M', '5M', '15M'].map((tf) => (
               <button key={tf} className={`px-2.5 py-1.5 md:px-3 md:py-2 mono text-[8px] text-zinc-400 hover:text-white uppercase font-black bg-white/5 rounded-lg border border-white/10 backdrop-blur-md transition-all duration-300 whitespace-nowrap`}>
                 {tf}
               </button>
             ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-3 md:p-4">
            <svg viewBox="0 0 800 400" className="w-full h-full text-zinc-800/20 overflow-visible preserve-3d">
               <line x1="0" y1="100" x2="800" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
               <line x1="0" y1="200" x2="800" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
               <line x1="0" y1="300" x2="800" y2="300" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
               
               <motion.path 
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 1 }}
                 transition={{ duration: 1.5, ease: MOTION_RULES.ease }}
                 d="M0,350 L50,340 L80,360 L120,300 L150,310 L200,250 L240,280 L300,200 L350,220 L400,150 L450,180 L500,120 L550,140 L600,80 L650,100 L700,50 L750,70 L800,40"
                 fill="none"
                 stroke="#8b5cf6"
                 strokeWidth="2"
                 className="drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]"
               />
               
               <line x1="0" y1="40" x2="800" y2="40" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 2" className="opacity-40" />
               <rect x="740" y="30" width="60" height="20" fill="#8b5cf6" rx="4" className="opacity-80" />
               <text x="750" y="44" className="mono text-[10px] fill-black font-black tracking-wider">4450.25</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="border-t border-white/15 bg-[#080808] relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="p-3 md:p-4 space-y-2.5 md:space-y-2">
             <div className="flex gap-2.5 md:gap-2">
               <OrderButton type="BUY" onClick={() => {}} />
               <OrderButton type="SELL" onClick={() => {}} />
             </div>
             <div className="flex gap-2.5 md:gap-2">
                <motion.button 
                  whileHover={VARIANTS.buttonHover}
                  whileTap={VARIANTS.buttonTap}
                  className={`flex-1 py-3 md:py-2.5 mono text-[8px] uppercase font-black text-zinc-500 ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} border-white/10 shadow-none whitespace-nowrap group/btn overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none" />
                  <span className="relative z-10">Flatten</span>
                </motion.button>
                <motion.button 
                  whileHover={VARIANTS.buttonHover}
                  whileTap={VARIANTS.buttonTap}
                  className={`flex-1 py-3 md:py-2.5 mono text-[8px] uppercase font-black text-zinc-500 ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} border-white/10 shadow-none whitespace-nowrap group/btn overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none" />
                  <span className="relative z-10">Cancel</span>
                </motion.button>
             </div>
          </div>

          <div className="p-3 md:p-4 space-y-3.5 md:space-y-2 flex flex-col justify-center">
             <div className="flex justify-between items-center">
               <span className="mono text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-widest font-black">QTY</span>
               <div className="flex items-center gap-3 md:gap-4">
                 <button onClick={() => setQty(Math.max(1, qty - 1))} className={`w-9 h-9 md:w-8 md:h-8 flex items-center justify-center rounded-full ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} p-0 mono text-xs shadow-none whitespace-nowrap group/btn overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" />
                    <span className="relative z-10">-</span>
                 </button>
                 <span className="mono text-sm md:text-sm text-white font-black w-6 md:w-4 text-center">{qty}</span>
                 <button onClick={() => setQty(qty + 1)} className={`w-9 h-9 md:w-8 md:h-8 flex items-center justify-center rounded-full ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} p-0 mono text-xs shadow-none whitespace-nowrap group/btn overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" />
                    <span className="relative z-10">+</span>
                 </button>
               </div>
             </div>
             <div className="flex justify-between items-center">
               <span className="mono text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-widest font-black">STOP / PT</span>
               <div className="flex items-center gap-3 md:gap-4">
                 <span className="mono text-[9px] md:text-[10px] text-brand-red font-black">-{stopLoss}</span>
                 <span className="mono text-[9px] md:text-[10px] text-green-500 font-black">+{takeProfit}</span>
               </div>
             </div>
          </div>

          <div className="p-3 md:p-4 flex flex-row md:flex-col justify-between items-center md:items-start bg-white/[0.02]">
             <div className="space-y-0.5 md:space-y-1">
               <span className="mono text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-widest font-black block">P&L</span>
               <div className={`mono text-xl md:text-2xl font-black tracking-tight tabular-nums ${pnl >= 0 ? 'text-green-500' : 'text-brand-red'}`}>
                  {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}
               </div>
             </div>
             <div className="w-24 sm:w-28 md:w-full space-y-1.5 md:mt-3">
               <div className="flex justify-between text-[7px] md:text-[8px] mono uppercase text-zinc-600 font-black">
                 <span>Risk</span>
                 <span>12%</span>
               </div>
               <div className="h-1.5 md:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full w-[12%] bg-brand-purple opacity-70" />
               </div>
             </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};