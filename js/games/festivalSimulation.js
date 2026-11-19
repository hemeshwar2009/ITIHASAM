// js/games/festivalSimulation.js
// DISCOVER INDIA: Interactive Festival Simulation (Kerala Pookalam & Pongal Harvest)

import { BaseMiniGame } from './gameEngine.js';
import { soundSynth } from '../audio/soundSynth.js';
import { getStateById } from '../data/statesData.js';

export class FestivalSimulationGame extends BaseMiniGame {
  constructor(containerId, options = {}) {
    super(containerId, {
      title: options.title || 'Sacred Festival Celebration',
      points: options.points || 180,
      ...options
    });

    this.stateData = getStateById(this.stateId) || {
      name: 'Kerala',
      festivals: {
        title: 'Onam & Athachamayam',
        miniGameType: 'pookalam'
      }
    };

    this.festivalType = this.stateData.festivals.miniGameType || 'pookalam';

    // Pookalam Petals state (5 concentric rings)
    this.rings = [
      { id: 'ring-1', name: 'Inner Sanctum (Center)', filled: false, flower: 'yellow-marigold', icon: '🌼' },
      { id: 'ring-2', name: 'Ring 2: Red Ixora (Thechi)', filled: false, flower: 'red-ixora', icon: '🌺' },
      { id: 'ring-3', name: 'Ring 3: Fragrant White Jasmine', filled: false, flower: 'white-jasmine', icon: '🌸' },
      { id: 'ring-4', name: 'Ring 4: Golden Orange Marigold', filled: false, flower: 'orange-marigold', icon: '🏵️' },
      { id: 'ring-5', name: 'Ring 5: Sacred Green Tulsi Border', filled: false, flower: 'green-tulsi', icon: '🍃' }
    ];

    this.selectedFlower = 'yellow-marigold';
    this.currentStep = 0;
  }

  runDemoSequence() {
    this.renderFestivalUI();
    const demoSteps = [
      {
        title: 'Step 1: The Sacred Floral Mandala',
        desc: 'Traditional Athapookalams are crafted in 5 concentric rings to honor King Mahabali.',
        action: () => {
          this.highlightRing(0);
          soundSynth.playBell();
        }
      },
      {
        title: 'Step 2: Center with Auspicious Yellow Blossoms',
        desc: 'Placing glowing yellow marigold petals at the sacred center of the mandala.',
        action: () => {
          this.placeDemoFlower(0, '🌼');
          soundSynth.playClack();
        }
      },
      {
        title: 'Step 3: Concentric Harmony of Colors',
        desc: 'Adding vibrant scarlet Ixora, fragrant white Jasmine, and fiery orange petals in harmonic circles.',
        action: () => {
          this.placeDemoFlower(1, '🌺');
          setTimeout(() => {
            this.placeDemoFlower(2, '🌸');
            this.placeDemoFlower(3, '🏵️');
            soundSynth.playCowrieRoll();
          }, 600);
        }
      },
      {
        title: 'Step 4: Sacred Tulsi Leaf Perimeter',
        desc: 'Encircling the outer rim with fragrant Tulsi and lighting the traditional bronze Nilavilakku lamp!',
        action: () => {
          this.placeDemoFlower(4, '🍃');
          soundSynth.playVictory();
          setTimeout(() => this.stopDemoAndShowReady(), 1500);
        }
      }
    ];

    let currentStep = 0;
    const executeNextStep = () => {
      if (!this.isDemoMode || currentStep >= demoSteps.length) return;
      const step = demoSteps[currentStep];
      this.updateNarration(step.title, step.desc);
      step.action();
      currentStep++;
      this.demoTimer = setTimeout(executeNextStep, 3500);
    };

    executeNextStep();
  }

  onInteractiveStart() {
    this.currentStep = 0;
    this.rings.forEach(r => r.filled = false);
    this.renderFestivalUI();
    this.updateNarration(
      'Begin Floral Mandala:',
      `Click the Center Ring (Ring 1) to arrange fresh yellow marigold petals.`
    );
  }

