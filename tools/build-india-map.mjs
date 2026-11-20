// tools/build-india-map.mjs
// Converts India's state boundaries (TopoJSON) into compact SVG paths for
// js/data/indiaMapPaths.js. No dependencies.
//
// Source data: DataMeet India boundaries (CC BY 4.0), via
// https://github.com/udit-001/india-maps-data (topojson/india.json).
// Usage: node tools/build-india-map.mjs <path-to-india.json>

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const input = process.argv[2];
if (!input) { console.error('Usage: node tools/build-india-map.mjs <india.json>'); process.exit(1); }
const topo = JSON.parse(readFileSync(input, 'utf8'));

// ---- 1. Decode quantized, delta-encoded arcs into lon/lat ----
const { scale: [sx, sy], translate: [tx, ty] } = topo.transform;
const arcs = topo.arcs.map(arc => {
  let x = 0, y = 0;
  return arc.map(([dx, dy]) => { x += dx; y += dy; return [x * sx + tx, y * sy + ty]; });
});

// ---- 2. Projection: Mercator, fitted into a 1000-wide viewBox ----
const merc = ([lon, lat]) => [lon * Math.PI / 180, Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))];
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
arcs.forEach(a => a.forEach(p => {
  const [x, y] = merc(p);
  minX = Math.min(minX, x); maxX = Math.max(maxX, x);
  minY = Math.min(minY, y); maxY = Math.max(maxY, y);
}));
const W = 1000, PAD = 10;
const k = (W - 2 * PAD) / (maxX - minX);
const H = Math.round((maxY - minY) * k + 2 * PAD);
const project = p => { const [x, y] = merc(p); return [PAD + (x - minX) * k, PAD + (maxY - y) * k]; };
const projArcs = arcs.map(a => a.map(project));

// ---- 3. Light simplification (Douglas–Peucker, tolerance in px) ----
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let maxD = 0, idx = -1;
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, segLen = Math.hypot(dx, dy);
    for (let i = a + 1; i < b; i++) {
      // A closed ring (an island drawn as one loop) starts and ends on the same
      // point: measure distance to that point instead of to a zero-length line.
      const d = segLen === 0
        ? Math.hypot(pts[i][0] - ax, pts[i][1] - ay)
        : Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / segLen;
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (maxD > tol && idx > 0) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const TOL = 0.35;
// Tiny islands (a few pixels across) are kept as-is so they do not vanish
const simpArcs = projArcs.map(a => {
  const xs = a.map(p => p[0]), ys = a.map(p => p[1]);
  const size = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  return size < 6 ? a : simplify(a, TOL);
});

// ---- 4. Build rings / paths ----
const arcPoints = i => (i >= 0 ? simpArcs[i] : simpArcs[~i].slice().reverse());
function ringPoints(ring) {
  const out = [];
  ring.forEach((ai, j) => { const pts = arcPoints(ai); out.push(...(j === 0 ? pts : pts.slice(1))); });
  return out;
}
const r1 = n => Math.round(n * 10) / 10;
function ringToPath(pts) {
  let d = '', prev = null;
  pts.forEach((p, i) => {
    const q = [r1(p[0]), r1(p[1])];
    if (prev && q[0] === prev[0] && q[1] === prev[1]) return;
    d += (i === 0 ? 'M' : 'L') + q[0] + ',' + q[1];
    prev = q;
  });
  return d + 'Z';
}
function ringArea(pts) {
  let a = 0;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) a += (pts[j][0] + pts[i][0]) * (pts[j][1] - pts[i][1]);
  return a / 2;
}
function ringCentroid(pts) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const f = pts[j][0] * pts[i][1] - pts[i][0] * pts[j][1];
    a += f; cx += (pts[j][0] + pts[i][0]) * f; cy += (pts[j][1] + pts[i][1]) * f;
  }
  return a ? [cx / (3 * a), cy / (3 * a)] : pts[0];
}

const slug = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const regions = {};
const arcOwners = new Map(); // arc index -> set of region ids

topo.objects.states.geometries.forEach(g => {
  const name = g.properties.st_nm;
  const id = slug(name);
  const polys = g.type === 'Polygon' ? [g.arcs] : g.arcs;
  let d = '', best = null, bestArea = 0;
  const allPts = [];
  polys.forEach(poly => poly.forEach((ring, ri) => {
    const pts = ringPoints(ring);
    if (pts.length < 3) return;
    allPts.push(...pts);
    d += ringToPath(pts);
    ring.forEach(ai => {
      const key = ai >= 0 ? ai : ~ai;
      if (!arcOwners.has(key)) arcOwners.set(key, new Set());
      arcOwners.get(key).add(id);
    });
    if (ri === 0 && pts.length >= 3) {
      const area = Math.abs(ringArea(pts));
      if (area > bestArea) { bestArea = area; best = pts; }
    }
  }));
  // Centre of the largest outer ring; for scattered tiny islands, the average point
  const [cx, cy] = best && bestArea > 2 ? ringCentroid(best)
    : allPts.length ? [allPts.reduce((t, p) => t + p[0], 0) / allPts.length, allPts.reduce((t, p) => t + p[1], 0) / allPts.length]
    : [0, 0];
  regions[id] = { name, d, cx: r1(cx), cy: r1(cy) };
});

// Borders: every arc once (internal borders + coastline / national border)
let borders = '';
let coast = '';
for (const [ai, owners] of arcOwners) {
  const pts = simpArcs[ai];
  if (pts.length < 2) continue;
  let seg = '';
  pts.forEach((p, i) => { seg += (i === 0 ? 'M' : 'L') + r1(p[0]) + ',' + r1(p[1]); });
  if (owners.size > 1) borders += seg; else coast += seg;
}

// ---- 5. Colour states so that neighbours never share a colour ----
const PALETTE = ['#E07A5F', '#81B29A', '#F2B84B', '#6A8EAE', '#B388EB', '#2A9D8F', '#EF8A9F', '#7EC8E3'];
const neighbours = {};
Object.keys(regions).forEach(id => { neighbours[id] = new Set(); });
for (const owners of arcOwners.values()) {
  const list = [...owners];
  list.forEach(a => list.forEach(b => { if (a !== b) neighbours[a].add(b); }));
}
const order = Object.keys(regions).sort((a, b) => neighbours[b].size - neighbours[a].size);
order.forEach((id, i) => {
  const used = new Set([...neighbours[id]].map(n => regions[n].color).filter(Boolean));
  const free = PALETTE.filter(c => !used.has(c));
  regions[id].color = free[i % free.length] || PALETTE[i % PALETTE.length];
});

const out = `// js/data/indiaMapPaths.js — GENERATED by tools/build-india-map.mjs. Do not edit by hand.
// State & Union Territory boundaries of India, Mercator projection.
// Data: DataMeet India boundaries (https://github.com/datameet/maps), CC BY 4.0,
// via https://github.com/udit-001/india-maps-data.

export const MAP_VIEWBOX = '0 0 ${W} ${H}';
export const MAP_REGIONS = ${JSON.stringify(regions)};
export const MAP_INNER_BORDERS = ${JSON.stringify(borders)};
export const MAP_OUTER_BORDER = ${JSON.stringify(coast)};
`;
const dest = resolve(ROOT, 'js/data/indiaMapPaths.js');
writeFileSync(dest, out);
console.log(`Wrote ${dest}: ${Object.keys(regions).length} regions, ${(out.length / 1024).toFixed(0)} KB, viewBox 0 0 ${W} ${H}`);
