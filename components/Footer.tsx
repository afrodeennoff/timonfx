import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_NAME, GLASS_STYLES, ANIM_SYSTEM } from '../constants';

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

const FooterLink: React.FC<{ id: string; label: string }> = ({ id, label }) => (
  <button 
    onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
    className="mono text-left text-[10px] text-zinc-500 hover:text-brand-purple uppercase tracking-[0.2em] font-black transition-colors duration-300 focus:outline-none"
  >
    {label}
  </button>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative pt-12 pb-8 px-6 bg-brand-black overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/5">
          
          {/* Identity Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">{BRAND_NAME}</span>
              <span className="text-xl font-black tracking-tighter text-brand-purple italic leading-none">//</span>
            </div>
            <p className="mono text-[9px] text-zinc-500 uppercase tracking-widest leading-relaxed max-w-xs font-bold italic">
              Professional execution framework built for disciplined operators. We focus on structure, liquidity, and risk control.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-1 h-1 rounded-full bg-brand-purple shadow-[0_0_6px_rgba(139,92,246,0.3)]" />
              <span className="mono text-[8px] text-brand-purple uppercase tracking-[0.4em] font-black">SYSTEM_ACTIVE</span>
            </div>
          </div>

          {/* Navigation Indices */}
          <div className="md:col-span-3 space-y-4">
            <span className="mono text-[9px] text-zinc-700 uppercase tracking-[0.6em] font-black">Indices</span>
            <nav className="flex flex-col gap-3">
              <FooterLink id="about" label="Trader Profile" />
              <FooterLink id="edge" label="Methodology" />
              <FooterLink id="join" label="Protocol Access" />
              <FooterLink id="coupon" label="Funding Dossier" />
            </nav>
          </div>

          {/* Connect & Specs */}
          <div className="md:col-span-3 space-y-4">
            <span className="mono text-[9px] text-zinc-700 uppercase tracking-[0.6em] font-black">Connect</span>
            <nav className="flex flex-col gap-3">
              <a href="#" className="mono text-[10px] text-zinc-500 hover:text-brand-purple uppercase tracking-[0.2em] font-black transition-colors duration-300">Instagram</a>
              <a href="#" className="mono text-[10px] text-zinc-500 hover:text-brand-purple uppercase tracking-[0.2em] font-black transition-colors duration-300">X (Twitter)</a>
              <a href="#" className="mono text-[10px] text-zinc-500 hover:text-brand-purple uppercase tracking-[0.2em] font-black transition-colors duration-300">Discord Hub</a>
            </nav>
          </div>

          {/* Location Info */}
          <div className="md:col-span-2 space-y-4 md:text-right flex flex-col items-start md:items-end">
             <span className="mono text-[9px] text-zinc-700 uppercase tracking-[0.6em] font-black">Clearance</span>
             <div className={`p-3 rounded-xl ${GLASS_STYLES.card} !bg-zinc-950/20 w-full md:w-auto`}>
                <span className="mono text-[10px] text-white font-black tracking-widest uppercase italic">LEVEL_04</span>
             </div>
          </div>
        </div>

        {/* Legal & Meta */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4 opacity-40">
              <span className="mono text-[8px] text-zinc-500 uppercase tracking-widest font-black">
                © {currentYear} {BRAND_NAME} SYSTEMS
              </span>
              <div className="h-2 w-[1px] bg-white/10 hidden md:block" />
              <span className="mono text-[8px] text-zinc-600 uppercase tracking-[0.3em] font-black">
                DESIGNED FOR DISCIPLINE
              </span>
           </div>

           <div className="flex items-center gap-6 opacity-40">
              <span className="mono text-[8px] text-zinc-700 uppercase tracking-[0.3em] font-black">
                v4.2.0_FINAL
              </span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-0.5 h-0.5 bg-zinc-800 rounded-full" />
                ))}
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};