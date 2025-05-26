import { PromptTemplate } from "@langchain/core/prompts";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/qdrant-js";
import { RetrievalQAChain } from "langchain/chains";
import { Redis } from "@upstash/redis";

// Centralized configuration loading and validation
const loadConfig = () => {
  const QDRANT_URL = process.env.QDRANT_URL || "http://localhost:6333";
  const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not set in .env.local");
  }

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("Redis credentials are not set in .env.local");
  }

  return {
    QDRANT_URL,
    QDRANT_API_KEY,
    GOOGLE_API_KEY,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
  };
};

const config = loadConfig();

// Initialize clients and chain once
const redis = new Redis({
  url: config.UPSTASH_REDIS_REST_URL,
  token: config.UPSTASH_REDIS_REST_TOKEN,
});

const client = new QdrantClient({
  url: config.QDRANT_URL,
  apiKey: config.QDRANT_API_KEY,
});

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: config.GOOGLE_API_KEY,
  modelName: "embedding-001",
});

const vectorStore = new QdrantVectorStore(embeddings, {
  client,
  collectionName: "portfolio_knowledge",
});

const model = new ChatGoogleGenerativeAI({
  apiKey: config.GOOGLE_API_KEY,
  model: "gemini-2.0-flash-001",
  maxRetries: 3,
  maxConcurrency: 1,
  temperature: 0.3,
});

const promptTemplate = `You are Akshat Dubey, a Computer Science Engineering student and Software Developer. You ONLY respond to questions about Akshat Dubey's professional background, projects, experience, skills, and career.

## IMPORTANT RESTRICTIONS:
- **DO NOT** answer general knowledge questions (math, definitions, tutorials, etc.)
- **DO NOT** provide explanations about technologies unless directly related to Akshat's experience
- **DO NOT** act as a general-purpose assistant or tutor
- **ONLY** respond to questions about Akshat Dubey personally

## When to Respond vs. Redirect:
### ✅ ANSWER these questions:
- Questions about Akshat's projects, experience, skills, background
- Questions about technologies Akshat has used in his projects
- Career-related questions about Akshat
- Questions about Akshat's education, achievements, or work

### ❌ REDIRECT these questions:
- General technical tutorials or explanations
- Math problems or calculations  
- Definitions of technologies not related to Akshat's work
- General advice not specific to Akshat's experience
- Questions about other people or companies

## Redirect Response Template:
If the question is not about Akshat Dubey specifically, respond with:
"I'm designed to answer questions specifically about Akshat Dubey's professional background, projects, and experience. For general questions about [topic], I'd recommend consulting official documentation or other educational resources. 

Is there anything specific about Akshat's work, projects, or experience you'd like to know about?"

## Response Guidelines (for valid questions only):
- Write in first person as Akshat Dubey
- Keep responses professional and focused
- Use proper Markdown formatting for readability
- Provide specific details about Akshat's experience with technologies
- Stay on topic and avoid unnecessary personal details
- Structure responses with clear headings and bullet points when appropriate
- Keep responses concise but informative

## When discussing Akshat's skills:
- Reference the COMPLETE skills inventory from the knowledge base
- Organize by technology categories
- Include proficiency indicators (strong, expanding, exploring)
- Connect skills to real project applications
- Mention both current capabilities and learning trajectory
- Highlight advanced/specialized skills that differentiate Akshat
- Use specific technology names rather than generic terms

## Professional Focus Areas:
- **Current Role**: Software Development Intern at Xebia
- **Education**: CSE student with 9.69 CGPA, Dean's List recipient
- **Key Projects**: Daily 150, CineVault, XChat
- **Technical Skills**: Full-stack development, modern web technologies
- **Achievements**: Author of "Bounce Back: How to take back control of your life"

## Response Structure (for valid questions):
When answering questions about Akshat, organize information clearly:
- Use headings (##, ###) for main topics
- Use bullet points for lists and features
- Use code blocks for technical snippets when showing Akshat's work
- Use emphasis (*italics*, **bold**) appropriately
- Use line breaks to separate different topics

## Content Guidelines (for valid questions):
- **Technical Questions**: Focus on Akshat's experience with the technology, not general explanations
- **Project Inquiries**: Highlight Akshat's role, architecture decisions, and impact
- **Experience Questions**: Emphasize Akshat's achievements, responsibilities, and learnings
- **Skill Questions**: Detail Akshat's proficiency and project applications

## Handling Acknowledgment Messages:
If the user sends a message like "thanks", "great", "okay", or "understood" that is not a question about Akshat Dubey, respond with:
"Thank you! If you have any more questions about my professional background, projects, or experience, feel free to ask."


Only mention personal interests (Arsenal FC, Brooklyn Nine-Nine, movies) if directly asked about Akshat's hobbies or personal life. Otherwise, maintain professional focus.

## Context from Knowledge Base:
{context}

## Previous Conversation:
{chat_history}

## Current Question: {question}

First, determine if this question is about Akshat Dubey specifically. If not, use the redirect template. If yes, provide a well-structured, professional response about Akshat using proper Markdown formatting:`;

const PROMPT = PromptTemplate.fromTemplate(promptTemplate);

const chain = RetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever({
    k: 4,
    searchType: "similarity",
  }),
  {
    prompt: PROMPT,
    returnSourceDocuments: false,
  },
);

// Rate limiting configuration
const RATE_LIMIT = {
  requests: 10,
  window: 60,
  blockDuration: 300,
};

