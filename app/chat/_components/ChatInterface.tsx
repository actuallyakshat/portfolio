"use client";
import { useEffect, useRef } from "react";
import { User, Bot, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatInterface({
  messages,
  isLoading,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <button
        className="absolute left-5 top-4 flex items-center gap-2 text-sm font-medium"
        onClick={handleGoBack}
      >
        <ArrowLeft className="size-4" />
        Go Back
      </button>
      <div className="flex flex-col space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex max-w-[80%] items-start space-x-2 rounded-2xl p-3 ${
                message.role === "user"
                  ? "bg-rose-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100">
                  <Bot size={18} className="text-rose-500" />
                </div>
              )}
              <div>
                <p className="text-sm">{message.content}</p>
                <p className="mt-1 text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>
              {message.role === "user" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100">
                  <User size={18} className="text-rose-500" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] items-center space-x-2 rounded-2xl bg-gray-100 p-4 text-gray-800">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100">
                <Bot size={18} className="text-rose-500" />
              </div>
              <div className="flex space-x-1">
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: "600ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
