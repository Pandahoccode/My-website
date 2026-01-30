"use client";

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Navbar() {
  const t = useTranslations('Navigation');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { key: 'home', href: '/' },
    { key: 'projects', href: '/#projects' },
    { key: 'about', href: '/#about' },
    { key: 'contact', href: '/#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-xl bg-background/60 border-b border-foreground/5 transition-colors duration-300"
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-2 relative" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/Logo.svg"
                alt="Phuc Anh Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-outfit font-bold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-vivid-cyan)] to-[var(--color-sovereign-purple)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block">
              Phuc Anh
            </span>
          </Link>
        </div>

        {/* Centered Navigation for Desktop */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="font-inter text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group py-2"
            >
              {t(item.key)}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-[var(--color-vivid-cyan)] to-[var(--color-sovereign-purple)] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors relative overflow-hidden group hidden md:block" // Hidden on mobile, moved to menu
            aria-label="Toggle Theme"
          >
            {mounted && (
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Sun className="w-5 h-5 absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                <Moon className="w-5 h-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
              </div>
            )}
            {!mounted && <div className="w-5 h-5" />}
          </button>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground z-50 relative"
            aria-label="Toggle Mobile Menu"
          >
            <div className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5">
              {/* Hamburger / X animation */}
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-foreground block transition-transform origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-foreground block transition-opacity"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-foreground block transition-transform origin-center"
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl pt-24 px-6 md:hidden flex flex-col items-center"
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full h-[1px] bg-foreground/10 my-4"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-between w-full gap-6"
              >
                <span className="text-muted-foreground font-medium">Appearance</span>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                >
                  {mounted ? (
                    theme === 'dark' ? (
                      <Moon className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-amber-500" />
                    )
                  ) : <div className="w-5 h-5" />}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between w-full gap-6"
              >
                <span className="text-muted-foreground font-medium">Language</span>
                <div className="scale-110">
                  <LanguageSwitcher />
                </div>
              </motion.div>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
