# Antigravity · 来源与核对

> 核对日期：2026-11-11　核实版本：2.31.0

## 官方入口

| 类型 | 地址 |
| --- | --- |
| 官网 | https://antigravity.google |
| 文档 | https://antigravity.google/docs<br />https://codelabs.developers.google.com/getting-started-google-antigravity |
| 仓库 | — |
| 更新日志 | https://antigravity.google/docs/changelog |

## 功能文档链接

| 功能 | 难度 | 官方文档 |
| --- | --- | --- |
| Editor 内联 Agent 与差异评审 | 入门 | https://antigravity.google/docs/agent-side-panel |
| Agent Manager 异步多任务中心 | 入门 | https://antigravity.google/docs/agent/ |
| 内置 Browser 自动化验证与录屏 | 入门 | https://antigravity.google/docs/browser |
| Artifacts 结构化产物与 Walkthrough 验收 | 入门 | https://antigravity.google/docs/artifacts |
| Planning 模式 (/plan) 架构推演 | 进阶 | https://antigravity.google/docs/artifact-review |
| Unified Permission 审批策略与自主级别 | 进阶 | https://antigravity.google/docs/agent-permissions |
| 终端安全策略与 Allow/Deny 列表 | 进阶 | https://antigravity.google/docs/agent-permissions |
| 会话检查点与时光倒流 (/rewind) | 进阶 | https://antigravity.google/docs/cli/best-practices |
| VS Code / JetBrains / Zed 扩展 | 进阶 | https://antigravity.google/docs/ide/extensions/vscode/ |
| Model Context Protocol (MCP) 服务集成 | 高级 | https://antigravity.google/docs/mcp |
| 多模型无缝切换与 Thinking 深度调节 | 高级 | https://antigravity.google/docs/models |
| 多 Agent 并行执行与 Swarm 协作 | 高级 | https://antigravity.google/docs/swarm |
| 工程规则体系 (AGENTS.md / GEMINI.md / Rules) | 高级 | https://antigravity.google/docs/rules |

## 核对说明

- 上述链接在 2026-11-11 做过 HTTP 状态检查；失效链接已替换为官方当前路径。
- 教程中的命令、配置项与界面名称以官方文档为准；无法确认的细节不会写入步骤，改为指向官方页面。
- 版本迭代很快。发现内容与官方不一致时，先改 `features.json`，再运行 `npm run build`，不要直接手改生成文件。

## 自动巡检

根目录的 `docs/sources.json` 登记了本 Agent 的官方来源，`npm run update` 会抓取并比对内容哈希，变更写入 `docs/UPDATE_LOG.md`。
