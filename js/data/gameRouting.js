// js/data/gameRouting.js
// ITIHASAM: Which mini-game, folk sport and festival simulation each state uses.
// Keeps statesData.js (the cultural content) untouched while giving every
// state an experience that matches its own traditions.

// ---------- Traditional games ----------
// 'pallanguzhi' | 'chaupar' | 'baghchal' | 'sports'
export const STATE_GAMES = {
  'tamil-nadu': { game: 'pallanguzhi' },
  'goa': { game: 'pallanguzhi' },
  'karnataka': { game: 'chaupar', variant: 'Pagade' },
  'andhra-pradesh': { game: 'chaupar', variant: 'Ashta Chamma' },
  'telangana': { game: 'chaupar', variant: 'Pachisi' },
  'gujarat': { game: 'chaupar', variant: 'Chopat' },
  'rajasthan': { game: 'chaupar', variant: 'Chaupar' },
  'uttar-pradesh': { game: 'chaupar', variant: 'Pachisi' },
  'uttarakhand': { game: 'baghchal', variant: 'Bagh-Chal' },
  'kerala': { game: 'sports', sport: 'pebbles' },
  'maharashtra': { game: 'sports', sport: 'gilli' },
  'punjab': { game: 'sports', sport: 'kabaddi' },
  'haryana': { game: 'sports', sport: 'wrestling' },
  'himachal-pradesh': { game: 'sports', sport: 'archery' },
  'west-bengal': { game: 'sports', sport: 'gilli' },
  'odisha': { game: 'sports', sport: 'stilts' },
  'bihar': { game: 'sports', sport: 'gilli' },
  'jharkhand': { game: 'sports', sport: 'stilts' },
  'chhattisgarh': { game: 'sports', sport: 'stilts' },
  'assam': { game: 'sports', sport: 'ball' },
  'arunachal-pradesh': { game: 'sports', sport: 'archery' },
  'manipur': { game: 'sports', sport: 'polo' },
  'meghalaya': { game: 'sports', sport: 'archery' },
  'mizoram': { game: 'sports', sport: 'pole' },
  'nagaland': { game: 'sports', sport: 'wrestling' },
  'tripura': { game: 'sports', sport: 'ball' },
  'sikkim': { game: 'sports', sport: 'archery' },
  'madhya-pradesh': { game: 'sports', sport: 'mallakhamb' },
  // Union Territories
  'jammu-and-kashmir': { game: 'sports', sport: 'gilli' },
  'ladakh': { game: 'sports', sport: 'archery' },
  'delhi': { game: 'chaupar', variant: 'Pachisi' },
  'chandigarh': { game: 'sports', sport: 'kabaddi' },
  'puducherry': { game: 'pallanguzhi' },
  'lakshadweep': { game: 'sports', sport: 'sevenstones' },
  'andaman-and-nicobar-islands': { game: 'sports', sport: 'canoe' },
  'dadra-and-nagar-haveli-and-daman-and-diu': { game: 'chaupar', variant: 'Chopat' }
};

