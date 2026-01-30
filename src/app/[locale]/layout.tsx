import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Inter, Outfit } from "next/font/google";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/Navbar';
import { RibbonFlow } from '@/components/ui/RibbonFlow';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground overflow-x-hidden selection:bg-[var(--color-vivid-cyan)] selection:text-white transition-colors duration-300`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <RibbonFlow />
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
