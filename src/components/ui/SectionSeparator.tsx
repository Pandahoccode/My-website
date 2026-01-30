"use client";

import { motion } from 'framer-motion';

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
