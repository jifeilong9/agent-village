# DeepSeek Harness

> 基于 Cordis 的全插件化 AI Agent 运行时
>
> **厂商**：DeepSeek　**版本**：0.2.2-rc.1　**核对日期**：2026-11-11

**官方文档**：[入口](https://deepseek-harness.github.io/deepseek-harness/)　**仓库**：[GitHub](https://github.com/deepseek-ai/deepseek-harness)　**更新日志**：[Changelog](https://github.com/deepseek-ai/deepseek-harness/releases)

---

## 适合谁

- 追求高扩展性与插件化架构的 AI 开发者
- 需要多 Profile 隔离与 CI/CD 自动化的工程团队
- 探索 Router-Worker 多 Agent 协同的高级系统工程师

## 安装与首次运行

**环境要求**

- Node.js >= 20.0.0
- pnpm >= 9.0.0 (推荐) 或 npm
- DeepSeek API Key 或兼容模型密钥

**步骤**

1. 安装 @deepseek-ai/dsh 命令行工具（或使用 npx 免安装运行）
2. 设置环境变量 DEEPSEEK_API_KEY 或在 Web UI 设置中输入密钥
3. 执行 dsh web 启动本地控制台；终端 TUI 需先安装 turtle-ui 插件，再运行 dsh --profile tui

```bash
npm install -g @deepseek-ai/dsh
```

```bash
export DEEPSEEK_API_KEY="sk-your-key-here"
```

```bash
dsh web
```

**验证**：dsh --version

## 先认路

| 概念 | 说明 |
| --- | --- |
| **Everything is a Plugin** | DeepSeek Harness 的核心设计哲学：不仅工具是插件，模型适配器、会话存储、Agent Loop 和用户界面全都是可热插拔的插件。 |
| **Cordis 微内核** | 底层依赖的时空可组合微内核架构，提供依赖注入（inject）、事件总线与生命周期副作用自动回收管理。 |
| **Profile（运行档案）** | 位于 $DSH_HOME/profiles/<name> 的独立环境隔离区，包含专属的插件集、配置覆盖与依赖锁定文件。 |
| **Patch Layer（补丁层）** | 基于 cordis.patch.yml 的声明式配置层叠机制，支持全局、Profile 级与运行时 CLI 补丁的有序覆盖与替换。 |
| **Session Persistence** | 基于事件溯源的会话持久化后端，通过 JSONL/SQLite 与 zstd 压缩记录所有推理与工具调用轨迹。 |

## 课程表

共 3 个模块、14 节课，预计 355 分钟。

### 模块 1：快速上手与日常交互

掌握 CLI 快速安装、Web UI 交互控制台、TUI 终端模式以及模型密钥的基础配置。

> 4 节课 · 约 60 分钟

**课程**：[CLI 快速启动与零安装运行](features.md#dsh-cli-quickstart) · [Web UI 交互式控制台](features.md#dsh-web-ui) · [模型与 Provider 密钥配置](features.md#dsh-model-provider) · [TUI 终端全屏交互模式](features.md#dsh-tui-mode)

**检查点**：完成「TUI 终端全屏交互模式」，并能在自己的项目里独立复现。

### 模块 2：环境管理与工程自动化

学习 Profile 多环境隔离、声明式 Patch 层、Headless 任务执行以及插件安装与 MCP 协议集成。

> 6 节课 · 约 150 分钟

**课程**：[Headless 任务与 CI/CD 自动化](features.md#dsh-headless-automation) · [Profile 多环境隔离机制](features.md#dsh-profiles-management) · [声明式 Patch 配置层与转储](features.md#dsh-cordis-patch-layer) · [插件包管理系统 (dsh plugin)](features.md#dsh-plugin-cli) · [MCP Client 协议桥接](features.md#dsh-mcp-client) · [会话持久化与 zstd 压缩存储](features.md#dsh-session-persistence)

**检查点**：完成「会话持久化与 zstd 压缩存储」，并能在自己的项目里独立复现。

### 模块 3：内核定制、安全沙箱与多 Agent 编排

深入 Cordis 插件编写、Profile 救援、沙箱权限与子代理协同。

> 4 节课 · 约 145 分钟

**课程**：[Profile 救援与配置恢复 (dsh rescue)](features.md#dsh-context-rescue) · [沙箱与权限模式](features.md#dsh-sandboxing-security) · [自定义插件开发 (apply 与依赖注入)](features.md#dsh-custom-plugin-dev) · [子代理协同（Codex / Claude Code Subagents）](features.md#dsh-multi-agent-teams)

**检查点**：完成「子代理协同（Codex / Claude Code Subagents）」，并能在自己的项目里独立复现。

> 完整课程（含每节练习与检查点）见 [course.md](course.md)。

## 功能总表

| 功能 | 难度 | 热度 | 分类 | 一句话 |
| --- | --- | --- | --- | --- |
| [CLI 快速启动与零安装运行](features.md#dsh-cli-quickstart) | 入门 | 95 | 基础环境 | 通过 npx 或全局 npm 快速启动 DeepSeek Harness 运行时与基础环境检查。 |
| [Web UI 交互式控制台](features.md#dsh-web-ui) | 入门 | 96 | 用户界面 | 启动轻量级本地 Web 仪表盘（默认端口 3080），直观管理多轮会话、模型调用与可视化面板。 |
| [模型与 Provider 密钥配置](features.md#dsh-model-provider) | 入门 | 98 | 模型路由 | 配置官方 deepseek-official 路由或第三方兼容模型，通过安全凭据文件与环境变量注入 API Key。 |
| [TUI 终端全屏交互模式](features.md#dsh-tui-mode) | 入门 | 82 | 终端交互 | 在终端内运行功能齐备的交互式 TUI 界面，支持快捷键切换面板与流式高亮输出。 |
| [Headless 任务与 CI/CD 自动化](features.md#dsh-headless-automation) | 进阶 | 92 | 脚本自动化 | 通过 headless Profile 单次触发、打印最终结果并返回进程状态码，适合脚本与 CI。 |
| [Profile 多环境隔离机制](features.md#dsh-profiles-management) | 进阶 | 90 | 架构核心 | 基于 $DSH_HOME/profiles/ 目录的隔离架构，实现多任务、多配置间的独立依赖与插件环境。 |
| [声明式 Patch 配置层与转储](features.md#dsh-cordis-patch-layer) | 进阶 | 89 | 配置系统 | 基于 cordis.patch.yml 的原子替换与层叠机制，搭配 --dump-config 输出最终有效配置树。 |
| [插件包管理系统 (dsh plugin)](features.md#dsh-plugin-cli) | 进阶 | 94 | 扩展生态 | 利用 dsh plugin --profile <name> add/remove 自动化安装与卸载特定 Profile 的插件包。 |
| [MCP Client 协议桥接](features.md#dsh-mcp-client) | 进阶 | 93 | 协议集成 | CLI 自带 MCP client 依赖，但默认不启用任何 MCP server；通过 Profile 的 patch 层显式接入。 |
| [会话持久化与 zstd 压缩存储](features.md#dsh-session-persistence) | 进阶 | 88 | 会话机制 | 基于事件溯源的会话持久化，默认以 session.v3.jsonl.zstd 记录推理与工具调用轨迹。 |
| [Profile 救援与配置恢复 (dsh rescue)](features.md#dsh-context-rescue) | 进阶 | 90 | 配置系统 | 当 Profile 配置损坏或无法启动时，用 dsh rescue 从默认模板恢复一个可启动环境。 |
| [沙箱与权限模式](features.md#dsh-sandboxing-security) | 高级 | 91 | 安全沙箱 | 基于 bwrap / Landlock / Seatbelt 的进程沙箱与 workspace-write 权限预设，限制 Bash 与文件写入范围。 |
| [自定义插件开发 (apply 与依赖注入)](features.md#dsh-custom-plugin-dev) | 高级 | 95 | 架构核心 | 基于 Cordis 微内核编写 TypeScript 插件，利用 inject 声明服务依赖并通过 apply(ctx) 扩展核心能力。 |
| [子代理协同（Codex / Claude Code Subagents）](features.md#dsh-multi-agent-teams) | 高级 | 96 | 协作编排 | 通过官方 subagent 插件把 Codex 或 Claude Code 作为子代理接入 Harness。 |

> 每个功能的手把手步骤、可复制命令与常见坑，见 [features.md](features.md)。

## 官方入口

- 官网：[https://www.deepseek.com/en/harness/](https://www.deepseek.com/en/harness/)
- 文档：[https://deepseek-harness.github.io/deepseek-harness/](https://deepseek-harness.github.io/deepseek-harness/)
- 仓库：[https://github.com/deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)
- 更新日志：[https://github.com/deepseek-ai/deepseek-harness/releases](https://github.com/deepseek-ai/deepseek-harness/releases)
- 来源与核对记录：[sources.md](sources.md)
- 近期版本变化：[changelog.md](changelog.md)

## 维护说明

本页由 `scripts/render-docs.mjs` 根据 `features.json` 生成，请勿手改。更新流程：

1. 运行 `npm run update` 检查官方文档/仓库是否有变更；
2. 依据变更修改 `features.json`（版本、命令、步骤、链接）；
3. 运行 `npm run build`，同步刷新 `README.md`、`features.md` 与网页数据。

> 内容来自公开官方资料，仅供学习。版本迭代很快，动手前请以官方最新文档为准。
