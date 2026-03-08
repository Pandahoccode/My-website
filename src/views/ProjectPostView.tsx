import { getProjectBySlug } from '@/lib/project';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Github, ExternalLink, Home } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function ProjectPostView({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  const t = await getTranslations('Projects');

  if (!project) {
    notFound();
  }

  // Determine accent color based on category
  const isData = project.meta.category.includes("Data");
  const accentColor = isData ? "cyan" : "purple";

  return (
    <article className="relative z-10 py-32 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
          <Home className="w-4 h-4" /> {t('backHome')}
        </Link>
        <span className="text-gray-600">|</span>
        <Link href="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t('backToProjects')}
        </Link>
      </div>

      {/* Header Section */}
      <header className="mb-12">
        {/* Category Badge */}
        <div className="mb-6">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border backdrop-blur-xl ${isData
              ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
              : 'border-purple-500/30 text-purple-400 bg-purple-500/10'
              }`}
          >
            {project.meta.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-black font-outfit mb-4 leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {project.meta.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-gray-400 mb-6 max-w-2xl">
          {project.meta.excerpt}
        </p>

        {/* Meta: Date + Tags */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <time className="text-gray-500 font-mono text-sm">
            {project.meta.date}
          </time>
          <div className="flex gap-2">
            {project.meta.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-mono px-2 py-1 rounded ${isData
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-purple-400 bg-purple-500/10'
                  }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex gap-4">
          {project.meta.github && (
            <a
              href={project.meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm transition-all hover:scale-105 ${isData
                ? 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10'
                : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                }`}
            >
              <Github className="w-4 h-4" /> {t('viewCode')}
            </a>
          )}
          {project.meta.demo && project.meta.demo !== '#' && (
            <a
              href={project.meta.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm transition-all hover:scale-105 ${isData
                ? 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10'
                : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'
                }`}
            >
              <ExternalLink className="w-4 h-4" /> {t('liveDemo')}
            </a>
          )}
        </div>
      </header>

      {/* MDX Content with Glass Surface */}
      <div className="glass-surface p-8 md:p-12 rounded-2xl">
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-outfit prose-headings:text-white prose-p:text-gray-300 prose-a:text-cyan-400 prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:backdrop-blur-xl prose-code:text-cyan-300 prose-strong:text-white">
          <MDXRemote source={project.content} />
        </div>
      </div>
    </article>
  );
}
