import React from 'react';
import { motion } from 'framer-motion';
import { VARIANTS, MOTION_RULES, SOCIAL_LINKS } from '../constants';

export const SocialProof: React.FC = () => {
  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={MOTION_RULES.viewport}
      variants={VARIANTS.staggerContainer}
      className="bg-brand-black pt-0 pb-10 md:pb-14"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={VARIANTS.reveal}
          className="flex items-center justify-center gap-7 md:gap-10"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-white transition-colors duration-300"
              aria-label={link.name}
            >
              {React.cloneElement(link.icon, { className: link.name === 'X' ? 'w-5 h-5' : 'w-6 h-6' })}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};