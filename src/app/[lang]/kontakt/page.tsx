import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { buildMetadata } from '@/lib/seo';
import ContactHero from '@/components/sections/kontakt/ContactHero';
import ContactInfo from '@/components/sections/kontakt/ContactInfo';
import ContactForm from '@/components/sections/kontakt/ContactForm';
import MapSection from '@/components/sections/kontakt/MapSection';

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildMetadata({
    lang: params.lang,
    path: 'kontakt',
    title: dict.metadata.contact.title,
    description: dict.metadata.contact.description,
  });
}

export default async function ContactPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <ContactHero dict={dict.contact} lang={params.lang} />
      <ContactInfo dict={dict.contact} lang={params.lang} />
      <ContactForm dict={dict.contact} />
      <MapSection dict={dict.contact} />
    </div>
  );
}
