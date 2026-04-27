import type { SpaceLayout } from "@/types";

export const getLayoutMock = async (): Promise<SpaceLayout> => {
  await new Promise((r) => setTimeout(r, 200));
  return {
    name: "HQ — 4th Floor",
    bounds: { width: 600, height: 480 },
    objects: [
      { id: "phone-booth", type: "room", label: "Phone Booth", x: 30, y: 30, w: 200, h: 130 },
      { id: "desk-1", type: "desk", label: "Desk 1", x: 320, y: 170, w: 110, h: 130 },
      { id: "desk-2", type: "desk", label: "Desk 2", x: 130, y: 380, w: 180, h: 70 },
      { id: "lounge", type: "room", label: "Lounge", x: 380, y: 350, w: 180, h: 100 },
    ],
  };
};
