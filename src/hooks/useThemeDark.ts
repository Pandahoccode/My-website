"use client";

import { useTheme } from "next-themes";
import { useMounted } from "./useMounted";

/**
 * Single source of truth for dark mode detection.
 * Uses `resolvedTheme` which handles system preference automatically.
 * Returns `isDark = true` as SSR default to prevent hydration flash.
 */
export function useThemeDark() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted ? resolvedTheme === "dark" : true;
  return { isDark, mounted, setTheme };
}
