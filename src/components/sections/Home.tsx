"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from "react";
import { Download, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { useMounted } from "@/hooks/useMounted";
import { useTheme } from "next-themes";
import { AvatarEffect } from "@/components/ui/AvatarEffect";

export function Home() {
  const t = useTranslations('Home');
  const mounted = useMounted();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!mounted) {
    return <section className="min-h-[50vh]" />;
  }

  return (
    <section
      id="hero"
      className="flex items-center justify-center overflow-visible relative transition-colors duration-300"
      style={{
        backgroundColor: 'transparent',
        minHeight: '100svh',
        padding: 'clamp(2rem, 5vh, 10rem) clamp(1.5rem, 4vw, 3rem)',
      }}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10" style={{ gap: '3rem' }}>

        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start text-left space-y-6 lg:space-y-8 z-10 order-2 lg:order-1">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-outfit leading-none whitespace-nowrap"
          >
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500"
            >
              {t('title')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl max-w-lg font-bold"
            style={{ color: 'var(--home-text)' }}
          >
            {t('description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <p className="text-sm md:text-base font-bold text-cyan-800 dark:text-cyan-400 uppercase tracking-widest">
              {t('role')}
            </p>
          </motion.div>

          {/* Deming Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative p-6 rounded-r-xl overflow-hidden border-l-4 backdrop-blur-[32px] max-w-lg mt-4"
            style={{
              // Conditional gradient based on theme
              background: isDark
                ? 'linear-gradient(135deg, #1e293b 0%, #063090ff 40%, #2e1065 100%)' // Dark Mode: Cosmic Depth
                : 'linear-gradient(135deg, #caecf1ff 40%, #6eb5f4ff 100%)', // Light Mode: Bio-Luminescent
              // Border styling
              borderLeftColor: isDark ? '#5fafffff' : '#0b2e97ff', // Royal Cyan accent bar
              borderWidth: '4px',
              borderTop: isDark ? 'none' : '1px solid #000000',
              borderRight: isDark ? 'none' : '1px solid #000000',
              borderBottom: isDark ? 'none' : '1px solid #000000',
              // Nebula glow for dark mode, Inner glow for light mode
              boxShadow: isDark
                ? '0 0 30px rgba(46, 16, 101, 0.4)'
                : 'inset 0 0 15px rgba(255, 255, 255, 0.2)', // Subtler inner glow for bold bg
            }}
          >
            <p
              className="font-serif italic text-lg md:text-xl tracking-wide"
              style={{
                color: isDark ? '#FFFFFF' : '#000000ff', // Force White for both modes given the dark/vibrant backgrounds
                textShadow: isDark ? '0 1px 2px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              "{t('quote')}"
            </p>
            <span
              className="font-mono text-sm mt-3 block font-bold"
              style={{
                color: isDark ? '#06b6d4' : '#000000ff', // Vivid Cyan for dark, Ice Blue for light/vibrant bg
              }}
            >
              — W. Edwards Deming
            </span>
          </motion.div>
        </div>

        {/* Right Column: Avatar & Resume */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative flex flex-col items-center justify-center gap-8 order-1 lg:order-2 min-h-fit h-auto"
        >
          {/* Avatar Container with Kinetic Halo */}
          <AvatarEffect />

          {/* Resume Dropdown - Relative Flow */}
          <ResumeDropdown />
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-8 h-8 text-slate-600 dark:text-white/20" />
      </motion.div>
    </section>
  );
}



function ResumeDropdown() {
  const t = useTranslations('Home');
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const resumeOptions = [
    { label: "🇫🇷 FR", href: "/assets/CV_Phuc_Anh_DANG_FR.pdf" },
    { label: "🇬🇧 EN", href: "/assets/CV_Phuc_Anh_DANG_EN.pdf" },
    { label: "🇻🇳 VI", href: "/assets/CV_Phuc_Anh_DANG_VI.pdf" },
  ];

  return (
    <div
      className="flex flex-col items-center z-[100]"
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Resume Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-[1rem] px-[2.5rem] py-[1rem] rounded-full transition-all duration-300 border font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 bg-black dark:bg-[var(--nav-bg)] text-white dark:text-[var(--nav-text)] border-black dark:border-[var(--nav-border)] text-lg"
      >
        <Sparkles size={20} className="text-white dark:text-cyan-400" />
        <span>{t('resumeButton')}</span>
        <ChevronDown
          size={20}
          className={`text-white dark:text-[var(--nav-text)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 50px Buffer Spacer - Creates physical space that respects zoom */}
      {isOpen && <div className="h-[30px]" />}

      {/* Dropdown Menu - Relative Flow Positioning */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="backdrop-blur-md border rounded-xl overflow-hidden shadow-2xl z-[110] flex flex-row"
            style={{
              minWidth: 'max-content',
              backgroundColor: !isDark ? '#ffffff' : 'rgba(0, 0, 0, 0.9)',
              borderColor: !isDark ? '#000000' : 'rgba(255, 255, 255, 0.1)',
            }}
          >
            {resumeOptions.map((option) => (
              <a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-[0.75rem] px-[1.5rem] py-[1rem] font-bold text-base transition-colors border-r last:border-0 min-w-[5rem]"
                style={{
                  color: !isDark ? '#000000' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: !isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = !isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Download size={16} className="opacity-70" />
                {option.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
