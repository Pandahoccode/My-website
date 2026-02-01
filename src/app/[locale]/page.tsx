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

export default function HomePage() {
  return <PortfolioView />;
}
