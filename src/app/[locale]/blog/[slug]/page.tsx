/**
 * BLOG POST PAGE (Dynamic)
 * Route: /[locale]/blog/[slug] (e.g., /en/blog/hello-world)
 *
 * Displays a single blog post rendered from MDX content.
 * Uses generateStaticParams for static generation of all post slugs.
 *
 * @see src/views/BlogPostView.tsx for the full implementation
 * @see src/content/posts/ for the MDX blog content files
 */

import { BlogPostView } from "@/views/BlogPostView";
import { getPostSlugs } from '@/lib/posts';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostView slug={slug} />;
}
