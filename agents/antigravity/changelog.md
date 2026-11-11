# Antigravity · 版本与更新

> 当前核实版本：2.31.0　核对日期：2026-11-11

**官方更新日志**：https://antigravity.google/docs/changelog

## 说明

本文件不复制未逐条核实的版本历史，避免把过期或推测的条目当成事实。需要追溯具体版本时，请直接查看官方 changelog / releases。

当前基线：

- 版本：2.31.0
- 本仓库最后核对：2026-11-11
- 功能数据：`features.json`（13 项）
- 教程：`README.md`、`features.md`

## 每日巡检

`npm run update` 会检查 `docs/sources.json` 中登记的官方页面；若内容哈希变化，会在 `docs/UPDATE_LOG.md` 记录。随后按以下顺序更新：

1. 打开官方 changelog，确认影响范围；
2. 修订 `features.json` 中的版本、命令、步骤与链接；
3. 运行 `npm run build` 重新生成文档与网页数据。
