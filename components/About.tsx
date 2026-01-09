import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { VARIANTS, MOTION_RULES, GLASS_STYLES, MOTION_KILL_SWITCH, DEPTH_PRESETS } from '../constants';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const subCardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, DEPTH_PRESETS.spring);
  const ySpring = useSpring(y, DEPTH_PRESETS.spring);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [DEPTH_PRESETS.maxRotation * 4, -DEPTH_PRESETS.maxRotation * 4]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-DEPTH_PRESETS.maxRotation * 4, DEPTH_PRESETS.maxRotation * 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || MOTION_KILL_SWITCH) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
           ref={cardRef}
           variants={VARIANTS.reveal} 
           className="w-full lg:w-5/12 relative group/main will-change-transform"
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}
           style={{
             transformStyle: 'preserve-3d',
             perspective: DEPTH_PRESETS.perspective,
             rotateX: !MOTION_KILL_SWITCH ? rotateX : 0,
             rotateY: !MOTION_KILL_SWITCH ? rotateY : 0,
           }}
           whileHover={{ 
             y: -8,
             z: DEPTH_PRESETS.zDepth,
             scale: DEPTH_PRESETS.scale
           }}
         >
            <div className={`aspect-[4/5] overflow-hidden relative shadow-2xl flex items-center justify-center p-8 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover}`}>
               <img 
                 src={REMOTE_LOGO} 
                 alt="TIMON Trading Identity" 
                 className="w-full h-full object-contain opacity-50 group-hover/main:opacity-100 transition-opacity duration-700 ease-[0.22,1,0.36,1] relative z-10"
                 loading="lazy"
               />
            </div>
            <div 
              ref={subCardRef}
              className={`absolute bottom-[-1.5rem] right-[-1.5rem] w-40 md:w-52 p-6 shadow-2xl ${GLASS_STYLES.card} group/sub`}
              style={{ transform: 'translateZ(30px)' }}
            >
               <span className="mono text-[8px] text-brand-purple uppercase tracking-[0.5em] font-black relative z-10">HEAD_TRADER</span>
               <p className="mt-1 mono text-[12px] text-white uppercase font-black italic tracking-widest leading-none relative z-10 group-hover/sub:text-brand-purple transition-colors duration-300">TIMON</p>
            </div>
         </motion.div>

         <div className="w-full lg:w-7/12 space-y-7 md:space-y-12">
            <motion.div variants={VARIANTS.reveal} className="space-y-4">
              <div className="flex items-center justify-between mb-7 md:mb-12">
                <div className="h-8 flex items-center">
                  <AnimatePresence mode="wait">
                    {generatedLogo ? (
                      <motion.img 
                        key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        src={generatedLogo} alt="Refined" className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]" 
                      />
                    ) : (
                      <motion.img 
                        key="orig" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        src={REMOTE_LOGO} alt="Identity" className="h-6 w-auto opacity-60" 
                      />
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.button 
                  onClick={handleGenerateLogo}
                  disabled={isGenerating}
                  whileHover={!isGenerating ? VARIANTS.buttonHover : {}}
                  whileTap={!isGenerating ? VARIANTS.buttonTap : {}}
                  className={`mono text-[9px] font-black tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isGenerating ? 'opacity-40 cursor-wait bg-zinc-800 border-zinc-700' : 'bg-brand-purple/10 text-white border border-brand-purple/30 hover:bg-brand-purple/20 hover:border-brand-purple/50'}`}
                >
                  {isGenerating ? generationStep || 'SYNTHESIZING...' : 'REFINE IDENTITY'}
                </motion.button>
              </div>

              <span className="mono text-[10px] text-brand-purple font-black tracking-[0.5em] uppercase">The Method</span>
              <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                The Trader Behind <GhostText text="TIMON" className="text-transparent stroke-text" />
              </h2>
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
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
      `}</style>
    </motion.section>
  );
};