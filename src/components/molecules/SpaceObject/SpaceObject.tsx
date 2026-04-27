import type { SpaceObject as SpaceObjectType } from "../../../types";

export interface SpaceObjectProps {
  object: SpaceObjectType;
}

export function SpaceObject({
  object,
}: SpaceObjectProps): React.ReactElement {
  const isRoom = object.type === "room";

  return (
    <div
      className="absolute rounded-xl"
      style={{
        left: object.x,
        top: object.y,
        width: object.w,
        height: object.h,
        background: isRoom
          ? "linear-gradient(135deg, rgba(168,85,247,0.06), rgba(99,102,241,0.04))"
          : "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.05))",
        border: isRoom
          ? "1px dashed rgba(168,85,247,0.15)"
          : "1px solid rgba(99,102,241,0.2)",
      }}
    >
      <span className="absolute top-2 left-2.5 text-[10px] uppercase tracking-wider text-violet-200/50 font-medium">
        {object.label}
      </span>
    </div>
  );
}
