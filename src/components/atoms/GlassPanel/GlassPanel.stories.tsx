import { GlassPanel } from "./GlassPanel";

export default { title: "atoms/GlassPanel" };

export const Default = () => (
  <div className="p-8 bg-[#06060c]">
    <GlassPanel className="p-6">
      <p className="text-zinc-300">Glass panel content</p>
    </GlassPanel>
  </div>
);

export const Nested = () => (
  <div className="p-8 bg-[#06060c]">
    <GlassPanel className="p-6 w-80">
      <h3 className="text-zinc-100 font-semibold mb-2">Title</h3>
      <p className="text-zinc-400 text-sm">Description text inside a glass panel.</p>
    </GlassPanel>
  </div>
);
