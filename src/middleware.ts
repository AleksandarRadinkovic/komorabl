import { NextRequest, NextResponse } from 'next/server';

const LINK_PREVIEW_BOTS =
  /facebookexternalhit|Facebot|Twitterbot|WhatsApp|TelegramBot|LinkedInBot|Slackbot|Discordbot|SkypeUriPreview|vkShare|Pinterest|redditbot|Viber/i;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  const userAgent = request.headers.get('user-agent') || '';
  const url = request.nextUrl.clone();
  url.pathname = '/sr';

  if (LINK_PREVIEW_BOTS.test(userAgent)) {
    return NextResponse.rewrite(url);
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/',
};
