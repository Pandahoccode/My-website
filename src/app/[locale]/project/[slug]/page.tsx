/**
 * PROJECT DETAIL PAGE (Dynamic)
 * Route: /[locale]/project/[slug] (e.g., /en/project/air-quality)
 *
 * Displays a single project case study rendered from MDX content.
 * Uses generateStaticParams for static generation of all project slugs.
 *
 * @see src/views/ProjectPostView.tsx for the full implementation
 * @see src/content/projects/ for the MDX project content files
 */

import { ProjectPostView } from "@/views/ProjectPostView";
import { getProjectSlugs } from '@/lib/project';

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectPostView slug={slug} />;
}
