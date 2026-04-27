import type { SpaceLayout } from "../types";

export const getLayoutProd = async (): Promise<SpaceLayout> => {
  const res = await fetch("http://localhost:3001/api/layout");
  if (!res.ok) throw new Error(`GET /api/layout failed: ${res.status}`);
  return res.json();
};
