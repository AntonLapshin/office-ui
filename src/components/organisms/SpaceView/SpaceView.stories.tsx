import { SpaceView } from "./SpaceView";
import { buildCharacterMap } from "@/lib/characterMeta";
import { resolveCharacterPositions } from "@/lib/spacePositions";
import type { SpaceLayout, CharacterState } from "@/types";

export default { title: "organisms/SpaceView" };

const layout: SpaceLayout = {
  name: "HQ — 4th Floor",
  bounds: { width: 600, height: 480 },
  objects: [
    { id: "phone-booth", type: "room", label: "Phone Booth", x: 30, y: 30, w: 200, h: 130 },
    { id: "desk-1", type: "desk", label: "Desk 1", x: 320, y: 170, w: 110, h: 130 },
    { id: "lounge", type: "room", label: "Lounge", x: 380, y: 350, w: 180, h: 100 },
  ],
};

const rawChars: Record<string, CharacterState> = {
  dan: { name: "Dan Ortega", location: "phone-booth", mood: "Focused", currentAction: "coding", intent: "", memory: [], relationships: {}, updatedAt: "" },
  mia: { name: "Mia Park", location: "desk-1", mood: "Heads-down", currentAction: "designing", intent: "", memory: [], relationships: {}, updatedAt: "" },
  leo: { name: "Leo Andersen", location: "lounge", mood: "Curious", currentAction: "chatting", intent: "", memory: [], relationships: {}, updatedAt: "" },
};

const characters = buildCharacterMap(rawChars);
const positions = resolveCharacterPositions(rawChars, layout);

export const Default = () => (
  <div className="bg-[#06060c] h-[520px] p-4">
    <SpaceView
      layout={layout}
      characters={characters}
      characterPositions={positions}
      onAvatarHover={() => {}}
    />
  </div>
);
