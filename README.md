# DISCOVER INDIA – An Interactive Cultural Heritage Experience

> *"28 States. Countless Stories. One Living Heritage."*  
> **Project Tagline:** *"Explore the Past. Play the Present. Preserve the Heritage."*

---

## 🌟 Executive Summary

**DISCOVER INDIA** is a visually immersive, interactive educational gaming website designed to bring India's rich cultural heritage alive for students and audiences worldwide. Designed following the authentic **ANCIENT WHITE** aesthetic, the platform combines the tactile elegance of ancient Indian manuscripts, stone-carved temple architecture, and vintage parchment textures with playable pixel-art games, interactive storyboards, and progressive gamified learning.

The platform covers **all 28 states of India without exception**, with authentic historical personalities, indigenous board games, architectural marvels, sacred festivals, and living traditions.

---

## 🎨 Visual Identity & Design Language

- **Overall Theme:** ANCIENT WHITE
- **Color Palette:**
  - Primary Background: **Antique White (`#F5F0E6`)**
  - Secondary Background: **Ivory (`#FAF7F0`)**
  - Primary Text: **Dark Brown (`#493A2D`)**
  - Accent Colour: **Muted Antique Gold (`#B69A62`)**
  - Secondary Accent: **Terracotta (`#B76E4B`)**
  - Borders: **Soft Sandstone (`#D8CBB6`)**
- **Design Elements:**
  - Subtle parchment background textures and faint radial mandalas.
  - Traditional Indian ornamental borders and dashed manuscript contours.
  - Classical typography featuring **Cinzel**, **Marcellus**, and **Plus Jakarta Sans**.
  - Soft ambient shadows and rounded content panels.
  - Clean, historical, elegant layout with zero neon or cluttered dark backgrounds.

---

## 🗺️ Key Features & Interactive Architecture

### 1. Landing Page & Curved Storyboard Journey
- **Heritage Collage Background:** Blends historic imagery of the Taj Mahal, Brihadeeswarar Temple, Hampi, Konark Sun Temple, classical dances, forts, and traditional games with an antique-white overlay.
- **Winding Historical Journey:** A visually distinctive **curved pathway moving from LEFT TO RIGHT** (not a straight horizontal line) connecting 5 milestone stops:
  1. *History & Civilization*
  2. *Forgotten Traditional Games*
  3. *Architectural Wonders*
  4. *Festivals & Celebrations*
  5. *Regional Cultures*
- **Opposing Pointer Parallax:** Moving the mouse left shifts the floating discovery cards right; moving right shifts cards left; moving up shifts cards down; moving down shifts cards up. Smooth, clamped, with mobile touch support.

### 2. Comprehensive 28 States Storyboard
All 28 Indian states are meticulously documented across 5 cultural dimensions:
- **Southern India (5):** Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana
- **Western India (4):** Maharashtra, Gujarat, Rajasthan, Goa
- **Northern India (5):** Punjab, Haryana, Himachal Pradesh, Uttarakhand, Uttar Pradesh
- **Eastern India (5):** West Bengal, Odisha, Bihar, Jharkhand, Chhattisgarh
- **Northeastern India (8):** Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Tripura, Sikkim
- **Central India (1):** Madhya Pradesh

Every state contains:
1. **History & Civilization:** Empires, kings, scholars (e.g. Chola, Satavahana, Ahom, Mauryan), stone edicts, discovery quests, and historical artifacts.
2. **Forgotten Traditional Games:** Authentic rules and playable boards (Pallanguzhi, Aadu Puli Aattam, Pagade, Chaupar, Ashta Chamma, Dhopkhel, Insuknawr, etc.).
3. **Architectural Wonders:** Detailed engineering breakdowns and puzzle assembly (Brihadeeswarar, Taj Mahal, Konark, Hampi, Rani ki Vav, Sanchi, etc.).
4. **Festivals & Celebrations:** Seasonal harvest rituals, culinary heritage, and simulations (Onam Pookalam, Thai Pongal, Durga Puja, Bihu, Hornbill).
5. **Regional Cultures:** Living classical dances, folk music instruments, tribal crafts, handloom weaves, and cultural lifestyles.

### 3. Interactive Games System & Mandatory Demo Mode
Every mini-game initially opens in **DEMO MODE**:
- Shows automated gameplay demonstration.
- Highlights board elements and explains objectives and controls.
- Displays the **"READY TO PLAY?"** dialog with:
  - `PLAY GAME`
  - `REPLAY DEMO`
  - `CUSTOMIZE AVATAR`
- **Mini-Games Included:**
  - **History Adventure:** 2D top-down pixel-art exploration of ancient royal courts with NPC dialogue, stone inscription deciphering, and treasure chests.
  - **Traditional Games (RPG Style):** Playable 14-pit **Pallanguzhi (Mancala)** with animated cowrie shell sowing, empty-pit captures, and intelligent opponent AI.
  - **Architectural Wonders Construction:** Drag-and-drop / click-to-place architectural blueprint reconstruction with structural facts revealed per layer.
  - **Festival Simulations:** Sacred Kerala **Athapookalam** concentric flower petal mandala arrangement and Pongal harvest boiling.
  - **Living Traditions Slideshow:** Automatically starts, **waits exactly 5 seconds** before auto-scrolling to the right at regular intervals, with pause/resume and full manual navigation.

