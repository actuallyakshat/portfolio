"use client";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
}

// Define the markdown styles directly in the component
const markdownStyles = {
  markdown: `
    font-size: 1rem;
    color: #222;
    line-height: 1.7;
  `,
  heading1: `
    font-size: 2rem;
    font-weight: bold;
    margin: 1.2em 0 0.6em;
  `,
  heading2: `
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1em 0 0.5em;
  `,
  heading3: `
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.8em 0 0.4em;
  `,
  paragraph: `
    margin: 0.5em 0;
  `,
  list: `
    margin: 0.5em 0 0.5em 1.5em;
  `,
  listItem: `
    margin: 0.2em 0;
  `,
  code: `
    background: #f5f5f5;
    color: #d6336c;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.95em;
  `,
  pre: `
    background: #f5f5f5;
    padding: 1em;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1em 0;
  `,
  blockquote: `
    border-left: 4px solid #d6336c;
    background: #f9f9f9;
    color: #555;
    padding: 0.5em 1em;
    margin: 1em 0;
    font-style: italic;
  `,
  link: `
    color: #2563eb;
    text-decoration: underline;
  `,
};

export default function ChatInterface({
  messages,
  isLoading,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="no-scrollbar flex-1 overflow-y-auto p-4">
      <div className="no-scrollbar flex flex-col space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-start space-x-2 rounded-2xl p-3 ${
                message.role === "user"
                  ? "border bg-gray-100"
                  : "border bg-gray-100 text-gray-800"
              }`}
            >
              <div className="max-w-full">
                <div className="text-sm">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className={markdownStyles.paragraph}>{children}</p>
                      ),
                      h1: ({ children }) => (
                        <h1 className={markdownStyles.heading1}>{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className={markdownStyles.heading2}>{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className={markdownStyles.heading3}>{children}</h3>
                      ),
                      ul: ({ children }) => (
                        <ul className={markdownStyles.list}>{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className={markdownStyles.list}>{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className={markdownStyles.listItem}>{children}</li>
                      ),
                      pre: ({ children }) => (
                        <pre className={markdownStyles.pre}>{children}</pre>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className={markdownStyles.blockquote}>
                          {children}
                        </blockquote>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          className={markdownStyles.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
                <p className="mt-1 text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div
              className={`flex items-start space-x-2 rounded-2xl border bg-gray-100 p-3 text-gray-800`}
            >
              {/* Removed the bot icon div */}
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
