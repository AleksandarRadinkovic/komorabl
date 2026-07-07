import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/dictionary';
import { locales } from '@/i18n/config';
import { SITE_URL } from '@/lib/seo';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

function OrganizationJsonLd({ lang }: { lang: 'sr' | 'en' }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'Područna komora samostalnih preduzetnika Banja Luka',
    alternateName: [
      'PKSP Banja Luka',
      'Zanatsko preduzetnička komora Banja Luka',
      'Zanatska komora Banja Luka',
      'Regional Chamber of Independent Entrepreneurs Banja Luka',
    ],
    url: `${SITE_URL}/${lang}`,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    foundingDate: '1909',
    telephone: '+387-66-518-664',
    email: 'info@pkspbl.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Veselina Masleše 34',
      addressLocality: 'Banja Luka',
      addressRegion: 'Republika Srpska',
      addressCountry: 'BA',
    },
    areaServed: 'Republika Srpska',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
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
        <OrganizationJsonLd lang={lang} />
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
