
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MODULES, MOTION_RULES, GLASS_STYLES, VARIANTS } from '../constants';
import { ModuleCard } from '../types';
import { GhostText } from './GhostText';

const CurriculumCard: React.FC<{ module: ModuleCard; index: number }> = ({ module, index }) => {
  return (
    <motion.div
      variants={VARIANTS.reveal}
      whileHover={VARIANTS.cardHover}
      className={`p-6 md:p-8 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover} flex flex-col justify-between group h-full relative overflow-hidden transition-all duration-500`}
    >
      <div className="relative z-10 flex flex-col h-full gap-6 md:gap-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
          <span className="mono text-[8px] text-brand-purple font-black tracking-widest uppercase italic">
            Logic_Gate_0{index + 1} // Curriculum
          </span>
        </div>

        <div className="space-y-2 md:space-y-3">
          <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter italic leading-none group-hover:text-brand-purple transition-colors duration-500">
            {module.title}
          </h3>
          <p className="mono text-[9px] md:text-[10px] text-zinc-500 uppercase font-black leading-relaxed tracking-wider italic border-l border-white/5 pl-4 group-hover:text-zinc-400 transition-colors duration-300">
            {module.objective}
          </p>
        </div>

        <div className="flex-1 space-y-3 md:space-y-4 pt-4 border-t border-white/5">
          <span className="mono text-[8px] text-zinc-700 uppercase tracking-widest font-black italic group-hover:text-brand-purple transition-colors duration-300">
            Technical Specs //
          </span>
          <ul className="grid grid-cols-1 gap-2 md:gap-2.5">
            {module.checklist.map((item, i) => (
              <li key={i} className="flex items-center gap-2 md:gap-3 group/item">
                <span className="mono text-[8px] text-brand-purple/40 font-black group-hover/item:text-brand-purple transition-colors">
                  0{i + 1}
                </span>
                <span className="mono text-[8px] md:text-[9px] text-zinc-300 uppercase font-black tracking-widest opacity-80 group-hover/item:opacity-100 transition-opacity">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
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
          className="mb-10 md:mb-16 space-y-4"
        >
          <motion.div variants={VARIANTS.reveal} className="flex items-center gap-4">
            <div className="h-px w-12 bg-brand-purple" />
            <span className="mono text-[10px] md:text-[11px] text-brand-purple font-black tracking-[0.5em] uppercase italic">Curriculum Logic</span>
          </motion.div>
          <motion.h2 variants={VARIANTS.reveal} className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
            THE EDGE BEHIND <br />
            <GhostText text="CONSISTENCY." className="text-transparent transition-colors cursor-default stroke-text" />
          </motion.h2>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={MOTION_RULES.viewport}
          variants={VARIANTS.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {MODULES.map((module, index) => (
            <CurriculumCard 
              key={module.id} 
              module={module} 
              index={index} 
            />
          ))}
        </motion.div>
      </div>
      
      <style>{` .stroke-text { -webkit-text-stroke: 1.5px rgba(255,255,255,0.25); } `}</style>
    </section>
  );
};