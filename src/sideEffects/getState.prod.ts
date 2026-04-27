import type { GetStateResult } from "./getState";

export const getStateProd = async (): Promise<GetStateResult> => {
  const res = await fetch("http://localhost:3001/api/state");
  if (!res.ok) throw new Error(`GET /api/state failed: ${res.status}`);
  return res.json();
};
