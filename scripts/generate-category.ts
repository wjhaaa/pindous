import * as fs from "fs";
import * as path from "path";

// 自动加载 .env
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
    if (key && !process.env[key]) process.env[key] = val;
  }
})();

const QUESTIONS_DIR = path.join(__dirname, "..", "src", "mock", "questions");

// ── 分类定义 ──────────────────────────────────

interface SubCatBatch {
  subCategories: string;
  count: number;
}

interface CategoryDef {
  fileName: string;
  varName: string;
  idPrefix: string;
  displayName: string;
  batches: SubCatBatch[];
}

const CATEGORIES: Record<string, CategoryDef> = {
  javascript: {
    fileName: "javascript.ts", varName: "javascriptQuestions", idPrefix: "js",
    displayName: "JavaScript 核心高频",
    batches: [
      { count: 10,
        subCategories: `1. 数据类型与类型判断 — 原始类型/引用类型、typeof、instanceof、Object.prototype.toString、null/undefined、==/===、隐式转换
2. 作用域与执行机制 — 执行上下文、调用栈、变量提升、词法作用域、作用域链、TDZ、var/let/const
3. 闭包 — 形成原因、常见用途、数据私有化、循环闭包、内存泄漏
4. this 与函数调用 — 默认/隐式/显式/new绑定、箭头函数this、call/apply/bind区别
5. 原型与继承 — prototype/__proto__、原型链、constructor、instanceof、class/extends/super、寄生组合继承`,
      },
      { count: 10,
        subCategories: `1. 异步编程 — Promise状态、链式调用、all/race/allSettled/any、async/await、异步错误捕获、并发请求控制、请求取消
2. Event Loop — 宏任务、微任务、Promise.then、setTimeout、async/await执行顺序、浏览器渲染与任务队列
3. 数组与对象常用能力 — map/filter/reduce、some/every/find、sort、flat/flatMap、Object.assign/create/freeze
4. 深浅拷贝 — 浅拷贝、深拷贝、JSON限制、structuredClone、循环引用处理
5. ES6+ 常用特性 — 解构、展开运算符、模板字符串、Map/Set、WeakMap、Symbol、Proxy/Reflect、可选链、空值合并`,
      },
      { count: 10,
        subCategories: `1. 模块化 — CommonJS、ES Module、import/export、动态import、Tree Shaking条件、循环引用表现
2. 错误处理与健壮性 — try/catch/finally、Promise错误传播、unhandledrejection、业务错误与系统错误
3. 常见手写题 — 防抖、节流、bind、new、instanceof、Promise.all、深拷贝、发布订阅
4. 数字与精度 — 0.1+0.2、IEEE754、安全整数、BigInt、金额计算
5. 内存与性能意识 — 垃圾回收、定时器清理、事件监听清理、闭包引用释放、常见内存泄漏`,
      },
    ],
  },

  "browser-web-api": {
    fileName: "browser-web-api.ts", varName: "browserWebApiQuestions", idPrefix: "web",
    displayName: "浏览器、网络与安全",
    batches: [
      { count: 8,
        subCategories: `1. DOM 与事件 — DOM树、DOM操作性能、冒泡/捕获、事件委托、addEventListener参数、passive/once/capture
2. 浏览器渲染机制 — HTML解析、CSSOM、Render Tree、Layout、Paint、Composite、回流重绘、合成层
3. 浏览器存储 — Cookie、localStorage、sessionStorage、IndexedDB基本场景、Cookie安全属性、SameSite
4. 浏览器缓存 — 强缓存、协商缓存、Cache-Control、Expires、ETag、Last-Modified、刷新页面缓存行为`,
      },
      { count: 8,
        subCategories: `1. HTTP 基础 — 状态码、GET/POST、RESTful、请求头响应头、HTTP/1.1与HTTP/2、HTTPS基本流程
2. 跨域 — 同源策略、CORS、简单请求、预检请求、withCredentials、代理转发、JSONP
3. 网络请求 — XHR、Fetch、Axios封装、AbortController、请求重试、超时处理、token失效处理`,
      },
      { count: 8,
        subCategories: `1. 浏览器安全 — XSS、CSRF、CSP、iframe sandbox、输入输出转义、token存储安全
2. 性能 API 与观察器 — Performance API、IntersectionObserver、ResizeObserver、MutationObserver、图片懒加载、曝光统计
3. 常用 Web API — File API、Clipboard API、Web Worker、Service Worker基本概念、History API、Location`,
      },
    ],
  },

  "html-css": {
    fileName: "html-css.ts", varName: "htmlCssQuestions", idPrefix: "css",
    displayName: "HTML/CSS 与移动端适配",
    batches: [
      { count: 8,
        subCategories: `1. HTML 基础 — 语义化标签、meta viewport、script async/defer/module、表单基础、常见input类型
2. 可访问性基础 — alt、label、ARIA基本作用、tabindex、键盘可操作、颜色对比度
3. 盒模型与布局 — 标准盒模型、IE盒模型、box-sizing、BFC、Flex、Grid、水平垂直居中`,
      },
      { count: 8,
        subCategories: `1. 定位与层叠 — position、z-index、层叠上下文、sticky、fixed在移动端的注意事项
2. 响应式与移动端适配 — media query、rem/em/vw/vh、clamp、1px问题、safe-area-inset、横竖屏适配
3. CSS 常见效果 — 文字省略、多行省略、三角形、毛玻璃、固定宽高比、吸顶、遮罩层`,
      },
      { count: 8,
        subCategories: `1. 动画与交互 — transition、animation、transform、will-change、FLIP基本思想、动画性能优化
2. CSS 变量与主题 — CSS Variables、动态主题、深色模式、多主题切换、设计令牌
3. CSS 工程化与性能 — Sass/Less、CSS Modules、CSS-in-JS、Tailwind CSS、BEM、样式隔离、回流重绘、content-visibility、contain`,
      },
    ],
  },

  typescript: {
    fileName: "typescript.ts", varName: "typescriptQuestions", idPrefix: "ts",
    displayName: "TypeScript 实战",
    batches: [
      { count: 8,
        subCategories: `1. 类型基础 — 原始类型、数组元组、字面量类型、联合/交叉类型、any/unknown/never/void、类型断言
2. interface 与 type — 使用场景、扩展方式、声明合并、项目中如何选择
3. 类型收窄 — typeof、instanceof、in、switch、自定义类型守卫、可辨识联合类型`,
      },
      { count: 8,
        subCategories: `1. 泛型 — 泛型函数、泛型接口、泛型约束、泛型默认值、组件和请求中的泛型
2. 常用高级类型 — keyof、typeof、索引访问类型、映射类型、条件类型、infer、模板字面量类型
3. 工具类型 — Partial、Required、Readonly、Pick、Omit、Record、Exclude、Extract、ReturnType、Parameters、Awaited`,
      },
      { count: 8,
        subCategories: `1. React + TypeScript — Props类型、children类型、useState/useRef类型、事件类型、forwardRef、组件泛型
2. 接口与数据建模 — 接口响应类型、分页类型、表单类型、列表项类型、枚举替代方案、后端字段可空处理
3. TS 工程配置与实践 — tsconfig、strict、strictNullChecks、paths、baseUrl、.d.ts、避免滥用any、unknown、as const、satisfies、API类型自动生成`,
      },
    ],
  },

  react: {
    fileName: "react.ts", varName: "reactQuestions", idPrefix: "react",
    displayName: "React 与 Hooks",
    batches: [
      { count: 10,
        subCategories: `1. 组件基础 — 函数组件、Props、State、状态提升、受控/非受控组件、条件渲染、列表渲染
2. Hooks 基础 — useState、useEffect、useRef、useMemo、useCallback、useReducer、useContext、自定义Hook
3. useEffect 高频问题 — 依赖数组、清理函数、闭包陷阱、请求竞态、无限循环、useEffect与useLayoutEffect`,
      },
      { count: 10,
        subCategories: `1. 渲染与更新机制 — Render阶段、Commit阶段、批处理、StrictMode、React.memo、状态更新异步表现
2. 虚拟 DOM 与 Diff — Virtual DOM、Diff基本策略、key作用、为什么不建议用index、列表更新问题
3. 组件通信与状态管理 — props、callback、Context、ref、状态提升、发布订阅、Redux Toolkit、Zustand、服务端状态与客户端状态`,
      },
      { count: 10,
        subCategories: `1. 请求、表单与错误处理 — 请求封装、loading/error/empty、请求竞态、缓存失效、受控表单、动态表单、Error Boundary
2. 性能优化 — 减少重复渲染、useMemo/useCallback边界、React.memo、懒加载、虚拟列表、图片懒加载、Profiler
3. 路由、React 18 与组件设计 — BrowserRouter/HashRouter、动态路由、权限路由、自动批处理、useTransition、useDeferredValue、Suspense、组件拆分、hooks抽象、通用组件API`,
      },
    ],
  },

  "taro-mini-program": {
    fileName: "taro-mini-program.ts", varName: "taroMiniProgramQuestions", idPrefix: "taro",
    displayName: "Taro / 小程序开发",
    batches: [
      { count: 8,
        subCategories: `1. 小程序基础 — 页面结构、app/page生命周期、页面路由、页面栈、分包、tabBar
2. Taro 与 React — Taro编译到小程序的思路、Taro组件差异、Hooks使用、路由跳转、Storage、request
3. 页面与组件通信 — 父子通信、页面参数传递、事件回调、自定义组件设计、跨页面状态同步（Context/Redux/Zustand/Storage 等常见方案）`,
      },
      { count: 8,
        subCategories: `1. 小程序数据与缓存 — Taro Storage Sync、异步Storage、登录态缓存、本地学习进度、缓存失效策略
2. 小程序请求与登录 — Taro.login、token管理、请求封装、错误提示、loading、重试与超时
3. 小程序性能优化 — 首屏加载、分包加载、图片优化、长列表优化、减少不必要渲染、包体积优化`,
      },
      { count: 8,
        subCategories: `1. 小程序样式与适配 — rpx、安全区域、不同机型适配、自定义导航栏、主题色、暗色模式
2. 小程序常见能力 — 授权、分享、文件上传、图片预览、下拉刷新、上拉加载、空状态与错误态
3. Taro 工程与项目实战 — 环境变量、页面注册、构建配置、多端兼容、调试工具、收藏功能、学习进度统计、每日一题、列表筛选、详情页跳转、本地mock`,
      },
    ],
  },

  engineering: {
    fileName: "engineering.ts", varName: "engineeringQuestions", idPrefix: "eng",
    displayName: "前端工程化与调试",
    batches: [
      { count: 9,
        subCategories: `1. 构建工具 — Webpack基本流程、Loader、Plugin、Vite基本原理、esbuild、Tree Shaking、Code Splitting
2. 包管理 — npm/yarn/pnpm、package.json、semver、lock文件、dependencies/devDependencies、peerDependencies
3. 开发规范 — ESLint、Prettier、Husky、lint-staged、commitlint、TypeScript类型检查`,
      },
      { count: 9,
        subCategories: `1. Git 工作流 — merge、rebase、squash、cherry-pick、revert、冲突解决、Code Review
2. 环境与配置 — 环境变量、dev/test/prod、代理配置、publicPath、构建产物分析、source map基本用途
3. 测试 — 单元测试、组件测试、E2E、Jest、Vitest、Playwright、Mock数据`,
      },
      { count: 9,
        subCategories: `1. 性能优化 — 首屏优化、资源压缩、CDN、Gzip/Brotli、懒加载、预加载、Core Web Vitals
2. 监控与调试 — Chrome DevTools、Network、Performance、Lighthouse、Sentry、错误上报、性能埋点
3. CI/CD 基础 — GitHub Actions、自动检查、自动构建、自动部署、回滚、灰度发布基本概念`,
      },
      { count: 9,
        subCategories: `1. Node.js 基础 — Node运行环境、npm scripts、fs/path基本使用、Node Event Loop、Stream、前端脚本工具
2. SSR/SSG 基础 — CSR、SSR、SSG、Hydration、首屏性能、SEO影响
3. 架构与协作 — 目录结构、模块边界、组件库、权限系统、埋点系统、技术方案设计`,
      },
    ],
  },

  scenario: {
    fileName: "scenario.ts", varName: "scenarioQuestions", idPrefix: "sc",
    displayName: "业务场景与面试表达",
    batches: [
      { count: 8,
        subCategories: `1. 接口请求场景 — 请求封装、token过期、重复请求、请求竞态、loading管理、错误提示、接口降级
2. 列表与分页场景 — 分页加载、下拉刷新、上拉加载、搜索筛选、空状态、骨架屏、长列表优化
3. 表单场景 — 表单校验、动态表单、表单回显、防重复提交、文件上传、编辑与新增复用`,
      },
      { count: 8,
        subCategories: `1. 权限场景 — 登录态、路由权限、按钮权限、菜单权限、角色权限、权限数据缓存
2. 组件设计场景 — 弹窗、列表、表单、选择器、业务hooks、组件API设计
3. 性能场景 — 首屏慢、白屏、页面卡顿、图片过大、包体积过大、长任务、内存泄漏`,
      },
      { count: 8,
        subCategories: `1. 稳定性场景 — 错误边界、异常兜底、请求失败重试、监控上报、回滚方案、灰度发布
2. 协作场景 — Code Review、技术方案、需求拆解、排期评估、后端联调、带新人
3. 项目复盘与表达 — 项目难点、性能优化经历、组件封装经历、工程化改进、线上问题排查、技术选型、先结论后解释、原理+场景+注意事项`,
      },
    ],
  },
};

