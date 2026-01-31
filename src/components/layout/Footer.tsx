"use client";

import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="relative z-10 py-12 px-6 border-t border-foreground/5 bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 text-center">

        {/* Social Links */}
        <div className="flex items-center gap-8">
          <a
            href="https://github.com/phuc-anh"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-foreground/5 rounded-full hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-foreground/5 rounded-full hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-all hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@example.com"
            className="p-3 bg-foreground/5 rounded-full hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-all hover:scale-110"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-foreground/40 text-sm font-medium tracking-wide">
          Phuc Anh 2026 all rights authorized
        </div>

        {/* Language Switcher (Optional in footer if centered, but good for access) */}
        {/* <div className="opacity-50 hover:opacity-100 transition-opacity">
          <LanguageSwitcher />
        </div> */}
      </div>
    </footer>
  );
}
