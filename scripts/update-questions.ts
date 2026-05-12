import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

// 自动加载 .env 文件（不依赖 dotenv 包）
(function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) {
      process.env[key] = val;
    }
  }
})();

const QUESTIONS_DIR = path.join(__dirname, "..", "src", "mock", "questions");

const CATEGORY_FILES = [
  "javascript.ts",
  "react.ts",
  "vue.ts",
  "html-css.ts",
  "engineering.ts",
  "typescript.ts",
] as const;

interface ExistingQuestion {
  id: string;
  title: string;
  category: string;
}

interface NewQuestion {
  id: string;
  title: string;
  type: "single" | "qa";
  options?: string[];
  answer: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
  tags: string[];
  category: string;
}

// ── 1. 读取现有题目 ──────────────────────────────────

function extractQuestions(filePath: string): ExistingQuestion[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const results: ExistingQuestion[] = [];
  // 匹配每个题目对象中的 id、title、category
  const questionBlocks = content.match(/\{[^}]+\}/g);
  if (!questionBlocks) return results;

  for (const block of questionBlocks) {
    const idMatch = block.match(/id:\s*"([^"]+)"/);
    const titleMatch = block.match(/title:\s*"([^"]*)"/);
    const categoryMatch = block.match(/category:\s*"([^"]+)"/);
    if (idMatch && titleMatch) {
      results.push({
        id: idMatch[1],
        title: titleMatch[1],
        category: categoryMatch ? categoryMatch[1] : "",
      });
    }
  }
  return results;
}

function getAllExisting(): {
  questions: ExistingQuestion[];
  counts: Record<string, number>;
} {
  const allQuestions: ExistingQuestion[] = [];
  const counts: Record<string, number> = {};

  for (const fileName of CATEGORY_FILES) {
    const filePath = path.join(QUESTIONS_DIR, fileName);
    if (!fs.existsSync(filePath)) continue;

    const questions = extractQuestions(filePath);

    // 从文件名推断分类名
    const categoryMap: Record<string, string> = {
      "javascript.ts": "JavaScript",
      "react.ts": "React",
      "vue.ts": "Vue",
      "html-css.ts": "HTML/CSS",
      "engineering.ts": "工程化",
      "typescript.ts": "TypeScript",
    };
    const category = categoryMap[fileName] || fileName;

    for (const q of questions) {
      q.category = q.category || category;
    }

    allQuestions.push(...questions);
    counts[category] = questions.length;
  }

  return { questions: allQuestions, counts };
}

// ── 2. 调用 DeepSeek 生成新题 ──────────────────────────────────

function buildPrompt(existing: { questions: ExistingQuestion[]; counts: Record<string, number> }): string {
  const existingSummary = existing.questions
    .map((q) => `[${q.id}] ${q.title}`)
    .join("\n");

  const countsSummary = Object.entries(existing.counts)
    .map(([cat, count]) => `- ${cat}: ${count} 题`)
    .join("\n");

  // 优先补充题目较少的分类
  const priorityCategories = Object.entries(existing.counts)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([cat]) => cat)
    .join("、");

  return `你是一位资深前端面试官。请为题库生成 **8-10 道**新的前端面试题。

## 必须严格遵守

1. **绝不重复**：以下是一份已有的题目清单，你生成的题目标题和 ID 都不能与已有题目相同或高度相似。
2. **质量要求**：题目必须是 2025-2026 年国内前端面试中真实高频出现的问题。答案准确，解析通俗易懂但有深度。
3. **输出格式**：你必须输出一个合法的 JSON 对象，结构为 { "questions": [...] }，不得包含任何 markdown 标记或其他文字。

每道题的 JSON Schema：
{
  "id": "分类前缀-数字序号（必填）",
  "title": "题目标题（必填）",
  "type": "single 或 qa（必填）",
  "options": ["选项A", "选项B", "选项C", "选项D"],
  "answer": "正确答案（必填）",
  "explanation": "解析文字（必填）",
  "difficulty": 1或2或3（必填）,
  "tags": ["标签（必填）"],
  "category": "分类名（必填）"
}

- single 类型必须提供 options 数组（4 个选项），answer 为正确选项的完整文本。
- qa 类型不需要 options 字段，answer 为完整的回答文字。
- id 格式：JavaScript 用 js-xxx、React 用 react-xxx、Vue 用 vue-xxx、HTML/CSS 用 css-xxx 或 html-xxx、工程化用 eng-xxx、TypeScript 用 ts-xxx。序号在已有最大序号基础上递增。
- difficulty: 1=简单(基础概念记忆), 2=中等(需要理解原理), 3=困难(深入原理或应用)

## 已有题目（共 ${existing.questions.length} 道，切勿重复）

${existingSummary}

## 各分类题量

${countsSummary}

## 题目分配要求

- 优先补充题量较少的分类：${priorityCategories}
- 各分类要有覆盖，每个分类至少 1 道
- TypeScript 分类也需要补充

## 输出

严格按此 json 格式输出：`;
}

