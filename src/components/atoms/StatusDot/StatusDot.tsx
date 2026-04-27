export type StatusDotVariant = "live" | "paused" | "offline";

export interface StatusDotProps {
  variant?: StatusDotVariant;
  size?: number;
}

const variantClasses: Record<StatusDotVariant, string> = {
  live: "bg-emerald-400",
  paused: "bg-amber-400",
  offline: "bg-zinc-500",
};

export function StatusDot({
  variant = "live",
  size = 8,
}: StatusDotProps): React.ReactElement {
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {variant === "live" && (
        <span
          className="absolute inset-0 rounded-full bg-emerald-400 opacity-75"
          style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
        />
      )}
      <span
        className={`relative inline-block rounded-full ${variantClasses[variant]}`}
        style={{ width: size, height: size }}
      />
    </span>
  );
}
