// js/games/traditionalGames.js
// ITIHASAM: Playable Traditional Games in Pixel-RPG Style (Pallanguzhi & Aadu Puli Aattam)

import { BaseMiniGame } from './gameEngine.js';
import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { escapeHTML } from '../i18n.js';

export class PallanguzhiGame extends BaseMiniGame {
  constructor(containerId, options = {}) {
    super(containerId, {
      title: options.title || 'Ancient Pallanguzhi Board Game',
      points: options.points || 200,
      ...options
    });

    // 14 pits: 0-6 (Player bottom row), 7-13 (AI top row, right to left)
    this.pits = Array(14).fill(5); // 5 cowrie shells per pit
    this.playerStore = 0;
    this.aiStore = 0;
    this.currentPlayer = 'player'; // 'player' or 'ai' (in Pass & Play, 'ai' is Player 2)
    this.animating = false;
    this.supportsTwoPlayer = true;
  }

  p1Name() { return this.twoPlayer ? 'Player 1' : (gameState.state.avatar.name || 'Your Explorer'); }
  p2Name() { return this.twoPlayer ? 'Player 2' : 'Royal Scholar'; }

  runDemoSequence() {
    this.renderBoard();
    const demoSteps = [
      {
        title: 'Step 1: The 14 Sacred Pits',
        desc: 'Each player commands 7 pits. Every pit begins seeded with 5 sacred cowrie shells.',
        action: () => {
          this.highlightPits([0, 1, 2, 3, 4, 5, 6], 'player-highlight');
          soundSynth.playBell();
        }
      },
      {
        title: 'Step 2: Sowing the Cowrie Shells',
        desc: 'Picking shells from a pit and dropping one into each subsequent pit counter-clockwise.',
        action: () => {
          this.clearHighlights();
          this.highlightPits([2], 'active-pit');
          soundSynth.playClack();
          this.simulateSow(2, () => {});
        }
      },
      {
        title: 'Step 3: Strategic Empty-Pit Capture',
        desc: 'When your sowing hand empties and the next pit is vacant, you capture all shells from the opposite pit!',
        action: () => {
          this.highlightPits([4], 'active-pit');
          this.highlightPits([10], 'capture-pit');
          soundSynth.playCowrieRoll();
        }
      },
      {
        title: 'Step 4: Victory Condition',
        desc: 'The explorer with the most captured cowrie shells wins Cultural Discovery Points and the Master Badge!',
        action: () => {
          this.clearHighlights();
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
      this.demoTimer = setTimeout(executeNextStep, 3200);
    };

    executeNextStep();
  }

  onInteractiveStart() {
    // Reset board for real game
    this.pits = Array(14).fill(5);
    this.playerStore = 0;
    this.aiStore = 0;
    this.currentPlayer = 'player';
    this.animating = false;
    this.renderBoard();
    this.updateNarration(
      `${this.p1Name()}: Pick a Pit`,
      'Click (or Tab to and press Enter on) any pit on the bottom row containing cowrie shells to begin sowing.'
    );
  }

  renderBoard() {
    const viewport = this.container.querySelector('#game-viewport');
    if (!viewport) return;

    viewport.innerHTML = `
      <div class="pallanguzhi-container">
        <!-- AI Score / Top Row (Pits 13 down to 7) -->
        <div class="player-panel ai-panel">
          <div class="player-avatar-badge">${this.twoPlayer ? '👤' : '🤖'} ${escapeHTML(this.p2Name())}${this.twoPlayer ? '' : ' (Opponent)'}</div>
          <div class="score-pill">Captured Shells: <span id="ai-score" class="font-bold">${this.aiStore}</span></div>
        </div>

        <div class="wooden-board-frame">
          <div class="board-carvings top-carving">❧ ✤ ANCIENT TAMIL PALLANGUZHI BOARD ✤ ☙</div>

          <!-- Top Row (AI Pits 13 to 7) -->
          <div class="pits-row top-row" id="top-pits-row">
            ${[13, 12, 11, 10, 9, 8, 7].map(idx => `
              <div class="pit-slot ${this.twoPlayer ? 'p2-pit' : ''}" data-index="${idx}" id="pit-${idx}" ${this.twoPlayer ? 'role="button" tabindex="0"' : ''} aria-label="${escapeHTML(this.p2Name())} pit ${idx - 6}: ${this.pits[idx]} shells">
                <div class="pit-number">${this.twoPlayer ? 'P2' : 'AI'} ${idx - 6}</div>
                <div class="pit-bowl">
                  <div class="shell-cluster" id="cluster-${idx}">
                    ${this.renderShells(this.pits[idx])}
                  </div>
                  <span class="shell-count">${this.pits[idx]}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Divider with Traditional Ornamental Motif -->
          <div class="board-hinge-line">
            <span class="brass-hinge"></span>
            <span class="brass-hinge"></span>
            <span class="brass-hinge"></span>
          </div>

          <!-- Bottom Row (Player Pits 0 to 6) -->
          <div class="pits-row bottom-row" id="bottom-pits-row">
            ${[0, 1, 2, 3, 4, 5, 6].map(idx => `
              <div class="pit-slot player-pit" data-index="${idx}" id="pit-${idx}" role="button" tabindex="0" aria-label="${escapeHTML(this.p1Name())} pit ${idx + 1}: ${this.pits[idx]} shells">
                <div class="pit-bowl">
                  <div class="shell-cluster" id="cluster-${idx}">
                    ${this.renderShells(this.pits[idx])}
                  </div>
                  <span class="shell-count">${this.pits[idx]}</span>
                </div>
                <div class="pit-number">P ${idx + 1}</div>
              </div>
            `).join('')}
          </div>

          <div class="board-carvings bottom-carving">❧ ✤ SOW COUNTER-CLOCKWISE • CAPTURE OPPOSITES ✤ ☙</div>
        </div>

        <!-- Player Score / Bottom Row -->
        <div class="player-panel user-panel">
          <div class="player-avatar-badge">👤 ${escapeHTML(this.p1Name())}${this.twoPlayer ? '' : ' (You)'}</div>
          <div class="score-pill">Captured Shells: <span id="player-score" class="font-bold text-gold">${this.playerStore}</span></div>
          <div class="turn-indicator" id="turn-indicator">Your Turn</div>
        </div>
      </div>
    `;

    // Attach click + keyboard events to pits that the current human may play
    const choose = (pit) => {
      if (this.isDemoMode || !this.isGameActive || this.animating) return;
      const index = parseInt(pit.dataset.index, 10);
      const isP1Pit = index <= 6;
      if (isP1Pit && this.currentPlayer !== 'player') return;
      if (!isP1Pit && !(this.twoPlayer && this.currentPlayer === 'ai')) return;
      if (this.pits[index] > 0) this.handlePlayerMove(index);
    };
    viewport.querySelectorAll('.player-pit, .p2-pit').forEach(pit => {
      pit.addEventListener('click', () => choose(pit));
      pit.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(pit); }
      });
    });
  }

  renderShells(count) {
    if (count === 0) return '<span class="empty-pit-label">Empty</span>';
    const displayCount = Math.min(count, 12);
    let html = '';
    for (let i = 0; i < displayCount; i++) {
      html += `<span class="cowrie-shell" style="transform: rotate(${i * 32}deg)">🐚</span>`;
    }
    return html;
  }

  highlightPits(indices, className) {
    indices.forEach(idx => {
      const el = this.container.querySelector(`#pit-${idx}`);
      if (el) el.classList.add(className);
    });
  }

