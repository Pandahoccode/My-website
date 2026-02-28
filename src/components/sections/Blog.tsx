import { getAllBlogs } from "@/lib/blog";
import { BlogList } from "./BlogList";
import { Link } from "@/i18n/routing";

export async function Blog() {
  const blogs = getAllBlogs();

  return (
    <section id="blog" className="py-24 px-6 relative z-10 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4 text-foreground">
            Creative Log
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-foreground/80">
            Recent thoughts, technical discoveries, and explorations in code.
          </p>
        </div>

        {/* Grid - Client Component */}
        <BlogList blogs={blogs} />

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border font-bold text-sm tracking-wide transition-all duration-300 active:scale-95 hover:shadow-[0_0_20px_rgba(0,210,255,0.2)] dark:hover:shadow-[0_0_20px_rgba(0,210,255,0.1)] group"
            style={{
              borderColor: 'var(--nav-border)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--nav-bg)'
            }}
          >
            View All Posts
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
