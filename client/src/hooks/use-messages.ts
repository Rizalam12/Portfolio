import { useMutation } from "@tanstack/react-query";
import { api, type MessageInput } from "@shared/routes";

export function useCreateMessage() {
  return useMutation({
    mutationFn: async (data: MessageInput) => {
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let payload: unknown;
      try {
        payload = await res.json();
      } catch {
        payload = null;
      }

      if (!res.ok) {
        const message =
          payload &&
          typeof payload === "object" &&
          "message" in payload &&
          typeof payload.message === "string"
            ? payload.message
            : "Failed to send message.";
        throw new Error(message);
      }

      return api.messages.create.responses[201].parse(payload);
    },
  });
}
