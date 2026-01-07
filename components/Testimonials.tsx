
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS, VARIANTS, ANIM_CONSTANTS, THREE_D_PRESET } from '../constants';

interface TestimonialsProps {
  onStartPreview: () => void;
}

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-brand-purple opacity-40">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21Z" fill="currentColor"/>
    <path d="M14.017 11C14.017 8.5 15.5 6.5 17.5 5.5L18.5 7.5C17 8.5 16.5 9.5 16.5 11H21V16H14V11H14.017Z" fill="currentColor"/>
    <path d="M3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.01703 16H8.01703C9.1216 16 10.017 16.8954 10.017 18V21C10.017 22.1046 9.1216 23 8.01703 23H5.01703C3.91243 23 3.017 22.1046 3.017 21Z" fill="currentColor"/>
    <path d="M3.017 11C3.017 8.5 4.5 6.5 6.5 5.5L7.5 7.5C6 8.5 5.5 9.5 5.5 11H10V16H3V11H3.017Z" fill="currentColor"/>
  </svg>
);

const DepthCarouselCard: React.FC<{ 
  testimonial: any; 
  active: boolean; 
  onSelect: () => void 
}> = ({ testimonial, active, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Performance-safe 3D mouse tilt physics
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [THREE_D_PRESET.maxRotation, -THREE_D_PRESET.maxRotation]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-THREE_D_PRESET.maxRotation, THREE_D_PRESET.maxRotation]);

  // Fix: Ensure values reset when card is no longer active to avoid stuck rotation
  useEffect(() => {
    if (!active) {
      x.set(0);
      y.set(0);
    }
  }, [active, x, y]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !active || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
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
      onClick={onSelect}
      initial={{ opacity: 0, z: -200 }}
      animate={{ 
        opacity: active ? 1 : 0.3,
        z: active ? 0 : -150,
        scale: active ? 1 : 0.9,
        // Fix: Removed rotateX and rotateY from animate to fix MotionValue type error
        filter: active ? 'blur(0px)' : 'blur(4px)',
        pointerEvents: active ? 'auto' : 'none'
      }}
      transition={{ 
        duration: THREE_D_PRESET.revealDuration, 
        ease: ANIM_CONSTANTS.ease 
      }}
      // Fix: rotateX and rotateY moved to style prop for correct MotionValue handling
      style={{ 
        transformStyle: 'preserve-3d', 
        perspective: THREE_D_PRESET.perspective,
        rotateX: active ? rotateX : 0,
        rotateY: active ? rotateY : 0
      }}
      className={`absolute inset-0 flex items-center justify-center p-8 md:p-16 border border-white/10 bg-zinc-900/10 cursor-pointer group hover:border-brand-purple/40 transition-colors duration-500 rounded-sm`}
    >
      <div className="relative w-full max-w-3xl space-y-12" style={{ transform: 'translateZ(40px)' }}>
        <div className="flex justify-between items-start">
          <QuoteIcon />
          <div className="flex flex-col items-end opacity-40">
             <span className="mono text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em]">Protocol // Testimony</span>
          </div>
        </div>

        <p className="text-3xl md:text-5xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9] group-hover:text-brand-purple transition-colors duration-500">
          "{testimonial.quote}"
        </p>

        <div className="flex items-end justify-between pt-12 border-t border-white/5">
           <div className="space-y-1">
              <span className="mono text-[10px] text-brand-purple font-black uppercase tracking-widest block">Role</span>
              <span className="mono text-sm text-white font-black tracking-widest uppercase">{testimonial.context}</span>
           </div>
           <span className="mono text-[9px] text-zinc-700 font-black tracking-widest uppercase">SYSLOG_ID: {testimonial.id.toUpperCase()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC<TestimonialsProps> = ({ onStartPreview }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section 
      id="testimonials" 
      className="py-24 md:py-64 px-6 bg-brand-black relative overflow-hidden flex flex-col items-center"
      style={{ perspective: THREE_D_PRESET.perspective }}
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl w-full relative z-10 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-brand-purple" />
              <span className="mono text-[11px] text-brand-purple font-black tracking-[0.6em] uppercase">Trusted // Authority</span>
            </motion.div>
            <h2 className="text-6xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Proven <br />
              <span className="text-transparent stroke-text">Accuracy.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* 3D Focal Carousel Container */}
      <div className="relative w-full max-w-6xl aspect-[16/10] md:aspect-[21/9] mb-32" style={{ transformStyle: 'preserve-3d' }}>
        <AnimatePresence mode="popLayout">
          {TESTIMONIALS.map((t, i) => (
            <DepthCarouselCard 
              key={t.id} 
              testimonial={t} 
              active={activeIndex === i}
              onSelect={() => setActiveIndex(i)}
            />
          ))}
        </AnimatePresence>

        {/* Carousel Navigation - Desktop Arrows */}
        <div className="hidden lg:flex absolute inset-x-[-100px] top-1/2 -translate-y-1/2 justify-between pointer-events-none">
           <button onClick={prev} className="pointer-events-auto p-4 border border-white/10 hover:border-brand-purple transition-colors bg-brand-black group">
             <svg className="w-6 h-6 text-zinc-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
           </button>
           <button onClick={next} className="pointer-events-auto p-4 border border-white/10 hover:border-brand-purple transition-colors bg-brand-black group">
             <svg className="w-6 h-6 text-zinc-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
           </button>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="flex gap-4 mb-24">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-12 h-[2px] transition-all duration-500 ${
              activeIndex === i ? 'bg-brand-purple w-20' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-12"
      >
        <button 
           onClick={onStartPreview}
           className="group relative px-20 py-8 bg-white overflow-hidden transition-all duration-300 rounded-sm"
         >
           <div className="absolute inset-0 bg-brand-purple translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
           <span className="relative z-10 mono text-xs font-black uppercase tracking-[0.6em] text-black group-hover:text-white transition-colors">
             Initialize // Protocol
           </span>
         </button>
      </motion.div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
      `}</style>
    </section>
  );
};
