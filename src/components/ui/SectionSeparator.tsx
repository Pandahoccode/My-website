"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/useMounted';

export function Separator() {
  // 1. Theme Logic
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();

  // Prevent hydration mismatch by defaulting to a safe state until mounted
  if (!mounted) return <div className="py-24" />;

  const isDark = resolvedTheme === 'dark';

  // Define colors for JS-based animations (Shadows)
  // All Blues: Cyan for Dark Mode / Royal Blue for Light Mode
  const shadowColor = isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(59, 130, 246, 0.5)';
  const glowColor = isDark ? 'rgba(6, 182, 212, 0.9)' : 'rgba(59, 130, 246, 0.9)';

  return (
    <div className="relative z-10 w-full flex items-center justify-center py-24 pointer-events-none">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "90%", opacity: 1 }}
        transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        // 2. Increased Height: h-[3px] for better visibility
        className="relative h-[3px] rounded-full"
      >
        {/* Base Line Background - ALL BLUE (Blue-500 in Light, Cyan-600 in Dark) */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 dark:via-cyan-600 to-transparent opacity-40 blur-[0.5px]" />

        {/* Breathing Energy Pulse - ALL BLUE (Blue-300 in Light, Cyan-400 in Dark) */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            opacity: [0.4, 0.8, 1, 0.8, 0.4],
            scaleX: [0.95, 1, 1.05, 1, 0.95],
            scaleY: [1, 1.5, 2, 1.5, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: [0.37, 0, 0.63, 1], // Organic sine wave — natural inhale/exhale
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300 dark:via-cyan-400 to-transparent blur-sm"
        />

        {/* The Heartbeat Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={prefersReducedMotion ? {} : {
              // Heartbeat scale sequence
              scale: [1, 1.2, 1.3, 1.2, 1],
              opacity: [0.7, 0.9, 1, 0.9, 0.7],
              boxShadow: [
                `0 0 10px ${shadowColor}`,
                `0 0 20px ${shadowColor}`,
                `0 0 35px ${glowColor}`,
                `0 0 20px ${shadowColor}`,
                `0 0 10px ${shadowColor}`
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: [0.22, 0.68, 0, 1.71], // Elastic overshoot — organic heartbeat
            }}
            // Dot Color: Blue-600 (Light) / Cyan-500 (Dark)
            className="relative w-3 h-3 rounded-full bg-blue-600 dark:bg-cyan-500"
          />
        </div>
      </motion.div>
    </div>
  );
}