  renderFestivalUI() {
    const viewport = this.container.querySelector('#game-viewport');
    if (!viewport) return;

    viewport.innerHTML = `
      <div class="festival-simulation-container">
        <!-- Pookalam Canvas / Interactive Rings (Left/Center) -->
        <div class="mandala-stage-panel ancient-panel">
          <div class="mandala-header">
            <span class="mandala-title">🌸 SACRED ONAM POOKALAM MANDALA</span>
            <span class="lamp-indicator">🪔 NILAVILAKKU LIT</span>
          </div>

          <div class="pookalam-circle-board" id="pookalam-board">
            <!-- Ring 5 (Outer) -->
            <div class="pookalam-ring ring-outer ring-5" id="ring-elem-4" data-index="4">
              <span class="ring-label-hint">Ring 5: Green Tulsi</span>
              <!-- Ring 4 -->
              <div class="pookalam-ring ring-4" id="ring-elem-3" data-index="3">
                <span class="ring-label-hint">Ring 4: Orange Marigold</span>
                <!-- Ring 3 -->
                <div class="pookalam-ring ring-3" id="ring-elem-2" data-index="2">
                  <span class="ring-label-hint">Ring 3: White Jasmine</span>
                  <!-- Ring 2 -->
                  <div class="pookalam-ring ring-2" id="ring-elem-1" data-index="1">
                    <span class="ring-label-hint">Ring 2: Red Ixora</span>
                    <!-- Center Sanctum Ring 1 -->
                    <div class="pookalam-ring ring-center ring-1" id="ring-elem-0" data-index="0">
                      <span class="ring-center-icon" id="center-icon">🌼</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mandala-harmony-score">
            <span>Mandala Floral Harmony:</span>
            <span class="score-stars" id="harmony-stars">⭐⭐⭐⭐⭐</span>
          </div>
        </div>

        <!-- Flower Basket / Selection Palette (Right) -->
        <div class="flower-palette-panel ancient-panel">
          <h4 class="palette-title">Flower Petal Basket</h4>
          <p class="palette-desc">Select petals to arrange consecutive sacred mandala rings:</p>

          <div class="petals-selector-list" id="petals-selector">
            ${this.rings.map((ring, idx) => `
              <button class="petal-card-btn" id="petal-btn-${idx}" data-index="${idx}">
                <span class="petal-icon">${ring.icon}</span>
                <div class="petal-details">
                  <span class="petal-name">${ring.name}</span>
                  <span class="petal-hint">${idx === 0 ? 'Start here' : `Stage ${idx + 1}`}</span>
                </div>
                <span class="petal-check" id="petal-check-${idx}">Place</span>
              </button>
            `).join('')}
          </div>

          <div class="festival-lore-card">
            <h5>Traditional Significance</h5>
            <p>During the ten days of Onam, Athapookalams grow by one concentric ring daily, welcoming prosperity and reminding communities of equality and abundance.</p>
          </div>
        </div>
      </div>
    `;

    // Hook buttons
    const buttons = viewport.querySelectorAll('.petal-card-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isDemoMode || !this.isGameActive || this.isGameOver) return;
        const index = parseInt(btn.dataset.index, 10);
        this.handlePlayerPetalSelect(index);
      });
    });

    // Also allow clicking directly on rings
    const rings = viewport.querySelectorAll('.pookalam-ring');
    rings.forEach(ring => {
      ring.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.isDemoMode || !this.isGameActive || this.isGameOver) return;
        const index = parseInt(ring.dataset.index, 10);
        this.handlePlayerPetalSelect(index);
      });
    });
  }

  highlightRing(idx) {
    const ring = this.container.querySelector(`#ring-elem-${idx}`);
    if (ring) ring.classList.add('ring-pulse');
  }

  placeDemoFlower(idx, icon) {
    const ring = this.container.querySelector(`#ring-elem-${idx}`);
    if (ring) {
      ring.classList.remove('ring-pulse');
      ring.classList.add('ring-filled', `filled-theme-${idx}`);
    }
    const btn = this.container.querySelector(`#petal-btn-${idx}`);
    if (btn) btn.classList.add('used');
  }

  handlePlayerPetalSelect(index) {
    if (index === this.currentStep) {
      soundSynth.playClack();
      const ring = this.container.querySelector(`#ring-elem-${index}`);
      if (ring) {
        ring.classList.add('ring-filled', `filled-theme-${index}`, 'pop-in');
      }

      const btn = this.container.querySelector(`#petal-btn-${index}`);
      if (btn) {
        btn.classList.add('used');
        const chk = btn.querySelector('.petal-check');
        if (chk) chk.textContent = '✓ Placed';
      }

      this.currentStep++;
      if (this.currentStep < this.rings.length) {
        soundSynth.playCowrieRoll();
        this.updateNarration(
          `Ring ${this.currentStep} Arranged!`,
          `Next: Arrange ${this.rings[this.currentStep].name}.`
        );
      } else {
        // Pookalam complete!
        soundSynth.playVictory();
        this.updateNarration(
          'Auspicious Pookalam Complete!',
          'King Mahabali welcomes your pure craftsmanship and devotion!'
        );
        setTimeout(() => {
          this.finishGame(true, 180, 'Pookalam Artist Badge');
        }, 1200);
      }
    } else {
      soundSynth.playClick();
      this.updateNarration(
        'Follow Sacred Concentric Order!',
        `Please arrange from inside out. Select ${this.rings[this.currentStep].name}.`
      );
    }
  }
}
