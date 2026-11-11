#!/usr/bin/env node
/** 把 web/index.html + CSS + 数据 + JS 打包成单文件 web/standalone.html（可直接分享）。 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "web");
const read = (p) => readFile(path.join(root, p), "utf8");
const escScript = (text) => text.replace(/<\/script/gi, "<\\/script");

const [html, css, data, app] = await Promise.all([
  read("index.html"),
  read("assets/styles.css"),
  read("data/agents.js"),
  read("assets/app.js"),
]);

// 注意：replace 的字符串替换会把 $$、$& 当特殊 token，必须用函数式替换
let out = html;
out = out.replace('<link rel="stylesheet" href="assets/styles.css" />', () => `<style>\n${css}\n</style>`);
out = out.replace('<script src="data/agents.js"></script>', () => `<script>\n${escScript(data)}\n</script>`);
out = out.replace('<script src="assets/app.js"></script>', () => `<script>\n${escScript(app)}\n</script>`);
out = out.replace("<title>", () => "<!-- 单文件版：由 scripts/build-standalone.mjs 生成 -->\n  <title>");

await writeFile(path.join(root, "standalone.html"), out, "utf8");
console.log(`✓ web/standalone.html (${(Buffer.byteLength(out) / 1024).toFixed(1)} KB)`);
