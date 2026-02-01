"use client";

import { useTranslations } from 'next-intl';
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Code2, Github, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function Projects() {
  const t = useTranslations('Projects');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

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

  // Added projectAssets definition
  const projectAssets = {
    frenchCinema: {
      image: "/projects/ecosense.jpg", // Placeholder
      color: "from-[#00D2FF] to-[#3A7BD5]",
      id: 1
    },
    airQuality: {
      image: "/projects/finance.jpg", // Placeholder
      color: "from-[#9D50BB] to-[#6E48AA]",
      id: 2
    },
    dataWarehouse: {
      image: "/projects/urban.jpg", // Placeholder
      color: "from-[#F857A6] to-[#FF5858]",
      id: 3
    }
  };

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
        {projectKeys.map((key, index) => (
          <ProjectCard
            key={key}
            id={key}
            index={index}
            assets={projectAssets[key as keyof typeof projectAssets]}
          />
        ))}
      </div>
    </section>
  );
}

// Update ProjectCard to show image on top 40%
function ProjectCard({ id, index, assets }: { id: string, index: number, assets: any }) {
  const t = useTranslations('Projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 50 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`group relative ${index % 2 === 1 ? "md:mt-32" : ""} hover:z-20 w-full`}
    >
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-full bg-navy-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-blue/50 hover:shadow-[0_0_30px_rgba(0,191,255,0.15)] transition-all duration-500 flex flex-col"
      >

        {/* Top 40%: Image Slot */}
        <div className="relative h-64 w-full bg-navy-black group-hover:brightness-110 transition-all duration-700 overflow-hidden">
          {/* Placeholder Gradient if image missing, or actual image */}
          <div className={`absolute inset-0 bg-gradient-to-br ${assets.color} opacity-20`} />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/10 font-mono text-6xl font-black group-hover:scale-110 transition-transform duration-700">
              {t(`${id}.title` as any)[0]}
            </div>
          </div>

          {/* View Project Overlay (visible on hover) */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link href={`/project/${assets.id}`} className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium text-sm">
              {t('viewProject')}
            </Link>
          </div>
        </div>

        {/* Bottom 60%: Content */}
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold font-outfit text-white group-hover:text-cyan-blue transition-colors">
              {t(`${id}.title` as any)}
            </h3>
            <span className="text-xs font-mono text-cyan-blue border border-cyan-blue/30 px-2 py-1 rounded">
              {t(`${id}.category` as any)}
            </span>
          </div>

          <p className="text-gray-400 font-inter leading-relaxed flex-1">
            {t(`${id}.description` as any)}
          </p>

          {/* Added new div for Featured Project and Read Case Study */}
          <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${assets.color}`} />
              <span className="text-xs text-gray-500 font-mono tracking-wider">Featured Project</span>
            </div>
            <Link href={`/project/${assets.id}`} className="text-sm text-cyan-blue hover:text-white transition-colors flex items-center gap-1">
              Read Case Study <span className="text-xs">→</span>
            </Link>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}
