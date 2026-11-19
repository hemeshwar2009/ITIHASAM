// js/i18n.js
// ITIHASAM: Lightweight interface translations (English, Hindi, Tamil).
// Content (state stories, game rules) stays in English; the interface,
// navigation, buttons and headings switch language. Missing keys fall back
// to English so a partial translation never shows a blank.

const LANG_KEY = 'itihasam_language';

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' }
];

const STRINGS = {
  en: {
    appName: 'ITIHASAM',
    appMeaning: 'इतिहासम् — "thus it happened"',
    tagline: '28 States. Countless Stories. One Living Heritage.',
    heroText: 'Travel through centuries of history, rediscover forgotten games, explore architectural wonders and experience the living traditions of India.',
    exploreStates: 'EXPLORE ALL 28 STATES',
    openMap: 'OPEN THE INDIA MAP',
    customizeExplorer: 'CUSTOMIZE YOUR EXPLORER',
    continueJourneyCta: 'CONTINUE YOUR JOURNEY',
    welcomeBack: 'Welcome back',
    // Toolbar
    navStart: 'Start', navHome: 'Home', navMap: 'India Map', navExplore: 'Explore India', navStoryboard: 'Storyboard',
    navJourney: 'My Journey', navRewards: 'Rewards', navAvatar: 'Avatar', navDaily: 'Daily Quiz',
    navTimeline: 'Timeline', navPassport: 'Passport', navLeaderboard: 'Class Board', navImpact: 'Impact',
    navSettings: 'Settings', navHelp: 'Help', toggleNav: 'Toggle navigation',
    // Games
    demoMode: 'DEMO MODE: WATCH & LEARN', playNow: 'Play Now', readyToPlay: 'READY TO PLAY?',
    playGame: 'PLAY GAME', playVsAI: 'PLAY VS AI', passAndPlay: 'PASS & PLAY (2 PLAYERS)',
    replayDemo: 'REPLAY DEMO', customizeAvatar: 'CUSTOMIZE AVATAR', continueJourney: 'CONTINUE JOURNEY',
    playAgain: 'PLAY AGAIN', passAndPlayBadge: 'PASS & PLAY: TWO EXPLORERS', youArePlaying: 'YOUR TURN: YOU ARE PLAYING',
    victoryTitle: 'VICTORY & MASTERY!', tryAgainTitle: 'SO CLOSE — TRY AGAIN!',
    noPointsYet: 'Win to earn CDP', alreadyEarned: 'Points already earned — great practice!',
    badgeProgress: 'Progress saved to your journey', victoryDesc: 'Magnificent! You have mastered',
    lossDesc: 'The opponent won this round. Replay to master the challenge and earn your points.',
    // Map / passport / daily / timeline
    mapTitle: 'The Living Map of Bharat', mapSubtitle: 'Each state fills with gold as you complete its five cultural experiences. Tap a state to explore it.',
    passportTitle: 'Heritage Passport', passportSubtitle: 'Finish all five categories of a state to earn its passport stamp.',
    dailyTitle: 'Daily Heritage Challenge', dailySubtitle: 'One new question every day. Keep your streak alive!',
    streak: 'Day streak', bestStreak: 'Best streak',
    timelineTitle: 'Timeline of the Ages', timelineSubtitle: 'Arrange these dynasties and eras from the oldest to the most recent.',
    checkOrder: 'Check My Order', shuffle: 'New Shuffle',
    leaderboardTitle: 'Class Leaderboard', leaderboardSubtitle: 'Several students can share one device: each gets their own profile, and this board ranks everyone on this device.',
    addExplorer: 'Add Explorer', switchTo: 'Switch',
    // Settings
    settingsTitle: 'Preferences & Settings', language: 'Language', soundEffects: 'Sound Effects',
    soundDesc: 'Bell chimes, wooden clacks and victory fanfares.', music: 'Regional Music Motifs',
    musicDesc: 'Play a short regional melody when you open a state.', highContrast: 'High Contrast',
    highContrastDesc: 'Stronger text and border colours for easier reading.', reducedMotion: 'Reduce Motion',
    reducedMotionDesc: 'Turn off parallax and most animations.', resetProgress: 'Reset Progress',
    resetDesc: 'Clear points and progress for the current explorer.', install: 'Install App',
    installDesc: 'Install Itihasam to play offline like a native app.',
    close: 'Close'
  },
  hi: {
    appName: 'इतिहासम्',
    tagline: '28 राज्य। अनगिनत कहानियाँ। एक जीवंत विरासत।',
    heroText: 'सदियों के इतिहास की यात्रा करें, भूले हुए खेलों को फिर से खोजें, स्थापत्य के चमत्कार देखें और भारत की जीवित परंपराओं का अनुभव करें।',
    exploreStates: 'सभी 28 राज्य देखें', openMap: 'भारत का नक्शा खोलें', customizeExplorer: 'अपना खोजी बनाएँ',
    continueJourneyCta: 'अपनी यात्रा जारी रखें', welcomeBack: 'फिर से स्वागत है',
    navStart: 'शुरुआत', navHome: 'मुखपृष्ठ', navMap: 'भारत नक्शा', navExplore: 'भारत खोजें', navStoryboard: 'कथापथ',
    navJourney: 'मेरी यात्रा', navRewards: 'पुरस्कार', navAvatar: 'अवतार', navDaily: 'दैनिक प्रश्न',
    navTimeline: 'समयरेखा', navPassport: 'पासपोर्ट', navLeaderboard: 'कक्षा बोर्ड', navImpact: 'प्रभाव',
    navSettings: 'सेटिंग्स', navHelp: 'सहायता', toggleNav: 'नेविगेशन दिखाएँ/छिपाएँ',
    demoMode: 'डेमो मोड: देखें और सीखें', playNow: 'अभी खेलें', readyToPlay: 'खेलने के लिए तैयार?',
    playGame: 'खेल शुरू करें', playVsAI: 'कंप्यूटर से खेलें', passAndPlay: 'दो खिलाड़ी (एक डिवाइस)',
    replayDemo: 'डेमो फिर देखें', customizeAvatar: 'अवतार बदलें', continueJourney: 'यात्रा जारी रखें',
    playAgain: 'फिर से खेलें', passAndPlayBadge: 'दो खिलाड़ी मोड', youArePlaying: 'आपकी बारी',
    victoryTitle: 'विजय!', tryAgainTitle: 'लगभग! फिर प्रयास करें',
    noPointsYet: 'अंक पाने के लिए जीतें', alreadyEarned: 'अंक पहले ही मिल चुके हैं — बढ़िया अभ्यास!',
    badgeProgress: 'प्रगति सहेजी गई', victoryDesc: 'शानदार! आपने पूरा किया',
    lossDesc: 'इस बार प्रतिद्वंद्वी जीता। फिर खेलें और अंक अर्जित करें।',
    mapTitle: 'भारत का जीवंत नक्शा', mapSubtitle: 'किसी राज्य की पाँचों गतिविधियाँ पूरी करने पर वह सुनहरा हो जाता है।',
    passportTitle: 'विरासत पासपोर्ट', passportSubtitle: 'किसी राज्य की पाँचों श्रेणियाँ पूरी करें और उसकी मुहर पाएँ।',
    dailyTitle: 'दैनिक विरासत चुनौती', dailySubtitle: 'हर दिन एक नया प्रश्न। अपनी लय बनाए रखें!',
    streak: 'लगातार दिन', bestStreak: 'सर्वश्रेष्ठ',
    timelineTitle: 'युगों की समयरेखा', timelineSubtitle: 'इन राजवंशों को सबसे पुराने से नए क्रम में लगाएँ।',
    checkOrder: 'क्रम जाँचें', shuffle: 'नया क्रम',
    leaderboardTitle: 'कक्षा लीडरबोर्ड', leaderboardSubtitle: 'एक डिवाइस पर कई विद्यार्थी अपनी-अपनी प्रोफ़ाइल से खेल सकते हैं।',
    addExplorer: 'खोजी जोड़ें', switchTo: 'बदलें',
    settingsTitle: 'सेटिंग्स', language: 'भाषा', soundEffects: 'ध्वनि प्रभाव', music: 'क्षेत्रीय संगीत',
    highContrast: 'उच्च कंट्रास्ट', reducedMotion: 'कम एनीमेशन', resetProgress: 'प्रगति रीसेट करें',
    install: 'ऐप इंस्टॉल करें', close: 'बंद करें'
  },
  ta: {
    appName: 'இதிகாசம்',
    tagline: '28 மாநிலங்கள். எண்ணற்ற கதைகள். ஒரு வாழும் பாரம்பரியம்.',
    heroText: 'நூற்றாண்டுகளின் வரலாற்றில் பயணம் செய்யுங்கள், மறந்த விளையாட்டுகளை மீண்டும் கண்டறியுங்கள், கட்டடக்கலை அதிசயங்களையும் இந்தியாவின் வாழும் மரபுகளையும் அனுபவியுங்கள்.',
    exploreStates: '28 மாநிலங்களையும் ஆராயுங்கள்', openMap: 'இந்திய வரைபடம்', customizeExplorer: 'உங்கள் ஆய்வாளரை உருவாக்குங்கள்',
    continueJourneyCta: 'பயணத்தைத் தொடருங்கள்', welcomeBack: 'மீண்டும் வருக',
    navStart: 'தொடக்கம்', navHome: 'முகப்பு', navMap: 'வரைபடம்', navExplore: 'இந்தியா', navStoryboard: 'கதைப்பாதை',
    navJourney: 'என் பயணம்', navRewards: 'பரிசுகள்', navAvatar: 'அவதாரம்', navDaily: 'தினசரி வினா',
    navTimeline: 'காலவரிசை', navPassport: 'கடவுச்சீட்டு', navLeaderboard: 'வகுப்பு', navImpact: 'தாக்கம்',
    navSettings: 'அமைப்புகள்', navHelp: 'உதவி', toggleNav: 'வழிசெலுத்தல்',
    demoMode: 'செயல்விளக்கம்: பார்த்து கற்றுக்கொள்', playNow: 'இப்போது விளையாடு', readyToPlay: 'விளையாடத் தயாரா?',
    playGame: 'விளையாடு', playVsAI: 'கணினியுடன் விளையாடு', passAndPlay: 'இருவர் விளையாட்டு',
    replayDemo: 'மீண்டும் காண்க', customizeAvatar: 'அவதாரம் மாற்று', continueJourney: 'பயணம் தொடர்',
    playAgain: 'மீண்டும் விளையாடு', passAndPlayBadge: 'இருவர் விளையாட்டு', youArePlaying: 'உங்கள் முறை',
    victoryTitle: 'வெற்றி!', tryAgainTitle: 'கிட்டத்தட்ட! மீண்டும் முயலுங்கள்',
    noPointsYet: 'புள்ளிகள் பெற வெல்லுங்கள்', alreadyEarned: 'புள்ளிகள் ஏற்கனவே பெற்றுவிட்டீர்கள்!',
    badgeProgress: 'முன்னேற்றம் சேமிக்கப்பட்டது', victoryDesc: 'அருமை! நீங்கள் வென்றீர்கள்',
    lossDesc: 'இம்முறை எதிராளி வென்றார். மீண்டும் விளையாடுங்கள்.',
    mapTitle: 'பாரதத்தின் வாழும் வரைபடம்', mapSubtitle: 'ஒரு மாநிலத்தின் ஐந்து அனுபவங்களையும் முடித்தால் அது பொன்னிறமாகும்.',
    passportTitle: 'பாரம்பரிய கடவுச்சீட்டு', passportSubtitle: 'ஒரு மாநிலத்தின் ஐந்து பிரிவுகளையும் முடித்து முத்திரை பெறுங்கள்.',
    dailyTitle: 'தினசரி பாரம்பரிய சவால்', dailySubtitle: 'ஒவ்வொரு நாளும் ஒரு புதிய கேள்வி.',
    streak: 'தொடர் நாட்கள்', bestStreak: 'சிறந்தது',
    timelineTitle: 'யுகங்களின் காலவரிசை', timelineSubtitle: 'இந்த வம்சங்களை பழமையானதிலிருந்து வரிசைப்படுத்துங்கள்.',
    checkOrder: 'சரிபார்', shuffle: 'புதிய கலவை',
    leaderboardTitle: 'வகுப்பு தரவரிசை', addExplorer: 'ஆய்வாளர் சேர்', switchTo: 'மாற்று',
    settingsTitle: 'அமைப்புகள்', language: 'மொழி', soundEffects: 'ஒலி விளைவுகள்', music: 'பிராந்திய இசை',
    highContrast: 'அதிக மாறுபாடு', reducedMotion: 'குறைந்த அசைவு', resetProgress: 'முன்னேற்றத்தை அழி',
    install: 'செயலியை நிறுவு', close: 'மூடு'
  }
};

function readLang() {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v && STRINGS[v]) return v;
  } catch (e) { /* storage unavailable */ }
  return 'en';
}

let currentLang = readLang();

export function getLanguage() {
  return currentLang;
}

export function setLanguage(code) {
  if (!STRINGS[code]) return;
  currentLang = code;
  try { localStorage.setItem(LANG_KEY, code); } catch (e) { /* ignore */ }
  if (typeof document !== 'undefined') document.documentElement.lang = code;
}

export function t(key) {
  return (STRINGS[currentLang] && STRINGS[currentLang][key]) || STRINGS.en[key] || key;
}

/** Escape text before inserting it into innerHTML templates. */
export function escapeHTML(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

if (typeof document !== 'undefined') document.documentElement.lang = currentLang;
