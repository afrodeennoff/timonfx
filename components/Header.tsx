import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode } from '../types';
import { VARIANTS, MOTION_RULES, GLASS_STYLES } from '../constants';

interface HeaderProps {
  onStartPreview: () => void;
  mode: AppMode;
  onToggleMode: () => void;
  onSetMode: (mode: AppMode) => void;
}

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Coupon', id: 'coupon' },
  { label: 'Testimonial', id: 'testimonial' },
  { label: 'FAQ', id: 'faq' }
];

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

const NavLink: React.FC<{ 
  id: string; 
  label: string; 
  index: number; 
  isActive: boolean;
  onClick: () => void;
}> = ({ id, label, index, isActive, onClick }) => (
  <motion.button
    onClick={(e) => {
      e.preventDefault();
      scrollToSection(id);
      onClick();
    }}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 + index * 0.05, ease: MOTION_RULES.ease }}
    className="relative px-2 py-0.5 group focus:outline-none whitespace-nowrap"
  >
    <span className={`relative z-10 mono text-[10px] transition-colors duration-300 font-black tracking-[0.2em] uppercase ${
      isActive ? 'text-brand-purple' : 'text-zinc-400 group-hover:text-white'
    }`}>
      {label}
    </span>
    <span className={`absolute inset-x-0 bottom-0 h-[1px] bg-brand-purple transition-transform duration-300 origin-left ease-[0.22,1,0.36,1] ${
      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
    }`} />
  </motion.button>
);

