"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="relative z-10 py-12 px-6 border-t border-white/5 bg-navy-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Copyright */}
        <div className="text-gray-500 text-sm font-inter">
          {t('copyright')}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-blue transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric-blue transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:hello@example.com" className="text-gray-400 hover:text-electric-blue transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
