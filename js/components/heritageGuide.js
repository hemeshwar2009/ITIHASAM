// js/components/heritageGuide.js
// DISCOVER INDIA: Heritage Guide Floating Chatbot Companion

import { soundSynth } from '../audio/soundSynth.js';
import { HERITAGE_GUIDE_QA, QUICK_PROMPTS } from '../data/chatbotData.js';
import { getStateById, INDIAN_STATES } from '../data/statesData.js';

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
        <button class="chatbot-trigger-btn ancient-panel" id="btn-chatbot-toggle" title="Heritage Guide Cultural Companion">
          <span class="trigger-icon">🪔</span>
          <span class="trigger-badge">Guide</span>
        </button>

        <!-- Expandable Chatbot Window -->
        <div class="chatbot-window ancient-panel ${this.isOpen ? '' : 'hidden'}" id="chatbot-window">
          <div class="chatbot-header">
            <div class="guide-avatar-wrap">🪔</div>
            <div class="guide-header-info">
              <h4 class="guide-name">Heritage Guide</h4>
              <span class="guide-status">Online • Indian Cultural Companion</span>
            </div>
            <button class="btn-close-sm" id="btn-close-chat" title="Minimize Chat">✖</button>
          </div>

          <!-- Quick Suggestion Chips -->
          <div class="quick-chips-bar" id="quick-chips-bar">
            ${QUICK_PROMPTS.map(p => `
              <button class="chat-chip-btn" data-query="${p}">${p}</button>
            `).join('')}
          </div>

          <!-- Message History -->
          <div class="chatbot-messages-area" id="chatbot-messages-area">
            ${this.messages.map(msg => `
              <div class="chat-message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}">
                <div class="message-bubble">${this.formatMarkdown(msg.text)}</div>
              </div>
            `).join('')}
          </div>

          <!-- Input Area -->
          <form class="chatbot-input-bar" id="chatbot-input-form">
            <input type="text" id="chatbot-text-input" placeholder="Ask about history, games, architecture..." class="ancient-input" autocomplete="off" />
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

    // Generate intelligent heritage response
    setTimeout(() => {
      const reply = this.generateResponse(query);
      this.messages.push({ sender: 'bot', text: reply });
      soundSynth.playBell();
      this.render();
    }, 400);
  }

  generateResponse(query) {
    const q = query.toLowerCase().trim();

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
- **Traditional Game:** ${state.games.title}
- **Architectural Marvel:** ${state.architecture.title}
- **Festival:** ${state.festivals.title}
- **Living Culture:** ${state.culture.title}
        
Would you like to explore ${state.name}'s interactive games? Click **Explore India** on the right toolbar!`;
      }
    }

    // 3. Fallback answer
    return `That is a fascinating aspect of Indian cultural heritage! Across our 28 states, each region preserves unique architectural traditions, ancient games of logic like Pallanguzhi, and vibrant seasonal celebrations like Onam and Pongal. 
    
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
