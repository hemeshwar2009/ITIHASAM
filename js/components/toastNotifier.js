// js/components/toastNotifier.js
// ITIHASAM: Small pop-up notifications for badges, level-ups, artifacts and
// passport stamps. Announced to screen readers through an aria-live region.

import { gameState } from '../state/gameState.js';
import { soundSynth } from '../audio/soundSynth.js';
import { escapeHTML } from '../i18n.js';

export class ToastNotifier {
  constructor() {
    this.root = document.createElement('div');
    this.root.className = 'toast-stack';
    this.root.setAttribute('role', 'status');
    this.root.setAttribute('aria-live', 'polite');
    document.body.appendChild(this.root);
    this.queue = [];
    gameState.onEvent(ev => this.handle(ev));
  }

  handle(ev) {
    if (ev.type === 'badge') this.show('🎖️', 'Badge unlocked', `${ev.badge.icon} ${ev.badge.name} (+${ev.badge.cdpReward} CDP)`);
    else if (ev.type === 'level') { this.show('⬆️', 'Level up!', ev.title); soundSynth.playLevelUp(); }
    else if (ev.type === 'artifact') this.show('🏺', 'Artifact collected', `${ev.artifact.icon} ${ev.artifact.name}`);
    else if (ev.type === 'stamp') this.show('🛂', 'Passport stamp earned', `${ev.name} — all five experiences complete!`);
  }

  show(icon, title, body) {
    const el = document.createElement('div');
    el.className = 'toast ancient-panel';
    el.innerHTML = `<span class="toast-icon" aria-hidden="true">${icon}</span><div><strong>${escapeHTML(title)}</strong><p>${escapeHTML(body)}</p></div>`;
    this.root.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 400);
    }, 4200);
  }
}
