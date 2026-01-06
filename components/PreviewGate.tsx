
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreviewGateProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewGate: React.FC<PreviewGateProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[300]"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl z-[301] p-1 bg-zinc-900 border border-white/30 shadow-2xl"
          >
             <div className="bg-[#030303] p-10 md:p-16 space-y-10 md:space-y-14 text-center">
                <div className="space-y-4 md:space-y-6">
                  <span className="mono text-[10px] md:text-[11px] text-brand-purple font-black tracking-[0.6em] uppercase">Restricted // Access</span>
                  <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Restricted Area</h2>
                </div>
                
                <p className="mono text-[10px] md:text-[11px] text-zinc-300 uppercase tracking-widest leading-loose font-bold">
                   THIS AREA IS FOR MEMBERS ONLY. <br />
                   STATUS: <span className="text-brand-red font-black text-glow">LOCKED</span>
                </p>

                <div className="space-y-4 md:space-y-6">
                   <input 
                     placeholder="ENTRY CODE..." 
                     className="w-full bg-zinc-950 border border-white/20 p-5 md:p-6 mono text-[11px] md:text-[12px] text-white uppercase tracking-widest focus:outline-none focus:border-brand-purple font-bold placeholder:text-zinc-800 transition-colors"
                   />
                   <button className="group relative w-full py-5 md:py-6 bg-brand-purple overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                     <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                     <span className="relative z-10 mono text-[11px] md:text-[12px] font-black text-white group-hover:text-black uppercase tracking-widest transition-colors duration-500">
                       Unlock Access
                     </span>
                   </button>
                </div>

                <button 
                  onClick={onClose}
                  className="mono text-[9px] text-zinc-500 hover:text-white uppercase tracking-[0.6em] transition-colors font-black py-2"
                >
                  Return to Main Page
                </button>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
