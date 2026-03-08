"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

const skillsData = {
  Tools: [
    { name: "Microsoft SQL Server/ PostgreSQL Server", level: 90 },
    { name: "Oracle Data Integrator / Visual Studio SSIS", level: 80 },
    { name: "Power BI / Qlik Sense", level: 85 },
  ],
  codingLanguage: [
    { name: "Python", level: 90 },
    { name: "SQL", level: 85 },
    { name: "R", level: 80 },
    { name: "SAS", level: 70 },
  ],
  Tech: [
    { name: "Git & GitHub", level: 85 },
    { name: "Docker / Linux", level: 80 },
    { name: "Apache Airflow", level: 75 },
  ]
};

export function Skills() {
  const t = useTranslations('Skills');

  return (
    <section id="skills" className="scroll-mt-28 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
          {t('title')}
        </h2>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Tools Column */}
        <SkillColumn title={t('tools')} skills={skillsData.Tools} delay={0} />

        {/* Coding Language Column */}
        <SkillColumn title={t('codingLanguage')} skills={skillsData.codingLanguage} delay={0.2} />

        {/* Tech Column */}
        <SkillColumn title={t('tech')} skills={skillsData.Tech} delay={0.4} />
      </div>
    </section>
  );
}


interface Skill {
  name: string;
  level: number;
}

function SkillColumn({ title, skills, delay }: { title: string, skills: Skill[], delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative p-6 overflow-hidden group glass-surface antigravity-card"
      style={{
        // Crystal Glass Effect handled by antigravity-card
      }}
    >
      {/* Glossy Sheen Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <h3 className="text-xl font-semibold text-cyan-500 dark:text-cyan-400 border-b border-foreground/10 pb-3 mb-6 relative z-10 flex items-center gap-2">
        {title}
      </h3>

      <div className="space-y-6 relative z-10">
        {skills.map((skill, index) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground font-medium">{skill.name}</span>
              <span className="text-foreground/60 font-mono">{skill.level}%</span>
            </div>

            {/* Progress Bar Container */}
            <div className="h-2 w-full bg-black/20 dark:bg-white/5 rounded-full overflow-hidden">
              {/* Neon Gradient Bar */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: delay + (index * 0.1), ease: "easeOut" }}
                className="h-full rounded-full relative"
                style={{
                  background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 100%)", // Cyan to Purple
                  boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)" // Glow
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
