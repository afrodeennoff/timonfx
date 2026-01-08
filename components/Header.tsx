import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode } from '../types';
import { VARIANTS, ANIM_SYSTEM, GLASS_STYLES } from '../constants';

interface HeaderProps {
  onStartPreview: () => void;
  mode: AppMode;
  onToggleMode: () => void;
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
    // Lenis is present in the project, so a simple scrollIntoView or 
    // window.scrollTo with the right offset will be intercepted and smoothed.
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
    transition={{ delay: 0.1 + index * 0.05, ease: ANIM_SYSTEM.ease }}
    className="relative px-3 py-2 group focus:outline-none"
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

export const Header: React.FC<HeaderProps> = ({ onStartPreview, mode, onToggleMode }) => {
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
        transition={{ duration: 0.6, ease: ANIM_SYSTEM.ease }}
        className="fixed top-0 left-0 right-0 z-[200] px-4 pt-4 md:px-6 md:pt-6 pointer-events-none flex justify-center"
      >
        <div className={`pointer-events-auto transition-all duration-500 ease-[0.22,1,0.36,1] ${
          scrolled ? 'w-auto max-w-[90vw]' : 'w-full max-w-7xl'
        }`}>
          <div className={`border border-white/10 rounded-full px-4 md:px-2 py-2 md:h-16 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-0 ${GLASS_STYLES.card}`}>
            
            <div className="flex items-center justify-between md:justify-start px-4 md:border-r border-white/5 md:pr-8 h-10 md:h-auto">
               <button 
                 onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
                 className="flex items-center gap-2 select-none group focus:outline-none"
               >
                 <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none group-hover:text-brand-purple transition-colors">ORK</span>
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

            <nav className="hidden md:flex items-center gap-1 px-4">
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
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 px-5 py-2 bg-brand-purple/10 border border-brand-purple/20 rounded-full"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                  <span className="mono text-[10px] text-brand-purple font-black tracking-[0.2em] uppercase">
                    TRADING: LIVE MARKET ACCESS
                  </span>
                </motion.div>
              )}
            </nav>

            <div className="hidden md:flex items-center gap-4 pl-8 border-l border-white/5">
               {mode === 'STUDY' ? (
                 <motion.button 
                   onClick={(e) => { e.preventDefault(); scrollToSection('join'); }}
                   whileHover={VARIANTS.buttonHover}
                   whileTap={VARIANTS.buttonTap}
                   className={`relative h-11 px-7 rounded-full flex items-center gap-3 transition-all duration-300 overflow-hidden group focus:outline-none ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} ${activeSection === 'join' ? 'border-brand-purple/60' : ''}`}
                 >
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                   <span className={`mono text-[10px] font-black uppercase tracking-[0.2em] ${activeSection === 'join' ? 'text-brand-purple' : 'text-white'}`}>
                     JOIN
                   </span>
                 </motion.button>
               ) : (
                 <button 
                   onClick={onToggleMode}
                   className="relative h-11 px-7 rounded-full flex items-center gap-3 transition-all duration-300 overflow-hidden bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-zinc-200 focus:outline-none"
                 >
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping" />
                   <span className="mono text-[10px] font-black uppercase tracking-[0.2em]">
                     CLOSE DESK
                   </span>
                 </button>
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
                 <div className="p-6 flex flex-col gap-6">
                    {mode === 'STUDY' ? (
                      <div className="flex flex-col gap-6">
                        {NAV_ITEMS.map((item) => (
                          <button 
                            key={item.label} 
                            onClick={(e) => { e.preventDefault(); scrollToSection(item.id); handleMobileNavClick(); }}
                            className={`mono text-left text-sm uppercase tracking-widest font-black transition-colors focus:outline-none ${
                              activeSection === item.id ? 'text-brand-purple' : 'text-zinc-300'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="mono text-xs text-brand-purple font-black uppercase tracking-widest">
                         TRADING: LIVE MARKET ACCESS
                      </span>
                    )}
                    <div className="h-[1px] bg-white/10" />
                    {mode === 'STUDY' ? (
                      <button 
                         onClick={(e) => { e.preventDefault(); scrollToSection('join'); handleMobileNavClick(); }}
                         className={`w-full py-5 rounded-full mono text-xs font-black uppercase text-center tracking-widest bg-brand-purple text-white shadow-[0_10px_30px_rgba(139,92,246,0.3)] focus:outline-none`}
                      >
                         JOIN
                      </button>
                    ) : (
                      <button 
                         onClick={() => { onToggleMode(); setMobileMenuOpen(false); }}
                         className="w-full py-5 rounded-full mono text-xs font-black uppercase tracking-widest bg-white text-black focus:outline-none"
                      >
                         CLOSE DESK
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