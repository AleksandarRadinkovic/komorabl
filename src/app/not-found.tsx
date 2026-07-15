import Link from 'next/link';

// Root not-found boundary: hvata notFound() iz [lang] layouta (nepoznat jezik/putanja).
// Root layout ne renderuje <html>/<body>, pa ih ova stranica mora sama obezbijediti.
export default function RootNotFound() {
  return (
    <html lang="sr">
      <body className="antialiased">
        <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-6xl font-bold text-neutral-900">404</h1>
          <p className="text-lg text-neutral-600">
            Stranica koju tražite ne postoji ili je premještena.
          </p>
          <Link
            href="/sr"
            className="mt-2 rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            Nazad na početnu
          </Link>
        </main>
      </body>
    </html>
  );
}
