// js/data/statesData.js
// ITIHASAM: Comprehensive Cultural Storyboard for All 28 States of India
// Every state contains all 5 authentic cultural categories:
// 1. History & Civilization
// 2. Forgotten Traditional Games
// 3. Architectural Wonders
// 4. Festivals & Celebrations
// 5. Regional Cultures

import { UNION_TERRITORIES } from './utData.js';
import { PHOTOS } from './photoMap.js';

export const INDIAN_STATES = [
  {
    "id": "tamil-nadu",
    "name": "Tamil Nadu",
    "capital": "Chennai",
    "region": "South",
    "badge": "Temple Realm of the Cholas",
    "tagline": "Living Chola Temples, Sangam Literature & Sacred Classical Arts",
    "heroImage": "assets/img/photos/1582510003544-4d00b7f74220-w1200.jpg",
    "history": {
      "title": "Chola Naval Empire & Sangam Era",
      "era": "300 BCE \u2013 13th Century CE",
      "keyFigures": [
        "Rajaraja Chola I",
        "Rajendra Chola",
        "Thiruvalluvar",
        "Avvaiyar"
      ],
      "highlights": "The Sangam era produced poetic masterworks like Thirukkural. Under Emperor Rajaraja Chola and Rajendra Chola, the empire commanded the Indian Ocean, sending merchant fleets across Southeast Asia to Srivijaya and building grand granitic monuments.",
      "knowledgeSystem": "Ancient Siddha Medicine, Dravidian acoustic stone carving, and Tolkappiyam linguistic grammar.",
      "discoveryMission": {
        "name": "The Inscriptions of Brihadeeswarar",
        "description": "Examine the Tamil Grantha stone inscriptions carved along the northern sanctum wall.",
        "objective": "Decipher which naval expedition Rajendra Chola led across the Bay of Bengal.",
        "quizQuestion": "Which naval expedition commemorated the triumph of Rajendra Chola over maritime trade routes?",
        "quizOptions": [
          "Expedition to Kadaram (Srivijaya)",
          "Siege of Rome",
          "Persian Gulf Campaign",
          "Voyage of the Red Sea"
        ],
        "correctAnswer": 0,
        "explanation": "Rajendra Chola earned the title 'Kadaram Kondan' after his fleet conquered Kadaram (Kedah, Malaysia) to safeguard oceanic trade routes."
      },
      "artifact": {
        "id": "chola-nataraja",
        "name": "Chola Lost-Wax Bronze Nataraja",
        "period": "11th Century CE",
        "lore": "The cosmic dance of Shiva (Ananda Tandava) captured in sacred panchaloha bronze using the ancient cire-perdue lost-wax method.",
        "icon": "\ud83d\udd31"
      },
      "points": 150
    },
    "games": {
      "title": "Pallanguzhi & Aadu Puli Aattam",
      "gameKey": "pallanguzhi",
      "type": "Indigenous Strategy Board Game",
      "origin": "Chola Dynasty courts and rural Tamil courtyards",
      "rules": [
        "Two players face a wooden board with 14 pits (7 per player).",
        "Each pit is seeded with cowrie shells or tamarind seeds.",
        "Players sow shells sequentially in counter-clockwise fashion.",
        "Capturing empty pits with opposite shells tests mental calculation and foresight."
      ],
      "equipment": "Wooden folding Pallanguzhi board carved with floral motifs, 70 cowrie shells (Choli).",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Pallanguzhi Board",
        "playableTitle": "Play Ancient Pallanguzhi",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Brihadeeswarar Temple (Thanjavur)",
      "monumentName": "Brihadeeswarar Temple",
      "builderEra": "Completed in 1010 CE by Rajaraja Chola I",
      "architecturalStyle": "Pure Dravidian Granite Architecture",
      "marvelDetails": "Built entirely of granite transported over 60 km without modern cranes. The crowning Kumbam (shikhara dome) is carved from a single 80-tonne granite block hauled up an earthen ramp 6 kilometers long.",
      "componentsToBuild": [
        {
          "id": "c1",
          "name": "Adhisthana (Granite Plinth)",
          "role": "Massive earthquake-resistant stone base carved with royal epigraphs.",
          "hint": "Place at the bottom foundation."
        },
        {
          "id": "c2",
          "name": "Garbhagriha (Sanctum Chamber)",
          "role": "Double-walled square sanctum enshrining the monolithic Shiva Lingam.",
          "hint": "Position directly above the plinth."
        },
        {
          "id": "c3",
          "name": "Vimana (13-Tiered Tower)",
          "role": "Pyramidal granitic tower soaring 66 meters into the sky.",
          "hint": "Assemble above the sanctum."
        },
        {
          "id": "c4",
          "name": "Kumbam (80-Tonne Monolithic Capstone)",
          "role": "The single massive dome crowning the soaring Vimana.",
          "hint": "Place atop the pyramidal tiers."
        },
        {
          "id": "c5",
          "name": "Golden Kalasha (Pinnacle Stupa)",
          "role": "Sacred gilded copper finial blessing the heavens.",
          "hint": "Crown the apex of the Kumbam."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Thai Pongal & Jallikattu",
      "season": "Month of Thai (Mid-January)",
      "rituals": "Families gather outside at sunrise to boil freshly harvested rice, milk, and jaggery in decorated earthen pots. When the milk froths and boils over, all rejoice shouting 'Pongalo Pongal!'.",
      "culinaryHeritage": "Sakkarai Pongal (sweet jaggery and ghee rice with cashews), sugarcane, and Ven Pongal.",
      "celebrationStyle": "Kolam rice flour patterns in courtyards, Mattu Pongal honoring cattle with painted horns, and traditional Jallikattu bull embraces.",
      "miniGameType": "pongal",
      "points": 180
    },
    "culture": {
      "title": "Bharatanatyam, Carnatic Music & Kanchipuram Weaves",
      "dance": "Bharatanatyam (ancient temple dance codified in Natya Shastra with expressive Bhavam, Ragam, and Talam).",
      "music": "Carnatic Classical vocal and instrumental traditions featuring Veena, Mridangam, and Nadaswaram.",
      "handicrafts": "Tanjore Gold Foil Paintings, Swamimalai bronze casting, Chettinad Athangudi tiles.",
      "textile": "Kanchipuram Pure Mulberry Silk Sarees with woven zari borders depicting temple motifs.",
      "lifestyle": "Filter coffee traditions, banana-leaf dining, kolam geometric art at dawn, and heritage agraharams.",
      "slideshowSlides": [
        {
          "title": "Bharatanatyam Temple Recital",
          "subtitle": "Classical Expression of Divine Rhythm",
          "description": "Expressive eyes, sculptural mudras, and rhythmic ankle bell footwork preserving two millennia of temple tradition.",
          "image": "assets/img/photos/1547153760-18fc86324498-w1000.jpg",
          "tag": "Dance"
        },
        {
          "title": "Brihadeeswarar Temple Vimana",
          "subtitle": "Engineering Miracle of 1010 CE",
          "description": "Soaring 216 feet into the Thanjavur skyline, carved completely from interlocked granite blocks without mortar.",
          "image": "assets/img/photos/1582510003544-4d00b7f74220-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Tanjore Gold Leaf Painting",
          "subtitle": "Devotional Art Encrusted with Gemstones",
          "description": "Sacred paintings adorned with 22-carat gold foil, Jaipur glass stones, and vivid natural mineral pigments.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Crafts"
        },
        {
          "title": "Traditional Kolam at Sunrise",
          "subtitle": "Sacred Mathematics at the Threshold",
          "description": "Intricate symmetrical geometric networks drawn with rice flour to welcome prosperity and feed harmless insects.",
          "image": "assets/img/photos/1605379399642-870262d3d051-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "kerala",
    "name": "Kerala",
    "capital": "Thiruvananthapuram",
    "region": "South",
    "badge": "God's Own Land of Muziris & Kathakali",
    "tagline": "Ancient Spice Ports, Matrilineal Legacies & Ayurvedic Healing Traditions",
    "heroImage": "assets/img/photos/1602216056096-3b40cc0c9944-w1200.jpg",
    "history": {
      "title": "Chera Kingdom & Ancient Port of Muziris",
      "era": "3rd Century BCE \u2013 18th Century CE",
      "keyFigures": [
        "Cheraman Perumal",
        "Marthanda Varma",
        "Kunjali Marakkar",
        "Adi Shankara"
      ],
      "highlights": "The ancient port of Muziris traded black pepper (black gold) with Rome, Phoenicia, and Egypt. The Chera kingdom nurtured universal Sanskrit aesthetics, maritime defense against European powers, and Kalaripayattu martial science.",
      "knowledgeSystem": "Ashtavaidya Ayurvedic medicine, Kerala School of Astronomy and Mathematics (Madhava's infinite series), and Vastu Vidya timber joinery.",
      "discoveryMission": {
        "name": "The Spice Hoard of Muziris",
        "description": "Navigate the ancient port excavations at Kodungallur to find Roman gold coins and pepper storage amphorae.",
        "objective": "Identify the spice that Roman author Pliny lamented drained the treasury of Rome.",
        "quizQuestion": "Which commodity from the Malabar coast was known as 'Black Gold' across the Roman Empire?",
        "quizOptions": [
          "Black Pepper",
          "Cardamom",
          "Nutmeg",
          "Clove"
        ],
        "correctAnswer": 0,
        "explanation": "Malabar black pepper was so treasured that Alaric the Visigoth demanded 3,000 pounds of pepper as ransom to lift the siege of Rome in 408 CE."
      },
      "artifact": {
        "id": "aranmula-kannadi",
        "name": "Aranmula Metal Alloy Mirror",
        "period": "18th Century CE",
        "lore": "A mysterious front-reflecting metal alloy mirror cast by master metalsmiths of Aranmula, eliminating secondary reflections.",
        "icon": "\ud83e\ude9e"
      },
      "points": 150
    },
    "games": {
      "title": "Kallu Kali & Kuttiyum Kolum",
      "gameKey": "pallanguzhi",
      "type": "Dexterity and Outdoor Sport",
      "origin": "Traditional Tharavadu courtyards and rural fields",
      "rules": [
        "Kallu Kali involves tossing 5 or 7 smooth river pebbles in air while scooping others from the ground before catching.",
        "Kuttiyum Kolum tests hand-eye coordination by striking a smaller tapered wooden peg with a longer wand.",
        "Vallam Kali brings hundreds of synchronized oarsmen paddling massive snake boats along backwaters."
      ],
      "equipment": "Smooth river stones, carved teak wooden pegs, or backwater Chundan Vallam.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Kerala Pitted Board",
        "playableTitle": "Experience Traditional Board Games",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Padmanabhapuram Palace & Nalukettu Mansions",
      "monumentName": "Padmanabhapuram Wooden Palace",
      "builderEra": "Constructed in 1601 CE by Iravi Varma Kulasekhara Perumal",
      "architecturalStyle": "Traditional Kerala Timber & Gable Architecture",
      "marvelDetails": "Built entirely without nails using ingenious interlocking rosewood, teak, and jackfruit timber joinery. Features black polished floors made from burnt coconut shells, egg whites, and herbal extracts.",
      "componentsToBuild": [
        {
          "id": "k1",
          "name": "Thara (Granite Foundation Plinth)",
          "role": "Raised laterite stone base preventing monsoon moisture seepage.",
          "hint": "Lay the stone foundation."
        },
        {
          "id": "k2",
          "name": "Koodam (Central Wooden Courtyard)",
          "role": "Airy open-sky atrium bringing natural ventilation and rainwater drainage.",
          "hint": "Assemble the inner courtyard frame."
        },
        {
          "id": "k3",
          "name": "Charupadi (Carved Wooden Benches)",
          "role": "Latticed rosewood veranda seating offering garden views.",
          "hint": "Attach along the peripheral halls."
        },
        {
          "id": "k4",
          "name": "Mukhappu (Steep Gabled Roof)",
          "role": "Intricate terracotta tiled double roof designed to shed tropical deluges.",
          "hint": "Install the sweeping gabled roof."
        },
        {
          "id": "k5",
          "name": "Thazhikakkuda (Copper Roof Finial)",
          "role": "Ornamental metal spire protecting the apex against lightning.",
          "hint": "Crown the highest roof ridge."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Onam & Athachamayam",
      "season": "Chingam (August \u2013 September)",
      "rituals": "Welcoming the benevolent mythical King Mahabali. Families craft ten concentric circles of floral carpets (Pookalam) outside doorways using fresh yellow marigolds, red ixora, and white jasmine.",
      "culinaryHeritage": "Grand Onasadya feast featuring 26 vegetarian dishes served on banana leaves with Payasam.",
      "celebrationStyle": "Pulikkali tiger dances, Kaikottikali clap dances, and Vallam Kali snake boat races.",
      "miniGameType": "pookalam",
      "points": 180
    },
    "culture": {
      "title": "Kathakali, Kalaripayattu & Kasavu Weaving",
      "dance": "Kathakali classical dance drama with Paccha (noble) green facial makeup, dramatic eye mudras, and towering headgear.",
      "music": "Sopana Sangeetam sung beside temple steps accompanied by the percussion of Idakka and Chenda.",
      "handicrafts": "Bell-metal lamps (Nilavilakku), Aranmula metal mirrors, carved Kathakali wooden masks.",
      "textile": "Kasavu off-white handloom cotton sarees and Mundu with woven pure gold zari borders.",
      "lifestyle": "Ayurvedic oil therapies, living in Nalukettu houses, and reverence for sacred groves (Kavu).",
      "slideshowSlides": [
        {
          "title": "Kathakali Paccha Warrior",
          "subtitle": "Sculptural Theatre of Colors",
          "description": "Green chutti facial makeup framing vivid eyes that depict epic narratives through 24 root mudras.",
          "image": "assets/img/photos/1602216056096-3b40cc0c9944-w1000.jpg",
          "tag": "Dance Drama"
        },
        {
          "title": "Onam Floral Pookalam",
          "subtitle": "Ten Days of Concentric Petal Mandalas",
          "description": "Vibrant harmony of yellow marigold, red hibiscus, and fragrant jasmine welcoming King Mahabali.",
          "image": "assets/img/photos/1596178065887-1198b6148b2b-w1000.jpg",
          "tag": "Festival Art"
        },
        {
          "title": "Vallam Kali Snake Boat Race",
          "subtitle": "Rhythm on the Punnamada Waters",
          "description": "Over 100 synchronized rowers surging through tranquil backwaters to the thunderous tempo of Vanchipattu songs.",
          "image": "assets/img/heritage-placeholder.svg",
          "tag": "Maritime Sport"
        },
        {
          "title": "Kalaripayattu Martial Science",
          "subtitle": "Mother of Asian Martial Arts",
          "description": "Fluid airborne strikes, animal postures, and flexible Urumi sword maneuvers practiced in sacred pit arenas.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "karnataka",
    "name": "Karnataka",
    "capital": "Bengaluru",
    "region": "South",
    "badge": "Realm of Vijayanagara & Hoysala Stonecraft",
    "tagline": "Golden Capitals of Hampi, Carved Soapstone Temples & Fragrant Sandalwood Forests",
    "heroImage": "assets/img/heritage-placeholder.svg",
    "history": {
      "title": "Vijayanagara Empire & Chalukyan Heritage",
      "era": "6th Century \u2013 17th Century CE",
      "keyFigures": [
        "Krishnadevaraya",
        "Pulakeshin II",
        "Rani Chennamma",
        "Basaveshwara"
      ],
      "highlights": "Hampi served as the magnificent imperial capital of the Vijayanagara Empire, described by Persian and Portuguese ambassadors as one of the richest metropolises in the medieval world with gem markets lining temple streets.",
      "knowledgeSystem": "Sharana Vachana philosophy promoting social equality, Badami rock excavation techniques, and Hoysala high-relief chloritic schist carving.",
      "discoveryMission": {
        "name": "Secrets of the Musical Pillars",
        "description": "Explore the Vittala Temple at Hampi to uncover how the 56 monolithic stone pillars resonate musical notes when struck.",
        "objective": "Identify the architectural era under which the stone chariot and musical mandapas reached their zenith.",
        "quizQuestion": "Which celebrated monarch ruled Vijayanagara during its cultural golden age of arts and literature?",
        "quizOptions": [
          "Emperor Krishnadevaraya",
          "Pulakeshin I",
          "Tipu Sultan",
          "Raja Raja Chola"
        ],
        "correctAnswer": 0,
        "explanation": "Emperor Krishnadevaraya (1509\u20131529 CE) of the Tuluva dynasty patronized monumental architecture and poet-scholars (Ashtadiggajas)."
      },
      "artifact": {
        "id": "hampi-stone-chariot",
        "name": "Miniature Carved Garuda Chariot",
        "period": "16th Century CE",
        "lore": "A model of the monolithic stone chariot shrine dedicated to Garuda in the courtyard of Vittala Temple.",
        "icon": "\ud83c\udfdb\ufe0f"
      },
      "points": 150
    },
    "games": {
      "title": "Pagade & Chowka Baara",
      "gameKey": "chaupar",
      "type": "Cruciform Race Board Game",
      "origin": "Royal courtyards of the Mysore Kingdom and Chalukyas",
      "rules": [
        "Players roll cowrie shells to determine moves along embroidered cruciform cloth arms.",
        "Tokens must travel around outer tracks, turn into the home lane, and enter the central square (Char-Koni).",
        "Landing on an opponent pawn sends it back to the beginning yard."
      ],
      "equipment": "Silk embroidered Pagade board, red and black turned ivory pawns, 6 cowrie shells.",
      "miniGameConfig": {
        "gameType": "chaupar",
        "boardName": "Royal Pagade Board",
        "playableTitle": "Play Royal Pagade Race",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Vittala Temple & Stone Chariot (Hampi)",
      "monumentName": "Hampi Stone Chariot",
      "builderEra": "16th Century CE by Vijayanagara Rulers",
      "architecturalStyle": "Vijayanagara Dravidian Granite Architecture",
      "marvelDetails": "A shrine designed in the likeness of a processional chariot. Though seemingly monolithic, its wheels, axles, and sanctum were carved from discrete granite blocks fitted together with hidden mortise and tenon joints.",
      "componentsToBuild": [
        {
          "id": "h1",
          "name": "Adhisthana Platform",
          "role": "Granite plinth carved with mythical battle scenes and floral rosettes.",
          "hint": "Form the foundational wheeled base."
        },
        {
          "id": "h2",
          "name": "Stone Chariot Wheels",
          "role": "Four intricately carved circular wheels that once rotated freely on stone axles.",
          "hint": "Attach wheels to both flanks."
        },
        {
          "id": "h3",
          "name": "Elephant Guardians",
          "role": "Two monolithic caparisoned stone elephants standing vigilant at the chariot front.",
          "hint": "Position at the front stairs."
        },
        {
          "id": "h4",
          "name": "Garuda Sanctum",
          "role": "Intricately carved chamber designed to house the vahana (mount) of Vishnu.",
          "hint": "Assemble above the platform."
        },
        {
          "id": "h5",
          "name": "Dravidian Shikhara Capstone",
          "role": "Brick and stucco tiered crest originally crowning the chariot sanctuary.",
          "hint": "Crown the sanctuary top."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Mysore Dasara & Kambala",
      "season": "Ashvin (September \u2013 October)",
      "rituals": "Ten days of royal splendor culminating in Vijayadashami. The caparisoned lead elephant carries the 750-kilogram golden howdah (Chinnada Ambari) bearing Goddess Chamundeshwari through Mysore.",
      "culinaryHeritage": "Mysore Pak (melt-in-mouth chickpea fudge made with pure ghee), Bisi Bele Bath, and Maddur Vada.",
      "celebrationStyle": "Illumination of Mysore Palace with 100,000 bulbs, torchlight parades, and exhilarating Kambala muddy buffalo races in coastal paddy fields.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Yakshagana, Mysore Silk & Channapatna Toys",
      "dance": "Yakshagana (dynamic folk theatre blending mythological dialogue, high-energy leaps, and elaborate headdresses).",
      "music": "Mysore classical Carnatic traditions, Haridasa devotional music (Purandara Dasa, father of Carnatic music).",
      "handicrafts": "Channapatna ivory-wood non-toxic vegetable lacquer toys, Bidriware silver inlay on blackened alloy.",
      "textile": "Mysore Pure Crepe Silk sarees with pure gold zari borders and Ilkal sarees with Tope Teni pallu.",
      "lifestyle": "Sandalwood carving traditions, filter coffee culture, and heritage palace hospitality.",
      "slideshowSlides": [
        {
          "title": "Yakshagana Dramatic Performance",
          "subtitle": "Celestial Dance of Coastal Karnataka",
          "description": "Acrobatic spins, thundering Chande drum rhythms, and majestic crown ornamentation bringing Mahabharata sagas to life.",
          "image": "assets/img/heritage-placeholder.svg",
          "tag": "Folk Theatre"
        },
        {
          "title": "Stone Chariot of Vittala Temple",
          "subtitle": "Eternal Symbol of Vijayanagara Glory",
          "description": "Carved with such architectural precision that its monumental wheels were designed to revolve on stone axes.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Channapatna Lacquerware Toys",
          "subtitle": "Centuries-Old Royal Toycraft of Tipu Sultan",
          "description": "Turned Wrightia tinctoria wood polished to a glossy sheen using natural vegetable dyes and lacquer.",
          "image": "assets/img/photos/1563245372-f21724e3856d-w1000.jpg",
          "tag": "Crafts"
        },
        {
          "title": "Mysore Palace Royal Illumination",
          "subtitle": "Radiance of the Wodeyar Dynasts",
          "description": "Over 97,000 incandescent lamps casting a warm golden glow across Indo-Saracenic arches during Dasara.",
          "image": "assets/img/photos/1580835239846-5bb9ce03c8c3-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "andhra-pradesh",
    "name": "Andhra Pradesh",
    "capital": "Amaravati",
    "region": "South",
    "badge": "Heart of Kuchipudi & Satavahana Glory",
    "tagline": "Amaravati Buddhist Heritage, Lepakshi Wonders & Kalamkari Artistry",
    "heroImage": "assets/img/heritage-placeholder.svg",
    "history": {
      "title": "Satavahana Empire & Amaravati Civilization",
      "era": "2nd Century BCE \u2013 3rd Century CE",
      "keyFigures": [
        "Gautamiputra Satakarni",
        "Acharya Nagarjuna",
        "Sri Krishnadevaraya",
        "Annamacharya"
      ],
      "highlights": "The Satavahanas pioneered trans-oceanic Roman maritime trade and fostered the world-famous Amaravati School of Buddhist Art. Nagarjunakonda became a premier Asian centre of Mahayana Buddhist scholastic philosophy.",
      "knowledgeSystem": "Madhyamaka philosophy of Acharya Nagarjuna, Ayurvedic alchemy (Rasashastra), and Telugu literary metric prosody.",
      "discoveryMission": {
        "name": "The Hanging Pillar of Lepakshi",
        "description": "Investigate the Veerabhadra Temple at Lepakshi to discover the mystery of the hanging pillar that does not touch the floor.",
        "objective": "Identify the Vijayanagara treasurer brothers Virupanna and Veeranna who built the temple complex.",
        "quizQuestion": "Which monolithic animal sculpture at Lepakshi is one of the largest carved out of a single granite boulder in India?",
        "quizOptions": [
          "Monolithic Nandi Bull",
          "Flying Garuda",
          "Roaring Lion",
          "Royal Elephant"
        ],
        "correctAnswer": 0,
        "explanation": "The monolithic Lepakshi Nandi is 4.5 meters high and 8.2 meters long, carved with exquisite necklaces and bells from a single granitic hillock."
      },
      "artifact": {
        "id": "kalamkari-tree-of-life",
        "name": "Srikalahasti Tree of Life Kalamkari",
        "period": "17th Century CE",
        "lore": "A hand-painted organic cotton textile depicting mythological flora and fauna created with bamboo pens and natural vegetable pigments.",
        "icon": "\ud83c\udfa8"
      },
      "points": 150
    },
    "games": {
      "title": "Ashta Chamma & Tokkudu Billa",
      "gameKey": "chaupar",
      "type": "Traditional Race and Agility Game",
      "origin": "Rural villages and royal courtyards of the Deccan",
      "rules": [
        "Played on a 5x5 square grid board using 4 cowrie shells as dice.",
        "Shells landing face-up calculate points (0 to 8).",
        "Players maneuver tokens around outer perimeter into the inner sanctum home.",
        "Opponents' tokens on non-safe cross squares can be knocked out."
      ],
      "equipment": "Chalked floor or cloth 5x5 board, 4 cowrie shells, colored seeds or wooden counters.",
      "miniGameConfig": {
        "gameType": "chaupar",
        "boardName": "Ashta Chamma Grid",
        "playableTitle": "Play Ashta Chamma Race",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Veerabhadra Temple (Lepakshi)",
      "monumentName": "Lepakshi Veerabhadra Temple",
      "builderEra": "1530 CE by Virupanna Nayaka",
      "architecturalStyle": "Vijayanagara Stone Architecture & Fresco Art",
      "marvelDetails": "Features the legendary Hanging Pillar supported barely on one edge, and the ceiling murals covering the Natya Mandapa which constitute the finest surviving medieval fresco paintings in India.",
      "componentsToBuild": [
        {
          "id": "a1",
          "name": "Adhisthana Basalt Base",
          "role": "Elevated stone plinth bearing friezes of dancers, drummers, and mythical Yalis.",
          "hint": "Foundation level."
        },
        {
          "id": "a2",
          "name": "Natya Mandapa (Hall of Dance)",
          "role": "Open pavilion with 70 carved stone pillars portraying celestial musicians.",
          "hint": "Erect the central dancing hall."
        },
        {
          "id": "a3",
          "name": "The Hanging Pillar",
          "role": "Architectural marvel suspended inches above the stone floor.",
          "hint": "Fit the famous column."
        },
        {
          "id": "a4",
          "name": "Nagalinga Shrine",
          "role": "Seven-hooded serpent carved from a single boulder shielding a granite Lingam.",
          "hint": "Position in the courtyard."
        },
        {
          "id": "a5",
          "name": "Gopuram Gateway",
          "role": "Towered entrance gateway adorned with guardian dvarapalas.",
          "hint": "Finish the grand gateway."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Sankranti & Ugadi",
      "season": "Pushya / Magha (Mid-January)",
      "rituals": "Three-day harvest festival: Bhogi bonfires to discard old burdens, Makara Sankranti with colorful Muggu rangoli in courtyards, and Kanuma honoring cattle.",
      "culinaryHeritage": "Ariselu (crispy rice and jaggery cakes), Bobbatlu, and Shadruchula Ugadi Pachadi balancing 6 tastes of life.",
      "celebrationStyle": "Haridasu wandering minstrels singing hymns with brass urns balanced on heads, Bull races, and vibrant kite flying.",
      "miniGameType": "pongal",
      "points": 180
    },
    "culture": {
      "title": "Kuchipudi Classical Dance & Kalamkari Craft",
      "dance": "Kuchipudi (originating in Kuchipudi village, combining classical footwork, Tarangam brass plate balance, and Sanskrit drama).",
      "music": "Carnatic Sangeet legacy of Tyagaraja and Annamacharya hymns at Tirupati.",
      "handicrafts": "Srikalahasti and Machilipatnam Kalamkari pen-and-block art, Kondapalli soft Poniki wood toys.",
      "textile": "Venkatagiri, Uppada Jamdani, and Dharmavaram pure silk sarees with rich golden pallus.",
      "lifestyle": "Muggu rangoli drawn with rice powder every dawn, spicy culinary traditions, and temple community gatherings.",
      "slideshowSlides": [
        {
          "title": "Kuchipudi Tarangam Performance",
          "subtitle": "Dance on the Rims of Brass",
          "description": "Dancers execute complex rhythmic foot patterns while balancing effortlessly on the edge of a brass plate.",
          "image": "assets/img/heritage-placeholder.svg",
          "tag": "Classical Dance"
        },
        {
          "title": "Monolithic Lepakshi Nandi",
          "subtitle": "Granite Majesty of the 16th Century",
          "description": "A single giant granite boulder shaped into a sublime resting bull adorned with carved bells and garlands.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Kalamkari Botanical Tapestry",
          "subtitle": "Natural Pigments on Pure Cotton",
          "description": "Intricate Ramayana narratives drawn by master artisans using sharpened bamboo reeds and madder root dyes.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Handicrafts"
        },
        {
          "title": "Sunrise Muggu Patterns",
          "subtitle": "Symmetry and Sacred Geometry",
          "description": "Daily flour mandalas drawn at house entrances that symbolize abundance and harmonious living with nature.",
          "image": "assets/img/photos/1605379399642-870262d3d051-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "telangana",
    "name": "Telangana",
    "capital": "Hyderabad",
    "region": "South",
    "badge": "Realm of Kakatiyas & Golconda Splendor",
    "tagline": "Floating Bricks of Ramappa, Floral Magic of Bathukamma & Royal Nizami Heritage",
    "heroImage": "assets/img/photos/1605649487212-47bdab064df7-w1200.jpg",
    "history": {
      "title": "Kakatiya Dynasty & Golconda Sultanate",
      "era": "11th Century \u2013 18th Century CE",
      "keyFigures": [
        "Rani Rudrama Devi",
        "Ganapati Deva",
        "Quli Qutb Shah",
        "Komaram Bheem"
      ],
      "highlights": "The Kakatiya kingdom, famously led by warrior monarch Rani Rudrama Devi, built advanced irrigation tank networks (Chain-of-Tanks) that nourish the Deccan to this day. Later, Golconda became the diamond capital of the world, mining the Koh-i-Noor and Hope diamonds.",
      "knowledgeSystem": "Kakatiya hydraulic cascade engineering, metallurgy of floating porous bricks, and Bidri silver-zinc inlay.",
      "discoveryMission": {
        "name": "The Mystery of Floating Bricks",
        "description": "Analyze the bricks of the Ramappa Temple in Palampet to discover why they float on water.",
        "objective": "Determine the lightweight porous volcanic/clay composition developed by Kakatiya engineers in 1213 CE.",
        "quizQuestion": "Which UNESCO World Heritage Temple in Telangana was named after its chief sculptor Ramappa?",
        "quizOptions": [
          "Ramappa Temple (Ramalingeswara)",
          "Thousand Pillar Temple",
          "Bhadrachalam Temple",
          "Yadagirigutta Temple"
        ],
        "correctAnswer": 0,
        "explanation": "Ramappa Temple is perhaps the only temple in India named after its visionary sculptor, Ramappa, who worked 40 years to complete it."
      },
      "artifact": {
        "id": "kakatiya-torana",
        "name": "Kakatiya Kala Thoranam Arch",
        "period": "12th Century CE",
        "lore": "A masterwork ornamental archway carved in black basalt, adopted as the official emblem of the state of Telangana.",
        "icon": "\u26e9\ufe0f"
      },
      "points": 150
    },
    "games": {
      "title": "Daadi & Pachisi",
      "gameKey": "chaupar",
      "type": "Nine Men's Morris Alignment Game",
      "origin": "Stone platforms of Kakatiya temple courtyards",
      "rules": [
        "Two players take turns placing 9 tokens on intersection points of three concentric squares.",
        "Forming a line of three (Daadi / Mill) allows the player to remove one opponent token.",
        "Once all tokens are placed, players slide them along connected lines to trap the opponent."
      ],
      "equipment": "Inscribed stone or cloth board with 24 intersection points, 18 game pieces (tamarind seeds vs pebbles).",
      "miniGameConfig": {
        "gameType": "chaupar",
        "boardName": "Daadi Game Board",
        "playableTitle": "Play Strategic Daadi",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Ramappa Temple & Charminar",
      "monumentName": "Ramappa Temple (Palampet)",
      "builderEra": "Constructed in 1213 CE under Kakatiya General Recharla Rudra",
      "architecturalStyle": "Kakatiya Basalt & Floating Brick Architecture",
      "marvelDetails": "Built upon a 6-foot star-shaped platform using sandbox earthquake-absorbing technology. The superstructure vimana was crafted using ultra-light porous bricks that float when immersed in water.",
      "componentsToBuild": [
        {
          "id": "t1",
          "name": "Star-Shaped Upapitha",
          "role": "Elevated cruciform plinth resting on sandbox anti-seismic foundation.",
          "hint": "Assemble the star foundation."
        },
        {
          "id": "t2",
          "name": "Carved Basalt Pillars",
          "role": "Lathe-turned mirror-polished black basalt pillars reflecting light.",
          "hint": "Erect the inner mandapa pillars."
        },
        {
          "id": "t3",
          "name": "Madanika Bracket Figures",
          "role": "Slender celestial dancers sculpted in dynamic postures under the eaves.",
          "hint": "Attach bracket figures to columns."
        },
        {
          "id": "t4",
          "name": "Floating Brick Shikhara",
          "role": "Pyramidal tower constructed of lightweight sponge-like bricks.",
          "hint": "Place the lightweight tower."
        },
        {
          "id": "t5",
          "name": "Nandi Mandapa",
          "role": "Alert granite Nandi bull depicted in an attentive listening posture.",
          "hint": "Place in the facing pavilion."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Bathukamma & Bonalu",
      "season": "Bhadrapada / Ashvin (September \u2013 October)",
      "rituals": "Women gather at twilight singing folk songs around Bathukamma: a cone-shaped floral mound arranged with seven concentric layers of seasonal wild blossoms (Gunugu, Thangedu, Gummadi).",
      "culinaryHeritage": "Maleeda (jaggery and roti sweet balls), Saddula Bathukamma dishes (sesame rice, tamarind rice), and Hyderabadi Biryani.",
      "celebrationStyle": "Bonalu processions with women carrying brass pots decorated with neem leaves and turmeric on their heads, and Pothuraju whip dances.",
      "miniGameType": "pookalam",
      "points": 180
    },
    "culture": {
      "title": "Perini Shiva Tandavam, Pochampally Ikat & Bidriware",
      "dance": "Perini Sivatandavam (ancient warrior dance performed by soldiers before marching to battlefield, revived from Ramappa sculptures).",
      "music": "Deccan Qawwali traditions, Oggu Katha folk ballads honoring rural folk deities.",
      "handicrafts": "Bidriware (silver inlay on zinc-copper blackened alloy), Cheriyal scroll narrative paintings, Pembarthi metalcraft.",
      "textile": "Pochampally Ikat (Telia Rumal double-ikat dyed silk sarees with mathematical geometric precision).",
      "lifestyle": "Irani Chai and Osmania biscuit cafe culture, communal floral gatherings, and lakeside evening promenades.",
      "slideshowSlides": [
        {
          "title": "Bathukamma Floral Celebration",
          "subtitle": "Worship of Mother Nature in Blossom",
          "description": "Concentric rings of medicinal wild flowers floating gracefully in serene temple tanks during twilight.",
          "image": "assets/img/photos/1605649487212-47bdab064df7-w1000.jpg",
          "tag": "Floral Festival"
        },
        {
          "title": "Ramappa Temple Bracket Sculptures",
          "subtitle": "Black Basalt Masterpieces of 1213 CE",
          "description": "Intricate Madanika dancers sculpted with fine jewelry, delicate fingers, and mirror-polished stone surfaces.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Bidriware Silver Inlay Vase",
          "subtitle": "Centuries-Old Metal Alchemy of the Deccan",
          "description": "Pure silver wire hand-hammered into engraved zinc alloy and blackened with historic Bidar fort soil.",
          "image": "assets/img/photos/1563245372-f21724e3856d-w1000.jpg",
          "tag": "Metalcraft"
        },
        {
          "title": "Pochampally Double-Ikat Weave",
          "subtitle": "Geometric Poetry on Silk and Cotton",
          "description": "Yarn tie-dyed with microscopic accuracy before weaving to generate mesmerizing kaleidoscope motifs.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Textiles"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "maharashtra",
    "name": "Maharashtra",
    "capital": "Mumbai",
    "region": "West",
    "badge": "Fortress Realm of Shivaji Maharaj",
    "tagline": "Monolithic Ellora Kailash Temple, Warli Tribal Art & Ganeshotsav Splendor",
    "heroImage": "assets/img/photos/1570168007204-dfb528c6958f-w1200.jpg",
    "history": {
      "title": "Maratha Empire & Rock-Cut Sanctuaries",
      "era": "2nd Century BCE \u2013 19th Century CE",
      "keyFigures": [
        "Chhatrapati Shivaji Maharaj",
        "Sant Dnyaneshwar",
        "Sant Tukaram",
        "Ahilyabai Holkar"
      ],
      "highlights": "Chhatrapati Shivaji Maharaj pioneered naval defense and guerrilla warfare (Ganimi Kava). The ancient Sahyadri cliffs saw the excavation of rock-cut sanctuaries like Ajanta and the monumental Kailash Temple at Ellora, carved top-down from a single volcanic mountain.",
      "knowledgeSystem": "Varkari Bhakti egalitarian movement, hill fort water-harvesting cisterns, and Mallakhamb sports science.",
      "discoveryMission": {
        "name": "The Monolithic Mystery of Cave 16",
        "description": "Descend into the Ellora Caves to examine how 200,000 tonnes of basalt rock were chiseled away to carve Kailash Temple.",
        "objective": "Identify the top-to-bottom excavation technique that left zero margin for error.",
        "quizQuestion": "How was the magnificent Kailash Temple at Ellora carved out of the basalt cliff?",
        "quizOptions": [
          "Top-down excavation from a single rock cliff",
          "Assembled from granite blocks",
          "Poured limestone concrete",
          "Carved inside an existing natural cave"
        ],
        "correctAnswer": 0,
        "explanation": "Rashtrakuta sculptors started from the cliff summit and carved vertically downwards, carving intricate multi-storey temples without scaffolding."
      },
      "artifact": {
        "id": "shivaji-bhavani-talwar",
        "name": "Bhavani Talwar Model",
        "period": "17th Century CE",
        "lore": "A reproduction of the legendary curved Maratha cavalry sword blessed by Goddess Bhavani of Tuljapur.",
        "icon": "\u2694\ufe0f"
      },
      "points": 150
    },
    "games": {
      "title": "Viti Dandu & Mallakhamb",
      "gameKey": "pallanguzhi",
      "type": "Traditional Outdoor & Gymnastic Sport",
      "origin": "Maratha training grounds and rustic rural pastures",
      "rules": [
        "Viti Dandu involves striking a small pointed oval wooden peg (Viti) with a larger baton (Dandu) to flick it into air.",
        "Mallakhamb requires gymnasts to perform feats of balance, twists, and holds on a vertical polished teak pole.",
        "Lagori tests team speed as one team stacks 7 stones while opponents try to strike them with a ball."
      ],
      "equipment": "Hardwood Viti and Dandu, polished wooden Mallakhamb pole oiled with castor oil, or 7 flat river stones.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Strategy Board",
        "playableTitle": "Experience Traditional Sports",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Kailash Temple (Ellora Cave 16)",
      "monumentName": "Kailash Rock-Cut Temple",
      "builderEra": "8th Century CE under Rashtrakuta King Krishna I",
      "architecturalStyle": "Monolithic Dravidian Rock-Cut Architecture",
      "marvelDetails": "World's largest monolithic rock structure. Artisans carved 400,000 tons of rock over several decades with chisels and hammers alone, creating a full-scale double-storey temple with life-sized sculpted elephants.",
      "componentsToBuild": [
        {
          "id": "m1",
          "name": "Monolithic Courtyard Escarpment",
          "role": "Deep U-shaped trench cut into the basalt hillside.",
          "hint": "Carve the foundation court."
        },
        {
          "id": "m2",
          "name": "Gajathara (Elephant Plinth)",
          "role": "Frieze of life-sized elephants appearing to shoulder the entire temple.",
          "hint": "Erect the supporting elephant base."
        },
        {
          "id": "m3",
          "name": "Maha Mandapa Hall",
          "role": "Central hypostyle hall supported by 16 intricately carved stone pillars.",
          "hint": "Carve the central hall."
        },
        {
          "id": "m4",
          "name": "Dravidian Shikhara Pinnacle",
          "role": "Three-tiered pyramidal stone tower carved directly out of the mountain.",
          "hint": "Form the lofty stone tower."
        },
        {
          "id": "m5",
          "name": "Monolithic Victory Dhwajasthambhas",
          "role": "Twin freestanding ornamental pillars standing proud in the courtyard.",
          "hint": "Erect the twin stone pillars."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Ganeshotsav & Dahi Handi",
      "season": "Bhadrapada (August \u2013 September)",
      "rituals": "Ten days of public celebration initiated by Lokmanya Tilak to unite communities. Clay idols of Lord Ganesha are welcomed with Dhol-Tasha beats and immersed on Anant Chaturdashi with chants of 'Ganpati Bappa Morya!'.",
      "culinaryHeritage": "Steamed Ukadiche Modak (rice flour dumplings filled with fresh coconut, jaggery, and nutmeg steamed in turmeric leaves).",
      "celebrationStyle": "Gokulashtami human pyramids scaling multiple storeys to break high-hanging curd pots (Dahi Handi).",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Lavani, Warli Painting & Paithani Weaves",
      "dance": "Lavani (rhythmic folk dance performed to the rapid beat of Dholki, dressed in nine-yard Nauvari sarees).",
      "music": "Natya Sangeet classical musical drama, Gondhal narrative songs, and Bhakti Abhangas.",
      "handicrafts": "Warli tribal wall art using rice paste on mud walls, Kolhapuri handcrafted leather chappals.",
      "textile": "Paithani pure silk sarees featuring oblique square borders and pallus with woven golden peacocks (Mor).",
      "lifestyle": "Poha and Misal breakfast traditions, Ganesh pandal festivities, and Sahyadri trekking lore.",
      "slideshowSlides": [
        {
          "title": "Lavani Rhythmic Folk Dance",
          "subtitle": "Poetry of the Nine-Yard Saree",
          "description": "Electrifying footwork and soulful facial expressions accompanied by the pulsating rhythms of the Dholki.",
          "image": "assets/img/photos/1570168007204-dfb528c6958f-w1000.jpg",
          "tag": "Folk Dance"
        },
        {
          "title": "Kailash Monolithic Temple",
          "subtitle": "Mountain Chiseled from the Top Down",
          "description": "Cave 16 of Ellora: an entire multi-storey Dravidian temple complex sculpted out of a single volcanic cliff.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Warli Tribal Mural Art",
          "subtitle": "Ancient Geometric Harmony of Forest Spirits",
          "description": "Basic circles, triangles, and squares drawn in rice paste depicting Tarpa dances and harmony with wildlife.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Folk Art"
        },
        {
          "title": "Ganeshotsav Visarjan Procession",
          "subtitle": "Ecstasy of Dhol-Tasha Rhythms",
          "description": "Thousands of percussionists in traditional saffron phetas playing synchronized rhythms during festive immersion.",
          "image": "assets/img/photos/1567157577867-05ccb1388e66-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "gujarat",
    "name": "Gujarat",
    "capital": "Gandhinagar",
    "region": "West",
    "badge": "Cradle of Lothal & Sacred Somnath",
    "tagline": "Rani ki Vav Stepwells, Vibrant Garba Circles & Historic Dholavira Reservoirs",
    "heroImage": "assets/img/heritage-placeholder.svg",
    "history": {
      "title": "Harappan Maritime Ports & Solanki Dynasty",
      "era": "2500 BCE \u2013 13th Century CE",
      "keyFigures": [
        "Rani Udayamati",
        "Siddharaj Jaisinh",
        "Mahatma Gandhi",
        "Sardar Vallabhbhai Patel"
      ],
      "highlights": "Lothal had the world's oldest known tidal dockyard connected to the Sabarmati river, trading beads and copper with Mesopotamia. The Solanki Golden Age built Rani ki Vav (Queen's Stepwell) and the Sun Temple of Modhera.",
      "knowledgeSystem": "Dholavira hydraulic rainwater reservoirs, Patola double-ikat geometric weaving algorithms, and Jain manuscript preservation.",
      "discoveryMission": {
        "name": "The Subterranean Sanctum of Rani ki Vav",
        "description": "Descend seven terraces into the earth to find the sculpted relief of Vishnu reclining on Sheshanaga.",
        "objective": "Understand how the inverted temple stepwell cooled desert travelers while sanctifying groundwater.",
        "quizQuestion": "Which queen commissioned the world-famous Rani ki Vav stepwell in memory of her departed spouse King Bhima I?",
        "quizOptions": [
          "Rani Udayamati",
          "Rani Rudrama Devi",
          "Rani Durgavati",
          "Rani Ahilyabai"
        ],
        "correctAnswer": 0,
        "explanation": "Rani Udayamati commissioned this subterranean architectural masterpiece at Patan around 1063 CE as an enduring memorial."
      },
      "artifact": {
        "id": "lothal-bead-necklace",
        "name": "Harappan Carnelian Bead Necklace",
        "period": "2200 BCE",
        "lore": "Micro-drilled carnelian and steatite beads polished in Lothal bead workshops and exported across the Persian Gulf.",
        "icon": "\ud83d\udcff"
      },
      "points": 150
    },
    "games": {
      "title": "Chopat & Kho-Kho",
      "gameKey": "chaupar",
      "type": "Cross-Board Strategy & Tag Team Sport",
      "origin": "Ancient royal courts of Saurashtra and Gujarat",
      "rules": [
        "Chopat is played on a cross-shaped cloth board with cowrie shells determining the moves.",
        "Players must navigate four pawns safely around the board while avoiding capture.",
        "Kho-Kho was formalized here into a lightning-fast pursuit game testing reflexes and endurance."
      ],
      "equipment": "Embroidered wool or silk Chopat board, colored wooden pieces, 6 cowrie shells.",
      "miniGameConfig": {
        "gameType": "chaupar",
        "boardName": "Royal Chopat Board",
        "playableTitle": "Play Gujarati Chopat",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Rani ki Vav (The Queen's Stepwell, Patan)",
      "monumentName": "Rani ki Vav",
      "builderEra": "11th Century CE by Rani Udayamati",
      "architecturalStyle": "Maru-Gurjara Subterranean Architecture",
      "marvelDetails": "Constructed as an inverted temple highlighting the sanctity of water. Features seven levels of pillared galleries with over 500 principal sculptures and a thousand minor ones of supreme religious, mythological, and secular imagery.",
      "componentsToBuild": [
        {
          "id": "g1",
          "name": "Stepped Corridor Approach",
          "role": "Straight stepping corridor descending deep into the water table.",
          "hint": "Excavate the stepped entry ramp."
        },
        {
          "id": "g2",
          "name": "Multi-Tiered Pillared Pavilions",
          "role": "Seven storeys of ornately carved sandstone columns and brackets.",
          "hint": "Erect the seven descending pavilions."
        },
        {
          "id": "g3",
          "name": "Sculpted Niche Panels",
          "role": "Over 500 statues of Dashavatara, celestial Apsaras, and Nagakanyas.",
          "hint": "Adorn the side walls with sculptures."
        },
        {
          "id": "g4",
          "name": "Deep Circular Well Shaft",
          "role": "Circular water shaft lined with interlocked carved ashlar masonry.",
          "hint": "Construct the deepest water well."
        },
        {
          "id": "g5",
          "name": "Torana Gateway Arch",
          "role": "Elaborate cusped archway greeting visitors at ground level.",
          "hint": "Crown the surface entrance."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Navratri & Uttarayan",
      "season": "Ashvin (September \u2013 October) & Mid-January",
      "rituals": "Navratri is celebrated over nine nights with vibrant circular Garba dances around a perforated earthen lamp (Garbha Deep) honoring Goddess Amba. Uttarayan fills skies with millions of colorful kites on Makar Sankranti.",
      "culinaryHeritage": "Jalebi-Fafda, Undhiyu (slow-cooked earthen pot winter vegetable delicacy), and Mohanthal.",
      "celebrationStyle": "Chaniya Cholis adorned with mirrors, clacking Dandiya sticks, and international kite battles.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Garba, Patola Weaving & Rogan Art",
      "dance": "Garba (circular folk dance with rhythmic claps, symbolizing the circle of life revolving around the divine centre).",
      "music": "Sugam Sangeet, Dayro folk storytelling, and melodic Shehnai and Dhol beats.",
      "handicrafts": "Rogan castor oil paint art of Nirona, Sankheda lacquered furniture, Kutch mirror-work embroidery.",
      "textile": "Patan Patola (master double-ikat silk weaving where both warp and weft are tie-dyed with total precision).",
      "lifestyle": "Vegetarian culinary excellence, entrepreneurial trade ethos, and colorful desert lifestyle.",
      "slideshowSlides": [
        {
          "title": "Navratri Garba Dance Circle",
          "subtitle": "Nine Nights of Rhythmic Devotion",
          "description": "Concentric rings of dancers clad in mirrored attire moving in graceful synchrony under festive lights.",
          "image": "assets/img/photos/1547153760-18fc86324498-w1000.jpg",
          "tag": "Folk Dance"
        },
        {
          "title": "Rani ki Vav Sculpted Corridor",
          "subtitle": "UNESCO Inverted Subterranean Palace",
          "description": "Seven descending terraces of exquisite Maru-Gurjara sculptures honoring water as the elixir of life.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Kutch Mirror-Work Embroidery",
          "subtitle": "Reflecting the Radiance of the Desert",
          "description": "Intricate needlework embedding tiny mica mirrors into brightly dyed cotton and silk fabrics.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Textiles"
        },
        {
          "title": "Uttarayan Kite Festival",
          "subtitle": "Skies Ablaze with Joy and Color",
          "description": "Rooftops echoing with cries of 'Kai Po Che!' as colorful paper kites soar above historic Ahmedabad.",
          "image": "assets/img/photos/1514565131-fce0801e5785-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "rajasthan",
    "name": "Rajasthan",
    "capital": "Jaipur",
    "region": "West",
    "badge": "Land of Forts & Rajput Valor",
    "tagline": "Golden Fort of Jaisalmer, Kumbhalgarh's Great Wall & Ghoomar Elegance",
    "heroImage": "assets/img/photos/1599661046289-e31897846e41-w1200.jpg",
    "history": {
      "title": "Rajput Dynasties & Desert Citadels",
      "era": "6th Century \u2013 20th Century CE",
      "keyFigures": [
        "Maharana Pratap",
        "Mirabai",
        "Rana Kumbha",
        "Prithviraj Chauhan"
      ],
      "highlights": "The Mewar, Marwar, and Dhundhar kingdoms resisted empires through epic valor. Maharana Pratap's legendary defiance at Haldighati and Rana Kumbha's construction of 32 hill fortresses created enduring emblems of chivalry and architectural majesty.",
      "knowledgeSystem": "Bawadi stepwell groundwater collection, Rajput miniature painting schools, and desert astronomical observatories (Jantar Mantar).",
      "discoveryMission": {
        "name": "The Great Wall of Kumbhalgarh",
        "description": "Walk the perimeter battlements of Kumbhalgarh Fort, the second longest continuous stone wall in the world.",
        "objective": "Identify the defensive architectural features that made this hill fortress virtually impregnable.",
        "quizQuestion": "Which hill fort in Rajasthan boasts a defensive wall stretching 36 kilometers across the Aravalli hills?",
        "quizOptions": [
          "Kumbhalgarh Fort",
          "Amer Fort",
          "Chittorgarh Fort",
          "Mehrangarh Fort"
        ],
        "correctAnswer": 0,
        "explanation": "Kumbhalgarh Fort was built by Rana Kumbha in the 15th century, protected by its formidable 36-km wall, wide enough for eight horses abreast."
      },
      "artifact": {
        "id": "jaipur-blue-pottery",
        "name": "Royal Blue Pottery Urn",
        "period": "19th Century CE",
        "lore": "A glazed quartz-paste urn decorated with cobalt blue oxide and turquoise Arabesque floral motifs.",
        "icon": "\ud83c\udffa"
      },
      "points": 150
    },
    "games": {
      "title": "Chaupar & Satoliya",
      "gameKey": "chaupar",
      "type": "Traditional Royal Board Game & Seven Stones",
      "origin": "Palace courtyards of Amer, Mewar, and Jodhpur",
      "rules": [
        "Chaupar is played with 16 pawns on an embroidered cruciform velvet mat.",
        "Players cast three long wooden dice (Pasa) to determine moves and knock out opponent pawns.",
        "Satoliya (Pithu) tests throwing precision as one team stacks seven flat stones while dodging ball throws."
      ],
      "equipment": "Velvet embroidered Chaupar board, turned wood or brass pawns, three rectangular wooden dice.",
      "miniGameConfig": {
        "gameType": "chaupar",
        "boardName": "Royal Chaupar Court",
        "playableTitle": "Play Royal Chaupar",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Mehrangarh Fort & Kumbhalgarh Great Wall",
      "monumentName": "Mehrangarh Fort (Jodhpur)",
      "builderEra": "Founded in 1459 CE by Rao Jodha",
      "architecturalStyle": "Rajput Citadel Architecture",
      "marvelDetails": "Perched on a perpendicular cliff 410 feet above Jodhpur. Its massive stone walls merge seamlessly with the rock foundations, housing opulent palaces with intricate sandstone latticework (Jali).",
      "componentsToBuild": [
        {
          "id": "r1",
          "name": "Cliff Bastion Foundations",
          "role": "Massive stone battlements merging directly into the volcanic rock cliff.",
          "hint": "Secure the cliffside base."
        },
        {
          "id": "r2",
          "name": "Jai Pol (Victory Gate)",
          "role": "Seven fortified gates built to withstand battering by war elephants.",
          "hint": "Erect the monumental entry gate."
        },
        {
          "id": "r3",
          "name": "Moti Mahal (Pearl Palace)",
          "role": "Hall of private audience decorated with crushed seashell plaster and gold leaf.",
          "hint": "Construct the grand palace hall."
        },
        {
          "id": "r4",
          "name": "Jharokha Carved Balconies",
          "role": "Ornate sandstone bay windows with micro-perforated latticework screens.",
          "hint": "Install latticed balconies."
        },
        {
          "id": "r5",
          "name": "Kilkila Rampart Cannons",
          "role": "Historic brass cannons mounted high on the fort ramparts.",
          "hint": "Arm the high ramparts."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Pushkar Camel Fair & Gangaur",
      "season": "Kartik (October \u2013 November) & Chaitra (March \u2013 April)",
      "rituals": "Gangaur honors Goddess Gauri with women carrying clay idols through royal streets with brass water pots. Pushkar fair brings 50,000 decorated camels, folk musicians, and holy dips in Pushkar Lake.",
      "culinaryHeritage": "Dal Baati Churma (baked wheat balls dipped in pure desi ghee served with spicy lentils and sweet crushed wheat), Ghevar, and Ker Sangri.",
      "celebrationStyle": "Kalbelia snake-charmer swirling dances, turban tying contests, and royal elephant processions.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Ghoomar, Phad Painting & Blue Pottery",
      "dance": "Ghoomar (graceful circular dance performed by women twirling in multi-colored flowing Ghagras).",
      "music": "Langa and Manganiyar desert musicians playing Kamayacha and Sarangi, singing desert ballads.",
      "handicrafts": "Phad folk scroll painting on cloth, Jaipur Blue Pottery, Sanganeri block printing.",
      "textile": "Bandhani and Leheriya tie-dye textiles, Kota Doria gossamer sarees with Khat checks.",
      "lifestyle": "Reverence for camels and peacocks, turban styling signifying clan identity, and fort havelis.",
      "slideshowSlides": [
        {
          "title": "Ghoomar Royal Dance",
          "subtitle": "Swirling Colors of Rajput Courts",
          "description": "Graceful hand turns and circular footwork as voluminous flared skirts pirouette to Manganiyar melodies.",
          "image": "assets/img/photos/1599661046289-e31897846e41-w1000.jpg",
          "tag": "Folk Dance"
        },
        {
          "title": "Mehrangarh Fort Ramparts",
          "subtitle": "Citadel of the Sun God",
          "description": "Rising 400 feet above the Blue City of Jodhpur, an impenetrable fortress carved from living desert rock.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Phad Folk Narrative Scroll",
          "subtitle": "Visual Ballad of Folk Deities",
          "description": "Thirty-foot long canvas scrolls painted with natural dyes narrating the heroic epics of Pabuji and Devnarayan.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Folk Art"
        },
        {
          "title": "Pushkar Desert Sunset Gathering",
          "subtitle": "Ancient Dunes and Camel Caravans",
          "description": "Nomadic traders, colorful turbans, and sacred temple bells resonating across the holy lake of Pushkar.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "goa",
    "name": "Goa",
    "capital": "Panaji",
    "region": "West",
    "badge": "Enclave of Konkan Heritage & Baroque Splendor",
    "tagline": "Basilica of Bom Jesus, Shigmo Spring Pageantry & Kunbi Handloom Traditions",
    "heroImage": "assets/img/photos/1512343879784-a960bf40e7f2-w1200.jpg",
    "history": {
      "title": "Kadamba Dynasty & Indo-Portuguese Confluence",
      "era": "10th Century \u2013 20th Century CE",
      "keyFigures": [
        "Kadamba King Jayakeshi I",
        "Abbe Faria",
        "Francisco Luis Gomes",
        "Ram Manohar Lohia"
      ],
      "highlights": "Under the ancient Kadamba kings, Goa was a wealthy maritime port known as Gopakapattana. Later, four centuries of Portuguese rule merged with vibrant Konkani folk traditions to form a distinctive architectural and cultural synthesis.",
      "knowledgeSystem": "Khazan coastal wetland agro-engineering, Baroque laterite stucco construction, and Konkani musical notation.",
      "discoveryMission": {
        "name": "The Relics of Bom Jesus",
        "description": "Explore the Basilica of Bom Jesus in Old Goa, a UNESCO World Heritage site and masterpiece of Baroque architecture.",
        "objective": "Identify the unplastered laterite facade and the intricate Florentine marble mausoleum.",
        "quizQuestion": "Which famous 16th-century monument in Old Goa holds the mortal remains of St. Francis Xavier?",
        "quizOptions": [
          "Basilica of Bom Jesus",
          "Se Cathedral",
          "Church of St. Francis of Assisi",
          "Church of Our Lady of Immaculate Conception"
        ],
        "correctAnswer": 0,
        "explanation": "Completed in 1605 CE, the Basilica of Bom Jesus is one of the finest examples of Baroque architecture in Asia."
      },
      "artifact": {
        "id": "goan-deepastambha",
        "name": "Miniature Temple Deepastambha",
        "period": "18th Century CE",
        "lore": "A multi-tiered octagonal stone lamp tower unique to Goan Hindu temple architecture (e.g., Shanta Durga Temple).",
        "icon": "\ud83e\ude94"
      },
      "points": 150
    },
    "games": {
      "title": "Tablam & Logorchyo",
      "gameKey": "pallanguzhi",
      "type": "Traditional Konkan Board & Stone Game",
      "origin": "Shaded verandas of traditional Goan Balc\u00e3os",
      "rules": [
        "Tablam is a traditional board game played on a grid using coconut shell pieces or tamarind seeds.",
        "Players roll split coconut shells or cowries to advance pieces across home paths.",
        "Logorchyo is the Goan version of the 7-stone knockdown game played outdoors by village youth."
      ],
      "equipment": "Wooden or chalk board, halved coconut counters, cowrie shell dice.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Tablam Game Board",
        "playableTitle": "Play Goan Tablam",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Basilica of Bom Jesus & Shanta Durga Temple",
      "monumentName": "Basilica of Bom Jesus",
      "builderEra": "Completed in 1605 CE",
      "architecturalStyle": "Mannerist & Baroque Laterite Architecture",
      "marvelDetails": "Constructed from local ferruginous laterite stone with basalt carvings. Features a gilded main altar, intricate choir stalls, and a tripartite facade embodying Portuguese Baroque design.",
      "componentsToBuild": [
        {
          "id": "go1",
          "name": "Laterite Stone Plinth",
          "role": "Sturdy porous laterite base standing firm against humid tropical coastal weather.",
          "hint": "Lay the red laterite foundation."
        },
        {
          "id": "go2",
          "name": "Tripartite Baroque Facade",
          "role": "Three-storey facade combining Doric, Ionic, and Corinthian classical orders.",
          "hint": "Erect the three-tiered entrance facade."
        },
        {
          "id": "go3",
          "name": "Gilded Baroque Retable",
          "role": "Monumental wooden altarpiece covered in glittering gold leaf.",
          "hint": "Install the gilded altar inside."
        },
        {
          "id": "go4",
          "name": "Belfry Bell Tower",
          "role": "Campanile housing historic church bells chiming across the Mandovi.",
          "hint": "Attach the belfry tower."
        },
        {
          "id": "go5",
          "name": "Ornamental Jesuit Crest",
          "role": "Carved basalt pediment bearing the sacred IHS seal.",
          "hint": "Crown the central top pediment."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Shigmo & Goa Carnival",
      "season": "Phalguna (March) & Pre-Lent (February)",
      "rituals": "Shigmo is the grand Konkani spring celebration honoring warrior victories with elaborate mythological floats, Ghode Modni dummy horse dances, and Romat dance processions.",
      "culinaryHeritage": "Bebinca (traditional seven-layered coconut milk pudding), Khatkhate vegetable stew, and Goan Poee.",
      "celebrationStyle": "Masked street parades led by King Momo, colorful gulal tossing, and folk music on Ghumot instruments.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Fugdi, Mando & Kunbi Weaving",
      "dance": "Fugdi (energetic Konkani folk dance performed by women in circles with rhythmic blowing sounds called Katti Fugdi).",
      "music": "Mando musical ballads blending Western ballroom melodies with Konkani poetry accompanied by the Ghumot (clay pot drum).",
      "handicrafts": "Azulejos hand-painted glazed ceramic tiles, terracotta pottery, and coconut shell crafts.",
      "textile": "Kunbi handloom red-and-white checked cotton sarees traditionally worn by indigenous tribal women.",
      "lifestyle": "Balc\u00e3o porch conversations, afternoon Susegad leisure philosophy, and coastal fishing heritage.",
      "slideshowSlides": [
        {
          "title": "Fugdi Folk Dance Celebration",
          "subtitle": "Rhythmic Vitality of Konkan Women",
          "description": "Fast-paced circular clapping dance ending with vigorous spins, celebrated during Ganesh and Dhalo festivals.",
          "image": "assets/img/photos/1512343879784-a960bf40e7f2-w1000.jpg",
          "tag": "Folk Dance"
        },
        {
          "title": "Basilica of Bom Jesus Facade",
          "subtitle": "Unadorned Laterite Splendor of 1605 CE",
          "description": "Richly carved basalt portals set against unplastered red laterite blocks, an enduring world heritage icon.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Azulejos Hand-Painted Ceramic Tiles",
          "subtitle": "Blue and White Heritage Ceramic Art",
          "description": "Glazed ceramic murals depicting Portuguese and Konkani historical vignettes decorating heritage villas.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Crafts"
        },
        {
          "title": "Shigmo Festival Pageantry",
          "subtitle": "The Spring Festival of Color and Myth",
          "description": "Vibrant night processions featuring mythological float effigies and Ghode Modni warrior horse dancers.",
          "image": "assets/img/photos/1567157577867-05ccb1388e66-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "punjab",
    "name": "Punjab",
    "capital": "Chandigarh",
    "region": "North",
    "badge": "Sanctuary of Harmandir Sahib & Vibrant Bhangra",
    "tagline": "Land of Five Rivers, Sikh Spiritual Heritage & Phulkari Embroidered Shawls",
    "heroImage": "assets/img/photos/1514222134-b57cbb8ce073-w1200.jpg",
    "history": {
      "title": "Sikh Empire & Vedic Land of Five Rivers",
      "era": "1500 BCE \u2013 19th Century CE",
      "keyFigures": [
        "Guru Nanak Dev Ji",
        "Guru Gobind Singh Ji",
        "Maharaja Ranjit Singh",
        "Bhagat Singh"
      ],
      "highlights": "Cradle of the Rigveda along the holy Saraswati and Sutlej rivers. Guru Nanak Dev Ji established the foundational ideals of selfless service (Sewa) and community kitchen (Langar). Maharaja Ranjit Singh forged the powerful Sikh Empire, gold-plating the sacred Harmandir Sahib.",
      "knowledgeSystem": "Gurmukhi script codification, Langar mass egalitarian nutrition system, and Gatka martial arts science.",
      "discoveryMission": {
        "name": "The Gilded Domes of Amritsar",
        "description": "Walk the holy parikrama of Sri Harmandir Sahib (The Golden Temple) surrounded by the sacred Amrit Sarovar.",
        "objective": "Understand the open-door architecture of the four entrances welcoming all humankind regardless of caste or creed.",
        "quizQuestion": "Which monarch gilded the upper floors and dome of Sri Harmandir Sahib with 750 kg of pure gold in 1830?",
        "quizOptions": [
          "Maharaja Ranjit Singh",
          "Guru Gobind Singh Ji",
          "Banda Singh Bahadur",
          "Maharaja Ala Singh"
        ],
        "correctAnswer": 0,
        "explanation": "Maharaja Ranjit Singh, founder of the Sikh Empire, patronized the marble work and pure gold foil overlay that gave it the name Golden Temple."
      },
      "artifact": {
        "id": "phulkari-bagh",
        "name": "Bagh Geometric Silk Phulkari",
        "period": "19th Century CE",
        "lore": "A densely embroidered cotton shawl worked from the reverse side using untwisted pure pat silk floss, forming a shimmering golden garden.",
        "icon": "\ud83e\udde3"
      },
      "points": 150
    },
    "games": {
      "title": "Circle Kabaddi & Pehlwani Kushti",
      "gameKey": "pallanguzhi",
      "type": "Traditional Combat & Wrestling Sport",
      "origin": "Rural Akhadas and harvest arenas of the Punjab plains",
      "rules": [
        "Circle Kabaddi is played in a circular arena of 22-meter radius with one-on-one raid battles without stops.",
        "Pehlwani Kushti pits wrestlers against each other in consecrated red clay mud pits (Akhada).",
        "Gitte is an ancient dexterity game played by women tossing and catching five smooth stones."
      ],
      "equipment": "Red clay wrestling pit with mustard oil and turmeric, or circular turf boundary.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Arena",
        "playableTitle": "Experience Punjabi Sports",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Sri Harmandir Sahib (The Golden Temple, Amritsar)",
      "monumentName": "Sri Harmandir Sahib",
      "builderEra": "Founded in 1577 CE by Guru Ram Das Ji, sanctum by Guru Arjan Dev Ji in 1588 CE",
      "architecturalStyle": "Sikh Sacred Architecture",
      "marvelDetails": "Built at a level lower than the surrounding ground to symbolize humility. Features four entrances open to all four directions, surrounded by the holy Amrit Sarovar water basin, with the upper storeys clad in gold leaf.",
      "componentsToBuild": [
        {
          "id": "p1",
          "name": "Amrit Sarovar Tank",
          "role": "Sacred water reservoir reflecting the sanctum walls.",
          "hint": "Excavate the sacred pool foundation."
        },
        {
          "id": "p2",
          "name": "Darshani Deorhi Gateway",
          "role": "Marble entrance portal connecting to the causeway.",
          "hint": "Position the archway gateway."
        },
        {
          "id": "p3",
          "name": "Guru ka Pul (Marble Causeway)",
          "role": "Narrow marble bridge leading across the water to the central sanctum.",
          "hint": "Connect the bridge over water."
        },
        {
          "id": "p4",
          "name": "Two-Tiered Marble Sanctum",
          "role": "Sanctum decorated with pietra dura floral inlays and gold-embossed panels.",
          "hint": "Erect the central holy sanctuary."
        },
        {
          "id": "p5",
          "name": "Gilded Gold Fluted Dome",
          "role": "Shimmering copper-gilded dome crowned with an inverted lotus kalasa.",
          "hint": "Crown the temple with the golden dome."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Baisakhi & Lohri",
      "season": "Vaisakha (Mid-April) & Paush (Mid-January)",
      "rituals": "Baisakhi celebrates the golden wheat harvest and the creation of the Khalsa Panth in 1699 by Guru Gobind Singh Ji. Lohri is celebrated around community bonfires tossing sesame seeds and puffed rice with joyous folk songs.",
      "culinaryHeritage": "Sarson ka Saag and Makki di Roti with homemade white butter, Chhole Bhature, and rich creamy Lassi.",
      "celebrationStyle": "Vibrant Bhangra and Giddha dances, Nagar Kirtan processions, and Gatka martial sword demonstrations.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Bhangra, Phulkari Embroidery & Dhol Beats",
      "dance": "Bhangra and Giddha (high-energy harvest dances with joyful leaps, clapping, and singing of Boliyan poetry).",
      "music": "Sufi Qawwali, Shabad Kirtan, and folk ballads played on Tumbi, Algoza, and Dhol drums.",
      "handicrafts": "Phulkari silk floss hand-embroidery, Punjabi Jutti shoes with zari thread, hand-hammered brass utensils.",
      "textile": "Coarse Khaddar cotton handloom embroidered with geometric golden silk threads.",
      "lifestyle": "Reverence for farming, warm hospitality, Langar community service, and energetic gatherings.",
      "slideshowSlides": [
        {
          "title": "Bhangra Harvest Celebration",
          "subtitle": "Unbridled Joy of the Golden Fields",
          "description": "Dancers dressed in bright Kurtas and Turla turbans leaping high to the resonant beats of the barrel Dhol.",
          "image": "assets/img/photos/1514222134-b57cbb8ce073-w1000.jpg",
          "tag": "Folk Dance"
        },
        {
          "title": "Sri Harmandir Sahib Reflection",
          "subtitle": "Spiritual Beacon of Peace and Equality",
          "description": "The shimmering golden temple casting its sacred reflection upon the tranquil waters of the Amrit Sarovar.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Phulkari Silk Embroidery",
          "subtitle": "Garden of Golden Silk Threads",
          "description": "Intricate geometric flower motifs embroidered with unstretched silk floss from the reverse side of handloom cloth.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Handicrafts"
        },
        {
          "title": "Lohri Bonfire Festivity",
          "subtitle": "Warmth of Winter and Kinship",
          "description": "Families gathering around roaring fires singing traditional songs of Dulla Bhatti and sharing winter sweets.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "haryana",
    "name": "Haryana",
    "capital": "Chandigarh",
    "region": "North",
    "badge": "Battleground of Kurukshetra & Rakhigarhi Roots",
    "tagline": "Ancient Indus Metropolis of Rakhigarhi, Gita Discourse & Wrestling Champions",
    "heroImage": "assets/img/heritage-placeholder.svg",
    "history": {
      "title": "Indus Civilization at Rakhigarhi & Kurukshetra",
      "era": "2600 BCE \u2013 18th Century CE",
      "keyFigures": [
        "Lord Krishna",
        "Emperor Harshavardhana",
        "Raja Nahar Singh",
        "Hemchandra Vikramaditya"
      ],
      "highlights": "Rakhigarhi stands as one of the largest and oldest Harappan urban metropolises, covering over 350 hectares. Kurukshetra witnessed the historic Mahabharata battle and the eternal philosophical sermon of the Bhagavad Gita.",
      "knowledgeSystem": "Gita philosophical synthesis of Karma Yoga, Indus urban drainage town-planning, and Ayurvedic metallurgy.",
      "discoveryMission": {
        "name": "The Baked Brick Grid of Rakhigarhi",
        "description": "Inspect the excavation trenches of Rakhigarhi Mound 7 to uncover sophisticated brick drainage systems and pottery.",
        "objective": "Identify the standard Harappan brick ratio (4:2:1) used across urban planning.",
        "quizQuestion": "Which ancient scripture was imparted by Lord Krishna on the sacred battlefield of Kurukshetra?",
        "quizOptions": [
          "Bhagavad Gita",
          "Upanishads",
          "Rigveda",
          "Arthashastra"
        ],
        "correctAnswer": 0,
        "explanation": "The Bhagavad Gita, consisting of 700 verses, was delivered by Krishna to Arjuna beneath the sacred banyan tree at Jyotisar in Kurukshetra."
      },
      "artifact": {
        "id": "rakhigarhi-terracotta-seal",
        "name": "Rakhigarhi Harappan Steatite Seal",
        "period": "2500 BCE",
        "lore": "An engraved unicorn seal with undeciphered Indus script symbols used for maritime trade authentication.",
        "icon": "\ud83c\udffa"
      },
      "points": 150
    },
    "games": {
      "title": "Dangal Kushti & Kabaddi",
      "gameKey": "pallanguzhi",
      "type": "Traditional Wrestling & Tag Sport",
      "origin": "Village Dangals across rural Rohtak, Sonipat, and Jhajjar",
      "rules": [
        "Dangal is village soil wrestling where wrestlers win by pinning the opponent's both shoulders to the ground.",
        "Kabaddi teams take turns sending raiders into opposing half chanting continuously.",
        "Gulli-Danda tests precision hand-eye coordination striking a tapered peg."
      ],
      "equipment": "Softened clay akhada pit treated with buttermilk, ghee, and red ochre.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Wrestling Ring",
        "playableTitle": "Experience Haryanvi Sports",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Rakhigarhi Archaeological Complex & Pinjore Gardens",
      "monumentName": "Rakhigarhi Harappan Metropolis",
      "builderEra": "2600 BCE",
      "architecturalStyle": "Mature Indus Urban Architecture",
      "marvelDetails": "Showcases multi-room baked-brick houses, public granaries, covered soakage jar drainage channels, and bronze metallurgical kilns.",
      "componentsToBuild": [
        {
          "id": "ha1",
          "name": "Raised Mud-Brick Platform",
          "role": "Flood-resistant high platform safeguarding the settlement.",
          "hint": "Lay the anti-flood platform."
        },
        {
          "id": "ha2",
          "name": "Grid Street Layout",
          "role": "Wide north-south and east-west avenues intersecting at right angles.",
          "hint": "Form the orthogonal street grid."
        },
        {
          "id": "ha3",
          "name": "Baked-Brick Courtyard Homes",
          "role": "Multi-room residential quarters with central open light wells.",
          "hint": "Build the brick residential units."
        },
        {
          "id": "ha4",
          "name": "Covered Underground Drainage",
          "role": "Sophisticated sewer channels with terracotta inspection traps.",
          "hint": "Install the drainage network."
        },
        {
          "id": "ha5",
          "name": "Public Granary & Kiln Facility",
          "role": "Massive grain storage and bronze metallurgical workshop.",
          "hint": "Construct the public civic granary."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Surajkund Crafts Mela & Gita Mahotsav",
      "season": "February & Margashirsha (November \u2013 December)",
      "rituals": "Surajkund Mela hosts thousands of master craftspersons beside the 10th-century sun pool. International Gita Mahotsav features mass recitation of the Gita and sacred Deepotsav along Brahma Sarovar.",
      "culinaryHeritage": "Bajra Khichdi with hot Desi Ghee, Kadhi Pakora, and Malpua sweet pancakes.",
      "celebrationStyle": "Folk Saang operatic performances, Ragini singing competitions, and vibrant rustic fair ambiance.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Saang Folk Theatre, Phulkari & Dhamal Dance",
      "dance": "Dhamal and Loor (ancient folk dances celebrating the arrival of spring and harvest to the beat of Duf and Dholak).",
      "music": "Ragini musical storytelling, Alha-Udal ballad singing, and Sarangi-accompanied folk verse.",
      "handicrafts": "Clay terracotta pottery of Jhajjar, brass and copper utensil casting of Rewari.",
      "textile": "Thirma and Chope heavy handloom cotton Phulkari shawls, woven Panja Durries.",
      "lifestyle": "Dairy farming culture, traditional Haryanvi turbans (Khandwa), and fitness discipline.",
      "slideshowSlides": [
        {
          "title": "Dhamal Harvest Dance",
          "subtitle": "Ancient Rhythm of the Duf Drum",
          "description": "Men and women dancing with wooden batons and brass cymbals under the spring harvest moonlight.",
          "image": "assets/img/heritage-placeholder.svg",
          "tag": "Folk Dance"
        },
        {
          "title": "Surajkund Ancient Sun Reservoir",
          "subtitle": "10th Century Tomar Dynasty Amphitheatre",
          "description": "Stepped semi-circular sun pool built by King Surajpal, now home to the world's largest crafts fair.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Rewari Brass Crafts",
          "subtitle": "Hand-Hammered Metalware Traditions",
          "description": "Lustrous brass pitchers and ornamental cookware beaten to perfection by hereditary metal artisans.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Handicrafts"
        },
        {
          "title": "Brahma Sarovar Pilgrimage",
          "subtitle": "Sacred Waters of Kurukshetra",
          "description": "A vast sacred water reservoir where millions gather during solar eclipses for purification and spiritual contemplation.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "himachal-pradesh",
    "name": "Himachal Pradesh",
    "capital": "Shimla",
    "region": "North",
    "badge": "Devbhoomi of Western Himalayas & Kath-Kuni Architecture",
    "tagline": "Earthquake-Resistant Wooden Temples, Nati Folk Dance & Kangra Miniatures",
    "heroImage": "assets/img/photos/1506744038136-46273834b3fb-w1200.jpg",
    "history": {
      "title": "Trigarta Kingdom & Hill Principalities",
      "era": "5th Century BCE \u2013 19th Century CE",
      "keyFigures": [
        "Susharma Chandra",
        "Raja Sansar Chand",
        "Guru Padmasambhava"
      ],
      "highlights": "Mentioned in the Mahabharata as the ancient Trigarta kingdom. Raja Sansar Chand of Kangra patronized the delicate Pahari miniature painting school that depicted romanticized Krishna-Radha poetry amidst Himalayan cedar groves.",
      "knowledgeSystem": "Kath-Kuni seismic timber-lacing construction, indigenous mountain water mills (Gharat), and Himalayan herbal lore.",
      "discoveryMission": {
        "name": "The Seismic Interlocking of Kath-Kuni",
        "description": "Examine the Bhimakali Temple at Sarahan to discover how alternating layers of deodar timber and dry stone withstand severe earthquakes without mortar.",
        "objective": "Identify the mortise-free wooden corner keys that allow walls to flex during tremors.",
        "quizQuestion": "Which unique Himalayan architectural technique combines alternating layers of wood and stone without mortar to resist seismic tremors?",
        "quizOptions": [
          "Kath-Kuni",
          "Dravidian",
          "Nagara",
          "Vesara"
        ],
        "correctAnswer": 0,
        "explanation": "Kath-Kuni (wood corner) architecture uses interlocked deodar wood beams and schist stone slabs to absorb earthquake shockwaves."
      },
      "artifact": {
        "id": "chamba-rumal",
        "name": "Do-Rukha Chamba Rumal",
        "period": "18th Century CE",
        "lore": "A double-sided silk embroidered handkerchief displaying identical miniature paintings on both faces with no visible knots.",
        "icon": "\ud83e\udde3"
      },
      "points": 150
    },
    "games": {
      "title": "Thoda Martial Archery & Chharhi",
      "gameKey": "pallanguzhi",
      "type": "Traditional Archery & Mountain Sport",
      "origin": "Mahabharata martial heritage across Kullu, Shimla, and Sirmaur valleys",
      "rules": [
        "Thoda is a martial archery dance game where archers aim blunt arrows only below the opponent's knees.",
        "Defenders execute lightning-fast hopping and dodging maneuvers to rhythmic war drum beats.",
        "Chharhi tests stone throwing precision and shepherd agility in alpine pastures."
      ],
      "equipment": "Traditional bamboo longbow, blunt wooden-tipped arrows, thick calf-guard armor.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Archery Arena",
        "playableTitle": "Experience Himalayan Sports",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Bhimakali Temple (Sarahan) & Kangra Fort",
      "monumentName": "Bhimakali Kath-Kuni Temple",
      "builderEra": "12th Century CE by Bushahr Rulers",
      "architecturalStyle": "Pahari Kath-Kuni Timber & Stone Architecture",
      "marvelDetails": "A towering multi-storey wooden temple complex combining Hindu and Buddhist architectural elements, featuring cantilevered wooden balconies and sloping slate roofs designed to shed heavy snowfall.",
      "componentsToBuild": [
        {
          "id": "hp1",
          "name": "Dressed Slate Foundation",
          "role": "Raised stone plinth isolated from mountain dampness.",
          "hint": "Form the stone plinth base."
        },
        {
          "id": "hp2",
          "name": "Kath-Kuni Interlocked Beams",
          "role": "Alternating layers of deodar logs and dry stone slabs with corner keys.",
          "hint": "Layer the alternating wood and stone walls."
        },
        {
          "id": "hp3",
          "name": "Cantilevered Wooden Veranda",
          "role": "Intricately carved timber gallery offering mountain panoramas.",
          "hint": "Project the carved wooden balcony."
        },
        {
          "id": "hp4",
          "name": "Sloping Slate Shingle Roof",
          "role": "Locally quarried slate stone tiles overlapping to drain snow and rain.",
          "hint": "Install the steep snow-shedding roof."
        },
        {
          "id": "hp5",
          "name": "Gilded Brass Shikhara Finial",
          "role": "Golden finial and prayer flags consecrating the sanctum peak.",
          "hint": "Crown the apex of the tower."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Kullu Dussehra & Minjar Mela",
      "season": "Ashvin (October) & Shravana (August)",
      "rituals": "Kullu Dussehra begins when celebrations across India end. Over 200 hill Devatas (local village deities) carried in wooden palanquins gather at Dhalpur Maidan to pay homage to Lord Raghunath.",
      "culinaryHeritage": "Siddu (steamed fermented wheat bread stuffed with walnuts and poppy seeds dipped in ghee), Madra, and Babru.",
      "celebrationStyle": "Guinness-record Nati circular folk dances with thousands dancing hand-in-hand to Karnal horns and Nagara drums.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Nati Dance, Kangra Miniatures & Kullu Shawls",
      "dance": "Nati (graceful slow-moving community circle dance performed in vibrant traditional woollen attire).",
      "music": "Pahari folk ballads, devotional Jhoori songs, and reverberating Karnal horn fanfares.",
      "handicrafts": "Kangra miniature paintings using natural stone mineral colors, Chamba Rumal double-sided embroidery.",
      "textile": "Kullu and Kinnauri woollen shawls with vibrant geometric woven borders, and Himachali caps (Topi).",
      "lifestyle": "Living in wooden Kath-Kuni houses, deep reverence for local Devata village democracy, and apple orchards.",
      "slideshowSlides": [
        {
          "title": "Kullu Nati Community Dance",
          "subtitle": "World Record Community Circle Dance",
          "description": "Thousands of dancers moving hand-in-hand in sweeping concentric rings adorned in colorful woollen robes.",
          "image": "assets/img/photos/1506744038136-46273834b3fb-w1000.jpg",
          "tag": "Folk Dance"
        },
        {
          "title": "Bhimakali Kath-Kuni Temple",
          "subtitle": "Eight-Hundred-Year-Old Seismic Timber Marvel",
          "description": "Towering multi-tier wooden temple in Sarahan standing firm against earthquakes through interlocking timber beams.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Kangra Miniature Masterpiece",
          "subtitle": "Lyrical Colors of Pahari Painting",
          "description": "Delicate depictions of Krishna in blooming mountain landscapes painted with ground lapis lazuli and gold dust.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Miniature Art"
        },
        {
          "title": "Kullu Dussehra Deity Gathering",
          "subtitle": "Congregation of Himalayan Gods",
          "description": "Resplendent palanquins carrying village Devatas through festive pine valleys accompanied by Karnal brass trumpets.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "uttarakhand",
    "name": "Uttarakhand",
    "capital": "Dehradun",
    "region": "North",
    "badge": "Sanctuary of Kedarnath & the Ganga's Descent",
    "tagline": "Glacial Origins of Sacred Rivers, Alpine Bugyals & Ancient Himalayan Temples",
    "heroImage": "assets/img/heritage-placeholder.svg",
    "history": {
      "title": "Katyuri Dynasty & Char Dham Pilgrimage",
      "era": "6th Century \u2013 18th Century CE",
      "keyFigures": [
        "Adi Shankara",
        "King Vasu Dev",
        "Rani Karnavati (The Nak-Kati Rani)",
        "Gaura Devi"
      ],
      "highlights": "Adi Shankara journeyed across the rugged Himalayas in the 8th century, renovating the sacred shrines of Kedarnath and Badrinath. The brave Chipko movement in modern Garhwal revolutionized grassroots global ecological forest defense.",
      "knowledgeSystem": "Himalayan herbal pharmacopeia, high-altitude dry-stone ashlar masonry, and Aipan geometric ritual floor art.",
      "discoveryMission": {
        "name": "The Stone Bastions of Kedarnath",
        "description": "Examine the massive interlocking grey granite slabs of Kedarnath Temple built at 11,755 feet elevation.",
        "objective": "Understand how 1,200-year-old interlocked stone engineering withstood centuries of glacial ice and flash floods.",
        "quizQuestion": "Which celebrated philosopher-monk renovated the Kedarnath and Badrinath shrines in the 8th century CE?",
        "quizOptions": [
          "Adi Shankara",
          "Ramanujacharya",
          "Madhvacharya",
          "Swami Vivekananda"
        ],
        "correctAnswer": 0,
        "explanation": "Adi Shankaracharya consolidated the sacred Himalayan pilgrimage circuit and attained Mahasamadhi behind the Kedarnath temple."
      },
      "artifact": {
        "id": "aipan-chowki",
        "name": "Sacred Aipan Ceremonial Chowki",
        "period": "Traditional Folk Art",
        "lore": "A ritual wooden stool painted with red ochre (Geru) and hand-drawn white rice paste (Biswar) sacred mandalas.",
        "icon": "\u2638\ufe0f"
      },
      "points": 150
    },
    "games": {
      "title": "Baghel & Bagh-Chali",
      "gameKey": "pallanguzhi",
      "type": "Himalayan Strategy Board Game",
      "origin": "Stone courtyards and alpine Bugyal pastures of Kumaon and Garhwal",
      "rules": [
        "Baghel is a predator-prey game played on a grid between 4 Tigers and 20 Goats.",
        "Tigers jump over goats to capture them; goats win by coordinating to encircle and immobilize all 4 tigers.",
        "Requires sharp tactical defense and spatial planning."
      ],
      "equipment": "Grid carved on slate stone slabs, 4 stone tigers, 20 pebble goats.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Himalayan Bagh-Chali Board",
        "playableTitle": "Play Himalayan Bagh-Chali",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Kedarnath Temple & Jageshwar Dham",
      "monumentName": "Kedarnath Temple",
      "builderEra": "8th Century CE",
      "architecturalStyle": "Himalayan Nagara Stone Architecture",
      "marvelDetails": "Built of massive interlocking grey granite slabs bound without cement on a high rectangular platform, withstanding severe Himalayan blizzards and seismic activity for over 1,200 years.",
      "componentsToBuild": [
        {
          "id": "u1",
          "name": "Interlocked Granite Platform",
          "role": "Substantial elevated stone terrace anchored deep into glacial moraine.",
          "hint": "Lay the heavy stone platform."
        },
        {
          "id": "u2",
          "name": "Garbhagriha Sanctum",
          "role": "Thick-walled inner chamber housing the triangular natural rock Shiva Lingam.",
          "hint": "Construct the inner granite sanctum."
        },
        {
          "id": "u3",
          "name": "Gudha Mandapa (Gathering Hall)",
          "role": "Pillared stone hall carved with sculptures of Pandava warriors.",
          "hint": "Build the outer assembly hall."
        },
        {
          "id": "u4",
          "name": "Curvilinear Stone Shikhara",
          "role": "Massive stepped stone tower designed to shed heavy Himalayan snow loads.",
          "hint": "Assemble the stepped shikhara tower."
        },
        {
          "id": "u5",
          "name": "Amalaka & Golden Kalasha",
          "role": "Serrated stone disc and gilded pinnacle crowning the shrine against storms.",
          "hint": "Place the apex stone and finial."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Nanda Devi Raj Jat & Haridwar Kumbh Mela",
      "season": "Bhadrapada (Every 12 Years) & Chaitra",
      "rituals": "Nanda Devi Raj Jat is a sacred 280-kilometer barefoot pilgrimage across high Himalayan passes led by a sacred four-horned ram (Chausingha Khadu). Millions gather at Haridwar for sacred dips in the holy Ganga during Kumbh Mela.",
      "culinaryHeritage": "Kafli (spinach and fenugreek gravy cooked in iron pots), Bhatt ki Churkani (black soybean stew), and Singori sweet wrapped in Malu leaves.",
      "celebrationStyle": "Chholiya sword dances accompanying bridal and festive processions with brass Ransingha trumpets.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Chholiya Sword Dance, Aipan Art & Garhwali Folk",
      "dance": "Chholiya (thousand-year-old warrior dance performed with glittering swords, brass shields, and martial combat moves).",
      "music": "Garhwali and Kumaoni folk ballads accompanied by Dhol-Damau, Hurka, and the curved Ransingha horn.",
      "handicrafts": "Aipan ritual floor and wall geometric art, Ringal bamboo basketry, copperware (Tamta) of Almora.",
      "textile": "Pashmina shawls, sheep wool Pankhi blankets, and natural hemp fabrics.",
      "lifestyle": "Living in harmonious balance with mountain glaciers, sacred Bugyal alpine meadows, and village solidarity.",
      "slideshowSlides": [
        {
          "title": "Chholiya Martial Sword Dance",
          "subtitle": "Ancient Warrior Dance of Kumaon",
          "description": "Warriors leaping in synchronized sword combat accompanied by the resonant calls of the Ransingha trumpet.",
          "image": "assets/img/heritage-placeholder.svg",
          "tag": "Martial Dance"
        },
        {
          "title": "Kedarnath Himalayan Sanctum",
          "subtitle": "Eternal Stone Monument at 11,755 Feet",
          "description": "Granite temple standing proudly against snow-capped Himalayan peaks, enduring twelve centuries of blizzards.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Aipan Ritual Sacred Geometry",
          "subtitle": "Sacred Ochre and Rice-Paste Mandalas",
          "description": "Symbolic linear motifs drawn by women on doorways, symbolizing prosperity and divine blessings.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Folk Art"
        },
        {
          "title": "Ganga Aarti at Haridwar",
          "subtitle": "Flames Dancing on the Sacred River",
          "description": "Towering brass multi-tiered lamps swung in unison at Har Ki Pauri as thousands of leaf lamps float on the Ganga.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "uttar-pradesh",
    "name": "Uttar Pradesh",
    "capital": "Lucknow",
    "region": "North",
    "badge": "Cradle of Sarnath, Kashi & the Taj Mahal",
    "tagline": "Timeless Varanasi Ghats, Ashokan Sarnath Capital & Classical Kathak Rhythms",
    "heroImage": "assets/img/photos/1564507592333-c60657eea523-w1200.jpg",
    "history": {
      "title": "Mauryan Sarnath, Kashi & Awadh Legacy",
      "era": "1000 BCE \u2013 19th Century CE",
      "keyFigures": [
        "Emperor Ashoka",
        "Gautama Buddha",
        "Kabir Das",
        "Tulsidas",
        "Begum Hazrat Mahal"
      ],
      "highlights": "Varanasi stands as one of the world's oldest continuously inhabited living cities. At Sarnath, Lord Buddha gave his first sermon (Dhammacakkappavattana). Emperor Ashoka erected the Lion Capital at Sarnath, which serves as the national emblem of modern India.",
      "knowledgeSystem": "Patanjali's Yoga Sutras compiled in Kashi, Ayurveda schools of Charaka, and Hindustani classical music Gharanas.",
      "discoveryMission": {
        "name": "The Four Lions of Sarnath",
        "description": "Examine the polished Chunar sandstone Lion Capital erected by Ashoka around 250 BCE at Sarnath.",
        "objective": "Identify the Dharmachakra with 24 spokes that represents the eternal wheel of law and righteousness.",
        "quizQuestion": "Which historical artifact excavated at Sarnath was adopted as the official National Emblem of India?",
        "quizOptions": [
          "The Lion Capital of Ashoka",
          "The Iron Pillar",
          "The Sanchi Torana",
          "The Amaravati Stupa Relief"
        ],
        "correctAnswer": 0,
        "explanation": "The Lion Capital of Ashoka features four Asiatic lions back-to-back, with the Ashoka Chakra adopted in the center of India's national flag."
      },
      "artifact": {
        "id": "ashoka-lion-capital",
        "name": "Sarnath Polished Lion Capital Model",
        "period": "250 BCE",
        "lore": "Four roaring lions facing the cardinal directions perched atop an abacus with high-gloss Mauryan polish.",
        "icon": "\ud83e\udd81"
      },
      "points": 150
    },
    "games": {
      "title": "Pachisi & Patangbaazi (Kite Flying)",
      "gameKey": "chaupar",
      "type": "Historical Royal Race & Aerodynamic Sport",
      "origin": "Stone courtyards of Fatehpur Sikri and rooftop terraces of Lucknow and Varanasi",
      "rules": [
        "Pachisi was played by Emperor Akbar on life-sized inlaid red sandstone palace courtyards using living palace attendants as pieces.",
        "Players cast six cowrie shells to determine moves along cruciform tracks.",
        "Patangbaazi involves tactical rooftop aerial kite duels cutting opponent strings with glass-coated Manjha thread."
      ],
      "equipment": "Silk embroidered Pachisi board, ivory/stone pawns, 6 cowrie shells, paper kites (Guddi).",
      "miniGameConfig": {
        "gameType": "chaupar",
        "boardName": "Royal Pachisi Court",
        "playableTitle": "Play Royal Pachisi",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Taj Mahal (Agra) & Kashi Vishwanath Corridor",
      "monumentName": "Taj Mahal (Agra)",
      "builderEra": "Completed in 1648 CE by Emperor Shah Jahan",
      "architecturalStyle": "Mughal White Marble & Pietra Dura Architecture",
      "marvelDetails": "Built of translucent Makrana white marble resting on a subterranean timber well foundation beside the Yamuna River. Features exquisite Pietra Dura floral inlays using lapis lazuli, jade, and jasper, and four slightly outward-tilted minarets.",
      "componentsToBuild": [
        {
          "id": "up1",
          "name": "Ebony Timber Well Foundation",
          "role": "Subterranean well network keeping foundations hydrated and stable.",
          "hint": "Anchor the riverbank well foundation."
        },
        {
          "id": "up2",
          "name": "Square Marble Plinth",
          "role": "Massive elevated terrace of pure white Makrana marble.",
          "hint": "Lay the raised marble terrace."
        },
        {
          "id": "up3",
          "name": "Central Octagonal Mausoleum",
          "role": "Double-height octagonal tomb with monumental arched Pishtaq doorways.",
          "hint": "Erect the central marble tomb."
        },
        {
          "id": "up4",
          "name": "Double-Shelled Onion Dome",
          "role": "Inner acoustic dome and soaring 35-meter outer bulbous marble dome.",
          "hint": "Install the double marble dome."
        },
        {
          "id": "up5",
          "name": "Four Outward-Leaning Minarets",
          "role": "Slender corner minarets tilted outward to protect the tomb in earthquakes.",
          "hint": "Place the four sentinel minarets."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Dev Deepawali (Varanasi) & Lathmar Holi (Barsana)",
      "season": "Kartik Purnima (November) & Phalguna (March)",
      "rituals": "On Dev Deepawali, all 84 ghats of Varanasi are illuminated with more than one million clay oil lamps (Diyas). In Barsana and Nandgaon, women playfully strike shields of men with sticks during vibrant Lathmar Holi.",
      "culinaryHeritage": "Awadhi Dum Biryani, Banarasi Paan, Malaiyo (winter saffron milk foam), and Kachori-Jalebi.",
      "celebrationStyle": "Ganga Aarti with towering multi-tiered brass oil lamps, flying Gulal colors, and Shehnai melodies of Bismillah Khan.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Kathak Classical Dance, Banarasi Brocade & Chikankari",
      "dance": "Kathak (originating with ancient temple storytellers or Kathakars, famous for intricate Tatkar footwork, Chakkars spins, and Abhinaya).",
      "music": "Varanasi and Lucknow Gharanas of Tabla, Pakhawaj, and vocal Thumri and Dadra.",
      "handicrafts": "Lucknowi Chikankari shadow hand embroidery, Varanasi wooden lacquer toys, brassware of Moradabad.",
      "textile": "Banarasi Katan Pure Silk Sarees woven with pure gold and silver Zari brocade depicting Mughal floral jaals.",
      "lifestyle": "Tehzeeb (courteous etiquette of Lucknow), evening riverboat meditations, and scholarly debates.",
      "slideshowSlides": [
        {
          "title": "Kathak Classical Pirouettes",
          "subtitle": "Rhythmic Lightning of Ghungroo Bells",
          "description": "Dancers performing rapid multiple spins (Chakkars) while ankle bells precisely echo complex tabla bols.",
          "image": "assets/img/photos/1547153760-18fc86324498-w1000.jpg",
          "tag": "Classical Dance"
        },
        {
          "title": "Taj Mahal at Sunrise",
          "subtitle": "Poetry in Translucent White Marble",
          "description": "Makrana marble glowing in hues of pink and gold beside the Yamuna, adorned with semi-precious stone inlays.",
          "image": "assets/img/photos/1564507592333-c60657eea523-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Banarasi Pure Zari Weaving",
          "subtitle": "Gold and Silver Threads on Sacred Silk",
          "description": "Master weavers operating historic drawlooms to weave intricate floral Shikargah and Buti motifs.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Textiles"
        },
        {
          "title": "Dev Deepawali on Varanasi Ghats",
          "subtitle": "A Million Flames Reflected on the Ganga",
          "description": "Every stone step along the four-mile riverfront adorned with earthen lamps as celestial hymns echo.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "west-bengal",
    "name": "West Bengal",
    "capital": "Kolkata",
    "region": "East",
    "badge": "Heart of Terracotta Temples & Durga Puja",
    "tagline": "Bishnupur Terracotta Marvels, Baul Mystics & UNESCO Intangible Heritage",
    "heroImage": "assets/img/photos/1558431382-27e303142255-w1200.jpg",
    "history": {
      "title": "Pala Buddhist Empire & Bengal Renaissance",
      "era": "8th Century CE \u2013 20th Century CE",
      "keyFigures": [
        "Dharmapala",
        "Rabindranath Tagore",
        "Swami Vivekananda",
        "Raja Ram Mohan Roy",
        "Subhas Chandra Bose"
      ],
      "highlights": "The Pala Empire established major centers of Mahayana learning like Somapura. In the 19th and 20th centuries, the Bengal Renaissance transformed literature, science, and the freedom struggle, spearheaded by Nobel laureate Rabindranath Tagore and Swami Vivekananda.",
      "knowledgeSystem": "Pala bronze casting techniques, Navya-Nyaya scholastic logic of Navadvipa, and Vishva-Bharati holistic education philosophy.",
      "discoveryMission": {
        "name": "The Terracotta Epics of Bishnupur",
        "description": "Examine the Jor Bangla and Madan Mohan terracotta temples built by the Malla kings.",
        "objective": "Identify the baked red clay tiles illustrating scenes from the Ramayana and Mahabharata.",
        "quizQuestion": "Which kings constructed the famous carved terracotta brick temples of Bishnupur in Bankura?",
        "quizOptions": [
          "Malla Dynasty Kings",
          "Chola Kings",
          "Gupta Emperors",
          "Pala Rulers"
        ],
        "correctAnswer": 0,
        "explanation": "The Malla rulers built unique terracotta temples in the 17th and 18th centuries in Bishnupur due to the absence of stone quarries."
      },
      "artifact": {
        "id": "bankura-terracotta-horse",
        "name": "Bankura Terracotta Sacred Horse",
        "period": "18th Century CE",
        "lore": "A tall, hollow baked clay horse with pointed ears and symmetrical body, revered as a folk votive offering to village guardian spirits.",
        "icon": "\ud83d\udc0e"
      },
      "points": 150
    },
    "games": {
      "title": "Gilli-Danda & Kanamachi",
      "gameKey": "pallanguzhi",
      "type": "Traditional Folk Outdoor Game",
      "origin": "Rural villages and urban paras of Bengal",
      "rules": [
        "Kanamachi ('Blind Fly') is an ancient tag game where a blindfolded player tries to identify caught players by touch.",
        "Ekka-Dokka is a hopping hopscotch game played on chalked courtyard squares.",
        "Daria Bandha tests line-crossing agility and defensive blocking on grid marked soil."
      ],
      "equipment": "Blindfolds, chalk-drawn courts, wooden pegs, or smooth flat stones.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Village Arena",
        "playableTitle": "Experience Bengali Folk Games",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Bishnupur Terracotta Temples (Jor Bangla)",
      "monumentName": "Jor Bangla Terracotta Temple",
      "builderEra": "1655 CE by Malla King Raghunath Singha",
      "architecturalStyle": "Bengal Chala Terracotta Architecture",
      "marvelDetails": "Constructed in the traditional Do-Chala thatched roof style using burnt alluvial clay bricks. Every square foot of the exterior is clad with carved terracotta panels portraying classical epics and everyday Bengali life.",
      "componentsToBuild": [
        {
          "id": "wb1",
          "name": "Curved Laterite Plinth",
          "role": "Raised plinth mimicking the curved contour of rural deltaic platforms.",
          "hint": "Form the curved plinth base."
        },
        {
          "id": "wb2",
          "name": "Twin Do-Chala Brick Huts",
          "role": "Two joined thatched-roof style brick structures joined together.",
          "hint": "Erect the twin connected brick halls."
        },
        {
          "id": "wb3",
          "name": "Terracotta Narrative Tiles",
          "role": "Hundreds of burnt clay tiles depicting epics and riverine life.",
          "hint": "Clad the walls with sculpted tiles."
        },
        {
          "id": "wb4",
          "name": "Char-Chala Central Tower",
          "role": "Small square four-roofed turret crowning the roof junction.",
          "hint": "Place the central crowning turret."
        },
        {
          "id": "wb5",
          "name": "Triple-Arched Entrance",
          "role": "Three multi-cusped terracotta arches framing the sanctum doorway.",
          "hint": "Install the triple cusped entrance."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Durga Puja & Poila Boishakh",
      "season": "Ashvin (September \u2013 October) & Mid-April",
      "rituals": "Durga Puja is recognized on the UNESCO Intangible Cultural Heritage list. Neighborhoods transform into open-air art galleries with magnificent temporary bamboo-and-fabric Pandals sheltering clay idols of Goddess Durga slaying Mahishasura.",
      "culinaryHeritage": "Rosogolla, Sandesh, Shorshe Ilish (hilsa fish in mustard sauce), Kosha Mangsho, and Mishti Doi.",
      "celebrationStyle": "Dhunuchi Naach energetic dance with smoking earthen censers to the thunderous beats of the Dhak drum, and Sindoor Khela.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Baul Mysticism, Rabindra Sangeet & Jamdani Weaving",
      "dance": "Chhau martial masked dance (Purulia style with acrobatic leaps), and Rabindra Nritya.",
      "music": "Baul nomadic mystic songs with the one-stringed Ektara and Khamak, and Rabindra Sangeet.",
      "handicrafts": "Bankura terracotta pottery, Dokra lost-wax brass casting, Sholapith white sponge pith art.",
      "textile": "Jamdani muslin with supplementary weft floral patterns, Baluchari silk sarees depicting epics on the pallu.",
      "lifestyle": "Adda intellectual coffeehouse discussions, literary debates, and evening tea stalls.",
      "slideshowSlides": [
        {
          "title": "Dhunuchi Dance during Durga Puja",
          "subtitle": "Smoke, Rhythm and Devotion",
          "description": "Performers balancing burning coconut husk censers in hands and teeth to the roaring tempo of Dhak drums.",
          "image": "assets/img/photos/1558431382-27e303142255-w1000.jpg",
          "tag": "Living Tradition"
        },
        {
          "title": "Bishnupur Terracotta Facade",
          "subtitle": "Baked Earth Sculptures of 1655 CE",
          "description": "Elaborate clay reliefs portraying battle scenes, court musicians, and lotus mandalas covering every surface.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Dokra Lost-Wax Metalwork",
          "subtitle": "Four-Thousand-Year Metallurgical Lineage",
          "description": "Rustic non-ferrous metal casting using clay cores and beeswax threads to produce timeless folk figurines.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Handicrafts"
        },
        {
          "title": "Baul Minstrel of the Delta",
          "subtitle": "Wandering Philosophers of the Soul",
          "description": "Singers clad in saffron patchwork garments plucking the one-stringed Ektara singing songs of universal love.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Folk Music"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "odisha",
    "name": "Odisha",
    "capital": "Bhubaneswar",
    "region": "East",
    "badge": "Temple Chariot of Konark & Jagannath",
    "tagline": "Konark Sun Temple Wheels, Odissi Classical Dance & Sacred Pattachitra Scrolls",
    "heroImage": "assets/img/heritage-placeholder.svg",
    "history": {
      "title": "Kalinga Maritime Empire & Eastern Ganga Dynasty",
      "era": "3rd Century BCE \u2013 16th Century CE",
      "keyFigures": [
        "Emperor Kharavela",
        "Emperor Ashoka",
        "Narasimhadeva I",
        "Chodaganga Deva"
      ],
      "highlights": "The historic Kalinga War of 261 BCE transformed Emperor Ashoka from a conqueror into a patron of Dharma and peace. Kalinga mariners (Sadhabas) sailed across the Indian Ocean to Java, Bali, and Sri Lanka, honored today in the Boita Bandana festival.",
      "knowledgeSystem": "Kalinga architectural shilpa manuals, palm-leaf manuscript illustration, and astronomical sundial geometry of Konark.",
      "discoveryMission": {
        "name": "The Astronomical Wheels of Konark",
        "description": "Examine the 24 stone chariot wheels of the Konark Sun Temple to tell exact solar time by reading their shadow.",
        "objective": "Understand how the 8 major and 8 minor spokes calculate hours, minutes, and solar quarter intervals.",
        "quizQuestion": "Which 13th-century king commissioned the monumental Konark Sun Temple shaped like a celestial chariot?",
        "quizOptions": [
          "King Narasimhadeva I",
          "Kharavela",
          "Gautamiputra Satakarni",
          "Rajaraja Chola"
        ],
        "correctAnswer": 0,
        "explanation": "King Narasimhadeva I of the Eastern Ganga Dynasty built the Konark Sun Temple around 1250 CE with the labor of 1,200 artisans over 12 years."
      },
      "artifact": {
        "id": "konark-sundial-wheel",
        "name": "Carved Konark Wheel Model",
        "period": "1250 CE",
        "lore": "A miniature of the 9.5-foot stone chariot wheel carved with celestial musicians and erotic motifs that functions as a precise solar clock.",
        "icon": "\u2638\ufe0f"
      },
      "points": 150
    },
    "games": {
      "title": "Gedi Khela & Nadia Phinga",
      "gameKey": "pallanguzhi",
      "type": "Traditional Stilt Walking & Coconut Sport",
      "origin": "Rural villages and coastal fishing hamlets of Odisha",
      "rules": [
        "Gedi Khela requires players to walk, race, and combat while balanced on tall bamboo stilts (Gedi).",
        "Nadia Phinga is an ancient coconut-hurling accuracy test where players roll coconuts to hit targets.",
        "Bohu Chori is an outdoor hide-and-tag game popular during seasonal festivals."
      ],
      "equipment": "Notched bamboo poles with footrests, seasoned dry coconuts.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Village Grounds",
        "playableTitle": "Experience Odia Folk Games",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Konark Sun Temple (The Black Pagoda)",
      "monumentName": "Konark Sun Temple",
      "builderEra": "1250 CE by King Narasimhadeva I",
      "architecturalStyle": "Kalinga Deula Architecture",
      "marvelDetails": "Conceived as a colossal processional chariot of Surya, the Sun God, fitted with 24 elaborately carved wheels pulled by seven galloping stone horses, oriented so the first rays of dawn strike the sanctum.",
      "componentsToBuild": [
        {
          "id": "o1",
          "name": "High Sandstone Terrace Plinth",
          "role": "Raised stone platform carved with dynamic battle friezes and hunting parades.",
          "hint": "Lay the expansive carved terrace."
        },
        {
          "id": "o2",
          "name": "Twenty-Four Chariot Wheels",
          "role": "Twelve pairs of astronomical stone sundial wheels lining the plinth sides.",
          "hint": "Install the 24 carved stone wheels."
        },
        {
          "id": "o3",
          "name": "Seven Galloping Stone Horses",
          "role": "Seven mighty stone steeds leaping forward into the ocean horizon.",
          "hint": "Place the leaping chariot horses."
        },
        {
          "id": "o4",
          "name": "Jagamohana (Audience Hall)",
          "role": "Pyramidal stepped Pidha Deula roof rising 130 feet into the coastal breeze.",
          "hint": "Erect the monumental stepped hall."
        },
        {
          "id": "o5",
          "name": "Natya Mandapa Columns",
          "role": "Carved open dance pavilion portraying classical Odissi musical poses.",
          "hint": "Position the front pillared dance hall."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Rath Yatra (Puri) & Raja Parba",
      "season": "Ashadha (June \u2013 July) & Jyeshtha (Mid-June)",
      "rituals": "Rath Yatra sees millions pulling the three monumental wooden chariots (Nandighosa, Taladhwaja, and Darpadalana) carrying Lord Jagannath, Balabhadra, and Subhadra through Puri. Raja Parba celebrates Mother Earth's fertility with wooden swings.",
      "culinaryHeritage": "Chhena Poda (caramelized baked cheese dessert), Mahaprasad cooked in earthen pots on wood fires, and Khaja.",
      "celebrationStyle": "Goti Pua acrobatic dances, Boita Bandana floating miniature paper boats at dawn, and joyous chariot pulling.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Odissi Classical Dance, Pattachitra & Sambalpuri Weaves",
      "dance": "Odissi (classical dance characterized by sculptural Tribhanga three-bend postures, Chauka square stance, and silver filigree ornaments).",
      "music": "Odissi Classical music traditions, Mardala percussion, and Geeta Govinda devotional poetry.",
      "handicrafts": "Pattachitra cloth scroll paintings, Pipili applique wall hangings, silver filigree (Tarakasi) of Cuttack.",
      "textile": "Sambalpuri and Bomkai Ikat handloom sarees with Baandha tie-dye geometric and floral motifs.",
      "lifestyle": "Reverence for Lord Jagannath, consumption of Pakhala fermented rice in summer, and artisan heritage villages (Raghurajpur).",
      "slideshowSlides": [
        {
          "title": "Odissi Sculptural Posture",
          "subtitle": "Poetry in Motion from Ancient Temple Walls",
          "description": "The exquisite Tribhanga stance mirroring the sculpted celestial dancers of Konark and Jagannath.",
          "image": "assets/img/heritage-placeholder.svg",
          "tag": "Classical Dance"
        },
        {
          "title": "Konark Sun Chariot Wheel",
          "subtitle": "Thirteenth-Century Astronomical Clock",
          "description": "A magnificent 9-foot stone wheel carved with twenty-four spokes that accurately measures time by the sun's shadow.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Raghurajpur Pattachitra Scroll",
          "subtitle": "Fine Brushwork on Treated Cotton Canvas",
          "description": "Cloth canvas coated with tamarind glue and chalk, painted with natural stone pigments depicting epic Jagannath tales.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Scroll Art"
        },
        {
          "title": "Rath Yatra Chariot Procession",
          "subtitle": "The Grand Chariot of the Universe",
          "description": "Massive 45-foot timber chariots adorned with bright red, yellow, and blue fabrics pulled by millions along Grand Road.",
          "image": "assets/img/photos/1567157577867-05ccb1388e66-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "bihar",
    "name": "Bihar",
    "capital": "Patna",
    "region": "East",
    "badge": "Seat of Nalanda & Enlightenment at Bodh Gaya",
    "tagline": "Ancient Magadha Empire, Sacred Bodhi Tree & Madhubani Folk Art",
    "heroImage": "assets/img/photos/1602216056096-3b40cc0c9944-w1200.jpg",
    "history": {
      "title": "Magadha Empire & Ancient Nalanda University",
      "era": "6th Century BCE \u2013 12th Century CE",
      "keyFigures": [
        "Gautama Buddha",
        "Lord Mahavira",
        "Aryabhata",
        "Chandragupta Maurya",
        "Chanakya"
      ],
      "highlights": "Bihar was the political and spiritual heart of ancient India. At Bodh Gaya, Siddhartha Gautama attained enlightenment beneath the Bodhi tree. Nalanda University attracted scholars like Hiuen Tsang from across Asia to study philosophy, astronomy, and mathematics.",
      "knowledgeSystem": "Aryabhata's decimal place-value system and zero concept, Nalanda residential academic pedagogy, and Chanakya's Arthashastra economics.",
      "discoveryMission": {
        "name": "The Library of Nalanda (Dharmaganja)",
        "description": "Explore the excavated brick monasteries and tiered stupas of Nalanda Mahavihara.",
        "objective": "Identify the nine-storey Ratnodadhi library repository of Asian Buddhist scholarship.",
        "quizQuestion": "Which celebrated ancient university in Bihar housed over 10,000 international students and scholars?",
        "quizOptions": [
          "Nalanda Mahavihara",
          "Takshashila",
          "Vikramashila",
          "Valabhi"
        ],
        "correctAnswer": 0,
        "explanation": "Nalanda was founded in the 5th century CE under the Guptas and flourished for over 700 years as an international seat of learning."
      },
      "artifact": {
        "id": "didarganj-yakshi",
        "name": "Polished Didarganj Yakshi Model",
        "period": "3rd Century BCE",
        "lore": "A life-sized sandstone maiden sculpture holding a fly-whisk, polished to a mirror glaze characteristic of Mauryan art.",
        "icon": "\ud83d\uddff"
      },
      "points": 150
    },
    "games": {
      "title": "Chikka & Gilli-Danda",
      "gameKey": "pallanguzhi",
      "type": "Traditional Team Pursuit Sport",
      "origin": "Rural villages of Mithila and Magadh",
      "rules": [
        "Chikka is an ancient team tag game where players must cross multiple defended boundary corridors.",
        "Kabaddi and Dangal have ancient roots dating to Magadhan athletic training.",
        "Kite flying is celebrated across the harvest skies of Makar Sankranti."
      ],
      "equipment": "Chalk-marked earthen field, wooden batons and pegs.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Village Field",
        "playableTitle": "Experience Bihari Folk Games",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Mahabodhi Temple (Bodh Gaya) & Nalanda Ruins",
      "monumentName": "Mahabodhi Temple Complex",
      "builderEra": "Reconstructed in 5th-6th Century CE (Gupta Era)",
      "architecturalStyle": "Classical Gupta Brick Temple Architecture",
      "marvelDetails": "One of the earliest brick Buddhist temples still standing in India. The pyramidal grand spire rises 55 meters above the sacred Diamond Throne (Vajrasana) marking the spot where the Buddha sat under the Bodhi tree.",
      "componentsToBuild": [
        {
          "id": "b1",
          "name": "Vajrasana (Diamond Throne)",
          "role": "Polished sandstone slab marking the seat of supreme enlightenment.",
          "hint": "Lay the sacred central throne."
        },
        {
          "id": "b2",
          "name": "Square Brick Plinth",
          "role": "Massive stepped brick platform bearing relief niches of Buddha figures.",
          "hint": "Build the foundational brick platform."
        },
        {
          "id": "b3",
          "name": "Pyramidal Central Spire",
          "role": "Towering 55-meter stepped brick shikhara rising gracefully into the sky.",
          "hint": "Erect the grand brick spire."
        },
        {
          "id": "b4",
          "name": "Four Corner Subsidiary Stupas",
          "role": "Miniature corner spires reinforcing the symmetry of the sanctum.",
          "hint": "Add the four corner stupa towers."
        },
        {
          "id": "b5",
          "name": "Gilded Amalaka Finial",
          "role": "Gilded crown and parasol finial reflecting sunlight over the Bodhi grove.",
          "hint": "Crown the apex of the temple spire."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Chhath Puja & Sonepur Mela",
      "season": "Kartik (October \u2013 November)",
      "rituals": "Chhath Puja is an ancient four-day Vedic sun festival dedicated to Surya and Chhathi Maiya. Devotees stand waist-deep in river waters offering Arghya to the setting and rising Sun, embodying supreme ecological reverence.",
      "culinaryHeritage": "Thekua (wheat flour and jaggery cookies with cardamom and dry fruits), Litti Chokha (roasted wheat flour balls stuffed with sattu served with mashed eggplant), and Khaja of Silao.",
      "celebrationStyle": "Singing traditional Maithili and Bhojpuri folk hymns by river ghats illuminated by oil lamps, and carrying bamboo Sup baskets laden with fruits.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Madhubani Painting, Sujani Embroidery & Bidesiya",
      "dance": "Jhajhari, Jat-Jatin folk dance-drama depicting couple banters, and Bidesiya theater created by Bhikhari Thakur.",
      "music": "Maithili classical folk music, Dhrupad traditions of Bettiah, and Chhath devotional songs of Sharda Sinha.",
      "handicrafts": "Madhubani / Mithila paintings using bamboo twigs and natural dyes, Sikki golden grass crafts, Tikuli glass art.",
      "textile": "Bhagalpuri Tussar Silk (known as Peace Silk) handwoven in historic looms.",
      "lifestyle": "Community river worship, intellectual discourse, agrarian camaraderie, and Mithila wedding rituals.",
      "slideshowSlides": [
        {
          "title": "Chhath Puja Sunset Offering",
          "subtitle": "Ancient Vedic Reverence for the Sun",
          "description": "Vratis standing in river waters with decorated bamboo sups offering thanksgiving to the setting sun.",
          "image": "assets/img/photos/1602216056096-3b40cc0c9944-w1000.jpg",
          "tag": "Living Tradition"
        },
        {
          "title": "Mahabodhi Temple Bodh Gaya",
          "subtitle": "The Seat of Universal Awakening",
          "description": "Majestic brick spire overlooking the sacred Bodhi tree where the Buddha attained supreme enlightenment.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Madhubani Folk Painting",
          "subtitle": "Mythological Line Art of Mithila",
          "description": "Hand-painted fish, peacocks, and deities rendered with double outlines and natural mineral colors.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Folk Art"
        },
        {
          "title": "Nalanda Ancient Monastery Rows",
          "subtitle": "The World's Ancient Residential Academy",
          "description": "Excavated red brick dormitories, meditation cells, and tiered stupas where 10,000 scholars once gathered.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Archaeology"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "jharkhand",
    "name": "Jharkhand",
    "capital": "Ranchi",
    "region": "East",
    "badge": "Land of Forests & Birsa Munda's Ulgulan",
    "tagline": "Santal Sohrai Tribal Murals, Sacred Sal Groves & Fiery Chhau Dance",
    "heroImage": "assets/img/photos/1518709268805-4e9042af9f23-w1200.jpg",
    "history": {
      "title": "Chotanagpur Tribal Realm & Birsa Munda Uprising",
      "era": "Ancient Times \u2013 20th Century CE",
      "keyFigures": [
        "Bhagwan Birsa Munda",
        "Sidho and Kanho Murmu",
        "Telanga Kharia",
        "Albert Ekka"
      ],
      "highlights": "The indigenous tribes of Jharkhand upheld customary forest self-rule under Parha systems for millennia. Bhagwan Birsa Munda spearheaded the legendary 'Ulgulan' (Great Tumult) uprising against British colonial exploitation, asserting tribal dignity and forest sovereignty.",
      "knowledgeSystem": "Sacred Sarna grove conservation ethics, indigenous herbal medicine, and natural mud-resist wall painting chemistry.",
      "discoveryMission": {
        "name": "The Terracotta Clusters of Maluti",
        "description": "Explore the historic village of Maluti to find 72 surviving terracotta temples built by Baj Basanta dynasty rulers.",
        "objective": "Identify the folk terracotta plaques illustrating Ramayana war scenes with local Santhal artistic motifs.",
        "quizQuestion": "Which tribal freedom hero led the historic 'Ulgulan' movement fighting for tribal land rights and dignity?",
        "quizOptions": [
          "Bhagwan Birsa Munda",
          "Sidho Murmu",
          "Tilka Manjhi",
          "Jatra Bhagat"
        ],
        "correctAnswer": 0,
        "explanation": "Birsa Munda (1875\u20131900) mobilized tribal communities to defend their forest homeland and self-rule against colonial tyranny."
      },
      "artifact": {
        "id": "sohrai-painted-pot",
        "name": "Sohrai Tribal Painted Vessel",
        "period": "Traditional Folk Art",
        "lore": "An earthenware pot coated with white mud (Charak matti) and painted with black manganese and red iron-rich earth depicting birds and deer.",
        "icon": "\ud83c\udffa"
      },
      "points": 150
    },
    "games": {
      "title": "Kati & Gedi Khela",
      "gameKey": "pallanguzhi",
      "type": "Traditional Santhal Wooden Disc Sport",
      "origin": "Santhal tribal hamlets across Dumka, Hazaribagh, and Ranchi",
      "rules": [
        "Kati is played using a curved semi-circular wooden stick to propel a wooden disc towards an opponent's target peg.",
        "Players must hop on one leg while striking targets with precision.",
        "Gedi involves bamboo stilt races across monsoon streams and muddy terrains."
      ],
      "equipment": "Carved hardwood Kati stick and disc, wooden target pegs.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Village Field",
        "playableTitle": "Experience Tribal Kati Sport",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Maluti Terracotta Temples & Jagannath Ranchi",
      "monumentName": "Maluti Terracotta Shrines",
      "builderEra": "17th \u2013 19th Century CE by Baj Basanta Dynasty",
      "architecturalStyle": "Bengal Chala Terracotta Stone & Brick Architecture",
      "marvelDetails": "A concentrated cluster of 72 historic terracotta temples standing in Maluti village, built without royal palaces as the kings competed solely in constructing sacred shrines.",
      "componentsToBuild": [
        {
          "id": "j1",
          "name": "Laterite Stone Base Plinth",
          "role": "Sturdy elevated base protecting against torrential jungle monsoons.",
          "hint": "Form the foundational plinth."
        },
        {
          "id": "j2",
          "name": "Curved Char-Chala Brick Chamber",
          "role": "Compact square chamber with four curved overhanging eaves.",
          "hint": "Build the brick sanctuary walls."
        },
        {
          "id": "j3",
          "name": "Sohrai-Inspired Terracotta Panels",
          "role": "Carved clay tiles blending classical epics with tribal peacocks and tigers.",
          "hint": "Decorate the facade with clay tiles."
        },
        {
          "id": "j4",
          "name": "Terracotta Arched Gateway",
          "role": "Tripartite cusped entrance framing the inner Shiva lingam.",
          "hint": "Install the arched doorway."
        },
        {
          "id": "j5",
          "name": "Kalasha Ridge Pinnacle",
          "role": "Earthen pot finial crowning the curved apex ridge.",
          "hint": "Place the crowning roof ridge."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Sarhul & Karam Festival",
      "season": "Chaitra (March \u2013 April) & Bhadrapada (August \u2013 September)",
      "rituals": "Sarhul is celebrated when the sacred Sal trees burst into white fragrant blossoms, symbolizing renewal and wedding of Earth and Sun. Village priests (Pahan) predict rains by water stored in clay pots. Karam festival honors prosperity and sibling bonds.",
      "culinaryHeritage": "Dhuska (crispy fried rice and chana dal cakes served with spicy aloo-chana), Rugra (wild mushroom delicacy), and Madua Roti.",
      "celebrationStyle": "Community dancing to the thunderous beats of Mandar and Nagara drums with Sal flowers tucked behind ears.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Seraikella Chhau Dance, Sohrai Murals & Dokra Craft",
      "dance": "Chhau (classical masked dance of Seraikella characterized by lyrical mask expressions and martial sword movements).",
      "music": "Tribal folk rhythms played on Mandar, Nagara, Dhamsa, and bamboo Bansi flutes.",
      "handicrafts": "Sohrai and Khovar wall mural art, Dokra brass metal craft, Jadopatia scroll paintings.",
      "textile": "Kuchai Tussar Silk handwoven by indigenous weavers using wild forest cocoons.",
      "lifestyle": "Sacred reverence for Sarna forest groves, community decision-making in Gram Sabhas, and eco-harmony.",
      "slideshowSlides": [
        {
          "title": "Seraikella Chhau Masked Ballet",
          "subtitle": "Lyricism of Mask and Martial Grace",
          "description": "Dancers wearing serene pastel clay masks depicting celestial beings, executing acrobatic sword steps.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Masked Dance"
        },
        {
          "title": "Maluti Terracotta Temple Cluster",
          "subtitle": "Seventy-Two Sacred Shrines of Dumka",
          "description": "Historic village where kings built 108 terracotta temples dedicated to Shiva, with 72 surviving today.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Sohrai Indigenous Mud Murals",
          "subtitle": "Forest Animals Painted on Mud Walls",
          "description": "Women painting mud walls after harvest using natural ochre, charcoal, and kaolin clay using broken combs.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Tribal Art"
        },
        {
          "title": "Sarhul Sacred Sal Bloom",
          "subtitle": "Thanksgiving to Mother Nature",
          "description": "Tribal elders and youth dancing in circles wearing white and red striped dhotis adorned with fragrant Sal flowers.",
          "image": "assets/img/photos/1567157577867-05ccb1388e66-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "chhattisgarh",
    "name": "Chhattisgarh",
    "capital": "Raipur",
    "region": "East",
    "badge": "Heart of Bastar Tribal Art & Ancient Sirpur",
    "tagline": "Bastar 75-Day Dussehra, Laxman Brick Temple & Bell-Metal Dokra Artisans",
    "heroImage": "assets/img/heritage-placeholder.svg",
    "history": {
      "title": "Dakshina Kosala Kingdom & Bastar Royal Lineage",
      "era": "5th Century CE \u2013 20th Century CE",
      "keyFigures": [
        "Rani Vasata",
        "Mahashivagupta Balarjuna",
        "Rani Durgavati",
        "Gundadhur"
      ],
      "highlights": "Ancient Chhattisgarh was known as Dakshina Kosala. Under King Mahashivagupta Balarjuna, the capital Sirpur became a flourishing multi-faith metropolis with over 100 Buddhist monasteries and Hindu temples praised by Chinese traveler Hiuen Tsang in 639 CE.",
      "knowledgeSystem": "Bastar lost-wax bell-metal metallurgy, tribal iron extraction in traditional charcoal kilns, and bamboo architectural joinery.",
      "discoveryMission": {
        "name": "The Intricate Brickwork of Sirpur",
        "description": "Examine the 7th-century Laxman Temple at Sirpur, one of the finest surviving burnt-brick temples in India.",
        "objective": "Identify the exquisitely carved torana doorway depicting the reclining Vishnu and Krishna legends.",
        "quizQuestion": "Which queen commissioned the world-famous Laxman brick temple at Sirpur in memory of her late husband?",
        "quizOptions": [
          "Queen Vasata",
          "Rani Durgavati",
          "Rani Rudrama Devi",
          "Rani Mangammal"
        ],
        "correctAnswer": 0,
        "explanation": "Queen Vasata, daughter of King Suryavarma of Magadha, built the temple around 625\u2013650 CE in memory of King Harshagupta."
      },
      "artifact": {
        "id": "bastar-dokra-bull",
        "name": "Bastar Lost-Wax Dokra Nandi",
        "period": "Traditional Folk Craft",
        "lore": "A non-ferrous metal alloy bull crafted using natural beeswax threads and clay moulds by the Ghadwa tribal metalsmiths.",
        "icon": "\ud83d\udc02"
      },
      "points": 150
    },
    "games": {
      "title": "Gedi Stilt Race & Bati (Marbles)",
      "gameKey": "pallanguzhi",
      "type": "Traditional Balancing & Targeting Sport",
      "origin": "Paddy fields and rural courtyards across Bastar and Surguja",
      "rules": [
        "During Hareli festival, youth construct tall bamboo stilts (Gedi) and race through waterlogged village tracks.",
        "Bati involves precision marble flicking targeting opponents' marbles out of rings.",
        "Ati-Pati is a tactical cross-field tag game requiring team agility."
      ],
      "equipment": "Bamboo poles with carved wooden foot brackets, glass marbles or polished river stones.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Village Grounds",
        "playableTitle": "Experience Chhattisgarhi Folk Games",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Laxman Temple (Sirpur) & Bhoramdeo Complex",
      "monumentName": "Laxman Brick Temple (Sirpur)",
      "builderEra": "7th Century CE by Queen Vasata",
      "architecturalStyle": "Early Nagara Brick & Stone Architecture",
      "marvelDetails": "Built of finely molded red clay bricks bound with lime and herbal surkhi mortar. The stone doorway features masterfully chiseled dvarapalas, river goddesses Ganga and Yamuna, and intricate foliage carvings.",
      "componentsToBuild": [
        {
          "id": "cg1",
          "name": "Elevated Stone Jagati Plinth",
          "role": "Massive stone platform carved with elephant friezes.",
          "hint": "Construct the high stone terrace base."
        },
        {
          "id": "cg2",
          "name": "Carved Stone Doorframe",
          "role": "Exquisitely sculpted stone portal depicting Dashavatara and floral vines.",
          "hint": "Install the ornate stone doorway."
        },
        {
          "id": "cg3",
          "name": "Molded Red Brick Sanctum",
          "role": "Brick walls adorned with false windows, chaitya arches, and niches.",
          "hint": "Assemble the decorative brick walls."
        },
        {
          "id": "cg4",
          "name": "Curvilinear Brick Shikhara",
          "role": "Stepped pyramidal tower constructed entirely of precision-carved bricks.",
          "hint": "Build the towering brick spire."
        },
        {
          "id": "cg5",
          "name": "Stone Amalaka Ribbed Finial",
          "role": "Large ribbed stone disc crowning the highest brick spire tier.",
          "hint": "Place the stone crowning disc."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Bastar Dussehra & Hareli",
      "season": "Shravana (July \u2013 August) & Ashvin (October)",
      "rituals": "Bastar Dussehra is the world's longest festival, celebrated over 75 days. Unlike anywhere else, it does not celebrate the slaying of Ravana, but venerates Goddess Danteshwari through massive eight-wheeled wooden chariots pulled by thousands of tribal citizens.",
      "culinaryHeritage": "Chila (rice and urad dal crepes), Fara (steamed seasoned rice dumplings), and Bafauri (steamed chana dal balls).",
      "celebrationStyle": "Gedi bamboo stilt parades during Hareli, Madai tribal fairs with sacred flags, and hypnotic Gaur Maria dances.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Panthi Dance, Bastar Dokra & Pandavani Ballads",
      "dance": "Panthi (energetic acrobatic dance of the Satnami community forming high human pyramids to celebrate Guru Ghasidas).",
      "music": "Pandavani (dramatic musical storytelling of Mahabharata using the Ektara and Kartal, made globally famous by Teejan Bai).",
      "handicrafts": "Bastar Bell-Metal Dokra casting, wrought iron (Loha Shilp) crafting, terracotta tribal pottery.",
      "textile": "Kosa Silk (wild tussar silk known for natural golden luster and breathable weave) from Champa.",
      "lifestyle": "Reverence for sacred groves (Devgudis), Ghotul youth dormitories teaching cooperative living, and bamboo craft.",
      "slideshowSlides": [
        {
          "title": "Panthi Acrobatic Folk Dance",
          "subtitle": "Human Pyramids of Spiritual Harmony",
          "description": "Satnami dancers clad in white forming towering human spires to the hypnotic rhythm of the Mandar drum.",
          "image": "assets/img/heritage-placeholder.svg",
          "tag": "Folk Dance"
        },
        {
          "title": "Laxman Brick Temple of Sirpur",
          "subtitle": "Seventh-Century Masterpiece of Carved Clay",
          "description": "Pristine red brick temple enduring for 1,400 years, adorned with intricate chaitya dormer motifs.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Bastar Bell-Metal Casting",
          "subtitle": "Tribal Metallurgy of the Lost-Wax Art",
          "description": "Artisans shaping beeswax filaments into slender elephants and lamps before encasing in river clay moulds.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Metalcraft"
        },
        {
          "title": "Bastar Chariot Pulling",
          "subtitle": "Seventy-Five Days of Tribal Pageantry",
          "description": "Massive two-tier wooden chariot handcrafted without nails pulled through Jagdalpur by thousands of tribal devotees.",
          "image": "assets/img/photos/1567157577867-05ccb1388e66-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "assam",
    "name": "Assam",
    "capital": "Dispur",
    "region": "Northeast",
    "badge": "Realm of the Ahoms & Golden Muga Silk",
    "tagline": "Undefeated Ahom Amphitheatre of Rang Ghar, Bihu Rhythms & One-Horned Rhinos",
    "heroImage": "assets/img/photos/1544735716-392fe2489ffa-w1200.jpg",
    "history": {
      "title": "Ahom Dynasty & Kamarupa Kingdom",
      "era": "4th Century CE \u2013 19th Century CE",
      "keyFigures": [
        "Lachit Borphukan",
        "Chaolung Sukaphaa",
        "Srimanta Sankardev",
        "Rudra Singha"
      ],
      "highlights": "The Ahom Kingdom ruled the Brahmaputra valley for 600 unbroken years, defeating 17 Mughal invasion attempts. General Lachit Borphukan's brilliant naval strategy at the Battle of Saraighat in 1671 remains legendary in military history.",
      "knowledgeSystem": "Brahmaputra riverine flood dyke engineering, Sattra monastery monastic preservation, and sericulture of wild golden silk.",
      "discoveryMission": {
        "name": "The Royal Pavilion of Rang Ghar",
        "description": "Visit the two-storey Rang Ghar in Sibsagar, built by Ahom King Pramatta Singha in 1744 CE as a royal sports amphitheatre.",
        "objective": "Identify the inverted boat-shaped roof and the mortar made from sticky Bora rice and duck eggs.",
        "quizQuestion": "Which celebrated Ahom amphitheatre is considered one of the oldest surviving royal sports pavilions in Asia?",
        "quizOptions": [
          "Rang Ghar",
          "Kareng Ghar",
          "Talatal Ghar",
          "Garhgaon Palace"
        ],
        "correctAnswer": 0,
        "explanation": "Rang Ghar served as the royal pavilion where Ahom monarchs and nobles watched traditional sports like wrestling, buffalo fights, and Bihu dances."
      },
      "artifact": {
        "id": "assam-jaapi",
        "name": "Traditional Woven Jaapi Hat",
        "period": "Traditional Folk Symbol",
        "lore": "A conical headgear woven from bamboo, cane, and large Tokow palm leaves, adorned with red and white felt ornaments as a badge of honor.",
        "icon": "\ud83d\udc52"
      },
      "points": 150
    },
    "games": {
      "title": "Dhopkhel & Tang Guti",
      "gameKey": "pallanguzhi",
      "type": "Traditional Indigenous Ball Toss Sport",
      "origin": "Village pastures and royal grounds of Assam",
      "rules": [
        "Dhopkhel is a fast-paced game played by two 11-member teams tossing a cloth rubber ball (Dhop) across a central line.",
        "Throwers must cross into the opponent territory while evading being tagged with the ball.",
        "Tang Guti is the indigenous tip-cat game requiring quick strikes on flying wooden pegs."
      ],
      "equipment": "Hand-stitched cloth Dhop ball packed with dried cotton and rubber, bamboo court markings.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Village Grounds",
        "playableTitle": "Experience Assamese Dhopkhel",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Rang Ghar (Sibsagar) & Kamakhya Temple",
      "monumentName": "Rang Ghar Royal Pavilion",
      "builderEra": "1744 CE by Ahom King Pramatta Singha",
      "architecturalStyle": "Ahom Brick & Indigenous Mortar Architecture",
      "marvelDetails": "Constructed with special thin flat bricks bonded using indigenous mortar made of sticky Bora rice, duck eggs, and pulse flour. The roof resembles an inverted Ahom royal longboat crowned with stone crocodiles.",
      "componentsToBuild": [
        {
          "id": "as1",
          "name": "Trapezoidal Brick Plinth",
          "role": "Massive two-storey brick base designed to accommodate royal spectators.",
          "hint": "Lay the sturdy brick terrace base."
        },
        {
          "id": "as2",
          "name": "Arched Ground Floor Pavilions",
          "role": "Series of vaulted brick arches opening toward the amphitheatre field.",
          "hint": "Construct the arched ground gallery."
        },
        {
          "id": "as3",
          "name": "Royal Viewing Gallery",
          "role": "Open second-storey hall where the Ahom monarch reclined.",
          "hint": "Build the royal upper chamber."
        },
        {
          "id": "as4",
          "name": "Inverted Longboat Roof",
          "role": "Graceful roof curved in the shape of a traditional Ahom royal warboat.",
          "hint": "Install the curved inverted boat roof."
        },
        {
          "id": "as5",
          "name": "Carved Stone Crocodile Crest",
          "role": "Pair of sculpted stone crocodiles guarding the rooftop ridge.",
          "hint": "Place the ornamental crocodile finials."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Rongali Bihu & Ambubachi Mela",
      "season": "Bohag (Mid-April) & Ashadha (June)",
      "rituals": "Rongali (Bohag) Bihu celebrates the Assamese New Year with the washing of cattle (Goru Bihu) and energetic community dancing. Ambubachi Mela at Kamakhya Temple celebrates the annual fertility retreat of Mother Earth.",
      "culinaryHeritage": "Khar (alkaline raw papaya dish prepared using burnt banana peel ash water), Masor Tenga (tangy river fish curry), Pitha, and Laru.",
      "celebrationStyle": "Vibrant Bihu dances by youths with red floral Gamochas, Pepa buffalo-horn trumpets, and Toka bamboo clappers.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Bihu Dance, Sattriya Classical & Muga Silk",
      "dance": "Bihu (spirited folk dance characterized by rapid hand movements, graceful hip sways, and youthful vibrancy) and Sattriya (classical monastic dance).",
      "music": "Bihu Geet accompanied by the Dhol drum, Pepa buffalo horn horn, Gogona reed mouth harp, and Toka clapper.",
      "handicrafts": "Sarthebari bell-metal utensil crafting, Barpeta brass casting, bamboo and cane craft.",
      "textile": "Muga Silk (golden shimmering silk exclusive to Assam, known for durability that outlasts its wearer) and Gamocha handwoven cotton towels.",
      "lifestyle": "Tea garden heritage, living in bamboo Chang Ghar stilt houses, and community village prayer halls (Namghar).",
      "slideshowSlides": [
        {
          "title": "Rongali Bihu Celebration",
          "subtitle": "Springtime Joy of the Brahmaputra Valley",
          "description": "Young women in shimmering golden Muga Mekhela Chadors dancing with red Kopou orchid blossoms in their hair.",
          "image": "assets/img/photos/1544735716-392fe2489ffa-w1000.jpg",
          "tag": "Folk Dance"
        },
        {
          "title": "Rang Ghar Royal Pavilion",
          "subtitle": "Asia's Oldest Royal Amphitheatre (1744 CE)",
          "description": "Two-storey brick pavilion shaped like an inverted longboat where Ahom kings watched community sports.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Assamese Muga Golden Silk",
          "subtitle": "The Natural Golden Thread of the Earth",
          "description": "Lustrous golden silk thread derived from the endemic Antheraea assamensis silkworm, spun on traditional handlooms.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Textiles"
        },
        {
          "title": "The Resonant Pepa Horn",
          "subtitle": "Voice of the Asiatic Water Buffalo",
          "description": "An ancient reed instrument crafted from curved buffalo horn that announces the arrival of Bohag spring across the valley.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Music"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "arunachal-pradesh",
    "name": "Arunachal Pradesh",
    "capital": "Itanagar",
    "region": "Northeast",
    "badge": "Land of Dawn-Lit Mountains & Tawang Monastery",
    "tagline": "Tawang's Mountain Monastery, Apatani Eco-Valleys & Sacred Tribal Councils",
    "heroImage": "assets/img/photos/1506744038136-46273834b3fb-w1200.jpg",
    "history": {
      "title": "Ancient Chutiya Realm & Himalayan Monastic Heritage",
      "era": "8th Century CE \u2013 Present",
      "keyFigures": [
        "Mera Lama Lodre Gyatso",
        "Rani Gaidinliu",
        "6th Dalai Lama (Tsangyang Gyatso)"
      ],
      "highlights": "Arunachal Pradesh is home to 26 major indigenous tribes each with distinct linguistic and cultural traditions. Tawang Monastery, founded in 1680\u201381 CE, is the second largest Buddhist monastery in the world, perched dramatically at 10,000 feet amidst Himalayan peaks.",
      "knowledgeSystem": "Apatani sustainable wet-rice and fish co-cultivation, bamboo earthquake engineering, and Kebang tribal village democracy.",
      "discoveryMission": {
        "name": "The High Sanctum of Tawang",
        "description": "Walk the three-storey Dukhang assembly hall of Tawang Monastery to examine its 28-foot gilded Buddha statue.",
        "objective": "Identify the ancient handwritten Kangyur Buddhist scriptures stored in silk wraps.",
        "quizQuestion": "Which celebrated 17th-century Tibetan Buddhist monastery in Arunachal Pradesh is the largest in India?",
        "quizOptions": [
          "Tawang Monastery (Galden Namgey Lhatse)",
          "Bomdila Monastery",
          "Urgelling Monastery",
          "Itanagar Gompa"
        ],
        "correctAnswer": 0,
        "explanation": "Tawang Monastery was founded in 1680\u201381 CE by Mera Lama Lodre Gyatso, housing over 450 monks amidst towering snow peaks."
      },
      "artifact": {
        "id": "monpa-wooden-mask",
        "name": "Monpa Carved Chaam Dance Mask",
        "period": "Traditional Monastic Craft",
        "lore": "A sacred cedar wood mask carved and painted with mineral pigments depicting celestial guardian deities.",
        "icon": "\ud83c\udfad"
      },
      "points": 150
    },
    "games": {
      "title": "Hinam Turnam & Majong",
      "gameKey": "pallanguzhi",
      "type": "Traditional Balancing & Wrestling Sport",
      "origin": "Tribal gatherings of the Nyishi, Adi, and Monpa communities",
      "rules": [
        "Hinam Turnam is a traditional strength and balance game where contestants mimic tiger and hunter agility.",
        "Traditional archery competitions test long-distance marksmanship using indigenous bamboo bows.",
        "Tug-of-war using thick forest creepers is played during harvest celebrations."
      ],
      "equipment": "Bamboo longbows, feathered reed arrows, wild jungle vine ropes.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Archery Range",
        "playableTitle": "Experience Himalayan Archery",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Tawang Monastery & Apatani Bamboo Houses",
      "monumentName": "Tawang Monastery (Galden Namgey Lhatse)",
      "builderEra": "1680\u20131681 CE by Mera Lama Lodre Gyatso",
      "architecturalStyle": "Tibetan Himalayan Monastic Fort Architecture",
      "marvelDetails": "Built like a fortified mountain citadel surrounded by a 925-foot compound wall with 65 residential quarters for monks and a three-storey assembly hall commanding panoramic views of the Tawang Chu valley.",
      "componentsToBuild": [
        {
          "id": "ap1",
          "name": "Fortified Stone Compound Wall",
          "role": "Defensive stone wall encircling the entire monastic hill.",
          "hint": "Build the outer stone fortress wall."
        },
        {
          "id": "ap2",
          "name": "Kakaling Entrance Gateway",
          "role": "Hut-shaped entrance gate painted with colorful mandalas on the ceiling.",
          "hint": "Position the painted gateway arch."
        },
        {
          "id": "ap3",
          "name": "Dukhang Assembly Hall",
          "role": "Three-storey main hall supported by massive timber columns.",
          "hint": "Erect the central prayer sanctuary."
        },
        {
          "id": "ap4",
          "name": "Sloping Sheet-Copper Roof",
          "role": "Gilded pagoda-style roof adorned with golden deer and Dharmachakra.",
          "hint": "Install the sweeping monastic roof."
        },
        {
          "id": "ap5",
          "name": "Golden Dhwaja Victory Banner",
          "role": "Sacred cylindrical metal finial standing proud above the ridge.",
          "hint": "Crown the sanctuary peak."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Losar & Nyokum Yullo",
      "season": "February & Mid-February",
      "rituals": "Losar marks the Monpa Tibetan Buddhist New Year celebrated with sacred masked Chaam dances and prayer flag hoisting. Nyokum is celebrated by the Nyishi tribe to invoke Mother Earth for universal agricultural prosperity.",
      "culinaryHeritage": "Thukpa, Zan (finger millet and mountain vegetable porridge), Momo, and fermented bamboo shoot delicacies.",
      "celebrationStyle": "Monpa sacred masked Chaam dances, Adi community war dances, and traditional chanting by village shamans.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Chaam Masked Dance, Thangka Painting & Cane Weaving",
      "dance": "Chaam (sacred monastic dance performed by lamas in flowing silk robes and wrathful animal masks) and Ponung of the Adis.",
      "music": "Deep low-tone monastic horn chanting (Dungchen) and celebratory tribal songs.",
      "handicrafts": "Thangka painting on silk, Monpa handmade Daphne paper, intricate bamboo and cane basketry.",
      "textile": "Apatani, Mishmi, and Adi geometric woven jackets and shawls with distinctive lozenge patterns.",
      "lifestyle": "Living in harmony with alpine pine forests, sustainable wet-rice agriculture, and Kebang community democracy.",
      "slideshowSlides": [
        {
          "title": "Tawang Torgya Chaam Dance",
          "subtitle": "Sacred Monastic Dance of the Lamas",
          "description": "Monks in elaborate silk brocades and hand-carved wooden masks dancing to cast away negative energies.",
          "image": "assets/img/photos/1506744038136-46273834b3fb-w1000.jpg",
          "tag": "Sacred Dance"
        },
        {
          "title": "Tawang Monastery Perched on Clouds",
          "subtitle": "Citadel of Buddhist Learning at 10,000 Feet",
          "description": "Whitewashed stone monastery complex flanked by prayer flags against the snow peaks of the Eastern Himalayas.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Apatani Eco-Farming Valley",
          "subtitle": "Centuries-Old Harmonious Terraces of Ziro",
          "description": "Indigenous agricultural channels integrating wet-rice farming and fingerling aquaculture without mechanized tools.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Living Tradition"
        },
        {
          "title": "Monpa Handwoven Woollen Textiles",
          "subtitle": "Geometric Heritage of the Mountains",
          "description": "Intricate loom-woven shawls dyed with walnut bark and wild madder roots depicting symbolic cloud patterns.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Handicrafts"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "manipur",
    "name": "Manipur",
    "capital": "Imphal",
    "region": "Northeast",
    "badge": "Cradle of Modern Polo & Manipuri Raas Leela",
    "tagline": "Ancient Sagol Kangjei Polo, Floating Loktak Lake & Thang-Ta Martial Arts",
    "heroImage": "assets/img/heritage-placeholder.svg",
    "history": {
      "title": "Kingdom of Kangleipak & Birthplace of Polo",
      "era": "33 CE \u2013 1949 CE",
      "keyFigures": [
        "King Nongda Lairen Pakhangba",
        "Maharaja Bhagyachandra",
        "Bir Tikendrajit Singh",
        "Paona Brajabashi"
      ],
      "highlights": "The royal chronicle Cheitharol Kumbaba records a continuous dynasty dating back to 33 CE. Manipur gifted modern Polo (Sagol Kangjei) to the world, played on indigenous semi-feral Manipuri ponies. Maharaja Bhagyachandra composed the classical Manipuri Raas Leela.",
      "knowledgeSystem": "Thang-Ta armed and unarmed martial science, Sagol Kangjei equestrian horsemanship, and floating bio-mass (Phumdi) wetland management.",
      "discoveryMission": {
        "name": "The Origins of Sagol Kangjei",
        "description": "Explore the historic Mapal Kangjeibung in Imphal, the oldest living polo ground in the world.",
        "objective": "Identify the seven-a-side polo rules and traditional cane mallets used by Meitei horsemen.",
        "quizQuestion": "Which traditional equestrian sport originating in Manipur gave birth to modern polo?",
        "quizOptions": [
          "Sagol Kangjei",
          "Yubi Lakpi",
          "Mukna",
          "Thang-Ta"
        ],
        "correctAnswer": 0,
        "explanation": "Sagol Kangjei has been played in Manipur since ancient times, documented by British officers in the 1850s who codified it into modern Polo."
      },
      "artifact": {
        "id": "kumil-potloi-skirt",
        "name": "Manipuri Raas Leela Potloi Skirt Model",
        "period": "18th Century CE",
        "lore": "A cylindrical stiffened satin skirt embroidered with golden sequins, mirrors, and gossamer muslin designed for celestial pirouettes.",
        "icon": "\ud83d\udc57"
      },
      "points": 150
    },
    "games": {
      "title": "Sagol Kangjei & Yubi Lakpi",
      "gameKey": "pallanguzhi",
      "type": "Traditional Equestrian Polo & Coconut Rugby",
      "origin": "Polo grounds of Imphal and sacred festivals",
      "rules": [
        "Sagol Kangjei is played with 7 players per side on swift Manipuri ponies using cane mallets and bamboo root balls.",
        "Yubi Lakpi ('Coconut Snatching') is barefoot rugby played with a greased coconut that players must carry over a goal line.",
        "Mukna is traditional Meitei folk wrestling involving waist-grip throws."
      ],
      "equipment": "Cane polo sticks, bamboo root polo balls, oiled coconut, traditional horse tack.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Polo Field",
        "playableTitle": "Experience Sagol Kangjei Polo",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Kangla Fort & Govindaji Temple",
      "monumentName": "Kangla Fort Citadel",
      "builderEra": "33 CE onwards, fortified under King Khagemba in 17th Century",
      "architecturalStyle": "Meitei Royal Fort Architecture",
      "marvelDetails": "The ancient seat of Meitei royalty on the banks of the Imphal river, featuring sacred coronation halls, dragon shrines of Lord Pakhangba, and massive brick ramparts and defensive moats.",
      "componentsToBuild": [
        {
          "id": "mn1",
          "name": "Kangla Moat & Earthen Ramparts",
          "role": "Water-filled defensive ring protecting the royal sanctum.",
          "hint": "Excavate the protective moat network."
        },
        {
          "id": "mn2",
          "name": "Brick Coronation Hall",
          "role": "Ceremonial throne room where Meitei kings were formally coronated.",
          "hint": "Erect the central coronation chamber."
        },
        {
          "id": "mn3",
          "name": "Kangla Sha Dragon Statues",
          "role": "Colossal mythical dragon-lion figures standing guardian at the entrance.",
          "hint": "Position the twin dragon guardians."
        },
        {
          "id": "mn4",
          "name": "Sacred Pakhangba Shrine",
          "role": "Circular stone sanctum dedicated to the serpentine protector deity.",
          "hint": "Construct the sacred dragon shrine."
        },
        {
          "id": "mn5",
          "name": "Timber Palace Gateway",
          "role": "Intricately carved wooden entrance gate adorned with royal shields.",
          "hint": "Finish with the monumental royal gate."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Yaoshang & Lai Haraoba",
      "season": "Phalguna (March) & May",
      "rituals": "Yaoshang is a vibrant five-day spring festival uniting sports tournaments with the nocturnal Thabal Chongba ('Dancing in the Moonlight') circle dance. Lai Haraoba ('Pleasing the Gods') reenacts the creation of the cosmos through ritual dance and music.",
      "culinaryHeritage": "Kangshoi (stew of seasonal vegetables with fermented fish and ginger), Singju (spicy raw salad with lotus stems and perilla seeds), and Chak-hao Kheer (purple aromatic black rice pudding).",
      "celebrationStyle": "Thabal Chongba moonlight community circle dancing, Penna stringed instrument recitals, and Maibi priestess dances.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Manipuri Classical Raas, Thang-Ta & Kauna Craft",
      "dance": "Manipuri Classical Raas Leela (revolving around divine love, characterized by gentle torso swaying and delicate Potloi skirts) and Thang-Ta sword-and-spear martial art.",
      "music": "Penna (ancient bowed lute with coconut shell resonator) and Pung drum accompaniment.",
      "handicrafts": "Kauna water-reed woven baskets and mats, Longpi black stone pottery.",
      "textile": "Shaphee Lanphee embroidered black shawls with animal symbols, Moirang Phee sarees with temple borders.",
      "lifestyle": "Ima Keithel (Mother's Market, world's largest all-women operated market in Imphal), and floating lake living on Loktak.",
      "slideshowSlides": [
        {
          "title": "Manipuri Classical Raas Leela",
          "subtitle": "Celestial Grace of the Potloi Skirt",
          "description": "Dancers performing the divine Raas in shimmering cylindrical Potloi skirts that float without showing foot movements.",
          "image": "assets/img/heritage-placeholder.svg",
          "tag": "Classical Dance"
        },
        {
          "title": "Sagol Kangjei Original Polo",
          "subtitle": "The Ancient Equestrian Heritage of Manipur",
          "description": "Meitei horsemen riding swift Manipuri ponies wielding cane mallets in the original cradle of the sport.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Equestrian Sport"
        },
        {
          "title": "Floating Islands of Loktak Lake",
          "subtitle": "World's Only Floating Wetland Phumdis",
          "description": "Circular rings of dense vegetation and soil floating upon freshwater Loktak Lake, home to the endangered Sangai deer.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Natural Wonder"
        },
        {
          "title": "Ima Keithel All-Women Market",
          "subtitle": "Empowered Legacy of 5,000 Women Traders",
          "description": "Over 500-year-old market in Imphal run entirely by married women merchants selling handloom and fresh produce.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "meghalaya",
    "name": "Meghalaya",
    "capital": "Shillong",
    "region": "Northeast",
    "badge": "Abode of the Clouds & Living Root Bridges",
    "tagline": "Bio-Engineered Living Root Bridges, Matrilineal Khasi Kinship & Hundred Drums Wangala",
    "heroImage": "assets/img/photos/1596178065887-1198b6148b2b-w1200.jpg",
    "history": {
      "title": "Matrilineal Khasi, Jaintia & Garo Realms",
      "era": "Ancient Times \u2013 Present",
      "keyFigures": [
        "U Tirot Sing",
        "Kiang Nangbah",
        "Pa Togan Sangma"
      ],
      "highlights": "Meghalaya is world-renowned for its indigenous matrilineal societal structure, where family lineage and ancestral property pass down through the youngest daughter (Khadduh). The Khasi and Jaintia tribes developed bio-engineering techniques that grow functional bridges out of living tree roots.",
      "knowledgeSystem": "Jingkieng Jri living tree-root bio-engineering, sacred forest (Law Kyntang) ecosystem conservation, and bamboo gravity-drip irrigation.",
      "discoveryMission": {
        "name": "The Double Decker Root Bridge of Nongriat",
        "description": "Descend 3,500 stone stairs into the rainforest of Cherrapunji to inspect the Umshiang Double Decker Living Root Bridge.",
        "objective": "Understand how aerial roots of Ficus elastica trees are guided through hollowed betel nut trunks over 50 years to form indestructible bridges.",
        "quizQuestion": "Which botanical species is guided by Khasi artisans to create the living root bridges of Meghalaya?",
        "quizOptions": [
          "Ficus elastica (Indian Rubber Tree)",
          "Banyan Tree",
          "Teak Tree",
          "Bamboo Cane"
        ],
        "correctAnswer": 0,
        "explanation": "Khasi and Jaintia tribes train the aerial roots of the Ficus elastica rubber fig tree across rivers, growing stronger as the tree ages."
      },
      "artifact": {
        "id": "khasi-knup-umbrella",
        "name": "Traditional Khasi Knup Rainshield",
        "period": "Traditional Folk Craft",
        "lore": "A turtle-shell shaped rainshield woven from bamboo, cane, and waterproof leaves that covers the head and back during tropical downpours.",
        "icon": "\ud83d\udee1\ufe0f"
      },
      "points": 150
    },
    "games": {
      "title": "Mawpoin & Siat Khnam Archery",
      "gameKey": "pallanguzhi",
      "type": "Traditional Archery & Seven Stones",
      "origin": "Sacred archery grounds of Shillong and Khasi hills",
      "rules": [
        "Siat Khnam is sacred traditional archery where archers release hundreds of bamboo arrows at targets with bets on the arrow count.",
        "Mawpoin is the traditional Khasi game of seven flat stones stacked and defended.",
        "Wa'pong Sika is a Garo indigenous pole-pushing contest testing raw muscular strength."
      ],
      "equipment": "Bamboo bows, feathered arrows, cylindrical straw targets, flat stones.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Archery Ground",
        "playableTitle": "Experience Khasi Archery",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Double Decker Living Root Bridge & Nartiang Monoliths",
      "monumentName": "Double Decker Living Root Bridge (Jingkieng Jri)",
      "builderEra": "Grown continuously over several centuries",
      "architecturalStyle": "Living Botanical Architecture",
      "marvelDetails": "Two parallel tiers of living interlocked tree roots spanning across the roaring Umshiang river. As the trees live and grow, the bridge becomes stronger, self-healing, and capable of holding over 50 people simultaneously in torrential rainforests.",
      "componentsToBuild": [
        {
          "id": "mg1",
          "name": "Twin Ficus Elastica Root Anchors",
          "role": "Massive living rubber fig trees rooted firmly on opposite riverbanks.",
          "hint": "Plant the anchor trees on both banks."
        },
        {
          "id": "mg2",
          "name": "Areca Palm Hollow Guiding Trunks",
          "role": "Hollowed betel nut trunks guiding tender aerial roots across the chasm.",
          "hint": "Span the guiding bamboo trunks."
        },
        {
          "id": "mg3",
          "name": "Interwoven Lower Root Deck",
          "role": "Tangled living roots packed with stones forming the primary walking deck.",
          "hint": "Weave the lower walking deck."
        },
        {
          "id": "mg4",
          "name": "Second-Storey Upper Root Deck",
          "role": "Second tier grown above to allow crossing during massive monsoon river surges.",
          "hint": "Grow the second upper bridge deck."
        },
        {
          "id": "mg5",
          "name": "Living Root Handrails",
          "role": "Trained aerial root balustrades ensuring safe passage over misty rapids.",
          "hint": "Train the protective living root handrails."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Wangala (Hundred Drums) & Shad Suk Mynsiem",
      "season": "November & April",
      "rituals": "Wangala is the post-harvest thanksgiving festival of the Garos dedicated to Misi Saljong. A hundred long oval drums (Dama) are beaten in synchronized cadence by men while women dance in lines wearing feathered headgear. Shad Suk Mynsiem is the Khasi dance of cheerful hearts.",
      "culinaryHeritage": "Jadoh (fragrant rice cooked with pork or chicken and wild herbs), Dohkhlieh, Tungrymbai (fermented soybean paste), and Pudoh.",
      "celebrationStyle": "Hundred synchronized long drums, feather headgear (Kotip), and golden crown dancing by young women.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Wangala Drumming, Ryndia Eri Silk & Matrilineal Lore",
      "dance": "Wangala (hundred drums dance of the Garos) and Shad Nongkrem (sacred Khasi thanksgiving dance in royal courtyards).",
      "music": "Duitara (two-stringed Khasi lute), Ksing drums, and harmonious choral folk singing.",
      "handicrafts": "Cane and bamboo basketry, iron tools of Sohra, wood carving.",
      "textile": "Ryndia (indigenous eco-friendly Eri silk handspun and handwoven using natural plant dyes like turmeric and iron water).",
      "lifestyle": "Reverence for matrilineal heritage, sacred groves, organic living, and clean villages (Mawlynnong).",
      "slideshowSlides": [
        {
          "title": "Wangala Hundred Drums Dance",
          "subtitle": "Thunder of Drums Across the Garo Hills",
          "description": "Men beating one hundred slender wooden drums in unison while women dance in coordinated rows.",
          "image": "assets/img/photos/1596178065887-1198b6148b2b-w1000.jpg",
          "tag": "Folk Dance"
        },
        {
          "title": "Double Decker Living Root Bridge",
          "subtitle": "Nature's Supreme Bio-Engineering",
          "description": "Two tiers of living Ficus elastica roots woven over decades spanning roaring rainforest streams at Nongriat.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Shad Suk Mynsiem Royal Dancers",
          "subtitle": "The Dance of Peaceful Hearts",
          "description": "Khasi maidens wearing solid gold crowns (Pansngiat) and coral necklaces moving in gentle rhythmic steps.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Living Tradition"
        },
        {
          "title": "Mawlynnong Village Cleanliness",
          "subtitle": "God's Own Pristine Green Hamlet",
          "description": "Cobbled pathways, bamboo dustbins, and blooming orchids cared for collectively by every village citizen.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Eco-Heritage"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "mizoram",
    "name": "Mizoram",
    "capital": "Aizawl",
    "region": "Northeast",
    "badge": "Land of the Lushai Hills & Cheraw Bamboo Dance",
    "tagline": "Rhythmic Precision of Cheraw, Chapchar Kut Carnival & Intricate Puan Weaving",
    "heroImage": "assets/img/photos/1544735716-392fe2489ffa-w1200.jpg",
    "history": {
      "title": "Zo Clan Heritage & Traditional Governance",
      "era": "Ancient Times \u2013 Present",
      "keyFigures": [
        "Lal Ropuiliani",
        "Lallula",
        "Vanapa",
        "Taitesena"
      ],
      "highlights": "The Lushai Hills nurtured brave Zo clans governed by village chiefs (Lal) and the community youth dormitory (Zawlbuk), where martial arts, discipline, and the supreme code of 'Tlawmngaihna' (selfless community service) were instilled.",
      "knowledgeSystem": "Tlawmngaihna moral philosophy of altruism, bamboo engineering for steep mountain slopes, and Jhum shifting agro-ecology.",
      "discoveryMission": {
        "name": "The Megaliths of Vangchhia",
        "description": "Explore the ancient archaeological site of Vangchhia to inspect over 170 carved standing menhirs depicting warrior figures.",
        "objective": "Identify the mysterious water pavilion and subterranean burial chambers hidden in the mountain ridge.",
        "quizQuestion": "Which celebrated Mizo traditional dance involves dancers stepping gracefully between clapping bamboo poles?",
        "quizOptions": [
          "Cheraw Dance",
          "Khuallam",
          "Chheihlam",
          "Solakia"
        ],
        "correctAnswer": 0,
        "explanation": "Cheraw (the Bamboo Dance) requires phenomenal agility as pairs of dancers step in and out of rhythmic clapping bamboo grids."
      },
      "artifact": {
        "id": "mizo-vakiria",
        "name": "Traditional Mizo Vakiria Headdress",
        "period": "Traditional Cultural Symbol",
        "lore": "A regal crown made of brass ring encircled by colorful bird feathers, beetle wings, and dangling porcupine quills worn during Cheraw.",
        "icon": "\ud83d\udc51"
      },
      "points": 150
    },
    "games": {
      "title": "Insuknawr & Kalchhet Tsang",
      "gameKey": "pallanguzhi",
      "type": "Traditional Rod-Pushing & Bamboo Agility",
      "origin": "Zawlbuk bachelors' dormitories across Mizo villages",
      "rules": [
        "Insuknawr is an indigenous combat sport where two contestants inside a 16-foot circle push a wooden log against each other's chest.",
        "The player who pushes the opponent outside the circle wins the duel.",
        "Kalchhet Tsang is an obstacle balance race navigating across suspended bamboo poles."
      ],
      "equipment": "Smooth hardwood pole (Suk), marked circular ring.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Village Ring",
        "playableTitle": "Experience Mizo Insuknawr",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Traditional Mizo In (Bamboo Stilt House) & Vangchhia",
      "monumentName": "Traditional Mizo In Stilt House",
      "builderEra": "Traditional Vernacular Architecture",
      "architecturalStyle": "Bamboo Timber Stilt Mountain Architecture",
      "marvelDetails": "Built entirely of bamboo, timber poles, and thatch perched precariously on steep mountain ridges. The flexible bamboo frame absorbs mountain winds and monsoon tremors while allowing natural light and cross ventilation.",
      "componentsToBuild": [
        {
          "id": "mz1",
          "name": "Steep Ridge Timber Stilts",
          "role": "Heavy hardwood posts driven deep into the sloping mountain soil.",
          "hint": "Anchor the foundation timber poles."
        },
        {
          "id": "mz2",
          "name": "Woven Flattened Bamboo Floor",
          "role": "Flexible, breathable floor made of split and flattened bamboo mats.",
          "hint": "Lay the woven bamboo floor deck."
        },
        {
          "id": "mz3",
          "name": "Central Hearth (Tapchhuah)",
          "role": "Fireproof mud-coated stone hearth for cooking and winter warmth.",
          "hint": "Install the central hearth."
        },
        {
          "id": "mz4",
          "name": "Woven Bamboo Mat Walls",
          "role": "Interlocked double-weave bamboo wall screens shielding rain.",
          "hint": "Erect the woven bamboo walls."
        },
        {
          "id": "mz5",
          "name": "Thick Thatch Thatched Roof",
          "role": "Steeply sloping bamboo and wild grass thatch shedding downpours.",
          "hint": "Install the steep thatched roof."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Chapchar Kut & Pawl Kut",
      "season": "March & December",
      "rituals": "Chapchar Kut is the joyful spring carnival celebrated after the hard work of clearing the Jhum forest hills. Entire communities dress in traditional handloom attire, feast together, and perform the mesmerizing Cheraw bamboo dance in open village grounds.",
      "culinaryHeritage": "Bai (vegetable stew with fermented pork, bamboo shoots, and green mustard leaves), Sawhchiar (aromatic rice and meat porridge), and Mizo Vawksa.",
      "celebrationStyle": "Cheraw bamboo dancing, Khuallam welcome dance with embroidered shawls, and lively Gongs and drum beats.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Cheraw Bamboo Dance, Puan Handlooms & Tlawmngaihna",
      "dance": "Cheraw (famous Bamboo Dance demanding split-second timing between clapping horizontal bamboo poles) and Chheihlam.",
      "music": "Harmonious choral singing, brass Dar gongs, and indigenous drum percussion.",
      "handicrafts": "Embroidered Puanchei handlooms, bamboo baskets (Em), and cane smoking pipes.",
      "textile": "Puan handwoven textiles (Puanchei, Ngotekherh, Hmaram) characterized by vibrant red, white, and black stripes.",
      "lifestyle": "The moral ethos of Tlawmngaihna (putting others before oneself), warm village solidarity, and love for choral music.",
      "slideshowSlides": [
        {
          "title": "Cheraw Bamboo Dance Precision",
          "subtitle": "Rhythmic Ballet of the Clapping Canes",
          "description": "Dancers in vibrant Vakiria crowns leaping in and out of four-by-four clapping bamboo grids without missing a beat.",
          "image": "assets/img/photos/1544735716-392fe2489ffa-w1000.jpg",
          "tag": "Folk Dance"
        },
        {
          "title": "Vangchhia Ancient Carved Menhirs",
          "subtitle": "Mysteries of the Lushai Ridge",
          "description": "Over 170 ancient standing stone slabs etched with warrior reliefs, hunting scenes, and royal animal crests.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Archaeology"
        },
        {
          "title": "Mizo Puan Handloom Weaving",
          "subtitle": "Geometric Poetry of the Loin Loom",
          "description": "Weavers crafting exquisite Puanchei skirts on traditional backstrap looms using bold red and black striped patterns.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Textiles"
        },
        {
          "title": "Chapchar Kut Spring Pageantry",
          "subtitle": "Carnival of Joy in the Hills",
          "description": "Thousands of Mizo youth celebrating brotherhood and harvest in Aizawl wearing traditional woven headdresses.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "nagaland",
    "name": "Nagaland",
    "capital": "Kohima",
    "region": "Northeast",
    "badge": "Land of Warriors & the Hornbill Festival",
    "tagline": "Sixteen Naga Tribes, Carved Morung Architecture & Hornbill Cultural Showcase",
    "heroImage": "assets/img/photos/1506744038136-46273834b3fb-w1200.jpg",
    "history": {
      "title": "Sixteen Naga Republics & Morung Traditions",
      "era": "Ancient Times \u2013 Present",
      "keyFigures": [
        "A.Z. Phizo",
        "Rani Gaidinliu",
        "Haipou Jadonang"
      ],
      "highlights": "Nagaland comprises 16 distinct major tribes (Angami, Ao, Konyak, Sumi, Lotha, etc.) each with sovereign village councils. The Morung (youth educational hall) served as the vital cultural university where oral history, warfare, and craftsmanship were taught.",
      "knowledgeSystem": "Morung oral pedagogical system, Alder tree rotational agro-forestry, and wood log drum telegraphy.",
      "discoveryMission": {
        "name": "The Great Log Drum of the Ao",
        "description": "Inspect the massive hollowed tree trunk log drum (Tsungkotepsu) carved in an Ao Morung.",
        "objective": "Understand how synchronized rhythm patterns communicated news of victory, danger, and festivals across mountain valleys.",
        "quizQuestion": "Which world-famous annual festival held at Kisama Village celebrates the cultural convergence of all Naga tribes?",
        "quizOptions": [
          "Hornbill Festival",
          "Moatsu Festival",
          "Sekrenyi",
          "Aoleang"
        ],
        "correctAnswer": 0,
        "explanation": "The Hornbill Festival, known as the 'Festival of Festivals', takes place in early December, uniting all 16 tribes in traditional regalia."
      },
      "artifact": {
        "id": "naga-warrior-shawl",
        "name": "Ao Tsungkotepsu Warrior Shawl",
        "period": "Traditional Cultural Symbol",
        "lore": "A black and red woollen shawl painted with white silhouettes of tigers, Mithuns, human warriors, and spears awarded only to proven champions.",
        "icon": "\ud83e\udde3"
      },
      "points": 150
    },
    "games": {
      "title": "Naga Kene Wrestling & Phezhedz\u00fc",
      "gameKey": "pallanguzhi",
      "type": "Traditional Belt Wrestling & Stone Kicking",
      "origin": "Village festivals across Angami and Chakhesang hills",
      "rules": [
        "Naga Kene Wrestling requires competitors to grip an opponent's cloth waist belt and topple them until any body part except feet touches earth.",
        "Phezhedz\u00fc is a high-speed jumping and stone-kicking agility game.",
        "Greased bamboo pole climbing tests grip strength and balance."
      ],
      "equipment": "Woven cloth waist belts, oiled bamboo poles.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Wrestling Arena",
        "playableTitle": "Experience Naga Wrestling",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Carved Morung Youth Halls & Khonoma Village Gates",
      "monumentName": "Traditional Naga Morung Hall",
      "builderEra": "Traditional Tribal Architecture",
      "architecturalStyle": "Naga High-Pitched Timber & Thatch Architecture",
      "marvelDetails": "A monumental wooden community dormitory hall fronted by massive hand-carved pillars depicting hornbill birds, tigers, and human warriors, roofed with steep thatch designed to withstand mountain gales.",
      "componentsToBuild": [
        {
          "id": "ng1",
          "name": "Massive Timber Base Columns",
          "role": "Hardwood tree trunks supporting the frontal gabled roof structure.",
          "hint": "Erect the monumental front pillars."
        },
        {
          "id": "ng2",
          "name": "Carved Hornbill Totem Facade",
          "role": "Wood reliefs of Great Hornbills, Mithun heads, and warrior shields.",
          "hint": "Carve the ornamental front gable."
        },
        {
          "id": "ng3",
          "name": "Communal Log Drum Chamber",
          "role": "Central hall housing the 30-foot hollowed resonant log drum.",
          "hint": "Install the great log drum inside."
        },
        {
          "id": "ng4",
          "name": "Sloping Bamboo Thatched Roof",
          "role": "Deep sweeping thatch roof touching almost to the ground on sides.",
          "hint": "Cover with steep thatched roofing."
        },
        {
          "id": "ng5",
          "name": "Crossing Roof Horn Finials",
          "role": "Pair of crossed carved timber horns (Kika) crowning the roof peak.",
          "hint": "Place the crossed roof horns."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Hornbill Festival & Moatsu",
      "season": "December & Early May",
      "rituals": "The Hornbill Festival brings all 16 tribes to Kisama Heritage Village for ten days of magnificent warrior dances, traditional songs, archery, and tribal feasting. Moatsu is celebrated by the Ao tribe after sowing seeds with community bondings.",
      "culinaryHeritage": "Smoked Pork with Axone (fermented soybean cakes), Raja Mircha (Ghost Pepper chili chutney), and Bamboo Shoot curry.",
      "celebrationStyle": "Synchronized warrior leaps with spears and cowrie-shell shields, fire-making contests, and thunderous log drum beating.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Warrior Dances, Wood Carving & Distinctive Shawls",
      "dance": "Naga warrior dances (dynamic spear-spinning movements, rhythmic war cries, and defensive shield thumps).",
      "music": "Choral folksongs sung in rich vocal harmony, bamboo mouth harps, and log drum rhythms.",
      "handicrafts": "Wood carvings of hornbills and human figures, Konyak brass and glass bead necklaces, bamboo weaving.",
      "textile": "Distinctive tribal shawls (Angami Loramhoushu, Ao Tsungkotepsu, Lotha Rongsu) each encoding the wearer's clan and status.",
      "lifestyle": "Alder-based regenerative agriculture in Khonoma, community clan solidarity, and deep pride in oral heritage.",
      "slideshowSlides": [
        {
          "title": "Hornbill Festival Grand Pageantry",
          "subtitle": "The Festival of Festivals at Kisama",
          "description": "Sixteen tribes gathering in full ceremonial warrior regalia with hornbill feather crowns and brass neck rings.",
          "image": "assets/img/photos/1506744038136-46273834b3fb-w1000.jpg",
          "tag": "Living Tradition"
        },
        {
          "title": "Carved Morung Community Hall",
          "subtitle": "The Traditional University of the Naga",
          "description": "Massive timber architecture adorned with deep carvings of Mithun horns, tigers, and guardian warriors.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Naga Beadwork and Hornbill Plumes",
          "subtitle": "Ornaments of Valor and Status",
          "description": "Intricate glass and carnelian bead necklaces worn with black-and-white Great Indian Hornbill feathers.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Tribal Art"
        },
        {
          "title": "Khonoma Green Village Terraces",
          "subtitle": "Asia's First Certified Green Hamlet",
          "description": "Alder tree agro-forestry and terrace paddy cultivation nurtured by sustainable customary village laws.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Eco-Heritage"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "tripura",
    "name": "Tripura",
    "capital": "Agartala",
    "region": "Northeast",
    "badge": "Seat of the Manikya Kings & Water Palace of Neermahal",
    "tagline": "Lake Palace of Neermahal, Colossal Unakoti Rock Carvings & Hojagiri Dance",
    "heroImage": "assets/img/photos/1512343879784-a960bf40e7f2-w1200.jpg",
    "history": {
      "title": "Manikya Dynasty & Ancient Unakoti Sanctuary",
      "era": "14th Century CE \u2013 1949 CE",
      "keyFigures": [
        "Maharaja Bir Bikram Kishore Manikya",
        "Dhanya Manikya",
        "Rabindranath Tagore",
        "Maharani Kanchan Prabha Devi"
      ],
      "highlights": "The Manikya Dynasty ruled Tripura for over 500 years, chronicled in the royal epic Rajmala. The kingdom was an enlightened patron of arts, hosting Nobel laureate Rabindranath Tagore. Deep in the hills at Unakoti lie colossal 8th-century rock-cut bas-relief Shiva sculptures.",
      "knowledgeSystem": "Bamboo and cane architectural flexibility, hydraulic island palace engineering, and Hojagiri acrobatic equilibrium.",
      "discoveryMission": {
        "name": "The Submerged Splendor of Neermahal",
        "description": "Take a wooden boat across Rudrasagar Lake to explore Neermahal, the royal water palace built in 1930.",
        "objective": "Identify the blend of Mughal and Hindu architectural domes and open water moats.",
        "quizQuestion": "Which magnificent lake water palace in Tripura was built in the middle of Rudrasagar Lake?",
        "quizOptions": [
          "Neermahal Palace",
          "Ujjayanta Palace",
          "Kunjaban Palace",
          "Malanchabash"
        ],
        "correctAnswer": 0,
        "explanation": "Neermahal ('Water Palace') was built by Maharaja Bir Bikram Kishore Manikya in 1930 as a royal summer residence surrounded by water."
      },
      "artifact": {
        "id": "rignai-handloom",
        "name": "Tripuri Rignai Handwoven Wrap",
        "period": "Traditional Royal Textile",
        "lore": "A vibrant handloom lower wrap woven on backstrap looms featuring intricate geometric Chamthwi and broad border designs.",
        "icon": "\ud83d\udc58"
      },
      "points": 150
    },
    "games": {
      "title": "Achugwi & Dw-Bwt-Khel",
      "gameKey": "pallanguzhi",
      "type": "Traditional Indigenous Wrestling & Agility",
      "origin": "Village gatherings of the Reang and Tripuri communities",
      "rules": [
        "Achugwi is traditional indigenous folk wrestling where opponents test balance and grappling holds.",
        "Dw-Bwt-Khel tests bamboo pole dexterity and jumping over moving obstacles.",
        "Gella Chut is a tag-pursuit game testing speed and boundary defense."
      ],
      "equipment": "Soft grassy wrestling ground, bamboo rods.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Village Ground",
        "playableTitle": "Experience Tripuri Folk Games",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Neermahal Water Palace & Unakoti Rock Bas-Reliefs",
      "monumentName": "Neermahal Palace (Rudrasagar Lake)",
      "builderEra": "1930 CE by Maharaja Bir Bikram Kishore Manikya",
      "architecturalStyle": "Indo-Saracenic Water Palace Architecture",
      "marvelDetails": "Constructed in the center of the 5.3-sq-km Rudrasagar Lake using sandstone and red brick, featuring white domed pavilions, curved Mughal chattris, and subterranean boat berths.",
      "componentsToBuild": [
        {
          "id": "tr1",
          "name": "Submerged Stone Well Foundation",
          "role": "Subterranean masonry columns anchored into the lake bed.",
          "hint": "Lay the submerged lake foundation."
        },
        {
          "id": "tr2",
          "name": "Open Water Courtyards",
          "role": "Water terraces allowing boats to dock directly inside palace halls.",
          "hint": "Build the interior water docking court."
        },
        {
          "id": "tr3",
          "name": "Andar Mahal Royal Chambers",
          "role": "Two-storey residential quarters with high arched windows catching lake breezes.",
          "hint": "Erect the royal living pavilions."
        },
        {
          "id": "tr4",
          "name": "Curved Chattris & Domes",
          "role": "Fluted white domes and octagonal kiosks overlooking the water.",
          "hint": "Install the Mughal dome pavilions."
        },
        {
          "id": "tr5",
          "name": "Watchtower Minarets",
          "role": "Graceful sentinel towers framing both flanks of the floating palace.",
          "hint": "Place the twin sentinel minarets."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Kharchi Puja & Garia Puja",
      "season": "Ashadha (July) & Chaitra (April)",
      "rituals": "Kharchi Puja is celebrated over seven days honoring the Fourteen Gods (Chaturdash Devata) to cleanse Mother Earth. Garia Puja is celebrated by indigenous tribes with a decorated bamboo pole representing Lord Garia, seeking livestock and crop fertility.",
      "culinaryHeritage": "Mui Borok (traditional dish prepared with fermented dried fish called Berma), Bangui (rice cakes cooked in fragrant wild banana leaves), and Chakhwi.",
      "celebrationStyle": "Hojagiri acrobatic balance dancing, beating of traditional Kham drums, and sacred dip processions in the Howrah river.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Hojagiri Balancing Dance, Bamboo Crafts & Rignai",
      "dance": "Hojagiri (remarkable folk dance of the Reang community where young women balance pitchers and burning lamps on heads while standing on earthen pots).",
      "music": "Traditional melodies played on the Kham drum, Sumui (bamboo flute), and Sarinda stringed lute.",
      "handicrafts": "Exquisite bamboo and cane screens, lampshades, and miniature umbrellas, carved wooden idols.",
      "textile": "Rignai and Rikutu handloom cotton fabrics woven with vibrant tribal geometric motifs.",
      "lifestyle": "Living beside hill streams, reverence for the Fourteen Gods, and bamboo architecture.",
      "slideshowSlides": [
        {
          "title": "Hojagiri Acrobatic Balance Dance",
          "subtitle": "Balance and Harmony of the Reang",
          "description": "Dancers balancing brass lamps on heads while moving hips rhythmically on the rim of an earthen pitcher.",
          "image": "assets/img/photos/1512343879784-a960bf40e7f2-w1000.jpg",
          "tag": "Folk Dance"
        },
        {
          "title": "Neermahal Palace on Rudrasagar",
          "subtitle": "The Floating Palace of the Manikya Kings",
          "description": "White Indo-Saracenic palace surrounded by the shimmering waters and lotus pads of Rudrasagar Lake.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Unakoti Colossal Rock-Cut Shiva",
          "subtitle": "Eighth-Century Bas-Reliefs in the Jungle",
          "description": "A 30-foot head of Shiva chiseled out of living mountain rock surrounded by lush jungle streams.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Archaeology"
        },
        {
          "title": "Tripura Bamboo Screen Craft",
          "subtitle": "Intricate Slats of Golden Cane",
          "description": "Micro-shaved bamboo strips woven into gossamer partitions, decorative lamps, and royal artifacts.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Crafts"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "sikkim",
    "name": "Sikkim",
    "capital": "Gangtok",
    "region": "Northeast",
    "badge": "Guardian of Mount Kanchenjunga & Rumtek Monastery",
    "tagline": "Sacred Peaks of Kanchenjunga, Rumtek Monastic Treasures & Chaam Masked Dances",
    "heroImage": "assets/img/photos/1544735716-392fe2489ffa-w1200.jpg",
    "history": {
      "title": "Chogyal Buddhist Monarchy & Treaty of Kabi Lungchok",
      "era": "1642 CE \u2013 1975 CE",
      "keyFigures": [
        "Phuntsog Namgyal (First Chogyal)",
        "Guru Padmasambhava",
        "Lhatsun Chempo",
        "16th Karmapa"
      ],
      "highlights": "Sikkim was consecrated as a sacred hidden realm (Beyul) by Guru Padmasambhava. In 1642 CE, Phuntsog Namgyal was crowned as the first Chogyal at Yuksom. At Kabi Lungchok, the historic blood-brotherhood treaty between the indigenous Lepcha and Bhutia communities was forged under Mount Kanchenjunga.",
      "knowledgeSystem": "100% organic agro-ecological farming systems, Tibetan Thangka sacred geometry, and Himalayan herbal pharmacology.",
      "discoveryMission": {
        "name": "The Golden Stupa of Rumtek",
        "description": "Enter Rumtek Monastery (Dharmachakra Centre) to inspect the 13-foot golden reliquary stupa of the 16th Gyalwa Karmapa.",
        "objective": "Identify the four guardian kings painted at the monastery portal and the Black Crown (Vajra Crown).",
        "quizQuestion": "Which majestic mountain peak, sacred to all Sikkimese people, is the third highest peak on Earth?",
        "quizOptions": [
          "Mount Kanchenjunga",
          "Mount Everest",
          "Nanda Devi",
          "Kamet"
        ],
        "correctAnswer": 0,
        "explanation": "Mount Kanchenjunga (8,586 m) is worshipped as the guardian deity of Sikkim; mountaineers traditionally stop feet short of the actual summit out of respect."
      },
      "artifact": {
        "id": "sikkim-thangka-scroll",
        "name": "Traditional Silk Brocade Thangka",
        "period": "Sacred Monastic Art",
        "lore": "A sacred scroll painting of Padmasambhava created with ground lapis, cinnabar, and gold dust, mounted on silk brocade.",
        "icon": "\ud83d\udcdc"
      },
      "points": 150
    },
    "games": {
      "title": "Himalayan Archery & Dw-Khel",
      "gameKey": "pallanguzhi",
      "type": "Traditional Long-Range Archery & Stone Target",
      "origin": "High altitude valleys of Yuksom, Lachen, and Lachung",
      "rules": [
        "Traditional Himalayan archery competitions take place over distances of 145 meters with long bamboo bows.",
        "Archers sing celebratory folk songs and dance to celebrate successful bullseye strikes.",
        "Dw-Khel involves tossing polished flat river stones towards wooden marker pins."
      ],
      "equipment": "Handcrafted bamboo longbows, feathered arrows, painted wooden targets.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "High Alpine Archery Field",
        "playableTitle": "Experience Himalayan Archery",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Rumtek Monastery & Pemayangtse Monastery",
      "monumentName": "Rumtek Monastery (Dharmachakra Centre)",
      "builderEra": "Founded in 1740s, rebuilt 1966 by the 16th Karmapa",
      "architecturalStyle": "Tibetan Kagyu Monastic Architecture",
      "marvelDetails": "A four-storey monastic complex featuring a grand courtyard for sacred Chaam dances, an assembly hall lined with golden silk Thangkas, and a roof terrace crowned with a golden stupa, all facing the valley of Gangtok.",
      "componentsToBuild": [
        {
          "id": "sk1",
          "name": "Raised Stone Dance Courtyard",
          "role": "Expansive stone-paved courtyard designed for sacred ritual dances.",
          "hint": "Lay the stone courtyard base."
        },
        {
          "id": "sk2",
          "name": "Four-Storey Assembly Main Hall",
          "role": "Grand sanctuary supported by crimson and gold painted timber columns.",
          "hint": "Erect the four-storey monastic hall."
        },
        {
          "id": "sk3",
          "name": "Fresco Painted Portico Veranda",
          "role": "Entrance veranda decorated with the Wheel of Life and Guardian Kings.",
          "hint": "Adorn the entrance portico with murals."
        },
        {
          "id": "sk4",
          "name": "Tiered Pagoda Gilded Roof",
          "role": "Multi-tier roof clad in shimmering copper-gilded tiles.",
          "hint": "Install the pagoda gilded roof."
        },
        {
          "id": "sk5",
          "name": "Golden Ganjira Pinnacle",
          "role": "Sacred golden reliquary finial blessing the alpine winds.",
          "hint": "Crown the monastery peak."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Pang Lhabsol & Losoong",
      "season": "Bhadrapada (September) & Poush (December)",
      "rituals": "Pang Lhabsol is unique to Sikkim, commemorating the Treaty of Blood Brotherhood and paying homage to Mount Kanchenjunga with the warrior Kagyed Chaam dance. Losoong is the Sikkimese New Year celebrated at harvest end with masked monk dances.",
      "culinaryHeritage": "Gundruk (fermented leafy greens soup), Momos, Thukpa, Kinema (fermented soybean dish), and Chhurpi yak cheese.",
      "celebrationStyle": "Singhi Chaam (Lion Dance) portraying the mythical Snow Lion, sounding of alpine Dungchen horns, and festive archery duels.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Singhi Chaam Lion Dance, Thangka Art & Organic Living",
      "dance": "Singhi Chaam (Snow Lion Dance honoring Mount Kanchenjunga) and Lu Khangthamo folk dance.",
      "music": "Monastic low-frequency chanting, sound of the Gyaling shawm, and Lepcha folk flutes.",
      "handicrafts": "Thangka painting on silk, Lepcha wood carving, woollen carpet weaving with dragon motifs.",
      "textile": "Bakhu (traditional wrap dress worn by Bhutia and Lepcha communities) tied with silk Kera sashes.",
      "lifestyle": "World's first 100% certified organic state, deep ecological preservation, and Buddhist meditation retreats.",
      "slideshowSlides": [
        {
          "title": "Singhi Chaam Snow Lion Dance",
          "subtitle": "The Mythical Guardians of Kanchenjunga",
          "description": "Performers disguised as majestic white snow lions with turquoise manes leaping in worship of sacred peaks.",
          "image": "assets/img/photos/1544735716-392fe2489ffa-w1000.jpg",
          "tag": "Masked Dance"
        },
        {
          "title": "Rumtek Monastery Dharmachakra",
          "subtitle": "Kagyu Spiritual Seat in the Mountains",
          "description": "Four-storey monastery resplendent with gold and vermilion, looking out across the mist-shrouded Gangtok hills.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Sacred Peak of Kanchenjunga",
          "subtitle": "Five Treasures of the High Snows",
          "description": "Golden sunlight bathing the 8,586-meter Himalayan summit, worshipped as Sikkim's guardian deity.",
          "image": "assets/img/photos/1506744038136-46273834b3fb-w1000.jpg",
          "tag": "Natural Wonder"
        },
        {
          "title": "Pang Lhabsol Warrior Dance",
          "subtitle": "Oath of Eternal Brotherhood",
          "description": "Lamas wearing martial helmets and brandishing ceremonial swords commemorating sacred peace under the mountain.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Living Tradition"
        }
      ],
      "points": 150
    }
  },
  {
    "id": "madhya-pradesh",
    "name": "Madhya Pradesh",
    "capital": "Bhopal",
    "region": "Central",
    "badge": "Heart of Sanchi Stupa & Khajuraho Temples",
    "tagline": "Ancient Sanchi Great Stupa, Khajuraho Sculptures & 30,000-Year Bhimbetka Rock Art",
    "heroImage": "assets/img/photos/1590050752117-238cb0fb12b1-w1200.jpg",
    "history": {
      "title": "Avanti Empire, Ashokan Sanchi & Chandela Glory",
      "era": "3rd Century BCE \u2013 12th Century CE",
      "keyFigures": [
        "Emperor Ashoka",
        "Raja Bhoja",
        "Rani Durgavati",
        "Tansen"
      ],
      "highlights": "Madhya Pradesh is the geographic and historical heart of India. Emperor Ashoka built the Great Stupa at Sanchi around the relics of Buddha. The Chandela kings sculpted the world-famous Khajuraho temple complex, while Bhimbetka shelters preserve 30,000-year-old prehistoric rock art.",
      "knowledgeSystem": "King Bhoja's Samaranganasutradhara architectural treatise, Dhrupad classical vocal acoustics, and Gond tribal cosmologies.",
      "discoveryMission": {
        "name": "The Four Gateways of Sanchi Stupa",
        "description": "Examine the four intricately carved stone Torana gateways surrounding the Great Stupa of Sanchi.",
        "objective": "Identify the Jataka stories depicted in high-relief stone carvings without depicting the Buddha in human form.",
        "quizQuestion": "Which Mauryan Emperor originally commissioned the Great Stupa at Sanchi in the 3rd century BCE?",
        "quizOptions": [
          "Emperor Ashoka",
          "Chandragupta Maurya",
          "Bindusara",
          "Kanishka"
        ],
        "correctAnswer": 0,
        "explanation": "Emperor Ashoka built the original brick core of the Great Stupa at Sanchi to enshrine the sacred relics of the Buddha."
      },
      "artifact": {
        "id": "khajuraho-apsara",
        "name": "Khajuraho Celestial Surasundari Relief",
        "period": "10th Century CE",
        "lore": "A sandstone relief of a celestial maiden applying kohl to her eyes, sculpted with graceful three-dimensional depth.",
        "icon": "\ud83d\uddff"
      },
      "points": 150
    },
    "games": {
      "title": "Mallakhamb & Kho-Kho",
      "gameKey": "pallanguzhi",
      "type": "Traditional Gymnastic Pole Sport",
      "origin": "Ancient akhadas of Ujjain and Gwalior",
      "rules": [
        "Mallakhamb (the official State Sport of Madhya Pradesh) involves gymnasts executing acrobatic poses, grips, and twists on a vertical polished teak pole.",
        "Kho-Kho is a lightning pursuit tag game demanding quick zig-zag evasion.",
        "Gilli-Danda and Ati-Pati are played in village meadows across the Malwa plateau."
      ],
      "equipment": "Castor-oiled vertical teak pole, chalked arena markings.",
      "miniGameConfig": {
        "gameType": "pallanguzhi",
        "boardName": "Traditional Mallakhamb Arena",
        "playableTitle": "Experience Madhya Pradesh Sports",
        "difficulty": "Master"
      },
      "points": 200
    },
    "architecture": {
      "title": "Great Stupa at Sanchi & Khajuraho Temples",
      "monumentName": "The Great Stupa at Sanchi",
      "builderEra": "3rd Century BCE (Ashoka) with 1st Century BCE stone Toranas",
      "architecturalStyle": "Ancient Buddhist Monumental Architecture",
      "marvelDetails": "A monumental hemispherical sandstone dome (Anda) standing 16.5 meters high, surrounded by a stone balustrade (Vedika) and entered through four masterfully carved stone Torana gateways depicting Buddhist Jatakas.",
      "componentsToBuild": [
        {
          "id": "mp1",
          "name": "Medhi (Circular Stone Plinth)",
          "role": "Raised circular platform providing an upper circumambulation path.",
          "hint": "Lay the circular stone plinth base."
        },
        {
          "id": "mp2",
          "name": "Hemispherical Sandstone Anda",
          "role": "Massive solid sandstone dome symbolizing the vault of heaven.",
          "hint": "Assemble the hemispherical stone dome."
        },
        {
          "id": "mp3",
          "name": "Harmika (Square Balustrade)",
          "role": "Square railed balcony at the dome summit symbolizing sacred dwelling.",
          "hint": "Position the square summit balustrade."
        },
        {
          "id": "mp4",
          "name": "Chhatravali (Three-Tiered Parasol)",
          "role": "Central stone shaft with three parasols representing the Three Jewels.",
          "hint": "Erect the triple parasol finial."
        },
        {
          "id": "mp5",
          "name": "Four Carved Torana Gateways",
          "role": "Four monumental carved stone gateways facing the cardinal directions.",
          "hint": "Frame the four cardinal entry gateways."
        }
      ],
      "points": 250
    },
    "festivals": {
      "title": "Khajuraho Dance Festival & Tansen Samaroh",
      "season": "February & December",
      "rituals": "The Khajuraho Dance Festival brings India's foremost classical dancers to perform against the floodlit sandstone backdrop of the Chitragupta and Vishwanatha temples. Tansen Music Samaroh at Gwalior celebrates Hindustani classical mastery beside Tansen's tomb.",
      "culinaryHeritage": "Poha-Jalebi of Indore, Dal Bafla (boiled and baked wheat balls dipped in pure ghee with spicy lentils), Bhutte ka Kees, and Mawa Bati.",
      "celebrationStyle": "Classical dance recitals under star-lit skies, Dhrupad vocal symphonies, and tribal Bhagoria Haat spring festivities.",
      "miniGameType": "garba",
      "points": 180
    },
    "culture": {
      "title": "Gond Tribal Art, Chanderi Weaving & Dhrupad Music",
      "dance": "Karma and Saila folk dances of the Gonds and Baigas, and classical Kathak performances.",
      "music": "Dhrupad vocal traditions (Gwalior Gharana, oldest in Hindustani music) and Sarod melodies.",
      "handicrafts": "Gond paintings using intricate patterns of dots and lines depicting the Tree of Life, Tikamgarh bell metal craft.",
      "textile": "Chanderi Silk-Cotton sarees (sheer texture with gold zari booti) and Maheshwari sarees commissioned by Queen Ahilyabai Holkar.",
      "lifestyle": "Reverence for wildlife sanctuaries (Kanha, Bandhavgarh), historic haveli stepwells, and street food culture.",
      "slideshowSlides": [
        {
          "title": "The Great Stupa at Sanchi",
          "subtitle": "Oldest Stone Structure in India (3rd Century BCE)",
          "description": "Majestic sandstone dome and intricately sculpted Torana gateways preserving Buddhist heritage.",
          "image": "assets/img/photos/1590050752117-238cb0fb12b1-w1000.jpg",
          "tag": "Architecture"
        },
        {
          "title": "Khajuraho Temple Stone Sculptures",
          "subtitle": "Triumph of Medieval Chandela Stonecraft",
          "description": "Exquisite Sandstone Nagara temple facades covered in thousands of sculptural celestial maidens and deities.",
          "image": "assets/img/heritage-placeholder.svg",
          "tag": "Sculptural Art"
        },
        {
          "title": "Gond Tribal Tree of Life",
          "subtitle": "Intricate Dots and Lines of Forest Lore",
          "description": "Vibrant folk paintings where sacred deer, peacocks, and banyan roots pulse with rhythmic dotted patterns.",
          "image": "assets/img/photos/1607604276583-eef5d076aa5f-w1000.jpg",
          "tag": "Tribal Art"
        },
        {
          "title": "Bhimbetka Prehistoric Rock Shelters",
          "subtitle": "Thirty-Thousand-Year-Old Human Expression",
          "description": "Paleolithic and Mesolithic cave rock paintings in red and white ochre depicting hunting dances and elephants.",
          "image": "assets/img/photos/1518709268805-4e9042af9f23-w1000.jpg",
          "tag": "Prehistory"
        }
      ],
      "points": 150
    }
  }
];

// The 8 Union Territories join the same journey (marked type: 'ut')
INDIAN_STATES.push(...UNION_TERRITORIES);

// Photos from Wikimedia Commons (tools/fetch-commons-photos.mjs): one per
// category card plus the culture slideshow. The card image is the monument.
const PLACEHOLDER = 'assets/img/heritage-placeholder.svg';
INDIAN_STATES.forEach(s => {
  const p = PHOTOS[s.id] || {};
  s.photos = {
    history: p.history || PLACEHOLDER,
    games: p.games || PLACEHOLDER,
    architecture: p.architecture || PLACEHOLDER,
    festivals: p.festivals || PLACEHOLDER,
    culture: p.culture || PLACEHOLDER
  };
  s.heroImage = p.architecture || p.history || PLACEHOLDER;
  (s.culture.slideshowSlides || []).forEach((slide, i) => {
    slide.image = p['slide' + (i + 1)] || p.culture || PLACEHOLDER;
  });
});

export const STATE_COUNT = INDIAN_STATES.filter(s => s.type !== 'ut').length;   // 28
export const UT_COUNT = INDIAN_STATES.filter(s => s.type === 'ut').length;      // 8
export const REGION_COUNT = INDIAN_STATES.length;                                   // 36
export const isUT = (s) => !!s && s.type === 'ut';

// Regional categorization helper
export const REGIONS = {
  ALL: 'All States',
  SOUTH: 'Southern India',
  WEST: 'Western India',
  NORTH: 'Northern India',
  EAST: 'Eastern India',
  NORTHEAST: 'Northeastern India',
  CENTRAL: 'Central India'
};

// Helper lookup functions
export function getStateById(id) {
  return INDIAN_STATES.find(s => s.id === id) || null;
}

export function getStatesByRegion(region) {
  if (!region || region === 'All') return INDIAN_STATES;
  return INDIAN_STATES.filter(s => s.region.toLowerCase() === region.toLowerCase());
}

export function searchStates(query) {
  if (!query) return INDIAN_STATES;
  const q = query.toLowerCase().trim();
  return INDIAN_STATES.filter(s => 
    s.name.toLowerCase().includes(q) ||
    s.capital.toLowerCase().includes(q) ||
    s.tagline.toLowerCase().includes(q) ||
    s.badge.toLowerCase().includes(q) ||
    s.history.title.toLowerCase().includes(q) ||
    s.games.title.toLowerCase().includes(q) ||
    s.architecture.monumentName.toLowerCase().includes(q) ||
    s.festivals.title.toLowerCase().includes(q) ||
    s.culture.title.toLowerCase().includes(q)
  );
}

// Make accessible to window object for non-module scripts if needed
if (typeof window !== 'undefined') {
  window.INDIAN_STATES = INDIAN_STATES;
  window.REGIONS = REGIONS;
  window.getStateById = getStateById;
  window.getStatesByRegion = getStatesByRegion;
  window.searchStates = searchStates;
}
