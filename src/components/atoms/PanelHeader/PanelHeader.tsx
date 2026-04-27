export interface PanelHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export function PanelHeader({
  title,
  subtitle,
  right,
}: PanelHeaderProps): React.ReactElement {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
      <div className="flex items-center gap-2.5">
        <h2 className="text-[13px] font-semibold text-zinc-200">{title}</h2>
        {subtitle && (
          <span className="text-[11px] text-zinc-500">{subtitle}</span>
        )}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}
