/**
 * Audio synthesis helper using Web Audio API and SpeechSynthesis API
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  public soundEnabled = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((f, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + index * 0.08);

        gain.gain.setValueAtTime(0.001, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.2, now + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.25);
      });
    } catch {
      // AudioContext might be blocked until interaction
    }
  }

  playWrong() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // AudioContext fallback
    }
  }

  playClick() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Ignore
    }
  }

  playLevelUp() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const melody = [392.00, 523.25, 659.25, 783.99, 1046.50];
      melody.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.01, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  playFanfare() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Celebratory Brass fanfare: C4, E4, G4, C5, G4, C5
      const notes = [
        { freq: 261.63, start: 0.0, dur: 0.15 },
        { freq: 329.63, start: 0.15, dur: 0.15 },
        { freq: 392.00, start: 0.30, dur: 0.20 },
        { freq: 523.25, start: 0.50, dur: 0.40 },
        { freq: 392.00, start: 0.95, dur: 0.15 },
        { freq: 523.25, start: 1.15, dur: 0.65 }
      ];

      notes.forEach((note) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note.freq, now + note.start);

        gain.gain.setValueAtTime(0.001, now + note.start);
        gain.gain.linearRampToValueAtTime(0.22, now + note.start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.start + note.dur);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + note.start);
        osc.stop(now + note.start + note.dur);
      });
    } catch {
      // Ignore
    }
  }

  playFirecrackerBurst() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Whistle rocket rise
      const whistle = this.ctx.createOscillator();
      const whistleGain = this.ctx.createGain();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(500, now);
      whistle.frequency.exponentialRampToValueAtTime(1400, now + 0.18);
      whistleGain.gain.setValueAtTime(0.06, now);
      whistleGain.gain.linearRampToValueAtTime(0.001, now + 0.18);
      whistle.connect(whistleGain);
      whistleGain.connect(this.ctx.destination);
      whistle.start(now);
      whistle.stop(now + 0.18);

      // 2. Heavy boom explosion
      const boom = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boom.type = 'triangle';
      boom.frequency.setValueAtTime(140, now + 0.18);
      boom.frequency.exponentialRampToValueAtTime(35, now + 0.45);
      boomGain.gain.setValueAtTime(0.35, now + 0.18);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      boom.connect(boomGain);
      boomGain.connect(this.ctx.destination);
      boom.start(now + 0.18);
      boom.stop(now + 0.55);

      // 3. Crackling sparkle pops (synthesized noise bursts)
      for (let i = 0; i < 6; i++) {
        const popDelay = 0.22 + i * 0.05 + Math.random() * 0.04;
        const popOsc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        popOsc.type = 'square';
        popOsc.frequency.setValueAtTime(800 + Math.random() * 600, now + popDelay);
        popGain.gain.setValueAtTime(0.12, now + popDelay);
        popGain.gain.exponentialRampToValueAtTime(0.001, now + popDelay + 0.04);
        popOsc.connect(popGain);
        popGain.connect(this.ctx.destination);
        popOsc.start(now + popDelay);
        popOsc.stop(now + popDelay + 0.04);
      }
    } catch {
      // Ignore
    }
  }

  speakEnglish(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88; // clear, comfortable pace for students
      utterance.pitch = 1.05;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis failures
    }
  }
}

export const sounds = new SoundEffects();
