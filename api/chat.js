// Vercel serverless function. Retrieval only ever searches the precomputed
// data/embeddings.json (built by scripts/build-embeddings.mjs) — this never
// calls out to a search engine or the live web.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ALLOWED_ORIGIN = "https://ruri-furukawa.github.io";
const API_KEY = process.env.GEMINI_API_KEY;
const TOP_K = 5;

let embeddingsCache = null;
function loadEmbeddings() {
  if (!embeddingsCache) {
    const raw = readFileSync(path.join(__dirname, "..", "data", "embeddings.json"), "utf-8");
    embeddingsCache = JSON.parse(raw);
  }
  return embeddingsCache;
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function embed(text) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: { parts: [{ text }] } }),
    }
  );
  if (!res.ok) throw new Error(`Embedding request failed (${res.status}): ${await res.text()}`);
  const data = await res.json();
  return data.embedding.values;
}

async function generate(question, contextChunks, history) {
  const context = contextChunks.map((c) => `- ${c.text}`).join("\n");
  const systemInstruction = {
    parts: [
      {
        text:
          "You answer questions on behalf of Ruri Furukawa, for visitors to her portfolio site. " +
          "Answer only using the context below — it is the full extent of what you know about her. " +
          "If the answer isn't in the context, say you don't have that information rather than guessing. " +
          "Keep answers conversational and concise.\n\nContext:\n" + context,
      },
    ],
  };

  const contents = [
    ...(history ?? []).slice(-6).map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.text }],
    })),
    { role: "user", parts: [{ text: question }] },
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemInstruction, contents }),
    }
  );
  if (!res.ok) throw new Error(`Generate request failed (${res.status}): ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't come up with an answer.";
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!API_KEY) {
    res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
    return;
  }

  try {
    const { message, history } = req.body ?? {};
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Missing 'message' string" });
      return;
    }

    const chunks = loadEmbeddings();
    const queryVector = await embed(message);
    const top = chunks
      .map((c) => ({ ...c, score: cosineSimilarity(queryVector, c.vector) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    const answer = await generate(message, top, history);
    res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong answering that." });
  }
}
