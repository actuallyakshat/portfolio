"use client";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatInterface from "./ChatInterface";
import { useRouter } from "next/navigation";

const initialMessages = [
  {
    message: "Tell me about Akshat's latest project.",
    title: "Latest Project",
    description: "What's the most recent thing he's built?",
  },
  {
    message: "What are Akshat's key skills?",
    title: "Key Skills",
    description: "What technologies and languages does he know?",
  },
  {
    message: "Can you tell me about his work experience?",
    title: "Work Experience",
    description: "Where has he worked before?",
  },
  {
    message: "How can I contact Akshat?",
    title: "Contact Info",
    description: "How can I get in touch?",
  },
];

interface Message {
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    const userMessage: Message = {
      content: message,
      role: "user",
      timestamp: Date.now(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: updatedMessages }),
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

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col p-4">
      <button
        className="absolute left-5 top-4 flex items-center gap-2 text-xs font-medium"
        onClick={handleGoBack}
      >
        <ArrowLeft className="size-4" />
        Go Back
      </button>
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg">
        {messages.length > 0 ? (
          <ChatInterface messages={messages} isLoading={isLoading} />
        ) : (
          <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-6 rounded-lg p-6 text-center md:justify-start">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
              Hello! I&apos;m Akshat&apos;s AI Assistant 👋
            </h1>
            <p className="max-w-md text-lg text-zinc-600">
              I&apos;m here to help you learn more about Akshat. Feel free to
              ask me anything about his projects, skills, experience, or
              anything else you&apos;re curious about!
            </p>
            <div className="mt-5 hidden w-full grid-cols-1 gap-2 md:grid md:grid-cols-2">
              {initialMessages.map((message, index) => (
                <button
                  key={index}
                  className="group relative flex h-32 flex-col items-start rounded-xl border border-rose-200 bg-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-rose-400 hover:shadow-xl focus:outline-none"
                  onClick={() => handleSendMessage(message.message)}
                >
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="size-4 text-rose-400" />
                    <h4 className="text-lg font-bold text-rose-700 transition-colors group-hover:text-rose-800">
                      {message.title}
                    </h4>
                  </div>
                  <p className="mt-2 flex-1 text-left text-sm text-zinc-600 transition-colors group-hover:text-zinc-800">
                    {message.description}
                  </p>
                  <span className="absolute bottom-4 right-4 text-rose-200 transition-colors group-hover:text-rose-400">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
