// js/games/architectureBuilder.js
// ITIHASAM: Pixel-Art Architectural Construction Experience

import { BaseMiniGame } from './gameEngine.js';
import { soundSynth } from '../audio/soundSynth.js';
import { getStateById } from '../data/statesData.js';

export class ArchitectureBuilderGame extends BaseMiniGame {
  constructor(containerId, options = {}) {
    super(containerId, {
      title: options.title || 'Architectural Reconstruction Experience',
      points: options.points || 250,
      ...options
    });

    this.stateData = getStateById(this.stateId) || {
      name: 'Tamil Nadu',
      architecture: {
        title: 'Brihadeeswarar Temple (Thanjavur)',
        monumentName: 'Brihadeeswarar Temple',
        builderEra: 'Completed in 1010 CE by Rajaraja Chola I',
        architecturalStyle: 'Pure Dravidian Granite Architecture',
        marvelDetails: 'Built of granite without mortar. Crowning Kumbam is an 80-tonne monolithic boulder.',
        componentsToBuild: [
          { id: 'c1', name: 'Adhisthana (Granite Plinth)', role: 'Massive earthquake-resistant stone base.', hint: 'Place at bottom foundation.' },
          { id: 'c2', name: 'Garbhagriha (Sanctum Chamber)', role: 'Double-walled square sanctum.', hint: 'Position above plinth.' },
          { id: 'c3', name: 'Vimana (13-Tiered Tower)', role: 'Pyramidal granitic tower soaring 66 meters.', hint: 'Assemble above sanctum.' },
          { id: 'c4', name: 'Kumbam (80-Tonne Monolithic Capstone)', role: 'Single massive dome.', hint: 'Place atop pyramidal tiers.' },
          { id: 'c5', name: 'Golden Kalasha (Pinnacle Stupa)', role: 'Sacred gilded copper finial.', hint: 'Crown apex of the Kumbam.' }
        ]
      }
    };

    this.components = this.stateData.architecture.componentsToBuild || [
      { id: 'c1', name: 'Foundation Plinth', role: 'Stone base', hint: 'Step 1' },
      { id: 'c2', name: 'Inner Sanctum', role: 'Main chamber', hint: 'Step 2' },
      { id: 'c3', name: 'Tiered Shikhara Tower', role: 'Tower superstructure', hint: 'Step 3' },
      { id: 'c4', name: 'Crowning Dome Capstone', role: 'Monolithic dome', hint: 'Step 4' },
      { id: 'c5', name: 'Golden Finial Stupa', role: 'Summit pinnacle', hint: 'Step 5' }
    ];

    this.currentStep = 0;
    this.assembledPieces = [];
  }

