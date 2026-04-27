import { TopBar } from "./TopBar";
import type { Session } from "@/types";

export default { title: "organisms/TopBar" };

const session: Session = {
  id: "session_1",
  description: "Test",
  spaceName: "startup",
  characters: ["dan", "boris", "mia", "leo"],
  userCharacter: "dan",
  status: "active",
  currentRound: 3,
  currentTurnIndex: 0,
  turnPhase: "character-turn",
  createdAt: "",
  updatedAt: "",
};

export const Live = () => (
  <div className="bg-[#06060c]">
    <TopBar session={session} onlineCount={4} onMenuAction={() => {}} />
  </div>
);

export const Paused = () => (
  <div className="bg-[#06060c]">
    <TopBar
      session={{ ...session, status: "paused" }}
      onlineCount={4}
      onMenuAction={() => {}}
    />
  </div>
);

export const NoSession = () => (
  <div className="bg-[#06060c]">
    <TopBar session={null} onlineCount={0} onMenuAction={() => {}} />
  </div>
);
