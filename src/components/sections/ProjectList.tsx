"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import type { Project } from "@/lib/project";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative w-full h-full"
    >
      <div
        className="group relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--card-border-color, #e2e8f0)', // Default to light mode border
          boxShadow: 'var(--card-shadow)',
        }}
      >
        {/* Top 45%: Image Slot */}
        <div className="relative h-64 w-full bg-slate-100 dark:bg-white/5 overflow-hidden flex-shrink-0">
          {/* Gradient Placeholder */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.meta.color} opacity-20`} />

          {/* Initial Letter */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-slate-300 dark:text-white/10 font-mono text-6xl font-black group-hover:scale-110 transition-transform duration-500">
              {project.meta.title[0]}
            </span>
          </div>

          {/* View Project Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link
              href={`/project/${project.slug}`}
              className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium text-sm"
            >
              View Project
            </Link>
          </div>
        </div>

        {/* Bottom 55%: Content */}
        <div className="p-6 flex-1 flex flex-col bg-transparent">
          <div className="flex flex-col gap-3 mb-4">
            {/* Category Tag */}
            {/* Category Tag & Tech Stack */}
            <div className="flex flex-wrap gap-2 items-start mb-2">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-white/10 font-bold"
                style={{ color: 'var(--card-text-desc)' }}
              >
                {project.meta.category}
              </span>
              {/* Tech Stack Hashtags (Simulated if not in data) */}
              {['#Python', '#DataViz'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                  style={{ color: 'var(--card-text-desc)', opacity: 0.8 }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3
              className="text-xl font-bold font-outfit transition-colors group-hover:text-blue-600 dark:group-hover:text-cyan-400"
              style={{ color: 'var(--card-text-title)' }}
            >
              {project.meta.title}
            </h3>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed flex-1 line-clamp-3 font-medium"
            style={{ color: 'var(--card-text-desc)' }}
          >
            {project.meta.excerpt}
          </p>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.meta.color}`} />
              <span
                className="text-xs font-mono tracking-wider font-bold"
                style={{ color: 'var(--card-text-meta)' }}
              >
                {project.meta.featured ? 'Featured' : 'Project'}
              </span>
            </div>

            <Link
              href={`/project/${project.slug}`}
              className="text-sm text-blue-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-white transition-colors flex items-center gap-1 font-bold group/link"
            >
              Read Case Study
              <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
