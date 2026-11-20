// js/components/avatarCustomizer.js
// ITIHASAM: Avatar Customization Interface ("Choose Your Explorer")

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { escapeHTML } from '../i18n.js';
import { INITIAL_ARCHETYPES, CUSTOMIZATION_OPTIONS } from '../data/avatarData.js';

export class AvatarCustomizer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.currentAvatar = { ...gameState.state.avatar };
    this.activeTab = 'archetypes'; // 'archetypes' | 'custom'
  }

  init() {
    this.render();
    this.drawPreview();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="avatar-customizer-wrap ancient-panel">
        <div class="customizer-header">
          <div class="header-text">
            <span class="category-pill">EXPLORER IDENTITY</span>
            <h2>Choose Your Explorer</h2>
            <p>Select a historical archetype or customize your clothing, headwear, and sacred artifacts.</p>
          </div>
          <button class="btn-ancient btn-gold" id="btn-save-avatar">✓ CONFIRM SELECTION</button>
        </div>

        <div class="customizer-layout-grid">
          <!-- Live Preview Canvas & Profile Card (Left) -->
          <div class="preview-column">
            <div class="character-preview-card ancient-panel">
              <div class="preview-canvas-wrap">
                <canvas id="avatar-preview-canvas" width="220" height="260" class="pixel-canvas"></canvas>
              </div>

              <div class="character-identity-inputs">
                <label for="explorer-name-input" class="input-label">Explorer Name:</label>
                <input type="text" id="explorer-name-input" value="${escapeHTML(this.currentAvatar.name || 'Aryavart')}" class="ancient-input text-center" maxlength="20" />
              </div>

              <div class="character-current-gear">
                <div class="gear-pill"><span>🥋</span> <span id="gear-clothing">${this.currentAvatar.clothing}</span></div>
                <div class="gear-pill"><span>👳</span> <span id="gear-headwear">${this.currentAvatar.headwear}</span></div>
                <div class="gear-pill"><span>📜</span> <span id="gear-accessory">${this.currentAvatar.accessory}</span></div>
              </div>
            </div>
          </div>

          <!-- Selection Controls (Right) -->
          <div class="options-column">
            <!-- Tabs: Archetypes vs Custom Gear -->
            <div class="customizer-tabs-nav">
              <button class="tab-btn ${this.activeTab === 'archetypes' ? 'active' : ''}" id="tab-archetypes">Five Historical Archetypes</button>
              <button class="tab-btn ${this.activeTab === 'custom' ? 'active' : ''}" id="tab-custom">Detailed Customization</button>
            </div>

            <!-- Tab 1: 5 Initial Archetypes, including customizable female explorers -->
            <div class="tab-content ${this.activeTab === 'archetypes' ? '' : 'hidden'}" id="content-archetypes">
              <div class="archetypes-cards-list">
                ${INITIAL_ARCHETYPES.map(arch => `
                  <div class="archetype-select-card ancient-panel ${this.currentAvatar.name === arch.avatar.name ? 'selected' : ''}" data-id="${arch.id}">
                    <div class="arch-top">
                      <span class="arch-name">${arch.name}</span>
                      <span class="arch-title">${arch.title}</span>
                    </div>
                    <p class="arch-desc">${arch.description}</p>
                    <button class="btn-ancient btn-secondary btn-sm btn-choose-archetype" data-id="${arch.id}">Choose Style</button>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Tab 2: Detailed Customization (Appearance, Clothing, Headwear, Accessories) -->
            <div class="tab-content ${this.activeTab === 'custom' ? '' : 'hidden'}" id="content-custom">
              <!-- Sex / presentation -->
              <div class="custom-section">
                <h4 class="section-title">Explorer Presentation</h4>
                <div class="options-grid gender-options">
                  ${CUSTOMIZATION_OPTIONS.genders.map(gender => `
                    <button class="option-pill-btn ${String(this.currentAvatar.gender || '').includes('female') === (gender.id === 'explorer-female') ? 'active' : ''}" data-gender="${gender.id}">
                      <span>${gender.icon}</span>
                      <span>${gender.name}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Skin Tones -->
              <div class="custom-section">
                <h4 class="section-title">Skin Complexion</h4>
                <div class="skin-tones-row">
                  ${CUSTOMIZATION_OPTIONS.skinTones.map(tone => `
                    <button class="tone-circle-btn ${this.currentAvatar.skinTone === tone.value ? 'active' : ''}" 
                            data-tone="${tone.value}" 
                            style="background-color: ${tone.value}" 
                            title="${tone.name}"></button>
                  `).join('')}
                </div>
              </div>

              <!-- Clothing -->
              <div class="custom-section">
                <h4 class="section-title">Traditional Attire</h4>
                <div class="options-grid">
                  ${CUSTOMIZATION_OPTIONS.clothing.map(cloth => `
                    <button class="option-pill-btn ${this.currentAvatar.clothing === cloth.id ? 'active' : ''}" data-clothing="${cloth.id}" data-color="${cloth.baseColor}">
                      <span>${cloth.icon}</span>
                      <span>${cloth.name}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Headwear -->
              <div class="custom-section">
                <h4 class="section-title">Headwear & Hair</h4>
                <div class="options-grid">
                  ${CUSTOMIZATION_OPTIONS.headwear.map(head => `
                    <button class="option-pill-btn ${this.currentAvatar.headwear === head.id ? 'active' : ''}" data-headwear="${head.id}">
                      <span>${head.icon}</span>
                      <span>${head.name}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Accessories -->
              <div class="custom-section">
                <h4 class="section-title">Sacred Accessory</h4>
                <div class="options-grid">
                  ${CUSTOMIZATION_OPTIONS.accessories.map(acc => `
                    <button class="option-pill-btn ${this.currentAvatar.accessory === acc.id ? 'active' : ''}" data-accessory="${acc.id}">
                      <span>${acc.icon}</span>
                      <span>${acc.name}</span>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
    this.drawPreview();
  }

  attachEventListeners() {
    // Save button
    const btnSave = this.container.querySelector('#btn-save-avatar');
    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const nameInput = this.container.querySelector('#explorer-name-input');
        if (nameInput && nameInput.value.trim()) {
          this.currentAvatar.name = nameInput.value.trim();
        }
        gameState.updateAvatar(this.currentAvatar);
        soundSynth.playBell();
        if (window.appRouter) {
          window.appRouter.navigate('states-directory');
        }
      });
    }

    // Tabs
    const tabArch = this.container.querySelector('#tab-archetypes');
    const tabCust = this.container.querySelector('#tab-custom');
    if (tabArch) {
      tabArch.addEventListener('click', () => {
        soundSynth.playClick();
        this.activeTab = 'archetypes';
        this.render();
      });
    }
    if (tabCust) {
      tabCust.addEventListener('click', () => {
        soundSynth.playClick();
        this.activeTab = 'custom';
        this.render();
      });
    }

    // Archetype cards
    const archBtns = this.container.querySelectorAll('.btn-choose-archetype, .archetype-select-card');
    archBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundSynth.playClick();
        const archId = btn.dataset.id;
        const arch = INITIAL_ARCHETYPES.find(a => a.id === archId);
        if (arch) {
          this.currentAvatar = { ...arch.avatar };
          this.render();
        }
      });
    });

    // Skin tones
    const genderBtns = this.container.querySelectorAll('[data-gender]');
    genderBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundSynth.playClick();
        const wasFemale = String(this.currentAvatar.gender || '').includes('female');
        const willBeFemale = btn.dataset.gender === 'explorer-female';
        this.currentAvatar.gender = btn.dataset.gender;
        // Give the presentation an immediately recognisable starting look;
        // all of these choices remain editable in the controls below.
        if (willBeFemale && !wasFemale) {
          this.currentAvatar.clothing = 'silk-saree';
          this.currentAvatar.clothingColor = '#9C3D32';
          this.currentAvatar.headwear = 'floral-juda';
        } else if (!willBeFemale && wasFemale) {
          this.currentAvatar.clothing = 'kurta-dhoti';
          this.currentAvatar.clothingColor = '#FAF7F0';
          this.currentAvatar.headwear = 'pheta-turban';
        }
        this.render();
      });
    });

    // Skin tones
    const toneBtns = this.container.querySelectorAll('.tone-circle-btn');
    toneBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundSynth.playClick();
        this.currentAvatar.skinTone = btn.dataset.tone;
        this.render();
      });
    });

    // Clothing
    const clothBtns = this.container.querySelectorAll('[data-clothing]');
    clothBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundSynth.playClick();
        this.currentAvatar.clothing = btn.dataset.clothing;
        this.currentAvatar.clothingColor = btn.dataset.color || '#FAF7F0';
        this.render();
      });
    });

    // Headwear
    const headBtns = this.container.querySelectorAll('[data-headwear]');
    headBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundSynth.playClick();
        this.currentAvatar.headwear = btn.dataset.headwear;
        this.render();
      });
    });

    // Accessories
    const accBtns = this.container.querySelectorAll('[data-accessory]');
    accBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundSynth.playClick();
        this.currentAvatar.accessory = btn.dataset.accessory;
        this.render();
      });
    });

    // Name input real-time sync
    const nameInput = this.container.querySelector('#explorer-name-input');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        this.currentAvatar.name = e.target.value;
      });
    }
  }

  drawPreview() {
    const canvas = this.container.querySelector('#avatar-preview-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Antique parchment background vignette
    ctx.fillStyle = '#F5F0E6';
    ctx.fillRect(0, 0, w, h);

    // Decorative inner frame
    ctx.strokeStyle = '#D8CBB6';
    ctx.lineWidth = 3;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    // Sun / Mandala aura behind character
    ctx.fillStyle = 'rgba(182, 154, 98, 0.15)';
    ctx.beginPath();
    ctx.arc(w / 2, 100, 50, 0, Math.PI * 2);
    ctx.fill();

    const cx = w / 2;
    const cy = 110;

    // 1. Shadow
    ctx.fillStyle = 'rgba(73, 58, 45, 0.2)';
    ctx.beginPath();
    ctx.ellipse(cx, 220, 40, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    const isFemale = String(this.currentAvatar.gender || '').includes('female');

    // 2. Body / Attire
    ctx.fillStyle = this.currentAvatar.clothingColor || '#B76E4B';
    if (isFemale) {
      ctx.beginPath();
      ctx.moveTo(cx - 19, cy);
      ctx.lineTo(cx + 19, cy);
      ctx.lineTo(cx + 31, cy + 65);
      ctx.lineTo(cx - 31, cy + 65);
      ctx.closePath();
      ctx.fill();
      // Bright sari pallu and blouse neckline make the female presentation
      // readable even when the selected attire is dark.
      ctx.strokeStyle = this.currentAvatar.accentColor || '#D4AF37';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(cx + 15, cy + 7);
      ctx.lineTo(cx - 18, cy + 61);
      ctx.stroke();
      ctx.fillStyle = this.currentAvatar.accentColor || '#D4AF37';
      ctx.fillRect(cx - 13, cy + 3, 26, 5);
    } else {
      ctx.fillRect(cx - 24, cy, 48, 65);
    }

    // Gold trim / border on attire
    ctx.fillStyle = '#B69A62';
    ctx.fillRect(cx - (isFemale ? 31 : 24), cy + 62, isFemale ? 62 : 48, 4);
    ctx.fillRect(cx - 2, cy, 4, 62);

    // Lower attire
    ctx.fillStyle = '#FAF7F0';
    if (isFemale) {
      ctx.beginPath();
      ctx.moveTo(cx - 27, cy + 65);
      ctx.lineTo(cx + 27, cy + 65);
      ctx.lineTo(cx + 20, cy + 104);
      ctx.lineTo(cx - 20, cy + 104);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(cx - 20, cy + 65, 18, 35);
      ctx.fillRect(cx + 2, cy + 65, 18, 35);
    }

    // Sandals / Shoes
    ctx.fillStyle = '#493A2D';
    ctx.fillRect(cx - 22, cy + 100, 20, 8);
    ctx.fillRect(cx + 2, cy + 100, 20, 8);

    // 3. Head & Face
    ctx.fillStyle = this.currentAvatar.skinTone || '#E0BC95';
    ctx.beginPath();
    ctx.arc(cx, cy - 20, 24, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#2B1E16';
    ctx.fillRect(cx - 10, cy - 22, 4, 4);
    ctx.fillRect(cx + 6, cy - 22, 4, 4);

    // Tilak / Bindi on forehead
    ctx.fillStyle = '#B76E4B';
    ctx.fillRect(cx - 1, cy - 30, 3, 5);

    // Smile
    ctx.strokeStyle = '#493A2D';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy - 14, 6, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    // Hair silhouette makes female explorers visibly distinct while retaining full gear customization.
    if (isFemale && this.currentAvatar.headwear === 'none') {
      ctx.fillStyle = this.currentAvatar.hairColor || '#1A110B';
      ctx.beginPath();
      ctx.arc(cx, cy - 23, 27, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(cx - 27, cy - 25, 7, 38);
      ctx.fillRect(cx + 20, cy - 25, 7, 38);
    }

    // 4. Headwear
    if (this.currentAvatar.headwear === 'pheta-turban') {
      ctx.fillStyle = '#B69A62';
      ctx.fillRect(cx - 26, cy - 46, 52, 16);
      ctx.fillStyle = '#B76E4B';
      ctx.fillRect(cx - 4, cy - 48, 8, 20); // brooch
    } else if (this.currentAvatar.headwear === 'mysore-peta') {
      ctx.fillStyle = '#B76E4B';
      ctx.fillRect(cx - 24, cy - 44, 48, 14);
      ctx.fillStyle = '#D4AF37';
      ctx.fillRect(cx - 24, cy - 34, 48, 4);
    } else if (this.currentAvatar.headwear === 'himachali-cap') {
      ctx.fillStyle = '#493A2D';
      ctx.fillRect(cx - 22, cy - 40, 44, 12);
      ctx.fillStyle = '#B76E4B';
      ctx.fillRect(cx - 22, cy - 32, 44, 4);
    } else if (this.currentAvatar.headwear === 'floral-juda') {
      ctx.fillStyle = '#FAF7F0';
      ctx.beginPath();
      ctx.arc(cx, cy - 40, 10, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#1A110B';
      ctx.fillRect(cx - 22, cy - 38, 44, 10);
    }

    if (isFemale) {
      // Visible earrings and a bindi distinguish the face from the male
      // preview without preventing any headwear combination.
      ctx.fillStyle = '#D4AF37';
      ctx.fillRect(cx - 28, cy - 17, 5, 8);
      ctx.fillRect(cx + 23, cy - 17, 5, 8);
      ctx.fillStyle = '#B76E4B';
      ctx.fillRect(cx - 2, cy - 31, 5, 6);
    }

    // 5. Accessory Icon in Hand
    ctx.font = '22px sans-serif';
    ctx.fillText('📜', cx + 22, cy + 30);
  }
}
