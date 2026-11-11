# Codex · 功能手册

> 核对日期：2026-11-11　版本：0.167.1　厂商：OpenAI
>
> 返回 [README](README.md) · [来源记录](sources.md)

本手册覆盖 13 个功能，按难度分为入门 / 进阶 / 高级。每个功能都给出可执行步骤、命令与常见坑；遇到版本差异，以官方文档为准。

---

## 入门

<a id="codex-tui"></a>
### 交互式 TUI 与终端工作流

> 入门 · 基础交互 · 热度 95 · 2025-05-15

**一句话**：基于终端的全功能交互界面，支持多轮对话、实时流式输出、Diff 预览与快捷斜杠命令

**为什么值得学**：无需跳出终端即可获得强大的全仓库代码理解与修改能力，配合丰富的斜杠命令快速执行会话压缩、模型切换与权限变更。

**手把手**

1. 在终端中进入任意 Git 项目目录
2. 输入 codex 并回车进入交互式 TUI 界面
3. 在输入框输入任务描述（如：'优化 utils.ts 中的重试逻辑并编写对应单元测试'）
4. 通过 Tab 或键盘方向键审阅模型提出的终端命令与文件 Diff，按 Enter 确认执行
5. 输入 /status 或 /model 随时查看当前 Token 消耗与模型配置，输入 /exit 退出会话

**可复制命令**

```bash
codex
```

```bash
codex "重构当前模块，补充完整 TypeScript 类型声明"
```

**常见坑**：在非 Git 仓库中直接运行默认会提示警告，若需在非受管目录运行需添加 --skip-git-repo-check 参数。

**标签**：`#TUI` `#CLI` `#终端交互` `#入门首选`

