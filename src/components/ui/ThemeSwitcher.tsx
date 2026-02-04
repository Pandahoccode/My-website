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
    return <div className="w-14 h-8 bg-slate-800 rounded-full" />;
  }

  const isDark = theme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative w-14 h-8 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 border
        ${isDark ? "bg-slate-800 border-white/10" : "bg-blue-100 border-black/5"}
      `}
      role="button"
      tabIndex={0}
      aria-label="Toggle Theme"
    >
      {/* Icons Background - Moon on Left, Sun on Right */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Moon className={`w-3.5 h-3.5 transition-opacity ${isDark ? "text-blue-200 opacity-0" : "text-slate-400 opacity-100"}`} />
        <Sun className={`w-3.5 h-3.5 transition-opacity ${isDark ? "text-yellow-400 opacity-100" : "text-yellow-500 opacity-0"}`} />
      </div>

      {/* Sliding Thumb - Dark = Left (0), Light = Right (20) */}
      <motion.div
        layout
        initial={false}
        animate={{ x: isDark ? 0 : 20 }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-md z-10"
      />
    </div>
  );
}
