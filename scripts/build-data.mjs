#!/usr/bin/env node
/**
 * 汇总 agents/<slug>/features.json → web/data/agents.json + web/data/agents.js
 * 纯 Node，无第三方依赖。
 */
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildCourse } from "./lib/course.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const agentsDir = path.join(root, "agents");
const outDir = path.join(root, "web", "data");

const REQUIRED_AGENT = ["slug", "name", "vendor", "tagline", "version", "updatedAt", "official", "stats", "features"];
const REQUIRED_FEATURE = ["id", "name", "category", "level", "summary", "steps"];
const LEVELS = new Set(["入门", "进阶", "高级"]);
const DAY = 86_400_000;
const NEW_WINDOW_DAYS = 120;

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exitCode = 1;
}

function validateAgent(a, file) {
  for (const key of REQUIRED_AGENT) {
    if (a[key] == null) fail(`${file}: 缺少字段 ${key}`);
  }
  if (!Array.isArray(a.features) || a.features.length === 0) {
    fail(`${file}: features 必须是非空数组`);
    return;
  }
  const ids = new Set();
  for (const f of a.features) {
    for (const key of REQUIRED_FEATURE) {
      if (f[key] == null) fail(`${file}: 功能 ${f.id ?? f.name ?? "?"} 缺少字段 ${key}`);
    }
    if (f.id && ids.has(f.id)) fail(`${file}: 重复的功能 id: ${f.id}`);
    ids.add(f.id);
    if (f.level && !LEVELS.has(f.level)) fail(`${file}: 功能 ${f.id} 的 level 必须是 入门/进阶/高级`);
    if (f.steps && (!Array.isArray(f.steps) || f.steps.length === 0)) fail(`${file}: 功能 ${f.id} 的 steps 不能为空`);
    f.hot = Number.isFinite(Number(f.hot)) ? Number(f.hot) : 50;
  }
  a.stats = a.stats ?? {};
  a.stats.popularity = Number.isFinite(Number(a.stats.popularity)) ? Number(a.stats.popularity) : 50;
  a.stats.learningCurve = Number.isFinite(Number(a.stats.learningCurve)) ? Number(a.stats.learningCurve) : 3;
  a.stats.bestFor = Array.isArray(a.stats.bestFor) ? a.stats.bestFor : [];
}

function withComputed(a) {
  const now = Date.now();
  for (const f of a.features) {
    const released = f.releasedAt ? Date.parse(f.releasedAt) : NaN;
    f.isNew = Boolean(f.isNew) || (Number.isFinite(released) && now - released < NEW_WINDOW_DAYS * DAY);
    f.isHot = f.hot >= 90;
  }
  a.course = buildCourse(a);
  return a;
}

async function main() {
  if (!existsSync(agentsDir)) {
    fail(`找不到 agents 目录: ${agentsDir}`);
    return;
  }
  const dirs = (await readdir(agentsDir, { withFileTypes: true })).filter((d) => d.isDirectory());
  const agents = [];
  for (const dir of dirs) {
    const file = path.join(agentsDir, dir.name, "features.json");
    if (!existsSync(file)) {
      console.warn(`… 跳过 ${dir.name}：还没有 features.json`);
      continue;
    }
    let data;
    try {
      data = JSON.parse(await readFile(file, "utf8"));
    } catch (err) {
      fail(`${file}: JSON 解析失败 — ${err.message}`);
      continue;
    }
    validateAgent(data, file);
    if (!data.slug) data.slug = dir.name;
    agents.push(withComputed(data));
  }

  agents.sort((x, y) => (y.stats.popularity ?? 0) - (x.stats.popularity ?? 0));

  const allFeatures = agents.flatMap((a) =>
    a.features.map((f) => ({ ...f, agentSlug: a.slug, agentName: a.name, vendor: a.vendor }))
  );
  const payload = {
    generatedAt: new Date().toISOString(),
    agents,
    recommendations: {
      hot: [...allFeatures].filter((f) => f.hot > 0).sort((x, y) => y.hot - x.hot).slice(0, 12),
      fresh: [...allFeatures]
        .filter((f) => f.isNew)
        .sort((x, y) => (Date.parse(y.releasedAt ?? 0) || 0) - (Date.parse(x.releasedAt ?? 0) || 0))
        .slice(0, 12),
    },
  };

  await mkdir(outDir, { recursive: true });
  const json = JSON.stringify(payload, null, 2);
  await writeFile(path.join(outDir, "agents.json"), json + "\n", "utf8");
  await writeFile(
    path.join(outDir, "agents.js"),
    `// 自动生成，请勿手改。源：agents/<slug>/features.json\nwindow.AGENT_DATA = ${json};\n`,
    "utf8"
  );

  const totalModules = agents.reduce((n, a) => n + a.course.moduleCount, 0);
  const totalMinutes = agents.reduce((n, a) => n + a.course.totalMinutes, 0);
  console.log(`✓ 汇总 ${agents.length} 个 Agent / ${allFeatures.length} 个功能 / ${totalModules} 个课程模块`);
  for (const a of agents) {
    console.log(
      `  - ${a.name} (${a.slug}) v${a.version} · ${a.features.length} 功能 · ${a.course.moduleCount} 模块/${a.course.totalMinutes} 分钟 · 人气 ${a.stats.popularity}`
    );
  }
  console.log(`  热门推荐 ${payload.recommendations.hot.length} 条，新功能推荐 ${payload.recommendations.fresh.length} 条`);
  if (process.exitCode) console.error("存在校验问题，请修正后重新构建。");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
