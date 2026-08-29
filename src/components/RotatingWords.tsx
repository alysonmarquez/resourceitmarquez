import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroRotatingWords } from '../data/communityData';

export function RotatingWords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroRotatingWords.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E6E9EF]/15 bg-[#103653]/30 backdrop-blur-md">
      <span className="font-mono text-xs text-[#A1AEC2]">Aqui você encontra:</span>
      <div className="relative h-6 min-w-[170px] overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={heroRotatingWords[index]}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute font-mono text-xs font-bold text-[#E0A34A] tracking-wider"
          >
            [ {heroRotatingWords[index]} ]
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