// Folk sports use one timing mechanic (stop the moving marker inside the
// target zone) themed per sport.
export const SPORT_THEMES = {
  archery: { icon: '🏹', name: 'Traditional Archery', action: 'Release the arrow', target: '🎯', zone: 0.16, speed: 1.25, hitText: 'Bullseye!', missText: 'The arrow flew wide.' },
  kabaddi: { icon: '🤼', name: 'Circle Kabaddi Raid', action: 'Tag the defender', target: '🧍', zone: 0.2, speed: 1.1, hitText: 'Raid successful!', missText: 'You were tackled!' },
  wrestling: { icon: '💪', name: 'Akhada Wrestling', action: 'Make your move', target: '🤼', zone: 0.18, speed: 1.15, hitText: 'Clean takedown!', missText: 'Your opponent slipped away.' },
  gilli: { icon: '🏏', name: 'Gilli-Danda', action: 'Strike the gilli', target: '🪵', zone: 0.17, speed: 1.3, hitText: 'The gilli soars far!', missText: 'Missed the gilli.' },
  pebbles: { icon: '🪨', name: 'Kallu Kali (Pebble Toss)', action: 'Catch the pebble', target: '🪨', zone: 0.2, speed: 1.0, hitText: 'Caught it!', missText: 'The pebble dropped.' },
  stilts: { icon: '🦯', name: 'Gedi Stilt Race', action: 'Take a balanced step', target: '👣', zone: 0.22, speed: 0.95, hitText: 'Perfect balance!', missText: 'You wobbled off the stilts.' },
  ball: { icon: '⚽', name: 'Dhopkhel Ball Game', action: 'Throw the ball', target: '🧍', zone: 0.19, speed: 1.1, hitText: 'Direct hit!', missText: 'The ball missed.' },
  polo: { icon: '🏇', name: 'Sagol Kangjei (Manipuri Polo)', action: 'Swing the mallet', target: '⚪', zone: 0.15, speed: 1.35, hitText: 'Goal!', missText: 'The ball rolled away.' },
  pole: { icon: '🪵', name: 'Insuknawr (Pole Push)', action: 'Push with all your strength', target: '🧍', zone: 0.2, speed: 1.05, hitText: 'You pushed them back!', missText: 'You lost your footing.' },
  mallakhamb: { icon: '🤸', name: 'Mallakhamb Pole Gymnastics', action: 'Hold the pose', target: '🪵', zone: 0.17, speed: 1.2, hitText: 'Graceful pose!', missText: 'You slipped down the pole.' },
  sevenstones: { icon: '🥎', name: 'Seven Stones (Lagori)', action: 'Throw at the stone pile', target: '🪨', zone: 0.19, speed: 1.1, hitText: 'The stones topple!', missText: 'The ball rolled past.' },
  canoe: { icon: '🛶', name: 'Hodi Canoe Race', action: 'Paddle in rhythm', target: '🏁', zone: 0.19, speed: 1.1, hitText: 'Perfect stroke!', missText: 'Your paddle splashed off-beat.' }
};

