// js/components/dailyChallenge.js
// ITIHASAM: Daily Heritage Challenge — one question per calendar day (the
// same for everyone on that day), with streak tracking.

import { soundSynth } from '../audio/soundSynth.js';
import { gameState, todayKey } from '../state/gameState.js';
import { INDIAN_STATES } from '../data/statesData.js';
import { t, escapeHTML } from '../i18n.js';

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed) {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function shuffle(arr, rand) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Builds a deterministic question for a given date key (YYYY-MM-DD). */
export function questionForDate(dateKey) {
  const rand = seededRandom(hashString('itihasam-' + dateKey));
  const state = INDIAN_STATES[Math.floor(rand() * INDIAN_STATES.length)];
  const kind = Math.floor(rand() * 4);
  const others = shuffle(INDIAN_STATES.filter(s => s.id !== state.id), rand).slice(0, 3);

  if (kind === 0 && state.history.discoveryMission) {
    const m = state.history.discoveryMission;
    const order = shuffle(m.quizOptions.map((o, i) => i), rand);
    return {
      stateId: state.id,
      prompt: m.quizQuestion,
      options: order.map(i => m.quizOptions[i]),
      correct: order.indexOf(m.correctAnswer),
      explanation: m.explanation
    };
  }
  const builders = [
    () => ({ prompt: `Which state is home to ${state.architecture.monumentName}?`, explanation: state.architecture.marvelDetails }),
    () => ({ prompt: `In which state is "${state.festivals.title}" celebrated?`, explanation: state.festivals.rituals }),
    () => ({ prompt: `Which state's living traditions include ${state.culture.title}?`, explanation: state.culture.dance })
  ];
  const q = builders[(kind + 2) % 3]();
  const opts = shuffle([state, ...others], rand);
  return {
    stateId: state.id,
    prompt: q.prompt,
    options: opts.map(s => s.name),
    correct: opts.findIndex(s => s.id === state.id),
    explanation: q.explanation
  };
}

export class DailyChallenge {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.dateKey = todayKey();
    this.question = questionForDate(this.dateKey);
    this.answered = null;
  }

  init() { this.render(); }

  calendar() {
    const hist = gameState.state.daily.history || {};
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = todayKey(d);
      days.push({ k, label: d.toLocaleDateString('en-IN', { weekday: 'narrow' }), day: d.getDate(), result: hist[k] });
    }
    return days.map(d => `<span class="cal-day ${d.result || ''} ${d.k === this.dateKey ? 'today' : ''}" title="${d.k}${d.result ? ': ' + d.result : ''}" aria-label="${d.k}${d.result ? ': ' + d.result : ': not played'}"><small>${d.label}</small>${d.day}</span>`).join('');
  }

  render() {
    if (!this.container) return;
    const d = gameState.state.daily;
    const already = gameState.hasAnsweredDailyToday();
    const resultToday = (d.history || {})[this.dateKey];
    const q = this.question;
    const state = INDIAN_STATES.find(s => s.id === q.stateId);
    const showAnswer = already || this.answered !== null;

    this.container.innerHTML = `
      <div class="daily-wrap">
        <div class="explorer-header ancient-panel">
          <div class="explorer-title-area">
            <span class="category-pill">${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <h2>${t('dailyTitle')}</h2>
            <p>${t('dailySubtitle')}</p>
          </div>
          <div class="map-stats">
            <div class="score-card"><span class="score-title">🔥 ${t('streak')}</span><span class="score-val">${d.streak || 0}</span></div>
            <div class="score-card"><span class="score-title">🏅 ${t('bestStreak')}</span><span class="score-val">${d.bestStreak || 0}</span></div>
          </div>
        </div>

        <div class="daily-card ancient-panel">
          <span class="region-pill">${showAnswer ? `📍 ${escapeHTML(state ? state.name : '')}` : '❓ Question of the day'}</span>
          <h3 class="daily-question" id="daily-question">${escapeHTML(q.prompt)}</h3>
          <div class="riddle-options" role="group" aria-labelledby="daily-question">
            ${q.options.map((o, i) => {
              let cls = '';
              if (showAnswer) {
                if (i === q.correct) cls = 'correct';
                else if (this.answered === i) cls = 'wrong';
              }
              return `<button class="riddle-option-btn ${cls}" data-i="${i}" ${showAnswer ? 'disabled' : ''}>
                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                <span class="option-text">${escapeHTML(o)}</span>
              </button>`;
            }).join('')}
          </div>
          <div class="daily-feedback ${showAnswer ? '' : 'hidden'}" aria-live="polite">
            ${showAnswer ? `
              <p class="${(this.answered === q.correct || resultToday === 'correct') ? 'text-success' : 'text-terracotta'}">
                <strong>${(this.answered === q.correct || (this.answered === null && resultToday === 'correct')) ? '✓ Correct! Points added.' : '✗ Not this time.'}</strong>
                Come back tomorrow for a new question.
              </p>
              <p>${escapeHTML(q.explanation || '')}</p>
              ${state ? `<button class="btn-ancient btn-gold btn-sm" id="btn-daily-explore">Explore ${escapeHTML(state.name)} →</button>` : ''}` : ''}
          </div>
        </div>

        <div class="daily-calendar ancient-panel">
          <h4>Last 14 days</h4>
          <div class="cal-row">${this.calendar()}</div>
          <p class="map-note">Correct answers earn 60 CDP plus 10 CDP per day of streak (up to 7). Three days in a row earns the "Daily Sadhaka" badge.</p>
        </div>
      </div>`;

    this.container.querySelectorAll('.riddle-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (gameState.hasAnsweredDailyToday()) return;
        const i = parseInt(btn.dataset.i, 10);
        this.answered = i;
        const correct = i === q.correct;
        if (correct) soundSynth.playVictory(); else soundSynth.playClack();
        gameState.recordDailyAnswer(correct);
        this.render();
      });
    });
    const ex = this.container.querySelector('#btn-daily-explore');
    if (ex) ex.addEventListener('click', () => window.appRouter && window.appRouter.navigate('states-directory', { stateId: q.stateId }));
  }

  destroy() {}
}