  runDemoSequence() {
    this.renderBuilderUI();
    const demoSteps = [
      {
        title: 'Step 1: Inspect Architectural Blueprint',
        desc: `Review the historic silhouette of ${this.stateData.architecture.monumentName}. Each component must be arranged from foundation to apex.`,
        action: () => {
          this.highlightBlueprintSlot(0);
          soundSynth.playBell();
        }
      },
      {
        title: 'Step 2: Lay the Granite Foundation',
        desc: 'Place the earthquake-resistant Adhisthana plinth to anchor the monumental load.',
        action: () => {
          this.placeDemoPiece(0);
          soundSynth.playClack();
        }
      },
      {
        title: 'Step 3: Assemble the Sanctum and Soaring Vimana',
        desc: 'Erect the double-walled Garbhagriha and interlock the 13-tiered pyramidal granite tower.',
        action: () => {
          this.placeDemoPiece(1);
          setTimeout(() => {
            this.placeDemoPiece(2);
            soundSynth.playClack();
          }, 600);
        }
      },
      {
        title: 'Step 4: Crown with the 80-Tonne Capstone',
        desc: 'Haul the monolithic Kumbam up the earthen ramp and install the Golden Kalasha pinnacle!',
        action: () => {
          this.placeDemoPiece(3);
          setTimeout(() => {
            this.placeDemoPiece(4);
            soundSynth.playVictory();
            setTimeout(() => this.stopDemoAndShowReady(), 1500);
          }, 600);
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
    this.assembledPieces = [];
    this.renderBuilderUI();
    this.updateNarration(
      'Ready to Build:',
      `Click the correct matching component in your inventory palette to assemble stage 1: ${this.components[0].name}.`
    );
  }

  renderBuilderUI() {
    const viewport = this.container.querySelector('#game-viewport');
    if (!viewport) return;

    viewport.innerHTML = `
      <div class="architecture-builder-container">
        <!-- Blueprint Silhouette Display (Left/Center) -->
        <div class="blueprint-panel ancient-panel">
          <div class="blueprint-header">
            <span class="blueprint-title">📐 ARCHITECTURAL BLUEPRINT</span>
            <span class="monument-style-tag">${this.stateData.architecture.architecturalStyle}</span>
          </div>

          <div class="pixel-monument-stage" id="monument-stage">
            <!-- Layers stacked bottom to top: c5 (top), c4, c3, c2, c1 (bottom) -->
            <div class="monument-layer layer-c5 ghost" id="layer-slot-4" data-index="4">
              <div class="pixel-piece piece-c5">🔱 KALASHA FINIAL</div>
            </div>
            <div class="monument-layer layer-c4 ghost" id="layer-slot-3" data-index="3">
              <div class="pixel-piece piece-c4">🏺 KUMBAM MONOLITHIC CAPSTONE</div>
            </div>
            <div class="monument-layer layer-c3 ghost" id="layer-slot-2" data-index="2">
              <div class="pixel-piece piece-c3">🏛️ VIMANA PYRAMIDAL TOWER</div>
            </div>
            <div class="monument-layer layer-c2 ghost" id="layer-slot-1" data-index="1">
              <div class="pixel-piece piece-c2">⛩️ GARBHAGRIHA SANCTUM</div>
            </div>
            <div class="monument-layer layer-c1 ghost" id="layer-slot-0" data-index="0">
              <div class="pixel-piece piece-c1">🧱 ADHISTHANA FOUNDATION PLINTH</div>
            </div>
          </div>

          <div class="blueprint-lore-box" id="blueprint-lore-box">
            <strong>Engineering Fact:</strong> ${this.stateData.architecture.marvelDetails}
          </div>
        </div>

        <!-- Inventory Palette (Right) -->
        <div class="palette-panel ancient-panel">
          <h4 class="palette-title">Architect's Palette</h4>
          <p class="palette-desc">Select the appropriate component for the current stage:</p>

          <div class="palette-items-list" id="palette-items-list">
            ${this.components.map((comp, idx) => `
              <button class="component-card-btn" id="comp-btn-${idx}" data-index="${idx}">
                <div class="comp-icon">${this.getPieceIcon(idx)}</div>
                <div class="comp-info">
                  <span class="comp-name">${comp.name}</span>
                  <span class="comp-role">${comp.role}</span>
                </div>
                <span class="comp-status" id="comp-status-${idx}">Available</span>
              </button>
            `).join('')}
          </div>

          <div class="construction-progress-bar-wrap">
            <div class="progress-labels">
              <span>Construction Progress</span>
              <span id="construction-pct">0%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" id="construction-fill" style="width: 0%"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach click events to component palette buttons
    const buttons = viewport.querySelectorAll('.component-card-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isDemoMode || !this.isGameActive || this.isGameOver) return;
        const index = parseInt(btn.dataset.index, 10);
        this.handlePlayerComponentSelect(index);
      });
    });
  }

  getPieceIcon(idx) {
    const icons = ['🧱', '⛩️', '🏛️', '🏺', '🔱'];
    return icons[idx] || '🏛️';
  }

  highlightBlueprintSlot(idx) {
    const slot = this.container.querySelector(`#layer-slot-${idx}`);
    if (slot) slot.classList.add('pulse-highlight');
  }

  placeDemoPiece(idx) {
    const slot = this.container.querySelector(`#layer-slot-${idx}`);
    if (slot) {
      slot.classList.remove('ghost', 'pulse-highlight');
      slot.classList.add('placed');
    }
    const btn = this.container.querySelector(`#comp-btn-${idx}`);
    if (btn) btn.classList.add('used');
  }

  handlePlayerComponentSelect(selectedIdx) {
    if (selectedIdx === this.currentStep) {
      // Correct component chosen!
      soundSynth.playClack();
      const slot = this.container.querySelector(`#layer-slot-${selectedIdx}`);
      if (slot) {
        slot.classList.remove('ghost');
        slot.classList.add('placed', 'pop-in');
      }

      const btn = this.container.querySelector(`#comp-btn-${selectedIdx}`);
      if (btn) {
        btn.classList.add('used');
        const st = btn.querySelector('.comp-status');
        if (st) st.textContent = '✓ Placed';
      }

      this.currentStep++;
      const pct = Math.round((this.currentStep / this.components.length) * 100);
      const fill = this.container.querySelector('#construction-fill');
      const pctText = this.container.querySelector('#construction-pct');
      if (fill) fill.style.width = `${pct}%`;
      if (pctText) pctText.textContent = `${pct}%`;

      if (this.currentStep < this.components.length) {
        this.updateNarration(
          `Stage ${this.currentStep} Placed!`,
          `Next: Select ${this.components[this.currentStep].name} to continue the monument construction.`
        );
      } else {
        // Complete!
        this.updateNarration(
          'Masterpiece Complete!',
          `You have faithfully reconstructed the ${this.stateData.architecture.monumentName}!`
        );
        soundSynth.playVictory();
        setTimeout(() => {
          this.finishGame(true, this.options.points, 'Vimana Master Architect Badge');
        }, 1200);
      }
    } else {
      // Wrong piece order!
      soundSynth.playClick();
      this.updateNarration(
        'Incorrect Order!',
        `In historical temple architecture, we must build progressively from foundation to apex! Please select ${this.components[this.currentStep].name}.`
      );
    }
  }
}
