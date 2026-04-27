export interface DashboardLayoutProps {
  topBar: React.ReactNode;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  overlay?: React.ReactNode;
}

export function DashboardLayout({
  topBar,
  leftPanel,
  rightPanel,
  overlay,
}: DashboardLayoutProps): React.ReactElement {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(99,102,241,0.08), transparent),
          radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139,92,246,0.06), transparent),
          #06060c
        `,
      }}
    >
      {topBar}
      <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-4 px-5 pb-5 md:px-7 md:pb-7" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div style={{ minHeight: 520 }}>{leftPanel}</div>
        <div style={{ minHeight: 520 }}>{rightPanel}</div>
      </div>
      {overlay}
    </div>
  );
}
