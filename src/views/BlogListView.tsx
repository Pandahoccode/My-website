import { Link } from '@/i18n/routing';
import { getAllBlogs } from '@/lib/blog';
import { useTranslations } from 'next-intl';

export function BlogListView() {
  const t = useTranslations('Navigation'); // Fallback or create a Blog specific dictionary
  const blogs = getAllBlogs();

  return (
    <div className="relative z-10 py-32 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="text-5xl font-black font-outfit text-white mb-6">
          Data <span className="text-electric-blue">Log</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Documentation of my journey through code, data, and design.
        </p>
      </div>

      <div className="space-y-8">
        {blogs.map((blog) => (
          <article key={blog.slug} className="group relative bg-navy-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-electric-blue/50 transition-colors duration-300">
            <Link href={`/blog/${blog.slug}`} className="absolute inset-0">
              <span className="sr-only">Read more about {blog.meta.title}</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex gap-2">
                {blog.meta.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-cyber-purple bg-cyber-purple/10 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
              <time className="text-sm font-mono text-gray-500">{blog.meta.date}</time>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-electric-blue transition-colors">
              {blog.meta.title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {blog.meta.excerpt}
            </p>
          </article>
        ))}

        {blogs.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No logs found in the archives.
          </div>
        )}
      </div>
    </div>
  );
}
