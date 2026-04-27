// SpaceView.jsx — top-down 2D floor plan from space.json
const { useMemo, useState: useSpaceState, useRef: useSpaceRef, useEffect: useSpaceEffect } = React;

function SpaceView({ space, characters, onAvatarHover }) {
  const containerRef = useSpaceRef(null);
  const [scale, setScale] = useSpaceState(1);

  const { width: bw, height: bh } = space.bounds;

  // Fit-to-container scaling for the floor plan
  useSpaceEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const cw = el.clientWidth - 48;
      const ch = el.clientHeight - 48;
      const s = Math.min(cw / bw, ch / bh, 1.6);
      setScale(s > 0 ? s : 1);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [bw, bh]);

  const objectStyle = (type) => {
    if (type === "desk") {
      return {
        background: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(168,85,247,0.10))",
        border: "1px solid rgba(165,180,252,0.25)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 16px -8px rgba(99,102,241,0.4)"
      };
    }
    return {
      background: "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(99,102,241,0.06))",
      border: "1px solid rgba(167,139,250,0.22)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 6px 24px -10px rgba(139,92,246,0.35)"
    };
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Floor plan */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: bw,
          height: bh,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center"
        }}
      >
        {/* Outer bounds (the space rect) */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 0%, rgba(99,102,241,0.10), transparent 55%), radial-gradient(100% 80% at 100% 100%, rgba(168,85,247,0.08), transparent 60%), #0a0a14",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "inset 0 0 0 1px rgba(99,102,241,0.06), inset 0 0 80px rgba(99,102,241,0.06)"
          }}
        >
          {/* dotted grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none" aria-hidden="true">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="rgba(165,180,252,0.18)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Space label */}
        <div className="absolute left-4 top-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]"></span>
          {space.name}
        </div>

        {/* Objects */}
        {space.objects.map((o) => (
          <div
            key={o.id}
            className="absolute rounded-xl"
            style={{
              left: o.x,
              top: o.y,
              width: o.w,
              height: o.h,
              ...objectStyle(o.type)
            }}
          >
            <div className="absolute left-2.5 top-2 text-[10px] uppercase tracking-[0.14em] text-violet-200/70">
              {o.label}
            </div>
          </div>
        ))}

        {/* Avatars */}
        {space.characters.map((slot) => {
          const c = characters[slot.id];
          if (!c) return null;
          const size = 36;
          return (
            <div
              key={slot.id}
              className="absolute"
              style={{ left: slot.x - size / 2, top: slot.y - size / 2 }}
            >
              <Avatar
                character={c}
                size={size}
                ringed
                onHoverChange={(el) => onAvatarHover(el ? c : null, el)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.SpaceView = SpaceView;
