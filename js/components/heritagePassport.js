// js/components/heritagePassport.js
// ITIHASAM: Heritage Passport — one stamp per state, earned by completing
// all five cultural categories of that state.

import { soundSynth } from '../audio/soundSynth.js';
import { gameState, CATEGORY_KEYS } from '../state/gameState.js';
import { INDIAN_STATES } from '../data/statesData.js';
import { t, escapeHTML } from '../i18n.js';

const CAT_ICONS = { history: '📜', games: '🎲', architecture: '🏛️', festivals: '🪔', culture: '🎭' };

export class HeritagePassport {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  init() { this.render(); }

  render() {
    if (!this.container) return;
    const stamped = gameState.countStamps();
    const name = gameState.state.avatar.name || 'Explorer';

    const pages = INDIAN_STATES.map(s => {
      const doneCats = CATEGORY_KEYS.filter(k => gameState.isActivityCompleted(s.id, k));
      const complete = doneCats.length === CATEGORY_KEYS.length;
      let stampDate = '';
      if (complete) {
        const ts = Math.max(...CATEGORY_KEYS.map(k => gameState.state.completedActivities[`${s.id}_${k}`] || 0));
        stampDate = new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      }
      const rotate = ((s.name.length * 37) % 24) - 12;
      return `
        <button class="passport-slot ${complete ? 'stamped' : ''}" data-id="${s.id}"
          aria-label="${escapeHTML(s.name)}: ${complete ? 'stamp earned on ' + stampDate : doneCats.length + ' of 5 categories done'}">
          ${complete ? `
            <span class="passport-stamp" style="transform: rotate(${rotate}deg)" aria-hidden="true">
              <span class="stamp-ring">
                <span class="stamp-state">${escapeHTML(s.name.toUpperCase())}</span>
                <span class="stamp-icon">${(s.history.artifact && s.history.artifact.icon) || '🏛️'}</span>
                <span class="stamp-date">${escapeHTML(stampDate)}</span>
              </span>
            </span>` : `
            <span class="passport-empty" aria-hidden="true">
              <span class="stamp-state">${escapeHTML(s.name)}</span>
              <span class="passport-cats">${CATEGORY_KEYS.map(k => `<span class="${doneCats.includes(k) ? 'on' : ''}">${CAT_ICONS[k]}</span>`).join('')}</span>
              <span class="stamp-date">${doneCats.length} / 5</span>
            </span>`}
        </button>`;
    }).join('');

    this.container.innerHTML = `
      <div class="passport-wrap">
        <div class="passport-cover ancient-panel">
          <div class="passport-emblem" aria-hidden="true">☸️</div>
          <div>
            <span class="category-pill">BHARAT HERITAGE PASSPORT</span>
            <h2>${t('passportTitle')}</h2>
            <p>${t('passportSubtitle')}</p>
            <p class="passport-holder">Holder: <strong>${escapeHTML(name)}</strong> · Stamps: <strong>${stamped} / 28</strong></p>
          </div>
          <div class="passport-progress" role="progressbar" aria-valuemin="0" aria-valuemax="28" aria-valuenow="${stamped}" aria-label="Passport stamps collected">
            <div class="passport-progress-fill" style="width:${(stamped / 28) * 100}%"></div>
          </div>
        </div>
        <div class="passport-grid">${pages}</div>
      </div>`;

    this.container.querySelectorAll('.passport-slot').forEach(btn => {
      btn.addEventListener('click', () => {
        soundSynth.playClick();
        if (window.appRouter) window.appRouter.navigate('states-directory', { stateId: btn.dataset.id });
      });
    });
  }

  destroy() {}
}
