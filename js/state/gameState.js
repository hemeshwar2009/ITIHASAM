// js/state/gameState.js
// ITIHASAM: Central Game State & Progression Manager
// - Per-profile saves (so several students can share one device: "Class Mode")
// - Correct badge / level / artifact / passport-stamp logic
// - Daily challenge streaks
// - Event bus for toasts (badge, level, artifact, stamp)

import { LEVELS, BADGES, ARTIFACTS } from '../data/rewardsData.js';
import { INITIAL_ARCHETYPES } from '../data/avatarData.js';
import { INDIAN_STATES } from '../data/statesData.js';

const PROFILES_KEY = 'itihasam_profiles_v1';
const PROFILE_PREFIX = 'itihasam_profile_';
const LEGACY_KEY = 'discover_india_progression_v1';

export const CATEGORY_KEYS = ['history', 'games', 'architecture', 'festivals', 'culture'];
export const REGIONS_LIST = ['South', 'West', 'North', 'East', 'Northeast', 'Central'];

function safeGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
}
function safeRemove(key) {
  try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
}

export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function dayDiff(a, b) {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db - da) / 86400000);
}

class GameStateManager {
  constructor() {
    this.listeners = [];
    this.eventListeners = [];
    this.profiles = this.loadProfiles();
    this.state = this.loadState(this.profiles.activeId);
  }

  // ---------- Profiles ("Class Mode" on a shared device) ----------
  loadProfiles() {
    let profiles = null;
    try { profiles = JSON.parse(safeGet(PROFILES_KEY) || 'null'); } catch (e) { profiles = null; }
    if (!profiles || !Array.isArray(profiles.list) || profiles.list.length === 0) {
      profiles = { activeId: 'p1', list: [{ id: 'p1', name: 'Explorer' }] };
      // Migrate progress saved under the project's old name
      const legacy = safeGet(LEGACY_KEY);
      if (legacy) {
        safeSet(PROFILE_PREFIX + 'p1', legacy);
        safeRemove(LEGACY_KEY);
      }
      safeSet(PROFILES_KEY, JSON.stringify(profiles));
    }
    return profiles;
  }

  saveProfiles() {
    safeSet(PROFILES_KEY, JSON.stringify(this.profiles));
  }

  getProfiles() {
    return this.profiles.list.map(p => {
      const data = p.id === this.profiles.activeId ? this.state : this.readProfileData(p.id);
      return {
        id: p.id,
        name: (data && data.avatar && data.avatar.name) || p.name,
        points: data ? data.points : 0,
        level: data ? data.currentLevel : 1,
        stamps: data ? this.countStamps(data) : 0,
        streak: data && data.daily ? data.daily.streak : 0,
        isActive: p.id === this.profiles.activeId
      };
    });
  }

  readProfileData(id) {
    try {
      const raw = safeGet(PROFILE_PREFIX + id);
      return raw ? { ...this.getDefaultState(), ...JSON.parse(raw) } : this.getDefaultState();
    } catch (e) {
      return this.getDefaultState();
    }
  }

  createProfile(name) {
    const id = 'p' + Date.now().toString(36);
    const clean = String(name || 'Explorer').trim().slice(0, 24) || 'Explorer';
    this.profiles.list.push({ id, name: clean });
    const fresh = this.getDefaultState();
    fresh.avatar = { ...fresh.avatar, name: clean };
    safeSet(PROFILE_PREFIX + id, JSON.stringify(fresh));
    this.saveProfiles();
    this.switchProfile(id);
    return id;
  }

  switchProfile(id) {
    if (!this.profiles.list.some(p => p.id === id)) return;
    this.saveState();
    this.profiles.activeId = id;
    this.saveProfiles();
    this.state = this.loadState(id);
    this.notifyListeners();
  }

  deleteProfile(id) {
    if (this.profiles.list.length <= 1) return false;
    this.profiles.list = this.profiles.list.filter(p => p.id !== id);
    safeRemove(PROFILE_PREFIX + id);
    if (this.profiles.activeId === id) {
      this.profiles.activeId = this.profiles.list[0].id;
      this.state = this.loadState(this.profiles.activeId);
    }
    this.saveProfiles();
    this.notifyListeners();
    return true;
  }

  // ---------- Persistence ----------
  getDefaultState() {
    return {
      points: 0,
      currentLevel: 1,
      activeStateId: 'tamil-nadu',
      activeCategoryKey: 'history',
      currentView: 'landing',
      avatar: { ...INITIAL_ARCHETYPES[0].avatar },
      completedActivities: {},   // { 'stateId_categoryKey': timestamp }
      unlockedBadges: [],
      collectedArtifacts: [],
      gameWins: {},              // { pallanguzhi: 2, chaupar: 1, ... }
      festivalThemes: [],        // festival mini-game themes completed
      daily: { lastDate: null, streak: 0, bestStreak: 0, history: {} },
      timelineBest: 0,
      online: null,              // { id, secret, classCode, displayName } for the online class board
      soundEnabled: true,
      musicEnabled: false,
      language: 'en',
      highContrast: false,
      reducedMotion: false,
      slideshowIntervalSeconds: 5,
      lastPlayedGame: null
    };
  }

