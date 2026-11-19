// js/components/timelineMode.js
// ITIHASAM: Timeline of the Ages — put 10 milestones of Indian history in
// order. Works with drag-and-drop or the ▲ / ▼ buttons (keyboard friendly).

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { t, escapeHTML } from '../i18n.js';

// Years are approximate where marked "c."; negative = BCE.
export const TIMELINE_EVENTS = [
  { id: 'lothal', year: -2400, label: 'c. 2400 BCE', title: 'Harappan dockyard at Lothal', state: 'Gujarat', icon: '⚓' },
  { id: 'buddha', year: -500, label: 'c. 5th century BCE', title: 'The Buddha attains enlightenment at Bodh Gaya', state: 'Bihar', icon: '🌳' },
  { id: 'kalinga', year: -261, label: 'c. 261 BCE', title: "Ashoka's Kalinga War and turn to dhamma", state: 'Odisha', icon: '🦁' },
  { id: 'gupta', year: 320, label: 'c. 320 CE', title: 'Gupta Empire begins its classical age', state: 'Bihar', icon: '📜' },
  { id: 'nalanda', year: 427, label: 'c. 427 CE', title: 'Nalanda Mahavihara founded', state: 'Bihar', icon: '🏫' },
  { id: 'brihadeeswarar', year: 1010, label: '1010 CE', title: 'Brihadeeswarar Temple completed by Rajaraja Chola I', state: 'Tamil Nadu', icon: '🛕' },
  { id: 'konark', year: 1250, label: 'c. 1250 CE', title: 'Konark Sun Temple built by Narasimhadeva I', state: 'Odisha', icon: '☸️' },
  { id: 'vijayanagara', year: 1336, label: '1336 CE', title: 'Vijayanagara Empire founded (capital at Hampi)', state: 'Karnataka', icon: '🏛️' },
  { id: 'taj', year: 1632, label: '1632 CE', title: 'Construction of the Taj Mahal begins', state: 'Uttar Pradesh', icon: '🕌' },
  { id: 'saraighat', year: 1671, label: '1671 CE', title: 'Ahom victory at the Battle of Saraighat', state: 'Assam', icon: '⛵' },
  { id: 'shivaji', year: 1674, label: '1674 CE', title: 'Coronation of Chhatrapati Shivaji at Raigad', state: 'Maharashtra', icon: '⚔️' },
  { id: 'sikkim', year: 1642, label: '1642 CE', title: 'Namgyal dynasty founded in Sikkim', state: 'Sikkim', icon: '🏔️' }
];

const ROUND_SIZE = 10;

