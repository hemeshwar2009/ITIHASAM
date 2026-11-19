// js/games/chauparGame.js
// ITIHASAM: Chaupar / Pachisi / Pagade / Ashta Chamma — cowrie-shell race game.
// Simplified classroom rules:
//  • Throw 6 cowrie shells. Number of shells landing mouth-up = steps moved
//    (0 mouth-up counts as a "grace throw" of 6). A 6 grants another throw.
//  • Each side races 2 pieces once around the 24-square track and into the
//    central Charkoni (home). An exact count is not needed to get home.
//  • Landing on an opponent's piece sends it back to its start,
//    unless it sits on a castle square (✦), which is safe.

import { BaseMiniGame } from './gameEngine.js';
import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { escapeHTML } from '../i18n.js';

const TRACK_LEN = 24;
const PIECES = 2;
const SAFE = [0, 6, 12, 18];

// Perimeter of a 7x7 grid, starting bottom-middle and running clockwise.
function buildTrack() {
  const cells = [];
  for (let c = 3; c >= 0; c--) cells.push([6, c]);
  for (let r = 5; r >= 0; r--) cells.push([r, 0]);
  for (let c = 1; c <= 6; c++) cells.push([0, c]);
  for (let r = 1; r <= 6; r++) cells.push([r, 6]);
  cells.push([6, 5], [6, 4]);
  return cells;
}

export class ChauparGame extends BaseMiniGame {
  constructor(containerId, options = {}) {
    super(containerId, { title: options.title || 'Royal Chaupar', points: options.points || 200, ...options });
    this.supportsTwoPlayer = true;
    this.variant = options.variant || 'Chaupar';
    this.track = buildTrack();
    this.resetGame();
  }

  resetGame() {
    // steps travelled per piece: 0..TRACK_LEN-1 on board, TRACK_LEN = home
    this.sides = {
      p1: { start: 0, pieces: Array(PIECES).fill(0), color: 'p1' },
      p2: { start: 12, pieces: Array(PIECES).fill(0), color: 'p2' }
    };
    this.turn = 'p1';
    this.throwValue = null;
    this.cowries = [];
    this.busy = false;
  }

  sideName(side) {
    if (side === 'p1') return this.twoPlayer ? 'Player 1' : (gameState.state.avatar.name || 'You');
    return this.twoPlayer ? 'Player 2' : 'Royal Rival';
  }

  cellOf(side, steps) {
    if (steps >= TRACK_LEN) return null;
    return (this.sides[side].start + steps) % TRACK_LEN;
  }

  // ---------- Demo ----------
  runDemoSequence() {
    this.resetGame();
    this.renderBoard();
    const steps = [
      { title: `Step 1: The ${this.variant} Track`, desc: 'Each side races two pieces once around the 24-square track and into the central Charkoni.', action: () => this.pulseCells([0, 12]) },
      { title: 'Step 2: Throw the Cowries', desc: 'Six cowrie shells are thrown. Each shell landing mouth-up moves you one square. Zero mouth-up is a grace throw worth 6!', action: () => { this.doThrow(4); } },
      { title: 'Step 3: Move a Piece', desc: 'Choose which of your pieces to move. Landing on a rival sends them back to start — except on safe castle squares ✦.', action: () => { this.applyMove('p1', 0, 4); this.render(); } },
      { title: 'Step 4: Race Home', desc: 'The first side to bring both pieces home to the Charkoni wins!', action: () => { soundSynth.playVictory(); setTimeout(() => this.stopDemoAndShowReady(), 1400); } }
    ];
    let i = 0;
    const next = () => {
      if (!this.isDemoMode || i >= steps.length) return;
      this.updateNarration(steps[i].title, steps[i].desc);
      steps[i].action();
      i++;
      this.demoTimer = setTimeout(next, 3400);
    };
    next();
  }

  onInteractiveStart() {
    this.resetGame();
    this.renderBoard();
    this.updateNarration(`${this.sideName('p1')}: throw the cowries`, 'Press "Throw Cowries" (or the T key) to begin.');
    this.bindKeys();
  }