  loadState(profileId) {
    try {
      const saved = safeGet(PROFILE_PREFIX + profileId);
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = { ...this.getDefaultState(), ...parsed };
        merged.daily = { ...this.getDefaultState().daily, ...(parsed.daily || {}) };
        return merged;
      }
    } catch (e) {
      console.warn('Could not load saved game state, using defaults.', e);
    }
    return this.getDefaultState();
  }

  saveState() {
    if (!this.profiles) return;
    safeSet(PROFILE_PREFIX + this.profiles.activeId, JSON.stringify(this.state));
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(fn => {
      try { fn(this.state); } catch (e) { console.warn(e); }
    });
  }

  // Events: { type: 'badge' | 'level' | 'artifact' | 'stamp' | 'points', ... }
  onEvent(listener) {
    this.eventListeners.push(listener);
    return () => {
      this.eventListeners = this.eventListeners.filter(l => l !== listener);
    };
  }

  emit(event) {
    this.eventListeners.forEach(fn => {
      try { fn(event); } catch (e) { console.warn(e); }
    });
  }

  hasProgress() {
    return this.state.points > 0 || Object.keys(this.state.completedActivities).length > 0;
  }

  // ---------- Points, levels ----------
  addPoints(amount, reason = '') {
    if (!amount) return this.state.points;
    this.state.points += amount;
    this.emit({ type: 'points', amount, reason });
    this.checkLevelUnlocks();
    this.saveState();
    return this.state.points;
  }

  checkLevelUnlocks() {
    const pts = this.state.points;
    let unlockedLevel = 1;
    for (const lvl of LEVELS) {
      if (pts >= lvl.requiredPoints) unlockedLevel = Math.max(unlockedLevel, lvl.level);
    }
    if (unlockedLevel > this.state.currentLevel) {
      this.state.currentLevel = unlockedLevel;
      const lvl = LEVELS.find(l => l.level === unlockedLevel);
      this.emit({ type: 'level', level: unlockedLevel, title: lvl ? lvl.title : `Level ${unlockedLevel}` });
      return unlockedLevel;
    }
    return null;
  }

  // ---------- Activities ----------
  /**
   * Records a completed activity. Only call this for a genuine success.
   * @param {object} meta optional { gameKey, festivalTheme }
   */
  completeActivity(stateId, categoryKey, pointsAwarded = 150, meta = {}) {
    const key = `${stateId}_${categoryKey}`;
    const isFirstTime = !this.state.completedActivities[key];
    this.state.completedActivities[key] = Date.now();

    if (isFirstTime && pointsAwarded > 0) {
      this.addPoints(pointsAwarded, `Completed ${categoryKey} in ${stateId}`);
    }

    if (meta.gameKey) {
      this.state.gameWins[meta.gameKey] = (this.state.gameWins[meta.gameKey] || 0) + 1;
      this.state.lastPlayedGame = meta.gameKey;
    }
    if (meta.festivalTheme && !this.state.festivalThemes.includes(meta.festivalTheme)) {
      this.state.festivalThemes.push(meta.festivalTheme);
    }

    // Artifacts are earned from History missions (each state's relic) and
    // from Architecture builds for states with a featured monument artifact.
    let artifact = null;
    if (categoryKey === 'history' || categoryKey === 'architecture') {
      artifact = this.collectArtifactForState(stateId);
    }

    // Passport stamp when all five categories of a state are done
    if (isFirstTime && this.getStateCompletionPercentage(stateId) === 100) {
      const st = INDIAN_STATES.find(s => s.id === stateId);
      this.emit({ type: 'stamp', stateId, name: st ? st.name : stateId });
    }

    this.checkBadgeUnlocks();
    this.saveState();
    return { isFirstTime, points: this.state.points, artifact };
  }

  isActivityCompleted(stateId, categoryKey) {
    return !!this.state.completedActivities[`${stateId}_${categoryKey}`];
  }

  countCategory(categoryKey, data = this.state) {
    return Object.keys(data.completedActivities).filter(k => k.endsWith('_' + categoryKey)).length;
  }

  getStateCompletionPercentage(stateId, data = this.state) {
    const completed = CATEGORY_KEYS.filter(cat => !!data.completedActivities[`${stateId}_${cat}`]).length;
    return Math.round((completed / CATEGORY_KEYS.length) * 100);
  }

  getOverallCompletionPercentage() {
    const total = INDIAN_STATES.length * CATEGORY_KEYS.length;
    const done = Object.keys(this.state.completedActivities).length;
    return Math.min(100, Math.round((done / total) * 100));
  }

  countStamps(data = this.state) {
    return INDIAN_STATES.filter(s => this.getStateCompletionPercentage(s.id, data) === 100).length;
  }

  getStampedStateIds() {
    return INDIAN_STATES.filter(s => this.getStateCompletionPercentage(s.id) === 100).map(s => s.id);
  }

  getVisitedRegions() {
    const regions = new Set();
    Object.keys(this.state.completedActivities).forEach(k => {
      const stateId = k.slice(0, k.lastIndexOf('_'));
      const st = INDIAN_STATES.find(s => s.id === stateId);
      if (st) regions.add(st.region);
    });
    return regions;
  }

  // ---------- Badges ----------
  checkBadgeUnlocks() {
    const s = this.state;
    const totalDone = Object.keys(s.completedActivities).length;
    const wins = s.gameWins || {};
    const themes = s.festivalThemes || [];

    const rules = {
      'first-discovery': totalDone >= 1,
      'history-master': this.countCategory('history') >= 5,
      'pallanguzhi-champion': (wins.pallanguzhi || 0) >= 1,
      'aadu-puli-strategist': (wins.baghchal || 0) >= 1,
      'chaupar-champion': (wins.chaupar || 0) >= 1,
      'folk-sports-ace': (wins.sports || 0) >= 3,
      'vimana-builder': this.countCategory('architecture') >= 1,
      'pookalam-designer': themes.includes('pookalam'),
      'pongal-celebrant': themes.includes('pongal'),
      'rhythm-keeper': themes.some(t => t.startsWith('rhythm')),
      'tradition-explorer': this.countCategory('culture') >= 5,
      'all-regions-voyager': REGIONS_LIST.every(r => this.getVisitedRegions().has(r)),
      'passport-complete': this.countStamps() >= INDIAN_STATES.length,
      'streak-keeper': (s.daily && s.daily.bestStreak >= 3),
      'timeline-sage': (s.timelineBest || 0) >= 8
    };

    Object.entries(rules).forEach(([id, ok]) => {
      if (ok) this.unlockBadge(id, { silentSave: true });
    });
  }

  unlockBadge(badgeId, opts = {}) {
    if (this.state.unlockedBadges.includes(badgeId)) return null;
    const badge = BADGES.find(b => b.id === badgeId);
    if (!badge) return null;
    this.state.unlockedBadges.push(badgeId);
    this.emit({ type: 'badge', badge });
    if (badge.cdpReward) {
      this.state.points += badge.cdpReward;
      this.checkLevelUnlocks();
    }
    if (!opts.silentSave) this.saveState();
    return badge;
  }

  // ---------- Artifacts ----------
  collectArtifactForState(stateId) {
    const artifact = ARTIFACTS.find(a => a.stateId === stateId);
    if (artifact && !this.state.collectedArtifacts.includes(artifact.id)) {
      this.state.collectedArtifacts.push(artifact.id);
      this.emit({ type: 'artifact', artifact });
      return artifact;
    }
    return null;
  }

  // ---------- Daily challenge ----------
  hasAnsweredDailyToday() {
    return !!(this.state.daily.history || {})[todayKey()];
  }

  recordDailyAnswer(correct, points = 60) {
    const today = todayKey();
    const d = this.state.daily;
    d.history = d.history || {};
    if (d.history[today]) return { already: true };

    d.history[today] = correct ? 'correct' : 'wrong';
    if (d.lastDate && dayDiff(d.lastDate, today) === 1) {
      d.streak = (d.streak || 0) + 1;
    } else if (d.lastDate !== today) {
      d.streak = 1;
    }
    d.lastDate = today;
    d.bestStreak = Math.max(d.bestStreak || 0, d.streak);

    if (correct) this.addPoints(points + Math.min(d.streak, 7) * 10, 'Daily challenge');
    this.checkBadgeUnlocks();
    this.saveState();
    return { already: false, streak: d.streak };
  }

  // ---------- Timeline ----------
  recordTimelineScore(score, maxScore) {
    const first = !this.state.timelineBest;
    if (score > (this.state.timelineBest || 0)) this.state.timelineBest = score;
    if (first && score > 0) this.addPoints(Math.round((score / maxScore) * 150), 'Timeline challenge');
    this.checkBadgeUnlocks();
    this.saveState();
  }

  // ---------- Avatar ----------
  updateAvatar(newAvatarData) {
    this.state.avatar = { ...this.state.avatar, ...newAvatarData };
    const p = this.profiles.list.find(x => x.id === this.profiles.activeId);
    if (p && this.state.avatar.name) {
      p.name = this.state.avatar.name;
      this.saveProfiles();
    }
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

  // ---------- Preferences ----------
  setPreference(key, value) {
    this.state[key] = value;
    this.saveState();
  }

  // ---------- Navigation ----------
  setCurrentView(view, payload = {}) {
    this.state.currentView = view;
    if (payload.stateId) this.state.activeStateId = payload.stateId;
    if (payload.categoryKey) this.state.activeCategoryKey = payload.categoryKey;
    this.saveState();
  }

  resetProgress() {
    const keep = {
      language: this.state.language,
      soundEnabled: this.state.soundEnabled,
      highContrast: this.state.highContrast,
      reducedMotion: this.state.reducedMotion,
      avatar: this.state.avatar,
      online: this.state.online
    };
    this.state = { ...this.getDefaultState(), ...keep };
    this.saveState();
  }
}

export const gameState = new GameStateManager();

if (typeof window !== 'undefined') {
  window.gameState = gameState;
}
