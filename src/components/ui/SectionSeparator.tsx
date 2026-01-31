"use client";

import { motion } from 'framer-motion';

// Legacy separator (kept for compatibility)
export function SectionSeparator() {
  return (
    <div className="relative z-10 w-full flex items-center justify-center py-20 pointer-events-none">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "70%", opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="h-[2px] bg-gradient-to-r from-transparent via-cyan-blue to-transparent relative shadow-[0_0_15px_rgba(0,191,255,0.6)]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(0,191,255,1)]" />
      </motion.div>
    </div>
  );
}

// Enhanced Data Stream Separator (recommended)
export function Separator() {
  return (
    <div className="relative z-10 w-full flex items-center justify-center py-16 pointer-events-none">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "80%", opacity: 0.8 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="h-[1px] bg-gradient-to-r from-transparent via-electric-blue to-transparent relative"
        style={{
          boxShadow: '0 0 10px currentColor',
          filter: 'drop-shadow(0 0 8px rgba(0, 210, 255, 0.5))'
        }}
      >
        {/* Glowing pulse at center */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-electric-blue"
          style={{
            boxShadow: '0 0 12px rgba(0, 210, 255, 0.9), 0 0 20px rgba(0, 210, 255, 0.6)'
          }}
        />
      </motion.div>
    </div>
  );
}
