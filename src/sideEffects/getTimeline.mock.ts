import type { GetTimelineResult } from "./getTimeline";

export const getTimelineMock = async (): Promise<GetTimelineResult> => {
  await new Promise((r) => setTimeout(r, 200));
  return {
    lines: [
      "[Narration] Dan is working at his desk when Boris enters for his first day",
      "Boris => Dan: Hey, I'm Boris — just started today. Are you Dan?",
      "[Narration] Boris walks closer to Dan's desk. Dan looks up from his screen.",
      "Dan => Boris: Hey Boris, welcome! Let me show you around.",
      "[Narration] Mia glances over from the lounge area and waves.",
      "Mia => Boris: Hi Boris! I'm Mia, the designer. Welcome aboard!",
    ],
  };
};
