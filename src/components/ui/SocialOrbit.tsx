"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function SocialOrbit() {
  // High-fidelity icons configuration
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Pandahoccode",
      label: "GitHub",
      color: "hover:text-[#2dba4e]" // GitHub Green
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/phuc-anh-dang/",
      label: "LinkedIn",
      color: "hover:text-[#0077b5]" // LinkedIn Blue
    },
    // Using X icon (Twitter)
    {
      icon: Twitter, // Lucide 'Twitter' is often used for X, checking if X exists or we style it
      href: "https://twitter.com",
      label: "X (Twitter)",
      color: "hover:text-[#1DA1F2] dark:hover:text-white" // X Black/White
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex items-center gap-6 mt-8"
    >
      {socialLinks.map((social, index) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group relative p-3 rounded-full
            transition-all duration-300 ease-out
            hover:scale-125 hover:bg-white/10 dark:hover:bg-white/5
            text-slate-600 dark:text-slate-400
            ${social.color}
          `}
          aria-label={social.label}
        >
          <social.icon strokeWidth={1.5} className="w-6 h-6 transition-transform duration-300" />

          {/* Subtle glow on hover */}
          <span className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300" />
        </a>
      ))}
    </motion.div>
  );
}
