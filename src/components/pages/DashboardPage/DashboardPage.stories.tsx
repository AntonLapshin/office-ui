import { DashboardPage } from "./DashboardPage";
import { ContextSideEffectsProvider } from "@/contexts/ContextSideEffects";
import { getStateMock } from "@/sideEffects/getState.mock";
import { getTimelineMock } from "@/sideEffects/getTimeline.mock";
import { getLayoutMock } from "@/sideEffects/getLayout.mock";
import { sendMessageMock } from "@/sideEffects/sendMessage.mock";
import { subscribeToEventsMock } from "@/sideEffects/subscribeToEvents.mock";

export default { title: "pages/DashboardPage" };

const mockSideEffects = {
  getState: getStateMock,
  getTimeline: getTimelineMock,
  getLayout: getLayoutMock,
  sendMessage: sendMessageMock,
  subscribeToEvents: subscribeToEventsMock,
};

export const Default = () => (
  <ContextSideEffectsProvider value={mockSideEffects}>
    <DashboardPage />
  </ContextSideEffectsProvider>
);

export const Loading = () => (
  <ContextSideEffectsProvider
    value={{
      getState: () => new Promise(() => {}),
      getTimeline: () => new Promise(() => {}),
      getLayout: () => new Promise(() => {}),
      sendMessage: sendMessageMock,
      subscribeToEvents: () => () => {},
    }}
  >
    <DashboardPage />
  </ContextSideEffectsProvider>
);
