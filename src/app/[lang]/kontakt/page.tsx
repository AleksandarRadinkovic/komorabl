import { getDictionary } from '@/i18n/dictionary';
import ContactHero from '@/components/sections/kontakt/ContactHero';
import ContactInfo from '@/components/sections/kontakt/ContactInfo';
import ContactForm from '@/components/sections/kontakt/ContactForm';
import MapSection from '@/components/sections/kontakt/MapSection';

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
