export interface MoodTone {
  dot: string;
  glow: string;
}

const MOOD_MAP: Record<string, MoodTone> = {
  focus: { dot: "#c4b5fd", glow: "rgba(196,181,253,0.4)" },
  heads: { dot: "#c4b5fd", glow: "rgba(196,181,253,0.4)" },
  cheer: { dot: "#6ee7b7", glow: "rgba(110,231,183,0.4)" },
  happy: { dot: "#6ee7b7", glow: "rgba(110,231,183,0.4)" },
  curio: { dot: "#67e8f9", glow: "rgba(103,232,249,0.4)" },
  busy: { dot: "#fda4af", glow: "rgba(253,164,175,0.4)" },
  stress: { dot: "#fda4af", glow: "rgba(253,164,175,0.4)" },
};

const DEFAULT_TONE: MoodTone = {
  dot: "#d4d4d8",
  glow: "rgba(212,212,216,0.4)",
};

export function getMoodTone(mood: string): MoodTone {
  const lower = mood.toLowerCase();
  for (const [key, tone] of Object.entries(MOOD_MAP)) {
    if (lower.includes(key)) return tone;
  }
  return DEFAULT_TONE;
}
