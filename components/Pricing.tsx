import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { VARIANTS, MOTION_RULES, GLASS_STYLES, DEPTH_PRESETS, MOTION_KILL_SWITCH, PRICING_DIFFERENTIATORS } from '../constants';
import { ConicGradient } from './ConicGradient';
import { GhostText } from './GhostText';

interface PricingProps {
  onStartPreview: () => void;
}

const PriceCardTilt: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  liftAmount?: number;
  rotationFactor?: number;
}> = ({ children, className, liftAmount = -8, rotationFactor = 1.0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 25, mass: 1.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [DEPTH_PRESETS.maxRotation * rotationFactor * 4, -DEPTH_PRESETS.maxRotation * rotationFactor * 4]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-DEPTH_PRESETS.maxRotation * rotationFactor * 4, DEPTH_PRESETS.maxRotation * rotationFactor * 4]);

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
        scale: 1.005,
        z: DEPTH_PRESETS.zDepth,
        transition: { duration: MOTION_RULES.hoverDuration, ease: MOTION_RULES.ease }
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: DEPTH_PRESETS.perspective,
        rotateX: !MOTION_KILL_SWITCH ? rotateX : 0,
        rotateY: !MOTION_KILL_SWITCH ? rotateY : 0,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

const EnrollButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 30, mass: 1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [DEPTH_PRESETS.maxRotation * 6, -DEPTH_PRESETS.maxRotation * 6]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-DEPTH_PRESETS.maxRotation * 6, DEPTH_PRESETS.maxRotation * 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current || MOTION_KILL_SWITCH) return;
    const rect = btnRef.current.getBoundingClientRect();
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
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ ...VARIANTS.buttonHover, z: 20 }}
      whileTap={{ scale: 0.98, y: 0 }}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 800,
        rotateX: !MOTION_KILL_SWITCH ? rotateX : 0,
        rotateY: !MOTION_KILL_SWITCH ? rotateY : 0,
        transform: 'translateZ(40px)'
      }}
      className={`w-full py-3.5 md:py-4.5 rounded-full mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] relative overflow-hidden group/btn ${GLASS_STYLES.accentButton} ${GLASS_STYLES.accentButtonHover}`}
    >
      <span className="relative z-10">Enroll Now</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.button>
  );
};

