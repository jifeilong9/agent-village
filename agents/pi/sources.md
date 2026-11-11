# Pi · 来源与核对

> 核对日期：2026-11-11　核实版本：1.5.2

## 官方入口

| 类型 | 地址 |
| --- | --- |
| 官网 | https://pi.dev |
| 文档 | https://github.com/earendil-works/pi/tree/main/packages/coding-agent/docs<br />https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent/docs |
| 仓库 | https://github.com/badlogic/pi-mono |
| 更新日志 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/CHANGELOG.md |

## 功能文档链接

| 功能 | 难度 | 官方文档 |
| --- | --- | --- |
| 交互式 TUI 与人机协同控制 | 入门 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md |
| @ 文件检索与 Tab 路径补全 | 入门 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md#enter-a-prompt |
| 多模型即时切换与 Thinking 深度调节 | 入门 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/models.md |
| 会话树形回溯与安全分支 | 入门 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sessions.md |
| Windows 与 Git Bash 运行环境适配 | 进阶 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/windows.md |
| 提示词模板（Prompt Templates） | 进阶 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/prompt-templates.md |
| Agent 技能机制（Skills） | 进阶 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md |
| TypeScript 扩展系统（Extensions） | 进阶 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md |
| 自适应终端主题（Themes） | 进阶 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/themes.md |
| Pi Packages 资源包生态 | 进阶 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md |
| 项目信任与安全沙箱机制 | 进阶 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md |
| CLI Print 与 JSON 自动化事件流模式 | 高级 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/cli.md |
| RPC 进程间控制协议 | 高级 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md |
| 嵌入式 TypeScript SDK | 高级 | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sdk.md |

## 核对说明

- 上述链接在 2026-11-11 做过 HTTP 状态检查；失效链接已替换为官方当前路径。
- 教程中的命令、配置项与界面名称以官方文档为准；无法确认的细节不会写入步骤，改为指向官方页面。
- 版本迭代很快。发现内容与官方不一致时，先改 `features.json`，再运行 `npm run build`，不要直接手改生成文件。

## 自动巡检

根目录的 `docs/sources.json` 登记了本 Agent 的官方来源，`npm run update` 会抓取并比对内容哈希，变更写入 `docs/UPDATE_LOG.md`。
