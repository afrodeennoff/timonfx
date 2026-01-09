import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA, VARIANTS, GLASS_STYLES, MOTION_RULES } from '../constants';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-10 md:py-14 px-6 bg-brand-black scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={MOTION_RULES.viewport}
          variants={VARIANTS.reveal}
          className="text-center space-y-4 mb-16"
        >
           <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Frequently Asked Questions</h2>
           <p className="mono text-[11px] text-zinc-500 tracking-widest leading-relaxed max-w-lg mx-auto uppercase font-bold">
              Everything you need to know about our trading mentorship program.
           </p>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={MOTION_RULES.viewport}
          variants={VARIANTS.staggerContainer}
          className="space-y-4"
          role="tablist"
        >
          {FAQ_DATA.map((item, i) => (
            <motion.div 
              key={i} 
              variants={VARIANTS.reveal}
              whileHover={VARIANTS.cardHover}
              className={`group/main rounded-[2rem] overflow-hidden transition-all duration-500 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover}`}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                whileFocus={VARIANTS.buttonFocus}
                className="w-full flex justify-between items-center p-8 text-left transition-colors focus:outline-none relative z-10"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="mono text-[11px] md:text-xs text-white uppercase tracking-widest font-black pr-8 leading-relaxed group-hover/main:text-brand-purple transition-colors duration-300">
                  {item.q}
                </span>
                <span className={`mono text-[10px] font-bold shrink-0 tabular-nums transition-colors duration-300 ${openIndex === i ? 'text-brand-purple' : 'text-zinc-600'}`}>
                  {openIndex === i ? '[-]' : '[+]'}
                </span>
              </motion.button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: MOTION_RULES.revealDuration, ease: MOTION_RULES.ease }}
                    className="overflow-hidden relative z-10"
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    id={`faq-answer-${i}`}
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-white/5">
                      <p className="mono text-[11px] md:text-xs text-zinc-400 uppercase tracking-widest leading-loose font-bold italic pt-6 border-l-2 border-brand-purple/20 pl-6 group-hover/main:text-white transition-colors duration-300">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};