import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import * as dotenv from "dotenv";
import * as fs from "fs/promises";
import * as path from "path";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { fileURLToPath } from "url";

dotenv.config({ path: ".env.local" });

const QDRANT_URL = process.env.QDRANT_URL || "http://localhost:6333";
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set in .env.local");
}

const collectionName = "portfolio_knowledge";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced document processing with better metadata
function processKnowledgeBase(content: string): Document[] {
  const documents: Document[] = [];

  // Split content by major sections
  const sections = content.split(/(?=##\s+)/);

  sections.forEach((section, index) => {
    if (section.trim().length === 0) return;

    const lines = section.split("\n");
    const title = lines[0]?.replace(/^#+\s*/, "") || `Section ${index}`;

    // Extract subsections
    const subsections = section.split(/(?=###\s+)/);

    subsections.forEach((subsection, subIndex) => {
      if (subsection.trim().length === 0) return;

      const subLines = subsection.split("\n");
      const subTitle = subLines[0]?.replace(/^#+\s*/, "") || "";

      // Determine section type for better categorization
      const sectionType = getSectionType(title, subTitle);

      // Create document with rich metadata
      documents.push(
        new Document({
          pageContent: subsection.trim(),
          metadata: {
            section: title,
            subsection: subTitle,
            type: sectionType,
            index: index,
            subIndex: subIndex,
            // Add keywords for better retrieval
            keywords: extractKeywords(subsection),
            // Add question patterns this section might answer
            questionPatterns: getQuestionPatterns(title, subTitle, subsection),
          },
        }),
      );
    });
  });

  return documents;
}

function getSectionType(title: string, subTitle: string): string {
  const titleLower = `${title} ${subTitle}`.toLowerCase();

  if (titleLower.includes("about") || titleLower.includes("tell me about")) {
    return "personal_intro";
  } else if (titleLower.includes("skill") || titleLower.includes("expertise")) {
    return "technical_skills";
  } else if (
    titleLower.includes("project") ||
    titleLower.includes("experience")
  ) {
    return "projects_experience";
  } else if (
    titleLower.includes("education") ||
    titleLower.includes("background")
  ) {
    return "education_background";
  } else if (titleLower.includes("contact") || titleLower.includes("reach")) {
    return "contact_info";
  } else if (
    titleLower.includes("value") ||
    titleLower.includes("motivation")
  ) {
    return "values_motivation";
  } else if (
    titleLower.includes("work style") ||
    titleLower.includes("preference")
  ) {
    return "work_style";
  }

  return "general";
}

function extractKeywords(content: string): string[] {
  const technicalKeywords = [
    "react",
    "nextjs",
    "nodejs",
    "typescript",
    "javascript",
    "go",
    "java",
    "spring boot",
    "postgresql",
    "mongodb",
    "redis",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "daily 150",
    "cinevault",
    "xchat",
    "xebia",
    "bennett",
    "encryption",
    "microservices",
    "api",
    "database",
    "fullstack",
    "backend",
    "frontend",
    "authentication",
    "architecture",
    "scalable",
    "security",
  ];

  const contentLower = content.toLowerCase();
  return technicalKeywords.filter((keyword) => contentLower.includes(keyword));
}

function getQuestionPatterns(
  title: string,
  subTitle: string,
  content: string,
): string[] {
  const patterns: string[] = [];

  const combinedText = `${title} ${subTitle}`.toLowerCase();

  // Add common question patterns based on content
  if (combinedText.includes("about")) {
    patterns.push(
      "tell me about yourself",
      "who are you",
      "introduce yourself",
    );
  }

  if (combinedText.includes("skill") || combinedText.includes("technology")) {
    patterns.push(
      "what technologies do you use",
      "what are your skills",
      "what programming languages",
    );
  }

  if (combinedText.includes("project")) {
    patterns.push(
      "tell me about your projects",
      "what have you built",
      "show me your work",
    );
  }

  if (combinedText.includes("experience") || combinedText.includes("work")) {
    patterns.push(
      "what is your experience",
      "where have you worked",
      "tell me about your job",
    );
  }

  if (combinedText.includes("education")) {
    patterns.push(
      "where did you study",
      "what is your education",
      "which university",
    );
  }

  if (combinedText.includes("contact")) {
    patterns.push(
      "how can I reach you",
      "what is your contact",
      "how to contact you",
    );
  }

  // Extract specific project names and technologies from content
  const projectNames = ["daily 150", "cinevault", "xchat", "wordle", "zipit"];
  projectNames.forEach((project) => {
    if (content.toLowerCase().includes(project)) {
      patterns.push(
        `tell me about ${project}`,
        `what is ${project}`,
        `explain ${project}`,
      );
    }
  });

  return patterns;
}

// Enhanced text splitter for better chunking
function createEnhancedSplitter() {
  return new RecursiveCharacterTextSplitter({
    chunkSize: 1200, // Slightly larger chunks for better context
    chunkOverlap: 300, // More overlap for continuity
    separators: [
      "\n\n### ", // Subsection headers
      "\n\n## ", // Section headers
      "\n\n", // Paragraph breaks
      "\n", // Line breaks
      ".", // Sentence breaks
      " ", // Word breaks
    ],
  });
}

async function ingestData() {
  try {
    console.log("Starting enhanced knowledge base ingestion...");

    // Read the knowledge base
    const markdownFilePath = path.join(__dirname, "../knowledge-base.md");
    const data = await fs.readFile(markdownFilePath, "utf-8");
    console.log(`Loaded knowledge base: ${data.length} characters`);

    // Process the knowledge base into structured documents
    const structuredDocs = processKnowledgeBase(data);
    console.log(`Created ${structuredDocs.length} structured documents`);

    // Split documents further if needed
    const splitter = createEnhancedSplitter();
    const allDocs: Document[] = [];

    for (const doc of structuredDocs) {
      const splitDocs = await splitter.splitDocuments([doc]);

      // Preserve metadata across splits
      splitDocs.forEach((splitDoc, index) => {
        splitDoc.metadata = {
          ...doc.metadata,
          splitIndex: index,
          totalSplits: splitDocs.length,
        };
      });

      allDocs.push(...splitDocs);
    }

    console.log(`Final document count after splitting: ${allDocs.length}`);

    // Create embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: GOOGLE_API_KEY,
      modelName: "embedding-001",
    });

    // Add rate limiting for embedding generation
    console.log("Generating embeddings with rate limiting...");
    const batchSize = 10;
    const delay = 1000; // 1 second between batches

    for (let i = 0; i < allDocs.length; i += batchSize) {
      const batch = allDocs.slice(i, i + batchSize);
      console.log(
        `Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allDocs.length / batchSize)}`,
      );

      try {
        if (i === 0) {
          // Create collection with first batch
          await QdrantVectorStore.fromDocuments(batch, embeddings, {
            url: QDRANT_URL,
            apiKey: QDRANT_API_KEY,
            collectionName,
          });
        } else {
          // Add to existing collection
          const vectorStore = new QdrantVectorStore(embeddings, {
            url: QDRANT_URL,
            apiKey: QDRANT_API_KEY,
            collectionName,
          });
          await vectorStore.addDocuments(batch);
        }

        // Add delay between batches to avoid rate limiting
        if (i + batchSize < allDocs.length) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error(
          `Error processing batch ${Math.floor(i / batchSize) + 1}:`,
          error,
        );
        // Wait longer on error before retrying
        await new Promise((resolve) => setTimeout(resolve, delay * 3));
      }
    }

    console.log(
      `✅ Successfully ingested ${allDocs.length} documents into Qdrant collection "${collectionName}"`,
    );

    // Print summary statistics
    const sectionTypes = allDocs.reduce(
      (acc, doc) => {
        const type = doc.metadata.type || "unknown";
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    console.log("\n📊 Ingestion Summary:");
    console.log("Section distribution:");
    Object.entries(sectionTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} documents`);
    });
  } catch (error) {
    console.error("❌ Error ingesting data:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Stack trace:", error.stack);
    }
  }
}

// Run the ingestion
ingestData();
