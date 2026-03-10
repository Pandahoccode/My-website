"use client";

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, useScroll } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeDark } from '@/hooks/useThemeDark';
import { useNavigation } from '@/hooks/useNavigation';
import Image from 'next/image';

export function Navbar() {
  const t = useTranslations('Navigation');
  const { isDark, mounted, setTheme } = useThemeDark();
  const { scrollYProgress } = useScroll();
  const { isHomePage, getNavHref } = useNavigation();

  if (!mounted) return null;

  const navItems = [
    { key: 'home', section: '#hero' },
    { key: 'projects', section: '#projects' },
    { key: 'about', section: '#about' },
    { key: 'blog', section: '#blog' },
    { key: 'contact', section: '#contact' },
  ];



  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 rounded-full backdrop-blur-xl overflow-visible shadow-lg transition-all duration-300"
      style={{
        backgroundColor: 'var(--nav-bg)',
        border: '1px solid var(--nav-border)',
      }}
    >
      <div className="w-full px-6 py-3 flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            width={120}
            height={68}
            className="w-auto h-12 sm:h-14 group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* CENTER: Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={getNavHref(item.section)}
              className="text-lg font-bold transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
              style={{ color: 'var(--nav-text, inherit)' }}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="glass" />

          {/* Theme Toggle Pill - Always render with stable initial state */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isDark ? 'bg-slate-700' : 'bg-blue-100'
              }`}
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            {/* Thumb */}
            <motion.div
              className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
              animate={{ x: isDark ? 0 : 30 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              suppressHydrationWarning
            >
              {isDark ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Progress Bar - Flush Underline */}
      <motion.div
        className="absolute bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full pointer-events-none"
        style={{
          bottom: 0,
          left: '1.8rem',
          right: '1.8rem',
          height: '3px',
          scaleX: scrollYProgress,
          transformOrigin: 'left',
          boxShadow: isDark
            ? '0 0 10px rgba(6, 182, 212, 0.6)'
            : '0 1px 6px rgba(6, 182, 212, 0.5)',
        }}
        suppressHydrationWarning
      />
    </motion.header>
  );
}
