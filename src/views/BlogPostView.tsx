import { getBlogBySlug } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Home } from 'lucide-react';

export async function BlogPostView({ slug }: { slug: string }) {
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="relative z-10 py-32 px-6 md:px-12 max-w-3xl mx-auto min-h-screen">
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-cyan-400 transition-colors">
          <Home className="w-4 h-4" /> Home
        </Link>
        <span className="text-foreground/40">|</span>
        <Link href="/blog" className="inline-flex items-center gap-2 text-foreground/60 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      <header className="mb-12">
        <div className="flex gap-2 mb-6">
          {blog.meta.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-electric-blue bg-electric-blue/10 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-outfit text-foreground mb-4 leading-tight">
          {blog.meta.title}
        </h1>
        <time className="text-foreground/50 font-mono text-sm">
          {blog.meta.date}
        </time>
      </header>

      <div className="prose prose-lg max-w-none prose-headings:font-outfit prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-electric-blue prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-foreground/10 prose-pre:backdrop-blur-xl">
        <MDXRemote source={blog.content} />
      </div>
    </article>
  );
}
