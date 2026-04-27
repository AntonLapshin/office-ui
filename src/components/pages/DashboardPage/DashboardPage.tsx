import { useState, useCallback } from "react";
import { useAppState } from "../../../hooks/useAppState";
import { DashboardLayout } from "../../../components/templates/DashboardLayout";
import { TopBar } from "../../../components/organisms/TopBar";
import { SpaceView } from "../../../components/organisms/SpaceView";
import { Timeline } from "../../../components/organisms/Timeline";
import { Toast } from "../../../components/organisms/Toast";
import { HoverCard } from "../../../components/molecules/HoverCard";
import type { CharacterUI } from "../../../types";

export function DashboardPage(): React.ReactElement {
  const {
    session,
    characters,
    characterPositions,
    layout,
    timelineLines,
    waitingForInput,
    sendMessage,
  } = useAppState();

  const [hovered, setHovered] = useState<{
    character: CharacterUI;
    rect: DOMRect;
  } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleAvatarHover = useCallback(
    (character: CharacterUI, el: HTMLElement | null) => {
      if (el) {
        setHovered({ character, rect: el.getBoundingClientRect() });
      } else {
        setHovered(null);
      }
    },
    [],
  );

  const handleMenuAction = useCallback((id: string) => {
    const messages: Record<string, string> = {
      "new-session": "New session — coming soon",
      "new-character": "New character — coming soon",
      "new-space": "New space — coming soon",
    };
    setToast(messages[id] ?? `Action: ${id}`);
  }, []);

  const onlineCount = session?.characters.length ?? 0;

  return (
    <DashboardLayout
      topBar={
        <TopBar
          session={session}
          onlineCount={onlineCount}
          onMenuAction={handleMenuAction}
        />
      }
      leftPanel={
        layout ? (
          <SpaceView
            layout={layout}
            characters={characters}
            characterPositions={characterPositions}
            onAvatarHover={handleAvatarHover}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-zinc-600 text-sm">
            Loading space…
          </div>
        )
      }
      rightPanel={
        <Timeline
          lines={timelineLines}
          characters={characters}
          onAvatarHover={handleAvatarHover}
          onSendMessage={sendMessage}
          waitingForInput={waitingForInput}
          userCharacter={session?.userCharacter ?? null}
        />
      }
      overlay={
        <>
          {hovered && (
            <HoverCard
              character={hovered.character}
              anchorRect={hovered.rect}
            />
          )}
          <Toast
            message={toast}
            onDismiss={() => setToast(null)}
          />
        </>
      }
    />
  );
}
