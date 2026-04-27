import type { SendMessageResult } from "./sendMessage";

export const sendMessageMock = async (_message: string): Promise<SendMessageResult> => {
  await new Promise((r) => setTimeout(r, 200));
  return { ok: true };
};
