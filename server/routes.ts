import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendContactEmail } from "./email";
import { generateAIResponse } from "./portfolio-chat";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);

      if (input.website?.trim()) {
        return res.status(400).json({
          message: "Invalid request.",
          field: "form",
        });
      }

      const { website: _website, ...data } = input;
      const message = storage.createMessage(data);

      const emailSent = await sendContactEmail(data);

      return res.status(201).json({
        message,
        saved: true,
        emailSent,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.issues[0].message,
          field: err.issues[0].path.join("."),
        });
      }

      console.error("Contact form error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.chat.list.path, async (_req, res) => {
    const messages = storage.getChatMessages();
    return res.json(messages);
  });

  app.post(api.chat.create.path, async (req, res) => {
    try {
      const { message } = api.chat.create.input.parse(req.body);

      storage.createChatMessage({
        role: "user",
        content: message,
      });

      const aiResponse = generateAIResponse(message);

      const assistantMessage = storage.createChatMessage({
        role: "assistant",
        content: aiResponse,
      });

      return res.json({ message: assistantMessage });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.issues[0].message,
        });
      }

      console.error("Chat error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(api.chat.reset.path, async (_req, res) => {
    storage.clearChatMessages();
    return res.json({ ok: true });
  });

  return httpServer;
}
