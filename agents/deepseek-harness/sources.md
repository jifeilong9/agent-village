# DeepSeek Harness · 来源与核对

> 核对日期：2026-11-11　核实版本：0.2.2-rc.1

## 官方入口

| 类型 | 地址 |
| --- | --- |
| 官网 | https://www.deepseek.com/en/harness/ |
| 文档 | https://deepseek-harness.github.io/deepseek-harness/ |
| 仓库 | https://github.com/deepseek-ai/deepseek-harness |
| 更新日志 | https://github.com/deepseek-ai/deepseek-harness/releases |

## 功能文档链接

| 功能 | 难度 | 官方文档 |
| --- | --- | --- |
| CLI 快速启动与零安装运行 | 入门 | https://deepseek-harness.github.io/deepseek-harness/ |
| Web UI 交互式控制台 | 入门 | https://deepseek-harness.github.io/deepseek-harness/ |
| 模型与 Provider 密钥配置 | 入门 | https://api-docs.deepseek.com/guides/harness |
| TUI 终端全屏交互模式 | 入门 | https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md |
| Headless 任务与 CI/CD 自动化 | 进阶 | https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md |
| Profile 多环境隔离机制 | 进阶 | https://deepseek-harness.github.io/deepseek-harness/ |
| 声明式 Patch 配置层与转储 | 进阶 | https://deepseek-harness.github.io/deepseek-harness/ |
| 插件包管理系统 (dsh plugin) | 进阶 | https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md |
| MCP Client 协议桥接 | 进阶 | https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md |
| 会话持久化与 zstd 压缩存储 | 进阶 | https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md |
| Profile 救援与配置恢复 (dsh rescue) | 进阶 | https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md |
| 沙箱与权限模式 | 高级 | https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md |
| 自定义插件开发 (apply 与依赖注入) | 高级 | https://deepseek-harness.github.io/deepseek-harness/ |
| 子代理协同（Codex / Claude Code Subagents） | 高级 | https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md |

## 核对说明

- 上述链接在 2026-11-11 做过 HTTP 状态检查；失效链接已替换为官方当前路径。
- 教程中的命令、配置项与界面名称以官方文档为准；无法确认的细节不会写入步骤，改为指向官方页面。
- 版本迭代很快。发现内容与官方不一致时，先改 `features.json`，再运行 `npm run build`，不要直接手改生成文件。

## 自动巡检

根目录的 `docs/sources.json` 登记了本 Agent 的官方来源，`npm run update` 会抓取并比对内容哈希，变更写入 `docs/UPDATE_LOG.md`。
