"use client";
import { useState } from "react";
import { ArrowUp, Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center rounded-xl bg-gray-50/80 py-2 pl-4 pr-2 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500">
        <input
          type="text"
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none"
          placeholder="Ask anything"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          onClick={handleSubmit}
          className="ml-2 flex size-8 items-center justify-center rounded-lg bg-rose-500 text-white transition-colors hover:bg-rose-600 disabled:opacity-50"
          disabled={!message.trim()}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
}
