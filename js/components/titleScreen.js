// js/components/titleScreen.js
// ITIHASAM: Game-style title screen

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { escapeHTML } from '../i18n.js';

export class TitleScreen {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.selectedIndex = 1; // Default to 'NEW GAME'
    this.boundKeyHandler = this.handleKeyDown.bind(this);

    const hasProgress = gameState.hasProgress();
    this.hasProgress = hasProgress;
    this.selectedIndex = hasProgress ? 0 : 1; // Continue if there is a saved game, else New Game

    this.menuOptions = [
      {
        id: 'continue',
        label: hasProgress ? `CONTINUE (${gameState.state.points} CDP)` : 'CONTINUE',
        isDimmed: !hasProgress,
        isPrimary: false,
        action: () => hasProgress && this.launchAction('states-directory', { stateId: gameState.state.activeStateId })
      },
      {
        id: 'new-game',
        label: 'NEW GAME',
        isDimmed: false,
        isPrimary: true,
        action: () => this.launchAction('landing')
      },
      {
        id: 'explore-states',
        label: 'INDIA MAP',
        isDimmed: false,
        isPrimary: false,
        action: () => this.launchAction('india-map')
      },
      {
        id: 'customize-hero',
        label: 'CUSTOMIZE HERO',
        isDimmed: false,
        isPrimary: false,
        action: () => this.launchAction('avatar-customizer')
      },
      {
        id: 'daily',
        label: gameState.hasAnsweredDailyToday() ? 'DAILY QUIZ ✓' : 'DAILY QUIZ',
        isDimmed: false,
        isPrimary: false,
        action: () => this.launchAction('daily')
      },
      {
        id: 'settings',
        label: 'SETTINGS',
        isDimmed: false,
        isPrimary: false,
        action: () => this.openSettings()
      }
    ];
  }

  init() {
    this.render();
    this.attachEvents();
    this.spawnEmbers();
  }

  render() {
    if (!this.container) return;

    const avatarName = escapeHTML(gameState.state.avatar?.name || 'Explorer');
    const avatarEmoji = gameState.state.avatar?.archetype === 'scholar' ? '📜' :
                        gameState.state.avatar?.archetype === 'architect' ? '🏛️' :
                        gameState.state.avatar?.archetype === 'artisan' ? '🎨' : '👳';

    this.container.innerHTML = `
      <section class="title-start-wrap" id="title-start-screen" aria-label="Itihasam title screen">
        <!-- 1. Background Layers: Uploaded Indian Monuments Sunset Silhouette -->
        <div class="title-bg-layer" id="title-bg"></div>
        <div class="title-sky-glow"></div>
        <div class="title-ground-shadow"></div>

        <!-- Ambient Golden Dust / Sun Embers -->
        <div class="title-particles" id="title-particles"></div>

        <!-- 2. Main Stage Content -->
        <div class="title-stage-content">

          <!-- LEFT COLUMN: Game Title Logo & Foreground Explorer Mascot -->
          <div class="title-left-column">

            <!-- Game Logo: ITIHASAM (Medieval Font Style, Chunky 3D Outline) -->
            <div class="itihasam-logo-container">
              <!-- Golden Crest Ornament perched atop the Title -->
              <div class="logo-crest-ornament">
                <svg width="44" height="34" viewBox="0 0 54 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Crown / Kalash Motif -->
                  <path d="M 6 34 L 14 12 L 27 22 L 40 12 L 48 34 Z" fill="#FFC83B" stroke="#1A0D00" stroke-width="4" stroke-linejoin="round"/>
                  <circle cx="14" cy="10" r="4" fill="#FF4757" stroke="#1A0D00" stroke-width="2"/>
                  <circle cx="27" cy="8" r="5" fill="#2ED573" stroke="#1A0D00" stroke-width="2"/>
                  <circle cx="40" cy="10" r="4" fill="#1E90FF" stroke="#1A0D00" stroke-width="2"/>
                  <ellipse cx="27" cy="30" rx="6" ry="3" fill="#FFFFFF" opacity="0.6"/>
                </svg>
              </div>

              <!-- Main Game Title Text -->
              <h1 class="itihasam-title-text" title="ITIHASAM — An Epic Indian Cultural Chronicle">
                ITIHASAM
              </h1>

              <!-- Capsule Subtitle Pill -->
              <div class="logo-tagline-pill">
                <span class="logo-tagline-text">★ 28 STATES · 8 UTs ★</span>
              </div>
            </div>

            <!-- Foreground Explorer Character standing on viewpoint gazing at the Taj & Sunset -->
            <div class="start-mascot-wrapper" title="Your Explorer: ${avatarName}">
              <div class="explorer-viewpoint-perch">
                <svg class="explorer-character-svg" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                  <!-- Cute Hero Explorer Seen From Behind / Three-Quarter Angle -->
                  <defs>
                    <radialGradient id="turbanGrad" cx="45%" cy="35%" r="60%">
                      <stop offset="0%" stop-color="#FF9F43" />
                      <stop offset="70%" stop-color="#EE5253" />
                      <stop offset="100%" stop-color="#1A0C00" />
                    </radialGradient>
                    <linearGradient id="tunicGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#48DBFB" />
                      <stop offset="100%" stop-color="#0ABDE3" />
                    </linearGradient>
                    <linearGradient id="backpackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#835738" />
                      <stop offset="100%" stop-color="#4D2E17" />
                    </linearGradient>
                  </defs>

                  <!-- Backpack -->
                  <rect x="26" y="52" width="48" height="42" rx="10" fill="url(#backpackGrad)" stroke="#1A0D00" stroke-width="4"/>
                  <rect x="34" y="60" width="32" height="12" rx="4" fill="#A0724C" stroke="#1A0D00" stroke-width="2"/>
                  <!-- Bedroll attached to backpack top -->
                  <rect x="22" y="44" width="56" height="14" rx="7" fill="#Feca57" stroke="#1A0D00" stroke-width="3"/>

                  <!-- Body / Tunic (back view) -->
                  <path d="M 28 54 Q 50 48 72 54 L 76 96 Q 50 102 24 96 Z" fill="url(#tunicGrad)" stroke="#1A0D00" stroke-width="4" stroke-linejoin="round"/>

                  <!-- Little legs / boots standing on ledge -->
                  <rect x="32" y="94" width="14" height="16" rx="6" fill="#3D2614" stroke="#1A0D00" stroke-width="3"/>
                  <rect x="54" y="94" width="14" height="16" rx="6" fill="#3D2614" stroke="#1A0D00" stroke-width="3"/>

                  <!-- Head / Turban with Kalgi feather -->
                  <circle cx="50" cy="34" r="22" fill="url(#turbanGrad)" stroke="#1A0D00" stroke-width="4"/>
                  <!-- Turban folds -->
                  <path d="M 32 30 Q 50 42 68 30" fill="none" stroke="#C44569" stroke-width="3" stroke-linecap="round"/>
                  <path d="M 34 38 Q 50 48 66 38" fill="none" stroke="#C44569" stroke-width="2.5" stroke-linecap="round"/>
                  <!-- Golden Kalgi brooch and feather on turban -->
                  <circle cx="42" cy="20" r="4" fill="#FFD700" stroke="#1A0D00" stroke-width="1.5"/>
                  <path d="M 42 16 Q 38 6 32 4 Q 38 12 40 18 Z" fill="#2ED573" stroke="#1A0D00" stroke-width="1.5"/>
                </svg>

                <div class="explorer-stone-platform"></div>
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: Vertical Wooden Signpost Menu with Rounded Pill Buttons -->
          <div class="title-right-column">
            <div class="wooden-signpost-board" role="menu" aria-label="Main menu">

              <!-- Little green sprout / leaf at top of signpost (matching reference) -->
              <svg class="signpost-top-sprout" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M 16 30 C 16 18 10 10 2 12 C 4 20 12 28 16 30 Z" fill="#2ED573" stroke="#1B4D2B" stroke-width="2"/>
                <path d="M 16 26 C 20 18 24 14 30 16 C 30 22 22 26 16 26 Z" fill="#10AC84" stroke="#1B4D2B" stroke-width="2"/>
              </svg>

              <!-- Pill Buttons Stack -->
              ${this.menuOptions.map((opt, idx) => `
                <button
                  class="switch-pill-btn ${opt.isDimmed ? 'btn-dimmed' : ''} ${opt.isPrimary ? 'btn-primary' : ''} ${idx === this.selectedIndex ? 'selected' : ''}"
                  data-index="${idx}"
                  id="btn-menu-${opt.id}"
                  role="menuitem"
                  ${opt.isDimmed ? 'aria-disabled="true"' : ''}
                >
                  ${opt.label}
                </button>
              `).join('')}

              <!-- Bottom Post Extension -->
              <div class="signpost-ground-post"></div>
            </div>
          </div>

        </div>

        <!-- 3. Bottom Utility Bar: Circular Profile Badge & Controller Hints -->
        <div class="title-bottom-bar">
          <!-- Circular Profile Badge (Echoing the circular bottom-left icon in reference) -->
          <div class="circular-profile-badge" id="btn-circular-profile" title="Explorer: ${avatarName} — customize avatar" role="button" tabindex="0" aria-label="Customize your explorer, ${avatarName}">
            <span class="profile-avatar-emoji">${avatarEmoji}</span>
          </div>

          <!-- Controller-style button hints -->
          <div class="switch-control-hints">
            <div class="control-hint-item">
              <span class="switch-key-circle">▲</span>
              <span class="switch-key-circle">▼</span>
              <span>NAVIGATE</span>
            </div>
            <div class="control-hint-item">
              <span class="switch-key-circle">A</span>
              <span>SELECT</span>
            </div>
            <div class="control-hint-item">
              <span class="switch-key-circle">+</span>
              <span>START</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  attachEvents() {
    window.addEventListener('keydown', this.boundKeyHandler);

    // Pill Buttons Hover & Click
    const buttons = this.container.querySelectorAll('.switch-pill-btn');
    buttons.forEach((btn, idx) => {
      btn.addEventListener('mouseenter', () => {
        if (this.selectedIndex !== idx) {
          this.selectedIndex = idx;
          this.updateSelectionVisuals();
          soundSynth.playMenuMove();
        }
      });

      btn.addEventListener('click', () => {
        this.selectedIndex = idx;
        this.updateSelectionVisuals();
        this.confirmSelection();
      });
    });

    // Profile icon click
    const btnProfile = this.container.querySelector('#btn-circular-profile');
    if (btnProfile) {
      btnProfile.addEventListener('click', () => {
        soundSynth.playClick();
        this.launchAction('avatar-customizer');
      });
    }
  }

  handleKeyDown(e) {
    // Ignore keys meant for an open dialog, a form field, or a focused control
    // outside the menu (for example the toolbar or the settings window)
    const t = e.target;
    if (document.querySelector('.settings-modal-overlay:not(.hidden), .help-modal-overlay:not(.hidden)')) return;
    if (t && /input|select|textarea/i.test(t.tagName)) return;
    if (t && t.closest && (t.closest('button, a, [role="button"]')) && !t.closest('#title-start-screen')) return;
    if (t && t.id === 'btn-circular-profile' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this.launchAction('avatar-customizer'); return; }
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.menuOptions.length) % this.menuOptions.length;
      this.updateSelectionVisuals();
      soundSynth.playMenuMove();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.menuOptions.length;
      this.updateSelectionVisuals();
      soundSynth.playMenuMove();
    } else if (e.key === 'Enter' || e.key === ' ' || e.key === '+') {
      e.preventDefault();
      this.confirmSelection();
    }
  }

  updateSelectionVisuals() {
    const buttons = this.container.querySelectorAll('.switch-pill-btn');
    buttons.forEach((btn, idx) => {
      if (idx === this.selectedIndex) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
  }

  confirmSelection() {
    const selected = this.menuOptions[this.selectedIndex];
    if (selected && selected.isDimmed) { soundSynth.playClack(); return; }
    if (selected && typeof selected.action === 'function') {
      soundSynth.playStartFanfare();
      const wrap = this.container.querySelector('#title-start-screen');
      if (wrap) wrap.classList.add('launching');
      setTimeout(() => {
        selected.action();
      }, document.body.classList.contains('reduced-motion') ? 0 : 550);
    }
  }

  launchAction(viewName, params = {}) {
    if (window.appRouter) {
      window.appRouter.navigate(viewName, params);
    }
  }

  openSettings() {
    // If toolbar settings modal is present, trigger it, or navigate to settings
    const settingsBtn = document.getElementById('btn-open-settings');
    if (settingsBtn) {
      settingsBtn.click();
    } else {
      this.launchAction('rewards');
    }
  }

  spawnEmbers() {
    const container = this.container.querySelector('#title-particles');
    if (!container || document.body.classList.contains('reduced-motion')) return;

    for (let i = 0; i < 22; i++) {
      const ember = document.createElement('div');
      ember.className = 'golden-ember';
      const size = Math.random() * 3.5 + 2;
      ember.style.width = `${size}px`;
      ember.style.height = `${size}px`;
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.animationDuration = `${Math.random() * 6 + 6}s`;
      ember.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(ember);
    }
  }

  destroy() {
    window.removeEventListener('keydown', this.boundKeyHandler);
  }
}
