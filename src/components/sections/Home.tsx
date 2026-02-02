"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export function Home() {
  const t = useTranslations('Home');

  return (
    <section id="hero" className="scroll-mt-28 relative z-10 flex items-center justify-center py-20 md:py-32 px-6 bg-white dark:bg-navy-black overflow-hidden">
      {/* Ambient background glow (visible in dark mode) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-200/20 dark:bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/20 dark:bg-deep-purple/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-8"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter font-outfit leading-none mb-2">
              <span className="text-gray-900 dark:text-white">
                {t('title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-cyan-600 dark:text-electric-blue font-medium font-outfit uppercase tracking-widest leading-relaxed mt-4">
              {t('description')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-inter mt-4 max-w-lg">
              {t('subBio')}
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-400 font-light max-w-lg font-inter leading-relaxed text-lg">
            {t('role')}
          </p>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-electric-blue dark:to-deep-purple rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative border-l-4 border-purple-500 dark:border-deep-purple pl-6 py-4 bg-gray-100 dark:bg-white/5 pr-6 rounded-r-lg backdrop-blur-md border md:border-t-0 md:border-b-0 md:border-r-0 border-gray-200 dark:border-white/10">
              <p className="text-gray-800 dark:text-gray-200 italic font-serif text-xl leading-relaxed">
                {t('quote')}
              </p>
              <p className="text-sm text-cyan-600 dark:text-electric-blue mt-3 font-mono font-bold tracking-wider">
                {t('quoteAuthor')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Profile Image & Resume Button */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-8"
        >
          <div className="flex justify-center w-full">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Spinning Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-transparent to-purple-500 dark:from-electric-blue dark:via-transparent dark:to-deep-purple opacity-50 dark:opacity-70 blur-md animate-spin-slow duration-[10000ms]" />

              {/* Static Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-electric-blue dark:to-deep-purple opacity-30 dark:opacity-40 blur-[40px]" />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-electric-blue dark:to-deep-purple shadow-[0_0_50px_rgba(0,174,239,0.3)]">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-white dark:bg-navy-black/80 backdrop-blur-sm z-10">
                  <Image
                    src="/avatar.jpg"
                    alt={t('title')}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Centered Resume Dropdown */}
          <ResumeDropdown />
        </motion.div>

      </div>
    </section>
  );
}

function ResumeDropdown() {
  const t = useTranslations('Home');
  const [isOpen, setIsOpen] = useState(false);

  const resumeOptions = [
    { label: "🇫🇷 FR", href: "/assets/CV_Phuc_Anh_DANG_FR.pdf" },
    { label: "🇬🇧 EN", href: "/assets/CV_Phuc_Anh_DANG_EN.pdf" },
  ];

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-8 py-3 rounded-full border border-gray-300 dark:border-white/20 bg-white/80 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-md dark:shadow-none"
      >
        <Sparkles size={18} className="text-cyan-600 dark:text-electric-blue group-hover:text-purple-600 dark:group-hover:text-deep-purple transition-colors" />
        <span>{t('resumeButton')}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-36 bg-white dark:bg-[#030712]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl z-50"
          >
            {resumeOptions.map((option, index) => (
              <a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 px-4 py-3 text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors font-medium text-sm ${index === 0 ? '' : 'border-t border-gray-200 dark:border-white/5'}`}
              >
                <Download size={14} />
                {option.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
