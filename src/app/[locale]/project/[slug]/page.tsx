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
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => {
    const slugs = getProjectSlugs(locale);
    return slugs.map((slug) => ({
      locale,
      slug: slug.replace(/\.mdx$/, ''),
    }));
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  return <ProjectPostView slug={slug} locale={locale} />;
}
