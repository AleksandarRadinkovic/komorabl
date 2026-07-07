import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { buildMetadata } from '@/lib/seo';
import IstorijatHero from '@/components/sections/o-komori/istorijat/IstorijatHero';
import DetailedTimeline from '@/components/sections/o-komori/istorijat/DetailedTimeline';
import HistoricalGallery from '@/components/sections/o-komori/istorijat/HistoricalGallery';

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildMetadata({
    lang: params.lang,
    path: 'o-komori/istorijat',
    title: dict.metadata.istorijat.title,
    description: dict.metadata.istorijat.description,
  });
}

export default async function IstorijatPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <IstorijatHero dict={dict.istorijat} lang={params.lang} />
      <DetailedTimeline dict={dict.istorijat} />
      <HistoricalGallery dict={dict.istorijat} />
    </div>
  );
}
