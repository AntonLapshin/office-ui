import { test, expect, describe } from "bun:test";
import { getMoodTone } from "./moodColor";

describe("getMoodTone", () => {
  test("focused maps to violet", () => {
    const tone = getMoodTone("Focused");
    expect(tone.dot).toBe("#c4b5fd");
  });

  test("cheerful maps to emerald", () => {
    const tone = getMoodTone("Cheerful");
    expect(tone.dot).toBe("#6ee7b7");
  });

  test("curious maps to cyan", () => {
    const tone = getMoodTone("Curious");
    expect(tone.dot).toBe("#67e8f9");
  });

  test("stressed maps to rose", () => {
    const tone = getMoodTone("Stressed");
    expect(tone.dot).toBe("#fda4af");
  });

  test("unknown mood returns default zinc", () => {
    const tone = getMoodTone("confused");
    expect(tone.dot).toBe("#d4d4d8");
  });

  test("case insensitive", () => {
    expect(getMoodTone("HAPPY").dot).toBe("#6ee7b7");
  });
});
