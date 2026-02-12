import { getDictionary } from '@/i18n/dictionary';
import OrganiHero from '@/components/sections/o-komori/organi/OrganiHero';
import LeadershipSection from '@/components/sections/o-komori/organi/LeadershipSection';
import BoardsSection from '@/components/sections/o-komori/organi/BoardsSection';

export default async function OrganiPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <OrganiHero dict={dict.organi} lang={params.lang} />
      <LeadershipSection dict={dict.organi} />
      <BoardsSection dict={dict.organi} />
    </div>
  );
}
