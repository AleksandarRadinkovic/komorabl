import { getDictionary } from '@/i18n/dictionary';
import OrganiHero from '@/components/sections/o-komori/organi/OrganiHero';
import OrganiNotice from '@/components/sections/o-komori/organi/OrganiNotice';
import OrganiComposition from '@/components/sections/o-komori/organi/OrganiComposition';

export default async function OrganiPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <OrganiHero dict={dict.organi} lang={params.lang} />
      <OrganiNotice dict={dict.organi} />
      <OrganiComposition dict={dict.organi} />
    </div>
  );
}
