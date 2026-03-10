/**
 * PORTFOLIO HOME PAGE
 * Route: /[locale] (e.g., /en, /fr, /vi)
 *
 * Main landing page displaying the portfolio with Hero, ScrollFrames,
 * About, Skills, Projects, and Contact sections.
 *
 * @see src/views/PortfolioView.tsx for the full implementation
 */

import { PortfolioView } from "@/views/PortfolioView";

import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PortfolioView />;
}
