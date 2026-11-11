# 五个 Agent 横向对比

> 核对日期：2026-11-11。只做定位与能力对比，具体命令以各道场笔记和官方文档为准。

## 一句话定位

| Agent | 形态 | 一句话 |
| --- | --- | --- |
| **Claude Code** | 终端 CLI + IDE/桌面/Web 多端 | 把完整 Agent 循环放进终端，靠 CLAUDE.md、Hooks、Skills、Subagents 和 MCP 长成团队工作流。 |
| **Pi** | 终端 CLI + SDK/RPC | 极简、可改造的 Agent 微核心：不预装沉重假设，用 Extension、Skill、Package 自己拼。 |
| **Codex** | CLI + IDE 扩展 + 云端 | OpenAI 的编码 Agent 家族，终端、编辑器与云端任务共用一套协作方式。 |
| **Antigravity** | Agent-first IDE + CLI | Google 的 Agent 优先工作台：Editor、Agent Manager、Browser 三面协同，强调 Artifact 验收。 |
| **DeepSeek Harness** | 插件化 CLI + Web/TUI | "Everything is a Plugin" 的开源 Agent 运行时，Profile 隔离、Patch 配置、子代理与沙箱是重点。 |

## 能力对比

| 维度 | Claude Code | Pi | Codex | Antigravity | DeepSeek Harness |
| --- | --- | --- | --- | --- | --- |
| 主界面 | 终端，另有 IDE/桌面/Web | 终端 TUI | 终端 + IDE + 云端 | 独立 IDE + CLI | 终端 TUI + 本地 Web |
| 项目规则 | CLAUDE.md / AGENTS.md | AGENTS.md、Skills | AGENTS.md | AGENTS.md / GEMINI.md、Rules | Profile 配置 + Patch |
| 扩展方式 | Hooks / Skills / Subagents / MCP / Plugins | Extensions / Skills / Packages / SDK | MCP / 自定义 prompts / SDK | MCP / Rules / Skills / Plugins | 插件、Patch、Cordis 内核 |
| 多智能体 | Subagents | 刻意不做，交给扩展 | 云端并行任务 | Agent Manager / Swarm（预览） | 子代理插件 |
| 浏览器验证 | 通过 MCP/工具扩展 | 通过扩展 | 云端/工具 | 内置 Browser + 录屏 | 通过插件 |
| 头less/CI | `claude -p`、GitHub Actions | `--print` / `--mode json` | `codex exec` | `agy -p` | `--profile headless` |
| 配置风格 | JSON + Markdown | JSON + Markdown | TOML + Markdown | IDE 设置 + 规则文件 | YAML Patch + Profile |
| 上手曲线 | 低 | 低（但扩展需 TS） | 低 | 低（IDE 直观） | 中（概念较多） |
| 最适合 | 终端原教旨主义者、团队工作流 | 想改造 Agent 的开发者 | OpenAI 生态用户、云端任务 | 喜欢可视化验收的开发者 | 平台/基础设施工程师 |

## 怎么选：给新手的建议

1. **只想立刻提高写代码效率**：先学 Claude Code 或 Codex，二者都是"装好就能用"的终端伙伴。
2. **喜欢 IDE、想看着 Agent 操作浏览器并交付验收报告**：Antigravity 的 Artifact / Walkthrough 体验最完整。
3. **想研究 Agent 内部、写自己的工具和循环**：Pi 的代码量最小、扩展边界最清晰；DeepSeek Harness 的插件/Profile 体系更适合平台化。
4. **团队协作与自动化**：Claude Code 的 Hooks + GitHub Actions、Codex 的云端任务、DeepSeek Harness 的 Headless Profile 都值得纳入 CI。

## 共同的底层能力

五个工具都在收敛到同一组概念，学会一个，迁移成本很低：

- **项目规则文件**：CLAUDE.md / AGENTS.md / GEMINI.md
- **工具调用与权限**：沙箱、Allow/Deny、审批模式
- **MCP**：把数据库、GitHub、浏览器等外部能力接进来
- **子代理/并行任务**：隔离上下文、拆分大任务
- **无头模式**：把 Agent 变成脚本里的一个命令
- **技能/扩展**：把团队 SOP 固化成可复用资产

> 网页版「Agent 新手村」把上述概念拆成了可逐项点亮的任务卡：打开 `web/index.html` 即可开始。
