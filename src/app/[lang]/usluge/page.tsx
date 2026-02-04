import { getDictionary } from '@/i18n/dictionary';
import ServicesHero from '@/components/sections/usluge/ServicesHero';
import ServicesGrid from '@/components/sections/usluge/ServicesGrid';
import PricingSection from '@/components/sections/usluge/PricingSection';
import ServicesContact from '@/components/sections/usluge/ServicesContact';

export default async function ServicesPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <ServicesHero dict={dict.services} lang={params.lang} />
      <ServicesGrid dict={dict.services} lang={params.lang} />
      <PricingSection dict={dict.services} />
      <ServicesContact dict={dict.services} lang={params.lang} />
    </div>
  );
}
