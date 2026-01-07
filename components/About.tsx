
import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, ANIM_CONSTANTS } from '../constants';

interface AboutProps {
  onStartPreview: () => void;
}

export const About: React.FC<AboutProps> = ({ onStartPreview }) => {
  return (
    <motion.section 
      id="about" 
      initial="initial"
      whileInView="animate"
      viewport={ANIM_CONSTANTS.viewport}
      variants={VARIANTS.staggerContainer}
      className="py-24 md:py-48 px-6 bg-brand-black relative overflow-hidden transform-gpu"
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[20vw] font-black text-white italic tracking-tighter select-none whitespace-nowrap">
          TIMON // TRADER
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 items-center relative z-10">
         <motion.div variants={VARIANTS.scaleIn} className="w-full lg:w-5/12 relative group">
            <div className="aspect-[4/5] bg-zinc-950 overflow-hidden relative border border-white/20 shadow-2xl flex items-center justify-center p-12">
               <img 
                 src="https://raw.githubusercontent.com/user-attachments/assets/c79f323c-5872-430b-967b-12d93e185011" 
                 alt="ORK Systems - TIΩΘΠ Logo" 
                 className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-[0.19,1,0.22,1] filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent opacity-90" />
            </div>
            <motion.div 
              initial={{ x: 15, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-48 md:w-64 bg-[#050505] border border-white/20 backdrop-blur-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            >
               <span className="mono text-[8px] md:text-[9px] text-brand-purple uppercase tracking-[0.5em] font-black underline underline-offset-4">HEAD TRADER</span>
               <div className="mt-4 h-[1px] w-full bg-white/10" />
               <p className="mt-6 mono text-[12px] md:text-[14px] text-white uppercase font-black italic tracking-widest leading-tight">TIMON</p>
               <p className="mt-2 mono text-[8px] text-zinc-500 uppercase tracking-widest font-bold">FOCUS: DISCIPLINED EXECUTION</p>
            </motion.div>
         </motion.div>

         <div className="w-full lg:w-7/12 space-y-10 md:space-y-16">
            <motion.div variants={VARIANTS.fadeInUp} className="space-y-6">
              <span className="mono text-px md:text-[11px] text-brand-purple font-black tracking-[0.6em] uppercase">SENIOR TRADER</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
                The Trader Behind <span className="text-transparent stroke-text">ORK</span>
              </h2>
            </motion.div>
            
            <motion.div variants={VARIANTS.fadeInUp} className="space-y-8 md:space-y-12">
              <p className="mono text-sm md:text-xl text-zinc-100 uppercase tracking-[0.05em] leading-relaxed font-black">
                <span className="text-brand-purple">I am Timon.</span> I develop disciplined traders, not speculative followers. This approach is built to cut through the noise and focus strictly on what matters: market structure, execution, and risk control.
              </p>
              
              <div className="space-y-6">
                <p className="mono text-xs md:text-sm text-zinc-400 uppercase tracking-widest leading-loose font-medium max-w-2xl">
                  Through live market analysis and session-based reviews, traders learn to operate with clarity, execute with confidence, and refine their edge through a validated process.
                </p>
                <p className="mono text-xs md:text-sm text-zinc-400 uppercase tracking-widest leading-loose font-medium max-w-2xl">
                  In this room, trading isn't a gamble. It is a skill built through precision, focus, and a consistent routine.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="mono text-sm md:text-lg text-white uppercase tracking-[0.2em] font-black italic">
                   Precision. Focus. Consistency. <span className="text-brand-purple">Pure Execution.</span>
                </p>
              </div>
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              whileFocus={VARIANTS.buttonFocus}
              onClick={onStartPreview}
              className="group relative w-full sm:w-auto px-12 md:px-16 py-6 md:py-8 bg-white/5 border border-white/20 hover:border-brand-purple transition-all duration-500 mono text-[10px] md:text-[11px] font-black text-white uppercase tracking-[0.4em] overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple"
            >
              <div className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.19,1,0.22,1]" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500 font-black">REQUEST ACCESS</span>
            </motion.button>
         </div>
      </div>
      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.4); }
      `}</style>
    </motion.section>
  );
};
