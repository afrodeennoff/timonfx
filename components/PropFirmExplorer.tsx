import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROP_FIRMS, MOTION_RULES, GLASS_STYLES, VARIANTS } from '../constants';
import { GhostText } from './GhostText';

const StatLine: React.FC<{ label: string; value: string; isAccent?: boolean }> = ({ label, value, isAccent }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!isAccent) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div 
      className={`flex justify-between items-center py-2.5 md:py-3 border-b border-white/5 last:border-0 transition-all duration-300 ${isAccent ? 'cursor-pointer group/stat' : ''}`}
      onClick={handleCopy}
    >
      <span className="mono text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest transition-colors duration-300 group-hover/stat:text-zinc-400 truncate pr-2 shrink-0">• {label}</span>
      <div className="relative flex items-center min-w-0">
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: MOTION_RULES.ease }}
              className="absolute right-0 mono text-[8px] text-brand-purple font-black uppercase tracking-widest bg-brand-black px-2 py-0.5 rounded border border-brand-purple/30 z-20"
            >
              COPIED
            </motion.span>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
          <span className={`mono text-[10px] md:text-[11px] font-bold uppercase tracking-tight text-right transition-all duration-300 ${isAccent ? 'text-brand-purple group-hover/stat:text-white' : 'text-zinc-200'} ${copied ? 'opacity-0' : 'opacity-100'} truncate`}>
            {value}
          </span>
          {isAccent && !copied && (
            <svg 
              className="w-2.5 h-2.5 md:w-3 md:h-3 text-brand-purple opacity-20 group-hover/stat:opacity-100 group-hover/stat:translate-x-0.5 transition-all duration-300 shrink-0" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export const PropFirmExplorer: React.FC = () => {
  const [activeMarket, setActiveMarket] = useState<'CFD' | 'FUTURES'>('CFD');
  
  const filteredFirms = useMemo(() => 
    PROP_FIRMS.filter(f => f.marketType === activeMarket), 
    [activeMarket]
  );

  return (
    <section 
      id="coupon" 
      className="py-10 md:py-14 px-4 md:px-6 bg-brand-black relative overflow-hidden transform-gpu scroll-mt-24 md:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-10 md:mb-20">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={MOTION_RULES.viewport}
            variants={VARIANTS.reveal}
            className="space-y-4"
          >
            <motion.div variants={VARIANTS.reveal} className="flex items-center gap-4">
              <div className="h-px w-12 bg-brand-purple" />
              <span className="mono text-[11px] text-brand-purple font-black tracking-[0.5em] uppercase italic">Market Gateways</span>
            </motion.div>
            <motion.h2 variants={VARIANTS.reveal} className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
              THE PARTNERS BEHIND <br />
              <GhostText text="THE FUNDING." className="text-transparent transition-colors cursor-default stroke-text" />
            </motion.h2>
            <motion.p variants={VARIANTS.reveal} className="mono text-[10px] md:text-[12px] text-zinc-500 uppercase tracking-[0.3em] font-bold max-w-lg leading-relaxed border-l border-white/5 pl-4 md:pl-6">
              A transparent selection of funding providers for those ready to execute at size. Click codes to copy.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={MOTION_RULES.viewport}
            variants={VARIANTS.reveal}
            className="flex items-center"
          >
            <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/10 rounded-full w-full md:w-auto">
              <button 
                onClick={() => setActiveMarket('CFD')}
                className={`flex-1 md:flex-none px-6 md:px-8 py-2 md:py-2.5 rounded-full mono text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeMarket === 'CFD' ? 'bg-brand-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                CFD
              </button>
              <button 
                onClick={() => setActiveMarket('FUTURES')}
                className={`flex-1 md:flex-none px-6 md:px-8 py-2 md:py-2.5 rounded-full mono text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeMarket === 'FUTURES' ? 'bg-brand-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                FUTURES
              </button>
            </div>
          </motion.div>
        </div>

        <div className="min-h-[500px] md:min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeMarket}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: MOTION_RULES.ease }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {filteredFirms.map((firm) => (
                <PropFirmCard key={firm.id} firm={firm} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <style>{` .stroke-text { -webkit-text-stroke: 1.5px rgba(255,255,255,0