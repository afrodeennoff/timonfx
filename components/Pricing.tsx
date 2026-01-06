
import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, ANIM_CONSTANTS } from '../constants';

interface PricingProps {
  onStartPreview: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onStartPreview }) => {
  return (
    <section id="pricing" className="py-32 px-6 bg-[#050505] border-t border-white/10 relative overflow-hidden transform-gpu">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_CONSTANTS.viewport}
          variants={VARIANTS.fadeInUp}
          className="text-center space-y-4 mb-24"
        >
           <span className="mono text-[10px] text-brand-purple font-black tracking-[0.4em] uppercase">Join the desk</span>
           <h2 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter">Get Funded</h2>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={ANIM_CONSTANTS.viewport}
          variants={VARIANTS.staggerContainer}
          className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
        >
           {/* Tier 1 */}
           <motion.div 
            variants={VARIANTS.fadeInUp}
            className="bg-zinc-900/30 border border-white/20 p-12 space-y-10 relative overflow-hidden group hover:border-white/40 transition-all duration-500 shadow-2xl flex flex-col"
           >
              <div className="absolute top-0 right-0 p-6 opacity-[0.05] pointer-events-none">
                 <span className="text-9xl font-black italic">P1</span>
              </div>
              <div className="space-y-3 relative z-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-widest">Core Plan</h3>
                <p className="mono text-[11px] text-zinc-300 uppercase tracking-widest font-bold">Standard Access</p>
              </div>
              <div className="text-4xl font-black text-white mono relative z-10">$497<span className="text-xs text-zinc-400 uppercase ml-2 tracking-widest font-bold">LIFETIME</span></div>
              <ul className="space-y-4 flex-1 relative z-10">
                 {['Fundamental Training', 'Weekly Reviews', 'Prop Firm Strategy', 'Access to Trader Hub'].map(item => (
                   <li key={item} className="mono text-[11px] text-zinc-200 uppercase flex items-center gap-3 font-bold">
                      <span className="w-1.5 h-[1px] bg-brand-purple" />
                      {item}
                   </li>
                 ))}
              </ul>
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onStartPreview}
                className="group relative w-full z-10 py-5 border border-white/15 overflow-hidden transition-all duration-500 mono text-[11px] font-black uppercase tracking-[0.2em] text-white bg-white/5"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.19,1,0.22,1]" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-500 font-black uppercase">Get Access</span>
              </motion.button>
           </motion.div>

           {/* Tier 2 */}
           <motion.div 
            variants={VARIANTS.fadeInUp}
            className="bg-brand-purple p-12 space-y-10 relative overflow-hidden shadow-2xl shadow-brand-purple/20 group hover:scale-[1.01] transition-all duration-700 ease-[0.19,1,0.22,1] flex flex-col"
           >
              <div className="absolute top-0 right-0 p-6 opacity-15 pointer-events-none">
                 <span className="text-9xl font-black italic text-black">P2</span>
              </div>
              <div className="space-y-3 relative z-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-widest">Advanced Access</h3>
                <p className="mono text-[11px] text-purple-100 uppercase tracking-widest font-bold">Pro Trading Tools</p>
              </div>
              <div className="text-4xl font-black text-white mono relative z-10">$997<span className="text-xs text-purple-200 uppercase ml-2 tracking-widest font-bold">LIFETIME</span></div>
              <ul className="space-y-4 flex-1 relative z-10">
                 {['Advanced Strategies', 'Daily NY Morning Analysis', 'Priority Chat with Timon', 'Private Group Insights'].map(item => (
                   <li key={item} className="mono text-[11px] text-white uppercase flex items-center gap-3 font-black">
                      <span className="w-1.5 h-[1px] bg-white" />
                      {item}
                   </li>
                 ))}
              </ul>
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onStartPreview}
                className="group relative w-full z-10 py-5 bg-white overflow-hidden transition-all duration-600 mono text-[11px] font-black uppercase tracking-[0.2em] text-black shadow-2xl"
              >
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.19,1,0.22,1]" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500 font-black uppercase">Get Pro Access</span>
              </motion.button>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
