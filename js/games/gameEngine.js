// js/games/gameEngine.js
// DISCOVER INDIA: Unified Game Engine & Demo Mode Orchestrator

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';

export class BaseMiniGame {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.stateId = options.stateId || 'tamil-nadu';
    this.categoryKey = options.categoryKey || 'games';
    this.isDemoMode = true;
    this.demoStep = 0;
    this.demoTimer = null;
    this.isGameActive = false;
    this.isGameOver = false;
    this.score = 0;
    this.demoNarrations = [];
    this.onCompleteCallback = options.onComplete || null;
  }

  // Lifecycle
  init() {
    this.renderContainer();
    this.startDemoMode();
  }

  renderContainer() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="game-wrapper pixel-border">
        <!-- Game Header -->
        <div class="game-header">
          <div class="game-title-group">
            <span class="mode-badge" id="game-mode-badge">DEMO MODE: WATCH & LEARN</span>
            <h3 class="game-title" id="game-heading-title">${this.options.title || 'Cultural Mini-Game'}</h3>
          </div>
          <div class="game-stats-group">
            <div class="stat-pill"><span class="stat-label">REWARD:</span> <span class="stat-value text-gold">+${this.options.points || 200} CDP</span></div>
            <button class="btn-icon" id="btn-skip-demo" title="Skip to Play">⚡ Play Now</button>
          </div>
        </div>

        <!-- Demonstration Banner / Narration Box -->
        <div class="demo-narration-bar" id="demo-narration-box">
          <div class="narration-icon">💡</div>
          <div class="narration-content">
            <h4 id="narration-step-title">How To Play</h4>
            <p id="narration-step-desc">Observe the automated demonstration to learn the controls, strategy, and winning conditions.</p>
          </div>
        </div>

        <!-- Interactive Canvas / Board Viewport -->
        <div class="game-viewport" id="game-viewport">
          <!-- Game Specific HTML / Canvas injected by subclass -->
        </div>

        <!-- "READY TO PLAY?" Overlay (Appears after demo finishes) -->
        <div class="demo-ready-overlay hidden" id="demo-ready-overlay">
          <div class="ready-card ancient-panel">
            <div class="card-motif">🕉️</div>
            <h3>READY TO PLAY?</h3>
            <p>You have seen the demonstration. Step into the arena as your custom explorer and earn Cultural Discovery Points!</p>
            <div class="ready-buttons">
              <button class="btn-ancient btn-gold" id="btn-start-game-now">▶ PLAY GAME</button>
              <button class="btn-ancient btn-secondary" id="btn-replay-demo">🔄 REPLAY DEMO</button>
              <button class="btn-ancient btn-terracotta" id="btn-customize-avatar-game">👤 CUSTOMIZE AVATAR</button>
            </div>
          </div>
        </div>

        <!-- Game Over / Victory Overlay -->
        <div class="game-victory-overlay hidden" id="game-victory-overlay">
          <div class="victory-card ancient-panel">
            <div class="victory-icon">🏆</div>
            <h3 id="victory-title">VICTORY & MASTERY!</h3>
            <p id="victory-desc">You have successfully mastered this cultural challenge!</p>
            <div class="reward-highlight">
              <span class="points-awarded" id="victory-points-display">+200 CDP</span>
              <span class="artifact-awarded" id="victory-artifact-display">Artifact Unlocked!</span>
            </div>
            <div class="victory-buttons">
              <button class="btn-ancient btn-gold" id="btn-victory-continue">CONTINUE JOURNEY</button>
              <button class="btn-ancient btn-secondary" id="btn-victory-replay">PLAY AGAIN</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Hook buttons
    const btnSkip = this.container.querySelector('#btn-skip-demo');
    if (btnSkip) {
      btnSkip.addEventListener('click', () => {
        soundSynth.playClick();
        this.stopDemoAndShowReady();
      });
    }

    const btnPlay = this.container.querySelector('#btn-start-game-now');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        soundSynth.playClick();
        this.startInteractivePlay();
      });
    }

    const btnReplay = this.container.querySelector('#btn-replay-demo');
    if (btnReplay) {
      btnReplay.addEventListener('click', () => {
        soundSynth.playClick();
        this.startDemoMode();
      });
    }

    const btnAvatar = this.container.querySelector('#btn-customize-avatar-game');
    if (btnAvatar) {
      btnAvatar.addEventListener('click', () => {
        soundSynth.playClick();
        if (window.appRouter) {
          window.appRouter.navigate('avatar-customizer');
        }
      });
    }

    const btnVictoryCont = this.container.querySelector('#btn-victory-continue');
    if (btnVictoryCont) {
      btnVictoryCont.addEventListener('click', () => {
        soundSynth.playClick();
        if (this.onCompleteCallback) this.onCompleteCallback();
        if (window.appRouter) window.appRouter.navigate('state-detail', { stateId: this.stateId });
      });
    }

    const btnVictoryReplay = this.container.querySelector('#btn-victory-replay');
    if (btnVictoryReplay) {
      btnVictoryReplay.addEventListener('click', () => {
        soundSynth.playClick();
        this.startInteractivePlay();
      });
    }
  }

  updateNarration(title, desc) {
    const elTitle = this.container.querySelector('#narration-step-title');
    const elDesc = this.container.querySelector('#narration-step-desc');
    if (elTitle) elTitle.textContent = title;
    if (elDesc) elDesc.textContent = desc;
  }

  stopDemoAndShowReady() {
    this.isDemoMode = false;
    if (this.demoTimer) {
      clearTimeout(this.demoTimer);
      clearInterval(this.demoTimer);
      this.demoTimer = null;
    }
    const overlay = this.container.querySelector('#demo-ready-overlay');
    if (overlay) overlay.classList.remove('hidden');
    soundSynth.playBell();
  }

  startDemoMode() {
    this.isDemoMode = true;
    this.isGameActive = false;
    this.demoStep = 0;
    const overlay = this.container.querySelector('#demo-ready-overlay');
    if (overlay) overlay.classList.add('hidden');
    const vicOverlay = this.container.querySelector('#game-victory-overlay');
    if (vicOverlay) vicOverlay.classList.add('hidden');

    const badge = this.container.querySelector('#game-mode-badge');
    if (badge) {
      badge.textContent = 'DEMO MODE: WATCH & LEARN';
      badge.className = 'mode-badge demo';
    }

    this.runDemoSequence();
  }

  startInteractivePlay() {
    this.isDemoMode = false;
    this.isGameActive = true;
    this.isGameOver = false;

    const overlay = this.container.querySelector('#demo-ready-overlay');
    if (overlay) overlay.classList.add('hidden');
    const vicOverlay = this.container.querySelector('#game-victory-overlay');
    if (vicOverlay) vicOverlay.classList.add('hidden');

    const badge = this.container.querySelector('#game-mode-badge');
    if (badge) {
      badge.textContent = 'PLAYER TURN: YOU ARE PLAYING';
      badge.className = 'mode-badge active';
    }

    const btnSkip = this.container.querySelector('#btn-skip-demo');
    if (btnSkip) btnSkip.classList.add('hidden');

    this.updateNarration(
      'Your Turn, Explorer!',
      'Follow the on-screen prompts and controls to complete the challenge and win discovery points.'
    );

    soundSynth.playBell();
    this.onInteractiveStart();
  }

  finishGame(victory = true, points = 200, artifactName = '') {
    this.isGameOver = true;
    this.isGameActive = false;
    soundSynth.playVictory();

    // Award points and record completion in central game state
    gameState.completeActivity(this.stateId, this.categoryKey, points);

    const vicOverlay = this.container.querySelector('#game-victory-overlay');
    const vicTitle = this.container.querySelector('#victory-title');
    const vicDesc = this.container.querySelector('#victory-desc');
    const vicPts = this.container.querySelector('#victory-points-display');
    const vicArt = this.container.querySelector('#victory-artifact-display');

    if (vicPts) vicPts.textContent = `+${points} CDP Earned!`;
    if (vicArt) vicArt.textContent = artifactName || 'Cultural Badge Unlocked!';
    if (vicDesc) {
      vicDesc.textContent = victory 
        ? `Magnificent! You have mastered the ${this.options.title || 'challenge'} and preserved Indian cultural heritage.`
        : 'Good effort! Replay to achieve total mastery.';
    }

    if (vicOverlay) vicOverlay.classList.remove('hidden');
  }

  // To be implemented by subclasses
  runDemoSequence() {}
  onInteractiveStart() {}
  destroy() {
    if (this.demoTimer) {
      clearTimeout(this.demoTimer);
      clearInterval(this.demoTimer);
      this.demoTimer = null;
    }
  }
}
