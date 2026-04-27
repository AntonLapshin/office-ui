// App.jsx — composes the dashboard
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-[fadeIn_150ms_ease-out]">
      <div className="px-4 py-2.5 rounded-xl bg-[#0d0d18]/95 border border-violet-400/25 backdrop-blur-xl shadow-2xl flex items-center gap-2.5"
        style={{ boxShadow: "0 16px 40px -10px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]"></span>
        <span className="text-[12.5px] text-zinc-100">{toast}</span>
      </div>
    </div>
  );
}

function PanelHeader({ title, subtitle, right }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/5">
      <div className="flex items-center gap-2.5">
        <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">{title}</div>
        {subtitle && <div className="text-[12.5px] text-zinc-200 font-medium">{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

function App() {
  const [hovered, setHovered] = useState(null); // { character, rect }
  const [toast, setToast] = useState(null);

  const onAvatarHover = (character, el) => {
    if (!character || !el) {
      setHovered(null);
      return;
    }
    const rect = el.getBoundingClientRect();
    setHovered({ character, rect });
  };

  const handleMenu = (id) => {
    const map = {
      "new-session":   "Started a new session",
      "new-character": "Open: create a new character",
      "new-space":     "Open: create a new space"
    };
    setToast(map[id] || id);
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(() => setToast(null), 2200);
  };

  const space = window.__SPACE__;
  const characters = window.__CHARACTERS__;
  const log = window.__TIMELINE__;

  // Online count = characters appearing in space
  const onlineCount = space.characters.length;

  return (
    <div className="min-h-screen w-full text-zinc-100 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 60% at 15% 0%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(70% 50% at 100% 100%, rgba(168,85,247,0.14), transparent 65%), #06060c"
      }}>

      {/* Top bar */}
      <div className="relative px-5 md:px-7 pt-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 10px 24px -8px rgba(139,92,246,0.6), inset 0 1px 0 rgba(255,255,255,0.25)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11.5L12 4l9 7.5" />
              <path d="M5 10v10h14V10" />
            </svg>
          </div>
          <div>
            <div className="text-[15px] font-semibold tracking-tight">Virtual Office</div>
            <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
              Live session · {onlineCount} present
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl bg-white/[0.03] border border-white/10 text-[12px] text-zinc-400">
            <kbd className="font-mono text-[10.5px] text-zinc-500">session</kbd>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-200 font-mono">hq-2026-04-26</span>
          </div>
          <BurgerMenu onAction={handleMenu} />
        </div>
      </div>

      {/* Main split */}
      <div className="relative px-5 md:px-7 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-5 md:h-[calc(100vh-104px)] md:min-h-[640px]">

          {/* LEFT — Space */}
          <Panel className="panel-min">
            <PanelHeader
              title="Space"
              subtitle={space.name}
              right={
                <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <span className="font-mono">{space.bounds.width}×{space.bounds.height}</span>
                  <span className="text-zinc-700">·</span>
                  <span>{space.objects.length} objects</span>
                </div>
              }
            />
            <div className="flex-1 min-h-0">
              <SpaceView space={space} characters={characters} onAvatarHover={onAvatarHover} />
            </div>
          </Panel>

          {/* RIGHT — Timeline */}
          <Panel className="panel-min">
            <PanelHeader
              title="Timeline"
              subtitle="Live transcript"
              right={
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-emerald-300">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping"></span>
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </span>
                    streaming
                  </span>
                </div>
              }
            />
            <div className="flex-1 min-h-0 overflow-y-auto custom-scroll">
              <Timeline log={log} characters={characters} onAvatarHover={onAvatarHover} />
            </div>
            <ChatComposer />
          </Panel>
        </div>
      </div>

      <HoverCard
        character={hovered?.character}
        anchorRect={hovered?.rect}
      />
      <Toast toast={toast} />
    </div>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-xl flex flex-col overflow-hidden ${className}`}
      style={{
        boxShadow:
          "0 30px 80px -30px rgba(0,0,0,0.7), 0 8px 30px -12px rgba(99,102,241,0.18), inset 0 1px 0 rgba(255,255,255,0.04)"
      }}
    >
      {/* top edge gradient */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), rgba(99,102,241,0.4), transparent)"
        }}
      />
      {children}
    </div>
  );
}

function ChatComposer() {
  return (
    <div className="px-4 py-3 border-t border-white/5">
      <div className="flex items-center gap-2 rounded-2xl bg-white/[0.03] border border-white/10 px-3 py-2 focus-within:border-violet-400/40 focus-within:bg-white/[0.05] transition-colors">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <input
          type="text"
          placeholder="Type a message…"
          className="flex-1 bg-transparent outline-none text-[13px] text-zinc-100 placeholder:text-zinc-600"
        />
        <button
          className="px-3.5 h-8 rounded-xl text-[12.5px] font-medium text-white flex items-center gap-1.5 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            boxShadow: "0 8px 20px -8px rgba(139,92,246,0.7), inset 0 1px 0 rgba(255,255,255,0.25)"
          }}
        >
          Send
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

window.App = App;