  clearHighlights() {
    const all = this.container.querySelectorAll('.pit-slot');
    all.forEach(el => {
      el.classList.remove('player-highlight', 'active-pit', 'capture-pit');
    });
  }

  simulateSow(startPit, callback) {
    let shells = this.pits[startPit];
    this.pits[startPit] = 0;
    this.updatePitVisual(startPit);

    let curr = startPit;
    const interval = setInterval(() => {
      if (shells <= 0) {
        clearInterval(interval);
        if (callback) callback();
        return;
      }
      curr = (curr + 1) % 14;
      this.pits[curr]++;
      this.updatePitVisual(curr);
      soundSynth.playClack();
      shells--;
    }, 250);
  }

  handlePlayerMove(pitIndex) {
    this.animating = true;
    soundSynth.playCowrieRoll();
    const label = pitIndex <= 6 ? `Pit ${pitIndex + 1}` : `Pit ${pitIndex - 6}`;
    this.updateNarration('Sowing Shells...', `Sowing shells from ${label} counter-clockwise.`);

    this.sowRecursive(pitIndex, () => {
      if (this.checkGameEnd()) return;

      if (this.twoPlayer) {
        this.currentPlayer = this.currentPlayer === 'player' ? 'ai' : 'player';
        const name = this.currentPlayer === 'player' ? this.p1Name() : this.p2Name();
        const row = this.currentPlayer === 'player' ? 'bottom' : 'top';
        this.updateTurnIndicator(`${name}'s Turn`);
        this.updateNarration(`${name}'s Turn`, `Pick a pit on the ${row} row with shells. Pass the device!`);
        return;
      }

      this.currentPlayer = 'ai';
      this.updateTurnIndicator('Opponent is calculating...');
      setTimeout(() => this.handleAIMove(), 1000);
    });
  }