  bindKeys() {
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    this.keyHandler = (e) => {
      if (!this.isGameActive || this.isGameOver) return;
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      const humanTurn = this.turn === 'p1' || this.twoPlayer;
      if (!humanTurn || this.busy) return;
      if (e.key === 't' || e.key === 'T') { e.preventDefault(); this.humanThrow(); }
      if ((e.key === '1' || e.key === '2') && this.throwValue) {
        this.humanMove(parseInt(e.key, 10) - 1);
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  // ---------- Rendering ----------
  renderBoard() {
    const viewport = this.container.querySelector('#game-viewport');
    if (!viewport) return;
    viewport.innerHTML = `
      <div class="chaupar-container">
        <div class="chaupar-board" id="chaupar-board" role="grid" aria-label="${escapeHTML(this.variant)} race track"></div>
        <div class="chaupar-side ancient-panel">
          <div class="chaupar-turn" id="chaupar-turn" aria-live="polite"></div>
          <div class="cowrie-tray" id="cowrie-tray" aria-label="Cowrie throw result"></div>
          <div class="chaupar-throw-value" id="chaupar-throw-value"></div>
          <button class="btn-ancient btn-gold btn-block" id="btn-throw">🐚 Throw Cowries [T]</button>
          <div class="chaupar-move-btns" id="chaupar-move-btns"></div>
          <div class="chaupar-legend">
            <span><span class="ch-piece p1">●</span> ${escapeHTML(this.sideName('p1'))}</span>
            <span><span class="ch-piece p2">●</span> ${escapeHTML(this.sideName('p2'))}</span>
            <span>✦ Safe castle</span>
          </div>
        </div>
      </div>`;
    viewport.querySelector('#btn-throw').addEventListener('click', () => this.humanThrow());
    this.render();
  }

  render() {
    const board = this.container.querySelector('#chaupar-board');
    if (!board) return;
    const occupancy = {};
    ['p1', 'p2'].forEach(side => {
      this.sides[side].pieces.forEach((steps, idx) => {
        const cell = this.cellOf(side, steps);
        if (cell !== null) (occupancy[cell] = occupancy[cell] || []).push({ side, idx });
      });
    });

    let html = '';
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const ti = this.track.findIndex(([tr, tc]) => tr === r && tc === c);
        if (ti >= 0) {
          const occ = occupancy[ti] || [];
          const label = `Square ${ti + 1}${SAFE.includes(ti) ? ', safe castle' : ''}${occ.length ? ', ' + occ.map(o => this.sideName(o.side) + ' piece ' + (o.idx + 1)).join(', ') : ''}`;
          html += `<div class="ch-cell ${SAFE.includes(ti) ? 'safe' : ''} ${ti === 0 ? 'start-p1' : ''} ${ti === 12 ? 'start-p2' : ''}" data-cell="${ti}" role="gridcell" aria-label="${escapeHTML(label)}">
            ${SAFE.includes(ti) ? '<span class="ch-safe-mark">✦</span>' : ''}
            ${occ.map(o => `<span class="ch-piece ${o.side}" title="${escapeHTML(this.sideName(o.side))} piece ${o.idx + 1}">${o.idx + 1}</span>`).join('')}
          </div>`;
        } else if (r === 3 && c === 3) {
          const h1 = this.sides.p1.pieces.filter(s => s >= TRACK_LEN).length;
          const h2 = this.sides.p2.pieces.filter(s => s >= TRACK_LEN).length;
          html += `<div class="ch-home" aria-label="Charkoni home: ${h1} and ${h2} pieces home">🏛️<small>Charkoni</small><small>${h1} · ${h2}</small></div>`;
        } else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          html += `<div class="ch-inner"></div>`;
        } else {
          html += `<div class="ch-empty"></div>`;
        }
      }
    }
    board.innerHTML = html;

    const turnEl = this.container.querySelector('#chaupar-turn');
    if (turnEl) turnEl.innerHTML = `<span class="ch-piece ${this.turn}">●</span> ${escapeHTML(this.sideName(this.turn))}'s turn`;

    const tray = this.container.querySelector('#cowrie-tray');
    if (tray) tray.innerHTML = this.cowries.map(up => `<span class="cowrie ${up ? 'up' : 'down'}" aria-hidden="true">🐚</span>`).join('');
    const tv = this.container.querySelector('#chaupar-throw-value');
    if (tv) tv.textContent = this.throwValue ? `Move ${this.throwValue} squares` : '';

    const btnThrow = this.container.querySelector('#btn-throw');
    const humanTurn = this.turn === 'p1' || this.twoPlayer;
    if (btnThrow) btnThrow.disabled = !this.isGameActive || !humanTurn || !!this.throwValue || this.busy;

    const moveWrap = this.container.querySelector('#chaupar-move-btns');
    if (moveWrap) {
      if (this.isGameActive && humanTurn && this.throwValue) {
        moveWrap.innerHTML = this.sides[this.turn].pieces.map((s, idx) => {
          const disabled = s >= TRACK_LEN;
          const where = s >= TRACK_LEN ? 'home' : `${TRACK_LEN - s} to go`;
          return `<button class="btn-ancient btn-secondary btn-sm" data-piece="${idx}" ${disabled ? 'disabled' : ''}>Move piece ${idx + 1} [${idx + 1}] · ${where}</button>`;
        }).join('');
        moveWrap.querySelectorAll('[data-piece]').forEach(b => b.addEventListener('click', () => this.humanMove(parseInt(b.dataset.piece, 10))));
      } else {
        moveWrap.innerHTML = '';
      }
    }
  }

  pulseCells(cells) {
    cells.forEach(ci => {
      const el = this.container.querySelector(`.ch-cell[data-cell="${ci}"]`);
      if (el) el.classList.add('pulse');
    });
  }

