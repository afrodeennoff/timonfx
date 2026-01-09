import React, { useState, useCallback, Suspense, lazy } from 'react';
import { Hero } from './components/Hero';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Header } from './components/Header';
import { MarketStatus } from './components/MarketStatus';
import { BackToTop } from './components/BackToTop';
import { PreviewGate } from './components/PreviewGate';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode } from './types';
import { MOTION_RULES, GLASS_STYLES } from './constants';
import { SocialProof } from './components/SocialProof';
import { LodgingPage } from './components/LodgingPage';

// Lazy load sections
const Education = lazy(() => import('./components/Education').then(m => ({ default: m.Education })));
const Pricing = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const PropFirmExplorer = lazy(() => import('./components/PropFirmExplorer').then(m => ({ default: m.PropFirmExplorer })));
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const ExecutionTerminal = lazy(() => import('./components/ExecutionTerminal').then(m => ({ default: m.ExecutionTerminal })));

const DigitalLoader = () => (
  <div className={`w-full py-8 md:py-12 flex flex-col items-center justify-center space-y-3 relative overflow-hidden bg-brand-black ${GLASS_STYLES.card} !rounded-[2.5rem]`}>
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaa2_1px,transparent_1px),linear-gradient(to_bottom,#aaa2_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
    <div className="relative z-10 flex flex-col items-center gap-2.5">
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 rounded-full bg-brand-purple animate-pulse" />
        <span className="mono text-[9px] text-brand-purple font-black tracking-[0.4em] uppercase">
          SYNCING...
        </span>
      </div>
    </div>
  </div>
);

export const App: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [mode, setMode] = useState<AppMode>('STUDY');

  const setAppMode = useCallback((newMode: AppMode) => {
    setMode(newMode);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(prev => {
      if (prev === 'STUDY') return 'EXECUTION';
      if (prev === 'EXECUTION') return 'LODGING';
      return 'STUDY';
    });
  }, []);

  const openPreview = useCallback(() => setIsPreviewOpen(true), []);
  const closePreview = useCallback(() => setIsPreviewOpen(false), []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <BackToTop />
      <PreviewGate isOpen={isPreviewOpen} onClose={closePreview} />
      
      <Header 
        onStartPreview={openPreview} 
        mode={mode}
        onToggleMode={toggleMode}
        onSetMode={setAppMode}
      />

      <MarketStatus />
      
      <main className="relative bg-transparent min-h-screen selection:bg-brand-purple selection:text-white overflow-x-hidden transform-gpu">
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {mode === 'STUDY' && (
              <motion.div 
                key="study-mode"
                initial={{ opacity: 1 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: MOTION_RULES.ease }}
                className="pt-0 pb-0"
              >
                <Hero onStartPreview={() => setAppMode('EXECUTION')} />
                <SocialProof />
                
                <Suspense fallback={<DigitalLoader />}>
                  <About onStartPreview={openPreview} />
                  <Education />
                  <Pricing onStartPreview={openPreview} />
                  <PropFirmExplorer />
                  <Testimonials />
                  <FAQ />
                  <Footer />
                </Suspense>
              </motion.div>
            )}

            {mode === 'EXECUTION' && (
              <motion.div 
                key="execution-mode"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: MOTION_RULES.ease }}
                className="pt-20 md:pt-24 px-2.5 md:px-4 min-h-[calc(100vh-80px)] flex flex-col gap-3.5 md:gap-5 pb-5 md:pb-7"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3.5 md:gap-5 flex-1 overflow-y-auto lg:overflow-hidden scrollbar-hide">
                  <div className={`p-3 md:p-3.5 lg:overflow-y-auto space-y-3.5 md:space-y-5 ${GLASS_STYLES.card} lg:col-span-1`}>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                      <span className="mono text-[10px] text-brand-purple font-black tracking-widest uppercase">DESK STATUS: ACTIVE</span>
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-xl md:text-2xl font-black italic uppercase text-white">Market Intel</h2>
                      <p className="mono text-[10px] md:text-[11px] text-zinc-400 leading-relaxed uppercase tracking-widest border-l border-brand-purple/30 pl-3.5">Awaiting session displacement. Liquidity nodes identified at 09:27 open window.</p>
                      
                      <div className="h-[1px] w-full bg-white/10 my-2.5 md:my-3.5" />
                      
                      <div className="space-y-3">
                        <span className="mono text-[9px] text-zinc-500 uppercase tracking-widest font-black italic">Key Levels [ES]</span>
                        <div className={`flex justify-between items-center p-2.5 ${GLASS_STYLES.button} rounded-xl`}>
                           <span className="mono text-xs text-brand-red font-bold tracking-tighter">4520.50</span>
                           <span className="mono text-[8px] text-zinc-500 uppercase tracking-widest font-black">Supply</span>
                        </div>
                        <div className={`flex justify-between items-center p-2.5 ${GLASS_STYLES.button} rounded-xl`}>
                           <span className="mono text-xs text-white font-bold tracking-tighter">4450.00</span>
                           <span className="mono text-[8px] text-zinc-500 uppercase tracking-widest font-black">Pivot</span>
                        </div>
                        <div className={`flex justify-between items-center p-2.5 ${GLASS_STYLES.button} rounded-xl`}>
                           <span className="mono text-xs text-green-500 font-bold tracking-tighter">4385.25</span>
                           <span className="mono text-[8px] text-zinc-500 uppercase tracking-widest font-black">Demand</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-3 h-[450px] md:h-[600px] lg:h-auto">
                    <Suspense fallback={<div className={`w-full h-full bg-zinc-900/50 ${GLASS_STYLES.card} flex items-center justify-center mono text-[10px] text-zinc-500`}>BOOTING TERMINAL...</div>}>
                      <ExecutionTerminal />
                    </Suspense>
                  </div>
                </div>
              </motion.div>
            )}

            {mode === 'LODGING' && (
              <motion.div 
                key="lodging-mode"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: MOTION_RULES.ease }}
                className="pt-20 md:pt-24 min-h-screen flex flex-col"
              >
                <LodgingPage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </SmoothScroll>
  );
};
