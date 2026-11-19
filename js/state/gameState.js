// js/state/gameState.js
// DISCOVER INDIA: Central Game State & Progression Manager

import { LEVELS, BADGES, ARTIFACTS } from '../data/rewardsData.js';
import { INITIAL_ARCHETYPES } from '../data/avatarData.js';

const STORAGE_KEY = 'discover_india_progression_v1';

class GameStateManager {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  getDefaultState() {
    return {
      points: 0,
      currentLevel: 1,
      activeStateId: 'tamil-nadu',
      activeCategoryKey: 'history',
      currentView: 'landing',
      avatar: { ...INITIAL_ARCHETYPES[0].avatar },
      completedActivities: {
        // format: { 'stateId_categoryId': timestamp }
      },
      unlockedBadges: [],
      collectedArtifacts: [],
      soundEnabled: true,
      musicEnabled: false,
      slideshowIntervalSeconds: 5,
      lastPlayedGame: null
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...this.getDefaultState(), ...parsed };
      }
    } catch (e) {
      console.warn('Could not load saved game state, using defaults.', e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notifyListeners();
    } catch (e) {
      console.warn('Failed to save game state to localStorage.', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(fn => fn(this.state));
  }

  // Points and Progress
  addPoints(amount, reason = '') {
    this.state.points += amount;
    this.checkLevelUnlocks();
    this.checkBadgeUnlocks();
    this.saveState();
    return this.state.points;
  }

  completeActivity(stateId, categoryKey, pointsAwarded = 150) {
    const key = `${stateId}_${categoryKey}`;
    const isFirstTime = !this.state.completedActivities[key];
    
    this.state.completedActivities[key] = Date.now();
    
    // First discovery badge check
    if (!this.state.unlockedBadges.includes('first-discovery')) {
      this.unlockBadge('first-discovery');
    }

    if (isFirstTime && pointsAwarded > 0) {
      this.addPoints(pointsAwarded, `Completed ${categoryKey} in ${stateId}`);
    }

    // Check category-specific badge
    if (categoryKey === 'history' && !this.state.unlockedBadges.includes('history-master')) {
      this.unlockBadge('history-master');
    }

    // Check artifact collection
    this.checkArtifactCollection(stateId, categoryKey);
    this.saveState();
    return { isFirstTime, points: this.state.points };
  }

  isActivityCompleted(stateId, categoryKey) {
    return !!this.state.completedActivities[`${stateId}_${categoryKey}`];
  }

  getStateCompletionPercentage(stateId) {
    const categories = ['history', 'games', 'architecture', 'festivals', 'culture'];
    const completed = categories.filter(cat => this.isActivityCompleted(stateId, cat)).length;
    return Math.round((completed / categories.length) * 100);
  }

  getOverallCompletionPercentage() {
    const totalActivities = 28 * 5; // 140 activities
    const completedCount = Object.keys(this.state.completedActivities).length;
    return Math.min(100, Math.round((completedCount / totalActivities) * 100));
  }

  checkLevelUnlocks() {
    const pts = this.state.points;
    let unlockedLevel = 1;
    for (const lvl of LEVELS) {
      if (pts >= lvl.requiredPoints) {
        unlockedLevel = Math.max(unlockedLevel, lvl.level);
      }
    }
    if (unlockedLevel > this.state.currentLevel) {
      this.state.currentLevel = unlockedLevel;
      return unlockedLevel;
    }
    return null;
  }

  checkBadgeUnlocks() {
    // Check all-regions voyager
    const completedKeys = Object.keys(this.state.completedActivities);
    if (completedKeys.length >= 28 && !this.state.unlockedBadges.includes('all-regions-voyager')) {
      this.unlockBadge('all-regions-voyager');
    }
  }

  unlockBadge(badgeId) {
    if (!this.state.unlockedBadges.includes(badgeId)) {
      this.state.unlockedBadges.push(badgeId);
      const badge = BADGES.find(b => b.id === badgeId);
      if (badge && badge.cdpReward) {
        this.state.points += badge.cdpReward;
      }
      this.saveState();
      return badge;
    }
    return null;
  }

  checkArtifactCollection(stateId, categoryKey) {
    // If state has an artifact and it was a history or architecture activity
    const artifact = ARTIFACTS.find(a => a.state.toLowerCase().replace(/\s+/g, '-') === stateId);
    if (artifact && !this.state.collectedArtifacts.includes(artifact.id)) {
      this.state.collectedArtifacts.push(artifact.id);
      this.saveState();
      return artifact;
    }
    return null;
  }

  // Avatar Management
  updateAvatar(newAvatarData) {
    this.state.avatar = { ...this.state.avatar, ...newAvatarData };
    this.saveState();
    return this.state.avatar;
  }

  setArchetype(archetypeId) {
    const arch = INITIAL_ARCHETYPES.find(a => a.id === archetypeId);
    if (arch) {
      this.state.avatar = { ...arch.avatar };
      this.saveState();
    }
    return this.state.avatar;
  }

  // Navigation
  setCurrentView(view, payload = {}) {
    this.state.currentView = view;
    if (payload.stateId) this.state.activeStateId = payload.stateId;
    if (payload.categoryKey) this.state.activeCategoryKey = payload.categoryKey;
    this.saveState();
  }

  resetProgress() {
    this.state = this.getDefaultState();
    this.saveState();
  }
}

export const gameState = new GameStateManager();

if (typeof window !== 'undefined') {
  window.gameState = gameState;
}
