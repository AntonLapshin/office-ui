export interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({
  children,
  className = "",
}: GlassPanelProps): React.ReactElement {
  return (
    <div
      className={`relative rounded-2xl border border-white/[0.06] backdrop-blur-xl overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)",
        }}
      />
      {children}
    </div>
  );
}
