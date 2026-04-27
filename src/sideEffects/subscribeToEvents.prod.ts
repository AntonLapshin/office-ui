import type { SSEEventHandlers, CharacterState } from "../types";

export const subscribeToEventsProd = (handlers: SSEEventHandlers): (() => void) => {
  let es: EventSource | null = null;
  let retryDelay = 1000;
  let closed = false;

  function connect(): void {
    if (closed) return;
    es = new EventSource("http://localhost:3001/api/events");

    es.addEventListener("speech", (e) => {
      const data = JSON.parse(e.data) as { line: string };
      handlers.onSpeech?.(data.line);
    });

    es.addEventListener("narration", (e) => {
      const data = JSON.parse(e.data) as { lines: string[] };
      handlers.onNarration?.(data.lines);
    });

    es.addEventListener("state", (e) => {
      const data = JSON.parse(e.data) as { characters: Record<string, CharacterState> };
      handlers.onState?.(data.characters);
    });

    es.addEventListener("waiting", (e) => {
      const data = JSON.parse(e.data) as { character: string };
      handlers.onWaiting?.(data.character);
    });

    es.addEventListener("round", (e) => {
      const data = JSON.parse(e.data) as { round: number };
      handlers.onRound?.(data.round);
    });

    es.addEventListener("turn", (e) => {
      const data = JSON.parse(e.data) as { character: string };
      handlers.onTurn?.(data.character);
    });

    es.addEventListener("paused", () => {
      handlers.onPaused?.();
    });

    es.onopen = () => {
      retryDelay = 1000;
    };

    es.onerror = () => {
      es?.close();
      if (!closed) {
        setTimeout(connect, retryDelay);
        retryDelay = Math.min(retryDelay * 2, 30000);
      }
    };
  }

  connect();

  return () => {
    closed = true;
    es?.close();
  };
};