export const Header: React.FC<HeaderProps> = ({ onStartPreview, mode, onToggleMode, onSetMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const idsToObserve = ['hero', 'about', 'coupon', 'testimonial', 'faq', 'join'];
    
    idsToObserve.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleMobileNavClick = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: MOTION_RULES.ease }}
        className="fixed top-0 left-0 right-0 z-[200] px-2.5 pt-2 md:pt-3 pointer-events-none flex justify-center"
      >
        <div className={`pointer-events-auto transition-all duration-500 ease-[0.22,1,0.36,1] ${
          scrolled ? 'w-auto max-w-[90vw]' : 'w-full max-w-7xl'
        } group/main`}>
          <div className={`border border-white/15 rounded-full px-2.5 md:px-2 py-3 md:h-16 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-0 ${GLASS_STYLES.card}`}>
            <div className="absolute inset-[1px] rounded-full pointer-events-none opacity-0 group-hover/main:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 rounded-full border border-brand-purple/20 blur-[2px] opacity-70" />
              <div className="absolute inset-0 rounded-full border border-white/5 opacity-50" />
            </div>
            
            <div className="flex items-center justify-between md:justify-start px-2.5 md:border-r border-white/5 md:pr-6 h-7 md:h-auto relative z-10">
               <button 
                 onClick={(e) => { e.preventDefault(); onSetMode('STUDY'); scrollToSection('hero'); }}
                 className="flex items-center gap-2 select-none group focus:outline-none whitespace-nowrap"
               >
                 <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none group-hover:text-brand-purple transition-colors">TIMON</span>
                 <span className="text-xl font-black tracking-tighter text-brand-purple italic leading-none">//</span>
               </button>
               
               <button 
                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                 className="md:hidden p-2 text-white focus:outline-none"
                 aria-label="Toggle Menu"
               >
                 <div className="space-y-1.5">
                   <span className={`block w-6 h-[1px] bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                   <span className={`block w-6 h-[1px] bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                   <span className={`block w-6 h-[1px] bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                 </div>
               </button>
            </div>

            <nav className="hidden md:flex items-center gap-2 px-3 relative z-10">
              {mode === 'STUDY' ? (
                <>
                  {NAV_ITEMS.map((item, i) => (
                    <NavLink 
                      key={item.label} 
                      id={item.id} 
                      label={item.label} 
                      index={i} 
                      isActive={activeSection === item.id}
                      onClick={handleMobileNavClick}
                    />
                  ))}
                </>
              ) : (
                <div className="flex items-center gap-2">
                   <button 
                     onClick={() => onSetMode('EXECUTION')}
                     className={`px-4 py-1.5 rounded-full mono text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'EXECUTION' ? 'bg-white/10 text-white' : 'text-zinc-600 hover:text-white'}`}
                   >
                     TERMINAL
                   </button>
                   <button 
                     onClick={() => onSetMode('LODGING')}
                     className={`px-4 py-1.5 rounded-full mono text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'LODGING' ? 'bg-white/10 text-white' : 'text-zinc-600 hover:text-white'}`}
                   >
                     LOGS
                   </button>
                </div>
              )}
            </nav>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/5 relative z-10">
               {mode === 'STUDY' ? (
                 <motion.button 
                   onClick={(e) => { e.preventDefault(); scrollToSection('join'); }}
                   whileHover={VARIANTS.buttonHover}
                   whileTap={VARIANTS.buttonTap}
                   className={`${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} ${activeSection === 'join' ? 'border-brand-purple/60' : ''} px-6 py-3 gap-2 focus:outline-none whitespace-nowrap`}
                 >
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.5)] relative z-10" />
                   <span className={`mono text-[10px] font-black uppercase tracking-[0.2em] relative z-10 ${activeSection === 'join' ? 'text-brand-purple' : 'text-white'}`}>
                     JOIN
                   </span>
                 </motion.button>
               ) : (
                 <motion.button 
                   whileHover={VARIANTS.buttonHover}
                   whileTap={VARIANTS.buttonTap}
                   onClick={() => onSetMode('STUDY')}
                   className={`${GLASS_STYLES.accentButton} ${GLASS_STYLES.accentButtonHover} px-6 py-3 gap-2 focus:outline-none whitespace-nowrap`}
                 >
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping relative z-10" />
                   <span className="mono text-[10px] font-black uppercase tracking-[0.2em] relative z-10">
                     EXIT DESK
                   </span>
                 </motion.button>
               )}
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className={`md:hidden overflow-hidden mt-2 rounded-[1.5rem] ${GLASS_STYLES.card}`}
               >
                 <div className="p-3.5 flex flex-col gap-3.5">
                    {mode === 'STUDY' ? (
                      <div className="flex flex-col gap-3.5">
                        {NAV_ITEMS.map((item) => (
                          <button 
                            key={item.label} 
                            onClick={(e) => { e.preventDefault(); scrollToSection(item.id); handleMobileNavClick(); }}
                            className={`mono text-left text-sm uppercase tracking-widest font-black transition-colors focus:outline-none whitespace-nowrap ${
                              activeSection === item.id ? 'text-brand-purple' : 'text-zinc-300'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <button onClick={() => { onSetMode('EXECUTION'); setMobileMenuOpen(false); }} className={`mono text-left text-sm font-black uppercase tracking-widest ${mode === 'EXECUTION' ? 'text-brand-purple' : 'text-zinc-400'}`}>TERMINAL</button>
                        <button onClick={() => { onSetMode('LODGING'); setMobileMenuOpen(false); }} className={`mono text-left text-sm font-black uppercase tracking-widest ${mode === 'LODGING' ? 'text-brand-purple' : 'text-zinc-400'}`}>LOGS</button>
                      </div>
                    )}
                    <div className="h-[1px] bg-white/10" />
                    {mode === 'STUDY' ? (
                      <button 
                         onClick={(e) => { e.preventDefault(); scrollToSection('join'); handleMobileNavClick(); }}
                         className={`w-full px-6 py-3 rounded-full mono text-xs font-black uppercase text-center tracking-widest bg-brand-purple text-white shadow-[0_10px_30px_rgba(139,92,246,0.3)] transition-all duration-300 focus:outline-none whitespace-nowrap`}
                      >
                         JOIN
                      </button>
                    ) : (
                      <button 
                         onClick={() => { onSetMode('STUDY'); setMobileMenuOpen(false); }}
                         className={`w-full px-6 py-3 rounded-full mono text-xs font-black uppercase tracking-widest ${GLASS_STYLES.accentButton} ${GLASS_STYLES.accentButtonHover} text-white focus:outline-none whitespace-nowrap`}
                      >
                         EXIT DESK
                      </button>
                    )}
                 </div>
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};