  // ---------- Rules ----------
  doThrow(forced) {
    this.cowries = Array.from({ length: 6 }, () => Math.random() < 0.5);
    if (typeof forced === 'number') this.cowries = Array.from({ length: 6 }, (_, i) => i < forced);
    const up = this.cowries.filter(Boolean).length;
    this.throwValue = up === 0 ? 6 : up;
    soundSynth.playCowrieRoll();
    this.render();
    return this.throwValue;
  }

  movablePieces(side) {
    return this.sides[side].pieces.map((s, i) => (s < TRACK_LEN ? i : -1)).filter(i => i >= 0);
  }

  /** Returns { captured: bool, home: bool } */
  applyMove(side, pieceIdx, value) {
    const s = this.sides[side];
    s.pieces[pieceIdx] = Math.min(TRACK_LEN, s.pieces[pieceIdx] + value);
    const result = { captured: false, home: s.pieces[pieceIdx] >= TRACK_LEN };
    if (!result.home) {
      const cell = this.cellOf(side, s.pieces[pieceIdx]);
      const other = side === 'p1' ? 'p2' : 'p1';
      if (!SAFE.includes(cell)) {
        this.sides[other].pieces.forEach((os, oi) => {
          if (os < TRACK_LEN && this.cellOf(other, os) === cell) {
            this.sides[other].pieces[oi] = 0;
            result.captured = true;
          }
        });
      }
    }
    return result;
  }

  humanThrow() {
    if (!this.isGameActive || this.busy || this.throwValue) return;
    const v = this.doThrow();
    this.updateNarration(`${this.sideName(this.turn)} threw ${v}!`, v === 6 ? 'A grace throw! Move a piece — you will throw again.' : 'Choose a piece to move (buttons or keys 1 / 2).');
    if (this.movablePieces(this.turn).length === 1) {
      // Only one choice — still let the player click, but highlight it
    }
  }

  humanMove(pieceIdx) {
    if (!this.throwValue || this.busy) return;
    if (!this.movablePieces(this.turn).includes(pieceIdx)) return;
    this.completeMove(this.turn, pieceIdx);
  }

  completeMove(side, pieceIdx) {
    const value = this.throwValue;
    const res = this.applyMove(side, pieceIdx, value);
    soundSynth.playClack();
    if (res.captured) {
      soundSynth.playBell();
      this.updateNarration('Capture!', `${this.sideName(side)} knocked a rival piece back to its start.`);
    } else if (res.home) {
      soundSynth.playVictory();
      this.updateNarration('Home!', `${this.sideName(side)} brought a piece into the Charkoni.`);
    }
    this.throwValue = null;
    this.render();

    if (this.sides[side].pieces.every(s => s >= TRACK_LEN)) {
      this.endGame(side);
      return;
    }

    const again = value === 6;
    if (!again) this.turn = side === 'p1' ? 'p2' : 'p1';
    this.render();
    if (!res.captured && !res.home) {
      this.updateNarration(`${this.sideName(this.turn)}'s turn`, again ? 'Grace throw — throw again!' : 'Throw the cowries.');
    }
    if (this.turn === 'p2' && !this.twoPlayer) this.scheduleAI();
  }

  scheduleAI() {
    this.busy = true;
    this.render();
    setTimeout(() => {
      if (!this.isGameActive) return;
      const v = this.doThrow();
      setTimeout(() => {
        if (!this.isGameActive) return;
        const choice = this.chooseAIMove(v);
        this.busy = false;
        this.updateNarration(`${this.sideName('p2')} threw ${v}`, `Moving piece ${choice + 1}.`);
        this.completeMove('p2', choice);
      }, 700);
    }, 800);
  }

  chooseAIMove(v) {
    const options = this.movablePieces('p2');
    let best = options[0];
    let bestScore = -Infinity;
    options.forEach(idx => {
      const before = this.sides.p2.pieces[idx];
      const after = Math.min(TRACK_LEN, before + v);
      let score = after / TRACK_LEN;
      if (after >= TRACK_LEN) score += 3;
      const cell = this.cellOf('p2', after);
      if (cell !== null) {
        if (this.sides.p1.pieces.some(ps => ps < TRACK_LEN && this.cellOf('p1', ps) === cell) && !SAFE.includes(cell)) score += 4;
        if (SAFE.includes(cell)) score += 1;
      }
      score += Math.random() * 0.3;
      if (score > bestScore) { bestScore = score; best = idx; }
    });
    return best;
  }

  endGame(winner) {
    this.isGameActive = false;
    this.render();
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
    if (this.twoPlayer) {
      this.updateNarration(`${this.sideName(winner)} wins!`, 'Both pieces reached the Charkoni first.');
      this.finishGame(true, this.options.points, `${this.variant} — Pass & Play`, { gameKey: 'chaupar' });
    } else {
      const won = winner === 'p1';
      this.finishGame(won, this.options.points, `${this.variant} Champion`, {
        gameKey: 'chaupar',
        lossMessage: 'The Royal Rival reached the Charkoni first. Throw again and outrace them!'
      });
    }
  }

  destroy() {
    super.destroy();
    this.isGameActive = false;
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler);
  }
}
