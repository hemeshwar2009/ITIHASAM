// js/components/indiaMap.js
// ITIHASAM: Interactive geographical map of India.
// Real state & Union Territory boundaries (DataMeet, CC BY 4.0) drawn as SVG.
// Each of the 28 states is a colourful, clickable, keyboard-focusable shape;
// a gold border and a passport stamp mark states whose five experiences are done.

import { soundSynth } from '../audio/soundSynth.js';
import { gameState, REGIONS_LIST } from '../state/gameState.js';
import { INDIAN_STATES } from '../data/statesData.js';
import { describeGame } from '../data/gameRouting.js';
import { MAP_VIEWBOX, MAP_REGIONS, MAP_INNER_BORDERS, MAP_OUTER_BORDER } from '../data/indiaMapPaths.js';
import { t, escapeHTML } from '../i18n.js';

// Short labels drawn on the map
export const STATE_ABBR = {
  'himachal-pradesh': 'HP', 'punjab': 'PB', 'haryana': 'HR', 'uttarakhand': 'UK', 'sikkim': 'SK',
  'arunachal-pradesh': 'AR', 'rajasthan': 'RJ', 'uttar-pradesh': 'UP', 'bihar': 'BR', 'west-bengal': 'WB',
  'assam': 'AS', 'nagaland': 'NL', 'gujarat': 'GJ', 'madhya-pradesh': 'MP', 'chhattisgarh': 'CG',
  'jharkhand': 'JH', 'meghalaya': 'ML', 'manipur': 'MN', 'maharashtra': 'MH', 'telangana': 'TG',
  'odisha': 'OD', 'tripura': 'TR', 'mizoram': 'MZ', 'goa': 'GA', 'karnataka': 'KA',
  'andhra-pradesh': 'AP', 'kerala': 'KL', 'tamil-nadu': 'TN'
};

// Nudge a few labels so they sit clearly inside / beside small states
const LABEL_NUDGE = { goa: [-26, 4], sikkim: [0, -2], tripura: [-2, 2], kerala: [-4, 6], haryana: [-4, 6], 'andhra-pradesh': [6, 10] };

const SMALL_STATES = new Set(['goa', 'sikkim', 'tripura', 'manipur', 'mizoram', 'nagaland', 'meghalaya']);

export class IndiaMap {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  init() { this.render(); }

  render() {
    if (!this.container) return;
    const stamped = gameState.countStamps();
    const regions = gameState.getVisitedRegions();
    const pct = gameState.getOverallCompletionPercentage();
    const stateIds = new Set(INDIAN_STATES.map(s => s.id));

    // Union Territories: drawn in neutral sandstone, not part of the 28-state journey
    const uts = Object.entries(MAP_REGIONS).filter(([id]) => !stateIds.has(id)).map(([id, r]) =>
      `<path class="map-ut" d="${r.d}"><title>${escapeHTML(r.name)} (Union Territory)</title></path>`).join('');

    const states = INDIAN_STATES.map(s => {
      const r = MAP_REGIONS[s.id];
      if (!r) return '';
      const done = gameState.getStateCompletionPercentage(s.id);
      const label = `${s.name}, ${s.region} India: ${done}% explored${done === 100 ? ', passport stamp earned' : ''}`;
      return `<path class="map-state ${done === 100 ? 'complete' : ''} ${done > 0 && done < 100 ? 'partial' : ''}"
          d="${r.d}" style="--state-color:${r.color}" data-id="${s.id}"
          tabindex="0" role="button" aria-label="${escapeHTML(label)}"></path>`;
    }).join('');

    const labels = INDIAN_STATES.map(s => {
      const r = MAP_REGIONS[s.id];
      if (!r) return '';
      const [nx, ny] = LABEL_NUDGE[s.id] || [0, 0];
      const x = r.cx + nx, y = r.cy + ny;
      const done = gameState.getStateCompletionPercentage(s.id);
      const small = SMALL_STATES.has(s.id);
      return `<g class="map-label ${small ? 'small' : ''}" data-for="${s.id}" aria-hidden="true">
          <text x="${x}" y="${y}" class="map-abbr">${STATE_ABBR[s.id] || ''}</text>
          ${done === 100 ? `<text x="${x}" y="${y + (small ? 13 : 18)}" class="map-stamp">🛂</text>`
            : done > 0 ? `<text x="${x}" y="${y + (small ? 11 : 15)}" class="map-pct">${done}%</text>` : ''}
        </g>`;
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
            <svg class="india-svg" viewBox="${MAP_VIEWBOX}" role="group" aria-label="Map of India with its 28 states">
              <defs>
                <filter id="map-shadow" x="-5%" y="-5%" width="110%" height="110%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#493A2D" flood-opacity="0.18"/>
                </filter>
              </defs>
              <g filter="url(#map-shadow)">
                ${uts}
                ${states}
              </g>
              <path class="map-inner-borders" d="${MAP_INNER_BORDERS}"/>
              <path class="map-outer-border" d="${MAP_OUTER_BORDER}"/>
              <g class="map-labels">${labels}</g>
            </svg>
            <p class="map-note">Hover or focus a state to preview it; click or press Enter to explore. Union Territories are shown in sandstone.
              Boundaries: <a href="https://github.com/datameet/maps" target="_blank" rel="noopener">DataMeet India</a> (CC BY 4.0).</p>
          </div>
          <aside class="map-info ancient-panel" id="map-info" aria-live="polite">
            ${this.infoPanel(null)}
          </aside>
        </div>

        <div class="map-legend ancient-panel">
          ${REGIONS_LIST.map(r => `<span class="legend-item">${r} India${regions.has(r) ? ' ✓' : ''}</span>`).join('<span aria-hidden="true">·</span>')}
          <span class="legend-item"><span class="legend-swatch gold"></span>Gold border = all 5 experiences done</span>
          <span class="legend-item"><span class="legend-swatch ut"></span>Union Territory</span>
        </div>
      </div>`;

    this.container.querySelectorAll('.map-state').forEach(path => {
      const id = path.dataset.id;
      const show = () => {
        this.container.querySelectorAll('.map-state.active').forEach(p => p.classList.remove('active'));
        path.classList.add('active');
        // Bring the hovered state to the front so its outline is not hidden
        path.parentNode.appendChild(path);
        const info = this.container.querySelector('#map-info');
        if (info) info.innerHTML = this.infoPanel(id);
        this.bindInfo();
      };
      const open = () => {
        soundSynth.playBell();
        if (window.appRouter) window.appRouter.navigate('states-directory', { stateId: id });
      };
      path.addEventListener('mouseenter', show);
      path.addEventListener('focus', show);
      path.addEventListener('click', open);
      path.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  }

  infoPanel(id) {
    if (!id) {
      return `<h3>Choose a state</h3><p>Hover over or focus a state to preview its heritage. Click (or press Enter) to open its five experiences.</p>
        <p class="map-tip">💡 Tip: press Tab to move between states.</p>`;
    }
    const s = INDIAN_STATES.find(x => x.id === id);
    if (!s) return '';
    const r = MAP_REGIONS[id];
    const cats = [['history', '📜'], ['games', '🎲'], ['architecture', '🏛️'], ['festivals', '🪔'], ['culture', '🎭']];
    return `
      <span class="map-info-swatch" style="background:${r ? r.color : 'var(--accent-gold)'}"></span>
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
