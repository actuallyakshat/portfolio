"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  // Optional: Add a prop to disable input while AI is responding
  disabled?: boolean;
}

export default function ChatInput({
  onSendMessage,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Focus the input when the component mounts or when it becomes enabled
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [inputRef, disabled]);

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  // Don't render until we're on the client
  if (!isClient) {
    return (
      <div className="p-4">
        <div className="flex items-center rounded-xl bg-gray-50/80 py-2 pl-4 pr-2">
          <input
            type="text"
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none"
            placeholder="Ask anything"
          />
          <button
            type="button"
            className="ml-2 flex size-8 items-center justify-center rounded-lg bg-rose-500 text-white"
            disabled
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div
        className={`flex items-center rounded-xl bg-gray-50/80 py-2 pl-4 pr-2 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500 ${
          disabled ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        <input
          type="text"
          ref={inputRef}
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
          disabled={disabled}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="ml-2 flex size-8 items-center justify-center rounded-lg bg-rose-500 text-white transition-colors hover:bg-rose-600 disabled:opacity-50"
          disabled={!message.trim() || disabled}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
}
