import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, ANIM_SYSTEM, GLASS_STYLES } from '../constants';
import { ConicGradient } from './ConicGradient';

interface PricingProps {
  onStartPreview: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onStartPreview }) => {
  return (
    <section id="access" className="py-12 md:py-16 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden transform-gpu scroll-mt-24 md:scroll-mt-32">
      <ConicGradient opacity={0.04} size="100%" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_SYSTEM.viewport}
          variants={VARIANTS.reveal}
          className="text-center space-y-4 mb-10 md:mb-12"
        >
           <span className="mono text-[10px] text-brand-purple font-black tracking-[0.5em] uppercase italic">Enrollment_Portal</span>
           <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">Protocol Access</h2>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_SYSTEM.viewport}
          variants={VARIANTS.staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
           {/* Core Tier */}
           <motion.div 
            variants={VARIANTS.reveal}
            whileHover={VARIANTS.cardHover}
            className={`p-8 md:p-10 relative overflow-hidden flex flex-col rounded-[2.5rem] transition-all duration-500 ${GLASS_STYLES.card} ${GLASS_STYLES.cardHover}`}
           >
              <div className="space-y-2 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  <h3 className="text-xl font-black text-white uppercase tracking-widest italic">Core Plan</h3>
                </div>
                <p className="mono text-[9px] text-zinc-500 uppercase font-black tracking-widest">Validated Entry Framework</p>
              </div>
              <div className="flex items-baseline gap-2 relative z-10 py-4 border-y border-white/5 my-4">
                <span className="text-4xl font-black text-white mono tracking-tighter">$497</span>
                <span className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] font-black">LIFETIME</span>
              </div>
              <ul className="space-y-4 flex-1 relative z-10 mb-6">
                 {['Fundamental Training', 'Weekly Reviews', 'Prop Strategy', 'Trader Hub Access'].map(item => (
                   <li key={item} className="mono text-[10px] text-zinc-300 uppercase flex items-center gap-3 font-bold group/li transition-all">
                      <span className="w-1 h-1 rounded-full bg-brand-purple/20 group-hover/li:bg-brand-purple transition-colors" />
                      {item}
                   </li>
                 ))}
              </ul>
              <motion.button 
                whileHover={VARIANTS.buttonHover}
                whileTap={VARIANTS.buttonTap}
                onClick={onStartPreview}
                className={`group relative w-full z-10 py-4 rounded-full mono text-[10px] font-black uppercase tracking-[0.4em] text-white ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover}`}
              >
                <span className="relative z-10 font-black uppercase">INITIALIZE</span>
              </motion.button>
           </motion.div>

           {/* Pro Tier */}
           <motion.div 
            variants={VARIANTS.reveal}
            whileHover={VARIANTS.cardHover}
            className={`p-8 md:p-10 relative overflow-hidden flex flex-col rounded-[2.5rem] transition-all duration-500 border-brand-purple/30 bg-brand-purple/10 backdrop-blur-3xl shadow-[0_40px_80px_-20px_rgba(139,92,246,0.3)] hover:border-brand-purple/50`}
           >
              <div className="space-y-2 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                  <h3 className="text-xl font-black text-white uppercase tracking-widest italic">Pro Execution</h3>
                </div>
                <p className="mono text-[9px] text-brand-purple font-black tracking-widest uppercase italic">Advanced Institutional Dossier</p>
              </div>
              <div className="flex items-baseline gap-2 relative z-10 py-4 border-y border-brand-purple/20 my-4">
                <span className="text-4xl font-black text-white mono tracking-tighter">$997</span>
                <span className="text-[9px] text-brand-purple/60 uppercase tracking-[0.4em] font-black">LIFETIME</span>
              </div>
              <ul className="space-y-4 flex-1 relative z-10 mb-6">
                 {['Advanced Strategies', 'NY Live Analysis', 'Priority Intel', 'Private Insights'].map(item => (
                   <li key={item} className="mono text-[10px] text-white uppercase flex items-center gap-3 font-black group/li">
                      <span className="w-1 h-1 rounded-full bg-white group-hover/li:shadow-[0_0_8px_white] transition-all" />
                      {item}
                   </li>
                 ))}
              </ul>
              <motion.button 
                whileHover={VARIANTS.buttonHover}
                whileTap={VARIANTS.buttonTap}
                onClick={onStartPreview}
                className={`group relative w-full z-10 py-4 rounded-full mono text-[10px] font-black uppercase tracking-[0.4em] text-black bg-white shadow-[0_15px_40px_rgba(139,92,246,0.4)] hover:bg-zinc-200 transition-all duration-300`}
              >
                <span className="relative z-10 font-black uppercase">DEPLOY PRO</span>
              </motion.button>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
};