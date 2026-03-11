/**
 * BLOG POST PAGE (Dynamic)
 * Route: /[locale]/blog/[slug] (e.g., /en/blog/hello-world)
 *
 * Displays a single blog post rendered from MDX content.
 * Uses generateStaticParams for static generation of all post slugs.
 *
 * @see src/views/BlogPostView.tsx for the full implementation
 * @see src/content/blog/ for the MDX blog content files
 */

import { BlogPostView } from "@/views/BlogPostView";
import { getBlogSlugs } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => {
    const slugs = getBlogSlugs(locale);
    return slugs.map((slug) => ({
      locale,
      slug: slug.replace(/\.mdx$/, ''),
    }));
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  return <BlogPostView slug={slug} locale={locale} />;
}
