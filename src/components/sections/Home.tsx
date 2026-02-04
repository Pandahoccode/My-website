"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { useState } from "react";
import { Download, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { useMounted } from "@/hooks/useMounted";

export function Home() {
  const t = useTranslations('Home');
  const mounted = useMounted();

  if (!mounted) {
    return <section className="min-h-[85vh]" />;
  }

  return (
    <section
      id="hero"
      className="min-h-[100vh] flex items-center justify-center px-6 lg:px-12 overflow-hidden relative transition-colors duration-300"
      style={{
        backgroundColor: 'var(--home-bg)',
        backgroundImage: 'var(--home-gradient)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

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
            className="relative p-6 rounded-r-xl overflow-hidden border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-xl max-w-lg mt-4 bg-white/90 dark:bg-cosmic-gradient"
          >
            <p className="font-serif italic text-lg md:text-xl text-cyan-950 dark:text-cyan-50 tracking-wide">
              "{t('quote')}"
            </p>
            <span className="font-mono text-sm text-cyan-700 dark:text-cyan-400 mt-3 block font-bold">
              — W. Edwards Deming
            </span>
          </motion.div>
        </div>

        {/* Right Column: Avatar & Resume */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative flex flex-col items-center justify-center order-1 lg:order-2"
        >
          {/* Avatar Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 dark:opacity-40 dark:group-hover:opacity-60 opacity-20 group-hover:opacity-30" />
            <div className="relative w-full h-full rounded-full border-4 border-gray-100 dark:border-white/10 shadow-2xl overflow-hidden">
              <Image
                src="/avatar.jpg"
                alt="Phuc Anh"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Resume Dropdown - Directly Below Avatar */}
          <div className="mt-8 relative z-20">
            <ResumeDropdown />
          </div>
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

  const resumeOptions = [
    { label: "🇫🇷 FR", href: "/assets/CV_Phuc_Anh_DANG_FR.pdf" },
    { label: "🇬🇧 EN", href: "/assets/CV_Phuc_Anh_DANG_EN.pdf" },
    { label: "🇻🇳 VI", href: "/assets/CV_Phuc_Anh_DANG_VI.pdf" },
  ];

  return (
    <div className="relative inline-block" onMouseLeave={() => setIsOpen(false)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-3 px-8 py-3 rounded-full transition-all duration-300 border font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105"
        style={{
          backgroundColor: 'var(--nav-bg)', // Adapts to theme
          borderColor: 'var(--nav-border)',
          color: 'var(--nav-text)'
        }}
      >
        <Sparkles size={18} className="text-cyan-600 dark:text-cyan-400" />
        <span>{t('resumeButton')}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-40 bg-black/90 dark:bg-black/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 ring-1 ring-white/5"
          >
            {resumeOptions.map((option) => (
              <a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white font-bold text-sm transition-colors border-b border-white/5 last:border-0"
              >
                <Download size={14} className="opacity-70" />
                {option.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
