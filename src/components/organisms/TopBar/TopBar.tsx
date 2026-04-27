import { StatusDot } from "@/components/atoms/StatusDot";
import { BurgerMenu } from "@/components/molecules/BurgerMenu";
import type { Session } from "@/types";

export interface TopBarProps {
  session: Session | null;
  onlineCount: number;
  onMenuAction: (id: string) => void;
}

export function TopBar({
  session,
  onlineCount,
  onMenuAction,
}: TopBarProps): React.ReactElement {
  const isLive = session?.status === "active";

  return (
    <div className="flex items-center justify-between px-5 py-3 md:px-7">
      <div className="flex items-center gap-3">
        <div
          className="w-[9px] h-[9px] rounded-lg"
          style={{
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
          }}
        />
        <span className="text-[15px] font-semibold text-zinc-100">
          Office
        </span>
        <div className="flex items-center gap-2 ml-2">
          <StatusDot variant={isLive ? "live" : "paused"} />
          <span className="text-[11px] text-zinc-400">
            {isLive ? "Live session" : "Paused"}
          </span>
        </div>
        {onlineCount > 0 && (
          <span className="text-[11px] text-zinc-500">
            · {onlineCount} present
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {session && (
          <span className="text-[11px] font-mono text-zinc-500 bg-white/[0.04] px-2 py-1 rounded-md">
            {session.id}
          </span>
        )}
        <BurgerMenu onAction={onMenuAction} />
      </div>
    </div>
  );
}
