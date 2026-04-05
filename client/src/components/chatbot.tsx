import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ChatMessage } from "@shared/schema";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);

  const welcomeMsg: ChatMessage = {
    id: 0,
    role: 'assistant',
    content: "👋 Hi there!\nAsk me anything about Rizwan — skills, projects, experience, education, certifications, or contact. I answer only what you ask.",
    createdAt: null,
  };

const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const sendMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest("POST", api.chat.create.path, { message });
      return res.json();
    },
    onMutate: async (message: string) => {
      const optimisticUser: ChatMessage = {
        id: Date.now(),
        role: 'user',
        content: message,
        createdAt: null,
      };
      setLocalMessages(prev => [...prev, optimisticUser]);
      setInput('');
      return { optimisticId: optimisticUser.id };
    },
    onSuccess: (data) => {
      console.log('Chat API response:', data);
      const aiContent = data.message || 'No response received.';
      const aiMsg: ChatMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiContent,
        createdAt: null,
      };
      setLocalMessages(prev => [...prev, aiMsg]);
    },
    onError: (err, message, context) => {
      console.log('Chat API error:', err);
      toast({
        title: "Couldn't send message",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      if (context?.optimisticId) {
        setLocalMessages(prev => prev.filter(msg => msg.id !== context.optimisticId));
      }
    },
  });



  // Scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages.length, sendMutation.isPending]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setLocalMessages([welcomeMsg]);
      setInput("");
    }
  }, [isOpen]);

  // Focus input when opening, focus toggle when closing
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    } else {
      toggleButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Scroll outside to close
  useEffect(() => {
    function handleScroll() {
      setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sendMutation.isPending) return;
    sendMutation.mutate(trimmed);
  };



  const showWelcome = isOpen && localMessages.length === 0;
  const canSend = input.trim().length > 0 && !sendMutation.isPending;

  return (
    <div className="fixed bottom-6 right-[10px] sm:bottom-10 sm:right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-4"
          >
            <Card className="w-[260px] h-[300px] sm:w-[270px] sm:h-[320px] rounded-[16px] flex flex-col glass-card neon-border overflow-hidden shadow-2xl shadow-primary/10">
              {/* Header */}
              <div className="shrink-0 p-3 sm:p-4 bg-primary/10 border-b border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 sm:p-2 rounded-full bg-primary/20 shrink-0">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm truncate">Rizwan&apos;s AI</h3>
                    <p className="text-[10px] text-primary animate-pulse truncate">
                      Ask about skills, projects, experience…
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 min-h-0">
                <div className="p-3 sm:p-4 space-y-3">
                  {showWelcome && (
                      <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-[#1a2332] border border-primary/10 py-[12px] px-[16px] rounded-[12px] rounded-tl-sm max-w-[92%] shadow-sm">
                        <p className="text-sm font-semibold text-foreground mb-1">👋 Hi there!</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Ask me anything about Rizwan — skills, projects, experience, education, certifications, or contact. I answer only what you ask.
                        </p>
                      </div>
                    </motion.div>
                  )}
{localMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[92%] p-3 rounded-2xl text-sm shadow-sm ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-secondary/80 border border-primary/10 rounded-tl-sm text-foreground"
                        }`}
                      >
                        <p className="break-words whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {sendMutation.isPending && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start items-center gap-2"
                    >
                      <div className="bg-secondary/80 border border-primary/10 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.15s]" />
                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.3s]" />
                        <span className="text-xs text-muted-foreground ml-1">Thinking…</span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={endRef} className="h-px w-full" aria-hidden />
                </div>
              </ScrollArea>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="shrink-0 p-3 sm:p-4 border-t border-primary/20 bg-background/50"
              >
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Rizwan…"
                    className="bg-secondary/50 border-primary/20 focus-visible:ring-primary/50 text-sm placeholder:text-muted-foreground min-w-0"
                    disabled={sendMutation.isPending}
                    maxLength={500}
                    aria-label="Message"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!canSend}
                    className="shrink-0 h-10 w-10 bg-primary hover:bg-primary/90 text-primary-foreground"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {input.length > 400 && (
                  <p className="text-[10px] text-muted-foreground mt-1.5 text-right">
                    {input.length}/500
                  </p>
                )}
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <Button
        ref={toggleButtonRef}
        size="icon"
        className="w-14 h-14 rounded-full shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-transform neon-border bg-primary/90 hover:bg-primary text-primary-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat — Ask about Rizwan"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </Button>

    </div>
  );
}
