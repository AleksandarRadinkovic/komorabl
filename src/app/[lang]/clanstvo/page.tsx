import { getDictionary } from '@/i18n/dictionary';
import MembershipHero from '@/components/sections/clanstvo/MembershipHero';
import AutomaticMembership from '@/components/sections/clanstvo/AutomaticMembership';
import BenefitsSection from '@/components/sections/clanstvo/BenefitsSection';
import ProcessSection from '@/components/sections/clanstvo/ProcessSection';
import FAQSection from '@/components/sections/clanstvo/FAQSection';

export default async function MembershipPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <MembershipHero dict={dict.membership} lang={params.lang} />
      <AutomaticMembership dict={dict.membership} />
      <BenefitsSection dict={dict.membership} />
      <ProcessSection dict={dict.membership} lang={params.lang} />
      <FAQSection dict={dict.membership} />
    </div>
  );
}
