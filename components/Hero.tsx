import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, ANIM_CONSTANTS } from '../constants';

interface HeroProps {
  onStartPreview: () => void;
}

const SOCIAL_LINKS = [
  { 
    name: 'Instagram', 
    url: '#',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  },
  { 
    name: 'X', 
    url: '#',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  { 
    name: 'Discord', 
    url: '#',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.249-.192.37-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.099.244.197.37.291a.077.077 0 0 1-.006.127 12.29 12.29 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z" />
      </svg>
    )
  }
];

export const Hero: React.FC<HeroProps> = React.memo(({ onStartPreview }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden bg-brand-black transform-gpu">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 0.4, 
          scale: 1,
          transition: { duration: 1, ease: ANIM_CONSTANTS.ease }
        }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <motion.img 
          src="https://raw.githubusercontent.com/user-attachments/assets/c79f323c-5872-430b-967b-12d93e185011" 
          alt="ORK Brand Mark" 
          loading="eager"
          decoding="sync"
          // @ts-ignore
          fetchpriority="high"
          animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0.4, 0.35] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] object-contain opacity-40 mix-blend-screen filter drop-shadow-[0_0_50px_rgba(139,92,246,0.2)]"
        />
      </motion.div>

      <motion.div 
        variants={VARIANTS.staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-7xl w-full text-center space-y-12"
      >
        <motion.div variants={VARIANTS.reveal} className="relative">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[14rem] font-black text-white italic tracking-tighter uppercase leading-[0.8] select-none">
            ORK
          </h1>
          <div className="mt-[-1rem] md:mt-[-2rem]">
             <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[9rem] font-black text-transparent stroke-text italic tracking-tighter uppercase leading-[0.8] select-none opacity-20">
               TRADING
             </span>
          </div>
        </motion.div>

        <motion.div
          variants={VARIANTS.reveal}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
        >
          <motion.button
            whileHover={VARIANTS.buttonHover}
            whileTap={VARIANTS.buttonTap}
            onClick={onStartPreview}
            className="w-full sm:w-auto group relative px-12 py-6 bg-brand-purple overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.22,1,0.36,1]" />
            <span className="relative z-10 mono text-[11px] font-black text-white group-hover:text-black uppercase tracking-[0.4em]">
              START TRADING
            </span>
          </motion.button>
          
          <motion.a
            whileHover={VARIANTS.buttonHover}
            whileTap={VARIANTS.buttonTap}
            href="#education"
            className="w-full sm:w-auto group relative px-12 py-6 border border-white/20 hover:border-white overflow-hidden mono text-[11px] font-black text-white uppercase tracking-[0.4em] text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple rounded-sm"
          >
            <span className="relative z-10">VIEW THE PROCESS</span>
          </motion.a>
        </motion.div>

        <motion.div 
          variants={VARIANTS.reveal}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 pt-8 border-t border-white/5"
        >
          {SOCIAL_LINKS.map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              className="group flex items-center gap-3 mono text-[11px] text-zinc-400 hover:text-white transition-all duration-300 font-black tracking-[0.4em] uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple rounded-sm p-2"
              aria-label={`Visit ${social.name}`}
            >
              <span className="text-zinc-600 group-hover:text-brand-purple transition-colors duration-300">{social.icon}</span>
              <span className="relative overflow-hidden">
                {social.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-purple translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-[0.22,1,0.36,1]" />
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.4); }
      `}</style>
    </section>
  );
});