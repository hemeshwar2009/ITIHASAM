// js/games/historyAdventure.js
// DISCOVER INDIA: Pixel-Art Top-Down Historical Adventure Game

import { BaseMiniGame } from './gameEngine.js';
import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { getStateById } from '../data/statesData.js';

export class HistoryAdventureGame extends BaseMiniGame {
  constructor(containerId, options = {}) {
    super(containerId, {
      title: options.title || 'Historical Kingdom Adventure',
      points: options.points || 150,
      ...options
    });

    this.stateData = getStateById(this.stateId) || {
      name: 'Tamil Nadu',
      history: {
        title: 'Chola Naval Empire & Sangam Era',
        discoveryMission: {
          name: 'The Inscriptions of Brihadeeswarar',
          description: 'Decipher the naval expedition led by Rajendra Chola.',
          quizQuestion: 'Which naval expedition commemorated the triumph of Rajendra Chola over maritime trade routes?',
          quizOptions: ['Expedition to Kadaram (Srivijaya)', 'Siege of Rome', 'Persian Gulf Campaign', 'Voyage of the Red Sea'],
          correctAnswer: 0,
          explanation: 'Rajendra Chola conquered Kadaram (Kedah, Malaysia) to safeguard oceanic trade routes.'
        },
        artifact: {
          name: 'Chola Lost-Wax Bronze Nataraja',
          icon: '🔱'
        }
      }
    };

    // Canvas & World state
    this.canvas = null;
    this.ctx = null;
    this.player = {
      x: 120,
      y: 220,
      width: 24,
      height: 32,
      speed: 3,
      direction: 'down',
      isMoving: false,
      frame: 0
    };

    // World Entities (NPCs, Edicts, Treasures)
    this.entities = [
      {
        id: 'npc-scholar',
        name: 'Royal Scholar Sundaram',
        role: 'Court Chronicler',
        x: 320,
        y: 140,
        width: 24,
        height: 32,
        icon: '👳',
        dialogue: 'Greetings Explorer! Inspect the Great Granite Edict near the northern sanctum to solve the Emperor’s riddle.'
      },
      {
        id: 'stone-edict',
        name: 'Royal Granite Edict of Rajaraja Chola',
        role: 'Sacred Inscription',
        x: 480,
        y: 120,
        width: 32,
        height: 40,
        icon: '🪨',
        interactable: true,
        inspected: false
      },
      {
        id: 'artifact-chest',
        name: 'Royal Reliquary Chest',
        role: 'Sacred Artifact',
        x: 480,
        y: 280,
        width: 28,
        height: 28,
        icon: '📦',
        locked: true
      }
    ];

    this.keys = {};
    this.animationFrameId = null;
  }

