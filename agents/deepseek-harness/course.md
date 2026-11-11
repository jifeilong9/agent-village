# DeepSeek Harness · 自动生成课程

> 由 `scripts/lib/course.mjs` 根据 `features.json` 的 learningPath 与功能数据自动编排。
> 共 3 个模块、14 节课，预计 355 分钟。

## 模块 1：快速上手与日常交互

掌握 CLI 快速安装、Web UI 交互控制台、TUI 终端模式以及模型密钥的基础配置。

> 4 节课 · 约 60 分钟

### 1.1 CLI 快速启动与零安装运行

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：通过 npx 或全局 npm 快速启动 DeepSeek Harness 运行时与基础环境检查；无需繁重本地环境配置，基于 Node.js/Cordis 微内核即开即用，几秒内即可体验官方 Developer Preview
- **练习**：在自己的项目里复现「CLI 快速启动与零安装运行」：检查本地 Node.js 版本是否满足 >= 20.0.0 要求
- **检查点**：Windows PowerShell 下若提示未授权脚本运行错误，需使用管理员身份调整 ExecutionPolicy 或通过 npx 运行。
- **功能卡**：[CLI 快速启动与零安装运行](features.md#dsh-cli-quickstart)
- **官方文档**：https://deepseek-harness.github.io/deepseek-harness/

### 1.2 Web UI 交互式控制台

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：启动轻量级本地 Web 仪表盘（默认端口 3080），直观管理多轮会话、模型调用与可视化面板；提供比纯终端更清晰的多轮对话流、实时 Token 消耗展示、模型切换与插件状态监控
- **练习**：在自己的项目里复现「Web UI 交互式控制台」：在终端中输入 dsh web（等价于 dsh --profile web）
- **检查点**：若 3080 端口已被其他本地开发服务占用，启动可能会报错，务必显式传入 --port 指定空闲端口。
- **功能卡**：[Web UI 交互式控制台](features.md#dsh-web-ui)
- **官方文档**：https://deepseek-harness.github.io/deepseek-harness/

### 1.3 模型与 Provider 密钥配置

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：配置官方 deepseek-official 路由或第三方兼容模型，通过安全凭据文件与环境变量注入 API Key；凭据与配置完全解耦，密钥绝不硬编码在 Git 追踪文件内，原生支持 DeepSeek-V3 / R1 系列模型端点
- **练习**：在自己的项目里复现「模型与 Provider 密钥配置」：从 DeepSeek 开放平台获取有效 API Key
- **检查点**：绝对不要将明文 API Key 写入 cordis.patch.yml；应通过环境变量或专用的 ~/.dsh/.credentials.yaml 注入。
- **功能卡**：[模型与 Provider 密钥配置](features.md#dsh-model-provider)
- **官方文档**：https://api-docs.deepseek.com/guides/harness

### 1.4 TUI 终端全屏交互模式

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：在终端内运行功能齐备的交互式 TUI 界面，支持快捷键切换面板与流式高亮输出；针对无浏览器环境与远程 SSH 运维场景优化，在低系统开销下提供完整的交互与代码审查能力
- **练习**：在自己的项目里复现「TUI 终端全屏交互模式」：先给 tui Profile 安装终端 UI 插件：dsh plugin --profile tui add github:deepseek-harness/turtle-ui
- **检查点**：tui 不是内置命令，必须先安装 turtle-ui 插件；Windows 建议使用 Windows Terminal。
- **功能卡**：[TUI 终端全屏交互模式](features.md#dsh-tui-mode)
- **官方文档**：https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md

**模块检查点**：完成「TUI 终端全屏交互模式」，并能在自己的项目里独立复现。

---

## 模块 2：环境管理与工程自动化

学习 Profile 多环境隔离、声明式 Patch 层、Headless 任务执行以及插件安装与 MCP 协议集成。

> 6 节课 · 约 150 分钟

### 2.1 Headless 任务与 CI/CD 自动化

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：通过 headless Profile 单次触发、打印最终结果并返回进程状态码，适合脚本与 CI；可无缝嵌入 Makefile、GitHub Actions 或自动化运维脚本，实现无人值守的代码审查与自动化修复
- **练习**：在自己的项目里复现「Headless 任务与 CI/CD 自动化」：准备需要自动执行的任务提示词
- **检查点**：headless 不启动 Web/HTTP 服务；需要审批或交互的任务应改用 Web/TUI Profile。
- **功能卡**：[Headless 任务与 CI/CD 自动化](features.md#dsh-headless-automation)
- **官方文档**：https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md

### 2.2 Profile 多环境隔离机制

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：基于 $DSH_HOME/profiles/ 目录的隔离架构，实现多任务、多配置间的独立依赖与插件环境；可在同一台机器上同时管理面向开发的宽松环境与面向生产的严格只读环境，配置完全独立且互不污染
- **练习**：在自己的项目里复现「Profile 多环境隔离机制」：查看本地已有 Profile 目录：~/.dsh/profiles/
- **检查点**：若自定义 Profile 因错误配置损坏导致启动失败，可通过 --from-default-profile <template> 重新重置为初始模板。
- **功能卡**：[Profile 多环境隔离机制](features.md#dsh-profiles-management)
- **官方文档**：https://deepseek-harness.github.io/deepseek-harness/

### 2.3 声明式 Patch 配置层与转储

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：基于 cordis.patch.yml 的原子替换与层叠机制，搭配 --dump-config 输出最终有效配置树；避免传统 deep merge 带来的配置冲突与歧义，支持通过简单的 YAML 补丁精确替换特定服务与模型参数
- **练习**：在自己的项目里复现「声明式 Patch 配置层与转储」：了解 Patch 层叠优先级：Bundle 默认 < Profile Patch < 全局 Patch < CLI --patch
- **检查点**：Cordis Patch 采用 ID 行级原子替换而非递归合并字段，配置某插件时须写出该插件对应 target 块的完整 config。
- **功能卡**：[声明式 Patch 配置层与转储](features.md#dsh-cordis-patch-layer)
- **官方文档**：https://deepseek-harness.github.io/deepseek-harness/

### 2.4 插件包管理系统 (dsh plugin)

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：利用 dsh plugin --profile <name> add/remove 自动化安装与卸载特定 Profile 的插件包；自动将插件安装至 Profile 的专用隔离目录，由内部 pnpm 解析依赖并生成 lockfile，无需手动篡改根环境
- **练习**：在自己的项目里复现「插件包管理系统 (dsh plugin)」：选定目标环境 Profile（如 web）
- **检查点**：安装/卸载 Bundle 后必须重启 Profile；运行中的实例不会热切换 Bundle 集合。
- **功能卡**：[插件包管理系统 (dsh plugin)](features.md#dsh-plugin-cli)
- **官方文档**：https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md

### 2.5 MCP Client 协议桥接

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：CLI 自带 MCP client 依赖，但默认不启用任何 MCP server；通过 Profile 的 patch 层显式接入；按需接入标准 MCP 生态（文件检索、数据库、GitHub 等），同时避免默认信任任何外部可执行 server
- **练习**：在自己的项目里复现「MCP Client 协议桥接」：确认 Profile 依赖中包含 @deepseek-ai/dsh-mcp-client（CLI 自带，默认不启用 server）
- **检查点**：MCP server 命令是在 Agent 沙箱之外执行的受信代码；只接入你信任的 server，并在 patch 中显式声明。
- **功能卡**：[MCP Client 协议桥接](features.md#dsh-mcp-client)
- **官方文档**：https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md

### 2.6 会话持久化与 zstd 压缩存储

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：基于事件溯源的会话持久化，默认以 session.v3.jsonl.zstd 记录推理与工具调用轨迹；完整捕获复杂长任务的推理分支与工具交互，同时通过高效流式压缩大幅节省高频交互下的磁盘消耗
- **练习**：在自己的项目里复现「会话持久化与 zstd 压缩存储」：会话默认保存在 ~/.dsh/sessions/ 下，按 Profile 与 Session 分层
- **检查点**：压缩后的 session 不能用普通文本查看器直接打开；先用 zstdcat 解压。
- **功能卡**：[会话持久化与 zstd 压缩存储](features.md#dsh-session-persistence)
- **官方文档**：https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md

**模块检查点**：完成「会话持久化与 zstd 压缩存储」，并能在自己的项目里独立复现。

---

## 模块 3：内核定制、安全沙箱与多 Agent 编排

深入 Cordis 插件编写、Profile 救援、沙箱权限与子代理协同。

> 4 节课 · 约 145 分钟

### 3.1 Profile 救援与配置恢复 (dsh rescue)

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：当 Profile 配置损坏或无法启动时，用 dsh rescue 从默认模板恢复一个可启动环境；Profile 是隔离环境，patch 或依赖出错会导致启动失败；rescue 提供官方恢复路径，避免手删目录
- **练习**：在自己的项目里复现「Profile 救援与配置恢复 (dsh rescue)」：先备份 ~/.dsh/profiles/<name> 目录
- **检查点**：重建会删除目标 Profile 原有依赖与用户 patch；先备份，且目标名不能与内置 profile 同名（不区分大小写）。
- **功能卡**：[Profile 救援与配置恢复 (dsh rescue)](features.md#dsh-context-rescue)
- **官方文档**：https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md

### 3.2 沙箱与权限模式

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：基于 bwrap / Landlock / Seatbelt 的进程沙箱与 workspace-write 权限预设，限制 Bash 与文件写入范围；默认 workspace-write 把命令与写操作限制在会话工作区，降低误删/越权风险；读取与网络默认不隔离，需按需加强
- **练习**：在自己的项目里复现「沙箱与权限模式」：了解默认 permission preset：workspace-write（Bash 与文件写入限制在工作区与临时目录）
- **检查点**：读取与网络默认不受限；需要更强隔离时使用容器/VM，不要只依赖 workspace-write。
- **功能卡**：[沙箱与权限模式](features.md#dsh-sandboxing-security)
- **官方文档**：https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md

### 3.3 自定义插件开发 (apply 与依赖注入)

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：基于 Cordis 微内核编写 TypeScript 插件，利用 inject 声明服务依赖并通过 apply(ctx) 扩展核心能力；真正落地 Everything is a Plugin 理念，随心所欲定制专有业务工具、修改 Prompt 模版或替换 Agent Loop 逻辑
- **练习**：在自己的项目里复现「自定义插件开发 (apply 与依赖注入)」：编写插件源文件（如 my-plugin.ts），导出 name 标识与 apply(ctx) 函数
- **检查点**：若插件使用了 ctx.tools 等服务却未在 inject 数组中显式声明依赖，Cordis 在异步挂载阶段可能会抛出 undefined 引用异常。
- **功能卡**：[自定义插件开发 (apply 与依赖注入)](features.md#dsh-custom-plugin-dev)
- **官方文档**：https://deepseek-harness.github.io/deepseek-harness/

### 3.4 子代理协同（Codex / Claude Code Subagents）

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：通过官方 subagent 插件把 Codex 或 Claude Code 作为子代理接入 Harness；把任务分派给不同 Agent，利用各自模型与工具优势；插件按 Profile 隔离，可只装一个或两个都装
- **练习**：在自己的项目里复现「子代理协同（Codex / Claude Code Subagents）」：给 Profile 安装子代理插件：dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex @deepseek-ai/dsh-subagent-claude-code
- **检查点**：安装 Bundle 后必须重启 Profile；只安装不会自动启用工具行。
- **功能卡**：[子代理协同（Codex / Claude Code Subagents）](features.md#dsh-multi-agent-teams)
- **官方文档**：https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md

**模块检查点**：完成「子代理协同（Codex / Claude Code Subagents）」，并能在自己的项目里独立复现。