  // Fast, non-animated simulation of one full turn (used by the AI)
  simulateTurn(pits, startPit, mover) {
    const p = pits.slice();
    let captured = 0;
    let shells = p[startPit];
    p[startPit] = 0;
    let curr = startPit;
    let guard = 0;
    while (guard++ < 500) {
      while (shells > 0) { curr = (curr + 1) % 14; p[curr]++; shells--; }
      const next = (curr + 1) % 14;
      if (p[next] > 0) { shells = p[next]; p[next] = 0; curr = next; continue; }
      const opp = 13 - next;
      captured = p[opp];
      p[opp] = 0;
      break;
    }
    const mySide = mover === 'ai' ? p.slice(7, 14) : p.slice(0, 7);
    return { captured, remaining: mySide.reduce((a, b) => a + b, 0) };
  }

  handleAIMove() {
    if (!this.isGameActive) return;
    // AI simulates every legal pit and picks the one capturing the most
    // shells (ties broken by keeping more shells on its own side).
    let bestPit = -1;
    let maxShells = 0;
    let bestScore = -Infinity;
    for (let i = 7; i <= 13; i++) {
      if (this.pits[i] === 0) continue;
      const sim = this.simulateTurn(this.pits, i, 'ai');
      const score = sim.captured * 10 + sim.remaining * 0.2 + Math.random();
      if (score > bestScore) {
        bestScore = score;
        bestPit = i;
        maxShells = this.pits[i];
      }
    }

    if (bestPit === -1 || maxShells === 0) {
      this.checkGameEnd(true);
      return;
    }

    this.animating = true;
    soundSynth.playCowrieRoll();
    this.updateNarration('Royal Scholar Plays...', `Opponent picked Pit AI ${bestPit - 6}.`);

    this.sowRecursive(bestPit, () => {
      if (this.checkGameEnd()) return;
      this.currentPlayer = 'player';
      this.animating = false;
      this.updateTurnIndicator('Your Turn');
      this.updateNarration('Your Turn!', 'Pick a pit with cowrie shells to continue your strategy.');
    });
  }

