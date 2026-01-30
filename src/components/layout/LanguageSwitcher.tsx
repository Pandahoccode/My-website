"use client";

import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { usePathname } from 'next/navigation'; // Use standard Next.js hook to get the FULL path
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useTransition } from 'react';

const locales = ['en', 'fr', 'vi'] as const;

// Helper function to strip ANY locale prefix from a path
function stripLocaleFromPath(path: string): string {
  for (const locale of locales) {
    const localePrefix = `/${locale}`;
    // Handle exact match (e.g., "/fr")
    if (path === localePrefix) {
      return '/';
    }
    // Handle prefix match (e.g., "/fr/about")
    if (path.startsWith(`${localePrefix}/`)) {
      return path.substring(localePrefix.length);
    }
  }
  return path;
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const fullPathname = usePathname(); // This returns the full path, e.g., /fr/about
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      // 1. Strip ANY locale prefix from the path (not just the current one)
      const pathWithoutLocale = stripLocaleFromPath(fullPathname);

      // 2. Use next-intl's router.replace which will correctly prepend the new locale
      router.replace(pathWithoutLocale, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center p-1 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 relative">
      {locales.map((l) => {
        const isActive = l === locale;
        return (
          <button
            key={l}
            onClick={() => handleLocaleChange(l)}
            disabled={isPending}
            className={clsx(
              "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 z-10",
              isActive ? "text-white" : "text-white/60 hover:text-white"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeLocaleBg"
                className="absolute inset-0 bg-gradient-to-r from-[#00AEEF] to-[#9D50BB] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
