"use client";

import { useRouter } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useTransition, useMemo } from 'react';

const locales = ['en', 'fr', 'vi'] as const;
type Locale = typeof locales[number];

// Helper function to extract the locale from a path
function getLocaleFromPath(path: string): Locale {
  for (const locale of locales) {
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return 'en'; // Default fallback
}

// Helper function to strip ANY locale prefix from a path
function stripLocaleFromPath(path: string): string {
  for (const locale of locales) {
    const localePrefix = `/${locale}`;
    if (path === localePrefix) {
      return '/';
    }
    if (path.startsWith(`${localePrefix}/`)) {
      return path.substring(localePrefix.length);
    }
  }
  return path;
}

interface LanguageSwitcherProps {
  variant?: 'default' | 'glass';
}

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Derive the active locale directly from the pathname on every render.
  // This prevents the "flash" and ensures it's always in sync.
  const activeLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === activeLocale) return;

    startTransition(() => {
      const pathWithoutLocale = stripLocaleFromPath(pathname);
      router.replace(pathWithoutLocale, { locale: newLocale });
    });
  };

  const isGlass = variant === 'glass';

  return (
    <div className={clsx(
      "flex items-center p-1 rounded-full backdrop-blur-xl border relative transition-colors",
      isGlass ? "bg-white/5 border-white/10" : "bg-foreground/5 border-foreground/10"
    )}>
      {locales.map((l) => {
        const isActive = l === activeLocale;
        return (
          <button
            key={l}
            onClick={() => handleLocaleChange(l)}
            disabled={isPending}
            className={clsx(
              "relative px-3 py-1 font-bold rounded-full transition-all duration-300 z-10",
              isActive
                ? "text-background text-xs scale-105 shadow-md"
                : clsx(
                  "text-xs hover:scale-105",
                  isGlass ? "text-white/60 hover:text-white" : "text-foreground/60 hover:text-foreground"
                )
            )}
          >
            {isActive && (
              <>
                <motion.div
                  layoutId="activeLocaleBg"
                  className="absolute inset-0 bg-gradient-to-r from-[#00AEEF] to-[#9D50BB] rounded-full -z-10 shadow-[0_0_20px_rgba(0,174,239,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00AEEF] to-[#9D50BB] rounded-full -z-20 blur-md opacity-60" />
              </>
            )}
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
