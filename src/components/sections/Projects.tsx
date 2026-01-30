"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code2, Github, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function Projects() {
  const t = useTranslations('Projects');

  const projectKeys = ['frenchCinema', 'airQuality', 'dataWarehouse'];

  const projectData = {
    frenchCinema: {
      tags: ['Python', 'Scikit-Learn', 'Pandas', 'Matplotlib'],
      github: 'https://github.com/phuc-anh',
      demo: '#',
      gradient: 'from-cyan-500 to-blue-600'
    },
    airQuality: {
      tags: ['Python', 'TensorFlow', 'Data Viz', 'API'],
      github: 'https://github.com/phuc-anh',
      demo: '#',
      gradient: 'from-purple-500 to-indigo-600'
    },
    dataWarehouse: {
      tags: ['SQL', 'ETL', 'Python', 'PostgreSQL'],
      github: 'https://github.com/phuc-anh',
      demo: '#',
      gradient: 'from-pink-500 to-rose-600'
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-primary rounded-full" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectKeys.map((key, index) => (
            <ProjectCard
              key={key}
              projectKey={key}
              data={projectData[key as keyof typeof projectData]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ projectKey, data, index }: any) {
  const t = useTranslations('Projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      {/* Dark Card Container */}
      <div className="bg-background/40 backdrop-blur-sm border border-foreground/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] h-full flex flex-col">

        {/* Top: Icons */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-foreground/5 rounded-lg">
            <Code2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex gap-2">
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-foreground/5 rounded-lg hover:bg-foreground/10 transition-colors"
            >
              <Github className="w-4 h-4 text-foreground/60 hover:text-foreground transition-colors" />
            </a>
            <a
              href={data.demo}
              className="p-2 bg-foreground/5 rounded-lg hover:bg-foreground/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-foreground/60 hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>

        {/* Middle: Title & Description */}
        <div className="flex-1 mb-4">
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-cyan-400 transition-colors">
            {t(`${projectKey}.title` as any)}
          </h3>
          <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3">
            {t(`${projectKey}.description` as any)}
          </p>
        </div>

        {/* Bottom: Tech Tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-foreground/10">
          {data.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-foreground/5 text-foreground/80 text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
