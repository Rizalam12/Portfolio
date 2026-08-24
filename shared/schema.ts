import { z } from "zod";

export const insertMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export const insertChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = InsertMessage & { id: number; createdAt: Date | null };

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = InsertChatMessage & { id: number; createdAt: Date | null };
