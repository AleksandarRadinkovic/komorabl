import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { client } from '@/sanity/lib/client';
import { allDokumentiQuery } from '@/sanity/lib/queries';
import { buildMetadata } from '@/lib/seo';
import IzvjestajiHero from '@/components/sections/o-komori/izvjestaji/IzvjestajiHero';
import ReportsList from '@/components/sections/o-komori/izvjestaji/ReportsList';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildMetadata({
    lang: params.lang,
    path: 'o-komori/izvjestaji',
    title: dict.metadata.izvjestaji.title,
    description: dict.metadata.izvjestaji.description,
  });
}

export default async function IzvjestajiPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const [dict, documents] = await Promise.all([
    getDictionary(params.lang),
    client.fetch(allDokumentiQuery).catch(() => []),
  ]);

  return (
    <div>
      <IzvjestajiHero dict={dict.izvjestaji} lang={params.lang} />
      <ReportsList dict={dict.izvjestaji} documents={documents} />
    </div>
  );
}
