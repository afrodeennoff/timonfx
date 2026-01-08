import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { VARIANTS, ANIM_SYSTEM, GLASS_STYLES, MOTION_KILL_SWITCH } from '../constants';
import { ConicGradient } from './ConicGradient';
import { GhostText } from './GhostText';
import { GoogleGenAI } from "@google/genai";

interface AboutProps {
  onStartPreview: () => void;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.readAsDataURL(blob);
  });
};

export const About: React.FC<AboutProps> = ({ onStartPreview }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState('');

  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Map relative position to pixel movement (-15px to 15px range for subtle effect)
  const moveX = useTransform(springX, [-1, 1], [-15, 15]);
  const moveY = useTransform(springY, [-1, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (MOTION_KILL_SWITCH) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Normalize to -1 to 1 range
    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleGenerateLogo = async () => {
    try {
      setIsGenerating(true);
      setGenerationStep('ANALYZING_DNA');
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let referencePart = null;

      try {
        setGenerationStep('EXTRACTING_REFERENCE');
        const response = await fetch('metimon.png');
        if (response.ok) {
          const blob = await response.blob();
          const base64 = await blobToBase64(blob);
          referencePart = {
            inlineData: {
              data: base64,
              mimeType: 'image/png'
            }
          };
        }
      } catch (e) {
        console.warn("Base reference fetch failed, proceeding with text-only prompt.");
      }

      setGenerationStep('SYNTHESIZING_MARK');
      
      const textPart = {
        text: 'Generate a professional, minimalist trading logo for "ORK TRADING". The design must be a sleek, modern, and high-tech abstract mark that represents precision and market flow. Use the provided image as a conceptual base but elevate it to a premium, billionaire-tier trading firm standard. High contrast, dark mode optimized, purple and silver accents, vector style.'
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: referencePart ? [referencePart, textPart] : [textPart] },
      });

      setGenerationStep('FINALIZING_VECTORS');

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64 = part.inlineData.data;
          setGeneratedLogo(`data:image/png;base64,${base64}`);
          break;
        }
      }
    } catch (error) {
      console.error('Logo generation failed:', error);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  return (
    <motion.section 
      id="about" 
      initial="initial"
      whileInView="animate"
      viewport={ANIM_SYSTEM.viewport}
      variants={VARIANTS.staggerContainer}
      className="py-12 md:py-16 px-6 bg-brand-black relative overflow-hidden transform-gpu scroll-mt-24 md:scroll-mt-32"
    >
      <ConicGradient opacity={0.05} size="100%" />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.1]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15vw] font-black text-white italic tracking-tighter select-none whitespace-nowrap">
          <GhostText text="TIMON // TRADER" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center relative z-10">
         <motion.div 
           variants={VARIANTS.reveal} 
           className="w-full lg:w-5/12 relative group"
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}
         >
            <div className={`aspect-[4/5] overflow-hidden relative border border-white/10 shadow-2xl flex items-center justify-center p-8 rounded-[2.5rem] ${GLASS_STYLES.card}`}>
               <motion.img 
                 src="https://raw.githubusercontent.com/afrodeennoff/ork-orginal-/25e7b64e21207cd0988dc6cf704f230b51e73b74/IMG_1213.png" 
                 alt="ORK Trading Logo" 
                 style={{ 
                   x: !MOTION_KILL_SWITCH ? moveX : 0, 
                   y: !MOTION_KILL_SWITCH ? moveY : 0,
                   scale: 1.05 
                 }}
                 className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-700 ease-[0.22,1,0.36,1]"
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <motion.div 
              variants={VARIANTS.reveal}
              className={`absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-36 md:w-48 p-5 md:p-6 shadow-2xl rounded-[1.5rem] ${GLASS_STYLES.card}`}
            >
               <span className="mono text-[8px] text-brand-purple uppercase tracking-[0.5em] font-black">HEAD TRADER</span>
               <p className="mt-2 mono text-[11px] md:text-[13px] text-white uppercase font-black italic tracking-widest leading-none">TIMON</p>
               <p className="mt-1.5 mono text-[7px] text-zinc-600 uppercase tracking-widest font-black">FOCUS: EXECUTION</p>
            </motion.div>
         </motion.div>

         <div className="w-full lg:w-7/12 space-y-6">
            <motion.div variants={VARIANTS.reveal} className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {generatedLogo ? (
                      <motion.img 
                        key="generated"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={generatedLogo} 
                        alt="Refined Identity" 
                        className="h-10 w-auto block filter drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]" 
                      />
                    ) : (
                      <motion.img 
                        key="original"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src="metimon.png" 
                        alt="Metimon Logo" 
                        className="h-7 w-auto block" 
                      />
                    )}
                  </AnimatePresence>
                </div>
                
                <button 
                  onClick={handleGenerateLogo}
                  disabled={isGenerating}
                  className={`mono text-[8px] font-black tracking-widest uppercase px-4 py-2 rounded-full border border-white/10 hover:border-brand-purple/40 hover:bg-brand-purple/5 transition-all flex items-center gap-2 ${isGenerating ? 'opacity-50 cursor-wait' : ''}`}
                >
                  <span className={`w-1 h-1 rounded-full ${isGenerating ? 'bg-brand-purple animate-ping' : 'bg-brand-purple/40'}`} />
                  {isGenerating ? 'SYNTHESIZING...' : 'REFINE IDENTITY'}
                </button>
              </div>

              <span className="mono text-[10px] text-brand-purple font-black tracking-[0.5em] uppercase">Method</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                The Trader Behind <span className="text-transparent stroke-text">ORK</span>
              </h2>
            </motion.div>
            
            <motion.div variants={VARIANTS.reveal} className="space-y-4">
              <p className="mono text-sm md:text-base text-zinc-200 uppercase tracking-[0.02em] leading-relaxed font-black">
                <span className="text-brand-purple">I am Timon.</span> I develop disciplined traders, not followers. Built to focus strictly on market structure and risk control.
              </p>
              
              <p className="mono text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed font-medium max-w-xl">
                Through session reviews and live analysis, traders operate with clarity and refine their edge via a validated method.
              </p>

              <div className="pt-4 border-t border-white/5">
                <p className="mono text-xs text-white uppercase tracking-[0.2em] font-black italic">
                   Precision. Focus. <span className="text-brand-purple">Pure Execution.</span>
                </p>
              </div>
            </motion.div>
            
            <motion.button 
              whileHover={VARIANTS.buttonHover}
              whileTap={VARIANTS.buttonTap}
              onClick={onStartPreview}
              className={`group relative w-full sm:w-auto px-10 py-4 rounded-full mono text-[10px] font-black text-white uppercase tracking-[0.3em] overflow-hidden ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover}`}
            >
              <span className="relative z-10 group-hover:text-brand-purple transition-colors duration-300">REQUEST ACCESS</span>
            </motion.button>
         </div>
      </div>

      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-brand-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <div className={`max-w-md w-full p-8 rounded-[2rem] border border-white/10 ${GLASS_STYLES.card} flex flex-col items-center gap-8`}>
              <div className="relative w-24 h-24">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-brand-purple rounded-full opacity-40"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-b-2 border-brand-purple/30 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="mono text-[10px] text-brand-purple font-black animate-pulse tracking-widest uppercase">ORK</span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] italic">Branding Lab</h3>
                <div className="flex flex-col items-center gap-1">
                  <span className="mono text-[9px] text-brand-purple font-black tracking-[0.5em] uppercase mb-1">{generationStep}</span>
                  <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full w-1/3 bg-brand-purple"
                    />
                  </div>
                </div>
              </div>

              <p className="mono text-[8px] text-zinc-500 text-center uppercase tracking-widest font-black max-w-[240px] leading-relaxed">
                Applying institutional aesthetic parameters. Reconstructing visual identity for maximum authority.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
      `}</style>
    </motion.section>
  );
};