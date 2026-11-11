#!/usr/bin/env node
/** 极简静态服务器：npm run serve → http://localhost:4321 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "web");
const port = Number(process.env.PORT || 4321);
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let file = path.join(root, decodeURIComponent(url.pathname));
    if (url.pathname === "/" || url.pathname.endsWith("/")) file = path.join(file, "index.html");
    if (!file.startsWith(root)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    const info = await stat(file).catch(() => null);
    if (!info?.isFile()) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("404 Not Found");
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, {
      "content-type": MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream",
      "cache-control": "no-cache",
    });
    res.end(body);
  } catch {
    res.writeHead(500).end("Internal Error");
  }
}).listen(port, () => {
  console.log(`Agent 新手村 → http://localhost:${port}`);
});
