// js/components/classLeaderboard.js
// ITIHASAM: Class Mode
//  • On this device: several explorer profiles on a shared computer/tablet.
//  • Online (Supabase): join a class code and see everyone in that class,
//    on any device. Joining is opt-in; only a display name and scores are shared.

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { t, escapeHTML } from '../i18n.js';
import {
  isOnlineConfigured, currentClassCode, joinClass, leaveClass, fetchClass, submitNow, normaliseClassCode
} from '../services/onlineLeaderboard.js';

const MEDALS = ['🥇', '🥈', '🥉'];

export class ClassLeaderboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.onlineRows = null;
    this.onlineError = '';
    this.loading = false;
  }

  init() {
    this.render();
    if (currentClassCode()) this.refreshOnline();
  }

  async refreshOnline() {
    const code = currentClassCode();
    if (!code || !isOnlineConfigured()) return;
    this.loading = true;
    this.onlineError = '';
    this.renderOnline();
    try {
      await submitNow();
      this.onlineRows = await fetchClass(code);
    } catch (e) {
      this.onlineError = e.message || 'Could not reach the online leaderboard.';
    }
    this.loading = false;
    this.renderOnline();
  }

  onlineSection() {
    if (!isOnlineConfigured()) {
      return `
        <h3>🌐 Online Class Board</h3>
        <p>Not connected yet. Add the Supabase publishable key in <code>js/config.js</code> and run the SQL in <code>supabase/migrations/</code> to compare scores across devices.</p>`;
    }
    const code = currentClassCode();
    if (!code) {
      const suggested = (gameState.state.online && gameState.state.online.displayName) || gameState.state.avatar.name || '';
      return `
        <h3>🌐 Online Class Board</h3>
        <p>Join your class with the code your teacher gives you (for example <strong>DPS-7B</strong>). Your scores then appear on that class's board on every device.</p>
        <form class="lb-add" id="online-join-form">
          <label for="online-class" class="sr-only">Class code</label>
          <input id="online-class" class="ancient-input" maxlength="20" placeholder="Class code" autocomplete="off" required />
          <label for="online-name" class="sr-only">Display name</label>
          <input id="online-name" class="ancient-input" maxlength="24" placeholder="Display name" value="${escapeHTML(suggested)}" autocomplete="off" required />
          <button class="btn-ancient btn-gold" type="submit">Join class</button>
        </form>
        <p class="map-note">Shared publicly with anyone who knows the class code: your display name, points, level, passport stamps and streak. Use a first name or nickname only.</p>
        ${this.onlineError ? `<p class="text-terracotta" role="alert">${escapeHTML(this.onlineError)}</p>` : ''}`;
    }

    let body;
    if (this.loading && !this.onlineRows) body = '<p>Loading class ranking…</p>';
    else if (this.onlineError) body = `<p class="text-terracotta" role="alert">⚠ ${escapeHTML(this.onlineError)}</p>`;
    else if (!this.onlineRows || this.onlineRows.length === 0) body = '<p>No scores yet — play a game to put your class on the board!</p>';
    else {
      const me = ((gameState.state.online && gameState.state.online.displayName) || gameState.state.avatar.name || '').trim();
      body = `
        <div class="lb-table" role="table" aria-label="Online class leaderboard">
          <div class="lb-row lb-head" role="row">
            <span role="columnheader">Rank</span><span role="columnheader">Explorer</span><span role="columnheader">CDP</span>
            <span role="columnheader">Level</span><span role="columnheader">Stamps</span><span role="columnheader">Streak</span><span role="columnheader">Updated</span>
          </div>
          ${this.onlineRows.map((r, i) => `
            <div class="lb-row ${r.name === me ? 'active' : ''}" role="row">
              <span role="cell" class="lb-rank">${MEDALS[i] || i + 1}</span>
              <span role="cell" class="lb-name">${escapeHTML(r.name)}</span>
              <span role="cell" class="text-gold font-bold">${Number(r.points) || 0}</span>
              <span role="cell">${Number(r.level) || 1}</span>
              <span role="cell">${Number(r.stamps) || 0} / 28</span>
              <span role="cell">🔥 ${Number(r.streak) || 0}</span>
              <span role="cell" class="lb-updated">${escapeHTML(new Date(r.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }))}</span>
            </div>`).join('')}
        </div>`;
    }
    return `
      <div class="online-head">
        <h3>🌐 Online Class Board · <span class="text-terracotta">${escapeHTML(code)}</span></h3>
        <div class="lb-actions">
          <button class="btn-ancient btn-secondary btn-sm" id="btn-online-refresh" ${this.loading ? 'disabled' : ''}>${this.loading ? 'Syncing…' : '↻ Refresh'}</button>
          <button class="btn-ancient btn-terracotta btn-sm" id="btn-online-leave">Leave class</button>
        </div>
      </div>
      <p class="map-note">Your score syncs automatically a few seconds after it changes.</p>
      ${body}`;
  }

  renderOnline() {
    const el = this.container.querySelector('#online-board');
    if (!el) return;
    el.innerHTML = this.onlineSection();
    this.bindOnline();
  }

  bindOnline() {
    const form = this.container.querySelector('#online-join-form');
    if (form) form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = normaliseClassCode(this.container.querySelector('#online-class').value);
      const name = this.container.querySelector('#online-name').value.trim();
      if (!name) return;
      this.loading = true;
      this.onlineError = '';
      try {
        await joinClass(code, name);
        soundSynth.playBell();
        this.onlineRows = await fetchClass(code);
      } catch (err) {
        if (gameState.state.online) gameState.state.online.classCode = '';
        gameState.saveState();
        this.onlineError = `Could not join: ${err.message}`;
      }
      this.loading = false;
      this.renderOnline();
    });
    const refresh = this.container.querySelector('#btn-online-refresh');
    if (refresh) refresh.addEventListener('click', () => this.refreshOnline());
    const leave = this.container.querySelector('#btn-online-leave');
    if (leave) leave.addEventListener('click', async () => {
      if (!confirm('Leave this class? Your row will be removed from the online board.')) return;
      await leaveClass();
      this.onlineRows = null;
      this.renderOnline();
    });
  }

  render() {
    if (!this.container) return;
    const rows = gameState.getProfiles().sort((a, b) => b.points - a.points || b.stamps - a.stamps);

    this.container.innerHTML = `
      <div class="leaderboard-wrap">
        <div class="explorer-header ancient-panel">
          <div class="explorer-title-area">
            <span class="category-pill">CLASS MODE</span>
            <h2>${t('leaderboardTitle')}</h2>
            <p>Compete with your class online, or share one device with several explorer profiles.</p>
          </div>
        </div>

        <section class="ancient-panel lb-online" id="online-board" aria-live="polite">${this.onlineSection()}</section>

        <section class="ancient-panel lb-local">
          <div class="online-head">
            <h3>💻 On this device</h3>
            <form class="lb-add" id="lb-add-form">
              <label for="lb-name" class="sr-only">New explorer name</label>
              <input id="lb-name" class="ancient-input" maxlength="24" placeholder="Student name" autocomplete="off" required />
              <button class="btn-ancient btn-gold" type="submit">＋ ${t('addExplorer')}</button>
            </form>
          </div>
          <div class="lb-table" role="table" aria-label="Profiles on this device">
            <div class="lb-row lb-head" role="row">
              <span role="columnheader">Rank</span><span role="columnheader">Explorer</span><span role="columnheader">CDP</span>
              <span role="columnheader">Level</span><span role="columnheader">Stamps</span><span role="columnheader">Streak</span><span role="columnheader"><span class="sr-only">Actions</span></span>
            </div>
            ${rows.map((r, i) => `
              <div class="lb-row ${r.isActive ? 'active' : ''}" role="row">
                <span role="cell" class="lb-rank">${MEDALS[i] || i + 1}</span>
                <span role="cell" class="lb-name">${escapeHTML(r.name)}${r.isActive ? ' <em>(playing now)</em>' : ''}</span>
                <span role="cell" class="text-gold font-bold">${r.points}</span>
                <span role="cell">${r.level}</span>
                <span role="cell">${r.stamps} / 28</span>
                <span role="cell">🔥 ${r.streak}</span>
                <span role="cell" class="lb-actions">
                  ${r.isActive ? '' : `<button class="btn-ancient btn-secondary btn-sm" data-switch="${r.id}">${t('switchTo')}</button>`}
                  ${rows.length > 1 ? `<button class="btn-icon lb-del" data-del="${r.id}" aria-label="Remove ${escapeHTML(r.name)}" title="Remove profile">🗑</button>` : ''}
                </span>
              </div>`).join('')}
          </div>
          <p class="map-note">Each profile on this device can join its own online class.</p>
        </section>
      </div>`;

    this.bindOnline();

    const form = this.container.querySelector('#lb-add-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.container.querySelector('#lb-name').value.trim();
      if (!name) return;
      soundSynth.playBell();
      gameState.createProfile(name);
      this.refreshApp();
    });

    this.container.querySelectorAll('[data-switch]').forEach(b => b.addEventListener('click', () => {
      soundSynth.playClick();
      gameState.switchProfile(b.dataset.switch);
      this.refreshApp();
    }));

    this.container.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
      const row = gameState.getProfiles().find(p => p.id === b.dataset.del);
      if (row && confirm(`Remove ${row.name}'s profile and all their progress? This cannot be undone.`)) {
        gameState.deleteProfile(b.dataset.del);
        this.refreshApp();
      }
    }));
  }

  refreshApp() {
    if (window.appRouter) window.appRouter.navigate('leaderboard');
    else this.render();
  }

  destroy() {}
}