async function callDeepSeek(prompt: string): Promise<NewQuestion[]> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("请设置环境变量 DEEPSEEK_API_KEY（从 https://platform.deepseek.com/api_keys 获取）");
  }

  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-v4-pro",
      max_tokens: 16384,
      temperature: 0,
      stream: false,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            '你必须严格按照用户要求的 JSON Schema 输出，只输出 JSON 对象，不得包含任何其他文字。',
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`DeepSeek API 返回错误 ${response.status}: ${errBody.slice(0, 500)}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content?.trim() || "";

  if (!text) {
    throw new Error(`DeepSeek 返回了空内容。完整响应：${JSON.stringify(data).slice(0, 500)}`);
  }

  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch (e: any) {
    const errPos = e.message.match(/position (\d+)/)?.[1];
    const pos = errPos ? parseInt(errPos) : 500;
    throw new Error(
      `JSON 解析失败（位置 ${pos}）：${e.message}\n\n` +
      `上下文（解析失败位置前后 200 字符）：\n${text.slice(Math.max(0, pos - 200), pos + 200)}\n\n` +
      `完整响应结尾 300 字符：\n...${text.slice(-300)}`
    );
  }

  const questions = parsed?.questions;
  if (!Array.isArray(questions)) {
    throw new Error(
      `DeepSeek 返回的 JSON 中缺少 questions 数组。keys: ${Object.keys(parsed || {}).join(", ")}`
    );
  }

  return questions;
}

// ── 3. 校验新题 ──────────────────────────────────

function validateNewQuestions(
  newQuestions: NewQuestion[],
  existing: ExistingQuestion[]
): { valid: NewQuestion[]; errors: string[] } {
  const errors: string[] = [];
  const valid: NewQuestion[] = [];
  const existingIds = new Set(existing.map((q) => q.id));
  const existingTitles = existing.map((q) => q.title.toLowerCase().trim());
  const usedIds = new Set<string>();

  for (let i = 0; i < newQuestions.length; i++) {
    const q = newQuestions[i];
    const itemLabel = `第 ${i + 1} 题 "${q?.title || "无标题"}"`;

    // 必填字段检查
    if (!q.id || !q.title || !q.answer || !q.explanation || !q.category) {
      errors.push(`${itemLabel}：缺少必填字段 (id/title/answer/explanation/category)`);
      continue;
    }

    if (q.type !== "single" && q.type !== "qa") {
      errors.push(`${itemLabel}：type 必须是 single 或 qa`);
      continue;
    }

    if (q.type === "single" && (!q.options || q.options.length !== 4)) {
      errors.push(`${itemLabel}：single 类型必须提供 4 个 options`);
      continue;
    }

    if (![1, 2, 3].includes(q.difficulty)) {
      errors.push(`${itemLabel}：difficulty 必须是 1/2/3`);
      continue;
    }

    // ID 重复检查（与已有题目）
    if (existingIds.has(q.id)) {
      errors.push(`${itemLabel}：ID "${q.id}" 与已有题目重复`);
      continue;
    }

    // ID 重复检查（本批次内）
    if (usedIds.has(q.id)) {
      errors.push(`${itemLabel}：ID "${q.id}" 与本批次其他题目重复`);
      continue;
    }

    // 标题相似度检查
    const normalizedTitle = q.title.toLowerCase().trim();
    for (const existingTitle of existingTitles) {
      if (normalizedTitle === existingTitle) {
        errors.push(`${itemLabel}：标题与已有题目完全相同`);
        break;
      }
      // 简单相似度：标题关键词重叠超过 80%
      const overlap = [...normalizedTitle].filter((c) => existingTitle.includes(c)).length;
      const similarity = overlap / Math.max(normalizedTitle.length, existingTitle.length);
      if (similarity > 0.85 && normalizedTitle.length > 8) {
        errors.push(`${itemLabel}：标题与已有题目 "${existingTitle}" 高度相似（${(similarity * 100).toFixed(0)}%）`);
        break;
      }
    }
    // 如果因为相似度被标记，跳过
    if (errors.length > 0 && errors[errors.length - 1].includes(itemLabel)) {
      continue;
    }

    usedIds.add(q.id);
    valid.push(q);
  }

  return { valid, errors };
}

// ── 4. 写入分类文件 ──────────────────────────────────

const CATEGORY_FILE_MAP: Record<string, string> = {
  JavaScript: "javascript.ts",
  React: "react.ts",
  Vue: "vue.ts",
  "HTML/CSS": "html-css.ts",
  HTML: "html-css.ts",
  CSS: "html-css.ts",
  工程化: "engineering.ts",
  TypeScript: "typescript.ts",
};

function appendToCategoryFile(question: NewQuestion): void {
  const fileName = CATEGORY_FILE_MAP[question.category];
  if (!fileName) {
    throw new Error(`未知的分类: ${question.category}`);
  }

  const filePath = path.join(QUESTIONS_DIR, fileName);
  let content = fs.readFileSync(filePath, "utf-8");

  // 找到最后一个 ]; 并在其前面插入
  const lastCloseIndex = content.lastIndexOf("];");
  if (lastCloseIndex === -1) {
    throw new Error(`无法在 ${fileName} 中找到数组结束标记 ];`);
  }

  // 构建题目对象的字符串（手动格式化为与现有代码风格一致）
  const hasOptions =
    question.type === "single" && question.options && question.options.length > 0;

  let questionStr = `  {\n`;
  questionStr += `    id: "${question.id}",\n`;
  questionStr += `    title: "${question.title}",\n`;
  questionStr += `    type: "${question.type}",\n`;

  if (hasOptions) {
    questionStr += `    options: ${JSON.stringify(question.options)},\n`;
  }

  questionStr += `    answer: "${question.answer.replace(/"/g, '\\"')}",\n`;
  questionStr += `    explanation: "${question.explanation.replace(/"/g, '\\"')}",\n`;
  questionStr += `    difficulty: ${question.difficulty},\n`;
  questionStr += `    tags: ${JSON.stringify(question.tags)},\n`;
  questionStr += `    category: "${question.category}",\n`;
  questionStr += `  },`;

  // 在最后一个 ]; 前插入
  const before = content.slice(0, lastCloseIndex);
  const after = content.slice(lastCloseIndex);

  // 确保前面有换行
  const insertContent = before.endsWith("\n") ? questionStr + "\n" : "\n" + questionStr + "\n";

  content = before + insertContent + after;
  fs.writeFileSync(filePath, content, "utf-8");
}

