import type { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';
import { SITE_URL } from '@/lib/seo';
import { locales } from '@/i18n/config';

const STATIC_PATHS = [
  '',
  'o-komori',
  'o-komori/istorijat',
  'o-komori/organi',
  'o-komori/konferencija',
  'o-komori/izvjestaji',
  'o-komori/advokat',
  'usluge',
  'clanstvo',
  'kontakt',
  'vijesti',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(allPostsQuery).catch(() => []);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path ? `/${path}` : ''}`,
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}${path ? `/${path}` : ''}`])
        ),
      },
    }))
  );

  const postEntries: MetadataRoute.Sitemap = posts.flatMap((post: any) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}/vijesti/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...postEntries];
}
