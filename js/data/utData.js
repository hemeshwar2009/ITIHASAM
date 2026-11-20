// js/data/utData.js
// ITIHASAM: Cultural storyboard for India's 8 Union Territories.
// Same shape as each state in statesData.js (five categories), marked type: 'ut'.
// Photos: the ornamental placeholder is used until licensed photos are added.

const IMG = 'assets/img/heritage-placeholder.svg';

const slide = (title, subtitle, description, tag) => ({ title, subtitle, description, image: IMG, tag });

export const UNION_TERRITORIES = [
  // ------------------------------------------------------------------ J&K
  {
    id: 'jammu-and-kashmir',
    type: 'ut',
    name: 'Jammu and Kashmir',
    capital: 'Srinagar (summer) · Jammu (winter)',
    region: 'North',
    badge: 'Valley of Saffron, Shawls & Sufi Song',
    tagline: 'Karkota Kings, Kashmir Shaivism, Pashmina Looms & Houseboats on Dal Lake',
    heroImage: IMG,
    history: {
      title: 'Karkota Kings & the River of Kings',
      era: '7th Century CE – 20th Century CE',
      keyFigures: ['Lalitaditya Muktapida', 'Kalhana', 'Lal Ded', 'Zain-ul-Abidin'],
      highlights: 'The Karkota king Lalitaditya Muktapida (8th century CE) built the Martand Sun Temple. In the 12th century the poet-historian Kalhana wrote the Rajatarangini, a verse chronicle of Kashmir\'s kings. Sultan Zain-ul-Abidin (15th century), remembered as "Budshah", encouraged crafts such as papier-mâché and shawl weaving, and the mystic poet Lal Ded gave Kashmiri its earliest verses.',
      knowledgeSystem: 'Kashmir Shaivism (the philosophy of Abhinavagupta), Kalhana\'s historical method, and saffron cultivation on the karewa plateaus of Pampore.',
      discoveryMission: {
        name: 'The Chronicle of Kings',
        description: 'Search the scholar\'s library for the Sanskrit verse chronicle that records Kashmir\'s kings.',
        objective: 'Identify the 12th-century chronicle written by Kalhana.',
        quizQuestion: 'Which 12th-century Sanskrit chronicle by Kalhana records the history of Kashmir\'s kings?',
        quizOptions: ['Rajatarangini', 'Arthashastra', 'Harshacharita', 'Baburnama'],
        correctAnswer: 0,
        explanation: 'Kalhana completed the Rajatarangini ("River of Kings") around 1148–49 CE. It is one of the earliest works in India written as history.'
      },
      artifact: {
        id: 'kashmir-papier-mache',
        name: 'Kashmiri Papier-mâché Casket',
        period: 'Tradition since the 15th Century CE',
        lore: 'Layers of paper pulp are shaped, dried and hand-painted with fine floral naqashi patterns, a craft that flourished under Sultan Zain-ul-Abidin.',
        icon: '🏺'
      },
      points: 150
    },
    games: {
      title: 'Gilli-Danda & Pitthu',
      gameKey: 'sports',
      type: 'Outdoor Skill Game',
      origin: 'Village lanes and fields across Jammu and the Kashmir valley',
      rules: [
        'In Gilli-Danda, a player strikes the tapered wooden gilli with the danda so it flips up, then hits it as far as possible.',
        'Pitthu (seven stones) needs one team to knock down a pile of flat stones with a ball and rebuild it before being tagged.',
        'Both games are played in teams and reward quick reflexes and good aim.'
      ],
      equipment: 'A short tapered wooden gilli, a longer danda stick, seven flat stones and a soft ball.',
      miniGameConfig: { gameType: 'sports', boardName: 'Village Field', playableTitle: 'Strike the Gilli', difficulty: 'Easy' },
      points: 200
    },
    architecture: {
      title: 'Martand Sun Temple (Anantnag)',
      monumentName: 'Martand Sun Temple',
      builderEra: 'Built in the 8th century CE by King Lalitaditya Muktapida',
      architecturalStyle: 'Kashmiri stone architecture with trefoil arches and fluted pillars',
      marvelDetails: 'Dedicated to Surya, the temple stands on a plateau near Anantnag. A colonnaded courtyard of small cells surrounds the central shrine, and its trefoil arches and fluted columns show a blend of Gandharan, Gupta and local styles. It is now a protected ruin.',
      componentsToBuild: [
        { id: 'jk1', name: 'Raised Stone Plinth', role: 'Massive limestone platform that lifts the temple above the plateau.', hint: 'Lay this first, at the bottom.' },
        { id: 'jk2', name: 'Peristyle Colonnade', role: 'Courtyard of fluted columns and small cells around the shrine.', hint: 'Surround the plinth.' },
        { id: 'jk3', name: 'Central Shrine (Garbhagriha)', role: 'Inner sanctum of Surya, the Sun god.', hint: 'Place in the centre.' },
        { id: 'jk4', name: 'Trefoil-Arched Portico', role: 'Three-lobed arched entrance typical of Kashmiri temples.', hint: 'Fix to the front of the shrine.' },
        { id: 'jk5', name: 'Pyramidal Stone Roof', role: 'Steep roof that once crowned the shrine (now lost).', hint: 'Crown the shrine.' }
      ],
      points: 250
    },
    festivals: {
      title: 'Navreh & Mela Kheer Bhawani',
      season: 'Spring (Chaitra) and Jyeshtha Ashtami (May–June)',
      rituals: 'On Navreh, the Kashmiri Pandit new year, families begin the morning by looking at a thali holding rice, walnuts, flowers, a new almanac and a mirror. At Mela Kheer Bhawani, devotees gather at the sacred spring of Tulmulla to offer milk and kheer.',
      culinaryHeritage: 'Wazwan feasts (rogan josh, yakhni, gushtaba), saffron kahwa and salty pink noon chai.',
      celebrationStyle: 'Spring outings among almond blossoms, Sufiana music, and the shared reverence of the Kheer Bhawani shrine.',
      miniGameType: 'navreh',
      points: 180
    },
    culture: {
      title: 'Rouf Dance, Sufiana Kalam & Pashmina Looms',
      dance: 'Rouf (women\'s folk dance in rows, performed in spring and at festivals) and Kud of Jammu.',
      music: 'Sufiana Kalam with the santoor, sitar and tabla; Chakri folk songs.',
      handicrafts: 'Papier-mâché, walnut-wood carving, Namda felted rugs and copperware.',
      textile: 'Pashmina and Kani shawls (woven with small wooden kanis) and fine Sozni needle embroidery.',
      lifestyle: 'Houseboats and shikaras on Dal Lake, the kangri fire-pot in winter, and saffron fields of Pampore.',
      slideshowSlides: [
        slide('Rouf Dance', 'Spring Steps in Rows', 'Women link arms in two facing rows and sway forward and back, singing verses in Kashmiri.', 'Dance'),
        slide('Kani Shawl Weaving', 'A Year on One Loom', 'Weavers follow a coded pattern script, passing small wooden kanis to build intricate paisleys.', 'Textile'),
        slide('Shikaras on Dal Lake', 'The Floating Life of Srinagar', 'Gondola-like shikaras carry flowers, vegetables and travellers between houseboats and floating gardens.', 'Living Tradition'),
        slide('Saffron of Pampore', 'Purple Fields of Autumn', 'Each crocus flower gives three crimson stigmas, hand-picked at dawn to make Kashmiri saffron.', 'Agriculture')
      ],
      points: 150
    }
  },

  // ------------------------------------------------------------------ Ladakh
  {
    id: 'ladakh',
    type: 'ut',
    name: 'Ladakh',
    capital: 'Leh',
    region: 'North',
    badge: 'Land of High Passes & Monasteries',
    tagline: 'Namgyal Kings, Silk Route Caravans, Masked Cham Dances & Pashmina Herds',
    heroImage: IMG,
    history: {
      title: 'The Namgyal Kingdom & Trans-Himalayan Trade',
      era: '10th Century CE – 19th Century CE',
      keyFigures: ['Sengge Namgyal', 'Rinchen Zangpo', 'Jamyang Namgyal'],
      highlights: 'Ladakh sat on caravan routes linking Kashmir, Tibet and Central Asia, trading pashmina wool, salt and spices. The translator-monk Rinchen Zangpo (10th–11th century) is linked with the early temples of the region, and in the 17th century King Sengge Namgyal built the nine-storey Leh Palace and supported monasteries such as Hemis.',
      knowledgeSystem: 'Sowa-Rigpa (Amchi) Himalayan medicine, thangka painting, and glacier-fed irrigation channels that make farming possible in a cold desert.',
      discoveryMission: {
        name: 'The Palace on the Ridge',
        description: 'Climb to the palace that watches over Leh and read the royal record at its gate.',
        objective: 'Find out which king built the nine-storey Leh Palace.',
        quizQuestion: 'Which king built the nine-storey Leh Palace in the 17th century?',
        quizOptions: ['Sengge Namgyal', 'Lalitaditya Muktapida', 'Ashoka', 'Rajaraja Chola I'],
        correctAnswer: 0,
        explanation: 'King Sengge Namgyal built Leh Palace in the early 17th century; its nine storeys rise above the old town of Leh.'
      },
      artifact: {
        id: 'ladakh-perak',
        name: 'Ladakhi Perak Headdress',
        period: 'Traditional Ladakhi Attire',
        lore: 'A long headdress studded with rows of turquoise stones, worn by Ladakhi women on festive days and passed down through families.',
        icon: '💎'
      },
      points: 150
    },
    games: {
      title: 'Traditional Archery & Polo',
      gameKey: 'sports',
      type: 'Festival Sport',
      origin: 'Village archery contests and the polo grounds of Leh',
      rules: [
        'Archers take turns shooting at a small target from a long distance, often to the music of drums and the surna (oboe).',
        'Archery contests are social festivals, with songs, dances and butter tea between rounds.',
        'Polo, played on hardy mountain ponies, is one of the oldest sports in the Himalaya.'
      ],
      equipment: 'Traditional bows and arrows, a small round target, drums and surna for the music.',
      miniGameConfig: { gameType: 'sports', boardName: 'Archery Ground', playableTitle: 'Ladakhi Archery', difficulty: 'Medium' },
      points: 200
    },
    architecture: {
      title: 'Alchi Monastery Complex',
      monumentName: 'Alchi Monastery',
      builderEra: 'Temples dating from about the 11th–12th century CE',
      architecturalStyle: 'Himalayan Buddhist architecture of mud-brick and timber',
      marvelDetails: 'Alchi\'s small temples by the Indus river are famous for some of the oldest surviving Buddhist wall paintings in the Himalaya, painted in a style influenced by Kashmiri art. Thick earthen walls keep the interiors warm, and carved wooden doorways frame the entrances.',
      componentsToBuild: [
        { id: 'la1', name: 'Stone Foundation', role: 'Riverstone base that keeps the walls dry.', hint: 'Lay this first.' },
        { id: 'la2', name: 'Mud-Brick Walls', role: 'Thick sun-dried brick walls that hold the warmth.', hint: 'Build up from the foundation.' },
        { id: 'la3', name: 'Carved Wooden Doorway', role: 'Timber portal carved with Buddhist figures.', hint: 'Set into the front wall.' },
        { id: 'la4', name: 'Painted Assembly Hall (Dukhang)', role: 'Inner hall covered with ancient murals.', hint: 'Inside the walls.' },
        { id: 'la5', name: 'Flat Roof & Prayer Flags', role: 'Flat earthen roof topped with fluttering prayer flags.', hint: 'Finish at the top.' }
      ],
      points: 250
    },
    festivals: {
      title: 'Hemis Tsechu & Losar',
      season: 'Hemis Tsechu in June–July; Ladakhi Losar in winter',
      rituals: 'Hemis Tsechu marks the birth anniversary of Guru Padmasambhava. Monks in vivid masks and silk robes perform the cham dance in the monastery courtyard to the sound of drums, cymbals and long horns. Losar, the Ladakhi new year, is welcomed with lamps, prayers and visits to family.',
      culinaryHeritage: 'Butter tea (gur-gur cha), thukpa noodle soup, skyu pasta stew and dried apricots.',
      celebrationStyle: 'Masked cham dances, giant thangka unveilings and village gatherings with archery and song.',
      miniGameType: 'rhythm-cham',
      points: 180
    },
    culture: {
      title: 'Cham Dance, Thangka Art & Pashmina',
      dance: 'Cham (masked monastic dance) and Jabro, a folk dance of the Changthang nomads.',
      music: 'Daman drums and surna oboe at festivals; monastic chants with long horns (dungchen).',
      handicrafts: 'Thangka scroll painting, carved wooden choktse tables and metalwork.',
      textile: 'Pashmina wool from Changthangi goats and the woollen goncha robe.',
      lifestyle: 'Prayer wheels and chortens, terraced barley fields, and homes built to catch the winter sun.',
      slideshowSlides: [
        slide('Masked Cham Dance', 'Monastery Courtyards Come Alive', 'Monks in painted masks re-enact the victory of good over evil to drums and long horns.', 'Dance'),
        slide('Thangka Painting', 'Sacred Scrolls of Colour', 'Mineral pigments and fine brushes bring Buddhist deities to life on cloth scrolls.', 'Crafts'),
        slide('Changthangi Goats', 'Where Pashmina Begins', 'Nomadic herders of the high Changthang plateau comb the fine winter fleece of their goats.', 'Textile'),
        slide('Prayer Flags on the Passes', 'Blessings on the Wind', 'Five-coloured flags carry prayers across some of the highest motorable passes on Earth.', 'Living Tradition')
      ],
      points: 150
    }
  },

  // ------------------------------------------------------------------ Delhi
  {
    id: 'delhi',
    type: 'ut',
    name: 'Delhi',
    capital: 'New Delhi',
    region: 'North',
    badge: 'City of Many Capitals',
    tagline: 'Sultanate Minarets, Mughal Forts, Qawwali Nights & Chandni Chowk Flavours',
    heroImage: IMG,
    history: {
      title: 'From the Delhi Sultanate to Shahjahanabad',
      era: 'Ancient Times – 19th Century CE',
      keyFigures: ['Qutb-ud-din Aibak', 'Iltutmish', 'Amir Khusrau', 'Shah Jahan'],
      highlights: 'Delhi has been rebuilt as a capital many times. Qutb-ud-din Aibak began the Qutb Minar around 1199 and Iltutmish completed it. The poet-musician Amir Khusrau shaped Hindustani music and qawwali, and Shah Jahan founded Shahjahanabad with the Red Fort and Jama Masjid in the 17th century.',
      knowledgeSystem: 'The rust-resistant Gupta-era Iron Pillar at Mehrauli and the Jantar Mantar observatory built by Maharaja Sawai Jai Singh II in 1724.',
      discoveryMission: {
        name: 'The Pillar That Never Rusts',
        description: 'Walk through the Qutb complex and examine the ancient iron pillar in the courtyard.',
        objective: 'Name the pillar that has resisted rust for over 1,600 years.',
        quizQuestion: 'Which ancient pillar in Delhi\'s Qutb complex has resisted rust for over 1,600 years?',
        quizOptions: ['The Mehrauli Iron Pillar', 'The Sarnath Lion Capital', 'Kirti Stambha', 'Vijaya Stambha'],
        correctAnswer: 0,
        explanation: 'The Gupta-era Iron Pillar (about 4th–5th century CE) has a thin protective layer, helped by the iron\'s high phosphorus content, that keeps it from rusting.'
      },
      artifact: {
        id: 'delhi-iron-pillar',
        name: 'Miniature Mehrauli Iron Pillar',
        period: 'Gupta Era, c. 4th–5th Century CE',
        lore: 'A model of the seven-metre wrought-iron pillar whose Sanskrit inscription honours a king called Chandra.',
        icon: '🗼'
      },
      points: 150
    },
    games: {
      title: 'Pachisi & Patangbaazi (Kite Flying)',
      gameKey: 'chaupar',
      type: 'Cross-and-Circle Race Game',
      origin: 'Mughal courts and the rooftops of Old Delhi',
      rules: [
        'Pachisi is a race game on a cross-shaped cloth board, played with cowrie shells instead of dice.',
        'Each side races its pieces around the board and home, capturing rivals that land on unsafe squares.',
        'Kite flying fills Old Delhi\'s skies on Independence Day, with friendly duels to cut rival kite strings.'
      ],
      equipment: 'Embroidered cloth board, cowrie shells and wooden pieces; paper kites and a spool of thread.',
      miniGameConfig: { gameType: 'chaupar', boardName: 'Pachisi Cloth', playableTitle: 'Play Delhi Pachisi', difficulty: 'Medium' },
      points: 200
    },
    architecture: {
      title: 'Qutb Minar (Mehrauli)',
      monumentName: 'Qutb Minar',
      builderEra: 'Begun c. 1199 by Qutb-ud-din Aibak; completed by Iltutmish',
      architecturalStyle: 'Indo-Islamic red sandstone and marble',
      marvelDetails: 'About 72.5 metres tall, the five-storey minaret is decorated with bands of carved calligraphy and projecting balconies on stone brackets. Its upper storeys were repaired in marble by Firoz Shah Tughlaq after lightning damage. It is a UNESCO World Heritage Site.',
      componentsToBuild: [
        { id: 'dl1', name: 'First Storey (Fluted Sandstone)', role: 'Base storey with alternating round and angular flutes, begun by Aibak.', hint: 'Start at the ground.' },
        { id: 'dl2', name: 'Second & Third Storeys', role: 'Added by Iltutmish, continuing the red sandstone flutes.', hint: 'Stack on the base.' },
        { id: 'dl3', name: 'Muqarnas Balconies', role: 'Honeycomb stone brackets supporting each balcony.', hint: 'Between the storeys.' },
        { id: 'dl4', name: 'Marble Upper Storeys', role: 'Fourth and fifth storeys rebuilt in marble by Firoz Shah Tughlaq.', hint: 'Near the top.' },
        { id: 'dl5', name: 'Calligraphy Bands', role: 'Carved inscriptions wrapping around the tower.', hint: 'Decorate the storeys.' }
      ],
      points: 250
    },
    festivals: {
      title: 'Phool Walon Ki Sair & Diwali',
      season: 'Phool Walon Ki Sair after the monsoon; Diwali in October–November',
      rituals: 'In Phool Walon Ki Sair, the "procession of flower-sellers", Delhi\'s florists carry giant floral fans (pankhas) to both the Yogmaya Temple and the Dargah of Khwaja Bakhtiyar Kaki in Mehrauli, a celebration of shared heritage.',
      culinaryHeritage: 'Chandni Chowk chaat, parathas, jalebi, nihari and kebabs.',
      celebrationStyle: 'Floral processions with shehnai music, kite-flying, and lamp-lit markets at Diwali.',
      miniGameType: 'phoolwalon',
      points: 180
    },
    culture: {
      title: 'Qawwali, Kathak & Zardozi',
      dance: 'Kathak, refined in Mughal courts, with spins and rhythmic footwork.',
      music: 'Qawwali at the Nizamuddin Dargah and the Delhi gharana of tabla and vocal music.',
      handicrafts: 'Zardozi gold embroidery, Meenakari enamel and miniature painting.',
      textile: 'Zardozi-embroidered velvets and silks.',
      lifestyle: 'Old Delhi\'s bazaars, havelis and rooftop kite-flying alongside the wide avenues of New Delhi.',
      slideshowSlides: [
        slide('Qawwali at Nizamuddin', 'Thursday Evenings of Devotion', 'Singers and harmoniums fill the dargah courtyard with the verses of Amir Khusrau.', 'Music'),
        slide('Zardozi Embroidery', 'Threads of Gold', 'Artisans stitch metallic threads, sequins and beads onto velvet in raised patterns.', 'Crafts'),
        slide('Red Fort', 'Shah Jahan\'s Citadel', 'Red sandstone walls enclose palaces and halls of the Mughal capital of Shahjahanabad.', 'Architecture'),
        slide('Chandni Chowk', 'A Bazaar Since the 1600s', 'Narrow lanes of spices, silver, sweets and street food have bustled here for centuries.', 'Living Tradition')
      ],
      points: 150
    }
  },

  // ------------------------------------------------------------------ Chandigarh
  {
    id: 'chandigarh',
    type: 'ut',
    name: 'Chandigarh',
    capital: 'Chandigarh',
    region: 'North',
    badge: 'The Planned Garden City',
    tagline: 'Le Corbusier\'s Concrete Capitol, Nek Chand\'s Rock Garden & Punjabi Folk Spirit',
    heroImage: IMG,
    history: {
      title: 'A New Capital for a New Nation',
      era: '1950s – Present',
      keyFigures: ['Le Corbusier', 'Pierre Jeanneret', 'Nek Chand', 'Jawaharlal Nehru'],
      highlights: 'After Partition, Punjab needed a new capital. Prime Minister Nehru backed a planned city, designed by the architect Le Corbusier with Pierre Jeanneret, Jane Drew and Maxwell Fry. Chandigarh became the capital of both Punjab and Haryana, and its Capitol Complex is part of a UNESCO World Heritage listing of Le Corbusier\'s work.',
      knowledgeSystem: 'Modern town planning: self-contained sectors, a road hierarchy for traffic, and green belts running through the city.',
      discoveryMission: {
        name: 'The Secret Garden',
        description: 'Follow a hidden path into a garden built entirely from waste materials.',
        objective: 'Discover who secretly built Chandigarh\'s Rock Garden.',
        quizQuestion: 'Which artist secretly built Chandigarh\'s Rock Garden from waste materials?',
        quizOptions: ['Nek Chand', 'M. F. Husain', 'Raja Ravi Varma', 'Amrita Sher-Gil'],
        correctAnswer: 0,
        explanation: 'Nek Chand, a road inspector, began building the garden in secret in the late 1950s using broken tiles, bangles and debris. It was discovered by officials in 1975 and opened to the public.'
      },
      artifact: {
        id: 'chandigarh-open-hand',
        name: 'Open Hand Monument Model',
        period: 'Designed by Le Corbusier, 20th Century',
        lore: 'The city\'s emblem: a giant metal hand that turns in the wind, "open to give and open to receive".',
        icon: '✋'
      },
      points: 150
    },
    games: {
      title: 'Kabaddi & Gatka',
      gameKey: 'sports',
      type: 'Contact Sport and Martial Art',
      origin: 'Punjabi village grounds and community festivals',
      rules: [
        'A kabaddi raider crosses into the rival half, tags defenders and returns while holding their breath and chanting "kabaddi".',
        'Defenders win the point if they stop the raider from getting back.',
        'Gatka is a Sikh martial art performed with sticks and shields at festivals and processions.'
      ],
      equipment: 'An open mud or grass court; wooden sticks and shields for gatka.',
      miniGameConfig: { gameType: 'sports', boardName: 'Kabaddi Court', playableTitle: 'Kabaddi Raid', difficulty: 'Medium' },
      points: 200
    },
    architecture: {
      title: 'Capitol Complex',
      monumentName: 'Capitol Complex, Chandigarh',
      builderEra: 'Designed by Le Corbusier, built in the 1950s–60s',
      architecturalStyle: 'Modernist béton brut (raw concrete)',
      marvelDetails: 'The complex brings together the High Court, the Secretariat and the Palace of Assembly, set against the Shivalik hills. Huge sun-shading concrete grilles and parasol roofs cool the buildings, and the Open Hand Monument stands nearby.',
      componentsToBuild: [
        { id: 'ch1', name: 'Concrete Platforms', role: 'Wide raised plazas linking the buildings.', hint: 'Lay the ground first.' },
        { id: 'ch2', name: 'Secretariat Block', role: 'A long slab building with deep concrete sunshades (brise-soleil).', hint: 'On one side of the plaza.' },
        { id: 'ch3', name: 'High Court & Parasol Roof', role: 'Court building sheltered by a vast arched roof.', hint: 'Opposite the Assembly.' },
        { id: 'ch4', name: 'Palace of Assembly', role: 'Assembly hall with a funnel-shaped chamber and a sweeping portico.', hint: 'Facing the High Court.' },
        { id: 'ch5', name: 'Open Hand Monument', role: 'The city\'s symbol, turning in the wind.', hint: 'Finish beside the plaza.' }
      ],
      points: 250
    },
    festivals: {
      title: 'Rose Festival & Baisakhi',
      season: 'Rose Festival in February; Baisakhi in April',
      rituals: 'The Rose Festival celebrates the city\'s huge rose garden with flower shows and folk performances. Baisakhi marks the harvest and the Sikh new year with gurdwara visits, bhangra and fairs.',
      culinaryHeritage: 'Sarson da saag with makki di roti, chole bhature and lassi.',
      celebrationStyle: 'Garden flower shows, bhangra and giddha, and community langars.',
      miniGameType: 'rosegarden',
      points: 180
    },
    culture: {
      title: 'Bhangra, Phulkari & Modernist Design',
      dance: 'Bhangra and Giddha, the energetic folk dances of Punjab.',
      music: 'Punjabi folk songs with the dhol, tumbi and algoza.',
      handicrafts: 'Phulkari embroidery and the teak-and-cane furniture designed by Pierre Jeanneret for the city.',
      textile: 'Phulkari ("flower-work") shawls embroidered in bright silk floss.',
      lifestyle: 'Tree-lined sectors, Sukhna Lake and some of India\'s largest public gardens.',
      slideshowSlides: [
        slide('Nek Chand\'s Rock Garden', 'Art from Waste', 'Thousands of figures made from broken crockery, tiles and bangles fill a maze of courtyards.', 'Art'),
        slide('Capitol Complex', 'Concrete Poetry', 'Le Corbusier\'s buildings use sun, shade and raw concrete to suit India\'s climate.', 'Architecture'),
        slide('Bhangra', 'The Beat of the Harvest', 'Dancers leap and spin to the booming dhol at Baisakhi celebrations.', 'Dance'),
        slide('Zakir Hussain Rose Garden', 'A City of Roses', 'Hundreds of rose varieties bloom across one of Asia\'s largest rose gardens.', 'Living Tradition')
      ],
      points: 150
    }
  },

  // ------------------------------------------------------------------ Puducherry
  {
    id: 'puducherry',
    type: 'ut',
    name: 'Puducherry',
    capital: 'Puducherry',
    region: 'South',
    badge: 'Where Tamil Meets French',
    tagline: 'Roman-Era Arikamedu, French Quarter Boulevards, Bharati\'s Poetry & Auroville',
    heroImage: IMG,
    history: {
      title: 'Arikamedu Port & French India',
      era: '2nd Century BCE – 1962 CE',
      keyFigures: ['Joseph François Dupleix', 'Subramania Bharati', 'Sri Aurobindo', 'The Mother (Mirra Alfassa)'],
      highlights: 'At Arikamedu, archaeologists found Roman pottery and beads from an ancient trading port. Pondichéry became the capital of French India under governors such as Dupleix. Poet Subramania Bharati and Sri Aurobindo lived here in the freedom-struggle years. The territory was transferred to India in 1954, formally completed in 1962.',
      knowledgeSystem: 'Ancient bead-making at Arikamedu and a planned grid town divided by a canal into French and Tamil quarters.',
      discoveryMission: {
        name: 'Shards by the River',
        description: 'Dig carefully at the riverside excavation and study the pottery pieces you find.',
        objective: 'Name the ancient port near Puducherry that traded with Rome.',
        quizQuestion: 'Which ancient port near Puducherry traded with the Roman Empire?',
        quizOptions: ['Arikamedu', 'Lothal', 'Tamralipti', 'Bharuch'],
        correctAnswer: 0,
        explanation: 'Excavations at Arikamedu uncovered Roman amphorae and fine pottery, showing trade between the Tamil coast and the Roman world around 2,000 years ago.'
      },
      artifact: {
        id: 'arikamedu-amphora',
        name: 'Arikamedu Amphora Shard',
        period: 'c. 1st Century BCE – 1st Century CE',
        lore: 'A fragment of a Roman wine jar found by the Ariyankuppam river, evidence of ancient sea trade.',
        icon: '🏺'
      },
      points: 150
    },
    games: {
      title: 'Pallanguzhi & Paandi',
      gameKey: 'pallanguzhi',
      type: 'Indigenous Strategy Board Game',
      origin: 'Tamil homes and courtyards',
      rules: [
        'Pallanguzhi is played on a board of 14 pits, sowing shells or seeds one by one around the board.',
        'When your hand empties, you continue from the next pit; landing next to an empty pit lets you capture the opposite pit.',
        'Paandi is Tamil hopscotch, hopping through chalked squares to retrieve a stone.'
      ],
      equipment: 'A wooden pallanguzhi board, cowrie shells or tamarind seeds, chalk and a flat stone.',
      miniGameConfig: { gameType: 'pallanguzhi', boardName: 'Pallanguzhi Board', playableTitle: 'Play Pallanguzhi', difficulty: 'Medium' },
      points: 200
    },
    architecture: {
      title: 'The French Quarter (White Town)',
      monumentName: 'White Town Heritage Quarter',
      builderEra: 'Laid out in the 18th century during French rule',
      architecturalStyle: 'French colonial with Tamil influences',
      marvelDetails: 'A neat grid of streets runs down to the seafront promenade. Lime-plastered mansions in yellow and white have tall shuttered windows, arched gateways and bougainvillea-filled courtyards, while the Tamil quarter across the canal keeps its own street-facing verandas (thinnai).',
      componentsToBuild: [
        { id: 'py1', name: 'Grid Street Plan', role: 'Straight streets laid out at right angles down to the sea.', hint: 'Lay out the town first.' },
        { id: 'py2', name: 'Lime-Plastered Walls', role: 'Thick walls finished in yellow and white lime plaster.', hint: 'Build along the streets.' },
        { id: 'py3', name: 'Tall Shuttered Windows', role: 'Wooden louvres that let the sea breeze in.', hint: 'Set into the walls.' },
        { id: 'py4', name: 'Colonnaded Veranda', role: 'Shaded porches supported by columns.', hint: 'Front of the house.' },
        { id: 'py5', name: 'Bougainvillea Courtyard', role: 'Inner garden courtyard bright with flowers.', hint: 'Finish inside.' }
      ],
      points: 250
    },
    festivals: {
      title: 'Pongal & Masi Magam',
      season: 'Pongal in January; Masi Magam in February–March',
      rituals: 'At Pongal, rice is boiled in new pots until it overflows. On Masi Magam, temple deities from the region are carried in procession to the seashore for a ceremonial holy dip.',
      culinaryHeritage: 'Sweet sakkarai pongal, and a Franco-Tamil kitchen of baguettes, crêpes and fish curries.',
      celebrationStyle: 'Seaside processions, kolam patterns at doorways and festive music.',
      miniGameType: 'pongal',
      points: 180
    },
    culture: {
      title: 'Bharatanatyam, Handmade Paper & Franco-Tamil Life',
      dance: 'Bharatanatyam and Tamil folk dances such as Karagattam.',
      music: 'Carnatic music and the nadaswaram in temple festivals.',
      handicrafts: 'Villianur terracotta, handmade paper and incense-making.',
      textile: 'Handloom cotton and silk weaving.',
      lifestyle: 'Bicycles on tree-lined boulevards, the seafront promenade, and the international township of Auroville.',
      slideshowSlides: [
        slide('The Promenade', 'Evenings by the Bay of Bengal', 'Families stroll the seafront beside French-era buildings as the sea breeze picks up.', 'Living Tradition'),
        slide('Villianur Terracotta', 'Clay Shaped by Hand', 'Potters craft horses, lamps and figures from local clay, fired in village kilns.', 'Crafts'),
        slide('Masi Magam', 'Deities Meet the Sea', 'Temple deities are carried in decorated palanquins for a holy dip at the shore.', 'Festival'),
        slide('Auroville\'s Matrimandir', 'A Golden Sphere of Silence', 'The meditation dome at the heart of Auroville welcomes people from around the world.', 'Architecture')
      ],
      points: 150
    }
  },

  // ------------------------------------------------------------------ Lakshadweep
  {
    id: 'lakshadweep',
    type: 'ut',
    name: 'Lakshadweep',
    capital: 'Kavaratti',
    region: 'South',
    badge: 'Coral Islands of the Arabian Sea',
    tagline: 'Turquoise Lagoons, Coral Atolls, Kolkali Rhythms & Island Seafaring',
    heroImage: IMG,
    history: {
      title: 'Coral Atolls on the Ancient Sea Routes',
      era: 'Ancient Times – Present',
      keyFigures: ['Hazrat Ubaidullah (by tradition)', 'The Arakkal rulers of Kannur'],
      highlights: 'Lakshadweep is a group of 36 coral islands, ten of them inhabited, lying on old Arabian Sea trade routes. By local tradition, Islam was brought by Hazrat Ubaidullah. The islands were linked for centuries with the coastal kingdoms of Kerala, including the Arakkal rulers of Kannur, and became a Union Territory in 1956.',
      knowledgeSystem: 'Traditional navigation by stars and swells, coconut-based crafts such as coir, and pole-and-line tuna fishing in Minicoy.',
      discoveryMission: {
        name: 'Secrets of the Lagoon',
        description: 'Paddle across a turquoise lagoon and look closely at what the islands are made of.',
        objective: 'Discover what forms Lakshadweep\'s islands.',
        quizQuestion: 'What are Lakshadweep\'s islands mainly formed from?',
        quizOptions: ['Coral reefs', 'Volcanic rock', 'Granite', 'Sand dunes'],
        correctAnswer: 0,
        explanation: 'Lakshadweep\'s islands are coral atolls and reefs, built up over thousands of years and surrounded by shallow lagoons.'
      },
      artifact: {
        id: 'lakshadweep-coir',
        name: 'Hand-Twisted Coir Rope',
        period: 'Traditional Island Craft',
        lore: 'Fibres from coconut husks are soaked, beaten and twisted into strong ropes used for boats and homes.',
        icon: '🥥'
      },
      points: 150
    },
    games: {
      title: 'Seven Stones (Lagori) & Boat Rowing',
      gameKey: 'sports',
      type: 'Team Throwing Game',
      origin: 'Island beaches and village grounds, as in coastal Kerala',
      rules: [
        'One team throws a ball to knock down a pile of seven flat stones.',
        'They must rebuild the pile before the other team tags them with the ball.',
        'Rowing races in traditional boats are part of festive days on the islands.'
      ],
      equipment: 'Seven flat stones, a soft ball, and wooden rowing boats.',
      miniGameConfig: { gameType: 'sports', boardName: 'Beach Ground', playableTitle: 'Seven Stones', difficulty: 'Easy' },
      points: 200
    },
    architecture: {
      title: 'Ujra Mosque (Kavaratti)',
      monumentName: 'Ujra Mosque',
      builderEra: 'Traditionally dated to the 17th century',
      architecturalStyle: 'Island architecture of coral stone and carved wood',
      marvelDetails: 'Built with blocks of coral stone, the mosque is known for its ornately carved wooden ceiling, said to be cut from a single piece of driftwood. Its courtyard well is believed by many to have healing water.',
      componentsToBuild: [
        { id: 'ld1', name: 'Coral-Stone Foundation', role: 'Blocks of cut coral stone laid on the sandy ground.', hint: 'Lay this first.' },
        { id: 'ld2', name: 'Lime-Plastered Walls', role: 'Coral walls finished with white lime plaster.', hint: 'Build up from the base.' },
        { id: 'ld3', name: 'Carved Wooden Ceiling', role: 'Intricately carved timber ceiling.', hint: 'Above the prayer hall.' },
        { id: 'ld4', name: 'Sloping Tiled Roof', role: 'Steep roof that sheds heavy monsoon rain.', hint: 'Over the ceiling.' },
        { id: 'ld5', name: 'Courtyard Well', role: 'Well whose water is valued by the community.', hint: 'Finish in the courtyard.' }
      ],
      points: 250
    },
    festivals: {
      title: 'Eid Celebrations with Kolkali & Parichakali',
      season: 'Eid-ul-Fitr, Eid-ul-Adha and Milad-un-Nabi (by the Islamic calendar)',
      rituals: 'Islanders gather for prayers and feasts, and festive evenings feature Kolkali, a stick dance performed in circles, and Parichakali, a dance with shields and swords.',
      culinaryHeritage: 'Tuna dishes, coconut-rich curries, and sweets made with jaggery and coconut.',
      celebrationStyle: 'Circle dances to the beat of sticks and drums, songs and community feasts.',
      miniGameType: 'rhythm-kolkali',
      points: 180
    },
    culture: {
      title: 'Kolkali, Lava Dance & Island Seafaring',
      dance: 'Kolkali (stick dance), Parichakali (shield and sword dance) and the Lava dance of Minicoy.',
      music: 'Oppana songs and drum rhythms at weddings and festivals.',
      handicrafts: 'Coir rope-making, boat-building and coconut-shell crafts.',
      textile: 'Light cotton clothing suited to the island climate.',
      lifestyle: 'Fishing communities, coconut groves, and coral reefs that are carefully protected.',
      slideshowSlides: [
        slide('Kolkali', 'Sticks in Rhythm', 'Dancers strike short sticks together in time as they move in a circle.', 'Dance'),
        slide('Turquoise Lagoons', 'Shelter of the Reef', 'Shallow lagoons inside the coral reefs are calm, clear and full of marine life.', 'Nature'),
        slide('Pole-and-Line Fishing', 'Tuna the Sustainable Way', 'Minicoy fishers catch skipjack tuna one by one with poles and lines.', 'Living Tradition'),
        slide('Coir Craft', 'From Husk to Rope', 'Coconut husk fibres are twisted by hand into strong, salt-resistant rope.', 'Crafts')
      ],
      points: 150
    }
  },

  // ------------------------------------------------------------------ Andaman & Nicobar
  {
    id: 'andaman-and-nicobar-islands',
    type: 'ut',
    name: 'Andaman and Nicobar Islands',
    capital: 'Sri Vijaya Puram (Port Blair)',
    region: 'East',
    badge: 'Emerald Islands of the Bay of Bengal',
    tagline: 'Indigenous Island Cultures, the Cellular Jail, Netaji\'s Tricolour & Hodi Canoes',
    heroImage: IMG,
    history: {
      title: 'Island Peoples & the Struggle for Freedom',
      era: 'Ancient Times – 1947 CE',
      keyFigures: ['Subhas Chandra Bose', 'V. D. Savarkar', 'Batukeshwar Dutt'],
      highlights: 'The islands are home to some of the world\'s oldest continuous cultures, including the Great Andamanese, Onge, Jarawa, Sentinelese, Shompen and Nicobarese peoples. Chola inscriptions of the 11th century mention Nakkavaram (Nicobar). The British built a penal settlement here, and the Cellular Jail ("Kala Pani") held many freedom fighters. On 30 December 1943, Subhas Chandra Bose hoisted the Indian tricolour at Port Blair.',
      knowledgeSystem: 'Indigenous knowledge of forests, tides and reefs, and Nicobarese canoe-building.',
      discoveryMission: {
        name: 'The Flag Over the Islands',
        description: 'Climb to the hilltop where a historic flag was raised during the freedom struggle.',
        objective: 'Name the leader who hoisted the tricolour at Port Blair in 1943.',
        quizQuestion: 'Which leader hoisted the Indian tricolour at Port Blair on 30 December 1943?',
        quizOptions: ['Subhas Chandra Bose', 'Bhagat Singh', 'Mahatma Gandhi', 'Sardar Vallabhbhai Patel'],
        correctAnswer: 0,
        explanation: 'Netaji Subhas Chandra Bose raised the tricolour at Port Blair on 30 December 1943 during the Second World War.'
      },
      artifact: {
        id: 'nicobar-hodi',
        name: 'Nicobari Hodi Canoe Model',
        period: 'Traditional Nicobarese Craft',
        lore: 'The hodi is a slender outrigger canoe carved from a single tree trunk and raced at festive gatherings.',
        icon: '🛶'
      },
      points: 150
    },
    games: {
      title: 'Hodi Canoe Racing',
      gameKey: 'sports',
      type: 'Water Sport',
      origin: 'Nicobarese villages',
      rules: [
        'Teams paddle long outrigger canoes (hodi) together in perfect rhythm.',
        'The crew that keeps the steadiest stroke and crosses the line first wins.',
        'Races are part of community celebrations and test strength and teamwork.'
      ],
      equipment: 'A carved wooden hodi canoe with an outrigger, and wooden paddles.',
      miniGameConfig: { gameType: 'sports', boardName: 'Island Lagoon', playableTitle: 'Hodi Canoe Race', difficulty: 'Medium' },
      points: 200
    },
    architecture: {
      title: 'Cellular Jail (Sri Vijaya Puram)',
      monumentName: 'Cellular Jail National Memorial',
      builderEra: 'Built by the British between 1896 and 1906',
      architecturalStyle: 'Radial "panopticon"-style prison of brick',
      marvelDetails: 'Seven wings radiated from a central watchtower like the spokes of a wheel, holding 693 small solitary cells so that prisoners could not see one another. Three wings survive today as a national memorial to the freedom fighters held there.',
      componentsToBuild: [
        { id: 'an1', name: 'Brick Foundation', role: 'Foundations for the long cell wings.', hint: 'Lay the base first.' },
        { id: 'an2', name: 'Central Watchtower', role: 'Tower at the hub from which guards watched every wing.', hint: 'Place at the centre.' },
        { id: 'an3', name: 'Radial Wings', role: 'Wings spreading out like spokes of a wheel.', hint: 'Attach around the tower.' },
        { id: 'an4', name: 'Solitary Cells', role: 'Hundreds of small cells facing the back of the next wing.', hint: 'Inside each wing.' },
        { id: 'an5', name: 'Memorial Flame', role: 'Today\'s tribute to the freedom fighters.', hint: 'Finish with the memorial.' }
      ],
      points: 250
    },
    festivals: {
      title: 'Ossuary Feast & Island Canoe Races',
      season: 'Community feasts through the year; Island Tourism Festival in winter',
      rituals: 'The Ossuary Feast is an important Nicobarese ceremony honouring ancestors, with community feasting, songs and dances. Decorated hodi canoes are raced as part of island celebrations.',
      culinaryHeritage: 'Coconut, pandanus fruit, seafood and tubers from the forests.',
      celebrationStyle: 'Canoe races, Nicobari dances and community feasts.',
      miniGameType: 'hodi',
      points: 180
    },
    culture: {
      title: 'Nicobari Dance, Cane Craft & Island Life',
      dance: 'Nicobari dance, performed in a circle at the Ossuary Feast and other celebrations.',
      music: 'Songs and rhythms of the island communities.',
      handicrafts: 'Cane and bamboo work, and shell and coconut crafts.',
      textile: 'Light cotton and woven palm-leaf items.',
      lifestyle: 'Coconut groves and fishing villages, with protected reserves for the islands\' indigenous peoples.',
      slideshowSlides: [
        slide('Hodi Canoes', 'Carved from a Single Trunk', 'Slender outrigger canoes glide across lagoons, paddled by village crews.', 'Living Tradition'),
        slide('Cellular Jail', 'Kala Pani Memorial', 'The surviving wings honour freedom fighters imprisoned far from home.', 'History'),
        slide('Nicobari Dance', 'A Circle of Celebration', 'Villagers dance together in a ring during community feasts.', 'Dance'),
        slide('Coral Reefs', 'Gardens Under the Sea', 'The islands\' reefs shelter turtles, dugongs and countless fish.', 'Nature')
      ],
      points: 150
    }
  },

  // ------------------------------------------------------------------ DNH & DD
  {
    id: 'dadra-and-nagar-haveli-and-daman-and-diu',
    type: 'ut',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    capital: 'Daman',
    region: 'West',
    badge: 'Seaside Forts & Warli Forests',
    tagline: 'Portuguese Sea Forts, Warli Painting, Tarpa Music & Coastal Life',
    heroImage: IMG,
    history: {
      title: 'Sea Forts, Liberation & Merger',
      era: '16th Century CE – 2020 CE',
      keyFigures: ['Sultan Bahadur Shah of Gujarat', 'Volunteers of the 1954 liberation of Dadra and Nagar Haveli'],
      highlights: 'The Portuguese built a fortress at Diu after a treaty with Sultan Bahadur Shah of Gujarat in 1535, and took Daman in 1559. Dadra and Nagar Haveli, home to Warli and other Adivasi communities, was freed from Portuguese rule by volunteers in 1954, and Daman and Diu joined India in 1961. The two territories were merged into one Union Territory in 2020.',
      knowledgeSystem: 'Warli painting traditions, coastal boat-building and forest knowledge of the Adivasi communities.',
      discoveryMission: {
        name: 'One Territory, Two Coasts',
        description: 'Study the old maps in the fort\'s archive to learn how these lands came together.',
        objective: 'Find the year the two territories became one Union Territory.',
        quizQuestion: 'In which year were Dadra and Nagar Haveli and Daman and Diu merged into a single Union Territory?',
        quizOptions: ['2020', '1961', '1947', '1987'],
        correctAnswer: 0,
        explanation: 'The two Union Territories were merged on 26 January 2020, with Daman as the capital.'
      },
      artifact: {
        id: 'warli-painting',
        name: 'Warli Wall Painting',
        period: 'Living Adivasi Tradition',
        lore: 'White rice-paste figures on mud walls show circles of dancers, farming and village life using simple circles, triangles and lines.',
        icon: '🖼️'
      },
      points: 150
    },
    games: {
      title: 'Chopat & Kite Flying',
      gameKey: 'chaupar',
      type: 'Cross-and-Circle Race Game',
      origin: 'Gujarati homes along the coast',
      rules: [
        'Chopat is a race game on a cross-shaped board, played with cowrie shells.',
        'Each side moves its pieces around the board and into the centre, sending rivals back by landing on them.',
        'Kite flying fills the skies at Uttarayan in January.'
      ],
      equipment: 'Cloth chopat board, cowrie shells, wooden pieces; kites and thread for Uttarayan.',
      miniGameConfig: { gameType: 'chaupar', boardName: 'Chopat Cloth', playableTitle: 'Play Chopat', difficulty: 'Medium' },
      points: 200
    },
    architecture: {
      title: 'Diu Fort',
      monumentName: 'Diu Fort',
      builderEra: 'Built by the Portuguese from 1535',
      architecturalStyle: 'Portuguese coastal fortification',
      marvelDetails: 'Surrounded by the sea on three sides and a rock-cut moat on the fourth, the fort\'s thick walls and bastions once held cannons facing the Arabian Sea. A lighthouse and chapel stand within its walls.',
      componentsToBuild: [
        { id: 'dd1', name: 'Rock-Cut Moat', role: 'Deep channel cut into the rock on the landward side.', hint: 'Dig this first.' },
        { id: 'dd2', name: 'Sea-Facing Bastions', role: 'Massive stone bastions rising from the shore.', hint: 'Build along the sea.' },
        { id: 'dd3', name: 'Cannon Terraces', role: 'Platforms where cannons guarded the harbour.', hint: 'On top of the bastions.' },
        { id: 'dd4', name: 'Chapel', role: 'Small church inside the fort walls.', hint: 'Inside the fort.' },
        { id: 'dd5', name: 'Lighthouse', role: 'Beacon guiding ships along the coast.', hint: 'Finish at the highest point.' }
      ],
      points: 250
    },
    festivals: {
      title: 'Tarpa Dance & Navratri',
      season: 'Harvest season and Navratri (September–October)',
      rituals: 'Warli and Kokna communities dance in a circle around a tarpa player, whose long gourd wind instrument sets the rhythm. At Navratri, garba circles fill the towns of Daman and Diu.',
      culinaryHeritage: 'Coastal seafood, Gujarati thalis and Portuguese-influenced bakes.',
      celebrationStyle: 'Circle dances to the tarpa and drums, and garba nights.',
      miniGameType: 'rhythm-tarpa',
      points: 180
    },
    culture: {
      title: 'Warli Painting, Tarpa Music & Coastal Traditions',
      dance: 'Tarpa dance of the Warli and Kokna communities, and Garba.',
      music: 'The tarpa, a wind instrument made from a dried gourd and bamboo.',
      handicrafts: 'Warli painting and bamboo craft.',
      textile: 'Handwoven cotton and festive Gujarati embroidery.',
      lifestyle: 'Forest villages in Dadra and Nagar Haveli and fishing communities along the Daman and Diu coast.',
      slideshowSlides: [
        slide('Warli Painting', 'Stories in Circles and Triangles', 'White figures on mud walls dance, farm and celebrate in endless circles.', 'Art'),
        slide('Tarpa Dance', 'Following the Gourd Horn', 'Dancers link arms and spiral around the tarpa player through the night.', 'Dance'),
        slide('Diu Fort', 'Walls Against the Waves', 'The great sea fort still faces the Arabian Sea after nearly five centuries.', 'Architecture'),
        slide('Fishing Harbours', 'Life on the Coast', 'Colourful boats bring in the day\'s catch at the harbours of Daman and Diu.', 'Living Tradition')
      ],
      points: 150
    }
  }
];
