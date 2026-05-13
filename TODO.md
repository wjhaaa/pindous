# 2026-05-13 题库重构 & 全量生成

## 今日完成

### 1. 题库按 QUIZ.md 8 大类重组
- 从旧 6 分类结构重构为 QUIZ.md 定义的 8 大类
- 新增 `browser-web-api.ts`（浏览器与 Web API）和 `scenario.ts`（场景题）
- 旧题库全部覆盖，重新生成

### 2. 全量生成 216 题（全部 qa 型）

| 分类 | 题数 | 子类覆盖 |
|------|------|---------|
| JavaScript（语言核心） | 30 | 16 个子类 |
| 浏览器与 Web API | 20 | 10 个子类 |
| TypeScript | 25 | 15 个子类 |
| React | 30 | 19 个子类 |
| Vue | 28 | 16 个子类 |
| HTML/CSS | 28 | 18 个子类 |
| 工程化 | 40 | 19 个子类 |
| 场景题 | 15 | 6 个子类 |
| **总计** | **216** | |

### 3. 生成脚本优化
- `scripts/generate-category.ts`：按分类 + 分批生成
- 每批 ~10 题，避免 token 超限导致 JSON 截断
- 支持 `--all` 一次生成全部批次，支持追加模式自动去重
- 内置 3 次重试机制
- title/answer/explanation 字段自动转义

### 4. 类型检查通过
```
npx tsc --noEmit → 零错误
```

---

## 常用命令

```bash
# 生成单分类（仅第 1 批）
npx tsx scripts/generate-category.ts react

# 生成全部分类（含所有批次）
npx tsx scripts/generate-category.ts react --all

# 类型检查
npx tsc --noEmit

# 统计题量
grep -c "id:" src/mock/questions/*.ts | grep -v index.ts
```

## 后续计划

- 各分类可继续跑 `--all` 补充更多题（当前 batche 数为上限）
- 定期审查题目质量，淘汰质量不佳的题
