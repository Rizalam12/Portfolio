import { db, pool } from "./db";
import { messages, chatMessages, type CreateMessageRequest, type MessageResponse, type InsertChatMessage, type ChatMessage } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  createMessage(message: CreateMessageRequest): Promise<MessageResponse>;
  getChatMessages(): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  clearChatMessages(): Promise<void>;
}

// In-memory storage implementation for development without database
class MemoryStorage implements IStorage {
  private messages: MessageResponse[] = [];
  private chatMessages: ChatMessage[] = [];
  private messageId = 1;
  private chatMessageId = 1;

  async createMessage(insertMessage: CreateMessageRequest): Promise<MessageResponse> {
    const message: MessageResponse = {
      id: this.messageId++,
      ...insertMessage,
      createdAt: new Date(),
    };
    this.messages.push(message);
    return message;
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return [...this.chatMessages].reverse();
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const chatMessage: ChatMessage = {
      id: this.chatMessageId++,
      role: message.role,
      content: message.content,
      createdAt: new Date(),
    };
    this.chatMessages.push(chatMessage);
    return chatMessage;
  }

  async clearChatMessages(): Promise<void> {
    this.chatMessages = [];
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: CreateMessageRequest): Promise<MessageResponse> {
    const [message] = await db!.insert(messages).values(insertMessage).returning();
    return message;
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return await db!.select().from(chatMessages).orderBy(desc(chatMessages.createdAt));
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [inserted] = await db!.insert(chatMessages).values(message).returning();
    return inserted;
  }

  async clearChatMessages(): Promise<void> {
    await db!.delete(chatMessages);
  }
}

// Use database storage if DATABASE_URL is set, otherwise use in-memory storage
export const storage: IStorage = pool ? new DatabaseStorage() : new MemoryStorage();
