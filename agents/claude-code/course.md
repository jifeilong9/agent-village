# Claude Code · 自动生成课程

> 由 `scripts/lib/course.mjs` 根据 `features.json` 的 learningPath 与功能数据自动编排。
> 共 3 个模块、13 节课，预计 330 分钟。

## 模块 1：终端会话与基础控制

掌握安装配置、日常快捷命令、项目规则沉淀与规划模式，建立安全的日常 AI 辅助开发习惯。

> 4 节课 · 约 60 分钟

### 1.1 斜杠命令与会话交互

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：在交互终端中使用 / 快速唤出内置指令，高效管理上下文清理、会话恢复、系统自检与全局配置；斜杠命令是控制 Claude Code 会话生命周期与环境配置最快捷的途径，无需跳出终端即可掌控一切运行参数
- **练习**：在自己的项目里复现「斜杠命令与会话交互」：在交互式会话终端输入框中直接输入 / 唤出自动补全指令面板
- **检查点**：/clear 会清空对话上下文但不会撤销已修改的磁盘文件；如需回滚代码改动，请使用 /rewind 命令。
- **功能卡**：[斜杠命令与会话交互](features.md#cc-slash-commands)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/quickstart#session-commands

### 1.2 CLAUDE.md 与项目记忆体系

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：通过项目根目录与子目录中的 CLAUDE.md 或 AGENTS.md 固化架构规范、构建命令与代码风格，支持自动记忆积累；消除反复输入项目约定的繁琐沟通，让 Claude 在每次会话启动时自动加载团队工程共识，确保生成代码完全符合团队标准
- **练习**：在自己的项目里复现「CLAUDE.md 与项目记忆体系」：在项目根目录下创建 CLAUDE.md 文件（或 .claude/rules/ 规则目录）
- **检查点**：CLAUDE.md 不应贴入整段业务代码，应集中记录难以通过阅读代码直接推导的隐性规范与构建指令，文件过大会过多挤占上下文。
- **功能卡**：[CLAUDE.md 与项目记忆体系](features.md#cc-memory-claude-md)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/memory

### 1.3 Plan Mode 架构规划模式

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：只读安全探索模式，先深入分析代码并输出详尽执行方案，经人工审阅批准后再切回写入模式落地修改；面对大型重构或未知代码库时，避免 AI 贸然修改文件导致逻辑错乱或产生难以追溯的破坏性改动
- **练习**：在自己的项目里复现「Plan Mode 架构规划模式」：启动会话时添加参数 claude --permission-mode plan，或在交互会话中按 Shift+Tab 切换至 Plan 模式
- **检查点**：在 Plan 模式下所有写入工具（Edit、Write、文件破坏性命令）均被拦截，若需求要求立即修改文件需先退出规划模式。
- **功能卡**：[Plan Mode 架构规划模式](features.md#cc-plan-mode)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/permission-modes

### 1.4 Headless 模式与 Unix 管道

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：使用 -p (--print) 参数非交互执行单次查询并输出至 stdout，无缝接入 Shell 脚本、CI 流水线与管道命令；将 Claude 的代码理解与生成能力化作标准 Unix 工具，与其他命令行工具链无缝组合，实现高灵活度的自动化处理
- **练习**：在自己的项目里复现「Headless 模式与 Unix 管道」：使用 claude -p "<问题>" 运行单次非交互式指令，结果将直接输出至控制台并正常退出
- **检查点**：-p 模式无法与 --bg（后台模式）并存；脚本自动化中若遇到未预先授权的工具权限，将直接抛出错误退出，建议配合 --allowedTools 使用。
- **功能卡**：[Headless 模式与 Unix 管道](features.md#cc-headless-pipe)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/cli-reference

**模块检查点**：完成「Headless 模式与 Unix 管道」，并能在自己的项目里独立复现。

---

## 模块 2：工作流强化与扩展集成

利用时光机回滚、自定义技能、MCP 协议集成、生命周期钩子以及 GitHub Actions 打造生产级开发流水线。

> 6 节课 · 约 150 分钟

### 2.1 Checkpoints 快照与 /rewind 时光机

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：自动为每次 Prompt 轮次记录文件与对话快照（保留最近 100 轮），支持一键精准撤销并恢复代码或对话；彻底消除 AI 编程中的试错风险，即使复杂的生成代码产生偏差，也能瞬间精确回退至特定节点，无需手动 git checkout
- **练习**：在自己的项目里复现「Checkpoints 快照与 /rewind 时光机」：在交互终端中让 Claude 执行多轮代码修改与单元测试调试
- **检查点**：通过 Fork 分支出来的独立会话不会继承父会话的历史文件快照，无法在 Fork 会话中回滚到分支创建前的文件状态。
- **功能卡**：[Checkpoints 快照与 /rewind 时光机](features.md#cc-rewind-checkpoints)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/sessions#manage-context-within-a-session

### 2.2 Skills 自定义能力与动态上下文

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：在 .claude/skills/<name>/SKILL.md 中封装可复用能力，支持按需加载与动态命令输出；将项目专属的高频复杂工作流（如 PR 审查、部署脚本、数据库迁移）固化为团队内开箱即用的一键命令
- **练习**：在自己的项目里复现「Skills 自定义能力与动态上下文」：在项目根目录创建 .claude/skills/review-pr/SKILL.md（个人级放 ~/.claude/skills/）
- **检查点**：Skills 是「目录 + SKILL.md」，不是单个 .md 文件；旧式单文件命令放在 .claude/commands/，两者不要混淆。
- **功能卡**：[Skills 自定义能力与动态上下文](features.md#cc-skills)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/skills

### 2.3 MCP (Model Context Protocol) 工具协议集成

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：借助标准开放的 MCP 协议连接本地与远程服务器（stdio、HTTP、SSE、WebSocket），为 Claude 挂载外部工具与数据源；突破本地文本工具局限，让 Claude Code 能够直接安全地查询数据库、操作 GitHub、调用内部监控与微服务
- **练习**：在自己的项目里复现「MCP (Model Context Protocol) 工具协议集成」：使用 claude mcp add 命令添加 MCP 服务器，指定传输协议与运行命令
- **检查点**：stdio server 的命令必须放在 -- 之后，否则 server 自己的参数会被 Claude Code 当成 CLI 选项解析；项目级 .mcp.json 不要硬编码密钥。
- **功能卡**：[MCP (Model Context Protocol) 工具协议集成](features.md#cc-mcp)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/mcp

### 2.4 Hooks 生命周期事件钩子

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：监听 SessionStart、PreToolUse、PostToolUse 等数十种事件，执行自动化格式化、安全守卫拦截或状态同步；在开发全生命周期注入自动化确定性保障，例如在代码写入后自动执行 linter，或阻止未授权的敏感命令运行
- **练习**：在自己的项目里复现「Hooks 生命周期事件钩子」：在 .claude/settings.json 或 ~/.claude/settings.json 中声明 hooks 配置节点
- **检查点**：hooks 配置必须是「事件 → matcher 组 → hooks 处理器」三层结构；钩子通过 stdin 接收 JSON，不是读取 $CLAUDE_TOOL_INPUT_PATH。
- **功能卡**：[Hooks 生命周期事件钩子](features.md#cc-hooks)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/hooks

### 2.5 多级权限与安全控制体系

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：提供 auto、manual、plan、acceptEdits、dontAsk 等六种安全模式，搭配 fine-grained allow/deny 规则构建纵深防御；满足从个人高效开发到企业级严格合规的安全诉求，精确界定 Agent 的自主权限边界，杜绝数据泄露与误删风险
- **练习**：在自己的项目里复现「多级权限与安全控制体系」：使用快捷键 Shift+Tab 在会话中循环切换权限模式（如 manual 确认模式或 acceptEdits 快速编辑模式）
- **检查点**：deny 规则在任何模式（即使是 bypassPermissions 危险模式）下都会生效；配置 allow 规则时尽量避免使用过于宽泛的通配符。
- **功能卡**：[多级权限与安全控制体系](features.md#cc-permissions)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/permission-modes

### 2.6 GitHub Actions CI/CD 与 @claude 协作

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：通过官方 Action 在 CI 中运行 Claude Code，支持在 Issue 与 PR 评论中 @claude 进行代码审查、自动修复与分支提交；将 AI 结对编程直接延伸到 GitHub 协作平台，实现团队多人异步代码审查、缺陷自动复现与全自动 PR 修复
- **练习**：在自己的项目里复现「GitHub Actions CI/CD 与 @claude 协作」：在本地终端会话中运行 /install-github-app 引导完成官方 GitHub App 的组织/仓库授权
- **检查点**：工作流必须授予 GITHUB_TOKEN 的 contents: write 与 pull-requests: write 权限，否则 Claude 无法向分支推送修复代码或评论。
- **功能卡**：[GitHub Actions CI/CD 与 @claude 协作](features.md#cc-github-actions)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/github-actions

**模块检查点**：完成「GitHub Actions CI/CD 与 @claude 协作」，并能在自己的项目里独立复现。

---

## 模块 3：多智能体与生态延展

构建专业 Subagent 分工协作体系，借助 Agent SDK 进行系统级二次开发，并运用跨端接力实现全场景开发。

> 3 节课 · 约 120 分钟

### 3.1 Subagents 专业子智能体分工

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：在 .claude/agents/*.md 中声明具备专属角色、独立上下文、特定模型与定制工具集的 Subagent，支持后台并发调度；将消耗海量 Token 的代码全库检索、高频报错调试等繁重任务分流给子代理，保持主会话上下文精炼高效
- **练习**：在自己的项目里复现「Subagents 专业子智能体分工」：在项目根目录下创建目录 .claude/agents/
- **检查点**：子代理如果配置了 background: true，其结果是以异步事件形式上报给主会话，主会话在连续任务规划时需合理处理异步依赖。
- **功能卡**：[Subagents 专业子智能体分工](features.md#cc-subagents)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/sub-agents

### 3.2 Agent SDK 编程式智能体开发

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：使用官方 Python 与 TypeScript SDK 将 Claude Code 完整的 Agent 循环、工具生态与上下文管理能力嵌入自定义应用；超越命令行终端交互界面，让开发者能够以原生代码形式驱动拥有全量代码编辑与系统执行能力的专业 Agent 软件
- **练习**：在自己的项目里复现「Agent SDK 编程式智能体开发」：根据开发语言安装官方 SDK：pip install claude-agent-sdk 或 npm install @anthropic-ai/claude-agent-sdk
- **检查点**：Agent SDK 底层会拉起 Claude Code 运行时，若在 Docker 或无头服务器环境中部署，需确保基础镜像中预装了 git 与 bash 工具。
- **功能卡**：[Agent SDK 编程式智能体开发](features.md#cc-agent-sdk)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/agent-sdk/overview

### 3.3 Remote Control 与 Teleport 跨端接力

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：通过 claude remote-control 与 claude --teleport 打通终端、Web、移动端与桌面端，实现多端无缝会话接力与可视化审阅；实现随时随地不间断的 AI 编程：离开工位时用手机监控云端或本地进度，回到电脑前一秒将任务拉回本地终端继续开发
- **练习**：在自己的项目里复现「Remote Control 与 Teleport 跨端接力」：在本地开发机终端中运行 claude remote-control 打开远程受控服务通道
- **检查点**：Teleport 与 Remote Control 需使用 Claude 官方付费账户登录；remote-control 会锁定启动时的项目目录，不支持远端随意切换绝对路径。
- **功能卡**：[Remote Control 与 Teleport 跨端接力](features.md#cc-remote-teleport)
- **官方文档**：https://docs.claude.com/en/docs/claude-code/remote-control

**模块检查点**：完成「Remote Control 与 Teleport 跨端接力」，并能在自己的项目里独立复现。

