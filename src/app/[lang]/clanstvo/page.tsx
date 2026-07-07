import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { buildMetadata } from '@/lib/seo';
import MembershipHero from '@/components/sections/clanstvo/MembershipHero';
import AutomaticMembership from '@/components/sections/clanstvo/AutomaticMembership';
import BenefitsSection from '@/components/sections/clanstvo/BenefitsSection';
import ProcessSection from '@/components/sections/clanstvo/ProcessSection';
import FAQSection from '@/components/sections/clanstvo/FAQSection';

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildMetadata({
    lang: params.lang,
    path: 'clanstvo',
    title: dict.metadata.membership.title,
    description: dict.metadata.membership.description,
  });
}

export default async function MembershipPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div>
      <MembershipHero dict={dict.membership} lang={params.lang} />
      <AutomaticMembership dict={dict.membership} />
      <BenefitsSection dict={dict.membership} lang={params.lang} />
      <ProcessSection dict={dict.membership} lang={params.lang} />
      <FAQSection dict={dict.membership} />
    </div>
  );
}
