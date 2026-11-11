# Antigravity · 自动生成课程

> 由 `scripts/lib/course.mjs` 根据 `features.json` 的 learningPath 与功能数据自动编排。
> 共 3 个模块、13 节课，预计 345 分钟。

## 模块 1：初识 Agent-first 界面与核心协同

熟悉 Editor、Agent Manager 与 Browser 三大工作面，掌握内联编程、任务派发与产物验收流程

> 4 节课 · 约 60 分钟

### 1.1 Editor 内联 Agent 与差异评审

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：在代码编辑区直接呼出 Agent 进行自然语言重构、补全与单文件/多文件行内 Diff 交互审查；无需跳出当前代码上下文即可精准修改局部逻辑，直观对比修改前后代码并随时选择接受或回退
- **练习**：在自己的项目里复现「Editor 内联 Agent 与差异评审」：打开 Antigravity Editor，在右侧 Agent side panel 开始新会话
- **检查点**：选区过大时关注点容易发散，先聚焦具体函数或代码块。
- **功能卡**：[Editor 内联 Agent 与差异评审](features.md#ag-editor-inline)
- **官方文档**：https://antigravity.google/docs/agent-side-panel

### 1.2 Agent Manager 异步多任务中心

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：集中的异步 Agent 指挥看板，支持同时派发、排队与监控多个后台编程任务；将大型重构、全套单测编写等耗时任务直接卸载到后台运行，不阻塞前台人工编写代码与调试
- **练习**：在自己的项目里复现「Agent Manager 异步多任务中心」：在 Agent side panel 新建多个会话，用侧边栏切换、搜索或删除
- **检查点**：后台多个会话修改同一文件可能冲突，尽量拆到独立模块或 Git 分支。
- **功能卡**：[Agent Manager 异步多任务中心](features.md#ag-agent-manager)
- **官方文档**：https://antigravity.google/docs/agent/

### 1.3 内置 Browser 自动化验证与录屏

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：Agent 自带沙箱受控浏览器，能自动启动本地 Web 服务、模拟页面交互操作并生成验收截图与录屏；彻底告别「Agent 写完代码必须人工刷网页看效果」的痛点，由 Agent 自动完成端到端验证并附带图证
- **练习**：在自己的项目里复现「内置 Browser 自动化验证与录屏」：在任务提示词中加入前端页面开发或 Bug 修复指令，并注明需要浏览器验收
- **检查点**：本地服务端口被占用时 Browser 可能无法访问；在规则中约定固定端口或动态探测。
- **功能卡**：[内置 Browser 自动化验证与录屏](features.md#ag-browser-testing)
- **官方文档**：https://antigravity.google/docs/browser

### 1.4 Artifacts 结构化产物与 Walkthrough 验收

- **难度 / 时长**：入门 · 约 15 分钟
- **目标**：Agent 阶段性沉淀的富文本结构化产物，并在任务完成后自动生成整合测试与视觉证明的 Walkthrough；告别传统聊天窗口中杂乱冗长的信息流，所有重要方案、任务清单与交付成果皆结构化沉淀且便于追溯
- **练习**：在自己的项目里复现「Artifacts 结构化产物与 Walkthrough 验收」：给 Agent 派发复杂任务，观察 Artifacts / Implementation plan 自动生成
- **检查点**：跳过 Implementation Plan 直接放行容易漏掉边缘细节；先花一分钟读清单。
- **功能卡**：[Artifacts 结构化产物与 Walkthrough 验收](features.md#ag-artifacts)
- **官方文档**：https://antigravity.google/docs/artifacts

**模块检查点**：完成「Artifacts 结构化产物与 Walkthrough 验收」，并能在自己的项目里独立复现。

---

## 模块 2：掌控推演规划与自主执行安全

从单步生成进阶到先规划后实施，掌握 Planning 模式、权限预设档位与命令回滚机制

> 5 节课 · 约 125 分钟

### 2.1 Planning 模式 (/plan) 架构推演

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：只读推演工作流：在触碰任何代码文件前，完整扫描依赖拓扑、分解子任务并输出实施蓝图；针对大型工程避免 Agent「盲目改动一处引发多处编译报错」，做到先思考评审、后精准落地的工程纪律
- **练习**：在自己的项目里复现「Planning 模式 (/plan) 架构推演」：在 Agent 会话框输入 `/plan` 配合任务描述，例如：`/plan 将现有的 REST API 迁移到 tRPC 架构`
- **检查点**：项目缺少 .gitignore 时，Agent 可能把大量第三方目录纳入分析；先清理工作区。
- **功能卡**：[Planning 模式 (/plan) 架构推演](features.md#ag-planning-mode)
- **官方文档**：https://antigravity.google/docs/artifact-review

### 2.2 Unified Permission 审批策略与自主级别

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：基于 Deny > Ask > Allow 判定链的统一权限引擎，提供四档可切换的自主运行策略预设；在「完全无人干预的高效运作」与「敏感生产资产的安全可控」之间自由设定边界，杜绝危险操作
- **练习**：在自己的项目里复现「Unified Permission 审批策略与自主级别」：在主界面点击齿轮图标进入「Settings」>「Permissions & Autonomy」配置页
- **检查点**：不要在含生产凭证的仓库开启 Turbo；Deny 规则优先于 Allow。
- **功能卡**：[Unified Permission 审批策略与自主级别](features.md#ag-permission-engine)
- **官方文档**：https://antigravity.google/docs/agent-permissions

### 2.3 终端安全策略与 Allow/Deny 列表

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：在 OS 级轻量沙箱中隔离运行终端命令，支持基于正则与工具名精准维护命令白名单与黑名单；让常规的 git、npm test、tsc 等只读/验证命令实现秒级全自动执行，同时对危险指令强力拦截
- **练习**：在自己的项目里复现「终端安全策略与 Allow/Deny 列表」：在 CLI 输入 /permissions，或在 Settings > General > Global Permissions 打开权限设置
- **检查点**：Deny > Ask > Allow；一条过宽的 Deny 会连带拦截正常命令。
- **功能卡**：[终端安全策略与 Allow/Deny 列表](features.md#ag-allow-deny-policy)
- **官方文档**：https://antigravity.google/docs/agent-permissions

### 2.4 会话检查点与时光倒流 (/rewind)

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：自动为会话轮次与代码文件建立快照检查点，支持使用 /rewind 或 /undo 一键回退状态并从历史节点分支实验；当 Agent 在探索过程中误入歧途或编写了不满意的实现时，能瞬间回退到最初良好的起点重新推演
- **练习**：在自己的项目里复现「会话检查点与时光倒流 (/rewind)」：在 Agent 交互过程中，系统会自动在每次规划确认及大步代码修改前后创建隐式 Checkpoint
- **检查点**：回滚会覆盖当前未提交的工作区改动；先 git stash 或提交。该功能以 CLI 文档为准。
- **功能卡**：[会话检查点与时光倒流 (/rewind)](features.md#ag-checkpoints-rewind)
- **官方文档**：https://antigravity.google/docs/cli/best-practices

### 2.5 VS Code / JetBrains / Zed 扩展

- **难度 / 时长**：进阶 · 约 25 分钟
- **目标**：在常用 IDE 中安装 Antigravity 扩展，复用同一套 Agent、权限与 Artifacts；不切换编辑器也能用 Antigravity；扩展会连接本地 agy 后端服务，VS Code / Visual Studio 已 GA，其他 IDE 多为 Preview
- **练习**：在自己的项目里复现「VS Code / JetBrains / Zed 扩展」：在 VS Code 扩展市场搜索 Google Antigravity（发布者 Google）并安装
- **检查点**：VS Code 扩展要求 VS Code 1.90+；JetBrains / Zed / Xcode 的支持可能仍是 Preview。
- **功能卡**：[VS Code / JetBrains / Zed 扩展](features.md#ag-vscode-extension)
- **官方文档**：https://antigravity.google/docs/ide/extensions/vscode/

**模块检查点**：完成「VS Code / JetBrains / Zed 扩展」，并能在自己的项目里独立复现。

---

## 模块 3：架构进阶：工程定制与智能体集群

通过 MCP 接入外部生态，利用 Swarm 组织多 Agent 分工协同，沉淀团队 Rules 与工作流知识。

> 4 节课 · 约 160 分钟

### 3.1 Model Context Protocol (MCP) 服务集成

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：全面支持工业级开放 MCP 协议，通过标准接口挂载数据库、GitHub、Sentry 及各类私有 API 工具；打破 LLM 的孤岛限制，使 Agent 具备直接查询线上库表结构、调取错误日志与调用企业内部服务的超强能力
- **练习**：在自己的项目里复现「Model Context Protocol (MCP) 服务集成」：Antigravity App：打开 Customizations → Installed → MCP Servers → Add MCP Server
- **检查点**：未配置的 MCP 工具默认走 Ask；只启用当前项目需要的 server，避免 Token 与权限膨胀。
- **功能卡**：[Model Context Protocol (MCP) 服务集成](features.md#ag-mcp-integration)
- **官方文档**：https://antigravity.google/docs/mcp

### 3.2 多模型无缝切换与 Thinking 深度调节

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：在 Gemini 4 Carbon / Gemini 3.8 Flash 与 Claude 5.5 等模型之间切换，并调节 Thinking 深度；针对日常小补丁采用极速轻量模型节省成本，针对高难度架构重构开启高深度 Thinking 换取最强推理效果
- **练习**：在自己的项目里复现「多模型无缝切换与 Thinking 深度调节」：在 prompt 输入框下方打开模型选择器
- **检查点**：第三方模型（如 Claude 系列）可能需要企业授权与额外配额。
- **功能卡**：[多模型无缝切换与 Thinking 深度调节](features.md#ag-model-selection)
- **官方文档**：https://antigravity.google/docs/models

### 3.3 多 Agent 并行执行与 Swarm 协作

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：通过 /swarm 命令唤醒主从多智能体网络，将架构规划、代码实现、单测编写与文档输出并发交由不同专精子 Agent；将串行耗时数小时的大型工程升级任务，利用多子 Agent 在独立工作区分工并行处理，成倍压缩交付周期
- **练习**：在自己的项目里复现「多 Agent 并行执行与 Swarm 协作」：在复杂任务中输入 `/swarm` 模式命令，例如：`/swarm 实施微服务模块重构并并行补齐单测与 API 文档`
- **检查点**：Swarm 仍在 Preview，且每个 worker 独立消耗配额；配额耗尽后成员会暂停且不会自动恢复。
- **功能卡**：[多 Agent 并行执行与 Swarm 协作](features.md#ag-multi-agent-swarm)
- **官方文档**：https://antigravity.google/docs/swarm

### 3.4 工程规则体系 (AGENTS.md / GEMINI.md / Rules)

- **难度 / 时长**：高级 · 约 40 分钟
- **目标**：用 AGENTS.md、GEMINI.md 与 .agents/rules/*.md 注入长期规则，支持 trigger/globs 控制生效范围；把团队规范、架构红线和审查要求代码化，减少重复提示，并让规则按文件/场景精准生效
- **练习**：在自己的项目里复现「工程规则体系 (AGENTS.md / GEMINI.md / Rules)」：在项目根目录创建 AGENTS.md 或 GEMINI.md，写入技术栈、代码风格与审查要求
- **检查点**：规则是常驻上下文，越长越挤占预算；只写稳定、可复用的约束，不要把整段业务代码贴进去。
- **功能卡**：[工程规则体系 (AGENTS.md / GEMINI.md / Rules)](features.md#ag-rules-and-skills)
- **官方文档**：https://antigravity.google/docs/rules

**模块检查点**：完成「工程规则体系 (AGENTS.md / GEMINI.md / Rules)」，并能在自己的项目里独立复现。