// ── 类型 ──────────────────────────────────

interface NewQuestion {
  id: string;
  title: string;
  type: "qa";
  answer: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
  tags: string[];
  category: string;
}

interface ExistingQuestion {
  id: string;
  title: string;
}

// ── 读取已有题目 ──────────────────────────────────

function readExistingQuestions(category: CategoryDef): ExistingQuestion[] {
  const filePath = path.join(QUESTIONS_DIR, category.fileName);
  if (!fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, "utf-8");
  const results: ExistingQuestion[] = [];

  const idMatches = content.matchAll(/id:\s*"([^"]+)"/g);
  const titleMatches = [...content.matchAll(/title:\s*"([^"]*)"/g)];

  let i = 0;
  for (const m of idMatches) {
    results.push({
      id: m[1],
      title: titleMatches[i]?.[1] || "",
    });
    i++;
  }
  return results;
}

// ── 构建 Prompt ──────────────────────────────────

function buildPrompt(
  category: CategoryDef,
  batch: SubCatBatch,
  existing: ExistingQuestion[],
  startId: number,
): string {
  const existingSummary =
    existing.length > 0
      ? `\n## 已有题目（共 ${existing.length} 道，切勿与以下题目重复！）\n\n` +
        existing.map((q) => `- [${q.id}] ${q.title}`).join("\n") +
        `\n\n新题目 ID 从 ${category.idPrefix}-${String(startId).padStart(3, "0")} 开始。\n`
      : "";

  const endId = startId + batch.count - 1;

  return `你是一位资深前端面试官兼前端学习教练，熟悉国内互联网公司真实面试，也熟悉前端开发者半年没写项目后重新恢复手感的学习路径。请为「${category.displayName}」分类生成 ${batch.count} 道前端面试题。

## 题库目标

这套题不是为了炫技或罗列冷门知识，而是帮助学习者：

1. 重新熟悉前端核心知识
2. 能在真实项目中用得上
3. 面试时能自然复述，而不是背一段百科
4. 看题时不会频繁产生“这题太偏、太难、一般不会问”的挫败感

## 必须严格遵守

1. **所有题目必须是 qa 类型**（问答题），不要生成选择题
2. **高频优先**：优先选择真实项目和国内前端面试中经常出现的问题；如果某个子类偏冷门，只能作为答案补充，不要单独出题
3. **实用优先**：题目必须能连接到日常开发、项目排查、性能优化、组件开发、工程协作或常见面试追问
4. **可背优先**：题干要短、明确、常见；不要写成论文题、架构师题或“请完整设计一个巨大系统”式题目
5. **答案质量**：answer 写成可直接口述的面试答案，严格控制在 60-180 字，超过 180 字视为不合格必须重写；explanation 补充项目场景、常见误区或追问方向（40-120 字）
6. **难度分布**：difficulty 1(简单)约占45%、2(中等)约占45%、3(困难)最多10%；困难题也必须是高频核心题，不能是冷门深挖
7. **拒绝冷门炫技**：不要生成很少遇到、很少考到、对恢复前端手感帮助不大的题
8. **禁止编造 API 与实现细节（极其重要！）**：
   - 禁止编造不存在的框架 API、方法名、配置项、函数签名
   - 禁止凭推断补充框架/库的内部实现细节（如沙箱机制、编译器步骤、响应式系统内部流程）
   - 框架/库内部实现只允许一句话概括思路，不允许展开描述"先做什么、再做什么"的具体步骤
   - 不确定某个 API 名称或机制细节时，换成概括性表述（如"通过代理拦截"），而不是硬编一个听起来专业的名字
9. **禁止具体版本号和日期**：答案中不要出现具体版本号（如"Node 11"、"React 18.2"）、具体年份月份（如"2024 年 3 月"），改用"较新版本"、"早期版本"等模糊表述
10. **ID 格式**：${category.idPrefix}-${String(startId).padStart(3, "0")} 到 ${category.idPrefix}-${String(endId).padStart(3, "0")}

## 选题过滤器

每道题生成前都必须在心里通过以下过滤，没通过就换题：

- 高频度：普通前端面试中出现概率是否足够高？
- 实用性：写业务、调接口、做组件、排查问题时是否可能用到？
- 可复述：学习者是否能用 30-90 秒说清楚？
- 友好度：半年没写项目的人看完是否能逐步理解？

## 不要单独出题的方向

以下内容除非在该分类中极其必要，否则不要单独成题：过深的源码细节、冷门 Web API、过新的实验特性、SEO 细枝末节、复杂 TLS 细节、SourceMap VLQ、微前端沙箱实现细节、Module Federation 深层原理、React/Vue 最新实验 API、装饰器细节、完整低代码/插件化/多活容灾架构、框架内部实现机制的逐步展开描述、涉及具体版本号或日期的演进历史。

## 推荐题目形态

- “X 和 Y 有什么区别？项目中怎么选？”
- “为什么会出现 X 问题？怎么解决？”
- “X 的常见使用场景和注意事项是什么？”
- “项目中如何排查/优化 X？”
- “请用通俗语言解释 X 的核心机制”

## JSON 转义规则（极其重要！）

- 双引号写 \\"（例如：他说\\"你好\\"）
- 反斜杠写 \\\\（例如：路径 C:\\\\Users，正则 \\\\d 中的 \\ 也要写成 \\\\）
- 不要出现正则表达式字面量（如 /pattern/），全部用字符串形式描述

${existingSummary}
## 需要覆盖的子类

${batch.subCategories}

## 输出格式

严格按如下 JSON 输出（只输出 JSON，不要 markdown 或其他文字）：

{
  "questions": [
    {
      "id": "${category.idPrefix}-${String(startId).padStart(3, "0")}",
      "title": "题目标题",
      "type": "qa",
      "answer": "可直接口述的面试答案（80-180字，准确但不要百科化）",
      "explanation": "项目场景、常见误区或追问方向（60-160字）",
      "difficulty": 1,
      "tags": ["子类名", "技术点"],
      "category": "${category.displayName}"
    }
  ]
}`;
}

