"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center"
      >
        <span className="text-gray-400 dark:text-white/50 text-sm font-light tracking-widest uppercase mb-2">Scroll</span>
        <ChevronDown className="w-6 h-6 text-gray-600 dark:text-white/80" />
      </motion.div>
    </motion.div>
  );
}
