// Backend types (matching office/src/lib/schema.ts)

export interface CharacterState {
  name: string;
  location: string;
  mood: string;
  currentAction: string;
  intent: string;
  memory: string[];
  relationships: Record<string, string>;
  updatedAt: string;
}

export type SessionStatus = "active" | "paused" | "ended";
export type TurnPhase = "character-turn" | "stage-manager-update";

export interface Session {
  id: string;
  description: string;
  spaceName: string;
  characters: string[];
  userCharacter: string | null;
  status: SessionStatus;
  currentRound: number;
  currentTurnIndex: number;
  turnPhase: TurnPhase;
  createdAt: string;
  updatedAt: string;
}

export interface SpaceObject {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SpaceLayout {
  name: string;
  bounds: { width: number; height: number };
  objects: SpaceObject[];
}

// Frontend types

export interface CharacterUI extends CharacterState {
  initials: string;
  gradient: [string, string];
}

export interface CharacterPosition {
  id: string;
  x: number;
  y: number;
}

export interface TimelineEntry {
  type: "narration" | "message";
  text: string;
  from?: string;
  to?: string;
}

export interface SSEEventHandlers {
  onSpeech?: (line: string) => void;
  onNarration?: (lines: string[]) => void;
  onState?: (characters: Record<string, CharacterState>) => void;
  onWaiting?: (character: string) => void;
  onRound?: (round: number) => void;
  onTurn?: (character: string) => void;
  onPaused?: () => void;
}

export interface AppState {
  session: Session | null;
  characters: Record<string, CharacterUI>;
  characterPositions: CharacterPosition[];
  layout: SpaceLayout | null;
  timelineLines: string[];
  waitingForInput: boolean;
  connected: boolean;
}
