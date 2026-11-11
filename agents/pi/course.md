# Pi · 自动生成课程

> 由 `scripts/lib/course.mjs` 根据 `features.json` 的 learningPath 与功能数据自动编排。
> 共 3 个模块、14 节课，预计 355 分钟。

## 模块 1：新手入门：安装、交互与基础操作

掌握终端启动、TUI 快捷键、@ 文件检索、多模型切换与会话树回溯基本功。

> 5 节课 · 约 85 分钟

### 1.1 交互式 TUI 与人机协同控制

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：基于差异渲染的全屏终端交互界面，支持运行中实时 Enter 干预与 Alt+Enter 任务排队；彻底打破传统命令行 Agent 生成时的锁死假死状态，让开发者在模型调用工具时随时调整执行路线或顺序追加指令
- **练习**：在自己的项目里复现「交互式 TUI 与人机协同控制」：在代码根目录下运行 pi 进入交互界面
- **检查点**：在 Windows 传统 cmd 窗口中可能出现按键冲突，推荐使用现代 Windows Terminal 作为宿主环境。
- **功能卡**：[交互式 TUI 与人机协同控制](features.md#pi-interactive-tui)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md

### 1.2 @ 文件检索与 Tab 路径补全

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：输入 @ 快速调出模糊文件检索浮窗，配合 Tab 键秒级组装复杂项目上下文，支持直接粘贴图片；无需手动拼写繁杂长路径，精准引入代码文件与架构图等多模态资源，杜绝路径输错导致的幻觉
- **练习**：在自己的项目里复现「@ 文件检索与 Tab 路径补全」：在 Pi 交互界面中输入 @ 字符唤起模糊搜索列表
- **检查点**：若代码仓库未配置 .gitignore 且包含超大 node_modules，建立初始文件索引时可能会产生短暂卡顿。
- **功能卡**：[@ 文件检索与 Tab 路径补全](features.md#pi-file-search-tab)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md#enter-a-prompt

### 1.3 多模型即时切换与 Thinking 深度调节

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：内建支持 Anthropic、OpenAI、Gemini 等各大厂商，会话中按 Ctrl+L 或 Shift+Tab 随心调整模型与推理等级；在同一会话中根据任务复杂度灵活分配算力成本：复杂架构用高推理深度模型，日常修改用快速模型
- **练习**：在自己的项目里复现「多模型即时切换与 Thinking 深度调节」：在终端中输入 /login 完成 Provider 授权或配置 API Key
- **检查点**：对于不支持原生思考参数的模型，设置 high 会被系统自动钳位收敛，不会发生请求崩溃。
- **功能卡**：[多模型即时切换与 Thinking 深度调节](features.md#pi-model-thinking)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/models.md

### 1.4 会话树形回溯与安全分支

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：基于树状图（Tree Graph）存储对话历史，支持通过 /tree 任意回退探索新分支，结合 /compact 智能压缩；彻底告别试错死胡同导致历史截断丢失的问题，像 Git 版本控制一样自由穿梭于各个思考分支之间
- **练习**：在自己的项目里复现「会话树形回溯与安全分支」：在会话中输入 /tree 打开可视化的对话树状导航器
- **检查点**：分支切换仅作用于对话上下文历史，不会自动触发 git reset，本地代码改动需配合版本控制工具协同管理。
- **功能卡**：[会话树形回溯与安全分支](features.md#pi-session-tree)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sessions.md

### 1.5 Windows 与 Git Bash 运行环境适配

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：针对 Windows 平台的深层优化，自动解析 Git Bash 路径，支持引入 powershell 模型工具与终端防闪烁；解决类 Unix Agent 在 Windows 原生环境普遍面临的缺少 bash、换行错乱与控制台按键冲突等顽疾
- **练习**：在自己的项目里复现「Windows 与 Git Bash 运行环境适配」：安装 Git for Windows 确保系统内具备可用的 bash.exe
- **检查点**：在 Windows 配置文件中编写路径时，反斜杠必须写为双反斜杠（如 C:\\Program Files\\Git\\bin\\bash.exe）。
- **功能卡**：[Windows 与 Git Bash 运行环境适配](features.md#pi-windows-setup)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/windows.md

**模块检查点**：完成「Windows 与 Git Bash 运行环境适配」，并能在自己的项目里独立复现。

---

## 模块 2：进阶定制：提示词、技能与环境掌控

学会编写可复用 Markdown 指令模板、Agent Skills 技能库以及配置安全信任边界。

> 4 节课 · 约 100 分钟

### 2.1 提示词模板（Prompt Templates）

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：通过单个 Markdown 文件快速声明带参数的斜杠指令（如 /review），支持默认值替换与命令自动补全；无需编写任何 JavaScript 代码，以纯文本形式固化团队最常用的代码审查、生成发布说明等高频工作流
- **练习**：在自己的项目里复现「提示词模板（Prompt Templates）」：在用户目录新建 ~/.pi/agent/prompts/review.md 文件
- **检查点**：模板文件必须直接放置于 prompts 根目录下，嵌套在子目录中的 .md 默认不会被注册为顶层斜杠命令。
- **功能卡**：[提示词模板（Prompt Templates）](features.md#pi-prompt-templates)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/prompt-templates.md

### 2.2 Agent 技能机制（Skills）

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：实现标准 Agent Skills 规范，仅将技能概览注册在系统提示词中，任务匹配时才由模型按需深度加载执行；避免将大量垂直领域操作手册一次性塞满 System Prompt，保持极小常驻上下文开销，兼顾多场景专业能力
- **练习**：在自己的项目里复现「Agent 技能机制（Skills）」：在项目根目录创建 .agents/skills/pdf-tools/SKILL.md（或用户级 ~/.agents/skills/pdf-tools/SKILL.md）
- **检查点**：description 是模型判断是否加载技能的唯一依据；项目级技能还需要通过 Pi 的项目信任。
- **功能卡**：[Agent 技能机制（Skills）](features.md#pi-skills)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md

### 2.3 自适应终端主题（Themes）

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：基于 OKHSL / OKLCH 现代色彩空间构建，智能自适应当前终端 ANSI 配色与深浅底色，确保 4.5:1 无障碍高对比度；从底层消除传统 CLI 切换终端主题后的黑底黑字或白底白字尴尬，还能通过 JSON 打造专属极客品牌视觉
- **练习**：在自己的项目里复现「自适应终端主题（Themes）」：输入 /settings 选择 Theme，查看内置的 system、dark、light 表现
- **检查点**：自定义主题 JSON 文件名必须与内容中的 name 字段完全一致，且不能包含字符 /（该字符保留用于日夜自适应配置）。
- **功能卡**：[自适应终端主题（Themes）](features.md#pi-themes)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/themes.md

### 2.4 项目信任与安全沙箱机制

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：当首次进入含本地扩展、MCP 或特殊配置的代码仓库时激活安全拦截，防范未知仓库的 Prompt Injection 与恶意执行；在供应链攻击和提示词注入风险日益高涨的今天，为开发者在本地随意克隆测试未知开源项目提供了第一道安全门闸
- **练习**：在自己的项目里复现「项目信任与安全沙箱机制」：进入包含 .pi/ 目录的新开源项目并启动 pi
- **检查点**：项目信任仅控制本地配置与扩展脚本的加载权限，并不等同于操作系统级容器隔离，不可信代码务必放入 Docker 中运行。
- **功能卡**：[项目信任与安全沙箱机制](features.md#pi-project-trust)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md

**模块检查点**：完成「项目信任与安全沙箱机制」，并能在自己的项目里独立复现。

---

## 模块 3：高级扩展与工程集成：从插件到 SDK

深入 TypeScript 扩展开发、生态包管理、CLI 管道自动化、RPC 控制协议以及 SDK 二次开发。

> 5 节课 · 约 170 分钟

### 3.1 TypeScript 扩展系统（Extensions）

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：在 Pi 宿主进程中运行的原生 TypeScript 扩展，支持拦截全生命周期事件、注册自定义 Tool、阻断危险命令与定制 TUI；赋予开发者绝对的代码级掌控力，只需几十行 TypeScript 即可实现企业级安全权限守卫、自定义审批流或接入私有工具系统
- **练习**：在自己的项目里复现「TypeScript 扩展系统（Extensions）」：在 ~/.pi/agent/extensions/ 目录下创建 my-extension.ts
- **检查点**：扩展在当前进程同步运行，注意捕获内部异步异常，且不要在扩展内将宿主核心库列为 dependencies 物理打包。
- **功能卡**：[TypeScript 扩展系统（Extensions）](features.md#pi-extensions)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md

### 3.2 Pi Packages 资源包生态

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：将 extensions、skills、prompts 和 themes 打包聚合，支持直接通过 npm 或 Git 仓库一键安装与集中升级；告别零散脚本手动复制粘贴，让团队和社区的高质量能力资产实现标准化版本发布、自动依赖锁定与一键更新
- **练习**：在自己的项目里复现「Pi Packages 资源包生态」：使用 pi install 从 npm 或 GitHub 安装外部资源包
- **检查点**：项目级包配置在通过项目信任批准前不会执行，避免第三方仓库通过恶意 package.json 静默执行未知代码。
- **功能卡**：[Pi Packages 资源包生态](features.md#pi-packages)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md

### 3.3 CLI Print 与 JSON 自动化事件流模式

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：无头执行模式，提供 --print 直接回显最终答案以及 --mode json 逐行输出结构化 JSONL 事件流；完美契合 CI/CD 流水线、Git 自动化钩子以及 Shell 批处理脚本，轻松将 Agent 融入现有 DevOps 基础设施
- **练习**：在自己的项目里复现「CLI Print 与 JSON 自动化事件流模式」：使用 pi --print 执行单次任务并捕获文本输出到文件
- **检查点**：当 stdin 或 stdout 处于重定向状态且未显式指定模式时，Pi 默认自动降级为 Print 模式退出，不会挂起终端。
- **功能卡**：[CLI Print 与 JSON 自动化事件流模式](features.md#pi-cli-automation)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/cli.md

### 3.4 RPC 进程间控制协议

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：通过 pi --mode rpc 启动长寿命后台子进程，宿主应用通过 stdin/stdout 以 JSONL 双向协议完全控制 Agent；语言无关且天然具备进程隔离优势，是开发独立桌面 GUI（Electron/Tauri）、VS Code 插件或后端服务托管的核心模式
- **练习**：在自己的项目里复现「RPC 进程间控制协议」：使用子进程启动 pi --mode rpc --no-session
- **检查点**：解析 stdout 时必须严格按 LF (\n) 换行切分，切勿使用将 Unicode 行分隔符误判为换行的行读取器，否则会导致 JSON 解析错误。
- **功能卡**：[RPC 进程间控制协议](features.md#pi-rpc-mode)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md

### 3.5 嵌入式 TypeScript SDK

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：在 Node.js/Bun 宿主中直接调用 createAgentSession，享受 100% 原生 TypeScript 类型安全与进程内极速交互；为 TypeScript 开发者提供了比 RPC 更高吞吐、零序列化损耗、能直接操作 Session 内存对象树的最高级集成方案
- **练习**：在自己的项目里复现「嵌入式 TypeScript SDK」：在项目中执行 npm install @earendil-works/pi-coding-agent
- **检查点**：在已有生成仍在流式响应中时再次调用 session.prompt() 会直接抛错拒绝，插话需求需调用 session.steer()。
- **功能卡**：[嵌入式 TypeScript SDK](features.md#pi-sdk)
- **官方文档**：https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sdk.md

**模块检查点**：完成「嵌入式 TypeScript SDK」，并能在自己的项目里独立复现。

