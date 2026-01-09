import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, GLASS_STYLES, MOTION_RULES } from '../constants';

export const LodgingPage: React.FC = () => {
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={VARIANTS.reveal}
      className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 min-h-[60vh]"
    >
      <div className={`w-full max-w-4xl ${GLASS_STYLES.card} p-12 md:p-24 flex flex-col items-center text-center space-y-8 relative overflow-hidden`}>
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-3">
             <div className="w-2 h-2 rounded-full bg-zinc-800" />
             <span className="mono text-[10px] text-zinc-600 font-black tracking-[0.5em] uppercase">Status: Idle</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
            No Trades <br />
            <span className="text-zinc-800">Lodged</span>
          </h2>
          
          <p className="mono text-[11px] text-zinc-500 uppercase tracking-widest leading-relaxed max-w-md mx-auto font-bold italic">
            Your execution history is currently empty. Start taking trades in the terminal to populate this ledger.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 pt-8 border-t border-white/5 w-full max-w-sm">
           <div className="flex items-center gap-4 opacity-40">
              <span className="mono text-[9px] text-zinc-700 uppercase tracking-[0.3em] font-black">
                Awaiting_Data_Packet
              </span>
           </div>
           
           <div className="flex gap-1.5 opacity-20">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
};