// js/components/livingTraditions.js
// DISCOVER INDIA: Living Traditions Automatic Cultural Slideshow
// Strict adherence to 5-second initial delay, auto-scroll to right, pause/resume, and rich cultural lore.

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { getStateById, INDIAN_STATES } from '../data/statesData.js';

export class LivingTraditionsSlideshow {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.stateId = options.stateId || 'tamil-nadu';
    this.stateData = getStateById(this.stateId) || INDIAN_STATES[0];
    this.slides = this.compileSlides();
    this.currentIndex = 0;
    this.timer = null;
    this.isPaused = false;
    this.firstRun = true;
    this.intervalSeconds = 5; // Exactly 5 seconds as specified
  }

  compileSlides() {
    // Collect slides from the active state, plus regional neighboring gems
    let list = [];
    if (this.stateData.culture && this.stateData.culture.slideshowSlides) {
      list = this.stateData.culture.slideshowSlides.map(s => ({
        ...s,
        stateName: this.stateData.name,
        stateId: this.stateData.id
      }));
    }

    // If fewer than 4 slides, add from neighboring states in same region
    if (list.length < 4) {
      const regionStates = INDIAN_STATES.filter(s => s.region === this.stateData.region && s.id !== this.stateData.id);
      for (const st of regionStates) {
        if (st.culture && st.culture.slideshowSlides) {
          st.culture.slideshowSlides.forEach(s => {
            list.push({ ...s, stateName: st.name, stateId: st.id });
          });
        }
      }
    }

    return list.length > 0 ? list : [
      {
        title: 'Living Classical Heritage',
        subtitle: 'Ancient Traditions Across India',
        description: 'Centuries of rhythm, temple craft, handloom weaving, and oral epics passed down across generations.',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80',
        tag: 'Heritage',
        stateName: this.stateData.name
      }
    ];
  }

  init() {
    this.render();
    this.startAutoSlideshow();

    // Mark completion in game state
    gameState.completeActivity(this.stateData.id, 'culture', 150);
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="slideshow-experience-wrap">
        <!-- Top Toolbar -->
        <div class="slideshow-header-bar">
          <div class="slideshow-title-info">
            <span class="category-pill">REGIONAL CULTURES & LIVING TRADITIONS</span>
            <h2 class="state-title">${this.stateData.name} — Living Arts & Heritage</h2>
          </div>
          <div class="slideshow-status-pills">
            <div class="timer-countdown-pill" id="timer-indicator">
              <span class="timer-icon">⏱️</span> Auto-Advancing in <span id="timer-seconds-left">5s</span>
            </div>
            <button class="btn-ancient btn-secondary" id="btn-slideshow-pause">⏸ Pause</button>
          </div>
        </div>

        <!-- Main Slide Viewport -->
        <div class="slideshow-viewport ancient-panel">
          <div class="slides-track" id="slides-track">
            ${this.slides.map((slide, idx) => `
              <div class="slide-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                <div class="slide-image-wrapper">
                  <img src="${slide.image}" alt="${slide.title}" class="slide-img" loading="eager" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80';" />
                  <div class="slide-overlay-gradient"></div>
                  <span class="slide-tag-badge">${slide.tag || 'Tradition'}</span>
                </div>

                <div class="slide-caption-card">
                  <div class="caption-state-badge">📍 ${slide.stateName}</div>
                  <h3 class="caption-title">${slide.title}</h3>
                  <h4 class="caption-subtitle">${slide.subtitle}</h4>
                  <p class="caption-description">${slide.description}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Navigation Controls -->
          <button class="slide-nav-btn prev-btn" id="btn-slide-prev" title="Previous Slide (Left)">❮</button>
          <button class="slide-nav-btn next-btn" id="btn-slide-next" title="Next Slide (Right)">❯</button>

          <!-- Bottom Slide Dots -->
          <div class="slide-dots-indicator" id="slide-dots-container">
            ${this.slides.map((_, idx) => `
              <button class="dot-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" title="Go to slide ${idx + 1}"></button>
            `).join('')}
          </div>
        </div>

        <!-- Slideshow Footer Context -->
        <div class="slideshow-bottom-info ancient-panel">
          <div class="tradition-metadata-grid">
            <div class="meta-item">
              <span class="meta-label">DANCE & THEATRE</span>
              <span class="meta-val">${this.stateData.culture.dance}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">FOLK MUSIC</span>
              <span class="meta-val">${this.stateData.culture.music}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">HANDICRAFTS</span>
              <span class="meta-val">${this.stateData.culture.handicrafts}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">TEXTILE HERITAGE</span>
              <span class="meta-val">${this.stateData.culture.textile}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Hook buttons
    const btnPrev = this.container.querySelector('#btn-slide-prev');
    const btnNext = this.container.querySelector('#btn-slide-next');
    const btnPause = this.container.querySelector('#btn-slideshow-pause');

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        soundSynth.playClick();
        this.prevSlide();
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        soundSynth.playClick();
        this.nextSlide();
      });
    }

    if (btnPause) {
      btnPause.addEventListener('click', () => {
        soundSynth.playClick();
        this.togglePause();
      });
    }

    // Dot indicators
    const dots = this.container.querySelectorAll('.dot-btn');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        soundSynth.playClick();
        const idx = parseInt(dot.dataset.index, 10);
        this.goToSlide(idx);
      });
    });
  }

  startAutoSlideshow() {
    this.clearTimer();
    let secondsLeft = this.intervalSeconds; // 5 seconds exactly
    this.updateTimerDisplay(secondsLeft);

    const countdownInterval = setInterval(() => {
      if (!this.isPaused) {
        secondsLeft--;
        this.updateTimerDisplay(secondsLeft);
        if (secondsLeft <= 0) {
          secondsLeft = this.intervalSeconds;
          this.nextSlide(); // Auto-scrolls toward the RIGHT
        }
      }
    }, 1000);

    this.timer = countdownInterval;
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  updateTimerDisplay(sec) {
    const el = this.container.querySelector('#timer-seconds-left');
    if (el) el.textContent = `${sec}s`;
  }

  nextSlide() {
    this.goToSlide((this.currentIndex + 1) % this.slides.length);
  }

  prevSlide() {
    this.goToSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length);
  }

  goToSlide(index) {
    this.currentIndex = index;
    const slides = this.container.querySelectorAll('.slide-item');
    const dots = this.container.querySelectorAll('.dot-btn');

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === this.currentIndex);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === this.currentIndex);
    });

    // Reset countdown timer without halting auto-scroll
    this.updateTimerDisplay(this.intervalSeconds);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const btn = this.container.querySelector('#btn-slideshow-pause');
    const indicator = this.container.querySelector('#timer-indicator');

    if (btn) {
      btn.textContent = this.isPaused ? '▶ Resume' : '⏸ Pause';
      btn.className = this.isPaused ? 'btn-ancient btn-gold' : 'btn-ancient btn-secondary';
    }

    if (indicator) {
      indicator.classList.toggle('paused', this.isPaused);
      if (this.isPaused) {
        indicator.innerHTML = '<span class="timer-icon">⏸️</span> Slideshow Paused';
      } else {
        indicator.innerHTML = '<span class="timer-icon">⏱️</span> Auto-Advancing in <span id="timer-seconds-left">5s</span>';
      }
    }
  }

  destroy() {
    this.clearTimer();
  }
}