export const Pricing: React.FC<PricingProps> = ({ onStartPreview }) => {
  return (
    <section id="join" className="py-10 md:py-14 px-6 bg-brand-black relative overflow-hidden transform-gpu scroll-mt-24 md:scroll-mt-32">
      <ConicGradient opacity={0.03} size="140%" blur="120px" />

      <div className="max-w-7xl relative z-10 mx-auto">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={MOTION_RULES.viewport}
          variants={VARIANTS.reveal}
          className="text-center space-y-3 mb-7 md:mb-12"
        >
           <span className="mono text-[9px] text-zinc-600 font-black tracking-[0.6em] uppercase italic">Entry Matrix</span>
           <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
             <GhostText text="PRICING" className="text-transparent stroke-text" />
           </h2>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={MOTION_RULES.viewport}
          variants={VARIANTS.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10 md:mb-14 text-center"
        >
          {PRICING_DIFFERENTIATORS.map((diff, i) => (
            <motion.div
              key={diff.id}
              variants={VARIANTS.reveal}
              className="space-y-2.5 p-3.5 rounded-2xl border border-brand-purple/30 bg-white/[0.01] group"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-brand-purple/40 group-hover:w-12 group-hover:bg-brand-purple/60 transition-all duration-300" />
                <span className="mono text-[9px] text-brand-purple font-black tracking-[0.4em] uppercase group-hover:text-brand-purple transition-colors duration-300">{diff.label}</span>
                <div className="h-px w-8 bg-brand-purple/40 group-hover:w-12 group-hover:bg-brand-purple/60 transition-all duration-300" />
              </div>
              <p className="mono text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed font-bold italic">
                {diff.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-4 md:space-y-5 max-w-6xl mx-auto">
           <PriceCardTilt className="w-full">
             <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={MOTION_RULES.viewport}
              variants={VARIANTS.reveal}
              className={`relative overflow-hidden flex flex-col lg:flex-row items-stretch ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover} transition-colors shadow-2xl group/main`}
             >
                <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaa1_1px,transparent_1px),linear-gradient(to_bottom,#aaa1_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                <div className="absolute inset-[1px] rounded-[2.5rem] pointer-events-none opacity-0 group-hover/main:opacity-100 transition-opacity duration-700">
                   <div className="absolute inset-0 rounded-[2.5rem] border border-brand-purple/20 blur-[2px] opacity-70" />
                   <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 opacity-50" />
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ delay: 0.8, duration: 0.5, ease: MOTION_RULES.ease }}
                    className="absolute top-5 right-5 z-20 px-3.5 py-1.5 bg-brand-purple/10 border border-brand-purple/40 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)] group-hover/main:shadow-[0_0_25px_rgba(139,92,246,0.8)] transition-shadow duration-300"
                    style={{ transform: 'translateZ(70px)' }}
                >
                  <span className="mono text-[8px] text-brand-purple font-black uppercase tracking-widest italic">TOP_OFFER</span>
                </motion.div>

                <div className="flex-1 p-4 md:p-7 border-b lg:border-b-0 lg:border-r border-white/5 group-hover/main:border-brand-purple/20 transition-colors duration-300 flex flex-col justify-center gap-3 relative z-10" style={{ transform: 'translateZ(25px)' }}>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                      <span className="mono text-[8px] text-brand-purple font-black tracking-widest uppercase italic">Tier_01 // Master</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
                      ICT Basic <br />To Advance
                    </h3>
                  </div>

                  <p className="mono text-[10px] text-zinc-500 uppercase font-black leading-relaxed tracking-wider italic">
                    Path for stabilized high-performance execution.
                  </p>
                </div>

                <div className="flex-[1.2] p-4 md:p-7 transition-colors duration-300 space-y-3.5 bg-white/[0.01] relative z-10" style={{ transform: 'translateZ(20px)' }}>
                  <span className="mono text-[8px] text-zinc-700 uppercase tracking-widest font-black italic group-hover/main:text-brand-purple transition-colors duration-300">Mentorship Dossier //</span>
                  <ul className="grid grid-cols-1 gap-2.5">
                     {[
                       'Guidance To Profitable Trading',
                       '1-1 Direct Execution Audit',
                       'Private Community Discord',
                       'Recording Archive Library',
                       'Weekly Session Reviews'
                     ].map((item, idx) => (
                       <li key={idx} className="flex items-center gap-3 group/item">
                          <span className="mono text-[8px] text-brand-purple/40 font-black group-hover/item:text-brand-purple transition-colors">0{idx + 1}</span>
                          <span className="mono text-[9px] text-zinc-300 uppercase font-black tracking-widest opacity-80 group-hover/item:opacity-100 transition-opacity">{item}</span>
                       </li>
                     ))}
                  </ul>
                </div>

                <div className="flex-1 p-4 md:p-7 flex flex-col items-center justify-center gap-5 bg-zinc-900/60 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                   <div className="text-center space-y-1" style={{ transform: 'translateZ(30px)' }}>
                      <span className="mono text-[8px] text-zinc-600 uppercase tracking-widest font-black italic">Enrollment_Cost</span>
                      <div className="text-6xl md:text-7xl font-black text-white italic tracking-tighter leading-none group-hover/main:text-brand-purple transition-colors duration-300">$499</div>
                      <span className="mono text-[8px] text-brand-purple uppercase tracking-[0.4em] font-black italic block mt-0.5 group-hover/main:text-white group-hover/main:tracking-[0.5em] transition-all duration-300">LIFETIME ACCESS</span>
                   </div>
                   
                   <EnrollButton onClick={() => window.open('https://forms.gle/ivSr7yBTqjFuXnwE9', '_blank', 'noopener,noreferrer')} />
                </div>
             </motion.div>
           </PriceCardTilt>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5">
              <PriceCardTilt className="w-full">
                <motion.div 
                  initial="initial"
                  whileInView="animate"
                  viewport={MOTION_RULES.viewport}
                  variants={VARIANTS.reveal}
                  className={`relative p-4 md:p-6 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover} flex flex-col justify-between gap-5 group/main transition-all duration-300 bg-brand-purple/[0.01] h-full`}
                >
                  <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaa1_1px,transparent_1px),linear-gradient(to_bottom,#aaa1_1px,transparent_1px)] bg-[size:40px_40px]" />
                  </div>
                  <div className="absolute inset-[1px] rounded-[2.5rem] pointer-events-none opacity-0 group-hover/main:opacity-100 transition-opacity duration-700">
                     <div className="absolute inset-0 rounded-[2.5rem] border border-brand-purple/20 blur-[2px] opacity-70" />
                     <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 opacity-50" />
                  </div>
                  <div className="space-y-3 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                    <span className="mono text-[8px] text-brand-purple uppercase tracking-widest font-black italic">Intel // Live</span>
                    <div className="space-y-2">
                       <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic group-hover/main:text-brand-purple transition-colors duration-300">Live Stream</h4>
                       <span className="mono text-xl font-black text-brand-purple tracking-tighter italic group-hover/main:text-white transition-colors duration-300"> $39/mo </span>
                    </div>
                    <p className="mono text-[9px] text-zinc-600 uppercase tracking-widest leading-relaxed italic border-l border-white/5 pl-4 group-hover/main:text-white transition-colors duration-300">Real-time session execution logs and analysis.</p>
                  </div>
                  <motion.button 
                    whileHover={VARIANTS.buttonHover}
                    whileTap={VARIANTS.buttonTap}
                    onClick={() => window.open('https://whop.com/timonict/free-access-c3-624b/', '_blank', 'noopener,noreferrer')} 
                    className={`w-full py-3 ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} mono text-[9px] uppercase tracking-widest font-black relative z-10`}
                  >
                    Join Live
                  </motion.button>
                </motion.div>
              </PriceCardTilt>

              <PriceCardTilt className="w-full">
                <motion.div 
                  initial="initial"
                  whileInView="animate"
                  viewport={MOTION_RULES.viewport}
                  variants={VARIANTS.reveal}
                  className={`relative p-4 md:p-6 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover} flex flex-col justify-between gap-5 group/main h-full transition-all duration-300 bg-zinc-950/5 backdrop-blur-sm`}
                >
                  <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaa1_1px,transparent_1px),linear-gradient(to_bottom,#aaa1_1px,transparent_1px)] bg-[size:40px_40px]" />
                  </div>
                  <div className="absolute inset-[1px] rounded-[2.5rem] pointer-events-none opacity-0 group-hover/main:opacity-100 transition-opacity duration-700">
                     <div className="absolute inset-0 rounded-[2.5rem] border border-brand-purple/20 blur-[2px] opacity-70" />
                     <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 opacity-50" />
                  </div>
                  <div className="space-y-3 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                    <span className="mono text-[8px] text-zinc-700 uppercase tracking-widest font-black italic">Public_Node</span>
                    <div className="space-y-2">
                       <h4 className="text-2xl font-black text-zinc-500 uppercase tracking-tighter italic group-hover/main:text-brand-purple transition-colors duration-300">Free Discord</h4>
                       <span className="mono text-[8px] text-zinc-700 font-black tracking-widest uppercase italic group-hover/main:text-brand-purple transition-colors duration-300">Global Community Access</span>
                    </div>
                    <p className="mono text-[9px] text-zinc-600 uppercase tracking-widest leading-relaxed italic border-l border-white/5 pl-4 group-hover/main:text-white transition-colors duration-300">Instant access to our global trading community for peer insights.</p>
                  </div>
                  <motion.button 
                    whileHover={VARIANTS.buttonHover}
                    whileTap={VARIANTS.buttonTap}
                    onClick={() => window.open('https://discord.gg/FPrEk8fhwp', '_blank', 'noopener,noreferrer')}
                    className="w-full py-3 bg-transparent backdrop-blur-md border border-brand-purple/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full inline-flex items-center justify-center mono text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-brand-purple hover:border-brand-purple/50 hover:bg-brand-purple/10 relative z-10"
                  >
                    JOIN FREE DISCORD
                  </motion.button>
                </motion.div>
              </PriceCardTilt>
           </div>
        </div>
      </div>

      <style>{` .stroke-text { -webkit-text-stroke: 1.5px rgba(255,255,255,0.25); } `}</style>
    </section>
  );
};