"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import type { Project } from "@/lib/project";

interface ProjectListProps {
  projects: Project[];
}


export function ProjectList({ projects }: ProjectListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Extract all unique tags
  const allTags = Array.from(new Set(projects.flatMap(p =>
    [p.meta.category, ...(p.meta.tags || [])]
  ))).filter(Boolean);

  // Use actual tags from projects plus some defaults if needed
  const displayTags = Array.from(new Set([...allTags, "Data Analysis", "Machine Learning", "Data Engineering", "Python", "SQL", "React"])).slice(0, 10);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const results = projects.filter(project => {
      const matchesSearch =
        project.meta.title.toLowerCase().includes(lowerTerm) ||
        project.meta.excerpt?.toLowerCase().includes(lowerTerm) ||
        project.meta.category.toLowerCase().includes(lowerTerm);

      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => {
        return project.meta.category === tag || project.meta.tags.includes(tag);
      });

      return matchesSearch && matchesTags;
    });
    setFilteredProjects(results);
  }, [searchTerm, selectedTags, projects]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-12">
      {/* Search & Filter Section */}
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full px-6 py-3 shadow-lg">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none w-full placeholder-slate-400 font-medium transition-colors focus:ring-0"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        {/* Hashtag Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {displayTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border transition-all duration-300 ${selectedTags.includes(tag)
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'bg-white/5 border-black/5 dark:border-white/10 hover:border-cyan-500/50 text-gray-500 hover:text-cyan-500'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </AnimatePresence>
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-20 opacity-50">
            <p>No projects found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Determine Glow Color based on Category
  const isData = project.meta.category.includes("Data");
  const glowClass = isData ? "shadow-cyan-500/20 hover:shadow-cyan-500/40" : "shadow-purple-500/20 hover:shadow-purple-500/40";
  const borderClass = isData ? "hover:border-cyan-500/50" : "hover:border-purple-500/50";
  const textGradient = isData ? "from-cyan-400 to-blue-500" : "from-purple-400 to-pink-500";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group h-full"
    >
      <div
        className={`relative flex flex-col h-full rounded-3xl overflow-hidden antigravity-card ${glowClass} ${borderClass}`}
      >
        {/* Top: Image Slot with Overlay */}
        <div className="relative h-56 w-full overflow-hidden">
          {/* Base Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.meta.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

          {/* Dynamic Noise/Texture Overlay (Optional - simplified here) */}
          <div className="absolute inset-0 bg-black/5 dark:bg-white/5 mix-blend-overlay" />

          {/* Centered Big Letter */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-black font-outfit text-black/5 dark:text-white/5 group-hover:scale-110 transition-transform duration-700 select-none">
              {project.meta.title[0]}
            </span>
          </div>

          {/* Floating Category Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border backdrop-blur-xl bg-white/10 dark:bg-black/40 ${isData ? 'border-cyan-500/30 text-cyan-700 dark:text-cyan-300' : 'border-purple-500/30 text-purple-700 dark:text-purple-300'}`}>
              {project.meta.category}
            </span>
          </div>

          {/* GitHub Icon (Top Right) */}
          {project.meta.github && (
            <a
              href={project.meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 group-hover:scale-110"
              aria-label="View on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          )}

          {/* View Project Button Overlay */}
          <Link href={`/project/${project.slug}`}>
            <div className="absolute inset-0 bg-black/20 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex items-center justify-center cursor-pointer">
              <span className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-cyan-50">
                View Project
              </span>
            </div>
          </Link>
        </div>

        {/* Bottom: Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col border-t border-white/10 dark:border-white/5">
          <div className="flex flex-col gap-3 mb-4">
            <h3
              className="text-2xl font-black font-outfit tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
              style={{ color: 'var(--text-header)' }}
            >
              {project.meta.title}
            </h3>

            <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
              {project.meta.excerpt}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-white/5 flex flex-col gap-5">
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {project.meta.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-[11px] font-mono font-semibold rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link & Year */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500">2024</span>
              <Link
                href={`/project/${project.slug}`}
                className={`text-sm font-bold flex items-center gap-2 transition-colors ${isData ? 'text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300' : 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300'}`}
              >
                Read Case Study
                <span className="text-lg leading-none mb-0.5">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
