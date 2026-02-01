"use client";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Blog } from "@/components/sections/Blog";
import { ScrollFrames } from "@/components/ui/ScrollFrames";
import { Separator } from "@/components/ui/SectionSeparator";

export function PortfolioView() {
  return (
    <>
      {/* Main Content */}
      <main className="relative z-10">

        {/* Scroll Frames Section */}
        <ScrollFrames />

        {/* Hero Section */}
        <Hero />
        <Separator />

        {/* Projects Section */}
        <Projects />
        <Separator />

        {/* About Section */}
        <About />
        <Separator />

        {/* Skills Section */}
        <Skills />
        <Separator />

        {/* Blog Section */}
        <Blog />
        <Separator />

        {/* Contact Section */}
        <Contact />
      </main>
    </>
  );
}
