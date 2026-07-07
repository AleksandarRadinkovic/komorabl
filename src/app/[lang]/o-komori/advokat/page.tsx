import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { buildMetadata } from '@/lib/seo';
import AdvokatContent from '@/components/sections/o-komori/advokat/AdvokatContent';

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildMetadata({
    lang: params.lang,
    path: 'o-komori/advokat',
    title: dict.metadata.advokat.title,
    description: dict.metadata.advokat.description,
  });
}

export default function AdvokatPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  return <AdvokatContent lang={params.lang} />;
}
