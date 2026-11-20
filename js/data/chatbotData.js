// js/data/chatbotData.js
// ITIHASAM: Heritage Guide Knowledge Base

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

- **History quest:** solve the inscription riddle and open the reliquary (about 150 CDP).
- **Traditional game:** *win* the state's game — Pallanguzhi, Chaupar, Bagh-Chal or a folk sport (about 200 CDP).
- **Architecture:** rebuild the monument layer by layer (about 250 CDP).
- **Festival:** complete the build or keep the drum rhythm (about 180 CDP).
- **Living Traditions:** watch every slide (about 150 CDP).
- **Daily Challenge:** 60 CDP + a streak bonus. **Timeline:** up to 150 CDP.

Points are awarded the first time you complete each activity — a loss earns nothing, so try again! CDP unlocks Levels 1–5, badges, 36 artifacts and your **Certificate of Cultural Mastery**.`
  },
  {
    keywords: ['help', 'what can i do', 'guide', 'controls', 'explore'],
    topic: 'Navigation Help',
    response: `Welcome, Explorer! Here is how to navigate **ITIHASAM**:

1. **India Map:** each state tile fills with gold as you complete its 5 experiences.
2. **Explore India:** search and filter all 28 states and 8 Union Territories by region.
3. **Mini-games:** every game opens with a demo first. Board games offer **Pass & Play** for two players.
4. **Daily Quiz & Timeline:** one new question a day (keep your streak!) and a chronology challenge.
5. **Passport & Rewards:** collect a stamp per state, badges, artifacts and a certificate.
6. **Class Board:** add several explorers on one device.
7. **Settings:** language (English, हिन्दी, தமிழ்), sound, regional music, high contrast and reduced motion.`
  }
];

export const QUICK_PROMPTS = [
  "How to play Pallanguzhi?",
  "Rules of Chaupar",
  "Bagh-Chal tips",
  "How was Brihadeeswarar built?",
  "Where are living root bridges?",
  "Tell me about Hornbill Festival",
  "How do I earn CDP points?"
];

if (typeof window !== 'undefined') {
  window.HERITAGE_GUIDE_QA = HERITAGE_GUIDE_QA;
  window.QUICK_PROMPTS = QUICK_PROMPTS;
}
