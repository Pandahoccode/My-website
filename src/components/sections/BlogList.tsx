"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Cpu, Sparkles } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

// Icon mapping based on tags or fallback
function getIconForBlog(blog: BlogPost) {
  const tags = blog.meta.tags.map(t => t.toLowerCase());
  if (tags.some(t => t.includes('ai') || t.includes('ml') || t.includes('tensorflow'))) {
    return Sparkles;
  }
  if (tags.some(t => t.includes('next') || t.includes('react') || t.includes('canvas'))) {
    return Cpu;
  }
  return BookOpen;
}

interface BlogListProps {
  blogs: BlogPost[];
}

export function BlogList({ blogs }: BlogListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {blogs.map((blog) => {
        const Icon = getIconForBlog(blog);
        return (
          <motion.div
            key={blog.slug}
            variants={itemVariants}
            className="group relative bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-foreground/10 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] antigravity-card hover:translate-y-[-8px] hover:shadow-2xl dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]"
          >
            {/* Icon */}
            <div className="mb-6 inline-flex p-3 rounded-xl bg-gradient-to-br from-[#00AEEF]/10 to-[#9D50BB]/10 text-[#00AEEF]">
              <Icon className="w-6 h-6" />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-sm text-foreground/40 mb-3 font-mono">
              <span>{formatDate(blog.meta.date)}</span>
              <span>•</span>
              <span className="text-[#9D50BB]">{blog.meta.tags[0] || 'Article'}</span>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold mb-3 font-outfit group-hover:text-[#00AEEF] transition-colors">
              {blog.meta.title}
            </h3>
            <p className="text-foreground/60 mb-8 leading-relaxed">
              {blog.meta.excerpt}
            </p>

            {/* Link */}
            <div className="flex items-center gap-2 text-foreground font-medium group-hover:gap-3 transition-all">
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 group-hover:text-[#00AEEF] transition-colors" />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
