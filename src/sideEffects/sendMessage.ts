export type SendMessageResult = { ok: boolean };

export const sendMessage = async (_message: string): Promise<SendMessageResult> => {
  throw new Error("Not implemented");
};
