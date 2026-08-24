export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

let contactMessages: ContactMessage[] = [];
let chatMessages: ChatMessage[] = [];
let nextContactId = 1;
let nextChatId = 1;

export const storage = {
  createMessage(data: Omit<ContactMessage, "id" | "createdAt">): ContactMessage {
    const message: ContactMessage = {
      id: nextContactId++,
      ...data,
      createdAt: new Date(),
    };
    contactMessages.push(message);
    return message;
  },

  getMessages(): ContactMessage[] {
    return [...contactMessages];
  },

  clearMessages(): void {
    contactMessages = [];
  },

  createChatMessage(data: Omit<ChatMessage, "id" | "createdAt">): ChatMessage {
    const message: ChatMessage = {
      id: nextChatId++,
      ...data,
      createdAt: new Date(),
    };
    chatMessages.push(message);
    return message;
  },

  getChatMessages(): ChatMessage[] {
    return [...chatMessages];
  },

  clearChatMessages(): void {
    chatMessages = [];
  },
};
