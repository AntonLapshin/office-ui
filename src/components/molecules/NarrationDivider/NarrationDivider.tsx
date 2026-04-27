export interface NarrationDividerProps {
  text: string;
}

export function NarrationDivider({
  text,
}: NarrationDividerProps): React.ReactElement {
  return (
    <div className="flex items-center gap-3 py-3 px-2">
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />
      <span className="text-[10.5px] uppercase tracking-wider text-zinc-500 font-mono shrink-0 text-center max-w-[80%]">
        {text}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />
    </div>
  );
}
