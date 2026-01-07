
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROP_FIRMS, VARIANTS, ANIM_CONSTANTS } from '../constants';

const CouponCode: React.FC<{ code: string }> = React.memo(({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <motion.button
      onClick={handleCopy}
      whileFocus={VARIANTS.buttonFocus}
      aria-label={`Copy coupon code ${code}`}
      className={`group relative px-6 py-3 border mono text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center min-w-[110px] cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple ${
        copied 
          ? 'bg-green-500 border-green-500 text-white' 
          : 'bg-zinc-950 border-white/10 text-zinc-400 hover:border-brand-purple hover:text-white'
      }`}
    >
      <span className="relative z-10">{copied ? 'COPIED' : code}</span>
    </motion.button>
  );
});

export const PropFirmExplorer: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'FUTURES' | 'CFD'>('ALL');

  const filteredFirms = filter === 'ALL' ? PROP_FIRMS : PROP_FIRMS.filter(f => f.type === filter);

  return (
    <section id="coupons" className="py-24 px-6 bg-brand-black border-y border-white/10 relative overflow-hidden transform-gpu">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_CONSTANTS.viewport}
          variants={VARIANTS.staggerContainer}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
        >
           <motion.div variants={VARIANTS.fadeInUp} className="space-y-4">
              <span className="mono text-[10px] text-brand-purple font-black tracking-[0.5em] uppercase">Funding // Partners</span>
              <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Funding Options</h2>
           </motion.div>
           <motion.div variants={VARIANTS.scaleIn} className="flex gap-1 p-1 bg-zinc-900 border border-white/10 rounded-sm">
              {(['ALL', 'FUTURES', 'CFD'] as const).map(f => (
                <motion.button
                  key={f}
                  onClick={() => setFilter(f)}
                  whileFocus={{ backgroundColor: "rgba(139, 92, 246, 0.4)" }}
                  className={`px-6 py-3 mono text-[10px] uppercase tracking-widest transition-all duration-300 font-black focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded-sm ${
                    filter === f ? 'bg-brand-purple text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {f}
                </motion.button>
              ))}
           </motion.div>
        </motion.div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 mono text-[10px] text-zinc-500 uppercase font-black">Firm</th>
                <th className="py-6 mono text-[10px] text-zinc-500 uppercase font-black">Capital</th>
                <th className="py-6 mono text-[10px] text-zinc-500 uppercase font-black">Code</th>
                <th className="py-6 mono text-[10px] text-zinc-500 uppercase font-black">Discount</th>
                <th className="py-6 mono text-[10px] text-zinc-500 uppercase font-black text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredFirms.map((firm) => (
                  <motion.tr 
                    key={firm.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="group border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <td className="py-8">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-white uppercase italic">{firm.name}</span>
                        <span className="mono text-[9px] text-zinc-500 tracking-[0.2em]">{firm.type}</span>
                      </div>
                    </td>
                    <td className="py-8"><span className="mono text-[11px] text-white font-black">{firm.maxAllocation}</span></td>
                    <td className="py-8"><CouponCode code={firm.couponCode} /></td>
                    <td className="py-8">
                      <span className="px-3 py-1 bg-brand-purple/10 border border-brand-purple/20 text-[9px] mono text-brand-purple font-black">
                        {firm.discount}
                      </span>
                    </td>
                    <td className="py-8 text-right">
                      <motion.a 
                        href={firm.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        whileFocus={{ x: 5, color: "#8b5cf6" }}
                        className="mono text-[10px] font-black uppercase tracking-widest text-white hover:text-brand-purple transition-colors focus:outline-none focus:border-b focus:border-brand-purple pb-1"
                      >
                        Visit →
                      </motion.a>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
