import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode } from '../types';
import { VARIANTS, ANIM_CONSTANTS } from '../constants';

interface HeaderProps {
  onStartPreview: () => void;
  mode: AppMode;
  onToggleMode: () => void;
}

const NavLink: React.FC<{ href: string; label: string; index: number }> = ({ href, label, index }) => (
  <motion.a
    href={href}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 + index * 0.05, ease: ANIM_CONSTANTS.ease }}
    className="relative px-4 py-2 group"
  >
    <span className="relative z-10 mono text-[10px] text-zinc-400 group-hover:text-white transition-colors duration-300 font-black tracking-[0.2em] uppercase">
      {label}
    </span>
    <span className="absolute inset-x-0 bottom-0 h-[1px] bg-brand-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-[0.22,1,0.36,1]" />
    <span className="absolute top-0 right-0 w-1 h-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.a>
);

export const Header: React.FC<HeaderProps> = ({ onStartPreview, mode, onToggleMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: ANIM_CONSTANTS.ease }}
        className="fixed top-0 left-0 right-0 z-[200] px-4 pt-4 md:px-6 md:pt-6 pointer-events-none flex justify-center"
      >
        <div className={`pointer-events-auto transition-all duration-500 ease-[0.22,1,0.36,1] ${
          scrolled ? 'w-auto max-w-[90vw]' : 'w-full max-w-7xl'
        }`}>
          <div className="bg-[#080808]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] rounded-lg md:rounded-full px-4 md:px-2 py-2 md:h-16 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-0">
            
            {/* Logo Section */}
            <div className="flex items-center justify-between md:justify-start px-4 md:border-r border-white/5 md:pr-8 h-10 md:h-auto">
               <div className="flex items-center gap-2 select-none">
                 <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">ORK</span>
                 <span className="text-xl font-black tracking-tighter text-brand-purple italic leading-none">//</span>
               </div>
               
               {/* Mobile Toggle */}
               <button 
                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                 className="md:hidden p-2 text-white focus:outline-none"
               >
                 <div className="space-y-1.5">
                   <span className={`block w-6 h-[1px] bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                   <span className={`block w-6 h-[1px] bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                   <span className={`block w-6 h-[1px] bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                 </div>
               </button>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2 px-6">
              {mode === 'STUDY' ? (
                <>
                  {['Trader', 'Edge', 'Process', 'Access'].map((item, i) => (
                    <NavLink key={item} href={`#${item.toLowerCase()}`} label={item} index={i} />
                  ))}
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 px-4 py-1.5 bg-brand-purple/10 border border-brand-purple/20 rounded-full"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                  <span className="mono text-[10px] text-brand-purple font-black tracking-[0.2em] uppercase">
                    TRADING: LIVE MARKET ACCESS
                  </span>
                </motion.div>
              )}
            </nav>

            {/* Action Section */}
            <div className="hidden md:flex items-center gap-4 pl-8 border-l border-white/5">
               <button 
                 onClick={onToggleMode}
                 className={`relative h-10 px-6 rounded-full border flex items-center gap-3 transition-all duration-300 overflow-hidden group ${
                   mode === 'STUDY' 
                     ? 'bg-zinc-900 border-white/10 hover:border-white/30' 
                     : 'bg-white border-white hover:bg-zinc-200'
                 }`}
               >
                 <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                   mode === 'STUDY' ? 'bg-zinc-500 group-hover:bg-brand-purple' : 'bg-brand-red animate-ping'
                 }`} />
                 <span className={`mono text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                   mode === 'STUDY' ? 'text-zinc-300 group-hover:text-white' : 'text-black'
                 }`}>
                   {mode === 'STUDY' ? 'OPEN DESK' : 'CLOSE DESK'}
                 </span>
               </button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          <AnimatePresence>
            {mobileMenuOpen && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className="md:hidden overflow-hidden bg-zinc-900/90 backdrop-blur-xl border-t border-white/10 mt-2 rounded-lg"
               >
                 <div className="p-6 flex flex-col gap-6">
                    {mode === 'STUDY' ? (
                      <div className="flex flex-col gap-4">
                        {['Trader', 'Edge', 'Process', 'Access'].map((item) => (
                          <a 
                            key={item} 
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="mono text-sm text-zinc-300 uppercase tracking-widest font-bold"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="mono text-xs text-brand-purple font-black uppercase tracking-widest">
                         TRADING: LIVE MARKET ACCESS
                      </span>
                    )}
                    <div className="h-[1px] bg-white/10" />
                    <button 
                       onClick={() => { onToggleMode(); setMobileMenuOpen(false); }}
                       className="w-full py-4 bg-white text-black mono text-xs font-black uppercase tracking-widest"
                    >
                       {mode === 'STUDY' ? 'OPEN DESK' : 'CLOSE DESK'}
                    </button>
                 </div>
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};
