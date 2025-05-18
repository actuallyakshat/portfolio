import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import * as dotenv from "dotenv";
import * as fs from "fs/promises";
import * as path from "path";
import { MarkdownTextSplitter } from "langchain/text_splitter";
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

async function ingestData() {
  try {
    const markdownFilePath = path.join(__dirname, "../knowledge-base.md");
    const data = await fs.readFile(markdownFilePath, "utf-8");
    const splitter = new MarkdownTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await splitter.createDocuments([data]);
    console.log(`Split knowledge base into ${docs.length} chunks.`);
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: GOOGLE_API_KEY,
      modelName: "embedding-001",
    });
    // Use fromDocuments and pass connection info directly
    console.log(`Adding ${docs.length} document chunks to Qdrant...`);
    await QdrantVectorStore.fromDocuments(docs, embeddings, {
      url: QDRANT_URL,
      apiKey: QDRANT_API_KEY,
      collectionName,
    });
    console.log(
      `Successfully ingested ${docs.length} document chunks into Qdrant collection "${collectionName}".`,
    );
  } catch (error) {
    console.error("Error ingesting data:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
  }
}
ingestData();
