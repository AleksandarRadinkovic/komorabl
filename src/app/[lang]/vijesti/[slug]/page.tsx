import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { postBySlugQuery, allPostsQuery } from '@/sanity/lib/queries';
import PostPage from '@/components/sections/vijesti/PostPage';

export async function generateStaticParams() {
  const posts = await client.fetch(allPostsQuery).catch(() => []);
  return posts.map((post: any) => ({ slug: post.slug.current }));
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
