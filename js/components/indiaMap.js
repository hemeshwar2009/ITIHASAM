// js/components/indiaMap.js
// ITIHASAM: Interactive geographical map of India.
// Real state & Union Territory boundaries (DataMeet, CC BY 4.0) drawn as SVG.
// All 28 states and 8 Union Territories are colourful, clickable, keyboard-
// focusable shapes; a gold border and a passport stamp mark regions whose five
// experiences are done. Tiny UTs also get a marker dot so they are easy to tap.

import { soundSynth } from '../audio/soundSynth.js';
import { gameState, REGIONS_LIST } from '../state/gameState.js';
import { INDIAN_STATES, STATE_COUNT, UT_COUNT, REGION_COUNT, isUT } from '../data/statesData.js';
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
  'andhra-pradesh': 'AP', 'kerala': 'KL', 'tamil-nadu': 'TN',
  // Union Territories
  'jammu-and-kashmir': 'JK', 'ladakh': 'LA', 'delhi': 'DL', 'chandigarh': 'CH', 'puducherry': 'PY',
  'lakshadweep': 'LD', 'andaman-and-nicobar-islands': 'AN', 'dadra-and-nagar-haveli-and-daman-and-diu': 'DH'
};

// Regions too small to tap reliably: drawn with a marker dot, label beside it
const TINY = new Set(['delhi', 'chandigarh', 'puducherry', 'lakshadweep', 'dadra-and-nagar-haveli-and-daman-and-diu']);

