"use client";
import { ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatInterface from "./ChatInterface";

// Initial suggestions shown when chat is empty
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

// Expanded list for suggestions after the first message
const fullSuggestionList = [
  ...initialMessages, // Include the initial ones
  {
    message: "What kind of side projects does Akshat work on?",
    title: "Side Projects",
    description: "What kind of side projects does Akshat work on?",
  },
  {
    message: "What are his favorite programming languages?",
    title: "Favorite Languages",
    description: "Which languages does he enjoy the most?",
  },
  {
    message: "What are Akshat's career goals?",
    title: "Career Aspirations",
    description: "Where does he see himself heading?",
  },
  {
    message: "Tell me about a challenging project Akshat faced.",
    title: "Challenges",
    description: "Share a tough problem he solved.",
  },
  {
    message: "Tell me about Akshat's upbringing.",
    title: "Upbringing",
    description: "Where did Akshat grow up?",
  },
  {
    message: "What are Akshat's interests outside of tech?",
    title: "Hobbies",
    description: "What does he do in his free time?",
  },
  {
    message: "Ask about Akshat's education background.",
    title: "Education",
    description: "Where did he study?",
  },
  {
    message: "What tools does Akshat use regularly?",
    title: "Developer Tools",
    description: "Which software helps him work?",
  },
  {
    message: "Describe Akshat's approach to problem-solving.",
    title: "Problem Solving",
    description: "How does he tackle difficult issues?",
  },
  {
    message: "What movies or shows inspire Akshat?",
    title: "Inspiration",
    description: "What movies or shows have influenced him?",
  },
  {
    message: "What kind of team environments does Akshat prefer?",
    title: "Team Preferences",
    description: "What kind of workplace suits him?",
  },
];
interface Message {
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

// Function to select N random items from a list, excluding currently shown ones
const selectRandomSuggestions = (
  list: typeof fullSuggestionList,
  num: number,
  excludeCurrent: string[] = [],
) => {
  // Filter out currently shown suggestions
  const availableList = list.filter(
    (item) => !excludeCurrent.includes(item.message),
  );

  // If we don't have enough unused suggestions, reset and use the full list
  const listToUse = availableList.length >= num ? availableList : list;

  const shuffled = [...listToUse].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<
    typeof initialMessages
  >([]);
  const [currentlyShownSuggestions, setCurrentlyShownSuggestions] = useState<
    string[]
  >([]); // Track currently shown suggestions

  const router = useRouter();

  // Effect to generate new suggestions after each assistant response
  useEffect(() => {
    const messageCount = messages.length;

    // Only generate suggestions after we have messages and the last message is from assistant
    if (messageCount > 0 && messages[messageCount - 1]?.role !== "assistant") {
      const randomSuggestions = selectRandomSuggestions(
        fullSuggestionList,
        3,
        currentlyShownSuggestions, // Exclude currently shown suggestions
      );
      setSuggestedPrompts(randomSuggestions);

      // Update the currently shown suggestions
      setCurrentlyShownSuggestions(randomSuggestions.map((s) => s.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]); // Removed currentlyShownSuggestions from dependencies

  // Initialize suggestions after first user message
  useEffect(() => {
    const messageCount = messages.length;

    // Show initial suggestions after first user message (when count is 1)
    if (messageCount === 1) {
      const randomSuggestions = selectRandomSuggestions(fullSuggestionList, 3);
      setSuggestedPrompts(randomSuggestions);
      setCurrentlyShownSuggestions(randomSuggestions.map((s) => s.message));
    }
  }, [messages.length]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

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
      console.error("Chat API error:", error);
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
      {/* Back Button */}
      <button
        className="absolute left-5 top-4 flex items-center gap-2 text-xs font-medium text-gray-600 transition-colors hover:text-gray-800"
        onClick={handleGoBack}
      >
        <ArrowLeft className="size-4" />
        Go Back
      </button>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg">
        {messages.length > 0 ? (
          // Chat Interface when messages exist
          <ChatInterface messages={messages} isLoading={isLoading} />
        ) : (
          // Initial Welcome Message and Suggestions when chat is empty
          <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-6 rounded-lg p-6 text-center md:justify-start">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
              Hello! I&apos;m Akshat&apos;s AI Assistant 👋
            </h1>
            <p className="max-w-md text-lg text-zinc-600">
              I&apos;m here to help you learn more about Akshat. Feel free to
              ask me anything about his projects, skills, experience, or
              anything else you&apos;re curious about!
            </p>
            {/* Initial Suggestions (only when messages.length === 0) */}
            <div className="mt-5 hidden w-full grid-cols-1 gap-2 md:grid md:grid-cols-2">
              {initialMessages.map((message, index) => (
                <button
                  key={index}
                  className="group relative flex h-32 flex-col items-start rounded-xl border border-rose-200 bg-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-rose-400 hover:shadow-xl focus:outline-none"
                  onClick={() => handleSendMessage(message.message)}
                  disabled={isLoading}
                >
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="size-4 text-rose-500" />
                    <h4 className="text-lg font-bold text-rose-700 transition-colors group-hover:text-rose-800">
                      {message.title}
                    </h4>
                  </div>
                  <p className="mt-2 flex-1 text-left text-sm text-zinc-600 transition-colors group-hover:text-zinc-800">
                    {message.description}
                  </p>
                  <span className="absolute bottom-4 right-4 text-rose-200 transition-colors group-hover:text-rose-700">
                    <ArrowRight className="size-5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions After First Message */}
        {messages.length > 0 && suggestedPrompts.length > 0 && (
          <div className="mb-4 hidden grid-cols-3 gap-2 md:grid">
            {suggestedPrompts.map((suggestion, index) => (
              <button
                key={`${suggestion.message}-${Date.now()}-${index}`} // Unique key to force re-render
                className="group relative flex flex-col items-start rounded-xl border border-rose-200 bg-white p-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-rose-400 hover:shadow-md focus:outline-none"
                onClick={() => handleSendMessage(suggestion.message)}
                disabled={isLoading}
              >
                <div className="flex items-center gap-1">
                  <MessageSquare className="size-3 text-rose-400" />
                  <h5 className="text-sm font-semibold text-rose-700 transition-colors group-hover:text-rose-800">
                    {suggestion.title}
                  </h5>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-zinc-600 transition-colors group-hover:text-zinc-800">
                  {suggestion.description}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
