"use client";

import { usePathname } from "next/navigation";

/**
 * Shared navigation logic for Navbar and Footer.
 * Determines if the user is on the home page and generates correct section hrefs.
 */
export function useNavigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || /^\/(en|fr|vi)\/?$/.test(pathname);

  const getNavHref = (section: string) => {
    return isHomePage ? section : `/${section}`;
  };

  return { isHomePage, getNavHref, pathname };
}
