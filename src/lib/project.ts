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
  rating?: number;
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
  return projects;
}

/**
 * Get projects filtered by locale.
 */
export function getProjectsByLocale(locale: string): Project[] {
  return getAllProjects(locale);
}
