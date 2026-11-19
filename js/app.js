// js/app.js
// DISCOVER INDIA: Central Application Orchestrator & Router

import { soundSynth } from './audio/soundSynth.js';
import { gameState } from './state/gameState.js';
import { getStateById, INDIAN_STATES } from './data/statesData.js';

// Components
import { LandingStoryboard } from './components/landingStoryboard.js';
import { StateExplorer } from './components/stateExplorer.js';
import { AvatarCustomizer } from './components/avatarCustomizer.js';
import { RewardsModal } from './components/rewardsModal.js';
import { RightToolbar } from './components/rightToolbar.js';
import { HeritageGuideChatbot } from './components/heritageGuide.js';
import { LivingTraditionsSlideshow } from './components/livingTraditions.js';

// Games
import { PallanguzhiGame } from './games/traditionalGames.js';
import { HistoryAdventureGame } from './games/historyAdventure.js';
import { ArchitectureBuilderGame } from './games/architectureBuilder.js';
import { FestivalSimulationGame } from './games/festivalSimulation.js';

class AppRouter {
  constructor() {
    this.mainViewContainer = document.getElementById('main-view-container');
    this.activeComponent = null;
    this.currentView = 'landing';
  }

  init() {
    // 1. Mount Persistent Sidebars & Widgets
    this.toolbar = new RightToolbar('toolbar-mount');
    this.toolbar.init();

    this.chatbot = new HeritageGuideChatbot('chatbot-mount');
    this.chatbot.init();

    // 2. Initial View Routing
    const initialView = gameState.state.currentView || 'landing';
    this.navigate(initialView, {
      stateId: gameState.state.activeStateId,
      categoryKey: gameState.state.activeCategoryKey
    });

    // Audio init on first user touch / click
    const initAudio = () => {
      soundSynth.ensureContext();
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
  }

  destroyActiveComponent() {
    if (this.activeComponent && typeof this.activeComponent.destroy === 'function') {
      this.activeComponent.destroy();
    }
    this.activeComponent = null;
  }

  navigate(viewName, params = {}) {
    this.destroyActiveComponent();
    this.currentView = viewName;
    gameState.setCurrentView(viewName, params);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

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

      default:
        this.renderLanding(params);
        break;
    }

    // Refresh toolbar active state
    if (this.toolbar) this.toolbar.render();
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
    const state = getStateById(stateId) || INDIAN_STATES[0];
    gameState.setCurrentView('game-view', { stateId, categoryKey });

    if (categoryKey === 'culture') {
      this.navigate('slideshow', { stateId, categoryKey });
      return;
    }

    this.navigate('game-view', { stateId, categoryKey });
  }

  renderGameView(params) {
    const stateId = params.stateId || gameState.state.activeStateId || 'tamil-nadu';
    const categoryKey = params.categoryKey || gameState.state.activeCategoryKey || 'games';
    const state = getStateById(stateId);

    this.mainViewContainer.innerHTML = `
      <div class="game-view-outer-wrap">
        <div class="game-view-breadcrumb ancient-panel">
          <button class="btn-ancient btn-secondary btn-sm" id="btn-back-to-state">
            ← Back to ${state ? state.name : 'State'}
          </button>
          <div class="breadcrumb-info">
            <span class="state-crumb">📍 ${state ? state.name : ''}</span> / 
            <span class="cat-crumb font-bold text-terracotta">${categoryKey.toUpperCase()}</span>
          </div>
        </div>

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

    // Mount specific game instance
    if (categoryKey === 'history') {
      this.activeComponent = new HistoryAdventureGame('game-mount-target', {
        stateId,
        categoryKey,
        title: `${state.name} Historical Adventure: ${state.history.title}`,
        points: state.history.points
      });
    } else if (categoryKey === 'games') {
      this.activeComponent = new PallanguzhiGame('game-mount-target', {
        stateId,
        categoryKey,
        title: `${state.name} Traditional Game: ${state.games.title}`,
        points: state.games.points
      });
    } else if (categoryKey === 'architecture') {
      this.activeComponent = new ArchitectureBuilderGame('game-mount-target', {
        stateId,
        categoryKey,
        title: `Reconstructing ${state.architecture.title}`,
        points: state.architecture.points
      });
    } else if (categoryKey === 'festivals') {
      this.activeComponent = new FestivalSimulationGame('game-mount-target', {
        stateId,
        categoryKey,
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
    const state = getStateById(stateId);

    this.mainViewContainer.innerHTML = `
      <div class="game-view-outer-wrap">
        <div class="game-view-breadcrumb ancient-panel">
          <button class="btn-ancient btn-secondary btn-sm" id="btn-back-to-state-slide">
            ← Back to ${state ? state.name : 'State'}
          </button>
          <div class="breadcrumb-info">
            <span class="state-crumb">📍 ${state ? state.name : ''}</span> / 
            <span class="cat-crumb font-bold text-terracotta">LIVING TRADITIONS</span>
          </div>
        </div>

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
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  const app = new AppRouter();
  window.appRouter = app;
  app.init();
});
