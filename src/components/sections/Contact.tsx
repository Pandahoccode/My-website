"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Contact() {
  const t = useTranslations('Navigation'); // Using Navigation keys for now if Contact specific keys miss

  return (
    <section id="contact" className="relative z-10 py-32 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-navy-black/50 backdrop-blur-2xl border border-white/10 p-8 md:p-12 shadow-2xl"
      >
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-electric-blue/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-deep-purple/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black font-outfit text-white mb-6">
            Let's <span className="text-electric-blue">Connect</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto font-inter">
            Interested in collaborating or have a question? I'm always open to discussing data science, AI, and creative development.
          </p>

          <form className="space-y-6 max-w-md mx-auto text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-mono">Email</label>
              <input
                type="email"
                id="email"
                className="w-full bg-navy-black/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-gray-600"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-mono">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-navy-black/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-gray-600"
                placeholder="Hello..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-electric-blue to-deep-purple rounded-lg text-white font-bold font-outfit tracking-wide hover:shadow-[0_0_20px_rgba(0,174,239,0.5)] transition-shadow duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
