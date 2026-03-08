import { Link } from '@/i18n/routing';
import { getBlogsByLocale } from '@/lib/blog';
import { useTranslations, useLocale } from 'next-intl';

export function BlogListView() {
  const t = useTranslations('Blog');
  const locale = useLocale();
  const blogs = getBlogsByLocale(locale);

  return (
    <div className="relative z-10 py-32 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="text-5xl font-black font-outfit text-foreground mb-6">
          {t('title')}
        </h1>
        <p className="text-foreground/60 text-lg">
          {t('subtitle')}
        </p>
      </div>

      <div className="space-y-8">
        {blogs.map((blog) => (
          <article key={blog.slug} className="group relative bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 hover:border-electric-blue/50 transition-colors duration-300">
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
              <time className="text-sm font-mono text-foreground/50">{blog.meta.date}</time>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-electric-blue transition-colors">
              {blog.meta.title}
            </h2>
            <p className="text-foreground/60 text-sm leading-relaxed">
              {blog.meta.excerpt}
            </p>
          </article>
        ))}

        {blogs.length === 0 && (
          <div className="text-center text-foreground/50 py-12">
            {t('noBlogsFound')}
          </div>
        )}
      </div>
    </div>
  );
}
