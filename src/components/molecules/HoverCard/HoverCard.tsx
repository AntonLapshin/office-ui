import { useMemo } from "react";
import { Avatar } from "../../atoms/Avatar";
import { getMoodTone } from "../../../lib/moodColor";
import type { CharacterUI } from "../../../types";

export interface HoverCardProps {
  character: CharacterUI;
  anchorRect: DOMRect;
}

const CARD_W = 240;
const CARD_H = 150;

export function HoverCard({
  character,
  anchorRect,
}: HoverCardProps): React.ReactElement {
  const { style, arrowTop } = useMemo(() => {
    const gap = 10;
    let top = anchorRect.top - CARD_H - gap;
    let showAbove = true;

    if (top < 12) {
      top = anchorRect.bottom + gap;
      showAbove = false;
    }

    let left = anchorRect.left + anchorRect.width / 2 - CARD_W / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - CARD_W - 8));

    return {
      style: { top, left, width: CARD_W },
      arrowTop: showAbove,
    };
  }, [anchorRect]);

  const moodTone = getMoodTone(character.mood);

  return (
    <div
      className="fixed z-50 rounded-2xl border border-white/10 backdrop-blur-xl p-4"
      style={{
        ...style,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${character.gradient[0]}15`,
        animation: "fade-in 120ms ease-out",
      }}
    >
      <div
        className="absolute w-3 h-3 rotate-45 border-white/10"
        style={{
          left: "50%",
          marginLeft: -6,
          background: "rgba(255,255,255,0.04)",
          ...(arrowTop
            ? { bottom: -6, borderBottom: "1px solid", borderRight: "1px solid", borderColor: "rgba(255,255,255,0.1)" }
            : { top: -6, borderTop: "1px solid", borderLeft: "1px solid", borderColor: "rgba(255,255,255,0.1)" }),
        }}
      />
      <div className="flex items-center gap-3 mb-3">
        <Avatar
          initials={character.initials}
          gradient={character.gradient}
          size={36}
        />
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-zinc-100 truncate">
            {character.name}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              backgroundColor: moodTone.dot,
              boxShadow: `0 0 6px ${moodTone.glow}`,
            }}
          />
          <span className="text-[11px] text-zinc-300">{character.mood}</span>
        </div>
        <div className="text-[11px] text-zinc-500 pl-4">
          {character.currentAction}
        </div>
      </div>
    </div>
  );
}
