// js/app.js
// ITIHASAM: Central Application Orchestrator & Router

import { soundSynth } from './audio/soundSynth.js';
import { gameState } from './state/gameState.js';
import { getStateById, INDIAN_STATES } from './data/statesData.js';
import { getGameRoute, getFestivalTheme, SPORT_THEMES } from './data/gameRouting.js';
import { escapeHTML, setLanguage, getLanguage } from './i18n.js';
import { startAutoSync } from './services/onlineLeaderboard.js';

// Components
import { LandingStoryboard } from './components/landingStoryboard.js';
import { StateExplorer } from './components/stateExplorer.js';
import { AvatarCustomizer } from './components/avatarCustomizer.js';
import { RewardsModal } from './components/rewardsModal.js';
import { RightToolbar } from './components/rightToolbar.js';
import { HeritageGuideChatbot } from './components/heritageGuide.js';
import { LivingTraditionsSlideshow } from './components/livingTraditions.js';
import { IndiaMap } from './components/indiaMap.js';
import { HeritagePassport } from './components/heritagePassport.js';
import { DailyChallenge } from './components/dailyChallenge.js';
import { TimelineMode } from './components/timelineMode.js';
import { ClassLeaderboard } from './components/classLeaderboard.js';
import { ImpactPage } from './components/impactPage.js';
import { ToastNotifier } from './components/toastNotifier.js';
import { TitleScreen } from './components/titleScreen.js';

// Games
import { PallanguzhiGame } from './games/traditionalGames.js';
import { ChauparGame } from './games/chauparGame.js';
import { BaghChalGame } from './games/baghChalGame.js';
import { FolkSportsGame } from './games/folkSportsGame.js';
import { HistoryAdventureGame } from './games/historyAdventure.js';
import { ArchitectureBuilderGame } from './games/architectureBuilder.js';
import { FestivalSimulationGame } from './games/festivalSimulation.js';

export const PLACEHOLDER_IMG = 'assets/img/heritage-placeholder.svg';

// Simple full-page views: route name -> component class
const SIMPLE_VIEWS = {
  'india-map': IndiaMap,
  'passport': HeritagePassport,
  'daily': DailyChallenge,
  'timeline': TimelineMode,
  'leaderboard': ClassLeaderboard,
  'impact': ImpactPage,
  'start': TitleScreen
};

class AppRouter {
  constructor() {
    this.mainViewContainer = document.getElementById('main-view-container');
    this.activeComponent = null;
    this.currentView = 'landing';
  }

  init() {
    // Language: the game profile remembers it too
    if (gameState.state.language && gameState.state.language !== getLanguage()) {
      setLanguage(gameState.state.language);
    }
    this.applyPreferences();
    gameState.subscribe(() => this.applyPreferences());

    // Any <img> that fails to load falls back to a local ornamental placeholder
    document.addEventListener('error', (e) => {
      const el = e.target;
      if (el && el.tagName === 'IMG' && !el.dataset.fallback) {
        el.dataset.fallback = '1';
        el.src = PLACEHOLDER_IMG;
      }
    }, true);

    // 1. Mount persistent sidebars & widgets
    this.toolbar = new RightToolbar('toolbar-mount');
    this.toolbar.init();

    this.chatbot = new HeritageGuideChatbot('chatbot-mount');
    this.chatbot.init();

    this.toasts = new ToastNotifier();

    // 2. Open on the game-style title screen (Continue / New Game / Map...).
    //    A #hash deep-link is honoured.
    const fromHash = this.parseHash();
    if (fromHash) this.navigate(fromHash.view, fromHash.params, { replace: true });
    else this.navigate('start', {}, { replace: true });

    window.addEventListener('popstate', () => {
      const h = this.parseHash();
      this.navigate(h ? h.view : 'landing', h ? h.params : {}, { fromHistory: true });
    });

    // Audio init on first user touch / click
    const initAudio = () => {
      soundSynth.ensureContext();
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });

