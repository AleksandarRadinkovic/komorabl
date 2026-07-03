import { getDictionary } from '@/i18n/dictionary';
import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';
import VijestiBlog from '@/components/sections/vijesti/VijestiBlog';

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