// ---------- Festivals ----------
// kind 'mandala' = arrange 5 layers in order; kind 'rhythm' = keep the beat.
export const FESTIVAL_THEMES = {
  pookalam: {
    kind: 'mandala', heading: 'SACRED ONAM POOKALAM MANDALA', lamp: '🪔 NILAVILAKKU LIT',
    layers: [
      { name: 'Centre: Yellow Marigold', icon: '🌼', color: '#F2C94C' },
      { name: 'Ring 2: Red Ixora (Thechi)', icon: '🌺', color: '#C0392B' },
      { name: 'Ring 3: White Jasmine', icon: '🌸', color: '#F7F1E3' },
      { name: 'Ring 4: Orange Marigold', icon: '🏵️', color: '#E67E22' },
      { name: 'Ring 5: Green Tulsi Border', icon: '🍃', color: '#4E8A3E' }
    ],
    lore: 'During the ten days of Onam, the Athapookalam grows by one ring a day to welcome King Mahabali.',
    done: 'Auspicious Pookalam complete! King Mahabali welcomes your devotion.'
  },
  pongal: {
    kind: 'mandala', heading: 'THAI PONGAL HARVEST POT', lamp: '☀️ SUNRISE OFFERING',
    layers: [
      { name: 'Draw the Kolam around the hearth', icon: '⚪', color: '#F7F1E3' },
      { name: 'Tie turmeric & sugarcane to the pot', icon: '🌾', color: '#D4A017' },
      { name: 'Pour fresh milk', icon: '🥛', color: '#FFFFFF' },
      { name: 'Add new rice & jaggery', icon: '🍚', color: '#C68E17' },
      { name: 'Boil over: "Pongalo Pongal!"', icon: '🍯', color: '#B76E4B' }
    ],
    lore: 'When the milk boils over the earthen pot at sunrise, families shout "Pongalo Pongal!" for a year of plenty.',
    done: 'Pongalo Pongal! The pot overflowed — a sign of abundance for the year.'
  },
  bathukamma: {
    kind: 'mandala', heading: 'BATHUKAMMA FLOWER TOWER', lamp: '🌙 EVENING SONGS',
    layers: [
      { name: 'Base: Tangedu (Senna) flowers', icon: '🌼', color: '#F4D03F' },
      { name: 'Gunugu (Celosia) layer', icon: '🌸', color: '#E84393' },
      { name: 'Banti (Marigold) layer', icon: '🏵️', color: '#E67E22' },
      { name: 'Lotus layer', icon: '🪷', color: '#F8A5C2' },
      { name: 'Gauramma (turmeric cone) on top', icon: '🔶', color: '#D4A017' }
    ],
    lore: 'Women stack seasonal flowers into a temple-shaped cone and sing around it before floating it on a lake.',
    done: 'Your Bathukamma tower stands tall — ready to be floated on the lake!'
  },
  golu: {
    kind: 'mandala', heading: 'MYSORE DASARA GOMBE HABBA', lamp: '🐘 JAMBU SAVARI',
    layers: [
      { name: 'Step 1: Village life dolls', icon: '🏡', color: '#C8A97E' },
      { name: 'Step 2: Saints & sages', icon: '🧘', color: '#E6B85C' },
      { name: 'Step 3: Royal court of Mysore', icon: '👑', color: '#B69A62' },
      { name: 'Step 4: Avatars of Vishnu', icon: '🪈', color: '#5D8AA8' },
      { name: 'Step 5: Goddess Chamundeshwari', icon: '🔱', color: '#B76E4B' }
    ],
    lore: 'Families arrange wooden dolls on odd-numbered steps during Dasara, telling the story of creation and victory.',
    done: 'Your Gombe display is complete — the palace lights glow across Mysore!'
  },
  rangoli: {
    kind: 'mandala', heading: 'FESTIVE RANGOLI AT THE THRESHOLD', lamp: '🪔 DIYAS LIT',
    layers: [
      { name: 'Centre: Lotus in vermilion', icon: '🪷', color: '#C0392B' },
      { name: 'Ring 2: Turmeric yellow', icon: '🟡', color: '#F1C40F' },
      { name: 'Ring 3: Rice-flour white', icon: '⚪', color: '#FAF7F0' },
      { name: 'Ring 4: Leaf green', icon: '🍃', color: '#27AE60' },
      { name: 'Ring 5: Indigo border with diyas', icon: '🪔', color: '#34495E' }
    ],
    lore: 'Rangoli patterns welcome guests and prosperity; colours come from rice flour, turmeric, vermilion and leaves.',
    done: 'A radiant rangoli now welcomes every guest to your home!'
  },
  mandana: {
    kind: 'mandala', heading: 'RAJASTHANI MANDANA FLOOR ART', lamp: '🌸 GANGAUR PRAYERS',
    layers: [
      { name: 'Clay & cow-dung base (Lipai)', icon: '🟤', color: '#8B5A2B' },
      { name: 'Chalk-white Khadiya lines', icon: '⚪', color: '#F7F1E3' },
      { name: 'Red ochre Geru border', icon: '🔴', color: '#A93226' },
      { name: 'Peacock motifs', icon: '🦚', color: '#1F618D' },
      { name: 'Gangaur idol & flowers', icon: '🌺', color: '#E67E22' }
    ],
    lore: 'Mandana is painted by women on mud floors with white chalk and red ochre to bless homes during festivals.',
    done: 'Your Mandana is complete — Gangaur blesses the household!'
  },
  pandal: {
    kind: 'mandala', heading: 'DURGA PUJA PANDAL', lamp: '🥁 DHAK BEATS',
    layers: [
      { name: 'Bamboo frame of the pandal', icon: '🎋', color: '#C8A97E' },
      { name: 'Alpana floor art', icon: '⚪', color: '#FAF7F0' },
      { name: 'Clay idol of Ma Durga', icon: '🔱', color: '#C0392B' },
      { name: 'Shola-pith decorations', icon: '✨', color: '#F7DC6F' },
      { name: 'Dhunuchi lamp for the aarti', icon: '🪔', color: '#E67E22' }
    ],
    lore: 'Kolkata\'s Durga Puja is on UNESCO\'s list of Intangible Cultural Heritage; whole neighbourhoods build themed pandals.',
    done: 'The pandal glows! Sindoor Khela and dhunuchi dance can begin.'
  },
  chariot: {
    kind: 'mandala', heading: 'DECORATE THE FESTIVAL CHARIOT', lamp: '🙏 PULL THE ROPES',
    layers: [
      { name: 'Wooden wheels', icon: '☸️', color: '#8B5A2B' },
      { name: 'Chariot platform', icon: '🟫', color: '#A0522D' },
      { name: 'Painted canopy in red & yellow', icon: '🔺', color: '#C0392B' },
      { name: 'Flower garlands', icon: '🌼', color: '#F4D03F' },
      { name: 'Deity enthroned', icon: '🛕', color: '#B69A62' }
    ],
    lore: 'Huge wooden chariots are rebuilt every year and pulled through the streets by thousands of devotees.',
    done: 'The chariot is ready — thousands of hands take up the ropes!'
  },
  diya: {
    kind: 'mandala', heading: 'GHATS OF A THOUSAND LAMPS', lamp: '🌊 EVENING AARTI',
    layers: [
      { name: 'Clean the ghat steps', icon: '🧹', color: '#C8A97E' },
      { name: 'Arrange clay diyas', icon: '🏺', color: '#A0522D' },
      { name: 'Fill with ghee & cotton wicks', icon: '🧈', color: '#F7DC6F' },
      { name: 'Light the lamps', icon: '🪔', color: '#E67E22' },
      { name: 'Float lamps on the river', icon: '🌊', color: '#2E86C1' }
    ],
    lore: 'On festival nights the river ghats are lined with lakhs of clay lamps that reflect on the water.',
    done: 'The ghats shimmer with light — a river of lamps!'
  },
  prayerflags: {
    kind: 'mandala', heading: 'HIMALAYAN NEW YEAR (LOSAR)', lamp: '🏔️ MONASTERY CHANTS',
    layers: [
      { name: 'Blue flag — sky', icon: '🟦', color: '#2E86C1' },
      { name: 'White flag — air', icon: '⬜', color: '#FAF7F0' },
      { name: 'Red flag — fire', icon: '🟥', color: '#C0392B' },
      { name: 'Green flag — water', icon: '🟩', color: '#27AE60' },
      { name: 'Yellow flag — earth', icon: '🟨', color: '#F1C40F' }
    ],
    lore: 'Prayer flags are hung in the order blue, white, red, green, yellow for the five elements, carrying blessings on the wind.',
    done: 'The prayer flags flutter — blessings ride the mountain winds!'
  },
  // Rhythm festivals
  'rhythm-garba': { kind: 'rhythm', heading: 'NAVRATRI GARBA & DANDIYA', instrument: 'Dandiya sticks', icon: '🥢', bpm: 112, lore: 'Dancers circle a lamp (garbo) for nine nights, clapping and striking dandiya sticks in rhythm.' },
  'rhythm-dhol': { kind: 'rhythm', heading: 'BAISAKHI BHANGRA DHOL', instrument: 'Dhol', icon: '🥁', bpm: 120, lore: 'The dhol\'s booming beat drives Bhangra dances celebrating the wheat harvest.' },
  'rhythm-bihu': { kind: 'rhythm', heading: 'RONGALI BIHU DHOL & PEPA', instrument: 'Bihu dhol', icon: '🥁', bpm: 116, lore: 'Bihu welcomes the Assamese new year with dhol, pepa (buffalo-horn pipe) and joyful dance.' },
  'rhythm-wangala': { kind: 'rhythm', heading: 'WANGALA — FESTIVAL OF 100 DRUMS', instrument: 'Dama drum', icon: '🪘', bpm: 100, lore: 'The Garo people thank the sun god Saljong with the sound of a hundred long drums.' },
  'rhythm-logdrum': { kind: 'rhythm', heading: 'HORNBILL FESTIVAL LOG DRUM', instrument: 'Log drum', icon: '🪵', bpm: 96, lore: 'Naga tribes beat giant hollowed log drums that once carried messages between villages.' },
  'rhythm-nagara': { kind: 'rhythm', heading: 'KULLU DUSSEHRA NAGARA', instrument: 'Nagara drum', icon: '🪘', bpm: 104, lore: 'Hundreds of village deities arrive in Kullu in palanquins, announced by nagara drums and trumpets.' },
  'rhythm-mandar': { kind: 'rhythm', heading: 'SARHUL MANDAR BEAT', instrument: 'Mandar drum', icon: '🪘', bpm: 98, lore: 'Sarhul worships the sal tree at the start of spring, with dance to the mandar drum.' },
  'rhythm-thabal': { kind: 'rhythm', heading: 'YAOSHANG THABAL CHONGBA', instrument: 'Dhol & claps', icon: '👏', bpm: 108, lore: 'Under the moonlight, young people hold hands and dance the Thabal Chongba during Yaoshang.' },
  'rhythm-cheraw': { kind: 'rhythm', heading: 'CHAPCHAR KUT CHERAW', instrument: 'Bamboo poles', icon: '🎋', bpm: 92, lore: 'In Cheraw, dancers step nimbly between bamboo poles clapped together in rhythm.' },
  'rhythm-dholtasha': { kind: 'rhythm', heading: 'SHIGMO DHOL-TASHA', instrument: 'Dhol & tasha', icon: '🥁', bpm: 124, lore: 'Goa\'s spring festival fills the streets with drums, colourful floats and folk dances.' },
  // Union Territory festivals
  navreh: {
    kind: 'mandala', heading: 'NAVREH THAAL (KASHMIRI NEW YEAR)', lamp: '🌸 SPRING MORNING',
    layers: [
      { name: 'Bowl of rice', icon: '🍚', color: '#F7F1E3' },
      { name: 'Walnuts & curd', icon: '🌰', color: '#A0724C' },
      { name: 'Fresh spring flowers', icon: '🌸', color: '#F4A6C6' },
      { name: 'The new almanac (jantri)', icon: '📜', color: '#E6B85C' },
      { name: 'A mirror for the first look', icon: '🪞', color: '#B8C7D9' }
    ],
    lore: 'On Navreh morning, Kashmiri Pandit families first look at a thaal arranged the night before, welcoming a year of plenty.',
    done: 'Your Navreh thaal is ready — a bright new year begins!'
  },
  phoolwalon: {
    kind: 'mandala', heading: 'PHOOL WALON KI SAIR PANKHA', lamp: '🎺 SHEHNAI PROCESSION',
    layers: [
      { name: 'Bamboo fan frame', icon: '🎋', color: '#C8A97E' },
      { name: 'Marigold border', icon: '🏵️', color: '#E67E22' },
      { name: 'Rose petals', icon: '🌹', color: '#C0392B' },
      { name: 'Tuberose strings', icon: '🤍', color: '#FAF7F0' },
      { name: 'Offer at temple and dargah', icon: '🙏', color: '#B69A62' }
    ],
    lore: "Delhi's florists carry giant flower fans to both the Yogmaya Temple and the Dargah of Khwaja Bakhtiyar Kaki — a festival of togetherness.",
    done: 'The floral pankha joins the procession through Mehrauli!'
  },
  rosegarden: {
    kind: 'mandala', heading: 'CHANDIGARH ROSE FESTIVAL', lamp: '🌹 GARDEN IN BLOOM',
    layers: [
      { name: 'Centre: deep red roses', icon: '🌹', color: '#A93226' },
      { name: 'Ring 2: pink roses', icon: '🌸', color: '#F1948A' },
      { name: 'Ring 3: yellow roses', icon: '🟡', color: '#F4D03F' },
      { name: 'Ring 4: white roses', icon: '⚪', color: '#FAF7F0' },
      { name: 'Ring 5: green lawn border', icon: '🍃', color: '#58A55C' }
    ],
    lore: "Each February the Zakir Hussain Rose Garden, one of Asia's largest, hosts flower shows and folk performances.",
    done: 'The rose bed is in full bloom!'
  },
  hodi: {
    kind: 'mandala', heading: 'NICOBARI HODI CANOE', lamp: '🌊 READY FOR THE RACE',
    layers: [
      { name: 'Carve the canoe hull', icon: '🪵', color: '#8B5A2B' },
      { name: 'Fit the outrigger', icon: '🛶', color: '#A0724C' },
      { name: 'Paint the bands', icon: '🎨', color: '#C0392B' },
      { name: 'Tie palm-leaf decorations', icon: '🌴', color: '#27AE60' },
      { name: 'Launch into the lagoon', icon: '🌊', color: '#2E86C1' }
    ],
    lore: 'Hodi canoes are carved from a single trunk and raced during Nicobarese celebrations.',
    done: 'Your hodi glides into the lagoon, ready to race!'
  },
  'rhythm-cham': { kind: 'rhythm', heading: 'HEMIS TSECHU CHAM DANCE', instrument: 'Monastery drums & cymbals', icon: '🥁', bpm: 88, lore: 'Masked monks dance the cham at Hemis to drums, cymbals and long horns, honouring Guru Padmasambhava.' },
  'rhythm-kolkali': { kind: 'rhythm', heading: 'KOLKALI STICK DANCE', instrument: 'Kolkali sticks', icon: '🥢', bpm: 110, lore: 'In Lakshadweep, dancers move in a circle, striking short sticks together in time with songs.' },
  'rhythm-tarpa': { kind: 'rhythm', heading: 'WARLI TARPA DANCE', instrument: 'Tarpa (gourd horn)', icon: '🎺', bpm: 96, lore: 'Dancers link arms and spiral around the tarpa player, whose gourd horn sets the beat.' },
  'rhythm-tabla': { kind: 'rhythm', heading: 'KHAJURAHO DANCE FESTIVAL', instrument: 'Tabla', icon: '🪘', bpm: 100, lore: 'Classical dancers perform against the lit-up Khajuraho temples, accompanied by tabla and pakhawaj.' }
};

