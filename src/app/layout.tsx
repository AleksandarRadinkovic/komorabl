import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, BASE_KEYWORDS_SR } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "PKSP Banja Luka",
    template: "%s | PKSP Banja Luka",
  },
  description: "Područna komora samostalnih preduzetnika (Zanatsko preduzetnička komora) Banja Luka — podrška i zaštita interesa preko 11.500 preduzetnika u Republici Srpskoj.",
  keywords: BASE_KEYWORDS_SR,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "sr_BA",
    siteName: "PKSP Banja Luka",
    images: [
      {
        url: "/opengraph-image.png",
        width: 800,
        height: 600,
        alt: "PKSP Banja Luka — Područna komora samostalnih preduzetnika",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
