import type { CharacterState, CharacterPosition, SpaceLayout } from "../types";

const AVATAR_SPREAD = 44;

export function resolveCharacterPositions(
  characters: Record<string, CharacterState>,
  layout: SpaceLayout,
): CharacterPosition[] {
  const objectMap = new Map(layout.objects.map((o) => [o.id, o]));
  const locationGroups = new Map<string, string[]>();

  for (const [id, char] of Object.entries(characters)) {
    const loc = char.location;
    if (!locationGroups.has(loc)) locationGroups.set(loc, []);
    locationGroups.get(loc)!.push(id);
  }

  const positions: CharacterPosition[] = [];

  for (const [id, char] of Object.entries(characters)) {
    const obj = objectMap.get(char.location);
    const group = locationGroups.get(char.location) ?? [id];
    const indexInGroup = group.indexOf(id);
    const groupSize = group.length;

    let cx: number;
    let cy: number;

    if (obj) {
      cx = obj.x + obj.w / 2;
      cy = obj.y + obj.h / 2;
    } else {
      cx = layout.bounds.width / 2;
      cy = layout.bounds.height / 2;
    }

    if (groupSize > 1) {
      const offset =
        (indexInGroup - (groupSize - 1) / 2) * AVATAR_SPREAD;
      cx += offset;
    }

    positions.push({ id, x: cx, y: cy });
  }

  return positions;
}
