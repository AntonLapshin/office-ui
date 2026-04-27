import { useState, useCallback } from "react";
import { GradientButton } from "../../atoms/GradientButton";

export interface ChatComposerProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatComposer({
  onSend,
  disabled = false,
  placeholder = "Type a message…",
}: ChatComposerProps): React.ReactElement {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = value.trim();
      if (!trimmed || disabled) return;
      onSend(trimmed);
      setValue("");
    },
    [value, disabled, onSend],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2.5 px-4 py-3 border-t border-white/[0.06]"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2 text-[13px] text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-indigo-500/40 disabled:opacity-40"
      />
      <GradientButton type="submit" disabled={disabled || !value.trim()}>
        Send
      </GradientButton>
    </form>
  );
}
