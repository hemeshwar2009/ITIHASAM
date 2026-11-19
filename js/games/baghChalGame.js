// js/games/baghChalGame.js
// ITIHASAM: Bagh-Chal / Aadu Puli Aattam — the hunt game of tigers and goats.
// 5x5 point board. 4 tigers start in the corners; 20 goats are placed one per
// turn, then moved. Tigers capture by jumping over a goat in a straight line.
// Goats win by trapping every tiger. Tigers win by capturing 5 goats.
// Classroom house rule: goats also win if they survive 40 goat turns.

import { BaseMiniGame } from './gameEngine.js';
import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { escapeHTML } from '../i18n.js';

const N = 5;
const TOTAL_GOATS = 20;
const TIGER_WIN_CAPTURES = 5;
const GOAT_SURVIVE_TURNS = 40;

const idx = (r, c) => r * N + c;
const rc = (i) => [Math.floor(i / N), i % N];

function directions(i) {
  const [r, c] = rc(i);
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  if ((r + c) % 2 === 0) dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
  return dirs;
}

function inside(r, c) { return r >= 0 && r < N && c >= 0 && c < N; }

export class BaghChalGame extends BaseMiniGame {
  constructor(containerId, options = {}) {
    super(containerId, { title: options.title || 'Bagh-Chal: Tigers & Goats', points: options.points || 200, ...options });
    this.supportsTwoPlayer = true;
    this.reset();
  }

  reset() {
    this.board = Array(N * N).fill(null);
    [idx(0, 0), idx(0, 4), idx(4, 0), idx(4, 4)].forEach(i => { this.board[i] = 'T'; });
    this.goatsToPlace = TOTAL_GOATS;
    this.captured = 0;
    this.turn = 'G';
    this.goatTurns = 0;
    this.selected = null;
    this.busy = false;
  }

  goatName() { return this.twoPlayer ? 'Goat player' : (gameState.state.avatar.name || 'You'); }
  tigerName() { return this.twoPlayer ? 'Tiger player' : 'Tiger AI'; }

  // ---------- Move generation ----------
  movesFor(i) {
    const piece = this.board[i];
    const out = [];
    const [r, c] = rc(i);
    for (const [dr, dc] of directions(i)) {
      const r1 = r + dr, c1 = c + dc;
      if (!inside(r1, c1)) continue;
      const j = idx(r1, c1);
      if (this.board[j] === null) out.push({ from: i, to: j, capture: null });
      else if (piece === 'T' && this.board[j] === 'G') {
        const r2 = r + 2 * dr, c2 = c + 2 * dc;
        if (inside(r2, c2) && this.board[idx(r2, c2)] === null) out.push({ from: i, to: idx(r2, c2), capture: j });
      }
    }
    return out;
  }

  allTigerMoves() {
    const moves = [];
    this.board.forEach((p, i) => { if (p === 'T') moves.push(...this.movesFor(i)); });
    return moves;
  }

  goatHasMove() {
    if (this.goatsToPlace > 0) return this.board.some(p => p === null);
    return this.board.some((p, i) => p === 'G' && this.movesFor(i).length > 0);
  }

  // ---------- Demo ----------
  runDemoSequence() {
    this.reset();
    this.renderBoard();
    const steps = [
      { title: 'Step 1: Four Tigers Guard the Corners', desc: 'In the Himalayan game of Bagh-Chal (Aadu Puli Aattam in Tamil Nadu), four tigers start on the corners.', action: () => this.flash([0, 4, 20, 24]) },
      { title: 'Step 2: Goats Enter One by One', desc: 'The goat player places 20 goats, one per turn, on any empty point. After all are placed, goats move along the lines.', action: () => { this.board[idx(2, 3)] = 'G'; this.board[idx(1, 1)] = 'G'; this.goatsToPlace -= 2; this.draw(); } },
      { title: 'Step 3: Tigers Pounce', desc: 'A tiger captures by jumping over a goat in a straight line onto an empty point — just like checkers.', action: () => { this.board[idx(0, 0)] = null; this.board[idx(1, 1)] = null; this.board[idx(2, 2)] = 'T'; this.captured = 1; this.draw(); soundSynth.playClack(); } },
      { title: 'Step 4: Trap Every Tiger', desc: `You play the goats. Block all tigers so none can move — or survive ${GOAT_SURVIVE_TURNS} goat turns losing fewer than ${TIGER_WIN_CAPTURES} goats.`, action: () => { soundSynth.playVictory(); setTimeout(() => this.stopDemoAndShowReady(), 1400); } }
    ];
    let i = 0;
    const next = () => {
      if (!this.isDemoMode || i >= steps.length) return;
      this.updateNarration(steps[i].title, steps[i].desc);
      steps[i].action();
      i++;
      this.demoTimer = setTimeout(next, 3600);
    };
    next();
  }

