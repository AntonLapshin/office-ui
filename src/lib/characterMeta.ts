import type { CharacterState, CharacterUI } from "@/types";

const GRADIENT_PALETTE: [string, string][] = [
  ["#6366f1", "#a855f7"],
  ["#8b5cf6", "#ec4899"],
  ["#06b6d4", "#6366f1"],
  ["#10b981", "#6366f1"],
  ["#f59e0b", "#ef4444"],
  ["#ec4899", "#8b5cf6"],
  ["#14b8a6", "#3b82f6"],
  ["#f97316", "#eab308"],
  ["#6366f1", "#06b6d4"],
  ["#a855f7", "#ec4899"],
];

export function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function deriveGradient(name: string): [string, string] {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % GRADIENT_PALETTE.length;
  return GRADIENT_PALETTE[index]!;
}

export function buildCharacterUI(state: CharacterState): CharacterUI {
  return {
    ...state,
    initials: deriveInitials(state.name),
    gradient: deriveGradient(state.name),
  };
}

export function buildCharacterMap(
  states: Record<string, CharacterState>,
): Record<string, CharacterUI> {
  const result: Record<string, CharacterUI> = {};
  for (const [key, state] of Object.entries(states)) {
    result[key] = buildCharacterUI(state);
  }
  return result;
}
