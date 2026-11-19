// js/components/rewardsModal.js
// DISCOVER INDIA: Rewards Dashboard, Badges, Artifacts & Printable Certificate

import { soundSynth } from '../audio/soundSynth.js';
import { gameState } from '../state/gameState.js';
import { LEVELS, BADGES, ARTIFACTS } from '../data/rewardsData.js';
import { INDIAN_STATES } from '../data/statesData.js';

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
              <span class="score-title">Overall 28-State Progress</span>
              <span class="score-val">${overallPct}%</span>
            </div>
          </div>
        </div>

        <!-- Rewards Navigation Tabs -->
        <div class="rewards-tabs-bar">
          <button class="rewards-tab-btn ${this.activeTab === 'levels' ? 'active' : ''}" data-tab="levels">📜 Level Progression</button>
          <button class="rewards-tab-btn ${this.activeTab === 'badges' ? 'active' : ''}" data-tab="badges">🎖️ Badges (${gameState.state.unlockedBadges.length}/${BADGES.length})</button>
          <button class="rewards-tab-btn ${this.activeTab === 'artifacts' ? 'active' : ''}" data-tab="artifacts">🏺 Collectible Artifacts (${gameState.state.collectedArtifacts.length}/${ARTIFACTS.length})</button>
          <button class="rewards-tab-btn ${this.activeTab === 'states-progress' ? 'active' : ''}" data-tab="states-progress">🗺️ 28 States Tracker</button>
          <button class="rewards-tab-btn ${this.activeTab === 'certificate' ? 'active' : ''}" data-tab="certificate">🎓 Heritage Certificate</button>
        </div>

        <!-- Tab 1: Progressive Levels -->
        <div class="rewards-tab-content ${this.activeTab === 'levels' ? '' : 'hidden'}" id="tab-content-levels">
          <div class="levels-progression-timeline">
            ${LEVELS.map(lvl => {
              const isUnlocked = currentLvl >= lvl.level;
              const isCompleted = pts >= lvl.requiredPoints + 200;
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
                    ${isCollected ? '✓ COLLECTED IN REPOSITORY' : '🔒 Explore state to discover'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Tab 4: 28 States Progress Tracker -->
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
                    <span class="td-state font-bold">${s.name}</span>
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
                  <h3 class="cert-title">DISCOVER INDIA</h3>
                  <h4 class="cert-subtitle">CERTIFICATE OF CULTURAL HERITAGE MASTERY</h4>
                  
                  <p class="cert-prose">This certifies that intrepid heritage explorer</p>
                  <h2 class="cert-recipient-name">${gameState.state.avatar.name || 'Aryavart'}</h2>
                  <p class="cert-prose">has journeyed through the ancient history, forgotten traditional games, architectural wonders, sacred festivals and living traditions across the 28 states of India.</p>

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
                      <span class="ashoka-chakra-seal">☸️</span>
                      <span class="seal-text">Official Seal</span>
                    </div>
                    <div class="sig-col">
                      <span class="sig-line">${gameState.state.avatar.name || 'Explorer'}</span>
                      <span class="sig-title">Master Heritage Explorer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="cert-action-bar">
              <button class="btn-ancient btn-gold" id="btn-print-certificate">🖨️ PRINT / DOWNLOAD CERTIFICATE</button>
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
  }
}