  onInteractiveStart() {
    this.reset();
    this.renderBoard();
    this.updateNarration(`${this.goatName()}: place a goat`, 'Click (or Tab to and press Enter on) any empty point to place a goat. Keep goats together so tigers cannot jump them!');
  }

  flash(points) {
    points.forEach(p => {
      const el = this.container.querySelector(`[data-pt="${p}"]`);
      if (el) el.classList.add('bc-flash');
    });
  }

  // ---------- Rendering ----------
  renderBoard() {
    const viewport = this.container.querySelector('#game-viewport');
    if (!viewport) return;
    viewport.innerHTML = `
      <div class="baghchal-container">
        <svg class="baghchal-board" id="bc-svg" viewBox="-10 -10 420 420" role="group" aria-label="Bagh-Chal board, 5 by 5 points"></svg>
        <div class="baghchal-side ancient-panel">
          <div class="bc-turn" id="bc-turn" aria-live="polite"></div>
          <div class="bc-stat"><span>🐐 Goats to place</span><strong id="bc-place">${this.goatsToPlace}</strong></div>
          <div class="bc-stat"><span>🐅 Goats captured</span><strong id="bc-captured">${this.captured} / ${TIGER_WIN_CAPTURES}</strong></div>
          <div class="bc-stat"><span>⏳ Goat turns</span><strong id="bc-turns">${this.goatTurns} / ${GOAT_SURVIVE_TURNS}</strong></div>
          <p class="bc-tip">Tip: goats on the edges are safer — a tiger can only jump into an empty point behind a goat.</p>
        </div>
      </div>`;
    this.draw();
  }

