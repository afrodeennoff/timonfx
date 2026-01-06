
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-white text-black flex items-center justify-center mono text-[10px] font-black group transition-all"
        >
          <div className="absolute inset-0 bg-brand-purple scale-0 group-hover:scale-100 transition-transform" />
          <span className="relative z-10 group-hover:text-white">TOP</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
