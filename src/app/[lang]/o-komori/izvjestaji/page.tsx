import { getDictionary } from '@/i18n/dictionary';
import IzvjestajiHero from '@/components/sections/o-komori/izvjestaji/IzvjestajiHero';
import ReportsList from '@/components/sections/o-komori/izvjestaji/ReportsList';

export default async function IzvjestajiPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <IzvjestajiHero dict={dict.izvjestaji} lang={params.lang} />
      <ReportsList dict={dict.izvjestaji} />
    </div>
  );
}
