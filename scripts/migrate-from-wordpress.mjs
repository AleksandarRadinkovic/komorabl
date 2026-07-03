/**
 * WordPress → Sanity migracija
 * Vuče: featured image + SVE inline slike iz sadržaja svakog posta
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
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      process.env[key] = val;
    });
  } catch {
    console.log('⚠️  .env.local nije pronađen');
  }
}

loadEnv();

const WP_BASE = 'https://pkspbl.com/wp-json/wp/v2';

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Cache uploadovanih slika (URL → Sanity asset _id)
const uploadedImages = new Map();

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchJson(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse: ${e.message} | URL: ${url}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

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
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] || 'image/jpeg' }));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

async function uploadImage(imageUrl, altText = '') {
  if (uploadedImages.has(imageUrl)) {
    return uploadedImages.get(imageUrl);
  }

  try {
    const { buffer, contentType } = await downloadBuffer(imageUrl);
    const ext = contentType.includes('png') ? 'png'
      : contentType.includes('webp') ? 'webp'
      : contentType.includes('gif') ? 'gif'
      : 'jpg';
    const slug = imageUrl.split('/').pop()?.split('?')[0] || `img-${Date.now()}`;
    const asset = await sanity.assets.upload('image', buffer, {
      filename: slug.includes('.') ? slug : `${slug}.${ext}`,
      contentType,
    });
    uploadedImages.set(imageUrl, asset._id);
    console.log(`    🖼️  Uploadovana: ${slug}`);
    return asset._id;
  } catch (err) {
    console.warn(`    ⚠️  Slika preskočena (${imageUrl.split('/').pop()}): ${err.message}`);
    return null;
  }
}

// Izvuci sve img src-ove iz HTML-a
function extractImageUrls(html) {
  const urls = [];
  const regex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const url = match[1];
    if (url.startsWith('http')) urls.push(url);
  }
  return [...new Set(urls)];
}

// HTML → Portable Text (sa inline slikama)
async function htmlToPortableText(html) {
  if (!html) return [];

  const blocks = [];
  // Podijeli na sekcije: paragrafi i slike
  const parts = html
    .replace(/\r\n/g, '\n')
    .replace(/<!-- .*?-->/gs, '')
    .split(/(<img[^>]+>|<figure[^>]*>[\s\S]*?<\/figure>)/gi);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Provjeri je li img/figure
    const imgMatch = trimmed.match(/<img[^>]+src=["']([^"']+)["'](?:[^>]+alt=["']([^"']*)["'])?/i)
      || trimmed.match(/<img[^>]+alt=["']([^"']*)["'](?:[^>]+src=["']([^"']+)["'])?/i);

    const srcFromFigure = trimmed.match(/src=["']([^"']+)["']/i);

    if (srcFromFigure && /<img|<figure/i.test(trimmed)) {
      const src = srcFromFigure[1];
      const altMatch = trimmed.match(/alt=["']([^"']*)["']/i);
      const alt = altMatch ? altMatch[1] : '';

      if (src.startsWith('http')) {
        const assetId = await uploadImage(src, alt);
        if (assetId) {
          blocks.push({
            _type: 'image',
            _key: Math.random().toString(36).slice(2, 10),
            asset: { _type: 'reference', _ref: assetId },
            alt,
          });
        }
      }
      continue;
    }

    // Tekstualni blok
    const text = trimmed
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#8211;/g, '–')
      .replace(/&#8212;/g, '—')
      .replace(/&#8216;/g, "'")
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();

    if (text.length > 0) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2, 10),
        style: 'normal',
        markDefs: [],
        children: [{
          _type: 'span',
          _key: Math.random().toString(36).slice(2, 10),
          text,
          marks: [],
        }],
      });
    }
  }

  return blocks;
}

async function migrate() {
  console.log('🚀 Pokretanje WordPress → Sanity migracije\n');
  console.log(`📡 Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`📦 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}\n`);

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN nije postavljen!'); process.exit(1);
  }
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID nije postavljen!'); process.exit(1);
  }

  // 1. Dohvati sve postove
  console.log('📥 Dohvatam postove sa WordPress-a...');
  let posts = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await fetchJson(
      `${WP_BASE}/posts?per_page=100&page=${page}&_fields=id,title,slug,date,excerpt,content,featured_media,categories`
    ).catch(() => []);
    if (!Array.isArray(batch) || batch.length === 0) break;
    posts = posts.concat(batch);
    if (batch.length < 100) break;
  }
  console.log(`✅ Pronađeno ${posts.length} postova\n`);

  // 2. Provjeri koji već postoje
  const existingWpIds = await sanity.fetch(`*[_type == "post" && defined(wpId)].wpId`).catch(() => []);
  const existingSet = new Set(existingWpIds);
  const toMigrate = posts.filter(p => !existingSet.has(p.id));
  console.log(`ℹ️  ${existingSet.size} već postoje, migrujem ${toMigrate.length} novih\n`);

  let created = 0, skipped = 0, errors = 0;

  for (let i = 0; i < posts.length; i++) {
    const wp = posts[i];
    const num = `[${i + 1}/${posts.length}]`;

    if (existingSet.has(wp.id)) {
      console.log(`${num} ⏭️  Preskačem: ${wp.title.rendered}`);
      skipped++; continue;
    }

    console.log(`\n${num} 📝 ${wp.title.rendered}`);

    try {
      // Featured image
      let mainImage = undefined;
      if (wp.featured_media && wp.featured_media > 0) {
        console.log(`  📷 Dohvatam featured image (media ID: ${wp.featured_media})...`);
        const media = await fetchJson(`${WP_BASE}/media/${wp.featured_media}?_fields=source_url,slug`).catch(() => null);
        if (media?.source_url) {
          const assetId = await uploadImage(media.source_url, wp.title.rendered);
          if (assetId) {
            mainImage = {
              _type: 'image',
              asset: { _type: 'reference', _ref: assetId },
              alt: wp.title.rendered,
            };
          }
        }
      }

      // Sadržaj + sve inline slike
      const htmlContent = wp.content?.rendered || '';
      const inlineImageUrls = extractImageUrls(htmlContent);
      if (inlineImageUrls.length > 0) {
        console.log(`  🖼️  Pronađeno ${inlineImageUrls.length} inline slika u sadržaju`);
      }

      const body = await htmlToPortableText(htmlContent);

      // Čisti naslov
      const cleanTitle = (wp.title?.rendered || '')
        .replace(/&amp;/g, '&').replace(/&#8211;/g, '–').replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8230;/g, '…');

      // Čisti excerpt
      const cleanExcerpt = (wp.excerpt?.rendered || '')
        .replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
        .replace(/&#8211;/g, '–').replace(/&#8230;/g, '…').trim();

      const doc = {
        _type: 'post',
        wpId: wp.id,
        title: cleanTitle,
        slug: { _type: 'slug', current: wp.slug },
        publishedAt: wp.date,
        excerpt: cleanExcerpt,
        body,
        category: 'vijesti',
        ...(mainImage && { mainImage }),
      };

      await sanity.create(doc);
      console.log(`  ✅ Kreiran uspješno`);
      created++;

    } catch (err) {
      console.error(`  ❌ Greška: ${err.message}`);
      errors++;
    }

    // Pauza između postova
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log('\n═══════════════════════════════════════');
  console.log('📊 Rezultati migracije:');
  console.log(`  ✅ Kreirano:   ${created} postova`);
  console.log(`  ⏭️  Preskočeno: ${skipped} postova`);
  console.log(`  ❌ Greške:     ${errors} postova`);
  console.log(`  🖼️  Slike:      ${uploadedImages.size} uploadovano`);
  console.log('═══════════════════════════════════════');
  console.log('\n🎉 Migracija završena!');
  console.log('📍 Provjeri na: https://www.sanity.io/manage\n');
}

migrate().catch((err) => {
  console.error('💥 Fatalna greška:', err.message);
  process.exit(1);
});
