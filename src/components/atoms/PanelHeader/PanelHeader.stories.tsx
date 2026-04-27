import { PanelHeader } from "./PanelHeader";

export default { title: "atoms/PanelHeader" };

export const Default = () => (
  <div className="bg-[#06060c] p-4">
    <PanelHeader title="Space" subtitle="4 present" />
  </div>
);

export const WithRight = () => (
  <div className="bg-[#06060c] p-4">
    <PanelHeader
      title="Timeline"
      right={<span className="text-xs text-zinc-500">Live</span>}
    />
  </div>
);
