import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/dictionary';
import { locales } from '@/i18n/config';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: { lang: 'sr' | 'en' } }) {
  const dict = await getDictionary(params.lang);
  
  return {
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
  };
}

export default async function RootLayout({
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

  const dict = await getDictionary(lang); // ← DODAJ OVO

  return (
    <html lang={lang}>
      <body className="antialiased">
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={lang} dict={dict} /> {/* ← PROSLEDI dict */}
      </body>
    </html>
  );
}
