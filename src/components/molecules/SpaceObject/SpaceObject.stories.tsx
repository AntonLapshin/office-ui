import { SpaceObject } from "./SpaceObject";

export default { title: "molecules/SpaceObject" };

export const Desk = () => (
  <div className="bg-[#06060c] p-8 relative h-40 w-80">
    <SpaceObject
      object={{ id: "desk-1", type: "desk", label: "Desk 1", x: 20, y: 20, w: 120, h: 80 }}
    />
  </div>
);

export const Room = () => (
  <div className="bg-[#06060c] p-8 relative h-40 w-80">
    <SpaceObject
      object={{ id: "lounge", type: "room", label: "Lounge", x: 20, y: 20, w: 200, h: 100 }}
    />
  </div>
);
