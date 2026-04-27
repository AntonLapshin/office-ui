import type { GetStateResult } from "./getState";

export const getStateProd = async (): Promise<GetStateResult> => {
  const res = await fetch("/api/state");
  if (!res.ok) throw new Error(`GET /api/state failed: ${res.status}`);
  return res.json();
};
