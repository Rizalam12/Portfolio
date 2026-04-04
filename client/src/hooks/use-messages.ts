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
      
      if (!res.ok) {
        let errorMessage = "Failed to send message.";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If JSON parsing fails, stick with default
        }
        throw new Error(errorMessage);
      }
      
      return res.json();
    },
    onSuccess: () => {},
    onError: () => {},
  });
}

