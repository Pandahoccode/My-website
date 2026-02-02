import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ============================================================================
// Type Definitions
// ============================================================================

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image?: string;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

// ============================================================================
// Directory Path
// ============================================================================

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

// ============================================================================
// Post Functions
// ============================================================================

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as PostMeta,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));
  return posts;
}
