import type { GetTimelineResult } from "./getTimeline";

export const getTimelineProd = async (): Promise<GetTimelineResult> => {
  const res = await fetch("/api/timeline");
  if (!res.ok) throw new Error(`GET /api/timeline failed: ${res.status}`);
  return res.json();
};
