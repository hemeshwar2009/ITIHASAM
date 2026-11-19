// js/audio/soundSynth.js
// ITIHASAM: Web Audio API Retro Heritage Synthesizer
// Synthesizes temple chimes, wooden board clacks, cowrie rolls, and victory raga fanfares

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.musicEnabled = false;
  }

  init() {
    if (!this.ctx && (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext))) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 1. Soft Parchment Click
  playClick() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Audio not permitted yet
    }
  }

  // 2. Wooden Board / Cowrie Shell Clack
  playClack() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // 3. Cowrie Shell Shake & Roll
  playCowrieRoll() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      for (let i = 0; i < 4; i++) {
        setTimeout(() => this.playClack(), i * 45);
      }
    } catch (e) {}
  }

  // 4. Temple Bronze Bell / Sacred Chime
  playBell() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Fundamental + overtones
      const freqs = [528, 1056, 1584, 2112];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const decay = 1.2 / (idx + 1);
        gain.gain.setValueAtTime(0.15 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + decay);
      });
    } catch (e) {}
  }

  // 5. Victory Pentatonic Raga Fanfare (Sa, Re, Ga, Pa, Dha, Sa)
  playVictory() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      // Mohanam / Bhoopali Raga frequencies
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(now + 0.4);
        }, idx * 90);
      });
    } catch (e) {}
  }

  // 6. Level Up Achievement Fanfare
  playLevelUp() {
    if (!this.enabled) return;
    try {
      this.playBell();
      setTimeout(() => this.playVictory(), 200);
    } catch (e) {}
  }

  // 7. Festival drum (dhol / mandar / log drum) — soft=true for the backing beat
  playDrum(soft = false) {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(soft ? 110 : 160, now);
      osc.frequency.exponentialRampToValueAtTime(soft ? 55 : 60, now + 0.18);
      gain.gain.setValueAtTime(soft ? 0.18 : 0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } catch (e) {}
  }

  // 8. Short regional melody, one per region, in a characteristic scale and
  //    timbre (veena-like pluck for the South, flute for the North, etc.).
  playRegionalMotif(region) {
    if (!this.enabled || !this.musicEnabled) return;
    const SA = 261.63;
    const ratio = { S: 1, r: 16 / 15, R: 9 / 8, g: 6 / 5, G: 5 / 4, M: 4 / 3, P: 3 / 2, d: 8 / 5, D: 5 / 3, n: 9 / 5, N: 15 / 8, S2: 2 };
    const MOTIFS = {
      South: { wave: 'triangle', notes: ['S', 'R', 'G', 'P', 'D', 'S2', 'D', 'P'], dur: 0.22 },       // Mohanam on veena
      North: { wave: 'sine', notes: ['S', 'R', 'M', 'P', 'n', 'P', 'M', 'R'], dur: 0.3 },            // Bhimpalasi-ish flute
      West: { wave: 'sawtooth', notes: ['S', 'G', 'M', 'P', 'N', 'S2', 'N', 'P'], dur: 0.2 },         // Shehnai-like
      East: { wave: 'triangle', notes: ['S', 'R', 'G', 'M', 'P', 'G', 'R', 'S'], dur: 0.26 },         // Baul ektara
      Northeast: { wave: 'square', notes: ['S', 'R', 'G', 'P', 'D', 'P', 'G', 'R'], dur: 0.2 },       // Bamboo pentatonic
      Central: { wave: 'sine', notes: ['S', 'g', 'M', 'P', 'd', 'P', 'M', 'g'], dur: 0.3 }           // Malkauns-ish sarangi
    };
    const m = MOTIFS[region] || MOTIFS.South;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const start = this.ctx.currentTime + 0.05;
      m.notes.forEach((n, i) => {
        const t = start + i * m.dur;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = m.wave;
        osc.frequency.setValueAtTime(SA * ratio[n], t);
        const peak = m.wave === 'sawtooth' || m.wave === 'square' ? 0.05 : 0.14;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(peak, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + m.dur * 1.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + m.dur * 1.7);
      });
      // Tanpura-like drone underneath
      const drone = this.ctx.createOscillator();
      const dg = this.ctx.createGain();
      drone.type = 'sine';
      drone.frequency.setValueAtTime(SA / 2, start);
      dg.gain.setValueAtTime(0.0001, start);
      dg.gain.exponentialRampToValueAtTime(0.06, start + 0.3);
      dg.gain.exponentialRampToValueAtTime(0.0001, start + m.notes.length * m.dur + 0.6);
      drone.connect(dg);
      dg.connect(this.ctx.destination);
      drone.start(start);
      drone.stop(start + m.notes.length * m.dur + 0.7);
    } catch (e) {}
  }

  // 9. Retro menu cursor move
  playMenuMove() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(660, now + 0.03);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {}
  }

  // 10. Retro menu select
  playMenuSelect() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  // 11. Title-screen start fanfare
  playStartFanfare() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Arpeggio notes: C4, E4, G4, C5, E5, G5, C6 with square / pulse wave + bell overtone
      const arpeggio = [
        { f: 261.63, t: 0.00, d: 0.08 },
        { f: 329.63, t: 0.07, d: 0.08 },
        { f: 392.00, t: 0.14, d: 0.08 },
        { f: 523.25, t: 0.21, d: 0.10 },
        { f: 659.25, t: 0.28, d: 0.10 },
        { f: 783.99, t: 0.35, d: 0.12 },
        { f: 1046.50, t: 0.44, d: 0.55 }
      ];

      arpeggio.forEach(({ f, t, d }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(0.12, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + d);
      });

      // Layered subtle temple bell chime for sacred resonance
      setTimeout(() => this.playBell(), 440);
    } catch (e) {}
  }

  toggleMusic(enable = !this.musicEnabled) {
    this.musicEnabled = enable;
    return this.musicEnabled;
  }

  toggleSound(enable = !this.enabled) {
    this.enabled = enable;
    return this.enabled;
  }
}

export const soundSynth = new SoundSynthesizer();

if (typeof window !== 'undefined') {
  window.soundSynth = soundSynth;
}
