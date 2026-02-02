"use client";

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, Home, FolderGit2, User, Mail } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Navbar() {
  const t = useTranslations('Navigation');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'projects', href: '#projects' },
    { key: 'about', href: '#about' },
    { key: 'blog', href: '#blog' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl overflow-hidden shadow-lg transition-all duration-300"
      >
        {/* Container for Pixel-Perfect Alignment */}
        <div className="w-full px-6 md:px-8 py-3 flex items-center justify-between font-sans min-h-[4rem]">

          {/* LEFT: LOGO */}
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center gap-3 relative" onClick={() => setIsMobileMenuOpen(false)}>
              {/* Resized Logo Container for Sleeker Navbar */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/Logo.svg"
                  alt="Phuc Anh Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-outfit font-bold text-lg md:text-xl tracking-tight text-gray-900 dark:text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block">
                Phuc Anh
              </span>
            </Link>
          </div>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="font-inter text-base md:text-lg font-bold tracking-tight text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors relative group py-2 flex items-center gap-2"
              >
                {t(item.key)}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-[var(--color-vivid-cyan)] to-[var(--color-sovereign-purple)] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
              </Link>
            ))}
          </nav>

          {/* RIGHT: ACTIONS WRAPPER */}
          <div className="flex items-center gap-4">

            {/* Desktop Actions Grouped */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher variant="glass" />

              {/* Theme Toggle Button - Pill Style */}
              <ThemeSwitcher />
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-800 dark:text-white z-50 relative"
              aria-label="Toggle Mobile Menu"
            >
              <div className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-gray-800 dark:bg-white block transition-transform origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-gray-800 dark:bg-white block transition-opacity"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-gray-800 dark:bg-white block transition-transform origin-center"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar - Internal to Navbar */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00AEEF] to-[#9D50BB]"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl pt-24 px-6 md:hidden flex flex-col items-center justify-start h-screen"
          >
            <nav className="flex flex-col items-center gap-8 w-full max-w-xs">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-2xl font-outfit font-medium text-center text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform duration-200"
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}

              <div className="w-full h-[1px] bg-foreground/10 my-4" />

              <div className="flex flex-col gap-6 w-full items-center">
                <LanguageSwitcher />

                <div
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center gap-3 px-4 py-2 rounded-full border border-foreground/10 cursor-pointer hover:bg-foreground/5 transition-colors"
                >
                  <span className="font-medium">Theme</span>
                  {/* Mobile Theme Toggle can stay simple or match pill, sticking to simple text+icon for mobile clarity */}
                  {mounted ? (
                    theme === 'dark' ? (
                      <Moon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    ) : (
                      <Sun className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                    )
                  ) : <div className="w-5 h-5" />}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
