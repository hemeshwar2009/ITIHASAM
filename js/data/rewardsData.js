// js/data/rewardsData.js
// ITIHASAM: Reward and Progression Systems

import { INDIAN_STATES } from './statesData.js';

export const LEVELS = [
  {
    level: 1,
    id: 'history',
    title: 'Level 1 – Discover the History',
    subtitle: 'History & Civilization',
    categoryKey: 'history',
    icon: '📜',
    requiredPoints: 0,
    description: 'Explore ancient kingdoms, decipher royal stone edicts, and uncover historical artifacts across the 28 states.',
    rewardBadge: 'Indus & Chola Pioneer',
    unlockMessage: 'Level 2: Traditional Games is unlocked!'
  },
  {
    level: 2,
    id: 'games',
    title: 'Level 2 – Rediscover Traditional Games',
    subtitle: 'Forgotten Traditional Games',
    categoryKey: 'games',
    icon: '🎲',
    requiredPoints: 150,
    description: 'Master ancient board games like Pallanguzhi, Aadu Puli Aattam, and Chaupar in RPG pixel-art arenas.',
    rewardBadge: 'Master of Pallanguzhi',
    unlockMessage: 'Level 3: Architectural Wonders is unlocked!'
  },
  {
    level: 3,
    id: 'architecture',
    title: 'Level 3 – Reconstruct Architectural Wonders',
    subtitle: 'Architectural Wonders',
    categoryKey: 'architecture',
    icon: '🏛️',
    requiredPoints: 350,
    description: 'Rebuild timeless monuments piece by piece in the pixelated architectural construction puzzle.',
    rewardBadge: 'Vimana Master Architect',
    unlockMessage: 'Level 4: Festivals & Celebrations is unlocked!'
  },
  {
    level: 4,
    id: 'festivals',
    title: 'Level 4 – Celebrate Indian Festivals',
    subtitle: 'Festivals & Celebrations',
    categoryKey: 'festivals',
    icon: '🪔',
    requiredPoints: 600,
    description: 'Experience festival simulations: design sacred Kerala Pookalams and celebrate joyous harvest rituals.',
    rewardBadge: 'Festival Maestro',
    unlockMessage: 'Level 5: Living Traditions is unlocked!'
  },
  {
    level: 5,
    id: 'culture',
    title: 'Level 5 – Explore Living Traditions',
    subtitle: 'Regional Cultures',
    categoryKey: 'culture',
    icon: '🎭',
    requiredPoints: 850,
    description: 'Immerse yourself in classical dances, rare folk instruments, and centuries-old handloom arts.',
    rewardBadge: 'Living Heritage Custodian',
    unlockMessage: 'You have attained the rank of Supreme Heritage Custodian!'
  }
];

export const BADGES = [
  {
    id: 'first-discovery',
    name: 'First Step into the Past',
    category: 'Exploration',
    icon: '🧭',
    description: 'Completed your first cultural activity in any state.',
    cdpReward: 50
  },
  {
    id: 'history-master',
    name: 'Keeper of Dynasties',
    category: 'History',
    icon: '📜',
    description: 'Completed 5 historical adventure missions and deciphered their inscriptions.',
    cdpReward: 150
  },
  {
    id: 'pallanguzhi-champion',
    name: 'Master of Cowrie Shells',
    category: 'Games',
    icon: '🐚',
    description: 'Won an interactive game of Pallanguzhi on the wooden pit board.',
    cdpReward: 200
  },
  {
    id: 'aadu-puli-strategist',
    name: 'Tiger & Goat Tactician',
    category: 'Games',
    icon: '🐅',
    description: 'Won a game of Bagh-Chal / Aadu Puli Aattam (tigers vs goats).',
    cdpReward: 200
  },
  {
    id: 'chaupar-champion',
    name: 'Lord of the Chaupar Cross',
    category: 'Games',
    icon: '🎲',
    description: 'Brought all your pieces home first in a race game of Chaupar / Pachisi.',
    cdpReward: 200
  },
  {
    id: 'folk-sports-ace',
    name: 'Folk Sports Ace',
    category: 'Games',
    icon: '🏹',
    description: 'Won 3 folk sports challenges (archery, kabaddi, gilli-danda and more).',
    cdpReward: 200
  },
  {
    id: 'vimana-builder',
    name: 'Master Temple Architect',
    category: 'Architecture',
    icon: '🏛️',
    description: 'Reconstructed a pixel-art architectural marvel piece by piece.',
    cdpReward: 250
  },
  {
    id: 'pookalam-designer',
    name: 'Mandala Bloom Maestro',
    category: 'Festivals',
    icon: '🌸',
    description: 'Arranged a 5-ring traditional Onam Pookalam floral carpet.',
    cdpReward: 180
  },
  {
    id: 'rhythm-keeper',
    name: 'Keeper of the Festival Beat',
    category: 'Festivals',
    icon: '🥁',
    description: 'Kept the rhythm in a festival drum challenge (Bihu, Wangala, Garba and more).',
    cdpReward: 180
  },
  {
    id: 'pongal-celebrant',
    name: 'Pongalo Pongal!',
    category: 'Festivals',
    icon: '🍯',
    description: 'Boiled the ceremonial earthen harvest pot to overflowing joy.',
    cdpReward: 180
  },
  {
    id: 'tradition-explorer',
    name: 'Living Traditions Scholar',
    category: 'Culture',
    icon: '🎭',
    description: 'Watched the Living Traditions slideshows of 5 different states to the end.',
    cdpReward: 150
  },
  {
    id: 'streak-keeper',
    name: 'Daily Sadhaka',
    category: 'Exploration',
    icon: '🔥',
    description: 'Answered the Daily Heritage Challenge 3 days in a row.',
    cdpReward: 120
  },
  {
    id: 'timeline-sage',
    name: 'Sage of the Ages',
    category: 'History',
    icon: '⏳',
    description: 'Placed at least 8 eras in the correct order in Timeline Mode.',
    cdpReward: 150
  },
  {
    id: 'passport-complete',
    name: 'Full Heritage Passport',
    category: 'Mastery',
    icon: '🛂',
    description: 'Collected the passport stamp of all 28 states by finishing every category.',
    cdpReward: 1000
  },
  {
    id: 'all-regions-voyager',
    name: 'Voyager of the Six Zones',
    category: 'Mastery',
    icon: '🇮🇳',
    description: 'Completed at least one activity in each of the 6 regions of India.',
    cdpReward: 500
  }
];

