# Agent 新手村 · Agent Village

> 一个持续跟踪主流 Agent 编程工具的研究 + 教学项目：读官方文档、拆仓库、写教程，自动编排课程，最后做成一个"新手村"式的交互教学网页。

**在线预览**：https://jifeilong9.github.io/agent-village/

## 村里有谁

| 导师 | 厂商 | 类型 | 官方入口 |
| --- | --- | --- | --- |
| [Claude Code](agents/claude-code/) | Anthropic | 终端 Agent / CLI | [code.claude.com/docs](https://code.claude.com/docs/en/overview) |
| [Pi](agents/pi/) | Earendil Works (badlogic) | 极简可扩展 Agent Harness | [pi.dev](https://pi.dev) |
| [Codex](agents/codex/) | OpenAI | 终端 / IDE Agent | [github.com/openai/codex](https://github.com/openai/codex) |
| [Antigravity](agents/antigravity/) | Google | Agent-first IDE | [antigravity.google](https://antigravity.google) |
| [DeepSeek Harness](agents/deepseek-harness/) | DeepSeek | 插件化 Agent Harness (`dsh`) | [deepseek.com/harness](https://www.deepseek.com/en/harness/) |

## 目录结构

```
agents/<slug>/          每个 Agent 一个文件夹
  README.md             概览 / 安装 / 核心概念 / 课程表
  features.md           功能详解 + 手把手教程
  course.md             自动生成的课程：模块 / 课时 / 练习 / 检查点
  features.json         结构化功能数据（唯一事实源）
  sources.md            来源与核对记录
  changelog.md          版本基线与官方入口
docs/
  sources.json          官方文档 / 仓库清单（定时更新依据）
  comparison.md         横向对比：五者定位、能力、选型建议
  learning-path.md      新手村四周通关路线
  UPDATE_LOG.md         自动更新记录
web/
  index.html            新手村教学页（纯静态，可直接打开）
  assets/               样式与交互
  data/agents.js        由 scripts/build-data.mjs 生成
scripts/
  lib/course.mjs        课程编排器：learningPath + features → 模块/课时/练习/检查点
  render-docs.mjs       由 features.json 生成 README / features / course / sources / changelog
  build-data.mjs        汇总 features.json → 站点数据（含课程结构）
  update-docs.mjs       检查官方文档 / 仓库变更
  serve.mjs             本地预览服务器
```

## 使用

```bash
npm run build     # 生成文档 + 课程 + 站点数据（推荐每次改完 JSON 运行）
npm run docs      # 只重新生成 README / features.md / course.md / sources.md / changelog.md
npm run serve     # 打开 http://localhost:4321
npm run update    # 检查官方文档 / 仓库是否有更新，写入 UPDATE_LOG
```

网页也可以直接双击 `web/index.html` 打开（数据已内联为 JS 文件，无需服务器）。

先读 [横向对比](docs/comparison.md) 选一位导师，再按 [四周通关路线](docs/learning-path.md) 开始；网页里的「修炼榜」会自动列出热门功能与新功能。

## 更新机制

- **单一数据源**：`agents/<slug>/features.json` 是唯一事实源；`README.md`、`features.md`、`sources.md`、`changelog.md` 与网页数据都由脚本生成，避免文档漂移。
- `docs/sources.json` 维护每个 Agent 的官方文档、仓库、changelog 地址。
- `npm run update` 会抓取每个来源，比较内容哈希，发生变化时写入 `docs/UPDATE_LOG.md` 与 `docs/updates/<日期>.json`。
- `.github/workflows/update-docs.yml` 每天自动运行并提交变更（仓库推送到 GitHub 后生效）。
- 每次更新后，依据 `UPDATE_LOG.md` 与官方 changelog 修订 `features.json`，再 `npm run build`。

## 课程怎么生成

课程不是另写一份内容，而是从同一份 `features.json` 编排出来：

1. `learningPath` 决定模块顺序与分组；
2. 每个功能按难度估算课时（入门 15 分钟、进阶 25 分钟、高级 40 分钟）；
3. 每个功能自动生成目标、练习（取第一条可执行步骤）、检查点（取常见坑）和官方文档链接；
4. 未被 learningPath 覆盖的功能，自动补成「补充修炼」选修模块。

产物有两份：`agents/<slug>/course.md`（可打印/可审阅）和网页里的「课程表」（带进度、继续学习、逐节点亮）。

> 这是模板化、可复现的课程编排，不会凭空编造命令或新知识点；如果你想让模型基于官方文档扩写讲解，需要再接一个 LLM 生成步骤（见下方「下一步」）。

## 数据规范（features.json）

每个 Agent 的 `features.json` 至少包含：

```json
{
  "slug": "claude-code",
  "name": "Claude Code",
  "vendor": "Anthropic",
  "tagline": "一句话定位",
  "version": "核对到的版本",
  "updatedAt": "2026-11-11",
  "official": { "site": "", "docs": [], "repo": "", "changelog": "" },
  "stats": { "popularity": 0, "learningCurve": 1, "bestFor": [] },
  "features": [
    {
      "id": "unique-id",
      "name": "功能名",
      "category": "分类",
      "level": "入门|进阶|高级",
      "hot": 0,
      "isNew": false,
      "releasedAt": "YYYY-MM-DD",
      "summary": "一句话说明",
      "why": "为什么值得学",
      "steps": ["步骤 1", "步骤 2"],
      "commands": ["可复制命令"],
      "pitfalls": "常见坑",
      "doc": "官方文档链接",
      "tags": []
    }
  ]
}
```

## 下一步（可选）

- 接入 LLM/Agent 课程扩写：用 `features.json` 的课程骨架作为输入，让模型补充分步讲解、示例与测验，再由人工核对后写回。
- 增加测验与结业证书：课程模块已有检查点，可扩展成选择题/实操题。
- 增加更多 Agent 道场与版本对比。

## 免责声明

本项目为学习研究用途，内容来自公开官方文档与仓库；版本迭代很快，动手前请以官方最新文档为准。
