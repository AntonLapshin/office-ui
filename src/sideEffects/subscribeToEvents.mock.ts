import type { SSEEventHandlers } from "../types";

interface MockSpeechEvent {
  type: "speech";
  line: string;
}

interface MockNarrationEvent {
  type: "narration";
  lines: string[];
}

type MockEvent = MockSpeechEvent | MockNarrationEvent;

export const subscribeToEventsMock = (handlers: SSEEventHandlers): (() => void) => {
  const mockEvents: MockEvent[] = [
    { type: "speech", line: "Leo => Mia: Have you seen the new designs?" },
    { type: "narration", lines: ["[Narration] Leo walks towards Mia's desk."] },
    { type: "speech", line: "Mia => Leo: Yeah, let me pull them up!" },
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index >= mockEvents.length) {
      clearInterval(interval);
      return;
    }
    const event = mockEvents[index]!;
    if (event.type === "speech") handlers.onSpeech?.(event.line);
    if (event.type === "narration") handlers.onNarration?.(event.lines);
    index++;
  }, 3000);

  return () => clearInterval(interval);
};
