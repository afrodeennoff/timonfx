
import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, ANIM_SYSTEM, GLASS_STYLES } from '../constants';

export const Framework: React.FC = () => {
  return (
    <section id="framework" className="py-20 md:py-32 px-6 bg-[#040404] relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_SYSTEM.viewport}
          variants={VARIANTS.staggerContainer}
          className="space-y-10"
        >
          <motion.div variants={VARIANTS.reveal} className="space-y-4">
            <span className="mono text-[10px] text-brand-purple font-black tracking-[0.4em] uppercase">Process</span>
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
              The 09:27 <br />
              <span className="text-zinc-600 transition-colors cursor-default">Execution Window</span>
            </h2>
          </motion.div>

          <motion.p variants={VARIANTS.reveal} className="mono text-[11px] text-zinc-400 uppercase tracking-widest leading-relaxed max-w-md font-bold">
            The ORK process identifies liquidity nodes prior to institutional expansion for high-probability reactions.
          </motion.p>

          <div className="space-y-6">
            {[
              { id: '01', title: 'SESSION SCAN', desc: 'Analyzing overnight volume nodes.' },
              { id: '02', title: 'LIQUIDITY ANCHOR', desc: 'Identifying the displacement window.' },
              { id: '03', title: 'DEPLOYMENT', desc: 'Executing with strict risk parameters.' },
            ].map((step) => (
              <motion.div 
                key={step.id}
                variants={VARIANTS.reveal}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.14, ease: ANIM_SYSTEM.ease }}
                className="group border-l border-white/10 hover:border-brand-purple/50 pl-6 transition-colors"
              >
                <span className="mono text-[9px] text-zinc-600 font-black">{step.id} //</span>
                <h4 className="text-lg font-black text-white uppercase tracking-widest mt-1">{step.title}</h4>
                <p className="mono text-[9px] text-zinc-500 uppercase mt-1 tracking-widest font-bold">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={VARIANTS.reveal}
          initial="initial"
          whileInView="animate"
          viewport={ANIM_SYSTEM.viewport}
          className={`relative aspect-square border flex items-center justify-center group overflow-hidden max-w-md mx-auto w-full transform-gpu ${GLASS_STYLES.card}`}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaa2_1px,transparent_1px),linear-gradient(to_bottom,#aaa2_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="relative z-10 transition-transform duration-1000 group-hover:scale-105 p-12">
            <motion.circle 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: ANIM_SYSTEM.ease }}
              cx="200" cy="200" r="140" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 4"
              className="opacity-40"
            />
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: ANIM_SYSTEM.ease, delay: 0.3 }}
              d="M80 320 L130 240 L180 280 L240 120 L320 180" fill="none" stroke="white" strokeWidth="2"
              className="opacity-80"
            />
          </svg>
          
          <div className={`absolute bottom-6 right-6 mono text-[9px] text-white uppercase tracking-widest px-4 py-1.5 font-black border border-white/10 rounded-lg bg-brand-purple/80`}>
            SYSTEM_ACTIVE
          </div>
        </motion.div>
      </div>
    </section>
  );
};
