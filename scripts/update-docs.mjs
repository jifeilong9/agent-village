#!/usr/bin/env node
/**
 * 检查官方文档 / 仓库是否更新。
 * - 读取 docs/sources.json
 * - 抓取每个来源，规范化后取 SHA-256
 * - 与 docs/sources.lock.json 比对，输出变更报告 docs/updates/<日期>.json
 * - 变更摘要追加到 docs/UPDATE_LOG.md
 * 纯 Node，无第三方依赖。
 */
import { readFile, writeFile, mkdir, appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = path.join(root, "docs");
const manifestPath = path.join(docsDir, "sources.json");
const lockPath = path.join(docsDir, "sources.lock.json");
const logPath = path.join(docsDir, "UPDATE_LOG.md");
const updatesDir = path.join(docsDir, "updates");
const TIMEOUT_MS = 20_000;

const HEADERS = {
  "user-agent": "agent-newbie-village/0.1 (+https://github.com/; docs research bot)",
  accept: "text/html,application/xhtml+xml,application/json,text/plain;q=0.9,*/*;q=0.8",
};

function normalize(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function titleOf(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/\s+/g, " ").trim() : "";
}

async function fetchSource(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: HEADERS, redirect: "follow", signal: controller.signal });
    const text = await res.text();
    const body = normalize(text);
    return {
      ok: res.ok,
      status: res.status,
      finalUrl: res.url,
      title: titleOf(text),
      hash: sha256(body),
      chars: body.length,
      excerpt: body.slice(0, 400),
    };
  } catch (err) {
    return { ok: false, status: 0, error: err.name === "AbortError" ? "timeout" : String(err.message ?? err) };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  if (!existsSync(manifestPath)) {
    console.error(`找不到 ${manifestPath}`);
    process.exit(1);
  }
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const lock = existsSync(lockPath) ? JSON.parse(await readFile(lockPath, "utf8")) : { sources: {} };
  lock.sources ??= {};

  const today = new Date().toISOString().slice(0, 10);
  const results = [];
  const changed = [];
  const failed = [];

  const jobs = [];
  for (const agent of manifest.agents ?? []) {
    for (const src of agent.sources ?? []) {
      jobs.push(
        (async () => {
          const prev = lock.sources[src.url];
          const now = await fetchSource(src.url);
          const entry = { agent: agent.slug, agentName: agent.name, type: src.type, url: src.url };
          if (!now.ok) {
            failed.push({ ...entry, status: now.status, error: now.error ?? `HTTP ${now.status}` });
            results.push({ ...entry, ok: false, status: now.status, error: now.error });
            return;
          }
          const isChanged = !prev || prev.hash !== now.hash;
          if (isChanged) changed.push({ ...entry, title: now.title, previousHash: prev?.hash ?? null, hash: now.hash, excerpt: now.excerpt });
          results.push({ ...entry, ok: true, status: now.status, title: now.title, hash: now.hash, changed: isChanged });
          lock.sources[src.url] = {
            hash: now.hash,
            title: now.title,
            finalUrl: now.finalUrl,
            checkedAt: new Date().toISOString(),
            firstSeenAt: prev?.firstSeenAt ?? new Date().toISOString(),
            lastChangedAt: isChanged ? new Date().toISOString() : prev?.lastChangedAt ?? new Date().toISOString(),
          };
        })()
      );
    }
  }
  await Promise.all(jobs);

  lock.lastRunAt = new Date().toISOString();
  await writeFile(lockPath, JSON.stringify(lock, null, 2) + "\n", "utf8");

  await mkdir(updatesDir, { recursive: true });
  const report = { date: today, checked: results.length, changed: changed.length, failed: failed.length, changedItems: changed, failedItems: failed };
  await writeFile(path.join(updatesDir, `${today}.json`), JSON.stringify(report, null, 2) + "\n", "utf8");

  if (!existsSync(logPath)) {
    await writeFile(
      logPath,
      "# 官方文档更新日志\n\n由 `npm run update` 自动生成。每次运行比对来源内容哈希，记录发生变化的条目。\n\n",
      "utf8"
    );
  }
  const stamp = new Date().toISOString();
  let block = `## ${stamp}\n\n检查 ${results.length} 个来源，变化 ${changed.length} 个，失败 ${failed.length} 个。\n\n`;
  if (changed.length) {
    block += "| Agent | 类型 | 来源 | 变化 |\n| --- | --- | --- | --- |\n";
    for (const c of changed) {
      block += `| ${c.agentName} | ${c.type} | ${c.url} | ${c.previousHash ? "内容哈希变化" : "首次收录"} |\n`;
    }
    block += "\n";
    for (const c of changed) block += `- **${c.agentName}** · ${c.type}: ${c.excerpt.slice(0, 200)}\n`;
    block += "\n";
  }
  if (failed.length) {
    block += "失败来源：\n\n";
    for (const f of failed) block += `- ${f.agentName} · ${f.url} — ${f.error}\n`;
    block += "\n";
  }
  await appendFile(logPath, block, "utf8");

  console.log(`✓ 检查 ${results.length} 个来源：变化 ${changed.length}，失败 ${failed.length}`);
  for (const c of changed) console.log(`  ~ ${c.agentName} / ${c.type}: ${c.url}`);
  for (const f of failed) console.log(`  ! ${f.agentName}: ${f.url} — ${f.error}`);
  console.log(`  报告：docs/updates/${today}.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
