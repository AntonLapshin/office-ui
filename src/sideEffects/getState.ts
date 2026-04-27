import type { Session, CharacterState } from "@/types";

export type GetStateResult = {
  session: Session;
  characters: Record<string, CharacterState>;
};

export const getState = async (): Promise<GetStateResult> => {
  throw new Error("Not implemented");
};