**官方文档**：[https://developers.openai.com/codex/cli](https://developers.openai.com/codex/cli)

---

<a id="approval-sandbox"></a>
### 审批模式与三级安全沙箱

> 入门 · 安全性 · 热度 94 · 2025-06-01

**一句话**：严格的操作系统级运行边界，提供只读、工作区写入和完全权限三级沙箱，与智能审批策略协同防护

**为什么值得学**：AI Agent 自主运行 Shell 命令存在越权风险。Codex 细粒度的沙箱保障了即使模型产生幻觉，也不会逃逸出工作区破坏敏感文件或泄露密钥。

**手把手**

1. 审阅当前项目的安全要求，选定合适的沙箱级别（默认推荐 workspace-write）
2. 在执行敏感检查时启动 read-only 模式，禁止任何文件修改和写盘命令
3. 在自动化脚本中结合 --ask-for-approval never 实现免打扰受控执行
4. 在 TUI 中输入 /permissions 随时查看并动态切换当前沙箱与审批模式
5. 若需要授予额外目录写权限，使用 --add-dir <DIR> 显式挂载，避免全局失控

**可复制命令**

```bash
codex --sandbox workspace-write --ask-for-approval on-request
```

```bash
codex --sandbox read-only "检查当前代码库所有依赖是否存在已知安全漏洞"
```

```bash
codex --sandbox workspace-write --add-dir ../shared-types "同步更新公共类型定义"
```

**常见坑**：切勿在未隔离的生产主机上随意使用 --dangerously-bypass-approvals-and-sandbox（等同于完全放行所有破坏性命令）。

**标签**：`#安全` `#沙箱` `#权限隔离` `#合规`

**官方文档**：[https://developers.openai.com/codex/permission-modes](https://developers.openai.com/codex/permission-modes)

---

<a id="agents-md"></a>
### AGENTS.md 项目规范与上下文注入

> 入门 · 上下文规范 · 热度 93 · 2025-05-20

**一句话**：基于 Markdown 的级联行为规范文件，让 Codex 在执行任何任务前自动对齐项目团队约定与测试要求

**为什么值得学**：避免每次提问都要重复叮嘱'请使用 pnpm'、'修改代码后运行 pytest'。AGENTS.md 自动级联生效，是团队协作一致性的基石。

**手把手**

1. 在仓库根目录创建 AGENTS.md；也可用 AGENTS.override.md 覆盖同目录的 AGENTS.md
2. 编写项目专属规则：包管理器、格式化命令、测试运行规范和架构禁区
3. 在子目录按需放置 AGENTS.md，离当前目录越近的规则优先级越高
4. 在 ~/.codex/AGENTS.md 定义个人跨项目偏好（或使用 CODEX_HOME 指定的目录）
5. 启动 codex 后输入 /init，可让 Codex 生成一份初始 AGENTS.md 模板

**可复制命令**

```bash
codex
```

```bash
/init
```

**常见坑**：指令链受 project_doc_max_bytes（默认 32 KiB）限制；内容过长会被截断，应保持精炼并善用子目录分层。

**标签**：`#规范约束` `#上下文注入` `#团队协作` `#Prompt`

**官方文档**：[https://developers.openai.com/codex/agent-configuration/agents-md](https://developers.openai.com/codex/agent-configuration/agents-md)

---

<a id="codex-doctor"></a>
### codex doctor 环境健康诊断

> 入门 · 工程化诊断 · 热度 82 · 2025-07-10

**一句话**：一键排查本地运行环境、配置文件语法、鉴权凭据有效性与网络/WebSocket 连通性

**为什么值得学**：新手常遇网络代理拦截、TOML 格式拼写错误或 API Token 过期。doctor 命令能够输出清晰的分组体检报告与修复建议。

**手把手**

1. 打开终端，执行 codex doctor 命令启动全项系统诊断
2. 观察控制台输出的配置检查、本地凭据、沙箱驱动和后端端点状态指示
3. 如怀疑网络代理或企业网关阻断，运行 codex doctor --network-only 专门排查网络连通性
4. 在 CI 或脚本排查场景中，添加 --json 参数获取机器可读的脱敏 JSON 诊断报告
5. 根据报告中提示的 Warning 或 Error 快速定位并修复环境变量或配置文件

**可复制命令**

```bash
codex doctor
```

```bash
codex doctor --network-only
```

```bash
codex doctor --json
```

**常见坑**：在配置了企业 HTTP 代理时，如遇 WebSocket 握手失败，需检查 system_proxy_fallback 与环境变量 HTTP_PROXY/HTTPS_PROXY 设置。

**标签**：`#诊断工具` `#运维排查` `#新手排错` `#健康检查`

**官方文档**：[https://developers.openai.com/codex/reference/commands](https://developers.openai.com/codex/reference/commands)

## 进阶

<a id="codex-exec"></a>
### codex exec 非交互自动化批处理

> 进阶 · 自动化工作流 · 热度 96 · 2025-06-01

**一句话**：Headless 非交互命令行模式，直接在脚本、Git 钩子和 CI/CD 流程中执行指令并产出代码补丁

**为什么值得学**：无需人工值守即可批量完成跨文件重构、自动化 Bug 修复和依赖版本迁移，是打通自动化研发管线的核心支柱。

**手把手**

1. 确定要自动化的任务目标并编写明确的提示词
2. 使用管道将错误日志或待处理代码喂给 codex exec，或直接作为命令行参数传入
3. 指定 --sandbox workspace-write 与 -a never 确保脚本全自动执行完毕不挂起
4. 配置 -o result.md 将 Agent 最终生成的结论与修改说明保存至指定文件
5. 通过 git diff 检查自动化改动，确认符合预期后提交

**可复制命令**

```bash
codex exec "修复 tests/test_api.py 中的失败用例并运行 pytest 验证"
```

```bash
git diff | codex exec -s read-only "评估该变更对现有接口向后兼容性的影响" -o review.md
```

```bash
codex exec --sandbox workspace-write -a never --json "批量迁移 React 18 到 19 的废弃 API"
```

**常见坑**：自动化模式下遇到无法自愈的编译错误时可能会持续尝试导致 Token 消耗增加，建议配合 --ephemeral 或设置合理的超时控制。

**标签**：`#CI/CD` `#自动化` `#批处理` `#Headless`

**官方文档**：[https://developers.openai.com/codex/cli](https://developers.openai.com/codex/cli)

---

<a id="codex-review"></a>
### 代码智能审查（codex review & /review）

> 进阶 · 代码质量 · 热度 91 · 2025-06-20

**一句话**：专为代码审查定制的功能，可针对未暂存改动、指定分支对比或特定 Commit 进行全面安全与性能评审

**为什么值得学**：在发起 Pull Request 前由 Agent 进行第一轮静态代码审计，能快速拦截边界隐患、并发竞态、SQL 注入及未捕获异常。

**手把手**

1. 在本地完成代码修改后，运行 codex review --uncommitted 审查未提交的代码变更
2. 审查特性分支准备合并前，运行 codex review --base main 对比目标分支进行完整评估
3. 针对线上可疑提交，运行 codex review --commit <SHA> 精确定位引入问题的 Commit
4. 在交互式 TUI 中随时输入 /review 附加定制提示（如：'/review 重点排查死锁与内存泄露'）
5. 依据审查报告提出的修改建议逐项采纳或要求 Codex 直接就地修复

**可复制命令**

```bash
codex review --uncommitted
```

```bash
codex review --base main
```

```bash
codex review --commit a1b2c3d "重点检查是否有 SQL 注入或鉴权绕过风险"
```

**常见坑**：review 模式默认采用 read-only 沙箱，不会自动帮你修改代码；若需要直接就地修复，请使用 codex exec 传入修复指令。

**标签**：`#Code Review` `#代码质量` `#安全审计` `#Pull Request`

**官方文档**：[https://developers.openai.com/codex/code-review](https://developers.openai.com/codex/code-review)

---

<a id="session-resume-fork"></a>
### 会话持久化、恢复与分叉（resume & fork）

> 进阶 · 会话管理 · 热度 88 · 2025-07-05

**一句话**：会话自动存档于本地 JSONL，支持一键继续近期会话、历史列表筛选以及分叉探索不同重构方案

**为什么值得学**：复杂的系统重构往往需要多天多次迭代。会话持久化与 fork 功能让开发者随时回溯思路，不用担心终端关闭后上下文丢失。

**手把手**

1. 终端关闭或中断后，在项目目录下运行 codex resume 打开历史会话选择器
2. 直接继续上一轮会话：codex resume --last
3. 需要尝试另一种方案：codex fork 选择会话分叉，或用 codex exec fork <SESSION_ID> "<新提示>"
4. 在交互会话中输入 /resume 可跳转历史会话
5. 用 codex archive / codex delete 管理过期会话

**可复制命令**

```bash
codex resume
```

```bash
codex resume --last
```

```bash
codex fork
```

```bash
codex exec fork <SESSION_ID> "换一种方案：改用 Redis 分布式锁实现"
```

```bash
codex resume --all
```

**常见坑**：默认 resume 仅显示当前工作目录相关的会话；若需跨目录检索其他项目的会话，必须添加 --all 参数。

**标签**：`#会话管理` `#上下文持久化` `#Fork` `#断点续传`

**官方文档**：[https://developers.openai.com/codex/cli](https://developers.openai.com/codex/cli)

---

<a id="config-toml"></a>
### 分层配置与环境策略（config.toml & Profiles）

> 进阶 · 环境配置 · 热度 87 · 2025-06-15

**一句话**：遵循清晰优先级的 TOML 配置文件体系，支持项目级定制、命名 Profile 分组与命令行一键覆写

**为什么值得学**：开发、测试、日常审查对模型选择、沙箱模式与网络访问的要求各不相同。分层配置让团队在共享规范的同时兼顾个人灵活偏好。

**手把手**

1. 在用户主目录下创建或编辑 ~/.codex/config.toml 配置个人全局偏好（默认模型、沙箱策略）
2. 在项目根目录下创建 .codex/config.toml 提交到 Git，统一团队的配置标准
3. 创建专属 Profile 文件（如 ~/.codex/review.config.toml），通过 --profile review 快速调用
4. 在临时命令中使用 -c key=value 进行点路径覆盖（如 -c model="o3"）
5. 运行 codex --strict-config 校验配置文件中是否存在无法识别的废弃键名

**可复制命令**

```bash
codex -c model="o3" -c model_reasoning_effort="high"
```

```bash
codex --profile review "审查当前分支"
```

```bash
codex -c 'shell_environment_policy.ignore_default_excludes=false'
```

**常见坑**：项目级 .codex/config.toml 仅在项目被标记为受信任（Trusted）时才会加载，若项目未信任相关配置会被静默跳过以防恶意仓库利用。

**标签**：`#配置管理` `#TOML` `#Profiles` `#团队规范`

**官方文档**：[https://developers.openai.com/codex/config-file/config-basic](https://developers.openai.com/codex/config-file/config-basic)

---

<a id="mcp-integration"></a>
### MCP 协议与外部工具挂载

> 进阶 · 扩展协议 · 热度 90 · 2025-08-01

**一句话**：深度支持 Model Context Protocol（MCP），通过 stdio 或 SSE 模式扩展数据库查询、文档检索等外部能力

**为什么值得学**：单纯依靠本地命令行无法满足复杂业务场景。MCP 赋予了 Codex 安全连接私有知识库、云数据库与监控面板的通用标准能力。

**手把手**

1. 选定或编写所需的 MCP Server（如用于上下文检索的 Context7 或 Postgres 数据库工具）
2. 使用 CLI 命令直接添加：codex mcp add <name> -- <command> [args...]
3. 或在 config.toml 的 [mcp_servers.<name>] 字段中配置本地启动命令或远端 SSE URL
4. 运行 codex mcp list 查看已挂载的服务状态与工具列表
5. 在对话中直接让 Codex 调用 MCP 工具执行操作（如：'通过数据库 MCP 查询最新活跃用户数'）

**可复制命令**

```bash
codex mcp list
```

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp@latest
```

```bash
codex mcp add doc-server --url https://mcp.internal.example.com/sse
```

```bash
codex mcp remove context7
```

**常见坑**：通过 stdio 启动的 MCP 进程会继承部分系统环境，若工具依赖特定环境变量需在配置表中的 env 键中显式声明。

**标签**：`#MCP` `#工具扩展` `#上下文协议` `#数据库集成`

**官方文档**：[https://developers.openai.com/codex/extend/mcp](https://developers.openai.com/codex/extend/mcp)

## 高级

<a id="ide-extension"></a>
### VS Code / Cursor 官方 IDE 扩展

> 高级 · 开发集成 · 热度 92 · 2025-07-25

**一句话**：将 Codex Agent 深度内嵌在编辑器侧边栏，支持行内代码 Diff、@file 引用、检查点与云端委托

**为什么值得学**：对于习惯图形化编辑器的开发者，IDE 扩展打通了代码补全、侧边栏 Agent、直观 Diff 审阅与本地断点调试的闭环体验。

**手把手**

1. 在 VS Code / Cursor 插件市场搜索官方 OpenAI Codex 插件并安装
2. 点击侧边栏 Codex 图标，使用 ChatGPT 账号或 OpenAI API Key 完成鉴权
3. 在聊天窗口里用 @ 引用当前文件或高亮代码片段
4. 发送修改指令，在编辑器分栏查看 diff，选择 Accept 或 Revert
5. 需要云端任务时，在 IDE 中把任务委托到 Codex Cloud



**常见坑**：IDE 扩展与 CLI 共享同一套 ~/.codex/config.toml 配置，若在 CLI 中设置了冲突的沙箱模式可能导致 IDE 中的自动保存提示受阻。

**标签**：`#VS Code` `#IDE扩展` `#Cursor` `#界面协同`

**官方文档**：[https://developers.openai.com/codex/ide](https://developers.openai.com/codex/ide)

---

<a id="codex-cloud-github"></a>
### Codex Cloud 与 GitHub CI/CD 集成

> 高级 · 云端与CI/CD · 热度 94 · 2025-08-20

**一句话**：支持在云端托管长时编程任务，结合 openai/codex-action 在 GitHub PR 中实现自动化审查与修复流水线

**为什么值得学**：大型项目的迁移和长耗时测试不应阻塞本地电脑。云端隔离运行加上 CI 流水线自动产出 PR 补丁，真正实现研发全自动化。

**手把手**

1. 在 GitHub 仓库 .github/workflows/ 目录下添加 codex-review.yml 工作流文件
2. 引入官方 openai/codex-action@v1 动作，并在 GitHub Secrets 中配置 OPENAI_API_KEY
3. 设定触发条件（如 pull_request opened/synchronize），传入定制审查或修复 Prompt
4. 本地用 codex cloud / codex cloud list 查看云端任务；codex apply <TASK_ID> 拉取补丁
5. 在 PR 评论中输入 @codex review，让云端 Codex 直接发表评审意见

**可复制命令**

```bash
codex cloud
```

```bash
codex cloud list
```

```bash
codex apply <TASK_ID>
```

```bash
@codex review
```

**常见坑**：在 CI 环境中运行修改任务时，务必将 GitHub Action 的 GITHUB_TOKEN 配置为具有 contents: write 权限，否则无法自动提交补丁。

**标签**：`#Codex Cloud` `#GitHub Action` `#CI/CD` `#云端任务`

**官方文档**：[https://developers.openai.com/codex/cloud](https://developers.openai.com/codex/cloud)

---

<a id="app-server-protocol"></a>
### Headless 双向 JSON-RPC app-server 协议

> 高级 · 架构与协议 · 热度 86 · 2025-09-01

**一句话**：解耦的 Agent 后端守护进程，支持基于 stdio、WebSocket 及 Unix Socket 的双向事件流与远程控制

**为什么值得学**：企业与平台开发者无需重复造轮子，直接通过标准 JSON-RPC 协议驱动 Codex Agent 核心，轻松自研专用 Web IDE 或机器人。

**手把手**

1. 启动 app-server 守护进程并指定传输方式：codex app-server --listen ws://127.0.0.1:4500
2. 配置 WebSocket 认证策略与密钥文件（如 --ws-auth capability-token）
3. 在客户端程序中通过 JSON-RPC 发送会话创建、输入提交与审批确认消息
4. 订阅流式事件（具体事件名与 schema 以 app-server 官方文档为准）
5. 用 codex --remote <地址> 让本地 CLI 连接远程 app-server

**可复制命令**

```bash
codex app-server --listen stdio://
```

```bash
codex app-server --listen ws://127.0.0.1:4500 --ws-auth capability-token
```

```bash
codex --remote ws://127.0.0.1:4500
```

**常见坑**：远端 WebSocket 若暴露在公网，必须配置严格鉴权或 mTLS；不要无认证裸奔。

**标签**：`#JSON-RPC` `#app-server` `#协议` `#SDK底层`

**官方文档**：[https://developers.openai.com/codex/developers](https://developers.openai.com/codex/developers)

---

<a id="skills-plugins"></a>
### Skills 机制与插件生态（SKILL.md & Plugin）

> 高级 · 生态扩展 · 热度 85 · 2025-09-15

**一句话**：用 .agents/skills/<name>/SKILL.md 封装可复用技能，并用 codex plugin 管理插件包。

**为什么值得学**：相比单纯的 Prompt 模板，Skill 拥有独立的上下文触发逻辑、入参校验与工具依赖声明，让复杂业务技能可打包复用与分发。

**手把手**

1. 在 .agents/skills/<name>/SKILL.md（项目）、~/.agents/skills/<name>/SKILL.md（用户）或 /etc/codex/skills（系统）定义技能
2. frontmatter 必须包含 name 与 description；description 要写清何时触发
3. 在会话中输入 /skills 或 $ 引用技能；任务匹配时 Codex 也会自动加载
4. 用 codex plugin marketplace list 查看插件市场，codex plugin add <plugin> 安装插件包
5. 用 codex plugin list / codex plugin remove 管理已安装插件

**可复制命令**

```bash
codex plugin marketplace list
```

```bash
codex plugin add @openai/security-skills
```

```bash
codex plugin list
```

```bash
codex plugin remove @openai/security-skills
```

**常见坑**：SKILL.md 的 description 写得太泛会导致自动匹配失败；插件包要在受信任的 marketplace 安装。

**标签**：`#Skills` `#Plugins` `#插件生态` `#自定义扩展`

**官方文档**：[https://developers.openai.com/codex/build-skills](https://developers.openai.com/codex/build-skills)

