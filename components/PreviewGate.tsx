
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VARIANTS, MOTION_RULES, GLASS_STYLES } from '../constants';

interface PreviewGateProps {
  isOpen: boolean;
  onClose: () => void;
}

const TerminalLine: React.FC<{ label: string; value: string; delay?: number }> = ({ label, value, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.32, ease: MOTION_RULES.ease }}
    className="flex justify-between items-center py-2 border-b border-white/10 group/line last:border-0"
  >
    <span className="mono text-[7px] md:text-[8px] text-zinc-600 uppercase tracking-widest font-black">{label}</span>
    <span className="mono text-[8px] md:text-[9px] text-brand-purple font-black tracking-widest group-hover/line:text-white transition-colors duration-300">{value}</span>
  </motion.div>
);

export const PreviewGate: React.FC<PreviewGateProps> = ({ isOpen, onClose }) => {
  const [initSequence, setInitSequence] = useState(0);
  const [authCode, setAuthCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMsg, setStatusMsg] = useState('AWAITING_INPUT');

  useEffect(() => {
    if (isOpen) {
      const timers = [
        setTimeout(() => setInitSequence(1), 300),
        setTimeout(() => setInitSequence(2), 600),
        setTimeout(() => setInitSequence(3), 900),
      ];
      return () => timers.forEach(t => clearTimeout(t));
    } else {
      setInitSequence(0);
      setAuthCode('');
      setIsVerifying(false);
      setStatusMsg('AWAITING_INPUT');
    }
  }, [isOpen]);

  const handleInitialize = () => {
    if (!authCode) {
      setStatusMsg('ERROR: EMPTY_CODE');
      return;
    }
    setIsVerifying(true);
    setStatusMsg('VERIFYING_CREDENTIALS...');
    
    setTimeout(() => {
      setIsVerifying(false);
      setStatusMsg('ERROR: INVALID_CLEARANCE');
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[300]"
          />
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4, ease: MOTION_RULES.ease }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-lg md:max-w-2xl z-[301] p-2 md:p-4"
          >
             <div className={`relative overflow-hidden ${GLASS_STYLES.card} p-6 md:p-10 group/main`}>
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
                </div>
                <div className="absolute inset-[1px] rounded-[2.5rem] pointer-events-none opacity-0 group-hover/main:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-[2.5rem] border border-brand-purple/20 blur-[2px] opacity-70" />
                  <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 opacity-50" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-10 items-start">
                   {/* Left Side: Status */}
                   <div className="w-full md:w-1/2 space-y-5 md:space-y-6">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2 md:gap-3">
                           <div className="w-1.5 h-1.5 bg-brand-purple rounded-full shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                           <span className="mono text-[9px] md:text-[10px] text-brand-purple font-black tracking-[0.5em] uppercase italic">Gate_Online</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
                          TIMON <br />
                          <span className="text-zinc-700">ENTRY</span>
                        </h2>
                      </div>

                      <div className="space-y-1 pt-3 md:pt-4">
                         <TerminalLine label="Identity Check" value={initSequence >= 1 ? "PENDING..." : "WAITING"} delay={0.1} />
                         <TerminalLine label="Encryption" value={initSequence >= 2 ? "SECURE" : "DISABLED"} delay={0.2} />
                         <TerminalLine label="Node Sync" value={initSequence >= 3 ? "STABLE" : "SYNCING"} delay={0.3} />
                         <TerminalLine label="Status" value={statusMsg} delay={0.4} />
                      </div>

                      <p className="mono text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-widest leading-relaxed font-bold border-l border-brand-purple/30 pl-3 md:pl-4">
                        PRIVATE ACCESS ONLY. UNAUTHORIZED ATTEMPTS ARE LOGGED.
                      </p>
                   </div>

                   {/* Right Side: Action */}
                   <div className="w-full md:w-1/2 space-y-5 md:space-y-6">
                      <div className="space-y-3 md:space-y-4">
                        <div className="space-y-2">
                           <span className="mono text-[8px] md:text-[9px] text-zinc-600 font-black tracking-widest uppercase">Clearance Required</span>
                           <motion.input 
                             placeholder="AUTH_CODE_KEY..." 
                             value={authCode}
                             onChange={(e) => setAuthCode(e.target.value)}
                             whileFocus={VARIANTS.inputFocus}
                             className="w-full bg-zinc-950 border border-white/15 p-3 md:p-4 mono text-[10px] md:text-[11px] text-white uppercase tracking-[0.3em] focus:outline-none focus:border-brand-purple font-black placeholder:text-zinc-800 transition-colors duration-300 rounded-xl md:rounded-[1.25rem]"
                           />
                        </div>
                        
                        <motion.button 
                           whileHover={VARIANTS.buttonHover}
                           whileTap={VARIANTS.buttonTap}
                           disabled={isVerifying}
                           onClick={handleInitialize}
                           className={`group relative w-full py-3.5 md:py-4 mono text-[10px] md:text-[11px] font-black text-white uppercase tracking-[0.4em] ${isVerifying ? 'opacity-50 cursor-wait' : `${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover}`}`}
                        >
                           <span className="relative z-10">
                             {isVerifying ? 'SYNCING...' : 'INITIALIZE'}
                           </span>
                        </motion.button>
                      </div>

                      <motion.button 
                        whileHover={VARIANTS.buttonHover}
                        whileTap={VARIANTS.buttonTap}
                        onClick={onClose}
                        className={`w-full py-3 mono text-[8px] md:text-[9px] text-zinc-600 hover:text-white uppercase tracking-[0.6em] font-black ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover}`}
                      >
                        Abort
                      </motion.button>
                   </div>
                </div>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};