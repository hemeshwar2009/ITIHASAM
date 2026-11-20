// js/components/impactPage.js
// ITIHASAM: Impact — the "why" of the project for judges, teachers and parents.

import { gameState } from '../state/gameState.js';
import { INDIAN_STATES } from '../data/statesData.js';
import { TIMELINE_EVENTS } from './timelineMode.js';
import { BADGES } from '../data/rewardsData.js';
import { PHOTO_CREDITS } from '../data/photoMap.js';
import { escapeHTML } from '../i18n.js';

export class ImpactPage {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  init() { this.render(); }

  render() {
    if (!this.container) return;
    const facts = [
      ['28 + 8', 'states and Union Territories covered'],
      ['180', 'cultural activities (5 per region)'],
      ['8', 'game types: history quest, Pallanguzhi, Chaupar, Bagh-Chal, folk sports, monument builder, festival builds, festival rhythm'],
      [String(BADGES.length), 'achievement badges'],
      ['3', 'interface languages'],
      [String(TIMELINE_EVENTS.length), 'timeline milestones']
    ];

    this.container.innerHTML = `
      <div class="impact-wrap">
        <div class="explorer-header ancient-panel">
          <div class="explorer-title-area">
            <span class="category-pill">IMPACT</span>
            <h2>Why Itihasam?</h2>
            <p><em>Itihasa</em> (इतिहास) — "thus indeed it happened". Itihasam turns India's heritage into play, so that children learn it the way it was always passed on: through stories, games and celebration.</p>
          </div>
        </div>

        <div class="impact-facts">
          ${facts.map(([n, l]) => `<div class="impact-fact ancient-panel"><span class="impact-num">${n}</span><span class="impact-label">${l}</span></div>`).join('')}
        </div>

        <div class="impact-grid">
          <section class="ancient-panel impact-card">
            <h3>🎯 The problem</h3>
            <ul>
              <li>Traditional games like Pallanguzhi, Chaupar and Bagh-Chal are disappearing from homes and playgrounds.</li>
              <li>Heritage is often taught as lists of dates and names, so students memorise rather than experience it.</li>
              <li>Most heritage resources focus on a few famous states; the North-East and Central India are under-represented.</li>
            </ul>
          </section>

          <section class="ancient-panel impact-card">
            <h3>👩‍🎓 Who it is for</h3>
            <ul>
              <li><strong>Students aged 9–15</strong> — primary users, playing alone or in pairs.</li>
              <li><strong>Teachers</strong> — Class Mode lets a whole class share one computer with separate profiles and a leaderboard.</li>
              <li><strong>Families & diaspora</strong> — Pass & Play board games for two players on one device.</li>
              <li><strong>Low-connectivity schools</strong> — installable and works offline after the first visit.</li>
            </ul>
          </section>

          <section class="ancient-panel impact-card">
            <h3>📚 Learning goals</h3>
            <ol>
              <li>Place major dynasties and monuments on a <strong>timeline</strong> and a <strong>map</strong>.</li>
              <li>Learn and play the <strong>rules of indigenous games</strong> that build arithmetic and strategy.</li>
              <li>Understand <strong>how monuments were built</strong>, layer by layer.</li>
              <li>Connect <strong>festivals</strong> to seasons, harvests and regional identity.</li>
              <li>Recognise <strong>dances, crafts and textiles</strong> of every state.</li>
            </ol>
          </section>

          <section class="ancient-panel impact-card">
            <h3>🏫 Curriculum connections</h3>
            <ul>
              <li><strong>NCERT Social Science (Classes 6–8)</strong> — ancient and medieval Indian history: Harappan cities, the Mauryas and Ashoka, the Guptas, the Cholas, Vijayanagara, the Mughals, the Marathas.</li>
              <li><strong>Art education</strong> — temple architecture, classical and folk dance, handicrafts and textiles.</li>
              <li><strong>Mathematics through play</strong> — counting and sowing in Pallanguzhi, probability with cowrie throws in Chaupar, spatial strategy in Bagh-Chal.</li>
              <li><strong>National Education Policy 2020</strong> — supports its emphasis on Indian knowledge systems, learning in local languages, and experiential, play-based learning.</li>
            </ul>
          </section>

          <section class="ancient-panel impact-card">
            <h3>🧭 How it keeps students coming back</h3>
            <ul>
              <li>Living India map that fills with gold, and a Heritage Passport with a stamp for every state.</li>
              <li>Daily Heritage Challenge with streaks.</li>
              <li>Levels, badges, 36 collectible artifacts and a shareable certificate with a QR code.</li>
            </ul>
          </section>

          <section class="ancient-panel impact-card">
            <h3>♿ Inclusive by design</h3>
            <ul>
              <li>Every game can be played with the keyboard alone; screen-reader labels and live narration.</li>
              <li>High-contrast and reduced-motion modes.</li>
              <li>English, हिन्दी and தமிழ் interface.</li>
            </ul>
          </section>
        </div>

        <div class="ancient-panel impact-card">
          <h3>🚀 Roadmap</h3>
          <ul>
            <li>Teacher dashboards on top of the online class board (Supabase): class progress per state and per category.</li>
            <li>More interface languages (Bengali, Marathi, Telugu, Kannada, Malayalam, Assamese…).</li>
            <li>An AI Heritage Guide grounded in the site's own content.</li>
            <li>Original photography and audio recorded with local artisans and musicians.</li>
          </ul>
          <p class="map-note">This device: ${Object.keys(gameState.state.completedActivities).length} of ${INDIAN_STATES.length * 5} activities completed by the current explorer.</p>
        </div>

        ${this.creditsSection()}
      </div>`;
  }

  // Attribution for every photo (required by CC BY / CC BY-SA licences)
  creditsSection() {
    const SLOT = { history: 'History', games: 'Games', architecture: 'Architecture', festivals: 'Festivals', culture: 'Culture' };
    const byRegion = {};
    PHOTO_CREDITS.forEach(c => { (byRegion[c.region] = byRegion[c.region] || []).push(c); });
    const safeUrl = (u) => (/^https:\/\//.test(u || '') ? escapeHTML(u) : '#');
    const rows = INDIAN_STATES.filter(s => byRegion[s.id]).map(s => `
      <div class="credit-region">
        <h4>${escapeHTML(s.name)}</h4>
        <ul>${byRegion[s.id].map(c => `
          <li><strong>${escapeHTML(SLOT[c.slot] || 'Slideshow ' + c.slot.replace('slide', ''))}:</strong>
            <a href="${safeUrl(c.page)}" target="_blank" rel="noopener">${escapeHTML(c.file)}</a>
            by ${escapeHTML(c.artist)} ·
            ${c.licenseUrl ? `<a href="${safeUrl(c.licenseUrl)}" target="_blank" rel="noopener">${escapeHTML(c.license)}</a>` : escapeHTML(c.license)}</li>`).join('')}
        </ul>
      </div>`).join('');
    return `
      <details class="ancient-panel impact-card photo-credits">
        <summary><h3>📷 Photo credits (${PHOTO_CREDITS.length})</h3></summary>
        <p class="map-note">Photos are from Wikimedia Commons, used under the open licences shown (Creative Commons or public domain). Click a file name to see the original.</p>
        <div class="credit-grid">${rows}</div>
      </details>`;
  }

  destroy() {}
}
