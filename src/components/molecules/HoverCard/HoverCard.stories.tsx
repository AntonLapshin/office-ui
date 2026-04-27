import { HoverCard } from "./HoverCard";
import type { CharacterUI } from "@/types";

export default { title: "molecules/HoverCard" };

const char: CharacterUI = {
  name: "Dan Ortega",
  initials: "DO",
  gradient: ["#6366f1", "#a855f7"],
  location: "desk-1",
  mood: "Focused",
  currentAction: "Pairing on auth flow",
  intent: "",
  memory: [],
  relationships: {},
  updatedAt: "",
};

const mockRect = new DOMRect(200, 200, 40, 40);

export const Default = () => (
  <div className="bg-[#06060c] h-[400px]">
    <HoverCard character={char} anchorRect={mockRect} />
  </div>
);
