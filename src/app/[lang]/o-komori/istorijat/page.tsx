import { getDictionary } from '@/i18n/dictionary';
import IstorijatHero from '@/components/sections/o-komori/istorijat/IstorijatHero';
import DetailedTimeline from '@/components/sections/o-komori/istorijat/DetailedTimeline';
import HistoricalGallery from '@/components/sections/o-komori/istorijat/HistoricalGallery';

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
