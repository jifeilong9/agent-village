# Pi

> 极简、高度可扩展的开源终端 Coding Agent 微核心
>
> **厂商**：Earendil Works / badlogic　**版本**：1.5.2　**核对日期**：2026-11-11

**官方文档**：[入口](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/docs) · [文档 2](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent/docs)　**仓库**：[GitHub](https://github.com/badlogic/pi-mono)　**更新日志**：[Changelog](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/CHANGELOG.md)

---

## 适合谁

- 追求透明与极简代码的终端开发者
- 需要编写专属定制插件的工程团队
- 基于 Agent 微核心二次开发产品的构建者

## 安装与首次运行

**环境要求**

- Node.js >= 22.19.0
- Windows 用户需要 Git for Windows (提供 bash.exe) 或 WSL
- 现代终端（推荐 Windows Terminal、WezTerm 或 Ghostty）

**步骤**

1. 使用官方安装脚本或 npm 全局安装 @earendil-works/pi-coding-agent
2. 进入目标代码目录，运行 pi 启动交互式 TUI
3. 在 TUI 中输入 /login 完成 Provider 鉴权并输入 /model 选择模型

```bash
powershell -c "irm https://pi.dev/install.ps1 | iex"
```

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

**验证**：pi --version

## 先认路

| 概念 | 说明 |
| --- | --- |
| **Agent Harness** | 智能体运行脚手架/微核心。Pi 自身仅提供轻量循环和最基础的四大工具，不预装沉重的业务假设，将高级特性留给用户态扩展。 |
| **Active Branch** | 活跃分支。Pi 的会话以树状结构（JSONL）持久化，当前对话路径即为活跃分支，仅该分支的历史会被送入模型上下文。 |
| **Compaction** | 上下文压缩。当对话 Token 接近模型最大上下文限制时，Pi 会对较早的历史生成结构化摘要，压缩旧消息同时在底层会话树中保留完整记录。 |
| **Steering & Follow-up** | 即时微调与排队。在模型运行工具时按 Enter 注入指令在当前步结束后干预，按 Alt+Enter 排队等待整轮任务完成后执行。 |
| **Agent Skills** | 遵循国际规范的技能文件夹（含 SKILL.md）。启动时仅暴露名称和简介，在触发相关任务时由模型按需读取完整指令与配套脚本。 |
| **Extensions** | 运行在 Pi 宿主进程内的 TypeScript 扩展模块。可全生命周期拦截事件、注册自定义工具、定制 TUI、甚至接入第三方模型网关。 |
| **Project Trust** | 项目信任沙箱边界。进入未知代码目录时阻断并询问是否允许加载该项目下的本地配置、MCP 服务器与扩展，防止代码执行投毒。 |
| **Pi Packages** | 资源分发生态包。将 extensions、skills、prompts、themes 打包为 npm 或 Git 仓库，实现一键安装与集中生命周期维护。 |

## 课程表

共 3 个模块、14 节课，预计 355 分钟。

### 模块 1：新手入门：安装、交互与基础操作

掌握终端启动、TUI 快捷键、@ 文件检索、多模型切换与会话树回溯基本功。

> 5 节课 · 约 85 分钟

**课程**：[交互式 TUI 与人机协同控制](features.md#pi-interactive-tui) · [@ 文件检索与 Tab 路径补全](features.md#pi-file-search-tab) · [多模型即时切换与 Thinking 深度调节](features.md#pi-model-thinking) · [会话树形回溯与安全分支](features.md#pi-session-tree) · [Windows 与 Git Bash 运行环境适配](features.md#pi-windows-setup)

**检查点**：完成「Windows 与 Git Bash 运行环境适配」，并能在自己的项目里独立复现。

### 模块 2：进阶定制：提示词、技能与环境掌控

学会编写可复用 Markdown 指令模板、Agent Skills 技能库以及配置安全信任边界。

> 4 节课 · 约 100 分钟

**课程**：[提示词模板（Prompt Templates）](features.md#pi-prompt-templates) · [Agent 技能机制（Skills）](features.md#pi-skills) · [自适应终端主题（Themes）](features.md#pi-themes) · [项目信任与安全沙箱机制](features.md#pi-project-trust)

**检查点**：完成「项目信任与安全沙箱机制」，并能在自己的项目里独立复现。

### 模块 3：高级扩展与工程集成：从插件到 SDK

深入 TypeScript 扩展开发、生态包管理、CLI 管道自动化、RPC 控制协议以及 SDK 二次开发。

> 5 节课 · 约 170 分钟

**课程**：[TypeScript 扩展系统（Extensions）](features.md#pi-extensions) · [Pi Packages 资源包生态](features.md#pi-packages) · [CLI Print 与 JSON 自动化事件流模式](features.md#pi-cli-automation) · [RPC 进程间控制协议](features.md#pi-rpc-mode) · [嵌入式 TypeScript SDK](features.md#pi-sdk)

**检查点**：完成「嵌入式 TypeScript SDK」，并能在自己的项目里独立复现。

> 完整课程（含每节练习与检查点）见 [course.md](course.md)。

## 功能总表

| 功能 | 难度 | 热度 | 分类 | 一句话 |
| --- | --- | --- | --- | --- |
| [交互式 TUI 与人机协同控制](features.md#pi-interactive-tui) | 入门 | 95 | 界面交互 | 基于差异渲染的全屏终端交互界面，支持运行中实时 Enter 干预与 Alt+Enter 任务排队。 |
| [@ 文件检索与 Tab 路径补全](features.md#pi-file-search-tab) | 入门 | 91 | 上下文工程 | 输入 @ 快速调出模糊文件检索浮窗，配合 Tab 键秒级组装复杂项目上下文，支持直接粘贴图片。 |
| [多模型即时切换与 Thinking 深度调节](features.md#pi-model-thinking) | 入门 | 93 | 模型控制 | 内建支持 Anthropic、OpenAI、Gemini 等各大厂商，会话中按 Ctrl+L 或 Shift+Tab 随心调整模型与推理等级。 |
| [会话树形回溯与安全分支](features.md#pi-session-tree) | 入门 | 94 | 会话管理 | 基于树状图（Tree Graph）存储对话历史，支持通过 /tree 任意回退探索新分支，结合 /compact 智能压缩。 |
| [Windows 与 Git Bash 运行环境适配](features.md#pi-windows-setup) | 进阶 | 86 | 系统适配 | 针对 Windows 平台的深层优化，自动解析 Git Bash 路径，支持引入 powershell 模型工具与终端防闪烁。 |
| [提示词模板（Prompt Templates）](features.md#pi-prompt-templates) | 进阶 | 88 | 提示工程 | 通过单个 Markdown 文件快速声明带参数的斜杠指令（如 /review），支持默认值替换与命令自动补全。 |
| [Agent 技能机制（Skills）](features.md#pi-skills) | 进阶 | 90 | 技能扩展 | 实现标准 Agent Skills 规范，仅将技能概览注册在系统提示词中，任务匹配时才由模型按需深度加载执行。 |
| [TypeScript 扩展系统（Extensions）](features.md#pi-extensions) | 进阶 | 96 | 核心扩展 | 在 Pi 宿主进程中运行的原生 TypeScript 扩展，支持拦截全生命周期事件、注册自定义 Tool、阻断危险命令与定制 TUI。 |
| [自适应终端主题（Themes）](features.md#pi-themes) | 进阶 | 80 | 界面外观 | 基于 OKHSL / OKLCH 现代色彩空间构建，智能自适应当前终端 ANSI 配色与深浅底色，确保 4.5:1 无障碍高对比度。 |
| [Pi Packages 资源包生态](features.md#pi-packages) | 进阶 | 89 | 包管理与生态 | 将 extensions、skills、prompts 和 themes 打包聚合，支持直接通过 npm 或 Git 仓库一键安装与集中升级。 |
| [项目信任与安全沙箱机制](features.md#pi-project-trust) | 进阶 | 87 | 安全与沙箱 | 当首次进入含本地扩展、MCP 或特殊配置的代码仓库时激活安全拦截，防范未知仓库的 Prompt Injection 与恶意执行。 |
| [CLI Print 与 JSON 自动化事件流模式](features.md#pi-cli-automation) | 高级 | 89 | 自动化 | 无头执行模式，提供 --print 直接回显最终答案以及 --mode json 逐行输出结构化 JSONL 事件流。 |
| [RPC 进程间控制协议](features.md#pi-rpc-mode) | 高级 | 88 | 进程集成 | 通过 pi --mode rpc 启动长寿命后台子进程，宿主应用通过 stdin/stdout 以 JSONL 双向协议完全控制 Agent。 |
| [嵌入式 TypeScript SDK](features.md#pi-sdk) | 高级 | 92 | 二次开发 | 在 Node.js/Bun 宿主中直接调用 createAgentSession，享受 100% 原生 TypeScript 类型安全与进程内极速交互。 |

> 每个功能的手把手步骤、可复制命令与常见坑，见 [features.md](features.md)。

## 官方入口

- 官网：[https://pi.dev](https://pi.dev)
- 文档：[https://github.com/earendil-works/pi/tree/main/packages/coding-agent/docs](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/docs) · [https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent/docs](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent/docs)
- 仓库：[https://github.com/badlogic/pi-mono](https://github.com/badlogic/pi-mono)
- 更新日志：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/CHANGELOG.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/CHANGELOG.md)
- 来源与核对记录：[sources.md](sources.md)
- 近期版本变化：[changelog.md](changelog.md)

## 维护说明

本页由 `scripts/render-docs.mjs` 根据 `features.json` 生成，请勿手改。更新流程：

1. 运行 `npm run update` 检查官方文档/仓库是否有变更；
2. 依据变更修改 `features.json`（版本、命令、步骤、链接）；
3. 运行 `npm run build`，同步刷新 `README.md`、`features.md` 与网页数据。

> 内容来自公开官方资料，仅供学习。版本迭代很快，动手前请以官方最新文档为准。
