# Claude Code · 来源与核对

> 核对日期：2026-11-11　核实版本：2.1.322

## 官方入口

| 类型 | 地址 |
| --- | --- |
| 官网 | https://code.claude.com/docs/en/overview |
| 文档 | https://docs.claude.com/en/docs/claude-code/overview |
| 仓库 | https://github.com/anthropics/claude-code |
| 更新日志 | https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md |

## 功能文档链接

| 功能 | 难度 | 官方文档 |
| --- | --- | --- |
| 斜杠命令与会话交互 | 入门 | https://docs.claude.com/en/docs/claude-code/quickstart#session-commands |
| CLAUDE.md 与项目记忆体系 | 入门 | https://docs.claude.com/en/docs/claude-code/memory |
| Plan Mode 架构规划模式 | 入门 | https://docs.claude.com/en/docs/claude-code/permission-modes |
| Headless 模式与 Unix 管道 | 入门 | https://docs.claude.com/en/docs/claude-code/cli-reference |
| Checkpoints 快照与 /rewind 时光机 | 进阶 | https://docs.claude.com/en/docs/claude-code/sessions#manage-context-within-a-session |
| Skills 自定义能力与动态上下文 | 进阶 | https://docs.claude.com/en/docs/claude-code/skills |
| MCP (Model Context Protocol) 工具协议集成 | 进阶 | https://docs.claude.com/en/docs/claude-code/mcp |
| Hooks 生命周期事件钩子 | 进阶 | https://docs.claude.com/en/docs/claude-code/hooks |
| 多级权限与安全控制体系 | 进阶 | https://docs.claude.com/en/docs/claude-code/permission-modes |
| GitHub Actions CI/CD 与 @claude 协作 | 进阶 | https://docs.claude.com/en/docs/claude-code/github-actions |
| Subagents 专业子智能体分工 | 高级 | https://docs.claude.com/en/docs/claude-code/sub-agents |
| Agent SDK 编程式智能体开发 | 高级 | https://docs.claude.com/en/docs/claude-code/agent-sdk/overview |
| Remote Control 与 Teleport 跨端接力 | 高级 | https://docs.claude.com/en/docs/claude-code/remote-control |

## 核对说明

- 上述链接在 2026-11-11 做过 HTTP 状态检查；失效链接已替换为官方当前路径。
- 教程中的命令、配置项与界面名称以官方文档为准；无法确认的细节不会写入步骤，改为指向官方页面。
- 版本迭代很快。发现内容与官方不一致时，先改 `features.json`，再运行 `npm run build`，不要直接手改生成文件。

## 自动巡检

根目录的 `docs/sources.json` 登记了本 Agent 的官方来源，`npm run update` 会抓取并比对内容哈希，变更写入 `docs/UPDATE_LOG.md`。
