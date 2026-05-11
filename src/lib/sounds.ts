let _ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!_ctx) _ctx = new AudioContext();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function tone(
  ctx: AudioContext,
  freq: number,
  endFreq: number,
  gainPeak: number,
  startTime: number,
  duration: number,
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);
  if (endFreq !== freq) {
    osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration * 0.7);
  }

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainPeak, startTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
}

// Short descending chirp — plays on every page navigation
export function playNavSound(): void {
  const ctx = ac();
  if (!ctx) return;
  tone(ctx, 820, 560, 0.1, ctx.currentTime, 0.1);
}

// Rising arpeggio synced to the schematic animation phases:
// frame lines (0ms) → construction lines (~380ms) → annotations (~760ms) → detail art (~1150ms)
export function playBootSound(): void {
  const ctx = ac();
  if (!ctx) return;
  const t = ctx.currentTime;
  const notes = [
    { freq: 440, delay: 0 },
    { freq: 554, delay: 0.38 },
    { freq: 659, delay: 0.76 },
    { freq: 880, delay: 1.15 },
  ];
  notes.forEach(({ freq, delay }) => tone(ctx, freq, freq, 0.07, t + delay, 0.14));
}
