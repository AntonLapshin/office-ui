import { NarrationDivider } from "./NarrationDivider";

export default { title: "molecules/NarrationDivider" };

export const Default = () => (
  <div className="bg-[#06060c] p-6 w-96">
    <NarrationDivider text="Dan walks over to the coffee machine." />
  </div>
);

export const Short = () => (
  <div className="bg-[#06060c] p-6 w-96">
    <NarrationDivider text="Scene begins." />
  </div>
);
