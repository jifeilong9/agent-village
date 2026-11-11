// 自动生成，请勿手改。源：agents/<slug>/features.json
window.AGENT_DATA = {
  "generatedAt": "2026-11-11T05:38:00.710Z",
  "agents": [
    {
      "slug": "claude-code",
      "name": "Claude Code",
      "vendor": "Anthropic",
      "tagline": "Anthropic 官方终端 Agent 编程工具",
      "version": "2.1.322",
      "updatedAt": "2026-11-11",
      "official": {
        "site": "https://code.claude.com/docs/en/overview",
        "docs": [
          "https://docs.claude.com/en/docs/claude-code/overview"
        ],
        "repo": "https://github.com/anthropics/claude-code",
        "changelog": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
      },
      "stats": {
        "popularity": 96,
        "learningCurve": 2,
        "bestFor": [
          "终端优先的高级研发人员",
          "全栈项目开发与大型代码重构",
          "自动化 CI/CD 与 GitHub 协同",
          "复杂代码库多智能体拆解"
        ]
      },
      "install": {
        "requirements": [
          "操作系统：macOS 10.15+、Ubuntu 20.04+/Debian 10+ 或 Windows 10+ (x64/ARM64)",
          "依赖环境：Git 2.0+（原生安装包内置运行时，npm 安装方式已弃用）",
          "账号权限：Anthropic Console API Key，或 Claude 付费订阅 (Pro/Max/Ultra/Team/Enterprise)"
        ],
        "steps": [
          "按操作系统选择安装方式：Windows 可用 PowerShell 脚本或 WinGet，macOS/Linux 可用 curl 或 Homebrew",
          "安装程序自动配置二进制环境并加入系统 PATH",
          "在代码项目根目录下执行 claude 启动交互界面",
          "首次启动时输入 /login 完成网页授权或配置 API 密钥",
          "输入简单问题（如 'what does this project do?'）验证环境就绪"
        ],
        "commands": [
          "irm https://claude.ai/install.ps1 | iex",
          "winget install Anthropic.ClaudeCode",
          "curl -fsSL https://claude.ai/install.sh | bash",
          "brew install --cask claude-code"
        ],
        "verify": "claude --version"
      },
      "concepts": [
        {
          "term": "Agentic Loop (智能体循环)",
          "desc": "Claude 接收任务后自主经历「探索项目 -> 规划步骤 -> 调用工具读写 -> 运行验证 -> 修复纠错」的闭环迭代。"
        },
        {
          "term": "CLAUDE.md / AGENTS.md",
          "desc": "放置于项目根目录或子目录的长期记忆与规则文件，每次会话启动自动注入上下文，定义架构约束与命令。"
        },
        {
          "term": "Permission Modes (多级权限模式)",
          "desc": "从 strict/manual、plan、acceptEdits 到 auto 的自主执行授权分级，平衡开发速度与系统操作安全性。"
        },
        {
          "term": "Checkpoints & Rewind",
          "desc": "每次 Prompt 自动建立文件快照与对话状态存档，支持随时使用 /rewind 恢复代码与上下文。"
        },
        {
          "term": "Subagents (子智能体)",
          "desc": "拥有隔离上下文、专属模型与专用工具集的分工代理，可在后台并发执行探索与扫描，防止主上下文污染。"
        },
        {
          "term": "MCP (Model Context Protocol)",
          "desc": "开放标准协议，用于将 Claude Code 连接至本地数据库、开发服务器、GitHub 以及远程云服务。"
        }
      ],
      "learningPath": [
        {
          "title": "入门阶段：终端会话与基础控制",
          "desc": "掌握安装配置、日常快捷命令、项目规则沉淀与规划模式，建立安全的日常 AI 辅助开发习惯。",
          "features": [
            "cc-slash-commands",
            "cc-memory-claude-md",
            "cc-plan-mode",
            "cc-headless-pipe"
          ]
        },
        {
          "title": "进阶阶段：工作流强化与扩展集成",
          "desc": "利用时光机回滚、自定义技能、MCP 协议集成、生命周期钩子以及 GitHub Actions 打造生产级开发流水线。",
          "features": [
            "cc-rewind-checkpoints",
            "cc-skills",
            "cc-mcp",
            "cc-hooks",
            "cc-permissions",
            "cc-github-actions"
          ]
        },
        {
          "title": "高级阶段：多智能体与生态延展",
          "desc": "构建专业 Subagent 分工协作体系，借助 Agent SDK 进行系统级二次开发，并运用跨端接力实现全场景开发。",
          "features": [
            "cc-subagents",
            "cc-agent-sdk",
            "cc-remote-teleport"
          ]
        }
      ],
      "features": [
        {
          "id": "cc-slash-commands",
          "name": "斜杠命令与会话交互",
          "category": "基础交互",
          "level": "入门",
          "hot": 90,
          "isNew": false,
          "summary": "在交互终端中使用 / 快速唤出内置指令，高效管理上下文清理、会话恢复、系统自检与全局配置。",
          "why": "斜杠命令是控制 Claude Code 会话生命周期与环境配置最快捷的途径，无需跳出终端即可掌控一切运行参数。",
          "steps": [
            "在交互式会话终端输入框中直接输入 / 唤出自动补全指令面板",
            "输入 /clear 清除当前对话上下文以开始全新任务，或输入 /compact 压缩当前超长会话",
            "输入 /resume 浏览并恢复历史会话列表，继续未完成的代码工作",
            "输入 /config 打开可视化配置面板，管理默认模型、权限偏好与主题",
            "输入 /doctor 运行环境自检，诊断网络代理、API 认证与外部工具链可用性"
          ],
          "commands": [
            "claude",
            "/help",
            "/clear",
            "/resume",
            "/config",
            "/doctor"
          ],
          "pitfalls": "/clear 会清空对话上下文但不会撤销已修改的磁盘文件；如需回滚代码改动，请使用 /rewind 命令。",
          "doc": "https://docs.claude.com/en/docs/claude-code/quickstart#session-commands",
          "tags": [
            "CLI",
            "会话管理",
            "快捷指令",
            "系统自检"
          ],
          "isHot": true
        },
        {
          "id": "cc-memory-claude-md",
          "name": "CLAUDE.md 与项目记忆体系",
          "category": "记忆与规则",
          "level": "入门",
          "hot": 95,
          "isNew": false,
          "summary": "通过项目根目录与子目录中的 CLAUDE.md 或 AGENTS.md 固化架构规范、构建命令与代码风格，支持自动记忆积累。",
          "why": "消除反复输入项目约定的繁琐沟通，让 Claude 在每次会话启动时自动加载团队工程共识，确保生成代码完全符合团队标准。",
          "steps": [
            "在项目根目录下创建 CLAUDE.md 文件（或 .claude/rules/ 规则目录）",
            "记录核心构建、测试、代码检查命令以及技术栈与代码设计规范",
            "使用 @ 语法（如 @docs/api-specs.md）引入子模块文档进行分层组织",
            "启动 claude，Claude 会在会话初始自动读取该文件并注入上下文提示词",
            "在会话中使用 /memory 命令随时查看自动累积的经验记忆并进行编辑修正"
          ],
          "commands": [
            "touch CLAUDE.md",
            "claude",
            "/memory"
          ],
          "pitfalls": "CLAUDE.md 不应贴入整段业务代码，应集中记录难以通过阅读代码直接推导的隐性规范与构建指令，文件过大会过多挤占上下文。",
          "doc": "https://docs.claude.com/en/docs/claude-code/memory",
          "tags": [
            "配置",
            "工程规范",
            "上下文管理",
            "知识库"
          ],
          "isHot": true
        },
        {
          "id": "cc-plan-mode",
          "name": "Plan Mode 架构规划模式",
          "category": "任务规划",
          "level": "入门",
          "hot": 94,
          "isNew": false,
          "summary": "只读安全探索模式，先深入分析代码并输出详尽执行方案，经人工审阅批准后再切回写入模式落地修改。",
          "why": "面对大型重构或未知代码库时，避免 AI 贸然修改文件导致逻辑错乱或产生难以追溯的破坏性改动。",
          "steps": [
            "启动会话时添加参数 claude --permission-mode plan，或在交互会话中按 Shift+Tab 切换至 Plan 模式",
            "检查终端底部状态栏显示 ⏸ plan mode on 标识确认已进入只读规划模式",
            "输入复杂需求（例如：'重构用户权限验证逻辑为 RBAC 架构'），Claude 将只读调用工具探索代码并输出详细拆解计划",
            "方案生成完毕后触发 ExitPlanMode 确认对话框，可在系统编辑器中审阅或修改方案文本",
            "按下回车确认批准计划后，Claude 自动切回写入模式并逐项实施变更"
          ],
          "commands": [
            "claude --permission-mode plan",
            "Shift+Tab"
          ],
          "pitfalls": "在 Plan 模式下所有写入工具（Edit、Write、文件破坏性命令）均被拦截，若需求要求立即修改文件需先退出规划模式。",
          "doc": "https://docs.claude.com/en/docs/claude-code/permission-modes",
          "tags": [
            "安全探索",
            "架构设计",
            "方案预审",
            "只读模式"
          ],
          "isHot": true
        },
        {
          "id": "cc-headless-pipe",
          "name": "Headless 模式与 Unix 管道",
          "category": "CLI 脚本化",
          "level": "入门",
          "hot": 88,
          "isNew": false,
          "summary": "使用 -p (--print) 参数非交互执行单次查询并输出至 stdout，无缝接入 Shell 脚本、CI 流水线与管道命令。",
          "why": "将 Claude 的代码理解与生成能力化作标准 Unix 工具，与其他命令行工具链无缝组合，实现高灵活度的自动化处理。",
          "steps": [
            "使用 claude -p \"<问题>\" 运行单次非交互式指令，结果将直接输出至控制台并正常退出",
            "使用管道符号 | 将前置命令的输出（如 git diff、日志）传递给 Claude 进行智能分析",
            "添加 --output-format json 参数以获得机器友好的结构化 JSON 响应",
            "在 CI/CD 中配合 --bare 参数跳过外部钩子与记忆加载，获得极速、纯净的执行环境",
            "根据退出码（0 表示成功，非 0 表示异常）在脚本中进行后续逻辑分支判断"
          ],
          "commands": [
            "claude -p \"解释当前目录的核心架构\"",
            "git diff main --name-only | claude -p \"审查这些变更文件是否存在安全缺陷\"",
            "tail -n 100 app.log | claude -p \"分析异常日志根因并输出修复建议\""
          ],
          "pitfalls": "-p 模式无法与 --bg（后台模式）并存；脚本自动化中若遇到未预先授权的工具权限，将直接抛出错误退出，建议配合 --allowedTools 使用。",
          "doc": "https://docs.claude.com/en/docs/claude-code/cli-reference",
          "tags": [
            "CLI",
            "管道操作",
            "自动化脚本",
            "CI/CD"
          ],
          "isHot": false
        },
        {
          "id": "cc-rewind-checkpoints",
          "name": "Checkpoints 快照与 /rewind 时光机",
          "category": "版本控制",
          "level": "进阶",
          "hot": 92,
          "isNew": false,
          "summary": "自动为每次 Prompt 轮次记录文件与对话快照（保留最近 100 轮），支持一键精准撤销并恢复代码或对话。",
          "why": "彻底消除 AI 编程中的试错风险，即使复杂的生成代码产生偏差，也能瞬间精确回退至特定节点，无需手动 git checkout。",
          "steps": [
            "在交互终端中让 Claude 执行多轮代码修改与单元测试调试",
            "当需要撤销改动时，在空输入行连按两次 Esc 键，或直接输入 /rewind 调出时光机菜单",
            "在交互式列表中通过上下箭头挑选目标历史快照点，查看改动摘要",
            "选择回滚模式：同时恢复代码与对话、仅恢复代码、仅恢复对话、或从该点生成摘要压缩上下文",
            "确认执行后，本地代码文件与对话记录瞬间回退至选定时光节点"
          ],
          "commands": [
            "/rewind",
            "Esc Esc"
          ],
          "pitfalls": "通过 Fork 分支出来的独立会话不会继承父会话的历史文件快照，无法在 Fork 会话中回滚到分支创建前的文件状态。",
          "doc": "https://docs.claude.com/en/docs/claude-code/sessions#manage-context-within-a-session",
          "tags": [
            "快照回滚",
            "容错机制",
            "代码时光机",
            "会话管理"
          ],
          "isHot": true
        },
        {
          "id": "cc-skills",
          "name": "Skills 自定义能力与动态上下文",
          "category": "扩展能力",
          "level": "进阶",
          "hot": 93,
          "isNew": false,
          "summary": "在 .claude/skills/<name>/SKILL.md 中封装可复用能力，支持按需加载与动态命令输出。",
          "why": "将项目专属的高频复杂工作流（如 PR 审查、部署脚本、数据库迁移）固化为团队内开箱即用的一键命令。",
          "steps": [
            "在项目根目录创建 .claude/skills/review-pr/SKILL.md（个人级放 ~/.claude/skills/）",
            "在 YAML frontmatter 中写 name 与 description；description 决定模型何时自动加载",
            "正文写审查清单；用 !`git diff main` 注入实时命令输出",
            "在会话输入 /review-pr 手动调用，或直接描述任务让模型按需加载"
          ],
          "commands": [
            "mkdir -p .claude/skills/review-pr",
            "/review-pr"
          ],
          "pitfalls": "Skills 是「目录 + SKILL.md」，不是单个 .md 文件；旧式单文件命令放在 .claude/commands/，两者不要混淆。",
          "doc": "https://docs.claude.com/en/docs/claude-code/skills",
          "tags": [
            "自定义命令",
            "工作流",
            "Prompt工程",
            "动态上下文"
          ],
          "isHot": true
        },
        {
          "id": "cc-mcp",
          "name": "MCP (Model Context Protocol) 工具协议集成",
          "category": "外部集成",
          "level": "进阶",
          "hot": 96,
          "isNew": false,
          "summary": "借助标准开放的 MCP 协议连接本地与远程服务器（stdio、HTTP、SSE、WebSocket），为 Claude 挂载外部工具与数据源。",
          "why": "突破本地文本工具局限，让 Claude Code 能够直接安全地查询数据库、操作 GitHub、调用内部监控与微服务。",
          "steps": [
            "使用 claude mcp add 命令添加 MCP 服务器，指定传输协议与运行命令",
            "根据需求选择配置范围：当前终端 local、项目级 .mcp.json 或用户级 ~/.claude/mcp.json",
            "在会话中运行 /mcp 命令查看已连接的服务状态、工具清单与可用资源",
            "在对话中自然提示 Claude 调用目标工具（如：'查询数据库中最新的 5 条订单记录'）",
            "Claude Code 自动在后台将长耗时 MCP 任务调度为后台任务执行并返回结果"
          ],
          "commands": [
            "claude mcp add --transport stdio github -- npx -y @modelcontextprotocol/server-github",
            "claude mcp add --transport stdio postgres -- npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb",
            "claude mcp list",
            "/mcp"
          ],
          "pitfalls": "stdio server 的命令必须放在 -- 之后，否则 server 自己的参数会被 Claude Code 当成 CLI 选项解析；项目级 .mcp.json 不要硬编码密钥。",
          "doc": "https://docs.claude.com/en/docs/claude-code/mcp",
          "tags": [
            "MCP",
            "外部系统",
            "数据库",
            "协议扩展"
          ],
          "isHot": true
        },
        {
          "id": "cc-hooks",
          "name": "Hooks 生命周期事件钩子",
          "category": "自动化",
          "level": "进阶",
          "hot": 95,
          "isNew": false,
          "summary": "监听 SessionStart、PreToolUse、PostToolUse 等数十种事件，执行自动化格式化、安全守卫拦截或状态同步。",
          "why": "在开发全生命周期注入自动化确定性保障，例如在代码写入后自动执行 linter，或阻止未授权的敏感命令运行。",
          "steps": [
            "在 .claude/settings.json 或 ~/.claude/settings.json 中声明 hooks 配置节点",
            "指定需要监听的目标事件（如 PreToolUse 拦截工具调用，PostToolUse 执行后处理）",
            "编写钩子行为：可调用本地脚本、发送 HTTP Webhook 或调用 MCP 工具",
            "通过退出码与返回 JSON 实施决策控制：返回 0 正常放行，非 0 或结构化拒绝则阻断该操作",
            "启动 claude 运行，当触发相应事件时钩子将在底层自动被调度执行"
          ],
          "commands": [
            "{\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          { \"type\": \"command\", \"command\": \"npx prettier --write .\" }\n        ]\n      }\n    ]\n  }\n}"
          ],
          "pitfalls": "hooks 配置必须是「事件 → matcher 组 → hooks 处理器」三层结构；钩子通过 stdin 接收 JSON，不是读取 $CLAUDE_TOOL_INPUT_PATH。",
          "doc": "https://docs.claude.com/en/docs/claude-code/hooks",
          "tags": [
            "自动化",
            "生命周期",
            "安全防护",
            "格式化"
          ],
          "isHot": true
        },
        {
          "id": "cc-permissions",
          "name": "多级权限与安全控制体系",
          "category": "安全合规",
          "level": "进阶",
          "hot": 91,
          "isNew": false,
          "summary": "提供 auto、manual、plan、acceptEdits、dontAsk 等六种安全模式，搭配 fine-grained allow/deny 规则构建纵深防御。",
          "why": "满足从个人高效开发到企业级严格合规的安全诉求，精确界定 Agent 的自主权限边界，杜绝数据泄露与误删风险。",
          "steps": [
            "使用快捷键 Shift+Tab 在会话中循环切换权限模式（如 manual 确认模式或 acceptEdits 快速编辑模式）",
            "启动会话时可指定全局模式：claude --permission-mode <mode>",
            "在 .claude/settings.json 中配置 permissions.allow 预先放行安全的读操作或常用测试命令",
            "在 permissions.deny 中明确禁止高危命令（如 rm -rf、访问敏感凭证目录）",
            "使用 /config 交互面板检查当前项目的有效权限清单与覆盖规则"
          ],
          "commands": [
            "claude --permission-mode acceptEdits",
            "Shift+Tab",
            "/config"
          ],
          "pitfalls": "deny 规则在任何模式（即使是 bypassPermissions 危险模式）下都会生效；配置 allow 规则时尽量避免使用过于宽泛的通配符。",
          "doc": "https://docs.claude.com/en/docs/claude-code/permission-modes",
          "tags": [
            "安全",
            "权限管理",
            "沙箱策略",
            "合规"
          ],
          "isHot": true
        },
        {
          "id": "cc-github-actions",
          "name": "GitHub Actions CI/CD 与 @claude 协作",
          "category": "CI/CD",
          "level": "进阶",
          "hot": 93,
          "isNew": false,
          "summary": "通过官方 Action 在 CI 中运行 Claude Code，支持在 Issue 与 PR 评论中 @claude 进行代码审查、自动修复与分支提交。",
          "why": "将 AI 结对编程直接延伸到 GitHub 协作平台，实现团队多人异步代码审查、缺陷自动复现与全自动 PR 修复。",
          "steps": [
            "在本地终端会话中运行 /install-github-app 引导完成官方 GitHub App 的组织/仓库授权",
            "在 GitHub 仓库 Settings -> Secrets 中添加 ANTHROPIC_API_KEY 或配置 OIDC 身份联合凭据",
            "在仓库中创建工作流文件 .github/workflows/claude.yml 引用 anthropics/claude-code-action@v1",
            "配置触发事件（issue_comment、pull_request_review_comment 等）及必要写入权限",
            "在 Pull Request 评论中输入 '@claude 请修复这个单元测试报错'，Claude 将自动推送修复 Commit"
          ],
          "commands": [
            "/install-github-app",
            "claude setup-token"
          ],
          "pitfalls": "工作流必须授予 GITHUB_TOKEN 的 contents: write 与 pull-requests: write 权限，否则 Claude 无法向分支推送修复代码或评论。",
          "doc": "https://docs.claude.com/en/docs/claude-code/github-actions",
          "tags": [
            "GitHub",
            "CI/CD",
            "自动化审查",
            "异步协作"
          ],
          "isHot": true
        },
        {
          "id": "cc-subagents",
          "name": "Subagents 专业子智能体分工",
          "category": "多智能体",
          "level": "高级",
          "hot": 97,
          "isNew": false,
          "summary": "在 .claude/agents/*.md 中声明具备专属角色、独立上下文、特定模型与定制工具集的 Subagent，支持后台并发调度。",
          "why": "将消耗海量 Token 的代码全库检索、高频报错调试等繁重任务分流给子代理，保持主会话上下文精炼高效。",
          "steps": [
            "在项目根目录下创建目录 .claude/agents/",
            "新建子代理定义文件（例如 .claude/agents/code-reviewer.md）",
            "在 Frontmatter 中配置 name、model、tools、effort 与 background 参数",
            "在 Markdown 正文中编写专有系统提示词（System Prompt），规定其审查清单与输出格式",
            "在交互终端中下达指令，Claude 会根据任务属性自动分派给该子代理执行",
            "输入 /tasks 查看当前所有正在后台运行或已完成的历史子代理状态与输出"
          ],
          "commands": [
            "mkdir -p .claude/agents",
            "/tasks"
          ],
          "pitfalls": "子代理如果配置了 background: true，其结果是以异步事件形式上报给主会话，主会话在连续任务规划时需合理处理异步依赖。",
          "doc": "https://docs.claude.com/en/docs/claude-code/sub-agents",
          "tags": [
            "多智能体",
            "上下文隔离",
            "后台并发",
            "任务拆解"
          ],
          "isHot": true
        },
        {
          "id": "cc-agent-sdk",
          "name": "Agent SDK 编程式智能体开发",
          "category": "二次开发",
          "level": "高级",
          "hot": 94,
          "isNew": false,
          "summary": "使用官方 Python 与 TypeScript SDK 将 Claude Code 完整的 Agent 循环、工具生态与上下文管理能力嵌入自定义应用。",
          "why": "超越命令行终端交互界面，让开发者能够以原生代码形式驱动拥有全量代码编辑与系统执行能力的专业 Agent 软件。",
          "steps": [
            "根据开发语言安装官方 SDK：pip install claude-agent-sdk 或 npm install @anthropic-ai/claude-agent-sdk",
            "在环境变量中配置 ANTHROPIC_API_KEY",
            "使用轻量 query() 函数编写简单的无状态代码分析或生成脚本",
            "或者实例化 ClaudeSDKClient 构建支持持久会话、多轮交互与状态恢复的企业级应用",
            "在客户端中注入自定义工具与拦截处理器，构建专属智能开发平台"
          ],
          "commands": [
            "pip install claude-agent-sdk",
            "npm install @anthropic-ai/claude-agent-sdk"
          ],
          "pitfalls": "Agent SDK 底层会拉起 Claude Code 运行时，若在 Docker 或无头服务器环境中部署，需确保基础镜像中预装了 git 与 bash 工具。",
          "doc": "https://docs.claude.com/en/docs/claude-code/agent-sdk/overview",
          "tags": [
            "SDK",
            "Python",
            "TypeScript",
            "二次开发",
            "企业级应用"
          ],
          "isHot": true
        },
        {
          "id": "cc-remote-teleport",
          "name": "Remote Control 与 Teleport 跨端接力",
          "category": "跨端协同",
          "level": "高级",
          "hot": 89,
          "isNew": false,
          "summary": "通过 claude remote-control 与 claude --teleport 打通终端、Web、移动端与桌面端，实现多端无缝会话接力与可视化审阅。",
          "why": "实现随时随地不间断的 AI 编程：离开工位时用手机监控云端或本地进度，回到电脑前一秒将任务拉回本地终端继续开发。",
          "steps": [
            "在本地开发机终端中运行 claude remote-control 打开远程受控服务通道",
            "在手机或任意浏览器中登录 claude.ai/code，查看当前本地终端正在进行的任务与代码状态",
            "在移动端输入后续调优指令或进行操作权限确认",
            "若任务在云端或移动端启动，回到工位后在本地运行 claude --teleport 即可将远端会话无缝同步至本地终端接续执行",
            "在终端中输入 /desktop 命令，可将当前会话一键转移至 Claude Desktop 桌面端进行直观的可视化 Diff 审查"
          ],
          "commands": [
            "claude remote-control",
            "claude --teleport",
            "/desktop"
          ],
          "pitfalls": "Teleport 与 Remote Control 需使用 Claude 官方付费账户登录；remote-control 会锁定启动时的项目目录，不支持远端随意切换绝对路径。",
          "doc": "https://docs.claude.com/en/docs/claude-code/remote-control",
          "tags": [
            "远程控制",
            "Teleport",
            "跨端协同",
            "桌面集成"
          ],
          "isHot": false
        }
      ]
    },
    {
      "slug": "codex",
      "name": "Codex",
      "vendor": "OpenAI",
      "tagline": "OpenAI 官方终端与云端一体化自主编程 Agent",
      "version": "0.167.1",
      "updatedAt": "2026-11-11",
      "official": {
        "site": "https://developers.openai.com/codex/",
        "docs": [
          "https://developers.openai.com/codex/cli",
          "https://developers.openai.com/codex/configuration",
          "https://developers.openai.com/codex/features",
          "https://developers.openai.com/codex/ide",
          "https://developers.openai.com/codex/cloud"
        ],
        "repo": "https://github.com/openai/codex",
        "changelog": "https://github.com/openai/codex/releases"
      },
      "stats": {
        "popularity": 96,
        "learningCurve": 2,
        "bestFor": [
          "终端交互与自动化脚本编写",
          "全仓库上下文重构与调试",
          "CI/CD 流水线自动化评审与补丁",
          "企业级严格安全沙箱控制"
        ]
      },
      "install": {
        "requirements": [
          "Node.js 18+（npm 全局安装时必需）或官方独立脚本包",
          "Git 2.23+（推荐工作树受管环境）",
          "OpenAI API Key 或 ChatGPT 订阅账号（Plus / Pro / Team / Enterprise）"
        ],
        "steps": [
          "安装 CLI 工具：npm install -g @openai/codex（或使用官方 curl / PowerShell 脚本）",
          "登录鉴权：运行 codex login 进行账号网页登录或设置 OPENAI_API_KEY 环境变量",
          "环境诊断：运行 codex doctor 检查本地安装、权限沙箱与 OpenAI 端点连通性",
          "首次启动：在 Git 代码仓库目录下直接运行 codex 进入终端交互 TUI"
        ],
        "commands": [
          "npm install -g @openai/codex",
          "codex login",
          "codex doctor",
          "codex"
        ],
        "verify": "codex --version"
      },
      "concepts": [
        {
          "term": "Sandbox（三级沙箱模式）",
          "desc": "基于操作系统机制限制 Agent 执行命令与写盘范围，包含 read-only（只读审计）、workspace-write（工作区受限写入）与 danger-full-access（完全权限）三级策略。"
        },
        {
          "term": "Approval Policy（审批策略）",
          "desc": "定义 Agent 执行破坏性命令或修改外部文件时何时向人类请示，支持 on-request（模型智能判定）、never（无干预自动化）及 --approve-for-me（自动安全审计代理）。"
        },
        {
          "term": "AGENTS.md（层级指令链）",
          "desc": "从全局 ~/.codex 到项目各级子目录自顶向下级联加载的行为约定规范，用于向 Agent 注入测试命令、代码风格与架构设计约束。"
        },
        {
          "term": "MCP（Model Context Protocol）",
          "desc": "开放模型上下文协议，支持以 stdio 或 SSE 模式外挂本地进程与远端服务，让 Codex 拥有查询数据库、访问文档与调用私有 API 的能力。"
        },
        {
          "term": "app-server（双向守护进程协议）",
          "desc": "Codex 底层核心服务，基于标准双向 JSON-RPC 协议通过 stdio / WebSocket / Unix Socket 驱动 IDE 插件、桌面端与远程协同终端。"
        }
      ],
      "learningPath": [
        {
          "title": "阶段 1：初探终端与安全边界",
          "desc": "掌握 Codex CLI 的快速安装、TUI 交互模式、三级沙箱隔离策略以及项目级 AGENTS.md 规范注入。",
          "features": [
            "codex-tui",
            "approval-sandbox",
            "agents-md",
            "codex-doctor"
          ]
        },
        {
          "title": "阶段 2：非交互自动化与工程化提效",
          "desc": "利用 codex exec 编写批处理任务，执行自动化多模式代码审查，持久化并分支管理历史会话，统一团队 config.toml 与 MCP 外部工具。",
          "features": [
            "codex-exec",
            "codex-review",
            "session-resume-fork",
            "config-toml",
            "mcp-integration"
          ]
        },
        {
          "title": "阶段 3：跨端集成与架构扩展",
          "desc": "结合 VS Code 官方 IDE 插件、Codex Cloud 云端任务托管与 GitHub Action CI/CD 流水线，深入底层 JSON-RPC app-server 协议与技能插件体系。",
          "features": [
            "ide-extension",
            "codex-cloud-github",
            "app-server-protocol",
            "skills-plugins"
          ]
        }
      ],
      "features": [
        {
          "id": "codex-tui",
          "name": "交互式 TUI 与终端工作流",
          "category": "基础交互",
          "level": "入门",
          "hot": 95,
          "isNew": false,
          "releasedAt": "2025-05-15",
          "summary": "基于终端的全功能交互界面，支持多轮对话、实时流式输出、Diff 预览与快捷斜杠命令",
          "why": "无需跳出终端即可获得强大的全仓库代码理解与修改能力，配合丰富的斜杠命令快速执行会话压缩、模型切换与权限变更。",
          "steps": [
            "在终端中进入任意 Git 项目目录",
            "输入 codex 并回车进入交互式 TUI 界面",
            "在输入框输入任务描述（如：'优化 utils.ts 中的重试逻辑并编写对应单元测试'）",
            "通过 Tab 或键盘方向键审阅模型提出的终端命令与文件 Diff，按 Enter 确认执行",
            "输入 /status 或 /model 随时查看当前 Token 消耗与模型配置，输入 /exit 退出会话"
          ],
          "commands": [
            "codex",
            "codex \"重构当前模块，补充完整 TypeScript 类型声明\""
          ],
          "pitfalls": "在非 Git 仓库中直接运行默认会提示警告，若需在非受管目录运行需添加 --skip-git-repo-check 参数。",
          "doc": "https://developers.openai.com/codex/cli",
          "tags": [
            "TUI",
            "CLI",
            "终端交互",
            "入门首选"
          ],
          "isHot": true
        },
        {
          "id": "approval-sandbox",
          "name": "审批模式与三级安全沙箱",
          "category": "安全性",
          "level": "入门",
          "hot": 94,
          "isNew": false,
          "releasedAt": "2025-06-01",
          "summary": "严格的操作系统级运行边界，提供只读、工作区写入和完全权限三级沙箱，与智能审批策略协同防护",
          "why": "AI Agent 自主运行 Shell 命令存在越权风险。Codex 细粒度的沙箱保障了即使模型产生幻觉，也不会逃逸出工作区破坏敏感文件或泄露密钥。",
          "steps": [
            "审阅当前项目的安全要求，选定合适的沙箱级别（默认推荐 workspace-write）",
            "在执行敏感检查时启动 read-only 模式，禁止任何文件修改和写盘命令",
            "在自动化脚本中结合 --ask-for-approval never 实现免打扰受控执行",
            "在 TUI 中输入 /permissions 随时查看并动态切换当前沙箱与审批模式",
            "若需要授予额外目录写权限，使用 --add-dir <DIR> 显式挂载，避免全局失控"
          ],
          "commands": [
            "codex --sandbox workspace-write --ask-for-approval on-request",
            "codex --sandbox read-only \"检查当前代码库所有依赖是否存在已知安全漏洞\"",
            "codex --sandbox workspace-write --add-dir ../shared-types \"同步更新公共类型定义\""
          ],
          "pitfalls": "切勿在未隔离的生产主机上随意使用 --dangerously-bypass-approvals-and-sandbox（等同于完全放行所有破坏性命令）。",
          "doc": "https://developers.openai.com/codex/permission-modes",
          "tags": [
            "安全",
            "沙箱",
            "权限隔离",
            "合规"
          ],
          "isHot": true
        },
        {
          "id": "agents-md",
          "name": "AGENTS.md 项目规范与上下文注入",
          "category": "上下文规范",
          "level": "入门",
          "hot": 93,
          "isNew": false,
          "releasedAt": "2025-05-20",
          "summary": "基于 Markdown 的级联行为规范文件，让 Codex 在执行任何任务前自动对齐项目团队约定与测试要求",
          "why": "避免每次提问都要重复叮嘱'请使用 pnpm'、'修改代码后运行 pytest'。AGENTS.md 自动级联生效，是团队协作一致性的基石。",
          "steps": [
            "在仓库根目录创建 AGENTS.md；也可用 AGENTS.override.md 覆盖同目录的 AGENTS.md",
            "编写项目专属规则：包管理器、格式化命令、测试运行规范和架构禁区",
            "在子目录按需放置 AGENTS.md，离当前目录越近的规则优先级越高",
            "在 ~/.codex/AGENTS.md 定义个人跨项目偏好（或使用 CODEX_HOME 指定的目录）",
            "启动 codex 后输入 /init，可让 Codex 生成一份初始 AGENTS.md 模板"
          ],
          "commands": [
            "codex",
            "/init"
          ],
          "pitfalls": "指令链受 project_doc_max_bytes（默认 32 KiB）限制；内容过长会被截断，应保持精炼并善用子目录分层。",
          "doc": "https://developers.openai.com/codex/agent-configuration/agents-md",
          "tags": [
            "规范约束",
            "上下文注入",
            "团队协作",
            "Prompt"
          ],
          "isHot": true
        },
        {
          "id": "codex-doctor",
          "name": "codex doctor 环境健康诊断",
          "category": "工程化诊断",
          "level": "入门",
          "hot": 82,
          "isNew": false,
          "releasedAt": "2025-07-10",
          "summary": "一键排查本地运行环境、配置文件语法、鉴权凭据有效性与网络/WebSocket 连通性",
          "why": "新手常遇网络代理拦截、TOML 格式拼写错误或 API Token 过期。doctor 命令能够输出清晰的分组体检报告与修复建议。",
          "steps": [
            "打开终端，执行 codex doctor 命令启动全项系统诊断",
            "观察控制台输出的配置检查、本地凭据、沙箱驱动和后端端点状态指示",
            "如怀疑网络代理或企业网关阻断，运行 codex doctor --network-only 专门排查网络连通性",
            "在 CI 或脚本排查场景中，添加 --json 参数获取机器可读的脱敏 JSON 诊断报告",
            "根据报告中提示的 Warning 或 Error 快速定位并修复环境变量或配置文件"
          ],
          "commands": [
            "codex doctor",
            "codex doctor --network-only",
            "codex doctor --json"
          ],
          "pitfalls": "在配置了企业 HTTP 代理时，如遇 WebSocket 握手失败，需检查 system_proxy_fallback 与环境变量 HTTP_PROXY/HTTPS_PROXY 设置。",
          "doc": "https://developers.openai.com/codex/reference/commands",
          "tags": [
            "诊断工具",
            "运维排查",
            "新手排错",
            "健康检查"
          ],
          "isHot": false
        },
        {
          "id": "codex-exec",
          "name": "codex exec 非交互自动化批处理",
          "category": "自动化工作流",
          "level": "进阶",
          "hot": 96,
          "isNew": false,
          "releasedAt": "2025-06-01",
          "summary": "Headless 非交互命令行模式，直接在脚本、Git 钩子和 CI/CD 流程中执行指令并产出代码补丁",
          "why": "无需人工值守即可批量完成跨文件重构、自动化 Bug 修复和依赖版本迁移，是打通自动化研发管线的核心支柱。",
          "steps": [
            "确定要自动化的任务目标并编写明确的提示词",
            "使用管道将错误日志或待处理代码喂给 codex exec，或直接作为命令行参数传入",
            "指定 --sandbox workspace-write 与 -a never 确保脚本全自动执行完毕不挂起",
            "配置 -o result.md 将 Agent 最终生成的结论与修改说明保存至指定文件",
            "通过 git diff 检查自动化改动，确认符合预期后提交"
          ],
          "commands": [
            "codex exec \"修复 tests/test_api.py 中的失败用例并运行 pytest 验证\"",
            "git diff | codex exec -s read-only \"评估该变更对现有接口向后兼容性的影响\" -o review.md",
            "codex exec --sandbox workspace-write -a never --json \"批量迁移 React 18 到 19 的废弃 API\""
          ],
          "pitfalls": "自动化模式下遇到无法自愈的编译错误时可能会持续尝试导致 Token 消耗增加，建议配合 --ephemeral 或设置合理的超时控制。",
          "doc": "https://developers.openai.com/codex/cli",
          "tags": [
            "CI/CD",
            "自动化",
            "批处理",
            "Headless"
          ],
          "isHot": true
        },
        {
          "id": "codex-review",
          "name": "代码智能审查（codex review & /review）",
          "category": "代码质量",
          "level": "进阶",
          "hot": 91,
          "isNew": false,
          "releasedAt": "2025-06-20",
          "summary": "专为代码审查定制的功能，可针对未暂存改动、指定分支对比或特定 Commit 进行全面安全与性能评审",
          "why": "在发起 Pull Request 前由 Agent 进行第一轮静态代码审计，能快速拦截边界隐患、并发竞态、SQL 注入及未捕获异常。",
          "steps": [
            "在本地完成代码修改后，运行 codex review --uncommitted 审查未提交的代码变更",
            "审查特性分支准备合并前，运行 codex review --base main 对比目标分支进行完整评估",
            "针对线上可疑提交，运行 codex review --commit <SHA> 精确定位引入问题的 Commit",
            "在交互式 TUI 中随时输入 /review 附加定制提示（如：'/review 重点排查死锁与内存泄露'）",
            "依据审查报告提出的修改建议逐项采纳或要求 Codex 直接就地修复"
          ],
          "commands": [
            "codex review --uncommitted",
            "codex review --base main",
            "codex review --commit a1b2c3d \"重点检查是否有 SQL 注入或鉴权绕过风险\""
          ],
          "pitfalls": "review 模式默认采用 read-only 沙箱，不会自动帮你修改代码；若需要直接就地修复，请使用 codex exec 传入修复指令。",
          "doc": "https://developers.openai.com/codex/code-review",
          "tags": [
            "Code Review",
            "代码质量",
            "安全审计",
            "Pull Request"
          ],
          "isHot": true
        },
        {
          "id": "session-resume-fork",
          "name": "会话持久化、恢复与分叉（resume & fork）",
          "category": "会话管理",
          "level": "进阶",
          "hot": 88,
          "isNew": false,
          "releasedAt": "2025-07-05",
          "summary": "会话自动存档于本地 JSONL，支持一键继续近期会话、历史列表筛选以及分叉探索不同重构方案",
          "why": "复杂的系统重构往往需要多天多次迭代。会话持久化与 fork 功能让开发者随时回溯思路，不用担心终端关闭后上下文丢失。",
          "steps": [
            "终端关闭或中断后，在项目目录下运行 codex resume 打开历史会话选择器",
            "直接继续上一轮会话：codex resume --last",
            "需要尝试另一种方案：codex fork 选择会话分叉，或用 codex exec fork <SESSION_ID> \"<新提示>\"",
            "在交互会话中输入 /resume 可跳转历史会话",
            "用 codex archive / codex delete 管理过期会话"
          ],
          "commands": [
            "codex resume",
            "codex resume --last",
            "codex fork",
            "codex exec fork <SESSION_ID> \"换一种方案：改用 Redis 分布式锁实现\"",
            "codex resume --all"
          ],
          "pitfalls": "默认 resume 仅显示当前工作目录相关的会话；若需跨目录检索其他项目的会话，必须添加 --all 参数。",
          "doc": "https://developers.openai.com/codex/cli",
          "tags": [
            "会话管理",
            "上下文持久化",
            "Fork",
            "断点续传"
          ],
          "isHot": false
        },
        {
          "id": "config-toml",
          "name": "分层配置与环境策略（config.toml & Profiles）",
          "category": "环境配置",
          "level": "进阶",
          "hot": 87,
          "isNew": false,
          "releasedAt": "2025-06-15",
          "summary": "遵循清晰优先级的 TOML 配置文件体系，支持项目级定制、命名 Profile 分组与命令行一键覆写",
          "why": "开发、测试、日常审查对模型选择、沙箱模式与网络访问的要求各不相同。分层配置让团队在共享规范的同时兼顾个人灵活偏好。",
          "steps": [
            "在用户主目录下创建或编辑 ~/.codex/config.toml 配置个人全局偏好（默认模型、沙箱策略）",
            "在项目根目录下创建 .codex/config.toml 提交到 Git，统一团队的配置标准",
            "创建专属 Profile 文件（如 ~/.codex/review.config.toml），通过 --profile review 快速调用",
            "在临时命令中使用 -c key=value 进行点路径覆盖（如 -c model=\"o3\"）",
            "运行 codex --strict-config 校验配置文件中是否存在无法识别的废弃键名"
          ],
          "commands": [
            "codex -c model=\"o3\" -c model_reasoning_effort=\"high\"",
            "codex --profile review \"审查当前分支\"",
            "codex -c 'shell_environment_policy.ignore_default_excludes=false'"
          ],
          "pitfalls": "项目级 .codex/config.toml 仅在项目被标记为受信任（Trusted）时才会加载，若项目未信任相关配置会被静默跳过以防恶意仓库利用。",
          "doc": "https://developers.openai.com/codex/config-file/config-basic",
          "tags": [
            "配置管理",
            "TOML",
            "Profiles",
            "团队规范"
          ],
          "isHot": false
        },
        {
          "id": "mcp-integration",
          "name": "MCP 协议与外部工具挂载",
          "category": "扩展协议",
          "level": "进阶",
          "hot": 90,
          "isNew": false,
          "releasedAt": "2025-08-01",
          "summary": "深度支持 Model Context Protocol（MCP），通过 stdio 或 SSE 模式扩展数据库查询、文档检索等外部能力",
          "why": "单纯依靠本地命令行无法满足复杂业务场景。MCP 赋予了 Codex 安全连接私有知识库、云数据库与监控面板的通用标准能力。",
          "steps": [
            "选定或编写所需的 MCP Server（如用于上下文检索的 Context7 或 Postgres 数据库工具）",
            "使用 CLI 命令直接添加：codex mcp add <name> -- <command> [args...]",
            "或在 config.toml 的 [mcp_servers.<name>] 字段中配置本地启动命令或远端 SSE URL",
            "运行 codex mcp list 查看已挂载的服务状态与工具列表",
            "在对话中直接让 Codex 调用 MCP 工具执行操作（如：'通过数据库 MCP 查询最新活跃用户数'）"
          ],
          "commands": [
            "codex mcp list",
            "codex mcp add context7 -- npx -y @upstash/context7-mcp@latest",
            "codex mcp add doc-server --url https://mcp.internal.example.com/sse",
            "codex mcp remove context7"
          ],
          "pitfalls": "通过 stdio 启动的 MCP 进程会继承部分系统环境，若工具依赖特定环境变量需在配置表中的 env 键中显式声明。",
          "doc": "https://developers.openai.com/codex/extend/mcp",
          "tags": [
            "MCP",
            "工具扩展",
            "上下文协议",
            "数据库集成"
          ],
          "isHot": true
        },
        {
          "id": "ide-extension",
          "name": "VS Code / Cursor 官方 IDE 扩展",
          "category": "开发集成",
          "level": "高级",
          "hot": 92,
          "isNew": false,
          "releasedAt": "2025-07-25",
          "summary": "将 Codex Agent 深度内嵌在编辑器侧边栏，支持行内代码 Diff、@file 引用、检查点与云端委托",
          "why": "对于习惯图形化编辑器的开发者，IDE 扩展打通了代码补全、侧边栏 Agent、直观 Diff 审阅与本地断点调试的闭环体验。",
          "steps": [
            "在 VS Code / Cursor 插件市场搜索官方 OpenAI Codex 插件并安装",
            "点击侧边栏 Codex 图标，使用 ChatGPT 账号或 OpenAI API Key 完成鉴权",
            "在聊天窗口里用 @ 引用当前文件或高亮代码片段",
            "发送修改指令，在编辑器分栏查看 diff，选择 Accept 或 Revert",
            "需要云端任务时，在 IDE 中把任务委托到 Codex Cloud"
          ],
          "commands": [],
          "pitfalls": "IDE 扩展与 CLI 共享同一套 ~/.codex/config.toml 配置，若在 CLI 中设置了冲突的沙箱模式可能导致 IDE 中的自动保存提示受阻。",
          "doc": "https://developers.openai.com/codex/ide",
          "tags": [
            "VS Code",
            "IDE扩展",
            "Cursor",
            "界面协同"
          ],
          "isHot": true
        },
        {
          "id": "codex-cloud-github",
          "name": "Codex Cloud 与 GitHub CI/CD 集成",
          "category": "云端与CI/CD",
          "level": "高级",
          "hot": 94,
          "isNew": false,
          "releasedAt": "2025-08-20",
          "summary": "支持在云端托管长时编程任务，结合 openai/codex-action 在 GitHub PR 中实现自动化审查与修复流水线",
          "why": "大型项目的迁移和长耗时测试不应阻塞本地电脑。云端隔离运行加上 CI 流水线自动产出 PR 补丁，真正实现研发全自动化。",
          "steps": [
            "在 GitHub 仓库 .github/workflows/ 目录下添加 codex-review.yml 工作流文件",
            "引入官方 openai/codex-action@v1 动作，并在 GitHub Secrets 中配置 OPENAI_API_KEY",
            "设定触发条件（如 pull_request opened/synchronize），传入定制审查或修复 Prompt",
            "本地用 codex cloud / codex cloud list 查看云端任务；codex apply <TASK_ID> 拉取补丁",
            "在 PR 评论中输入 @codex review，让云端 Codex 直接发表评审意见"
          ],
          "commands": [
            "codex cloud",
            "codex cloud list",
            "codex apply <TASK_ID>",
            "@codex review"
          ],
          "pitfalls": "在 CI 环境中运行修改任务时，务必将 GitHub Action 的 GITHUB_TOKEN 配置为具有 contents: write 权限，否则无法自动提交补丁。",
          "doc": "https://developers.openai.com/codex/cloud",
          "tags": [
            "Codex Cloud",
            "GitHub Action",
            "CI/CD",
            "云端任务"
          ],
          "isHot": true
        },
        {
          "id": "app-server-protocol",
          "name": "Headless 双向 JSON-RPC app-server 协议",
          "category": "架构与协议",
          "level": "高级",
          "hot": 86,
          "isNew": false,
          "releasedAt": "2025-09-01",
          "summary": "解耦的 Agent 后端守护进程，支持基于 stdio、WebSocket 及 Unix Socket 的双向事件流与远程控制",
          "why": "企业与平台开发者无需重复造轮子，直接通过标准 JSON-RPC 协议驱动 Codex Agent 核心，轻松自研专用 Web IDE 或机器人。",
          "steps": [
            "启动 app-server 守护进程并指定传输方式：codex app-server --listen ws://127.0.0.1:4500",
            "配置 WebSocket 认证策略与密钥文件（如 --ws-auth capability-token）",
            "在客户端程序中通过 JSON-RPC 发送会话创建、输入提交与审批确认消息",
            "订阅流式事件（具体事件名与 schema 以 app-server 官方文档为准）",
            "用 codex --remote <地址> 让本地 CLI 连接远程 app-server"
          ],
          "commands": [
            "codex app-server --listen stdio://",
            "codex app-server --listen ws://127.0.0.1:4500 --ws-auth capability-token",
            "codex --remote ws://127.0.0.1:4500"
          ],
          "pitfalls": "远端 WebSocket 若暴露在公网，必须配置严格鉴权或 mTLS；不要无认证裸奔。",
          "doc": "https://developers.openai.com/codex/developers",
          "tags": [
            "JSON-RPC",
            "app-server",
            "协议",
            "SDK底层"
          ],
          "isHot": false
        },
        {
          "id": "skills-plugins",
          "name": "Skills 机制与插件生态（SKILL.md & Plugin）",
          "category": "生态扩展",
          "level": "高级",
          "hot": 85,
          "isNew": false,
          "releasedAt": "2025-09-15",
          "summary": "用 .agents/skills/<name>/SKILL.md 封装可复用技能，并用 codex plugin 管理插件包。",
          "why": "相比单纯的 Prompt 模板，Skill 拥有独立的上下文触发逻辑、入参校验与工具依赖声明，让复杂业务技能可打包复用与分发。",
          "steps": [
            "在 .agents/skills/<name>/SKILL.md（项目）、~/.agents/skills/<name>/SKILL.md（用户）或 /etc/codex/skills（系统）定义技能",
            "frontmatter 必须包含 name 与 description；description 要写清何时触发",
            "在会话中输入 /skills 或 $ 引用技能；任务匹配时 Codex 也会自动加载",
            "用 codex plugin marketplace list 查看插件市场，codex plugin add <plugin> 安装插件包",
            "用 codex plugin list / codex plugin remove 管理已安装插件"
          ],
          "commands": [
            "codex plugin marketplace list",
            "codex plugin add @openai/security-skills",
            "codex plugin list",
            "codex plugin remove @openai/security-skills"
          ],
          "pitfalls": "SKILL.md 的 description 写得太泛会导致自动匹配失败；插件包要在受信任的 marketplace 安装。",
          "doc": "https://developers.openai.com/codex/build-skills",
          "tags": [
            "Skills",
            "Plugins",
            "插件生态",
            "自定义扩展"
          ],
          "isHot": false
        }
      ]
    },
    {
      "slug": "antigravity",
      "name": "Antigravity",
      "vendor": "Google",
      "tagline": "Google 官方 Agent-first 智能开发环境",
      "version": "2.31.0",
      "updatedAt": "2026-11-11",
      "official": {
        "site": "https://antigravity.google",
        "docs": [
          "https://antigravity.google/docs",
          "https://codelabs.developers.google.com/getting-started-google-antigravity"
        ],
        "repo": "",
        "changelog": "https://antigravity.google/docs/changelog"
      },
      "stats": {
        "popularity": 94,
        "learningCurve": 2,
        "bestFor": [
          "全栈代码开发与多文件协同",
          "后台长任务并行调度与重构",
          "自主端到端 Web 自动化验证",
          "工程级规范与多智能体 Swarm 协同"
        ]
      },
      "install": {
        "requirements": [
          "macOS 12+ (Apple Silicon / Intel)、Windows 10+ (64-bit) 或 Linux (x86_64 / arm64)",
          "Google 个人账号（免费额度）或 Google Cloud 企业账号（Gemini Enterprise / WIF 单点登录）",
          "Node.js 18+ 或 Python 3.10+（开发环境可选但建议具备）"
        ],
        "steps": [
          "下载并安装 Antigravity App（macOS / Windows / Linux），用 Google 账号登录",
          "如需终端使用，安装 CLI：macOS/Linux 用 curl 安装脚本，Windows 用 PowerShell 脚本",
          "运行 agy --version 验证；首次启动按提示完成颜色方案与工作区信任设置",
          "在 Editor、Agent Manager 或终端中打开项目"
        ],
        "commands": [
          "curl -fsSL https://antigravity.google/cli/install.sh | bash",
          "irm https://antigravity.google/cli/install.ps1 | iex",
          "agy --version"
        ],
        "verify": "agy --version 打印 v2.31.0；桌面端左侧可见 Agent Manager、Editor、Browser 入口。"
      },
      "concepts": [
        {
          "term": "Agent",
          "desc": "具备上下文感知、推理规划、工具调用（读写文件/终端/浏览器）及自我纠错能力的自主智能体。"
        },
        {
          "term": "Agent Manager",
          "desc": "Antigravity 的异步指挥中心，支持同时派发、调度、监控多个在独立分支或沙箱中运行的后台 Agent。"
        },
        {
          "term": "Editor",
          "desc": "以 Agent 协作为核心的代码编辑器，支持内联自然语言指令、代码补全与可视化的单行/多文件变更审查（Diff Review）。"
        },
        {
          "term": "Browser",
          "desc": "Agent 内置的无头/有头受控浏览器工具，能够自动启动本地开发服务、模拟点击输入、检查控制台报错并截取验收图证。"
        },
        {
          "term": "Artifact",
          "desc": "Agent 执行过程中产出的结构化、可复用、可交互的里程碑产物（如任务规划书、执行计划、架构决策记录等）。"
        },
        {
          "term": "Walkthrough",
          "desc": "Agent 完成任务后自动生成的富文本验收交付物，包含改动概述、测试执行结果、Git Diff 与浏览器操作录屏/截图。"
        },
        {
          "term": "Planning Mode",
          "desc": "先规划后动手的防御性推演模式（/plan），在触碰文件前充分分析调用链、分解子任务并等待人类审批确认。"
        },
        {
          "term": "Unified Permission Engine",
          "desc": "采用 Deny > Ask > Allow 严格优先级和四档预设（Request Review/Default/Auto/Turbo）的安全权限决策系统。"
        },
        {
          "term": "MCP (Model Context Protocol)",
          "desc": "开放模型上下文协议，用于无缝桥接数据库（PostgreSQL/Supabase）、GitHub、Chrome DevTools 及第三方开发者服务。"
        },
        {
          "term": "Rules（规则文件）",
          "desc": "通过 AGENTS.md / GEMINI.md 与 .agents/rules/*.md 注入长期工程规则，支持 trigger / globs 控制生效范围。"
        }
      ],
      "learningPath": [
        {
          "title": "初识 Agent-first 界面与核心协同",
          "desc": "熟悉 Editor、Agent Manager 与 Browser 三大工作面，掌握内联编程、任务派发与产物验收流程",
          "features": [
            "ag-editor-inline",
            "ag-agent-manager",
            "ag-browser-testing",
            "ag-artifacts"
          ]
        },
        {
          "title": "掌控推演规划与自主执行安全",
          "desc": "从单步生成进阶到先规划后实施，掌握 Planning 模式、权限预设档位与命令回滚机制",
          "features": [
            "ag-planning-mode",
            "ag-permission-engine",
            "ag-allow-deny-policy",
            "ag-checkpoints-rewind",
            "ag-vscode-extension"
          ]
        },
        {
          "title": "架构进阶：工程定制与智能体集群",
          "desc": "通过 MCP 接入外部生态，利用 Swarm 组织多 Agent 分工协同，沉淀团队 Rules 与工作流知识。",
          "features": [
            "ag-mcp-integration",
            "ag-model-selection",
            "ag-multi-agent-swarm",
            "ag-rules-and-skills"
          ]
        }
      ],
      "features": [
        {
          "id": "ag-editor-inline",
          "name": "Editor 内联 Agent 与差异评审",
          "category": "编辑器协同",
          "level": "入门",
          "hot": 96,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "在代码编辑区直接呼出 Agent 进行自然语言重构、补全与单文件/多文件行内 Diff 交互审查。",
          "why": "无需跳出当前代码上下文即可精准修改局部逻辑，直观对比修改前后代码并随时选择接受或回退。",
          "steps": [
            "打开 Antigravity Editor，在右侧 Agent side panel 开始新会话",
            "用 @ 引用文件/文件夹，用 / 执行动作，或用 + 添加上下文",
            "描述重构需求，Agent 会在编辑器内高亮改动",
            "在 Review 栏逐文件查看 diff，选择 Accept all / Reject all 或逐项处理"
          ],
          "commands": [],
          "pitfalls": "选区过大时关注点容易发散，先聚焦具体函数或代码块。",
          "doc": "https://antigravity.google/docs/agent-side-panel",
          "tags": [
            "编辑器",
            "Diff评审",
            "行内重构",
            "高频交互"
          ],
          "isHot": true
        },
        {
          "id": "ag-agent-manager",
          "name": "Agent Manager 异步多任务中心",
          "category": "调度中心",
          "level": "入门",
          "hot": 98,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "集中的异步 Agent 指挥看板，支持同时派发、排队与监控多个后台编程任务。",
          "why": "将大型重构、全套单测编写等耗时任务直接卸载到后台运行，不阻塞前台人工编写代码与调试。",
          "steps": [
            "在 Agent side panel 新建多个会话，用侧边栏切换、搜索或删除",
            "在 Agent Manager 中查看并行会话的进度与产物",
            "CLI 中输入 /agents 打开 Agent Manager Panel，监控或终止后台子代理",
            "任务完成后在对应会话中查看 Artifacts 与 Walkthrough"
          ],
          "commands": [
            "/agents"
          ],
          "pitfalls": "后台多个会话修改同一文件可能冲突，尽量拆到独立模块或 Git 分支。",
          "doc": "https://antigravity.google/docs/agent/",
          "tags": [
            "后台长任务",
            "并行管理",
            "多任务调度",
            "工作区隔离"
          ],
          "isHot": true
        },
        {
          "id": "ag-browser-testing",
          "name": "内置 Browser 自动化验证与录屏",
          "category": "自动化验证",
          "level": "入门",
          "hot": 93,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "Agent 自带沙箱受控浏览器，能自动启动本地 Web 服务、模拟页面交互操作并生成验收截图与录屏。",
          "why": "彻底告别「Agent 写完代码必须人工刷网页看效果」的痛点，由 Agent 自动完成端到端验证并附带图证。",
          "steps": [
            "在任务提示词中加入前端页面开发或 Bug 修复指令，并注明需要浏览器验收",
            "Agent 自动在后台启动本地开发服务器（如 npm run dev），并调用 Chrome DevTools 协议打开沙箱浏览器",
            "Agent 自动导航到本地 URL，执行页面元素点击、表单输入并实时监控控制台日志是否有报错",
            "任务结束时，在 Walkthrough 面板直接点击播放自动录制的 WebM 操作视频或查看高亮截图"
          ],
          "commands": [
            "/browser"
          ],
          "pitfalls": "本地服务端口被占用时 Browser 可能无法访问；在规则中约定固定端口或动态探测。",
          "doc": "https://antigravity.google/docs/browser",
          "tags": [
            "无头浏览器",
            "UI验证",
            "自动录屏",
            "端到端测试"
          ],
          "isHot": true
        },
        {
          "id": "ag-artifacts",
          "name": "Artifacts 结构化产物与 Walkthrough 验收",
          "category": "评审交付",
          "level": "入门",
          "hot": 95,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "Agent 阶段性沉淀的富文本结构化产物，并在任务完成后自动生成整合测试与视觉证明的 Walkthrough。",
          "why": "告别传统聊天窗口中杂乱冗长的信息流，所有重要方案、任务清单与交付成果皆结构化沉淀且便于追溯。",
          "steps": [
            "给 Agent 派发复杂任务，观察 Artifacts / Implementation plan 自动生成",
            "按 Ctrl+R 打开 Artifact Review，查看计划、diff 与截图",
            "在计划上添加行内批注，按需切换 Request review / Always proceed 策略",
            "任务完成后查看 Walkthrough，确认测试结果与视觉证据后归档"
          ],
          "commands": [
            "Ctrl+R"
          ],
          "pitfalls": "跳过 Implementation Plan 直接放行容易漏掉边缘细节；先花一分钟读清单。",
          "doc": "https://antigravity.google/docs/artifacts",
          "tags": [
            "结构化交付",
            "验收报告",
            "任务清单",
            "Walkthrough"
          ],
          "isHot": true
        },
        {
          "id": "ag-planning-mode",
          "name": "Planning 模式 (/plan) 架构推演",
          "category": "任务规划",
          "level": "进阶",
          "hot": 94,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "只读推演工作流：在触碰任何代码文件前，完整扫描依赖拓扑、分解子任务并输出实施蓝图。",
          "why": "针对大型工程避免 Agent「盲目改动一处引发多处编译报错」，做到先思考评审、后精准落地的工程纪律。",
          "steps": [
            "在 Agent 会话框输入 `/plan` 配合任务描述，例如：`/plan 将现有的 REST API 迁移到 tRPC 架构`",
            "Agent 进入只读沙箱，深度遍历项目 AST 树、包依赖与接口定义，梳理出受影响的文件矩阵",
            "生成带有明确阶段依赖的 Implementation Plan 任务清单（包含探索、修改、验证三阶段）",
            "审阅计划细节，若无异议点击卡片底部的「Proceed」按钮，Agent 才会正式开始写入代码"
          ],
          "commands": [
            "/plan 迁移项目状态管理为 Zustand"
          ],
          "pitfalls": "项目缺少 .gitignore 时，Agent 可能把大量第三方目录纳入分析；先清理工作区。",
          "doc": "https://antigravity.google/docs/artifact-review",
          "tags": [
            "架构规划",
            "只读推演",
            "任务分解",
            "安全设计"
          ],
          "isHot": true
        },
        {
          "id": "ag-permission-engine",
          "name": "Unified Permission 审批策略与自主级别",
          "category": "安全与权限",
          "level": "进阶",
          "hot": 91,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "基于 Deny > Ask > Allow 判定链的统一权限引擎，提供四档可切换的自主运行策略预设。",
          "why": "在「完全无人干预的高效运作」与「敏感生产资产的安全可控」之间自由设定边界，杜绝危险操作。",
          "steps": [
            "在主界面点击齿轮图标进入「Settings」>「Permissions & Autonomy」配置页",
            "在运行预设中按需选择预设档位（Request Review / Default / Auto / Turbo）",
            "在下方规则列表中，针对敏感操作配置特定资源规则，如 `command(rm -rf *) -> Deny`",
            "在会话过程中，遇到触发 Ask 规则的操作时，系统会弹出确认弹窗并列出具体命令与影响范围供你单次或永久放行"
          ],
          "commands": [
            "/permissions"
          ],
          "pitfalls": "不要在含生产凭证的仓库开启 Turbo；Deny 规则优先于 Allow。",
          "doc": "https://antigravity.google/docs/agent-permissions",
          "tags": [
            "权限引擎",
            "自主级别",
            "安全隔离",
            "审批控制"
          ],
          "isHot": true
        },
        {
          "id": "ag-allow-deny-policy",
          "name": "终端安全策略与 Allow/Deny 列表",
          "category": "终端与执行",
          "level": "进阶",
          "hot": 89,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "在 OS 级轻量沙箱中隔离运行终端命令，支持基于正则与工具名精准维护命令白名单与黑名单。",
          "why": "让常规的 git、npm test、tsc 等只读/验证命令实现秒级全自动执行，同时对危险指令强力拦截。",
          "steps": [
            "在 CLI 输入 /permissions，或在 Settings > General > Global Permissions 打开权限设置",
            "用 action(target) 资源格式添加规则，如 command(git *) -> Allow",
            "添加高危黑名单，如 command(rm -rf *) -> Deny；支持 read_file(*)、mcp(*) 等通配",
            "在 Agent 运行日志中确认放行/拦截结果"
          ],
          "commands": [
            "/permissions"
          ],
          "pitfalls": "Deny > Ask > Allow；一条过宽的 Deny 会连带拦截正常命令。",
          "doc": "https://antigravity.google/docs/agent-permissions",
          "tags": [
            "终端隔离",
            "白名单",
            "黑名单",
            "命令沙箱"
          ],
          "isHot": false
        },
        {
          "id": "ag-checkpoints-rewind",
          "name": "会话检查点与时光倒流 (/rewind)",
          "category": "状态管理",
          "level": "进阶",
          "hot": 90,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "自动为会话轮次与代码文件建立快照检查点，支持使用 /rewind 或 /undo 一键回退状态并从历史节点分支实验。",
          "why": "当 Agent 在探索过程中误入歧途或编写了不满意的实现时，能瞬间回退到最初良好的起点重新推演。",
          "steps": [
            "在 Agent 交互过程中，系统会自动在每次规划确认及大步代码修改前后创建隐式 Checkpoint",
            "若发现 Agent 跑偏，在输入框键入 `/rewind` 呼出检查点树形选择器",
            "上下方向键选择想要回滚到的历史时刻（会明确展示当时的 Prompt 与代码快照差异）",
            "回车确认回退，工作区代码将恢复到该时刻状态；亦可输入 `/fork` 在该节点拉出一条全新对话分支继续尝试"
          ],
          "commands": [
            "/rewind",
            "/undo",
            "/fork"
          ],
          "pitfalls": "回滚会覆盖当前未提交的工作区改动；先 git stash 或提交。该功能以 CLI 文档为准。",
          "doc": "https://antigravity.google/docs/cli/best-practices",
          "tags": [
            "检查点",
            "回退",
            "时光倒流",
            "分支探索"
          ],
          "isHot": true
        },
        {
          "id": "ag-vscode-extension",
          "name": "VS Code / JetBrains / Zed 扩展",
          "category": "生态扩展",
          "level": "进阶",
          "hot": 88,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "在常用 IDE 中安装 Antigravity 扩展，复用同一套 Agent、权限与 Artifacts。",
          "why": "不切换编辑器也能用 Antigravity；扩展会连接本地 agy 后端服务，VS Code / Visual Studio 已 GA，其他 IDE 多为 Preview。",
          "steps": [
            "在 VS Code 扩展市场搜索 Google Antigravity（发布者 Google）并安装",
            "点击活动栏 Antigravity 图标，用 Google 账号登录",
            "首次启动会自动安装/连接本地 agy 后端服务",
            "在扩展面板中使用 Agent、Diff 与 Artifacts 审阅流程"
          ],
          "commands": [],
          "pitfalls": "VS Code 扩展要求 VS Code 1.90+；JetBrains / Zed / Xcode 的支持可能仍是 Preview。",
          "doc": "https://antigravity.google/docs/ide/extensions/vscode/",
          "tags": [
            "VSCode扩展",
            "无缝迁移",
            "生态兼容",
            "配置导入"
          ],
          "isHot": false
        },
        {
          "id": "ag-mcp-integration",
          "name": "Model Context Protocol (MCP) 服务集成",
          "category": "上下文扩展",
          "level": "高级",
          "hot": 97,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "全面支持工业级开放 MCP 协议，通过标准接口挂载数据库、GitHub、Sentry 及各类私有 API 工具。",
          "why": "打破 LLM 的孤岛限制，使 Agent 具备直接查询线上库表结构、调取错误日志与调用企业内部服务的超强能力。",
          "steps": [
            "Antigravity App：打开 Customizations → Installed → MCP Servers → Add MCP Server",
            "Antigravity IDE：点击编辑器面板顶部 ... → MCP Servers → Install 或 Manage MCP Servers",
            "CLI：在输入框输入 /mcp 打开 MCP 管理界面",
            "也可编辑 ~/.gemini/config/mcp_config.json 或工作区 .agents/mcp_config.json 添加 serverUrl / 本地命令"
          ],
          "commands": [
            "/mcp"
          ],
          "pitfalls": "未配置的 MCP 工具默认走 Ask；只启用当前项目需要的 server，避免 Token 与权限膨胀。",
          "doc": "https://antigravity.google/docs/mcp",
          "tags": [
            "MCP",
            "工具扩展",
            "数据库连接",
            "生态互联"
          ],
          "isHot": true
        },
        {
          "id": "ag-model-selection",
          "name": "多模型无缝切换与 Thinking 深度调节",
          "category": "模型配置",
          "level": "高级",
          "hot": 95,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "在 Gemini 4 Carbon / Gemini 3.8 Flash 与 Claude 5.5 等模型之间切换，并调节 Thinking 深度。",
          "why": "针对日常小补丁采用极速轻量模型节省成本，针对高难度架构重构开启高深度 Thinking 换取最强推理效果。",
          "steps": [
            "在 prompt 输入框下方打开模型选择器",
            "选择 Gemini 4 Carbon / Gemini 3.8 Flash / Claude Sonnet 5.5 等可用模型",
            "调整 Thinking level（Low / Medium / High）",
            "用 /usage 查看当前额度与消耗"
          ],
          "commands": [
            "/usage"
          ],
          "pitfalls": "第三方模型（如 Claude 系列）可能需要企业授权与额外配额。",
          "doc": "https://antigravity.google/docs/models",
          "tags": [
            "模型切换",
            "Thinking深度",
            "Gemini",
            "Claude"
          ],
          "isHot": true
        },
        {
          "id": "ag-multi-agent-swarm",
          "name": "多 Agent 并行执行与 Swarm 协作",
          "category": "多智能体",
          "level": "高级",
          "hot": 96,
          "isNew": true,
          "releasedAt": "2026-11-09",
          "summary": "通过 /swarm 命令唤醒主从多智能体网络，将架构规划、代码实现、单测编写与文档输出并发交由不同专精子 Agent。",
          "why": "将串行耗时数小时的大型工程升级任务，利用多子 Agent 在独立工作区分工并行处理，成倍压缩交付周期。",
          "steps": [
            "在复杂任务中输入 `/swarm` 模式命令，例如：`/swarm 实施微服务模块重构并并行补齐单测与 API 文档`",
            "主 Orchestrator Agent 自动将总任务拆解为子任务拓扑，并派生 Researcher、Coder、Tester 三个专精 Subagent",
            "在 Agent Manager 界面可以看到各子 Agent 的实时状态泳道，各子 Agent 在独立的隔离分支推进",
            "主 Agent 集中审查合并各分支产物，运行全量集成测试，并在 Walkthrough 中统一输出总线交付报告"
          ],
          "commands": [
            "/swarm 重构支付网关并编写集成测试与文档",
            "/swarm board",
            "/agents"
          ],
          "pitfalls": "Swarm 仍在 Preview，且每个 worker 独立消耗配额；配额耗尽后成员会暂停且不会自动恢复。",
          "doc": "https://antigravity.google/docs/swarm",
          "tags": [
            "Swarm",
            "多智能体",
            "并行协作",
            "任务编排"
          ],
          "isHot": true
        },
        {
          "id": "ag-rules-and-skills",
          "name": "工程规则体系 (AGENTS.md / GEMINI.md / Rules)",
          "category": "规则与技能",
          "level": "高级",
          "hot": 93,
          "isNew": false,
          "releasedAt": "2025-11-18",
          "summary": "用 AGENTS.md、GEMINI.md 与 .agents/rules/*.md 注入长期规则，支持 trigger/globs 控制生效范围。",
          "why": "把团队规范、架构红线和审查要求代码化，减少重复提示，并让规则按文件/场景精准生效。",
          "steps": [
            "在项目根目录创建 AGENTS.md 或 GEMINI.md，写入技术栈、代码风格与审查要求",
            "需要分文件时放到 .agents/rules/*.md，用 frontmatter 的 trigger: always_on / model_decision / glob / manual",
            "glob 规则写 globs；模型选择规则写 description；单文件上限 24,000 bytes",
            "全部生效规则的预算约 20,000 tokens，保持精简"
          ],
          "commands": [
            "mkdir -p .agents/rules"
          ],
          "pitfalls": "规则是常驻上下文，越长越挤占预算；只写稳定、可复用的约束，不要把整段业务代码贴进去。",
          "doc": "https://antigravity.google/docs/rules",
          "tags": [
            "AGENTS.md",
            "GEMINI.md",
            "Rules",
            "工程规范"
          ],
          "isHot": true
        }
      ]
    },
    {
      "slug": "pi",
      "name": "Pi",
      "vendor": "Earendil Works / badlogic",
      "tagline": "极简、高度可扩展的开源终端 Coding Agent 微核心",
      "version": "1.5.2",
      "updatedAt": "2026-11-11",
      "official": {
        "site": "https://pi.dev",
        "docs": [
          "https://github.com/earendil-works/pi/tree/main/packages/coding-agent/docs",
          "https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent/docs"
        ],
        "repo": "https://github.com/badlogic/pi-mono",
        "changelog": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/CHANGELOG.md"
      },
      "stats": {
        "popularity": 92,
        "learningCurve": 2,
        "bestFor": [
          "追求透明与极简代码的终端开发者",
          "需要编写专属定制插件的工程团队",
          "基于 Agent 微核心二次开发产品的构建者"
        ]
      },
      "install": {
        "requirements": [
          "Node.js >= 22.19.0",
          "Windows 用户需要 Git for Windows (提供 bash.exe) 或 WSL",
          "现代终端（推荐 Windows Terminal、WezTerm 或 Ghostty）"
        ],
        "steps": [
          "使用官方安装脚本或 npm 全局安装 @earendil-works/pi-coding-agent",
          "进入目标代码目录，运行 pi 启动交互式 TUI",
          "在 TUI 中输入 /login 完成 Provider 鉴权并输入 /model 选择模型"
        ],
        "commands": [
          "powershell -c \"irm https://pi.dev/install.ps1 | iex\"",
          "curl -fsSL https://pi.dev/install.sh | sh",
          "npm install -g --ignore-scripts @earendil-works/pi-coding-agent"
        ],
        "verify": "pi --version"
      },
      "concepts": [
        {
          "term": "Agent Harness",
          "desc": "智能体运行脚手架/微核心。Pi 自身仅提供轻量循环和最基础的四大工具，不预装沉重的业务假设，将高级特性留给用户态扩展。"
        },
        {
          "term": "Active Branch",
          "desc": "活跃分支。Pi 的会话以树状结构（JSONL）持久化，当前对话路径即为活跃分支，仅该分支的历史会被送入模型上下文。"
        },
        {
          "term": "Compaction",
          "desc": "上下文压缩。当对话 Token 接近模型最大上下文限制时，Pi 会对较早的历史生成结构化摘要，压缩旧消息同时在底层会话树中保留完整记录。"
        },
        {
          "term": "Steering & Follow-up",
          "desc": "即时微调与排队。在模型运行工具时按 Enter 注入指令在当前步结束后干预，按 Alt+Enter 排队等待整轮任务完成后执行。"
        },
        {
          "term": "Agent Skills",
          "desc": "遵循国际规范的技能文件夹（含 SKILL.md）。启动时仅暴露名称和简介，在触发相关任务时由模型按需读取完整指令与配套脚本。"
        },
        {
          "term": "Extensions",
          "desc": "运行在 Pi 宿主进程内的 TypeScript 扩展模块。可全生命周期拦截事件、注册自定义工具、定制 TUI、甚至接入第三方模型网关。"
        },
        {
          "term": "Project Trust",
          "desc": "项目信任沙箱边界。进入未知代码目录时阻断并询问是否允许加载该项目下的本地配置、MCP 服务器与扩展，防止代码执行投毒。"
        },
        {
          "term": "Pi Packages",
          "desc": "资源分发生态包。将 extensions、skills、prompts、themes 打包为 npm 或 Git 仓库，实现一键安装与集中生命周期维护。"
        }
      ],
      "learningPath": [
        {
          "title": "新手入门：安装、交互与基础操作",
          "desc": "掌握终端启动、TUI 快捷键、@ 文件检索、多模型切换与会话树回溯基本功。",
          "features": [
            "pi-interactive-tui",
            "pi-file-search-tab",
            "pi-model-thinking",
            "pi-session-tree",
            "pi-windows-setup"
          ]
        },
        {
          "title": "进阶定制：提示词、技能与环境掌控",
          "desc": "学会编写可复用 Markdown 指令模板、Agent Skills 技能库以及配置安全信任边界。",
          "features": [
            "pi-prompt-templates",
            "pi-skills",
            "pi-themes",
            "pi-project-trust"
          ]
        },
        {
          "title": "高级扩展与工程集成：从插件到 SDK",
          "desc": "深入 TypeScript 扩展开发、生态包管理、CLI 管道自动化、RPC 控制协议以及 SDK 二次开发。",
          "features": [
            "pi-extensions",
            "pi-packages",
            "pi-cli-automation",
            "pi-rpc-mode",
            "pi-sdk"
          ]
        }
      ],
      "features": [
        {
          "id": "pi-interactive-tui",
          "name": "交互式 TUI 与人机协同控制",
          "category": "界面交互",
          "level": "入门",
          "hot": 95,
          "isNew": false,
          "releasedAt": "2025-06-01",
          "summary": "基于差异渲染的全屏终端交互界面，支持运行中实时 Enter 干预与 Alt+Enter 任务排队。",
          "why": "彻底打破传统命令行 Agent 生成时的锁死假死状态，让开发者在模型调用工具时随时调整执行路线或顺序追加指令。",
          "steps": [
            "在代码根目录下运行 pi 进入交互界面",
            "按 Shift+Enter 换行或按 Ctrl+G 调出系统编辑器编写长提示词",
            "当模型持续调用工具时，直接打字按 Enter 注入纠偏指示，或按 Alt+Enter 排队后续任务",
            "按 Ctrl+O 折叠/展开工具运行回显，按 Escape 随时中断当前任务"
          ],
          "commands": [
            "pi",
            "Ctrl+O",
            "Ctrl+T",
            "Ctrl+G",
            "Escape"
          ],
          "pitfalls": "在 Windows 传统 cmd 窗口中可能出现按键冲突，推荐使用现代 Windows Terminal 作为宿主环境。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md",
          "tags": [
            "TUI",
            "快捷键",
            "人机协同",
            "Steering"
          ],
          "isHot": true
        },
        {
          "id": "pi-file-search-tab",
          "name": "@ 文件检索与 Tab 路径补全",
          "category": "上下文工程",
          "level": "入门",
          "hot": 91,
          "isNew": false,
          "releasedAt": "2025-06-01",
          "summary": "输入 @ 快速调出模糊文件检索浮窗，配合 Tab 键秒级组装复杂项目上下文，支持直接粘贴图片。",
          "why": "无需手动拼写繁杂长路径，精准引入代码文件与架构图等多模态资源，杜绝路径输错导致的幻觉。",
          "steps": [
            "在 Pi 交互界面中输入 @ 字符唤起模糊搜索列表",
            "输入部分文件名（如 @main）使用方向键挑选并回车插入",
            "敲击 Tab 键自动对文件路径与已有斜杠指令进行补全",
            "按下 Ctrl+V 直接将剪贴板中的截图注入上下文"
          ],
          "commands": [
            "请分析 @src/main.ts 的架构设计",
            "对比 @package.json 与 @README.md 的版本号"
          ],
          "pitfalls": "若代码仓库未配置 .gitignore 且包含超大 node_modules，建立初始文件索引时可能会产生短暂卡顿。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/usage.md#enter-a-prompt",
          "tags": [
            "文件搜索",
            "Tab补全",
            "多模态",
            "剪贴板"
          ],
          "isHot": true
        },
        {
          "id": "pi-model-thinking",
          "name": "多模型即时切换与 Thinking 深度调节",
          "category": "模型控制",
          "level": "入门",
          "hot": 93,
          "isNew": false,
          "releasedAt": "2025-06-15",
          "summary": "内建支持 Anthropic、OpenAI、Gemini 等各大厂商，会话中按 Ctrl+L 或 Shift+Tab 随心调整模型与推理等级。",
          "why": "在同一会话中根据任务复杂度灵活分配算力成本：复杂架构用高推理深度模型，日常修改用快速模型。",
          "steps": [
            "在终端中输入 /login 完成 Provider 授权或配置 API Key",
            "按下 Ctrl+L 或输入 /model 打开交互式模型模糊搜索列表",
            "按下 Shift+Tab 或输入 /thinking 轮流切换思考预算（off、low、medium、high 等）",
            "按下 Ctrl+S 将当前选中的模型配置永久保存为全局默认偏好"
          ],
          "commands": [
            "/login",
            "/model",
            "/thinking",
            "/scoped-models"
          ],
          "pitfalls": "对于不支持原生思考参数的模型，设置 high 会被系统自动钳位收敛，不会发生请求崩溃。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/models.md",
          "tags": [
            "多模型",
            "Thinking",
            "模型切换",
            "Provider"
          ],
          "isHot": true
        },
        {
          "id": "pi-session-tree",
          "name": "会话树形回溯与安全分支",
          "category": "会话管理",
          "level": "入门",
          "hot": 94,
          "isNew": false,
          "releasedAt": "2025-07-01",
          "summary": "基于树状图（Tree Graph）存储对话历史，支持通过 /tree 任意回退探索新分支，结合 /compact 智能压缩。",
          "why": "彻底告别试错死胡同导致历史截断丢失的问题，像 Git 版本控制一样自由穿梭于各个思考分支之间。",
          "steps": [
            "在会话中输入 /tree 打开可视化的对话树状导航器",
            "浏览历史节点，选中一条过去的用户输入后按 Enter 将其重新载入编辑器并派生新分支",
            "使用 /fork 将选定历史节点独立另存为全新会话文件",
            "输入 /compact 触发模型生成阶段性总结并压缩上下文"
          ],
          "commands": [
            "/tree",
            "/fork",
            "/clone",
            "/compact",
            "pi --continue",
            "pi --resume"
          ],
          "pitfalls": "分支切换仅作用于对话上下文历史，不会自动触发 git reset，本地代码改动需配合版本控制工具协同管理。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sessions.md",
          "tags": [
            "会话树",
            "分支管理",
            "上下文压缩",
            "会话恢复"
          ],
          "isHot": true
        },
        {
          "id": "pi-windows-setup",
          "name": "Windows 与 Git Bash 运行环境适配",
          "category": "系统适配",
          "level": "进阶",
          "hot": 86,
          "isNew": false,
          "releasedAt": "2025-07-15",
          "summary": "针对 Windows 平台的深层优化，自动解析 Git Bash 路径，支持引入 powershell 模型工具与终端防闪烁。",
          "why": "解决类 Unix Agent 在 Windows 原生环境普遍面临的缺少 bash、换行错乱与控制台按键冲突等顽疾。",
          "steps": [
            "安装 Git for Windows 确保系统内具备可用的 bash.exe",
            "在终端中输入 !printf 'Bash is working\\n' 验证 Shell 解析状态",
            "若路径非标准，在 ~/.pi/agent/settings.json 中显式定义 shellPath",
            "在 Windows Terminal 中运行 Pi 享受最稳定的渲染与全套快捷键体验"
          ],
          "commands": [
            "!printf 'Bash is working\\n'",
            "powershell -c \"irm https://pi.dev/install.ps1 | iex\""
          ],
          "pitfalls": "在 Windows 配置文件中编写路径时，反斜杠必须写为双反斜杠（如 C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe）。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/windows.md",
          "tags": [
            "Windows",
            "GitBash",
            "PowerShell",
            "终端配置"
          ],
          "isHot": false
        },
        {
          "id": "pi-prompt-templates",
          "name": "提示词模板（Prompt Templates）",
          "category": "提示工程",
          "level": "进阶",
          "hot": 88,
          "isNew": false,
          "releasedAt": "2025-08-01",
          "summary": "通过单个 Markdown 文件快速声明带参数的斜杠指令（如 /review），支持默认值替换与命令自动补全。",
          "why": "无需编写任何 JavaScript 代码，以纯文本形式固化团队最常用的代码审查、生成发布说明等高频工作流。",
          "steps": [
            "在用户目录新建 ~/.pi/agent/prompts/review.md 文件",
            "在文件头部声明 description 和 argument-hint Frontmatter",
            "在正文中使用 $1、${1:-default} 或 $@ 插入动态参数占位符",
            "在 Pi 终端中输入 /reload，即可直接调用 /review 专属指令"
          ],
          "commands": [
            "/reload",
            "/review",
            "/review concurrency"
          ],
          "pitfalls": "模板文件必须直接放置于 prompts 根目录下，嵌套在子目录中的 .md 默认不会被注册为顶层斜杠命令。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/prompt-templates.md",
          "tags": [
            "提示词模板",
            "斜杠指令",
            "工作流定制",
            "Markdown"
          ],
          "isHot": false
        },
        {
          "id": "pi-skills",
          "name": "Agent 技能机制（Skills）",
          "category": "技能扩展",
          "level": "进阶",
          "hot": 90,
          "isNew": false,
          "releasedAt": "2025-08-15",
          "summary": "实现标准 Agent Skills 规范，仅将技能概览注册在系统提示词中，任务匹配时才由模型按需深度加载执行。",
          "why": "避免将大量垂直领域操作手册一次性塞满 System Prompt，保持极小常驻上下文开销，兼顾多场景专业能力。",
          "steps": [
            "在项目根目录创建 .agents/skills/pdf-tools/SKILL.md（或用户级 ~/.agents/skills/pdf-tools/SKILL.md）",
            "在 frontmatter 中写 name 与 description，description 要说明「做什么 + 何时使用」",
            "在同目录放 scripts/、references/、assets/ 等配套文件",
            "用 /skill:pdf-tools report.pdf 强制调用，或直接描述任务让模型按需加载"
          ],
          "commands": [
            "/skill:pdf-tools report.pdf",
            "/reload"
          ],
          "pitfalls": "description 是模型判断是否加载技能的唯一依据；项目级技能还需要通过 Pi 的项目信任。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md",
          "tags": [
            "Skills",
            "AgentSkills",
            "按需加载",
            "模块化"
          ],
          "isHot": true
        },
        {
          "id": "pi-extensions",
          "name": "TypeScript 扩展系统（Extensions）",
          "category": "核心扩展",
          "level": "进阶",
          "hot": 96,
          "isNew": false,
          "releasedAt": "2025-09-01",
          "summary": "在 Pi 宿主进程中运行的原生 TypeScript 扩展，支持拦截全生命周期事件、注册自定义 Tool、阻断危险命令与定制 TUI。",
          "why": "赋予开发者绝对的代码级掌控力，只需几十行 TypeScript 即可实现企业级安全权限守卫、自定义审批流或接入私有工具系统。",
          "steps": [
            "在 ~/.pi/agent/extensions/ 目录下创建 my-extension.ts",
            "从 @earendil-works/pi-coding-agent 导入 ExtensionAPI 与 TypeBox",
            "通过 pi.on('tool_call') 监听并拦截高危 Shell 命令",
            "通过 pi.registerTool() 向模型注册业务自定义工具",
            "使用 pi -e ./my-extension.ts 快速验证并生效"
          ],
          "commands": [
            "pi -e ./my-extension.ts",
            "/reload"
          ],
          "pitfalls": "扩展在当前进程同步运行，注意捕获内部异步异常，且不要在扩展内将宿主核心库列为 dependencies 物理打包。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md",
          "tags": [
            "TypeScript",
            "扩展机制",
            "自定义工具",
            "安全守卫"
          ],
          "isHot": true
        },
        {
          "id": "pi-themes",
          "name": "自适应终端主题（Themes）",
          "category": "界面外观",
          "level": "进阶",
          "hot": 80,
          "isNew": false,
          "releasedAt": "2025-09-10",
          "summary": "基于 OKHSL / OKLCH 现代色彩空间构建，智能自适应当前终端 ANSI 配色与深浅底色，确保 4.5:1 无障碍高对比度。",
          "why": "从底层消除传统 CLI 切换终端主题后的黑底黑字或白底白字尴尬，还能通过 JSON 打造专属极客品牌视觉。",
          "steps": [
            "输入 /settings 选择 Theme，查看内置的 system、dark、light 表现",
            "在 ~/.pi/agent/themes/ 目录下创建 cyberpunk.json",
            "配置 vars 变量表与 colors 角色颜色映射",
            "在 Pi 终端设置中选中新主题或通过命令行参数即时预览"
          ],
          "commands": [
            "/settings",
            "pi --use-theme cyberpunk",
            "pi --use-theme light/dark"
          ],
          "pitfalls": "自定义主题 JSON 文件名必须与内容中的 name 字段完全一致，且不能包含字符 /（该字符保留用于日夜自适应配置）。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/themes.md",
          "tags": [
            "主题定制",
            "OKHSL",
            "自适应色彩",
            "TUI美化"
          ],
          "isHot": false
        },
        {
          "id": "pi-packages",
          "name": "Pi Packages 资源包生态",
          "category": "包管理与生态",
          "level": "进阶",
          "hot": 89,
          "isNew": false,
          "releasedAt": "2025-10-01",
          "summary": "将 extensions、skills、prompts 和 themes 打包聚合，支持直接通过 npm 或 Git 仓库一键安装与集中升级。",
          "why": "告别零散脚本手动复制粘贴，让团队和社区的高质量能力资产实现标准化版本发布、自动依赖锁定与一键更新。",
          "steps": [
            "使用 pi install 从 npm 或 GitHub 安装外部资源包",
            "运行 pi list 查看当前已挂载的所有包及其所含资源",
            "使用 -e 参数临时体验未安装的远程资源包",
            "使用 pi update --extensions 全局拉取并对齐最新版本"
          ],
          "commands": [
            "pi install npm:@example/pi-tools@1.0.0",
            "pi install git:github.com/example/pi-tools@v1",
            "pi list",
            "pi update --extensions",
            "pi remove npm:@example/pi-tools"
          ],
          "pitfalls": "项目级包配置在通过项目信任批准前不会执行，避免第三方仓库通过恶意 package.json 静默执行未知代码。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md",
          "tags": [
            "包管理",
            "资源分发",
            "npm生态",
            "Git生态"
          ],
          "isHot": false
        },
        {
          "id": "pi-project-trust",
          "name": "项目信任与安全沙箱机制",
          "category": "安全与沙箱",
          "level": "进阶",
          "hot": 87,
          "isNew": false,
          "releasedAt": "2025-10-15",
          "summary": "当首次进入含本地扩展、MCP 或特殊配置的代码仓库时激活安全拦截，防范未知仓库的 Prompt Injection 与恶意执行。",
          "why": "在供应链攻击和提示词注入风险日益高涨的今天，为开发者在本地随意克隆测试未知开源项目提供了第一道安全门闸。",
          "steps": [
            "进入包含 .pi/ 目录的新开源项目并启动 pi",
            "在终端弹出的项目信任警报中审查待加载的扩展清单",
            "选择 Trust 授予信任或选择 Don't Trust 降级为纯净安全内核运行",
            "通过 /trust 随时查看或更改当前目录的信任策略"
          ],
          "commands": [
            "/trust",
            "pi --approve",
            "pi --no-approve"
          ],
          "pitfalls": "项目信任仅控制本地配置与扩展脚本的加载权限，并不等同于操作系统级容器隔离，不可信代码务必放入 Docker 中运行。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md",
          "tags": [
            "项目信任",
            "代码审计",
            "提示词注入防范",
            "安全策略"
          ],
          "isHot": false
        },
        {
          "id": "pi-cli-automation",
          "name": "CLI Print 与 JSON 自动化事件流模式",
          "category": "自动化",
          "level": "高级",
          "hot": 89,
          "isNew": false,
          "releasedAt": "2025-10-20",
          "summary": "无头执行模式，提供 --print 直接回显最终答案以及 --mode json 逐行输出结构化 JSONL 事件流。",
          "why": "完美契合 CI/CD 流水线、Git 自动化钩子以及 Shell 批处理脚本，轻松将 Agent 融入现有 DevOps 基础设施。",
          "steps": [
            "使用 pi --print 执行单次任务并捕获文本输出到文件",
            "通过 Unix 管道将 git diff 直接送入 Pi 作为审查上下文",
            "使用 --mode json 参数捕获包含耗时、Token 和工具调用的全流程事件流",
            "配合 jq 命令行工具提取特定事件（如筛选每次 tool_call 记录）"
          ],
          "commands": [
            "pi --print \"审查当前项目并输出建议\" > review.md",
            "git diff | pi --print \"生成规范提交信息\"",
            "pi --mode json \"检查依赖版本\" > events.jsonl",
            "pi --mode json \"检查依赖\" | jq -r 'select(.type==\"tool_call\") | .toolName'"
          ],
          "pitfalls": "当 stdin 或 stdout 处于重定向状态且未显式指定模式时，Pi 默认自动降级为 Print 模式退出，不会挂起终端。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/cli.md",
          "tags": [
            "CLI",
            "自动化",
            "JSONL",
            "CI/CD",
            "无头模式"
          ],
          "isHot": false
        },
        {
          "id": "pi-rpc-mode",
          "name": "RPC 进程间控制协议",
          "category": "进程集成",
          "level": "高级",
          "hot": 88,
          "isNew": false,
          "releasedAt": "2025-11-01",
          "summary": "通过 pi --mode rpc 启动长寿命后台子进程，宿主应用通过 stdin/stdout 以 JSONL 双向协议完全控制 Agent。",
          "why": "语言无关且天然具备进程隔离优势，是开发独立桌面 GUI（Electron/Tauri）、VS Code 插件或后端服务托管的核心模式。",
          "steps": [
            "使用子进程启动 pi --mode rpc --no-session",
            "向 stdin 写入带有唯一 id 的 JSON 指令（如 prompt 指令）",
            "从 stdout 按标准换行符读取返回的 response 与会话更新事件",
            "监听 agent_settled 确定当前轮次生成彻底收敛结束",
            "关闭 stdin 或发送 SIGTERM 执行优雅退出收尾"
          ],
          "commands": [
            "pi --mode rpc --no-session"
          ],
          "pitfalls": "解析 stdout 时必须严格按 LF (\\n) 换行切分，切勿使用将 Unicode 行分隔符误判为换行的行读取器，否则会导致 JSON 解析错误。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md",
          "tags": [
            "RPC",
            "子进程",
            "双向通信",
            "IDE插件",
            "GUI集成"
          ],
          "isHot": false
        },
        {
          "id": "pi-sdk",
          "name": "嵌入式 TypeScript SDK",
          "category": "二次开发",
          "level": "高级",
          "hot": 92,
          "isNew": false,
          "releasedAt": "2025-11-05",
          "summary": "在 Node.js/Bun 宿主中直接调用 createAgentSession，享受 100% 原生 TypeScript 类型安全与进程内极速交互。",
          "why": "为 TypeScript 开发者提供了比 RPC 更高吞吐、零序列化损耗、能直接操作 Session 内存对象树的最高级集成方案。",
          "steps": [
            "在项目中执行 npm install @earendil-works/pi-coding-agent",
            "从库中解构引入 createAgentSession 与 SessionManager",
            "调用 createAgentSession({ cwd: process.cwd() }) 初始化会话",
            "调用 session.subscribe 监听实时 text_delta 字符流",
            "调用 session.prompt() 发送任务并在 finally 中调用 session.dispose()"
          ],
          "commands": [
            "npm install @earendil-works/pi-coding-agent"
          ],
          "pitfalls": "在已有生成仍在流式响应中时再次调用 session.prompt() 会直接抛错拒绝，插话需求需调用 session.steer()。",
          "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sdk.md",
          "tags": [
            "TypeScript",
            "SDK",
            "二次开发",
            "进程内集成"
          ],
          "isHot": true
        }
      ]
    },
    {
      "slug": "deepseek-harness",
      "name": "DeepSeek Harness",
      "vendor": "DeepSeek",
      "tagline": "基于 Cordis 的全插件化 AI Agent 运行时",
      "version": "0.2.2-rc.1",
      "updatedAt": "2026-11-11",
      "official": {
        "site": "https://www.deepseek.com/en/harness/",
        "docs": [
          "https://deepseek-harness.github.io/deepseek-harness/"
        ],
        "repo": "https://github.com/deepseek-ai/deepseek-harness",
        "changelog": "https://github.com/deepseek-ai/deepseek-harness/releases"
      },
      "stats": {
        "popularity": 88,
        "learningCurve": 3,
        "bestFor": [
          "追求高扩展性与插件化架构的 AI 开发者",
          "需要多 Profile 隔离与 CI/CD 自动化的工程团队",
          "探索 Router-Worker 多 Agent 协同的高级系统工程师"
        ]
      },
      "install": {
        "requirements": [
          "Node.js >= 20.0.0",
          "pnpm >= 9.0.0 (推荐) 或 npm",
          "DeepSeek API Key 或兼容模型密钥"
        ],
        "steps": [
          "安装 @deepseek-ai/dsh 命令行工具（或使用 npx 免安装运行）",
          "设置环境变量 DEEPSEEK_API_KEY 或在 Web UI 设置中输入密钥",
          "执行 dsh web 启动本地控制台；终端 TUI 需先安装 turtle-ui 插件，再运行 dsh --profile tui"
        ],
        "commands": [
          "npm install -g @deepseek-ai/dsh",
          "export DEEPSEEK_API_KEY=\"sk-your-key-here\"",
          "dsh web"
        ],
        "verify": "dsh --version"
      },
      "concepts": [
        {
          "term": "Everything is a Plugin",
          "desc": "DeepSeek Harness 的核心设计哲学：不仅工具是插件，模型适配器、会话存储、Agent Loop 和用户界面全都是可热插拔的插件。"
        },
        {
          "term": "Cordis 微内核",
          "desc": "底层依赖的时空可组合微内核架构，提供依赖注入（inject）、事件总线与生命周期副作用自动回收管理。"
        },
        {
          "term": "Profile（运行档案）",
          "desc": "位于 $DSH_HOME/profiles/<name> 的独立环境隔离区，包含专属的插件集、配置覆盖与依赖锁定文件。"
        },
        {
          "term": "Patch Layer（补丁层）",
          "desc": "基于 cordis.patch.yml 的声明式配置层叠机制，支持全局、Profile 级与运行时 CLI 补丁的有序覆盖与替换。"
        },
        {
          "term": "Session Persistence",
          "desc": "基于事件溯源的会话持久化后端，通过 JSONL/SQLite 与 zstd 压缩记录所有推理与工具调用轨迹。"
        }
      ],
      "learningPath": [
        {
          "title": "快速上手与日常交互",
          "desc": "掌握 CLI 快速安装、Web UI 交互控制台、TUI 终端模式以及模型密钥的基础配置。",
          "features": [
            "dsh-cli-quickstart",
            "dsh-web-ui",
            "dsh-model-provider",
            "dsh-tui-mode"
          ]
        },
        {
          "title": "环境管理与工程自动化",
          "desc": "学习 Profile 多环境隔离、声明式 Patch 层、Headless 任务执行以及插件安装与 MCP 协议集成。",
          "features": [
            "dsh-headless-automation",
            "dsh-profiles-management",
            "dsh-cordis-patch-layer",
            "dsh-plugin-cli",
            "dsh-mcp-client",
            "dsh-session-persistence"
          ]
        },
        {
          "title": "内核定制、安全沙箱与多 Agent 编排",
          "desc": "深入 Cordis 插件编写、Profile 救援、沙箱权限与子代理协同。",
          "features": [
            "dsh-context-rescue",
            "dsh-sandboxing-security",
            "dsh-custom-plugin-dev",
            "dsh-multi-agent-teams"
          ]
        }
      ],
      "features": [
        {
          "id": "dsh-cli-quickstart",
          "name": "CLI 快速启动与零安装运行",
          "category": "基础环境",
          "level": "入门",
          "hot": 95,
          "isNew": true,
          "releasedAt": "2026-08-15",
          "summary": "通过 npx 或全局 npm 快速启动 DeepSeek Harness 运行时与基础环境检查。",
          "why": "无需繁重本地环境配置，基于 Node.js/Cordis 微内核即开即用，几秒内即可体验官方 Developer Preview。",
          "steps": [
            "检查本地 Node.js 版本是否满足 >= 20.0.0 要求",
            "运行 npx @deepseek-ai/dsh --version 验证包拉取与 CLI 响应",
            "通过 npm install -g @deepseek-ai/dsh 完成全局 CLI 安装",
            "执行 dsh --help 了解内置命令选项与 Profile 启动方式"
          ],
          "commands": [
            "node --version",
            "npx @deepseek-ai/dsh --version",
            "npm install -g @deepseek-ai/dsh",
            "dsh --help"
          ],
          "pitfalls": "Windows PowerShell 下若提示未授权脚本运行错误，需使用管理员身份调整 ExecutionPolicy 或通过 npx 运行。",
          "doc": "https://deepseek-harness.github.io/deepseek-harness/",
          "tags": [
            "CLI",
            "安装",
            "快速上手"
          ],
          "isHot": true
        },
        {
          "id": "dsh-web-ui",
          "name": "Web UI 交互式控制台",
          "category": "用户界面",
          "level": "入门",
          "hot": 96,
          "isNew": true,
          "releasedAt": "2026-07-20",
          "summary": "启动轻量级本地 Web 仪表盘（默认端口 3080），直观管理多轮会话、模型调用与可视化面板。",
          "why": "提供比纯终端更清晰的多轮对话流、实时 Token 消耗展示、模型切换与插件状态监控。",
          "steps": [
            "在终端中输入 dsh web（等价于 dsh --profile web）",
            "确认控制台输出 Service listening at http://127.0.0.1:3080",
            "在浏览器中访问 http://127.0.0.1:3080 进入交互界面",
            "使用 --port 8080 参数应对默认端口被占用的情况"
          ],
          "commands": [
            "dsh web",
            "dsh web --port 8080"
          ],
          "pitfalls": "若 3080 端口已被其他本地开发服务占用，启动可能会报错，务必显式传入 --port 指定空闲端口。",
          "doc": "https://deepseek-harness.github.io/deepseek-harness/",
          "tags": [
            "WebUI",
            "可视化",
            "控制台"
          ],
          "isHot": true
        },
        {
          "id": "dsh-model-provider",
          "name": "模型与 Provider 密钥配置",
          "category": "模型路由",
          "level": "入门",
          "hot": 98,
          "isNew": false,
          "releasedAt": "2026-06-10",
          "summary": "配置官方 deepseek-official 路由或第三方兼容模型，通过安全凭据文件与环境变量注入 API Key。",
          "why": "凭据与配置完全解耦，密钥绝不硬编码在 Git 追踪文件内，原生支持 DeepSeek-V3 / R1 系列模型端点。",
          "steps": [
            "从 DeepSeek 开放平台获取有效 API Key",
            "在环境变量中注入 DEEPSEEK_API_KEY",
            "或在 Web 控制台 Settings → Models 面板保存，写入 ~/.dsh/.credentials.yaml",
            "运行 dsh --profile web --dump-config 验证模型路由与提供方生效"
          ],
          "commands": [
            "export DEEPSEEK_API_KEY=\"sk-your-api-key\"",
            "$env:DEEPSEEK_API_KEY=\"sk-your-api-key\"",
            "dsh --profile web --dump-config"
          ],
          "pitfalls": "绝对不要将明文 API Key 写入 cordis.patch.yml；应通过环境变量或专用的 ~/.dsh/.credentials.yaml 注入。",
          "doc": "https://api-docs.deepseek.com/guides/harness",
          "tags": [
            "模型配置",
            "APIKey",
            "凭据安全"
          ],
          "isHot": true
        },
        {
          "id": "dsh-tui-mode",
          "name": "TUI 终端全屏交互模式",
          "category": "终端交互",
          "level": "入门",
          "hot": 82,
          "isNew": true,
          "releasedAt": "2026-08-05",
          "summary": "在终端内运行功能齐备的交互式 TUI 界面，支持快捷键切换面板与流式高亮输出。",
          "why": "针对无浏览器环境与远程 SSH 运维场景优化，在低系统开销下提供完整的交互与代码审查能力。",
          "steps": [
            "先给 tui Profile 安装终端 UI 插件：dsh plugin --profile tui add github:deepseek-harness/turtle-ui",
            "运行 dsh --profile tui 启动终端界面",
            "输入自然语言任务，观察推理与工具调用",
            "使用 /exit 或 Ctrl+D 保存并退出"
          ],
          "commands": [
            "dsh plugin --profile tui add github:deepseek-harness/turtle-ui",
            "dsh --profile tui"
          ],
          "pitfalls": "tui 不是内置命令，必须先安装 turtle-ui 插件；Windows 建议使用 Windows Terminal。",
          "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
          "tags": [
            "TUI",
            "终端",
            "SSH友好"
          ],
          "isHot": false
        },
        {
          "id": "dsh-headless-automation",
          "name": "Headless 任务与 CI/CD 自动化",
          "category": "脚本自动化",
          "level": "进阶",
          "hot": 92,
          "isNew": true,
          "releasedAt": "2026-07-28",
          "summary": "通过 headless Profile 单次触发、打印最终结果并返回进程状态码，适合脚本与 CI。",
          "why": "可无缝嵌入 Makefile、GitHub Actions 或自动化运维脚本，实现无人值守的代码审查与自动化修复。",
          "steps": [
            "准备需要自动执行的任务提示词",
            "执行 dsh --profile headless \"<任务内容>\" 进行单次运算",
            "Agent 自动检索文件、执行工具并应用修改",
            "检查 stdout 的最终文本与退出码（0=completed，1=其他）判断结果"
          ],
          "commands": [
            "dsh --profile headless \"检查当前 git 仓库的修改并运行测试\"",
            "dsh --profile headless \"分析 src/index.ts 的潜在内存泄漏\""
          ],
          "pitfalls": "headless 不启动 Web/HTTP 服务；需要审批或交互的任务应改用 Web/TUI Profile。",
          "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
          "tags": [
            "Headless",
            "CI/CD",
            "脚本化"
          ],
          "isHot": true
        },
        {
          "id": "dsh-profiles-management",
          "name": "Profile 多环境隔离机制",
          "category": "架构核心",
          "level": "进阶",
          "hot": 90,
          "isNew": true,
          "releasedAt": "2026-08-10",
          "summary": "基于 $DSH_HOME/profiles/ 目录的隔离架构，实现多任务、多配置间的独立依赖与插件环境。",
          "why": "可在同一台机器上同时管理面向开发的宽松环境与面向生产的严格只读环境，配置完全独立且互不污染。",
          "steps": [
            "查看本地已有 Profile 目录：~/.dsh/profiles/",
            "从预置模板派生新 Profile：dsh --profile audit --from-default-profile headless",
            "启动并使用指定 Profile：dsh --profile audit \"运行代码审计\"",
            "独立维护该 Profile 下的插件与 patch 配置"
          ],
          "commands": [
            "dsh --profile my-dev --from-default-profile web",
            "dsh --profile my-dev",
            "ls ~/.dsh/profiles"
          ],
          "pitfalls": "若自定义 Profile 因错误配置损坏导致启动失败，可通过 --from-default-profile <template> 重新重置为初始模板。",
          "doc": "https://deepseek-harness.github.io/deepseek-harness/",
          "tags": [
            "Profile",
            "环境隔离",
            "配置管理"
          ],
          "isHot": true
        },
        {
          "id": "dsh-cordis-patch-layer",
          "name": "声明式 Patch 配置层与转储",
          "category": "配置系统",
          "level": "进阶",
          "hot": 89,
          "isNew": true,
          "releasedAt": "2026-09-01",
          "summary": "基于 cordis.patch.yml 的原子替换与层叠机制，搭配 --dump-config 输出最终有效配置树。",
          "why": "避免传统 deep merge 带来的配置冲突与歧义，支持通过简单的 YAML 补丁精确替换特定服务与模型参数。",
          "steps": [
            "了解 Patch 层叠优先级：Bundle 默认 < Profile Patch < 全局 Patch < CLI --patch",
            "编写局部补丁文件 custom-patch.yml 调整参数",
            "运行 dsh web --patch ./custom-patch.yml 叠加临时生效",
            "执行 dsh --profile web --dump-config 查看并调试最终合并的 Cordis 插件树"
          ],
          "commands": [
            "dsh web --patch ./custom-patch.yml",
            "dsh --profile web --dump-config",
            "dsh --profile web --dump-config-schema"
          ],
          "pitfalls": "Cordis Patch 采用 ID 行级原子替换而非递归合并字段，配置某插件时须写出该插件对应 target 块的完整 config。",
          "doc": "https://deepseek-harness.github.io/deepseek-harness/",
          "tags": [
            "Patch",
            "Cordis",
            "配置诊断"
          ],
          "isHot": false
        },
        {
          "id": "dsh-plugin-cli",
          "name": "插件包管理系统 (dsh plugin)",
          "category": "扩展生态",
          "level": "进阶",
          "hot": 94,
          "isNew": true,
          "releasedAt": "2026-08-18",
          "summary": "利用 dsh plugin --profile <name> add/remove 自动化安装与卸载特定 Profile 的插件包。",
          "why": "自动将插件安装至 Profile 的专用隔离目录，由内部 pnpm 解析依赖并生成 lockfile，无需手动篡改根环境。",
          "steps": [
            "选定目标环境 Profile（如 web）",
            "运行 dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex 安装插件 Bundle",
            "验证插件已出现在 ~/.dsh/profiles/web/package.json 依赖中",
            "重启 Profile 使 Bundle 生效；卸载用 dsh plugin --profile web remove <package>"
          ],
          "commands": [
            "dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex",
            "dsh plugin --profile web remove @deepseek-ai/dsh-subagent-codex"
          ],
          "pitfalls": "安装/卸载 Bundle 后必须重启 Profile；运行中的实例不会热切换 Bundle 集合。",
          "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
          "tags": [
            "插件管理",
            "CLI",
            "生态扩展"
          ],
          "isHot": true
        },
        {
          "id": "dsh-mcp-client",
          "name": "MCP Client 协议桥接",
          "category": "协议集成",
          "level": "进阶",
          "hot": 93,
          "isNew": true,
          "releasedAt": "2026-09-15",
          "summary": "CLI 自带 MCP client 依赖，但默认不启用任何 MCP server；通过 Profile 的 patch 层显式接入。",
          "why": "按需接入标准 MCP 生态（文件检索、数据库、GitHub 等），同时避免默认信任任何外部可执行 server。",
          "steps": [
            "确认 Profile 依赖中包含 @deepseek-ai/dsh-mcp-client（CLI 自带，默认不启用 server）",
            "编辑 Profile 的 cordis.patch.yml，加入你信任的 MCP server 启动命令或端点",
            "重启 Profile：dsh web 或 dsh --profile web",
            "用 dsh --profile web --dump-config 检查最终配置树与 MCP 工具是否挂载"
          ],
          "commands": [
            "dsh web",
            "dsh --profile web --dump-config"
          ],
          "pitfalls": "MCP server 命令是在 Agent 沙箱之外执行的受信代码；只接入你信任的 server，并在 patch 中显式声明。",
          "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
          "tags": [
            "MCP",
            "协议",
            "工具生态"
          ],
          "isHot": true
        },
        {
          "id": "dsh-session-persistence",
          "name": "会话持久化与 zstd 压缩存储",
          "category": "会话机制",
          "level": "进阶",
          "hot": 88,
          "isNew": true,
          "releasedAt": "2026-07-15",
          "summary": "基于事件溯源的会话持久化，默认以 session.v3.jsonl.zstd 记录推理与工具调用轨迹。",
          "why": "完整捕获复杂长任务的推理分支与工具交互，同时通过高效流式压缩大幅节省高频交互下的磁盘消耗。",
          "steps": [
            "会话默认保存在 ~/.dsh/sessions/ 下，按 Profile 与 Session 分层",
            "每轮 prompt、tool-call 与结果以 append-only 格式增量保存",
            "历史文件使用 zstd 压缩（如 session.v3.jsonl.zstd）",
            "用 zstdcat 查看归档内容，或在 Web/TUI 中恢复历史会话"
          ],
          "commands": [
            "ls ~/.dsh/sessions",
            "zstdcat ~/.dsh/sessions/*/*/session.v3.jsonl.zstd | tail -20"
          ],
          "pitfalls": "压缩后的 session 不能用普通文本查看器直接打开；先用 zstdcat 解压。",
          "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
          "tags": [
            "会话日志",
            "持久化",
            "zstd压缩"
          ],
          "isHot": false
        },
        {
          "id": "dsh-context-rescue",
          "name": "Profile 救援与配置恢复 (dsh rescue)",
          "category": "配置系统",
          "level": "进阶",
          "hot": 90,
          "isNew": true,
          "releasedAt": "2026-09-20",
          "summary": "当 Profile 配置损坏或无法启动时，用 dsh rescue 从默认模板恢复一个可启动环境。",
          "why": "Profile 是隔离环境，patch 或依赖出错会导致启动失败；rescue 提供官方恢复路径，避免手删目录。",
          "steps": [
            "先备份 ~/.dsh/profiles/<name> 目录",
            "运行 dsh rescue 查看可救援的 Profile",
            "用 dsh rescue --from-default-profile web 从 web 模板重建目标 Profile",
            "恢复后用 dsh --profile <name> 验证启动"
          ],
          "commands": [
            "dsh rescue",
            "dsh rescue --from-default-profile web",
            "dsh rescue --from-default-profile web --no-open"
          ],
          "pitfalls": "重建会删除目标 Profile 原有依赖与用户 patch；先备份，且目标名不能与内置 profile 同名（不区分大小写）。",
          "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
          "tags": [
            "Profile",
            "救援",
            "配置恢复",
            "dsh rescue"
          ],
          "isHot": true
        },
        {
          "id": "dsh-sandboxing-security",
          "name": "沙箱与权限模式",
          "category": "安全沙箱",
          "level": "高级",
          "hot": 91,
          "isNew": true,
          "releasedAt": "2026-08-25",
          "summary": "基于 bwrap / Landlock / Seatbelt 的进程沙箱与 workspace-write 权限预设，限制 Bash 与文件写入范围。",
          "why": "默认 workspace-write 把命令与写操作限制在会话工作区，降低误删/越权风险；读取与网络默认不隔离，需按需加强。",
          "steps": [
            "了解默认 permission preset：workspace-write（Bash 与文件写入限制在工作区与临时目录）",
            "按平台确认可用的 sandbox backend：bwrap / Landlock / Seatbelt",
            "通过 DSH_PERMISSION_MODE 设置进程级 fallback 权限",
            "用 dsh --profile headless \"...\" 在隔离 Profile 中运行任务，并用 --dump-config 核对权限配置"
          ],
          "commands": [
            "dsh --profile headless \"执行全套测试\"",
            "dsh --profile web --dump-config"
          ],
          "pitfalls": "读取与网络默认不受限；需要更强隔离时使用容器/VM，不要只依赖 workspace-write。",
          "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
          "tags": [
            "沙箱",
            "权限",
            "workspace-write",
            "bwrap"
          ],
          "isHot": true
        },
        {
          "id": "dsh-custom-plugin-dev",
          "name": "自定义插件开发 (apply 与依赖注入)",
          "category": "架构核心",
          "level": "高级",
          "hot": 95,
          "isNew": true,
          "releasedAt": "2026-08-01",
          "summary": "基于 Cordis 微内核编写 TypeScript 插件，利用 inject 声明服务依赖并通过 apply(ctx) 扩展核心能力。",
          "why": "真正落地 Everything is a Plugin 理念，随心所欲定制专有业务工具、修改 Prompt 模版或替换 Agent Loop 逻辑。",
          "steps": [
            "编写插件源文件（如 my-plugin.ts），导出 name 标识与 apply(ctx) 函数",
            "若依赖已有服务，声明 export const inject = ['tools', 'llm']",
            "在 apply 内部使用 ctx.tools.register() 注册自定义工具与入参校验 Schema",
            "在 Profile 的 cordis.patch.yml 中挂载该插件路径并进行功能调试"
          ],
          "commands": [
            "dsh web --patch ./local-plugin-patch.yml",
            "dsh --profile web --dump-config"
          ],
          "pitfalls": "若插件使用了 ctx.tools 等服务却未在 inject 数组中显式声明依赖，Cordis 在异步挂载阶段可能会抛出 undefined 引用异常。",
          "doc": "https://deepseek-harness.github.io/deepseek-harness/",
          "tags": [
            "插件开发",
            "Cordis",
            "依赖注入"
          ],
          "isHot": true
        },
        {
          "id": "dsh-multi-agent-teams",
          "name": "子代理协同（Codex / Claude Code Subagents）",
          "category": "协作编排",
          "level": "高级",
          "hot": 96,
          "isNew": true,
          "releasedAt": "2026-09-10",
          "summary": "通过官方 subagent 插件把 Codex 或 Claude Code 作为子代理接入 Harness。",
          "why": "把任务分派给不同 Agent，利用各自模型与工具优势；插件按 Profile 隔离，可只装一个或两个都装。",
          "steps": [
            "给 Profile 安装子代理插件：dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex @deepseek-ai/dsh-subagent-claude-code",
            "重启 Profile 使 Bundle 生效",
            "在新 Agent 的 Preset 中启用对应工具行（安装的 Bundle 默认只注册 dormant provider）",
            "在主会话中把子任务交给 Codex / Claude Code provider 执行"
          ],
          "commands": [
            "dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex @deepseek-ai/dsh-subagent-claude-code",
            "dsh web"
          ],
          "pitfalls": "安装 Bundle 后必须重启 Profile；只安装不会自动启用工具行。",
          "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
          "tags": [
            "子代理",
            "Codex",
            "Claude Code",
            "协作"
          ],
          "isHot": true
        }
      ]
    }
  ],
  "recommendations": {
    "hot": [
      {
        "id": "ag-agent-manager",
        "name": "Agent Manager 异步多任务中心",
        "category": "调度中心",
        "level": "入门",
        "hot": 98,
        "isNew": false,
        "releasedAt": "2025-11-18",
        "summary": "集中的异步 Agent 指挥看板，支持同时派发、排队与监控多个后台编程任务。",
        "why": "将大型重构、全套单测编写等耗时任务直接卸载到后台运行，不阻塞前台人工编写代码与调试。",
        "steps": [
          "在 Agent side panel 新建多个会话，用侧边栏切换、搜索或删除",
          "在 Agent Manager 中查看并行会话的进度与产物",
          "CLI 中输入 /agents 打开 Agent Manager Panel，监控或终止后台子代理",
          "任务完成后在对应会话中查看 Artifacts 与 Walkthrough"
        ],
        "commands": [
          "/agents"
        ],
        "pitfalls": "后台多个会话修改同一文件可能冲突，尽量拆到独立模块或 Git 分支。",
        "doc": "https://antigravity.google/docs/agent/",
        "tags": [
          "后台长任务",
          "并行管理",
          "多任务调度",
          "工作区隔离"
        ],
        "isHot": true,
        "agentSlug": "antigravity",
        "agentName": "Antigravity",
        "vendor": "Google"
      },
      {
        "id": "dsh-model-provider",
        "name": "模型与 Provider 密钥配置",
        "category": "模型路由",
        "level": "入门",
        "hot": 98,
        "isNew": false,
        "releasedAt": "2026-06-10",
        "summary": "配置官方 deepseek-official 路由或第三方兼容模型，通过安全凭据文件与环境变量注入 API Key。",
        "why": "凭据与配置完全解耦，密钥绝不硬编码在 Git 追踪文件内，原生支持 DeepSeek-V3 / R1 系列模型端点。",
        "steps": [
          "从 DeepSeek 开放平台获取有效 API Key",
          "在环境变量中注入 DEEPSEEK_API_KEY",
          "或在 Web 控制台 Settings → Models 面板保存，写入 ~/.dsh/.credentials.yaml",
          "运行 dsh --profile web --dump-config 验证模型路由与提供方生效"
        ],
        "commands": [
          "export DEEPSEEK_API_KEY=\"sk-your-api-key\"",
          "$env:DEEPSEEK_API_KEY=\"sk-your-api-key\"",
          "dsh --profile web --dump-config"
        ],
        "pitfalls": "绝对不要将明文 API Key 写入 cordis.patch.yml；应通过环境变量或专用的 ~/.dsh/.credentials.yaml 注入。",
        "doc": "https://api-docs.deepseek.com/guides/harness",
        "tags": [
          "模型配置",
          "APIKey",
          "凭据安全"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "cc-subagents",
        "name": "Subagents 专业子智能体分工",
        "category": "多智能体",
        "level": "高级",
        "hot": 97,
        "isNew": false,
        "summary": "在 .claude/agents/*.md 中声明具备专属角色、独立上下文、特定模型与定制工具集的 Subagent，支持后台并发调度。",
        "why": "将消耗海量 Token 的代码全库检索、高频报错调试等繁重任务分流给子代理，保持主会话上下文精炼高效。",
        "steps": [
          "在项目根目录下创建目录 .claude/agents/",
          "新建子代理定义文件（例如 .claude/agents/code-reviewer.md）",
          "在 Frontmatter 中配置 name、model、tools、effort 与 background 参数",
          "在 Markdown 正文中编写专有系统提示词（System Prompt），规定其审查清单与输出格式",
          "在交互终端中下达指令，Claude 会根据任务属性自动分派给该子代理执行",
          "输入 /tasks 查看当前所有正在后台运行或已完成的历史子代理状态与输出"
        ],
        "commands": [
          "mkdir -p .claude/agents",
          "/tasks"
        ],
        "pitfalls": "子代理如果配置了 background: true，其结果是以异步事件形式上报给主会话，主会话在连续任务规划时需合理处理异步依赖。",
        "doc": "https://docs.claude.com/en/docs/claude-code/sub-agents",
        "tags": [
          "多智能体",
          "上下文隔离",
          "后台并发",
          "任务拆解"
        ],
        "isHot": true,
        "agentSlug": "claude-code",
        "agentName": "Claude Code",
        "vendor": "Anthropic"
      },
      {
        "id": "ag-mcp-integration",
        "name": "Model Context Protocol (MCP) 服务集成",
        "category": "上下文扩展",
        "level": "高级",
        "hot": 97,
        "isNew": false,
        "releasedAt": "2025-11-18",
        "summary": "全面支持工业级开放 MCP 协议，通过标准接口挂载数据库、GitHub、Sentry 及各类私有 API 工具。",
        "why": "打破 LLM 的孤岛限制，使 Agent 具备直接查询线上库表结构、调取错误日志与调用企业内部服务的超强能力。",
        "steps": [
          "Antigravity App：打开 Customizations → Installed → MCP Servers → Add MCP Server",
          "Antigravity IDE：点击编辑器面板顶部 ... → MCP Servers → Install 或 Manage MCP Servers",
          "CLI：在输入框输入 /mcp 打开 MCP 管理界面",
          "也可编辑 ~/.gemini/config/mcp_config.json 或工作区 .agents/mcp_config.json 添加 serverUrl / 本地命令"
        ],
        "commands": [
          "/mcp"
        ],
        "pitfalls": "未配置的 MCP 工具默认走 Ask；只启用当前项目需要的 server，避免 Token 与权限膨胀。",
        "doc": "https://antigravity.google/docs/mcp",
        "tags": [
          "MCP",
          "工具扩展",
          "数据库连接",
          "生态互联"
        ],
        "isHot": true,
        "agentSlug": "antigravity",
        "agentName": "Antigravity",
        "vendor": "Google"
      },
      {
        "id": "cc-mcp",
        "name": "MCP (Model Context Protocol) 工具协议集成",
        "category": "外部集成",
        "level": "进阶",
        "hot": 96,
        "isNew": false,
        "summary": "借助标准开放的 MCP 协议连接本地与远程服务器（stdio、HTTP、SSE、WebSocket），为 Claude 挂载外部工具与数据源。",
        "why": "突破本地文本工具局限，让 Claude Code 能够直接安全地查询数据库、操作 GitHub、调用内部监控与微服务。",
        "steps": [
          "使用 claude mcp add 命令添加 MCP 服务器，指定传输协议与运行命令",
          "根据需求选择配置范围：当前终端 local、项目级 .mcp.json 或用户级 ~/.claude/mcp.json",
          "在会话中运行 /mcp 命令查看已连接的服务状态、工具清单与可用资源",
          "在对话中自然提示 Claude 调用目标工具（如：'查询数据库中最新的 5 条订单记录'）",
          "Claude Code 自动在后台将长耗时 MCP 任务调度为后台任务执行并返回结果"
        ],
        "commands": [
          "claude mcp add --transport stdio github -- npx -y @modelcontextprotocol/server-github",
          "claude mcp add --transport stdio postgres -- npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb",
          "claude mcp list",
          "/mcp"
        ],
        "pitfalls": "stdio server 的命令必须放在 -- 之后，否则 server 自己的参数会被 Claude Code 当成 CLI 选项解析；项目级 .mcp.json 不要硬编码密钥。",
        "doc": "https://docs.claude.com/en/docs/claude-code/mcp",
        "tags": [
          "MCP",
          "外部系统",
          "数据库",
          "协议扩展"
        ],
        "isHot": true,
        "agentSlug": "claude-code",
        "agentName": "Claude Code",
        "vendor": "Anthropic"
      },
      {
        "id": "codex-exec",
        "name": "codex exec 非交互自动化批处理",
        "category": "自动化工作流",
        "level": "进阶",
        "hot": 96,
        "isNew": false,
        "releasedAt": "2025-06-01",
        "summary": "Headless 非交互命令行模式，直接在脚本、Git 钩子和 CI/CD 流程中执行指令并产出代码补丁",
        "why": "无需人工值守即可批量完成跨文件重构、自动化 Bug 修复和依赖版本迁移，是打通自动化研发管线的核心支柱。",
        "steps": [
          "确定要自动化的任务目标并编写明确的提示词",
          "使用管道将错误日志或待处理代码喂给 codex exec，或直接作为命令行参数传入",
          "指定 --sandbox workspace-write 与 -a never 确保脚本全自动执行完毕不挂起",
          "配置 -o result.md 将 Agent 最终生成的结论与修改说明保存至指定文件",
          "通过 git diff 检查自动化改动，确认符合预期后提交"
        ],
        "commands": [
          "codex exec \"修复 tests/test_api.py 中的失败用例并运行 pytest 验证\"",
          "git diff | codex exec -s read-only \"评估该变更对现有接口向后兼容性的影响\" -o review.md",
          "codex exec --sandbox workspace-write -a never --json \"批量迁移 React 18 到 19 的废弃 API\""
        ],
        "pitfalls": "自动化模式下遇到无法自愈的编译错误时可能会持续尝试导致 Token 消耗增加，建议配合 --ephemeral 或设置合理的超时控制。",
        "doc": "https://developers.openai.com/codex/cli",
        "tags": [
          "CI/CD",
          "自动化",
          "批处理",
          "Headless"
        ],
        "isHot": true,
        "agentSlug": "codex",
        "agentName": "Codex",
        "vendor": "OpenAI"
      },
      {
        "id": "ag-editor-inline",
        "name": "Editor 内联 Agent 与差异评审",
        "category": "编辑器协同",
        "level": "入门",
        "hot": 96,
        "isNew": false,
        "releasedAt": "2025-11-18",
        "summary": "在代码编辑区直接呼出 Agent 进行自然语言重构、补全与单文件/多文件行内 Diff 交互审查。",
        "why": "无需跳出当前代码上下文即可精准修改局部逻辑，直观对比修改前后代码并随时选择接受或回退。",
        "steps": [
          "打开 Antigravity Editor，在右侧 Agent side panel 开始新会话",
          "用 @ 引用文件/文件夹，用 / 执行动作，或用 + 添加上下文",
          "描述重构需求，Agent 会在编辑器内高亮改动",
          "在 Review 栏逐文件查看 diff，选择 Accept all / Reject all 或逐项处理"
        ],
        "commands": [],
        "pitfalls": "选区过大时关注点容易发散，先聚焦具体函数或代码块。",
        "doc": "https://antigravity.google/docs/agent-side-panel",
        "tags": [
          "编辑器",
          "Diff评审",
          "行内重构",
          "高频交互"
        ],
        "isHot": true,
        "agentSlug": "antigravity",
        "agentName": "Antigravity",
        "vendor": "Google"
      },
      {
        "id": "ag-multi-agent-swarm",
        "name": "多 Agent 并行执行与 Swarm 协作",
        "category": "多智能体",
        "level": "高级",
        "hot": 96,
        "isNew": true,
        "releasedAt": "2026-11-09",
        "summary": "通过 /swarm 命令唤醒主从多智能体网络，将架构规划、代码实现、单测编写与文档输出并发交由不同专精子 Agent。",
        "why": "将串行耗时数小时的大型工程升级任务，利用多子 Agent 在独立工作区分工并行处理，成倍压缩交付周期。",
        "steps": [
          "在复杂任务中输入 `/swarm` 模式命令，例如：`/swarm 实施微服务模块重构并并行补齐单测与 API 文档`",
          "主 Orchestrator Agent 自动将总任务拆解为子任务拓扑，并派生 Researcher、Coder、Tester 三个专精 Subagent",
          "在 Agent Manager 界面可以看到各子 Agent 的实时状态泳道，各子 Agent 在独立的隔离分支推进",
          "主 Agent 集中审查合并各分支产物，运行全量集成测试，并在 Walkthrough 中统一输出总线交付报告"
        ],
        "commands": [
          "/swarm 重构支付网关并编写集成测试与文档",
          "/swarm board",
          "/agents"
        ],
        "pitfalls": "Swarm 仍在 Preview，且每个 worker 独立消耗配额；配额耗尽后成员会暂停且不会自动恢复。",
        "doc": "https://antigravity.google/docs/swarm",
        "tags": [
          "Swarm",
          "多智能体",
          "并行协作",
          "任务编排"
        ],
        "isHot": true,
        "agentSlug": "antigravity",
        "agentName": "Antigravity",
        "vendor": "Google"
      },
      {
        "id": "pi-extensions",
        "name": "TypeScript 扩展系统（Extensions）",
        "category": "核心扩展",
        "level": "进阶",
        "hot": 96,
        "isNew": false,
        "releasedAt": "2025-09-01",
        "summary": "在 Pi 宿主进程中运行的原生 TypeScript 扩展，支持拦截全生命周期事件、注册自定义 Tool、阻断危险命令与定制 TUI。",
        "why": "赋予开发者绝对的代码级掌控力，只需几十行 TypeScript 即可实现企业级安全权限守卫、自定义审批流或接入私有工具系统。",
        "steps": [
          "在 ~/.pi/agent/extensions/ 目录下创建 my-extension.ts",
          "从 @earendil-works/pi-coding-agent 导入 ExtensionAPI 与 TypeBox",
          "通过 pi.on('tool_call') 监听并拦截高危 Shell 命令",
          "通过 pi.registerTool() 向模型注册业务自定义工具",
          "使用 pi -e ./my-extension.ts 快速验证并生效"
        ],
        "commands": [
          "pi -e ./my-extension.ts",
          "/reload"
        ],
        "pitfalls": "扩展在当前进程同步运行，注意捕获内部异步异常，且不要在扩展内将宿主核心库列为 dependencies 物理打包。",
        "doc": "https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md",
        "tags": [
          "TypeScript",
          "扩展机制",
          "自定义工具",
          "安全守卫"
        ],
        "isHot": true,
        "agentSlug": "pi",
        "agentName": "Pi",
        "vendor": "Earendil Works / badlogic"
      },
      {
        "id": "dsh-web-ui",
        "name": "Web UI 交互式控制台",
        "category": "用户界面",
        "level": "入门",
        "hot": 96,
        "isNew": true,
        "releasedAt": "2026-07-20",
        "summary": "启动轻量级本地 Web 仪表盘（默认端口 3080），直观管理多轮会话、模型调用与可视化面板。",
        "why": "提供比纯终端更清晰的多轮对话流、实时 Token 消耗展示、模型切换与插件状态监控。",
        "steps": [
          "在终端中输入 dsh web（等价于 dsh --profile web）",
          "确认控制台输出 Service listening at http://127.0.0.1:3080",
          "在浏览器中访问 http://127.0.0.1:3080 进入交互界面",
          "使用 --port 8080 参数应对默认端口被占用的情况"
        ],
        "commands": [
          "dsh web",
          "dsh web --port 8080"
        ],
        "pitfalls": "若 3080 端口已被其他本地开发服务占用，启动可能会报错，务必显式传入 --port 指定空闲端口。",
        "doc": "https://deepseek-harness.github.io/deepseek-harness/",
        "tags": [
          "WebUI",
          "可视化",
          "控制台"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-multi-agent-teams",
        "name": "子代理协同（Codex / Claude Code Subagents）",
        "category": "协作编排",
        "level": "高级",
        "hot": 96,
        "isNew": true,
        "releasedAt": "2026-09-10",
        "summary": "通过官方 subagent 插件把 Codex 或 Claude Code 作为子代理接入 Harness。",
        "why": "把任务分派给不同 Agent，利用各自模型与工具优势；插件按 Profile 隔离，可只装一个或两个都装。",
        "steps": [
          "给 Profile 安装子代理插件：dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex @deepseek-ai/dsh-subagent-claude-code",
          "重启 Profile 使 Bundle 生效",
          "在新 Agent 的 Preset 中启用对应工具行（安装的 Bundle 默认只注册 dormant provider）",
          "在主会话中把子任务交给 Codex / Claude Code provider 执行"
        ],
        "commands": [
          "dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex @deepseek-ai/dsh-subagent-claude-code",
          "dsh web"
        ],
        "pitfalls": "安装 Bundle 后必须重启 Profile；只安装不会自动启用工具行。",
        "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
        "tags": [
          "子代理",
          "Codex",
          "Claude Code",
          "协作"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "cc-memory-claude-md",
        "name": "CLAUDE.md 与项目记忆体系",
        "category": "记忆与规则",
        "level": "入门",
        "hot": 95,
        "isNew": false,
        "summary": "通过项目根目录与子目录中的 CLAUDE.md 或 AGENTS.md 固化架构规范、构建命令与代码风格，支持自动记忆积累。",
        "why": "消除反复输入项目约定的繁琐沟通，让 Claude 在每次会话启动时自动加载团队工程共识，确保生成代码完全符合团队标准。",
        "steps": [
          "在项目根目录下创建 CLAUDE.md 文件（或 .claude/rules/ 规则目录）",
          "记录核心构建、测试、代码检查命令以及技术栈与代码设计规范",
          "使用 @ 语法（如 @docs/api-specs.md）引入子模块文档进行分层组织",
          "启动 claude，Claude 会在会话初始自动读取该文件并注入上下文提示词",
          "在会话中使用 /memory 命令随时查看自动累积的经验记忆并进行编辑修正"
        ],
        "commands": [
          "touch CLAUDE.md",
          "claude",
          "/memory"
        ],
        "pitfalls": "CLAUDE.md 不应贴入整段业务代码，应集中记录难以通过阅读代码直接推导的隐性规范与构建指令，文件过大会过多挤占上下文。",
        "doc": "https://docs.claude.com/en/docs/claude-code/memory",
        "tags": [
          "配置",
          "工程规范",
          "上下文管理",
          "知识库"
        ],
        "isHot": true,
        "agentSlug": "claude-code",
        "agentName": "Claude Code",
        "vendor": "Anthropic"
      }
    ],
    "fresh": [
      {
        "id": "ag-multi-agent-swarm",
        "name": "多 Agent 并行执行与 Swarm 协作",
        "category": "多智能体",
        "level": "高级",
        "hot": 96,
        "isNew": true,
        "releasedAt": "2026-11-09",
        "summary": "通过 /swarm 命令唤醒主从多智能体网络，将架构规划、代码实现、单测编写与文档输出并发交由不同专精子 Agent。",
        "why": "将串行耗时数小时的大型工程升级任务，利用多子 Agent 在独立工作区分工并行处理，成倍压缩交付周期。",
        "steps": [
          "在复杂任务中输入 `/swarm` 模式命令，例如：`/swarm 实施微服务模块重构并并行补齐单测与 API 文档`",
          "主 Orchestrator Agent 自动将总任务拆解为子任务拓扑，并派生 Researcher、Coder、Tester 三个专精 Subagent",
          "在 Agent Manager 界面可以看到各子 Agent 的实时状态泳道，各子 Agent 在独立的隔离分支推进",
          "主 Agent 集中审查合并各分支产物，运行全量集成测试，并在 Walkthrough 中统一输出总线交付报告"
        ],
        "commands": [
          "/swarm 重构支付网关并编写集成测试与文档",
          "/swarm board",
          "/agents"
        ],
        "pitfalls": "Swarm 仍在 Preview，且每个 worker 独立消耗配额；配额耗尽后成员会暂停且不会自动恢复。",
        "doc": "https://antigravity.google/docs/swarm",
        "tags": [
          "Swarm",
          "多智能体",
          "并行协作",
          "任务编排"
        ],
        "isHot": true,
        "agentSlug": "antigravity",
        "agentName": "Antigravity",
        "vendor": "Google"
      },
      {
        "id": "dsh-context-rescue",
        "name": "Profile 救援与配置恢复 (dsh rescue)",
        "category": "配置系统",
        "level": "进阶",
        "hot": 90,
        "isNew": true,
        "releasedAt": "2026-09-20",
        "summary": "当 Profile 配置损坏或无法启动时，用 dsh rescue 从默认模板恢复一个可启动环境。",
        "why": "Profile 是隔离环境，patch 或依赖出错会导致启动失败；rescue 提供官方恢复路径，避免手删目录。",
        "steps": [
          "先备份 ~/.dsh/profiles/<name> 目录",
          "运行 dsh rescue 查看可救援的 Profile",
          "用 dsh rescue --from-default-profile web 从 web 模板重建目标 Profile",
          "恢复后用 dsh --profile <name> 验证启动"
        ],
        "commands": [
          "dsh rescue",
          "dsh rescue --from-default-profile web",
          "dsh rescue --from-default-profile web --no-open"
        ],
        "pitfalls": "重建会删除目标 Profile 原有依赖与用户 patch；先备份，且目标名不能与内置 profile 同名（不区分大小写）。",
        "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
        "tags": [
          "Profile",
          "救援",
          "配置恢复",
          "dsh rescue"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-mcp-client",
        "name": "MCP Client 协议桥接",
        "category": "协议集成",
        "level": "进阶",
        "hot": 93,
        "isNew": true,
        "releasedAt": "2026-09-15",
        "summary": "CLI 自带 MCP client 依赖，但默认不启用任何 MCP server；通过 Profile 的 patch 层显式接入。",
        "why": "按需接入标准 MCP 生态（文件检索、数据库、GitHub 等），同时避免默认信任任何外部可执行 server。",
        "steps": [
          "确认 Profile 依赖中包含 @deepseek-ai/dsh-mcp-client（CLI 自带，默认不启用 server）",
          "编辑 Profile 的 cordis.patch.yml，加入你信任的 MCP server 启动命令或端点",
          "重启 Profile：dsh web 或 dsh --profile web",
          "用 dsh --profile web --dump-config 检查最终配置树与 MCP 工具是否挂载"
        ],
        "commands": [
          "dsh web",
          "dsh --profile web --dump-config"
        ],
        "pitfalls": "MCP server 命令是在 Agent 沙箱之外执行的受信代码；只接入你信任的 server，并在 patch 中显式声明。",
        "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
        "tags": [
          "MCP",
          "协议",
          "工具生态"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-multi-agent-teams",
        "name": "子代理协同（Codex / Claude Code Subagents）",
        "category": "协作编排",
        "level": "高级",
        "hot": 96,
        "isNew": true,
        "releasedAt": "2026-09-10",
        "summary": "通过官方 subagent 插件把 Codex 或 Claude Code 作为子代理接入 Harness。",
        "why": "把任务分派给不同 Agent，利用各自模型与工具优势；插件按 Profile 隔离，可只装一个或两个都装。",
        "steps": [
          "给 Profile 安装子代理插件：dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex @deepseek-ai/dsh-subagent-claude-code",
          "重启 Profile 使 Bundle 生效",
          "在新 Agent 的 Preset 中启用对应工具行（安装的 Bundle 默认只注册 dormant provider）",
          "在主会话中把子任务交给 Codex / Claude Code provider 执行"
        ],
        "commands": [
          "dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex @deepseek-ai/dsh-subagent-claude-code",
          "dsh web"
        ],
        "pitfalls": "安装 Bundle 后必须重启 Profile；只安装不会自动启用工具行。",
        "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
        "tags": [
          "子代理",
          "Codex",
          "Claude Code",
          "协作"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-cordis-patch-layer",
        "name": "声明式 Patch 配置层与转储",
        "category": "配置系统",
        "level": "进阶",
        "hot": 89,
        "isNew": true,
        "releasedAt": "2026-09-01",
        "summary": "基于 cordis.patch.yml 的原子替换与层叠机制，搭配 --dump-config 输出最终有效配置树。",
        "why": "避免传统 deep merge 带来的配置冲突与歧义，支持通过简单的 YAML 补丁精确替换特定服务与模型参数。",
        "steps": [
          "了解 Patch 层叠优先级：Bundle 默认 < Profile Patch < 全局 Patch < CLI --patch",
          "编写局部补丁文件 custom-patch.yml 调整参数",
          "运行 dsh web --patch ./custom-patch.yml 叠加临时生效",
          "执行 dsh --profile web --dump-config 查看并调试最终合并的 Cordis 插件树"
        ],
        "commands": [
          "dsh web --patch ./custom-patch.yml",
          "dsh --profile web --dump-config",
          "dsh --profile web --dump-config-schema"
        ],
        "pitfalls": "Cordis Patch 采用 ID 行级原子替换而非递归合并字段，配置某插件时须写出该插件对应 target 块的完整 config。",
        "doc": "https://deepseek-harness.github.io/deepseek-harness/",
        "tags": [
          "Patch",
          "Cordis",
          "配置诊断"
        ],
        "isHot": false,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-sandboxing-security",
        "name": "沙箱与权限模式",
        "category": "安全沙箱",
        "level": "高级",
        "hot": 91,
        "isNew": true,
        "releasedAt": "2026-08-25",
        "summary": "基于 bwrap / Landlock / Seatbelt 的进程沙箱与 workspace-write 权限预设，限制 Bash 与文件写入范围。",
        "why": "默认 workspace-write 把命令与写操作限制在会话工作区，降低误删/越权风险；读取与网络默认不隔离，需按需加强。",
        "steps": [
          "了解默认 permission preset：workspace-write（Bash 与文件写入限制在工作区与临时目录）",
          "按平台确认可用的 sandbox backend：bwrap / Landlock / Seatbelt",
          "通过 DSH_PERMISSION_MODE 设置进程级 fallback 权限",
          "用 dsh --profile headless \"...\" 在隔离 Profile 中运行任务，并用 --dump-config 核对权限配置"
        ],
        "commands": [
          "dsh --profile headless \"执行全套测试\"",
          "dsh --profile web --dump-config"
        ],
        "pitfalls": "读取与网络默认不受限；需要更强隔离时使用容器/VM，不要只依赖 workspace-write。",
        "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
        "tags": [
          "沙箱",
          "权限",
          "workspace-write",
          "bwrap"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-plugin-cli",
        "name": "插件包管理系统 (dsh plugin)",
        "category": "扩展生态",
        "level": "进阶",
        "hot": 94,
        "isNew": true,
        "releasedAt": "2026-08-18",
        "summary": "利用 dsh plugin --profile <name> add/remove 自动化安装与卸载特定 Profile 的插件包。",
        "why": "自动将插件安装至 Profile 的专用隔离目录，由内部 pnpm 解析依赖并生成 lockfile，无需手动篡改根环境。",
        "steps": [
          "选定目标环境 Profile（如 web）",
          "运行 dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex 安装插件 Bundle",
          "验证插件已出现在 ~/.dsh/profiles/web/package.json 依赖中",
          "重启 Profile 使 Bundle 生效；卸载用 dsh plugin --profile web remove <package>"
        ],
        "commands": [
          "dsh plugin --profile web add @deepseek-ai/dsh-subagent-codex",
          "dsh plugin --profile web remove @deepseek-ai/dsh-subagent-codex"
        ],
        "pitfalls": "安装/卸载 Bundle 后必须重启 Profile；运行中的实例不会热切换 Bundle 集合。",
        "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
        "tags": [
          "插件管理",
          "CLI",
          "生态扩展"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-cli-quickstart",
        "name": "CLI 快速启动与零安装运行",
        "category": "基础环境",
        "level": "入门",
        "hot": 95,
        "isNew": true,
        "releasedAt": "2026-08-15",
        "summary": "通过 npx 或全局 npm 快速启动 DeepSeek Harness 运行时与基础环境检查。",
        "why": "无需繁重本地环境配置，基于 Node.js/Cordis 微内核即开即用，几秒内即可体验官方 Developer Preview。",
        "steps": [
          "检查本地 Node.js 版本是否满足 >= 20.0.0 要求",
          "运行 npx @deepseek-ai/dsh --version 验证包拉取与 CLI 响应",
          "通过 npm install -g @deepseek-ai/dsh 完成全局 CLI 安装",
          "执行 dsh --help 了解内置命令选项与 Profile 启动方式"
        ],
        "commands": [
          "node --version",
          "npx @deepseek-ai/dsh --version",
          "npm install -g @deepseek-ai/dsh",
          "dsh --help"
        ],
        "pitfalls": "Windows PowerShell 下若提示未授权脚本运行错误，需使用管理员身份调整 ExecutionPolicy 或通过 npx 运行。",
        "doc": "https://deepseek-harness.github.io/deepseek-harness/",
        "tags": [
          "CLI",
          "安装",
          "快速上手"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-profiles-management",
        "name": "Profile 多环境隔离机制",
        "category": "架构核心",
        "level": "进阶",
        "hot": 90,
        "isNew": true,
        "releasedAt": "2026-08-10",
        "summary": "基于 $DSH_HOME/profiles/ 目录的隔离架构，实现多任务、多配置间的独立依赖与插件环境。",
        "why": "可在同一台机器上同时管理面向开发的宽松环境与面向生产的严格只读环境，配置完全独立且互不污染。",
        "steps": [
          "查看本地已有 Profile 目录：~/.dsh/profiles/",
          "从预置模板派生新 Profile：dsh --profile audit --from-default-profile headless",
          "启动并使用指定 Profile：dsh --profile audit \"运行代码审计\"",
          "独立维护该 Profile 下的插件与 patch 配置"
        ],
        "commands": [
          "dsh --profile my-dev --from-default-profile web",
          "dsh --profile my-dev",
          "ls ~/.dsh/profiles"
        ],
        "pitfalls": "若自定义 Profile 因错误配置损坏导致启动失败，可通过 --from-default-profile <template> 重新重置为初始模板。",
        "doc": "https://deepseek-harness.github.io/deepseek-harness/",
        "tags": [
          "Profile",
          "环境隔离",
          "配置管理"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-tui-mode",
        "name": "TUI 终端全屏交互模式",
        "category": "终端交互",
        "level": "入门",
        "hot": 82,
        "isNew": true,
        "releasedAt": "2026-08-05",
        "summary": "在终端内运行功能齐备的交互式 TUI 界面，支持快捷键切换面板与流式高亮输出。",
        "why": "针对无浏览器环境与远程 SSH 运维场景优化，在低系统开销下提供完整的交互与代码审查能力。",
        "steps": [
          "先给 tui Profile 安装终端 UI 插件：dsh plugin --profile tui add github:deepseek-harness/turtle-ui",
          "运行 dsh --profile tui 启动终端界面",
          "输入自然语言任务，观察推理与工具调用",
          "使用 /exit 或 Ctrl+D 保存并退出"
        ],
        "commands": [
          "dsh plugin --profile tui add github:deepseek-harness/turtle-ui",
          "dsh --profile tui"
        ],
        "pitfalls": "tui 不是内置命令，必须先安装 turtle-ui 插件；Windows 建议使用 Windows Terminal。",
        "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
        "tags": [
          "TUI",
          "终端",
          "SSH友好"
        ],
        "isHot": false,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-custom-plugin-dev",
        "name": "自定义插件开发 (apply 与依赖注入)",
        "category": "架构核心",
        "level": "高级",
        "hot": 95,
        "isNew": true,
        "releasedAt": "2026-08-01",
        "summary": "基于 Cordis 微内核编写 TypeScript 插件，利用 inject 声明服务依赖并通过 apply(ctx) 扩展核心能力。",
        "why": "真正落地 Everything is a Plugin 理念，随心所欲定制专有业务工具、修改 Prompt 模版或替换 Agent Loop 逻辑。",
        "steps": [
          "编写插件源文件（如 my-plugin.ts），导出 name 标识与 apply(ctx) 函数",
          "若依赖已有服务，声明 export const inject = ['tools', 'llm']",
          "在 apply 内部使用 ctx.tools.register() 注册自定义工具与入参校验 Schema",
          "在 Profile 的 cordis.patch.yml 中挂载该插件路径并进行功能调试"
        ],
        "commands": [
          "dsh web --patch ./local-plugin-patch.yml",
          "dsh --profile web --dump-config"
        ],
        "pitfalls": "若插件使用了 ctx.tools 等服务却未在 inject 数组中显式声明依赖，Cordis 在异步挂载阶段可能会抛出 undefined 引用异常。",
        "doc": "https://deepseek-harness.github.io/deepseek-harness/",
        "tags": [
          "插件开发",
          "Cordis",
          "依赖注入"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      },
      {
        "id": "dsh-headless-automation",
        "name": "Headless 任务与 CI/CD 自动化",
        "category": "脚本自动化",
        "level": "进阶",
        "hot": 92,
        "isNew": true,
        "releasedAt": "2026-07-28",
        "summary": "通过 headless Profile 单次触发、打印最终结果并返回进程状态码，适合脚本与 CI。",
        "why": "可无缝嵌入 Makefile、GitHub Actions 或自动化运维脚本，实现无人值守的代码审查与自动化修复。",
        "steps": [
          "准备需要自动执行的任务提示词",
          "执行 dsh --profile headless \"<任务内容>\" 进行单次运算",
          "Agent 自动检索文件、执行工具并应用修改",
          "检查 stdout 的最终文本与退出码（0=completed，1=其他）判断结果"
        ],
        "commands": [
          "dsh --profile headless \"检查当前 git 仓库的修改并运行测试\"",
          "dsh --profile headless \"分析 src/index.ts 的潜在内存泄漏\""
        ],
        "pitfalls": "headless 不启动 Web/HTTP 服务；需要审批或交互的任务应改用 Web/TUI Profile。",
        "doc": "https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md",
        "tags": [
          "Headless",
          "CI/CD",
          "脚本化"
        ],
        "isHot": true,
        "agentSlug": "deepseek-harness",
        "agentName": "DeepSeek Harness",
        "vendor": "DeepSeek"
      }
    ]
  }
};
