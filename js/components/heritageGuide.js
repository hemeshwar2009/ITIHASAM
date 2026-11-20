// js/components/heritageGuide.js
// ITIHASAM: Heritage Guide Floating Chatbot Companion

import { soundSynth } from '../audio/soundSynth.js';
import { HERITAGE_GUIDE_QA, QUICK_PROMPTS } from '../data/chatbotData.js';
import { getStateById, INDIAN_STATES } from '../data/statesData.js';
import { describeGame, getFestivalTheme } from '../data/gameRouting.js';
import { escapeHTML } from '../i18n.js';

const STOPWORDS = new Set('a an the of in on at to for and or is are was were what which who whom whose how why when where does do did tell me about please explain can you i my is it its this that with from by as be'.split(' '));

function tokenize(text) {
  return String(text).toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOPWORDS.has(w));
}

// Searchable index of every state's cultural content
const SEARCH_INDEX = [];
INDIAN_STATES.forEach(s => {
  const add = (label, title, body) => SEARCH_INDEX.push({ state: s, label, title, body, tokens: new Set(tokenize(title + ' ' + body)) });
  add('History', s.history.title, [s.history.era, (s.history.keyFigures || []).join(', '), s.history.highlights, s.history.knowledgeSystem].join(' '));
  if (s.history.artifact) add('Artifact', s.history.artifact.name, s.history.artifact.lore || '');
  add('Traditional Games', s.games.title, [s.games.type, s.games.origin, (s.games.rules || []).join(' '), s.games.equipment].join(' '));
  add('Architecture', s.architecture.title, [s.architecture.builderEra, s.architecture.architecturalStyle, s.architecture.marvelDetails].join(' '));
  add('Festivals', s.festivals.title, [s.festivals.season, s.festivals.rituals, s.festivals.culinaryHeritage, s.festivals.celebrationStyle].join(' '));
  add('Culture', s.culture.title, [s.culture.dance, s.culture.music, s.culture.handicrafts, s.culture.textile, s.culture.lifestyle].join(' '));
});

const GAME_RULES = {
  chaupar: '**Chaupar / Pachisi (as played here):** throw 6 cowrie shells — the number landing mouth-up is how far you move (0 up is a grace throw of 6, and any 6 gives another throw). Race both your pieces once around the 24-square track into the central Charkoni. Landing on a rival sends it back to start, except on the safe ✦ castle squares.',
  baghchal: '**Bagh-Chal / Aadu Puli Aattam:** 4 tigers start on the corners; you place 20 goats one per turn, then move them along the lines. Tigers capture by jumping over a goat onto an empty point. Goats win by trapping all tigers (or surviving 40 turns here); tigers win after 5 captures. Tip: keep goats together and on the edges.',
  pallanguzhi: '**Pallanguzhi:** 14 pits, 5 shells each. Pick a pit on your side and sow its shells one by one counter-clockwise. When your hand empties, pick up the next pit and keep sowing. If the next pit is empty, capture the shells in the pit opposite it. Most captured shells wins.',
  sports: '**Folk sports challenge:** a marker sweeps across the power bar — press Space (or tap the button) when it is inside the golden zone. Land 3 good strikes out of 5. The zone shrinks a little each time!',
  rhythm: '**Festival rhythm:** after a 4-beat count-in, a ring closes on the drum at every beat. Tap the drum or press Space exactly as it closes. Hit 10 of 16 beats to win.'
};

export class HeritageGuideChatbot {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isOpen = false;
    this.messages = [
      {
        sender: 'bot',
        text: 'Namaste, Explorer! I am your **Heritage Guide**. Ask me anything about Indian history, traditional games, architectural wonders, festivals, or gameplay rules.'
      }
    ];
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="heritage-chatbot-widget ${this.isOpen ? 'open' : 'closed'}">
        <!-- Floating Circular Icon Button (Bottom-Right) -->
        <button class="chatbot-trigger-btn ancient-panel" id="btn-chatbot-toggle" title="Heritage Guide Cultural Companion" aria-expanded="${this.isOpen}" aria-controls="chatbot-window">
          <span class="trigger-icon">🪔</span>
          <span class="trigger-badge">Guide</span>
        </button>

        <!-- Expandable Chatbot Window -->
        <div class="chatbot-window ancient-panel ${this.isOpen ? '' : 'hidden'}" id="chatbot-window" role="dialog" aria-label="Heritage Guide chat">
          <div class="chatbot-header">
            <div class="guide-avatar-wrap">🪔</div>
            <div class="guide-header-info">
              <h4 class="guide-name">Heritage Guide</h4>
              <span class="guide-status">Online • Indian Cultural Companion</span>
            </div>
            <button class="btn-close-sm" id="btn-close-chat" title="Minimize Chat" aria-label="Close chat">✖</button>
          </div>

          <!-- Quick Suggestion Chips -->
          <div class="quick-chips-bar" id="quick-chips-bar">
            ${QUICK_PROMPTS.map(p => `
              <button class="chat-chip-btn" data-query="${p}">${p}</button>
            `).join('')}
          </div>

          <!-- Message History -->
          <div class="chatbot-messages-area" id="chatbot-messages-area" role="log" aria-live="polite">
            ${this.messages.map(msg => `
              <div class="chat-message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}">
                <div class="message-bubble">${this.formatMarkdown(escapeHTML(msg.text))}</div>
              </div>
            `).join('')}
          </div>

