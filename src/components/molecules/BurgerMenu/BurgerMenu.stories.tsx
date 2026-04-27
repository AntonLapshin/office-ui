import { BurgerMenu } from "./BurgerMenu";

export default { title: "molecules/BurgerMenu" };

export const Default = () => (
  <div className="bg-[#06060c] p-8 flex justify-end w-80">
    <BurgerMenu onAction={(id) => console.log("Action:", id)} />
  </div>
);
