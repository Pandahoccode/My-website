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

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  return fs.readdirSync(blogDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);

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

export function getAllBlogs(): BlogPost[] {
  const slugs = getBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is BlogPost => blog !== null)
    .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));
  return blogs;
}
