// js/components/rightToolbar.js
// ITIHASAM: Right-Side Persistent Vertical Toolbar, Settings & Help

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { t, escapeHTML, LANGUAGES, getLanguage, setLanguage } from '../i18n.js';

const NAV_ITEMS = [
  { route: 'start', icon: '🎮', key: 'navStart', match: ['start'] },
  { route: 'landing', icon: '🏛️', key: 'navHome', match: ['landing'] },
  { route: 'india-map', icon: '🗺️', key: 'navMap', match: ['india-map'] },
  { route: 'states-directory', icon: '🧭', key: 'navExplore', match: ['states-directory', 'state-detail', 'game-view', 'slideshow'] },
  { route: 'daily', icon: '🔥', key: 'navDaily', match: ['daily'] },
  { route: 'timeline', icon: '⏳', key: 'navTimeline', match: ['timeline'] },
  { route: 'passport', icon: '🛂', key: 'navPassport', match: ['passport'] },
  { route: 'journey', icon: '📜', key: 'navJourney', match: ['journey'] },
  { route: 'rewards', icon: '🏆', key: 'navRewards', match: ['rewards', 'certificate'] },
  { route: 'leaderboard', icon: '👥', key: 'navLeaderboard', match: ['leaderboard'] },
  { route: 'avatar-customizer', icon: '👤', key: 'navAvatar', match: ['avatar-customizer'] },
  { route: 'impact', icon: '🌱', key: 'navImpact', match: ['impact'] }
];

