import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import type { AppState, CharacterState, CharacterUI, SpaceLayout } from "../types";
import { ContextSideEffects } from "../contexts/ContextSideEffects";
import { buildCharacterMap } from "../lib/characterMeta";
import { resolveCharacterPositions } from "../lib/spacePositions";

export function useAppState(): AppState & { sendMessage: (msg: string) => void } {
  const sideEffects = useContext(ContextSideEffects);

  const [session, setSession] = useState<AppState["session"]>(null);
  const [rawCharacters, setRawCharacters] = useState<Record<string, CharacterState>>({});
  const [layout, setLayout] = useState<SpaceLayout | null>(null);
  const [timelineLines, setTimelineLines] = useState<string[]>([]);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      try {
        const [stateRes, layoutRes, timelineRes] = await Promise.all([
          sideEffects.getState(),
          sideEffects.getLayout(),
          sideEffects.getTimeline(),
        ]);
        if (cancelled) return;
        setSession(stateRes.session);
        setRawCharacters(stateRes.characters);
        setLayout(layoutRes);
        setTimelineLines(timelineRes.lines);
      } catch (err) {
        console.error("Failed to load initial state:", err);
      }
    }

    load();

    const unsubscribe = sideEffects.subscribeToEvents({
      onSpeech: (line) => {
        setTimelineLines((prev) => [...prev, line]);
        setWaitingForInput(false);
      },
      onNarration: (lines) => {
        setTimelineLines((prev) => [...prev, ...lines]);
      },
      onState: (characters) => {
        setRawCharacters(characters);
      },
      onWaiting: () => {
        setWaitingForInput(true);
      },
      onRound: (round) => {
        setSession((prev) =>
          prev ? { ...prev, currentRound: round } : prev,
        );
      },
      onTurn: () => {
        setWaitingForInput(false);
      },
      onPaused: () => {
        setSession((prev) =>
          prev ? { ...prev, status: "paused" } : prev,
        );
      },
    });

    setConnected(true);

    return () => {
      cancelled = true;
      unsubscribe();
      setConnected(false);
    };
  }, [sideEffects]);

  const characters = useMemo(
    () => buildCharacterMap(rawCharacters),
    [rawCharacters],
  );

  const characterPositions = useMemo(
    () => (layout ? resolveCharacterPositions(rawCharacters, layout) : []),
    [rawCharacters, layout],
  );

  const sendMessage = useCallback(
    (msg: string) => {
      sideEffects.sendMessage(msg).catch((err) => {
        console.error("Failed to send message:", err);
      });
    },
    [sideEffects],
  );

  return {
    session,
    characters,
    characterPositions,
    layout,
    timelineLines,
    waitingForInput,
    connected,
    sendMessage,
  };
}