    this.registerServiceWorker();
    startAutoSync();
  }

  applyPreferences() {
    const s = gameState.state;
    soundSynth.toggleSound(s.soundEnabled !== false);
    soundSynth.toggleMusic(!!s.musicEnabled);
    document.body.classList.toggle('high-contrast', !!s.highContrast);
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.toggle('reduced-motion', !!s.reducedMotion || prefersReduced);
  }

  parseHash() {
    const h = (location.hash || '').replace(/^#\/?/, '');
    if (!h) return null;
    const [view, a, b] = h.split('/').map(decodeURIComponent);
    const known = ['landing', 'storyboard', 'states-directory', 'state-detail', 'game-view', 'slideshow',
      'avatar-customizer', 'rewards', 'journey', 'certificate', ...Object.keys(SIMPLE_VIEWS)];
    if (!known.includes(view)) return null;
    const params = {};
    if (a && getStateById(a)) params.stateId = a;
    if (b) params.categoryKey = b;
    return { view, params };
  }

  writeHash(view, params, replace) {
    let h = '#/' + view;
    if (params.stateId && ['states-directory', 'state-detail', 'game-view', 'slideshow'].includes(view)) {
      h += '/' + encodeURIComponent(params.stateId);
      if (params.categoryKey && view === 'game-view') h += '/' + encodeURIComponent(params.categoryKey);
    }
    if (location.hash === h) return;
    try {
      if (replace) history.replaceState(null, '', h);
      else history.pushState(null, '', h);
    } catch (e) { /* file:// or sandboxed */ }
  }

  destroyActiveComponent() {
    if (this.activeComponent && typeof this.activeComponent.destroy === 'function') {
      this.activeComponent.destroy();
    }
    this.activeComponent = null;
  }

  navigate(viewName, params = {}, opts = {}) {
    this.destroyActiveComponent();
    this.currentView = viewName;
    gameState.setCurrentView(viewName, params);
    if (!opts.fromHistory) this.writeHash(viewName, params, opts.replace);

    const reduced = document.body.classList.contains('reduced-motion');
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

    if (SIMPLE_VIEWS[viewName]) {
      this.renderSimple(viewName);
    } else {
      switch (viewName) {
        case 'landing':
        case 'storyboard':
          this.renderLanding(params);
          break;
        case 'states-directory':
          this.renderStatesDirectory(params);
          break;
        case 'state-detail':
          this.renderStateDetail(params);
          break;
        case 'game-view':
          this.renderGameView(params);
          break;
        case 'slideshow':
          this.renderSlideshow(params);
          break;
        case 'avatar-customizer':
          this.renderAvatarCustomizer();
          break;
        case 'rewards':
          this.renderRewards({ tab: 'levels' });
          break;
        case 'journey':
          this.renderRewards({ tab: 'states-progress' });
          break;
        case 'certificate':
          this.renderRewards({ tab: 'certificate' });
          break;
        default:
          this.renderLanding(params);
          break;
      }
    }

    if (this.toolbar) this.toolbar.render();

    // Move focus to the new view's main heading for keyboard & screen-reader users
    if (!opts.replace) {
      requestAnimationFrame(() => {
        const heading = this.mainViewContainer.querySelector('h1, h2');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
        }
      });
    }
  }

  renderSimple(viewName) {
    // The title screen is full-bleed; other pages use the padded content wrapper
    const wrapClass = viewName === 'start' ? 'title-outer-wrap' : 'page-outer-wrap';
    this.mainViewContainer.innerHTML = `<div class="${wrapClass}" id="simple-view-mount"></div>`;
    const Cls = SIMPLE_VIEWS[viewName];
    this.activeComponent = new Cls('simple-view-mount');
    this.activeComponent.init();
  }

  renderLanding(params) {
    this.mainViewContainer.innerHTML = `<div id="landing-mount"></div>`;
    this.activeComponent = new LandingStoryboard('landing-mount', params);
    this.activeComponent.init();
  }

  renderStatesDirectory(params) {
    this.mainViewContainer.innerHTML = `<div id="states-mount"></div>`;
    this.activeComponent = new StateExplorer('states-mount', params);
    this.activeComponent.init();
  }

  renderStateDetail(params) {
    const stateId = params.stateId || gameState.state.activeStateId || 'tamil-nadu';
    this.renderStatesDirectory({ stateId });
  }

  launchCategoryGame(stateId, categoryKey) {
    if (categoryKey === 'culture') {
      this.navigate('slideshow', { stateId, categoryKey });
      return;
    }
    this.navigate('game-view', { stateId, categoryKey });
  }

  gameLabel(stateId, categoryKey) {
    if (categoryKey === 'games') {
      const r = getGameRoute(stateId);
      if (r.game === 'sports') return 'FOLK SPORTS';
      return (r.variant || r.game).toUpperCase();
    }
    if (categoryKey === 'festivals') return getFestivalTheme(stateId).kind === 'rhythm' ? 'FESTIVAL RHYTHM' : 'FESTIVAL';
    return categoryKey.toUpperCase();
  }

  renderGameView(params) {
    const stateId = params.stateId || gameState.state.activeStateId || 'tamil-nadu';
    const categoryKey = params.categoryKey || gameState.state.activeCategoryKey || 'games';
    const state = getStateById(stateId) || INDIAN_STATES[0];

    this.mainViewContainer.innerHTML = `
      <div class="game-view-outer-wrap">
        <nav class="game-view-breadcrumb ancient-panel" aria-label="Breadcrumb">
          <button class="btn-ancient btn-secondary btn-sm" id="btn-back-to-state">
            ← Back to ${escapeHTML(state.name)}
          </button>
          <div class="breadcrumb-info">
            <span class="state-crumb">📍 ${escapeHTML(state.name)}</span> /
            <span class="cat-crumb font-bold text-terracotta">${escapeHTML(this.gameLabel(stateId, categoryKey))}</span>
          </div>
        </nav>

        <div id="game-mount-target"></div>
      </div>
    `;

    const btnBack = this.mainViewContainer.querySelector('#btn-back-to-state');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        soundSynth.playClick();
        this.navigate('states-directory', { stateId });
      });
    }

    const common = { stateId, categoryKey, reducedMotion: document.body.classList.contains('reduced-motion') };

    if (categoryKey === 'history') {
      this.activeComponent = new HistoryAdventureGame('game-mount-target', {
        ...common,
        title: `${state.name} Historical Adventure: ${state.history.title}`,
        points: state.history.points
      });
    } else if (categoryKey === 'games') {
      const route = getGameRoute(stateId);
      const opts = { ...common, points: state.games.points, variant: route.variant, sport: route.sport };
      if (route.game === 'chaupar') {
        this.activeComponent = new ChauparGame('game-mount-target', { ...opts, title: `${state.name}: ${route.variant} — ${state.games.title}` });
      } else if (route.game === 'baghchal') {
        this.activeComponent = new BaghChalGame('game-mount-target', { ...opts, title: `${state.name}: Bagh-Chal — ${state.games.title}` });
      } else if (route.game === 'sports') {
        this.activeComponent = new FolkSportsGame('game-mount-target', { ...opts, title: `${state.name}: ${SPORT_THEMES[route.sport].name}` });
      } else {
        this.activeComponent = new PallanguzhiGame('game-mount-target', { ...opts, title: `${state.name} Traditional Game: ${state.games.title}` });
      }
    } else if (categoryKey === 'architecture') {
      this.activeComponent = new ArchitectureBuilderGame('game-mount-target', {
        ...common,
        title: `Reconstructing ${state.architecture.title}`,
        points: state.architecture.points
      });
    } else if (categoryKey === 'festivals') {
      this.activeComponent = new FestivalSimulationGame('game-mount-target', {
        ...common,
        title: `Celebrating ${state.festivals.title}`,
        points: state.festivals.points
      });
    } else {
      this.navigate('slideshow', { stateId });
      return;
    }

    this.activeComponent.init();
  }

  renderSlideshow(params) {
    const stateId = params.stateId || gameState.state.activeStateId || 'tamil-nadu';
    const state = getStateById(stateId) || INDIAN_STATES[0];

    this.mainViewContainer.innerHTML = `
      <div class="game-view-outer-wrap">
        <nav class="game-view-breadcrumb ancient-panel" aria-label="Breadcrumb">
          <button class="btn-ancient btn-secondary btn-sm" id="btn-back-to-state-slide">
            ← Back to ${escapeHTML(state.name)}
          </button>
          <div class="breadcrumb-info">
            <span class="state-crumb">📍 ${escapeHTML(state.name)}</span> /
            <span class="cat-crumb font-bold text-terracotta">LIVING TRADITIONS</span>
          </div>
        </nav>

        <div id="slideshow-mount-target"></div>
      </div>
    `;

    const btnBack = this.mainViewContainer.querySelector('#btn-back-to-state-slide');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        soundSynth.playClick();
        this.navigate('states-directory', { stateId });
      });
    }

    this.activeComponent = new LivingTraditionsSlideshow('slideshow-mount-target', { stateId });
    this.activeComponent.init();
  }

  renderAvatarCustomizer() {
    this.mainViewContainer.innerHTML = `<div id="avatar-mount-target"></div>`;
    this.activeComponent = new AvatarCustomizer('avatar-mount-target');
    this.activeComponent.init();
  }

  renderRewards(options = {}) {
    this.mainViewContainer.innerHTML = `<div id="rewards-mount-target"></div>`;
    this.activeComponent = new RewardsModal('rewards-mount-target', options);
    this.activeComponent.init();
  }

  // ---------- Offline / installable (PWA) ----------
  registerServiceWorker() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      window.__itihasamInstallPrompt = e;
      if (this.toolbar) this.toolbar.render();
    });
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').catch(err => console.warn('Service worker not registered:', err));
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  const app = new AppRouter();
  window.appRouter = app;
  app.init();
});
