// tools/fetch-commons-photos.mjs
// Finds and downloads openly licensed photos from Wikimedia Commons for every
// region (28 states + 8 UTs): 5 category cards + the culture slideshow.
//
//   node tools/fetch-commons-photos.mjs              fetch everything missing
//   node tools/fetch-commons-photos.mjs kerala:games  re-fetch specific slots
//   node tools/fetch-commons-photos.mjs --rebuild     only rewrite photoMap.js
//
// Output: assets/img/regions/<region>/<slot>.jpg, tools/photo-manifest.json
// (source, author, licence for each photo) and js/data/photoMap.js.
// Only CC0 / public-domain / CC BY / CC BY-SA photos are used, never NC or ND.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { QUERIES } from './photo-queries.mjs';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const MANIFEST = join(ROOT, 'tools', 'photo-manifest.json');
const OVERRIDES = join(ROOT, 'tools', 'photo-overrides.json');
const UA = 'ItihasamEducationalSite/1.0 (open-source school heritage project)';
const API = 'https://commons.wikimedia.org/w/api.php';
const CATS = ['history', 'games', 'architecture', 'festivals', 'culture'];
const BAD_TITLE = /\b(map|logo|flag|emblem|seal|stamp|coat of arms|poster|cartoon|anime|diagram|chart|svg|icon|banner|signboard|ticket)\b/i;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const { INDIAN_STATES } = await import(pathToFileURL(join(ROOT, 'js/data/statesData.js')).href);
const manifest = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf8')) : {};
const overrides = existsSync(OVERRIDES) ? JSON.parse(await readFile(OVERRIDES, 'utf8')) : {};

const args = process.argv.slice(2);
const rebuildOnly = args.includes('--rebuild');
const only = new Set(args.filter(a => a.includes(':')));

function stripHtml(s) {
  return String(s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function licenceOk(short) {
  const s = String(short || '').toLowerCase();
  if (/(^|[-\s])(nc|nd)([-\s]|$)/.test(s)) return false;
  return /^(cc[- ]by(-sa)?([- ][\d.]+)?|cc0|public domain|pd)/.test(s);
}

async function api(params) {
  const url = API + '?' + new URLSearchParams({ format: 'json', origin: '*', ...params });
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (res.ok) return res.json();
      // Respect rate limits: wait as long as the server asks, or back off
      const retry = Number(res.headers.get('retry-after')) || 0;
      await sleep(Math.max(retry * 1000, 4000 * (attempt + 1)));
    } catch (e) {
      await sleep(4000 * (attempt + 1));
    }
  }
  console.warn('  ! Commons API unavailable for query:', params.gsrsearch || params.titles);
  return {};
}

function toCandidate(page) {
  const ii = page.imageinfo && page.imageinfo[0];
  if (!ii) return null;
  const meta = ii.extmetadata || {};
  return {
    file: page.title,
    index: page.index ?? 0,
    mime: ii.mime,
    width: ii.width,
    height: ii.height,
    thumb: ii.thumburl,
    page: ii.descriptionurl,
    artist: stripHtml(meta.Artist && meta.Artist.value) || 'Unknown author',
    license: stripHtml(meta.LicenseShortName && meta.LicenseShortName.value),
    licenseUrl: (meta.LicenseUrl && meta.LicenseUrl.value) || ''
  };
}

async function search(query, width) {
  const data = await api({
    action: 'query', generator: 'search', gsrsearch: query + ' filetype:bitmap', gsrnamespace: '6',
    gsrlimit: '20', prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: String(width)
  });
  const pages = Object.values((data.query && data.query.pages) || {});
  return pages.map(toCandidate).filter(Boolean).sort((a, b) => a.index - b.index);
}

async function byTitle(title, width) {
  const data = await api({ action: 'query', titles: title, prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: String(width) });
  const pages = Object.values((data.query && data.query.pages) || {});
  return pages.map(toCandidate).filter(Boolean);
}

function acceptable(c, used, preferLandscape) {
  if (!c || c.mime !== 'image/jpeg' || !c.thumb) return false;
  if (c.width < 700 || c.height < 450) return false;
  if (BAD_TITLE.test(c.file)) return false;
  if (!licenceOk(c.license)) return false;
  if (used.has(c.file)) return false;
  if (preferLandscape && c.width / c.height < 1.05) return false;
  return true;
}

