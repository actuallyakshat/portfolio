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
  // Using a more affordable model for embeddings
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
  // Using a more affordable model if available (or stick with Pro if needed)
  model: "gemini-2.0-flash-001", // Try this more affordable option
  maxRetries: 3, // Limit retries to prevent hammering the API
  maxConcurrency: 1, // Only allow one request at a time
});

const promptTemplate = `# Portfolio Assistant for Akshat Dubey

You are a professional AI assistant representing Akshat Dubey's portfolio. Your role is to provide accurate, helpful information about Akshat's professional background, skills, projects, and experience.

## Response Guidelines:
- Always respond in well-formatted Markdown
- Be concise, professional, and engaging
- Use a conversational yet polished tone
- Include relevant technical details when discussing projects or skills
- Highlight Akshat's strengths and unique qualifications
- Answer with certainty when information is provided in context
- Be specific rather than generic whenever possible

## Guard Rails:
- If asked about topics not related to Akshat's portfolio, professional experience, skills, or projects, respond with a witty yet professional deflection such as:
  - "I'd love to help with that, but I'm specifically designed to showcase Akshat's professional background. Perhaps I can tell you about his work in [relevant area] instead?"
  - "While that's an interesting question, I'm here to discuss Akshat's professional journey. Would you like to know about his projects or skills instead?"
- Never invent information that isn't provided in the context
- Maintain a professional tone even when being witty
- If unsure about specific details, acknowledge the limitation rather than guessing

## Context Information:
{context}

## Question: {question}

## Answer:`;

const PROMPT = PromptTemplate.fromTemplate(promptTemplate);

// Initialize chain only once
const chain = RetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever({
    // Limit results to reduce token usage
    k: 3,
  }),
  {
    prompt: PROMPT,
    returnSourceDocuments: false,
  },
);

// Keep track of requests to implement our own rate limiting
let lastRequestTime = 0;
const RATE_LIMIT_INTERVAL = 10000; // 10 seconds between requests

export async function POST(req: Request) {
  console.log("[API] POST /api/chat called");
  try {
    // Basic rate limiting to avoid hitting Google's limits
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < RATE_LIMIT_INTERVAL) {
      const waitTime = RATE_LIMIT_INTERVAL - timeSinceLastRequest;
      console.log(
        `[API] Rate limiting - waiting ${waitTime}ms before processing`,
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    lastRequestTime = Date.now();

    const body = await req.json();
    console.log("[API] Request body:", body);
    const { message, history } = body;

    // Combine history into a conversation string
    let conversation = "";
    if (Array.isArray(history)) {
      conversation = history
        .map(
          (msg: any) =>
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`,
        )
        .join("\n");
    }

    // Use conversation as context for the prompt
    const responsePromise = chain.call({
      query: message,
      context: conversation,
    });
    const response = await responsePromise;

    console.log("[API] Chain response:", response);

    return new Response(JSON.stringify({ response: response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[API] Error in POST /api/chat:", error);

    // Check for rate limit errors specifically
    const isRateLimit =
      error instanceof Error &&
      (error.message.includes("429") ||
        error.message.includes("quota") ||
        error.message.includes("rate limit"));

    const errorMessage = isRateLimit
      ? "The AI service is currently busy. Please try again in a few minutes."
      : "Sorry, something went wrong while processing your request.";

    return new Response(JSON.stringify({ response: errorMessage }), {
      status: isRateLimit ? 429 : 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
