
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA } from '../constants';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-6 bg-brand-black border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-24">
           <span className="mono text-[10px] text-brand-purple font-black tracking-[0.4em] uppercase">Common // Questions</span>
           <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">FAQs</h2>
        </div>

        <div className="space-y-4" role="tablist">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="border border-white/20 bg-zinc-900/10 hover:border-white/40 transition-colors group">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-8 text-left hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:bg-white/5"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="mono text-[11px] md:text-xs text-white uppercase tracking-widest font-black pr-4 leading-relaxed group-hover:text-zinc-200 transition-colors">{item.q}</span>
                <span className="mono text-xs text-brand-purple font-bold shrink-0">{openIndex === i ? '[-]' : '[+]'}</span>
              </button>
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
                    <div className="p-8 pt-0 border-t border-white/10">
                      <p className="mono text-[11px] md:text-xs text-zinc-300 uppercase tracking-widest leading-loose font-bold">
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
