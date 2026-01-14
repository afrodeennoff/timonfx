import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, MOTION_RULES, GLASS_STYLES } from '../constants';
import { ConicGradient } from './ConicGradient';

interface HeroProps {
  onStartPreview: () => void;
}

const WORDS = ['PERFORMANCE', 'EDGE', 'DISCIPLINE', 'PRECISION'];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const FloatingNode: React.FC<{ x: string; y: string; delay: number; label?: string }> = ({ x, y, delay, label }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.08, 0.24, 0.08] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
    className="absolute pointer-events-none flex flex-col items-center gap-1"
    style={{ left: x, top: y }}
  >
    <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/40 shadow-[0_0_12px_rgba(139,92,246,0.3)]" />
    {label && <span className="mono text-[6px] text-zinc-600 font-black tracking-widest uppercase opacity-40">{label}</span>}
  </motion.div>
);

const RotatingHeadline = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    if (subIndex === WORDS[index].length && !reverse) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setReverse(true);
      }, 1800);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 25 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, isPaused]);

  return (
    <h1 className="mono text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] text-white font-black uppercase tracking-tighter leading-[0.85] text-center flex flex-col items-center select-none">
      <div className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">ACCELERATE YOUR</div>
      <div className="flex items-center justify-center whitespace-nowrap italic">
        <span className="text-brand-purple drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          {WORDS[index].substring(0, subIndex)}
          {!isPaused && <span className="opacity-40 ml-1 animate-pulse">_</span>}
        </span>
      </div>
      <div className="mt-2 text-zinc-400 text-3xl sm:text-5xl md:text-6xl tracking-tight leading-none opacity-80">IN THE MARKETS</div>
    </h1>
  );
};

export const Hero: React.FC<HeroProps> = React.memo(({ onStartPreview }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] flex flex-col justify-center items-center px-6 pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden bg-brand-black transform-gpu scroll-mt-24 md:scroll-mt-32"
    >
      <ConicGradient opacity={0.15} size="110%" />

      <div className="absolute inset-0 pointer-events-none">
        <FloatingNode x="12%" y="18%" delay={0} label="LQD_01" />
        <FloatingNode x="88%" y="22%" delay={1} label="STR_NODE" />
        <FloatingNode x="18%" y="78%" delay={2} label="EXP_0X" />
        <FloatingNode x="78%" y="82%" delay={0.5} label="RISK_MD" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.6, ease: MOTION_RULES.ease }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <img 
          src="https://raw.githubusercontent.com/afrodeennoff/ork-orginal-/25e7b64e21207cd0988dc6cf704f230b51e73b74/IMG_1213.png" 
          alt="TIMON Trading Desk Logo Background" 
          className="w-[95vw] md:w-[75vw] max-w-[1100px] object-contain mix-blend-screen filter grayscale opacity-40 will-change-transform"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      <motion.div 
        variants={VARIANTS.staggerContainer as any}
        initial="initial"
        animate="animate"
        className="relative z-20 max-w-7xl w-full text-center flex flex-col items-center gap-7 md:gap-12"
      >
        <div className="relative flex flex-col items-center">
          <motion.p 
            variants={VARIANTS.reveal as any}
            className="mono text-[9px] text-zinc-600 font-black uppercase tracking-[0.6em] mb-7 md:mb-12"
          >
            INSTITUTIONAL // METHOD
          </motion.p>
          
          <motion.div variants={VARIANTS.reveal as any} className="mb-5 md:mb-8">
            <RotatingHeadline />
          </motion.div>
          
          <motion.div variants={VARIANTS.reveal as any} className="mt-6 md:mt-10 px-4 max-w-3xl mx-auto">
             <div className="mono text-[11px] md:text-[13px] text-zinc-500 font-bold uppercase tracking-[0.15em] leading-relaxed max-w-[720px] mx-auto">
               <span className="text-white block mb-3 opacity-100 tracking-[0.25em] font-black italic text-sm md:text-base">
                 FOR TRADERS WHO REFUSE TO STAY AVERAGE.
               </span>
               <span className="text-zinc-300 opacity-90 italic text-[11px] md:text-[13px] block max-w-[650px] mx-auto leading-relaxed font-medium">
                 A private, elite mentorship driven by a proprietary standard that <span className="text-brand-purple font-black not-italic">eliminates noise</span> and enforces institutional precision.
               </span>
             </div>
          </motion.div>
        </div>

        <motion.div
          variants={VARIANTS.reveal as any}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full px-4"
        >
          <motion.button
            whileHover={VARIANTS.buttonHover}
            whileTap={VARIANTS.buttonTap}
            onClick={() => scrollToSection('join')}
            className={`${GLASS_STYLES.accentButton} ${GLASS_STYLES.accentButtonHover} w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
            <span className="relative z-10 mono text-[11px] font-black text-white uppercase tracking-[0.5em]">
              ENTER DESK
            </span>
          </motion.button>
          
          <motion.button
            whileHover={VARIANTS.buttonHover}
            whileTap={VARIANTS.buttonTap}
            onClick={() => scrollToSection('coupon')}
            className={`${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4 opacity-60 hover:opacity-100 transition-opacity duration-300`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
            <span className="relative z-10 mono text-[11px] font-black text-white uppercase tracking-[0.5em]">
              PARTNERS
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
});