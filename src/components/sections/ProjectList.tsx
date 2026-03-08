"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { SearchBar } from "@/components/ui/SearchBar";
import type { Project } from "@/lib/project";
import { useTranslations } from "next-intl";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const t = useTranslations('Projects');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Extract all unique tags (memoized to avoid recomputation)
  const allTags = useMemo(() =>
    Array.from(new Set(projects.flatMap(p =>
      [p.meta.category, ...(p.meta.tags || [])]
    ))).filter(Boolean),
    [projects]
  );

  // Use actual tags from projects plus some defaults if needed
  const displayTags = useMemo(() =>
    Array.from(new Set([...allTags, "Data Analysis", "Machine Learning", "Data Engineering", "Python", "SQL"])).slice(0, 15),
    [allTags]
  );

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

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  return (
    <div className="space-y-12">
      {/* Search & Filter Section */}
      <div className="max-w-2xl mx-auto space-y-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t('searchPlaceholder')}
          selectedTags={selectedTags}
          availableTags={displayTags}
          onToggleTag={toggleTag}
        />
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
            <p>{t('noProjectsFound')}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations('Projects');
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
        className={`relative flex flex-col h-full overflow-hidden glass-surface antigravity-card ${glowClass} ${borderClass}`}
      >
        {/* Top: Image Slot with Overlay */}
        <div className="relative h-56 w-full overflow-hidden">
          {/* Image */}
          {project.meta.image ? (
            <Image
              src={project.meta.image}
              alt={project.meta.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${project.meta.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
          )}

          {/* Dynamic Noise/Texture Overlay (Optional - simplified here) */}
          <div className="absolute inset-0 bg-black/10 dark:bg-white/5 mix-blend-overlay" />

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
                {t('viewProject')}
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

            <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 min-h-[4.5rem]">
              {project.meta.excerpt}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-white/5 flex flex-col gap-5">
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {project.meta.tags.map(tag => (
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
                {t('readCaseStudy')}
                <span className="text-lg leading-none mb-0.5">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
