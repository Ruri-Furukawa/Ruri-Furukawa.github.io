// Offline ingestion script — run manually whenever data.js or content/*.md
// changes (`GEMINI_API_KEY=... node scripts/build-embeddings.mjs`). Not part
// of any deploy build step: the live api/chat.js function only ever reads
// the data/embeddings.json this produces, it never recomputes embeddings.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Set GEMINI_API_KEY in the environment before running this script.");
  process.exit(1);
}

const {
  PROFILE,
  EDUCATION,
  EMPLOYMENT,
  OUTPUTS,
  PINNED,
  SKILLS,
  ACTIVITIES,
  INTERESTS,
  LINKS,
} = await import(path.join(ROOT, "data.js"));

// Flattens data.js's [label](url) markdown links to "label (url)" for embedding text.
function stripMdLinks(text) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");
}

function chunksFromData() {
  const chunks = [];

  chunks.push({ id: "profile-intro", text: `${PROFILE.name}. ${PROFILE.intro}` });

  for (const [i, e] of EDUCATION.entries()) {
    chunks.push({ id: `education-${i}`, text: `Education, ${e.period}: ${e.title} — ${e.place}.` });
  }
  for (const [i, e] of EMPLOYMENT.entries()) {
    chunks.push({ id: `employment-${i}`, text: `Employment, ${e.period}: ${e.title} at ${e.place}.` });
  }
  for (const [i, o] of OUTPUTS.entries()) {
    chunks.push({
      id: `output-${i}`,
      text: `${o.type.toUpperCase()} (${o.date}): ${o.title}. ${o.meta}${o.url ? ` URL: ${o.url}` : ""}`,
    });
  }
  for (const [i, p] of PINNED.entries()) {
    chunks.push({
      id: `pinned-${i}`,
      text: `Pinned project — ${p.title} (${p.subtitle}). ${p.detail}${p.url ? ` URL: ${p.url}` : ""}`,
    });
  }
  for (const [group, items] of Object.entries(SKILLS)) {
    chunks.push({ id: `skills-${group}`, text: `Skills — ${group}: ${items.join("; ")}.` });
  }
  for (const [i, a] of ACTIVITIES.entries()) {
    chunks.push({ id: `activity-${i}`, text: `${a.period}: ${stripMdLinks(a.title)}` });
  }
  chunks.push({ id: "interests", text: `Interested in: ${INTERESTS.join("; ")}.` });
  chunks.push({
    id: "links",
    text: `Contact / social links: ${LINKS.map((l) => `${l.label} (${l.value})`).join(", ")}.`,
  });

  return chunks;
}

function chunksFromMarkdown() {
  const dir = path.join(ROOT, "content");
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  const chunks = [];
  for (const file of files) {
    const raw = readFileSync(path.join(dir, file), "utf-8");
    const sections = raw.split(/\n(?=#{1,6}\s)/g);
    for (const [i, section] of sections.entries()) {
      const text = section
        .replace(/<!--[\s\S]*?-->/g, "")
        .trim();
      if (text.length < 20) continue; // skip empty/placeholder headings
      chunks.push({ id: `${file}-${i}`, text });
    }
  }
  return chunks;
}

async function embed(text) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: { parts: [{ text }] },
        taskType: "RETRIEVAL_DOCUMENT",
        outputDimensionality: 768,
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`Embedding request failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.embedding.values;
}

async function main() {
  const chunks = [...chunksFromData(), ...chunksFromMarkdown()];
  console.log(`Embedding ${chunks.length} chunks...`);

  const out = [];
  for (const chunk of chunks) {
    const vector = await embed(chunk.text);
    out.push({ ...chunk, vector });
    process.stdout.write(".");
  }
  console.log("");

  const outPath = path.join(ROOT, "data", "embeddings.json");
  writeFileSync(outPath, JSON.stringify(out));
  console.log(`Wrote ${out.length} chunks to ${path.relative(ROOT, outPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
