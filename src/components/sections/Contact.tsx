"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Contact() {
  const t = useTranslations('Contact');

  const socialLinks = [
    { icon: Mail, href: `mailto:${t('email')}`, label: "Email" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/phuc-anh-dang/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Pandahoccode", label: "GitHub" }
  ];

  return (
    <section id="contact" className="scroll-mt-28 relative z-10 py-32 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-background/50 backdrop-blur-2xl border border-foreground/10 p-8 md:p-12 shadow-2xl"
      >
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-electric-blue/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-deep-purple/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black font-outfit text-foreground mb-6">
            {t('title')}
          </h2>
          <p className="text-foreground/70 mb-10 max-w-lg mx-auto font-inter">
            {t('text')}
          </p>

          <div className="flex justify-center gap-8 mb-12">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-foreground/5 border border-foreground/10 text-electric-blue hover:bg-electric-blue hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_20px_rgba(0,174,239,0.5)]"
                aria-label={link.label}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>

          <form className="space-y-6 max-w-md mx-auto text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2 font-mono">{t('emailLabel')}</label>
              <input
                type="email"
                id="email"
                className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric-blue transition-colors placeholder:text-foreground/40"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2 font-mono">{t('messageLabel')}</label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric-blue transition-colors placeholder:text-foreground/40"
                placeholder="..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-electric-blue to-deep-purple rounded-lg text-white font-bold font-outfit tracking-wide hover:shadow-[0_0_20px_rgba(0,174,239,0.5)] transition-shadow duration-300"
            >
              {t('sendButton')}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