// Rate limiting functions (can be moved to a separate file)
async function getRateLimitKey(req: Request): Promise<string> {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";
  return `rate_limit:${ip}`;
}

async function checkRateLimit(key: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: number;
}> {
  const current = await redis.get(key);
  const now = Math.floor(Date.now() / 1000);

  if (!current) {
    await redis.setex(key, RATE_LIMIT.window, 1);
    return {
      allowed: true,
      remaining: RATE_LIMIT.requests - 1,
      resetTime: now + RATE_LIMIT.window,
    };
  }

  const count = parseInt(current as string);

  if (count >= RATE_LIMIT.requests) {
    const ttl = await redis.ttl(key);
    return {
      allowed: false,
      remaining: 0,
      resetTime: now + ttl,
    };
  }

  await redis.incr(key);
  const ttl = await redis.ttl(key);

  return {
    allowed: true,
    remaining: RATE_LIMIT.requests - count - 1,
    resetTime: now + ttl,
  };
}

async function blockAbuser(key: string): Promise<void> {
  const blockKey = `blocked:${key}`;
  await redis.setex(blockKey, RATE_LIMIT.blockDuration, "blocked");
}

async function isBlocked(key: string): Promise<boolean> {
  const blockKey = `blocked:${key}`;
  const blocked = await redis.get(blockKey);
  return blocked !== null;
}

// Enhanced conversation history formatting (can be moved to a separate file)
function formatChatHistory(history: any[]): string {
  if (!Array.isArray(history) || history.length === 0) {
    return "This is the start of our conversation.";
  }

  return history
    .slice(-6)
    .map((msg: any) => {
      const role = msg.role === "user" ? "Visitor" : "Akshat";
      return `${role}: ${msg.content}`;
    })
    .join("\n");
}

// Input validation and sanitization (can be moved to a separate file)
function validateAndSanitizeInput(message: string): {
  valid: boolean;
  sanitized: string;
  error?: string;
} {
  if (!message || typeof message !== "string") {
    return { valid: false, sanitized: "", error: "Message is required" };
  }

  const sanitized = message.trim();

  if (sanitized.length === 0) {
    return { valid: false, sanitized: "", error: "Message cannot be empty" };
  }

  if (sanitized.length > 1000) {
    return {
      valid: false,
      sanitized: "",
      error: "Message is too long (max 1000 characters)",
    };
  }

  const suspiciousPatterns = [
    /(.)\1{10,}/g,
    /http[s]?:\/\//g,
    /<script/gi,
    /javascript:/gi,
  ];

  const hasSuspiciousContent = suspiciousPatterns.some((pattern) =>
    pattern.test(sanitized),
  );

  if (hasSuspiciousContent) {
    return {
      valid: false,
      sanitized: "",
      error: "Message contains invalid content",
    };
  }

  return { valid: true, sanitized };
}

export async function POST(req: Request) {
  console.log("[API] POST /api/chat called");

  try {
    const rateLimitKey = await getRateLimitKey(req);

    if (await isBlocked(rateLimitKey)) {
      return new Response(
        JSON.stringify({
          response:
            "Your access has been temporarily blocked due to excessive requests. Please try again later.",
          error: true,
          blocked: true,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": RATE_LIMIT.blockDuration.toString(),
          },
        },
      );
    }

    const rateLimit = await checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      if (rateLimit.remaining === 0) {
        await blockAbuser(rateLimitKey);
      }

      return new Response(
        JSON.stringify({
          response:
            "You've sent too many messages. Please wait a moment before sending another message.",
          error: true,
          rateLimited: true,
          resetTime: rateLimit.resetTime,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": rateLimit.resetTime.toString(),
            "Retry-After": "60",
          },
        },
      );
    }

    const body = await req.json();
    const { message, history = [] } = body;

    const validation = validateAndSanitizeInput(message);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          response: `I apologize, but ${validation.error}. Please try again with a valid message.`,
          error: true,
          validationError: true,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const chatHistory = formatChatHistory(history);

    const response = await chain.call({
      query: validation.sanitized,
      chat_history: chatHistory,
    });

    console.log("[API] Chain response generated successfully");

    return new Response(
      JSON.stringify({
        response: response.text || response,
        remaining: rateLimit.remaining,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          "X-RateLimit-Reset": rateLimit.resetTime.toString(),
        },
      },
    );
  } catch (error) {
    console.error("[API] Error in POST /api/chat:", error);

    const isRateLimit =
      error instanceof Error &&
      (error.message.includes("429") ||
        error.message.includes("quota") ||
        error.message.includes("rate limit") ||
        error.message.includes("RATE_LIMIT_EXCEEDED"));

    const isQuotaExceeded =
      error instanceof Error &&
      (error.message.includes("quota") ||
        error.message.includes("QUOTA_EXCEEDED"));

    let errorMessage =
      "I'm experiencing technical difficulties. Please try again in a moment.";
    let statusCode = 500;

    if (isRateLimit) {
      errorMessage =
        "The service is currently experiencing high traffic. Please try again in about 30 seconds.";
      statusCode = 429;
    } else if (isQuotaExceeded) {
      errorMessage =
        "I've reached my daily conversation limit. Please check back tomorrow or contact me directly at contact@actuallyakshat.in";
      statusCode = 429;
    }

    return new Response(
      JSON.stringify({
        response: errorMessage,
        error: true,
        retryAfter: isRateLimit ? 30 : undefined,
      }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
