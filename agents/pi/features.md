# Pi · 功能手册

> 核对日期：2026-11-11　版本：1.5.2　厂商：Earendil Works / badlogic
>
> 返回 [README](README.md) · [来源记录](sources.md)

本手册覆盖 14 个功能，按难度分为入门 / 进阶 / 高级。每个功能都给出可执行步骤、命令与常见坑；遇到版本差异，以官方文档为准。

---

## 入门

<a id="pi-interactive-tui"></a>
### 交互式 TUI 与人机协同控制

> 入门 · 界面交互 · 热度 95 · 2025-06-01

**一句话**：基于差异渲染的全屏终端交互界面，支持运行中实时 Enter 干预与 Alt+Enter 任务排队。

**为什么值得学**：彻底打破传统命令行 Agent 生成时的锁死假死状态，让开发者在模型调用工具时随时调整执行路线或顺序追加指令。

**手把手**

1. 在代码根目录下运行 pi 进入交互界面
2. 按 Shift+Enter 换行或按 Ctrl+G 调出系统编辑器编写长提示词
3. 当模型持续调用工具时，直接打字按 Enter 注入纠偏指示，或按 Alt+Enter 排队后续任务
4. 按 Ctrl+O 折叠/展开工具运行回显，按 Escape 随时中断当前任务

**可复制命令**

```bash
pi
```

```bash
Ctrl+O
```

```bash
Ctrl+T
```

```bash
Ctrl+G
```

```bash
Escape
```

**常见坑**：在 Windows 传统 cmd 窗口中可能出现按键冲突，推荐使用现代 Windows Terminal 作为宿主环境。

**标签**：`#TUI` `#快捷键` `#人机协同` `#Steering`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md)

---

<a id="pi-file-search-tab"></a>
### @ 文件检索与 Tab 路径补全

> 入门 · 上下文工程 · 热度 91 · 2025-06-01

**一句话**：输入 @ 快速调出模糊文件检索浮窗，配合 Tab 键秒级组装复杂项目上下文，支持直接粘贴图片。

**为什么值得学**：无需手动拼写繁杂长路径，精准引入代码文件与架构图等多模态资源，杜绝路径输错导致的幻觉。

**手把手**

1. 在 Pi 交互界面中输入 @ 字符唤起模糊搜索列表
2. 输入部分文件名（如 @main）使用方向键挑选并回车插入
3. 敲击 Tab 键自动对文件路径与已有斜杠指令进行补全
4. 按下 Ctrl+V 直接将剪贴板中的截图注入上下文

**可复制命令**

```bash
请分析 @src/main.ts 的架构设计
```

```bash
对比 @package.json 与 @README.md 的版本号
```

**常见坑**：若代码仓库未配置 .gitignore 且包含超大 node_modules，建立初始文件索引时可能会产生短暂卡顿。

**标签**：`#文件搜索` `#Tab补全` `#多模态` `#剪贴板`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md#enter-a-prompt](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md#enter-a-prompt)

---

<a id="pi-model-thinking"></a>
### 多模型即时切换与 Thinking 深度调节

> 入门 · 模型控制 · 热度 93 · 2025-06-15

**一句话**：内建支持 Anthropic、OpenAI、Gemini 等各大厂商，会话中按 Ctrl+L 或 Shift+Tab 随心调整模型与推理等级。

**为什么值得学**：在同一会话中根据任务复杂度灵活分配算力成本：复杂架构用高推理深度模型，日常修改用快速模型。

**手把手**

1. 在终端中输入 /login 完成 Provider 授权或配置 API Key
2. 按下 Ctrl+L 或输入 /model 打开交互式模型模糊搜索列表
3. 按下 Shift+Tab 或输入 /thinking 轮流切换思考预算（off、low、medium、high 等）
4. 按下 Ctrl+S 将当前选中的模型配置永久保存为全局默认偏好

**可复制命令**

```bash
/login
```

```bash
/model
```

```bash
/thinking
```

```bash
/scoped-models
```

**常见坑**：对于不支持原生思考参数的模型，设置 high 会被系统自动钳位收敛，不会发生请求崩溃。

**标签**：`#多模型` `#Thinking` `#模型切换` `#Provider`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/models.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/models.md)

---

<a id="pi-session-tree"></a>
### 会话树形回溯与安全分支

> 入门 · 会话管理 · 热度 94 · 2025-07-01

**一句话**：基于树状图（Tree Graph）存储对话历史，支持通过 /tree 任意回退探索新分支，结合 /compact 智能压缩。

