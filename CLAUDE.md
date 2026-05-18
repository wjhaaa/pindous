# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Taro 3.6 + React 18 微信小程序。
- **前端刷题**（核心新功能）：quiz-* 系列页面，216 道问答题，多个分类

## 常用命令

```bash
yarn dev:weapp              # 开发构建（NODE_ENV=production，watch 模式）
yarn build:weapp            # 生产构建
yarn typecheck              # TypeScript 类型检查（tsc --noEmit）
yarn lint                   # ESLint
```

### 题库生成

```bash
# 查看质量（不写文件），只跑第一批
npx tsx scripts/generate-category.ts <分类名> --dry-run

# 查看全部批次质量（不写文件）
npx tsx scripts/generate-category.ts <分类名> --all --dry-run

# 正式生成全部批次，覆盖写入文件
npx tsx scripts/generate-category.ts <分类名> --all

# 可用分类名
# javascript | browser-web-api | html-css | typescript
# react | taro-mini-program | engineering | scenario
```

> 生成前自动校验 ID、类型、难度等字段；`--all` 模式下所有批次通过后才一次性写入，中途失败不会产生残缺文件。需要配置 `DEEPSEEK_API_KEY` 环境变量。

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

### 题库生成 Prompt 设计原则

经 8 分类 × 216 题全量 dry-run 验证，以下规则有效压制 LLM「一本正经编 API」：

1. **禁止编造 API 与实现细节** — 不确定的 API 名称、方法签名换成概括性表述；框架/库内部实现只允许一句话概括，不允许展开逐步描述
2. **禁止具体版本号和日期** — 用「较新版本」「早期版本」等模糊表述替代
3. **答案长度硬上限 60-180 字** — 长度收紧后 LLM 不会为凑字数塞入编造细节
4. **选题过滤器** — 每道题必须通过高频度、实用性、可复述、友好度四层过滤
5. **明确禁止出题方向** — 源码细节、冷门 API、实验特性、微前端沙箱细节、SourceMap VLQ、Module Federation 深层原理等

### 生成脚本安全机制

`scripts/generate-category.ts` 的 `--all` 模式：
- 所有批次先收集，全部校验通过后才一次性覆写文件
- 任一批次失败 → `process.exit(1)`，原文件毫发无损
- 单批模式（不加 `--all`）直接覆写，用于小范围更新
