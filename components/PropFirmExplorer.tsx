
import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROP_FIRMS, VARIANTS, ANIM_CONSTANTS, THREE_D_PRESET } from '../constants';
import { PropFirm } from '../types';

const MetricBadge: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-1.5 p-4 bg-white/[0.01] border border-white/5 group/metric hover:bg-white/[0.03] transition-colors">
    <span className="mono text-[8px] text-zinc-600 uppercase tracking-widest font-black group-hover/metric:text-brand-purple transition-colors">
      {label}
    </span>
    <span className={`mono text-[12px] text-zinc-100 font-black uppercase tracking-wider`}>
      {value}
    </span>
  </div>
);

const ElevationCard: React.FC<{ firm: PropFirm; index: number }> = React.memo(({ firm, index }) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [THREE_D_PRESET.maxRotation, -THREE_D_PRESET.maxRotation]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-THREE_D_PRESET.maxRotation, THREE_D_PRESET.maxRotation]);

  const handleCopy = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(firm.couponCode).catch(() => console.error("Clipboard write failed"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [firm.couponCode]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, z: -THREE_D_PRESET.zDepth }}
      whileInView={{ opacity: 1, y: 0, z: 0 }}
      // Fix: Removed rotateX and rotateY from whileHover to fix MotionValue type error
      whileHover={{ 
        z: THREE_D_PRESET.zDepth, 
        transition: { duration: THREE_D_PRESET.hoverDuration, ease: ANIM_CONSTANTS.ease }
      }}
      viewport={{ once: true }}
      transition={{ 
        duration: THREE_D_PRESET.revealDuration, 
        ease: ANIM_CONSTANTS.ease, 
        delay: index * ANIM_CONSTANTS.stagger 
      }}
      // Fix: Moved rotateX and rotateY to style prop for correct MotionValue handling
      style={{ 
        transformStyle: 'preserve-3d', 
        perspective: THREE_D_PRESET.perspective,
        rotateX,
        rotateY
      }}
      className={`relative flex flex-col h-full border ${
        firm.isRecommended ? 'border-brand-purple/40 bg-zinc-900/30' : 'border-white/10 bg-zinc-900/10'
      } group/card rounded-sm overflow-hidden`}
    >
      <div className={`h-1 w-full ${firm.isRecommended ? 'bg-brand-purple' : 'bg-zinc-800'}`} />

      <div className="p-8 md:p-10 flex flex-col h-full relative" style={{ transform: 'translateZ(25px)' }}>
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="mono text-[10px] text-zinc-600 font-black tracking-widest">#DS_0{firm.rank}</span>
              <span className="mono text-[9px] text-brand-purple font-black tracking-[0.3em] uppercase">{firm.type}</span>
            </div>
            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
              {firm.name}
            </h3>
          </div>
          {firm.isRecommended && (
             <div className="bg-brand-purple/10 border border-brand-purple/40 px-3 py-1">
                <span className="mono text-[8px] text-brand-purple font-black uppercase tracking-[0.4em]">Optimal</span>
             </div>
          )}
        </div>

        <p className="mono text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest font-black mb-10 italic">
          "{firm.description}"
        </p>

        <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-10">
          <MetricBadge label="Max Funding" value={firm.maxAllocation} />
          <MetricBadge label="Payout Policy" value={firm.payoutPolicy} />
          <MetricBadge label="Drawdown Model" value={firm.drawdownType} />
          <MetricBadge label="Profit Target" value={firm.profitTarget} />
        </div>

        <div className="space-y-6 mb-12">
           <div className="flex items-center gap-3">
              <span className="mono text-[9px] text-zinc-700 font-black uppercase tracking-widest">Execution_Rules</span>
              <div className="h-px flex-1 bg-white/5" />
           </div>
           <div className="flex flex-wrap gap-2">
              {firm.firmRules.map((rule, i) => (
                <div key={i} className="px-3 py-1.5 bg-zinc-950 border border-white/5 mono text-[8px] text-zinc-400 font-bold uppercase tracking-widest">
                  {rule}
                </div>
              ))}
           </div>
        </div>

        <div className="mt-auto pt-8 border-t border-white/10 space-y-5" style={{ transform: 'translateZ(15px)' }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCopy}
              className={`flex-[1.5] group relative py-5 px-6 border mono text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 overflow-hidden flex items-center justify-between rounded-sm ${
                copied 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'bg-zinc-950 border-white/10 text-zinc-500 hover:border-brand-purple hover:text-white'
              }`}
            >
              <div className="flex flex-col items-start leading-none gap-1">
                 <span className="mono text-[7px] text-zinc-700 uppercase">Apply_Code</span>
                 <span className="relative z-10">{copied ? 'COPIED' : firm.couponCode}</span>
              </div>
              <span className="mono text-[10px] text-brand-purple font-black">{firm.discount}</span>
            </button>

            <a 
              href={firm.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 py-5 px-6 bg-white text-black mono text-[11px] font-black uppercase tracking-[0.5em] flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all duration-300 rounded-sm"
            >
              Access
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export const PropFirmExplorer: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'FUTURES' | 'CFD'>('ALL');
  const filteredFirms = filter === 'ALL' ? PROP_FIRMS : PROP_FIRMS.filter(f => f.type === filter);

  return (
    <section 
      id="coupons" 
      className="py-24 md:py-64 px-6 bg-[#030303] relative overflow-hidden transform-gpu" 
      style={{ perspective: THREE_D_PRESET.perspective }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_CONSTANTS.viewport}
          variants={VARIANTS.staggerContainer}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-16"
        >
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-16 bg-brand-purple" />
              <span className="mono text-[11px] text-brand-purple font-black tracking-[0.8em] uppercase">Funding Partners</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Comparison <br />
              <span className="text-transparent stroke-text">Dossier.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-10 lg:items-end">
            <div className="flex gap-2 p-1.5 bg-zinc-950 border border-white/10 rounded-sm">
              {(['ALL', 'FUTURES', 'CFD'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-12 py-4 mono text-[10px] uppercase tracking-widest transition-all duration-500 font-black focus:outline-none rounded-sm ${
                    filter === f ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' : 'text-zinc-600 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredFirms.map((firm, idx) => (
              <ElevationCard key={firm.id} firm={firm} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-40">
           <div className="flex items-center gap-16">
              <span className="mono text-[10px] text-zinc-500 font-black uppercase tracking-widest">Network_Sync: Operational</span>
              <span className="mono text-[10px] text-zinc-500 font-black uppercase tracking-widest">Update_Cycle: Weekly</span>
           </div>
           <p className="mono text-[9px] text-zinc-600 uppercase tracking-widest max-w-md md:text-right leading-loose font-bold">
             NOTICE: CAPITAL PARTNERS ARE INDEPENDENT ENTITIES. ORK SYSTEMS PROVIDES EXECUTION FRAMEWORKS ONLY. ALL TRADING INVOLVES RISK.
           </p>
        </div>
      </div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
      `}</style>
    </section>
  );
};
