import React, { useState, useCallback, Suspense, lazy } from 'react';
import { Hero } from './components/Hero';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { MarketStatus } from './components/MarketStatus'; // Eager load
import { BackToTop } from './components/BackToTop'; // Eager load
import { PreviewGate } from './components/PreviewGate'; // Eager load
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { AppMode } from './types';
import { VARIANTS, ANIM_CONSTANTS } from './constants';

// Lazy load HEAVY content sections only to optimize FCP
const Education = lazy(() => import('./components/Education').then(m => ({ default: m.Education })));
const Pricing = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const PropFirmExplorer = lazy(() => import('./components/PropFirmExplorer').then(m => ({ default: m.PropFirmExplorer })));
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Framework = lazy(() => import('./components/Framework').then(m => ({ default: m.Framework })));

// Lazy load execution terminal to keep main bundle light
const ExecutionTerminal = lazy(() => import('./components/ExecutionTerminal').then(m => ({ default: m.ExecutionTerminal })));

const DigitalLoader = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-brand-purple animate-pulse" />
      <span className="mono text-[10px] text-brand-purple font-black tracking-[0.3em] uppercase animate-pulse">
        LOADING_MODULES...
      </span>
    </div>
  </div>
);

const SystemHeader: React.FC<{ 
  onStartPreview: () => void; 
  mode: AppMode;
  onToggleMode: () => void;
}> = React.memo(({ onStartPreview, mode, onToggleMode }) => {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0.92, 1]);
  const headerY = useTransform(scrollY, [0, 50], [-8, 0]);

  return (
    <motion.header 
      style={{ opacity: headerOpacity, y: headerY }}
      className="fixed top-0 left-0 right-0 z-[110] px-4 md:px-10 h-20 md:h-28 flex justify-between items-center pointer-events-none transform-gpu"
    >
       <div className="bg-[#030303]/90 backdrop-blur-3xl border border-white/15 px-6 md:px-12 h-14 md:h-20 flex items-center justify-between md:justify-start gap-6 md:gap-14 w-full md:w-auto pointer-events-auto shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center justify-center leading-[0.65] border-r border-white/10 pr-10 h-full">
            <span className="text-xl md:text-3xl font-black tracking-tighter text-white uppercase italic select-none">ORK</span>
            <span className="text-xl md:text-3xl font-black tracking-tighter text-brand-purple italic select-none">//</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-12">
             {mode === 'STUDY' ? (
               <div className="flex items-center gap-8">
                 <a href="#about" className="mono text-[11px] text-zinc-500 hover:text-white transition-colors font-black tracking-[0.2em] uppercase">Trader</a>
                 <a href="#framework" className="mono text-[11px] text-zinc-500 hover:text-white transition-colors font-black tracking-[0.2em] uppercase">Edge</a>
                 <a href="#education" className="mono text-[11px] text-zinc-500 hover:text-white transition-colors font-black tracking-[0.2em] uppercase">Process</a>
                 <a href="#pricing" className="mono text-[11px] text-zinc-500 hover:text-white transition-colors font-black tracking-[0.2em] uppercase">Access</a>
               </div>
             ) : (
               <div className="flex items-center gap-8">
                 <span className="mono text-[11px] text-white font-black tracking-[0.4em] uppercase"><span className="text-brand-purple">TRADING:</span> LIVE MARKET ACCESS</span>
               </div>
             )}
          </nav>
          <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
          <div className="flex gap-6 md:gap-10 items-center ml-auto md:ml-0">
            <motion.button 
              whileHover={VARIANTS.buttonHover}
              whileTap={VARIANTS.buttonTap}
              onClick={onToggleMode}
              className={`group relative mono text-[10px] uppercase tracking-[0.5em] font-black px-8 md:px-12 py-3 md:py-4 border overflow-hidden transition-all duration-300 ease-[0.22,1,0.36,1] focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm ${
                mode === 'STUDY' 
                  ? 'border-white/15 text-white' 
                  : 'border-white/30 text-white'
              }`}
            >
              <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.22,1,0.36,1] ${
                mode === 'STUDY' ? 'bg-brand-purple' : 'bg-white'
              }`} />
              <span className={`relative z-10 transition-colors duration-300 ${
                mode === 'STUDY' ? 'group-hover:text-white' : 'group-hover:text-black'
              }`}>
                {mode === 'STUDY' ? 'OPEN DESK' : 'CLOSE DESK'}
              </span>
            </motion.button>
          </div>
       </div>
    </motion.header>
  );
});

export const App: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [mode, setMode] = useState<AppMode>('STUDY');

  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'STUDY' ? 'EXECUTION' : 'STUDY');
  }, []);

  const openPreview = useCallback(() => setIsPreviewOpen(true), []);
  const closePreview = useCallback(() => setIsPreviewOpen(false), []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <MarketStatus />
      <BackToTop />
      <PreviewGate isOpen={isPreviewOpen} onClose={closePreview} />
      
      <SystemHeader 
        onStartPreview={openPreview} 
        mode={mode}
        onToggleMode={toggleMode}
      />
      
      <main className="relative bg-transparent min-h-screen selection:bg-brand-purple selection:text-white overflow-x-hidden transform-gpu">
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {mode === 'STUDY' ? (
              <motion.div 
                key="study-mode"
                initial={{ opacity: 1 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: ANIM_CONSTANTS.ease }}
              >
                <Hero onStartPreview={openPreview} />
                
                <Suspense fallback={<DigitalLoader />}>
                  <About onStartPreview={openPreview} />
                  <Framework />
                  <Education />
                  <Pricing onStartPreview={openPreview} />
                  <PropFirmExplorer />
                  <Testimonials onStartPreview={openPreview} />
                  <FAQ />
                </Suspense>
              </motion.div>
            ) : (
              <motion.div 
                key="execution-mode"
                initial={{ opacity: 0, scale: 0.99 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3, ease: ANIM_CONSTANTS.ease }}
                className="pt-24 md:pt-32 px-4 md:px-12 min-h-screen flex flex-col gap-6 md:gap-8 pb-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 flex-1 overflow-y-auto lg:overflow-hidden scrollbar-hide">
                  <div className="bg-zinc-950/60 border border-white/15 p-8 md:p-12 lg:overflow-y-auto space-y-10 backdrop-blur-3xl shadow-2xl">
                    <span className="mono text-[11px] text-brand-purple font-black tracking-widest uppercase">DESK STATUS: ACTIVE</span>
                    <div className="space-y-6">
                      <h2 className="text-3xl font-black italic uppercase text-white">Market Intel</h2>
                      <p className="mono text-xs text-zinc-400 leading-relaxed uppercase tracking-widest">Awaiting session displacement. Liquidity nodes identified at 09:27 open window.</p>
                      
                      <div className="h-[1px] w-full bg-white/10 my-8" />
                      
                      <div className="space-y-4">
                        <span className="mono text-[9px] text-zinc-500 uppercase tracking-widest font-black">Key Levels [ES]</span>
                        <div className="flex justify-between items-center p-3 border border-white/5 bg-white/5">
                           <span className="mono text-xs text-brand-red font-bold">4520.50</span>
                           <span className="mono text-[9px] text-zinc-500 uppercase">Weekly Supply</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border border-white/5 bg-white/5">
                           <span className="mono text-xs text-white font-bold">4450.00</span>
                           <span className="mono text-[9px] text-zinc-500 uppercase">Mid-Pivot</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border border-white/5 bg-white/5">
                           <span className="mono text-xs text-green-500 font-bold">4385.25</span>
                           <span className="mono text-[9px] text-zinc-500 uppercase">Demand Base</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 h-[600px] lg:h-auto">
                    <Suspense fallback={<div className="w-full h-full bg-zinc-900 animate-pulse border border-white/10" />}>
                      <ExecutionTerminal />
                    </Suspense>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </SmoothScroll>
  );
};
