import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PKSP Banja Luka",
    template: "%s | PKSP Banja Luka",
  },
  description: "Područna komora samostalnih preduzetnika Banja Luka — podrška i zaštita interesa 11.500 preduzetnika u Republici Srpskoj.",
  metadataBase: new URL("https://komorabl.vercel.app"),
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/icon.png",
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
