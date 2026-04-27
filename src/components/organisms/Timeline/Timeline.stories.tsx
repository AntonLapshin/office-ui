import { Timeline } from "./Timeline";
import { buildCharacterMap } from "../../../lib/characterMeta";
import type { CharacterState } from "../../../types";

export default { title: "organisms/Timeline" };

const rawChars: Record<string, CharacterState> = {
  dan: { name: "Dan Ortega", location: "desk-1", mood: "Focused", currentAction: "coding", intent: "", memory: [], relationships: {}, updatedAt: "" },
  boris: { name: "Boris Chen", location: "desk-1", mood: "Cheerful", currentAction: "chatting", intent: "", memory: [], relationships: {}, updatedAt: "" },
  mia: { name: "Mia Park", location: "lounge", mood: "Heads-down", currentAction: "designing", intent: "", memory: [], relationships: {}, updatedAt: "" },
};

const characters = buildCharacterMap(rawChars);

const lines = [
  "[Narration] Dan is working at his desk when Boris enters.",
  "Boris => Dan: Hey, I'm Boris — just started today.",
  "[Narration] Dan looks up from his screen.",
  "Dan => Boris: Hey Boris, welcome! Let me show you around.",
  "[Narration] Mia waves from the lounge.",
  "Mia => Boris: Hi! I'm Mia, welcome aboard!",
];

export const Default = () => (
  <div className="bg-[#06060c] h-[520px] w-[440px] p-4">
    <Timeline
      lines={lines}
      characters={characters}
      onAvatarHover={() => {}}
      onSendMessage={(msg) => console.log("Send:", msg)}
      waitingForInput={true}
      userCharacter="dan"
    />
  </div>
);

export const WaitingForNPC = () => (
  <div className="bg-[#06060c] h-[520px] w-[440px] p-4">
    <Timeline
      lines={lines}
      characters={characters}
      onAvatarHover={() => {}}
      onSendMessage={() => {}}
      waitingForInput={false}
      userCharacter="dan"
    />
  </div>
);

export const Empty = () => (
  <div className="bg-[#06060c] h-[520px] w-[440px] p-4">
    <Timeline
      lines={[]}
      characters={characters}
      onAvatarHover={() => {}}
      onSendMessage={() => {}}
      waitingForInput={false}
      userCharacter={null}
    />
  </div>
);
