# Antigravity

> Google 官方 Agent-first 智能开发环境
>
> **厂商**：Google　**版本**：2.31.0　**核对日期**：2026-11-11

**官方文档**：[入口](https://antigravity.google/docs) · [文档 2](https://codelabs.developers.google.com/getting-started-google-antigravity)　**更新日志**：[Changelog](https://antigravity.google/docs/changelog)

---

## 适合谁

- 全栈代码开发与多文件协同
- 后台长任务并行调度与重构
- 自主端到端 Web 自动化验证
- 工程级规范与多智能体 Swarm 协同

## 安装与首次运行

**环境要求**

- macOS 12+ (Apple Silicon / Intel)、Windows 10+ (64-bit) 或 Linux (x86_64 / arm64)
- Google 个人账号（免费额度）或 Google Cloud 企业账号（Gemini Enterprise / WIF 单点登录）
- Node.js 18+ 或 Python 3.10+（开发环境可选但建议具备）

**步骤**

1. 下载并安装 Antigravity App（macOS / Windows / Linux），用 Google 账号登录
2. 如需终端使用，安装 CLI：macOS/Linux 用 curl 安装脚本，Windows 用 PowerShell 脚本
3. 运行 agy --version 验证；首次启动按提示完成颜色方案与工作区信任设置
4. 在 Editor、Agent Manager 或终端中打开项目

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

```bash
irm https://antigravity.google/cli/install.ps1 | iex
```

```bash
agy --version
```

**验证**：agy --version 打印 v2.31.0；桌面端左侧可见 Agent Manager、Editor、Browser 入口。

## 先认路

| 概念 | 说明 |
| --- | --- |
| **Agent** | 具备上下文感知、推理规划、工具调用（读写文件/终端/浏览器）及自我纠错能力的自主智能体。 |
| **Agent Manager** | Antigravity 的异步指挥中心，支持同时派发、调度、监控多个在独立分支或沙箱中运行的后台 Agent。 |
| **Editor** | 以 Agent 协作为核心的代码编辑器，支持内联自然语言指令、代码补全与可视化的单行/多文件变更审查（Diff Review）。 |
| **Browser** | Agent 内置的无头/有头受控浏览器工具，能够自动启动本地开发服务、模拟点击输入、检查控制台报错并截取验收图证。 |
| **Artifact** | Agent 执行过程中产出的结构化、可复用、可交互的里程碑产物（如任务规划书、执行计划、架构决策记录等）。 |
| **Walkthrough** | Agent 完成任务后自动生成的富文本验收交付物，包含改动概述、测试执行结果、Git Diff 与浏览器操作录屏/截图。 |
| **Planning Mode** | 先规划后动手的防御性推演模式（/plan），在触碰文件前充分分析调用链、分解子任务并等待人类审批确认。 |
| **Unified Permission Engine** | 采用 Deny > Ask > Allow 严格优先级和四档预设（Request Review/Default/Auto/Turbo）的安全权限决策系统。 |
| **MCP (Model Context Protocol)** | 开放模型上下文协议，用于无缝桥接数据库（PostgreSQL/Supabase）、GitHub、Chrome DevTools 及第三方开发者服务。 |
| **Rules（规则文件）** | 通过 AGENTS.md / GEMINI.md 与 .agents/rules/*.md 注入长期工程规则，支持 trigger / globs 控制生效范围。 |

## 学习路径

### 阶段 1：初识 Agent-first 界面与核心协同

熟悉 Editor、Agent Manager 与 Browser 三大工作面，掌握内联编程、任务派发与产物验收流程

**涉及功能**：[Editor 内联 Agent 与差异评审](features.md#ag-editor-inline) · [Agent Manager 异步多任务中心](features.md#ag-agent-manager) · [内置 Browser 自动化验证与录屏](features.md#ag-browser-testing) · [Artifacts 结构化产物与 Walkthrough 验收](features.md#ag-artifacts)

### 阶段 2：掌控推演规划与自主执行安全

从单步生成进阶到先规划后实施，掌握 Planning 模式、权限预设档位与命令回滚机制

**涉及功能**：[Planning 模式 (/plan) 架构推演](features.md#ag-planning-mode) · [Unified Permission 审批策略与自主级别](features.md#ag-permission-engine) · [终端安全策略与 Allow/Deny 列表](features.md#ag-allow-deny-policy) · [会话检查点与时光倒流 (/rewind)](features.md#ag-checkpoints-rewind) · [VS Code / JetBrains / Zed 扩展](features.md#ag-vscode-extension)

### 阶段 3：架构进阶：工程定制与智能体集群

通过 MCP 接入外部生态，利用 Swarm 组织多 Agent 分工协同，沉淀团队 Rules 与工作流知识。

**涉及功能**：[Model Context Protocol (MCP) 服务集成](features.md#ag-mcp-integration) · [多模型无缝切换与 Thinking 深度调节](features.md#ag-model-selection) · [多 Agent 并行执行与 Swarm 协作](features.md#ag-multi-agent-swarm) · [工程规则体系 (AGENTS.md / GEMINI.md / Rules)](features.md#ag-rules-and-skills)

## 功能总表

| 功能 | 难度 | 热度 | 分类 | 一句话 |
| --- | --- | --- | --- | --- |
| [Editor 内联 Agent 与差异评审](features.md#ag-editor-inline) | 入门 | 96 | 编辑器协同 | 在代码编辑区直接呼出 Agent 进行自然语言重构、补全与单文件/多文件行内 Diff 交互审查。 |
| [Agent Manager 异步多任务中心](features.md#ag-agent-manager) | 入门 | 98 | 调度中心 | 集中的异步 Agent 指挥看板，支持同时派发、排队与监控多个后台编程任务。 |
| [内置 Browser 自动化验证与录屏](features.md#ag-browser-testing) | 入门 | 93 | 自动化验证 | Agent 自带沙箱受控浏览器，能自动启动本地 Web 服务、模拟页面交互操作并生成验收截图与录屏。 |
| [Artifacts 结构化产物与 Walkthrough 验收](features.md#ag-artifacts) | 入门 | 95 | 评审交付 | Agent 阶段性沉淀的富文本结构化产物，并在任务完成后自动生成整合测试与视觉证明的 Walkthrough。 |
| [Planning 模式 (/plan) 架构推演](features.md#ag-planning-mode) | 进阶 | 94 | 任务规划 | 只读推演工作流：在触碰任何代码文件前，完整扫描依赖拓扑、分解子任务并输出实施蓝图。 |
| [Unified Permission 审批策略与自主级别](features.md#ag-permission-engine) | 进阶 | 91 | 安全与权限 | 基于 Deny > Ask > Allow 判定链的统一权限引擎，提供四档可切换的自主运行策略预设。 |
| [终端安全策略与 Allow/Deny 列表](features.md#ag-allow-deny-policy) | 进阶 | 89 | 终端与执行 | 在 OS 级轻量沙箱中隔离运行终端命令，支持基于正则与工具名精准维护命令白名单与黑名单。 |
| [会话检查点与时光倒流 (/rewind)](features.md#ag-checkpoints-rewind) | 进阶 | 90 | 状态管理 | 自动为会话轮次与代码文件建立快照检查点，支持使用 /rewind 或 /undo 一键回退状态并从历史节点分支实验。 |
| [VS Code / JetBrains / Zed 扩展](features.md#ag-vscode-extension) | 进阶 | 88 | 生态扩展 | 在常用 IDE 中安装 Antigravity 扩展，复用同一套 Agent、权限与 Artifacts。 |
| [Model Context Protocol (MCP) 服务集成](features.md#ag-mcp-integration) | 高级 | 97 | 上下文扩展 | 全面支持工业级开放 MCP 协议，通过标准接口挂载数据库、GitHub、Sentry 及各类私有 API 工具。 |
| [多模型无缝切换与 Thinking 深度调节](features.md#ag-model-selection) | 高级 | 95 | 模型配置 | 在 Gemini 4 Carbon / Gemini 3.8 Flash 与 Claude 5.5 等模型之间切换，并调节 Thinking 深度。 |
| [多 Agent 并行执行与 Swarm 协作](features.md#ag-multi-agent-swarm) | 高级 | 96 | 多智能体 | 通过 /swarm 命令唤醒主从多智能体网络，将架构规划、代码实现、单测编写与文档输出并发交由不同专精子 Agent。 |
| [工程规则体系 (AGENTS.md / GEMINI.md / Rules)](features.md#ag-rules-and-skills) | 高级 | 93 | 规则与技能 | 用 AGENTS.md、GEMINI.md 与 .agents/rules/*.md 注入长期规则，支持 trigger/globs 控制生效范围。 |

> 每个功能的手把手步骤、可复制命令与常见坑，见 [features.md](features.md)。

## 官方入口

- 官网：[https://antigravity.google](https://antigravity.google)
- 文档：[https://antigravity.google/docs](https://antigravity.google/docs) · [https://codelabs.developers.google.com/getting-started-google-antigravity](https://codelabs.developers.google.com/getting-started-google-antigravity)
- 仓库：—
- 更新日志：[https://antigravity.google/docs/changelog](https://antigravity.google/docs/changelog)
- 来源与核对记录：[sources.md](sources.md)
- 近期版本变化：[changelog.md](changelog.md)

## 维护说明

本页由 `scripts/render-docs.mjs` 根据 `features.json` 生成，请勿手改。更新流程：

1. 运行 `npm run update` 检查官方文档/仓库是否有变更；
2. 依据变更修改 `features.json`（版本、命令、步骤、链接）；
3. 运行 `npm run build`，同步刷新 `README.md`、`features.md` 与网页数据。

> 内容来自公开官方资料，仅供学习。版本迭代很快，动手前请以官方最新文档为准。
