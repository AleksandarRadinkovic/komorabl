import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionary';
import { client } from '@/sanity/lib/client';
import { latestPostsQuery } from '@/sanity/lib/queries';
import { buildMetadata, BASE_KEYWORDS_SR, BASE_KEYWORDS_EN } from '@/lib/seo';
import HomeHero from '@/components/sections/home/HomeHero';
import AboutPreview from '@/components/sections/home/AboutPreview';
import ServicesPreview from '@/components/sections/home/ServicesPreview';
import ProjectsSection from '@/components/sections/home/ProjectsSection';
import LatestNews from '@/components/sections/home/LatestNews';
import CTASection from '@/components/sections/home/CTASection';

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);

  return buildMetadata({
    lang: params.lang,
    path: '',
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
    keywords: params.lang === 'sr' ? BASE_KEYWORDS_SR : BASE_KEYWORDS_EN,
  });
}

export default async function HomePage({ params }: { params: { lang: 'sr' | 'en' } }) {
  const [dict, latestPosts] = await Promise.all([
    getDictionary(params.lang),
    client.fetch(latestPostsQuery).catch(() => []),
  ]);

  return (
    <div>
      <HomeHero dict={dict} lang={params.lang} />
      <AboutPreview dict={dict} lang={params.lang} />
      <ServicesPreview dict={dict} lang={params.lang} />
      <ProjectsSection dict={dict} lang={params.lang} />
      <LatestNews dict={dict} lang={params.lang} posts={latestPosts} />
      <CTASection dict={dict} lang={params.lang} />
    </div>
  );
}
