# DeepSeek Harness · 功能手册

> 核对日期：2026-11-11　版本：0.2.2-rc.1　厂商：DeepSeek
>
> 返回 [README](README.md) · [来源记录](sources.md)

本手册覆盖 14 个功能，按难度分为入门 / 进阶 / 高级。每个功能都给出可执行步骤、命令与常见坑；遇到版本差异，以官方文档为准。

---

## 入门

<a id="dsh-cli-quickstart"></a>
### CLI 快速启动与零安装运行

> 入门 · 基础环境 · 热度 95 · `NEW` · 2026-08-15

**一句话**：通过 npx 或全局 npm 快速启动 DeepSeek Harness 运行时与基础环境检查。

**为什么值得学**：无需繁重本地环境配置，基于 Node.js/Cordis 微内核即开即用，几秒内即可体验官方 Developer Preview。

**手把手**

1. 检查本地 Node.js 版本是否满足 >= 20.0.0 要求
2. 运行 npx @deepseek-ai/dsh --version 验证包拉取与 CLI 响应
3. 通过 npm install -g @deepseek-ai/dsh 完成全局 CLI 安装
4. 执行 dsh --help 了解内置命令选项与 Profile 启动方式

**可复制命令**

```bash
node --version
```

```bash
npx @deepseek-ai/dsh --version
```

```bash
npm install -g @deepseek-ai/dsh
```

```bash
dsh --help
```

**常见坑**：Windows PowerShell 下若提示未授权脚本运行错误，需使用管理员身份调整 ExecutionPolicy 或通过 npx 运行。

**标签**：`#CLI` `#安装` `#快速上手`

