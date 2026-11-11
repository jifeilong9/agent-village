/* ============================================================
   Agent 新手村 — app
   数据源：window.AGENT_DATA（由 scripts/build-data.mjs 生成）
   ============================================================ */
(() => {
  "use strict";

  const DATA = window.AGENT_DATA || null;
  const AGENTS = Array.isArray(DATA?.agents) ? DATA.agents : [];
  const STORE = {
    progress: "agentVillage.progress.v1",
    suggestions: "agentVillage.suggestions.v1",
    theme: "agentVillage.theme.v1",
  };
  const XP_PER_FEATURE = 20;
  const LEVELS = [
    [0, "初入江湖"],
    [100, "村口学徒"],
    [250, "见习御灵师"],
    [500, "资深道友"],
    [800, "一代宗师"],
  ];
  const ACCENTS = {
    "claude-code": "#bc5a3c",
    pi: "#2f7d6d",
    codex: "#3f6395",
    antigravity: "#7a5cbf",
    "deepseek-harness": "#2f6da3",
  };
  const FALLBACK_GLYPHS = {
    "claude-code": "✳",
    pi: "π",
    codex: "◇",
    antigravity: "△",
    "deepseek-harness": "◈",
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (value = "") =>
    String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const daysAgo = (dateStr) => {
    const t = Date.parse(dateStr);
    return Number.isFinite(t) ? Math.floor((startOfDay(new Date()) - startOfDay(new Date(t))) / 86_400_000) : null;
  };
  const fmtDate = (value) => {
    const t = typeof value === "number" ? value : Date.parse(value);
    if (!Number.isFinite(t)) return value || "—";
    return new Date(t).toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
  };

  const accentOf = (slug) => ACCENTS[slug] || "#2f6f5e";
  const glyphOf = (agent) => FALLBACK_GLYPHS[agent?.slug] || agent?.name?.slice(0, 1) || "?";
  const keyOf = (slug, id) => `${slug}::${id}`;

  const state = {
    progress: new Set(),
    suggestions: [],
    tab: "hot",
    filterAgent: "all",
    search: "",
    activeAgent: null,
    drawerTab: "features",
    levelFilter: "all",
    openFeatureId: null,
    dailyKey: null,
    lastFocus: null,
  };

  /* ---------- storage ---------- */
  function loadLocal() {
    try {
      const p = JSON.parse(localStorage.getItem(STORE.progress) || "[]");
      if (Array.isArray(p)) state.progress = new Set(p.filter((x) => typeof x === "string"));
      const s = JSON.parse(localStorage.getItem(STORE.suggestions) || "[]");
      if (Array.isArray(s)) state.suggestions = s.filter((x) => x && x.name);
    } catch {
      /* 本地存储不可用时静默降级 */
    }
  }
  function saveProgress() {
    try { localStorage.setItem(STORE.progress, JSON.stringify([...state.progress])); } catch {}
  }
  function saveSuggestions() {
    try { localStorage.setItem(STORE.suggestions, JSON.stringify(state.suggestions)); } catch {}
  }

  /* ---------- data helpers ---------- */
  const allFeatures = () =>
    AGENTS.flatMap((a) =>
      (a.features || []).map((f) => ({ ...f, agentSlug: a.slug, agentName: a.name, vendor: a.vendor }))
    );

  function fallbackRecs() {
    const all = allFeatures();
    const fresh = all
      .filter((f) => f.isNew)
      .sort((a, b) => (Date.parse(b.releasedAt) || 0) - (Date.parse(a.releasedAt) || 0));
    return {
      hot: [...all].sort((a, b) => (b.hot || 0) - (a.hot || 0)),
      fresh,
    };
  }
  const recs = () => {
    const r = DATA?.recommendations;
    const fb = fallbackRecs();
    return {
      hot: Array.isArray(r?.hot) && r.hot.length ? r.hot : fb.hot,
      fresh: Array.isArray(r?.fresh) ? r.fresh : fb.fresh,
    };
  };

  function agentProgress(agent) {
    const total = agent.features?.length || 0;
    const done = (agent.features || []).filter((f) => state.progress.has(keyOf(agent.slug, f.id))).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function totals() {
    const all = allFeatures();
    const done = all.filter((f) => state.progress.has(keyOf(f.agentSlug, f.id))).length;
    return { features: all.length, done, xp: done * XP_PER_FEATURE };
  }

  function levelInfo(xp) {
    let idx = 0;
    for (let i = 0; i < LEVELS.length; i += 1) if (xp >= LEVELS[i][0]) idx = i;
    const next = LEVELS[idx + 1];
    return {
      name: LEVELS[idx][1],
      next: next ? next[1] : null,
      toNext: next ? Math.max(0, next[0] - xp) : 0,
      pct: next ? Math.min(100, Math.round(((xp - LEVELS[idx][0]) / (next[0] - LEVELS[idx][0])) * 100)) : 100,
    };
  }

  function updatedAt() {
    const dates = AGENTS.map((a) => Date.parse(a.updatedAt)).filter(Number.isFinite);
    if (!dates.length) return "—";
    return fmtDate(Math.max(...dates));
  }

  function levelRank(level) {
    return { 入门: 0, 进阶: 1, 高级: 2 }[level] ?? 3;
  }

  /* ---------- chrome ---------- */
  function updateChrome() {
    const { features, done, xp } = totals();
    const info = levelInfo(xp);
    const chip = $("#level-chip");
    $("#level-name").textContent = info.name;
    $("#level-xp").textContent = `${xp} 修为`;
    chip.title = info.next
      ? `完成 ${done}/${features} 个功能 · 距「${info.next}」还差 ${info.toNext} 修为`
      : `完成 ${done}/${features} 个功能 · 已达最高境界`;

    const modules = AGENTS.reduce((n, a) => n + (a.course?.moduleCount || 0), 0);
    $("#stat-agents").textContent = AGENTS.length || 5;
    $("#stat-features").textContent = features || "—";
    $("#stat-modules").textContent = modules || "—";
    $("#stat-updated").textContent = updatedAt();
  }

  /* ---------- village ---------- */
  function renderVillage() {
    const grid = $("#village-grid");
    if (!AGENTS.length) {
      grid.innerHTML = `<div class="rec-empty">资料整理中：五个道场的 features.json 还没有生成。<br />先运行 <code>npm run build</code>，或等待调研完成。</div>`;
      return;
    }
    grid.innerHTML = AGENTS.map((agent) => {
      const p = agentProgress(agent);
      const levels = (agent.features || []).reduce((acc, f) => ({ ...acc, [f.level]: (acc[f.level] || 0) + 1 }), {});
      const levelChips = ["入门", "进阶", "高级"]
        .filter((l) => levels[l])
        .map((l) => `<span class="chip neutral">${l} ${levels[l]}</span>`)
        .join("");
      return `
        <article class="house" data-open-agent="${esc(agent.slug)}" style="--agent:${accentOf(agent.slug)}">
          <div class="house-top">
            <span class="house-glyph" aria-hidden="true">${esc(glyphOf(agent))}</span>
            <span class="house-progress"><strong>${p.done}/${p.total}</strong>已修炼</span>
          </div>
          <h3>${esc(agent.name)}</h3>
          <div class="house-vendor">${esc(agent.vendor || "")} · v${esc(agent.version || "unknown")}</div>
          <p class="house-tagline">${esc(agent.tagline || "")}</p>
          <div class="house-meta">
            <span class="chip">${p.total} 个功能</span>
            ${levelChips}
          </div>
          <div class="house-bottom">
            <div class="mini-bar"><i style="width:${p.pct}%"></i></div>
            <div class="house-cta">
              <button class="house-link" type="button" data-open-agent="${esc(agent.slug)}" aria-label="进入 ${esc(agent.name)} 道场">
                进入道场 <span class="arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- courses ---------- */
  function renderCourses() {
    const grid = $("#course-grid");
    if (!grid) return;
    if (!AGENTS.length) {
      grid.innerHTML = `<div class="rec-empty">课程表生成中：等 features.json 就位后会自动编排。</div>`;
      return;
    }
    grid.innerHTML = AGENTS.map((agent) => {
      const course = agent.course;
      if (!course) return "";
      const lessons = course.modules.flatMap((m) => m.lessons);
      const done = lessons.filter((l) => state.progress.has(keyOf(agent.slug, l.id))).length;
      const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
      return `
        <article class="course-card" data-open-course="${esc(agent.slug)}" style="--agent:${accentOf(agent.slug)}">
          <div class="course-card-top">
            <span class="course-glyph" aria-hidden="true">${esc(glyphOf(agent))}</span>
            <span class="chip">${course.moduleCount} 模块 · ${course.lessonCount} 节</span>
          </div>
          <h3>${esc(agent.name)}</h3>
          <p class="course-card-sub">${esc(agent.tagline || "")}</p>
          <div class="course-card-stats">
            <span>约 ${course.totalMinutes} 分钟</span>
            <span>${done}/${lessons.length} 已完成</span>
          </div>
          <div class="mini-bar"><i style="width:${pct}%"></i></div>
          <button class="btn btn-small course-start" type="button" data-open-course="${esc(agent.slug)}">
            ${done ? "继续课程" : "开始课程"} <span aria-hidden="true">→</span>
          </button>
        </article>`;
    }).join("");
  }

  /* ---------- recommendations ---------- */
  function recCard(f, index, kind) {
    const slug = f.agentSlug || f.slug || "";
    const hot = Number(f.hot) || 0;
    const released = f.releasedAt ? fmtDate(f.releasedAt) : "";
    const ago = f.releasedAt ? daysAgo(f.releasedAt) : null;
    const newBadge = f.isNew || (ago !== null && ago >= 0 && ago <= 120) ? `<span class="new-badge">NEW</span>` : "";
    return `
      <article class="rec-card" style="--agent:${accentOf(slug)}">
        <div class="rec-rank">${kind === "mine" ? "荐" : String(index + 1).padStart(2, "0").slice(-2)}<small>${kind === "mine" ? "村民" : "RANK"}</small></div>
        <div class="rec-body">
          <h3 class="rec-title">${esc(f.name)}${newBadge}</h3>
          <p class="rec-sub">${esc(f.agentName || f.agent || "")} · ${esc(f.level || "")} · ${esc(f.category || "")}</p>
          <p class="rec-summary">${esc(f.summary || f.why || "")}</p>
          <div class="rec-meta">
            ${hot ? `<span class="rec-hot">▲ ${hot} 人气</span>` : ""}
            ${released ? `<span>${released} 上线</span>` : ""}
            ${(f.tags || []).slice(0, 2).map((t) => `<span>#${esc(t)}</span>`).join("")}
          </div>
        </div>
        <div class="rec-action">
          ${kind === "mine"
            ? `<button class="text-btn" data-delete-suggestion="${esc(f.id)}" aria-label="删除推荐">删除</button>`
            : `<button class="btn btn-small" data-open-feature="${esc(slug)}|${esc(f.id)}">修炼</button>`}
        </div>
      </article>`;
  }

  function renderRecommendations() {
    const panel = $("#recommend-panel");
    let list = [];
    if (state.tab === "hot") list = recs().hot.slice(0, 8);
    else if (state.tab === "fresh") list = recs().fresh.slice(0, 8);
    else list = state.suggestions.slice(0, 12);

    if (!list.length) {
      panel.innerHTML = `<div class="rec-empty">${
        state.tab === "fresh"
          ? "最近 120 天内暂无标注为新功能的条目。<br />等官方上新后，这里会自动出现。"
          : state.tab === "mine"
            ? "愿望单还是空的。发现好用但还没被收录的功能？点右下角「＋ 推荐功能」。"
            : "资料整理中，热门榜稍后揭晓。"
      }</div>`;
      return;
    }
    panel.innerHTML = list.map((f, i) => recCard(f, i, state.tab)).join("");
  }

  /* ---------- search ---------- */
  function renderFilters() {
    const wrap = $("#filter-chips");
    const chips = [`<button class="filter-chip ${state.filterAgent === "all" ? "active" : ""}" data-filter-agent="all">全部导师</button>`];
    for (const a of AGENTS) {
      chips.push(
        `<button class="filter-chip ${state.filterAgent === a.slug ? "active" : ""}" data-filter-agent="${esc(a.slug)}" style="--agent:${accentOf(a.slug)}">${esc(glyphOf(a))} ${esc(a.name)}</button>`
      );
    }
    wrap.innerHTML = chips.join("");
  }

  function matchFeature(f, q) {
    if (!q) return true;
    const hay = [
      f.name, f.summary, f.why, f.category, f.level, f.agentName,
      ...(f.tags || []), ...(f.steps || []), ...(f.commands || []),
    ].join(" ").toLowerCase();
    return q.toLowerCase().split(/\s+/).every((part) => hay.includes(part));
  }

  function renderSearch() {
    const wrap = $("#search-results");
    const q = state.search.trim();
    let list = allFeatures().filter((f) => (state.filterAgent === "all" || f.agentSlug === state.filterAgent) && matchFeature(f, q));
    list.sort((a, b) => {
      const ad = state.progress.has(keyOf(a.agentSlug, a.id)) ? 1 : 0;
      const bd = state.progress.has(keyOf(b.agentSlug, b.id)) ? 1 : 0;
      return ad - bd || (b.hot || 0) - (a.hot || 0);
    });
    const limit = q ? 60 : 12;
    const shown = list.slice(0, limit);
    const hint = q
      ? `找到 <strong>${list.length}</strong> 个匹配功能${list.length > shown.length ? `，显示前 ${shown.length} 个` : ""}。`
      : `先修这 ${shown.length} 个高频功能；输入关键词可检索全部 ${allFeatures().length} 个。`;

    if (!shown.length) {
      wrap.innerHTML = `<div class="result-empty">没有找到匹配的功能。换个关键词，或点上面的「全部导师」。</div>`;
      return;
    }
    wrap.innerHTML = `<div class="search-hint">${hint}</div>` + shown.map((f) => {
      const done = state.progress.has(keyOf(f.agentSlug, f.id));
      return `
        <button class="result-row" data-open-feature="${esc(f.agentSlug)}|${esc(f.id)}" style="--agent:${accentOf(f.agentSlug)}">
          <span class="result-glyph" aria-hidden="true">${esc(FALLBACK_GLYPHS[f.agentSlug] || "·")}</span>
          <span class="result-main">
            <span class="result-title">${done ? "✓ " : ""}${esc(f.name)} <span class="level-pill level-${esc(f.level)}">${esc(f.level)}</span></span>
            <span class="result-desc">${esc(f.agentName)} · ${esc(f.summary || "")}</span>
            <span class="result-tags">
              <span class="mini-tag">${esc(f.category || "功能")}</span>
              ${(f.tags || []).slice(0, 3).map((t) => `<span class="mini-tag">#${esc(t)}</span>`).join("")}
            </span>
          </span>
          <span class="result-side">
            <span class="rec-hot">▲ ${Number(f.hot) || 0}</span>
            <span aria-hidden="true">→</span>
          </span>
        </button>`;
    }).join("");
  }

  /* ---------- daily ---------- */
  function pickDaily() {
    const all = allFeatures();
    if (!all.length) {
      $("#daily-feature").innerHTML = `<p class="muted">典籍还在整理中，稍后再来翻牌。</p>`;
      $("#daily-agent").textContent = "—";
      return;
    }
    let f = all[Math.floor(Math.random() * all.length)];
    if (all.length > 1 && keyOf(f.agentSlug, f.id) === state.dailyKey) {
      f = all[(all.indexOf(f) + 1) % all.length];
    }
    state.dailyKey = keyOf(f.agentSlug, f.id);
    $("#daily-feature").innerHTML = `
      <button class="daily-open" data-open-feature="${esc(f.agentSlug)}|${esc(f.id)}">
        <span class="daily-agent-badge" style="color:${accentOf(f.agentSlug)}">${esc(glyphOf({ slug: f.agentSlug, name: f.agentName }))} ${esc(f.agentName)}</span>
        <span class="daily-title">${esc(f.name)}</span>
        <span class="daily-summary">${esc(f.summary || "")}</span>
        <span class="daily-step">第一步 · ${esc((f.steps || [])[0] || "打开官方文档，先跑通最小示例。")}</span>
      </button>`;
    $("#daily-agent").textContent = `${f.agentName} · ${f.level}`;
  }

  /* ---------- drawer ---------- */
  const drawer = $("#drawer");
  const backdrop = $("#drawer-backdrop");
  const drawerInner = $("#drawer-inner");
  let closeTimer = 0;

  function getAgent(slug) {
    return AGENTS.find((a) => a.slug === slug) || null;
  }

  function featureById(agent, id) {
    return (agent.features || []).find((f) => f.id === id) || null;
  }

  function syncUrl(agentSlug, featureId, tab = "features") {
    try {
      const url = new URL(location.href);
      if (agentSlug) {
        url.searchParams.set("agent", agentSlug);
        if (featureId) url.searchParams.set("feature", featureId);
        else url.searchParams.delete("feature");
        if (tab !== "features") url.searchParams.set("tab", tab);
        else url.searchParams.delete("tab");
      } else {
        url.searchParams.delete("agent");
        url.searchParams.delete("feature");
        url.searchParams.delete("tab");
      }
      history.replaceState(null, "", url);
    } catch {
      /* file:// 等环境可能不允许改地址栏，忽略 */
    }
  }

  function openAgent(slug, featureId = null, tab = "features") {
    const agent = getAgent(slug);
    if (!agent) return;
    state.activeAgent = slug;
    state.drawerTab = tab;
    state.levelFilter = "all";
    state.openFeatureId = featureId;
    state.lastFocus = document.activeElement;
    syncUrl(slug, featureId, tab);

    clearTimeout(closeTimer);
    backdrop.hidden = false;
    drawer.hidden = false;
    drawer.style.setProperty("--agent", accentOf(slug));
    renderDrawer();
    document.body.style.overflow = "hidden";
    // 强制一次布局后再加类，保证过渡在后台标签页也能生效
    void drawer.offsetWidth;
    drawer.classList.add("open");
    backdrop.classList.add("show");
    drawerInner.scrollTop = 0;
    setTimeout(() => $(".drawer-close-float")?.focus({ preventScroll: true }), 40);
  }

  function closeDrawer() {
    if (drawer.hidden) return;
    drawer.classList.remove("open");
    backdrop.classList.remove("show");
    document.body.style.overflow = "";
    closeTimer = setTimeout(() => {
      drawer.hidden = true;
      backdrop.hidden = true;
      if (state.lastFocus?.focus) state.lastFocus.focus({ preventScroll: true });
    }, 320);
    state.activeAgent = null;
    syncUrl(null);
  }

  function drawerHeader(agent) {
    const p = agentProgress(agent);
    return `
      <div class="drawer-hero">
        <div class="drawer-head-main">
          <span class="drawer-glyph" aria-hidden="true">${esc(glyphOf(agent))}</span>
          <div>
            <h2 class="drawer-title" id="drawer-title">${esc(agent.name)}</h2>
            <p class="drawer-vendor">${esc(agent.vendor || "")} · v${esc(agent.version || "unknown")}</p>
            <p class="drawer-tagline">${esc(agent.tagline || "")}</p>
          </div>
        </div>
        <div class="drawer-meta">
          <span class="meta">${p.total} 个功能</span>
          <span class="meta">学习曲线 ${"●".repeat(Math.max(1, Math.min(5, Number(agent.stats?.learningCurve) || 3)))}${"○".repeat(5 - Math.max(1, Math.min(5, Number(agent.stats?.learningCurve) || 3)))}</span>
          <span class="meta">核对于 ${esc(fmtDate(agent.updatedAt))}</span>
          ${(agent.stats?.bestFor || []).slice(0, 2).map((x) => `<span class="meta">适合 ${esc(x)}</span>`).join("")}
        </div>
        <div class="drawer-progress">
          <div class="mini-bar"><i style="width:${p.pct}%"></i></div>
          <span data-drawer-progress>${p.done}/${p.total} · ${p.pct}%</span>
        </div>
      </div>`;
  }

  function drawerTabs(agent) {
    const tabs = [
      ["features", "功能修炼"],
      ["course", "课程表"],
      ["install", "入村仪式"],
      ["official", "官方资料"],
    ];
    return `<div class="drawer-tabs" role="tablist" aria-label="道场内容">${tabs
      .map(([id, label]) => `<button class="drawer-tab ${state.drawerTab === id ? "active" : ""}" role="tab" aria-selected="${state.drawerTab === id}" data-drawer-tab="${id}">${label}</button>`)
      .join("")}</div>`;
  }

  function installSection(agent) {
    const inst = agent.install || {};
    const hasAny = (inst.requirements || []).length || (inst.steps || []).length || (inst.commands || []).length || inst.verify;
    const concepts = agent.concepts || [];
    return `
      <div class="drawer-section">
        <h3><span class="num">STEP 0</span> 入村仪式</h3>
        <p>先把 ${esc(agent.name)} 跑起来。下面的步骤来自官方安装文档；遇到版本差异，以官方为准。</p>
        ${hasAny
          ? `<div class="install-box">
              <dl class="install-grid">
                ${(inst.requirements || []).length ? `<div class="install-row"><dt>环境要求</dt><dd>${inst.requirements.map(esc).join("、")}</dd></div>` : ""}
                ${(inst.steps || []).length ? `<div class="install-row"><dt>安装步骤</dt><dd><ol class="install-steps">${inst.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></dd></div>` : ""}
                ${inst.verify ? `<div class="install-row"><dt>验证</dt><dd>${esc(inst.verify)}</dd></div>` : ""}
              </dl>
              ${(inst.commands || []).map((c) => cmdBlock(c)).join("")}
            </div>`
          : `<div class="drawer-empty">该道场的安装信息尚未整理，请先查看官方资料。</div>`}
      </div>
      ${concepts.length
        ? `<div class="drawer-section">
            <h3><span class="num">MAP</span> 先认路</h3>
            <div class="concept-grid">
              ${concepts.map((c) => `<div class="concept"><strong>${esc(c.term)}</strong><p>${esc(c.desc)}</p></div>`).join("")}
            </div>
          </div>`
        : ""}`;
  }

  function cmdBlock(command) {
    const text = String(command);
    return `
      <div class="cmd-block">
        <pre><code>${esc(text)}</code></pre>
        <button class="copy-btn" data-copy="${esc(text)}" type="button">复制</button>
      </div>`;
  }

  function featureCard(f, agent, openId) {
    const done = state.progress.has(keyOf(agent.slug, f.id));
    const open = openId === f.id;
    const newBadge = f.isNew ? `<span class="new-badge">NEW</span>` : "";
    return `
      <article class="feature-card ${open ? "open" : ""} ${done ? "done" : ""}" data-feature-card="${esc(f.id)}">
        <div class="feature-head">
          <button class="feature-check" type="button" data-check-feature="${esc(f.id)}" aria-label="${done ? "取消完成" : "标记完成"}：${esc(f.name)}" aria-pressed="${done}">✓</button>
          <button class="feature-toggle" type="button" data-toggle-feature="${esc(f.id)}" aria-expanded="${open}">
            <span class="feature-head-main">
              <span class="feature-name">${esc(f.name)} ${newBadge}</span>
              <span class="feature-summary">${esc(f.summary || "")}</span>
            </span>
            <span class="feature-side">
              <span class="level-pill level-${esc(f.level)}">${esc(f.level)}</span>
              <span class="hot-pill">▲ ${Number(f.hot) || 0}</span>
              <span class="chev" aria-hidden="true">⌄</span>
            </span>
          </button>
        </div>
        <div class="feature-body">
          ${f.why ? `<div class="feature-why"><strong>为什么练它</strong>${esc(f.why)}</div>` : ""}
          ${(f.steps || []).length
            ? `<ol class="steps-list">${f.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`
            : `<p class="muted small">暂无步骤，请参考官方文档。</p>`}
          ${(f.commands || []).map((c) => cmdBlock(c)).join("")}
          ${f.pitfalls ? `<p class="pitfall"><strong>常见坑 · </strong>${esc(f.pitfalls)}</p>` : ""}
          <div class="feature-foot">
            <span class="feature-tags">${(f.tags || []).map((t) => `<span class="mini-tag">#${esc(t)}</span>`).join("")}</span>
            <span>
              ${f.doc ? `<a class="doc-link" href="${esc(f.doc)}" target="_blank" rel="noreferrer">官方文档 ↗</a>` : ""}
              <button class="feature-done-btn" type="button" data-check-feature="${esc(f.id)}">${done ? "✓ 已点亮" : "点亮这项 · +20"}</button>
            </span>
          </div>
        </div>
      </article>`;
  }

  function featureList(agent) {
    const levels = ["全部", "入门", "进阶", "高级"];
    const counts = (agent.features || []).reduce((acc, f) => ({ ...acc, [f.level]: (acc[f.level] || 0) + 1 }), {});
    const filtered = (agent.features || [])
      .filter((f) => state.levelFilter === "all" || f.level === state.levelFilter)
      .sort((a, b) => levelRank(a.level) - levelRank(b.level) || (b.hot || 0) - (a.hot || 0));
    return `
      <div class="drawer-section">
        <div class="feature-toolbar">
          <div class="level-tabs" role="group" aria-label="按难度筛选">
            ${levels.map((l) => {
              const active = (l === "全部" && state.levelFilter === "all") || state.levelFilter === l;
              const n = l === "全部" ? (agent.features || []).length : counts[l] || 0;
              return `<button class="level-tab ${active ? "active" : ""}" type="button" data-level-filter="${l === "全部" ? "all" : l}">${l} ${n}</button>`;
            }).join("")}
          </div>
          <span class="hint">勾选左侧方框即可点亮 · 每项 +${XP_PER_FEATURE} 修为</span>
        </div>
        <div class="feature-list" id="feature-list">
          ${filtered.length
            ? filtered.map((f) => featureCard(f, agent, state.openFeatureId)).join("")
            : `<div class="drawer-empty">这个难度下还没有收录功能。</div>`}
        </div>
      </div>`;
  }

  function courseSection(agent) {
    const course = agent.course;
    if (!course || !course.modules?.length) {
      return `<div class="drawer-section"><h3><span class="num">COURSE</span> 课程表</h3><div class="drawer-empty">课程生成中：features.json 就位后会自动编排模块、课时与检查点。</div></div>`;
    }
    const lessons = course.modules.flatMap((m) => m.lessons);
    const doneCount = lessons.filter((l) => state.progress.has(keyOf(agent.slug, l.id))).length;
    const pct = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;
    const next = lessons.find((l) => !state.progress.has(keyOf(agent.slug, l.id)));
    return `
      <div class="drawer-section">
        <h3><span class="num">COURSE</span> 课程表</h3>
        <div class="course-summary">
          <div class="course-summary-main">
            <div><strong>${course.moduleCount}</strong> 模块 · <strong>${course.lessonCount}</strong> 节 · 约 <strong>${course.totalMinutes}</strong> 分钟</div>
            <p>${esc(course.subtitle || "")}</p>
          </div>
          <button class="btn btn-small btn-primary" type="button" data-continue-course="${esc(agent.slug)}">${next ? "继续下一节" : "已全部完成"}</button>
        </div>
        <div class="drawer-progress">
          <div class="mini-bar"><i style="width:${pct}%"></i></div>
          <span>${doneCount}/${lessons.length} · ${pct}%</span>
        </div>
        <div class="course-modules">
          ${course.modules.map((m, i) => `
            <section class="course-module">
              <header class="course-module-head">
                <span class="course-module-idx">${String(i + 1).padStart(2, "0")}</span>
                <div class="course-module-title">
                  <strong>${esc(m.title)}</strong>
                  <p>${esc(m.desc || "")}</p>
                </div>
                <span class="course-module-time">${m.lessons.length} 节 · ${m.minutes} 分钟</span>
              </header>
              <div class="course-lessons">
                ${m.lessons.map((l, j) => {
                  const done = state.progress.has(keyOf(agent.slug, l.id));
                  return `<div class="course-lesson ${done ? "done" : ""}">
                    <span class="course-lesson-idx">${done ? "✓" : `${i + 1}.${j + 1}`}</span>
                    <div class="course-lesson-main">
                      <strong>${esc(l.name)}</strong>
                      <p>${esc(l.summary)}</p>
                      <div class="course-lesson-meta">
                        <span class="level-pill level-${esc(l.level)}">${esc(l.level)}</span>
                        <span>${l.minutes} 分钟</span>
                        ${done ? `<span>已点亮</span>` : ""}
                      </div>
                    </div>
                    <button class="btn btn-small" type="button" data-open-feature="${esc(agent.slug)}|${esc(l.id)}">${done ? "复习" : "开始"}</button>
                  </div>`;
                }).join("")}
              </div>
              <div class="course-checkpoint"><strong>检查点</strong>${esc(m.checkpoint)}</div>
            </section>`).join("")}
        </div>
      </div>`;
  }

  function continueCourse(slug) {
    const agent = getAgent(slug);
    const course = agent?.course;
    if (!course) return;
    const next = course.modules
      .flatMap((m) => m.lessons)
      .find((l) => !state.progress.has(keyOf(slug, l.id)));
    if (!next) {
      toast("这门课程已经全部点亮");
      return;
    }
    openAgent(slug, next.id);
  }

  function officialSection(agent) {
    const o = agent.official || {};
    const docs = Array.isArray(o.docs) ? o.docs : o.docs ? [o.docs] : [];
    const link = (label, url) => url ? `<a class="btn btn-small" href="${esc(url)}" target="_blank" rel="noreferrer">${label} ↗</a>` : "";
    return `
      <div class="drawer-section">
        <h3><span class="num">SRC</span> 官方资料</h3>
        <p>本道场内容核对日期：<strong>${esc(fmtDate(agent.updatedAt))}</strong>，对应版本 <strong>${esc(agent.version || "unknown")}</strong>。版本迭代很快，动手前请再扫一眼官方文档。</p>
        <div class="install-box">
          <dl class="install-grid">
            <div class="install-row"><dt>官网</dt><dd>${o.site ? `<a href="${esc(o.site)}" target="_blank" rel="noreferrer">${esc(o.site)}</a>` : "—"}</dd></div>
            <div class="install-row"><dt>仓库</dt><dd>${o.repo ? `<a href="${esc(o.repo)}" target="_blank" rel="noreferrer">${esc(o.repo)}</a>` : "—"}</dd></div>
            <div class="install-row"><dt>Changelog</dt><dd>${o.changelog ? `<a href="${esc(o.changelog)}" target="_blank" rel="noreferrer">${esc(o.changelog)}</a>` : "—"}</dd></div>
            <div class="install-row"><dt>文档</dt><dd>${docs.length ? docs.map((u) => `<a href="${esc(u)}" target="_blank" rel="noreferrer">${esc(u)}</a>`).join("<br />") : "—"}</dd></div>
          </dl>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">
          ${link("官方文档", docs[0] || o.site)}
          ${link("源码仓库", o.repo)}
          ${link("更新日志", o.changelog)}
        </div>
      </div>
      <div class="drawer-section">
        <h3><span class="num">NOTE</span> 版本说明</h3>
        <p class="muted small">道场笔记由本项目根据各项目的官方公开资料整理，仅供学习。功能命名、命令与默认行为可能随版本变化；若与官方不一致，以官方为准。</p>
      </div>`;
  }

  function renderDrawerBody(agent) {
    const body = $("#drawer-body");
    if (!body) return;
    if (state.drawerTab === "install") body.innerHTML = installSection(agent);
    else if (state.drawerTab === "course") body.innerHTML = courseSection(agent);
    else if (state.drawerTab === "official") body.innerHTML = officialSection(agent);
    else body.innerHTML = featureList(agent);
  }

  function renderDrawer() {
    const agent = getAgent(state.activeAgent);
    if (!agent) return;
    drawerInner.innerHTML = `${drawerHeader(agent)}${drawerTabs(agent)}<div class="drawer-body" id="drawer-body"></div>`;
    renderDrawerBody(agent);
    if (state.openFeatureId) {
      const targetId = state.openFeatureId;
      state.openFeatureId = null;
      setTimeout(() => {
        const card = drawerInner.querySelector(`[data-feature-card="${CSS.escape(targetId)}"]`);
        card?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 60);
    }
  }

  function updateDrawerProgress(agent) {
    const p = agentProgress(agent);
    const label = drawerInner.querySelector("[data-drawer-progress]");
    if (label) label.textContent = `${p.done}/${p.total} · ${p.pct}%`;
    const bar = drawerInner.querySelector(".drawer-progress .mini-bar i");
    if (bar) bar.style.width = `${p.pct}%`;
  }

  function toggleFeature(agent, id) {
    const f = featureById(agent, id);
    if (!f) return;
    const key = keyOf(agent.slug, id);
    const wasDone = state.progress.has(key);
    if (wasDone) state.progress.delete(key);
    else state.progress.add(key);
    saveProgress();

    const card = drawerInner.querySelector(`[data-feature-card="${CSS.escape(id)}"]`);
    if (card) {
      card.classList.toggle("done", !wasDone);
      const check = card.querySelector(".feature-check");
      if (check) check.setAttribute("aria-pressed", String(!wasDone));
      const doneBtn = card.querySelector(".feature-done-btn");
      if (doneBtn) doneBtn.textContent = !wasDone ? "✓ 已点亮" : "点亮这项 · +20";
    }
    updateChrome();
    renderVillage();
    renderCourses();
    renderSearch();
    updateDrawerProgress(agent);
    toast(wasDone ? `已取消「${f.name}」` : `+${XP_PER_FEATURE} 修为 · 点亮「${f.name}」`);
  }

  /* ---------- toast ---------- */
  let toastTimer = 0;
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  /* ---------- copy ---------- */
  async function copyText(text, btn) {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await Promise.race([
          navigator.clipboard.writeText(text),
          new Promise((_, reject) => setTimeout(() => reject(new Error("clipboard timeout")), 600)),
        ]);
        ok = true;
      }
    } catch {
      /* 某些浏览器/无手势场景会拒绝或卡住，降级到 execCommand */
    }
    if (!ok) {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.append(ta);
        ta.select();
        ok = document.execCommand("copy");
        ta.remove();
      } catch {
        ok = false;
      }
    }
    if (btn) {
      const old = btn.textContent;
      btn.textContent = ok ? "已复制" : "复制失败";
      btn.classList.toggle("copied", ok);
      setTimeout(() => {
        btn.textContent = old;
        btn.classList.remove("copied");
      }, 1400);
    }
  }

  /* ---------- suggestions ---------- */
  function openSuggest() {
    const select = $("#suggest-agent");
    select.innerHTML = AGENTS.map((a) => `<option value="${esc(a.slug)}">${esc(a.name)}</option>`).join("") || `<option value="">—</option>`;
    $("#suggest-dialog").showModal();
    setTimeout(() => $("#suggest-form [name=name]")?.focus(), 30);
  }

  function addSuggestion(name, agentSlug, why) {
    const agent = getAgent(agentSlug);
    state.suggestions.unshift({
      id: `mine-${Date.now()}`,
      name,
      agentSlug,
      agentName: agent?.name || "未指定",
      level: "待评估",
      category: "村民推荐",
      summary: why || "村民希望后续文档更新时收录这个功能。",
      hot: 0,
      isNew: false,
      tags: ["村民推荐"],
    });
    saveSuggestions();
    state.tab = "mine";
    $$(".tab").forEach((t) => {
      const active = t.dataset.tab === "mine";
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
    });
    renderRecommendations();
    toast("已收进愿望单，保存在本机");
  }

  /* ---------- theme ---------- */
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(STORE.theme, theme); } catch {}
    $("#theme-toggle").setAttribute("aria-pressed", String(theme === "dark"));
  }
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(STORE.theme); } catch {}
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  }

  /* ---------- events ---------- */
  function bind() {
    document.addEventListener("click", (e) => {
      const openCourse = e.target.closest("[data-open-course]");
      if (openCourse) {
        openAgent(openCourse.dataset.openCourse, null, "course");
        return;
      }
      const continueBtn = e.target.closest("[data-continue-course]");
      if (continueBtn) {
        continueCourse(continueBtn.dataset.continueCourse);
        return;
      }
      const openAgentBtn = e.target.closest("[data-open-agent]");
      if (openAgentBtn) {
        openAgent(openAgentBtn.dataset.openAgent);
        return;
      }
      const openFeatureBtn = e.target.closest("[data-open-feature]");
      if (openFeatureBtn) {
        const [slug, id] = openFeatureBtn.dataset.openFeature.split("|");
        openAgent(slug, id);
        return;
      }
      const filter = e.target.closest("[data-filter-agent]");
      if (filter) {
        state.filterAgent = filter.dataset.filterAgent;
        renderFilters();
        renderSearch();
        return;
      }
      const tab = e.target.closest("[data-tab]");
      if (tab) {
        state.tab = tab.dataset.tab;
        $$(".tab").forEach((t) => {
          const active = t === tab;
          t.classList.toggle("active", active);
          t.setAttribute("aria-selected", String(active));
        });
        renderRecommendations();
        return;
      }
      const del = e.target.closest("[data-delete-suggestion]");
      if (del) {
        state.suggestions = state.suggestions.filter((s) => s.id !== del.dataset.deleteSuggestion);
        saveSuggestions();
        renderRecommendations();
        toast("已从愿望单移除");
        return;
      }
      if (e.target.closest("[data-close-drawer]")) {
        closeDrawer();
        return;
      }
      const drawerTab = e.target.closest("[data-drawer-tab]");
      if (drawerTab) {
        state.drawerTab = drawerTab.dataset.drawerTab;
        $$(".drawer-tab").forEach((t) => t.classList.toggle("active", t === drawerTab));
        const agent = getAgent(state.activeAgent);
        if (agent) renderDrawerBody(agent);
        return;
      }
      const level = e.target.closest("[data-level-filter]");
      if (level) {
        state.levelFilter = level.dataset.levelFilter;
        const agent = getAgent(state.activeAgent);
        if (agent) {
          const body = $("#drawer-body");
          if (body) body.innerHTML = featureList(agent);
        }
        return;
      }
      const toggle = e.target.closest("[data-toggle-feature]");
      if (toggle) {
        const card = toggle.closest(".feature-card");
        const isOpen = card.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        return;
      }
      const check = e.target.closest("[data-check-feature]");
      if (check) {
        const agent = getAgent(state.activeAgent);
        if (agent) toggleFeature(agent, check.dataset.checkFeature);
        return;
      }
      const copy = e.target.closest(".copy-btn");
      if (copy) {
        copyText(copy.dataset.copy, copy);
        return;
      }
    });

    $("#theme-toggle").addEventListener("click", () => {
      applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });

    $("#random-feature").addEventListener("click", () => {
      const all = allFeatures().filter((f) => !state.progress.has(keyOf(f.agentSlug, f.id)));
      if (!all.length) {
        toast(allFeatures().length ? "全部功能都点亮了，宗师！" : "资料还没准备好");
        return;
      }
      const f = all[Math.floor(Math.random() * all.length)];
      openAgent(f.agentSlug, f.id);
    });

    $("#daily-next").addEventListener("click", pickDaily);

    $("#search-input").addEventListener("input", (e) => {
      state.search = e.target.value;
      renderSearch();
    });

    $("#open-suggest").addEventListener("click", openSuggest);
    if (!AGENTS.length) $("#open-suggest").disabled = true;

    $("#suggest-form").addEventListener("submit", (e) => {
      if (e.submitter?.value === "cancel") return;
      e.preventDefault();
      const form = e.currentTarget;
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      if (!name) return;
      addSuggestion(name, String(fd.get("agent") || ""), String(fd.get("why") || "").trim());
      form.reset();
      $("#suggest-dialog").close();
    });

    backdrop.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !drawer.hidden && !$("#suggest-dialog").open) closeDrawer();
      const tag = document.activeElement?.tagName;
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(tag) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        $("#search-input").focus();
      }
    });

    window.addEventListener("hashchange", () => {
      if (!location.hash) closeDrawer();
    });
  }

  /* ---------- init ---------- */
  function init() {
    initTheme();
    loadLocal();
    bind();
    updateChrome();
    renderVillage();
    renderCourses();
    renderFilters();
    renderSearch();
    renderRecommendations();
    pickDaily();

    const params = new URLSearchParams(location.search);
    const initialAgent = params.get("agent");
    if (initialAgent && getAgent(initialAgent)) {
      const initialTab = ["features", "course", "install", "official"].includes(params.get("tab"))
        ? params.get("tab")
        : "features";
      openAgent(initialAgent, params.get("feature"), initialTab);
    }
  }

  init();
})();
