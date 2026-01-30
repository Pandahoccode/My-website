"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function About() {
  const t = useTranslations('About');

  // Education & Roadmap Data
  const roadmap = [
    { year: "Year 1", title: t('roadmap.year1'), completed: true },
    { year: "Year 2", title: t('roadmap.year2'), completed: true },
    { year: "Future", title: t('roadmap.future'), completed: false },
  ];

  const skills = [
    { key: "python", percent: 90 },
    { key: "sql", percent: 85 },
    { key: "ml", percent: 75 },
  ];

  return (
    <section id="about" className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Column 1: Roadmap (Circuit Style) */}
        <div>
          <h2 className="text-4xl font-black font-outfit text-white mb-12">
            {t('title')}
          </h2>

          <div className="relative pl-8 ml-4 space-y-12">
            {/* Animated Data Circuit Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-electric-blue via-deep-purple to-transparent shadow-[0_0_10px_rgba(0,174,239,0.5)]"
            />
            {/* Background Line (Dim) */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5 -z-10" />

            {/* Education Node */}
            <div className="relative">
              <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-navy-black border-2 border-electric-blue shadow-[0_0_15px_rgba(0,174,239,0.8)] z-10" />
              <div className="mb-2 text-electric-blue font-mono text-sm">{t('education.year')}</div>
              <h3 className="text-2xl font-bold text-white mb-1">{t('education.degree')}</h3>
              <div className="text-gray-400">{t('education.school')}</div>
            </div>

            {/* Roadmap Nodes */}
            {roadmap.map((item, i) => (
              <div key={i} className="relative">
                <span className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-navy-black border-2 ${item.completed ? 'border-deep-purple shadow-[0_0_10px_rgba(106,27,154,0.5)]' : 'border-gray-600'}`} />
                <div className="text-gray-500 font-mono text-xs mb-1">{item.year}</div>
                <div className={`${item.completed ? 'text-white' : 'text-gray-600'} text-lg font-medium`}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Skills */}
        <div>
          <h2 className="text-4xl font-black font-outfit text-white mb-12">
            {t('skills.title')}
          </h2>

          <div className="space-y-8">
            {skills.map((skill, index) => (
              <div key={skill.key}>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">{t(`skills.${skill.key}`)}</span>
                  <span className="text-electric-blue font-mono">{skill.percent}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-electric-blue to-deep-purple"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
