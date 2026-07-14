import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_HOST = 'www.pkspbl.com';

const locales = ['sr', 'en'];
const defaultLocale = 'sr';

const LINK_PREVIEW_BOTS =
  /facebookexternalhit|Facebot|Twitterbot|WhatsApp|TelegramBot|LinkedInBot|Slackbot|Discordbot|SkypeUriPreview|vkShare|Pinterest|redditbot|Viber/i;

const isLocalHost = (host: string) =>
  host.startsWith('localhost') || host.startsWith('127.0.0.1');

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase();
  const { pathname, search } = request.nextUrl;

  // Stalni .vercel.app alias produkcije servira identičan sadržaj kao www —
  // trajni redirect da Google spoji signale na kanonski domen.
  // Preview deploymenti (komorabl-git-*.vercel.app itd.) se ne diraju.
  if (host === 'komorabl.vercel.app') {
    return NextResponse.redirect(
      `https://${CANONICAL_HOST}${pathname}${search}`,
      308
    );
  }

  // Svaki host koji nije kanonski (preview deploymenti i sl.) ne smije u indeks.
  const noindex = host !== CANONICAL_HOST && !isLocalHost(host);
  const withHostHeaders = (response: NextResponse) => {
    if (noindex) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return response;
  };

  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;

    // Botovi za link preview ne prate redirect, pa im serviramo sadržaj direktno.
    const userAgent = request.headers.get('user-agent') || '';
    if (LINK_PREVIEW_BOTS.test(userAgent)) {
      return withHostHeaders(NextResponse.rewrite(url));
    }

    return withHostHeaders(NextResponse.redirect(url, 308));
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return withHostHeaders(NextResponse.redirect(url, 308));
  }

  return withHostHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    '/((?!api|studio|_next/static|_next/image|images|fonts|favicon.ico|icon.png|apple-icon.png|opengraph-image.png|logo.jpg|logo.png|robots.txt|sitemap.xml).*)',
  ],
};
