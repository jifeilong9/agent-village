# Claude Code · 功能手册

> 核对日期：2026-11-11　版本：2.1.322　厂商：Anthropic
>
> 返回 [README](README.md) · [来源记录](sources.md)

本手册覆盖 13 个功能，按难度分为入门 / 进阶 / 高级。每个功能都给出可执行步骤、命令与常见坑；遇到版本差异，以官方文档为准。

---

## 入门

<a id="cc-slash-commands"></a>
### 斜杠命令与会话交互

> 入门 · 基础交互 · 热度 90

**一句话**：在交互终端中使用 / 快速唤出内置指令，高效管理上下文清理、会话恢复、系统自检与全局配置。

**为什么值得学**：斜杠命令是控制 Claude Code 会话生命周期与环境配置最快捷的途径，无需跳出终端即可掌控一切运行参数。

**手把手**

1. 在交互式会话终端输入框中直接输入 / 唤出自动补全指令面板
2. 输入 /clear 清除当前对话上下文以开始全新任务，或输入 /compact 压缩当前超长会话
3. 输入 /resume 浏览并恢复历史会话列表，继续未完成的代码工作
4. 输入 /config 打开可视化配置面板，管理默认模型、权限偏好与主题
5. 输入 /doctor 运行环境自检，诊断网络代理、API 认证与外部工具链可用性

**可复制命令**

```bash
claude
```

```bash
/help
```

```bash
/clear
```

```bash
/resume
```

```bash
/config
```

```bash
/doctor
```

**常见坑**：/clear 会清空对话上下文但不会撤销已修改的磁盘文件；如需回滚代码改动，请使用 /rewind 命令。

**标签**：`#CLI` `#会话管理` `#快捷指令` `#系统自检`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/quickstart#session-commands](https://docs.claude.com/en/docs/claude-code/quickstart#session-commands)

---

<a id="cc-memory-claude-md"></a>
### CLAUDE.md 与项目记忆体系

> 入门 · 记忆与规则 · 热度 95

**一句话**：通过项目根目录与子目录中的 CLAUDE.md 或 AGENTS.md 固化架构规范、构建命令与代码风格，支持自动记忆积累。

**为什么值得学**：消除反复输入项目约定的繁琐沟通，让 Claude 在每次会话启动时自动加载团队工程共识，确保生成代码完全符合团队标准。

**手把手**

1. 在项目根目录下创建 CLAUDE.md 文件（或 .claude/rules/ 规则目录）
2. 记录核心构建、测试、代码检查命令以及技术栈与代码设计规范
3. 使用 @ 语法（如 @docs/api-specs.md）引入子模块文档进行分层组织
4. 启动 claude，Claude 会在会话初始自动读取该文件并注入上下文提示词
5. 在会话中使用 /memory 命令随时查看自动累积的经验记忆并进行编辑修正

**可复制命令**

```bash
touch CLAUDE.md
```

```bash
claude
```

```bash
/memory
```

**常见坑**：CLAUDE.md 不应贴入整段业务代码，应集中记录难以通过阅读代码直接推导的隐性规范与构建指令，文件过大会过多挤占上下文。

