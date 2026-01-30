"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useTransition } from 'react';

const locales = ['en', 'fr', 'vi'] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center gap-1 bg-background/50 backdrop-blur-md rounded-full px-2 py-1 border border-foreground/5 relative">
      {/* Circuit Line - Background Decoration */}
      <div className="absolute top-1/2 left-2 right-2 h-[1px] bg-foreground/10 -z-10" />

      {locales.map((l) => {
        const isActive = l === locale;
        return (
          <button
            key={l}
            onClick={() => handleLocaleChange(l)}
            disabled={isPending}
            className={clsx(
              "relative px-3 py-1 text-xs font-mono font-bold uppercase transition-colors duration-300",
              isActive ? "text-background" : "text-foreground/60 hover:text-[#00D2FF]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeLocaleNode"
                className="absolute inset-0 bg-[#00D2FF] rounded-full z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}