// ── 5. 主流程 ──────────────────────────────────

async function main() {
  console.log("📋 读取现有题库…");
  const existing = getAllExisting();

  console.log(`   已找到 ${existing.questions.length} 道题目`);
  console.log(`   分类分布: ${JSON.stringify(existing.counts)}`);
  console.log("");

  console.log("🤖 调用 DeepSeek 生成新题…");
  const prompt = buildPrompt(existing);
  const rawQuestions = await callDeepSeek(prompt);

  console.log(`   DeepSeek 返回了 ${rawQuestions.length} 道题`);
  console.log("");

  console.log("🔍 校验新题目…");
  const { valid, errors } = validateNewQuestions(rawQuestions, existing.questions);

  if (errors.length > 0) {
    console.log(`   ⚠️  ${errors.length} 道题校验未通过：`);
    for (const err of errors) {
      console.log(`      - ${err}`);
    }
  }
  console.log(`   ✅ ${valid.length} 道题通过校验`);
  console.log("");

  if (valid.length === 0) {
    console.log("❌ 没有有效题目可写入，终止。");
    process.exit(1);
  }

  console.log("📝 写入分类文件…");
  const byCategory: Record<string, NewQuestion[]> = {};
  for (const q of valid) {
    if (!byCategory[q.category]) byCategory[q.category] = [];
    byCategory[q.category].push(q);
  }

  for (const [category, questions] of Object.entries(byCategory)) {
    for (const q of questions) {
      appendToCategoryFile(q);
    }
    console.log(`   ${category}: +${questions.length} 题`);
  }
  console.log("");

  console.log("🔨 运行 TypeScript 类型检查…");
  try {
    execSync("npx tsc --noEmit", {
      cwd: path.join(__dirname, ".."),
      stdio: "pipe",
      timeout: 60000,
    });
    console.log("   ✅ 类型检查通过");
  } catch (e: any) {
    const stderr = e.stderr?.toString() || e.message;
    console.log(`   ❌ 类型检查失败，请检查新题目：\n${stderr.slice(0, 1000)}`);
    process.exit(1);
  }

  console.log("");
  console.log("🎉 题库更新完成！");

  // 打印新增题目摘要
  console.log("");
  console.log("── 新增题目摘要 ──");
  for (const q of valid) {
    const diffLabel = { 1: "简单", 2: "中等", 3: "困难" }[q.difficulty];
    console.log(`  [${q.id}] ${q.title} (${diffLabel})`);
  }
}

main().catch((err) => {
  console.error("❌ 更新失败:", err.message);
  process.exit(1);
});
