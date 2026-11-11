# Codex

> OpenAI 官方终端与云端一体化自主编程 Agent
>
> **厂商**：OpenAI　**版本**：0.167.1　**核对日期**：2026-11-11

**官方文档**：[入口](https://developers.openai.com/codex/cli) · [文档 2](https://developers.openai.com/codex/configuration) · [文档 3](https://developers.openai.com/codex/features) · [文档 4](https://developers.openai.com/codex/ide) · [文档 5](https://developers.openai.com/codex/cloud)　**仓库**：[GitHub](https://github.com/openai/codex)　**更新日志**：[Changelog](https://github.com/openai/codex/releases)

---

## 适合谁

- 终端交互与自动化脚本编写
- 全仓库上下文重构与调试
- CI/CD 流水线自动化评审与补丁
- 企业级严格安全沙箱控制

## 安装与首次运行

**环境要求**

- Node.js 18+（npm 全局安装时必需）或官方独立脚本包
- Git 2.23+（推荐工作树受管环境）
- OpenAI API Key 或 ChatGPT 订阅账号（Plus / Pro / Team / Enterprise）

**步骤**

1. 安装 CLI 工具：npm install -g @openai/codex（或使用官方 curl / PowerShell 脚本）
2. 登录鉴权：运行 codex login 进行账号网页登录或设置 OPENAI_API_KEY 环境变量
3. 环境诊断：运行 codex doctor 检查本地安装、权限沙箱与 OpenAI 端点连通性
4. 首次启动：在 Git 代码仓库目录下直接运行 codex 进入终端交互 TUI

```bash
npm install -g @openai/codex
```

```bash
codex login
```

```bash
codex doctor
```

```bash
codex
```

**验证**：codex --version

## 先认路

| 概念 | 说明 |
| --- | --- |
| **Sandbox（三级沙箱模式）** | 基于操作系统机制限制 Agent 执行命令与写盘范围，包含 read-only（只读审计）、workspace-write（工作区受限写入）与 danger-full-access（完全权限）三级策略。 |
| **Approval Policy（审批策略）** | 定义 Agent 执行破坏性命令或修改外部文件时何时向人类请示，支持 on-request（模型智能判定）、never（无干预自动化）及 --approve-for-me（自动安全审计代理）。 |
| **AGENTS.md（层级指令链）** | 从全局 ~/.codex 到项目各级子目录自顶向下级联加载的行为约定规范，用于向 Agent 注入测试命令、代码风格与架构设计约束。 |
| **MCP（Model Context Protocol）** | 开放模型上下文协议，支持以 stdio 或 SSE 模式外挂本地进程与远端服务，让 Codex 拥有查询数据库、访问文档与调用私有 API 的能力。 |
| **app-server（双向守护进程协议）** | Codex 底层核心服务，基于标准双向 JSON-RPC 协议通过 stdio / WebSocket / Unix Socket 驱动 IDE 插件、桌面端与远程协同终端。 |

## 学习路径

### 阶段 1：初探终端与安全边界

掌握 Codex CLI 的快速安装、TUI 交互模式、三级沙箱隔离策略以及项目级 AGENTS.md 规范注入。

**涉及功能**：[交互式 TUI 与终端工作流](features.md#codex-tui) · [审批模式与三级安全沙箱](features.md#approval-sandbox) · [AGENTS.md 项目规范与上下文注入](features.md#agents-md) · [codex doctor 环境健康诊断](features.md#codex-doctor)

### 阶段 2：非交互自动化与工程化提效

利用 codex exec 编写批处理任务，执行自动化多模式代码审查，持久化并分支管理历史会话，统一团队 config.toml 与 MCP 外部工具。

**涉及功能**：[codex exec 非交互自动化批处理](features.md#codex-exec) · [代码智能审查（codex review & /review）](features.md#codex-review) · [会话持久化、恢复与分叉（resume & fork）](features.md#session-resume-fork) · [分层配置与环境策略（config.toml & Profiles）](features.md#config-toml) · [MCP 协议与外部工具挂载](features.md#mcp-integration)

### 阶段 3：跨端集成与架构扩展

结合 VS Code 官方 IDE 插件、Codex Cloud 云端任务托管与 GitHub Action CI/CD 流水线，深入底层 JSON-RPC app-server 协议与技能插件体系。

**涉及功能**：[VS Code / Cursor 官方 IDE 扩展](features.md#ide-extension) · [Codex Cloud 与 GitHub CI/CD 集成](features.md#codex-cloud-github) · [Headless 双向 JSON-RPC app-server 协议](features.md#app-server-protocol) · [Skills 机制与插件生态（SKILL.md & Plugin）](features.md#skills-plugins)

## 功能总表

| 功能 | 难度 | 热度 | 分类 | 一句话 |
| --- | --- | --- | --- | --- |
| [交互式 TUI 与终端工作流](features.md#codex-tui) | 入门 | 95 | 基础交互 | 基于终端的全功能交互界面，支持多轮对话、实时流式输出、Diff 预览与快捷斜杠命令 |
| [审批模式与三级安全沙箱](features.md#approval-sandbox) | 入门 | 94 | 安全性 | 严格的操作系统级运行边界，提供只读、工作区写入和完全权限三级沙箱，与智能审批策略协同防护 |
| [AGENTS.md 项目规范与上下文注入](features.md#agents-md) | 入门 | 93 | 上下文规范 | 基于 Markdown 的级联行为规范文件，让 Codex 在执行任何任务前自动对齐项目团队约定与测试要求 |
| [codex doctor 环境健康诊断](features.md#codex-doctor) | 入门 | 82 | 工程化诊断 | 一键排查本地运行环境、配置文件语法、鉴权凭据有效性与网络/WebSocket 连通性 |
| [codex exec 非交互自动化批处理](features.md#codex-exec) | 进阶 | 96 | 自动化工作流 | Headless 非交互命令行模式，直接在脚本、Git 钩子和 CI/CD 流程中执行指令并产出代码补丁 |
| [代码智能审查（codex review & /review）](features.md#codex-review) | 进阶 | 91 | 代码质量 | 专为代码审查定制的功能，可针对未暂存改动、指定分支对比或特定 Commit 进行全面安全与性能评审 |
| [会话持久化、恢复与分叉（resume & fork）](features.md#session-resume-fork) | 进阶 | 88 | 会话管理 | 会话自动存档于本地 JSONL，支持一键继续近期会话、历史列表筛选以及分叉探索不同重构方案 |
| [分层配置与环境策略（config.toml & Profiles）](features.md#config-toml) | 进阶 | 87 | 环境配置 | 遵循清晰优先级的 TOML 配置文件体系，支持项目级定制、命名 Profile 分组与命令行一键覆写 |
| [MCP 协议与外部工具挂载](features.md#mcp-integration) | 进阶 | 90 | 扩展协议 | 深度支持 Model Context Protocol（MCP），通过 stdio 或 SSE 模式扩展数据库查询、文档检索等外部能力 |
| [VS Code / Cursor 官方 IDE 扩展](features.md#ide-extension) | 高级 | 92 | 开发集成 | 将 Codex Agent 深度内嵌在编辑器侧边栏，支持行内代码 Diff、@file 引用、检查点与云端委托 |
| [Codex Cloud 与 GitHub CI/CD 集成](features.md#codex-cloud-github) | 高级 | 94 | 云端与CI/CD | 支持在云端托管长时编程任务，结合 openai/codex-action 在 GitHub PR 中实现自动化审查与修复流水线 |
| [Headless 双向 JSON-RPC app-server 协议](features.md#app-server-protocol) | 高级 | 86 | 架构与协议 | 解耦的 Agent 后端守护进程，支持基于 stdio、WebSocket 及 Unix Socket 的双向事件流与远程控制 |
| [Skills 机制与插件生态（SKILL.md & Plugin）](features.md#skills-plugins) | 高级 | 85 | 生态扩展 | 用 .agents/skills/<name>/SKILL.md 封装可复用技能，并用 codex plugin 管理插件包。 |

> 每个功能的手把手步骤、可复制命令与常见坑，见 [features.md](features.md)。

## 官方入口

- 官网：[https://developers.openai.com/codex/](https://developers.openai.com/codex/)
- 文档：[https://developers.openai.com/codex/cli](https://developers.openai.com/codex/cli) · [https://developers.openai.com/codex/configuration](https://developers.openai.com/codex/configuration) · [https://developers.openai.com/codex/features](https://developers.openai.com/codex/features) · [https://developers.openai.com/codex/ide](https://developers.openai.com/codex/ide) · [https://developers.openai.com/codex/cloud](https://developers.openai.com/codex/cloud)
- 仓库：[https://github.com/openai/codex](https://github.com/openai/codex)
- 更新日志：[https://github.com/openai/codex/releases](https://github.com/openai/codex/releases)
- 来源与核对记录：[sources.md](sources.md)
- 近期版本变化：[changelog.md](changelog.md)

## 维护说明

本页由 `scripts/render-docs.mjs` 根据 `features.json` 生成，请勿手改。更新流程：

1. 运行 `npm run update` 检查官方文档/仓库是否有变更；
2. 依据变更修改 `features.json`（版本、命令、步骤、链接）；
3. 运行 `npm run build`，同步刷新 `README.md`、`features.md` 与网页数据。

> 内容来自公开官方资料，仅供学习。版本迭代很快，动手前请以官方最新文档为准。
