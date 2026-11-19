// js/games/folkSportsGame.js
// ITIHASAM: Folk sports timing challenge (archery, kabaddi, gilli-danda,
// stilt racing, Manipuri polo, mallakhamb...). A marker sweeps across a
// power bar; stop it inside the glowing zone. 3 hits out of 5 wins.

import { BaseMiniGame } from './gameEngine.js';
import { soundSynth } from '../audio/soundSynth.js';
import { SPORT_THEMES } from '../data/gameRouting.js';
import { getStateById } from '../data/statesData.js';
import { escapeHTML } from '../i18n.js';

const ATTEMPTS = 5;
const HITS_TO_WIN = 3;

export class FolkSportsGame extends BaseMiniGame {
  constructor(containerId, options = {}) {
    super(containerId, { title: options.title || 'Folk Sports Arena', points: options.points || 200, ...options });
    this.sport = SPORT_THEMES[options.sport] || SPORT_THEMES.archery;
    this.stateData = getStateById(this.stateId);
    this.reducedMotion = !!options.reducedMotion;
    this.resetRound();
  }

  resetRound() {
    this.attempt = 0;
    this.hits = 0;
    this.pos = 0;
    this.dir = 1;
    this.running = false;
    this.zoneStart = 0.4;
    this.results = [];
    this.lastTs = null;
  }

  newZone() {
    const w = Math.max(0.1, this.sport.zone - this.attempt * 0.012);
    this.zoneWidth = w;
    this.zoneStart = 0.15 + Math.random() * (0.85 - w - 0.15);
  }

  runDemoSequence() {
    this.resetRound();
    this.renderArena();
    const rules = (this.stateData && this.stateData.games && this.stateData.games.rules) || [];
    const steps = [
      { title: `Step 1: ${this.sport.name}`, desc: rules[0] || `${this.sport.name} is a traditional test of skill and timing.`, action: () => { this.newZone(); this.drawBar(); } },
      { title: 'Step 2: Watch the Marker', desc: 'A marker sweeps back and forth across the power bar.', action: () => { this.startSweep(); } },
      { title: 'Step 3: Strike in the Golden Zone', desc: `${this.sport.action} when the marker is inside the glowing zone. Press Space, Enter, or the big button.`, action: () => { this.pos = this.zoneStart + this.zoneWidth / 2; this.stopSweep(); this.drawBar(); this.flashResult(true); } },
      { title: `Step 4: ${HITS_TO_WIN} of ${ATTEMPTS} to Win`, desc: 'The zone shrinks a little each attempt. Land 3 good strikes out of 5 to win!', action: () => { soundSynth.playVictory(); setTimeout(() => this.stopDemoAndShowReady(), 1400); } }
    ];
    let i = 0;
    const next = () => {
      if (!this.isDemoMode || i >= steps.length) { this.stopSweep(); return; }
      this.updateNarration(steps[i].title, steps[i].desc);
      steps[i].action();
      i++;
      this.demoTimer = setTimeout(next, 3300);
    };
    next();
  }

  onInteractiveStart() {
    this.resetRound();
    this.renderArena();
    this.nextAttempt();
    this.bindKeys();
  }

