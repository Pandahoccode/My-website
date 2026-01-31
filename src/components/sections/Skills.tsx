"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

const skillsData = {
  languages: [
    { name: "Python", level: 90 },
    { name: "SQL", level: 85 },
    { name: "JavaScript / TypeScript", level: 80 },
    { name: "R", level: 70 },
  ],
  dataScience: [
    { name: "Machine Learning (Scikit-Learn)", level: 85 },
    { name: "Deep Learning (PyTorch/TensorFlow)", level: 75 },
    { name: "Data Visualization (Tableau/PowerBI)", level: 80 },
    { name: "NLP", level: 70 },
  ],
  webTech: [
    { name: "React / Next.js", level: 85 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Framer Motion", level: 75 },
    { name: "FastAPI / Flask", level: 80 },
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
        {/* Languages Column */}
        <SkillColumn title={t('languages')} skills={skillsData.languages} delay={0} />

        {/* Data Science Column */}
        <SkillColumn title={t('dataScience')} skills={skillsData.dataScience} delay={0.2} />

        {/* Web Tech Column */}
        <SkillColumn title={t('webTech')} skills={skillsData.webTech} delay={0.4} />
      </div>
    </section>
  );
}

function SkillColumn({ title, skills, delay }: { title: string, skills: any[], delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-electric-cyan border-b border-foreground/10 pb-2 mb-6">
        {title}
      </h3>

      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground font-medium">{skill.name}</span>
              <span className="text-foreground/60 font-mono">{skill.level}%</span>
            </div>

            {/* Progress Bar Container */}
            <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
              {/* Gradient Bar */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: delay + (index * 0.1), ease: "easeOut" }}
                className="h-full bg-gradient-primary rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
