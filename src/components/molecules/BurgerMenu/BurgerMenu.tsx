import { useState, useEffect, useCallback, useRef } from "react";

export interface BurgerMenuProps {
  onAction: (id: string) => void;
}

const ITEMS = [
  { id: "new-session", label: "New session", icon: "⏱" },
  { id: "new-character", label: "New character", icon: "👤" },
  { id: "new-space", label: "New space", icon: "▦" },
];

export function BurgerMenu({
  onAction,
}: BurgerMenuProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, handleClickOutside]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-[5px] transition-all duration-200 cursor-pointer ${
          open
            ? "bg-violet-500/15 border border-violet-500/40"
            : "bg-white/10 border border-white/10 hover:bg-white/15"
        }`}
        style={open ? { boxShadow: "0 0 12px rgba(139,92,246,0.2)" } : {}}
      >
        <span
          className="block w-3.5 h-[1.5px] bg-zinc-300 rounded-full transition-transform duration-200"
          style={open ? { transform: "translateY(3.25px) rotate(45deg)" } : {}}
        />
        <span
          className="block w-3.5 h-[1.5px] bg-zinc-300 rounded-full transition-opacity duration-200"
          style={{ opacity: open ? 0 : 1 }}
        />
        <span
          className="block w-3.5 h-[1.5px] bg-zinc-300 rounded-full transition-transform duration-200"
          style={open ? { transform: "translateY(-3.25px) rotate(-45deg)" } : {}}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-white/[0.08] backdrop-blur-xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            animation: "fade-in 120ms ease-out",
          }}
        >
          {ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onAction(item.id);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-zinc-300 hover:bg-violet-500/10 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <span className="text-sm">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
