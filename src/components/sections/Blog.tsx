import { getAllPosts } from "@/lib/blog";
import { BlogList } from "./BlogList";

export async function Blog() {
  const posts = getAllPosts();

  return (
    <section id="blog" className="py-24 px-6 relative z-10 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
            Creative Log
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Recent thoughts, technical discoveries, and explorations in code.
          </p>
        </div>

        {/* Grid - Client Component */}
        <BlogList posts={posts} />
      </div>
    </section>
  );
}
