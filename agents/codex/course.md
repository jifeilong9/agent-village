# Codex · 自动生成课程

> 由 `scripts/lib/course.mjs` 根据 `features.json` 的 learningPath 与功能数据自动编排。
> 共 3 个模块、13 节课，预计 345 分钟。

## 模块 1：初探终端与安全边界

掌握 Codex CLI 的快速安装、TUI 交互模式、三级沙箱隔离策略以及项目级 AGENTS.md 规范注入。

> 4 节课 · 约 60 分钟

### 1.1 交互式 TUI 与终端工作流

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：基于终端的全功能交互界面，支持多轮对话、实时流式输出、Diff 预览与快捷斜杠命令；无需跳出终端即可获得强大的全仓库代码理解与修改能力，配合丰富的斜杠命令快速执行会话压缩、模型切换与权限变更
- **练习**：在自己的项目里复现「交互式 TUI 与终端工作流」：在终端中进入任意 Git 项目目录
- **检查点**：在非 Git 仓库中直接运行默认会提示警告，若需在非受管目录运行需添加 --skip-git-repo-check 参数。
- **功能卡**：[交互式 TUI 与终端工作流](features.md#codex-tui)
- **官方文档**：https://developers.openai.com/codex/cli

### 1.2 审批模式与三级安全沙箱

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：严格的操作系统级运行边界，提供只读、工作区写入和完全权限三级沙箱，与智能审批策略协同防护；AI Agent 自主运行 Shell 命令存在越权风险。Codex 细粒度的沙箱保障了即使模型产生幻觉，也不会逃逸出工作区破坏敏感文件或泄露密钥
- **练习**：在自己的项目里复现「审批模式与三级安全沙箱」：审阅当前项目的安全要求，选定合适的沙箱级别（默认推荐 workspace-write）
- **检查点**：切勿在未隔离的生产主机上随意使用 --dangerously-bypass-approvals-and-sandbox（等同于完全放行所有破坏性命令）。
- **功能卡**：[审批模式与三级安全沙箱](features.md#approval-sandbox)
- **官方文档**：https://developers.openai.com/codex/permission-modes

### 1.3 AGENTS.md 项目规范与上下文注入

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：基于 Markdown 的级联行为规范文件，让 Codex 在执行任何任务前自动对齐项目团队约定与测试要求；避免每次提问都要重复叮嘱'请使用 pnpm'、'修改代码后运行 pytest'。AGENTS.md 自动级联生效，是团队协作一致性的基石
- **练习**：在自己的项目里复现「AGENTS.md 项目规范与上下文注入」：在仓库根目录创建 AGENTS.md；也可用 AGENTS.override.md 覆盖同目录的 AGENTS.md
- **检查点**：指令链受 project_doc_max_bytes（默认 32 KiB）限制；内容过长会被截断，应保持精炼并善用子目录分层。
- **功能卡**：[AGENTS.md 项目规范与上下文注入](features.md#agents-md)
- **官方文档**：https://developers.openai.com/codex/agent-configuration/agents-md

### 1.4 codex doctor 环境健康诊断

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：一键排查本地运行环境、配置文件语法、鉴权凭据有效性与网络/WebSocket 连通性；新手常遇网络代理拦截、TOML 格式拼写错误或 API Token 过期。doctor 命令能够输出清晰的分组体检报告与修复建议
- **练习**：在自己的项目里复现「codex doctor 环境健康诊断」：打开终端，执行 codex doctor 命令启动全项系统诊断
- **检查点**：在配置了企业 HTTP 代理时，如遇 WebSocket 握手失败，需检查 system_proxy_fallback 与环境变量 HTTP_PROXY/HTTPS_PROXY 设置。
- **功能卡**：[codex doctor 环境健康诊断](features.md#codex-doctor)
- **官方文档**：https://developers.openai.com/codex/reference/commands

**模块检查点**：完成「codex doctor 环境健康诊断」，并能在自己的项目里独立复现。

---

## 模块 2：非交互自动化与工程化提效

利用 codex exec 编写批处理任务，执行自动化多模式代码审查，持久化并分支管理历史会话，统一团队 config.toml 与 MCP 外部工具。

> 5 节课 · 约 125 分钟

### 2.1 codex exec 非交互自动化批处理

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：Headless 非交互命令行模式，直接在脚本、Git 钩子和 CI/CD 流程中执行指令并产出代码补丁；无需人工值守即可批量完成跨文件重构、自动化 Bug 修复和依赖版本迁移，是打通自动化研发管线的核心支柱
- **练习**：在自己的项目里复现「codex exec 非交互自动化批处理」：确定要自动化的任务目标并编写明确的提示词
- **检查点**：自动化模式下遇到无法自愈的编译错误时可能会持续尝试导致 Token 消耗增加，建议配合 --ephemeral 或设置合理的超时控制。
- **功能卡**：[codex exec 非交互自动化批处理](features.md#codex-exec)
- **官方文档**：https://developers.openai.com/codex/cli

### 2.2 代码智能审查（codex review & /review）

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：专为代码审查定制的功能，可针对未暂存改动、指定分支对比或特定 Commit 进行全面安全与性能评审；在发起 Pull Request 前由 Agent 进行第一轮静态代码审计，能快速拦截边界隐患、并发竞态、SQL 注入及未捕获异常
- **练习**：在自己的项目里复现「代码智能审查（codex review & /review）」：在本地完成代码修改后，运行 codex review --uncommitted 审查未提交的代码变更
- **检查点**：review 模式默认采用 read-only 沙箱，不会自动帮你修改代码；若需要直接就地修复，请使用 codex exec 传入修复指令。
- **功能卡**：[代码智能审查（codex review & /review）](features.md#codex-review)
- **官方文档**：https://developers.openai.com/codex/code-review

### 2.3 会话持久化、恢复与分叉（resume & fork）

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：会话自动存档于本地 JSONL，支持一键继续近期会话、历史列表筛选以及分叉探索不同重构方案；复杂的系统重构往往需要多天多次迭代。会话持久化与 fork 功能让开发者随时回溯思路，不用担心终端关闭后上下文丢失
- **练习**：在自己的项目里复现「会话持久化、恢复与分叉（resume & fork）」：终端关闭或中断后，在项目目录下运行 codex resume 打开历史会话选择器
- **检查点**：默认 resume 仅显示当前工作目录相关的会话；若需跨目录检索其他项目的会话，必须添加 --all 参数。
- **功能卡**：[会话持久化、恢复与分叉（resume & fork）](features.md#session-resume-fork)
- **官方文档**：https://developers.openai.com/codex/cli

### 2.4 分层配置与环境策略（config.toml & Profiles）

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：遵循清晰优先级的 TOML 配置文件体系，支持项目级定制、命名 Profile 分组与命令行一键覆写；开发、测试、日常审查对模型选择、沙箱模式与网络访问的要求各不相同。分层配置让团队在共享规范的同时兼顾个人灵活偏好
- **练习**：在自己的项目里复现「分层配置与环境策略（config.toml & Profiles）」：在用户主目录下创建或编辑 ~/.codex/config.toml 配置个人全局偏好（默认模型、沙箱策略）
- **检查点**：项目级 .codex/config.toml 仅在项目被标记为受信任（Trusted）时才会加载，若项目未信任相关配置会被静默跳过以防恶意仓库利用。
- **功能卡**：[分层配置与环境策略（config.toml & Profiles）](features.md#config-toml)
- **官方文档**：https://developers.openai.com/codex/config-file/config-basic

### 2.5 MCP 协议与外部工具挂载

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：深度支持 Model Context Protocol（MCP），通过 stdio 或 SSE 模式扩展数据库查询、文档检索等外部能力；单纯依靠本地命令行无法满足复杂业务场景。MCP 赋予了 Codex 安全连接私有知识库、云数据库与监控面板的通用标准能力
- **练习**：在自己的项目里复现「MCP 协议与外部工具挂载」：选定或编写所需的 MCP Server（如用于上下文检索的 Context7 或 Postgres 数据库工具）
- **检查点**：通过 stdio 启动的 MCP 进程会继承部分系统环境，若工具依赖特定环境变量需在配置表中的 env 键中显式声明。
- **功能卡**：[MCP 协议与外部工具挂载](features.md#mcp-integration)
- **官方文档**：https://developers.openai.com/codex/extend/mcp

**模块检查点**：完成「MCP 协议与外部工具挂载」，并能在自己的项目里独立复现。

---

## 模块 3：跨端集成与架构扩展

结合 VS Code 官方 IDE 插件、Codex Cloud 云端任务托管与 GitHub Action CI/CD 流水线，深入底层 JSON-RPC app-server 协议与技能插件体系。

> 4 节课 · 约 160 分钟

### 3.1 VS Code / Cursor 官方 IDE 扩展

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：将 Codex Agent 深度内嵌在编辑器侧边栏，支持行内代码 Diff、@file 引用、检查点与云端委托；对于习惯图形化编辑器的开发者，IDE 扩展打通了代码补全、侧边栏 Agent、直观 Diff 审阅与本地断点调试的闭环体验
- **练习**：在自己的项目里复现「VS Code / Cursor 官方 IDE 扩展」：在 VS Code / Cursor 插件市场搜索官方 OpenAI Codex 插件并安装
- **检查点**：IDE 扩展与 CLI 共享同一套 ~/.codex/config.toml 配置，若在 CLI 中设置了冲突的沙箱模式可能导致 IDE 中的自动保存提示受阻。
- **功能卡**：[VS Code / Cursor 官方 IDE 扩展](features.md#ide-extension)
- **官方文档**：https://developers.openai.com/codex/ide

### 3.2 Codex Cloud 与 GitHub CI/CD 集成

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：支持在云端托管长时编程任务，结合 openai/codex-action 在 GitHub PR 中实现自动化审查与修复流水线；大型项目的迁移和长耗时测试不应阻塞本地电脑。云端隔离运行加上 CI 流水线自动产出 PR 补丁，真正实现研发全自动化
- **练习**：在自己的项目里复现「Codex Cloud 与 GitHub CI/CD 集成」：在 GitHub 仓库 .github/workflows/ 目录下添加 codex-review.yml 工作流文件
- **检查点**：在 CI 环境中运行修改任务时，务必将 GitHub Action 的 GITHUB_TOKEN 配置为具有 contents: write 权限，否则无法自动提交补丁。
- **功能卡**：[Codex Cloud 与 GitHub CI/CD 集成](features.md#codex-cloud-github)
- **官方文档**：https://developers.openai.com/codex/cloud

### 3.3 Headless 双向 JSON-RPC app-server 协议

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：解耦的 Agent 后端守护进程，支持基于 stdio、WebSocket 及 Unix Socket 的双向事件流与远程控制；企业与平台开发者无需重复造轮子，直接通过标准 JSON-RPC 协议驱动 Codex Agent 核心，轻松自研专用 Web IDE 或机器人
- **练习**：在自己的项目里复现「Headless 双向 JSON-RPC app-server 协议」：启动 app-server 守护进程并指定传输方式：codex app-server --listen ws://127.0.0.1:4500
- **检查点**：远端 WebSocket 若暴露在公网，必须配置严格鉴权或 mTLS；不要无认证裸奔。
- **功能卡**：[Headless 双向 JSON-RPC app-server 协议](features.md#app-server-protocol)
- **官方文档**：https://developers.openai.com/codex/developers

### 3.4 Skills 机制与插件生态（SKILL.md & Plugin）

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：用 .agents/skills/<name>/SKILL.md 封装可复用技能，并用 codex plugin 管理插件包；相比单纯的 Prompt 模板，Skill 拥有独立的上下文触发逻辑、入参校验与工具依赖声明，让复杂业务技能可打包复用与分发
- **练习**：在自己的项目里复现「Skills 机制与插件生态（SKILL.md & Plugin）」：在 .agents/skills/<name>/SKILL.md（项目）、~/.agents/skills/<name>/SKILL.md（用户）或 /etc/codex/skills（系统）定义技能
- **检查点**：SKILL.md 的 description 写得太泛会导致自动匹配失败；插件包要在受信任的 marketplace 安装。
- **功能卡**：[Skills 机制与插件生态（SKILL.md & Plugin）](features.md#skills-plugins)
- **官方文档**：https://developers.openai.com/codex/build-skills

**模块检查点**：完成「Skills 机制与插件生态（SKILL.md & Plugin）」，并能在自己的项目里独立复现。

