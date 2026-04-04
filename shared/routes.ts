import { z } from 'zod';
import { insertMessageSchema, messages, insertChatMessageSchema, chatMessages } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  messages: {
    create: {
      method: 'POST' as const,
      path: '/api/messages' as const,
      input: insertMessageSchema.extend({ website: z.string().optional() }),
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  chat: {
    list: {
      method: 'GET' as const,
      path: '/api/chat' as const,
      responses: {
        200: z.array(z.custom<typeof chatMessages.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/chat' as const,
      input: z.object({ message: z.string() }),
      responses: {
        200: z.object({ message: z.string() }),
        400: errorSchemas.validation,
      },
    },
    reset: {
      method: 'DELETE' as const,
      path: '/api/chat' as const,
      responses: {
        200: z.object({ ok: z.boolean() }),
      },
    },
  }
};

// ============================================
// TYPE HELPERS
// ============================================
export type MessageInput = z.infer<typeof api.messages.create.input>;
export type MessageResponse = z.infer<typeof api.messages.create.responses[201]>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;

export type ChatMessageResponse = z.infer<typeof api.chat.create.responses[200]>;