  runDemoSequence() {
    this.renderGameWorld();
    const demoSteps = [
      {
        title: 'Step 1: Explore Ancient Kingdoms',
        desc: 'Move through detailed pixelated historical courtyards using Arrow Keys / WASD or on-screen controls.',
        action: () => {
          this.autoMovePlayer(220, 220, () => {});
        }
      },
      {
        title: 'Step 2: Consult Royal Chroniclers',
        desc: 'Approach scholars and sculptors to learn historical clues and folklore.',
        action: () => {
          this.autoMovePlayer(300, 160, () => {
            this.showDialogue('Royal Scholar Sundaram', 'The Chola fleet crossed the Bay of Bengal to Kadaram! Inspect the stone inscription.');
            soundSynth.playBell();
          });
        }
      },
      {
        title: 'Step 3: Decipher Ancient Inscriptions',
        desc: 'Interact with stone edicts to unlock historical discovery puzzles.',
        action: () => {
          this.autoMovePlayer(460, 140, () => {
            this.showDialogue('Ancient Tamil Grantha Inscription', 'Carved in 1014 CE: "Svasti Sri! Hail the righteous fleet of the Cholas..."');
            soundSynth.playClack();
          });
        }
      },
      {
        title: 'Step 4: Collect Historical Artifacts',
        desc: 'Solve the riddle to unlock the Royal Reliquary and earn Cultural Discovery Points!',
        action: () => {
          this.hideDialogue();
          this.autoMovePlayer(460, 270, () => {
            soundSynth.playVictory();
            setTimeout(() => this.stopDemoAndShowReady(), 1500);
          });
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
    this.hideDialogue();
    this.player.x = 100;
    this.player.y = 220;
    this.setupControls();
    this.startLoop();
    this.updateNarration(
      'Mission Objective:',
      `Walk to the Royal Scholar and Stone Edict to decipher: "${this.stateData.history.discoveryMission.name}".`
    );
  }

  renderGameWorld() {
    const viewport = this.container.querySelector('#game-viewport');
    if (!viewport) return;

    viewport.innerHTML = `
      <div class="pixel-adventure-container">
        <canvas id="adventure-canvas" width="640" height="360" class="pixel-canvas"></canvas>

        <!-- Interactive Virtual D-Pad for Mobile & Touch -->
        <div class="virtual-controls-bar">
          <div class="dpad-group">
            <button class="dpad-btn dpad-up" id="btn-dpad-up">▲</button>
            <div class="dpad-mid">
              <button class="dpad-btn dpad-left" id="btn-dpad-left">◀</button>
              <button class="dpad-btn dpad-action" id="btn-dpad-action">INTERACT [E]</button>
              <button class="dpad-btn dpad-right" id="btn-dpad-right">▶</button>
            </div>
            <button class="dpad-btn dpad-down" id="btn-dpad-down">▼</button>
          </div>
          <div class="hint-pill">Controls: WASD / Arrow Keys + [E] or Space to Interact</div>
        </div>

        <!-- Dialogue Box -->
        <div class="adventure-dialogue-box hidden" id="adventure-dialogue">
          <div class="dialogue-avatar" id="dialogue-avatar">📜</div>
          <div class="dialogue-text-wrap">
            <h5 id="dialogue-speaker-name">Royal Scholar</h5>
            <p id="dialogue-body-text">Welcome to the royal court.</p>
          </div>
          <button class="dialogue-close-btn" id="btn-dialogue-close">✖</button>
        </div>

        <!-- Discovery Riddle Modal -->
        <div class="discovery-riddle-modal hidden" id="discovery-riddle-modal">
          <div class="riddle-card ancient-panel">
            <div class="riddle-header">
              <span class="riddle-badge">HISTORICAL MISSION</span>
              <h4 id="riddle-title">${this.stateData.history.discoveryMission.name}</h4>
            </div>
            <p class="riddle-prompt">${this.stateData.history.discoveryMission.quizQuestion}</p>
            <div class="riddle-options" id="riddle-options-list">
              ${this.stateData.history.discoveryMission.quizOptions.map((opt, i) => `
                <button class="riddle-option-btn" data-index="${i}">
                  <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                  <span class="option-text">${opt}</span>
                </button>
              `).join('')}
            </div>
            <div class="riddle-feedback hidden" id="riddle-feedback"></div>
          </div>
        </div>
      </div>
    `;

    this.canvas = viewport.querySelector('#adventure-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.ctx.imageSmoothingEnabled = false; // Pixel art crisp scaling
      this.draw();
    }

    // Dialogue close button
    const btnDiagClose = viewport.querySelector('#btn-dialogue-close');
    if (btnDiagClose) {
      btnDiagClose.addEventListener('click', () => {
        soundSynth.playClick();
        this.hideDialogue();
      });
    }

    // Riddle option handlers
    const optButtons = viewport.querySelectorAll('.riddle-option-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.dataset.index, 10);
        this.handleRiddleAnswer(selectedIdx);
      });
    });
  }

