import { createContext } from "react";
import type { SSEEventHandlers, Session, CharacterState, SpaceLayout } from "../types";
import type { GetStateResult } from "../sideEffects/getState";
import type { GetTimelineResult } from "../sideEffects/getTimeline";
import type { SendMessageResult } from "../sideEffects/sendMessage";
import { getStateProd } from "../sideEffects/getState.prod";
import { getTimelineProd } from "../sideEffects/getTimeline.prod";
import { getLayoutProd } from "../sideEffects/getLayout.prod";
import { sendMessageProd } from "../sideEffects/sendMessage.prod";
import { subscribeToEventsProd } from "../sideEffects/subscribeToEvents.prod";

export interface SideEffects {
  getState: () => Promise<GetStateResult>;
  getTimeline: () => Promise<GetTimelineResult>;
  getLayout: () => Promise<SpaceLayout>;
  sendMessage: (message: string) => Promise<SendMessageResult>;
  subscribeToEvents: (handlers: SSEEventHandlers) => () => void;
}

const defaultSideEffects: SideEffects = {
  getState: getStateProd,
  getTimeline: getTimelineProd,
  getLayout: getLayoutProd,
  sendMessage: sendMessageProd,
  subscribeToEvents: subscribeToEventsProd,
};

export const ContextSideEffects = createContext<SideEffects>(defaultSideEffects);

export function ContextSideEffectsProvider({
  value,
  children,
}: {
  value: Partial<SideEffects>;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ContextSideEffects.Provider value={{ ...defaultSideEffects, ...value }}>
      {children}
    </ContextSideEffects.Provider>
  );
}
