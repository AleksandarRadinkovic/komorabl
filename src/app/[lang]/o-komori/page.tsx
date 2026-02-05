import { getDictionary } from '@/i18n/dictionary';
import AboutHero from '@/components/sections/o-komori/AboutHero';
import TimelineSection from '@/components/sections/o-komori/TimelineSection';
import MissionVision from '@/components/sections/o-komori/MissionVision';
import EUProjects from '@/components/sections/o-komori/EUProjects';

export default async function AboutPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <AboutHero dict={dict.aboutPage} lang={params.lang} />
      <TimelineSection dict={dict.aboutPage} />
      <MissionVision dict={dict.aboutPage} />
      <EUProjects dict={dict.aboutPage} lang={params.lang} />
    </div>
  );
}
