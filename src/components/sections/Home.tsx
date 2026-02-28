"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { ChevronDown } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";
import { useTheme } from "next-themes";
import { AvatarEffect } from "@/components/ui/AvatarEffect";
import { ResumeDropdown } from "@/components/ui/ResumeDropdown";
import { SocialOrbit } from "@/components/ui/SocialOrbit";

export function Home() {
  const t = useTranslations('Home');
  const mounted = useMounted();
  const { theme } = useTheme();
  // Simplified theme check — safe because we early-return below when !mounted
  const isDark = mounted ? (theme === 'dark' || theme === 'system') : true;

  if (!mounted) {
    return <section className="min-h-[100svh]" />;
  }

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-visible transition-colors duration-500"
      style={{
        backgroundColor: 'transparent',
        minHeight: '100svh',
        padding: 'clamp(2rem, 5vh, 10rem) clamp(1.5rem, 4vw, 3rem)',
      }}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-12 lg:gap-20">

        {/* 1. The "Who & What" (Typographic Anchor) */}
        <div className="flex flex-col items-start text-left space-y-8 z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            {/* Greeting */}
            <p className="text-lg md:text-xl font-bold text-foreground/60">
              {t('greeting')}
            </p>


            {/* Name: Largest Element, High Contrast, Gradient */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter font-outfit leading-[0.9]">
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-600 animate-gradient-x bg-[length:200%_auto]"
              >
                {t('title')}
              </span>
            </h1>

            {/* The "Elevator Pitch": Punchy, Contrast */}
            <p
              className="text-xl md:text-2xl font-bold max-w-xl leading-relaxed"
              style={{ color: 'var(--foreground)' }}
            >
              <span className="opacity-90">{t('bio')}</span>
            </p>

            <p className="text-sm md:text-base text-foreground/70 max-w-md leading-relaxed">
              {t('description')}
            </p>

            {/* Deming Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative p-6 rounded-r-xl overflow-hidden border-l-4 backdrop-blur-[32px] max-w-lg mt-4"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #1e293b 0%, #063090ff 40%, #2e1065 100%)'
                  : 'linear-gradient(135deg, #caecf1ff 40%, #6eb5f4ff 100%)',
                borderLeftColor: isDark ? '#5fafffff' : '#0b2e97ff',
                borderWidth: '4px',
                borderTop: isDark ? 'none' : '1px solid #000000',
                borderRight: isDark ? 'none' : '1px solid #000000',
                borderBottom: isDark ? 'none' : '1px solid #000000',
                boxShadow: isDark
                  ? '0 0 30px rgba(46, 16, 101, 0.4)'
                  : 'inset 0 0 15px rgba(255, 255, 255, 0.2)',
              }}
            >
              <p
                className="font-serif italic text-lg md:text-xl tracking-wide"
                style={{
                  color: isDark ? '#FFFFFF' : '#000000ff',
                  textShadow: isDark ? '0 1px 2px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.2)',
                }}
              >
                {t('quote')}
              </p>
              <p
                className="mt-2 text-sm font-mono opacity-70"
                style={{ color: isDark ? '#a5b4fc' : '#1e40af' }}
              >
                {t('quoteAuthor')}
              </p>
            </motion.div>
          </motion.div>
          <SocialOrbit />
        </div>

        {/* 2. The "Elastic Avatar" (Visual Focal Point) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
          className="relative flex flex-col items-center justify-center gap-12 order-1 lg:order-2"
        >
          {/* Avatar Container with Kinetic Halo - Source of Light */}
          <AvatarEffect />

          {/* 3. The "Resume & Contact" (Primary Action)
              Placing it below Avatar makes it a strong focal point in the "Light" column.
              Verified with: "It acts as the Source of Light... Resume Toggle... center-aligned uses glass-surface"
           */}
          <div className="relative z-20">
            <ResumeDropdown />
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator - Bottom Center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-8 h-8 text-slate-400 dark:text-white/30" />
      </motion.div>
    </section >
  );
}
