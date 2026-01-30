"use client";

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion } from 'framer-motion';

import Image from 'next/image';

export function Navbar() {
  const t = useTranslations('Navigation');

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'projects', href: '/#projects' },
    { key: 'about', href: '/#about' },
    { key: 'contact', href: '/#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-sm bg-[#030712]/30 border-b border-white/5"
    >
      <div className="flex items-center gap-6">
        {/* Theme Toggle (Visual Only for now) */}
        <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
          <div className="relative w-5 h-5">
            <span className="absolute inset-0 rotate-0 transition-all scale-100 dark:rotate-90 dark:scale-0">☀️</span>
            <span className="absolute inset-0 rotate-90 transition-all scale-0 dark:rotate-0 dark:scale-100">🌙</span>
          </div>
        </button>

        <Link href="/" className="group flex items-center gap-2">
          <div className="relative w-14 h-14">
            <Image
              src="/logo.png"
              alt="Phuc Anh Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Centered Navigation */}
      <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="font-inter text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
          >
            {t(item.key)}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-electric-blue group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {/* Mobile Menu Trigger could go here */}
      </div>
    </motion.header>
  );
}
