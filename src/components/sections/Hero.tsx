"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative z-10 flex items-center justify-center py-20 md:py-32 px-6 bg-navy-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white font-outfit leading-none">
            {t('title')}
          </h1>

          <p className="text-lg md:text-xl text-electric-blue font-medium font-outfit uppercase tracking-widest leading-relaxed mt-4">
            {t('description')}
          </p>

          <p className="text-gray-300 font-light max-w-lg font-inter leading-relaxed">
            {t('role')}
          </p>

          <div className="border-l-4 border-deep-purple pl-4 py-2 mt-4 bg-white/5 pr-4 rounded-r-lg backdrop-blur-sm">
            <p className="text-gray-300 italic font-serif text-lg leading-relaxed">
              {t('quote')}
            </p>
            <p className="text-sm text-gray-500 mt-2 font-mono font-bold tracking-wider">
              {t('quoteAuthor')}
            </p>
          </div>
        </motion.div>

        {/* Right Column: Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-[3px] bg-gradient-to-r from-electric-blue to-deep-purple shadow-[0_0_50px_rgba(0,174,239,0.4)]">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-navy-black">
              <Image
                src="/profile-placeholder.jpg"
                alt="Phuc Anh"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
