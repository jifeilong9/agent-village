# Codex · 来源与核对

> 核对日期：2026-11-11　核实版本：0.167.1

## 官方入口

| 类型 | 地址 |
| --- | --- |
| 官网 | https://developers.openai.com/codex/ |
| 文档 | https://developers.openai.com/codex/cli<br />https://developers.openai.com/codex/configuration<br />https://developers.openai.com/codex/features<br />https://developers.openai.com/codex/ide<br />https://developers.openai.com/codex/cloud |
| 仓库 | https://github.com/openai/codex |
| 更新日志 | https://github.com/openai/codex/releases |

## 功能文档链接

| 功能 | 难度 | 官方文档 |
| --- | --- | --- |
| 交互式 TUI 与终端工作流 | 入门 | https://developers.openai.com/codex/cli |
| 审批模式与三级安全沙箱 | 入门 | https://developers.openai.com/codex/permission-modes |
| AGENTS.md 项目规范与上下文注入 | 入门 | https://developers.openai.com/codex/agent-configuration/agents-md |
| codex doctor 环境健康诊断 | 入门 | https://developers.openai.com/codex/reference/commands |
| codex exec 非交互自动化批处理 | 进阶 | https://developers.openai.com/codex/cli |
| 代码智能审查（codex review & /review） | 进阶 | https://developers.openai.com/codex/code-review |
| 会话持久化、恢复与分叉（resume & fork） | 进阶 | https://developers.openai.com/codex/cli |
| 分层配置与环境策略（config.toml & Profiles） | 进阶 | https://developers.openai.com/codex/config-file/config-basic |
| MCP 协议与外部工具挂载 | 进阶 | https://developers.openai.com/codex/extend/mcp |
| VS Code / Cursor 官方 IDE 扩展 | 高级 | https://developers.openai.com/codex/ide |
| Codex Cloud 与 GitHub CI/CD 集成 | 高级 | https://developers.openai.com/codex/cloud |
| Headless 双向 JSON-RPC app-server 协议 | 高级 | https://developers.openai.com/codex/developers |
| Skills 机制与插件生态（SKILL.md & Plugin） | 高级 | https://developers.openai.com/codex/build-skills |

## 核对说明

- 上述链接在 2026-11-11 做过 HTTP 状态检查；失效链接已替换为官方当前路径。
- 教程中的命令、配置项与界面名称以官方文档为准；无法确认的细节不会写入步骤，改为指向官方页面。
- 版本迭代很快。发现内容与官方不一致时，先改 `features.json`，再运行 `npm run build`，不要直接手改生成文件。

## 自动巡检

根目录的 `docs/sources.json` 登记了本 Agent 的官方来源，`npm run update` 会抓取并比对内容哈希，变更写入 `docs/UPDATE_LOG.md`。
