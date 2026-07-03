import { getDictionary } from '@/i18n/dictionary';
import ConferenceHero from '@/components/sections/o-komori/konferencija/ConferenceHero';
import ConferenceVideo from '@/components/sections/o-komori/konferencija/ConferenceVideo';

export default async function ConferencePage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <ConferenceHero dict={dict.conference} lang={params.lang} />
      <ConferenceVideo dict={dict.conference} />
    </div>
  );
}
