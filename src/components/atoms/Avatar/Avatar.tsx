import { useRef, useCallback } from "react";

export interface AvatarProps {
  initials: string;
  gradient: [string, string];
  size?: number;
  ringed?: boolean;
  image?: string;
  onHoverChange?: (el: HTMLElement | null) => void;
}

export function Avatar({
  initials,
  gradient,
  size = 40,
  ringed = false,
  image,
  onHoverChange,
}: AvatarProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    onHoverChange?.(ref.current);
  }, [onHoverChange]);

  const handleLeave = useCallback(() => {
    onHoverChange?.(null);
  }, [onHoverChange]);

  const fontSize = Math.max(10, size * 0.38);

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative shrink-0 cursor-pointer transition-transform duration-200 hover:scale-110"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        ...(ringed
          ? {
              border: "2px solid #18181b",
              outline: `2px solid ${gradient[0]}`,
              boxShadow: `0 0 12px ${gradient[0]}40`,
            }
          : {
              boxShadow: `0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
            }),
      }}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: image
            ? `url(${image}) center/cover`
            : `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        }}
      >
        {!image && (
          <span
            className="text-white font-bold select-none"
            style={{
              fontSize,
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}
