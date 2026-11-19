// js/audio/soundSynth.js
// DISCOVER INDIA: Web Audio API Retro Heritage Synthesizer
// Synthesizes temple chimes, wooden board clacks, cowrie rolls, and victory raga fanfares

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
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

  toggleSound(enable = !this.enabled) {
    this.enabled = enable;
    return this.enabled;
  }
}

export const soundSynth = new SoundSynthesizer();

if (typeof window !== 'undefined') {
  window.soundSynth = soundSynth;
}
