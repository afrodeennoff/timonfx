import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, ANIM_SYSTEM, GLASS_STYLES } from '../constants';
import { ConicGradient } from './ConicGradient';

interface AboutProps {
  onStartPreview: () => void;
}

export const About: React.FC<AboutProps> = ({ onStartPreview }) => {
  return (
    <motion.section 
      id="about" 
      initial="initial"
      whileInView="animate"
      viewport={ANIM_SYSTEM.viewport}
      variants={VARIANTS.staggerContainer}
      className="py-12 md:py-16 px-6 bg-brand-black relative overflow-hidden transform-gpu scroll-mt-24 md:scroll-mt-32"
    >
      <ConicGradient opacity={0.05} size="100%" />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15vw] font-black text-white italic tracking-tighter select-none whitespace-nowrap">
          TIMON // TRADER
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center relative z-10">
         <motion.div variants={VARIANTS.reveal} className="w-full lg:w-5/12 relative group">
            <div className={`aspect-[4/5] overflow-hidden relative border border-white/10 shadow-2xl flex items-center justify-center p-8 rounded-[2.5rem] ${GLASS_STYLES.card}`}>
               <img 
                 src="https://raw.githubusercontent.com/user-attachments/assets/c79f323c-5872-430b-967b-12d93e185011" 
                 alt="ORK Systems Logo" 
                 className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-700 ease-[0.22,1,0.36,1]"
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent" />
            </div>
            <motion.div 
              variants={VARIANTS.reveal}
              className={`absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-36 md:w-48 p-5 md:p-6 shadow-2xl rounded-[1.5rem] ${GLASS_STYLES.card}`}
            >
               <span className="mono text-[8px] text-brand-purple uppercase tracking-[0.5em] font-black">HEAD TRADER</span>
               <p className="mt-2 mono text-[11px] md:text-[13px] text-white uppercase font-black italic tracking-widest leading-none">TIMON</p>
               <p className="mt-1.5 mono text-[7px] text-zinc-600 uppercase tracking-widest font-black">FOCUS: EXECUTION</p>
            </motion.div>
         </motion.div>

         <div className="w-full lg:w-7/12 space-y-6">
            <motion.div variants={VARIANTS.reveal} className="space-y-3">
              <span className="mono text-[10px] text-brand-purple font-black tracking-[0.5em] uppercase">Architecture</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                The Trader Behind <span className="text-transparent stroke-text">ORK</span>
              </h2>
            </motion.div>
            
            <motion.div variants={VARIANTS.reveal} className="space-y-4">
              <p className="mono text-sm md:text-base text-zinc-200 uppercase tracking-[0.02em] leading-relaxed font-black">
                <span className="text-brand-purple">I am Timon.</span> I develop disciplined operators, not followers. Built to focus strictly on market structure and risk control.
              </p>
              
              <p className="mono text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed font-medium max-w-xl">
                Through session reviews and live analysis, traders operate with clarity and refine their edge via a validated protocol.
              </p>

              <div className="pt-4 border-t border-white/5">
                <p className="mono text-xs text-white uppercase tracking-[0.2em] font-black italic">
                   Precision. Focus. <span className="text-brand-purple">Pure Execution.</span>
                </p>
              </div>
            </motion.div>
            
            <motion.button 
              whileHover={VARIANTS.buttonHover}
              whileTap={VARIANTS.buttonTap}
              onClick={onStartPreview}
              className={`group relative w-full sm:w-auto px-10 py-4 rounded-full mono text-[10px] font-black text-white uppercase tracking-[0.3em] overflow-hidden ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover}`}
            >
              <span className="relative z-10 group-hover:text-brand-purple transition-colors">REQUEST ACCESS</span>
            </motion.button>
         </div>
      </div>
      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
      `}</style>
    </motion.section>
  );
};