### 4. Avatar Customization ("Choose Your Explorer")
- 4 Initial Historical Archetypes:
  - *The Royal Historian*
  - *The Temple Archaeologist*
  - *The Folklore Storyteller*
  - *The Boardgame Champion*
- Full customization of Explorer Name, Skin Complexions, Traditional Attires (Kurta-Dhoti, Royal Sherwani, Kanchipuram Saree, Nehru Jacket, Angrakha, Naga Handloom), Headwear (Royal Pheta, Mysore Peta, Himachali Cap, Floral Juda), and Sacred Accessories.
- Real-time pixel canvas preview.

### 5. Gamification, Rewards & Printable Certificate
- **Cultural Discovery Points (CDP):** Earned through gameplay and historical discoveries.
- **5 Progressive Levels:** Level 1 (History) through Level 5 (Living Traditions).
- **Collectible Heritage Artifacts:** 3D-effect showcase with historical lore.
- **Achievement Badges:** Master of Pallanguzhi, Temple Architect, Pookalam Artist, etc.
- **Dynamic Printable Certificate:** Generates an official Certificate of Cultural Heritage Mastery with explorer name, score, rank, date, and Ashoka Chakra seal.

### 6. Persistent Right-Side Toolbar & Chatbot
- **Right-Side Vertical Toolbar:** Permanent access to Home, Explore India, Storyboard, My Journey, Rewards, Avatar, Settings, and Help.
- **Heritage Guide Chatbot:** Small floating circular widget in the bottom-right corner answering queries about Indian history, monuments, games, and festivals.

---

## 🚀 How to Run Locally

You can run **DISCOVER INDIA** using Python's built-in server or by opening `index.html` in any modern web browser.

### Option 1: Python Dev Server (Recommended)
```bash
python server.py
```
Then open your browser at:
```
http://localhost:8080
```

### Option 2: Direct File Open
Simply double-click `index.html` or open it directly in Chrome, Edge, Safari, or Firefox:
```
file:///C:/Users/pathm/OneDrive/Desktop/Ideathon%20folder/index.html
```

---

## 📁 Project Structure

```
├── index.html                  # Single-page web application entry point
├── server.py                   # Lightweight Python dev server with CORS & ES module MIME types
├── README.md                   # Complete architectural documentation
├── styles/
│   ├── ancient-white.css       # Core theme variables, typography, ancient panels, parchment
│   ├── landing.css             # Heritage collage, curved SVG pathway, opposing pointer parallax
│   ├── toolbar.css             # Right-side vertical toolbar & collapsible mobile panel
│   ├── states.css              # 28 States grid, search, regional filters, 5-category modal
│   ├── games.css               # Pixel-art game wrappers, wooden boards, canvas styling
│   ├── slideshow.css           # Living Traditions slideshow (5s delay, auto-scroll, pause/resume)
│   ├── rewards.css             # Levels progression, badges, artifacts, printable certificate
│   ├── avatar.css              # Explorer customization UI with live preview
│   └── chatbot.css             # Heritage Guide floating companion widget
└── js/
    ├── app.js                  # Central application orchestrator & router
    ├── audio/
    │   └── soundSynth.js       # Web Audio API synthesizer (bells, clacks, rolls, fanfares)
    ├── data/
    │   ├── statesData.js       # Comprehensive authentic cultural data for ALL 28 STATES
    │   ├── rewardsData.js      # Levels, badges, artifacts, unlock conditions
    │   ├── avatarData.js       # Archetypes, attires, headwear, accessories
    │   └── chatbotData.js      # Heritage Guide QA knowledge base & quick chips
    ├── state/
    │   └── gameState.js        # Progression, CDP points, state completion, localStorage
    ├── components/
    │   ├── landingStoryboard.js# Curved journey, SVG trail, opposing pointer movement
    │   ├── stateExplorer.js    # 28 States directory & 5-category detail cards
    │   ├── avatarCustomizer.js # "Choose Your Explorer" customization & canvas preview
    │   ├── livingTraditions.js # 5-sec delay auto-scrolling cultural slideshow
    │   ├── rewardsModal.js     # Rewards, badges, 28-state tracker, printable certificate
    │   ├── rightToolbar.js     # Persistent right-side vertical navigation
    │   └── heritageGuide.js    # Floating circular companion chatbot
    └── games/
        ├── gameEngine.js       # Base mini-game engine, Demo Mode & "READY TO PLAY?" sequence
        ├── historyAdventure.js # 2D top-down pixel-art historical RPG adventure
        ├── traditionalGames.js # Playable 14-pit Pallanguzhi (mancala) board game
        ├── architectureBuilder.js # Pixel-art monument construction puzzle
        └── festivalSimulation.js  # Concentric floral Pookalam mandala simulation
```
