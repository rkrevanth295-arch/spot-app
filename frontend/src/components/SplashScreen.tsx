import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  show: boolean;
  onDone: () => void;
}

export default function SplashScreen({ show, onDone }: Props) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDone, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  const letters = ['S', 'P', 'O', 'T'];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] bg-[#0B0E11] flex flex-col items-center justify-center"
        >
          <div className="flex items-end">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative text-7xl font-bold ${letter === 'O' ? 'text-[#FF6B4A]' : 'text-[#F5F5F0]'}`}
              >
                {letter}
                {letter === 'O' && (
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.2 + 0.4, type: 'spring', stiffness: 400 }}
                    className="absolute top-1 right-0 text-2xl text-[#F5A623]"
                  >
                    ✦
                  </motion.span>
                )}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-[#8A8F98] text-lg mt-4 font-light tracking-wide"
          >
            Discover places others haven't found yet
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex gap-2 mt-8">
            {[0, 1, 2].map((dot) => (
              <motion.span key={dot} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
                className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}