import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ============================================================================
// Type Definitions
// ============================================================================

export interface BlogMeta {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image?: string;
  lang?: string;
  rating?: number;
}

export interface BlogPost {
  slug: string;
  meta: BlogMeta;
  content: string;
}

// ============================================================================
// Directory Path
// ============================================================================

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

// ============================================================================
// Blog Functions
// ============================================================================

export function getBlogSlugs(locale: string): string[] {
  const mappedDir = path.join(blogDirectory, locale);
  if (!fs.existsSync(mappedDir)) {
    return [];
  }
  return fs.readdirSync(mappedDir).filter((file) => file.endsWith('.mdx'));
}

export function getBlogBySlug(slug: string, locale: string): BlogPost | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(blogDirectory, locale, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as BlogMeta,
    content,
  };
}

export function getAllBlogs(locale: string): BlogPost[] {
  const slugs = getBlogSlugs(locale);
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug, locale))
    .filter((blog): blog is BlogPost => blog !== null)
    .sort((a, b) => {
      // 1. Rating (descending) - default to 0 if missing
      const ratingA = a.meta.rating || 0;
      const ratingB = b.meta.rating || 0;
      if (ratingA !== ratingB) return ratingB - ratingA;

      // 2. Name/Title (ascending)
      const titleComparison = a.meta.title.localeCompare(b.meta.title);
      if (titleComparison !== 0) return titleComparison;

      // 3. Date (descending)
      return b.meta.date.localeCompare(a.meta.date);
    });
  return blogs;
}

export function getBlogsByLocale(locale: string): BlogPost[] {
  return getAllBlogs(locale);
}
