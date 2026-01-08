import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MODULES, VARIANTS, ANIM_SYSTEM, GLASS_STYLES } from '../constants';
import { ModuleCard } from '../types';
import { ConicGradient } from './ConicGradient';
import { GhostText } from './GhostText';

// Institutional animation variant specific to Education section
// Fix: Use Record<string, Variants> to correctly type nested variant sets instead of a single Variants object
const EDUCATION_VARIANTS: Record<string, Variants> = {
  cardReveal: {
    initial: { opacity: 0, y: 24, scale: 0.98 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.32, 
        ease: ANIM_SYSTEM.ease 
      }
    }
  },
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }
};

const ProtocolCard: React.FC<{ module: ModuleCard; index: number }> = React.memo(({ module, index }) => {
  return (
    <motion.div
      variants={EDUCATION_VARIANTS.cardReveal}
      whileHover={{ 
        y: -6,
        borderColor: "rgba(139, 92, 246, 0.35)",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        boxShadow: "0 20px 40px -20px rgba(0,0,0,0.8)"
      }}
      className={`relative h-full p-8 flex flex-col gap-8 rounded-[2.5rem] border border-white/5 bg-zinc-950/20 transition-all duration-300 group overflow-hidden ${GLASS_STYLES.cardHover}`}
    >
      {/* CARD HEADER */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="mono text-[8px] text-zinc-600 font-black tracking-[0.4em] uppercase">Ref_0{index + 1}</span>
          <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-brand-purple transition-colors duration-300">
            {module.title}
          </h3>
        </div>
        <div className="opacity-10 group-hover:opacity-30 transition-opacity duration-700 select-none">
          <span className="text-4xl font-black italic text-white">0{index + 1}</span>
        </div>
      </div>

      {/* OBJECTIVE */}
      <p className="mono text-[10px] text-zinc-400 uppercase leading-relaxed tracking-wider italic font-medium border-l border-brand-purple/20 pl-4">
        {module.objective}
      </p>

      {/* DELIVERABLES & DIRECTIVES GRID */}
      <div className="grid grid-cols-1 gap-6 mt-auto">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-px w-3 bg-zinc-800" />
            <span className="mono text-[8px] text-zinc-500 font-black tracking-widest uppercase italic">Deliverables</span>
          </div>
          <ul className="space-y-2">
            {module.checklist.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-[10px] text-brand-purple/40 font-black">/</span>
                <span className="mono text-[9px] text-zinc-300 uppercase font-bold tracking-widest">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-px w-3 bg-zinc-800" />
            <span className="mono text-[8px] text-zinc-500 font-black tracking-widest uppercase italic">Directives</span>
          </div>
          <ul className="space-y-2">
            {module.mistakes.map((m, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-[10px] text-brand-red/40 font-black">!</span>
                <span className="mono text-[9px] text-zinc-500 uppercase font-medium italic tracking-wider">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* DECORATIVE ACCENT */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-purple/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </motion.div>
  );
});

export const Education: React.FC = () => {
  return (
    <section id="edge" className="bg-brand-black py-24 md:py-32 relative z-10 overflow-hidden scroll-mt-24 md:scroll-mt-32">
       <ConicGradient opacity={0.04} size="140%" blur="120px" />

       <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={ANIM_SYSTEM.viewport}
            variants={VARIANTS.staggerContainer}
            className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 md:mb-24"
          >
             <div className="space-y-4 text-center md:text-left">
                <motion.div variants={VARIANTS.reveal} className="flex items-center justify-center md:justify-start gap-3">
                   <div className="h-[2px] w-6 bg-brand-purple" />
                   <span className="mono text-[10px] text-brand-purple font-black tracking-[0.6em] uppercase">Trading Method</span>
                </motion.div>
                <motion.h2 
                  variants={VARIANTS.reveal}
                  className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-none"
                >
                   What Makes <br />
                   <GhostText text="ORK Different?" className="text-transparent stroke-text" />
                </motion.h2>
             </div>

             <motion.div variants={VARIANTS.reveal} className="max-w-xs p-6 border border-white/5 rounded-2xl bg-white/[0.01]">
                <p className="mono text-[10px] text-zinc-500 uppercase tracking-widest font-black leading-relaxed italic">
                  Direct mentorship and session-based execution reviews for stabilized performance across all market cycles.
                </p>
             </motion.div>
          </motion.div>

          <motion.div 
             initial="initial"
             whileInView="animate"
             viewport={ANIM_SYSTEM.viewport}
             variants={EDUCATION_VARIANTS.container}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
             {MODULES.map((module, i) => (
                <ProtocolCard key={module.id} module={module} index={i} />
             ))}
          </motion.div>
       </div>

       <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
       `}</style>
    </section>
  );
};
