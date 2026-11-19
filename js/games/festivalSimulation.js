// js/games/festivalSimulation.js
// ITIHASAM: Festival simulations, themed per state.
//  • 'mandala' festivals: build 5 layers in the right order (Pookalam, Pongal
//    pot, Bathukamma, Dasara Gombe, Rangoli, Mandana, Durga Puja pandal,
//    Rath Yatra chariot, river of diyas, Losar prayer flags).
//  • 'rhythm' festivals: keep the beat of the festival drum (Garba, Bhangra
//    dhol, Bihu, Wangala, Hornbill log drum, Cheraw bamboo dance...).

import { BaseMiniGame } from './gameEngine.js';
import { soundSynth } from '../audio/soundSynth.js';
import { getStateById } from '../data/statesData.js';
import { getFestivalTheme } from '../data/gameRouting.js';
import { escapeHTML } from '../i18n.js';

const BEATS = 16;
const HITS_TO_WIN = 10;
const HIT_WINDOW_MS = 190;

export class FestivalSimulationGame extends BaseMiniGame {
  constructor(containerId, options = {}) {
    super(containerId, { title: options.title || 'Festival Celebration', points: options.points || 180, ...options });
    this.stateData = getStateById(this.stateId);
    this.theme = getFestivalTheme(this.stateId);
    this.currentStep = 0;
  }

  get isRhythm() { return this.theme.kind === 'rhythm'; }

  // =====================================================================
  // Demo
  // =====================================================================
  runDemoSequence() {
    if (this.isRhythm) return this.runRhythmDemo();
    this.renderMandalaUI();
    const L = this.theme.layers;
    const fest = this.stateData ? this.stateData.festivals : null;
    const steps = [
      { title: `Step 1: ${this.theme.heading}`, desc: (fest && fest.rituals) || this.theme.lore, action: () => { this.highlightLayer(0); soundSynth.playBell(); } },
      { title: `Step 2: ${L[0].name}`, desc: 'Every celebration begins from the centre (or the base) and grows outward, layer by layer.', action: () => { this.fillLayer(0); soundSynth.playClack(); } },
      { title: 'Step 3: Build in Sacred Order', desc: `${L[1].name}, then ${L[2].name}, then ${L[3].name}.`, action: () => { this.fillLayer(1); setTimeout(() => { this.fillLayer(2); this.fillLayer(3); soundSynth.playCowrieRoll(); }, 600); } },
      { title: `Step 4: ${L[4].name}`, desc: this.theme.done, action: () => { this.fillLayer(4); soundSynth.playVictory(); setTimeout(() => this.stopDemoAndShowReady(), 1500); } }
    ];
    let i = 0;
    const next = () => {
      if (!this.isDemoMode || i >= steps.length) return;
      this.updateNarration(steps[i].title, steps[i].desc);
      steps[i].action();
      i++;
      this.demoTimer = setTimeout(next, 3500);
    };
    next();
  }

  onInteractiveStart() {
    if (this.isRhythm) return this.startRhythm();
    this.currentStep = 0;
    this.renderMandalaUI();
    this.updateNarration('Begin the celebration:', `First: ${this.theme.layers[0].name}. Click the layer, or pick it from the basket.`);
  }

