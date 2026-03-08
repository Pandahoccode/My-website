"use client";

import { useRouter } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useTransition, useMemo } from 'react';
import { useMounted } from '@/hooks/useMounted';

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
  const mounted = useMounted();
  const isGlass = variant === 'glass';

  // Derive the active locale directly from the pathname on every render.
  const activeLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === activeLocale) return;

    startTransition(() => {
      const pathWithoutLocale = stripLocaleFromPath(pathname);
      router.replace(pathWithoutLocale, { locale: newLocale });
    });
  };

  // Prevent hydration mismatch — render skeleton pill until client-side mount
  if (!mounted) {
    return (
      <div className={clsx(
        "flex items-center p-[0.25rem] rounded-full backdrop-blur-xl border relative z-50 transition-colors",
        isGlass
          ? "bg-white/5 border-white/10"
          : "bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10"
      )}>
        {locales.map((l) => (
          <div key={l} className="px-[0.75rem] py-[0.25rem] min-w-[3rem] text-center font-bold rounded-full opacity-50">
            {l.toUpperCase()}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={clsx(
      "flex items-center p-[0.25rem] rounded-full backdrop-blur-xl border relative z-50 transition-colors",
      isGlass
        ? "bg-white/5 border-white/10"
        : "bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10"
    )}>
      {locales.map((l) => {
        const isActive = l === activeLocale;
        return (
          <button
            key={l}
            onClick={() => handleLocaleChange(l)}
            disabled={isPending}
            className={clsx(
              "relative px-[0.75rem] py-[0.25rem] font-bold rounded-full transition-all duration-300 z-10 min-w-[3rem]",
              isActive
                ? "scale-105 shadow-sm"
                : "hover:scale-105"
            )}
            style={{
              color: isActive ? 'var(--lang-text)' : 'var(--text-nav-inactive)'
            }}
          >
            {isActive && (
              <>
                {/* Light Mode Active BG (Default Variant Only) */}
                {!isGlass && (
                  <motion.div
                    layoutId="activeLocaleBg"
                    className="absolute inset-0 bg-slate-200 dark:hidden rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                {/* Dark Mode / Glass Active BG: Gradient */}
                <motion.div
                  layoutId={isGlass ? "activeLocaleBgGlass" : "activeLocaleBgDark"}
                  className={clsx(
                    "absolute inset-0 bg-gradient-to-r from-[#00AEEF] to-[#9D50BB] rounded-full -z-10 shadow-[0_0_20px_rgba(0,174,239,0.4)]",
                    isGlass ? "block" : "hidden dark:block"
                  )}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />

                {/* Gradient Blur (Dark/Glass) */}
                <div className={clsx(
                  "absolute inset-0 bg-gradient-to-r from-[#00AEEF] to-[#9D50BB] rounded-full -z-20 blur-md opacity-60",
                  isGlass ? "block" : "hidden dark:block"
                )} />
              </>
            )}
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
