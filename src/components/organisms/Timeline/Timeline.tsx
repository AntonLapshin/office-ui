import { useRef, useEffect, useMemo } from "react";
import { GlassPanel } from "@/components/atoms/GlassPanel";
import { PanelHeader } from "@/components/atoms/PanelHeader";
import { NarrationDivider } from "@/components/molecules/NarrationDivider";
import { MessageBubble } from "@/components/molecules/MessageBubble";
import { ChatComposer } from "@/components/molecules/ChatComposer";
import { parseTimeline } from "@/lib/timelineParser";
import type { CharacterUI } from "@/types";

export interface TimelineProps {
  lines: string[];
  characters: Record<string, CharacterUI>;
  onAvatarHover: (character: CharacterUI, el: HTMLElement | null) => void;
  onSendMessage: (message: string) => void;
  waitingForInput: boolean;
  userCharacter: string | null;
}

function findCharByName(
  characters: Record<string, CharacterUI>,
  name: string,
): CharacterUI | undefined {
  for (const char of Object.values(characters)) {
    if (char.name === name) return char;
  }
  const key = name.toLowerCase().replace(/\s+/g, "");
  for (const [k, char] of Object.entries(characters)) {
    if (k.toLowerCase() === key) return char;
  }
  return undefined;
}

export function Timeline({
  lines,
  characters,
  onAvatarHover,
  onSendMessage,
  waitingForInput,
  userCharacter,
}: TimelineProps): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);

  const entries = useMemo(() => parseTimeline(lines), [lines]);

  const firstSpeaker = useMemo(() => {
    const first = entries.find((e) => e.type === "message");
    return first?.from ?? null;
  }, [entries]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries.length]);

  return (
    <GlassPanel className="flex flex-col h-full">
      <PanelHeader
        title="Timeline"
        subtitle={`${entries.length} entries`}
      />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-2 space-y-1"
        style={{ minHeight: 0 }}
      >
        {entries.map((entry, i) => {
          if (entry.type === "narration") {
            return <NarrationDivider key={i} text={entry.text} />;
          }

          const speaker = findCharByName(characters, entry.from!);
          const recipient = findCharByName(characters, entry.to!);
          const side =
            firstSpeaker && entry.from === firstSpeaker ? "right" : "left";

          if (!speaker) {
            return (
              <NarrationDivider
                key={i}
                text={`${entry.from}: ${entry.text}`}
              />
            );
          }

          return (
            <MessageBubble
              key={i}
              speaker={speaker}
              recipient={recipient}
              text={entry.text}
              side={side}
              onAvatarHover={onAvatarHover}
            />
          );
        })}
      </div>
      <ChatComposer
        onSend={onSendMessage}
        disabled={!waitingForInput}
        placeholder={
          waitingForInput
            ? `Speak as ${userCharacter ?? "you"}…`
            : "Waiting for other characters…"
        }
      />
    </GlassPanel>
  );
}