**为什么值得学**：彻底告别试错死胡同导致历史截断丢失的问题，像 Git 版本控制一样自由穿梭于各个思考分支之间。

**手把手**

1. 在会话中输入 /tree 打开可视化的对话树状导航器
2. 浏览历史节点，选中一条过去的用户输入后按 Enter 将其重新载入编辑器并派生新分支
3. 使用 /fork 将选定历史节点独立另存为全新会话文件
4. 输入 /compact 触发模型生成阶段性总结并压缩上下文

**可复制命令**

```bash
/tree
```

```bash
/fork
```

```bash
/clone
```

```bash
/compact
```

```bash
pi --continue
```

```bash
pi --resume
```

**常见坑**：分支切换仅作用于对话上下文历史，不会自动触发 git reset，本地代码改动需配合版本控制工具协同管理。

**标签**：`#会话树` `#分支管理` `#上下文压缩` `#会话恢复`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sessions.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sessions.md)

## 进阶

<a id="pi-windows-setup"></a>
### Windows 与 Git Bash 运行环境适配

> 进阶 · 系统适配 · 热度 86 · 2025-07-15

**一句话**：针对 Windows 平台的深层优化，自动解析 Git Bash 路径，支持引入 powershell 模型工具与终端防闪烁。

**为什么值得学**：解决类 Unix Agent 在 Windows 原生环境普遍面临的缺少 bash、换行错乱与控制台按键冲突等顽疾。

**手把手**

1. 安装 Git for Windows 确保系统内具备可用的 bash.exe
2. 在终端中输入 !printf 'Bash is working\n' 验证 Shell 解析状态
3. 若路径非标准，在 ~/.pi/agent/settings.json 中显式定义 shellPath
4. 在 Windows Terminal 中运行 Pi 享受最稳定的渲染与全套快捷键体验

**可复制命令**

```bash
!printf 'Bash is working\n'
```

```bash
powershell -c "irm https://pi.dev/install.ps1 | iex"
```

**常见坑**：在 Windows 配置文件中编写路径时，反斜杠必须写为双反斜杠（如 C:\\Program Files\\Git\\bin\\bash.exe）。

**标签**：`#Windows` `#GitBash` `#PowerShell` `#终端配置`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/windows.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/windows.md)

---

<a id="pi-prompt-templates"></a>
### 提示词模板（Prompt Templates）

> 进阶 · 提示工程 · 热度 88 · 2025-08-01

**一句话**：通过单个 Markdown 文件快速声明带参数的斜杠指令（如 /review），支持默认值替换与命令自动补全。

**为什么值得学**：无需编写任何 JavaScript 代码，以纯文本形式固化团队最常用的代码审查、生成发布说明等高频工作流。

**手把手**

1. 在用户目录新建 ~/.pi/agent/prompts/review.md 文件
2. 在文件头部声明 description 和 argument-hint Frontmatter
3. 在正文中使用 $1、${1:-default} 或 $@ 插入动态参数占位符
4. 在 Pi 终端中输入 /reload，即可直接调用 /review 专属指令

**可复制命令**

```bash
/reload
```

```bash
/review
```

```bash
/review concurrency
```

**常见坑**：模板文件必须直接放置于 prompts 根目录下，嵌套在子目录中的 .md 默认不会被注册为顶层斜杠命令。

**标签**：`#提示词模板` `#斜杠指令` `#工作流定制` `#Markdown`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/prompt-templates.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/prompt-templates.md)

---

<a id="pi-skills"></a>
### Agent 技能机制（Skills）

> 进阶 · 技能扩展 · 热度 90 · 2025-08-15

**一句话**：实现标准 Agent Skills 规范，仅将技能概览注册在系统提示词中，任务匹配时才由模型按需深度加载执行。

**为什么值得学**：避免将大量垂直领域操作手册一次性塞满 System Prompt，保持极小常驻上下文开销，兼顾多场景专业能力。

**手把手**

1. 在项目根目录创建 .agents/skills/pdf-tools/SKILL.md（或用户级 ~/.agents/skills/pdf-tools/SKILL.md）
2. 在 frontmatter 中写 name 与 description，description 要说明「做什么 + 何时使用」
3. 在同目录放 scripts/、references/、assets/ 等配套文件
4. 用 /skill:pdf-tools report.pdf 强制调用，或直接描述任务让模型按需加载

**可复制命令**

```bash
/skill:pdf-tools report.pdf
```

```bash
/reload
```

**常见坑**：description 是模型判断是否加载技能的唯一依据；项目级技能还需要通过 Pi 的项目信任。

