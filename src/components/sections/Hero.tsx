"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, Brain, Sparkles, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="hero" className="scroll-mt-28 relative z-10 flex items-center justify-center py-20 md:py-32 px-6 bg-background overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-deep-purple/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-8"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground font-outfit leading-none mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-slate">
                {t('title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-electric-blue font-medium font-outfit uppercase tracking-widest leading-relaxed mt-4">
              {t('description')}
            </p>
          </div>

          <p className="text-foreground/80 font-light max-w-lg font-inter leading-relaxed text-lg">
            {t('role')}
          </p>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue to-deep-purple rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative border-l-4 border-deep-purple pl-6 py-4 bg-foreground/5 pr-6 rounded-r-lg backdrop-blur-md border md:border-t-0 md:border-b-0 md:border-r-0 border-foreground/10">
              <p className="text-foreground/90 italic font-serif text-xl leading-relaxed">
                {t('quote')}
              </p>
              <p className="text-sm text-electric-blue mt-3 font-mono font-bold tracking-wider">
                {t('quoteAuthor')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Spinning Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric-blue via-transparent to-deep-purple opacity-70 blur-md animate-spin-slow duration-[10000ms]" />

            {/* Static Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-blue to-deep-purple opacity-40 blur-[40px]" />

            {/* Image Container */}
            <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-r from-electric-blue to-deep-purple shadow-[0_0_50px_rgba(0,174,239,0.3)]">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-navy-black/80 backdrop-blur-sm z-10">
                <Image
                  src="/avatar.jpg"
                  alt={t('title')}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
