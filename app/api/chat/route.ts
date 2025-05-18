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

const promptTemplate = `You are a helpful AI assistant that provides information about the portfolio of the person you are interacting with.
Use the following pieces of context to answer the question at the end.
If you don't know the answer or the question is not related to the person's portfolio, professional experience, skills, or projects, politely state that you can only answer questions about their professional background and projects based on the provided information.
Be concise and focused in your answers.
Do not make up information.

Context:
{context}

Question: {question}
Answer:`;

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
    const { message } = body;

    if (!message) {
      console.warn("[API] No message provided in request body");
      return new Response(JSON.stringify({ message: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("[API] Querying chain with message:", message);

    // Use a promise with timeout to prevent hanging requests
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timed out")), 30000); // 30 seconds timeout
    });

    const responsePromise = chain.call({ query: message });
    const response = await Promise.race([responsePromise, timeoutPromise]);

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
