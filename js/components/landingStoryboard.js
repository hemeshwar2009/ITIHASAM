// js/components/landingStoryboard.js
// ITIHASAM: Landing Page, Curved Storyboard Journey & Opposing Pointer Parallax

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { t, escapeHTML } from '../i18n.js';
import { getStateById } from '../data/statesData.js';

export class LandingStoryboard {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.boundPointerMove = this.handlePointerMove.bind(this);
    this.boundTouchMove = this.handleTouchMove.bind(this);
    this.rafId = null;
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;
  }

  init() {
    this.render();
    this.setupOpposingPointerParallax();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="landing-hero-section">
        <!-- Heritage Collage Background with Ancient White Overlay -->
        <div class="heritage-collage-bg">
          <div class="collage-item c-taj" style="background-image: url('assets/img/photos/1564507592333-c60657eea523-w1200.jpg')"></div>
          <div class="collage-item c-brihadeeswarar" style="background-image: url('assets/img/photos/1582510003544-4d00b7f74220-w1200.jpg')"></div>
          <div class="collage-item c-hampi" style="background-image: url('assets/img/heritage-placeholder.svg')"></div>
          <div class="collage-item c-dance" style="background-image: url('assets/img/photos/1547153760-18fc86324498-w1200.jpg')"></div>
          <div class="collage-item c-fort" style="background-image: url('assets/img/photos/1599661046289-e31897846e41-w1200.jpg')"></div>
          <div class="collage-item c-boat" style="background-image: url('assets/img/photos/1602216056096-3b40cc0c9944-w1200.jpg')"></div>

          <!-- Subtle Ancient-White Parchment Overlay -->
          <div class="ancient-white-overlay"></div>
          <div class="mandala-faint-bg"></div>
        </div>

        <!-- Main Landing Content -->
        <div class="landing-content-wrap">
          <div class="landing-header-block">
            <div class="heritage-top-motif">❦ ══ •⊰ ॐ ⊱• ══ ❦</div>
            <h1 class="main-title">${t('appName')}</h1>
            <p class="title-meaning">इतिहासम् · <em>itihāsa</em> — "thus indeed it happened"</p>
            <h2 class="sub-title">${t('tagline')}</h2>
            <p class="supporting-text">${t('heroText')}</p>
            ${this.continueCard()}
            <div class="quick-cta-row">
              <button class="btn-ancient btn-gold" id="btn-hero-map">🗺️ ${t('openMap')}</button>
              <button class="btn-ancient btn-secondary" id="btn-hero-explore">🏛️ ${t('exploreStates')}</button>
              <button class="btn-ancient btn-terracotta" id="btn-hero-avatar">👤 ${t('customizeExplorer')}</button>
            </div>
            <div class="landing-quick-links">
              <button class="quick-link-chip" data-go="daily">🔥 ${t('navDaily')}${gameState.hasAnsweredDailyToday() ? ' ✓' : ''}</button>
              <button class="quick-link-chip" data-go="timeline">⏳ ${t('navTimeline')}</button>
              <button class="quick-link-chip" data-go="passport">🛂 ${t('navPassport')} (${gameState.countStamps()}/28)</button>
              <button class="quick-link-chip" data-go="impact">🌱 ${t('navImpact')}</button>
            </div>
          </div>

          <!-- Winding Historical Journey / Curved Storyboard Pathway (Left to Right) -->
          <div class="storyboard-journey-container" id="storyboard-container">
            <div class="journey-section-title">
              <span class="journey-icon">🗺️</span>
              <h3>THE ANCIENT TREASURE MAP</h3>
              <p>Follow the 5 interconnected cultural milestones from Left to Right</p>
            </div>

            <div class="curved-path-wrap" id="curved-path-wrap">
              <!-- SVG Curved Winding Trail connecting the 5 stops -->
              <svg class="winding-path-svg" viewBox="0 0 1100 240" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="goldPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#B69A62" stop-opacity="0.8" />
                    <stop offset="50%" stop-color="#B76E4B" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#B69A62" stop-opacity="0.8" />
                  </linearGradient>
                </defs>
                <!-- Winding S-curve trail -->
                <path d="M 60 140 C 220 20, 320 220, 520 80 C 680 -20, 800 230, 1040 120"
                      fill="none"
                      stroke="url(#goldPathGrad)"
                      stroke-width="4"
                      stroke-dasharray="8 6"
                      class="animated-path" />
              </svg>

              <!-- 5 Interconnected Stops (Interactive Floating Cards) -->
              <div class="floating-stops-row" id="floating-stops-row">
                <!-- Stop 1: HISTORY & CIVILIZATION -->
                <div class="journey-stop-card stop-1" data-category="history" style="top: 100px; left: 10px;" role="button" tabindex="0" aria-label="Stop 1: History and Civilization">
                  <div class="stop-badge">STOP 01</div>
                  <div class="stop-icon-wrap">📜</div>
                  <h4 class="stop-title">HISTORY & CIVILIZATION</h4>
                  <p class="stop-desc">Kingdoms, stone edicts & ancient knowledge systems.</p>
                  <span class="explore-hint">Explore Category →</span>
                </div>

                <!-- Stop 2: FORGOTTEN TRADITIONAL GAMES -->
                <div class="journey-stop-card stop-2" data-category="games" style="top: 15px; left: 240px;" role="button" tabindex="0" aria-label="Stop 2: Forgotten Traditional Games">
                  <div class="stop-badge">STOP 02</div>
                  <div class="stop-icon-wrap">🎲</div>
                  <h4 class="stop-title">FORGOTTEN TRADITIONAL GAMES</h4>
                  <p class="stop-desc">Pallanguzhi, Chaupar, Bagh-Chal & folk sports.</p>
                  <span class="explore-hint">Play Games →</span>
                </div>

                <!-- Stop 3: ARCHITECTURAL WONDERS -->
                <div class="journey-stop-card stop-3" data-category="architecture" style="top: 90px; left: 470px;" role="button" tabindex="0" aria-label="Stop 3: Architectural Wonders">
                  <div class="stop-badge">STOP 03</div>
                  <div class="stop-icon-wrap">🏛️</div>
                  <h4 class="stop-title">ARCHITECTURAL WONDERS</h4>
                  <p class="stop-desc">Granite vimanas, stepwells & rock-cut sanctuaries.</p>
                  <span class="explore-hint">Build Wonders →</span>
                </div>

                <!-- Stop 4: FESTIVALS & CELEBRATIONS -->
                <div class="journey-stop-card stop-4" data-category="festivals" style="top: 10px; left: 700px;" role="button" tabindex="0" aria-label="Stop 4: Festivals and Celebrations">
                  <div class="stop-badge">STOP 04</div>
                  <div class="stop-icon-wrap">🪔</div>
                  <h4 class="stop-title">FESTIVALS & CELEBRATIONS</h4>
                  <p class="stop-desc">Pookalams, pandals, Bihu & Garba beats.</p>
                  <span class="explore-hint">Experience Joy →</span>
                </div>

                <!-- Stop 5: REGIONAL CULTURES -->
                <div class="journey-stop-card stop-5" data-category="culture" style="top: 85px; left: 910px;" role="button" tabindex="0" aria-label="Stop 5: Regional Cultures">
                  <div class="stop-badge">STOP 05</div>
                  <div class="stop-icon-wrap">🎭</div>
                  <h4 class="stop-title">REGIONAL CULTURES</h4>
                  <p class="stop-desc">Living dances, rare folk ballads & master textiles.</p>
                  <span class="explore-hint">View Traditions →</span>
                </div>
              </div>
            </div>

            <!-- Parallax Instruction Hint -->
            <div class="pointer-parallax-hint">
              <span class="hint-icon">✦</span> Move pointer to feel the ancient parchment sway • Tap any stop to explore
            </div>
          </div>
        </div>
      </div>
    `;

    // Hook buttons
    const btnExplore = this.container.querySelector('#btn-hero-explore');
    if (btnExplore) {
      btnExplore.addEventListener('click', () => {
        soundSynth.playClick();
        if (window.appRouter) window.appRouter.navigate('states-directory');
      });
    }

    const btnMap = this.container.querySelector('#btn-hero-map');
    if (btnMap) btnMap.addEventListener('click', () => { soundSynth.playClick(); window.appRouter && window.appRouter.navigate('india-map'); });

    const btnContinue = this.container.querySelector('#btn-hero-continue');
    if (btnContinue) btnContinue.addEventListener('click', () => {
      soundSynth.playBell();
      window.appRouter && window.appRouter.navigate('states-directory', { stateId: btnContinue.dataset.state });
    });

    this.container.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
      soundSynth.playClick();
      window.appRouter && window.appRouter.navigate(b.dataset.go);
    }));

    const btnAvatar = this.container.querySelector('#btn-hero-avatar');
    if (btnAvatar) {
      btnAvatar.addEventListener('click', () => {
        soundSynth.playClick();
        if (window.appRouter) window.appRouter.navigate('avatar-customizer');
      });
    }

    // Hook the 5 category stops
    const stops = this.container.querySelectorAll('.journey-stop-card');
    stops.forEach(stop => {
      const go = () => {
        soundSynth.playBell();
        const cat = stop.dataset.category;
        if (window.appRouter) window.appRouter.navigate('states-directory', { categoryKey: cat });
      };
      stop.addEventListener('click', go);
      stop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });
  }

  continueCard() {
    if (!gameState.hasProgress()) return '';
    const s = gameState.state;
    const st = getStateById(s.activeStateId);
    return `
      <div class="continue-card ancient-panel">
        <div>
          <span class="continue-label">${t('welcomeBack')}, <strong>${escapeHTML(s.avatar.name || 'Explorer')}</strong></span>
          <span class="continue-meta">🪙 ${s.points} CDP · Level ${s.currentLevel} · 🛂 ${gameState.countStamps()}/28 · 🔥 ${(s.daily && s.daily.streak) || 0}</span>
        </div>
        ${st ? `<button class="btn-ancient btn-gold btn-sm" id="btn-hero-continue" data-state="${st.id}">▶ ${t('continueJourneyCta')}: ${escapeHTML(st.name)}</button>` : ''}
      </div>`;
  }

  setupOpposingPointerParallax() {
    if (document.body.classList.contains('reduced-motion')) return;
    window.addEventListener('mousemove', this.boundPointerMove);
    window.addEventListener('touchmove', this.boundTouchMove, { passive: true });
    this.startParallaxLoop();
  }

  handlePointerMove(e) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Normalize pointer coords (-1 to +1)
    const normX = (e.clientX / w) * 2 - 1;
    const normY = (e.clientY / h) * 2 - 1;

    // Strict OPPOSITE direction as specified in prompt:
    // Mouse left (-normX) => Box moves RIGHT (+targetX)
    // Mouse right (+normX) => Box moves LEFT (-targetX)
    // Mouse top (-normY) => Box shifts DOWN (+targetY)
    // Mouse bottom (+normY) => Box shifts UP (-targetY)
    const MAX_SHIFT_X = 26; // pixels, clamped inside viewport
    const MAX_SHIFT_Y = 18;

    this.targetX = -normX * MAX_SHIFT_X;
    this.targetY = -normY * MAX_SHIFT_Y;
  }

  handleTouchMove(e) {
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const w = window.innerWidth;
      const h = window.innerHeight;
      const normX = (touch.clientX / w) * 2 - 1;
      const normY = (touch.clientY / h) * 2 - 1;
      this.targetX = -normX * 15;
      this.targetY = -normY * 10;
    }
  }

  startParallaxLoop() {
    const loop = () => {
      // Smooth interpolation (lerp)
      this.currentX += (this.targetX - this.currentX) * 0.08;
      this.currentY += (this.targetY - this.currentY) * 0.08;

      const stopsContainer = this.container ? this.container.querySelector('#floating-stops-row') : null;
      if (stopsContainer) {
        stopsContainer.style.transform = `translate3d(${this.currentX.toFixed(2)}px, ${this.currentY.toFixed(2)}px, 0)`;
      }

      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  destroy() {
    window.removeEventListener('mousemove', this.boundPointerMove);
    window.removeEventListener('touchmove', this.boundTouchMove);
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
