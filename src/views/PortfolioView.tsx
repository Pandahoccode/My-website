// PortfolioView - Server Component wrapper for all sections
// Child components handle their own 'use client' directives as needed

import { Home } from "@/components/sections/Home";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Blog } from "@/components/sections/Blog";
import { ScrollFrames } from "@/components/layout/ScrollFrames";
import { Separator } from "@/components/ui/SectionSeparator";

import { getLocale } from 'next-intl/server';
import { getProjectsByLocale } from "@/lib/project";
import { getBlogsByLocale } from "@/lib/blog";

export async function PortfolioView() {
  const locale = await getLocale();
  const projects = getProjectsByLocale(locale);
  const blogs = getBlogsByLocale(locale);

  return (
    <>
      {/* Main Content */}
      <main className="relative z-10">

        {/* Scroll Frames Section */}
        <ScrollFrames />

        {/* Home Section */}
        <Home />
        <Separator />

        {/* Projects Section */}
        <Projects projects={projects} />
        <Separator />

        {/* About Section */}
        <About />
        <Separator />

        {/* Skills Section */}
        <Skills />
        <Separator />

        {/* Blog Section */}
        <Blog blogs={blogs} />
        <Separator />

        {/* Contact Section */}
        <Contact />
      </main>
    </>
  );
}
