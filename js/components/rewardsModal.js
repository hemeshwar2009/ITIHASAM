// js/components/rewardsModal.js
// ITIHASAM: Rewards Dashboard, Badges, Artifacts & Printable Certificate

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { LEVELS, BADGES, ARTIFACTS } from '../data/rewardsData.js';
import { INDIAN_STATES, REGION_COUNT, STATE_COUNT, UT_COUNT, isUT } from '../data/statesData.js';
import { escapeHTML } from '../i18n.js';

const QR_LIB = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
let qrLibPromise = null;
function loadQRLib() {
  if (window.QRCode) return Promise.resolve(window.QRCode);
  if (!qrLibPromise) {
    qrLibPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = QR_LIB;
      s.onload = () => resolve(window.QRCode);
      s.onerror = () => { qrLibPromise = null; reject(new Error('QR library unavailable')); };
      document.head.appendChild(s);
    });
  }
  return qrLibPromise;
}

export function shareUrl() {
  if (/^https?:$/.test(location.protocol)) return location.origin + location.pathname;
  return null; // opened from a file: no public link to encode
}

export class RewardsModal {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.activeTab = options.tab || 'levels'; // 'levels' | 'badges' | 'artifacts' | 'states-progress' | 'certificate'
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    const overallPct = gameState.getOverallCompletionPercentage();
    const pts = gameState.state.points;
    const currentLvl = gameState.state.currentLevel;

