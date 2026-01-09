import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROP_FIRMS, MOTION_RULES, GLASS_STYLES, VARIANTS } from '../constants';

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
      className={`flex justify-between items-center py-3 border-b border-white/5 last:border-0 ${isAccent ? 'cursor-pointer group/stat' : ''}`}
      onClick={handleCopy}
    >
      <span className="mono text-[10px] text-zinc-500 uppercase tracking-widest">• {label}</span>
      <div className="relative flex items-center">
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute right-0 mono text-[8px] text-brand-purple font-black uppercase tracking-widest bg-brand-black px-2 py-0.5 rounded border border-brand-purple/30 z-20"
            >
              COPIED
            </motion.span>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-2">
          <span className={`mono text-[11px] font-bold uppercase tracking-tight text-right pl-4 transition-colors duration-300 ${isAccent ? 'text-brand-purple group-hover/stat:text-white' : 'text-zinc-200'} ${copied ? 'opacity-0' : 'opacity-100'}`}>
            {value}
          </span>
          {isAccent && !copied && (
            <svg 
              className="w-3 h-3 text-brand-purple opacity-0 group-hover/stat:opacity-100 transition-opacity" 
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
  return (
    <section 
      id="coupon" 
      className="py-10 md:py-14 px-6 bg-brand-black relative overflow-hidden transform-gpu scroll-mt-24 md:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={MOTION_RULES.viewport}
          variants={VARIANTS.staggerContainer}
          className="mb-20 space-y-4"
        >
          <motion.div variants={VARIANTS.reveal} className="flex items-center gap-4">
            <div className="h-px w-12 bg-brand-purple" />
            <span className="mono text-[11px] text-brand-purple font-black tracking-[0.5em] uppercase italic">Market Gateways</span>
          </motion.div>
          <motion.h2 variants={VARIANTS.reveal} className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
            Vetted Partners.
          </motion.h2>
          <motion.p variants={VARIANTS.reveal} className="mono text-[12px] text-zinc-500 uppercase tracking-[0.3em] font-bold max-w-lg leading-relaxed border-l border-white/5 pl-6">
            A transparent selection of funding providers for those ready to execute at size. Click codes to copy.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROP_FIRMS.map((firm, idx) => (
            <motion.div
              key={firm.id}
              initial="initial"
              whileInView="animate"
              viewport={MOTION_RULES.viewport}
              variants={VARIANTS.reveal}
              whileHover={VARIANTS.cardHover}
              transition={{ delay: idx * 0.05 }}
              className={`${GLASS_STYLES.card} ${GLASS_STYLES.cardHover} p-10 flex flex-col justify-between group transition-colors duration-500`}
            >
              <div className="mb-12">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-brand-purple transition-colors duration-500">
                  {firm.name}
                </h3>
              </div>

              <div className="space-y-1 mb-12">
                <StatLine label="Market" value={firm.marketType} />
                <StatLine label="Account Size" value={firm.accountSize} />
                <StatLine label="Profit Split" value={firm.profitSplit} />
                <StatLine label="Payout Cap" value={firm.payoutCap} />
                <StatLine label="Max Allocation" value={firm.maxAllocation} />
                {firm.coupon && <StatLine label="Coupon Code" value={firm.coupon} isAccent={true} />}
              </div>

              <motion.a
                href={firm.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={VARIANTS.buttonHover}
                whileTap={VARIANTS.buttonTap}
                className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-brand-purple/10 hover:border-brand-purple/30 group-hover:shadow-[0_12px_24px_-12px_rgba(139,92,246,0.3)]"
              >
                <span className="mono text-[10px] font-black uppercase tracking-[0.4em]">ENTER DESK</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};