async function pick(queries, used, width) {
  for (const preferLandscape of [true, false]) {
    for (const q of queries) {
      const results = await search(q, width);
      await sleep(700);
      const hit = results.find(c => acceptable(c, used, preferLandscape));
      if (hit) return { ...hit, query: q };
    }
  }
  return null;
}

async function download(url, dest) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (res.ok) {
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      return;
    }
    await sleep(2000 * (attempt + 1));
  }
  throw new Error('download failed ' + url);
}

function slotsFor(region) {
  const q = QUERIES[region.id] || {};
  const slots = CATS.map(cat => ({ slot: cat, queries: q[cat] || [region.name + ' ' + cat], width: 800 }));
  (region.culture.slideshowSlides || []).forEach((sl, i) => {
    const t = sl.title.replace(/[^\p{L}\p{N}\s'-]/gu, ' ').trim();
    slots.push({ slot: 'slide' + (i + 1), queries: [t + ' ' + region.name, t, ...(q.culture || [])], width: 1100 });
  });
  return slots;
}

async function fetchAll() {
  let fetched = 0, missing = [];
  for (const region of INDIAN_STATES) {
    manifest[region.id] = manifest[region.id] || {};
    const used = new Set(Object.values(manifest[region.id]).map(e => e && e.file).filter(Boolean));
    await mkdir(join(ROOT, 'assets/img/regions', region.id), { recursive: true });

    for (const s of slotsFor(region)) {
      const key = region.id + ':' + s.slot;
      if (only.size && !only.has(key)) continue;
      const existing = manifest[region.id][s.slot];
      if (!only.size && existing && existsSync(join(ROOT, existing.path))) continue;
      if (existing) used.delete(existing.file);

      let hit = null;
      if (overrides[key]) {
        const [c] = await byTitle(overrides[key], s.width);
        if (c && licenceOk(c.license)) hit = { ...c, query: 'override' };
        else console.warn('  override not usable:', key, overrides[key], c && c.license);
      }
      if (!hit) hit = await pick(s.queries, used, s.width);
      if (!hit) { missing.push(key); console.warn('  ✗ no photo for', key); continue; }

      const rel = `assets/img/regions/${region.id}/${s.slot}.jpg`;
      try {
        await download(hit.thumb, join(ROOT, rel));
      } catch (e) {
        missing.push(key); console.warn('  ✗ download failed', key); continue;
      }
      await sleep(700);
      used.add(hit.file);
      manifest[region.id][s.slot] = {
        file: hit.file, page: hit.page, artist: hit.artist, license: hit.license,
        licenseUrl: hit.licenseUrl, query: hit.query, path: rel
      };
      fetched++;
      console.log('  ✓', key, '←', hit.file, `(${hit.license})`);
      await writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
    }
  }
  console.log(`Fetched ${fetched} photo(s). Missing: ${missing.length ? missing.join(', ') : 'none'}`);
}

async function writePhotoMap() {
  const photos = {};
  const credits = [];
  for (const [id, slots] of Object.entries(manifest)) {
    photos[id] = {};
    for (const [slot, e] of Object.entries(slots)) {
      if (!e || !e.path) continue;
      photos[id][slot] = e.path;
      credits.push({ region: id, slot, file: e.file.replace(/^File:/, ''), page: e.page, artist: e.artist, license: e.license, licenseUrl: e.licenseUrl });
    }
  }
  const out = `// js/data/photoMap.js — GENERATED by tools/fetch-commons-photos.mjs. Do not edit by hand.
// Photos from Wikimedia Commons under open licences (see PHOTO_CREDITS).

export const PHOTOS = ${JSON.stringify(photos, null, 1)};

export const PHOTO_CREDITS = ${JSON.stringify(credits, null, 1)};
`;
  await writeFile(join(ROOT, 'js/data/photoMap.js'), out);
  console.log(`Wrote js/data/photoMap.js (${credits.length} photos)`);
}

if (!rebuildOnly) await fetchAll();
await writePhotoMap();
