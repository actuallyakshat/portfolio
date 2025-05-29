import { PromptTemplate } from "@langchain/core/prompts";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/qdrant-js";
import { RetrievalQAChain } from "langchain/chains";
import { Redis } from "@upstash/redis";
import { BaseRetriever } from "@langchain/core/retrievers";
import { DocumentInterface } from "@langchain/core/documents";

// Configuration
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

// Initialize clients
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
  maxRetries: 2,
  temperature: 0.2,
});

// Enhanced Query Processing
function expandQuery(query: string): string[] {
  const queryExpansions: Record<string, string[]> = {
    experience: [
      "work experience",
      "professional experience",
      "internship",
      "Xebia",
      "Software Developer Intern",
      "responsibilities",
      "job role",
      "XChat project",
    ],
    skills: [
      "technical skills",
      "programming languages",
      "frameworks",
      "technologies",
      "expertise",
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Go",
      "Java",
      "Spring Boot",
    ],
    projects: [
      "Daily 150",
      "Cinevault",
      "XChat",
      "Zipit",
      "Multiplayer Wordle",
      "personal projects",
      "significant project",
    ],
    education: [
      "Bennett University",
      "Computer Science Engineering",
      "academic background",
      "university",
      "CGPA",
      "Dean's List",
    ],
    background: [
      "personal background",
      "grew up",
      "early interest",
      "about yourself",
      "tell me about",
    ],
  };

  const normalizedQuery = query.toLowerCase();
  const expandedQueries = [query];

  // Direct keyword matching
  Object.entries(queryExpansions).forEach(([category, expansions]) => {
    if (
      normalizedQuery.includes(category) ||
      expansions.some((exp) => normalizedQuery.includes(exp.toLowerCase()))
    ) {
      expandedQueries.push(...expansions);
    }
  });

  // Handle common question patterns
  if (
    normalizedQuery.includes("work") ||
    normalizedQuery.includes("job") ||
    normalizedQuery.includes("current")
  ) {
    expandedQueries.push(...queryExpansions.experience);
  }

  if (normalizedQuery.includes("about") || normalizedQuery.includes("tell")) {
    expandedQueries.push(...queryExpansions.background);
  }

  //fix
  return Array.from(new Set(expandedQueries));
}

// Document Scoring
function calculateRelevanceScore(
  content: string,
  originalQuery: string,
): number {
  const normalizedContent = content.toLowerCase();
  const normalizedQuery = originalQuery.toLowerCase();
  const queryWords = normalizedQuery.split(/\s+/).filter((w) => w.length > 2);

  let score = 0;

  // Exact phrase match
  if (normalizedContent.includes(normalizedQuery)) {
    score += 15;
  }

  // Individual word matches
  queryWords.forEach((word) => {
    const wordCount = (normalizedContent.match(new RegExp(word, "g")) || [])
      .length;
    score += wordCount * 3;
  });

  // Section header bonus
  const importantSections = [
    "experience",
    "projects",
    "skills",
    "education",
    "xebia",
    "daily 150",
    "cinevault",
  ];
  importantSections.forEach((section) => {
    if (normalizedContent.includes(section)) {
      score += 5;
    }
  });

  // Penalize very short content
  if (content.length < 100) {
    score *= 0.7;
  }

  return score;
}

