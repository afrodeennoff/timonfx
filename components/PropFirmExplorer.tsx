import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROP_FIRMS, VARIANTS, ANIM_SYSTEM, GLOBAL_3D_PRESET, MOTION_KILL_SWITCH, GLASS_STYLES } from '../constants';
import { PropFirm } from '../types';
import { GhostText } from './GhostText';

const MetricBadge: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-1 p-3 bg-white/[0.02] border border-white/5 group/metric hover:bg-white/[0.04] hover:border-white/10 transition-all rounded-xl">
    <span className="mono text-[7px] text-zinc-600 uppercase tracking-widest font-black group-hover/metric:text-brand-purple transition-colors">
      {label}
    </span>
    <span className={`mono text-[10px] text-zinc-100 font-black uppercase tracking-wider tabular-nums`}>
      {value}
    </span>
  </div>
);

const ElevationCard: React.FC<{ firm: PropFirm; index: number }> = React.memo(({ firm, index }) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // High-fidelity spring synchronized with Pricing standard
  const springConfig = { stiffness: 120, damping: 25, mass: 1.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [GLOBAL_3D_PRESET.maxRotation, -GLOBAL_3D_PRESET.maxRotation]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-GLOBAL_3D_PRESET.maxRotation, GLOBAL_3D_PRESET.maxRotation]);

  const handleCopy = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(firm.couponCode).catch(() => console.error("Clipboard write failed"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [firm.couponCode]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || MOTION_KILL_SWITCH) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
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
      initial="initial"
      whileInView="animate"
      variants={VARIANTS.reveal}
      whileHover={{ 
        y: -8,
        scale: 1.002,
        z: MOTION_KILL_SWITCH ? 0 : GLOBAL_3D_PRESET.zDepth, 
        transition: { duration: ANIM_SYSTEM.hoverDuration, ease: ANIM_SYSTEM.ease }
      }}
      viewport={ANIM_SYSTEM.viewport}
      style={{ 
        transformStyle: 'preserve-3d', 
        perspective: GLOBAL_3D_PRESET.perspective,
        rotateX: !MOTION_KILL_SWITCH ? rotateX : 0,
        rotateY: !MOTION_KILL_SWITCH ? rotateY : 0
      }}
      className={`relative flex flex-col h-full border backdrop-blur-3xl transition-all duration-500 rounded-[2rem] overflow-hidden ${
        firm.isRecommended 
          ? 'border-brand-purple/30 bg-zinc-950/40 hover:border-brand-purple/50 shadow-[0_0_50px_-20px_rgba(139,92,246,0.25)]' 
          : `${GLASS_STYLES.card} ${GLASS_STYLES.cardHover}`
      } group/card`}
    >
      <div className={`h-1 w-full opacity-60 ${firm.isRecommended ? 'bg-brand-purple' : 'bg-zinc-800'}`} />

      <div className="p-6 md:p-8 flex flex-col h-full relative" style={{ transform: MOTION_KILL_SWITCH ? 'none' : `translateZ(${GLOBAL_3D_PRESET.zDepth}px)` }}>
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="mono text-[9px] text-zinc-600 font-black tracking-widest italic uppercase">Arch_DS_0{firm.rank}</span>
              <span className="mono text-[8px] text-brand-purple font-black tracking-[0.4em] uppercase">[{firm.type}]</span>
            </div>
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none group-hover/card:text-brand-purple transition-colors duration-500">
              {firm.name}
            </h3>
          </div>
          {firm.isRecommended && (
            <div className="bg-brand-purple/10 border border-brand-purple/30 px-2 py-0.5 rounded-full">
              <span className="mono text-[7px] text-brand-purple font-black uppercase tracking-widest">Top_Pick</span>
            </div>
          )}
        </div>

        <p className="mono text-[9px] text-zinc-400 leading-relaxed uppercase tracking-widest font-black mb-6 italic border-l border-white/10 pl-4">
          "{firm.description}"
        </p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <MetricBadge label="Capital Cap" value={firm.maxAllocation} />
          <MetricBadge label="Profit Split" value={firm.payoutPolicy} />
          <MetricBadge label="Drawdown" value={firm.drawdownType} />
          <MetricBadge label="Target" value={firm.profitTarget} />
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleCopy}
              className={`flex-[1.5] group relative py-3 px-5 border rounded-full mono text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 overflow-hidden flex items-center justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ${
                copied 
                  ? 'bg-green-600/20 border-green-500/50 text-green-400' 
                  : `${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} text-zinc-500`
              }`}
            >
              <span className="relative z-10">{copied ? 'READY' : firm.couponCode}</span>
              <span className={`mono text-[8px] font-black ${copied ? 'text-green-400' : 'text-brand-purple'}`}>{firm.discount}</span>
            </button>

            <a 
              href={firm.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex-1 py-3 px-5 rounded-full mono text-[10px] font-black uppercase tracking-[0.5em] flex items-center justify-center transition-all duration-300 ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} text-white`}
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
      id="coupon" 
      className="py-12 md:py-16 px-6 bg-brand-black relative overflow-hidden transform-gpu scroll-mt-24 md:scroll-mt-32" 
      style={{ perspective: MOTION_KILL_SWITCH ? 'none' : GLOBAL_3D_PRESET.perspective }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_SYSTEM.viewport}
          variants={VARIANTS.staggerContainer}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-12 gap-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-10 bg-brand-purple" />
              <span className="mono text-[10px] text-brand-purple font-black tracking-[0.8em] uppercase italic">Funding Partners</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Comparison <br />
              <GhostText text="Dossier." className="text-transparent stroke-text" />
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <div className={`flex gap-1.5 p-1 rounded-full border border-white/10 ${GLASS_STYLES.card}`}>
              {(['ALL', 'FUTURES', 'CFD'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 mono text-[9px] uppercase tracking-[0.4em] transition-all duration-300 font-black focus:outline-none rounded-full ${
                    filter === f 
                      ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/20' 
                      : 'text-zinc-600 hover:text-white hover:bg-white/5'
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredFirms.map((firm, idx) => (
              <ElevationCard key={firm.id} firm={firm} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.4); }
      `}</style>
    </section>
  );
};