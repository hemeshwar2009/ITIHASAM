// js/components/stateExplorer.js
// ITIHASAM: States & Union Territories Directory, Regional Filtering, Search & State Detail Modal

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { INDIAN_STATES, getStateById, searchStates, getStatesByRegion, isUT, STATE_COUNT, UT_COUNT } from '../data/statesData.js';
import { describeGame, getFestivalTheme } from '../data/gameRouting.js';
import { escapeHTML } from '../i18n.js';

export class StateExplorer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.activeFilter = options.region || 'All';
    this.searchQuery = '';
    this.selectedStateId = options.stateId || null;
    this.selectedCategoryKey = options.categoryKey || null;
    this.onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      const modal = this.container && this.container.querySelector('#state-detail-modal');
      if (modal && !modal.classList.contains('hidden')) this.closeStateDetail();
    };
    document.addEventListener('keydown', this.onKeyDown);
  }

  destroy() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  closeStateDetail() {
    const modal = this.container.querySelector('#state-detail-modal');
    if (modal) modal.classList.add('hidden');
    this.selectedStateId = null;
    if (window.appRouter && window.appRouter.writeHash) window.appRouter.writeHash('states-directory', {}, true);
    if (this.lastFocus && document.contains(this.lastFocus)) this.lastFocus.focus();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    const filteredStates = this.getFilteredList();

    this.container.innerHTML = `
      <div class="states-explorer-wrap">
        <!-- Explorer Header Bar -->
        <div class="explorer-header ancient-panel">
          <div class="explorer-title-area">
            <span class="category-pill">STORYBOARD DIRECTORY</span>
            <h2>Explore the ${STATE_COUNT} States & ${UT_COUNT} Union Territories of India</h2>
            <p>Select any state to embark on its five interactive cultural experiences.</p>
          </div>

          <!-- Search & Filter Controls -->
          <div class="explorer-filter-controls">
            <!-- Search Box -->
            <div class="search-input-wrap">
              <span class="search-icon" aria-hidden="true">🔍</span>
              <label class="sr-only" for="state-search-input">Search states</label>
              <input type="search" id="state-search-input" placeholder="Search by state, monument, dance, or festival..." value="${escapeHTML(this.searchQuery)}" class="ancient-input" />
              ${this.searchQuery ? '<button class="clear-search-btn" id="btn-clear-search" aria-label="Clear search">✖</button>' : ''}
            </div>

            <!-- Regional Filter Chips -->
            <div class="region-chips-row" id="region-chips-row">
              ${['All', 'South', 'West', 'North', 'East', 'Northeast', 'Central', 'UT'].map(reg => `
                <button class="region-chip ${this.activeFilter === reg ? 'active' : ''}" data-region="${reg}" aria-pressed="${this.activeFilter === reg}">
                  ${reg === 'All' ? 'All Regions' : reg === 'UT' ? 'Union Territories' : reg + ' India'}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- States & Union Territories Cards Grid -->
        <div class="states-grid-container" id="states-grid">
          ${filteredStates.length > 0 ? filteredStates.map(state => {
            const completionPct = gameState.getStateCompletionPercentage(state.id);
            return `
              <div class="state-card ancient-panel" data-id="${state.id}">
                <div class="state-card-image-wrap">
                  <img src="${state.heroImage}" alt="${escapeHTML(state.name)} heritage" class="state-card-img" loading="lazy" />
                  <div class="card-gradient-overlay"></div>
                  <span class="region-tag">${state.region}</span>
                  <div class="state-badge-pill">${state.badge}</div>
                </div>

                <div class="state-card-body">
                  <div class="state-name-row">
                    <h3 class="state-name">${state.name}${isUT(state) ? ' <span class="ut-pill">UT</span>' : ''}</h3>
                    <span class="state-capital">🏛️ ${state.capital}</span>
                  </div>
                  <p class="state-tagline">${state.tagline}</p>

                  <div class="state-card-footer">
                    <div class="completion-mini-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${completionPct}" aria-label="${escapeHTML(state.name)} explored">
                      <div class="mini-bar-track">
                        <div class="mini-bar-fill" style="width: ${completionPct}%"></div>
                      </div>
                      <span class="mini-bar-text">${completionPct}% Explored</span>
                    </div>

                    <button class="btn-ancient btn-gold btn-sm btn-open-state" data-id="${state.id}" aria-label="Explore the 5 categories of ${escapeHTML(state.name)}">
                      ${completionPct === 100 ? '🛂 ' : ''}Explore 5 Categories →
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('') : `
            <div class="empty-results-box ancient-panel">
              <span class="empty-icon">📜</span>
              <h3>No States Found</h3>
              <p>No states matched your query "${escapeHTML(this.searchQuery)}". Try searching for another name or reset filters.</p>
              <button class="btn-ancient btn-gold" id="btn-reset-filters">Reset All Filters</button>
            </div>
          `}
        </div>

        <!-- State Detail Modal (5 Categories View) -->
        <div class="state-modal-overlay hidden" id="state-detail-modal">
          <div class="state-modal-content ancient-panel" id="modal-content-container" role="dialog" aria-modal="true" aria-labelledby="state-modal-title">
            <!-- Modal Body populated when state clicked -->
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();

    // If initial selectedStateId provided, open it immediately
    if (this.selectedStateId) {
      this.openStateDetail(this.selectedStateId);
    }
  }

  getFilteredList() {
    let list = INDIAN_STATES;
    if (this.activeFilter === 'UT') {
      list = INDIAN_STATES.filter(isUT);
    } else if (this.activeFilter && this.activeFilter !== 'All') {
      list = getStatesByRegion(this.activeFilter);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.capital.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.badge.toLowerCase().includes(q) ||
        s.history.title.toLowerCase().includes(q) ||
        s.games.title.toLowerCase().includes(q) ||
        s.architecture.monumentName.toLowerCase().includes(q) ||
        s.festivals.title.toLowerCase().includes(q) ||
        s.culture.title.toLowerCase().includes(q)
      );
    }
    return list;
  }

  attachEventListeners() {
    // Search input
    const searchInput = this.container.querySelector('#state-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const caret = e.target.selectionStart;
        this.render();
        // Re-rendering replaces the input; keep focus and caret so typing is uninterrupted
        const again = this.container.querySelector('#state-search-input');
        if (again) {
          again.focus();
          try { again.setSelectionRange(caret, caret); } catch (err) { /* ignore */ }
        }
      });
    }

    const btnClearSearch = this.container.querySelector('#btn-clear-search');
    if (btnClearSearch) {
      btnClearSearch.addEventListener('click', () => {
        this.searchQuery = '';
        this.render();
      });
    }

    // Region chips
    const regionChips = this.container.querySelectorAll('.region-chip');
    regionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        soundSynth.playClick();
        this.activeFilter = chip.dataset.region;
        this.render();
      });
    });

    // Reset filters
    const btnReset = this.container.querySelector('#btn-reset-filters');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.searchQuery = '';
        this.activeFilter = 'All';
        this.render();
      });
    }

    // State card clicks
    const stateCards = this.container.querySelectorAll('.state-card');
    stateCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.dataset.id;
        if (id) {
          this.lastFocus = card.querySelector('.btn-open-state');
          soundSynth.playBell();
          this.openStateDetail(id);
        }
      });
    });
  }

  openStateDetail(stateId) {
    const state = getStateById(stateId);
    if (!state) return;

    this.selectedStateId = stateId;
    soundSynth.playRegionalMotif(state.region);
    if (window.appRouter && window.appRouter.writeHash) window.appRouter.writeHash('states-directory', { stateId }, true);
    const festTheme = getFestivalTheme(state.id);
    const modal = this.container.querySelector('#state-detail-modal');
    const modalContent = this.container.querySelector('#modal-content-container');
    if (!modal || !modalContent) return;

    const categories = [
      {
        key: 'history',
        num: '01',
        title: 'History & Civilization',
        desc: state.history.highlights,
        icon: '📜',
        image: state.photos.history,
        rewardPts: state.history.points,
        rewardText: state.history.artifact ? state.history.artifact.name : 'Chola Inscription Badge'
      },
      {
        key: 'games',
        num: '02',
        title: 'Forgotten Traditional Games',
        desc: `${state.games.title} — ${state.games.origin}. ${state.games.rules[0]}`,
        icon: '🎲',
        image: state.photos.games,
        rewardPts: state.games.points,
        rewardText: `Play: ${describeGame(state.id)}`
      },
      {
        key: 'architecture',
        num: '03',
        title: 'Architectural Wonders',
        desc: `${state.architecture.title}: ${state.architecture.marvelDetails}`,
        icon: '🏛️',
        image: state.photos.architecture,
        rewardPts: state.architecture.points,
        rewardText: 'Vimana Master Architect Badge'
      },
      {
        key: 'festivals',
        num: '04',
        title: 'Festivals & Celebrations',
        desc: `${state.festivals.title} (${state.festivals.season}). ${state.festivals.rituals}`,
        icon: '🪔',
        image: state.photos.festivals,
        rewardPts: state.festivals.points,
        rewardText: festTheme.kind === 'rhythm' ? `Rhythm: ${festTheme.instrument}` : `Build: ${festTheme.heading.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}`
      },
      {
        key: 'culture',
        num: '05',
        title: 'Regional Cultures',
        desc: `${state.culture.title}. ${state.culture.dance}. ${state.culture.handicrafts}`,
        icon: '🎭',
        image: state.photos.culture,
        rewardPts: state.culture.points,
        rewardText: 'Watch all slides to complete'
      }
    ];

    modalContent.innerHTML = `
      <div class="state-modal-layout">
        <aside class="state-modal-sidebar">
          <div class="state-modal-header">
            <div class="header-titles">
              <span class="region-pill">${isUT(state) ? 'Union Territory • ' : ''}${state.region} India</span>
              <h2 id="state-modal-title">${escapeHTML(state.name)}</h2>
              <p class="state-modal-capital">Capital · ${escapeHTML(state.capital)}</p>
              <p class="header-tagline">${state.tagline}</p>
            </div>
            <button class="modal-close-btn" id="btn-close-state-modal" aria-label="Close ${escapeHTML(state.name)}">✖</button>
          </div>
          <div class="modal-instruction-banner">
            <span>✦</span>
            <div><strong>Choose an experience</strong><br />Explore five cultural stories, games and traditions from this region.</div>
          </div>
          <div class="state-filter-summary">
            <span class="state-filter-label">REGION FILTER</span>
            <span class="state-filter-value">${isUT(state) ? 'Union Territories' : state.region + ' India'}</span>
            <span class="state-filter-label">EXPERIENCES</span>
            <span class="state-filter-value">05 cultural cards</span>
          </div>
        </aside>

        <div class="state-modal-body">
          <div class="category-cards-grid">
          ${categories.map(cat => {
            const isCompleted = gameState.isActivityCompleted(state.id, cat.key);
            return `
              <div class="category-detail-card ancient-panel ${isCompleted ? 'completed' : ''}" data-key="${cat.key}">
                <div class="cat-card-img-wrap">
                  <img src="${cat.image}" alt="" class="cat-img" loading="lazy" />
                  <span class="cat-num-pill">${cat.num}</span>
                  <div class="cat-status-badge">
                    ${isCompleted ? '✓ Completed' : '▶ Available'}
                  </div>
                </div>

                <div class="cat-card-content">
                  <div class="cat-title-row">
                    <span class="cat-icon">${cat.icon}</span>
                    <h4 class="cat-title">${cat.title}</h4>
                  </div>
                  <p class="cat-description">${cat.desc}</p>

                  <div class="cat-reward-indicator">
                    <span class="reward-points">+${cat.rewardPts} CDP</span>
                    <span class="reward-item">🎁 ${cat.rewardText}</span>
                  </div>

                  <button class="btn-ancient btn-gold btn-block btn-launch-category" data-category="${cat.key}" aria-label="${isCompleted ? 'Replay' : 'Play'} ${escapeHTML(cat.title)} in ${escapeHTML(state.name)}">
                    ${isCompleted ? 'Replay Experience ↺' : 'Explore & Play →'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      </div>
    `;

    modal.classList.remove('hidden');

    // Close button
    const btnClose = modalContent.querySelector('#btn-close-state-modal');
    if (btnClose) {
      btnClose.focus({ preventScroll: true });
      btnClose.addEventListener('click', () => {
        soundSynth.playClick();
        this.closeStateDetail();
      });
    }
    modal.onclick = (e) => { if (e.target === modal) this.closeStateDetail(); };

    // Launch category buttons
    const launchBtns = modalContent.querySelectorAll('.btn-launch-category, .category-detail-card');
    launchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const catKey = btn.dataset.category || btn.closest('.category-detail-card').dataset.key;
        if (catKey) {
          soundSynth.playBell();
          modal.classList.add('hidden');
          if (window.appRouter) {
            window.appRouter.launchCategoryGame(state.id, catKey);
          }
        }
      });
    });
  }
}
