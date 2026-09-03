#!/usr/bin/env node
/**
 * Serve the image review gallery and persist selections.
 *
 *   node scripts/review-gallery-server.mjs
 *   open http://localhost:3456
 */
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const PORT = Number(process.env.CURATION_PORT || 3456);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/candidates") {
    const path = join(__dirname, "image-candidates.json");
    if (!existsSync(path)) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Run fetch-image-candidates.mjs first" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(readFileSync(path));
    return;
  }

  if (req.method === "GET" && req.url === "/api/selections") {
    const path = join(__dirname, "image-selections.json");
    const body = existsSync(path) ? readFileSync(path) : "{}";
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(body);
    return;
  }

  if (req.method === "POST" && req.url === "/api/selections") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        JSON.parse(body);
        writeFileSync(join(__dirname, "image-selections.json"), body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      } catch {
        res.writeHead(400);
        res.end("Invalid JSON");
      }
    });
    return;
  }

  let filePath = req.url === "/" ? "/scripts/review-gallery.html" : req.url.split("?")[0];
  if (filePath.startsWith("/images/")) {
    filePath = join(root, "public", filePath);
  } else if (filePath.startsWith("/scripts/")) {
    filePath = join(root, filePath);
  } else {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const ext = extname(filePath);
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  res.end(readFileSync(filePath));
});

server.listen(PORT, () => {
  console.log(`Image review gallery: http://localhost:${PORT}`);
  console.log("Keys: 1-5 pick candidate, K keep current, S skip, arrows navigate, Ctrl+S save");
});