**标签**：`#配置` `#工程规范` `#上下文管理` `#知识库`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/memory](https://docs.claude.com/en/docs/claude-code/memory)

---

<a id="cc-plan-mode"></a>
### Plan Mode 架构规划模式

> 入门 · 任务规划 · 热度 94

**一句话**：只读安全探索模式，先深入分析代码并输出详尽执行方案，经人工审阅批准后再切回写入模式落地修改。

**为什么值得学**：面对大型重构或未知代码库时，避免 AI 贸然修改文件导致逻辑错乱或产生难以追溯的破坏性改动。

**手把手**

1. 启动会话时添加参数 claude --permission-mode plan，或在交互会话中按 Shift+Tab 切换至 Plan 模式
2. 检查终端底部状态栏显示 ⏸ plan mode on 标识确认已进入只读规划模式
3. 输入复杂需求（例如：'重构用户权限验证逻辑为 RBAC 架构'），Claude 将只读调用工具探索代码并输出详细拆解计划
4. 方案生成完毕后触发 ExitPlanMode 确认对话框，可在系统编辑器中审阅或修改方案文本
5. 按下回车确认批准计划后，Claude 自动切回写入模式并逐项实施变更

**可复制命令**

```bash
claude --permission-mode plan
```

```bash
Shift+Tab
```

**常见坑**：在 Plan 模式下所有写入工具（Edit、Write、文件破坏性命令）均被拦截，若需求要求立即修改文件需先退出规划模式。

**标签**：`#安全探索` `#架构设计` `#方案预审` `#只读模式`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/permission-modes](https://docs.claude.com/en/docs/claude-code/permission-modes)

---

<a id="cc-headless-pipe"></a>
### Headless 模式与 Unix 管道

> 入门 · CLI 脚本化 · 热度 88

**一句话**：使用 -p (--print) 参数非交互执行单次查询并输出至 stdout，无缝接入 Shell 脚本、CI 流水线与管道命令。

**为什么值得学**：将 Claude 的代码理解与生成能力化作标准 Unix 工具，与其他命令行工具链无缝组合，实现高灵活度的自动化处理。

**手把手**

1. 使用 claude -p "<问题>" 运行单次非交互式指令，结果将直接输出至控制台并正常退出
2. 使用管道符号 | 将前置命令的输出（如 git diff、日志）传递给 Claude 进行智能分析
3. 添加 --output-format json 参数以获得机器友好的结构化 JSON 响应
4. 在 CI/CD 中配合 --bare 参数跳过外部钩子与记忆加载，获得极速、纯净的执行环境
5. 根据退出码（0 表示成功，非 0 表示异常）在脚本中进行后续逻辑分支判断

**可复制命令**

```bash
claude -p "解释当前目录的核心架构"
```

```bash
git diff main --name-only | claude -p "审查这些变更文件是否存在安全缺陷"
```

```bash
tail -n 100 app.log | claude -p "分析异常日志根因并输出修复建议"
```

**常见坑**：-p 模式无法与 --bg（后台模式）并存；脚本自动化中若遇到未预先授权的工具权限，将直接抛出错误退出，建议配合 --allowedTools 使用。

**标签**：`#CLI` `#管道操作` `#自动化脚本` `#CI/CD`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/cli-reference](https://docs.claude.com/en/docs/claude-code/cli-reference)

## 进阶

<a id="cc-rewind-checkpoints"></a>
### Checkpoints 快照与 /rewind 时光机

> 进阶 · 版本控制 · 热度 92

**一句话**：自动为每次 Prompt 轮次记录文件与对话快照（保留最近 100 轮），支持一键精准撤销并恢复代码或对话。

**为什么值得学**：彻底消除 AI 编程中的试错风险，即使复杂的生成代码产生偏差，也能瞬间精确回退至特定节点，无需手动 git checkout。

**手把手**

1. 在交互终端中让 Claude 执行多轮代码修改与单元测试调试
2. 当需要撤销改动时，在空输入行连按两次 Esc 键，或直接输入 /rewind 调出时光机菜单
3. 在交互式列表中通过上下箭头挑选目标历史快照点，查看改动摘要
4. 选择回滚模式：同时恢复代码与对话、仅恢复代码、仅恢复对话、或从该点生成摘要压缩上下文
5. 确认执行后，本地代码文件与对话记录瞬间回退至选定时光节点

**可复制命令**

```bash
/rewind
```

```bash
Esc Esc
```

**常见坑**：通过 Fork 分支出来的独立会话不会继承父会话的历史文件快照，无法在 Fork 会话中回滚到分支创建前的文件状态。

**标签**：`#快照回滚` `#容错机制` `#代码时光机` `#会话管理`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/sessions#manage-context-within-a-session](https://docs.claude.com/en/docs/claude-code/sessions#manage-context-within-a-session)

---

<a id="cc-skills"></a>
### Skills 自定义能力与动态上下文

> 进阶 · 扩展能力 · 热度 93

**一句话**：在 .claude/skills/<name>/SKILL.md 中封装可复用能力，支持按需加载与动态命令输出。

**为什么值得学**：将项目专属的高频复杂工作流（如 PR 审查、部署脚本、数据库迁移）固化为团队内开箱即用的一键命令。

**手把手**

1. 在项目根目录创建 .claude/skills/review-pr/SKILL.md（个人级放 ~/.claude/skills/）
2. 在 YAML frontmatter 中写 name 与 description；description 决定模型何时自动加载
3. 正文写审查清单；用 !`git diff main` 注入实时命令输出
4. 在会话输入 /review-pr 手动调用，或直接描述任务让模型按需加载

**可复制命令**

```bash
mkdir -p .claude/skills/review-pr
```

```bash
/review-pr
```

**常见坑**：Skills 是「目录 + SKILL.md」，不是单个 .md 文件；旧式单文件命令放在 .claude/commands/，两者不要混淆。

**标签**：`#自定义命令` `#工作流` `#Prompt工程` `#动态上下文`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/skills](https://docs.claude.com/en/docs/claude-code/skills)

---

<a id="cc-mcp"></a>
### MCP (Model Context Protocol) 工具协议集成

> 进阶 · 外部集成 · 热度 96

**一句话**：借助标准开放的 MCP 协议连接本地与远程服务器（stdio、HTTP、SSE、WebSocket），为 Claude 挂载外部工具与数据源。

**为什么值得学**：突破本地文本工具局限，让 Claude Code 能够直接安全地查询数据库、操作 GitHub、调用内部监控与微服务。

**手把手**

1. 使用 claude mcp add 命令添加 MCP 服务器，指定传输协议与运行命令
2. 根据需求选择配置范围：当前终端 local、项目级 .mcp.json 或用户级 ~/.claude/mcp.json
3. 在会话中运行 /mcp 命令查看已连接的服务状态、工具清单与可用资源
4. 在对话中自然提示 Claude 调用目标工具（如：'查询数据库中最新的 5 条订单记录'）
5. Claude Code 自动在后台将长耗时 MCP 任务调度为后台任务执行并返回结果

**可复制命令**

```bash
claude mcp add --transport stdio github -- npx -y @modelcontextprotocol/server-github
```

```bash
claude mcp add --transport stdio postgres -- npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb
```

```bash
claude mcp list
```

```bash
/mcp
```

**常见坑**：stdio server 的命令必须放在 -- 之后，否则 server 自己的参数会被 Claude Code 当成 CLI 选项解析；项目级 .mcp.json 不要硬编码密钥。

**标签**：`#MCP` `#外部系统` `#数据库` `#协议扩展`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/mcp](https://docs.claude.com/en/docs/claude-code/mcp)

---

<a id="cc-hooks"></a>
### Hooks 生命周期事件钩子

> 进阶 · 自动化 · 热度 95

**一句话**：监听 SessionStart、PreToolUse、PostToolUse 等数十种事件，执行自动化格式化、安全守卫拦截或状态同步。

**为什么值得学**：在开发全生命周期注入自动化确定性保障，例如在代码写入后自动执行 linter，或阻止未授权的敏感命令运行。

**手把手**

1. 在 .claude/settings.json 或 ~/.claude/settings.json 中声明 hooks 配置节点
2. 指定需要监听的目标事件（如 PreToolUse 拦截工具调用，PostToolUse 执行后处理）
3. 编写钩子行为：可调用本地脚本、发送 HTTP Webhook 或调用 MCP 工具
4. 通过退出码与返回 JSON 实施决策控制：返回 0 正常放行，非 0 或结构化拒绝则阻断该操作
5. 启动 claude 运行，当触发相应事件时钩子将在底层自动被调度执行

**可复制命令**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "npx prettier --write ." }
        ]
      }
    ]
  }
}
```

**常见坑**：hooks 配置必须是「事件 → matcher 组 → hooks 处理器」三层结构；钩子通过 stdin 接收 JSON，不是读取 $CLAUDE_TOOL_INPUT_PATH。

**标签**：`#自动化` `#生命周期` `#安全防护` `#格式化`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/hooks](https://docs.claude.com/en/docs/claude-code/hooks)

