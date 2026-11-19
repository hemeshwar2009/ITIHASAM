// sw.js — ITIHASAM offline support
// • App files are pre-cached on install, then served network-first so updates
//   show up immediately when online and the cached copy is used offline.
// • Photos, fonts and CDN scripts are cached the first time they load
//   (cache-first), so a visited page keeps working without internet.

const VERSION = 'itihasam-v3';
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/img/heritage-placeholder.svg',
  'assets/img/icon.svg',
  'js/app.js',
  'js/i18n.js',
  'js/config.js',
  'js/services/onlineLeaderboard.js',
  'js/audio/soundSynth.js',
  'js/state/gameState.js',
  'js/data/avatarData.js',
  'js/data/chatbotData.js',
  'js/data/gameRouting.js',
  'js/data/rewardsData.js',
  'js/data/statesData.js',
  'js/components/avatarCustomizer.js',
  'js/components/classLeaderboard.js',
  'js/components/dailyChallenge.js',
  'js/components/heritageGuide.js',
  'js/components/heritagePassport.js',
  'js/components/impactPage.js',
  'js/components/indiaMap.js',
  'js/components/landingStoryboard.js',
  'js/components/livingTraditions.js',
  'js/components/rewardsModal.js',
  'js/components/rightToolbar.js',
  'js/components/stateExplorer.js',
  'js/components/timelineMode.js',
  'js/components/toastNotifier.js',
  'js/games/architectureBuilder.js',
  'js/games/baghChalGame.js',
  'js/games/chauparGame.js',
  'js/games/festivalSimulation.js',
  'js/games/folkSportsGame.js',
  'js/games/gameEngine.js',
  'js/games/historyAdventure.js',
  'js/games/traditionalGames.js',
  'styles/ancient-white.css',
  'styles/avatar.css',
  'styles/chatbot.css',
  'styles/features.css',
  'styles/games.css',
  'styles/landing.css',
  'styles/rewards.css',
  'styles/slideshow.css',
  'styles/states.css',
  'styles/toolbar.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Never cache live leaderboard data
  if (url.host.endsWith('.supabase.co')) return;

  if (url.origin === self.location.origin) {
    // Network-first for the app's own files
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(SHELL_CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then(hit => hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined)))
    );
    return;
  }

  // Cache-first for images, fonts and CDN libraries
  const cacheable = /images\.unsplash\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com/.test(url.host);
  if (!cacheable) return;
  event.respondWith(
    caches.open(RUNTIME_CACHE).then(cache =>
      cache.match(req).then(hit => {
        if (hit) return hit;
        return fetch(req).then(res => {
          // Opaque (no-cors) image responses are cacheable too
          if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
          return res;
        }).catch(() => (req.destination === 'image' ? caches.match('assets/img/heritage-placeholder.svg') : undefined));
      })
    )
  );
});
