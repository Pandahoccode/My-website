/**
 * BLOG LIST PAGE
 * Route: /[locale]/blog (e.g., /en/blog, /fr/blog)
 *
 * Displays a list of all blog posts with titles, dates, and excerpts.
 *
 * @see src/views/BlogListView.tsx for the full implementation
 */

import { BlogListView } from "@/views/BlogListView";
import { setRequestLocale } from 'next-intl/server';

export default async function BlogListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogListView />;
}
