"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Github, Linkedin, Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useMounted } from '@/hooks/useMounted';
import { useNavigation } from '@/hooks/useNavigation';

export function Footer() {
  const t = useTranslations('Footer');
  const { isHomePage, getNavHref } = useNavigation();
  const mounted = useMounted();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Pandahoccode", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/phuc-anh-dang/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:phuc-anh.dang.etu@univ-lille.fr,dpa280706@gmail.com", label: "Email" }
  ];

  const exploreLinks = [
    { section: "#hero", label: "home" },
    { section: "#projects", label: "projects" },
    { section: "#about", label: "about" },
    { section: "#blog", label: "blog" }
  ];

  const tNav = useTranslations('Navigation');

  return (
    <footer className="relative z-10 pt-12 pb-10 px-6 border-t border-foreground/10 bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">

        {/* Top Section: CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-2xl md:text-4xl font-black font-space tracking-tight text-foreground">
              {t('ctaTitle')}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="text-green-400 font-mono text-sm tracking-wide uppercase">
                {t('status')}
              </p>
            </div>
          </div>

          <Link href="#contact" className="group relative px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              {t('ctaButton')}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16" />

        {/* Bottom Section: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <Image src="/assets/images/logo.svg" alt="Logo" width={48} height={48} className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" />
              <span className="text-xl font-bold text-foreground">Phuc Anh</span>
            </Link>
            <p className="text-foreground/60 max-w-sm text-lg leading-relaxed">
              {t('brandTagline')}
            </p>
          </div>

          {/* Explore Column */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-foreground font-bold uppercase tracking-wider text-sm opacity-50">{t('explore')}</h3>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {exploreLinks.map((link) => (
                <li key={link.section}>
                  <Link href={getNavHref(link.section)} className="text-foreground/60 hover:text-cyan-400 transition-colors flex items-center gap-2 group w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors" />
                    {tNav(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-foreground font-bold uppercase tracking-wider text-sm opacity-50">{t('connect')}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-foreground/5 rounded-full text-foreground hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-foreground/10 text-sm text-foreground/50 font-mono">
          <p>{t('copyright')}</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <button
              onClick={() => mounted && window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-foreground transition-colors flex items-center gap-2"
            >
              {t('backToTop')} <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
