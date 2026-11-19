// js/data/chatbotData.js
// DISCOVER INDIA: Heritage Guide Knowledge Base

export const HERITAGE_GUIDE_QA = [
  {
    keywords: ['pallanguzhi', 'mancala', 'cowrie', 'how to play pallanguzhi', 'rules of pallanguzhi'],
    topic: 'Traditional Games',
    response: `**Pallanguzhi** is an ancient 14-pit mancala game played widely in Tamil Nadu, Kerala (Ali Guli Mane in Karnataka, Vamana Guntalu in Andhra).
    
**Rules:**
1. The board has two rows of 7 pits each. Each player owns the 7 pits on their side.
2. In the traditional version, each pit starts with 5 cowrie shells or tamarind seeds.
3. Players pick up shells from any of their pits and sow them counter-clockwise, one by one into subsequent pits.
4. When your hand empties, you pick up shells from the very next pit and continue sowing.
5. If the next pit is empty, you stop! You then capture all shells in the pit directly opposite to that empty pit.
6. The game sharpens mental calculation, memory, and strategy!`
  },
  {
    keywords: ['aadu puli', 'tigers and goats', 'aadu puli aattam', 'tiger game'],
    topic: 'Traditional Games',
    response: `**Aadu Puli Aattam** (Tigers & Goats) is an asymmetric ancient hunting board game played on a triangular grid.
    
**Gameplay:**
- One player controls **3 Tigers**, while the other commands **15 Goats**.
- **Tigers** try to capture goats by leaping over them into an adjacent empty space (like draughts).
- **Goats** cannot jump, but try to coordinate and surround all three tigers so they cannot move.
- If tigers capture enough goats, tigers win. If goats immobilize all tigers, goats win!`
  },
  {
    keywords: ['brihadeeswarar', 'thanjavur', 'chola temple', 'big temple'],
    topic: 'Architecture',
    response: `**Brihadeeswarar Temple** in Thanjavur, Tamil Nadu was built by **Emperor Rajaraja Chola I** and completed in 1010 CE.
    
**Architectural Marvels:**
- It is constructed entirely of interlocked granite blocks without binding mortar.
- The soaring **Vimana** stands 216 feet high (66 meters).
- The crowning dome (Kumbam) is carved from a **single 80-tonne granite boulder**, hauled up a specially built 6-kilometer inclined earthen ramp!
- It has stood firm for over 1,000 years through storms and earthquakes.`
  },
  {
    keywords: ['taj mahal', 'agra', 'shah jahan', 'marble'],
    topic: 'Architecture',
    response: `The **Taj Mahal** in Agra, Uttar Pradesh was commissioned in 1631 CE by Mughal Emperor Shah Jahan as a mausoleum for his empress Mumtaz Mahal.
    
**Key Engineering Secrets:**
- Constructed with translucent **Makrana white marble** that shifts color with the morning and evening light.
- Foundations rest on deep ebony and mahogany wooden wells submerged beside the Yamuna River, remaining supple with moisture.
- The four corner minarets were deliberately tilted slightly outward so in an earthquake they would fall away from the central dome.`
  },
  {
    keywords: ['konark', 'sun temple', 'odisha', 'sundial'],
    topic: 'Architecture',
    response: `The **Konark Sun Temple** in Odisha was designed around 1250 CE by King Narasimhadeva I as a monumental 24-wheeled chariot pulled by seven stone horses for Surya, the Sun God.
    
**Astronomical Marvel:**
- The 24 stone wheels are functional sundials. Each wheel has 8 major spokes and 8 minor spokes.
- By observing where the shadow of the central axle falls on the spokes and bead markers, you can read the precise time down to minutes!`
  },
  {
    keywords: ['pookalam', 'onam', 'flower carpet', 'kerala floral'],
    topic: 'Festivals',
    response: `**Athapookalam** is a vibrant floral mandala carpet designed outside homes during the ten days of **Onam** in Kerala to welcome the benevolent mythical King Mahabali.
    
**Tradition:**
- Each day, a new concentric circle of flower petals is added.
- Traditional flowers include yellow Marigolds (Chendumalli), red Ixora (Thechi), fragrant white Jasmine (Mulla), and sacred Tulsi.
- It symbolizes communal harmony, artistic beauty, and ecological abundance.`
  },
  {
    keywords: ['living root bridge', 'meghalaya', 'cherrapunji', 'ficus'],
    topic: 'Architecture & Living Traditions',
    response: `The **Living Root Bridges** (Jingkieng Jri) of Meghalaya are bio-engineering marvels grown by the Khasi and Jaintia tribes.
    
**How They Grow:**
- Aerial roots of the **Ficus elastica** (rubber fig tree) are guided across roaring mountain rivers using hollowed areca palm trunks.
- Over 30 to 50 years, the roots intertwine, thicken, and take hold in the opposite riverbank.
- Unlike timber bridges that rot in wet rainforest climates, living root bridges grow stronger, more resilient, and self-healing over hundreds of years!`
  },
  {
    keywords: ['points', 'cdp', 'rewards', 'how to earn points', 'level', 'unlock'],
    topic: 'Game Progression',
    response: `**Cultural Discovery Points (CDP)** and Rewards System:
    
- **History Exploration:** 150 CDP for deciphering inscriptions and solving historical quests.
- **Traditional Games:** 200 CDP for playing and mastering indigenous board games.
- **Architectural Puzzle:** 250 CDP for assembling monuments piece by piece.
- **Festival Simulations:** 180 CDP for arranging floral Pookalams and harvest celebrations.
- **Living Traditions:** 150 CDP for exploring cultural traditions.
    
Earning CDP unlocks new Levels (Level 1 to 5), rare historical artifact cards, achievement badges, and your personalized printable **Certificate of Cultural Mastery**!`
  },
  {
    keywords: ['help', 'what can i do', 'guide', 'controls', 'explore'],
    topic: 'Navigation Help',
    response: `Welcome, Explorer! Here is how to navigate **DISCOVER INDIA**:
    
1. **Interactive Storyboard:** On the landing page, follow the curved pathway through the 5 cultural stops from left to right.
2. **Opposing Pointer Parallax:** Move your mouse; watch the floating discovery card sway gently in the opposite direction!
3. **Explore All 28 States:** Click 'Explore India' in the right toolbar to search, filter by region, and discover all 28 Indian states.
4. **Interactive Mini-Games:** Every state category opens with a DEMO first, followed by playable pixel-art challenges.
5. **Living Traditions:** Watch the automatic cultural slideshow (starts in 5 seconds and auto-scrolls smoothly).`
  }
];

export const QUICK_PROMPTS = [
  "How to play Pallanguzhi?",
  "How was Brihadeeswarar built?",
  "Where are living root bridges?",
  "How do I earn CDP points?",
  "Tell me about Onam Pookalam"
];

if (typeof window !== 'undefined') {
  window.HERITAGE_GUIDE_QA = HERITAGE_GUIDE_QA;
  window.QUICK_PROMPTS = QUICK_PROMPTS;
}