const FEATURED_ARTIFACTS = [
  {
    id: 'chola-nataraja',
    name: 'Chola Lost-Wax Bronze Nataraja',
    state: 'Tamil Nadu',
    era: '11th Century CE',
    icon: '🔱',
    lore: 'The cosmic dance of Shiva (Ananda Tandava) captured in sacred panchaloha bronze using the ancient cire-perdue lost-wax method.',
    material: 'Panchaloha Bronze',
    location: 'Thanjavur Royal Museum'
  },
  {
    id: 'aranmula-kannadi',
    name: 'Aranmula Metal Alloy Mirror',
    state: 'Kerala',
    era: '18th Century CE',
    icon: '🪞',
    lore: 'A front-reflecting metal alloy mirror cast by master metalsmiths of Aranmula, eliminating secondary glass reflections.',
    material: 'Copper-Tin Sacred Alloy',
    location: 'Aranmula Heritage Centre'
  },
  {
    id: 'hampi-stone-chariot',
    name: 'Miniature Carved Garuda Chariot',
    state: 'Karnataka',
    era: '16th Century CE',
    icon: '🏛️',
    lore: 'A model of the monolithic stone chariot shrine dedicated to Garuda in the courtyard of Vittala Temple.',
    material: 'Granite with Mortise Joints',
    location: 'Vittala Temple, Hampi'
  },
  {
    id: 'ashoka-lion-capital',
    name: 'Sarnath Polished Lion Capital',
    state: 'Uttar Pradesh',
    era: '250 BCE',
    icon: '🦁',
    lore: 'Four roaring Asiatic lions facing the cardinal directions, adopted as the official National Emblem of modern India.',
    material: 'Chunar Polished Sandstone',
    location: 'Sarnath Archaeological Museum'
  },
  {
    id: 'konark-sundial-wheel',
    name: 'Carved Konark Solar Wheel',
    state: 'Odisha',
    era: '1250 CE',
    icon: '☸️',
    lore: 'A 9.5-foot stone chariot wheel carved with celestial musicians and erotic motifs that functions as a precise solar clock.',
    material: 'Khondalite Stone',
    location: 'Konark Sun Temple'
  },
  {
    id: 'bankura-terracotta-horse',
    name: 'Bankura Terracotta Sacred Horse',
    state: 'West Bengal',
    era: '18th Century CE',
    icon: '🐎',
    lore: 'A tall hollow baked-clay horse with pointed ears and symmetrical body, revered as a folk votive offering to village spirits.',
    material: 'Burnt Alluvial Clay',
    location: 'Bankura Crafts Guild'
  },
  {
    id: 'bastar-dokra-bull',
    name: 'Bastar Lost-Wax Dokra Nandi',
    state: 'Chhattisgarh',
    era: 'Traditional Folk Craft',
    icon: '🐂',
    lore: 'A non-ferrous metal alloy bull crafted using natural beeswax threads and clay moulds by the Ghadwa tribal metalsmiths.',
    material: 'Bell-Metal Alloy',
    location: 'Bastar Tribal Museum'
  },
  {
    id: 'assam-jaapi',
    name: 'Traditional Woven Jaapi Hat',
    state: 'Assam',
    era: 'Traditional Folk Symbol',
    icon: '👒',
    lore: 'A conical headgear woven from bamboo, cane, and large Tokow palm leaves, adorned with red and white felt ornaments as a badge of honor.',
    material: 'Bamboo, Cane & Tokow Leaves',
    location: 'Majuli Island Guild'
  }
];

// One collectible relic per state: detailed featured entries first, then each
// state's own history artifact from statesData.
const slug = (name) => name.toLowerCase().replace(/s+/g, '-');

export const ARTIFACTS = INDIAN_STATES.map(st => {
  const featured = FEATURED_ARTIFACTS.find(a => slug(a.state) === st.id);
  if (featured) return { ...featured, stateId: st.id };
  const a = st.history.artifact || {};
  return {
    id: a.id || `${st.id}-relic`,
    name: a.name || `${st.name} Heritage Relic`,
    state: st.name,
    stateId: st.id,
    era: a.period || st.history.era,
    icon: a.icon || '🏺',
    lore: a.lore || st.history.highlights,
    material: a.material || 'Traditional materials',
    location: a.location || st.capital
  };
});

if (typeof window !== 'undefined') {
  window.LEVELS = LEVELS;
  window.BADGES = BADGES;
  window.ARTIFACTS = ARTIFACTS;
}