  sowRecursive(startPit, onTurnDone) {
    let shells = this.pits[startPit];
    this.pits[startPit] = 0;
    this.updatePitVisual(startPit);

    let curr = startPit;
    let relays = 0; // safety cap so a relay chain can never loop forever
    const sowNext = () => {
      if (shells > 0) {
        curr = (curr + 1) % 14;
        this.pits[curr]++;
        this.updatePitVisual(curr);
        soundSynth.playClack();
        shells--;
        setTimeout(sowNext, 200);
      } else {
        // Hand is empty! Check next pit
        const nextPit = (curr + 1) % 14;
        if (this.pits[nextPit] > 0 && relays++ < 40) {
          // Take shells from next pit and continue!
          shells = this.pits[nextPit];
          this.pits[nextPit] = 0;
          this.updatePitVisual(nextPit);
          soundSynth.playClack();
          curr = nextPit;
          setTimeout(sowNext, 250);
        } else {
          // Next pit is EMPTY! Check opposite pit for CAPTURE!
          const oppositePit = 13 - nextPit;
          const captured = this.pits[oppositePit];
          if (captured > 0) {
            this.pits[oppositePit] = 0;
            this.updatePitVisual(oppositePit);
            if (this.currentPlayer === 'player') {
              this.playerStore += captured;
              this.updateScoreDisplay('player-score', this.playerStore);
              this.updateNarration('Capture!', `Captured ${captured} cowrie shells from opposite Pit!`);
            } else {
              this.aiStore += captured;
              this.updateScoreDisplay('ai-score', this.aiStore);
              this.updateNarration('Opponent Capture!', `Opponent captured ${captured} cowrie shells.`);
            }
            soundSynth.playVictory();
          }
          this.animating = false;
          onTurnDone();
        }
      }
    };

    setTimeout(sowNext, 200);
  }

  updatePitVisual(idx) {
    const bowl = this.container.querySelector(`#cluster-${idx}`);
    const slot = this.container.querySelector(`#pit-${idx}`);
    const countEl = this.container.querySelector(`#pit-${idx} .shell-count`);
    if (bowl) bowl.innerHTML = this.renderShells(this.pits[idx]);
    if (countEl) countEl.textContent = this.pits[idx];
    if (slot && slot.hasAttribute('aria-label')) {
      slot.setAttribute('aria-label', slot.getAttribute('aria-label').replace(/\d+ shells$/, `${this.pits[idx]} shells`));
    }
  }

  updateScoreDisplay(id, val) {
    const el = this.container.querySelector(`#${id}`);
    if (el) el.textContent = val;
  }

  updateTurnIndicator(text) {
    const el = this.container.querySelector('#turn-indicator');
    if (el) el.textContent = text;
  }

  checkGameEnd(forceEnd = false) {
    const playerShells = this.pits.slice(0, 7).reduce((a, b) => a + b, 0);
    const aiShells = this.pits.slice(7, 14).reduce((a, b) => a + b, 0);

    // If either side has no shells left or sufficient captures made
    if (forceEnd || playerShells === 0 || aiShells === 0 || (this.playerStore + this.aiStore >= 40)) {
      // Remaining shells go to the side they are on
      this.playerStore += playerShells;
      this.aiStore += aiShells;
      for (let i = 0; i < 14; i++) { this.pits[i] = 0; this.updatePitVisual(i); }
      this.updateScoreDisplay('player-score', this.playerStore);
      this.updateScoreDisplay('ai-score', this.aiStore);
      if (this.twoPlayer) {
        const winner = this.playerStore === this.aiStore ? 'It is a draw' : (this.playerStore > this.aiStore ? `${this.p1Name()} wins` : `${this.p2Name()} wins`);
        this.updateNarration(`${winner}!`, `Final shells: ${this.playerStore} – ${this.aiStore}`);
        this.finishGame(true, this.options.points, 'Pallanguzhi — Pass & Play', { gameKey: 'pallanguzhi' });
      } else {
        const victory = this.playerStore > this.aiStore;
        this.finishGame(victory, this.options.points, 'Master of Pallanguzhi Badge', {
          gameKey: 'pallanguzhi',
          lossMessage: `Final shells: you ${this.playerStore} – ${this.aiStore} Royal Scholar. Capture more from empty pits next time!`
        });
      }
      return true;
    }
    return false;
  }
}
