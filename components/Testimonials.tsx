
import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS, VARIANTS, ANIM_CONSTANTS } from '../constants';

interface TestimonialsProps {
  onStartPreview: () => void;
}

const TestimonialItem: React.FC<{ testimonial: any; index: number }> = React.memo(({ testimonial, index }) => {
  return (
    <motion.div
      variants={VARIANTS.fadeInUp}
      className="group relative w-full py-12 md:py-16 border-t border-white/10 first:border-t-0 flex flex-col md:flex-row gap-6 md:gap-32 items-start transition-colors duration-500 hover:bg-white/[0.01]"
    >
      <div className="w-full md:w-48 shrink-0 flex flex-row md:flex-col justify-between md:justify-start gap-4">
        <span className="mono text-[10px] text-zinc-500 font-black tracking-[0.4em] uppercase group-hover:text-brand-purple transition-colors">
          0{index + 1} // VERIFIED
        </span>
        <span className="mono text-[11px] text-white uppercase tracking-widest font-bold">
          {testimonial.context}
        </span>
      </div>

      <div className="flex-1">
        <p className="text-2xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-[1.1] opacity-90 group-hover:opacity-100 transition-opacity">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="hidden md:block w-32 shrink-0 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
         <span className="mono text-[9px] text-zinc-600 uppercase tracking-widest font-black">CONFIRMED</span>
      </div>
    </motion.div>
  );
});

export const Testimonials: React.FC<TestimonialsProps> = ({ onStartPreview }) => {
  return (
    <section id="testimonials" className="py-24 md:py-48 px-6 bg-brand-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_CONSTANTS.viewport}
          variants={VARIANTS.staggerContainer}
          className="space-y-24 md:space-y-32"
        >
          {/* Header */}
          <div className="flex flex-col gap-8">
            <span className="mono text-[10px] text-brand-purple font-black tracking-[0.6em] uppercase">Trader Feedback</span>
            <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter">
              Credibility.
            </h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>

          {/* List */}
          <div className="flex flex-col">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialItem key={t.id} testimonial={t} index={i} />
            ))}
          </div>

          {/* Action */}
          <motion.div 
            variants={VARIANTS.fadeInUp}
            className="flex justify-center pt-8 md:pt-12"
          >
             <button 
               onClick={onStartPreview}
               className="group relative inline-flex items-center gap-4 py-4 px-2 mono text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors"
             >
               <span>Begin Process</span>
               <span className="w-8 h-[1px] bg-zinc-700 group-hover:bg-brand-purple transition-colors" />
             </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
