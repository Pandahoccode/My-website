"use client";

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/i18n/routing';

const projects = [
  {
    id: 1,
    title: "EcoSense AI",
    category: "Data Science",
    image: "/projects/ecosense.jpg", // Placeholder
    color: "from-[#00D2FF] to-[#3A7BD5]"
  },
  {
    id: 2,
    title: "Neural Finance",
    category: "Fintech",
    image: "/projects/finance.jpg",
    color: "from-[#9D50BB] to-[#6E48AA]"
  },
  {
    id: 3,
    title: "Urban Pulse",
    category: "Visualization",
    image: "/projects/urban.jpg",
    color: "from-[#F857A6] to-[#FF5858]"
  }
];

export function Projects() {
  const t = useTranslations('Projects');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="projects" ref={containerRef} className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-black font-outfit mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            {t('title')}
          </span>
        </h2>
        <div className="h-1 w-24 bg-[#00D2FF] rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const t = useTranslations('Projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 50 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`group relative ${index % 2 === 1 ? "md:mt-32" : ""} hover:z-20`}
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 1.5 }}
        className="w-full h-full"
      >
        {/* Glassmorphic Card Container */}
        <div className="relative overflow-hidden rounded-2xl bg-navy-black/40 backdrop-blur-2xl border border-white/5 aspect-[4/3] mb-6 group-hover:border-cyan-blue/80 group-hover:shadow-[0_0_30px_rgba(0,191,255,0.2)] transition-all duration-500 shadow-2xl">
          <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${project.color}`} />

          {/* Placeholder for Image */}
          <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-4xl font-bold group-hover:scale-110 transition-transform duration-700">
            {project.title[0]}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-navy-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link href={`/project/${project.id}`} className="px-8 py-4 border border-cyan-blue text-cyan-blue hover:bg-cyan-blue hover:text-navy-black rounded-full transition-all duration-300 font-bold font-mono text-sm uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(0,191,255,0.3)] hover:shadow-[0_0_40px_rgba(0,191,255,0.6)] transform hover:scale-105">
              {t('viewProject')}
            </Link>
          </div>
        </div>

        {/* Title & Category */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 group-hover:border-cyan-blue transition-colors duration-500">
          <h3 className="text-2xl font-bold font-outfit text-white group-hover:text-cyan-blue transition-colors">{project.title}</h3>
          <span className="text-xs font-mono text-cyan-blue uppercase tracking-wider">{project.category}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
