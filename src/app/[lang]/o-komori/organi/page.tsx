import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { buildMetadata } from '@/lib/seo';
import OrganiHero from '@/components/sections/o-komori/organi/OrganiHero';
import OrganiNotice from '@/components/sections/o-komori/organi/OrganiNotice';
import OrganiComposition from '@/components/sections/o-komori/organi/OrganiComposition';

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildMetadata({
    lang: params.lang,
    path: 'o-komori/organi',
    title: dict.metadata.organi.title,
    description: dict.metadata.organi.description,
  });
}

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
