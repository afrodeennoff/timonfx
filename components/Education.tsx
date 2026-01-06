
import React from 'react';
import { motion } from 'framer-motion';
import { MODULES, VARIANTS, ANIM_CONSTANTS } from '../constants';
import { ModuleCard } from '../types';

const MethodologyCard: React.FC<{ module: ModuleCard; index: number }> = ({ module, index }) => {
  return (
    <motion.div
      variants={VARIANTS.fadeInUp}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } 
      }}
      className="relative group h-full transform-gpu"
    >
      <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
      
      <div className="h-full bg-zinc-950/40 border border-white/5 p-8 md:p-10 flex flex-col backdrop-blur-md relative overflow-hidden transition-all duration-500 group-hover:border-brand-purple/30 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Card Number Accents */}
        <div className="flex justify-between items-start mb-8">
          <span className="mono text-[10px] text-zinc-600 font-black tracking-[0.4em] uppercase">0{index + 1}</span>
          <div className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-brand-purple transition-all duration-700" />
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-brand-purple transition-colors">
            {module.title}
          </h3>
          <p className="mono text-[11px] text-zinc-400 uppercase tracking-widest leading-relaxed font-bold">
            {module.objective}
          </p>
        </div>

        <div className="mt-auto space-y-6">
          <div className="space-y-3">
             <span className="mono text-[8px] text-zinc-600 font-black tracking-[0.4em] uppercase">Primary // Deliverables</span>
             <ul className="space-y-2">
                {module.checklist.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1 h-[1px] bg-brand-purple/40 group-hover:bg-brand-purple transition-colors" />
                    <span className="mono text-[10px] text-zinc-300 uppercase tracking-wider font-bold">{item}</span>
                  </li>
                ))}
             </ul>
          </div>

          <div className="pt-6 border-t border-white/5">
             <span className="mono text-[8px] text-brand-red/60 font-black tracking-[0.4em] uppercase block mb-3">Risk_Directives</span>
             <div className="flex flex-wrap gap-x-4 gap-y-1">
                {module.mistakes.map((m, i) => (
                  <span key={i} className="mono text-[9px] text-zinc-600 uppercase font-black italic">
                    [!] {m}
                  </span>
                ))}
             </div>
          </div>
        </div>

        {/* 3D Depth Decoration */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-purple/5 blur-[40px] rounded-full translate-x-16 translate-y-16 group-hover:bg-brand-purple/10 transition-colors" />
      </div>
    </motion.div>
  );
};

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 md:py-48 bg-brand-black border-t border-white/10 relative overflow-hidden transform-gpu">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_CONSTANTS.viewport}
          variants={VARIANTS.staggerContainer}
          className="space-y-20"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
             <div className="space-y-6">
                <span className="mono text-[11px] text-brand-purple font-black tracking-[0.6em] uppercase block">Methodology // Process</span>
                <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
                  What Makes <span className="text-transparent stroke-text">ORK Different?</span>
                </h2>
             </div>
             <div className="max-w-sm border-l border-brand-purple pl-8">
                <p className="mono text-xs md:text-sm text-zinc-400 uppercase tracking-widest font-black leading-loose">
                   Live mentorship, real-time market analysis, and a disciplined approach to execution, risk, and consistency.
                </p>
             </div>
          </div>

          {/* Premium Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MODULES.map((module, i) => (
              <MethodologyCard key={module.id} module={module} index={i} />
            ))}
          </div>

          {/* Status Indicators */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/5 gap-8">
             <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                   <span className="mono text-[9px] text-zinc-400 uppercase tracking-widest font-black">Intel: Active</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 bg-brand-purple rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                   <span className="mono text-[9px] text-zinc-400 uppercase tracking-widest font-black">Feed: Live</span>
                </div>
             </div>

             <div className="px-6 py-3 border border-white/5 bg-white/[0.01]">
                <span className="mono text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-black">
                  ORK_TRADING_STANDARDS_v4.2
                </span>
             </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.4); }
      `}</style>
    </section>
  );
};