// ── 调用 DeepSeek ──────────────────────────────────

async function callDeepSeek(prompt: string): Promise<NewQuestion[]> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("请设置环境变量 DEEPSEEK_API_KEY");

  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "deepseek-v4-pro",
      max_tokens: 16384,
      temperature: 0,
      stream: false,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: '你必须严格按 JSON Schema 输出，只输出 JSON 对象，不得包含任何其他文字。' },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`DeepSeek API 错误 ${response.status}: ${errBody.slice(0, 500)}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content?.trim() || "";

  if (!text) {
    throw new Error(`DeepSeek 返回了空内容。`);
  }

  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch (e: any) {
    const errPos = e.message.match(/position (\d+)/)?.[1];
    const pos = errPos ? parseInt(errPos) : 500;
    throw new Error(
      `JSON 解析失败（位置 ${pos}）：${e.message}\n\n` +
        `上下文：\n${text.slice(Math.max(0, pos - 200), pos + 200)}\n\n` +
        `结尾：\n...${text.slice(-300)}`
    );
  }

  const questions = parsed?.questions;
  if (!Array.isArray(questions)) {
    throw new Error(`DeepSeek 返回 JSON 中缺少 questions 数组。keys: ${Object.keys(parsed || {}).join(", ")}`);
  }
  return questions;
}

// ── 校验 ──────────────────────────────────

function validateQuestions(
  questions: NewQuestion[],
  category: CategoryDef,
  existingIds: Set<string>,
  startId: number,
): { valid: NewQuestion[]; errors: string[] } {
  const errors: string[] = [];
  const valid: NewQuestion[] = [];
  const usedIds = new Set<string>();

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const label = `第 ${i + 1} 题 "${q?.title || "无标题"}"`;

    if (!q.id || !q.title || !q.answer || !q.explanation || !q.category) {
      errors.push(`${label}：缺少必填字段`);
      continue;
    }

    if (q.type !== "qa") {
      errors.push(`${label}：type 必须是 qa`);
      continue;
    }

    if (![1, 2, 3].includes(q.difficulty)) {
      errors.push(`${label}：difficulty 必须是 1/2/3`);
      continue;
    }

    if (!Array.isArray(q.tags) || q.tags.length < 1) {
      errors.push(`${label}：tags 必须是非空数组`);
      continue;
    }

    if (!q.id.startsWith(category.idPrefix + "-")) {
      errors.push(`${label}：ID 前缀应为 ${category.idPrefix}-`);
      continue;
    }

    if (existingIds.has(q.id)) {
      errors.push(`${label}：ID "${q.id}" 与已有题目重复`);
      continue;
    }

    if (usedIds.has(q.id)) {
      errors.push(`${label}：ID "${q.id}" 本批次内重复`);
      continue;
    }

    usedIds.add(q.id);
    valid.push(q);
  }

  return { valid, errors };
}

// ── 写入/追加文件 ──────────────────────────────────

function toTsString(value: string): string {
  return JSON.stringify(value);
}

const VAR_NAME_MAP: Record<string, string> = {};
for (const [key, cat] of Object.entries(CATEGORIES)) {
  VAR_NAME_MAP[cat.fileName.replace(".ts", "")] = cat.varName;
}

function writeCategoryFile(category: CategoryDef, questions: NewQuestion[], append: boolean): void {
  const filePath = path.join(QUESTIONS_DIR, category.fileName);

  if (append && fs.existsSync(filePath)) {
    // 追加模式：在最后一个 ]; 之前插入
    let content = fs.readFileSync(filePath, "utf-8");
    const lastClose = content.lastIndexOf("];");
    if (lastClose === -1) throw new Error(`无法在 ${category.fileName} 中找到 ];`);

    let insert = "";
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      insert += `  {
    id: "${q.id}",
    title: ${toTsString(q.title)},
    type: "qa",
    answer: ${toTsString(q.answer)},
    explanation: ${toTsString(q.explanation)},
    difficulty: ${q.difficulty},
    tags: ${JSON.stringify(q.tags)},
    category: ${toTsString(q.category)},
  },\n`;
    }

    content = content.slice(0, lastClose) + insert + content.slice(lastClose);
    fs.writeFileSync(filePath, content, "utf-8");
  } else {
    // 新建文件
    let content = `import { Question } from "@/types/question";

