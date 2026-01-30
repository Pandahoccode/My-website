"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

export function About() {
  const t = useTranslations('About');

  const milestones = [
    {
      year: "2024 - Present",
      title: "Data Science Student",
      description: "Pursuing BS in Data Science, focusing on ML and statistical analysis",
      color: "cyan"
    },
    {
      year: "2023",
      title: "Frontend Developer",
      description: "Building modern web applications with React and Next.js",
      color: "purple"
    },
    {
      year: "2022",
      title: "Started Coding Journey",
      description: "Began learning programming with Python and data visualization",
      color: "gray"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-primary rounded-full mx-auto" />
        </motion.div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT: Narrative + Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Narrative */}
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed text-lg">
                {t('description1')}
              </p>
              <p className="text-gray-400 leading-relaxed">
                {t('description2')}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Education Card */}
              <div className="glass-card rounded-xl p-5 hover:border-cyan-500/30 transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-white">Education</h3>
                </div>
                <p className="text-gray-400 text-sm">{t('education.degree')}</p>
                <p className="text-cyan-400 text-xs mt-1 font-medium">{t('education.school')}</p>
              </div>

              {/* Location Card */}
              <div className="glass-card rounded-xl p-5 hover:border-purple-500/30 transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white">Location</h3>
                </div>
                <p className="text-gray-400 text-sm">Hanoi, Vietnam</p>
                <p className="text-purple-400 text-xs mt-1 font-medium">UTC+7</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-30" />

            {/* Milestones */}
            <div className="space-y-8 relative">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative pl-16"
                >
                  {/* Node */}
                  <div className={`absolute left-4 top-2 w-5 h-5 rounded-full border-2 ${milestone.color === 'cyan' ? 'border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]' :
                      milestone.color === 'purple' ? 'border-purple-500 shadow-[0_0_10px_rgba(142,68,173,0.5)]' :
                        'border-gray-600'
                    } bg-deep-obsidian`} />

                  {/* Content */}
                  <div className="glass-card rounded-lg p-4 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-cyan-400 font-mono">{milestone.year}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">{milestone.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
