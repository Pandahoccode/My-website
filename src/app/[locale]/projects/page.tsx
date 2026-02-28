import { getProjectsByLocale } from "@/lib/project";
import { ProjectList } from "@/components/sections/ProjectList";
import { getTranslations, getLocale } from 'next-intl/server';
import { Separator } from "@/components/ui/SectionSeparator";

export default async function ProjectsPage() {
  const t = await getTranslations('Projects');
  const locale = await getLocale();
  const projects = getProjectsByLocale(locale);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black font-outfit mb-6 text-foreground">
            {t('title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-foreground/80">
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
