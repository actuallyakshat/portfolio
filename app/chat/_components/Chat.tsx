"use client";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatInterface from "./ChatInterface";
import { useRouter } from "next/navigation";

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
          <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-lg p-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
              Hello! I&apos;m Akshat&apos;s AI Assistant 👋
            </h1>
            <p className="max-w-md text-lg text-zinc-600">
              I&apos;m here to help you learn more about Akshat. Feel free to
              ask me anything about his projects, skills, experience, or
              anything else you&apos;re curious about!
            </p>
            <div className="grid w-full max-w-md grid-cols-1 gap-4 md:grid-cols-2">
              <button
                className="rounded-lg border border-rose-300 p-4 text-left transition-colors duration-200 hover:bg-rose-50"
                onClick={() =>
                  handleSendMessage("Tell me about Akshat's latest project.")
                }
              >
                <p className="font-semibold text-rose-700">Latest Project</p>
                <p className="mt-1 text-sm text-zinc-600">
                  What&apos;s the most recent thing he&apos;s built?
                </p>
              </button>
              <button
                className="rounded-lg border border-rose-300 p-4 text-left transition-colors duration-200 hover:bg-rose-50"
                onClick={() =>
                  handleSendMessage("What are Akshat's key skills?")
                }
              >
                <p className="font-semibold text-rose-700">Key Skills</p>
                <p className="mt-1 text-sm text-zinc-600">
                  What technologies and languages does he know?
                </p>
              </button>
              <button
                className="rounded-lg border border-rose-300 p-4 text-left transition-colors duration-200 hover:bg-rose-50"
                onClick={() =>
                  handleSendMessage(
                    "Can you tell me about his work experience?",
                  )
                }
              >
                <p className="font-semibold text-rose-700">Work Experience</p>
                <p className="mt-1 text-sm text-zinc-600">
                  Where has he worked before?
                </p>
              </button>
              <button
                className="rounded-lg border border-rose-300 p-4 text-left transition-colors duration-200 hover:bg-rose-50"
                onClick={() => handleSendMessage("How can I contact Akshat?")}
              >
                <p className="font-semibold text-rose-700">Contact Info</p>
                <p className="mt-1 text-sm text-zinc-600">
                  How can I get in touch?
                </p>
              </button>
            </div>
          </div>
        )}

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
