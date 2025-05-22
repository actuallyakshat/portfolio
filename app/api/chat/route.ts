import { PromptTemplate } from "@langchain/core/prompts";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/qdrant-js";
import { RetrievalQAChain } from "langchain/chains";

const QDRANT_URL = process.env.QDRANT_URL || "http://localhost:6333";
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set in .env.local");
}

// Create a client instance once, not per request
const client = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
});

// Create embeddings instance once
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: GOOGLE_API_KEY,
  modelName: "embedding-001",
});

// Create vector store instance once
const vectorStore = new QdrantVectorStore(embeddings, {
  client,
  collectionName: "portfolio_knowledge",
});

// Initialize model with proper rate limiting settings
const model = new ChatGoogleGenerativeAI({
  apiKey: GOOGLE_API_KEY,
  model: "gemini-2.0-flash-001",
  maxRetries: 3,
  maxConcurrency: 1,
  temperature: 0.7, // Add some personality
});

const promptTemplate = `You are Akshat Dubey, a passionate Computer Science Engineering student and Software Developer. You're speaking directly to someone who's visiting your portfolio website, so respond naturally and personally as yourself.

## Your Personality & Voice:
- Speak in first person ("I", "my", "me") - you ARE Akshat
- Be enthusiastic about technology and your projects
- Show genuine passion for problem-solving and building impactful applications
- Be confident but humble about your achievements
- Include specific technical details when relevant
- Mention your journey from different cities (Gwalior, Indore, Mumbai, now Gurugram)
- Reference your love for Arsenal FC, Brooklyn Nine-Nine when appropriate
- Show your competitive nature and drive to overperform

## Response Style:
- Conversational and engaging, like talking to a potential employer or collaborator
- Use well-formatted Markdown for readability
- Be specific rather than generic
- Share personal insights and experiences
- Express genuine excitement about your work and future goals
- Keep responses focused but comprehensive

## Key Things to Highlight About Yourself:
- Your impressive 9.69 CGPA and Dean's List achievements
- Current internship at Xebia working on XChat (delivered 200k+ lines of code in 4 weeks)
- Your flagship project Daily 150 with end-to-end encryption
- Full-stack expertise with modern technologies
- Your philosophy of always overperforming expectations
- Your book "Bounce Back: How to take back control of your life"

## Guard Rails:
- If asked about non-professional topics, redirect naturally: "That's interesting, but I'd love to tell you more about my work in [relevant area] instead!"
- Stay in character as Akshat - don't break the fourth wall
- If you don't have specific information, acknowledge it honestly but offer related insights
- Keep the focus on your professional journey, skills, and aspirations

## Context from Knowledge Base:
{context}

## Previous Conversation:
{chat_history}

## Current Question: {question}

Remember: You are Akshat Dubey speaking directly to your website visitor. Be authentic, passionate, and personable while showcasing your technical expertise and achievements.

Answer:`;

const PROMPT = PromptTemplate.fromTemplate(promptTemplate);

// Initialize chain only once
const chain = RetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever({
    k: 5, // Increased for better context
    searchType: "similarity",
  }),
  {
    prompt: PROMPT,
    returnSourceDocuments: false,
  },
);

// Enhanced rate limiting with exponential backoff
let lastRequestTime = 0;
let requestCount = 0;
const BASE_RATE_LIMIT = 2000; // 2 seconds base
const MAX_RATE_LIMIT = 30000; // 30 seconds max

function getRateLimitDelay(): number {
  const exponentialDelay = Math.min(
    BASE_RATE_LIMIT * Math.pow(2, Math.floor(requestCount / 5)),
    MAX_RATE_LIMIT,
  );
  return exponentialDelay;
}

// Enhanced conversation history formatting
function formatChatHistory(history: any[]): string {
  if (!Array.isArray(history) || history.length === 0) {
    return "This is the start of our conversation.";
  }

  return history
    .slice(-10) // Keep last 10 messages for context
    .map((msg: any) => {
      const role = msg.role === "user" ? "Visitor" : "Akshat";
      return `${role}: ${msg.content}`;
    })
    .join("\n");
}

// Question classification for better responses
function classifyQuestion(message: string): {
  type: string;
  keywords: string[];
} {
  const lowerMessage = message.toLowerCase();

  const patterns = {
    greeting: ["hello", "hi", "hey", "good morning", "good afternoon"],
    about: ["about you", "who are you", "tell me about", "introduce"],
    experience: ["experience", "work", "job", "internship", "xebia"],
    projects: ["project", "daily 150", "cinevault", "wordle", "zipit", "xchat"],
    skills: ["skill", "technology", "language", "framework", "database"],
    education: ["education", "university", "college", "bennett", "study"],
    personal: ["hobby", "interest", "arsenal", "brooklyn", "book"],
    contact: ["contact", "reach", "email", "linkedin", "hire"],
    technical: [
      "architecture",
      "scalable",
      "encryption",
      "api",
      "backend",
      "frontend",
    ],
  };

  for (const [type, keywords] of Object.entries(patterns)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return { type, keywords };
    }
  }

  return { type: "general", keywords: [] };
}

export async function POST(req: Request) {
  console.log("[API] POST /api/chat called");

  try {
    // Enhanced rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    const rateLimitDelay = getRateLimitDelay();

    if (timeSinceLastRequest < rateLimitDelay) {
      const waitTime = rateLimitDelay - timeSinceLastRequest;
      console.log(`[API] Rate limiting - waiting ${waitTime}ms`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    lastRequestTime = Date.now();
    requestCount++;

    const body = await req.json();
    console.log("[API] Request body:", body);
    const { message, history = [] } = body;

    // Classify the question for better context
    const questionClassification = classifyQuestion(message);
    console.log("[API] Question classification:", questionClassification);

    // Format chat history
    const chatHistory = formatChatHistory(history);

    // Enhanced query with context
    const enhancedQuery = `${message}

Question type: ${questionClassification.type}
Context keywords: ${questionClassification.keywords.join(", ")}`;

    const response = await chain.call({
      query: enhancedQuery,
      chat_history: chatHistory,
    });

    console.log("[API] Chain response:", response);

    // Reset request count on successful response
    if (requestCount > 0) {
      requestCount = Math.max(0, requestCount - 1);
    }

    return new Response(
      JSON.stringify({
        response: response.text || response,
        questionType: questionClassification.type,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("[API] Error in POST /api/chat:", error);
    requestCount++; // Increment on error to trigger backoff

    // Enhanced error handling
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
      "I apologize, but I'm having some technical difficulties right now. Please try again in a moment!";
    let statusCode = 500;

    if (isRateLimit) {
      errorMessage =
        "I'm getting a lot of questions right now! Please give me a moment and try again in about 30 seconds.";
      statusCode = 429;
    } else if (isQuotaExceeded) {
      errorMessage =
        "I've reached my daily conversation limit. Please check back tomorrow or reach out to me directly at contact@actuallyakshat.in!";
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
