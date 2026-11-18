import type { Lang } from './i18n';

export type Text = Record<Lang, string>;
export type Step = { label: Text; code: string };

export type Project = {
  slug: string;
  name: string;
  repo: string;
  layer: string;
  language: string;
  stars: number;
  topics: string[];
  updated: string;
  summary: Text;
  problem: Text;
  install: Step[];
  quickstart: Step[];
  agentUse: Text;
  agentCode?: string;
  docs: string;
};

export const layerOrder = [
  'Runtime',
  'Skill',
  'Knowledge',
  'Intent',
  'Context',
  'Memory',
  'Foundation',
  'Tooling',
  'Verification',
  'Data',
  'Application',
] as const;

export const layerLabel: Record<string, Text> = {
  Runtime: { en: 'Runtime', zh: '运行时' },
  Skill: { en: 'Skill layer', zh: '技能层' },
  Knowledge: { en: 'Knowledge layer', zh: '知识层' },
  Intent: { en: 'Intent layer', zh: '意图层' },
  Context: { en: 'Context layer', zh: '上下文层' },
  Memory: { en: 'Memory layer', zh: '记忆层' },
  Foundation: { en: 'Foundation', zh: '基础库' },
  Tooling: { en: 'Tooling', zh: '工具' },
  Verification: { en: 'Verification', zh: '验证' },
  Data: { en: 'Data engine', zh: '数据引擎' },
  Application: { en: 'Application', zh: '应用' },
};

export const layerDesc: Record<string, Text> = {
  Runtime: {
    en: 'The loop that drives the model, calls tools and asks a human before acting.',
    zh: '驱动模型、调用工具、行动前征询人类的循环。',
  },
  Skill: {
    en: 'Packaged expertise that tells an agent how to do a specific job well.',
    zh: '把「某类工作该怎么做」打包成 agent 可直接使用的专业能力。',
  },
  Knowledge: {
    en: 'A machine-readable description of the codebase an agent must work in.',
    zh: '把 agent 要修改的代码库，转成机器可读的结构化描述。',
  },
  Intent: {
    en: 'The bridge from a product requirement to an engineering specification.',
    zh: '把产品需求翻译成工程规格的桥梁。',
  },
  Context: {
    en: 'Live access to your API contracts, from documentation to MCP tools.',
    zh: '让 agent 实时获取 API 契约：从文档到 MCP 工具。',
  },
  Memory: {
    en: 'Long-term recall, so an agent stops rediscovering the same codebase.',
    zh: '长期记忆，让 agent 不再每轮重新理解同一个代码库。',
  },
  Foundation: {
    en: 'Idiomatic Go libraries for building agents without leaving the Go stack.',
    zh: '用 Go 写 agent 的一等公民库，不必离开 Go 技术栈。',
  },
  Tooling: {
    en: 'Scaffolds that turn an idea into a runnable agent-ready project.',
    zh: '把想法快速变成可运行的 agent 友好项目的脚手架。',
  },
  Verification: {
    en: 'A repeatable yardstick for whether an agent skill actually works.',
    zh: '用统一标准验证 agent 技能是否真的有效。',
  },
  Data: {
    en: 'In-memory graph infrastructure that agents can query through MCP.',
    zh: '可通过 MCP 查询的内存图基础设施。',
  },
  Application: {
    en: 'Real products built on the stack, proving the layers work together.',
    zh: '基于这套技术栈构建的真实产品，验证各层协同工作。',
  },
};

const t = (en: string, zh: string): Text => ({ en, zh });

