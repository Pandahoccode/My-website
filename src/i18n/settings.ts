export const locales = ['en', 'fr', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const labels = {
  en: 'English',
  fr: 'Français',
  vi: 'Tiếng Việt'
} as const;
