import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ============================================================================
// Type Definitions
// ============================================================================

export interface ProjectMeta {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image?: string;
  category: string;
  github?: string;
  demo?: string;
  color: string;
  featured?: boolean;
  lang?: string;
}

export interface Project {
  slug: string;
  meta: ProjectMeta;
  content: string;
}

// ============================================================================
// Directory Path
// ============================================================================

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

// ============================================================================
// Project Functions
// ============================================================================

export function getProjectSlugs(locale: string): string[] {
  const mappedDir = path.join(projectsDirectory, locale);
  if (!fs.existsSync(mappedDir)) {
    return [];
  }
  return fs.readdirSync(mappedDir).filter((file) => file.endsWith('.mdx'));
}

export function getProjectBySlug(slug: string, locale: string): Project | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(projectsDirectory, locale, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as ProjectMeta,
    content,
  };
}

export function getAllProjects(locale: string): Project[] {
  const slugs = getProjectSlugs(locale);
  const projects = slugs
    .map((slug) => getProjectBySlug(slug, locale))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));
  return projects;
}

/**
 * Get projects filtered by locale.
 */
export function getProjectsByLocale(locale: string): Project[] {
  return getAllProjects(locale);
}
