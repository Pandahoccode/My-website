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

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  return fs.readdirSync(projectsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getProjectBySlug(slug: string): Project | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`);

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

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));
  return projects;
}
