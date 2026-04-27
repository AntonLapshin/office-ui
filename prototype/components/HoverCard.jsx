// HoverCard.jsx — floating card shown when an avatar is hovered
function HoverCard({ character, anchorRect }) {
  if (!character || !anchorRect) return null;

  // Position above the anchor by default; flip below if too high
  const cardW = 240;
  const cardH = 150;
  const margin = 12;
  let left = anchorRect.left + anchorRect.width / 2 - cardW / 2;
  let top = anchorRect.top - cardH - margin;
  let placeBelow = false;

  if (top < 12) {
    top = anchorRect.bottom + margin;
    placeBelow = true;
  }
  left = Math.max(12, Math.min(left, window.innerWidth - cardW - 12));

  const [c1, c2] = character.gradient || ["#6366f1", "#a855f7"];

  const moodTone = (() => {
    const m = (character.mood || "").toLowerCase();
    if (m.includes("focus") || m.includes("heads")) return { dot: "#a78bfa", label: "text-violet-300" };
    if (m.includes("cheer") || m.includes("happy")) return { dot: "#34d399", label: "text-emerald-300" };
    if (m.includes("curio")) return { dot: "#22d3ee", label: "text-cyan-300" };
    if (m.includes("busy") || m.includes("stress")) return { dot: "#fb7185", label: "text-rose-300" };
    return { dot: "#a1a1aa", label: "text-zinc-300" };
  })();

  return (
    <div
      className="fixed z-50 pointer-events-none animate-[fadeIn_120ms_ease-out]"
      style={{ left, top, width: cardW }}
    >
      <div
        className="relative rounded-2xl border border-white/10 bg-[#0d0d18]/95 backdrop-blur-xl p-3.5 shadow-2xl"
        style={{
          boxShadow: `0 24px 60px -20px ${c2}55, 0 8px 24px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`
        }}
      >
        {/* gradient edge glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(120% 80% at 0% 0%, ${c1}33, transparent 60%)`
          }}
        />
        <div className="relative flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
            style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
          >
            {character.initials}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-white truncate">{character.name}</div>
            <div className="text-[11px] text-zinc-400">Age {character.age}</div>
          </div>
        </div>

        <div className="relative mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[11px]">
          <div className="text-zinc-500 uppercase tracking-wider">Mood</div>
          <div className={`flex items-center gap-1.5 ${moodTone.label}`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: moodTone.dot, boxShadow: `0 0 8px ${moodTone.dot}` }}></span>
            {character.mood}
          </div>
          <div className="text-zinc-500 uppercase tracking-wider">Action</div>
          <div className="text-zinc-200 leading-snug">{character.action}</div>
        </div>

        {/* arrow */}
        <div
          className="absolute w-3 h-3 rotate-45 bg-[#0d0d18]/95 border-white/10"
          style={{
            left: Math.max(16, Math.min(cardW - 28, anchorRect.left + anchorRect.width / 2 - left - 6)),
            [placeBelow ? "top" : "bottom"]: -6,
            borderRightWidth: placeBelow ? 0 : 1,
            borderBottomWidth: placeBelow ? 0 : 1,
            borderLeftWidth: placeBelow ? 1 : 0,
            borderTopWidth: placeBelow ? 1 : 0,
            borderStyle: "solid"
          }}
        />
      </div>
    </div>
  );
}

window.HoverCard = HoverCard;
