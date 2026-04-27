import { test, expect, describe } from "bun:test";
import { resolveCharacterPositions } from "./spacePositions";
import type { SpaceLayout, CharacterState } from "@/types";

const layout: SpaceLayout = {
  name: "Test Office",
  bounds: { width: 600, height: 480 },
  objects: [
    { id: "desk-1", type: "desk", label: "Desk 1", x: 100, y: 100, w: 120, h: 80 },
    { id: "lounge", type: "room", label: "Lounge", x: 300, y: 300, w: 200, h: 100 },
  ],
};

function makeChar(name: string, location: string): CharacterState {
  return {
    name,
    location,
    mood: "neutral",
    currentAction: "standing",
    intent: "",
    memory: [],
    relationships: {},
    updatedAt: "",
  };
}

describe("resolveCharacterPositions", () => {
  test("places character at center of matching object", () => {
    const chars = { dan: makeChar("Dan", "desk-1") };
    const positions = resolveCharacterPositions(chars, layout);
    expect(positions).toHaveLength(1);
    expect(positions[0]!.x).toBe(160); // 100 + 120/2
    expect(positions[0]!.y).toBe(140); // 100 + 80/2
  });

  test("unknown location falls back to center of bounds", () => {
    const chars = { dan: makeChar("Dan", "hallway") };
    const positions = resolveCharacterPositions(chars, layout);
    expect(positions[0]!.x).toBe(300);
    expect(positions[0]!.y).toBe(240);
  });

  test("multiple characters at same location spread horizontally", () => {
    const chars = {
      dan: makeChar("Dan", "lounge"),
      mia: makeChar("Mia", "lounge"),
    };
    const positions = resolveCharacterPositions(chars, layout);
    expect(positions).toHaveLength(2);
    expect(positions[0]!.x).not.toBe(positions[1]!.x);
    expect(positions[0]!.y).toBe(positions[1]!.y);
  });
});
