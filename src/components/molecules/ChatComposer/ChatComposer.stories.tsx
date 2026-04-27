import { ChatComposer } from "./ChatComposer";

export default { title: "molecules/ChatComposer" };

export const Default = () => (
  <div className="bg-[#06060c] w-96">
    <ChatComposer onSend={(msg) => console.log("Send:", msg)} />
  </div>
);

export const Disabled = () => (
  <div className="bg-[#06060c] w-96">
    <ChatComposer onSend={() => {}} disabled />
  </div>
);
