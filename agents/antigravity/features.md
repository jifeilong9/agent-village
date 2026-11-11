# Antigravity · 功能手册

> 核对日期：2026-11-11　版本：2.31.0　厂商：Google
>
> 返回 [README](README.md) · [来源记录](sources.md)

本手册覆盖 13 个功能，按难度分为入门 / 进阶 / 高级。每个功能都给出可执行步骤、命令与常见坑；遇到版本差异，以官方文档为准。

---

## 入门

<a id="ag-editor-inline"></a>
### Editor 内联 Agent 与差异评审

> 入门 · 编辑器协同 · 热度 96 · 2025-11-18

**一句话**：在代码编辑区直接呼出 Agent 进行自然语言重构、补全与单文件/多文件行内 Diff 交互审查。

**为什么值得学**：无需跳出当前代码上下文即可精准修改局部逻辑，直观对比修改前后代码并随时选择接受或回退。

**手把手**

1. 打开 Antigravity Editor，在右侧 Agent side panel 开始新会话
2. 用 @ 引用文件/文件夹，用 / 执行动作，或用 + 添加上下文
3. 描述重构需求，Agent 会在编辑器内高亮改动
4. 在 Review 栏逐文件查看 diff，选择 Accept all / Reject all 或逐项处理



**常见坑**：选区过大时关注点容易发散，先聚焦具体函数或代码块。

**标签**：`#编辑器` `#Diff评审` `#行内重构` `#高频交互`

