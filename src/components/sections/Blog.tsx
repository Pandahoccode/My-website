"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Cpu, Sparkles } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Exploring Next.js 15",
    category: "Development",
    date: "Feb 2026",
    excerpt: "Diving into the new hydration primitives and partial prerendering features that define the next generation of React frameworks.",
    icon: Cpu
  },
  {
    id: 2,
    title: "The Future of AI",
    category: "Deep Tech",
    date: "Jan 2026",
    excerpt: "How agentic workflows and multimodal models are reshaping software engineering paradigms forever.",
    icon: Sparkles
  },
  {
    id: 3,
    title: "Designing for Movement",
    category: "Design",
    date: "Dec 2025",
    excerpt: "Why micro-interactions and fluid physics are essential for modern, premium user experiences.",
    icon: BookOpen
  }
];

export function Blog() {
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

  return (
    <section id="blog" className="py-24 px-6 relative z-10 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
            Creative Log
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Recent thoughts, technical discoveries, and explorations in code.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {BLOG_POSTS.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="group relative bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-2xl p-8 hover:bg-foreground/10 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex p-3 rounded-xl bg-gradient-to-br from-[#00AEEF]/10 to-[#9D50BB]/10 text-[#00AEEF]">
                <post.icon className="w-6 h-6" />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 text-sm text-foreground/40 mb-3 font-mono">
                <span>{post.date}</span>
                <span>•</span>
                <span className="text-[#9D50BB]">{post.category}</span>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3 font-outfit group-hover:text-[#00AEEF] transition-colors">
                {post.title}
              </h3>
              <p className="text-foreground/60 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Link */}
              <div className="flex items-center gap-2 text-foreground font-medium group-hover:gap-3 transition-all">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 group-hover:text-[#00AEEF] transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
