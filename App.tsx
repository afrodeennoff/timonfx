
import React, { useState, useCallback } from 'react';
import { MarketStatus } from './components/MarketStatus';
import { Background3D } from './components/Background3D';
import { CustomCursor } from './components/CustomCursor';
import { PreviewGate } from './components/PreviewGate';
import { BackToTop } from './components/BackToTop';
import { SmoothScroll } from './components/SmoothScroll';
import { AIStrategyArchitect } from './components/AIStrategyArchitect';
import { Hero } from './components/Hero';
import { Education } from './components/Education';
import { Pricing } from './components/Pricing';
import { PropFirmExplorer } from './components/PropFirmExplorer';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Framework } from './components/Framework';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { AppMode } from './types';

// Memoized Header to prevent re-renders on parent state changes
const SystemHeader: React.FC<{ 
  onStartPreview: () => void; 
  onOpenAI: () => void;
  mode: AppMode;
  onToggleMode: () => void;
}> = React.memo(({ onStartPreview, onOpenAI, mode, onToggleMode }) => {
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
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenAI}
              aria-label="Open Market Insights Chat"
              className="group relative mono text-[10px] text-brand-purple hover:text-white uppercase tracking-[0.4em] font-black flex items-center gap-3 transition-colors px-4 py-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple rounded-sm"
            >
              <span className="w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_15px_rgba(139,92,246,1)] group-hover:scale-125 transition-transform duration-500" />
              <span className="hidden sm:inline">INSIGHTS</span>
              <span className="sm:hidden">INSIGHTS</span>
              <div className="absolute inset-0 bg-brand-purple/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={onToggleMode}
              aria-label={mode === 'STUDY' ? 'Enter Trading Desk Mode' : 'Exit Trading Desk Mode'}
              className={`group relative mono text-[10px] uppercase tracking-[0.5em] font-black px-8 md:px-12 py-3 md:py-4 border overflow-hidden transition-all duration-600 ease-[0.19,1,0.22,1] focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm ${
                mode === 'STUDY' 
                  ? 'border-white/15 text-white hover:border-brand-purple hover:text-brand-purple' 
                  : 'border-white/30 text-white hover:border-white'
              }`}
            >
              <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.19,1,0.22,1] ${
                mode === 'STUDY' ? 'bg-brand-purple' : 'bg-white'
              }`} />
              <span className={`relative z-10 transition-colors duration-400 ${
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
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [mode, setMode] = useState<AppMode>('STUDY');

  // Stable handlers
  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'STUDY' ? 'EXECUTION' : 'STUDY');
  }, []);

  const openPreview = useCallback(() => setIsPreviewOpen(true), []);
  const closePreview = useCallback(() => setIsPreviewOpen(false), []);
  
  const openAI = useCallback(() => setIsAIOpen(true), []);
  const closeAI = useCallback(() => setIsAIOpen(false), []);

  return (
    <SmoothScroll>
      <main className="relative bg-brand-black min-h-screen selection:bg-brand-purple selection:text-white overflow-x-hidden transform-gpu">
        <CustomCursor />
        <BackToTop />
        <MarketStatus />
        <Background3D />
        
        <SystemHeader 
          onStartPreview={openPreview} 
          onOpenAI={openAI}
          mode={mode}
          onToggleMode={toggleMode}
        />
        
        <PreviewGate isOpen={isPreviewOpen} onClose={closePreview} />
        <AIStrategyArchitect isOpen={isAIOpen} onClose={closeAI} />

        <div className="relative z-10 transition-all duration-700">
          <AnimatePresence mode="wait">
            {mode === 'STUDY' ? (
              <motion.div 
                key="study-mode"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <Hero onStartPreview={openPreview} />
                <About onStartPreview={openPreview} />
                <Framework />
                <Education />
                <Pricing onStartPreview={openPreview} />
                <PropFirmExplorer />
                <Testimonials onStartPreview={openPreview} />
                <FAQ />
              </motion.div>
            ) : (
              <motion.div 
                key="execution-mode"
                initial={{ opacity: 0, scale: 1.01 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className="pt-24 md:pt-32 px-4 md:px-12 min-h-screen flex flex-col gap-6 md:gap-8 pb-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 flex-1 overflow-y-auto lg:overflow-hidden scrollbar-hide">
                  <div className="bg-zinc-950/60 border border-white/15 p-8 md:p-12 lg:overflow-y-auto space-y-10 backdrop-blur-3xl shadow-2xl">
                    <span className="mono text-[11px] text-brand-purple uppercase tracking-[0.5em] font-black text-glow">[ MARKET DATA ]</span>
                    <div className="space-y-6 md:space-y-10">
                       <div className="p-6 md:p-8 border border-white/10 bg-black/40">
                          <span className="mono text-[10px] text-zinc-600 uppercase block mb-4 font-black tracking-widest">BIAS</span>
                          <p className="mono text-sm md:text-base text-white uppercase font-black tracking-widest italic">BULLISH TREND CONFIRMED</p>
                       </div>
                       <div className="p-6 md:p-8 border border-white/10 bg-black/40">
                          <span className="mono text-[10px] text-zinc-600 uppercase block mb-4 font-black tracking-widest">STRUCTURE</span>
                          <p className="mono text-sm md:text-base text-white uppercase font-black tracking-widest italic">H4 BREAK VALIDATED</p>
                       </div>
                       <div className="p-6 md:p-8 border border-white/10 bg-black/40">
                          <span className="mono text-[10px] text-zinc-600 uppercase block mb-4 font-black tracking-widest">LEVELS</span>
                          <p className="mono text-[11px] md:text-xs text-zinc-200 uppercase leading-loose tracking-[0.2em] font-bold">
                            NQ 18420 LIQUIDITY SWEEP<br/>ES 5120 OPENING GAP
                          </p>
                       </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1 bg-black/90 border border-white/20 p-8 md:p-14 flex flex-col gap-10 relative overflow-hidden backdrop-blur-3xl shadow-3xl">
                    <div className="flex justify-between items-center border-b border-white/10 pb-8 md:pb-12">
                      <span className="mono text-[11px] text-white uppercase tracking-[0.6em] font-black">FEED</span>
                      <div className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                        <span className="mono text-[10px] text-brand-purple font-black tracking-[0.2em]">LIVE</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-6 mono text-[12px] md:text-[14px] text-zinc-200 overflow-y-auto pr-6 font-medium tracking-[0.1em] min-h-[250px] scrollbar-hide">
                      <p className="text-zinc-600 font-black tracking-widest uppercase">[09:27] ANCHOR FOUND // MOMENTUM</p>
                      <p className="text-white border-l-2 border-brand-purple pl-6 font-black tracking-widest py-2 bg-brand-purple/5 uppercase">WATCHING MOMENTUM AT THE OPEN</p>
                      <p className="text-zinc-600 font-black tracking-widest uppercase">[09:34] LIQUIDITY AT HIGHS</p>
                      <div className="w-full h-[1px] bg-white/10 my-6" />
                      <p className="text-zinc-300 font-black tracking-widest uppercase">[RISK] DEFINED</p>
                    </div>
                    <div className="bg-brand-purple/10 border border-brand-purple/20 p-8 md:p-10 shadow-[0_0_40px_rgba(139,92,246,0.1)]">
                      <span className="mono text-[10px] text-brand-purple uppercase block mb-6 font-black tracking-[0.4em]">WATCHLIST</span>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase">WAITING FOR CONFIRMATION</span>
                        <div className="w-4 h-4 bg-brand-purple rounded-full shadow-[0_0_20px_rgba(139,92,246,1)]" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-950/60 border border-white/15 p-8 md:p-12 lg:overflow-y-auto space-y-10 backdrop-blur-3xl shadow-2xl">
                    <span className="mono text-[11px] text-zinc-100 uppercase tracking-[0.6em] font-black text-glow">[ CHECKLIST ]</span>
                    <div className="space-y-6 md:space-y-8">
                      {['STRUCTURE ALIGNED', 'LIQUIDITY SWEEP', 'TIMING CORRECT', 'RISK DEFINED', 'TARGETS SET'].map((item, i) => (
                        <motion.div 
                          key={item} 
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-6 group cursor-pointer"
                        >
                          <div className="w-5 h-5 border border-white/15 flex items-center justify-center group-hover:border-brand-purple transition-all duration-400 bg-black/60 relative overflow-hidden">
                             <div className="absolute inset-0 bg-brand-purple/15 scale-0 group-hover:scale-100 transition-transform duration-400" />
                             <span className="relative mono text-[9px] text-brand-purple opacity-0 group-hover:opacity-100 transition-opacity font-black">OK</span>
                          </div>
                          <span className="mono text-[11px] text-zinc-400 uppercase tracking-[0.2em] font-black group-hover:text-white transition-colors duration-400">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="pt-10 md:pt-14 border-t border-white/10">
                       <span className="mono text-[10px] text-zinc-600 uppercase block mb-6 font-black tracking-[0.4em]">DAILY RISK</span>
                       <div className="flex justify-between items-center text-sm md:text-lg font-black text-white mono italic tracking-widest bg-brand-red/10 p-6 border border-brand-red/20 shadow-[0_0_30px_rgba(255,30,30,0.05)]">
                          <span>MAX LOSS:</span>
                          <span className="text-brand-red">$1,500.00</span>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="py-24 md:py-48 px-6 md:px-14 bg-brand-black border-t border-white/15 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-32 relative z-10">
               <div className="space-y-8">
                  <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase select-none">ORK <span className="text-brand-purple">//</span></h2>
                  <p className="mono text-[11px] text-zinc-600 uppercase tracking-[0.4em] leading-relaxed max-w-sm font-black">
                    Professional trading standards.<br/>
                    Risk-focused process. Disciplined approach.
                  </p>
               </div>
               <div className="grid grid-cols-2 gap-12 md:gap-32">
                  <div className="space-y-10">
                    <span className="mono text-[11px] text-brand-purple uppercase tracking-[0.6em] font-black">Links</span>
                    <ul className="space-y-6">
                        <li><a href="#about" className="group relative text-[11px] mono uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all duration-500 font-black inline-block p-1">About<span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-purple group-hover:w-full transition-all duration-500" /></a></li>
                        <li><a href="#education" className="group relative text-[11px] mono uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all duration-500 font-black inline-block p-1">Process<span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-purple group-hover:w-full transition-all duration-500" /></a></li>
                        <li><a href="#pricing" className="group relative text-[11px] mono uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all duration-500 font-black inline-block p-1">Access<span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-purple group-hover:w-full transition-all duration-500" /></a></li>
                    </ul>
                  </div>
                  <div className="space-y-10">
                    <span className="mono text-[11px] text-zinc-500 uppercase tracking-[0.6em] font-black">Socials</span>
                    <ul className="space-y-6">
                        {['X / Feed', 'YouTube', 'Discord'].map(i => (
                            <li key={i}>
                              <a 
                                href="#" 
                                className="group relative text-[11px] mono uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-all duration-500 font-black inline-block focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple rounded-sm p-1"
                              >
                                {i}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" />
                              </a>
                            </li>
                        ))}
                    </ul>
                  </div>
               </div>
            </div>
            
            <div className="max-w-7xl mx-auto mt-24 md:mt-48 pt-10 md:pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-14 opacity-80">
              <span className="mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-zinc-700 text-center md:text-left font-black">
                © 2024 ORK TRADING // LIVE DESK // TRADING PROCESS
              </span>
              <div className="flex gap-10 md:gap-14 items-center">
                  <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                    <span className="mono text-[10px] text-white uppercase tracking-[0.3em] font-black">LIVE</span>
                  </div>
                  <div className="w-[1px] h-6 bg-white/20" />
                  <span className="mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-black">LIVE FEED</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </SmoothScroll>
  );
};
