import { Avatar } from "@/components/atoms/Avatar";
import type { CharacterUI } from "@/types";

export interface MessageBubbleProps {
  speaker: CharacterUI;
  recipient?: CharacterUI;
  text: string;
  side: "left" | "right";
  onAvatarHover?: (character: CharacterUI, el: HTMLElement | null) => void;
}

export function MessageBubble({
  speaker,
  recipient,
  text,
  side,
  onAvatarHover,
}: MessageBubbleProps): React.ReactElement {
  const isRight = side === "right";

  return (
    <div
      className={`flex items-end gap-2.5 px-2 py-1 ${isRight ? "flex-row-reverse" : "flex-row"}`}
      style={{ animation: "fade-in 150ms ease-out" }}
    >
      <Avatar
        initials={speaker.initials}
        gradient={speaker.gradient}
        size={32}
        onHoverChange={(el) => onAvatarHover?.(speaker, el)}
      />
      <div
        className={`max-w-[75%] px-3.5 py-2.5 ${
          isRight ? "rounded-2xl rounded-br-md" : "rounded-2xl rounded-bl-md"
        }`}
        style={{
          background: isRight
            ? `linear-gradient(135deg, ${speaker.gradient[0]}20, ${speaker.gradient[1]}15)`
            : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          border: isRight
            ? `1px solid ${speaker.gradient[0]}30`
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: isRight
            ? `0 2px 8px ${speaker.gradient[0]}15`
            : "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <span
            className="text-[11px] font-semibold"
            style={{ color: speaker.gradient[0] }}
          >
            {speaker.name}
          </span>
          {recipient && (
            <>
              <span className="text-[10px] text-zinc-600">→</span>
              <span className="text-[11px] text-zinc-400">
                {recipient.name}
              </span>
            </>
          )}
        </div>
        <p className="text-[13px] text-zinc-100 leading-relaxed m-0">
          {text}
        </p>
      </div>
    </div>
  );
}
