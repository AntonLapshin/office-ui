// BurgerMenu.jsx — top-right dropdown
function BurgerMenu({ onAction }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const items = [
    { id: "new-session",   label: "New session",   hint: "\u2318N", icon: SessionIcon },
    { id: "new-character", label: "New character", hint: "\u2318C", icon: CharacterIcon },
    { id: "new-space",     label: "New space",     hint: "\u2318S", icon: SpaceIcon }
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
        className={`group relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 ${
          open
            ? "bg-violet-500/15 border-violet-400/40 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]"
            : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/15"
        }`}
      >
        <div className="flex flex-col gap-[3px]">
          <span className={`block h-[1.5px] w-4 rounded-full transition-all ${open ? "bg-violet-300 translate-y-[4.5px] rotate-45" : "bg-zinc-300"}`}></span>
          <span className={`block h-[1.5px] w-4 rounded-full bg-zinc-300 transition-opacity ${open ? "opacity-0" : "opacity-100"}`}></span>
          <span className={`block h-[1.5px] w-4 rounded-full transition-all ${open ? "bg-violet-300 -translate-y-[4.5px] -rotate-45" : "bg-zinc-300"}`}></span>
        </div>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-60 rounded-2xl border border-white/10 bg-[#0d0d18]/95 backdrop-blur-xl p-1.5 shadow-2xl z-40 origin-top-right animate-[fadeIn_120ms_ease-out]"
          style={{
            boxShadow:
              "0 20px 50px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.10), inset 0 1px 0 rgba(255,255,255,0.04)"
          }}
        >
          <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">Create</div>
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => { onAction(it.id); setOpen(false); }}
              className="group w-full flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-gradient-to-r hover:from-violet-500/15 hover:to-indigo-500/10 transition-colors text-left"
            >
              <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-violet-300 group-hover:text-violet-200 group-hover:border-violet-400/30 transition-colors">
                <it.icon />
              </span>
              <span className="flex-1 text-[13px] text-zinc-100">{it.label}</span>
              <span className="text-[10.5px] text-zinc-600 font-mono">{it.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SessionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function CharacterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}
function SpaceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  );
}

window.BurgerMenu = BurgerMenu;
