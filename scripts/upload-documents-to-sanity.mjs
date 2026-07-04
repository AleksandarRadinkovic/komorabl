/**
 * Downloaduje PDF-ove sa pkspbl.com i uploaduje ih u Sanity kao file assets.
 * Ažurira svaki dokument: fileUrl → file asset u Sanity.
 */

import { createClient } from '@sanity/client';
import https from 'https';
import http from 'http';
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

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

async function migrate() {
  console.log('🚀 Upload PDF dokumenata u Sanity...\n');

  // Dohvati sve dokumente koji imaju fileUrl (eksterni link)
  const docs = await sanity.fetch(`
    *[_type == "dokument" && defined(fileUrl)] {
      _id,
      title,
      fileUrl
    }
  `);

  console.log(`📋 Pronađeno ${docs.length} dokumenata sa eksternim URL-om\n`);

  let uploaded = 0, skipped = 0, errors = 0;

  for (const doc of docs) {
    const filename = doc.fileUrl.split('/').pop() || `dokument-${doc._id}.pdf`;
    console.log(`📄 ${doc.title}`);
    console.log(`   URL: ${doc.fileUrl}`);

    try {
      const buffer = await downloadBuffer(doc.fileUrl);
      console.log(`   ⬇️  Downloadovan (${Math.round(buffer.length / 1024)} KB)`);

      const asset = await sanity.assets.upload('file', buffer, {
        filename,
        contentType: 'application/pdf',
      });
      console.log(`   ☁️  Uploadovan u Sanity: ${asset._id}`);

      // Ažuriraj dokument: dodaj file asset, ukloni fileUrl
      await sanity
        .patch(doc._id)
        .set({
          file: {
            _type: 'file',
            asset: { _type: 'reference', _ref: asset._id },
          },
        })
        .unset(['fileUrl'])
        .commit();

      console.log(`   ✅ Ažuriran\n`);
      uploaded++;
    } catch (err) {
      console.error(`   ❌ Greška: ${err.message}\n`);
      errors++;
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  console.log('═══════════════════════════════════════');
  console.log(`✅ Uploadovano: ${uploaded}`);
  console.log(`⏭️  Preskočeno:  ${skipped}`);
  console.log(`❌ Greške:      ${errors}`);
  console.log('═══════════════════════════════════════');
  console.log('\n🎉 Gotovo! PDF-ovi su sada u Sanity CDN-u.');
}

migrate().catch((err) => {
  console.error('💥 Fatalna greška:', err.message);
  process.exit(1);
});