// Nudge a few labels so they sit clearly inside / beside small states
const LABEL_NUDGE = {
  goa: [-26, 4], sikkim: [0, -2], tripura: [-2, 2], kerala: [-4, 6], haryana: [-4, 10], 'andhra-pradesh': [6, 10],
  // Labels for tiny Union Territories sit beside their marker dot
  delhi: [22, 2], chandigarh: [22, -8], puducherry: [24, 0], lakshadweep: [0, -16],
  'dadra-and-nagar-haveli-and-daman-and-diu': [-26, 0], 'andaman-and-nicobar-islands': [-30, -40], 'jammu-and-kashmir': [0, 10]
};

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
    const uts = '';

    const states = INDIAN_STATES.map(s => {
      const r = MAP_REGIONS[s.id];
      if (!r) return '';
      const done = gameState.getStateCompletionPercentage(s.id);
      const kind = isUT(s) ? 'Union Territory' : 'State';
      const label = `${s.name} (${kind}), ${s.region} India: ${done}% explored${done === 100 ? ', passport stamp earned' : ''}`;
      const shape = `<path class="map-state ${isUT(s) ? 'is-ut' : ''} ${done === 100 ? 'complete' : ''} ${done > 0 && done < 100 ? 'partial' : ''}"
          d="${r.d}" style="--state-color:${r.color}" data-id="${s.id}"
          ${TINY.has(s.id) ? 'tabindex="-1" aria-hidden="true"' : `tabindex="0" role="button" aria-label="${escapeHTML(label)}"`}></path>`;
      // Tiny regions: a clearly visible, tappable marker dot is the focus target
      const dot = TINY.has(s.id)
        ? `<circle class="map-state map-dot ${done === 100 ? 'complete' : ''}" cx="${r.cx}" cy="${r.cy}" r="9"
            style="--state-color:${r.color}" data-id="${s.id}" tabindex="0" role="button" aria-label="${escapeHTML(label)}"></circle>`
        : '';
      return shape + dot;
    }).join('');

    const labels = INDIAN_STATES.map(s => {
      const r = MAP_REGIONS[s.id];
      if (!r) return '';
      const [nx, ny] = LABEL_NUDGE[s.id] || [0, 0];
      const x = r.cx + nx, y = r.cy + ny;
      const done = gameState.getStateCompletionPercentage(s.id);
      const small = SMALL_STATES.has(s.id) || TINY.has(s.id);
      return `<g class="map-label ${small ? 'small' : ''} ${isUT(s) ? 'ut' : ''}" data-for="${s.id}" aria-hidden="true">
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
            <div class="score-card"><span class="score-title">Passport stamps</span><span class="score-val">${stamped} / ${REGION_COUNT}</span></div>
            <div class="score-card"><span class="score-title">Regions visited</span><span class="score-val">${regions.size} / 6</span></div>
          </div>
        </div>

        <div class="map-layout">
          <div class="map-board ancient-panel">
            <svg class="india-svg" viewBox="${MAP_VIEWBOX}" role="group" aria-label="Map of India with its ${STATE_COUNT} states and ${UT_COUNT} Union Territories">
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
              <path class="map-highlight" id="map-highlight" d=""/>
              <g class="map-labels">${labels}</g>
            </svg>
            <p class="map-note">Hover or focus a state or Union Territory to preview it; click or press Enter to explore. Union Territory labels are in <em>italics</em>; small ones have a marker dot.
              Boundaries: <a href="https://github.com/datameet/maps" target="_blank" rel="noopener">DataMeet India</a> (CC BY 4.0).</p>
          </div>
          <aside class="map-info ancient-panel" id="map-info" aria-live="polite">
            ${this.infoPanel(null)}
          </aside>
        </div>

        <div class="map-legend ancient-panel">
          ${REGIONS_LIST.map(r => `<span class="legend-item">${r} India${regions.has(r) ? ' ✓' : ''}</span>`).join('<span aria-hidden="true">·</span>')}
          <span class="legend-item"><span class="legend-swatch gold"></span>Gold border = all 5 experiences done</span>
          <span class="legend-item"><em>Italic label</em> = Union Territory</span>
        </div>
      </div>`;

    this.container.querySelectorAll('.map-state').forEach(path => {
      const id = path.dataset.id;
      const show = () => {
        this.container.querySelectorAll('.map-state.active').forEach(p => p.classList.remove('active'));
        path.classList.add('active');
        // Draw the highlight outline in a separate top layer. (Moving the shape
        // itself in the DOM here would cancel the click that follows.)
        const hl = this.container.querySelector('#map-highlight');
        const shape = MAP_REGIONS[id];
        if (hl && shape) hl.setAttribute('d', shape.d);
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
    this.bindInfo();
  }

  infoPanel(id) {
    if (!id) {
      return `<h3>Choose a state or Union Territory</h3><p>Hover over or focus a region to preview its heritage. Click (or press Enter) to open its five experiences.</p>
        <p class="map-tip">💡 Tip: press Tab to move between regions.</p>
        <h4 class="map-ut-heading">Union Territories</h4>
        <div class="map-ut-list">${INDIAN_STATES.filter(isUT).map(u => `<button class="quick-link-chip" data-open="${u.id}">${escapeHTML(u.name)}</button>`).join('')}</div>`;
    }
    const s = INDIAN_STATES.find(x => x.id === id);
    if (!s) return '';
    const r = MAP_REGIONS[id];
    const cats = [['history', '📜'], ['games', '🎲'], ['architecture', '🏛️'], ['festivals', '🪔'], ['culture', '🎭']];
    return `
      <span class="map-info-swatch" style="background:${r ? r.color : 'var(--accent-gold)'}"></span>
      <span class="region-pill">${isUT(s) ? 'Union Territory' : 'State'} · ${escapeHTML(s.region)} India · ${escapeHTML(s.capital)}</span>
      <h3>${escapeHTML(s.name)}</h3>
      <p class="map-badge">${escapeHTML(s.badge)}</p>
      <ul class="map-cat-list">
        ${cats.map(([k, icon]) => `<li class="${gameState.isActivityCompleted(s.id, k) ? 'done' : ''}">${icon} ${escapeHTML(k === 'history' ? s.history.title : k === 'games' ? describeGame(s.id) : k === 'architecture' ? s.architecture.monumentName : k === 'festivals' ? s.festivals.title : s.culture.title)}${gameState.isActivityCompleted(s.id, k) ? ' ✓' : ''}</li>`).join('')}
      </ul>
      <button class="btn-ancient btn-gold btn-block" data-open="${s.id}">Explore ${escapeHTML(s.name)} →</button>`;
  }

  bindInfo() {
    this.container.querySelectorAll('#map-info [data-open]').forEach(btn => btn.addEventListener('click', () => {
      soundSynth.playBell();
      if (window.appRouter) window.appRouter.navigate('states-directory', { stateId: btn.dataset.open });
    }));
  }

  destroy() {}
}
