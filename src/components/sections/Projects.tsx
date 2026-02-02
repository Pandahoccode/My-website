import { getAllProjects } from "@/lib/project";
import { ProjectList } from "./ProjectList";

export async function Projects() {
  const projects = getAllProjects();

  return (
    <section id="projects" className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-black font-outfit mb-4">
          <span className="text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-gray-500">
            Featured Projects
          </span>
        </h2>
        <div className="h-1 w-24 bg-[#00D2FF] rounded-full" />
      </div>

      {/* Grid - Client Component */}
      <ProjectList projects={projects} />
    </section>
  );
}
