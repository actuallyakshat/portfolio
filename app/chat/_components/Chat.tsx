"use client";
import React, { useState } from "react";
import ChatInterface from "./ChatInterface";
import ChatInput from "./ChatInput";

interface Message {
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello, how can I help you today?",
      role: "assistant",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      content: message,
      role: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const assistantContent =
        data.response?.text || data.response || "Sorry, something went wrong.";
      const assistantMessage: Message = {
        content: assistantContent,
        role: "assistant",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          content: "Failed to get a response from the assistant.",
          role: "assistant",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col p-4">
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
        <ChatInterface messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
