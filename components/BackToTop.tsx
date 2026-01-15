

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GLASS_STYLES } from '../constants';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] px-3 py-2 md:px-4 md:py-3 ${GLASS_STYLES.button} ${GLASS_STYLES.buttonHover} flex items-center justify-center mono text-[9px] md:text-[10px] font-black group transition-all whitespace-nowrap`}
        >
          <span className="relative z-10 tracking-[0.2em]">TOP</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};