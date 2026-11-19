// tools/download-images.mjs
// Optional, one-time step: downloads every Unsplash photo the site uses into
// assets/img/photos/ and rewrites the code to use the local copies, so the
// site no longer depends on images.unsplash.com (useful for demos on bad Wi-Fi).
//
// Usage (from the itihasam folder):   node tools/download-images.mjs
// Requires Node 18+ (built-in fetch). Re-running is safe.
//
// Note: Unsplash photos are free to use under the Unsplash License, but
// credit to the photographers is appreciated — keep the photo IDs (file names).

import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT_DIR = join(ROOT, 'assets', 'img', 'photos');
const FILES = [
  'js/data/statesData.js',
  'js/components/landingStoryboard.js',
  'js/components/stateExplorer.js',
  'js/components/livingTraditions.js'
];
const URL_RE = /https:\/\/images\.unsplash\.com\/photo-[A-Za-z0-9-]+(\?[^"'\s)]*)?/g;

await mkdir(OUT_DIR, { recursive: true });

const sources = {};
for (const f of FILES) sources[f] = await readFile(join(ROOT, f), 'utf8');

const urls = new Set();
Object.values(sources).forEach(src => (src.match(URL_RE) || []).forEach(u => urls.add(u)));
console.log(`Found ${urls.size} image URLs.`);

const mapping = {};
for (const u of urls) {
  const id = u.match(/photo-([A-Za-z0-9-]+)/)[1];
  const width = (u.match(/[?&]w=(\d+)/) || [])[1] || '1200';
  const file = `${id}-w${width}.jpg`;
  const dest = join(OUT_DIR, file);
  const exists = await stat(dest).then(() => true).catch(() => false);
  if (!exists) {
    try {
      const res = await fetch(u);
      if (!res.ok) { console.warn(`  ✗ ${res.status} ${u} (kept remote; the placeholder covers it)`); continue; }
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      console.log(`  ✓ ${file}`);
    } catch (e) {
      console.warn(`  ✗ ${u}: ${e.message}`);
      continue;
    }
  }
  mapping[u] = `assets/img/photos/${file}`;
}

for (const f of FILES) {
  let src = sources[f];
  for (const [remote, local] of Object.entries(mapping)) src = src.split(remote).join(local);
  if (src !== sources[f]) {
    await writeFile(join(ROOT, f), src);
    console.log(`Rewrote ${f}`);
  }
}
console.log('Done. Remember to bump VERSION in sw.js so the offline cache refreshes.');
