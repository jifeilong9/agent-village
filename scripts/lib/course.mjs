/**
 * 课程生成器：从 features.json 的 learningPath + features 自动编排课程。
 * 纯模板、可复现；不调用模型，不会编造新命令。
 */
export const LEVEL_MINUTES = { 入门: 15, 进阶: 25, 高级: 40 };
const LEVEL_ORDER = ["入门", "进阶", "高级"];

function mostCommon(values) {
  const counts = new Map();
  for (const v of values) counts.set(v, (counts.get(v) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "入门";
}

function cleanTitle(title) {
  const raw = String(title || "").trim();
  return raw.replace(/^(阶段\s*\d+|入门阶段|进阶阶段|高级阶段)\s*[：:]\s*/, "").trim() || raw;
}

function joinSentences(values) {
  return values
    .map((s) => String(s).replace(/[。；;]\s*$/, "").trim())
    .filter(Boolean)
    .join("；");
}

function toLesson(feature) {
  const minutes = LEVEL_MINUTES[feature.level] || 20;
  return {
    id: feature.id,
    name: feature.name,
    level: feature.level,
    category: feature.category,
    minutes,
    summary: feature.summary,
    why: feature.why || "",
    objectives: [feature.summary, feature.why].filter(Boolean),
    exercise: feature.steps?.[0]
      ? `在自己的项目里复现「${feature.name}」：${feature.steps[0]}`
      : `按官方文档跑通「${feature.name}」的最小示例`,
    checkpoint: feature.pitfalls || `能不看文档复现「${feature.name}」的关键步骤`,
    steps: feature.steps || [],
    commands: feature.commands || [],
    doc: feature.doc || "",
    tags: feature.tags || [],
  };
}

/**
 * @param {object} agent features.json 对象
 * @returns {{title:string, subtitle:string, totalMinutes:number, lessonCount:number, moduleCount:number, modules:Array}}
 */
export function buildCourse(agent) {
  const features = Array.isArray(agent.features) ? agent.features : [];
  const byId = new Map(features.map((f) => [f.id, f]));
  const used = new Set();
  const modules = [];

  const addModule = (title, desc, ids) => {
    const lessons = [];
    for (const id of ids || []) {
      const f = byId.get(id);
      if (!f || used.has(f.id)) continue;
      used.add(f.id);
      lessons.push(toLesson(f));
    }
    if (!lessons.length) return;
    modules.push({
      id: `m${modules.length + 1}`,
      title: cleanTitle(title) || `模块 ${modules.length + 1}`,
      desc: desc || "",
      level: mostCommon(lessons.map((l) => l.level)),
      minutes: lessons.reduce((sum, l) => sum + l.minutes, 0),
      lessons,
      checkpoint: `完成「${lessons[lessons.length - 1].name}」，并能在自己的项目里独立复现。`,
    });
  };

  const path = Array.isArray(agent.learningPath) && agent.learningPath.length
    ? agent.learningPath
    : LEVEL_ORDER.map((level) => ({
        title: level === "入门" ? "入门基础" : level === "进阶" ? "进阶工作流" : "高级扩展",
        desc: `按 ${level} 难度学习。`,
        features: features.filter((f) => f.level === level).map((f) => f.id),
      }));

  for (const step of path) addModule(step.title, step.desc, step.features);

  // 学习路径没有覆盖到的功能，按难度补成选修模块
  for (const level of LEVEL_ORDER) {
    const leftover = features.filter((f) => f.level === level && !used.has(f.id));
    if (leftover.length) {
      addModule(
        `补充修炼 · ${level}`,
        "学习路径之外的额外功能，可按兴趣选修。",
        leftover.map((f) => f.id)
      );
    }
  }

  const totalMinutes = modules.reduce((sum, m) => sum + m.minutes, 0);
  const lessonCount = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return {
    title: `${agent.name} 修炼课程`,
    subtitle: agent.tagline,
    totalMinutes,
    lessonCount,
    moduleCount: modules.length,
    modules,
  };
}

export function courseMarkdown(agent) {
  const course = buildCourse(agent);
  const modules = course.modules
    .map(
      (m, i) => `## 模块 ${i + 1}：${m.title}

${m.desc}

> ${m.lessons.length} 节课 · 约 ${m.minutes} 分钟

${m.lessons
  .map(
    (l, j) => `### ${i + 1}.${j + 1} ${l.name}

- **难度 / 时长**：${l.level} · 约 ${l.minutes} 分钟
- **目标**：${joinSentences(l.objectives) || l.summary}
- **练习**：${l.exercise}
- **检查点**：${l.checkpoint}
- **功能卡**：[${l.name}](features.md#${l.id})
${l.doc ? `- **官方文档**：${l.doc}` : ""}`
  )
  .join("\n\n")}

**模块检查点**：${m.checkpoint}
`
    )
    .join("\n---\n\n");

  return `# ${agent.name} · 自动生成课程

> 由 \`scripts/lib/course.mjs\` 根据 \`features.json\` 的 learningPath 与功能数据自动编排。
> 共 ${course.moduleCount} 个模块、${course.lessonCount} 节课，预计 ${course.totalMinutes} 分钟。

${modules}
`;
}
