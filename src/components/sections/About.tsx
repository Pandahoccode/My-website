"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { GraduationCap, Award, Calendar, ExternalLink } from "lucide-react";

export function About() {
  const t = useTranslations('About');

  const timelineEvents = [
    {
      year: "2026 (Current)",
      title: "Bachelor of Technology in Data Science",
      desc: "University of Lille. Focused on strategic data exploitation. Seeking a 10-week internship starting April 6."
    },
    {
      year: "2025",
      title: "Advanced Machine Learning",
      desc: "Deep diving into Neural Networks, Deep Learning frameworks, and complex statistical modeling."
    },
    {
      year: "2024",
      title: "Big Data & EDA Master",
      desc: "Mastering SQL for large datasets and Exploratory Data Analysis techniques to uncover hidden patterns."
    },
    {
      year: "2023",
      title: "Foundations",
      desc: "Started the journey with Python programming and Mathematical Modeling for Data Science."
    }
  ];

  const education = [
    {
      degree: t('education.degree'),
      school: t('education.school'),
      year: "2024 - Present"
    },
    {
      degree: t('education.hs_degree'),
      school: t('education.hs_school'),
      year: "2019 - 2022"
    }
  ];

  const certifications = [
    {
      name: "TensorFlow Developer",
      issuer: "Google",
      date: "2023",
      link: "#"
    },
    {
      name: "AWS Machine Learning",
      issuer: "Amazon Web Services",
      date: "2024",
      link: "#"
    }
  ];

  const skills = ["Python", "SQL", "Power BI", "Machine Learning", "Data Engineering", "React/Next.js"];

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto space-y-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black font-outfit tracking-tight" style={{ color: 'var(--home-title)' }}>
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'var(--home-text)' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Left Column: Narrative & Roadmap */}
          <div className="space-y-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold" style={{ color: 'var(--home-title)' }}>
                {t('journeyTitle')}
              </h3>
              <p className="text-lg leading-relaxed opacity-90 font-medium" style={{ color: 'var(--home-text)' }}>
                {t('journeyDescription')}
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold" style={{ color: 'var(--home-title)' }}>
                {t('roadmapTitle')}
              </h3>
              <div className="space-y-8 relative border-l-2 ml-3 pl-8" style={{ borderColor: 'var(--card-border-color)' }}>
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-[#030712] bg-cyan-500 shadow-lg" />
                    <div className="space-y-1">
                      <span className="text-sm font-mono font-bold text-cyan-600 dark:text-cyan-400">
                        {event.year}
                      </span>
                      <h4 className="text-lg font-bold" style={{ color: 'var(--home-title)' }}>{event.title}</h4>
                      <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--home-text)' }}>
                        {event.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Education, Certs & Skills */}
          <div className="space-y-12">

            {/* Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--home-title)' }}>
                  {t('educationTitle')}
                </h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl border antigravity-card bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 hover:border-teal-500/30" style={{ borderColor: 'var(--card-border-color)', borderWidth: '1px' }}>
                    <h4 className="font-bold text-lg" style={{ color: 'var(--home-title)' }}>{edu.degree}</h4>
                    <p className="opacity-80" style={{ color: 'var(--home-text)' }}>{edu.school}</p>
                    <span className="text-sm font-mono opacity-60 block mt-1">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                  <Award size={20} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--home-title)' }}>
                  {t('certTitle')}
                </h3>
              </div>
              <div className="grid gap-4">
                {certifications.map((cert, index) => (
                  <a
                    key={index}
                    href={cert.link}
                    className="flex items-center justify-between p-4 rounded-xl border antigravity-card hover:bg-slate-50 dark:hover:bg-white/5 border-slate-100 dark:border-white/5 group hover:border-purple-500/30"
                    style={{ borderColor: 'var(--card-border-color)', borderWidth: '1px' }}
                  >
                    <div>
                      <h4 className="font-bold group-hover:text-cyan-500 transition-colors" style={{ color: 'var(--home-title)' }}>{cert.name}</h4>
                      <p className="text-sm opacity-70" style={{ color: 'var(--home-text)' }}>{cert.issuer}</p>
                    </div>
                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500" />
                  </a>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold" style={{ color: 'var(--home-title)' }}>
                {t('skillsTitle')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {['Problem Solving', 'Team Leadership', 'Adaptability', 'Communication', 'Critical Thinking', 'Agile Methodology'].map((skill) => (
                  <div
                    key={skill}
                    className="p-4 rounded-xl border antigravity-card bg-black/5 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center"
                    style={{ borderColor: 'var(--card-border-color)', borderWidth: '1px' }}
                  >
                    <span
                      className="text-sm font-mono font-bold text-center"
                      style={{ color: 'var(--card-text-title)' }}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
