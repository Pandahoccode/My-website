import { getAllProjects } from "@/lib/project";
import { ProjectList } from "./ProjectList";
import { getTranslations } from 'next-intl/server';
import { Link } from "@/i18n/routing";

export async function Projects() {
  const t = await getTranslations('Projects');
  const projects = getAllProjects();

  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold font-outfit mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--home-text)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Project Grid */}
        <ProjectList projects={projects.slice(0, 3)} />

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border font-medium transition-all hover:bg-slate-100 dark:hover:bg-white/10"
            style={{
              borderColor: 'var(--nav-border)',
              color: 'var(--text-primary)'
            }}
          >
            View All Projects <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
