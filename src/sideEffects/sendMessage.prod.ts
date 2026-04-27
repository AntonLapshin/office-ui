import type { SendMessageResult } from "./sendMessage";

export const sendMessageProd = async (message: string): Promise<SendMessageResult> => {
  const res = await fetch("/api/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error(`POST /api/message failed: ${res.status}`);
  return res.json();
};