    this.container.innerHTML = `
      <div class="rewards-dashboard-wrap ancient-panel">
        <!-- Header Banner with Points & Level Summary -->
        <div class="rewards-summary-header">
          <div class="summary-left">
            <span class="category-pill">GAMIFICATION & REWARDS</span>
            <h2>My Cultural Heritage Journey</h2>
            <p>Progressively unlock ancient levels, collect badges, and earn historical artifacts.</p>
          </div>

          <div class="summary-stats-box">
            <div class="score-card">
              <span class="score-title">Cultural Discovery Points</span>
              <span class="score-val text-gold">${pts} CDP</span>
            </div>
            <div class="score-card">
              <span class="score-title">Current Mastery Rank</span>
              <span class="score-val">Level ${currentLvl} of 5</span>
            </div>
            <div class="score-card">
              <span class="score-title">Overall Progress (${REGION_COUNT} regions)</span>
              <span class="score-val">${overallPct}%</span>
            </div>
          </div>
        </div>

        <!-- Rewards Navigation Tabs -->
        <div class="rewards-tabs-bar" role="tablist" aria-label="Rewards sections">
          <button class="rewards-tab-btn ${this.activeTab === 'levels' ? 'active' : ''}" data-tab="levels" role="tab" aria-selected="${this.activeTab === 'levels'}">📜 Level Progression</button>
          <button class="rewards-tab-btn ${this.activeTab === 'badges' ? 'active' : ''}" data-tab="badges" role="tab" aria-selected="${this.activeTab === 'badges'}">🎖️ Badges (${gameState.state.unlockedBadges.length}/${BADGES.length})</button>
          <button class="rewards-tab-btn ${this.activeTab === 'artifacts' ? 'active' : ''}" data-tab="artifacts" role="tab" aria-selected="${this.activeTab === 'artifacts'}">🏺 Collectible Artifacts (${gameState.state.collectedArtifacts.length}/${ARTIFACTS.length})</button>
          <button class="rewards-tab-btn ${this.activeTab === 'states-progress' ? 'active' : ''}" data-tab="states-progress" role="tab" aria-selected="${this.activeTab === 'states-progress'}">🗺️ States & UTs Tracker</button>
          <button class="rewards-tab-btn ${this.activeTab === 'certificate' ? 'active' : ''}" data-tab="certificate" role="tab" aria-selected="${this.activeTab === 'certificate'}">🎓 Heritage Certificate</button>
        </div>

        <!-- Tab 1: Progressive Levels -->
        <div class="rewards-tab-content ${this.activeTab === 'levels' ? '' : 'hidden'}" id="tab-content-levels">
          <div class="levels-progression-timeline">
            ${LEVELS.map(lvl => {
              const isUnlocked = currentLvl >= lvl.level;
              return `
                <div class="level-card ancient-panel ${isUnlocked ? 'unlocked' : 'locked'}">
                  <div class="level-badge-col">
                    <span class="level-number">LEVEL 0${lvl.level}</span>
                    <span class="level-icon">${lvl.icon}</span>
                  </div>
                  <div class="level-info-col">
                    <div class="level-title-row">
                      <h4 class="level-title">${lvl.title}</h4>
                      <span class="level-status-pill ${isUnlocked ? 'unlocked' : 'locked'}">
                        ${isUnlocked ? '✓ Unlocked' : `🔒 Requires ${lvl.requiredPoints} CDP`}
                      </span>
                    </div>
                    <p class="level-description">${lvl.description}</p>
                    <div class="level-reward-bar">
                      <span class="reward-tag">Badge Reward: ${lvl.rewardBadge}</span>
                      <span class="reward-tag">${lvl.unlockMessage}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Tab 2: Achievement Badges -->
        <div class="rewards-tab-content ${this.activeTab === 'badges' ? '' : 'hidden'}" id="tab-content-badges">
          <div class="badges-grid-layout">
            ${BADGES.map(badge => {
              const isUnlocked = gameState.state.unlockedBadges.includes(badge.id);
              return `
                <div class="badge-card ancient-panel ${isUnlocked ? 'badge-earned' : 'badge-locked'}">
                  <div class="badge-icon-wrap">${badge.icon}</div>
                  <h4 class="badge-name">${badge.name}</h4>
                  <span class="badge-category">${badge.category}</span>
                  <p class="badge-desc">${badge.description}</p>
                  <div class="badge-status-tag">
                    ${isUnlocked ? '✓ EARNED' : `🔒 +${badge.cdpReward} CDP`}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Tab 3: Collectible Heritage Artifacts -->
        <div class="rewards-tab-content ${this.activeTab === 'artifacts' ? '' : 'hidden'}" id="tab-content-artifacts">
          <div class="artifacts-grid-layout">
            ${ARTIFACTS.map(art => {
              const isCollected = gameState.state.collectedArtifacts.includes(art.id);
              return `
                <div class="artifact-card ancient-panel ${isCollected ? 'collected' : 'uncollected'}">
                  <div class="artifact-top-bar">
                    <span class="artifact-era">${art.era}</span>
                    <span class="artifact-state">📍 ${art.state}</span>
                  </div>
                  <div class="artifact-icon-wrap">${art.icon}</div>
                  <h4 class="artifact-name">${art.name}</h4>
                  <p class="artifact-lore">${art.lore}</p>
                  <div class="artifact-material-row">
                    <span class="meta-label">Material:</span>
                    <span class="meta-val">${art.material}</span>
                  </div>
                  <div class="artifact-status-banner">
                    ${isCollected ? '✓ COLLECTED IN REPOSITORY' : `🔒 Complete the ${escapeHTML(art.state)} history quest`}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Tab 4: States & Union Territories Progress Tracker -->
        <div class="rewards-tab-content ${this.activeTab === 'states-progress' ? '' : 'hidden'}" id="tab-content-states-progress">
          <div class="states-tracker-table ancient-panel">
            <div class="tracker-header-row">
              <span class="th-state">State</span>
              <span class="th-region">Region</span>
              <span class="th-cats">History</span>
              <span class="th-cats">Games</span>
              <span class="th-cats">Architecture</span>
              <span class="th-cats">Festivals</span>
              <span class="th-cats">Culture</span>
              <span class="th-action">Completion</span>
            </div>

            <div class="tracker-body-rows">
              ${INDIAN_STATES.map(s => {
                const h = gameState.isActivityCompleted(s.id, 'history');
                const g = gameState.isActivityCompleted(s.id, 'games');
                const a = gameState.isActivityCompleted(s.id, 'architecture');
                const f = gameState.isActivityCompleted(s.id, 'festivals');
                const c = gameState.isActivityCompleted(s.id, 'culture');
                const pct = gameState.getStateCompletionPercentage(s.id);

                return `
                  <div class="tracker-row">
                    <span class="td-state font-bold">${pct === 100 ? '🛂 ' : ''}${s.name}${isUT(s) ? ' <span class="ut-pill">UT</span>' : ''}</span>
                    <span class="td-region">${s.region}</span>
                    <span class="td-cat ${h ? 'done' : 'pending'}">${h ? '✓' : '•'}</span>
                    <span class="td-cat ${g ? 'done' : 'pending'}">${g ? '✓' : '•'}</span>
                    <span class="td-cat ${a ? 'done' : 'pending'}">${a ? '✓' : '•'}</span>
                    <span class="td-cat ${f ? 'done' : 'pending'}">${f ? '✓' : '•'}</span>
                    <span class="td-cat ${c ? 'done' : 'pending'}">${c ? '✓' : '•'}</span>
                    <span class="td-action">${pct}%</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Tab 5: Dynamic Printable Certificate -->
        <div class="rewards-tab-content ${this.activeTab === 'certificate' ? '' : 'hidden'}" id="tab-content-certificate">
          <div class="certificate-container">
            <div class="certificate-paper ancient-panel" id="certificate-print-area">
              <div class="cert-outer-border">
                <div class="cert-inner-border">
                  <div class="cert-top-seal">🏛️ ॐ 🏛️</div>
                  <h3 class="cert-title">ITIHASAM</h3>
                  <h4 class="cert-subtitle">CERTIFICATE OF CULTURAL HERITAGE MASTERY</h4>

                  <p class="cert-prose">This certifies that intrepid heritage explorer</p>
                  <h2 class="cert-recipient-name">${escapeHTML(gameState.state.avatar.name || 'Explorer')}</h2>
                  <p class="cert-prose">has journeyed through the ancient history, forgotten traditional games, architectural wonders, sacred festivals and living traditions of India, earning ${gameState.countStamps()} of ${REGION_COUNT} passport stamps and ${gameState.state.unlockedBadges.length} badges.</p>

                  <div class="cert-stats-row">
                    <div class="cert-stat-item">
                      <span class="c-label">Cultural Points:</span>
                      <span class="c-val">${pts} CDP</span>
                    </div>
                    <div class="cert-stat-item">
                      <span class="c-label">Mastery Rank:</span>
                      <span class="c-val">Level ${currentLvl} Custodian</span>
                    </div>
                    <div class="cert-stat-item">
                      <span class="c-label">Date Awarded:</span>
                      <span class="c-val">${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>

                  <div class="cert-signatures-row">
                    <div class="sig-col">
                      <span class="sig-line">Heritage Guild of India</span>
                      <span class="sig-title">Council of Living Traditions</span>
                    </div>
                    <div class="sig-seal-wrap">
                      <span class="ashoka-chakra-seal" aria-hidden="true">☸️</span>
                      <span class="seal-text">Itihasam Seal</span>
                    </div>
                    <div class="cert-qr-wrap">
                      <div id="cert-qr" class="cert-qr" aria-label="QR code linking to Itihasam"></div>
                      <span class="seal-text">Scan to explore</span>
                    </div>
                    <div class="sig-col">
                      <span class="sig-line">${escapeHTML(gameState.state.avatar.name || 'Explorer')}</span>
                      <span class="sig-title">Master Heritage Explorer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="cert-action-bar">
              <button class="btn-ancient btn-gold" id="btn-download-certificate">⬇ DOWNLOAD AS IMAGE (PNG)</button>
              <button class="btn-ancient btn-secondary" id="btn-print-certificate">🖨️ PRINT / SAVE AS PDF</button>
              ${navigator.share ? '<button class="btn-ancient btn-terracotta" id="btn-share-certificate">📤 SHARE</button>' : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    const tabs = this.container.querySelectorAll('.rewards-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        soundSynth.playClick();
        this.activeTab = tab.dataset.tab;
        this.render();
      });
    });

    const btnPrint = this.container.querySelector('#btn-print-certificate');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        soundSynth.playBell();
        window.print();
      });
    }

    if (this.activeTab === 'certificate') this.renderQR();

    const btnDl = this.container.querySelector('#btn-download-certificate');
    if (btnDl) btnDl.addEventListener('click', async () => {
      soundSynth.playBell();
      const blob = await this.certificateBlob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `itihasam-certificate-${(gameState.state.avatar.name || 'explorer').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    });

    const btnShare = this.container.querySelector('#btn-share-certificate');
    if (btnShare) btnShare.addEventListener('click', async () => {
      try {
        const blob = await this.certificateBlob();
        const file = new File([blob], 'itihasam-certificate.png', { type: 'image/png' });
        const data = { title: 'My Itihasam Heritage Certificate', text: `I earned ${gameState.state.points} Cultural Discovery Points exploring India's heritage on Itihasam!` };
        if (shareUrl()) data.url = shareUrl();
        if (navigator.canShare && navigator.canShare({ files: [file] })) data.files = [file];
        await navigator.share(data);
      } catch (e) { /* user cancelled */ }
    });
  }

  async renderQR() {
    const holder = this.container.querySelector('#cert-qr');
    if (!holder) return;
    if (!shareUrl()) { holder.closest('.cert-qr-wrap').classList.add('hidden'); return; }
    try {
      const QRCode = await loadQRLib();
      holder.innerHTML = '';
      new QRCode(holder, { text: shareUrl(), width: 96, height: 96, colorDark: '#493A2D', colorLight: '#FAF7F0' });
    } catch (e) {
      holder.closest('.cert-qr-wrap').classList.add('hidden');
    }
  }

  qrImage() {
    const holder = this.container.querySelector('#cert-qr');
    if (!holder) return null;
    return holder.querySelector('canvas') || holder.querySelector('img');
  }

  /** Draws the certificate onto a canvas and returns a PNG blob. */
  certificateBlob() {
    const W = 1600, H = 1130;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const s = gameState.state;
    const name = s.avatar.name || 'Explorer';

    // Parchment
    const g = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, W * 0.7);
    g.addColorStop(0, '#FAF7F0');
    g.addColorStop(1, '#EFE5D2');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // Borders
    ctx.strokeStyle = '#B69A62'; ctx.lineWidth = 14; ctx.strokeRect(40, 40, W - 80, H - 80);
    ctx.strokeStyle = '#B76E4B'; ctx.lineWidth = 3; ctx.strokeRect(72, 72, W - 144, H - 144);
    ctx.setLineDash([10, 8]); ctx.strokeStyle = '#D8CBB6'; ctx.strokeRect(92, 92, W - 184, H - 184); ctx.setLineDash([]);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#B69A62';
    ctx.font = '40px serif';
    ctx.fillText('❦ ══ •⊰ ॐ ⊱• ══ ❦', W / 2, 175);
    ctx.fillStyle = '#493A2D';
    ctx.font = 'bold 92px Cinzel, Georgia, serif';
    ctx.fillText('ITIHASAM', W / 2, 280);
    ctx.font = '30px Marcellus, Georgia, serif';
    ctx.fillStyle = '#B76E4B';
    ctx.fillText('CERTIFICATE OF CULTURAL HERITAGE MASTERY', W / 2, 335);

    ctx.fillStyle = '#736152';
    ctx.font = 'italic 30px Georgia, serif';
    ctx.fillText('This certifies that heritage explorer', W / 2, 420);
    ctx.fillStyle = '#493A2D';
    ctx.font = 'bold 76px Cinzel, Georgia, serif';
    ctx.fillText(name.slice(0, 28), W / 2, 515);
    ctx.strokeStyle = '#B69A62'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W / 2 - 380, 540); ctx.lineTo(W / 2 + 380, 540); ctx.stroke();

    ctx.fillStyle = '#736152';
    ctx.font = '28px Georgia, serif';
    ctx.fillText('has journeyed through the history, traditional games, architecture,', W / 2, 600);
    ctx.fillText('festivals and living traditions of India.', W / 2, 640);

    const stats = [
      ['Cultural Points', `${s.points} CDP`],
      ['Mastery Rank', `Level ${s.currentLevel}`],
      ['Passport Stamps', `${gameState.countStamps()} / ${REGION_COUNT}`],
      ['Badges', `${s.unlockedBadges.length}`]
    ];
    stats.forEach(([label, val], i) => {
      const x = 330 + i * 313;
      ctx.fillStyle = '#B76E4B'; ctx.font = '22px Georgia, serif'; ctx.fillText(label, x, 730);
      ctx.fillStyle = '#493A2D'; ctx.font = 'bold 38px Georgia, serif'; ctx.fillText(val, x, 778);
    });

    ctx.font = '24px Georgia, serif';
    ctx.fillStyle = '#736152';
    ctx.fillText(new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }), 360, 930);
    ctx.fillText('Date awarded', 360, 965);
    // Gold 24-spoke chakra seal (drawn, so it looks the same on every device)
    const cx = W / 2, cy = 915, R = 62;
    ctx.save();
    ctx.strokeStyle = '#B69A62';
    ctx.fillStyle = 'rgba(182, 154, 98, 0.12)';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.lineWidth = 2;
    for (let k = 0; k < 24; k++) {
      const ang = (k / 24) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * 10, cy + Math.sin(ang) * 10);
      ctx.lineTo(cx + Math.cos(ang) * (R - 6), cy + Math.sin(ang) * (R - 6));
      ctx.stroke();
    }
    ctx.fillStyle = '#B69A62';
    ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#736152';
    ctx.font = '20px Georgia, serif';
    ctx.fillText('Itihasam Seal', cx, cy + R + 32);

    const qr = this.qrImage();
    if (qr) {
      try {
        ctx.fillStyle = '#FAF7F0';
        ctx.fillRect(1150, 830, 170, 170);
        ctx.drawImage(qr, 1160, 840, 150, 150);
        ctx.fillStyle = '#736152';
        ctx.font = '20px Georgia, serif';
        ctx.fillText('Scan to explore', 1235, 1030);
      } catch (e) { /* ignore */ }
    }

    return new Promise(resolve => c.toBlob(resolve, 'image/png'));
  }
}
