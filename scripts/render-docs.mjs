#!/usr/bin/env node
/**
 * 由 agents/<slug>/features.json 生成 README.md 与 features.md。
 * 单一数据源：改 JSON → npm run build → 网页与文档同步更新。
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const agentsDir = path.join(root, "agents");
const LEVEL_ORDER = ["入门", "进阶", "高级"];

const cell = (value = "") => String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const codeFence = (command) => {
  const text = String(command);
  const lang = /^\s*[{[]/.test(text) ? "json" : "bash";
  return `\`\`\`${lang}\n${text}\n\`\`\``;
};
const link = (label, url) => (url ? `[${label}](${url})` : "—");
const anchor = (id) => `<a id="${id}"></a>`;

function featureTable(agent) {
  const rows = agent.features.map(
    (f) =>
      `| [${cell(f.name)}](features.md#${f.id}) | ${cell(f.level)} | ${f.hot ?? "—"} | ${cell(f.category)} | ${cell(f.summary)} |`
  );
  return ["| 功能 | 难度 | 热度 | 分类 | 一句话 |", "| --- | --- | --- | --- | --- |", ...rows].join("\n");
}

function learningPath(agent) {
  const sections = (agent.learningPath || []).map((step, i) => {
    const links = (step.features || [])
      .map((id) => {
        const f = agent.features.find((x) => x.id === id);
        return f ? `[${f.name}](features.md#${id})` : null;
      })
      .filter(Boolean)
      .join(" · ");
    const heading = /^阶段\s*\d/.test(step.title) ? step.title : `阶段 ${i + 1}：${step.title}`;
    return `### ${heading}\n\n${step.desc}\n\n${links ? `**涉及功能**：${links}` : ""}`;
  });
  return sections.length ? sections.join("\n\n") : "按「入门 → 进阶 → 高级」顺序阅读功能总表即可。";
}

function readme(agent) {
  const official = agent.official || {};
  const docs = Array.isArray(official.docs) ? official.docs : official.docs ? [official.docs] : [];
  return `# ${agent.name}

> ${agent.tagline}
>
> **厂商**：${agent.vendor}　**版本**：${agent.version}　**核对日期**：${agent.updatedAt}

${docs[0] ? `**官方文档**：${docs.map((u, i) => link(i === 0 ? "入口" : `文档 ${i + 1}`, u)).join(" · ")}` : ""}${official.repo ? `　**仓库**：${link("GitHub", official.repo)}` : ""}${official.changelog ? `　**更新日志**：${link("Changelog", official.changelog)}` : ""}

---

## 适合谁

${(agent.stats?.bestFor || []).map((x) => `- ${x}`).join("\n") || "- 希望系统学习这个 Agent 的开发者"}

## 安装与首次运行

**环境要求**

${(agent.install?.requirements || []).map((x) => `- ${x}`).join("\n") || "- 见官方文档"}

**步骤**

${(agent.install?.steps || []).map((x, i) => `${i + 1}. ${x}`).join("\n") || "见官方文档"}

${(agent.install?.commands || []).map(codeFence).join("\n\n")}

${agent.install?.verify ? `**验证**：${agent.install.verify}` : ""}

## 先认路

| 概念 | 说明 |
| --- | --- |
${(agent.concepts || []).map((c) => `| **${cell(c.term)}** | ${cell(c.desc)} |`).join("\n")}

## 学习路径

${learningPath(agent)}

## 功能总表

${featureTable(agent)}

> 每个功能的手把手步骤、可复制命令与常见坑，见 [features.md](features.md)。

## 官方入口

- 官网：${link(official.site || "官方入口", official.site)}
- 文档：${docs.length ? docs.map((u) => link(u, u)).join(" · ") : "—"}
- 仓库：${link(official.repo || "—", official.repo)}
- 更新日志：${link(official.changelog || "—", official.changelog)}
- 来源与核对记录：[sources.md](sources.md)
- 近期版本变化：[changelog.md](changelog.md)

## 维护说明

本页由 \`scripts/render-docs.mjs\` 根据 \`features.json\` 生成，请勿手改。更新流程：

1. 运行 \`npm run update\` 检查官方文档/仓库是否有变更；
2. 依据变更修改 \`features.json\`（版本、命令、步骤、链接）；
3. 运行 \`npm run build\`，同步刷新 \`README.md\`、\`features.md\` 与网页数据。

> 内容来自公开官方资料，仅供学习。版本迭代很快，动手前请以官方最新文档为准。
`;
}

function featuresDoc(agent) {
  const groups = LEVEL_ORDER.map((level) => {
    const list = agent.features.filter((f) => f.level === level);
    if (!list.length) return "";
    const body = list
      .map((f) => {
        const newTag = f.isNew ? " · `NEW`" : "";
        return `${anchor(f.id)}
### ${f.name}

> ${f.level} · ${f.category} · 热度 ${f.hot ?? "—"}${newTag}${f.releasedAt ? ` · ${f.releasedAt}` : ""}

**一句话**：${f.summary}

**为什么值得学**：${f.why || "—"}

**手把手**

${(f.steps || []).map((s, i) => `${i + 1}. ${s}`).join("\n") || "见官方文档"}

${(f.commands || []).length ? `**可复制命令**\n\n${f.commands.map(codeFence).join("\n\n")}` : ""}

${f.pitfalls ? `**常见坑**：${f.pitfalls}` : ""}

**标签**：${(f.tags || []).map((t) => `\`#${t}\``).join(" ") || "—"}

**官方文档**：${f.doc ? link(f.doc, f.doc) : "—"}
`;
      })
      .join("\n---\n\n");
    return `## ${level}\n\n${body}`;
  })
    .filter(Boolean)
    .join("\n");

  return `# ${agent.name} · 功能手册

> 核对日期：${agent.updatedAt}　版本：${agent.version}　厂商：${agent.vendor}
>
> 返回 [README](README.md) · [来源记录](sources.md)

本手册覆盖 ${agent.features.length} 个功能，按难度分为入门 / 进阶 / 高级。每个功能都给出可执行步骤、命令与常见坑；遇到版本差异，以官方文档为准。

---

${groups}
`;
}

function sourcesDoc(agent) {
  const official = agent.official || {};
  const docs = Array.isArray(official.docs) ? official.docs : official.docs ? [official.docs] : [];
  return `# ${agent.name} · 来源与核对

> 核对日期：${agent.updatedAt}　核实版本：${agent.version}

## 官方入口

| 类型 | 地址 |
| --- | --- |
| 官网 | ${official.site || "—"} |
| 文档 | ${docs.length ? docs.join("<br />") : "—"} |
| 仓库 | ${official.repo || "—"} |
| 更新日志 | ${official.changelog || "—"} |

## 功能文档链接

| 功能 | 难度 | 官方文档 |
| --- | --- | --- |
${agent.features.map((f) => `| ${cell(f.name)} | ${cell(f.level)} | ${f.doc || "—"} |`).join("\n")}

## 核对说明

- 上述链接在 ${agent.updatedAt} 做过 HTTP 状态检查；失效链接已替换为官方当前路径。
- 教程中的命令、配置项与界面名称以官方文档为准；无法确认的细节不会写入步骤，改为指向官方页面。
- 版本迭代很快。发现内容与官方不一致时，先改 \`features.json\`，再运行 \`npm run build\`，不要直接手改生成文件。

## 自动巡检

根目录的 \`docs/sources.json\` 登记了本 Agent 的官方来源，\`npm run update\` 会抓取并比对内容哈希，变更写入 \`docs/UPDATE_LOG.md\`。
`;
}

function changelogDoc(agent) {
  const official = agent.official || {};
  return `# ${agent.name} · 版本与更新

> 当前核实版本：${agent.version}　核对日期：${agent.updatedAt}

**官方更新日志**：${official.changelog || official.repo || official.site || "—"}

## 说明

本文件不复制未逐条核实的版本历史，避免把过期或推测的条目当成事实。需要追溯具体版本时，请直接查看官方 changelog / releases。

当前基线：

- 版本：${agent.version}
- 本仓库最后核对：${agent.updatedAt}
- 功能数据：\`features.json\`（${agent.features.length} 项）
- 教程：\`README.md\`、\`features.md\`

## 每日巡检

\`npm run update\` 会检查 \`docs/sources.json\` 中登记的官方页面；若内容哈希变化，会在 \`docs/UPDATE_LOG.md\` 记录。随后按以下顺序更新：

1. 打开官方 changelog，确认影响范围；
2. 修订 \`features.json\` 中的版本、命令、步骤与链接；
3. 运行 \`npm run build\` 重新生成文档与网页数据。
`;
}

async function main() {
  const dirs = (await readdir(agentsDir, { withFileTypes: true })).filter((d) => d.isDirectory());
  let count = 0;
  for (const dir of dirs) {
    const file = path.join(agentsDir, dir.name, "features.json");
    if (!existsSync(file)) continue;
    const agent = JSON.parse(await readFile(file, "utf8"));
    await writeFile(path.join(agentsDir, dir.name, "README.md"), readme(agent), "utf8");
    await writeFile(path.join(agentsDir, dir.name, "features.md"), featuresDoc(agent), "utf8");
    await writeFile(path.join(agentsDir, dir.name, "sources.md"), sourcesDoc(agent), "utf8");
    await writeFile(path.join(agentsDir, dir.name, "changelog.md"), changelogDoc(agent), "utf8");
    count += 1;
    console.log(`✓ ${agent.name}: README.md + features.md + sources.md + changelog.md`);
  }
  console.log(`完成 ${count} 个道场文档生成`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
