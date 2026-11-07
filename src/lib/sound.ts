let context: AudioContext | null = null;

export function playEntrySound(seed: number): void {
  const AudioCtx = window.AudioContext;
  if (!AudioCtx) return;
  if (!context) context = new AudioCtx();
  if (context.state === "suspended") void context.resume();

  const now = context.currentTime;
  const base = 280 + (seed % 10) * 32;
  [0, 1].forEach((step) => {
    const osc = context!.createOscillator();
    const gain = context!.createGain();
    osc.type = "square";
    osc.frequency.value = step === 0 ? base : base * 1.5;
    const start = now + step * 0.07;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.025, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.14);
    osc.connect(gain);
    gain.connect(context!.destination);
    osc.start(start);
    osc.stop(start + 0.15);
  });
}
