/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function Skeleton({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Expanding Circle Background */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 20 }}
        transition={{ 
          duration: 1.5, 
          delay: 1.5, 
          ease: [0.76, 0, 0.24, 1] 
        }}
        onAnimationComplete={onComplete}
        className="absolute w-20 h-20 bg-primary rounded-full z-0"
      />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="text-center relative z-10"
      >
        <h1 className="text-7xl text-primary font-bold logo-thuluth mb-8 drop-shadow-sm">
          معتمرون
        </h1>
        <div className="flex justify-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              className="w-3 h-3 bg-primary rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