  setupControls() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (e.key === 'e' || e.key === 'E' || e.key === ' ') {
        this.interact();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Touch D-Pad buttons
    const bindBtn = (id, key) => {
      const btn = this.container.querySelector(`#${id}`);
      if (!btn) return;
      btn.addEventListener('mousedown', () => { this.keys[key] = true; });
      btn.addEventListener('mouseup', () => { this.keys[key] = false; });
      btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys[key] = true; });
      btn.addEventListener('touchend', (e) => { e.preventDefault(); this.keys[key] = false; });
    };

    bindBtn('btn-dpad-up', 'arrowup');
    bindBtn('btn-dpad-down', 'arrowdown');
    bindBtn('btn-dpad-left', 'arrowleft');
    bindBtn('btn-dpad-right', 'arrowright');

    const btnAction = this.container.querySelector('#btn-dpad-action');
    if (btnAction) {
      btnAction.addEventListener('click', () => {
        soundSynth.playClick();
        this.interact();
      });
    }
  }

  startLoop() {
    const loop = () => {
      if (!this.isGameOver) {
        this.update();
        this.draw();
        this.animationFrameId = requestAnimationFrame(loop);
      }
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  update() {
    if (!this.isGameActive || this.isDemoMode) return;

    let dx = 0;
    let dy = 0;

    if (this.keys['arrowup'] || this.keys['w']) { dy -= this.player.speed; this.player.direction = 'up'; }
    if (this.keys['arrowdown'] || this.keys['s']) { dy += this.player.speed; this.player.direction = 'down'; }
    if (this.keys['arrowleft'] || this.keys['a']) { dx -= this.player.speed; this.player.direction = 'left'; }
    if (this.keys['arrowright'] || this.keys['d']) { dx += this.player.speed; this.player.direction = 'right'; }

    if (dx !== 0 || dy !== 0) {
      this.player.isMoving = true;
      this.player.frame++;
      this.player.x = Math.max(30, Math.min(610 - this.player.width, this.player.x + dx));
      this.player.y = Math.max(80, Math.min(330 - this.player.height, this.player.y + dy));
    } else {
      this.player.isMoving = false;
    }
  }

  interact() {
    // Find nearby entity within 45px
    for (const ent of this.entities) {
      const dist = Math.hypot((this.player.x + 12) - (ent.x + 16), (this.player.y + 16) - (ent.y + 16));
      if (dist < 55) {
        soundSynth.playClick();
        if (ent.id === 'npc-scholar') {
          this.showDialogue(ent.name, ent.dialogue);
        } else if (ent.id === 'stone-edict') {
          this.openRiddleModal();
        } else if (ent.id === 'artifact-chest') {
          if (ent.locked) {
            this.showDialogue('Royal Reliquary', 'This chest is locked. Decipher the Stone Edict riddle first to break the ancient seal!');
          } else {
            soundSynth.playVictory();
            this.finishGame(true, 150, this.stateData.history.artifact.name);
          }
        }
        return;
      }
    }
  }

  openRiddleModal() {
    const modal = this.container.querySelector('#discovery-riddle-modal');
    if (modal) modal.classList.remove('hidden');
    soundSynth.playBell();
  }

  handleRiddleAnswer(index) {
    const mission = this.stateData.history.discoveryMission;
    const feedback = this.container.querySelector('#riddle-feedback');
    const modal = this.container.querySelector('#discovery-riddle-modal');

    if (index === mission.correctAnswer) {
      feedback.className = 'riddle-feedback success';
      feedback.textContent = `Correct! ${mission.explanation}`;
      feedback.classList.remove('hidden');
      soundSynth.playVictory();

      // Unlock chest
      const chest = this.entities.find(e => e.id === 'artifact-chest');
      if (chest) chest.locked = false;

      setTimeout(() => {
        if (modal) modal.classList.add('hidden');
        this.showDialogue('Mission Complete!', 'The seal on the Royal Reliquary Chest is now broken. Walk down to open it and collect the sacred artifact!');
      }, 2000);
    } else {
      feedback.className = 'riddle-feedback error';
      feedback.textContent = 'Not quite! Re-read the inscription and try another option.';
      feedback.classList.remove('hidden');
      soundSynth.playClack();
    }
  }

  showDialogue(speaker, text) {
    const diag = this.container.querySelector('#adventure-dialogue');
    const elSpeaker = this.container.querySelector('#dialogue-speaker-name');
    const elText = this.container.querySelector('#dialogue-body-text');
    if (elSpeaker) elSpeaker.textContent = speaker;
    if (elText) elText.textContent = text;
    if (diag) diag.classList.remove('hidden');
  }

  hideDialogue() {
    const diag = this.container.querySelector('#adventure-dialogue');
    if (diag) diag.classList.add('hidden');
  }

  autoMovePlayer(targetX, targetY, callback) {
    const step = () => {
      const dx = targetX - this.player.x;
      const dy = targetY - this.player.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 4) {
        this.player.x = targetX;
        this.player.y = targetY;
        this.draw();
        if (callback) callback();
      } else {
        this.player.x += (dx / dist) * 3;
        this.player.y += (dy / dist) * 3;
        this.draw();
        requestAnimationFrame(step);
      }
    };
    step();
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. Draw Ancient Stone Courtyard Floor
    ctx.fillStyle = '#E8DFD0';
    ctx.fillRect(0, 0, w, h);

    // Stone flagstone grid
    ctx.strokeStyle = '#D8CBB6';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 2. Decorative Courtyard Walls & Pillars
    ctx.fillStyle = '#B69A62';
    ctx.fillRect(0, 0, w, 40); // Top wall
    ctx.fillStyle = '#493A2D';
    ctx.font = '12px serif';
    ctx.fillText('🏛️ CHOLA ROYAL PALACE COURTYARD — 1010 CE', 20, 25);

    // Stone pillars
    [64, 192, 384, 544].forEach(px => {
      ctx.fillStyle = '#D8CBB6';
      ctx.fillRect(px, 35, 20, 35);
      ctx.fillStyle = '#B69A62';
      ctx.fillRect(px - 2, 35, 24, 6);
    });

    // 3. Draw Entities
    for (const ent of this.entities) {
      // Shadow
      ctx.fillStyle = 'rgba(73, 58, 45, 0.2)';
      ctx.beginPath();
      ctx.ellipse(ent.x + ent.width / 2, ent.y + ent.height - 2, ent.width / 2, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Entity Icon / Pixel representation
      ctx.font = '24px sans-serif';
      ctx.fillText(ent.icon, ent.x, ent.y + ent.height - 6);

      // Label
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#493A2D';
      ctx.textAlign = 'center';
      ctx.fillText(ent.name.split(' ')[0], ent.x + ent.width / 2, ent.y - 4);
      ctx.textAlign = 'start';
    }

    // 4. Draw Explorer Player Avatar
    const p = this.player;
    ctx.fillStyle = 'rgba(73, 58, 45, 0.25)';
    ctx.beginPath();
    ctx.ellipse(p.x + p.width / 2, p.y + p.height - 2, p.width / 2, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body (Kurta/Sherwani)
    ctx.fillStyle = gameState.state.avatar.clothingColor || '#B76E4B';
    ctx.fillRect(p.x + 4, p.y + 12, 16, 16);

    // Head (Skin tone)
    ctx.fillStyle = gameState.state.avatar.skinTone || '#E0BC95';
    ctx.beginPath();
    ctx.arc(p.x + 12, p.y + 8, 8, 0, Math.PI * 2);
    ctx.fill();

    // Headwear / Turban
    ctx.fillStyle = '#B69A62';
    ctx.fillRect(p.x + 3, p.y - 1, 18, 6);

    // Direction indicator / feet
    ctx.fillStyle = '#2B1E16';
    ctx.fillRect(p.x + 5, p.y + 28, 5, 4);
    ctx.fillRect(p.x + 14, p.y + 28, 5, 4);

    // Player Name Tag
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = '#B76E4B';
    ctx.textAlign = 'center';
    ctx.fillText(gameState.state.avatar.name || 'Explorer', p.x + p.width / 2, p.y - 6);
    ctx.textAlign = 'start';
  }

  destroy() {
    super.destroy();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
