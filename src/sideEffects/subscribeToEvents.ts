import type { SSEEventHandlers } from "@/types";

export const subscribeToEvents = (_handlers: SSEEventHandlers): (() => void) => {
  throw new Error("Not implemented");
};
