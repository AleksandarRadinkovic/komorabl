import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { buildMetadata } from '@/lib/seo';
import AboutHero from '@/components/sections/o-komori/AboutHero';
import TimelineSection from '@/components/sections/o-komori/TimelineSection';
import MissionVision from '@/components/sections/o-komori/MissionVision';
import CurrentProjectsSection from '@/components/sections/o-komori/CurrentProjectsSection';
import EUProjects from '@/components/sections/o-komori/EUProjects';

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildMetadata({
    lang: params.lang,
    path: 'o-komori',
    title: dict.metadata.about.title,
    description: dict.metadata.about.description,
  });
}

export default async function AboutPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <AboutHero dict={dict.aboutPage} lang={params.lang} />
      <TimelineSection dict={dict.aboutPage} />
      <MissionVision dict={dict.aboutPage} />
      <CurrentProjectsSection dict={dict.aboutPage} />
      <EUProjects dict={dict.aboutPage} lang={params.lang} />
    </div>
  );
}
