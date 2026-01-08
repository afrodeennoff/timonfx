import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, ANIM_SYSTEM, GLASS_STYLES } from '../constants';
import { ConicGradient } from './ConicGradient';
import { GhostText } from './GhostText';

interface HeroProps {
  onStartPreview: () => void;
}

const WORDS = ['PERFORMANCE', 'EDGE', 'DISCIPLINE', 'PRECISION'];

const RotatingHeadline = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    // Pause at the end of typing
    if (subIndex === WORDS[index].length && !reverse) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setReverse(true);
      }, 2000);
      return;
    }

    // Move to next word after deleting
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, isPaused]);

  return (
    <div className="mono text-[13px] md:text-[15px] text-zinc-300 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed text-center flex flex-col items-center">
      {/* Line 1: Static */}
      <div className="mb-1">ACCELERATE YOUR</div>
      
      {/* Line 2: Dynamic + Static */}
      <div className="flex items-center justify-center whitespace-nowrap">
        <span 
          className="text-brand-purple italic transition-all duration-300"
          style={{ textShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}
        >
          {WORDS[index].substring(0, subIndex)}
          {!isPaused && subIndex > 0 && <span className="opacity-70 ml-0.5 inline-block">|</span>}
        </span>
        <span className="ml-[0.6em]">IN THE MARKETS</span>
      </div>
    </div>
  );
};

const SOCIAL_LINKS = [
  { 
    name: 'Instagram', 
    url: '#',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  },
  { 
    name: 'X', 
    url: '#',
    icon: (
      <svg className="w-[1.4rem] h-[1.4rem]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  { 
    name: 'Discord', 
    url: '#',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.249-.192.37-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.099.244.197.37.291a.077.077 0 0 1-.006.127 12.29 12.29 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z" />
      </svg>
    )
  }
];

export const Hero: React.FC<HeroProps> = React.memo(({ onStartPreview }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 overflow-hidden bg-brand-black transform-gpu scroll-mt-24 md:scroll-mt-32">
      <ConicGradient opacity={0.15} size="120%" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, ease: ANIM_SYSTEM.ease }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <img 
          src="https://raw.githubusercontent.com/afrodeennoff/ork-orginal-/25e7b64e21207cd0988dc6cf704f230b51e73b74/IMG_1213.png" 
          alt="ORK Brand Mark" 
          className="w-[100vw] h-[100vw] md:w-[80vw] md:h-[80vw] max-w-[1200px] max-h-[1200px] object-contain mix-blend-screen filter drop-shadow-[0_0_100px_rgba(139,92,246,0.12)] opacity-40 md:opacity-100"
        />
      </motion.div>

      <motion.div 
        variants={VARIANTS.staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-7xl w-full text-center flex flex-col items-center gap-6 md:gap-10"
      >
        <div className="relative flex flex-col items-center">
          <p 
            className="mono text-[10px] md:text-xs text-zinc-300 font-black uppercase tracking-[0.4em] md:tracking-[0.6em] mb-6"
            style={{ textShadow: '0 0 15px rgba(161, 161, 170, 0.45)' }}
          >
            JOIN THE ELITE
          </p>
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[13rem] font-black text-white italic tracking-tighter uppercase leading-[0.75] select-none">
            ORK
          </h1>
          <div className="md:-mt-6">
             <GhostText 
               text="TRADING"
               className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-transparent stroke-text italic tracking-tighter uppercase leading-[0.75] select-none opacity-40"
             />
          </div>
          <div className="mt-12 md:mt-10 space-y-6 px-4 max-w-2xl mx-auto">
             <div className="space-y-6">
                <RotatingHeadline />
                <p className="mono text-[10px] md:text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                  For traders who refuse to stay average. Join the ORK — a private, elite mentorship designed to turn inconsistent traders into confident, rule-based performers.
                </p>
             </div>
          </div>
        </div>

        <motion.div
          variants={VARIANTS.reveal}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full px-4 max-w-md md:max-w-none"
        >
          <motion.button
            whileHover={VARIANTS.buttonHover}
            whileTap={VARIANTS.buttonTap}
            onClick={onStartPreview}
            className={GLASS_STYLES.button + " " + GLASS_STYLES.buttonHover + " w-full sm:w-auto px-8 md:px-10 py-5 md:py-4 flex items-center justify-center min-h-[56px]"}
          >
            <span className="relative z-10 mono text-[10px] font-black text-white uppercase tracking-[0.4em] inline-block">
              ENTER DESK
            </span>
          </motion.button>
          
          <motion.a
            whileHover={VARIANTS.buttonHover}
            whileTap={VARIANTS.buttonTap}
            href="#edge"
            className={GLASS_STYLES.button + " " + GLASS_STYLES.buttonHover + " w-full sm:w-auto px-8 md:px-10 py-5 md:py-4 flex items-center justify-center min-h-[56px]"}
          >
            <span className="relative z-10 mono text-[10px] font-black text-white uppercase tracking-[0.4em] inline-block">
              VIEW METHOD
            </span>
          </motion.a>
        </motion.div>

        <motion.div 
          variants={VARIANTS.reveal}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 pt-10 md:pt-8 border-t border-white/5 w-full max-w-xl mx-auto"
        >
          {SOCIAL_LINKS.map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              className="group flex items-center transition-all duration-300 focus:outline-none"
            >
              <span className="text-zinc-600 group-hover:text-brand-purple transition-colors duration-300 flex items-center">
                {social.icon}
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1.5px rgba(255,255,255,0.4); }
      `}</style>
    </section>
  );
});