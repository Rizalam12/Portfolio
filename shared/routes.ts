import { z } from "zod";
import { insertMessageSchema, type Message, type ChatMessage } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  messages: {
    create: {
      method: "POST" as const,
      path: "/api/messages" as const,
      input: insertMessageSchema.extend({ website: z.string().optional() }),
      responses: {
        201: z.object({
          message: z.custom<Message>(),
          saved: z.literal(true),
          emailSent: z.boolean(),
        }),
        400: errorSchemas.validation,
      },
    },
  },
  chat: {
    list: {
      method: "GET" as const,
      path: "/api/chat" as const,
      responses: {
        200: z.array(z.custom<ChatMessage>()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/chat" as const,
      input: z.object({ message: z.string().trim().min(1).max(500) }),
      responses: {
        200: z.object({
          message: z.custom<ChatMessage>(),
        }),
        400: errorSchemas.validation,
      },
    },
    reset: {
      method: "DELETE" as const,
      path: "/api/chat" as const,
      responses: {
        200: z.object({ ok: z.boolean() }),
      },
    },
  },
};

export type MessageInput = z.infer<typeof api.messages.create.input>;
export type MessageResponse = z.infer<typeof api.messages.create.responses[201]>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
export type ChatMessageResponse = z.infer<typeof api.chat.create.responses[200]>;
