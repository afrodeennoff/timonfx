import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MODULES, MOTION_RULES, GLASS_STYLES, VARIANTS } from '../constants';
import { ModuleCard } from '../types';
import { ConicGradient } from './ConicGradient';
import { GhostText } from './GhostText';

const ExecutionStep: React.FC<{ module: ModuleCard; index: number }> = ({ module, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      variants={VARIANTS.reveal}
      className={`group relative border-l-2 transition-all duration-500 ${
        isOpen ? 'border-brand-purple' : 'border-white/5 hover:border-brand-purple/30'
      } ml-4 md:ml-10 pl-8 md:pl-20 pb-16 md:pb-20 last:pb-0`}
    >
      <div className="absolute left-[-11px] top-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: isOpen ? [1, 1.2, 1] : 1,
            backgroundColor: isOpen ? '#8b5cf6' : '#0a0a0a',
            borderColor: isOpen ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
          }}
          transition={{ duration: 0.4, ease: MOTION_RULES.ease }}
          className="w-5 h-5 rounded-full border-2 z-10 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
        />
        {isOpen && (
          <motion.div
            layoutId="node-glow"
            className="absolute w-12 h-12 bg-brand-purple/10 blur-2xl rounded-full"
          />
        )}
      </div>

      <div className="relative cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="mono text-[10px] text-brand-purple font-black tracking-[0.5em] uppercase opacity-60">
              LOGIC_GATE_0{index + 1}
            </span>
            <h3 className={`text-4xl md:text-6xl font-black italic uppercase tracking-tighter transition-all duration-500 ${
              isOpen ? 'text-white translate-x-2' : 'text-zinc-800 group-hover:text-zinc-600'
            }`}>
              {module.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
               <span className={`mono text-[9px] font-black uppercase tracking-widest ${isOpen ? 'text-brand-purple' : 'text-zinc-700'}`}>
                 {isOpen ? 'STATUS: ACTIVE' : 'STATUS: STANDBY'}
               </span>
               <span className="mono text-[8px] text-zinc-800 uppercase font-black">SECURE_CLEARANCE</span>
             </div>
             <motion.div
               animate={{ rotate: isOpen ? 180 : 0 }}
               className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isOpen ? 'border-brand-purple text-brand-purple bg-brand-purple/5' : 'border-white/5 text-zinc-800 hover:border-white/10'}`}
             >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                 <path d="M6 9l6 6 6-6" />
               </svg>
             </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: MOTION_RULES.ease }}
              className="overflow-hidden"
            >
              <div className="pt-10 md:pt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                <motion.div 
                  initial="initial"
                  whileInView="animate"
                  viewport={MOTION_RULES.viewport}
                  variants={VARIANTS.reveal}
                  whileHover={VARIANTS.cardHover}
                  className={`p-10 md:p-14 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover} flex flex-col justify-between relative group/card`}
                >
                  <div className="absolute inset-[1px] rounded-[2.5rem] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-[2.5rem] border border-brand-purple/20 blur-[2px] opacity-70" />
                    <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 opacity-50" />
                  </div>
                  
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/card:opacity-10 transition-opacity">
                    <span className="mono text-[40px] font-black italic">STEP_{index + 1}</span>
                  </div>
                  
                  <div className="space-y-10 relative z-10">
                    <div className="space-y-4">
                      <span className="mono text-[9px] text-zinc-600 uppercase tracking-widest font-black">OBJECTIVE //</span>
                      <p className="mono text-sm md:text-base text-zinc-300 uppercase leading-relaxed tracking-widest font-bold border-l-2 border-brand-purple/40 pl-6">
                        {module.objective}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <span className="mono text-[8px] text-zinc-500 uppercase tracking-widest font-black italic">CHECKLIST //</span>
                          <ul className="space-y-2">
                             {module.checklist.map((item, i) => (
                               <li key={i} className="flex items-center gap-3">
                                 <div className="w-1 h-1 bg-brand-purple" />
                                 <span className="mono text-[9px] text-zinc-400 uppercase font-bold tracking-widest">{item}</span>
                               </li>
                             ))}
                          </ul>
                       </div>
                       <div className="space-y-4">
                          <span className="mono text-[8px] text-zinc-500 uppercase tracking-widest font-black italic">COMMON_ERROR //</span>
                          <ul className="space-y-2">
                             {module.mistakes.map((item, i) => (
                               <li key={i} className="flex items-center gap-3">
                                 <div className="w-1 h-1 bg-brand-red opacity-50" />
                                 <span className="mono text-[9px] text-zinc-400 uppercase font-bold tracking-widest">{item}</span>
                               </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const Education: React.FC = () => {
  return (
    <section id="edge" className="py-10 md:py-14 bg-brand-black relative overflow-hidden scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={MOTION_RULES.viewport}
          variants={VARIANTS.staggerContainer}
          className="mb-7 md:mb-12 space-y-4"
        >
          <motion.div variants={VARIANTS.reveal} className="flex items-center gap-4">
            <div className="h-px w-12 bg-brand-purple" />
            <span className="mono text-[11px] text-brand-purple font-black tracking-[0.5em] uppercase italic">Curriculum Logic</span>
          </motion.div>
          <motion.h2 variants={VARIANTS.reveal} className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
            Built For <br />
            <GhostText text="Consistent Size." className="text-zinc-600 transition-colors cursor-default stroke-text" />
          </motion.h2>
        </motion.div>

        <div className="relative">
          {MODULES.map((module, i) => (
            <ExecutionStep key={module.id} module={module} index={i} />
          ))}
        </div>
      </div>
      
      <style>{` .stroke-text { -webkit-text-stroke: 1.5px rgba(255,255,255,0.25); } `}</style>
    </section>
  );
};