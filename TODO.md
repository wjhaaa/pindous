# 2026-05-12 复盘 & 后续计划

## 今日完成

### 1. 题库丰富化
- 题库从 **18 题 → 105 题**（+87 题）
- 从单文件 `questions.ts` 拆分为按分类的目录结构：
  ```
  src/mock/questions/
    ├── index.ts        # 聚合导出
    ├── javascript.ts   # 23 题
    ├── react.ts        # 19 题
    ├── vue.ts          # 17 题
    ├── html-css.ts     # 19 题
    ├── engineering.ts  # 15 题
    └── typescript.ts   # 12 题（新增分类）
  ```
- 覆盖 JS/React/Vue/CSS/工程化/TypeScript 六大分类的高频面试题

### 2. 自动化更新脚本
- 创建 `scripts/update-questions.ts`，跑一次生成 ~10 道新题
- LLM 从 Claude API 切换到 **DeepSeek V4 Pro**（`deepseek-v4-pro`）
- 启用 DeepSeek JSON Mode（`response_format: { type: "json_object" }`）+ `temperature: 0`，输出稳定性从 **33% → 100%**
- 三层去重：Prompt 告知已有题 → ID/标题校验 → typecheck 兜底
- 使用方式：`export DEEPSEEK_API_KEY=xxx` 写入 `.env`，然后 `yarn update-questions`
- `.env` 已加入 `.gitignore`，不会提交

### 3. 基础设施
- 原有 4 个页面 import 路径 `@/mock/questions` 保持兼容，零改动

---

## 已知问题

### extractQuestions 正则精度不足
`scripts/update-questions.ts` 中 `extractQuestions` 函数用 `/\{[^}]+\}/g` 提取题目，当题目 answer/explanation 中包含 `{...}` 嵌套花括号（如 `{ 0: 'Red' }`）时，该题会被跳过。导致：
- 脚本报告的「已找到 X 道」偏低（实际 105 题，脚本只读到 ~90+）
- 存在 ID 碰撞风险（脚本没读到的题，LLM 不知道已存在）

**建议明天修**：改为直接匹配 `id:\s*"(...)"` 和 `title:\s*"(...)"` 正则，不依赖 `{...}` 块匹配。

---

## 明天计划

### 优先级 P0：修 extraction 正则
- 用 `id:\s*"([^"]+)"` 全局匹配替代 `\{[^}]+\}` 块匹配
- 验证 `getAllExisting()` 读到 105 题而非 ~90 题

### 优先级 P1：跑 2-3 轮更新，题库涨到 ~130 题
- `yarn update-questions` 跑 2-3 次
- 每轮审查新增题目质量，剔除不太好的
- 目标：JS 25+/React 20+/Vue 18+/CSS 20+/工程化 18+/TS 15+

### 优先级 P2：部分分类缺 single 题型
- 目前大部分题目是 qa 问答型，single 选择题偏少（仅 css-001、react-016、vue-011、eng-013 等少数）
- 考虑在更新脚本 prompt 中指示：每轮至少生成 3-4 道 single 选择题

### 优先级 P3：定时自动化
- 本地 cron 每 2 天跑一次 `yarn update-questions`
- 或者手动跑，每次提交一版

### 后续方向（不紧急）
- 题库数据从 TS 文件迁移到 JSON/YAML（方便非开发者编辑）
- 题目难度分布平衡（目前 2 级偏多，1 和 3 级偏少）
- 接入 GitHub Actions 自动提 PR

---

## 常用命令备忘

```bash
# 更新题库
yarn update-questions

# 类型检查
npx tsc --noEmit

# 统计题量
grep -c "id:" src/mock/questions/*.ts | grep -v index.ts
```
