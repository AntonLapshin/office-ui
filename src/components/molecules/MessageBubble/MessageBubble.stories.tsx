import { MessageBubble } from "./MessageBubble";
import type { CharacterUI } from "../../../types";

export default { title: "molecules/MessageBubble" };

const dan: CharacterUI = {
  name: "Dan Ortega",
  initials: "DO",
  gradient: ["#6366f1", "#a855f7"],
  location: "desk-1",
  mood: "Focused",
  currentAction: "coding",
  intent: "",
  memory: [],
  relationships: {},
  updatedAt: "",
};

const boris: CharacterUI = {
  name: "Boris Chen",
  initials: "BC",
  gradient: ["#8b5cf6", "#ec4899"],
  location: "desk-1",
  mood: "Cheerful",
  currentAction: "chatting",
  intent: "",
  memory: [],
  relationships: {},
  updatedAt: "",
};

export const Left = () => (
  <div className="bg-[#06060c] p-6 w-[500px]">
    <MessageBubble
      speaker={boris}
      recipient={dan}
      text="Hey, I'm Boris — just started today. Are you Dan?"
      side="left"
    />
  </div>
);

export const Right = () => (
  <div className="bg-[#06060c] p-6 w-[500px]">
    <MessageBubble
      speaker={dan}
      recipient={boris}
      text="Hey Boris, welcome! Let me show you around."
      side="right"
    />
  </div>
);
