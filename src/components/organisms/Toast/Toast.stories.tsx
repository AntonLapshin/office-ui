import { Toast } from "./Toast";

export default { title: "organisms/Toast" };

export const Default = () => (
  <div className="bg-[#06060c] h-40 relative">
    <Toast message="Session started!" onDismiss={() => {}} />
  </div>
);

export const Hidden = () => (
  <div className="bg-[#06060c] h-40 relative">
    <Toast message={null} onDismiss={() => {}} />
  </div>
);
