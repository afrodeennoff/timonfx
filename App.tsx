import React, { useState, useCallback, Suspense, lazy } from 'react';
import { Hero } from './components/Hero';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Header } from './components/Header';
import { MarketStatus } from './components/MarketStatus'; // Eager load
import { BackToTop } from './components/BackToTop'; // Eager load
import { PreviewGate } from './components/PreviewGate'; // Eager load
import { motion, AnimatePresence } from 'framer-motion';
import { AppMode } from './types';
import { ANIM_CONSTANTS } from './constants';

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
  <div className="w-full py-48 flex flex-col items-center justify-center space-y-8 relative overflow-hidden bg-brand-black">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaa2_1px,transparent_1px),linear-gradient(to_bottom,#aaa2_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
    <div className="relative z-10 flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-brand-purple animate-pulse" />
        <span className="mono text-[11px] text-brand-purple font-black tracking-[0.5em] uppercase animate-pulse">
          INITIALIZING_PROTOCOL...
        </span>
      </div>
      <div className="h-[2px] w-48 bg-white/5 overflow-hidden rounded-full">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-full w-full bg-brand-purple/50"
        />
      </div>
      <span className="mono text-[9px] text-zinc-600 font-black tracking-widest uppercase">
        Verifying_Liquidty_Nodes...
      </span>
    </div>
  </div>
);

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
      
      <Header 
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