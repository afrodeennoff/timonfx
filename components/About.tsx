import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VARIANTS, MOTION_RULES, GLASS_STYLES, MOTION_KILL_SWITCH } from '../constants';
import { ConicGradient } from './ConicGradient';
import { GhostText } from './GhostText';

interface AboutProps {
  onStartPreview: () => void;
}

const REMOTE_LOGO = "https://raw.githubusercontent.com/afrodeennoff/ork-orginal-/25e7b64e21207cd0988dc6cf704f230b51e73b74/IMG_1213.png";

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

  const handleGenerateLogo = async () => {
    try {
      setIsGenerating(true);
      setGenerationStep('ANALYZING...');
      
      let base64Data = null;

      try {
        const response = await fetch(REMOTE_LOGO);
        if (response.ok) {
          const blob = await response.blob();
          base64Data = await blobToBase64(blob);
        }
      } catch (e) {
        console.debug('Asset fetch failed, relying on text prompt');
      }

      setGenerationStep('SYNTHESIZING...');

      const apiResponse = await fetch('/api/genai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Professional minimalist trading logo for TIMON TRADING. Abstract mark, dark mode, purple accents.',
          imageData: base64Data
        })
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to reach intel service');
      }

      const data = await apiResponse.json();
      
      if (data.image) {
        setGeneratedLogo(data.image);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Logo refinement failed:', error);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const timonText = "TIMON";

  return (
    <motion.section 
      id="about" 
      initial="initial"
      whileInView="animate"
      viewport={MOTION_RULES.viewport}
      variants={VARIANTS.staggerContainer}
      className="py-10 md:py-14 px-6 bg-brand-black relative overflow-hidden transform-gpu scroll-mt-24 md:scroll-mt-32"
    >
      <ConicGradient opacity={0.04} size="100%" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative z-10">
         <motion.div 
           variants={VARIANTS.reveal} 
           className="w-full lg:w-5/12 relative group/main will-change-transform"
           whileHover={VARIANTS.cardHover}
         >
            <div className={`aspect-[4/5] overflow-hidden relative shadow-2xl flex items-center justify-center p-8 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover}`}>
               <img 
                 src={REMOTE_LOGO} 
                 alt="TIMON Trading Professional Brand Identity" 
                 className="w-full h-full object-contain opacity-50 group-hover/main:opacity-100 transition-opacity duration-700 ease-[0.22,1,0.36,1] relative z-10"
                 loading="lazy"
               />
            </div>
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={MOTION_RULES.viewport}
              variants={VARIANTS.staggerContainer}
              className={`absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 w-48 md:w-64 p-6 shadow-2xl ${GLASS_STYLES.card} group/sub`}
            >
               <motion.p 
                 className="mono text-2xl md:text-3xl text-white uppercase font-black italic tracking-[0.25em] leading-none relative z-10 group-hover/sub:text-brand-purple transition-colors duration-300 flex justify-center text-glow"
               >
                 {timonText.split('').map((char, i) => (
                   <motion.span
                     key={i}
                     initial={{ opacity: 0, y: 8 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ 
                       duration: 0.5, 
                       delay: i * 0.1, 
                       ease: MOTION_RULES.ease 
                     }}
                   >
                     {char}
                   </motion.span>
                 ))}
               </motion.p>
            </motion.div>
         </motion.div>

         <div className="w-full lg:w-7/12 space-y-7 md:space-y-12">
            <motion.div variants={VARIANTS.staggerContainer} className="mb-7 md:mb-12 space-y-4">
              <div className="flex items-center justify-between mb-7 md:mb-12">
                <div className="h-8 flex items-center">
                  <AnimatePresence mode="wait">
                    {generatedLogo ? (
                      <motion.img 
                        key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        src={generatedLogo} alt="TIMON Trading Refined AI Generated Logo" className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]" 
                      />
                    ) : (
                      <motion.img 
                        key="orig" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        src={REMOTE_LOGO} alt="TIMON Trading Original Identity Badge" className="h-6 w-auto opacity-60" 
                      />
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.button 
                  onClick={handleGenerateLogo}
                  disabled={isGenerating}
                  whileHover={!isGenerating ? VARIANTS.buttonHover : {}}
                  whileTap={!isGenerating ? VARIANTS.buttonTap : {}}
                  className={`mono text-[9px] font-black tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] relative overflow-hidden group/btn ${isGenerating ? 'opacity-40 cursor-wait bg-zinc-800 border-zinc-700' : 'bg-brand-purple/10 text-white border border-brand-purple/30 hover:bg-brand-purple/20 hover:border-brand-purple/50'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
                  <span className="relative z-10">{isGenerating ? generationStep || 'SYNTHESIZING...' : 'REFINE IDENTITY'}</span>
                </motion.button>
              </div>

              <motion.div variants={VARIANTS.reveal} className="flex items-center gap-4">
                <div className="h-px w-12 bg-brand-purple" />
                <span className="mono text-[11px] text-brand-purple font-black tracking-[0.5em] uppercase italic">The Method</span>
              </motion.div>
              <motion.h2 variants={VARIANTS.reveal} className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                THE TRADER BEHIND <br />
                <GhostText text="TIMON" loop={true} className="text-transparent transition-colors cursor-default stroke-text" />
              </motion.h2>
            </motion.div>
            
            <motion.div variants={VARIANTS.reveal} className="space-y-7 group/text">
              <p className="mono text-lg md:text-xl text-zinc-200 leading-relaxed font-medium group-hover/text:text-white transition-colors duration-300">
                <span className="text-brand-purple font-bold">I’m Timon — a futures trader and trading educator.</span>
                {' '}After years of studying price action, market behavior, and trading psychology, I developed a structured approach focused on clarity, simplicity, and consistent execution.
              </p>
              <p className="mono text-sm md:text-base text-zinc-400 leading-relaxed font-medium border-l border-white/5 pl-6 group-hover/text:text-white transition-colors duration-300">
                This method is built to help traders avoid common mistakes, reduce noise, and progress with better decision-making and discipline. The focus is straightforward: strategy, execution, and mindset. No distractions. Just a process designed to support steady improvement over time.
              </p>
            </motion.div>
         </div>
      </div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1.5px rgba(255,255,255,0.25); }
        
        @keyframes text-pulse-glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(139, 92, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.2);
          }
          50% {
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(139, 92, 246, 0.4);
          }
        }
        .text-glow { 
          animation: text-pulse-glow 4s infinite ease-in-out; 
        }
      `}</style>
    </motion.section>
  );
};