export class TimelineMode {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.newRound();
  }

  newRound() {
    const pool = TIMELINE_EVENTS.slice().sort(() => Math.random() - 0.5).slice(0, ROUND_SIZE);
    this.order = pool.slice().sort(() => Math.random() - 0.5);
    this.checked = false;
    this.dragIndex = null;
  }

  init() { this.render(); }

  correctOrder() {
    return this.order.slice().sort((a, b) => a.year - b.year);
  }

  render() {
    if (!this.container) return;
    const correct = this.correctOrder();
    const score = this.order.filter((e, i) => correct[i].id === e.id).length;

    this.container.innerHTML = `
      <div class="timeline-wrap">
        <div class="explorer-header ancient-panel">
          <div class="explorer-title-area">
            <span class="category-pill">KAALA CHAKRA</span>
            <h2>${t('timelineTitle')}</h2>
            <p>${t('timelineSubtitle')} Drag cards, or use the ▲ ▼ buttons.</p>
          </div>
          <div class="map-stats">
            <div class="score-card"><span class="score-title">Best score</span><span class="score-val">${gameState.state.timelineBest || 0} / ${ROUND_SIZE}</span></div>
          </div>
        </div>

        <ol class="timeline-list ancient-panel" id="timeline-list" aria-label="Events to order, oldest first">
          ${this.order.map((e, i) => {
            const status = this.checked ? (correct[i].id === e.id ? 'right' : 'wrong') : '';
            return `
              <li class="timeline-card ${status}" draggable="${!this.checked}" data-i="${i}">
                <span class="tl-pos">${i + 1}</span>
                <span class="tl-icon" aria-hidden="true">${e.icon}</span>
                <span class="tl-body">
                  <strong>${escapeHTML(e.title)}</strong>
                  <small>${escapeHTML(e.state)}${this.checked ? ` · <b>${escapeHTML(e.label)}</b>` : ''}</small>
                </span>
                ${this.checked ? `<span class="tl-mark" aria-label="${status === 'right' ? 'correct position' : 'wrong position'}">${status === 'right' ? '✓' : '✗'}</span>` : `
                <span class="tl-btns">
                  <button class="tl-btn" data-move="-1" data-i="${i}" aria-label="Move ${escapeHTML(e.title)} earlier" ${i === 0 ? 'disabled' : ''}>▲</button>
                  <button class="tl-btn" data-move="1" data-i="${i}" aria-label="Move ${escapeHTML(e.title)} later" ${i === this.order.length - 1 ? 'disabled' : ''}>▼</button>
                </span>`}
              </li>`;
          }).join('')}
        </ol>

        <div class="timeline-actions">
          ${this.checked
            ? `<div class="timeline-result ancient-panel" aria-live="polite"><strong>${score} / ${ROUND_SIZE}</strong> in the right place. ${score === ROUND_SIZE ? 'Perfect chronology! 🏆' : 'Wrong cards show their real dates — study them and try a new shuffle.'}</div>
               <button class="btn-ancient btn-gold" id="btn-tl-new">🔀 ${t('shuffle')}</button>`
            : `<button class="btn-ancient btn-gold" id="btn-tl-check">✓ ${t('checkOrder')}</button>`}
        </div>
      </div>`;

    this.bind();
  }

  move(i, delta) {
    const j = i + delta;
    if (j < 0 || j >= this.order.length) return;
    [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
    soundSynth.playClick();
    this.render();
    const btn = this.container.querySelector(`.tl-btn[data-i="${j}"][data-move="${delta}"]`) || this.container.querySelector(`.tl-btn[data-i="${j}"]`);
    if (btn) btn.focus();
  }

  bind() {
    this.container.querySelectorAll('.tl-btn').forEach(b => {
      b.addEventListener('click', () => this.move(parseInt(b.dataset.i, 10), parseInt(b.dataset.move, 10)));
    });
    const check = this.container.querySelector('#btn-tl-check');
    if (check) check.addEventListener('click', () => {
      this.checked = true;
      const correct = this.correctOrder();
      const score = this.order.filter((e, i) => correct[i].id === e.id).length;
      if (score >= 8) soundSynth.playVictory(); else soundSynth.playBell();
      gameState.recordTimelineScore(score, ROUND_SIZE);
      this.render();
    });
    const again = this.container.querySelector('#btn-tl-new');
    if (again) again.addEventListener('click', () => { this.newRound(); this.render(); });

    // Drag and drop
    this.container.querySelectorAll('.timeline-card[draggable="true"]').forEach(card => {
      card.addEventListener('dragstart', (e) => {
        this.dragIndex = parseInt(card.dataset.i, 10);
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setData('text/plain', String(this.dragIndex)); } catch (err) { /* ignore */ }
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
      card.addEventListener('dragover', (e) => { e.preventDefault(); card.classList.add('drag-over'); });
      card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
      card.addEventListener('drop', (e) => {
        e.preventDefault();
        const to = parseInt(card.dataset.i, 10);
        const from = this.dragIndex;
        if (from === null || from === to) return;
        const [item] = this.order.splice(from, 1);
        this.order.splice(to, 0, item);
        this.dragIndex = null;
        soundSynth.playClack();
        this.render();
      });
    });
  }

  destroy() {}
}
