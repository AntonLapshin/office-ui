import type { GetStateResult } from "./getState";

export const getStateMock = async (): Promise<GetStateResult> => {
  await new Promise((r) => setTimeout(r, 300));
  return {
    session: {
      id: "session_1",
      description: "Dan is working when Boris enters for his first day",
      spaceName: "startup",
      characters: ["dan", "boris", "mia", "leo"],
      userCharacter: "dan",
      status: "active",
      currentRound: 3,
      currentTurnIndex: 0,
      turnPhase: "character-turn",
      createdAt: "2026-04-26T10:00:00Z",
      updatedAt: "2026-04-26T10:05:00Z",
    },
    characters: {
      dan: {
        name: "Dan Ortega",
        location: "desk-1",
        mood: "Focused",
        currentAction: "Pairing on auth flow",
        intent: "",
        memory: [],
        relationships: { boris: "colleague" },
        updatedAt: "2026-04-26T10:05:00Z",
      },
      boris: {
        name: "Boris Chen",
        location: "desk-1",
        mood: "Cheerful",
        currentAction: "Getting settled",
        intent: "meet the team",
        memory: [],
        relationships: { dan: "colleague" },
        updatedAt: "2026-04-26T10:05:00Z",
      },
      mia: {
        name: "Mia Park",
        location: "lounge",
        mood: "Heads-down",
        currentAction: "Drafting design spec",
        intent: "",
        memory: [],
        relationships: {},
        updatedAt: "2026-04-26T10:05:00Z",
      },
      leo: {
        name: "Leo Andersen",
        location: "phone-booth",
        mood: "Curious",
        currentAction: "On a call",
        intent: "",
        memory: [],
        relationships: {},
        updatedAt: "2026-04-26T10:05:00Z",
      },
    },
  };
};
