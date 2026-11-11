# Claude Code

> Anthropic 官方终端 Agent 编程工具
>
> **厂商**：Anthropic　**版本**：2.1.322　**核对日期**：2026-11-11

**官方文档**：[入口](https://docs.claude.com/en/docs/claude-code/overview)　**仓库**：[GitHub](https://github.com/anthropics/claude-code)　**更新日志**：[Changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)

---

## 适合谁

- 终端优先的高级研发人员
- 全栈项目开发与大型代码重构
- 自动化 CI/CD 与 GitHub 协同
- 复杂代码库多智能体拆解

## 安装与首次运行

**环境要求**

- 操作系统：macOS 10.15+、Ubuntu 20.04+/Debian 10+ 或 Windows 10+ (x64/ARM64)
- 依赖环境：Git 2.0+（原生安装包内置运行时，npm 安装方式已弃用）
- 账号权限：Anthropic Console API Key，或 Claude 付费订阅 (Pro/Max/Ultra/Team/Enterprise)

**步骤**

1. 按操作系统选择安装方式：Windows 可用 PowerShell 脚本或 WinGet，macOS/Linux 可用 curl 或 Homebrew
2. 安装程序自动配置二进制环境并加入系统 PATH
3. 在代码项目根目录下执行 claude 启动交互界面
4. 首次启动时输入 /login 完成网页授权或配置 API 密钥
5. 输入简单问题（如 'what does this project do?'）验证环境就绪

```bash
irm https://claude.ai/install.ps1 | iex
```

```bash
winget install Anthropic.ClaudeCode
```

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

```bash
brew install --cask claude-code
```

**验证**：claude --version

## 先认路

| 概念 | 说明 |
| --- | --- |
| **Agentic Loop (智能体循环)** | Claude 接收任务后自主经历「探索项目 -> 规划步骤 -> 调用工具读写 -> 运行验证 -> 修复纠错」的闭环迭代。 |
| **CLAUDE.md / AGENTS.md** | 放置于项目根目录或子目录的长期记忆与规则文件，每次会话启动自动注入上下文，定义架构约束与命令。 |
| **Permission Modes (多级权限模式)** | 从 strict/manual、plan、acceptEdits 到 auto 的自主执行授权分级，平衡开发速度与系统操作安全性。 |
| **Checkpoints & Rewind** | 每次 Prompt 自动建立文件快照与对话状态存档，支持随时使用 /rewind 恢复代码与上下文。 |
| **Subagents (子智能体)** | 拥有隔离上下文、专属模型与专用工具集的分工代理，可在后台并发执行探索与扫描，防止主上下文污染。 |
| **MCP (Model Context Protocol)** | 开放标准协议，用于将 Claude Code 连接至本地数据库、开发服务器、GitHub 以及远程云服务。 |

## 课程表

共 3 个模块、13 节课，预计 330 分钟。

### 模块 1：终端会话与基础控制

掌握安装配置、日常快捷命令、项目规则沉淀与规划模式，建立安全的日常 AI 辅助开发习惯。

> 4 节课 · 约 60 分钟

**课程**：[斜杠命令与会话交互](features.md#cc-slash-commands) · [CLAUDE.md 与项目记忆体系](features.md#cc-memory-claude-md) · [Plan Mode 架构规划模式](features.md#cc-plan-mode) · [Headless 模式与 Unix 管道](features.md#cc-headless-pipe)

**检查点**：完成「Headless 模式与 Unix 管道」，并能在自己的项目里独立复现。

### 模块 2：工作流强化与扩展集成

利用时光机回滚、自定义技能、MCP 协议集成、生命周期钩子以及 GitHub Actions 打造生产级开发流水线。

> 6 节课 · 约 150 分钟

**课程**：[Checkpoints 快照与 /rewind 时光机](features.md#cc-rewind-checkpoints) · [Skills 自定义能力与动态上下文](features.md#cc-skills) · [MCP (Model Context Protocol) 工具协议集成](features.md#cc-mcp) · [Hooks 生命周期事件钩子](features.md#cc-hooks) · [多级权限与安全控制体系](features.md#cc-permissions) · [GitHub Actions CI/CD 与 @claude 协作](features.md#cc-github-actions)

**检查点**：完成「GitHub Actions CI/CD 与 @claude 协作」，并能在自己的项目里独立复现。

### 模块 3：多智能体与生态延展

构建专业 Subagent 分工协作体系，借助 Agent SDK 进行系统级二次开发，并运用跨端接力实现全场景开发。

> 3 节课 · 约 120 分钟

**课程**：[Subagents 专业子智能体分工](features.md#cc-subagents) · [Agent SDK 编程式智能体开发](features.md#cc-agent-sdk) · [Remote Control 与 Teleport 跨端接力](features.md#cc-remote-teleport)

**检查点**：完成「Remote Control 与 Teleport 跨端接力」，并能在自己的项目里独立复现。

> 完整课程（含每节练习与检查点）见 [course.md](course.md)。

## 功能总表

| 功能 | 难度 | 热度 | 分类 | 一句话 |
| --- | --- | --- | --- | --- |
| [斜杠命令与会话交互](features.md#cc-slash-commands) | 入门 | 90 | 基础交互 | 在交互终端中使用 / 快速唤出内置指令，高效管理上下文清理、会话恢复、系统自检与全局配置。 |
| [CLAUDE.md 与项目记忆体系](features.md#cc-memory-claude-md) | 入门 | 95 | 记忆与规则 | 通过项目根目录与子目录中的 CLAUDE.md 或 AGENTS.md 固化架构规范、构建命令与代码风格，支持自动记忆积累。 |
| [Plan Mode 架构规划模式](features.md#cc-plan-mode) | 入门 | 94 | 任务规划 | 只读安全探索模式，先深入分析代码并输出详尽执行方案，经人工审阅批准后再切回写入模式落地修改。 |
| [Headless 模式与 Unix 管道](features.md#cc-headless-pipe) | 入门 | 88 | CLI 脚本化 | 使用 -p (--print) 参数非交互执行单次查询并输出至 stdout，无缝接入 Shell 脚本、CI 流水线与管道命令。 |
| [Checkpoints 快照与 /rewind 时光机](features.md#cc-rewind-checkpoints) | 进阶 | 92 | 版本控制 | 自动为每次 Prompt 轮次记录文件与对话快照（保留最近 100 轮），支持一键精准撤销并恢复代码或对话。 |
| [Skills 自定义能力与动态上下文](features.md#cc-skills) | 进阶 | 93 | 扩展能力 | 在 .claude/skills/<name>/SKILL.md 中封装可复用能力，支持按需加载与动态命令输出。 |
| [MCP (Model Context Protocol) 工具协议集成](features.md#cc-mcp) | 进阶 | 96 | 外部集成 | 借助标准开放的 MCP 协议连接本地与远程服务器（stdio、HTTP、SSE、WebSocket），为 Claude 挂载外部工具与数据源。 |
| [Hooks 生命周期事件钩子](features.md#cc-hooks) | 进阶 | 95 | 自动化 | 监听 SessionStart、PreToolUse、PostToolUse 等数十种事件，执行自动化格式化、安全守卫拦截或状态同步。 |
| [多级权限与安全控制体系](features.md#cc-permissions) | 进阶 | 91 | 安全合规 | 提供 auto、manual、plan、acceptEdits、dontAsk 等六种安全模式，搭配 fine-grained allow/deny 规则构建纵深防御。 |
| [GitHub Actions CI/CD 与 @claude 协作](features.md#cc-github-actions) | 进阶 | 93 | CI/CD | 通过官方 Action 在 CI 中运行 Claude Code，支持在 Issue 与 PR 评论中 @claude 进行代码审查、自动修复与分支提交。 |
| [Subagents 专业子智能体分工](features.md#cc-subagents) | 高级 | 97 | 多智能体 | 在 .claude/agents/*.md 中声明具备专属角色、独立上下文、特定模型与定制工具集的 Subagent，支持后台并发调度。 |
| [Agent SDK 编程式智能体开发](features.md#cc-agent-sdk) | 高级 | 94 | 二次开发 | 使用官方 Python 与 TypeScript SDK 将 Claude Code 完整的 Agent 循环、工具生态与上下文管理能力嵌入自定义应用。 |
| [Remote Control 与 Teleport 跨端接力](features.md#cc-remote-teleport) | 高级 | 89 | 跨端协同 | 通过 claude remote-control 与 claude --teleport 打通终端、Web、移动端与桌面端，实现多端无缝会话接力与可视化审阅。 |

> 每个功能的手把手步骤、可复制命令与常见坑，见 [features.md](features.md)。

## 官方入口

- 官网：[https://code.claude.com/docs/en/overview](https://code.claude.com/docs/en/overview)
- 文档：[https://docs.claude.com/en/docs/claude-code/overview](https://docs.claude.com/en/docs/claude-code/overview)
- 仓库：[https://github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)
- 更新日志：[https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- 来源与核对记录：[sources.md](sources.md)
- 近期版本变化：[changelog.md](changelog.md)

## 维护说明

本页由 `scripts/render-docs.mjs` 根据 `features.json` 生成，请勿手改。更新流程：

1. 运行 `npm run update` 检查官方文档/仓库是否有变更；
2. 依据变更修改 `features.json`（版本、命令、步骤、链接）；
3. 运行 `npm run build`，同步刷新 `README.md`、`features.md` 与网页数据。

> 内容来自公开官方资料，仅供学习。版本迭代很快，动手前请以官方最新文档为准。
