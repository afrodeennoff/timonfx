
import React from 'react';
import { motion } from 'framer-motion';
import { MODULES, VARIANTS, ANIM_SYSTEM, GLASS_STYLES } from '../constants';
import { ModuleCard } from '../types';
import { ConicGradient } from './ConicGradient';
import { GhostText } from './GhostText';

const DossierCard: React.FC<{ module: ModuleCard; index: number }> = React.memo(({ module, index }) => {
  return (
    <motion.div
      variants={VARIANTS.reveal}
      whileHover={{ 
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderColor: "rgba(139, 92, 246, 0.4)",
        boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(139, 92, 246, 0.01)"
      }}
      transition={{ 
        duration: ANIM_SYSTEM.hoverDuration, 
        ease: ANIM_SYSTEM.ease 
      }}
      className="group relative w-full border-t border-white/5 py-10 md:py-14 bg-brand-black transition-all duration-300 cursor-default"
    >
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        <motion.div variants={VARIANTS.reveal} className="lg:col-span-2 hidden lg:flex flex-col items-start sticky top-32">
           <GhostText 
             text={`0${index + 1}`}
             className="text-7xl font-black italic text-transparent stroke-text opacity-30 group-hover:opacity-50 transition-all duration-700 select-none"
           />
        </motion.div>

        <div className="lg:col-span-10 flex flex-col gap-6 md:gap-8">
           <motion.div variants={VARIANTS.reveal} className="lg:hidden flex items-center gap-4">
              <span className="text-5xl font-black italic text-zinc-900/50">0{index + 1}</span>
              <div className="h-[1px] flex-1 bg-white/5" />
           </motion.div>

           <div className="space-y-4">
              <motion.div variants={VARIANTS.reveal} className="flex items-center gap-2">
                 <span className="mono text-[10px] text-brand-purple font-black tracking-[0.5em] uppercase">
                   Module // {module.id.toUpperCase()}
                 </span>
              </motion.div>
              <motion.h3 variants={VARIANTS.reveal} className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
                {module.title}
              </motion.h3>
              <motion.p variants={VARIANTS.reveal} className="max-w-2xl mono text-[11px] md:text-xs text-zinc-400 font-medium uppercase leading-relaxed tracking-wide border-l-2 border-brand-purple/20 pl-4 group-hover:border-brand-purple/60 transition-colors">
                {module.objective}
              </motion.p>
           </div>

           <motion.div variants={VARIANTS.reveal} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className={`p-6 md:p-8 space-y-4 rounded-[2rem] transition-all duration-500 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover}`}>
                 <div className="flex items-center justify-between">
                   <span className="mono text-[9px] text-zinc-500 font-black tracking-[0.3em] uppercase italic">Deliverables</span>
                   <div className="w-6 h-px bg-white/10" />
                 </div>
                 <ul className="space-y-3">
                   {module.checklist.map((item, i) => (
                     <li key={i} className="flex items-start gap-3 group/item">
                        <span className="mono text-[9px] text-brand-purple/40 font-black group-hover/item:text-brand-purple transition-colors">[{i+1}]</span>
                        <span className="mono text-[10px] text-zinc-300 uppercase font-bold tracking-wider">{item}</span>
                     </li>
                   ))}
                 </ul>
              </div>
              <div className={`p-6 md:p-8 space-y-4 rounded-[2rem] transition-all duration-500 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover}`}>
                 <div className="flex items-center justify-between">
                   <span className="mono text-[9px] text-zinc-500 font-black tracking-[0.3em] uppercase italic">Directives</span>
                   <div className="w-6 h-px bg-white/10" />
                 </div>
                 <ul className="space-y-3">
                   {module.mistakes.map((m, i) => (
                     <li key={i} className="flex items-start gap-3 group/item">
                        <span className="mono text-[9px] text-brand-red/40 group-hover/item:text-brand-red transition-colors">(!)</span>
                        <span className="mono text-[10px] text-zinc-500 uppercase font-medium italic tracking-wider">{m}</span>
                     </li>
                   ))}
                 </ul>
              </div>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

export const Education: React.FC = () => {
  return (
    <section id="edge" className="bg-brand-black pt-12 md:pt-16 pb-8 md:pb-12 relative z-10 overflow-hidden scroll-mt-24 md:scroll-mt-32">
       <ConicGradient opacity={0.06} size="150%" blur="150px" />

       <div className="max-w-[1600px] mx-auto px-6 mb-8 md:mb-10 relative">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={ANIM_SYSTEM.viewport}
            variants={VARIANTS.staggerContainer}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          >
             <div className="space-y-3 max-w-4xl">
                <motion.div variants={VARIANTS.reveal} className="flex items-center gap-2">
                   <div className="h-[1px] w-4 bg-brand-purple" />
                   <span className="mono text-[10px] text-brand-purple font-black tracking-[0.4em] uppercase">Methodology</span>
                </motion.div>
                <motion.h2 
                  variants={VARIANTS.reveal}
                  className="text-3xl md:text-5xl lg:text-6xl font-black text-white italic uppercase tracking-tighter leading-none"
                >
                   What Makes <br />
                   <GhostText text="ORK Different?" className="text-transparent stroke-text" />
                </motion.h2>
             </div>

             <motion.div variants={VARIANTS.reveal} className="max-w-xs pb-1 border-b border-white/10">
                <p className="mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold leading-relaxed">
                  Direct mentorship and session-based execution reviews for stabilized performance.
                </p>
             </motion.div>
          </motion.div>
       </div>

       <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_SYSTEM.viewport}
          variants={VARIANTS.staggerContainer}
          className="flex flex-col border-b border-white/5"
       >
          {MODULES.map((module, i) => (
             <DossierCard key={module.id} module={module} index={i} />
          ))}
       </motion.div>

       <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.4); }
       `}</style>
    </section>
  );
};
