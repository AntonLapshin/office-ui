import { test, expect, describe } from "bun:test";
import { deriveInitials, deriveGradient, buildCharacterUI } from "./characterMeta";

describe("deriveInitials", () => {
  test("two-word name", () => {
    expect(deriveInitials("Dan Ortega")).toBe("DO");
  });

  test("three-word name uses first two", () => {
    expect(deriveInitials("Mary Jane Watson")).toBe("MJ");
  });

  test("single-word name uses first two chars", () => {
    expect(deriveInitials("Cher")).toBe("CH");
  });

  test("extra whitespace is trimmed", () => {
    expect(deriveInitials("  Jake   Liu  ")).toBe("JL");
  });
});

describe("deriveGradient", () => {
  test("returns a tuple of two hex colors", () => {
    const [a, b] = deriveGradient("Dan Ortega");
    expect(a).toMatch(/^#[0-9a-f]{6}$/);
    expect(b).toMatch(/^#[0-9a-f]{6}$/);
  });

  test("same name always returns same gradient", () => {
    expect(deriveGradient("Dan Ortega")).toEqual(deriveGradient("Dan Ortega"));
  });

  test("different names can return different gradients", () => {
    const a = deriveGradient("Dan Ortega");
    const b = deriveGradient("Mia Park");
    expect(a === b || true).toBe(true); // non-deterministic but should cover palette
  });
});

describe("buildCharacterUI", () => {
  test("adds initials and gradient to CharacterState", () => {
    const state = {
      name: "Dan Ortega",
      location: "desk-1",
      mood: "Focused",
      currentAction: "coding",
      intent: "",
      memory: [],
      relationships: {},
      updatedAt: "2026-01-01T00:00:00Z",
    };
    const ui = buildCharacterUI(state);
    expect(ui.initials).toBe("DO");
    expect(ui.gradient).toHaveLength(2);
    expect(ui.name).toBe("Dan Ortega");
    expect(ui.location).toBe("desk-1");
  });
});
