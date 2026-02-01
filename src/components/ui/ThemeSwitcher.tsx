"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-14 h-8 bg-gray-200 dark:bg-slate-800 rounded-full" />;
  }

  const isDark = theme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-slate-800 flex items-center p-1 cursor-pointer transition-colors duration-300 border border-black/5 dark:border-white/10"
      role="button"
      tabIndex={0}
      aria-label="Toggle Theme"
    >
      {/* Icons Background - Positioned absolutely inside the track */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun className="w-3.5 h-3.5 text-yellow-500" />
        <Moon className="w-3.5 h-3.5 text-blue-200" />
      </div>

      {/* Sliding Thumb */}
      <motion.div
        layout
        initial={false}
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-md z-10"
      />
    </div>
  );
}
