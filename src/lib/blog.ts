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
    .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));
  return blogs;
}

export function getBlogsByLocale(locale: string): BlogPost[] {
  return getAllBlogs(locale);
}
