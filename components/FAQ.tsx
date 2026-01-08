import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA, VARIANTS, GLASS_STYLES } from '../constants';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 md:py-16 px-6 bg-brand-black border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-10 md:mb-12">
           <span className="mono text-[10px] text-brand-purple font-black tracking-[0.4em] uppercase">Common // Questions</span>
           <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">FAQs</h2>
        </div>

        <div className="space-y-4" role="tablist">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className={`group rounded-[1.5rem] overflow-hidden transition-all duration-500 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover}`}>
              <motion.button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                whileFocus={VARIANTS.buttonFocus}
                className="w-full flex justify-between items-center p-6 md:p-8 text-left transition-colors focus:outline-none"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="mono text-[10px] md:text-[11px] text-white uppercase tracking-widest font-black pr-8 leading-relaxed group-hover:text-brand-purple transition-colors duration-300">
                  {item.q}
                </span>
                <span className={`mono text-[9px] md:text-[10px] font-bold shrink-0 tabular-nums transition-colors duration-300 ${openIndex === i ? 'text-brand-purple' : 'text-zinc-600'}`}>
                  {openIndex === i ? '[-]' : '[+]'}
                </span>
              </motion.button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    id={`faq-answer-${i}`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 border-t border-white/5">
                      <p className="mono text-[10px] md:text-[11px] text-zinc-400 uppercase tracking-widest leading-loose font-bold italic pt-6 border-l border-brand-purple/20 pl-5">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};