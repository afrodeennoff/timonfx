
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VARIANTS, ANIM_SYSTEM, GLASS_STYLES } from '../constants';

const GridBackground = () => (
  <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:200px_200px]" />
  </div>
);

const MarketTicker: React.FC<{ symbol: string; price: string; change: string; isUp: boolean }> = ({ symbol, price, change, isUp }) => (
  <div className="flex items-center gap-4 px-4 py-2 border-r border-white/10">
    <span className="mono text-[11px] font-black text-white tracking-widest">{symbol}</span>
    <span className="mono text-[11px] text-zinc-300 tracking-wider">{price}</span>
    <span className={`mono text-[10px] font-bold ${isUp ? 'text-green-500' : 'text-brand-red'}`}>{change}</span>
  </div>
);

const OrderButton: React.FC<{ type: 'BUY' | 'SELL'; onClick: () => void }> = ({ type, onClick }) => (
  <motion.button
    whileHover={{ backgroundColor: type === 'BUY' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 30, 30, 0.12)', borderColor: type === 'BUY' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 30, 30, 0.3)' }}
    whileTap={{ opacity: 0.9 }}
    onClick={onClick}
    className={`flex-1 py-4 flex flex-col items-center justify-center border backdrop-blur-md transition-all duration-300 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ${
      type === 'BUY' 
        ? 'border-green-500/20 bg-green-500/5' 
        : 'border-red-500/20 bg-red-500/5'
    }`}
  >
    <span className={`mono text-[10px] font-black tracking-[0.2em] mb-1 ${type === 'BUY' ? 'text-green-500' : 'text-brand-red'}`}>
      {type} MKT
    </span>
    <span className="mono text-[9px] text-zinc-500 uppercase tracking-widest">Immediate</span>
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
    <div className={`h-full flex flex-col relative overflow-hidden group rounded-[2rem] ${GLASS_STYLES.card}`}>
      {/* Header Bar */}
      <div className="h-12 border-b border-white/10 flex items-center justify-between bg-black/20 px-2">
        <div className="flex items-center">
          <MarketTicker symbol="ES_FUT" price="4450.25" change="+12.50" isUp={true} />
          <div className="hidden md:flex">
             <MarketTicker symbol="NQ_FUT" price="15240.00" change="-45.00" isUp={false} />
          </div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 shadow-[0_0_6px_rgba(34,197,94,0.3)]" />
            <span className="mono text-[9px] text-zinc-500 uppercase tracking-widest font-black">CONNECTED_MS_12</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="mono text-[10px] text-white font-black tracking-widest">BAL: $50,420.00</span>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex relative">
        <div className="flex-1 relative border-r border-white/10 bg-[#050505]">
          <GridBackground />
          <div className="absolute top-4 left-4 z-10 flex gap-2">
             {['1M', '5M', '15M', '1H', '4H'].map((tf) => (
               <button key={tf} className={GLASS_STYLES.button + " " + GLASS_STYLES.buttonHover + " px-3 py-1.5 mono text-[9px] text-zinc-400 hover:text-white uppercase font-bold"}>
                 {tf}
               </button>
             ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-8">
            <svg viewBox="0 0 800 400" className="w-full h-full text-zinc-800 overflow-visible">
               <line x1="0" y1="100" x2="800" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
               <line x1="0" y1="200" x2="800" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
               <line x1="0" y1="300" x2="800" y2="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
               
               <motion.path 
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 1 }}
                 transition={{ duration: 1.5, ease: ANIM_SYSTEM.ease }}
                 d="M0,350 L50,340 L80,360 L120,300 L150,310 L200,250 L240,280 L300,200 L350,220 L400,150 L450,180 L500,120 L550,140 L600,80 L650,100 L700,50 L750,70 L800,40"
                 fill="none"
                 stroke="#8b5cf6"
                 strokeWidth="1"
                 className="drop-shadow-[0_0_8px_rgba(139,92,246,0.15)] opacity-60"
               />
               
               <rect x="600" y="30" width="200" height="60" fill="rgba(255, 30, 30, 0.03)" stroke="rgba(255, 30, 30, 0.15)" strokeDasharray="2 2" />
               <text x="610" y="50" className="mono text-[9px] fill-red-500/40 uppercase font-black tracking-widest">Supply Zone [H4]</text>

               <line x1="0" y1="40" x2="800" y2="40" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-40" />
               <rect x="740" y="30" width="60" height="20" fill="#8b5cf6" rx="4" className="rounded-sm opacity-80" />
               <text x="750" y="43" className="mono text-[10px] fill-black font-bold tracking-wider">4450.25</text>
            </svg>
          </div>
        </div>

        <div className="hidden lg:flex w-24 flex-col border-l border-white/5 bg-zinc-950/30">
           <div className="h-8 border-b border-white/5 flex items-center justify-center bg-white/5">
             <span className="mono text-[9px] text-zinc-500 uppercase tracking-widest">DOM</span>
           </div>
           <div className="flex-1 flex flex-col font-mono text-[10px]">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="flex-1 flex items-center justify-between px-2 hover:bg-white/5 cursor-crosshair group border-b border-white/[0.02]">
                   <span className="text-zinc-600 group-hover:text-white transition-colors">{4460 - i}</span>
                   {i === 10 && <span className="text-brand-purple font-black"><-</span>}
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="h-auto border-t border-white/15 bg-zinc-950">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="col-span-1 md:col-span-2 p-6 space-y-6">
             <div className="flex gap-4">
               <OrderButton type="BUY" onClick={() => {}} />
               <OrderButton type="SELL" onClick={() => {}} />
             </div>
             <div className="flex gap-4">
                <button className={GLASS_STYLES.button + " " + GLASS_STYLES.buttonHover + " flex-1 py-3 mono text-[10px] uppercase text-zinc-400"}>Flatten All</button>
                <button className={GLASS_STYLES.button + " " + GLASS_STYLES.buttonHover + " flex-1 py-3 mono text-[10px] uppercase text-zinc-400"}>Cancel All</button>
             </div>
          </div>

          <div className="p-6 space-y-4 flex flex-col justify-center">
             <div className="flex justify-between items-center">
               <span className="mono text-[9px] text-zinc-500 uppercase tracking-widest font-black">QTY (Lots)</span>
               <div className="flex items-center gap-2">
                 <button onClick={() => setQty(Math.max(1, qty - 1))} className={GLASS_STYLES.button + " " + GLASS_STYLES.buttonHover + " w-8 h-8 flex items-center justify-center rounded-full"}>-</button>
                 <span className="mono text-sm text-white font-black w-8 text-center">{qty}</span>
                 <button onClick={() => setQty(qty + 1)} className={GLASS_STYLES.button + " " + GLASS_STYLES.buttonHover + " w-8 h-8 flex items-center justify-center rounded-full"}>+</button>
               </div>
             </div>
             <div className="flex justify-between items-center">
               <span className="mono text-[9px] text-zinc-500 uppercase tracking-widest font-black">Stop Loss</span>
               <div className="flex items-center gap-1">
                 <span className="mono text-xs text-white font-bold">{stopLoss}</span>
                 <span className="mono text-[9px] text-zinc-600">pts</span>
               </div>
             </div>
             <div className="flex justify-between items-center">
               <span className="mono text-[9px] text-zinc-500 uppercase tracking-widest font-black">Take Profit</span>
               <div className="flex items-center gap-1">
                 <span className="mono text-xs text-white font-bold">{takeProfit}</span>
                 <span className="mono text-[9px] text-zinc-600">pts</span>
               </div>
             </div>
          </div>

          <div className="p-6 flex flex-col justify-between bg-white/[0.02]">
             <div className="space-y-1">
               <span className="mono text-[9px] text-zinc-500 uppercase tracking-widest font-black">Open P&L</span>
               <div className={`mono text-xl font-black tracking-tight ${pnl >= 0 ? 'text-green-500' : 'text-brand-red'}`}>
                  {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}
               </div>
             </div>
             <div className="space-y-2 mt-4">
               <div className="flex justify-between text-[9px] mono uppercase text-zinc-500 font-bold">
                 <span>Daily Risk</span>
                 <span>12% Used</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full w-[12%] bg-brand-purple opacity-60 shadow-[0_0_8px_rgba(139,92,246,0.3)]" />
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