  draw() {
    const svg = this.container.querySelector('#bc-svg');
    if (!svg) return;
    const S = 100;
    let lines = '';
    for (let k = 0; k < N; k++) {
      lines += `<line x1="0" y1="${k * S}" x2="${4 * S}" y2="${k * S}"/><line x1="${k * S}" y1="0" x2="${k * S}" y2="${4 * S}"/>`;
    }
    lines += `<line x1="0" y1="0" x2="400" y2="400"/><line x1="400" y1="0" x2="0" y2="400"/>`;
    lines += `<polyline points="200,0 0,200 200,400 400,200 200,0" fill="none"/>`;

    const targets = new Set();
    if (this.selected !== null) this.movesFor(this.selected).forEach(m => targets.add(m.to));

    let pts = '';
    this.board.forEach((p, i) => {
      const [r, c] = rc(i);
      const x = c * S, y = r * S;
      const label = `Point row ${r + 1} column ${c + 1}: ${p === 'T' ? 'tiger' : p === 'G' ? 'goat' : 'empty'}${targets.has(i) ? ', move here' : ''}`;
      pts += `<g class="bc-point ${p ? 'has-' + p : ''} ${this.selected === i ? 'selected' : ''} ${targets.has(i) ? 'target' : ''}" data-pt="${i}" tabindex="0" role="button" aria-label="${escapeHTML(label)}">
        <circle cx="${x}" cy="${y}" r="26" class="bc-hit"/>
        <circle cx="${x}" cy="${y}" r="8" class="bc-dot"/>
        ${p ? `<text x="${x}" y="${y + 18}" text-anchor="middle" class="bc-piece">${p === 'T' ? '🐅' : '🐐'}</text>` : ''}
      </g>`;
    });
    svg.innerHTML = `<g class="bc-lines">${lines}</g>${pts}`;

    svg.querySelectorAll('.bc-point').forEach(g => {
      const i = parseInt(g.dataset.pt, 10);
      g.addEventListener('click', () => this.handlePoint(i));
      g.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.handlePoint(i); }
      });
    });

    const set = (id, v) => { const el = this.container.querySelector(id); if (el) el.textContent = v; };
    set('#bc-place', this.goatsToPlace);
    set('#bc-captured', `${this.captured} / ${TIGER_WIN_CAPTURES}`);
    set('#bc-turns', `${this.goatTurns} / ${GOAT_SURVIVE_TURNS}`);
    const turnEl = this.container.querySelector('#bc-turn');
    if (turnEl) turnEl.textContent = this.turn === 'G' ? `🐐 ${this.goatName()}'s turn` : `🐅 ${this.tigerName()}'s turn`;
  }

  // ---------- Interaction ----------
  handlePoint(i) {
    if (!this.isGameActive || this.isGameOver || this.busy) return;
    const humanSide = this.twoPlayer ? this.turn : 'G';
    if (this.turn !== humanSide) return;

    if (this.turn === 'G' && this.goatsToPlace > 0) {
      if (this.board[i] !== null) return;
      this.board[i] = 'G';
      this.goatsToPlace--;
      soundSynth.playClack();
      this.afterGoatMove();
      return;
    }

    const piece = this.turn;
    if (this.board[i] === piece) {
      this.selected = i;
      soundSynth.playClick();
      this.draw();
      const focusEl = this.container.querySelector(`[data-pt="${i}"]`);
      if (focusEl) focusEl.focus();
      return;
    }
    if (this.selected !== null) {
      const move = this.movesFor(this.selected).find(m => m.to === i);
      if (move) {
        this.applyMove(move);
        this.selected = null;
        if (piece === 'G') this.afterGoatMove();
        else this.afterTigerMove(move);
      }
    }
  }

  applyMove(m) {
    this.board[m.to] = this.board[m.from];
    this.board[m.from] = null;
    if (m.capture !== null) {
      this.board[m.capture] = null;
      this.captured++;
      soundSynth.playBell();
    } else {
      soundSynth.playClack();
    }
  }

  afterGoatMove() {
    this.goatTurns++;
    this.selected = null;
    if (this.checkEnd()) return;
    this.turn = 'T';
    this.draw();
    if (!this.twoPlayer) {
      this.busy = true;
      this.updateNarration('Tiger AI is stalking...', 'Watch which goats are exposed.');
      setTimeout(() => this.aiTigerMove(), 750);
    } else {
      this.updateNarration('Tiger player: select a tiger', 'Click a tiger, then a highlighted point. Jump over goats to capture.');
    }
  }

  afterTigerMove(move) {
    this.selected = null;
    if (move && move.capture !== null) this.updateNarration('A goat was captured!', `Tigers have captured ${this.captured} of ${TIGER_WIN_CAPTURES} needed.`);
    if (this.checkEnd()) return;
    this.turn = 'G';
    this.draw();
    if (!move || move.capture === null) {
      this.updateNarration(`${this.goatName()}'s turn`, this.goatsToPlace > 0 ? `Place a goat (${this.goatsToPlace} left).` : 'Select a goat, then a highlighted point to move it.');
    }
    if (this.turn === 'G' && !this.goatHasMove()) {
      // Goats cannot move: tigers win
      this.endGame('T');
    }
  }

  aiTigerMove() {
    this.busy = false;
    if (!this.isGameActive) return;
    const moves = this.allTigerMoves();
    if (moves.length === 0) { this.endGame('G'); return; }
    const captures = moves.filter(m => m.capture !== null);
    let choice;
    if (captures.length) {
      choice = captures[Math.floor(Math.random() * captures.length)];
    } else {
      // Pick the move that leaves tigers with the most future options / threats.
      let bestScore = -Infinity;
      moves.forEach(m => {
        const saved = this.board.slice();
        this.board[m.to] = 'T'; this.board[m.from] = null;
        const future = this.allTigerMoves();
        const score = future.length + future.filter(f => f.capture !== null).length * 4 + Math.random();
        this.board = saved;
        if (score > bestScore) { bestScore = score; choice = m; }
      });
    }
    this.applyMove(choice);
    this.afterTigerMove(choice);
  }

  checkEnd() {
    if (this.captured >= TIGER_WIN_CAPTURES) { this.endGame('T'); return true; }
    if (this.allTigerMoves().length === 0) { this.endGame('G'); return true; }
    if (this.goatTurns >= GOAT_SURVIVE_TURNS) { this.endGame('G', true); return true; }
    return false;
  }

  endGame(winner, survived = false) {
    if (this.isGameOver) return;
    this.isGameActive = false;
    this.draw();
    const why = winner === 'G'
      ? (survived ? `The goats survived ${GOAT_SURVIVE_TURNS} turns!` : 'Every tiger is trapped!')
      : `The tigers captured ${TIGER_WIN_CAPTURES} goats.`;
    if (this.twoPlayer) {
      this.updateNarration(`${winner === 'G' ? 'Goats' : 'Tigers'} win!`, why);
      this.finishGame(true, this.options.points, 'Bagh-Chal — Pass & Play', { gameKey: 'baghchal' });
    } else {
      this.updateNarration(winner === 'G' ? 'Goats win!' : 'Tigers win!', why);
      this.finishGame(winner === 'G', this.options.points, 'Tiger & Goat Tactician', {
        gameKey: 'baghchal',
        lossMessage: `${why} Keep goats in tight groups along the edges and try again!`
      });
    }
  }

  destroy() {
    super.destroy();
    this.isGameActive = false;
  }
}
