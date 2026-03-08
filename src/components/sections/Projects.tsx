"use client";

import type { Project } from "@/lib/project";
import { ProjectList } from "./ProjectList";
import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/routing";

export function Projects({ projects }: { projects: Project[] }) {
  const t = useTranslations('Projects');

  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4 text-foreground">
            {t('title')}
          </h2>
          <p className="text-lg max-w-xl mx-auto text-foreground/80">
            {t('subtitle')}
          </p>
        </div>

        {/* Project Grid */}
        <ProjectList projects={projects.slice(0, 3)} />

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border font-bold text-sm tracking-wide transition-all duration-300 active:scale-95 hover:shadow-[0_0_20px_rgba(0,210,255,0.2)] dark:hover:shadow-[0_0_20px_rgba(0,210,255,0.1)] group"
            style={{
              borderColor: 'var(--nav-border)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--nav-bg)'
            }}
          >
            {t('viewAll')}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
