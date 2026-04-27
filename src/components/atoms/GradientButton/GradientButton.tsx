export interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function GradientButton({
  children,
  onClick,
  disabled = false,
  type = "button",
}: GradientButtonProps): React.ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded-xl text-[13px] font-medium text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 cursor-pointer"
      style={{
        background: disabled
          ? "rgba(255,255,255,0.06)"
          : "linear-gradient(135deg, #6366f1, #a855f7)",
        boxShadow: disabled
          ? "none"
          : "0 2px 12px rgba(99,102,241,0.3)",
      }}
    >
      {children}
    </button>
  );
}
