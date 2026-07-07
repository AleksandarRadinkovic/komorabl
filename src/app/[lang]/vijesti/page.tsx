import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';
import { buildMetadata } from '@/lib/seo';
import VijestiBlog from '@/components/sections/vijesti/VijestiBlog';

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildMetadata({
    lang: params.lang,
    path: 'vijesti',
    title: dict.metadata.vijesti.title,
    description: dict.metadata.vijesti.description,
  });
}

export default async function VijestiPage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const [dict, posts] = await Promise.all([
    getDictionary(params.lang),
    client.fetch(allPostsQuery).catch(() => []),
  ]);

  return (
    <div>
      <VijestiBlog dict={dict} lang={params.lang} posts={posts} />
    </div>
  );
}