**标签**：`#Skills` `#AgentSkills` `#按需加载` `#模块化`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md)

---

<a id="pi-extensions"></a>
### TypeScript 扩展系统（Extensions）

> 进阶 · 核心扩展 · 热度 96 · 2025-09-01

**一句话**：在 Pi 宿主进程中运行的原生 TypeScript 扩展，支持拦截全生命周期事件、注册自定义 Tool、阻断危险命令与定制 TUI。

**为什么值得学**：赋予开发者绝对的代码级掌控力，只需几十行 TypeScript 即可实现企业级安全权限守卫、自定义审批流或接入私有工具系统。

**手把手**

1. 在 ~/.pi/agent/extensions/ 目录下创建 my-extension.ts
2. 从 @earendil-works/pi-coding-agent 导入 ExtensionAPI 与 TypeBox
3. 通过 pi.on('tool_call') 监听并拦截高危 Shell 命令
4. 通过 pi.registerTool() 向模型注册业务自定义工具
5. 使用 pi -e ./my-extension.ts 快速验证并生效

**可复制命令**

```bash
pi -e ./my-extension.ts
```

```bash
/reload
```

**常见坑**：扩展在当前进程同步运行，注意捕获内部异步异常，且不要在扩展内将宿主核心库列为 dependencies 物理打包。

**标签**：`#TypeScript` `#扩展机制` `#自定义工具` `#安全守卫`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md)

---

<a id="pi-themes"></a>
### 自适应终端主题（Themes）

> 进阶 · 界面外观 · 热度 80 · 2025-09-10

**一句话**：基于 OKHSL / OKLCH 现代色彩空间构建，智能自适应当前终端 ANSI 配色与深浅底色，确保 4.5:1 无障碍高对比度。

**为什么值得学**：从底层消除传统 CLI 切换终端主题后的黑底黑字或白底白字尴尬，还能通过 JSON 打造专属极客品牌视觉。

**手把手**

1. 输入 /settings 选择 Theme，查看内置的 system、dark、light 表现
2. 在 ~/.pi/agent/themes/ 目录下创建 cyberpunk.json
3. 配置 vars 变量表与 colors 角色颜色映射
4. 在 Pi 终端设置中选中新主题或通过命令行参数即时预览

**可复制命令**

```bash
/settings
```

```bash
pi --use-theme cyberpunk
```

```bash
pi --use-theme light/dark
```

**常见坑**：自定义主题 JSON 文件名必须与内容中的 name 字段完全一致，且不能包含字符 /（该字符保留用于日夜自适应配置）。

**标签**：`#主题定制` `#OKHSL` `#自适应色彩` `#TUI美化`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/themes.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/themes.md)

---

<a id="pi-packages"></a>
### Pi Packages 资源包生态

> 进阶 · 包管理与生态 · 热度 89 · 2025-10-01

**一句话**：将 extensions、skills、prompts 和 themes 打包聚合，支持直接通过 npm 或 Git 仓库一键安装与集中升级。

**为什么值得学**：告别零散脚本手动复制粘贴，让团队和社区的高质量能力资产实现标准化版本发布、自动依赖锁定与一键更新。

**手把手**

1. 使用 pi install 从 npm 或 GitHub 安装外部资源包
2. 运行 pi list 查看当前已挂载的所有包及其所含资源
3. 使用 -e 参数临时体验未安装的远程资源包
4. 使用 pi update --extensions 全局拉取并对齐最新版本

**可复制命令**

```bash
pi install npm:@example/pi-tools@1.0.0
```

```bash
pi install git:github.com/example/pi-tools@v1
```

```bash
pi list
```

```bash
pi update --extensions
```

```bash
pi remove npm:@example/pi-tools
```

**常见坑**：项目级包配置在通过项目信任批准前不会执行，避免第三方仓库通过恶意 package.json 静默执行未知代码。

**标签**：`#包管理` `#资源分发` `#npm生态` `#Git生态`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md)

---

<a id="pi-project-trust"></a>
### 项目信任与安全沙箱机制

> 进阶 · 安全与沙箱 · 热度 87 · 2025-10-15

**一句话**：当首次进入含本地扩展、MCP 或特殊配置的代码仓库时激活安全拦截，防范未知仓库的 Prompt Injection 与恶意执行。

**为什么值得学**：在供应链攻击和提示词注入风险日益高涨的今天，为开发者在本地随意克隆测试未知开源项目提供了第一道安全门闸。

**手把手**

