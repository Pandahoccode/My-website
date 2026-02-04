import { getAllBlogs } from "@/lib/blog";
import { BlogList } from "./BlogList";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export async function Blog() {
  const blogs = getAllBlogs();

  return (
    <section id="blog" className="py-24 px-6 relative z-10 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold font-outfit mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Creative Log
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--home-text)' }}
          >
            Recent thoughts, technical discoveries, and explorations in code.
          </p>
        </div>

        {/* Grid - Client Component */}
        <BlogList blogs={blogs} />

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border transition-all hover:bg-slate-100 dark:hover:bg-white/10 text-sm"
            style={{
              borderColor: 'var(--nav-border)',
              color: 'var(--text-primary)'
            }}
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