export const ${category.varName}: Question[] = [
`;

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
    content += `  {
    id: "${q.id}",
    title: ${toTsString(q.title)},
    type: "qa",
    answer: ${toTsString(q.answer)},
    explanation: ${toTsString(q.explanation)},
    difficulty: ${q.difficulty},
    tags: ${JSON.stringify(q.tags)},
    category: ${toTsString(q.category)},
  },\n`;
    }

    content += `];
`;
    fs.writeFileSync(filePath, content, "utf-8");
  }
}

// ── 生成 index.ts ──────────────────────────────────

function writeIndexFile(): void {
  const imports: string[] = [];
  const exports: string[] = [];
  const spreads: string[] = [];

  for (const [, cat] of Object.entries(CATEGORIES)) {
    if (fs.existsSync(path.join(QUESTIONS_DIR, cat.fileName))) {
      imports.push(`import { ${cat.varName} } from "./${cat.fileName.replace(".ts", "")}";`);
      exports.push(`export { ${cat.varName} } from "./${cat.fileName.replace(".ts", "")}";`);
      spreads.push(`  ...${cat.varName},`);
    }
  }

  const content = `import { Question } from "@/types/question";
${imports.join("\n")}

export const questions: Question[] = [
${spreads.join("\n")}
];

${exports.join("\n")}
`;

  fs.writeFileSync(path.join(QUESTIONS_DIR, "index.ts"), content, "utf-8");
}

// ── 主流程 ──────────────────────────────────

async function main() {
  const categoryArg = process.argv[2];
  if (!categoryArg || !CATEGORIES[categoryArg]) {
    console.error("用法: npx tsx scripts/generate-category.ts <category> [--all] [--dry-run]");
    console.error("可用分类: " + Object.keys(CATEGORIES).join(", "));
    console.error("--all: 生成该分类所有批次");
    console.error("--dry-run: 只调用和校验，不写入题库文件");
    process.exit(1);
  }

  const category = CATEGORIES[categoryArg];
  const runAll = process.argv.includes("--all");
  const dryRun = process.argv.includes("--dry-run");

  console.log(`📋 分类：${category.displayName}`);
  console.log(`   共 ${category.batches.length} 批，目标 ${category.batches.reduce((s, b) => s + b.count, 0)} 题`);
  console.log(`   ID 前缀：${category.idPrefix}-`);
  if (dryRun) console.log("   Dry run：只看生成质量，不写入文件");
  console.log("");

  let totalValid = 0;
  let nextId = 1; // ID 从 1 开始
  const allQuestions: NewQuestion[] = [];

  const batches = runAll ? category.batches : [category.batches[0]];
  console.log(`   执行模式：${runAll ? `全部 ${batches.length} 批` : "仅第 1 批（加 --all 执行全部）"}`);
  console.log("");

  let batchFailed = false;

  for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
    const batch = batches[batchIdx];

    // runAll 模式：用本批次已生成的题目去重（不读文件，全新生成）
    // 单批模式：读已有文件去重
    const existing: ExistingQuestion[] = runAll
      ? allQuestions.map((q) => ({ id: q.id, title: q.title }))
      : readExistingQuestions(category);
    const existingIds = new Set(existing.map((q) => q.id));

    // ID 计算
    // runAll 模式：按已收集题目数递增（全新生成，不参考旧文件）
    // 单批模式：从已有文件最大 ID 的下一个开始
    if (runAll) {
      nextId = allQuestions.length + 1;
    } else {
      const maxExisting = existing.reduce((max, q) => {
        const num = parseInt(q.id.split("-").pop() || "0");
        return Math.max(max, isNaN(num) ? 0 : num);
      }, 0);
      nextId = maxExisting + 1;
    }

    console.log(`📦 第 ${batchIdx + 1}/${batches.length} 批（${batch.count} 题，ID 从 ${category.idPrefix}-${String(nextId).padStart(3, "0")} 开始）`);
    console.log("");

    console.log("🤖 调用 DeepSeek…");
    const prompt = buildPrompt(category, batch, existing, nextId);

    let rawQuestions: NewQuestion[] = [];
    let lastErr: Error | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        if (attempt > 0) console.log(`   重试第 ${attempt} 次…`);
        rawQuestions = await callDeepSeek(prompt);
        lastErr = null;
        break;
      } catch (e: any) {
        lastErr = e;
        if (attempt < 2) console.log(`   ⚠️ 调用失败：${e.message.slice(0, 100)}`);
      }
    }
    if (lastErr) throw lastErr;

    console.log(`   返回了 ${rawQuestions.length} 道题`);
    console.log("");

    console.log("🔍 校验…");
    const { valid, errors } = validateQuestions(rawQuestions, category, existingIds, nextId);

    if (errors.length > 0) {
      console.log(`   ⚠️  ${errors.length} 道未通过：`);
      for (const err of errors) console.log(`      - ${err}`);
    }
    console.log(`   ✅ ${valid.length} 道通过校验`);
    console.log("");

    if (valid.length === 0) {
      console.log("❌ 本批次无有效题目，跳过。");
      if (runAll) batchFailed = true;
      continue;
    }

    totalValid += valid.length;
    allQuestions.push(...valid);

    // 单批模式（非 --all）：立即写入文件
    if (!runAll && !dryRun) {
      console.log(`📝 写入 ${category.fileName}…`);
      writeCategoryFile(category, valid, false);
    }

    // 难度分布
    const diffCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
    for (const q of valid) diffCounts[q.difficulty]++;
    console.log(`   难度: 简单 ${diffCounts[1]} / 中等 ${diffCounts[2]} / 困难 ${diffCounts[3]}`);
    console.log("");

    // 打印题目
    console.log("── 本批题目 ──");
    for (const q of valid) {
      const diffLabel = { 1: "简单", 2: "中等", 3: "困难" }[q.difficulty];
      console.log(`  [${q.id}] ${q.title} (${diffLabel})`);
      if (dryRun) {
        console.log(`      答案：${q.answer}`);
        console.log(`      解析：${q.explanation}`);
      }
    }
    console.log("");
  }

  // --all 模式：全部批次通过后，一次性全量写入
  if (runAll && !dryRun) {
    if (batchFailed || allQuestions.length === 0) {
      console.log("❌ 部分批次失败或无有效题目，取消写入。请检查上述错误后重试。");
      process.exit(1);
    }
    console.log(`📝 全量写入 ${category.fileName}（共 ${allQuestions.length} 题）…`);
    writeCategoryFile(category, allQuestions, false);
  }

  // 更新 index.ts
  if (!dryRun) writeIndexFile();

  console.log(`🎉 完成！共${dryRun ? "生成" : "写入"} ${totalValid} 道题`);
  console.log("");
  console.log("📊 当前题库统计：");
  for (const [, cat] of Object.entries(CATEGORIES)) {
    const filePath = path.join(QUESTIONS_DIR, cat.fileName);
    if (fs.existsSync(filePath)) {
      const existing = readExistingQuestions(cat);
      console.log(`   ${cat.displayName}: ${existing.length} 题`);
    }
  }
}

main().catch((err) => {
  console.error("❌ 生成失败:", err.message);
  process.exit(1);
});
