import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import path from 'path';

function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const content = readFileSync(envPath, 'utf-8');
    content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) return;
      process.env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
    });
  } catch {
    console.log('⚠️  .env.local nije pronađen');
  }
}

loadEnv();

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const documents = [
  // Zapisnici
  {
    _type: 'dokument',
    title: 'Zapisnik sa izborne skupštine — 4. maj 2026.',
    category: 'zapisnik',
    publishedAt: '2026-05-04',
    fileUrl: 'https://pkspbl.com/wp-content/uploads/2026/05/Zapisnik-izborna-sjednica.pdf',
  },
  {
    _type: 'dokument',
    title: 'Zapisnik sa radne skupštine — 4. maj 2026.',
    category: 'zapisnik',
    publishedAt: '2026-05-04',
    fileUrl: 'https://pkspbl.com/wp-content/uploads/2026/05/Zapisnik-radna-sjednica.pdf',
  },
  // Planovi rada
  {
    _type: 'dokument',
    title: 'Plan rada za 2026. godinu',
    category: 'plan-rada',
    publishedAt: '2026-01-01',
    fileUrl: 'https://pkspbl.com/wp-content/uploads/2026/05/Plan-rada-za-2026.pdf',
  },
  {
    _type: 'dokument',
    title: 'Plan rada za 2025. godinu',
    category: 'plan-rada',
    publishedAt: '2025-01-01',
    fileUrl: 'https://pkspbl.com/wp-content/uploads/2026/05/plan-rada-2025.pdf',
  },
  {
    _type: 'dokument',
    title: 'Plan rada za 2024. godinu',
    category: 'plan-rada',
    publishedAt: '2024-01-01',
    fileUrl: 'https://pkspbl.com/wp-content/uploads/2026/05/plan-rada-2024.pdf',
  },
  // Izvještaji o radu
  {
    _type: 'dokument',
    title: 'Izvještaj o radu Komore za 2025. godinu',
    category: 'izvjestaj',
    publishedAt: '2026-02-01',
    fileUrl: 'https://pkspbl.com/wp-content/uploads/2026/02/izvjestaj-o-radu-2025.pdf',
  },
  {
    _type: 'dokument',
    title: 'Izvještaj o radu Komore za 2024. godinu',
    category: 'izvjestaj',
    publishedAt: '2025-07-01',
    fileUrl: 'https://pkspbl.com/wp-content/uploads/2025/07/Izvjestaj-o-radu-za-2024.pdf',
  },
  {
    _type: 'dokument',
    title: 'Izvještaj o radu Komore za 2023. godinu',
    category: 'izvjestaj',
    publishedAt: '2024-01-01',
    fileUrl: 'https://pkspbl.com/wp-content/uploads/2025/07/Izvjestaj-o-radu-za-2023.pdf',
  },
  {
    _type: 'dokument',
    title: 'Izvještaj o radu Komore za 2022. godinu',
    category: 'izvjestaj',
    publishedAt: '2023-01-01',
    fileUrl: 'https://pkspbl.com/wp-content/uploads/2025/07/Izvjestaj-o-radu-komore-2022.pdf',
  },
];

async function migrate() {
  console.log('🚀 Dodajem dokumente u Sanity...\n');

  const existing = await sanity.fetch(`*[_type == "dokument"].fileUrl`).catch(() => []);
  const existingSet = new Set(existing);

  let created = 0, skipped = 0;

  for (const doc of documents) {
    if (existingSet.has(doc.fileUrl)) {
      console.log(`⏭️  Preskačem: ${doc.title}`);
      skipped++;
      continue;
    }
    await sanity.create(doc);
    console.log(`✅ Kreiran: ${doc.title}`);
    created++;
  }

  console.log(`\n✅ Kreirano: ${created} | ⏭️ Preskočeno: ${skipped}`);
  console.log('🎉 Gotovo!');
}

migrate().catch((err) => {
  console.error('💥 Greška:', err.message);
  process.exit(1);
});