// Enhanced Retrieval
async function enhancedRetrieval(question: string, k: number = 10) {
  try {
    console.log(`[ENHANCED_RETRIEVAL] Processing: "${question}"`);

    // 1. Primary search
    const primaryResults = await vectorStore.similaritySearch(question, k);

    // 2. Expanded query search
    const expandedQueries = expandQuery(question);
    console.log(
      `[ENHANCED_RETRIEVAL] Expanded to: ${expandedQueries.length} queries`,
    );

    const expandedResults = await Promise.all(
      expandedQueries
        .slice(1, 4)
        .map((query) => vectorStore.similaritySearch(query, Math.ceil(k / 3))),
    );

    // 3. Combine and deduplicate
    const allResults = [...primaryResults, ...expandedResults.flat()];
    const uniqueResults = allResults.filter(
      (doc, index, self) =>
        index === self.findIndex((d) => d.pageContent === doc.pageContent),
    );

    // 4. Score and sort
    const scoredResults = uniqueResults
      .map((doc) => ({
        ...doc,
        relevanceScore: calculateRelevanceScore(doc.pageContent, question),
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    console.log(
      `[ENHANCED_RETRIEVAL] Final results: ${scoredResults.length} documents`,
    );

    return scoredResults.slice(0, k);
  } catch (error) {
    console.error("[ENHANCED_RETRIEVAL] Error:", error);
    return await vectorStore.similaritySearch(question, k);
  }
}

// Context Organization
function organizeContext(documents: any[]): string {
  const sections: Record<string, any[]> = {
    "Work Experience": [],
    Projects: [],
    "Skills & Technical Expertise": [],
    Education: [],
    "Personal Background": [],
    "General Information": [],
  };

  documents.forEach((doc) => {
    const content = doc.pageContent.toLowerCase();
    let assigned = false;

    if (
      content.includes("xebia") ||
      content.includes("internship") ||
      content.includes("responsibilities") ||
      content.includes("xchat project")
    ) {
      sections["Work Experience"].push(doc);
      assigned = true;
    }

    if (
      content.includes("daily 150") ||
      content.includes("cinevault") ||
      content.includes("zipit") ||
      content.includes("multiplayer wordle") ||
      content.includes("significant project")
    ) {
      sections["Projects"].push(doc);
      assigned = true;
    }

    if (
      content.includes("programming languages") ||
      content.includes("frameworks") ||
      content.includes("technical skills") ||
      content.includes("javascript") ||
      content.includes("typescript") ||
      content.includes("react")
    ) {
      sections["Skills & Technical Expertise"].push(doc);
      assigned = true;
    }

    if (
      content.includes("bennett university") ||
      content.includes("education") ||
      content.includes("cgpa") ||
      content.includes("academic")
    ) {
      sections["Education"].push(doc);
      assigned = true;
    }

    if (
      content.includes("grew up") ||
      content.includes("personal background") ||
      content.includes("role models") ||
      content.includes("values")
    ) {
      sections["Personal Background"].push(doc);
      assigned = true;
    }

    if (!assigned) {
      sections["General Information"].push(doc);
    }
  });

  let organizedContext = "";
  Object.entries(sections).forEach(([sectionName, docs]) => {
    if (docs.length > 0) {
      organizedContext += `\n### ${sectionName}\n`;
      docs.forEach((doc) => {
        organizedContext += `${doc.pageContent}\n\n`;
      });
    }
  });

  return organizedContext;
}

// Enhanced Prompt Template
const promptTemplate = `You are Akshat Dubey's AI assistant. Your role is to provide comprehensive, accurate information about Akshat based on his portfolio data.

GUIDELINES:
- Use the organized context below to provide detailed, informative responses
- Be specific and include relevant details when available
- Maintain a professional yet conversational tone
- If multiple sections are relevant, draw information from all of them
- Always refer to Akshat in third person (he/his/him)
- Format your response in clean Markdown

ORGANIZED CONTEXT:
{context}

QUESTION: {question}

Based on the comprehensive information above, here's what I can tell you about Akshat:`;

const PROMPT = PromptTemplate.fromTemplate(promptTemplate);

class CustomEnhancedRetriever extends BaseRetriever<Record<string, any>> {
  // The _getRelevantDocuments method is the core logic
  async _getRelevantDocuments(query: string): Promise<DocumentInterface[]> {
    // Call your existing enhancedRetrieval function here
    const docs = await enhancedRetrieval(query, 12);
    return docs;
  }

  // Implement other abstract methods/properties required by BaseRetriever.
  // Define lc_attributes as a getter instead of a property.
  get lc_attributes(): Record<string, any> {
    // Return any attributes relevant for serialization if needed.
    // For this minimal case, an empty object is often sufficient if
    // your retriever logic doesn't depend on complex constructor parameters
    // that need to be serialized/deserialized.
    return {};
  }

  // The other required properties/methods remain similar:
  getName(): string {
    return "CustomEnhancedRetriever";
  }
  lc_serializable = true; // Required for serialization
  lc_namespace = ["langchain", "retrievers", "custom"]; // Required for serialization

  // Optional methods if not needed for your use case
  _stream?(): AsyncGenerator<
    DocumentInterface<Record<string, any>>,
    void,
    void
  >;
  _batch?(
    queries: string[],
    config?: import("@langchain/core/runnables").RunnableBatchOptions,
  ): Promise<DocumentInterface<Record<string, any>>[][]>;
}

async function createEnhancedChain() {
  // Instantiate your new custom retriever class
  const enhancedRetriever = new CustomEnhancedRetriever(); // No args needed if enhancedRetrieval is globally accessible or closure captured

  return RetrievalQAChain.fromLLM(model, enhancedRetriever, {
    // Pass the instance of the class
    prompt: PROMPT,
    returnSourceDocuments: true,
    inputKey: "query",
  });
}

// Response Processing
function processResponse(response: any, question: string): string {
  console.log("[PROCESSING] Processing response...");

  const answer = response.text || response;
  const sourceDocuments = response.sourceDocuments || [];

  console.log(`[PROCESSING] Source documents: ${sourceDocuments.length}`);

  // Check for inadequate responses
  const inadequateSignals = [
    "don't have enough information",
    "not available",
    "can't find",
    "no information",
    "there is a section",
    "you would need to refer",
  ];

  const seemsInadequate = inadequateSignals.some((signal) =>
    answer.toLowerCase().includes(signal.toLowerCase()),
  );

  if (seemsInadequate && sourceDocuments.length > 0) {
    console.log(
      "[PROCESSING] Response seems inadequate despite having context",
    );

    // Organize and return context directly for very vague queries
    if (question.toLowerCase().includes("experience")) {
      const contextText = sourceDocuments
        .map((doc: any) => doc.pageContent)
        .join(" ");

      if (contextText.includes("Xebia") || contextText.includes("internship")) {
        return `Based on Akshat's portfolio, here's information about his experience:

**Current Role:**
Akshat is currently working as a Software Developer Intern at Xebia in Gurugram, where he's contributing to the XChat project - an internal AI agent platform serving over 6500 employees.

**Key Responsibilities:**
- Developing and implementing features for XChat, an internal AI agent hub
- Implementing adapter patterns to integrate FastAPI microservices with Spring Boot backend
- Working with Generative AI teams on cutting-edge AI solutions
- Contributing to enterprise-level application development

For more specific details about his projects, skills, or other aspects of his background, feel free to ask!`;
      }
    }
  }

  return answer;
}

// Rate Limiting
async function getRateLimitKey(req: Request): Promise<string> {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";
  return `rate_limit:${ip}`;
}

const RATE_LIMIT = {
  requests: 10,
  window: 60,
  blockDuration: 300,
};

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

// Input Validation
function validateInput(message: string): {
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

  if (sanitized.length > 500) {
    return {
      valid: false,
      sanitized: "",
      error: "Message is too long (max 500 characters)",
    };
  }

  return { valid: true, sanitized };
}

// Main API Handler
export async function POST(req: Request) {
  console.log("[API] POST /api/chat called");

  try {
    // Rate limiting
    const rateLimitKey = await getRateLimitKey(req);
    const rateLimit = await checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({
          response: "Please wait a moment before sending another message.",
          error: true,
          rateLimited: true,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const body = await req.json();
    const { message } = body;

    console.log(`[API] Received message: "${message}"`);

    // Validate input
    const validation = validateInput(message);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          response: `${validation.error}. Please try again.`,
          error: true,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    console.log("[API] Creating enhanced chain...");

    // Get enhanced results
    const documents = await enhancedRetrieval(validation.sanitized, 12);
    const organizedContext = organizeContext(documents);

    console.log(`[API] Organized context length: ${organizedContext.length}`);

    // Create chain with organized context
    const chain = await createEnhancedChain();
    const response = await chain.call({
      query: validation.sanitized,
      context: organizedContext,
    });

    console.log("[API] Chain call completed, processing response...");

    const processedResponse = processResponse(response, validation.sanitized);

    return new Response(
      JSON.stringify({
        response: processedResponse,
        remaining: rateLimit.remaining,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("[API] Error:", error);

    return new Response(
      JSON.stringify({
        response:
          "I'm experiencing technical difficulties. Please try again in a moment.",
        error: true,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// Debug function
async function debugRetrieval(question: string) {
  console.log(`[DEBUG] Testing enhanced retrieval for: "${question}"`);

  try {
    const results = await enhancedRetrieval(question, 8);
    console.log(`[DEBUG] Found ${results.length} documents`);

    return results;
  } catch (error) {
    console.error("[DEBUG] Enhanced retrieval error:", error);
    return [];
  }
}
