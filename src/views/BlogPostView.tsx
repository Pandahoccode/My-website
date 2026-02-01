import { getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

export async function BlogPostView({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="relative z-10 py-32 px-6 md:px-12 max-w-3xl mx-auto min-h-screen">
      <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-electric-blue mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Log
      </Link>

      <header className="mb-12">
        <div className="flex gap-2 mb-6">
          {post.meta.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-electric-blue bg-electric-blue/10 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-outfit text-white mb-4 leading-tight">
          {post.meta.title}
        </h1>
        <time className="text-gray-500 font-mono text-sm">
          {post.meta.date}
        </time>
      </header>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-outfit prose-headings:text-white prose-p:text-gray-300 prose-a:text-electric-blue prose-pre:bg-navy-black/80 prose-pre:border prose-pre:border-white/10 prose-pre:backdrop-blur-xl">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