export const projects: Project[] = [
  {
    slug: 'woca',
    name: 'WoCA',
    repo: 'WoCA',
    layer: 'Runtime',
    language: 'Go',
    stars: 4,
    topics: ['agent', 'golang', 'harness', 'memory'],
    updated: '2026-11-17',
    summary: t(
      'A single-binary coding agent harness built on an explicit, inspectable agent graph.',
      '单二进制的编码 agent harness，基于显式、可检视的 agent 图。'
    ),
    problem: t(
      'Most agent loops are hidden inside framework callbacks. You cannot inspect them, pause them safely, or resume them after a crash. Tool calls, permissions and streaming are tangled together.',
      '多数 agent 循环藏在框架回调里，无法检视，无法安全暂停，崩溃后也无法恢复。工具调用、权限与流式输出纠缠在一起。'
    ),
    install: [
      { label: t('Build from source', '从源码构建'), code: 'git clone https://github.com/projanvil/woca.git\ncd woca\nmake    # builds web UI + binary into build/woca' },
      { label: t('Go install', 'Go 安装'), code: 'go install github.com/projanvil/woca/cmd/woca@latest' },
    ],
    quickstart: [
      { label: t('Configure a provider', '配置模型提供方'), code: 'woca config set provider glm\nwoca config set glm-api-key <key>' },
      { label: t('Or use an environment variable', '或用环境变量'), code: 'export ANTHROPIC_API_KEY=...   # or OPENAI_API_KEY' },
    ],
    agentUse: t(
      'WoCA is the harness itself. Run it as a daemon and drive it through the Web UI, TUI or CLI. Other agents can attach MCP servers to it with the --mcp flag, and can drive it over its HTTP API.',
      'WoCA 本身就是 harness。以守护进程运行，通过 Web UI、TUI 或 CLI 驱动。其他 agent 可用 --mcp 参数给它挂载 MCP 服务，也可通过 HTTP API 调用它。'
    ),
    agentCode: 'woca --mcp "filesystem=node /path/to/server.js /tmp" \\\n     --mcp "search=https://mcp.example.com/mcp"',
    docs: 'https://github.com/ProjAnvil/WoCA#readme',
  },
  {
    slug: 'mindforge',
    name: 'MindForge',
    repo: 'MindForge',
    layer: 'Skill',
    language: 'Python',
    stars: 3,
    topics: ['claude-code', 'claude-skills', 'mcp', 'agents'],
    updated: '2026-11-15',
    summary: t(
      'Nine specialized agents, nineteen composable skills and MCP services for Claude Code, zcode and Codex.',
      '面向 Claude Code、zcode 与 Codex 的 9 个专业 agent、19 个可组合技能与 MCP 服务。'
    ),
    problem: t(
      'Generic agents plateau quickly. Depth in a vertical domain is what turns an assistant into a teammate, but most teams have no shared place to keep that expertise.',
      '通用 agent 很快就遇到能力上限。垂直领域的深度才能把助手变成队友，但多数团队没有共享这些专业能力的地方。'
    ),
    install: [
      { label: t('Install as a plugin', '以插件安装'), code: '/plugin marketplace add ProjAnvil/MindForge\n/plugin install mindforge-en@mindforge\n/plugin install mindforge-zh-cn@mindforge' },
      { label: t('Install the CLI', '安装 CLI'), code: 'go install github.com/ProjAnvil/MindForge/cli/mindforge@main\nmindforge install --platform=claude,zcode,codex --lang=en --yes' },
    ],
    quickstart: [
      { label: t('Register agents and skills', '注册 agents 与技能'), code: 'mindforge install          # interactive\nmindforge init dict        # project dictionary\nmindforge doctor           # check the install' },
    ],
    agentUse: t(
      'MindForge ships a marketplace manifest that Claude Code, zcode and Codex all read. One repository serves every harness. Agents and skills are prompt-only: no automatic interception of replies.',
      'MindForge 提供统一 marketplace 清单，Claude Code、zcode 与 Codex 都能读取。一个仓库服务多种 harness。agent 与技能都是纯提示词，不会自动拦截回复。'
    ),
    agentCode: '/plugin install mindforge-en@mindforge\nmindforge install --platform=claude,zcode,codex --lang=zh-cn --yes',
    docs: 'https://github.com/ProjAnvil/MindForge#readme',
  },
  {
    slug: 'scv',
    name: 'SCV',
    repo: 'SCV',
    layer: 'Knowledge',
    language: 'Python',
    stars: 3,
    topics: ['code-analysis', 'knowledge-base', 'claude-code'],
    updated: '2026-11-14',
    summary: t(
      'Source Code Vault turns a codebase into four structured documents an agent can actually reason over.',
      'Source Code Vault 把代码库转成 agent 真正能推理的四份结构化文档。'
    ),
    problem: t(
      'An agent that does not understand your existing patterns will reinvent them badly. Your team’s conventions are the real asset, and they are nowhere written down.',
      '不理解你既有模式的 agent，会把这些模式糟糕地重造一遍。团队真正的资产是约定，而这些约定没有被写下来。'
    ),
    install: [
      { label: t('Install', '安装'), code: './install.sh          # English\n./install.sh --lang=zh-cn' },
    ],
    quickstart: [
      { label: t('Run an analysis', '执行一次分析'), code: 'scv run        # one codebase\nscv batchRun   # many codebases in parallel\nscv gather     # clone and manage remote repos' },
      { label: t('Optional deep analysis', '可选的深度分析'), code: 'pip install codebones\ncodebones --version' },
    ],
    agentUse: t(
      'SCV is a Claude Code skill with three commands. Install it once and any agent in the same harness can call scv run, scv batchRun and scv gather by name.',
      'SCV 是一个包含三条命令的 Claude Code 技能。安装一次后，同一 harness 中的任何 agent 都能按名字调用 scv run、scv batchRun 与 scv gather。'
    ),
    docs: 'https://github.com/ProjAnvil/SCV#readme',
  },
  {
    slug: 'porto',
    name: 'Porto',
    repo: 'Porto',
    layer: 'Intent',
    language: 'Python',
    stars: 0,
    topics: ['requirements-analysis', 'agent', 'specs'],
    updated: '2026-10-19',
    summary: t(
      'A codebase-aware workbench that turns a PRD into grounded engineering specifications.',
      '代码库感知的需求工作台，把 PRD 变成有依据的工程规格。'
    ),
    problem: t(
      'Turning a PRD into specs is slow and inconsistent. Decomposition lives in one person’s head, and the result reads like boilerplate that ignores the code it must change.',
      'PRD 到规格的过程缓慢且不稳定。拆解只在一个人脑子里，结果常常是无视真实代码的套话。'
    ),
    install: [
      { label: t('Backend', '后端'), code: 'cd backend && uv sync && cp .env.example .env\nuv run uvicorn porto_chatbot.main:app --reload --port 8100' },
      { label: t('Frontend', '前端'), code: 'cd frontend && npm install && npm run dev' },
    ],
    quickstart: [
      { label: t('Requirements', '环境要求'), code: 'Python 3.12 + uv, Node.js' },
    ],
    agentUse: t(
      'Porto exposes a FastAPI service on port 8100. An agent can submit a PRD over HTTP and receive subsystem specs, with every retrieval and tool call recorded for traceability. It pairs with SCV as its knowledge source.',
      'Porto 在 8100 端口提供 FastAPI 服务。agent 可通过 HTTP 提交 PRD 并获得子系统规格，所有检索与工具调用都有记录。它与 SCV 配合，把 SCV 作为知识来源。'
    ),
    docs: 'https://github.com/ProjAnvil/Porto#readme',
  },
  {
    slug: 'knot',
    name: 'Knot',
    repo: 'Knot',
    layer: 'Context',
    language: 'Go',
    stars: 2,
    topics: ['api', 'mcp', 'svelte', 'golang'],
    updated: '2026-11-10',
    summary: t(
      'An API documentation hub with a built-in MCP server, readable by humans and agents alike.',
      '带内置 MCP 服务的 API 文档中心，人和 agent 都能读懂。'
    ),
    problem: t(
      'API docs that only render in a browser are dead weight in the agent era. If an agent cannot query your contracts, it cannot integrate with them.',
      '只能在浏览器里看的 API 文档，在 agent 时代几乎没有价值。agent 查不到契约，就无法完成集成。'
    ),
    install: [
      { label: t('Docker', 'Docker'), code: 'docker compose -f docker-compose.pg.yml up -d' },
      { label: t('Binary', '二进制'), code: 'curl -LO https://github.com/ProjAnvil/knot/releases/latest/download/knot-macos-arm64\nchmod +x knot-macos-arm64 && sudo mv knot-macos-arm64 /usr/local/bin/knot' },
    ],
    quickstart: [
      { label: t('Start the server', '启动服务'), code: 'knot setup\nknot start\nknot status' },
    ],
    agentUse: t(
      'Knot speaks MCP natively. Claude can list groups, search APIs, pull detailed docs and generate request or response examples through natural language, without scraping a web page.',
      'Knot 原生支持 MCP。Claude 可以用自然语言列出分组、搜索 API、获取详细文档、生成请求与响应示例，无需抓取网页。'
    ),
    docs: 'https://github.com/ProjAnvil/Knot#readme',
  },
  {
    slug: 'ladym',
    name: 'LadyM',
    repo: 'LadyM',
    layer: 'Memory',
    language: 'Go',
    stars: 0,
    topics: ['memory', 'mcp', 'codebase-rag', 'golang'],
    updated: '2026-11-09',
    summary: t(
      'A brain-inspired multi-tier memory that lets an agent recall workspace knowledge with one keyword.',
      '受大脑启发的多层记忆系统，agent 用一个关键词就能回忆工作区知识。'
    ),
    problem: t(
      'Coding agents have no long-term memory. Every turn they re-read the same files and burn the context window rediscovering what they already knew.',
      '编码 agent 没有长期记忆。每一轮都重新读同样的文件，把上下文窗口浪费在重新发现已知内容上。'
    ),
    install: [
      { label: t('Install', '安装'), code: 'go install github.com/ProjAnvil/LadyM/cmd/ladym@latest' },
    ],
    quickstart: [
      { label: t('Thirty-second start', '三十秒上手'), code: 'ladym init\nladym index ./src\nladym recall "how does password verification work" --code\nladym remember "auth uses JWT with 24h expiry" --tags auth' },
    ],
    agentUse: t(
      'LadyM exposes an MCP server over stdio with ten tools including recall and recall_ops. The binary has no runtime dependencies and needs no API key, so any agent host can start it locally.',
      'LadyM 通过 stdio 提供 MCP 服务，包含 recall、recall_ops 等十个工具。二进制无运行时依赖、无需 API key，任何 agent 宿主都能在本地启动。'
    ),
    agentCode: '{\n  "mcpServers": {\n    "ladym": {\n      "command": "ladym",\n      "args": ["serve", "--db", "/absolute/path/to/ladym.db"]\n    }\n  }\n}',
    docs: 'https://github.com/ProjAnvil/LadyM#readme',
  },
  {
    slug: 'claude-agent-sdk-golang',
    name: 'Claude Agent SDK for Go',
    repo: 'claude-agent-sdk-golang',
    layer: 'Foundation',
    language: 'Go',
    stars: 1,
    topics: ['claude-code', 'sdk-go', 'agents'],
    updated: '2026-11-01',
    summary: t(
      'An idiomatic Go SDK for the Claude Code CLI, mirroring the Python Agent SDK.',
      'Claude Code CLI 的 Go 语言 SDK，对齐 Python Agent SDK 的能力。'
    ),
    problem: t(
      'Go teams building agents were told to call Python. This SDK gives them one-shot queries, interactive clients, in-process tools, hooks, sandboxing and session management in pure Go.',
      '过去 Go 团队想写 agent，只能去调 Python。这个 SDK 用纯 Go 提供一次性查询、交互式客户端、进程内工具、hook、沙箱与会话管理。'
    ),
    install: [
      { label: t('Go module', 'Go 模块'), code: 'go get github.com/ProjAnvil/claude-agent-sdk-golang' },
      { label: t('Prerequisite', '前置条件'), code: 'Go 1.25+\ncurl -fsSL https://claude.ai/install.sh | bash' },
    ],
    quickstart: [
      { label: t('One-shot query', '一次性查询'), code: 'messages, errs := claude.Query(ctx, "Hello Claude", nil)' },
    ],
    agentUse: t(
      'Import the module and call Query or ClaudeSDKClient. Custom Go functions become in-process MCP tools through Tool(...).Handler(...), so an agent can use your code as a tool without a separate server.',
      '导入模块后调用 Query 或 ClaudeSDKClient。自定义 Go 函数通过 Tool(...).Handler(...) 变成进程内 MCP 工具，agent 无需独立服务即可把你的代码当工具用。'
    ),
    docs: 'https://github.com/ProjAnvil/claude-agent-sdk-golang#readme',
  },
  {
    slug: 'langchain-golang',
    name: 'langchain-golang',
    repo: 'langchain-golang',
    layer: 'Foundation',
    language: 'Go',
    stars: 2,
    topics: ['golang', 'langchain', 'langgraph', 'ai-agent'],
    updated: '2026-11-18',
    summary: t(
      'A community Go port of LangChain and LangGraph for production-grade agents.',
      'LangChain 与 LangGraph 的社区 Go 移植版，面向生产级 agent。'
    ),
    problem: t(
      'The Go ecosystem deserved first-class agent primitives instead of a wrapper around a Python service. This port brings runnables, tools, checkpoints and subagents to Go.',
      'Go 生态理应有一等公民级别的 agent 原语，而不是包一层 Python 服务。这个移植把 runnable、工具、检查点与子 agent 带进 Go。'
    ),
    install: [
      { label: t('Go module', 'Go 模块'), code: 'go get github.com/projanvil/langchain-golang' },
      { label: t('Checkpoint backends', '检查点后端'), code: 'go get github.com/projanvil/langchain-golang/langgraph/checkpoint/sqlite\ngo get github.com/projanvil/langchain-golang/langgraph/checkpoint/postgres' },
    ],
    quickstart: [
      { label: t('Create an agent', '创建 agent'), code: 'import (\n  "github.com/projanvil/langchain-golang/core/language"\n  "github.com/projanvil/langchain-golang/langchain/agents"\n)' },
    ],
    agentUse: t(
      'Use CreateAgent with middleware for structured output, interrupts and subagents. It is the model backend inside Corpit, and works with Anthropic, OpenAI, Ollama and Gemini.',
      '用 CreateAgent 搭配中间件实现结构化输出、中断与子 agent。它是 Corpit 内部的模型后端，支持 Anthropic、OpenAI、Ollama 与 Gemini。'
    ),
    docs: 'https://github.com/ProjAnvil/langchain-golang#readme',
  },
  {
    slug: 'belt',
    name: 'Belt',
    repo: 'Belt',
    layer: 'Tooling',
    language: 'Python',
    stars: 1,
    topics: ['ai-native', 'claude-code', 'scaffold'],
    updated: '2026-04-16',
    summary: t(
      'A Go CLI that scaffolds AI-native apps as a skill, script, subagent and reusable component bundle.',
      'Go 编写的 CLI，把 AI 原生应用脚手架成技能、脚本、子 agent 与可复用组件的组合。'
    ),
    problem: t(
      'An AI-native app is not a plugin or a wrapper. It lives inside the agent context, so it needs a specific structure. Belt creates that structure in one command.',
      'AI 原生应用不是插件也不是包装器，它存在于 agent 的上下文里，因此需要特定结构。Belt 用一条命令生成这个结构。'
    ),
    install: [
      { label: t('npm', 'npm'), code: 'npm i -g @projanvil/belt@latest' },
    ],
    quickstart: [
      { label: t('Scaffold an app', '生成应用'), code: 'belt new\nbelt new ./my-projects\nbelt doctor' },
    ],
    agentUse: t(
      'Belt installs the generated bundle into ~/.claude/ so the agent reads SKILL.md, calls the scripts and delegates to the subagent. Logic is verified before the AI touches it.',
      'Belt 把生成的组合安装到 ~/.claude/，agent 会读取 SKILL.md、调用脚本并向子 agent 委派任务。逻辑在 AI 接手前已完成验证。'
    ),
    docs: 'https://github.com/ProjAnvil/Belt#readme',
  },
  {
    slug: 'jiade',
    name: 'Jiade',
    repo: 'Jiade',
    layer: 'Tooling',
    language: 'Go',
    stars: 0,
    topics: ['golang', 'microservice', 'data-seeding', 'docker'],
    updated: '2026-11-13',
    summary: t(
      'Generates runnable microcosms of real industry systems — services, databases and deterministic seed data.',
      '生成可运行的真实行业系统微缩模型：服务、数据库与确定性种子数据。'
    ),
    problem: t(
      'Agents need realistic systems to build against. A toy CRUD app teaches nothing about distributed transactions, sagas or reconciliation.',
      'agent 需要真实系统作为练兵场。玩具级 CRUD 应用无法反映分布式事务、saga 或对账的真实复杂度。'
    ),
    install: [
      { label: t('Go install', 'Go 安装'), code: 'go install github.com/projanvil/jiade/cmd/jiade@latest' },
    ],
    quickstart: [
      { label: t('Generate and run', '生成并运行'), code: 'jiade init --template bank --dir ./mybank\ncd mybank\njiade up && jiade seed\ncurl localhost:18000/api/v1/accounts/D0000000001' },
    ],
    agentUse: t(
      'Point an agent at a generated microcosm and it can exercise real API calls, multi-database reads and failure paths. Templates include bank, commerce and bank_dcn.',
      '把 agent 指向生成的微缩系统，它就能练习真实 API 调用、跨库读取与失败路径。模板包含 bank、commerce 与 bank_dcn。'
    ),
    docs: 'https://github.com/ProjAnvil/Jiade#readme',
  },
  {
    slug: 'smelt',
    name: 'Smelt',
    repo: 'Smelt',
    layer: 'Verification',
    language: 'Python',
    stars: 2,
    topics: ['skills', 'testing', 'agents'],
    updated: '2026-11-16',
    summary: t(
      'A behavior-verification framework for agent skills, built on given / when / then.',
      '基于 given / when / then 的 agent 技能行为验证框架。'
    ),
    problem: t(
      'A skill can change without anyone knowing whether it still behaves correctly. Prompt edits have no test suite, so quality regressions slip into every harness.',
      '技能被修改后，没人知道行为是否仍然正确。提示词改动没有测试套件，质量退化会悄悄进入每个 harness。'
    ),
    install: [
      { label: t('Toolchain', '工具链'), code: 'uv + Python 3.11+\n# zero core dependencies' },
    ],
    quickstart: [
      { label: t('Define a case', '定义用例'), code: 'result = (\n  new_case("commit-skill")\n  .given(context(files="fixtures/dirty_repo"))\n  .when(trigger("/commit"))\n  .then(text_similar("..."))\n)' },
    ],
    agentUse: t(
      'Run Smelt in CI. Deterministic replay emits canned responses in order, so assertions are reproducible without calling a live model. Reach and restraint checks prove whether the agent read what it should — and nothing more.',
      '在 CI 中运行 Smelt。确定性回放按顺序输出预设响应，断言无需调用在线模型即可复现。reach 与 restraint 检查能验证 agent 是否读取了该读的内容，且没有多读。'
    ),
    docs: 'https://github.com/ProjAnvil/Smelt#readme',
  },
  {
    slug: 'vectra',
    name: 'Vectra',
    repo: 'Vectra',
    layer: 'Data',
    language: 'Go',
    stars: 0,
    topics: ['golang', 'graph', 'mcp', 'in-memory'],
    updated: '2026-11-01',
    summary: t(
      'An embedded in-memory graph engine for Go, with optional server mode and MCP interfaces in three languages.',
      '嵌入式 Go 内存图引擎，提供可选服务模式与三种语言的 MCP 接口。'
    ),
    problem: t(
      'At a hundred thousand to ten million edges, general graph databases carry overhead that a team does not need. The graph fits in memory; the machinery does not help.',
      '在十万到一千万条边的规模上，通用图数据库带来了团队并不需要的大量开销。图本来就能放进内存，那些复杂机制反而成了负担。'
    ),
    install: [
      { label: t('Go module', 'Go 模块'), code: 'go get github.com/projanvil/vectra' },
      { label: t('Python SDK', 'Python SDK'), code: 'pip install vectra-graph' },
    ],
    quickstart: [
      { label: t('Embedded graph', '嵌入式图'), code: 'g := vectra.New()\ng.AddNode("gateway", "Service", nil)\ng.AddEdge("gateway", "auth", "CALLS", nil)' },
    ],
    agentUse: t(
      'Three first-class MCP implementations in Go, Python and TypeScript expose traversals, Cypher-subset queries and writes. Connect a client with one command.',
      'Go、Python 与 TypeScript 三种一等公民 MCP 实现，提供图遍历、Cypher 子集查询与写入。一条命令即可连接客户端。'
    ),
    agentCode: 'claude mcp add vectra -- /path/to/vectra-mcp',
    docs: 'https://github.com/ProjAnvil/Vectra#readme',
  },
  {
    slug: 'corpit',
    name: 'Corpit',
    repo: 'Corpit',
    layer: 'Application',
    language: 'Go',
    stars: 0,
    topics: ['agents', 'golang', 'multi-agent', 'mcp'],
    updated: '2026-11-02',
    summary: t(
      'A single Go binary that creates and runs a virtual company of AI agents with approvals and memory.',
      '单 Go 二进制，创建并运行带审批与记忆的 AI agent 虚拟公司。'
    ),
    problem: t(
      'Multi-agent demos are usually a single loop with extra names. Real collaboration needs roles, rooms, permissions, approvals and an audit trail.',
      '多 agent 演示常常只是给单循环换了几个名字。真正的协作需要角色、房间、权限、审批与审计记录。'
    ),
    install: [
      { label: t('Docker', 'Docker'), code: 'docker build -t corpit .\ndocker run -d --name corpit -p 8080:8080 -v corpit-data:/data corpit' },
    ],
    quickstart: [
      { label: t('Open the UI', '打开界面'), code: 'http://localhost:8080' },
    ],
    agentUse: t(
      'Agents are hired from role templates, discover Claude Code skills automatically, and connect external MCP servers with per-agent allowlists. Sensitive tool calls pause for owner approval.',
      'agent 从角色模板中「雇佣」，自动发现 Claude Code 技能，并通过按 agent 的允许列表连接外部 MCP 服务。敏感工具调用会暂停，等待所有者审批。'
    ),
    docs: 'https://github.com/ProjAnvil/Corpit#readme',
  },
  {
    slug: 'bossy',
    name: 'Bossy',
    repo: 'Bossy',
    layer: 'Application',
    language: 'Python',
    stars: 0,
    topics: ['chatbi', 'python', 'typescript', 'sql'],
    updated: '2026-10-15',
    summary: t(
      'A self-hosted, privacy-first ChatBI platform. Ask questions in plain language and get SQL, tables and charts over your own databases.',
      '自托管、隐私优先的 ChatBI 平台。用自然语言提问，在自己的数据库上得到 SQL、表格与图表。'
    ),
    problem: t(
      'Most chat-with-your-data tools send your schema and queries to a third party. Teams in finance and analytics need a natural-language BI surface on their own infrastructure.',
      '多数「与数据对话」工具会把表结构与查询发给第三方。金融与分析团队需要在自己的基础设施上拥有自然语言 BI 能力。'
    ),
    install: [
      { label: t('Clone and configure', '克隆并配置'), code: 'git clone https://github.com/ProjAnvil/Bossy.git\ncd Bossy\ncp .env.example .env' },
    ],
    quickstart: [
      { label: t('Prerequisites', '前置条件'), code: 'Docker, uv, Bun (or python/npm), Ollama on :11434' },
    ],
    agentUse: t(
      'Bossy is proof that the stack works end to end. A rule-based semantic layer, SQL guard and EXPLAIN-based cost gate wrap every LLM step, so the deterministic parts stay predictable.',
      'Bossy 是这套技术栈端到端可用的证明。规则驱动的语义层、SQL 守卫与基于 EXPLAIN 的成本闸门包住每一步 LLM 调用，让确定性部分保持可预测。'
    ),
    docs: 'https://github.com/ProjAnvil/Bossy#readme',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectsByLayer(layer: string): Project[] {
  return projects.filter((p) => p.layer === layer);
}
