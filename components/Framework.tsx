
import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, MOTION_RULES, GLASS_STYLES } from '../constants';
import { GhostText } from './GhostText';

export const Framework: React.FC = () => {
  return (
    <section id="framework" className="py-10 md:py-14 px-6 bg-[#040404] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-10 items-center">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={MOTION_RULES.viewport}
          variants={VARIANTS.staggerContainer}
          className="space-y-5"
        >
          <motion.div variants={VARIANTS.reveal} className="space-y-3">
            <span className="mono text-[9px] md:text-[10px] text-brand-purple font-black tracking-[0.4em] uppercase">Process</span>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
              THE LOGIC BEHIND <br />
              <GhostText text="EXECUTION." className="text-transparent transition-colors cursor-default stroke-text" />
            </h2>
          </motion.div>

          <motion.p variants={VARIANTS.reveal} className="mono text-[10px] md:text-[11px] text-zinc-400 uppercase tracking-widest leading-relaxed max-w-sm font-bold">
            The TIMON process identifies liquidity nodes prior to institutional expansion for high-probability reactions.
          </motion.p>

          <div className="space-y-3.5">
            {[
              { id: '01', title: 'SESSION SCAN', desc: 'Analyzing overnight volume nodes.' },
              { id: '02', title: 'LIQUIDITY ANCHOR', desc: 'Identifying the displacement window.' },
              { id: '03', title: 'EXECUTION', desc: 'Taking the trade with strict risk rules.' },
            ].map((step) => (
              <motion.div 
                key={step.id}
                variants={VARIANTS.reveal}
                whileHover={{ x: 4 }}
              >
                <span className="mono text-[8px] md:text-[9px] text-zinc-600 font-black">0{step.id} //</span>
                <h4 className="text-base md:text-lg font-black text-white uppercase tracking-widest mt-0.5">{step.title}</h4>
                <p className="mono text-[8px] md:text-[9px] text-zinc-500 uppercase mt-0.5 tracking-widest font-bold">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={VARIANTS.reveal}
          initial="initial"
          whileInView="animate"
          viewport={MOTION_RULES.viewport}
          className={`relative aspect-square flex items-center justify-center group/main overflow-hidden max-w-md mx-auto w-full transform-gpu ${GLASS_STYLES.card}`}
        >
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaa1_1px,transparent_1px),linear-gradient(to_bottom,#aaa1_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          <div className="absolute inset-[1px] rounded-[2.5rem] pointer-events-none opacity-0 group-hover/main:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 rounded-[2.5rem] border border-brand-purple/20 blur-[2px] opacity-70" />
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 opacity-50" />
          </div>
          
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="relative z-10 transition-transform duration-1000 group-hover/main:scale-105 p-7">
            <motion.circle 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: MOTION_RULES.ease }}
              cx="200" cy="200" r="140" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 4"
              className="opacity-40"
            />
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: MOTION_RULES.ease, delay: 0.3 }}
              d="M80 320 L130 240 L180 280 L240 120 L320 180" fill="none" stroke="white" strokeWidth="2"
              className="opacity-80"
            />
          </svg>
          
          <div className={`absolute bottom-3.5 right-3.5 mono text-[9px] text-white uppercase tracking-widest px-3 py-1 font-black border border-brand-purple/30 rounded-lg bg-brand-purple/80`}>
            DESK_ACTIVE
          </div>
        </motion.div>
      </div>
      <style>{` .stroke-text { -webkit-text-stroke: 1.5px rgba(255,255,255,0.25); } `}</style>
    </section>
  );
};