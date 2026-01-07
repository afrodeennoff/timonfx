import React from 'react';
import { motion } from 'framer-motion';
import { MODULES, VARIANTS, ANIM_CONSTANTS } from '../constants';
import { ModuleCard } from '../types';

// Detect mobile for optimized animations (smaller travel distance)
const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

// Local variants to handle specific animation requirements
const LOCAL_VARIANTS = {
  // Heading: Standard reveal but with 0.4s duration
  heading: {
    initial: { opacity: 0, y: isMobile ? 12 : 24 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        ease: ANIM_CONSTANTS.ease 
      }
    }
  },
  // Card Wrapper: Animates the card itself, then staggers internal content
  card: {
    initial: { opacity: 0, y: isMobile ? 12 : 24 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: ANIM_CONSTANTS.duration, 
        ease: ANIM_CONSTANTS.ease,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  },
  // Content: Reveal with mobile distance approx 50% of standard (e.g., 8px vs 16px)
  content: {
    initial: { opacity: 0, y: isMobile ? 8 : 16 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: ANIM_CONSTANTS.duration, ease: ANIM_CONSTANTS.ease }
    }
  },
  // ID Column: Same as content but with extra delay
  idColumn: {
    initial: { opacity: 0, y: isMobile ? 8 : 16 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: ANIM_CONSTANTS.duration, 
        ease: ANIM_CONSTANTS.ease,
        delay: 0.2
      }
    }
  }
};

const DossierCard: React.FC<{ module: ModuleCard; index: number }> = React.memo(({ module, index }) => {
  return (
    <motion.div
      variants={LOCAL_VARIANTS.card}
      className="group relative w-full border-t border-white/10 py-16 md:py-20 bg-brand-black transition-colors duration-500 hover:bg-zinc-900/[0.2]"
    >
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        {/* Column 1: Identifier (Sticky Visual) - DELAYED ANIMATION */}
        <motion.div variants={LOCAL_VARIANTS.idColumn} className="lg:col-span-2 hidden lg:flex flex-col items-start sticky top-32">
           <span className="text-8xl font-black italic text-transparent stroke-text opacity-20 group-hover:opacity-40 transition-opacity duration-500 select-none">
             0{index + 1}
           </span>
           <div className="h-12 w-[1px] bg-brand-purple/50 mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Column 2: Core Data - STANDARD ANIMATION */}
        <div className="lg:col-span-10 flex flex-col gap-12">
           {/* Mobile ID */}
           <motion.div variants={LOCAL_VARIANTS.content} className="lg:hidden flex items-center gap-4">
              <span className="text-6xl font-black italic text-zinc-800">0{index + 1}</span>
              <div className="h-[1px] flex-1 bg-white/10" />
           </motion.div>

           {/* Header */}
           <div className="space-y-6">
              <motion.div variants={LOCAL_VARIANTS.content} className="flex items-center gap-3">
                 <span className="mono text-[10px] text-brand-purple font-black tracking-[0.4em] uppercase">
                   Module // Verified
                 </span>
              </motion.div>
              <motion.h3 variants={LOCAL_VARIANTS.content} className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                {module.title}
              </motion.h3>
              <motion.p variants={LOCAL_VARIANTS.content} className="max-w-2xl mono text-xs md:text-sm text-zinc-400 font-medium uppercase leading-loose tracking-wide border-l-2 border-white/10 pl-6 group-hover:border-brand-purple transition-colors duration-500">
                {module.objective}
              </motion.p>
           </div>

           {/* Technical Grid (The Intel) */}
           <motion.div variants={LOCAL_VARIANTS.content} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 mt-4">
              
              {/* Deliverables Panel */}
              <div className="bg-[#050505] p-8 space-y-6 group/panel hover:bg-zinc-900/50 transition-colors">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-zinc-800 group-hover/panel:bg-white transition-colors rotate-45" />
                    <span className="mono text-[9px] text-zinc-500 font-black tracking-[0.2em] uppercase">Deliverables</span>
                 </div>
                 <ul className="space-y-4">
                   {module.checklist.map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                        <span className="mono text-[10px] text-zinc-600 font-bold">[{i+1}]</span>
                        <span className="mono text-[10px] text-zinc-300 uppercase tracking-wide font-bold">{item}</span>
                     </li>
                   ))}
                 </ul>
              </div>

              {/* Risk Panel */}
              <div className="bg-[#050505] p-8 space-y-6 group/panel hover:bg-zinc-900/50 transition-colors">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-brand-red/20 group-hover/panel:bg-brand-red transition-colors rotate-45" />
                    <span className="mono text-[9px] text-zinc-500 font-black tracking-[0.2em] uppercase group-hover/panel:text-brand-red transition-colors">Risk_Directives</span>
                 </div>
                 <ul className="space-y-4">
                   {module.mistakes.map((m, i) => (
                     <li key={i} className="flex items-start gap-3">
                        <span className="mono text-[10px] text-brand-red/50 font-bold">(!)</span>
                        <span className="mono text-[10px] text-zinc-400 uppercase tracking-wide font-medium italic">{m}</span>
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
    <section id="education" className="bg-brand-black pt-32 pb-24 relative z-10 overflow-hidden">
       
       {/* Cinematic Background Elements */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5 pointer-events-none" />
       
       <div className="max-w-[1600px] mx-auto px-6 mb-24 md:mb-32 relative">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={ANIM_CONSTANTS.viewport}
            variants={VARIANTS.staggerContainer}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12"
          >
             <div className="space-y-6 max-w-4xl">
                <motion.div variants={VARIANTS.reveal} className="flex items-center gap-4">
                   <div className="h-[2px] w-8 bg-brand-purple" />
                   <span className="mono text-[11px] text-brand-purple font-black tracking-[0.4em] uppercase">
                     Methodology // Process
                   </span>
                </motion.div>
                <motion.h2 
                  variants={LOCAL_VARIANTS.heading}
                  className="text-5xl md:text-7xl lg:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.85]"
                >
                   What Makes <br />
                   <span className="text-transparent stroke-text">ORK Different?</span>
                </motion.h2>
             </div>

             <motion.div variants={VARIANTS.reveal} className="max-w-sm pb-2 border-b border-brand-purple">
                <p className="mono text-xs text-zinc-400 uppercase tracking-widest font-bold leading-loose">
                  Live mentorship, real-time market analysis, and a disciplined approach to execution, risk, and consistency.
                </p>
             </motion.div>
          </motion.div>
       </div>

       {/* The Dossier Stack - Staggered Container */}
       <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_CONSTANTS.viewport}
          variants={VARIANTS.staggerContainer}
          className="flex flex-col border-b border-white/10"
       >
          {MODULES.map((module, i) => (
             <DossierCard key={module.id} module={module} index={i} />
          ))}
       </motion.div>

       {/* Footer Status Line - Reveal on Scroll */}
       <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_CONSTANTS.viewport}
          variants={VARIANTS.reveal}
          className="max-w-[1600px] mx-auto px-6 py-12 flex flex-wrap gap-8 justify-between items-center opacity-50 hover:opacity-100 transition-opacity"
       >
          <div className="flex gap-12">
             <span className="mono text-[10px] text-zinc-500 uppercase tracking-widest font-black">Intel: Active</span>
             <span className="mono text-[10px] text-zinc-500 uppercase tracking-widest font-black">Feed: Live</span>
          </div>
          <span className="mono text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black">
             ORK_TRADING_STANDARDS_v4.2
          </span>
       </motion.div>

       <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
       `}</style>
    </section>
  );
};