1. 进入包含 .pi/ 目录的新开源项目并启动 pi
2. 在终端弹出的项目信任警报中审查待加载的扩展清单
3. 选择 Trust 授予信任或选择 Don't Trust 降级为纯净安全内核运行
4. 通过 /trust 随时查看或更改当前目录的信任策略

**可复制命令**

```bash
/trust
```

```bash
pi --approve
```

```bash
pi --no-approve
```

**常见坑**：项目信任仅控制本地配置与扩展脚本的加载权限，并不等同于操作系统级容器隔离，不可信代码务必放入 Docker 中运行。

**标签**：`#项目信任` `#代码审计` `#提示词注入防范` `#安全策略`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md)

## 高级

<a id="pi-cli-automation"></a>
### CLI Print 与 JSON 自动化事件流模式

> 高级 · 自动化 · 热度 89 · 2025-10-20

**一句话**：无头执行模式，提供 --print 直接回显最终答案以及 --mode json 逐行输出结构化 JSONL 事件流。

**为什么值得学**：完美契合 CI/CD 流水线、Git 自动化钩子以及 Shell 批处理脚本，轻松将 Agent 融入现有 DevOps 基础设施。

**手把手**

1. 使用 pi --print 执行单次任务并捕获文本输出到文件
2. 通过 Unix 管道将 git diff 直接送入 Pi 作为审查上下文
3. 使用 --mode json 参数捕获包含耗时、Token 和工具调用的全流程事件流
4. 配合 jq 命令行工具提取特定事件（如筛选每次 tool_call 记录）

**可复制命令**

```bash
pi --print "审查当前项目并输出建议" > review.md
```

```bash
git diff | pi --print "生成规范提交信息"
```

```bash
pi --mode json "检查依赖版本" > events.jsonl
```

```bash
pi --mode json "检查依赖" | jq -r 'select(.type=="tool_call") | .toolName'
```

**常见坑**：当 stdin 或 stdout 处于重定向状态且未显式指定模式时，Pi 默认自动降级为 Print 模式退出，不会挂起终端。

**标签**：`#CLI` `#自动化` `#JSONL` `#CI/CD` `#无头模式`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/cli.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/cli.md)

---

<a id="pi-rpc-mode"></a>
### RPC 进程间控制协议

> 高级 · 进程集成 · 热度 88 · 2025-11-01

**一句话**：通过 pi --mode rpc 启动长寿命后台子进程，宿主应用通过 stdin/stdout 以 JSONL 双向协议完全控制 Agent。

**为什么值得学**：语言无关且天然具备进程隔离优势，是开发独立桌面 GUI（Electron/Tauri）、VS Code 插件或后端服务托管的核心模式。

**手把手**

1. 使用子进程启动 pi --mode rpc --no-session
2. 向 stdin 写入带有唯一 id 的 JSON 指令（如 prompt 指令）
3. 从 stdout 按标准换行符读取返回的 response 与会话更新事件
4. 监听 agent_settled 确定当前轮次生成彻底收敛结束
5. 关闭 stdin 或发送 SIGTERM 执行优雅退出收尾

**可复制命令**

```bash
pi --mode rpc --no-session
```

**常见坑**：解析 stdout 时必须严格按 LF (\n) 换行切分，切勿使用将 Unicode 行分隔符误判为换行的行读取器，否则会导致 JSON 解析错误。

**标签**：`#RPC` `#子进程` `#双向通信` `#IDE插件` `#GUI集成`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md)

---

<a id="pi-sdk"></a>
### 嵌入式 TypeScript SDK

> 高级 · 二次开发 · 热度 92 · 2025-11-05

**一句话**：在 Node.js/Bun 宿主中直接调用 createAgentSession，享受 100% 原生 TypeScript 类型安全与进程内极速交互。

**为什么值得学**：为 TypeScript 开发者提供了比 RPC 更高吞吐、零序列化损耗、能直接操作 Session 内存对象树的最高级集成方案。

**手把手**

1. 在项目中执行 npm install @earendil-works/pi-coding-agent
2. 从库中解构引入 createAgentSession 与 SessionManager
3. 调用 createAgentSession({ cwd: process.cwd() }) 初始化会话
4. 调用 session.subscribe 监听实时 text_delta 字符流
5. 调用 session.prompt() 发送任务并在 finally 中调用 session.dispose()

**可复制命令**

```bash
npm install @earendil-works/pi-coding-agent
```

**常见坑**：在已有生成仍在流式响应中时再次调用 session.prompt() 会直接抛错拒绝，插话需求需调用 session.steer()。

**标签**：`#TypeScript` `#SDK` `#二次开发` `#进程内集成`

**官方文档**：[https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sdk.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sdk.md)