  // =====================================================================
  // Mandala festivals
  // =====================================================================
  renderMandalaUI() {
    const viewport = this.container.querySelector('#game-viewport');
    if (!viewport) return;
    const L = this.theme.layers;
    const fest = this.stateData ? this.stateData.festivals : {};

    // Build nested rings: open outer (4) to centre (0), then close all five
    const ringOpen = (i) => `<div class="pookalam-ring ${i === 0 ? 'ring-center ring-1' : `ring-${i + 1}`} ${i === 4 ? 'ring-outer' : ''}" id="ring-elem-${i}" data-index="${i}" role="button" tabindex="0" aria-label="Layer ${i + 1}: ${escapeHTML(L[i].name)}">
        ${i === 0 ? `<span class="ring-center-icon" id="center-icon">${L[0].icon}</span>` : `<span class="ring-label-hint">${escapeHTML(L[i].name)}</span>`}`;
    const rings = ringOpen(4) + ringOpen(3) + ringOpen(2) + ringOpen(1) + ringOpen(0) + '</div></div></div></div></div>';

    viewport.innerHTML = `
      <div class="festival-simulation-container">
        <div class="mandala-stage-panel ancient-panel">
          <div class="mandala-header">
            <span class="mandala-title">${escapeHTML(this.theme.heading)}</span>
            <span class="lamp-indicator">${escapeHTML(this.theme.lamp)}</span>
          </div>
          <div class="pookalam-circle-board" id="pookalam-board">${rings}</div>
          <div class="mandala-harmony-score">
            <span>${escapeHTML((fest && fest.title) || '')}</span>
            <span class="score-stars" id="harmony-stars" aria-label="Layers placed">${'☆'.repeat(5)}</span>
          </div>
        </div>
        <div class="flower-palette-panel ancient-panel">
          <h4 class="palette-title">Celebration Basket</h4>
          <p class="palette-desc">Arrange the five layers in their traditional order:</p>
          <div class="petals-selector-list" id="petals-selector">
            ${L.map((layer, idx) => `
              <button class="petal-card-btn" id="petal-btn-${idx}" data-index="${idx}">
                <span class="petal-icon" aria-hidden="true">${layer.icon}</span>
                <div class="petal-details">
                  <span class="petal-name">${escapeHTML(layer.name)}</span>
                  <span class="petal-hint">${idx === 0 ? 'Start here' : `Stage ${idx + 1}`}</span>
                </div>
                <span class="petal-check" id="petal-check-${idx}">Place</span>
              </button>`).join('')}
          </div>
          <div class="festival-lore-card">
            <h5>Traditional Significance</h5>
            <p>${escapeHTML(this.theme.lore)}</p>
            ${fest && fest.culinaryHeritage ? `<p><strong>Festive food:</strong> ${escapeHTML(fest.culinaryHeritage)}</p>` : ''}
          </div>
        </div>
      </div>`;

    const handler = (el) => {
      if (this.isDemoMode || !this.isGameActive || this.isGameOver) return;
      this.handleLayerSelect(parseInt(el.dataset.index, 10));
    };
    viewport.querySelectorAll('.petal-card-btn').forEach(btn => btn.addEventListener('click', () => handler(btn)));
    viewport.querySelectorAll('.pookalam-ring').forEach(ring => {
      ring.addEventListener('click', (e) => { e.stopPropagation(); handler(ring); });
      ring.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); handler(ring); }
      });
    });
  }

  highlightLayer(idx) {
    const ring = this.container.querySelector(`#ring-elem-${idx}`);
    if (ring) ring.classList.add('ring-pulse');
  }

  fillLayer(idx) {
    const ring = this.container.querySelector(`#ring-elem-${idx}`);
    if (ring) {
      ring.classList.remove('ring-pulse');
      ring.classList.add('ring-filled', 'pop-in');
      ring.style.background = this.theme.layers[idx].color;
      ring.style.borderColor = this.theme.layers[idx].color;
    }
    const btn = this.container.querySelector(`#petal-btn-${idx}`);
    if (btn) {
      btn.classList.add('used');
      const chk = btn.querySelector('.petal-check');
      if (chk) chk.textContent = '✓ Placed';
    }
    const stars = this.container.querySelector('#harmony-stars');
    if (stars) {
      const n = this.container.querySelectorAll('.ring-filled').length;
      stars.textContent = '⭐'.repeat(n) + '☆'.repeat(5 - n);
    }
  }

  handleLayerSelect(index) {
    const L = this.theme.layers;
    if (index === this.currentStep) {
      soundSynth.playClack();
      this.fillLayer(index);
      this.currentStep++;
      if (this.currentStep < L.length) {
        soundSynth.playCowrieRoll();
        this.updateNarration(`Layer ${this.currentStep} placed!`, `Next: ${L[this.currentStep].name}.`);
        this.highlightLayer(this.currentStep);
      } else {
        soundSynth.playVictory();
        this.updateNarration('Celebration complete!', this.theme.done);
        setTimeout(() => this.finishGame(true, this.options.points, 'Festival Maestro', { festivalTheme: this.theme.key }), 1200);
      }
    } else if (index < this.currentStep) {
      soundSynth.playClick();
      this.updateNarration('Already placed', `That layer is done. Next: ${L[this.currentStep].name}.`);
    } else {
      soundSynth.playClick();
      this.updateNarration('Follow the traditional order!', `Build from the centre outward. Next: ${L[this.currentStep].name}.`);
    }
  }

  // =====================================================================
  // Rhythm festivals
  // =====================================================================
  beatPattern() {
    // Base pulse at the theme's tempo with a few syncopated (half-beat) gaps
    const base = 60000 / this.theme.bpm;
    const pattern = [];
    for (let i = 0; i < BEATS; i++) {
      pattern.push(i % 4 === 3 ? base * 1.5 : base);
    }
    return pattern;
  }

  renderRhythmUI() {
    const viewport = this.container.querySelector('#game-viewport');
    if (!viewport) return;
    const fest = this.stateData ? this.stateData.festivals : {};
    viewport.innerHTML = `
      <div class="rhythm-container">
        <div class="rhythm-stage ancient-panel">
          <div class="mandala-header">
            <span class="mandala-title">${escapeHTML(this.theme.heading)}</span>
            <span class="lamp-indicator">${this.theme.icon} ${escapeHTML(this.theme.instrument)}</span>
          </div>
          <div class="rhythm-pad-wrap">
            <div class="rhythm-approach" id="rhythm-approach" aria-hidden="true"></div>
            <button class="rhythm-pad" id="rhythm-pad" aria-label="Drum pad: tap on the beat (Space key also works)">
              <span class="rhythm-pad-icon">${this.theme.icon}</span>
            </button>
          </div>
          <div class="rhythm-feedback" id="rhythm-feedback" aria-live="polite">Tap when the ring closes on the drum</div>
          <div class="rhythm-progress"><div class="rhythm-progress-fill" id="rhythm-progress-fill"></div></div>
        </div>
        <div class="flower-palette-panel ancient-panel">
          <h4 class="palette-title">Keep the Festival Beat</h4>
          <p class="palette-desc">Hit <strong>${HITS_TO_WIN}</strong> of <strong>${BEATS}</strong> beats in time to win.</p>
          <div class="rhythm-score"><span>Good hits</span><strong id="rhythm-hits">0</strong></div>
          <div class="rhythm-score"><span>Beats played</span><strong id="rhythm-count">0 / ${BEATS}</strong></div>
          <div class="festival-lore-card">
            <h5>${escapeHTML((fest && fest.title) || 'Festival')}</h5>
            <p>${escapeHTML(this.theme.lore)}</p>
            ${fest && fest.celebrationStyle ? `<p>${escapeHTML(fest.celebrationStyle)}</p>` : ''}
          </div>
        </div>
      </div>`;
    const pad = viewport.querySelector('#rhythm-pad');
    pad.addEventListener('pointerdown', (e) => { e.preventDefault(); this.tap(); });
    pad.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); this.tap(); } });
  }

  runRhythmDemo() {
    this.renderRhythmUI();
    const steps = [
      { title: `Step 1: ${this.theme.heading}`, desc: this.theme.lore },
      { title: 'Step 2: Watch the Ring', desc: 'A ring shrinks toward the drum on every beat. When it closes on the drum, that is the beat!' },
      { title: 'Step 3: Tap on the Beat', desc: 'Tap the drum (or press Space) exactly when the ring closes. Early or late taps are misses.' },
      { title: 'Step 4: Keep the Celebration Going', desc: `Land ${HITS_TO_WIN} of ${BEATS} beats to make the festival roar!` }
    ];
    let i = 0;
    const next = () => {
      if (!this.isDemoMode) return;
      if (i >= steps.length) { this.stopDemoAndShowReady(); return; }
      this.updateNarration(steps[i].title, steps[i].desc);
      if (i >= 1) this.demoBeat();
      i++;
      this.demoTimer = setTimeout(next, 3200);
    };
    next();
  }

  demoBeat() {
    const base = 60000 / this.theme.bpm;
    for (let k = 0; k < 3; k++) {
      setTimeout(() => {
        if (!this.isDemoMode) return;
        this.animateApproach(base);
        setTimeout(() => { if (this.isDemoMode) { soundSynth.playDrum(); this.padFlash('hit'); } }, base);
      }, k * base);
    }
  }

  startRhythm() {
    (this.pending || []).forEach(clearTimeout);
    this.pending = [];
    this.renderRhythmUI();
    this.hits = 0;
    this.beatIndex = 0;
    this.beatTimes = [];
    this.tappedBeats = new Set();
    this.updateNarration('Get ready...', 'Four count-in clicks, then the beat begins. Tap on the drum!');
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    this.keyHandler = (e) => {
      if (!this.isGameActive) return;
      if (e.key === ' ') { e.preventDefault(); this.tap(); }
    };
    window.addEventListener('keydown', this.keyHandler);

    const base = 60000 / this.theme.bpm;
    const now = performance.now();
    for (let c = 0; c < 4; c++) this.timeouts(() => soundSynth.playClick(), c * base);
    // Schedule beats
    const pattern = this.beatPattern();
    let tCursor = 4 * base;
    pattern.forEach((gap, i) => {
      const beatAt = now + tCursor;
      this.beatTimes.push(beatAt);
      this.timeouts(() => this.animateApproach(Math.min(base, gap)), tCursor - Math.min(base, gap));
      this.timeouts(() => { soundSynth.playDrum(true); this.onBeatPassed(i); }, tCursor + HIT_WINDOW_MS);
      tCursor += gap;
    });
    this.timeouts(() => this.endRhythm(), tCursor + 600);
    const pad = this.container.querySelector('#rhythm-pad');
    if (pad) pad.focus({ preventScroll: true });
  }

  timeouts(fn, ms) {
    this.pending = this.pending || [];
    this.pending.push(setTimeout(() => { if (this.isGameActive) fn(); }, Math.max(0, ms)));
  }

  animateApproach(duration) {
    const el = this.container.querySelector('#rhythm-approach');
    if (!el) return;
    el.style.transition = 'none';
    el.style.transform = 'translate(-50%, -50%) scale(2.4)';
    el.style.opacity = '0.9';
    void el.offsetWidth;
    el.style.transition = `transform ${duration}ms linear, opacity ${duration}ms linear`;
    el.style.transform = 'translate(-50%, -50%) scale(1)';
    el.style.opacity = '0.25';
  }

  padFlash(kind) {
    const pad = this.container.querySelector('#rhythm-pad');
    if (!pad) return;
    pad.classList.remove('hit', 'miss');
    void pad.offsetWidth;
    pad.classList.add(kind);
  }

  tap() {
    if (!this.isGameActive || !this.beatTimes) return;
    const now = performance.now();
    let best = -1, bestDiff = Infinity;
    this.beatTimes.forEach((bt, i) => {
      const d = Math.abs(now - bt);
      if (d < bestDiff) { bestDiff = d; best = i; }
    });
    const fb = this.container.querySelector('#rhythm-feedback');
    if (best >= 0 && bestDiff <= HIT_WINDOW_MS && !this.tappedBeats.has(best)) {
      this.tappedBeats.add(best);
      this.hits++;
      soundSynth.playDrum();
      this.padFlash('hit');
      if (fb) fb.textContent = bestDiff < 80 ? '✨ Perfect!' : '✓ Good!';
    } else {
      soundSynth.playClick();
      this.padFlash('miss');
      if (fb) fb.textContent = 'Off-beat — listen for the drum!';
    }
    const h = this.container.querySelector('#rhythm-hits');
    if (h) h.textContent = this.hits;
  }

  onBeatPassed(i) {
    this.beatIndex = i + 1;
    const c = this.container.querySelector('#rhythm-count');
    if (c) c.textContent = `${this.beatIndex} / ${BEATS}`;
    const f = this.container.querySelector('#rhythm-progress-fill');
    if (f) f.style.width = `${(this.beatIndex / BEATS) * 100}%`;
  }

  endRhythm() {
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    const won = this.hits >= HITS_TO_WIN;
    this.updateNarration(won ? 'The festival roars with joy!' : 'The rhythm slipped away', `You hit ${this.hits} of ${BEATS} beats.`);
    this.finishGame(won, this.options.points, 'Keeper of the Festival Beat', {
      festivalTheme: this.theme.key,
      lossMessage: `You hit ${this.hits} of ${BEATS} beats — ${HITS_TO_WIN} are needed. Listen to the count-in and try again!`
    });
  }

  destroy() {
    super.destroy();
    this.isGameActive = false;
    (this.pending || []).forEach(clearTimeout);
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
  }
}
