"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';
import { useState } from "react";
import { Download, ChevronDown, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

export function ResumeDropdown() {
  const t = useTranslations('Home');
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted ? theme === 'dark' : true;

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

      {/* Phase 12 Buffer: 50px - Creates physical space that respects zoom */}
      {isOpen && <div className="h-[50px]" />}

      {/* Dropdown Menu - Relative Flow Positioning */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -3, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -3, scale: 0.95 }}
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
