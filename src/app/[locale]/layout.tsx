import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Space_Grotesk, Archivo } from "next/font/google";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/Navbar';
import { StarBackground } from '@/components/ui/StarBackground';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${archivo.variable} antialiased bg-transparent text-foreground overflow-x-hidden selection:bg-[var(--color-vivid-cyan)] selection:text-white transition-colors duration-300`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <StarBackground />
            <Navbar />
            {children}
            <ScrollToTop />
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