export const STATE_FESTIVALS = {
  'kerala': 'pookalam',
  'tamil-nadu': 'pongal',
  'andhra-pradesh': 'pongal',
  'telangana': 'bathukamma',
  'karnataka': 'golu',
  'maharashtra': 'rangoli',
  'gujarat': 'rhythm-garba',
  'rajasthan': 'mandana',
  'goa': 'rhythm-dholtasha',
  'punjab': 'rhythm-dhol',
  'haryana': 'rangoli',
  'himachal-pradesh': 'rhythm-nagara',
  'uttarakhand': 'diya',
  'uttar-pradesh': 'diya',
  'west-bengal': 'pandal',
  'odisha': 'chariot',
  'bihar': 'diya',
  'jharkhand': 'rhythm-mandar',
  'chhattisgarh': 'chariot',
  'assam': 'rhythm-bihu',
  'arunachal-pradesh': 'prayerflags',
  'manipur': 'rhythm-thabal',
  'meghalaya': 'rhythm-wangala',
  'mizoram': 'rhythm-cheraw',
  'nagaland': 'rhythm-logdrum',
  'tripura': 'diya',
  'sikkim': 'prayerflags',
  'madhya-pradesh': 'rhythm-tabla',
  // Union Territories
  'jammu-and-kashmir': 'navreh',
  'ladakh': 'rhythm-cham',
  'delhi': 'phoolwalon',
  'chandigarh': 'rosegarden',
  'puducherry': 'pongal',
  'lakshadweep': 'rhythm-kolkali',
  'andaman-and-nicobar-islands': 'hodi',
  'dadra-and-nagar-haveli-and-daman-and-diu': 'rhythm-tarpa'
};

export function getGameRoute(stateId) {
  return STATE_GAMES[stateId] || { game: 'pallanguzhi' };
}

export function getFestivalTheme(stateId) {
  const key = STATE_FESTIVALS[stateId] || 'rangoli';
  return { key, ...FESTIVAL_THEMES[key] };
}

export function describeGame(stateId) {
  const r = getGameRoute(stateId);
  if (r.game === 'sports') return SPORT_THEMES[r.sport].name;
  if (r.game === 'chaupar') return `${r.variant} (dice race)`;
  if (r.game === 'baghchal') return 'Bagh-Chal (tigers vs goats)';
  return 'Pallanguzhi (mancala)';
}