---

<a id="cc-permissions"></a>
### 多级权限与安全控制体系

> 进阶 · 安全合规 · 热度 91

**一句话**：提供 auto、manual、plan、acceptEdits、dontAsk 等六种安全模式，搭配 fine-grained allow/deny 规则构建纵深防御。

**为什么值得学**：满足从个人高效开发到企业级严格合规的安全诉求，精确界定 Agent 的自主权限边界，杜绝数据泄露与误删风险。

**手把手**

1. 使用快捷键 Shift+Tab 在会话中循环切换权限模式（如 manual 确认模式或 acceptEdits 快速编辑模式）
2. 启动会话时可指定全局模式：claude --permission-mode <mode>
3. 在 .claude/settings.json 中配置 permissions.allow 预先放行安全的读操作或常用测试命令
4. 在 permissions.deny 中明确禁止高危命令（如 rm -rf、访问敏感凭证目录）
5. 使用 /config 交互面板检查当前项目的有效权限清单与覆盖规则

**可复制命令**

```bash
claude --permission-mode acceptEdits
```

```bash
Shift+Tab
```

```bash
/config
```

**常见坑**：deny 规则在任何模式（即使是 bypassPermissions 危险模式）下都会生效；配置 allow 规则时尽量避免使用过于宽泛的通配符。

