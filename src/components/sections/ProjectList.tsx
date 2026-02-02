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
      <div className="w-full h-full bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 backdrop-blur-2xl rounded-2xl overflow-hidden hover:border-cyan-blue/50 hover:shadow-[0_0_30px_rgba(0,191,255,0.15)] transition-all duration-300 flex flex-col shadow-sm dark:shadow-none">
        {/* Top 40%: Image Slot */}
        <div className="relative h-48 w-full bg-gray-100 dark:bg-navy-black group-hover:brightness-110 transition-all duration-700 overflow-hidden flex-shrink-0">
          {/* Placeholder Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.meta.color} opacity-20`} />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-300 dark:text-white/10 font-mono text-5xl font-black group-hover:scale-110 transition-transform duration-700 select-none">
              {project.meta.title[0]}
            </div>
          </div>

          {/* View Project Overlay (visible on hover) */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link
              href={`/project/${project.slug}`}
              className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium text-sm"
            >
              View Project
            </Link>
          </div>
        </div>

        {/* Bottom 60%: Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold font-outfit text-gray-900 dark:text-white group-hover:text-cyan-blue transition-colors">
              {project.meta.title}
            </h3>
            <span className="text-xs font-mono bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300 px-2 py-1 rounded">
              {project.meta.category}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 font-inter leading-relaxed flex-1 text-sm">
            {project.meta.excerpt}
          </p>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.meta.color}`} />
              <span className="text-xs text-gray-500 font-mono tracking-wider">
                {project.meta.featured ? 'Featured' : 'Project'}
              </span>
            </div>
            <Link
              href={`/project/${project.slug}`}
              className="text-sm text-cyan-blue hover:text-deep-purple dark:hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              Read Case Study <span className="text-xs">→</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
