import { DashboardLayout } from "./DashboardLayout";
import { GlassPanel } from "@/components/atoms/GlassPanel";

export default { title: "templates/DashboardLayout" };

export const Default = () => (
  <DashboardLayout
    topBar={<div className="px-7 py-3 text-zinc-400 text-sm">Top Bar</div>}
    leftPanel={
      <GlassPanel className="h-full flex items-center justify-center">
        <span className="text-zinc-500">Left Panel</span>
      </GlassPanel>
    }
    rightPanel={
      <GlassPanel className="h-full flex items-center justify-center">
        <span className="text-zinc-500">Right Panel</span>
      </GlassPanel>
    }
  />
);