**标签**：`#安全` `#权限管理` `#沙箱策略` `#合规`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/permission-modes](https://docs.claude.com/en/docs/claude-code/permission-modes)

---

<a id="cc-github-actions"></a>
### GitHub Actions CI/CD 与 @claude 协作

> 进阶 · CI/CD · 热度 93

**一句话**：通过官方 Action 在 CI 中运行 Claude Code，支持在 Issue 与 PR 评论中 @claude 进行代码审查、自动修复与分支提交。

**为什么值得学**：将 AI 结对编程直接延伸到 GitHub 协作平台，实现团队多人异步代码审查、缺陷自动复现与全自动 PR 修复。

**手把手**

1. 在本地终端会话中运行 /install-github-app 引导完成官方 GitHub App 的组织/仓库授权
2. 在 GitHub 仓库 Settings -> Secrets 中添加 ANTHROPIC_API_KEY 或配置 OIDC 身份联合凭据
3. 在仓库中创建工作流文件 .github/workflows/claude.yml 引用 anthropics/claude-code-action@v1
4. 配置触发事件（issue_comment、pull_request_review_comment 等）及必要写入权限
5. 在 Pull Request 评论中输入 '@claude 请修复这个单元测试报错'，Claude 将自动推送修复 Commit

**可复制命令**

```bash
/install-github-app
```

```bash
claude setup-token
```

**常见坑**：工作流必须授予 GITHUB_TOKEN 的 contents: write 与 pull-requests: write 权限，否则 Claude 无法向分支推送修复代码或评论。

**标签**：`#GitHub` `#CI/CD` `#自动化审查` `#异步协作`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/github-actions](https://docs.claude.com/en/docs/claude-code/github-actions)

## 高级

<a id="cc-subagents"></a>
### Subagents 专业子智能体分工

> 高级 · 多智能体 · 热度 97

**一句话**：在 .claude/agents/*.md 中声明具备专属角色、独立上下文、特定模型与定制工具集的 Subagent，支持后台并发调度。

**为什么值得学**：将消耗海量 Token 的代码全库检索、高频报错调试等繁重任务分流给子代理，保持主会话上下文精炼高效。

**手把手**

1. 在项目根目录下创建目录 .claude/agents/
2. 新建子代理定义文件（例如 .claude/agents/code-reviewer.md）
3. 在 Frontmatter 中配置 name、model、tools、effort 与 background 参数
4. 在 Markdown 正文中编写专有系统提示词（System Prompt），规定其审查清单与输出格式
5. 在交互终端中下达指令，Claude 会根据任务属性自动分派给该子代理执行
6. 输入 /tasks 查看当前所有正在后台运行或已完成的历史子代理状态与输出

**可复制命令**

```bash
mkdir -p .claude/agents
```

```bash
/tasks
```

**常见坑**：子代理如果配置了 background: true，其结果是以异步事件形式上报给主会话，主会话在连续任务规划时需合理处理异步依赖。

**标签**：`#多智能体` `#上下文隔离` `#后台并发` `#任务拆解`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/sub-agents](https://docs.claude.com/en/docs/claude-code/sub-agents)

---

<a id="cc-agent-sdk"></a>
### Agent SDK 编程式智能体开发

> 高级 · 二次开发 · 热度 94

**一句话**：使用官方 Python 与 TypeScript SDK 将 Claude Code 完整的 Agent 循环、工具生态与上下文管理能力嵌入自定义应用。

**为什么值得学**：超越命令行终端交互界面，让开发者能够以原生代码形式驱动拥有全量代码编辑与系统执行能力的专业 Agent 软件。

**手把手**

1. 根据开发语言安装官方 SDK：pip install claude-agent-sdk 或 npm install @anthropic-ai/claude-agent-sdk
2. 在环境变量中配置 ANTHROPIC_API_KEY
3. 使用轻量 query() 函数编写简单的无状态代码分析或生成脚本
4. 或者实例化 ClaudeSDKClient 构建支持持久会话、多轮交互与状态恢复的企业级应用
5. 在客户端中注入自定义工具与拦截处理器，构建专属智能开发平台

**可复制命令**

```bash
pip install claude-agent-sdk
```

```bash
npm install @anthropic-ai/claude-agent-sdk
```

**常见坑**：Agent SDK 底层会拉起 Claude Code 运行时，若在 Docker 或无头服务器环境中部署，需确保基础镜像中预装了 git 与 bash 工具。

**标签**：`#SDK` `#Python` `#TypeScript` `#二次开发` `#企业级应用`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/agent-sdk/overview](https://docs.claude.com/en/docs/claude-code/agent-sdk/overview)

---

<a id="cc-remote-teleport"></a>
### Remote Control 与 Teleport 跨端接力

> 高级 · 跨端协同 · 热度 89

**一句话**：通过 claude remote-control 与 claude --teleport 打通终端、Web、移动端与桌面端，实现多端无缝会话接力与可视化审阅。

**为什么值得学**：实现随时随地不间断的 AI 编程：离开工位时用手机监控云端或本地进度，回到电脑前一秒将任务拉回本地终端继续开发。

**手把手**

1. 在本地开发机终端中运行 claude remote-control 打开远程受控服务通道
2. 在手机或任意浏览器中登录 claude.ai/code，查看当前本地终端正在进行的任务与代码状态
3. 在移动端输入后续调优指令或进行操作权限确认
4. 若任务在云端或移动端启动，回到工位后在本地运行 claude --teleport 即可将远端会话无缝同步至本地终端接续执行
5. 在终端中输入 /desktop 命令，可将当前会话一键转移至 Claude Desktop 桌面端进行直观的可视化 Diff 审查

**可复制命令**

```bash
claude remote-control
```

```bash
claude --teleport
```

```bash
/desktop
```

**常见坑**：Teleport 与 Remote Control 需使用 Claude 官方付费账户登录；remote-control 会锁定启动时的项目目录，不支持远端随意切换绝对路径。

**标签**：`#远程控制` `#Teleport` `#跨端协同` `#桌面集成`

**官方文档**：[https://docs.claude.com/en/docs/claude-code/remote-control](https://docs.claude.com/en/docs/claude-code/remote-control)