**官方文档**：[https://antigravity.google/docs/agent-side-panel](https://antigravity.google/docs/agent-side-panel)

---

<a id="ag-agent-manager"></a>
### Agent Manager 异步多任务中心

> 入门 · 调度中心 · 热度 98 · 2025-11-18

**一句话**：集中的异步 Agent 指挥看板，支持同时派发、排队与监控多个后台编程任务。

**为什么值得学**：将大型重构、全套单测编写等耗时任务直接卸载到后台运行，不阻塞前台人工编写代码与调试。

**手把手**

1. 在 Agent side panel 新建多个会话，用侧边栏切换、搜索或删除
2. 在 Agent Manager 中查看并行会话的进度与产物
3. CLI 中输入 /agents 打开 Agent Manager Panel，监控或终止后台子代理
4. 任务完成后在对应会话中查看 Artifacts 与 Walkthrough

**可复制命令**

```bash
/agents
```

**常见坑**：后台多个会话修改同一文件可能冲突，尽量拆到独立模块或 Git 分支。

**标签**：`#后台长任务` `#并行管理` `#多任务调度` `#工作区隔离`

**官方文档**：[https://antigravity.google/docs/agent/](https://antigravity.google/docs/agent/)

---

<a id="ag-browser-testing"></a>
### 内置 Browser 自动化验证与录屏

> 入门 · 自动化验证 · 热度 93 · 2025-11-18

**一句话**：Agent 自带沙箱受控浏览器，能自动启动本地 Web 服务、模拟页面交互操作并生成验收截图与录屏。

**为什么值得学**：彻底告别「Agent 写完代码必须人工刷网页看效果」的痛点，由 Agent 自动完成端到端验证并附带图证。

**手把手**

1. 在任务提示词中加入前端页面开发或 Bug 修复指令，并注明需要浏览器验收
2. Agent 自动在后台启动本地开发服务器（如 npm run dev），并调用 Chrome DevTools 协议打开沙箱浏览器
3. Agent 自动导航到本地 URL，执行页面元素点击、表单输入并实时监控控制台日志是否有报错
4. 任务结束时，在 Walkthrough 面板直接点击播放自动录制的 WebM 操作视频或查看高亮截图

**可复制命令**

```bash
/browser
```

**常见坑**：本地服务端口被占用时 Browser 可能无法访问；在规则中约定固定端口或动态探测。

**标签**：`#无头浏览器` `#UI验证` `#自动录屏` `#端到端测试`

**官方文档**：[https://antigravity.google/docs/browser](https://antigravity.google/docs/browser)

---

<a id="ag-artifacts"></a>
### Artifacts 结构化产物与 Walkthrough 验收

> 入门 · 评审交付 · 热度 95 · 2025-11-18

**一句话**：Agent 阶段性沉淀的富文本结构化产物，并在任务完成后自动生成整合测试与视觉证明的 Walkthrough。

**为什么值得学**：告别传统聊天窗口中杂乱冗长的信息流，所有重要方案、任务清单与交付成果皆结构化沉淀且便于追溯。

**手把手**

1. 给 Agent 派发复杂任务，观察 Artifacts / Implementation plan 自动生成
2. 按 Ctrl+R 打开 Artifact Review，查看计划、diff 与截图
3. 在计划上添加行内批注，按需切换 Request review / Always proceed 策略
4. 任务完成后查看 Walkthrough，确认测试结果与视觉证据后归档

**可复制命令**

```bash
Ctrl+R
```

**常见坑**：跳过 Implementation Plan 直接放行容易漏掉边缘细节；先花一分钟读清单。

**标签**：`#结构化交付` `#验收报告` `#任务清单` `#Walkthrough`

**官方文档**：[https://antigravity.google/docs/artifacts](https://antigravity.google/docs/artifacts)

## 进阶

<a id="ag-planning-mode"></a>
### Planning 模式 (/plan) 架构推演

> 进阶 · 任务规划 · 热度 94 · 2025-11-18

**一句话**：只读推演工作流：在触碰任何代码文件前，完整扫描依赖拓扑、分解子任务并输出实施蓝图。

**为什么值得学**：针对大型工程避免 Agent「盲目改动一处引发多处编译报错」，做到先思考评审、后精准落地的工程纪律。

**手把手**

1. 在 Agent 会话框输入 `/plan` 配合任务描述，例如：`/plan 将现有的 REST API 迁移到 tRPC 架构`
2. Agent 进入只读沙箱，深度遍历项目 AST 树、包依赖与接口定义，梳理出受影响的文件矩阵
3. 生成带有明确阶段依赖的 Implementation Plan 任务清单（包含探索、修改、验证三阶段）
4. 审阅计划细节，若无异议点击卡片底部的「Proceed」按钮，Agent 才会正式开始写入代码

**可复制命令**

```bash
/plan 迁移项目状态管理为 Zustand
```

**常见坑**：项目缺少 .gitignore 时，Agent 可能把大量第三方目录纳入分析；先清理工作区。

**标签**：`#架构规划` `#只读推演` `#任务分解` `#安全设计`

**官方文档**：[https://antigravity.google/docs/artifact-review](https://antigravity.google/docs/artifact-review)

---

<a id="ag-permission-engine"></a>
### Unified Permission 审批策略与自主级别

> 进阶 · 安全与权限 · 热度 91 · 2025-11-18

**一句话**：基于 Deny > Ask > Allow 判定链的统一权限引擎，提供四档可切换的自主运行策略预设。

**为什么值得学**：在「完全无人干预的高效运作」与「敏感生产资产的安全可控」之间自由设定边界，杜绝危险操作。

**手把手**

1. 在主界面点击齿轮图标进入「Settings」>「Permissions & Autonomy」配置页
2. 在运行预设中按需选择预设档位（Request Review / Default / Auto / Turbo）
3. 在下方规则列表中，针对敏感操作配置特定资源规则，如 `command(rm -rf *) -> Deny`
4. 在会话过程中，遇到触发 Ask 规则的操作时，系统会弹出确认弹窗并列出具体命令与影响范围供你单次或永久放行

**可复制命令**

```bash
/permissions
```

**常见坑**：不要在含生产凭证的仓库开启 Turbo；Deny 规则优先于 Allow。

**标签**：`#权限引擎` `#自主级别` `#安全隔离` `#审批控制`

**官方文档**：[https://antigravity.google/docs/agent-permissions](https://antigravity.google/docs/agent-permissions)

---

<a id="ag-allow-deny-policy"></a>
### 终端安全策略与 Allow/Deny 列表

> 进阶 · 终端与执行 · 热度 89 · 2025-11-18

**一句话**：在 OS 级轻量沙箱中隔离运行终端命令，支持基于正则与工具名精准维护命令白名单与黑名单。

**为什么值得学**：让常规的 git、npm test、tsc 等只读/验证命令实现秒级全自动执行，同时对危险指令强力拦截。

**手把手**

1. 在 CLI 输入 /permissions，或在 Settings > General > Global Permissions 打开权限设置
2. 用 action(target) 资源格式添加规则，如 command(git *) -> Allow
3. 添加高危黑名单，如 command(rm -rf *) -> Deny；支持 read_file(*)、mcp(*) 等通配
4. 在 Agent 运行日志中确认放行/拦截结果

**可复制命令**

```bash
/permissions
```

**常见坑**：Deny > Ask > Allow；一条过宽的 Deny 会连带拦截正常命令。

**标签**：`#终端隔离` `#白名单` `#黑名单` `#命令沙箱`

**官方文档**：[https://antigravity.google/docs/agent-permissions](https://antigravity.google/docs/agent-permissions)

---

<a id="ag-checkpoints-rewind"></a>
### 会话检查点与时光倒流 (/rewind)

> 进阶 · 状态管理 · 热度 90 · 2025-11-18

**一句话**：自动为会话轮次与代码文件建立快照检查点，支持使用 /rewind 或 /undo 一键回退状态并从历史节点分支实验。

**为什么值得学**：当 Agent 在探索过程中误入歧途或编写了不满意的实现时，能瞬间回退到最初良好的起点重新推演。

**手把手**

1. 在 Agent 交互过程中，系统会自动在每次规划确认及大步代码修改前后创建隐式 Checkpoint
2. 若发现 Agent 跑偏，在输入框键入 `/rewind` 呼出检查点树形选择器
3. 上下方向键选择想要回滚到的历史时刻（会明确展示当时的 Prompt 与代码快照差异）
4. 回车确认回退，工作区代码将恢复到该时刻状态；亦可输入 `/fork` 在该节点拉出一条全新对话分支继续尝试

**可复制命令**

```bash
/rewind
```

```bash
/undo
```

```bash
/fork
```

**常见坑**：回滚会覆盖当前未提交的工作区改动；先 git stash 或提交。该功能以 CLI 文档为准。

**标签**：`#检查点` `#回退` `#时光倒流` `#分支探索`

**官方文档**：[https://antigravity.google/docs/cli/best-practices](https://antigravity.google/docs/cli/best-practices)

---

<a id="ag-vscode-extension"></a>
### VS Code / JetBrains / Zed 扩展

> 进阶 · 生态扩展 · 热度 88 · 2025-11-18

**一句话**：在常用 IDE 中安装 Antigravity 扩展，复用同一套 Agent、权限与 Artifacts。

**为什么值得学**：不切换编辑器也能用 Antigravity；扩展会连接本地 agy 后端服务，VS Code / Visual Studio 已 GA，其他 IDE 多为 Preview。

**手把手**

1. 在 VS Code 扩展市场搜索 Google Antigravity（发布者 Google）并安装
2. 点击活动栏 Antigravity 图标，用 Google 账号登录
3. 首次启动会自动安装/连接本地 agy 后端服务
4. 在扩展面板中使用 Agent、Diff 与 Artifacts 审阅流程



**常见坑**：VS Code 扩展要求 VS Code 1.90+；JetBrains / Zed / Xcode 的支持可能仍是 Preview。

**标签**：`#VSCode扩展` `#无缝迁移` `#生态兼容` `#配置导入`

**官方文档**：[https://antigravity.google/docs/ide/extensions/vscode/](https://antigravity.google/docs/ide/extensions/vscode/)

## 高级

<a id="ag-mcp-integration"></a>
### Model Context Protocol (MCP) 服务集成

> 高级 · 上下文扩展 · 热度 97 · 2025-11-18

**一句话**：全面支持工业级开放 MCP 协议，通过标准接口挂载数据库、GitHub、Sentry 及各类私有 API 工具。

**为什么值得学**：打破 LLM 的孤岛限制，使 Agent 具备直接查询线上库表结构、调取错误日志与调用企业内部服务的超强能力。

**手把手**

1. Antigravity App：打开 Customizations → Installed → MCP Servers → Add MCP Server
2. Antigravity IDE：点击编辑器面板顶部 ... → MCP Servers → Install 或 Manage MCP Servers
3. CLI：在输入框输入 /mcp 打开 MCP 管理界面
4. 也可编辑 ~/.gemini/config/mcp_config.json 或工作区 .agents/mcp_config.json 添加 serverUrl / 本地命令

**可复制命令**

```bash
/mcp
```

**常见坑**：未配置的 MCP 工具默认走 Ask；只启用当前项目需要的 server，避免 Token 与权限膨胀。

**标签**：`#MCP` `#工具扩展` `#数据库连接` `#生态互联`

**官方文档**：[https://antigravity.google/docs/mcp](https://antigravity.google/docs/mcp)

---

<a id="ag-model-selection"></a>
### 多模型无缝切换与 Thinking 深度调节

> 高级 · 模型配置 · 热度 95 · 2025-11-18

**一句话**：在 Gemini 4 Carbon / Gemini 3.8 Flash 与 Claude 5.5 等模型之间切换，并调节 Thinking 深度。

**为什么值得学**：针对日常小补丁采用极速轻量模型节省成本，针对高难度架构重构开启高深度 Thinking 换取最强推理效果。

**手把手**

1. 在 prompt 输入框下方打开模型选择器
2. 选择 Gemini 4 Carbon / Gemini 3.8 Flash / Claude Sonnet 5.5 等可用模型
3. 调整 Thinking level（Low / Medium / High）
4. 用 /usage 查看当前额度与消耗

**可复制命令**

```bash
/usage
```

**常见坑**：第三方模型（如 Claude 系列）可能需要企业授权与额外配额。

**标签**：`#模型切换` `#Thinking深度` `#Gemini` `#Claude`

**官方文档**：[https://antigravity.google/docs/models](https://antigravity.google/docs/models)

---

<a id="ag-multi-agent-swarm"></a>
### 多 Agent 并行执行与 Swarm 协作

> 高级 · 多智能体 · 热度 96 · `NEW` · 2026-11-09

**一句话**：通过 /swarm 命令唤醒主从多智能体网络，将架构规划、代码实现、单测编写与文档输出并发交由不同专精子 Agent。

**为什么值得学**：将串行耗时数小时的大型工程升级任务，利用多子 Agent 在独立工作区分工并行处理，成倍压缩交付周期。

**手把手**

1. 在复杂任务中输入 `/swarm` 模式命令，例如：`/swarm 实施微服务模块重构并并行补齐单测与 API 文档`
2. 主 Orchestrator Agent 自动将总任务拆解为子任务拓扑，并派生 Researcher、Coder、Tester 三个专精 Subagent
3. 在 Agent Manager 界面可以看到各子 Agent 的实时状态泳道，各子 Agent 在独立的隔离分支推进
4. 主 Agent 集中审查合并各分支产物，运行全量集成测试，并在 Walkthrough 中统一输出总线交付报告

**可复制命令**

```bash
/swarm 重构支付网关并编写集成测试与文档
```

```bash
/swarm board
```

```bash
/agents
```

**常见坑**：Swarm 仍在 Preview，且每个 worker 独立消耗配额；配额耗尽后成员会暂停且不会自动恢复。

**标签**：`#Swarm` `#多智能体` `#并行协作` `#任务编排`

**官方文档**：[https://antigravity.google/docs/swarm](https://antigravity.google/docs/swarm)

---

<a id="ag-rules-and-skills"></a>
### 工程规则体系 (AGENTS.md / GEMINI.md / Rules)

> 高级 · 规则与技能 · 热度 93 · 2025-11-18

**一句话**：用 AGENTS.md、GEMINI.md 与 .agents/rules/*.md 注入长期规则，支持 trigger/globs 控制生效范围。

**为什么值得学**：把团队规范、架构红线和审查要求代码化，减少重复提示，并让规则按文件/场景精准生效。

**手把手**

1. 在项目根目录创建 AGENTS.md 或 GEMINI.md，写入技术栈、代码风格与审查要求
2. 需要分文件时放到 .agents/rules/*.md，用 frontmatter 的 trigger: always_on / model_decision / glob / manual
3. glob 规则写 globs；模型选择规则写 description；单文件上限 24,000 bytes
4. 全部生效规则的预算约 20,000 tokens，保持精简

**可复制命令**

```bash
mkdir -p .agents/rules
```

**常见坑**：规则是常驻上下文，越长越挤占预算；只写稳定、可复用的约束，不要把整段业务代码贴进去。

**标签**：`#AGENTS.md` `#GEMINI.md` `#Rules` `#工程规范`

**官方文档**：[https://antigravity.google/docs/rules](https://antigravity.google/docs/rules)

