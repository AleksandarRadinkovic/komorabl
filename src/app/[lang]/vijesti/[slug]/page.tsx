import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { postBySlugQuery, allPostsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { buildMetadata } from '@/lib/seo';
import PostPage from '@/components/sections/vijesti/PostPage';

export async function generateStaticParams() {
  const posts = await client.fetch(allPostsQuery).catch(() => []);
  return posts.map((post: any) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en'; slug: string };
}): Promise<Metadata> {
  const post = await client
    .fetch(postBySlugQuery, { slug: params.slug })
    .catch(() => null);

  if (!post) {
    return buildMetadata({
      lang: params.lang,
      path: `vijesti/${params.slug}`,
      title: params.lang === 'sr' ? 'Vijest' : 'News',
      description: '',
    });
  }

  return buildMetadata({
    lang: params.lang,
    path: `vijesti/${params.slug}`,
    title: post.title,
    description: post.excerpt || post.title,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    type: 'article',
  });
}

export default async function VijestiPostPage({
  params,
}: {
  params: { lang: 'sr' | 'en'; slug: string };
}) {
  const post = await client
    .fetch(postBySlugQuery, { slug: params.slug })
    .catch(() => null);

  if (!post) notFound();

  return <PostPage post={post} lang={params.lang} />;
}