export class RightToolbar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isCollapsed = window.innerWidth < 768;
    this.openModal = null;
    this.lastFocus = null;

    // One subscription for the toolbar's lifetime (render() runs on every navigation)
    gameState.subscribe(state => {
      const cdp = this.container && this.container.querySelector('#toolbar-cdp-display');
      if (cdp) cdp.textContent = `${state.points} CDP`;
      const nameEl = this.container && this.container.querySelector('.avatar-mini-name');
      if (nameEl) nameEl.textContent = state.avatar.name || 'Explorer';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.openModal) this.closeModal();
    });
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;
    const view = window.appRouter ? window.appRouter.currentView : gameState.state.currentView;
    const s = gameState.state;
    const canInstall = !!window.__itihasamInstallPrompt;

    this.container.innerHTML = `
      <aside class="right-vertical-toolbar ${this.isCollapsed ? 'collapsed' : ''}" id="right-vertical-toolbar" aria-label="Main navigation">
        <button class="toolbar-collapse-toggle" id="btn-toggle-toolbar" aria-expanded="${!this.isCollapsed}" aria-controls="toolbar-nav" title="${t('toggleNav')}">
          <span class="toggle-icon" aria-hidden="true">${this.isCollapsed ? '◀' : '▶'}</span>
          <span class="sr-only">${t('toggleNav')}</span>
        </button>

        <div class="toolbar-points-indicator" title="Cultural Discovery Points">
          <span class="pts-icon" aria-hidden="true">🪙</span>
          <span class="pts-text" id="toolbar-cdp-display">${s.points} CDP</span>
        </div>

        <nav class="toolbar-nav-list" id="toolbar-nav">
          ${NAV_ITEMS.map(item => {
            const active = item.match.includes(view);
            return `
              <button class="toolbar-btn ${active ? 'active' : ''}" data-nav="${item.route}" title="${t(item.key)}" ${active ? 'aria-current="page"' : ''}>
                <span class="toolbar-icon" aria-hidden="true">${item.icon}</span>
                <span class="toolbar-label">${t(item.key)}</span>
              </button>`;
          }).join('')}

          <button class="toolbar-btn" id="btn-open-settings" title="${t('navSettings')}" aria-haspopup="dialog">
            <span class="toolbar-icon" aria-hidden="true">⚙️</span>
            <span class="toolbar-label">${t('navSettings')}</span>
          </button>
          <button class="toolbar-btn" id="btn-open-help" title="${t('navHelp')}" aria-haspopup="dialog">
            <span class="toolbar-icon" aria-hidden="true">❓</span>
            <span class="toolbar-label">${t('navHelp')}</span>
          </button>
        </nav>

        <button class="toolbar-avatar-preview" id="toolbar-avatar-preview" title="Switch explorer (Class Mode)">
          <span class="avatar-mini-icon" aria-hidden="true">👳</span>
          <span class="avatar-mini-name">${escapeHTML(s.avatar.name || 'Explorer')}</span>
        </button>
      </aside>

      <!-- Settings Modal -->
      <div class="settings-modal-overlay hidden" id="settings-modal">
        <div class="settings-card ancient-panel" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <div class="settings-header">
            <h3 id="settings-title">⚙️ ${t('settingsTitle')}</h3>
            <button class="btn-close-sm" id="btn-close-settings" aria-label="${t('close')}">✖</button>
          </div>
          <div class="settings-body">
            <div class="setting-row">
              <div><h4><label for="setting-language">${t('language')}</label></h4><p>English · हिन्दी · தமிழ்</p></div>
              <select id="setting-language" class="ancient-input">
                ${LANGUAGES.map(l => `<option value="${l.code}" ${getLanguage() === l.code ? 'selected' : ''}>${l.label}</option>`).join('')}
              </select>
            </div>
            ${this.toggleRow('setting-sound-toggle', t('soundEffects'), t('soundDesc'), s.soundEnabled !== false)}
            ${this.toggleRow('setting-music-toggle', t('music'), t('musicDesc'), !!s.musicEnabled)}
            ${this.toggleRow('setting-contrast-toggle', t('highContrast'), t('highContrastDesc'), !!s.highContrast)}
            ${this.toggleRow('setting-motion-toggle', t('reducedMotion'), t('reducedMotionDesc'), !!s.reducedMotion)}
            ${canInstall ? `
            <div class="setting-row">
              <div><h4>${t('install')}</h4><p>${t('installDesc')}</p></div>
              <button class="btn-ancient btn-gold btn-sm" id="btn-install-app">⬇ ${t('install')}</button>
            </div>` : ''}
            <div class="setting-row">
              <div><h4>${t('resetProgress')}</h4><p>${t('resetDesc')}</p></div>
              <button class="btn-ancient btn-terracotta btn-sm" id="btn-reset-data">${t('resetProgress')}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Help Modal -->
      <div class="help-modal-overlay hidden" id="help-modal">
        <div class="help-card ancient-panel" role="dialog" aria-modal="true" aria-labelledby="help-title">
          <div class="help-header">
            <h3 id="help-title">❓ Explorer Guidance & Help</h3>
            <button class="btn-close-sm" id="btn-close-help" aria-label="${t('close')}">✖</button>
          </div>
          <div class="help-body">
            <h4>Welcome to ITIHASAM!</h4>
            <p><strong>1. India Map:</strong> Every state fills with gold as you finish its five experiences. Tap a state to begin.</p>
            <p><strong>2. Five experiences per state:</strong>
              <br>• History: walk the courtyard, meet historic figures, solve the inscription riddle.
              <br>• Games: each state has its own — Pallanguzhi, Chaupar / Pachisi, Bagh-Chal, or a folk sport (archery, kabaddi, gilli-danda, stilts, polo...).
              <br>• Architecture: rebuild the monument layer by layer.
              <br>• Festivals: build a Pookalam, Bathukamma or pandal, or keep the beat of the Bihu or Garba drum.
              <br>• Traditions: watch the slideshow to the end.
            </p>
            <p><strong>3. Demo first:</strong> every game shows a demo. Board games also offer <em>Pass & Play</em> for two players on one device.</p>
            <p><strong>4. Daily Quiz & Timeline:</strong> a new question each day (keep your streak!), and a chronology challenge.</p>
            <p><strong>5. Passport, rewards & certificate:</strong> earn stamps, badges, artifacts and a downloadable certificate with a QR code.</p>
            <p><strong>6. Class Mode:</strong> add several explorers on one device and compare them on the Class Board.</p>
            <p><strong>Keyboard:</strong> Tab / Shift+Tab to move, Enter or Space to choose, Esc to close dialogs. History quest: arrow keys / WASD + E.</p>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  toggleRow(id, title, desc, checked) {
    return `
      <div class="setting-row">
        <div><h4><label for="${id}">${title}</label></h4><p id="${id}-desc">${desc}</p></div>
        <input type="checkbox" class="setting-switch" id="${id}" role="switch" aria-describedby="${id}-desc" ${checked ? 'checked' : ''} />
      </div>`;
  }

  showModal(id, trigger) {
    const modal = this.container.querySelector(id);
    if (!modal) return;
    this.lastFocus = trigger || document.activeElement;
    modal.classList.remove('hidden');
    this.openModal = modal;
    const focusable = modal.querySelector('button, select, input');
    if (focusable) focusable.focus();
    modal.addEventListener('click', (e) => { if (e.target === modal) this.closeModal(); }, { once: true });
  }

  closeModal() {
    if (!this.openModal) return;
    this.openModal.classList.add('hidden');
    this.openModal = null;
    if (this.lastFocus && document.contains(this.lastFocus)) this.lastFocus.focus();
  }

  attachEventListeners() {
    this.container.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        soundSynth.playClick();
        if (window.innerWidth < 768) this.isCollapsed = true;
        if (window.appRouter) window.appRouter.navigate(btn.dataset.nav);
      });
    });

    const toggleBtn = this.container.querySelector('#btn-toggle-toolbar');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        soundSynth.playClick();
        this.isCollapsed = !this.isCollapsed;
        this.render();
        const again = this.container.querySelector('#btn-toggle-toolbar');
        if (again) again.focus();
      });
    }

    const avatarPill = this.container.querySelector('#toolbar-avatar-preview');
    if (avatarPill) avatarPill.addEventListener('click', () => window.appRouter && window.appRouter.navigate('leaderboard'));

    const btnSettings = this.container.querySelector('#btn-open-settings');
    if (btnSettings) btnSettings.addEventListener('click', () => { soundSynth.playClick(); this.showModal('#settings-modal', btnSettings); });
    const btnHelp = this.container.querySelector('#btn-open-help');
    if (btnHelp) btnHelp.addEventListener('click', () => { soundSynth.playClick(); this.showModal('#help-modal', btnHelp); });
    ['#btn-close-settings', '#btn-close-help'].forEach(id => {
      const b = this.container.querySelector(id);
      if (b) b.addEventListener('click', () => { soundSynth.playClick(); this.closeModal(); });
    });

    const lang = this.container.querySelector('#setting-language');
    if (lang) lang.addEventListener('change', () => {
      setLanguage(lang.value);
      gameState.setPreference('language', lang.value);
      this.openModal = null;
      if (window.appRouter) {
        const r = window.appRouter;
        r.navigate(r.currentView, { stateId: gameState.state.activeStateId, categoryKey: gameState.state.activeCategoryKey }, { replace: true });
      }
    });

    const bindToggle = (id, key, after) => {
      const el = this.container.querySelector(id);
      if (!el) return;
      el.addEventListener('change', () => {
        gameState.setPreference(key, el.checked);
        if (after) after(el.checked);
      });
    };
    bindToggle('#setting-sound-toggle', 'soundEnabled', on => { soundSynth.toggleSound(on); if (on) soundSynth.playBell(); });
    bindToggle('#setting-music-toggle', 'musicEnabled', on => { soundSynth.toggleMusic(on); if (on) soundSynth.playRegionalMotif('South'); });
    bindToggle('#setting-contrast-toggle', 'highContrast');
    bindToggle('#setting-motion-toggle', 'reducedMotion');

    const install = this.container.querySelector('#btn-install-app');
    if (install) install.addEventListener('click', async () => {
      const prompt = window.__itihasamInstallPrompt;
      if (!prompt) return;
      prompt.prompt();
      try { await prompt.userChoice; } catch (e) { /* ignore */ }
      window.__itihasamInstallPrompt = null;
      this.closeModal();
      this.render();
    });

    const btnResetData = this.container.querySelector('#btn-reset-data');
    if (btnResetData) {
      btnResetData.addEventListener('click', () => {
        if (confirm(`Reset all points and progress for ${gameState.state.avatar.name || 'this explorer'}? This cannot be undone.`)) {
          gameState.resetProgress();
          soundSynth.playClick();
          location.hash = '';
          location.reload();
        }
      });
    }
  }
}
