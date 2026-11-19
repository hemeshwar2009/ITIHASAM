// js/data/avatarData.js
// ITIHASAM: Explorer Avatar Customization Data

export const INITIAL_ARCHETYPES = [
  {
    id: 'historian',
    name: 'The Royal Historian',
    title: 'Scholar of Dynasties & Inscriptions',
    description: 'Dressed in dignified classical attire, dedicated to deciphering ancient stone edicts and royal copper plates.',
    avatar: {
      name: 'Aryavart',
      gender: 'scholar-male',
      skinTone: '#E0BC95',
      clothing: 'kurta-dhoti',
      clothingColor: '#F5F0E6',
      accentColor: '#B69A62',
      headwear: 'pheta-turban',
      hairColor: '#2B1E16',
      accessory: 'palm-scroll'
    }
  },
  {
    id: 'archaeologist',
    name: 'The Temple Archaeologist',
    title: 'Explorer of Monolithic Marvels',
    description: 'Equipped with field tools, dedicated to uncovering subterranean stepwells, rock-cut caves, and forgotten ruins.',
    avatar: {
      name: 'Meera',
      gender: 'explorer-female',
      skinTone: '#CFA379',
      clothing: 'nehru-jacket',
      clothingColor: '#FAF7F0',
      accentColor: '#B76E4B',
      headwear: 'explorer-bun',
      hairColor: '#1F140E',
      accessory: 'brass-compass'
    }
  },
  {
    id: 'storyteller',
    name: 'The Folklore Storyteller',
    title: 'Keeper of Living Traditions & Epics',
    description: 'Draped in handwoven regional textiles, preserving oral ballads, classical mudras, and folk festivals.',
    avatar: {
      name: 'Ananya',
      gender: 'storyteller-female',
      skinTone: '#E8C5A0',
      clothing: 'silk-saree',
      clothingColor: '#B76E4B',
      accentColor: '#B69A62',
      headwear: 'floral-juda',
      hairColor: '#2C1D11',
      accessory: 'peacock-feather'
    }
  },
  {
    id: 'champion',
    name: 'The Boardgame Champion',
    title: 'Master of Pallanguzhi & Chaupar',
    description: 'Sharp-witted tactician of ancient Indian games of skill, calculation, and tactical strategy.',
    avatar: {
      name: 'Kabir',
      gender: 'champion-male',
      skinTone: '#B5875B',
      clothing: 'royal-angrakha',
      clothingColor: '#493A2D',
      accentColor: '#B69A62',
      headwear: 'himachali-cap',
      hairColor: '#1A110B',
      accessory: 'cowrie-charm'
    }
  }
];

export const CUSTOMIZATION_OPTIONS = {
  skinTones: [
    { id: 'tone-1', name: 'Fair Sandstone', value: '#F2D3B3' },
    { id: 'tone-2', name: 'Warm Honey', value: '#E0BC95' },
    { id: 'tone-3', name: 'Golden Bronze', value: '#CFA379' },
    { id: 'tone-4', name: 'Deep Amber', value: '#A87A50' }
  ],
  clothing: [
    { id: 'kurta-dhoti', name: 'Kurta & Dhoti (Ivory Gold)', icon: '🥋', baseColor: '#FAF7F0', trim: '#B69A62' },
    { id: 'royal-sherwani', name: 'Royal Sherwani (Terracotta)', icon: '🧥', baseColor: '#B76E4B', trim: '#B69A62' },
    { id: 'silk-saree', name: 'Heritage Kanchipuram Saree', icon: '🥻', baseColor: '#9C3D32', trim: '#D4AF37' },
    { id: 'nehru-jacket', name: 'Nehru Waistcoat & Kurta', icon: '👔', baseColor: '#493A2D', trim: '#B69A62' },
    { id: 'royal-angrakha', name: 'Rajasthani Royal Angrakha', icon: '👘', baseColor: '#D97724', trim: '#F5F0E6' },
    { id: 'tribal-handloom', name: 'Naga Geometric Handloom Vest', icon: '🦺', baseColor: '#2B1E16', trim: '#B76E4B' }
  ],
  headwear: [
    { id: 'pheta-turban', name: 'Royal Pheta Turban', icon: '👳', color: '#B69A62' },
    { id: 'mysore-peta', name: 'Mysore Royal Peta', icon: '👑', color: '#B76E4B' },
    { id: 'himachali-cap', name: 'Himachali Kullu Cap', icon: '🧢', color: '#493A2D' },
    { id: 'floral-juda', name: 'Classical Floral Juda (Jasmine)', icon: '🌸', color: '#FAF7F0' },
    { id: 'explorer-bun', name: 'Practical Explorer Topknot', icon: '👱', color: '#2B1E16' },
    { id: 'none', name: 'Natural Traditional Hair', icon: '👤', color: '#1A110B' }
  ],
  accessories: [
    { id: 'palm-scroll', name: 'Ancient Palm-Leaf Scroll', icon: '📜', desc: 'Preserves ancient Sanskrit and Tamil wisdom' },
    { id: 'brass-compass', name: 'Brass Astrolabe & Compass', icon: '🧭', desc: 'Historic navigation instrument for temple exploration' },
    { id: 'peacock-feather', name: 'Royal Peacock Feather Pin', icon: '🪶', desc: 'Symbol of classical storytelling and creativity' },
    { id: 'cowrie-charm', name: 'Sacred Cowrie Shell Charm', icon: '🐚', desc: 'Brings victory in traditional board games' },
    { id: 'terracotta-amulet', name: 'Harappan Terracotta Amulet', icon: '🧿', desc: 'Ancient seal emblem of cultural protection' }
  ]
};

if (typeof window !== 'undefined') {
  window.INITIAL_ARCHETYPES = INITIAL_ARCHETYPES;
  window.CUSTOMIZATION_OPTIONS = CUSTOMIZATION_OPTIONS;
}
