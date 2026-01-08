import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { VARIANTS, ANIM_SYSTEM, GLASS_STYLES, GLOBAL_3D_PRESET, MOTION_KILL_SWITCH } from '../constants';
import { ConicGradient } from './ConicGradient';

interface PricingProps {
  onStartPreview: () => void;
}

const PriceCardTilt: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  liftAmount?: number;
  rotationFactor?: number;
}> = ({ children, className, liftAmount = -5, rotationFactor = 0.8 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-fidelity spring for professional weighting, synchronized with institutional standards
  const springConfig = { stiffness: 120, damping: 25, mass: 1.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Subtle 3D mapping using global preset for a controlled, premium tilt
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [GLOBAL_3D_PRESET.maxRotation * rotationFactor, -GLOBAL_3D_PRESET.maxRotation * rotationFactor]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-GLOBAL_3D_PRESET.maxRotation * rotationFactor, GLOBAL_3D_PRESET.maxRotation * rotationFactor]);

  const handleMouseMove = (e: React.MouseEvent) => {
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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        y: liftAmount,
        scale: 1.0, // Strictly following GLOBAL_3D_PRESET.scale for subtlety
        z: GLOBAL_3D_PRESET.zDepth,
        transition: { duration: ANIM_SYSTEM.hoverDuration, ease: ANIM_SYSTEM.ease }
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: GLOBAL_3D_PRESET.perspective,
        rotateX: !MOTION_KILL_SWITCH ? rotateX : 0,
        rotateY: !MOTION_KILL_SWITCH ? rotateY : 0,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const Pricing: React.FC<PricingProps> = ({ onStartPreview }) => {
  return (
    <section id="join" className="py-24 md:py-40 px-6 bg-brand-black relative overflow-hidden transform-gpu scroll-mt-24 md:scroll-mt-32">
      <ConicGradient opacity={0.03} size="140%" blur="120px" />

      <div className="max-w-7xl relative z-10 mx-auto">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_SYSTEM.viewport}
          variants={VARIANTS.reveal}
          className="text-center space-y-4 mb-20 md:mb-32"
        >
           <span className="mono text-[10px] text-zinc-600 font-black tracking-[0.8em] uppercase italic">Entry_Matrix</span>
           <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-white italic uppercase tracking-tighter leading-none">
             PRICING
           </h2>
        </motion.div>

        <div className="space-y-12 max-w-6xl mx-auto">
           {/* MAIN PRICING CARD - Refined to be more subtle */}
           <PriceCardTilt className="w-full" rotationFactor={0.8} liftAmount={-6}>
             <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={ANIM_SYSTEM.viewport}
              variants={VARIANTS.reveal}
              className={`relative overflow-hidden flex flex-col lg:flex-row items-stretch rounded-[3.5rem] border border-white/10 ${GLASS_STYLES.card} shadow-2xl transition-all duration-300 bg-zinc-950/40 group/main`}
             >
                <div className="flex-1 p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/5 space-y-10 flex flex-col justify-center" style={{ transform: 'translateZ(20px)' }}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-purple shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                      <span className="mono text-[9px] text-brand-purple font-black tracking-widest uppercase italic">Tier_01 // Master Method</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-[0.9]">
                      ICT Basic <br />To Advance
                    </h3>
                  </div>

                  <div className="space-y-6">
                     <p className="mono text-[11px] text-zinc-400 uppercase font-black leading-relaxed tracking-wider italic">
                        Trader transformation pipeline. Designed for operators seeking high-performance stabilized execution.
                     </p>
                     <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center justify-between">
                           <span className="mono text-[9px] text-zinc-600 font-black tracking-widest uppercase">Status</span>
                           <span className="mono text-[9px] text-green-500 font-black animate-pulse">● ACTIVE</span>
                        </div>
                        <span className="mono text-[10px] text-white font-black tracking-widest uppercase">Entry // Authorized</span>
                     </div>
                  </div>
                </div>

                <div className="flex-[1.2] p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/5 space-y-10 bg-white/[0.01]" style={{ transform: 'translateZ(10px)' }}>
                  <div className="flex items-center justify-between">
                     <span className="mono text-[9px] text-zinc-600 uppercase tracking-widest font-black italic">Mentorship_Details</span>
                     <div className="px-3 py-1 bg-brand-purple/10 rounded-full border border-brand-purple/20">
                        <span className="mono text-[8px] text-brand-purple font-black uppercase tracking-widest">MENTORSHIP INCLUDED</span>
                     </div>
                  </div>
                  
                  <ul className="grid grid-cols-1 gap-5">
                     {[
                       'Guidance To Profitable Trading',
                       '1-1 Mentorship // Direct Audit',
                       'Private Community Discord Access',
                       'Class Recordings Library',
                       'Weekly Reviews & Feedback'
                     ].map((item, idx) => (
                       <li key={idx} className="flex items-center gap-4 group/item">
                          <span className="mono text-[9px] text-brand-purple font-black opacity-40">0{idx + 1}</span>
                          <span className="mono text-[10px] text-zinc-300 uppercase font-black tracking-widest">{item}</span>
                       </li>
                     ))}
                  </ul>
                </div>

                <div className="flex-1 p-10 md:p-14 flex flex-col items-center justify-center gap-10 bg-zinc-900/60" style={{ transform: 'translateZ(30px)' }}>
                   <div className="text-center space-y-2">
                      <span className="mono text-[9px] text-zinc-600 uppercase tracking-widest font-black italic">Entry_Cost</span>
                      <div className="text-7xl md:text-8xl font-black text-white italic tracking-tighter leading-none">$499</div>
                      <div className="mt-4 inline-block px-4 py-2 border border-brand-purple/30 bg-brand-purple/5 rounded-full">
                         <span className="mono text-[9px] text-brand-purple uppercase tracking-[0.4em] font-black italic">LIFETIME ACCESS</span>
                      </div>
                   </div>
                   
                   <motion.button 
                      whileHover={{ scale: 1.04, backgroundColor: "rgba(139, 92, 246, 0.4)" }}
                      whileTap={VARIANTS.buttonTap}
                      onClick={onStartPreview}
                      className={`w-full py-6 rounded-full mono text-[11px] font-black uppercase tracking-[0.5em] text-white transition-all duration-300 border border-brand-purple/30 bg-brand-purple/20 shadow-[0_30px_60px_-15px_rgba(139,92,246,0.3)]`}
                    >
                      Enroll Now
                    </motion.button>
                </div>
             </motion.div>
           </PriceCardTilt>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LIVE STREAM CARD - More subtle tilt */}
              <PriceCardTilt className="w-full" liftAmount={-4} rotationFactor={0.6}>
                <motion.div 
                  initial="initial"
                  whileInView="animate"
                  viewport={ANIM_SYSTEM.viewport}
                  variants={VARIANTS.reveal}
                  className={`p-10 rounded-[3rem] border border-white/10 ${GLASS_STYLES.card} flex flex-col justify-between gap-12 group transition-all duration-300 bg-brand-purple/[0.01] h-full`}
                >
                  <div className="space-y-6" style={{ transform: 'translateZ(15px)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/50 shadow-[0_0_8px_rgba(139,92,246,0.25)]" />
                      <span className="mono text-[9px] text-brand-purple uppercase tracking-widest font-black italic">Intelligence // Live</span>
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic">Live Stream</h4>
                       <span className="mono text-2xl font-black text-brand-purple tracking-tighter italic"> $39/month </span>
                    </div>
                    <p className="mono text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed italic border-l border-zinc-800 pl-4">Real-time session execution logs and live institutional market data analysis streams.</p>
                  </div>
                  <button 
                    onClick={onStartPreview} 
                    className="w-full py-5 bg-brand-purple/10 border border-brand-purple/20 rounded-full mono text-[10px] text-white uppercase tracking-widest font-black transition-all hover:bg-brand-purple/20"
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    Authorize Access
                  </button>
                </motion.div>
              </PriceCardTilt>

              {/* FREE DISCORD CARD - Minimum tilt for tertiary hierarchy */}
              <PriceCardTilt className="w-full" liftAmount={-2} rotationFactor={0.4}>
                <motion.div 
                  initial="initial"
                  whileInView="animate"
                  viewport={ANIM_SYSTEM.viewport}
                  variants={VARIANTS.reveal}
                  className={`p-10 rounded-[3rem] border border-white/[0.03] bg-zinc-950/5 backdrop-blur-sm flex flex-col justify-between gap-12 group transition-all duration-500 hover:bg-zinc-950/15 h-full`}
                >
                  <div className="space-y-6" style={{ transform: 'translateZ(10px)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                      <span className="mono text-[9px] text-zinc-600 uppercase tracking-widest font-black italic">Public_Node</span>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-3xl font-black text-zinc-500 uppercase tracking-tighter italic">Free Discord</h4>
                       <span className="mono text-[8px] text-zinc-700 font-black tracking-widest uppercase italic">Entry Level Community Access</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                       {['Trader Giveaways', 'Market Updates', 'Community Logs', 'Announcements'].map(item => (
                         <li key={item} className="mono text-[8px] text-zinc-700 uppercase flex items-center gap-2 font-bold tracking-widest">
                            <div className="w-0.5 h-0.5 rounded-full bg-zinc-900" />
                            {item}
                         </li>
                       ))}
                    </ul>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                    whileTap={VARIANTS.buttonTap}
                    className={`w-full py-5 rounded-full mono text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 transition-all border border-white/[0.03] bg-transparent`}
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    Join Public HUB
                  </motion.button>
                </motion.div>
              </PriceCardTilt>
           </div>
        </div>

        <motion.div 
          variants={VARIANTS.reveal}
          initial="initial"
          whileInView="animate"
          viewport={ANIM_SYSTEM.viewport}
          className="mt-32 text-center opacity-30 hover:opacity-100 transition-opacity duration-1000"
        >
          <div className="flex items-center justify-center gap-6 mb-4">
             <div className="h-[1px] w-12 bg-white/10" />
             <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
             <div className="h-[1px] w-12 bg-white/10" />
          </div>
          <p className="mono text-[10px] text-zinc-600 uppercase tracking-[0.8em] font-black italic">
            Institutional Standards // Unmatched Clarity // Pure Execution
          </p>
        </motion.div>
      </div>
    </section>
  );
};
