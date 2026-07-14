import type { Metadata } from 'next';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pkspbl.com').replace(/\/+$/, '');
export const SITE_NAME = 'PKSP Banja Luka';

export const BASE_KEYWORDS_SR = [
  'Područna komora samostalnih preduzetnika',
  'Komora Banja Luka',
  'Zanatsko preduzetnička komora',
  'Zanatsko preduzetnička komora Banja Luka',
  'PKSP Banja Luka',
  'samostalni preduzetnici Banja Luka',
  'preduzetnička komora Republika Srpska',
];

export const BASE_KEYWORDS_EN = [
  'Regional Chamber of Independent Entrepreneurs',
  'Chamber Banja Luka',
  'Trade and Entrepreneurial Chamber Banja Luka',
  'PKSP Banja Luka',
  'independent entrepreneurs Banja Luka',
  'entrepreneurs chamber Republika Srpska',
];

interface BuildMetadataArgs {
  lang: 'sr' | 'en';
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  /** Use when title already contains the brand name, to avoid "%s | PKSP Banja Luka" duplicating it. */
  absoluteTitle?: boolean;
}

export function buildMetadata({
  lang,
  path = '',
  title,
  description,
  keywords,
  image = '/opengraph-image.png',
  type = 'website',
  absoluteTitle = false,
}: BuildMetadataArgs): Metadata {
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : '';
  const url = `${SITE_URL}/${lang}${normalizedPath}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords && keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: url,
      languages: {
        sr: `${SITE_URL}/sr${normalizedPath}`,
        en: `${SITE_URL}/en${normalizedPath}`,
        'x-default': `${SITE_URL}/sr${normalizedPath}`,
      },
    },
    openGraph: {
      title,
      description,
      type,
      url,
      locale: lang === 'sr' ? 'sr_BA' : 'en_US',
      siteName: SITE_NAME,
      images: [{ url: image, width: 800, height: 600, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
