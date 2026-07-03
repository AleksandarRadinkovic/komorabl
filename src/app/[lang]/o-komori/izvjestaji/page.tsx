import { getDictionary } from '@/i18n/dictionary';
import { client } from '@/sanity/lib/client';
import { allDokumentiQuery } from '@/sanity/lib/queries';
import IzvjestajiHero from '@/components/sections/o-komori/izvjestaji/IzvjestajiHero';
import ReportsList from '@/components/sections/o-komori/izvjestaji/ReportsList';

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
