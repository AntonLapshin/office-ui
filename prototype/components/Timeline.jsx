// Timeline.jsx — parses timeline.log and renders narration + chat bubbles
function parseTimeline(log) {
  const lines = log.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const entries = [];
  for (const line of lines) {
    if (/^narration\s*:/i.test(line)) {
      entries.push({ type: "narration", text: line.replace(/^narration\s*:\s*/i, "") });
      continue;
    }
    const m = line.match(/^([A-Za-z][\w\- ]*)\s*=>\s*([A-Za-z][\w\- ]*)\s*:\s*(.*)$/);
    if (m) {
      entries.push({
        type: "message",
        from: m[1].trim().toLowerCase(),
        to: m[2].trim().toLowerCase(),
        text: m[3]
      });
    }
  }
  return entries;
}

function NarrationLine({ text }) {
  return (
    <div className="flex items-center gap-3 my-3">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="text-[10.5px] uppercase tracking-[0.22em] text-zinc-500 font-mono px-2">
        {text}
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

function MessageBubble({ entry, characters, side, onAvatarHover }) {
  const speaker = characters[entry.from];
  const recipient = characters[entry.to];
  if (!speaker) return null;

  const [c1, c2] = speaker.gradient || ["#6366f1", "#a855f7"];
  const isLeft = side === "left";

  return (
    <div className={`flex items-end gap-2.5 my-2 ${isLeft ? "" : "flex-row-reverse"}`}>
      <Avatar
        character={speaker}
        size={32}
        onHoverChange={(el) => onAvatarHover(el ? speaker : null, el)}
      />
      <div className={`max-w-[78%] ${isLeft ? "items-start" : "items-end"} flex flex-col`}>
        <div className={`flex items-center gap-1.5 mb-0.5 ${isLeft ? "justify-start" : "justify-end"} w-full`}>
          <span className="text-[11px] font-medium text-zinc-300">{speaker.name.split(" ")[0]}</span>
          <span className="text-[10px] text-zinc-600">→</span>
          <span className="text-[11px] text-zinc-500">{recipient ? recipient.name.split(" ")[0] : entry.to}</span>
        </div>
        <div
          className="relative px-3.5 py-2 rounded-2xl text-[13px] text-zinc-100 leading-relaxed"
          style={{
            background: isLeft
              ? "linear-gradient(135deg, rgba(30,30,46,0.95), rgba(20,20,32,0.95))"
              : `linear-gradient(135deg, ${c1}, ${c2})`,
            border: isLeft ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.12)",
            boxShadow: isLeft
              ? "0 6px 18px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03)"
              : `0 12px 28px -12px ${c2}88, inset 0 1px 0 rgba(255,255,255,0.18)`,
            borderTopLeftRadius: isLeft ? 6 : undefined,
            borderTopRightRadius: !isLeft ? 6 : undefined
          }}
        >
          {entry.text}
        </div>
      </div>
    </div>
  );
}

function Timeline({ log, characters, onAvatarHover }) {
  const entries = useMemo(() => parseTimeline(log), [log]);

  // Determine the "primary" speaker (first message sender) — they'll be on the right
  const primary = useMemo(() => {
    const first = entries.find((e) => e.type === "message");
    return first ? first.from : null;
  }, [entries]);

  return (
    <div className="flex flex-col px-5 py-4">
      {entries.map((e, i) => {
        if (e.type === "narration") return <NarrationLine key={i} text={e.text} />;
        const side = e.from === primary ? "right" : "left";
        return (
          <MessageBubble
            key={i}
            entry={e}
            characters={characters}
            side={side}
            onAvatarHover={onAvatarHover}
          />
        );
      })}
    </div>
  );
}

window.Timeline = Timeline;