          <!-- Input Area -->
          <form class="chatbot-input-bar" id="chatbot-input-form">
            <label for="chatbot-text-input" class="sr-only">Ask the Heritage Guide</label>
            <input type="text" id="chatbot-text-input" placeholder="Ask about history, games, architecture..." class="ancient-input" autocomplete="off" maxlength="200" />
            <button type="submit" class="btn-ancient btn-gold" id="btn-chat-send">Send</button>
          </form>
        </div>
      </div>
    `;

    this.attachEventListeners();
    this.scrollToBottom();
  }

  attachEventListeners() {
    const toggleBtn = this.container.querySelector('#btn-chatbot-toggle');
    const closeBtn = this.container.querySelector('#btn-close-chat');
    const form = this.container.querySelector('#chatbot-input-form');
    const chips = this.container.querySelectorAll('.chat-chip-btn');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        soundSynth.playClick();
        this.isOpen = !this.isOpen;
        this.render();
        if (this.isOpen) {
          const inp = this.container.querySelector('#chatbot-text-input');
          if (inp) inp.focus();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        soundSynth.playClick();
        this.isOpen = false;
        this.render();
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.dataset.query;
        this.handleUserQuery(query);
      });
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = this.container.querySelector('#chatbot-text-input');
        if (input && input.value.trim()) {
          const q = input.value.trim();
          input.value = '';
          this.handleUserQuery(q);
        }
      });
    }
  }

  handleUserQuery(query) {
    soundSynth.playClick();
    this.messages.push({ sender: 'user', text: query });
    this.render();
    this.scrollToBottom();

    // Generate intelligent heritage response
    setTimeout(() => {
      const reply = this.generateResponse(query);
      this.messages.push({ sender: 'bot', text: reply });
      soundSynth.playBell();
      this.render();
      this.scrollToBottom();
      const inp = this.container.querySelector('#chatbot-text-input');
      if (inp) inp.focus();
    }, 400);
  }

  generateResponse(query) {
    const q = query.toLowerCase().trim();

    // 0. Game-rule questions ("how do I play chaupar", "rules of bagh chal")
    const asksRules = /(how (do|to|can) (i )?play|rules?|how does .* work|controls?)/.test(q);
    const gameWords = [
      ['chaupar', ['chaupar', 'pachisi', 'pagade', 'chopat', 'ashta chamma', 'chowka', 'dice']],
      ['baghchal', ['bagh', 'baghchal', 'bagh-chal', 'aadu puli', 'tiger', 'goat', 'baghel']],
      ['sports', ['archery', 'kabaddi', 'gilli', 'stilt', 'gedi', 'polo', 'sagol', 'wrestling', 'kushti', 'mallakhamb', 'insuknawr', 'dhopkhel', 'sport']],
      ['rhythm', ['rhythm', 'drum', 'garba', 'dandiya', 'bihu', 'wangala', 'bhangra', 'dhol', 'cheraw', 'beat']]
    ];
    for (const [key, words] of gameWords) {
      const mentioned = words.some(w => q.includes(w));
      // Board games answer with rules on any mention; sports & rhythm only when rules are asked
      if (mentioned && (asksRules || key === 'chaupar' || key === 'baghchal')) return GAME_RULES[key];
    }
    if (asksRules && q.includes('pallanguzhi')) return GAME_RULES.pallanguzhi;

    // 1. Check curated QA database
    for (const item of HERITAGE_GUIDE_QA) {
      if (item.keywords.some(k => q.includes(k))) {
        return item.response;
      }
    }

    // 2. Check if a state name is mentioned
    for (const state of INDIAN_STATES) {
      if (q.includes(state.name.toLowerCase()) || q.includes(state.capital.toLowerCase())) {
        return `**${state.name} (${state.region} India)**:

- **History:** ${state.history.title} (${state.history.era})
- **Traditional Game:** ${state.games.title} (play it here as ${describeGame(state.id)})
- **Architectural Marvel:** ${state.architecture.title}
- **Festival:** ${state.festivals.title} (${getFestivalTheme(state.id).kind === 'rhythm' ? 'drum rhythm game' : 'build-the-celebration game'})
- **Living Culture:** ${state.culture.title}

Would you like to explore ${state.name}'s interactive games? Click **Explore India** on the right toolbar!`;
      }
    }

    // 3. Search all 36 states' and Union Territories' stories for the best-matching passage
    const qTokens = tokenize(q);
    if (qTokens.length) {
      let best = null, bestScore = 0;
      for (const entry of SEARCH_INDEX) {
        let score = 0;
        for (const tk of qTokens) {
          if (entry.tokens.has(tk)) score += 2;
          else if (tk.length > 4 && [...entry.tokens].some(et => et.startsWith(tk.slice(0, 5)))) score += 1;
        }
        if (entry.title.toLowerCase().includes(q)) score += 5;
        if (score > bestScore) { bestScore = score; best = entry; }
      }
      if (best && bestScore >= 2) {
        const body = best.body.replace(/\s+/g, ' ').trim();
        const snippet = body.length > 420 ? body.slice(0, 417) + '…' : body;
        return `**${best.title}** — *${best.label}, ${best.state.name}*

${snippet}

Open **${best.state.name}** from the India Map or Explore India to play its experiences.`;
      }
    }

    // 4. Fallback answer
    return `That is a fascinating aspect of Indian cultural heritage! Across our 28 states and 8 Union Territories, each region preserves unique architectural traditions, ancient games of logic like Pallanguzhi, and vibrant seasonal celebrations like Onam and Pongal.

You can explore specific state marvels using the **Explore India** directory on the right-side toolbar, or ask me for rules of games like *Pallanguzhi* or *Brihadeeswarar Temple architecture*!`;
  }

  formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  scrollToBottom() {
    const area = this.container.querySelector('#chatbot-messages-area');
    if (area) {
      area.scrollTop = area.scrollHeight;
    }
  }
}
