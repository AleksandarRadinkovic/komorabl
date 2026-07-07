import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { buildMetadata } from '@/lib/seo';
import ServicesHero from '@/components/sections/usluge/ServicesHero';
import ServicesGrid from '@/components/sections/usluge/ServicesGrid';
import ServicesContact from '@/components/sections/usluge/ServicesContact';

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildMetadata({
    lang: params.lang,
    path: 'usluge',
    title: dict.metadata.services.title,
    description: dict.metadata.services.description,
  });
}

export default async function ServicesPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <ServicesHero dict={dict.services} lang={params.lang} />
      <ServicesGrid dict={dict.services} lang={params.lang} />
      <ServicesContact dict={dict.services} lang={params.lang} />
    </div>
  );
}
