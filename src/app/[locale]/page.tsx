import { useTranslations } from 'next-intl';
import { Projects } from '@/components/sections/Projects';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { SectionSeparator } from '@/components/ui/SectionSeparator';
import { ScrollFrames } from '@/components/ui/ScrollFrames';

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <main className="relative w-full min-h-screen flex flex-col bg-navy-black">
      {/* Scrollytelling Hero Area */}
      <ScrollFrames />
      <Hero />

      <SectionSeparator />
      <Projects />

      <SectionSeparator />
      <About />

      <SectionSeparator />
      <Contact />
    </main>
  );
}