**官方文档**：[https://deepseek-harness.github.io/deepseek-harness/](https://deepseek-harness.github.io/deepseek-harness/)

---

<a id="dsh-web-ui"></a>
### Web UI 交互式控制台

> 入门 · 用户界面 · 热度 96 · 2026-07-20

**一句话**：启动轻量级本地 Web 仪表盘（默认端口 3080），直观管理多轮会话、模型调用与可视化面板。

**为什么值得学**：提供比纯终端更清晰的多轮对话流、实时 Token 消耗展示、模型切换与插件状态监控。

**手把手**

1. 在终端中输入 dsh web（等价于 dsh --profile web）
2. 确认控制台输出 Service listening at http://127.0.0.1:3080
3. 在浏览器中访问 http://127.0.0.1:3080 进入交互界面
4. 使用 --port 8080 参数应对默认端口被占用的情况

**可复制命令**

```bash
dsh web
```

```bash
dsh web --port 8080
```

**常见坑**：若 3080 端口已被其他本地开发服务占用，启动可能会报错，务必显式传入 --port 指定空闲端口。

**标签**：`#WebUI` `#可视化` `#控制台`

**官方文档**：[https://deepseek-harness.github.io/deepseek-harness/](https://deepseek-harness.github.io/deepseek-harness/)

---

<a id="dsh-model-provider"></a>
### 模型与 Provider 密钥配置

> 入门 · 模型路由 · 热度 98 · 2026-06-10

**一句话**：配置官方 deepseek-official 路由或第三方兼容模型，通过安全凭据文件与环境变量注入 API Key。

**为什么值得学**：凭据与配置完全解耦，密钥绝不硬编码在 Git 追踪文件内，原生支持 DeepSeek-V3 / R1 系列模型端点。

**手把手**

1. 从 DeepSeek 开放平台获取有效 API Key
2. 在环境变量中注入 DEEPSEEK_API_KEY
3. 或在 Web 控制台 Settings → Models 面板保存，写入 ~/.dsh/.credentials.yaml
4. 运行 dsh --profile web --dump-config 验证模型路由与提供方生效

**可复制命令**

```bash
export DEEPSEEK_API_KEY="sk-your-api-key"
```

```bash
$env:DEEPSEEK_API_KEY="sk-your-api-key"
```

```bash
dsh --profile web --dump-config
```

**常见坑**：绝对不要将明文 API Key 写入 cordis.patch.yml；应通过环境变量或专用的 ~/.dsh/.credentials.yaml 注入。

**标签**：`#模型配置` `#APIKey` `#凭据安全`

**官方文档**：[https://api-docs.deepseek.com/guides/harness](https://api-docs.deepseek.com/guides/harness)

---

<a id="dsh-tui-mode"></a>
### TUI 终端全屏交互模式

> 入门 · 终端交互 · 热度 82 · 2026-08-05

**一句话**：在终端内运行功能齐备的交互式 TUI 界面，支持快捷键切换面板与流式高亮输出。

**为什么值得学**：针对无浏览器环境与远程 SSH 运维场景优化，在低系统开销下提供完整的交互与代码审查能力。

**手把手**

1. 先给 tui Profile 安装终端 UI 插件：dsh plugin --profile tui add github:deepseek-harness/turtle-ui
2. 运行 dsh --profile tui 启动终端界面
3. 输入自然语言任务，观察推理与工具调用
4. 使用 /exit 或 Ctrl+D 保存并退出

**可复制命令**

```bash
dsh plugin --profile tui add github:deepseek-harness/turtle-ui
```

```bash
dsh --profile tui
```

**常见坑**：tui 不是内置命令，必须先安装 turtle-ui 插件；Windows 建议使用 Windows Terminal。

**标签**：`#TUI` `#终端` `#SSH友好`

**官方文档**：[https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md)

## 进阶

<a id="dsh-headless-automation"></a>
### Headless 任务与 CI/CD 自动化

> 进阶 · 脚本自动化 · 热度 92 · 2026-07-28

**一句话**：通过 headless Profile 单次触发、打印最终结果并返回进程状态码，适合脚本与 CI。

**为什么值得学**：可无缝嵌入 Makefile、GitHub Actions 或自动化运维脚本，实现无人值守的代码审查与自动化修复。

**手把手**

1. 准备需要自动执行的任务提示词
2. 执行 dsh --profile headless "<任务内容>" 进行单次运算
3. Agent 自动检索文件、执行工具并应用修改
4. 检查 stdout 的最终文本与退出码（0=completed，1=其他）判断结果

**可复制命令**

```bash
dsh --profile headless "检查当前 git 仓库的修改并运行测试"
```

```bash
dsh --profile headless "分析 src/index.ts 的潜在内存泄漏"
```

**常见坑**：headless 不启动 Web/HTTP 服务；需要审批或交互的任务应改用 Web/TUI Profile。

**标签**：`#Headless` `#CI/CD` `#脚本化`

**官方文档**：[https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md)

---

<a id="dsh-profiles-management"></a>
### Profile 多环境隔离机制

> 进阶 · 架构核心 · 热度 90 · 2026-08-10

**一句话**：基于 $DSH_HOME/profiles/ 目录的隔离架构，实现多任务、多配置间的独立依赖与插件环境。

**为什么值得学**：可在同一台机器上同时管理面向开发的宽松环境与面向生产的严格只读环境，配置完全独立且互不污染。

**手把手**

1. 查看本地已有 Profile 目录：~/.dsh/profiles/
2. 从预置模板派生新 Profile：dsh --profile audit --from-default-profile headless
3. 启动并使用指定 Profile：dsh --profile audit "运行代码审计"
4. 独立维护该 Profile 下的插件与 patch 配置

**可复制命令**

```bash
dsh --profile my-dev --from-default-profile web
```

```bash
dsh --profile my-dev
```

```bash
ls ~/.dsh/profiles
```

**常见坑**：若自定义 Profile 因错误配置损坏导致启动失败，可通过 --from-default-profile <template> 重新重置为初始模板。

**标签**：`#Profile` `#环境隔离` `#配置管理`

**官方文档**：[https://deepseek-harness.github.io/deepseek-harness/](https://deepseek-harness.github.io/deepseek-harness/)

---

<a id="dsh-cordis-patch-layer"></a>
### 声明式 Patch 配置层与转储

> 进阶 · 配置系统 · 热度 89 · `NEW` · 2026-09-01

**一句话**：基于 cordis.patch.yml 的原子替换与层叠机制，搭配 --dump-config 输出最终有效配置树。

**为什么值得学**：避免传统 deep merge 带来的配置冲突与歧义，支持通过简单的 YAML 补丁精确替换特定服务与模型参数。

**手把手**

1. 了解 Patch 层叠优先级：Bundle 默认 < Profile Patch < 全局 Patch < CLI --patch
2. 编写局部补丁文件 custom-patch.yml 调整参数
3. 运行 dsh web --patch ./custom-patch.yml 叠加临时生效
4. 执行 dsh --profile web --dump-config 查看并调试最终合并的 Cordis 插件树

**可复制命令**

```bash
dsh web --patch ./custom-patch.yml
```

```bash
dsh --profile web --dump-config
```

```bash
dsh --profile web --dump-config-schema
```

**常见坑**：Cordis Patch 采用 ID 行级原子替换而非递归合并字段，配置某插件时须写出该插件对应 target 块的完整 config。

**标签**：`#Patch` `#Cordis` `#配置诊断`

**官方文档**：[https://deepseek-harness.github.io/deepseek-harness/](https://deepseek-harness.github.io/deepseek-harness/)

---

<a id="dsh-plugin-cli"></a>
### 插件包管理系统 (dsh plugin)

> 进阶 · 扩展生态 · 热度 94 · 2026-08-18

**一句话**：利用 dsh plugin --profile <name> add/remove 自动化安装与卸载特定 Profile 的插件包。

**为什么值得学**：自动将插件安装至 Profile 的专用隔离目录，由内部 pnpm 解析依赖并生成 lockfile，无需手动篡改根环境。

**手把手**

1. 选定目标环境 Profile（如 web）
2. 运行 dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex 安装插件 Bundle
3. 验证插件已出现在 ~/.dsh/profiles/web/package.json 依赖中
4. 重启 Profile 使 Bundle 生效；卸载用 dsh plugin --profile web remove <package>

**可复制命令**

```bash
dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex
```

```bash
dsh plugin --profile web remove @deepseek-ai/dsh-subagent-codex
```

**常见坑**：安装/卸载 Bundle 后必须重启 Profile；运行中的实例不会热切换 Bundle 集合。

**标签**：`#插件管理` `#CLI` `#生态扩展`

**官方文档**：[https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md)

---

<a id="dsh-mcp-client"></a>
### MCP Client 协议桥接

> 进阶 · 协议集成 · 热度 93 · `NEW` · 2026-09-15

**一句话**：CLI 自带 MCP client 依赖，但默认不启用任何 MCP server；通过 Profile 的 patch 层显式接入。

**为什么值得学**：按需接入标准 MCP 生态（文件检索、数据库、GitHub 等），同时避免默认信任任何外部可执行 server。

**手把手**

1. 确认 Profile 依赖中包含 @deepseek-ai/dsh-mcp-client（CLI 自带，默认不启用 server）
2. 编辑 Profile 的 cordis.patch.yml，加入你信任的 MCP server 启动命令或端点
3. 重启 Profile：dsh web 或 dsh --profile web
4. 用 dsh --profile web --dump-config 检查最终配置树与 MCP 工具是否挂载

**可复制命令**

```bash
dsh web
```

```bash
dsh --profile web --dump-config
```

**常见坑**：MCP server 命令是在 Agent 沙箱之外执行的受信代码；只接入你信任的 server，并在 patch 中显式声明。

**标签**：`#MCP` `#协议` `#工具生态`

**官方文档**：[https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md)

---

<a id="dsh-session-persistence"></a>
### 会话持久化与 zstd 压缩存储

> 进阶 · 会话机制 · 热度 88 · 2026-07-15

**一句话**：基于事件溯源的会话持久化，默认以 session.v3.jsonl.zstd 记录推理与工具调用轨迹。

**为什么值得学**：完整捕获复杂长任务的推理分支与工具交互，同时通过高效流式压缩大幅节省高频交互下的磁盘消耗。

**手把手**

1. 会话默认保存在 ~/.dsh/sessions/ 下，按 Profile 与 Session 分层
2. 每轮 prompt、tool-call 与结果以 append-only 格式增量保存
3. 历史文件使用 zstd 压缩（如 session.v3.jsonl.zstd）
4. 用 zstdcat 查看归档内容，或在 Web/TUI 中恢复历史会话

**可复制命令**

```bash
ls ~/.dsh/sessions
```

```bash
zstdcat ~/.dsh/sessions/*/*/session.v3.jsonl.zstd | tail -20
```

**常见坑**：压缩后的 session 不能用普通文本查看器直接打开；先用 zstdcat 解压。

**标签**：`#会话日志` `#持久化` `#zstd压缩`

**官方文档**：[https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md)

---

<a id="dsh-context-rescue"></a>
### Profile 救援与配置恢复 (dsh rescue)

> 进阶 · 配置系统 · 热度 90 · 2026-09-20

**一句话**：当 Profile 配置损坏或无法启动时，用 dsh rescue 从默认模板恢复一个可启动环境。

**为什么值得学**：Profile 是隔离环境，patch 或依赖出错会导致启动失败；rescue 提供官方恢复路径，避免手删目录。

**手把手**

1. 先备份 ~/.dsh/profiles/<name> 目录
2. 运行 dsh rescue 查看可救援的 Profile
3. 用 dsh rescue --from-default-profile web 从 web 模板重建目标 Profile
4. 恢复后用 dsh --profile <name> 验证启动

**可复制命令**

```bash
dsh rescue
```

```bash
dsh rescue --from-default-profile web
```

```bash
dsh rescue --from-default-profile web --no-open
```

**常见坑**：重建会删除目标 Profile 原有依赖与用户 patch；先备份，且目标名不能与内置 profile 同名（不区分大小写）。

**标签**：`#Profile` `#救援` `#配置恢复` `#dsh rescue`

**官方文档**：[https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md)

## 高级

<a id="dsh-sandboxing-security"></a>
### 沙箱与权限模式

> 高级 · 安全沙箱 · 热度 91 · 2026-08-25

**一句话**：基于 bwrap / Landlock / Seatbelt 的进程沙箱与 workspace-write 权限预设，限制 Bash 与文件写入范围。

**为什么值得学**：默认 workspace-write 把命令与写操作限制在会话工作区，降低误删/越权风险；读取与网络默认不隔离，需按需加强。

**手把手**

1. 了解默认 permission preset：workspace-write（Bash 与文件写入限制在工作区与临时目录）
2. 按平台确认可用的 sandbox backend：bwrap / Landlock / Seatbelt
3. 通过 DSH_PERMISSION_MODE 设置进程级 fallback 权限
4. 用 dsh --profile headless "..." 在隔离 Profile 中运行任务，并用 --dump-config 核对权限配置

**可复制命令**

```bash
dsh --profile headless "执行全套测试"
```

```bash
dsh --profile web --dump-config
```

**常见坑**：读取与网络默认不受限；需要更强隔离时使用容器/VM，不要只依赖 workspace-write。

**标签**：`#沙箱` `#权限` `#workspace-write` `#bwrap`

**官方文档**：[https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md)

---

<a id="dsh-custom-plugin-dev"></a>
### 自定义插件开发 (apply 与依赖注入)

> 高级 · 架构核心 · 热度 95 · 2026-08-01

**一句话**：基于 Cordis 微内核编写 TypeScript 插件，利用 inject 声明服务依赖并通过 apply(ctx) 扩展核心能力。

**为什么值得学**：真正落地 Everything is a Plugin 理念，随心所欲定制专有业务工具、修改 Prompt 模版或替换 Agent Loop 逻辑。

**手把手**

1. 编写插件源文件（如 my-plugin.ts），导出 name 标识与 apply(ctx) 函数
2. 若依赖已有服务，声明 export const inject = ['tools', 'llm']
3. 在 apply 内部使用 ctx.tools.register() 注册自定义工具与入参校验 Schema
4. 在 Profile 的 cordis.patch.yml 中挂载该插件路径并进行功能调试

**可复制命令**

```bash
dsh web --patch ./local-plugin-patch.yml
```

```bash
dsh --profile web --dump-config
```

**常见坑**：若插件使用了 ctx.tools 等服务却未在 inject 数组中显式声明依赖，Cordis 在异步挂载阶段可能会抛出 undefined 引用异常。

**标签**：`#插件开发` `#Cordis` `#依赖注入`

**官方文档**：[https://deepseek-harness.github.io/deepseek-harness/](https://deepseek-harness.github.io/deepseek-harness/)

---

<a id="dsh-multi-agent-teams"></a>
### 子代理协同（Codex / Claude Code Subagents）

> 高级 · 协作编排 · 热度 96 · 2026-09-10

**一句话**：通过官方 subagent 插件把 Codex 或 Claude Code 作为子代理接入 Harness。

**为什么值得学**：把任务分派给不同 Agent，利用各自模型与工具优势；插件按 Profile 隔离，可只装一个或两个都装。

**手把手**

1. 给 Profile 安装子代理插件：dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex @deepseek-ai/dsh-subagent-claude-code
2. 重启 Profile 使 Bundle 生效
3. 在新 Agent 的 Preset 中启用对应工具行（安装的 Bundle 默认只注册 dormant provider）
4. 在主会话中把子任务交给 Codex / Claude Code provider 执行

**可复制命令**

```bash
dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex @deepseek-ai/dsh-subagent-claude-code
```

```bash
dsh web
```

**常见坑**：安装 Bundle 后必须重启 Profile；只安装不会自动启用工具行。

**标签**：`#子代理` `#Codex` `#Claude Code` `#协作`

**官方文档**：[https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md)

