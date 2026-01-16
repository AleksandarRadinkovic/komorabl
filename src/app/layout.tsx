import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PKSP Banja Luka",
  description: "Područna Komora Samostalnih Preduzetnika Banja Luka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
