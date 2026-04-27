import { StatusDot } from "./StatusDot";

export default { title: "atoms/StatusDot" };

export const Live = () => <StatusDot variant="live" />;
export const Paused = () => <StatusDot variant="paused" />;
export const Offline = () => <StatusDot variant="offline" />;
export const LargeSize = () => <StatusDot variant="live" size={14} />;
