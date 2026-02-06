import { getAllProjects } from "@/lib/project";
import { ProjectList } from "@/components/sections/ProjectList";
import { getTranslations } from 'next-intl/server';
import { Separator } from "@/components/ui/SectionSeparator";

export default async function ProjectsPage() {
  const t = await getTranslations('Projects');
  const projects = getAllProjects();

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black font-outfit mb-6 text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>

        <Separator />

        <div className="mt-12">
          {/* Show ALL projects here */}
          <ProjectList projects={projects} />
        </div>
      </div>
    </main>
  );
}
