import { getDictionary } from '@/i18n/dictionary';
import HomeHero from '@/components/sections/home/HomeHero';
import AboutPreview from '@/components/sections/home/AboutPreview';
import ServicesPreview from '@/components/sections/home/ServicesPreview';
import LatestNews from '@/components/sections/home/LatestNews';
import CTASection from '@/components/sections/home/CTASection';

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
