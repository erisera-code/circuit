// Zero-dependency static server for the examples (no caching, so edits to
// src/ show up on reload). `npm run serve` → http://127.0.0.1:4173/examples/
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const PORT = Number(process.env.PORT || 4173);
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".mjs": "text/javascript", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".md": "text/markdown; charset=utf-8" };

createServer(async (req, res) => {
  // the browser-side audit posts its results here (dev only)
  if (req.method === "POST" && req.url === "/__audit") {
    let body = ""; for await (const chunk of req) body += chunk;
    const { mkdirSync, writeFileSync } = await import("node:fs");
    mkdirSync(join(ROOT, "reports"), { recursive: true });
    const parsed = JSON.parse(body); writeFileSync(join(ROOT, "reports", parsed.deep ? "deep.json" : "audit.json"), body);
    res.writeHead(204, { "Access-Control-Allow-Origin": "*" }); return res.end();
  }
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  const file = join(ROOT, normalize(path));
  if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(file)).isDirectory()) { res.writeHead(302, { location: path + "/" }).end(); return; }
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream", "cache-control": "no-store" }).end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" }).end("not found: " + path);
  }
}).listen(PORT, "127.0.0.1", () => console.log(`serving ${ROOT} at http://127.0.0.1:${PORT}/examples/`));
