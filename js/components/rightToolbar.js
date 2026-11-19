// js/components/rightToolbar.js
// DISCOVER INDIA: Right-Side Persistent Vertical Toolbar

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';

export class RightToolbar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isCollapsed = false;
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <aside class="right-vertical-toolbar ${this.isCollapsed ? 'collapsed' : ''}" id="right-vertical-toolbar">
        <!-- Collapse / Expand Toggle Button -->
        <button class="toolbar-collapse-toggle" id="btn-toggle-toolbar" title="Toggle Navigation Bar">
          <span class="toggle-icon">${this.isCollapsed ? '◀' : '▶'}</span>
        </button>

        <!-- Current Points Pill -->
        <div class="toolbar-points-indicator" title="Cultural Discovery Points">
          <span class="pts-icon">🪙</span>
          <span class="pts-text" id="toolbar-cdp-display">${gameState.state.points} CDP</span>
        </div>

        <!-- 8 Mandatory Navigation Items -->
        <nav class="toolbar-nav-list">
          <!-- 1. Home -->
          <button class="toolbar-btn ${gameState.state.currentView === 'landing' ? 'active' : ''}" data-nav="landing" title="Home: Return to Landing Page">
            <span class="toolbar-icon">🏛️</span>
            <span class="toolbar-label">Home</span>
          </button>

          <!-- 2. Explore India -->
          <button class="toolbar-btn ${gameState.state.currentView === 'states-directory' ? 'active' : ''}" data-nav="states-directory" title="Explore India: All 28 States">
            <span class="toolbar-icon">🗺️</span>
            <span class="toolbar-label">Explore India</span>
          </button>

          <!-- 3. Storyboard -->
          <button class="toolbar-btn ${gameState.state.currentView === 'storyboard' ? 'active' : ''}" data-nav="storyboard" title="Storyboard: 5 Cultural Categories">
            <span class="toolbar-icon">📜</span>
            <span class="toolbar-label">Storyboard</span>
          </button>

          <!-- 4. My Journey -->
          <button class="toolbar-btn ${gameState.state.currentView === 'journey' ? 'active' : ''}" data-nav="journey" title="My Journey: Completed & Locked Levels">
            <span class="toolbar-icon">🧭</span>
            <span class="toolbar-label">My Journey</span>
          </button>

          <!-- 5. Rewards -->
          <button class="toolbar-btn ${gameState.state.currentView === 'rewards' ? 'active' : ''}" data-nav="rewards" title="Rewards: Badges & Artifacts">
            <span class="toolbar-icon">🏆</span>
            <span class="toolbar-label">Rewards</span>
          </button>

          <!-- 6. Avatar -->
          <button class="toolbar-btn ${gameState.state.currentView === 'avatar-customizer' ? 'active' : ''}" data-nav="avatar-customizer" title="Avatar: Customize Explorer">
            <span class="toolbar-icon">👤</span>
            <span class="toolbar-label">Avatar</span>
          </button>

          <!-- 7. Settings -->
          <button class="toolbar-btn" id="btn-open-settings" title="Settings: Audio & Preferences">
            <span class="toolbar-icon">⚙️</span>
            <span class="toolbar-label">Settings</span>
          </button>

          <!-- 8. Help -->
          <button class="toolbar-btn" id="btn-open-help" title="Help: Guidance & Instructions">
            <span class="toolbar-icon">❓</span>
            <span class="toolbar-label">Help</span>
          </button>
        </nav>

        <!-- Quick Explorer Avatar Pill -->
        <div class="toolbar-avatar-preview" id="toolbar-avatar-preview" title="Your Explorer: ${gameState.state.avatar.name || 'Explorer'}">
          <span class="avatar-mini-icon">👳</span>
          <span class="avatar-mini-name">${gameState.state.avatar.name || 'Explorer'}</span>
        </div>
      </aside>

      <!-- Settings Modal -->
      <div class="settings-modal-overlay hidden" id="settings-modal">
        <div class="settings-card ancient-panel">
          <div class="settings-header">
            <h3>⚙️ Preferences & Settings</h3>
            <button class="btn-close-sm" id="btn-close-settings">✖</button>
          </div>
          <div class="settings-body">
            <div class="setting-row">
              <div>
                <h4>Sound Effects (Web Audio)</h4>
                <p>Play traditional bell chimes, wooden clacks, and victory fanfares.</p>
              </div>
              <input type="checkbox" id="setting-sound-toggle" checked />
            </div>
            <div class="setting-row">
              <div>
                <h4>Reset Saved Progress</h4>
                <p>Clear all earned points and start your cultural expedition anew.</p>
              </div>
              <button class="btn-ancient btn-terracotta btn-sm" id="btn-reset-data">Reset Progress</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Help Modal -->
      <div class="help-modal-overlay hidden" id="help-modal">
        <div class="help-card ancient-panel">
          <div class="help-header">
            <h3>❓ Explorer Guidance & Help</h3>
            <button class="btn-close-sm" id="btn-close-help">✖</button>
          </div>
          <div class="help-body">
            <h4>Welcome to DISCOVER INDIA!</h4>
            <p><strong>1. Interactive Storyboard:</strong> Follow the curved trail from Left to Right across 5 categories.</p>
            <p><strong>2. All 28 States:</strong> Search, filter by region (South, West, North, East, Northeast, Central), and discover their 5 cultural categories.</p>
            <p><strong>3. Demo Mode First:</strong> Every mini-game starts in Demo Mode to show rules, controls, and scoring before you play.</p>
            <p><strong>4. Playable Mini-Games:</strong>
              <br>• History: Pixel-art top-down adventure and inscription deciphering.
              <br>• Games: Playable Pallanguzhi (mancala) on a 14-pit board.
              <br>• Architecture: Pixelated monument reconstruction.
              <br>• Festivals: Interactive sacred Pookalam mandala design.
              <br>• Traditions: Auto-advancing slideshow with 5-second pacing.
            </p>
            <p><strong>5. Cultural Points & Certificate:</strong> Complete activities to earn CDP, unlock 5 levels, and generate your printable Certificate!</p>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Navigation items
    const navBtns = this.container.querySelectorAll('[data-nav]');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundSynth.playClick();
        const route = btn.dataset.nav;
        if (window.appRouter) {
          window.appRouter.navigate(route);
        }
      });
    });

    // Collapse toggle
    const toggleBtn = this.container.querySelector('#btn-toggle-toolbar');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        soundSynth.playClick();
        this.isCollapsed = !this.isCollapsed;
        this.render();
      });
    }

    // Settings Modal
    const btnSettings = this.container.querySelector('#btn-open-settings');
    const modalSettings = this.container.querySelector('#settings-modal');
    const btnCloseSettings = this.container.querySelector('#btn-close-settings');
    const soundToggle = this.container.querySelector('#setting-sound-toggle');
    const btnResetData = this.container.querySelector('#btn-reset-data');

    if (btnSettings && modalSettings) {
      btnSettings.addEventListener('click', () => {
        soundSynth.playClick();
        modalSettings.classList.remove('hidden');
      });
    }

    if (btnCloseSettings && modalSettings) {
      btnCloseSettings.addEventListener('click', () => {
        soundSynth.playClick();
        modalSettings.classList.add('hidden');
      });
    }

    if (soundToggle) {
      soundToggle.addEventListener('change', (e) => {
        soundSynth.toggleSound(e.target.checked);
      });
    }

    if (btnResetData) {
      btnResetData.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all progress and points?')) {
          gameState.resetProgress();
          soundSynth.playClick();
          location.reload();
        }
      });
    }

    // Help Modal
    const btnHelp = this.container.querySelector('#btn-open-help');
    const modalHelp = this.container.querySelector('#help-modal');
    const btnCloseHelp = this.container.querySelector('#btn-close-help');

    if (btnHelp && modalHelp) {
      btnHelp.addEventListener('click', () => {
        soundSynth.playClick();
        modalHelp.classList.remove('hidden');
      });
    }

    if (btnCloseHelp && modalHelp) {
      btnCloseHelp.addEventListener('click', () => {
        soundSynth.playClick();
        modalHelp.classList.add('hidden');
      });
    }

    // Subscribe to gameState to keep points display updated
    gameState.subscribe(state => {
      const cdpDisplay = this.container.querySelector('#toolbar-cdp-display');
      if (cdpDisplay) cdpDisplay.textContent = `${state.points} CDP`;
      const nameDisplay = this.container.querySelector('.avatar-mini-name');
      if (nameDisplay) nameDisplay.textContent = state.avatar.name || 'Explorer';
    });
  }
}
