import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/dictionary';
import { locales } from '@/i18n/config';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'sr' | 'en' };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);

  return {
    title: {
      default: dict.metadata.home.title,
      template: `%s | PKSP Banja Luka`,
    },
    description: dict.metadata.home.description,
    icons: {
      icon: '/icon.png',
      apple: '/apple-icon.png',
      shortcut: '/icon.png',
    },
    openGraph: {
      title: dict.metadata.home.title,
      description: dict.metadata.home.description,
      type: 'website',
      locale: params.lang === 'sr' ? 'sr_BA' : 'en_US',
      siteName: 'PKSP Banja Luka',
      images: [
        {
          url: '/opengraph-image.png',
          width: 800,
          height: 600,
          alt: 'PKSP Banja Luka — Područna komora samostalnih preduzetnika',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.home.title,
      description: dict.metadata.home.description,
      images: ['/opengraph-image.png'],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: 'sr' | 'en' };
}) {
  const { lang } = params;

  if (!locales.includes(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="antialiased">
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
