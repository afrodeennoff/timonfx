import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TESTIMONIALS, ANIM_SYSTEM, VARIANTS, GLASS_STYLES, GLOBAL_3D_PRESET, MOTION_KILL_SWITCH } from '../constants';
import { ConicGradient } from './ConicGradient';
import { GhostText } from './GhostText';

const VerifiedBadge = () => (
  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
    <div className="w-1 h-1 bg-brand-purple rounded-full shadow-[0_0_6px_rgba(139,92,246,0.3)]" />
    <span className="mono text-[8px] text-brand-purple font-black tracking-widest uppercase italic">Verified_Identity</span>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: typeof TESTIMONIALS[0]; index: number }> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 25, mass: 1.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [GLOBAL_3D_PRESET.maxRotation, -GLOBAL_3D_PRESET.maxRotation]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-GLOBAL_3D_PRESET.maxRotation, GLOBAL_3D_PRESET.maxRotation]);

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
      variants={VARIANTS.reveal}
      whileHover={{ 
        y: -8,
        z: GLOBAL_3D_PRESET.zDepth,
        transition: { duration: ANIM_SYSTEM.hoverDuration, ease: ANIM_SYSTEM.ease }
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: GLOBAL_3D_PRESET.perspective,
        rotateX: !MOTION_KILL_SWITCH ? rotateX : 0,
        rotateY: !MOTION_KILL_SWITCH ? rotateY : 0,
      }}
      className={`relative group p-6 md:p-10 transition-all duration-300 flex flex-col justify-between min-h-[240px] rounded-[2rem] will-change-transform ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover}`}
    >
      <div className="absolute top-0 right-0 p-5 opacity-20 group-hover:opacity-40 transition-opacity" style={{ transform: 'translateZ(25px)' }}>
        <span className="mono text-[8px] text-zinc-500 font-black tracking-widest uppercase">
          SEQ_{testimonial.id.toUpperCase()}
        </span>
      </div>

      <div className="space-y-6 relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="mono text-[8px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Trader_Profile</span>
            <span className="mono text-[9px] text-white font-black uppercase tracking-widest">{testimonial.context}</span>
          </div>
          <VerifiedBadge />
        </div>

        <blockquote className="text-lg md:text-xl font-medium text-zinc-100 italic leading-snug tracking-tight">
          "{testimonial.quote}"
        </blockquote>
      </div>

      <div className="pt-6 mt-auto border-t border-white/5 flex items-center justify-between" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center gap-2">
          <div className="h-px w-6 bg-brand-purple/30 group-hover:w-10 transition-all duration-300" />
          <span className="mono text-[8px] text-zinc-500 uppercase tracking-[0.4em] font-black">Entry_Logged</span>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-brand-purple/20 rounded-full" />
          ))}
        </div>
      </div>
      
      <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonial" className="relative py-12 md:py-16 px-6 bg-brand-black overflow-hidden scroll-mt-24 md:scroll-mt-32">
      <ConicGradient opacity={0.08} size="130%" />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaa1_1px,transparent_1px),linear-gradient(to_bottom,#aaa1_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_SYSTEM.viewport}
          variants={VARIANTS.staggerContainer}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-12 gap-8"
        >
          <div className="space-y-4">
            <motion.div variants={VARIANTS.reveal} className="flex items-center gap-3">
              <div className="h-[2px] w-10 bg-brand-purple" />
              <span className="mono text-[10px] text-brand-purple font-black tracking-[0.6em] uppercase italic">System_Validation</span>
            </motion.div>
            <motion.h2 variants={VARIANTS.reveal} className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
              Execution <br />
              <GhostText text="Records." className="text-transparent stroke-text opacity-45" />
            </motion.h2>
          </div>
          
          <motion.div variants={VARIANTS.reveal} className="max-w-xs md:text-right">
            <p className="mono text-[9px] text-zinc-500 uppercase tracking-widest leading-relaxed font-bold italic">
              Verified performance and trader feedback logs from the ORK internal method.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_SYSTEM.viewport}
          variants={VARIANTS.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={i}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.4); }
      `}</style>
    </section>
  );
};