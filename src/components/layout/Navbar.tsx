"use client";

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, useScroll } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const t = useTranslations('Navigation');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect if current path is the home page (including locale prefixes)
  // Home paths: "/", "/en", "/fr", "/vi"
  const isHomePage = pathname === '/' || /^\/(en|fr|vi)\/?$/.test(pathname);

  const navItems = [
    { key: 'home', section: '#hero' },
    { key: 'projects', section: '#projects' },
    { key: 'about', section: '#about' },
    { key: 'blog', section: '#blog' },
    { key: 'contact', section: '#contact' },
  ];

  // Generate href based on current page
  const getNavHref = (section: string) => {
    return isHomePage ? section : `/${section}`;
  };

  const isDark = theme === 'dark';

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
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.svg" alt="Logo" className="w-18 h-18 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-xl font-bold transition-all duration-300 relative">
            {/* Gradient Text (Reveal on Hover - Slide In) */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] to-[#A855F7] bg-clip-text text-transparent opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              Phuc Anh
            </span>
          </span>
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

          {/* Theme Toggle Pill */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isDark ? 'bg-slate-700' : 'bg-blue-100'
                }`}
              aria-label="Toggle theme"
            >
              {/* Thumb */}
              <motion.div
                className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
                animate={{ x: isDark ? 0 : 30 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isDark ? (
                  <Moon className="w-4 h-4 text-slate-700" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </motion.div>
            </button>
          )}
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
      />
    </motion.header>
  );
}
