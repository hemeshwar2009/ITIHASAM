// js/services/onlineLeaderboard.js
// ITIHASAM: online class leaderboard backed by Supabase.
// Talks to two Postgres functions over the REST API (no SDK needed):
//   submit_score(...)        — saves this explorer's score (opt-in only)
//   class_leaderboard(code)  — reads one class's ranking
// See supabase/migrations/*_online_leaderboard.sql.

import { SUPABASE_URL, SUPABASE_KEY } from '../config.js';
import { gameState } from '../state/gameState.js';

const SYNC_DELAY_MS = 2500;

export function isOnlineConfigured() {
  return !!(SUPABASE_URL && SUPABASE_KEY && !/service_role|sb_secret_/i.test(SUPABASE_KEY));
}

export function normaliseClassCode(code) {
  return String(code || '').trim().toUpperCase().replace(/[\s_]+/g, '-').replace(/[^A-Z0-9-]/g, '').slice(0, 20);
}

function headers() {
  const h = { 'Content-Type': 'application/json', apikey: SUPABASE_KEY };
  // Legacy anon keys are JWTs and also go in Authorization; publishable keys do not.
  if (SUPABASE_KEY.startsWith('eyJ')) h.Authorization = `Bearer ${SUPABASE_KEY}`;
  return h;
}

async function rpc(fn, body) {
  if (!isOnlineConfigured()) throw new Error('Online leaderboard is not configured.');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    let msg = `${res.status}`;
    try {
      const j = await res.json();
      msg = j.message || j.hint || msg;
      // Function/table missing: the SQL in supabase/migrations has not been run yet
      if (j.code === 'PGRST202' || j.code === 'PGRST205' || j.code === '42883') {
        msg = 'The online class board is not set up on the server yet. Ask your teacher to run the Itihasam database setup.';
      } else if (/not allowed/i.test(msg)) {
        msg = 'This explorer is already linked to another device.';
      }
    } catch (e) { /* ignore */ }
    throw new Error(msg);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function randomSecret() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/** Ensures this profile has an online identity (id + secret kept on this device only). */
function identity() {
  const s = gameState.state;
  if (!s.online || !s.online.id || !s.online.secret) {
    s.online = { ...(s.online || {}), id: uuid(), secret: randomSecret() };
    gameState.saveState();
  }
  return s.online;
}

export function currentClassCode() {
  return (gameState.state.online && gameState.state.online.classCode) || '';
}

export async function joinClass(code, displayName) {
  const classCode = normaliseClassCode(code);
  if (classCode.length < 3) throw new Error('Class code must be at least 3 letters or numbers.');
  const id = identity();
  gameState.state.online = { ...id, classCode, displayName: String(displayName || '').trim().slice(0, 24) };
  gameState.saveState();
  await submitNow();
  return classCode;
}

export async function leaveClass() {
  const o = gameState.state.online;
  if (o && o.id && o.secret && isOnlineConfigured()) {
    try { await rpc('remove_score', { p_id: o.id, p_secret: o.secret }); } catch (e) { console.warn(e); }
  }
  gameState.state.online = { ...(o || {}), classCode: '' };
  gameState.saveState();
}

export async function submitNow() {
  const s = gameState.state;
  const o = s.online;
  if (!isOnlineConfigured() || !o || !o.classCode) return false;
  await rpc('submit_score', {
    p_id: o.id,
    p_secret: o.secret,
    p_class: o.classCode,
    p_name: (o.displayName || s.avatar.name || 'Explorer').slice(0, 24),
    p_points: Math.min(100000, s.points),
    p_level: Math.min(5, Math.max(1, s.currentLevel)),
    p_stamps: gameState.countStamps(),
    p_streak: (s.daily && s.daily.streak) || 0
  });
  o.lastSync = Date.now();
  return true;
}

export async function fetchClass(code) {
  return rpc('class_leaderboard', { p_class: normaliseClassCode(code) });
}

// Background sync: whenever progress changes, push the new score (debounced).
let timer = null;
let lastSent = '';
export function startAutoSync() {
  if (!isOnlineConfigured()) return;
  gameState.subscribe(s => {
    const o = s.online;
    if (!o || !o.classCode) return;
    const sig = [o.classCode, o.displayName, s.avatar.name, s.points, s.currentLevel, gameState.countStamps(), s.daily && s.daily.streak].join('|');
    if (sig === lastSent) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      lastSent = sig;
      submitNow().catch(err => { lastSent = ''; console.warn('Leaderboard sync failed:', err.message); });
    }, SYNC_DELAY_MS);
  });
}
