import { test, expect, describe } from "bun:test";
import { parseTimelineLine, parseTimeline } from "./timelineParser";

describe("parseTimelineLine", () => {
  test("parses narration", () => {
    const entry = parseTimelineLine("[Narration] Dan sits at his desk.");
    expect(entry).toEqual({ type: "narration", text: "Dan sits at his desk." });
  });

  test("parses message", () => {
    const entry = parseTimelineLine("Dan => Boris: Hey, welcome!");
    expect(entry).toEqual({
      type: "message",
      from: "Dan",
      to: "Boris",
      text: "Hey, welcome!",
    });
  });

  test("handles multi-word names", () => {
    const entry = parseTimelineLine("Dan Ortega => Mia Park: Good morning");
    expect(entry).toEqual({
      type: "message",
      from: "Dan Ortega",
      to: "Mia Park",
      text: "Good morning",
    });
  });

  test("empty line returns null", () => {
    expect(parseTimelineLine("")).toBeNull();
    expect(parseTimelineLine("   ")).toBeNull();
  });

  test("unknown format treated as narration", () => {
    const entry = parseTimelineLine("Something happened.");
    expect(entry).toEqual({ type: "narration", text: "Something happened." });
  });
});

describe("parseTimeline", () => {
  test("parses multiple lines", () => {
    const lines = [
      "[Narration] Scene begins.",
      "Dan => Boris: Hi!",
      "",
      "[Narration] Boris waves.",
    ];
    const entries = parseTimeline(lines);
    expect(entries).toHaveLength(3);
    expect(entries[0]!.type).toBe("narration");
    expect(entries[1]!.type).toBe("message");
    expect(entries[2]!.type).toBe("narration");
  });
});
