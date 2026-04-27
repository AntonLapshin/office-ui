import { useEffect, useState } from "react";

export interface ToastProps {
  message: string | null;
  duration?: number;
  onDismiss: () => void;
}

export function Toast({
  message,
  duration = 2200,
  onDismiss,
}: ToastProps): React.ReactElement | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 150);
      }, duration);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-5 py-2.5 rounded-xl border border-white/[0.08] backdrop-blur-xl text-[13px] text-zinc-200 transition-all duration-150"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? 0 : 8}px)`,
      }}
    >
      {message}
    </div>
  );
}
