import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { buildMetadata } from '@/lib/seo';
import ConferenceHero from '@/components/sections/o-komori/konferencija/ConferenceHero';
import ConferenceVideo from '@/components/sections/o-komori/konferencija/ConferenceVideo';

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildMetadata({
    lang: params.lang,
    path: 'o-komori/konferencija',
    title: dict.metadata.conference.title,
    description: dict.metadata.conference.description,
  });
}

export default async function ConferencePage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <ConferenceHero dict={dict.conference} lang={params.lang} />
      <ConferenceVideo dict={dict.conference} />
    </div>
  );
}
