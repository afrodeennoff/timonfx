import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS, MOTION_RULES, VARIANTS, GLASS_STYLES } from '../constants';

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const nextTestimonial = useCallback(() => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextTestimonial, 5000); 
    return () => clearInterval(timer);
  }, [isPaused, nextTestimonial]);

  useEffect(() => {
    const handleScroll = () => {
      setIsPaused(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsPaused(false);
      }, 2000); 
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <section
      id="testimonial"
      className="relative bg-brand-black py-10 md:py-14 px-6 scroll-mt-24 md:scroll-mt-32 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={MOTION_RULES.viewport}
          variants={VARIANTS.reveal}
          className="mb-7 md:mb-12 text-center"
        >
          <span className="mono text-[11px] text-zinc-600 font-black tracking-[0.8em] uppercase italic block mb-6">Trader Feedback</span>
          <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none opacity-20">
            Real Words.
          </h2>
        </motion.div>

        <div className="relative min-h-[400px] md:min-h-[450px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: MOTION_RULES.ease }}
              className={`w-full max-w-4xl ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover} p-10 md:p-16 flex flex-col items-center text-center shadow-2xl relative`}
            >
              <blockquote className="text-2xl md:text-3xl font-black text-white italic leading-[1.3] tracking-tight mb-8 md:mb-12 max-w-3xl">
                "{TESTIMONIALS[index].quote}"
              </blockquote>
              
              <div className="space-y-1">
                <p className="mono text-[11px] md:text-xs text-brand-purple font-black uppercase tracking-[0.4em]">
                  {TESTIMONIALS[index].context}
                </p>
                <div className="flex items-center justify-center gap-1.5 opacity-20">
                  <span className="mono text-[9px] text-zinc-500 uppercase font-black tracking-widest">Verified Record</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-10 md:mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all duration-500 rounded-full ${
                index === i ? 'w-10 bg-brand-purple' : 'w-3 bg-white/10 hover:bg-white/20'
              }`}
              aria-label={`Go to entry ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] pointer-events-none -z-10" />
    </section>
  );
};