  bindKeys() {
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    this.keyHandler = (e) => {
      if (!this.isGameActive) return;
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === ' ' || e.key === 'Enter') {
        // Let a focused button handle Enter itself to avoid double strikes
        if (e.key === 'Enter' && e.target && e.target.id === 'btn-strike') return;
        e.preventDefault();
        this.strike();
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  renderArena() {
    const viewport = this.container.querySelector('#game-viewport');
    if (!viewport) return;
    const origin = this.stateData ? `${this.stateData.name} — ${this.stateData.games.title}` : this.sport.name;
    viewport.innerHTML = `
      <div class="sports-arena">
        <div class="sports-scene ancient-panel">
          <div class="sports-origin">${escapeHTML(origin)}</div>
          <div class="sports-figures" aria-hidden="true">
            <span class="sports-player">${this.sport.icon}</span>
            <span class="sports-track"></span>
            <span class="sports-target" id="sports-target">${this.sport.target}</span>
          </div>
          <div class="power-bar" id="power-bar" role="meter" aria-label="Timing bar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
            <div class="power-zone" id="power-zone"></div>
            <div class="power-marker" id="power-marker"></div>
          </div>
          <div class="sports-feedback" id="sports-feedback" aria-live="assertive"></div>
          <button class="btn-ancient btn-gold sports-strike" id="btn-strike">${this.sport.icon} ${escapeHTML(this.sport.action)} [Space]</button>
        </div>
        <div class="sports-score ancient-panel">
          <h4>Attempts</h4>
          <div class="attempt-dots" id="attempt-dots">${Array.from({ length: ATTEMPTS }, (_, i) => `<span class="attempt-dot" data-i="${i}" aria-label="Attempt ${i + 1}">•</span>`).join('')}</div>
          <p><strong id="sports-hits">0</strong> / ${HITS_TO_WIN} good strikes needed</p>
          <p class="sports-equipment">${escapeHTML((this.stateData && this.stateData.games.equipment) || '')}</p>
        </div>
      </div>`;
    viewport.querySelector('#btn-strike').addEventListener('click', () => this.strike());
    this.drawBar();
  }

  drawBar() {
    const zone = this.container.querySelector('#power-zone');
    const marker = this.container.querySelector('#power-marker');
    const bar = this.container.querySelector('#power-bar');
    if (zone) { zone.style.left = `${this.zoneStart * 100}%`; zone.style.width = `${(this.zoneWidth || this.sport.zone) * 100}%`; }
    if (marker) marker.style.left = `calc(${this.pos * 100}% - 3px)`;
    if (bar) bar.setAttribute('aria-valuenow', String(Math.round(this.pos * 100)));
  }

  startSweep() {
    this.running = true;
    this.lastTs = null;
    const speed = this.sport.speed * (this.reducedMotion ? 0.7 : 1) * (1 + this.attempt * 0.08);
    const loop = (ts) => {
      if (!this.running) return;
      if (this.lastTs === null) this.lastTs = ts;
      const dt = Math.min(0.05, (ts - this.lastTs) / 1000);
      this.lastTs = ts;
      this.pos += this.dir * speed * dt;
      if (this.pos >= 1) { this.pos = 1; this.dir = -1; }
      if (this.pos <= 0) { this.pos = 0; this.dir = 1; }
      this.drawBar();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stopSweep() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  nextAttempt() {
    this.newZone();
    this.pos = 0;
    this.dir = 1;
    this.drawBar();
    this.updateNarration(`Attempt ${this.attempt + 1} of ${ATTEMPTS}`, `${this.sport.action} when the marker is in the golden zone.`);
    const btn = this.container.querySelector('#btn-strike');
    if (btn) { btn.disabled = false; btn.focus({ preventScroll: true }); }
    this.startSweep();
  }

  flashResult(hit) {
    const fb = this.container.querySelector('#sports-feedback');
    if (fb) {
      fb.textContent = hit ? `✓ ${this.sport.hitText}` : `✗ ${this.sport.missText}`;
      fb.className = `sports-feedback ${hit ? 'hit' : 'miss'}`;
    }
    const target = this.container.querySelector('#sports-target');
    if (target) {
      target.classList.remove('hit', 'miss');
      void target.offsetWidth;
      target.classList.add(hit ? 'hit' : 'miss');
    }
  }

  strike() {
    if (!this.isGameActive || !this.running) return;
    this.stopSweep();
    const hit = this.pos >= this.zoneStart && this.pos <= this.zoneStart + this.zoneWidth;
    if (hit) { this.hits++; soundSynth.playBell(); } else { soundSynth.playClack(); }
    this.results.push(hit);
    this.flashResult(hit);

    const dot = this.container.querySelector(`.attempt-dot[data-i="${this.attempt}"]`);
    if (dot) { dot.textContent = hit ? '✓' : '✗'; dot.classList.add(hit ? 'hit' : 'miss'); }
    const hitsEl = this.container.querySelector('#sports-hits');
    if (hitsEl) hitsEl.textContent = this.hits;
    const btn = this.container.querySelector('#btn-strike');
    if (btn) btn.disabled = true;

    this.attempt++;
    const remaining = ATTEMPTS - this.attempt;
    if (this.hits >= HITS_TO_WIN) {
      setTimeout(() => this.finishGame(true, this.options.points, `${this.sport.name} Ace`, { gameKey: 'sports' }), 900);
    } else if (this.hits + remaining < HITS_TO_WIN) {
      setTimeout(() => this.finishGame(false, this.options.points, '', { gameKey: 'sports', lossMessage: `You landed ${this.hits} good strikes. You need ${HITS_TO_WIN} — try again!` }), 900);
    } else {
      setTimeout(() => { if (this.isGameActive) this.nextAttempt(); }, 1100);
    }
  }

  destroy() {
    super.destroy();
    this.stopSweep();
    this.isGameActive = false;
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
  }
}
