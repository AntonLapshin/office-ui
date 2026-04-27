import { useRef, useState, useEffect } from "react";
import { GlassPanel } from "@/components/atoms/GlassPanel";
import { PanelHeader } from "@/components/atoms/PanelHeader";
import { Avatar } from "@/components/atoms/Avatar";
import { SpaceObject } from "@/components/molecules/SpaceObject";
import type { SpaceLayout, CharacterUI, CharacterPosition } from "@/types";

export interface SpaceViewProps {
  layout: SpaceLayout;
  characters: Record<string, CharacterUI>;
  characterPositions: CharacterPosition[];
  onAvatarHover: (character: CharacterUI, el: HTMLElement | null) => void;
}

const MARGIN = 48;
const MAX_SCALE = 1.6;

export function SpaceView({
  layout,
  characters,
  characterPositions,
  onAvatarHover,
}: SpaceViewProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const cw = entry.contentRect.width - MARGIN * 2;
      const ch = entry.contentRect.height - MARGIN * 2;
      const sx = cw / layout.bounds.width;
      const sy = ch / layout.bounds.height;
      setScale(Math.min(sx, sy, MAX_SCALE));
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [layout.bounds.width, layout.bounds.height]);

  return (
    <GlassPanel className="flex flex-col h-full">
      <PanelHeader
        title="Space"
        subtitle={layout.name}
        right={
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full bg-violet-400"
            />
            <span className="text-[11px] text-zinc-400">
              {characterPositions.length} here
            </span>
          </span>
        }
      />
      <div ref={containerRef} className="flex-1 relative overflow-hidden flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: layout.bounds.width,
            height: layout.bounds.height,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(168,85,247,0.02))",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {layout.objects.map((obj) => (
            <SpaceObject key={obj.id} object={obj} />
          ))}

          {characterPositions.map((pos) => {
            const char = characters[pos.id];
            if (!char) return null;
            return (
              <div
                key={pos.id}
                className="absolute"
                style={{
                  left: pos.x - 18,
                  top: pos.y - 18,
                }}
              >
                <Avatar
                  initials={char.initials}
                  gradient={char.gradient}
                  size={36}
                  ringed
                  onHoverChange={(el) => onAvatarHover(char, el)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </GlassPanel>
  );
}
