"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

export function About() {
  const t = useTranslations('About');

  // Use translations for milestones
  const milestones = [
    {
      year: t('education.year'),
      title: t('milestones.student.title'),
      description: t('milestones.student.description'),
      color: "cyan"
    },
    {
      year: "2023",
      title: t('milestones.frontend.title'),
      description: t('milestones.frontend.description'),
      color: "purple"
    },
    {
      year: "2022",
      title: t('milestones.started.title'),
      description: t('milestones.started.description'),
      color: "gray"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background/50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-outfit">
            {t('title')}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-electric-blue to-deep-purple rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

          {/* LEFT COLUMN: Bio & Profile (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Narrative */}
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-foreground/90 leading-relaxed text-lg font-light">
                {t('description1')}
              </p>
              <p className="text-foreground/70 leading-relaxed font-light">
                {t('description2')}
              </p>
            </div>

            {/* Profile Details (Clean List) */}
            <div className="border-t border-foreground/10 pt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-electric-blue/10 rounded-lg text-electric-blue">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-1">{t('education.title')}</h3>
                  <p className="text-foreground font-medium">{t('education.degree')}</p>
                  <p className="text-foreground/60 text-sm">{t('education.school')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-deep-purple/10 rounded-lg text-deep-purple">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-1">{t('basedIn')}</h3>
                  <p className="text-foreground font-medium">Hanoi, Vietnam</p>
                  <p className="text-foreground/60 text-sm">UTC+7</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Professional Timeline (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 font-outfit">{t('journey')}</h3>

            <div className="relative border-l-2 border-foreground/10 ml-3 space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-12 group">
                  {/* Dot */}
                  <div className={`absolute -left-[9px] top-2 w-5 h-5 rounded-full border-4 border-background ${milestone.color === 'cyan' ? 'bg-electric-blue' :
                    milestone.color === 'purple' ? 'bg-deep-purple' : 'bg-gray-400'
                    } transition-transform duration-300 group-hover:scale-125`} />

                  {/* Content */}
                  <div className="space-y-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${milestone.color === 'cyan' ? 'bg-electric-blue/10 text-electric-blue' :
                      milestone.color === 'purple' ? 'bg-deep-purple/10 text-deep-purple' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                      }`}>
                      {milestone.year}
                    </span>
                    <h4 className="text-xl font-bold text-foreground group-hover:text-electric-blue transition-colors">
                      {milestone.title}
                    </h4>
                    <p className="text-foreground/60 leading-relaxed max-w-md">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
