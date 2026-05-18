# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 项目概述

Taro 3.6 + React 18 微信小程序。代码库包含两套功能：
- **拼豆作品展示**（原始功能）：gallery、generator、favorite、detail 等页面
- **前端刷题**（核心新功能）：quiz-* 系列页面，216 道问答题，多个分类

## 常用命令

```bash
yarn dev:weapp              # 开发构建（NODE_ENV=production，watch 模式）
yarn build:weapp            # 生产构建
yarn typecheck              # TypeScript 类型检查（tsc --noEmit）
yarn lint                   # ESLint
yarn generate-category      # 调用 DeepSeek API 生成题库
```

## 关键文件

| 文件 | 用途 |
|------|------|
| `src/app.config.ts` | 页面路由注册、TabBar 配置 |
| `QUIZ.md` | 题库 8 大分类的知识体系定义 |
| `src/mock/questions/index.ts` | 题库聚合导出（216 题） |
| `src/mock/questions/*.ts` | 8 个分类文件，每个导出一个题数组 |
| `scripts/generate-category.ts` | DeepSeek API 批量生成题目脚本 |

## 架构

### 刷题功能页面

| 页面 | 路由参数 | 说明 |
|------|----------|------|
| `quiz-home` | — | 首页：动态分类网格、统计卡片、每日一题 |
| `quiz` | `?category=X`、`?mode=daily&id=X`、`?mode=review&id=X` | 答题页：展开答案 → 标记已学 → 收藏/标记 → 下一题 |
| `quiz-favorite` | — | 收藏列表，点击进入 review 模式 |
| `quiz-flagged` | — | 标记（待审查）列表，点击进入 review 模式 |
| `quiz-wrong` | — | 错题列表（预留） |
| `quiz-profile` | — | 个人页：统计、分类进度、重置、快捷入口 |

### 本地存储（Taro Storage Sync）

| Key | 类型 | 说明 |
|-----|------|------|
| `quiz_progress` | `{ totalQuestions, learnedCount, learningDays, lastLearningDate, todayCount }` | 学习进度 |
| `quiz_learned` | `string[]` | 已学题目 ID 列表 |
| `quiz_favorites` | `string[]` | 收藏题目 ID 列表 |
| `quiz_flagged` | `string[]` | 标记/待审查题目 ID 列表 |

### 数据流

1. `quiz-home` 点击分类 → `quiz?category=X` 进入答题
2. `quiz` 展开答案时自动 `markAsLearned()`，写入 `quiz_learned` 和 `quiz_progress`
3. 收藏/标记切换，直接读写对应 storage key
4. `quiz-profile` / `quiz-home` 读取所有 storage key 展示统计数据

### 题目类型

```typescript
interface Question {
  id: string;           // "js-001", "react-005" 等
  title: string;        // 题目描述
  type: "qa";           // 全部为问答型（当前无选择题）
  answer: string;       // 正确答案
  explanation: string;  // 解析
  difficulty: 1 | 2 | 3;
  tags: string[];
  category: string;     // 8 个分类之一
}
```

## 交互约定

- 功能实现从用户实际使用视角出发（用户同时在开发和刷题使用此产品）
- LLM 生成 JSON 遇到格式错误时用重试（3 次），不要对 raw output 写正则清洗
- 内容/数据结构发生重大变化时，直接全量重新生成，不做迁移
- 工具链问题有 workaround 就先推进主线，不阻塞在工具链研究上
