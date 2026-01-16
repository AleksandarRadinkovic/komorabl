import { getDictionary } from '@/i18n/dictionary';
import HomeHero from '@/components/sections/HomeHero';
import AboutPreview from '@/components/sections/AboutPreview';
import ServicesPreview from '@/components/sections/ServicesPreview';
import LatestNews from '@/components/sections/LatestNews';
import CTASection from '@/components/sections/CTASection';

export default async function HomePage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <HomeHero dict={dict} lang={params.lang} />
      <AboutPreview dict={dict} lang={params.lang} />
      <ServicesPreview dict={dict} lang={params.lang} />
      <LatestNews dict={dict} lang={params.lang} />
      <CTASection dict={dict} lang={params.lang} />
    </div>
  );
}
