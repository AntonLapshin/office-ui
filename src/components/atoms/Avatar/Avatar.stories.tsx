import { Avatar } from "./Avatar";

export default { title: "atoms/Avatar" };

export const Default = () => (
  <Avatar initials="DO" gradient={["#6366f1", "#a855f7"]} />
);

export const Large = () => (
  <Avatar initials="JL" gradient={["#8b5cf6", "#ec4899"]} size={64} />
);

export const Ringed = () => (
  <Avatar initials="MP" gradient={["#06b6d4", "#6366f1"]} ringed />
);

export const Small = () => (
  <Avatar initials="LA" gradient={["#10b981", "#6366f1"]} size={24} />
);
