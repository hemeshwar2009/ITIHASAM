// js/components/indiaMap.js
// ITIHASAM: Interactive "living map" of India's 28 states.
// Drawn as a tile map (one tile per state placed roughly where it lies),
// so every state is the same size, easy to tap and keyboard-accessible.
// Each tile fills with gold as its five cultural experiences are completed.

import { soundSynth } from '../audio/soundSynth.js';
import { gameState, REGIONS_LIST } from '../state/gameState.js';
import { INDIAN_STATES } from '../data/statesData.js';
import { describeGame } from '../data/gameRouting.js';
import { t, escapeHTML } from '../i18n.js';

// [column, row] on a 10 x 7 grid, roughly following geography
export const MAP_TILES = {
  'himachal-pradesh': [5, 1, 'HP'],
  'punjab': [4, 2, 'PB'], 'haryana': [5, 2, 'HR'], 'uttarakhand': [6, 2, 'UK'], 'sikkim': [8, 2, 'SK'], 'arunachal-pradesh': [10, 2, 'AR'],
  'rajasthan': [4, 3, 'RJ'], 'uttar-pradesh': [5, 3, 'UP'], 'bihar': [6, 3, 'BR'], 'west-bengal': [7, 3, 'WB'], 'assam': [9, 3, 'AS'], 'nagaland': [10, 3, 'NL'],
  'gujarat': [3, 4, 'GJ'], 'madhya-pradesh': [4, 4, 'MP'], 'chhattisgarh': [5, 4, 'CG'], 'jharkhand': [6, 4, 'JH'], 'meghalaya': [9, 4, 'ML'], 'manipur': [10, 4, 'MN'],
  'maharashtra': [4, 5, 'MH'], 'telangana': [5, 5, 'TG'], 'odisha': [6, 5, 'OD'], 'tripura': [9, 5, 'TR'], 'mizoram': [10, 5, 'MZ'],
  'goa': [3, 6, 'GA'], 'karnataka': [4, 6, 'KA'], 'andhra-pradesh': [5, 6, 'AP'],
  'kerala': [4, 7, 'KL'], 'tamil-nadu': [5, 7, 'TN']
};

export class IndiaMap {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.hoverId = null;
  }

  init() { this.render(); }

  render() {
    if (!this.container) return;
    const stamped = gameState.countStamps();
    const regions = gameState.getVisitedRegions();
    const pct = gameState.getOverallCompletionPercentage();

    const tiles = INDIAN_STATES.map(s => {
      const pos = MAP_TILES[s.id];
      if (!pos) return '';
      const done = gameState.getStateCompletionPercentage(s.id);
      const label = `${s.name}, ${s.region} India: ${done}% explored${done === 100 ? ', passport stamp earned' : ''}`;
      return `
        <button class="map-tile region-${s.region.toLowerCase()} ${done === 100 ? 'complete' : ''} ${done > 0 && done < 100 ? 'partial' : ''}"
                style="grid-column:${pos[0] - 2};grid-row:${pos[1]};--fill:${done}%"
                data-id="${s.id}" aria-label="${escapeHTML(label)}">
          <span class="map-tile-fill" aria-hidden="true"></span>
          <span class="map-tile-abbr">${pos[2]}</span>
          <span class="map-tile-pct">${done === 100 ? '🛂' : done + '%'}</span>
        </button>`;
    }).join('');

    this.container.innerHTML = `
      <div class="india-map-wrap">
        <div class="explorer-header ancient-panel">
          <div class="explorer-title-area">
            <span class="category-pill">BHARAT DARSHAN</span>
            <h2>${t('mapTitle')}</h2>
            <p>${t('mapSubtitle')}</p>
          </div>
          <div class="map-stats">
            <div class="score-card"><span class="score-title">Overall progress</span><span class="score-val">${pct}%</span></div>
            <div class="score-card"><span class="score-title">Passport stamps</span><span class="score-val">${stamped} / 28</span></div>
            <div class="score-card"><span class="score-title">Regions visited</span><span class="score-val">${regions.size} / 6</span></div>
          </div>
        </div>

        <div class="map-layout">
          <div class="map-board ancient-panel">
            <div class="map-grid" role="group" aria-label="Tile map of India's 28 states">${tiles}</div>
            <p class="map-note">Tile map — each state is one tile placed roughly where it lies. Not to scale; Union Territories are not shown.</p>
          </div>
          <aside class="map-info ancient-panel" id="map-info" aria-live="polite">
            ${this.infoPanel(null)}
          </aside>
        </div>

        <div class="map-legend ancient-panel">
          ${REGIONS_LIST.map(r => `<span class="legend-item"><span class="legend-swatch region-${r.toLowerCase()}"></span>${r}${regions.has(r) ? ' ✓' : ''}</span>`).join('')}
          <span class="legend-item"><span class="legend-swatch gold"></span>Completed (stamp earned)</span>
        </div>
      </div>`;

    this.container.querySelectorAll('.map-tile').forEach(tile => {
      const id = tile.dataset.id;
      const show = () => {
        const info = this.container.querySelector('#map-info');
        if (info) info.innerHTML = this.infoPanel(id);
        this.bindInfo();
      };
      tile.addEventListener('mouseenter', show);
      tile.addEventListener('focus', show);
      tile.addEventListener('click', () => {
        soundSynth.playBell();
        if (window.appRouter) window.appRouter.navigate('states-directory', { stateId: id });
      });
    });
  }

  infoPanel(id) {
    if (!id) {
      return `<h3>Choose a state</h3><p>Hover or focus a tile to preview its heritage. Click (or press Enter) to open its five experiences.</p>
        <p class="map-tip">💡 Tip: use the Tab key to move between states.</p>`;
    }
    const s = INDIAN_STATES.find(x => x.id === id);
    if (!s) return '';
    const cats = [['history', '📜'], ['games', '🎲'], ['architecture', '🏛️'], ['festivals', '🪔'], ['culture', '🎭']];
    return `
      <span class="region-pill">${escapeHTML(s.region)} India · ${escapeHTML(s.capital)}</span>
      <h3>${escapeHTML(s.name)}</h3>
      <p class="map-badge">${escapeHTML(s.badge)}</p>
      <ul class="map-cat-list">
        ${cats.map(([k, icon]) => `<li class="${gameState.isActivityCompleted(s.id, k) ? 'done' : ''}">${icon} ${escapeHTML(k === 'history' ? s.history.title : k === 'games' ? describeGame(s.id) : k === 'architecture' ? s.architecture.monumentName : k === 'festivals' ? s.festivals.title : s.culture.title)}${gameState.isActivityCompleted(s.id, k) ? ' ✓' : ''}</li>`).join('')}
      </ul>
      <button class="btn-ancient btn-gold btn-block" data-open="${s.id}">Explore ${escapeHTML(s.name)} →</button>`;
  }

  bindInfo() {
    const btn = this.container.querySelector('[data-open]');
    if (btn) btn.addEventListener('click', () => {
      soundSynth.playBell();
      if (window.appRouter) window.appRouter.navigate('states-directory', { stateId: btn.dataset.open });
    });
  }

  destroy() {}
}
