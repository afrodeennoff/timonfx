import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, ANIM_CONSTANTS } from '../constants';

export const Framework: React.FC = () => {
  return (
    <section id="framework" className="py-24 md:py-48 px-6 bg-[#040404] relative overflow-hidden border-y border-white/20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_CONSTANTS.viewport}
          variants={VARIANTS.staggerContainer}
          className="space-y-10 md:space-y-14"
        >
          <motion.div variants={VARIANTS.reveal} className="space-y-4 md:space-y-6">
            <span className="mono text-[10px] md:text-[11px] text-brand-purple font-black tracking-[0.4em] md:tracking-[0.5em] uppercase">Execution Process</span>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[1] md:leading-[0.9]">
              The 09:27 <br />
              <span className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">Execution Window</span>
            </h2>
          </motion.div>

          <motion.p variants={VARIANTS.reveal} className="mono text-xs md:text-sm text-zinc-300 uppercase tracking-widest leading-loose max-w-xl font-black">
            Edge is found through strict observation. 
            The ORK process identifies liquidity nodes prior to institutional expansion.
          </motion.p>

          <div className="space-y-8 md:space-y-10">
            {[
              { id: '01', title: 'SESSION SCAN', desc: 'Analyzing overnight volume and defining session bias.' },
              { id: '02', title: 'LIQUIDITY ANCHORING', desc: 'Identifying the 09:27 displacement for precise execution.' },
              { id: '03', title: 'PRECISION DEPLOYMENT', desc: 'Executing professional discipline through validated logic.' },
            ].map((step) => (
              <motion.div 
                key={step.id}
                variants={VARIANTS.reveal}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.14, ease: ANIM_CONSTANTS.ease }}
                className="group border-l-2 border-white/10 hover:border-brand-purple pl-6 md:pl-10 transition-colors duration-300"
              >
                <span className="mono text-[10px] md:text-[11px] text-zinc-500 group-hover:text-brand-purple transition-colors font-black">{step.id} //</span>
                <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-widest mt-1 md:mt-2">{step.title}</h4>
                <p className="mono text-[10px] md:text-[11px] text-zinc-400 uppercase mt-2 md:mt-3 tracking-widest font-bold">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={VARIANTS.reveal}
          initial="initial"
          whileInView="animate"
          viewport={ANIM_CONSTANTS.viewport}
          className="relative aspect-square bg-zinc-900/10 border border-white/20 flex items-center justify-center group overflow-hidden shadow-2xl backdrop-blur-md max-w-lg mx-auto w-full transform-gpu"
        >
          <div className="absolute inset-0 opacity-30 md:opacity-50 pointer-events-none">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaa2_1px,transparent_1px),linear-gradient(to_bottom,#aaa2_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:50px_50px]" />
          </div>
          
          <div className="absolute top-4 left-4 md:top-6 md:left-6 mono text-[8px] md:text-[10px] text-zinc-400 uppercase tracking-[0.4em] font-black">STRATEGY v4.2</div>
          
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="relative z-10 transition-transform duration-1000 group-hover:scale-105 p-8 md:p-0">
            <motion.circle 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: ANIM_CONSTANTS.ease }}
              cx="200" cy="200" r="140" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="6 6"
              className="md:r-[160] md:stroke-[1.5]"
            />
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: ANIM_CONSTANTS.ease, delay: 0.5 }}
              d="M80 320 L130 240 L180 280 L240 120 L320 180" fill="none" stroke="white" strokeWidth="3"
              className="md:stroke-5"
            />
            {/* Optimized: Removed shadow-lg animation. Pulse opacity is cheap. */}
            <motion.rect 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.5 }}
              x="230" y="110" width="20" height="20" fill="#8b5cf6" className="animate-pulse" 
            />
            <circle cx="240" cy="120" r="5" fill="white" className="md:r-7" />
          </svg>
          
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 mono text-[9px] md:text-[11px] text-white uppercase tracking-widest bg-brand-purple px-4 md:px-6 py-2 border border-white/20 font-black shadow-2xl">
            ANALYSIS ACTIVE
          </div>
        </motion.div>
      </div>
    </section>
  );
};