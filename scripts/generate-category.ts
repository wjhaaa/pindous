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
    displayName: "JavaScript（语言核心）",
    batches: [
      { count: 10,
        subCategories: `1. 基础语法 — 7种原始类型+Object、var/let/const、暂时性死区、运算符(==/===/typeof/instanceof)、类型转换(ToPrimitive/隐式转换)
2. 执行上下文与作用域 — 执行上下文、调用栈、变量对象(VO)/活动对象(AO)、作用域链、词法作用域、块级作用域、变量提升
3. 闭包 — 闭包形成原理、数据私有化、柯里化、模块模式、闭包与内存泄漏
4. this 机制 — 默认/隐式/显式/new绑定、箭头函数this、call/apply/bind 原理
5. 原型与继承 — prototype/__proto__、原型链、Class语法、extends/super、静态属性与方法、私有字段#privateField、instanceof原理、寄生组合继承
6. 异步编程 — Promise(then/catch/finally)、Promise.all/race/any/allSettled、Promise.withResolvers、async/await原理
7. Event Loop — 宏任务与微任务、Promise.then、queueMicrotask、MutationObserver、requestAnimationFrame
8. 模块化 — CommonJS、ES Module、动态import()、循环引用`,
      },
      { count: 10,
        subCategories: `1. 数组与对象 — map/filter/reduce/some/every/find、sort排序、flat/flatMap、Object.create/assign/freeze/seal、Object.defineProperty
2. 深浅拷贝 — 浅拷贝(展开/Object.assign)、深拷贝(JSON/structuredClone/递归)、循环引用处理(WeakMap)
3. ES6+ 核心特性 — 解构赋值、模板字符串、展开运算符、Map/Set、WeakMap/WeakSet、Symbol、Proxy/Reflect、可选链?.、空值合并??
4. 函数式编程 — 纯函数、副作用、高阶函数、柯里化(curry)、偏函数(partial)、compose/pipe、不可变数据(immutable)
5. 错误处理 — try/catch/finally、Promise错误传播、Error对象、自定义错误类型
6. 正则表达式 — 元字符、捕获组、非捕获组、前瞻/后顾断言、常见匹配场景(手机号/邮箱/URL)
7. 数字精度 — IEEE 754双精度、0.1+0.2问题、BigInt、安全整数范围(Number.MAX_SAFE_INTEGER)
8. 内存管理 — 垃圾回收(标记清除/引用计数)、常见内存泄漏场景、WeakRef、FinalizationRegistry
9. Generator与Iterator — Generator函数、Iterator/Iterable、Symbol.iterator、可迭代协议`,
      },
      { count: 10,
        subCategories: `1. 基础语法进阶 — 补充与基础语法相关的深入面试题（如类型判断方法对比、隐式转换经典面试题等）
2. this 深入 — 手写call/apply/bind实现、this绑定优先级、综合场景题
3. 原型与继承进阶 — 原型链综合题、new操作符原理与手写实现、继承方式对比
4. 异步编程进阶 — 手写Promise核心方法、Promise并发控制、异步错误处理模式
5. Event Loop 深入 — Node.js与浏览器事件循环对比、综合执行顺序题、requestIdleCallback应用
6. 函数式编程进阶 — 手写curry/compose/pipe、不可变数据实战、高阶函数应用
7. Proxy/Reflect 深入 — 响应式原理模拟、数据校验、拦截器模式
8. 综合题 — 跨子类的综合面试题、手写实现类问题`,
      },
    ],
  },

  "browser-web-api": {
    fileName: "browser-web-api.ts", varName: "browserWebApiQuestions", idPrefix: "web",
    displayName: "浏览器与 Web API",
    batches: [
      { count: 10,
        subCategories: `1. DOM — DOM树、DOM操作(增删改查/批量)、DOM性能优化、DocumentFragment文档碎片
2. BOM — history(pushState/popstate)、location、navigator、screen
3. 事件机制 — 事件冒泡/捕获、事件委托、addEventListener参数(passive/capture/once)、CustomEvent
4. 浏览器存储 — Cookie、localStorage、sessionStorage、IndexedDB、Cookie安全(HttpOnly/Secure/SameSite)
5. 网络请求 — Fetch API(GET/POST/headers)、XMLHttpRequest、AbortController请求取消`,
      },
      { count: 10,
        subCategories: `1. Web API — Web Worker、Shared Worker、Service Worker、Clipboard API、Notification API、File API、Drag & Drop API
2. Observer API — MutationObserver、IntersectionObserver(懒加载)、ResizeObserver、PerformanceObserver
3. 浏览器渲染机制 — Parse→Style→Layout→Paint→Composite、合成层与GPU加速、进程架构
4. 浏览器缓存 — 强缓存(Cache-Control/Expires)、协商缓存(ETag/Last-Modified)、Service Worker缓存
5. 浏览器安全 — 同源策略、XSS(存储型/反射型/DOM型)、CSRF、CSP、iframe sandbox`,
      },
    ],
  },

  typescript: {
    fileName: "typescript.ts", varName: "typescriptQuestions", idPrefix: "ts",
    displayName: "TypeScript",
    batches: [
      { count: 10,
        subCategories: `1. 类型基础 — 原始类型、字面量、联合/交叉类型、interface vs type、any/unknown/never/void、类型断言、satisfies、as const
2. 类型推断 — 上下文推断、类型收窄(typeof/instanceof/in)、自定义守卫(is谓词)、辨别联合类型
3. 泛型 — 泛型函数/接口/类、泛型约束(extends)、泛型默认值
4. 高级类型 — keyof、typeof(type上下文)、映射类型、条件类型、infer关键字、模板字面量类型、索引访问类型
5. 工具类型 — Partial/Required/Readonly/Pick/Omit/Record/Exclude/Extract/NonNullable、ReturnType/Parameters/Awaited、自定义DeepReadonly/DeepPartial`,
      },
      { count: 10,
        subCategories: `1. 函数类型 — 函数重载、this类型、剩余参数/可选参数
2. 类与接口 — readonly/private/protected/public、abstract抽象类、implements vs extends
3. 类型兼容性 — 结构化类型/鸭子类型、协变/逆变/双变、多余属性检查
4. 枚举 — 数字/字符串枚举、const enum编译产物、枚举替代方案
5. 模块系统 — 类型导入导出、declare关键字、.d.ts声明文件、global类型扩展
6. TS 工程化 — tsconfig(strict/strictNullChecks/paths/baseUrl)、路径别名、类型发布`,
      },
      { count: 5,
        subCategories: `1. React + TS — Props泛型(React.FC/ComponentProps)、children类型(ReactNode)、Hooks类型、forwardRef类型
2. Vue + TS — defineProps类型、withDefaults、defineExpose、组件实例类型(InstanceType)
3. API 类型管理 — OpenAPI/Swagger类型生成、请求响应类型
4. 装饰器 — TS 5.0+ Stage 3 Decorators、experimentalDecorators区别、依赖注入/日志装饰器`,
      },
    ],
  },

  react: {
    fileName: "react.ts", varName: "reactQuestions", idPrefix: "react",
    displayName: "React",
    batches: [
      { count: 10,
        subCategories: `1. 组件基础 — 函数vs类组件、Props与State区别、状态提升、受控vs非受控组件
2. 生命周期 — 类组件生命周期、Hooks模拟生命周期(useEffect依赖数组)
3. Hooks — useState(闭包陷阱)、useEffect(清理函数)、useLayoutEffect(执行时机)、useRef(DOM引用/可变值)、useMemo、useCallback、useReducer、useContext、useId
4. 进阶 Hooks — 自定义Hook设计模式、useTransition、useDeferredValue、useSyncExternalStore、use()(React 19)
5. 渲染机制 — Render/Commit阶段、setState批处理(React 18)、React.memo浅比较、StrictMode`,
      },
      { count: 10,
        subCategories: `1. Fiber 架构 — Fiber节点、时间切片、lane优先级模型、可中断渲染、并发渲染
2. 虚拟 DOM 与 Diff — Virtual DOM原理、Diff算法(同层比较)、key的作用、为什么不能用index
3. 状态管理 — Context(场景与限制)、Redux Toolkit(store/slice/dispatch/immer)、Zustand、状态分层
4. React 请求管理 — React Query(queries/mutations/缓存)、SWR、请求竞态、AbortController
5. React Router — BrowserRouter/HashRouter、动态路由、嵌套路由(Outlet)、路由守卫、懒加载路由`,
      },
      { count: 10,
        subCategories: `1. React 性能优化 — React.lazy代码分割、Suspense、虚拟列表(react-window原理)、图片懒加载、Profiler分析
2. React 表单 — React Hook Form(非受控/性能)、Formik、表单验证、性能优化
3. React 错误处理 — Error Boundary类组件实现、错误边界限制、useErrorBoundary
4. 合成事件 — SyntheticEvent机制、事件委托、与原生事件区别
5. Portals — createPortal使用场景(弹窗/通知)、事件冒泡行为(按React树)
6. HOC 与 Render Props — HOC模式与缺陷、Render Props、与Hooks对比
7. React 新特性 — RSC(零客户端JS)、并发特性、React 19 ref改进
8. React 工程架构 — Hooks设计原则、组件拆分、权限体系(RBAC)、动态菜单、低耦合
9. React 测试 — React Testing Library核心API、组件测试、快照测试`,
      },
    ],
  },

  vue: {
    fileName: "vue.ts", varName: "vueQuestions", idPrefix: "vue",
    displayName: "Vue",
    batches: [
      { count: 10,
        subCategories: `1. 响应式系统 — Vue2 Object.defineProperty原理与缺陷、Vue3 Proxy原理与优势、ref/reactive/shallowRef/shallowReactive、effect/track/trigger
2. 响应式问题 — 解构丢失响应式、整体替换问题、toRefs保持响应式
3. 组件基础 — Options vs Composition API、defineProps/defineEmits、defineModel(Vue 3.4+)、动态组件(:is)
4. 模板语法 — v-if/v-show、v-for/key、computed缓存机制、watch vs watchEffect、插槽
5. 生命周期 — Vue2 vs Vue3生命周期对比、setup生命周期Hook、nextTick原理`,
      },
      { count: 10,
        subCategories: `1. 组件通信 — props/emits、provide/inject(响应式)、Pinia、defineExpose、mitt
2. Vue Router — Hash/History模式、动态路由、嵌套路由、路由守卫、路由懒加载
3. Pinia — Option Store vs Setup Store、state/getters/actions、持久化插件、Pinia vs Vuex
4. 内置组件 — keep-alive(缓存/activated/deactivated)、Teleport、Suspense、Transition/TransitionGroup
5. Vue 性能优化 — defineAsyncComponent、虚拟列表、v-once、v-memo、shallowRef优化`,
      },
      { count: 8,
        subCategories: `1. Diff 与编译优化 — 双端Diff(Vue2)、快速Diff(Vue3/LIS)、PatchFlag、Block Tree、静态提升、预字符串化
2. 渲染机制 — h函数、JSX、VNode结构、编译优化(静态标记)
3. Composables — 设计模式、useFetch/useLocalStorage/useMouse、与React Hooks对比
4. 调度机制 — scheduler、job队列、批量更新、tick
5. 自定义指令 — 指令生命周期、v-permission、v-click-outside、v-focus
6. Vue 测试 — Vue Test Utils基础(mount/shallowMount)、组件断言`,
      },
    ],
  },

  "html-css": {
    fileName: "html-css.ts", varName: "htmlCssQuestions", idPrefix: "css",
    displayName: "HTML/CSS",
    batches: [
      { count: 10,
        subCategories: `1. HTML 基础 — 语义化标签(header/nav/main/article/section/aside/footer)、块级/行内/行内块、meta标签、HTML5新特性
2. 表单 — HTML5新input类型、表单验证(required/pattern/min/max)、form属性
3. script 加载 — async/defer/module、DOMContentLoaded vs load
4. 可访问性(a11y) — ARIA属性、tabindex焦点管理、键盘导航、颜色对比度
5. SEO — 语义化与SEO、Open Graph、Twitter Card、JSON-LD结构化数据
6. CSS 选择器 — 基础/属性选择器、伪类(:has/:is/:where/:nth-child)、伪元素`,
      },
      { count: 10,
        subCategories: `1. 盒模型 — content-box/border-box、BFC(触发/应用)、IFC、margin合并
2. 布局 — Flex(flex-direction/grow/shrink/basis)、Grid(areas/minmax/auto-fill/fr)、圣杯/双飞翼
3. 定位与层叠 — position五种、z-index层叠上下文(7种创建方式)、层叠顺序
4. 单位与函数 — rem/em/vw/vh、calc/clamp/min/max、CSS Variables(var())
5. 动画 — transition/贝塞尔曲线、animation/@keyframes、transform 2D/3D、will-change、FLIP
6. 响应式设计 — @media、移动优先、@container容器查询、移动端1px问题、rem/vw适配`,
      },
      { count: 8,
        subCategories: `1. 深色模式 — prefers-color-scheme、CSS Variables动态主题
2. 安全区域 — safe-area-inset-*、env()、viewport-fit=cover
3. 回流与重绘 — Reflow/Repaint触发、合成层GPU加速、content-visibility、contain属性
4. 显示与隐藏 — display:none vs visibility:hidden vs opacity:0对比
5. CSS 工程化 — Sass/Less(mixin/extend)、CSS Modules、CSS-in-JS、@layer级联层、@scope
6. CSS 架构 — BEM、OOCSS、ITCSS、原子化CSS(Tailwind)`,
      },
    ],
  },

  engineering: {
    fileName: "engineering.ts", varName: "engineeringQuestions", idPrefix: "eng",
    displayName: "工程化",
    batches: [
      { count: 10,
        subCategories: `1. 构建工具 — Webpack(Entry/Output/Loader/Plugin)、Tree Shaking(ESM/sideEffects)、Code Splitting、Module Federation
2. Vite/esbuild — Vite为什么快(ES Module+esbuild)、esbuild(Go/多线程)、Vite vs Webpack
3. 包管理 — npm/yarn/pnpm区别、semver(^/~)、lock文件、pnpm硬链接/幽灵依赖、peerDependencies
4. Monorepo — pnpm workspace、Turborepo(任务编排/缓存)、changesets(版本管理)
5. 代码规范 — ESLint(Parser/AST/Rule)、Prettier vs ESLint、Husky/lint-staged、commitlint`,
      },
      { count: 10,
        subCategories: `1. Git 工作流 — Git Flow、Trunk Based、merge/rebase/squash、cherry-pick、Code Review
2. 测试体系 — 测试金字塔(单元/集成/E2E)、Jest/Vitest(describe/it/expect/mock)、组件测试、Playwright/Cypress、覆盖率
3. CI/CD — GitHub Actions(workflow/job/step)、构建/测试/部署流水线、Docker(Dockerfile/镜像/分层)、灰度/蓝绿/金丝雀发布
4. HTTP 协议 — HTTP/1.1/2/3演进、HTTPS(TLS握手)、状态码、RESTful API、GraphQL(Query/Mutation/Subscription)
5. WebSocket — 与HTTP区别(全双工)、握手升级(101)、心跳、应用场景`,
      },
      { count: 10,
        subCategories: `1. 跨域与安全 — CORS(简单/预检)、XSS防御、CSRF防御(SameSite/Token)、CSP、iframe sandbox
2. 浏览器缓存 — 强缓存(Cache-Control)、协商缓存(ETag)、Service Worker缓存(CacheFirst/NetworkFirst)、最佳实践
3. 性能优化 — Core Web Vitals(LCP/INP/CLS)、关键渲染路径、CDN、Gzip/Brotli、首屏优化
4. 浏览器原理 — 渲染流水线(Parse→Style→Layout→Paint→Composite)、合成层GPU加速、进程架构
5. Node.js — Event Loop(与浏览器区别)、cluster(IPC)、worker_threads、Stream(背压)、Buffer
6. SSR/SSG — CSR vs SSR vs SSG vs ISR、Hydration水合、Streaming SSR、Next.js/Nuxt`,
      },
      { count: 10,
        subCategories: `1. 微前端 — qiankun(HTML Entry/JS沙箱)、micro-app(Web Component)、wujie(iframe)、样式隔离/JS沙箱
2. 监控与调试 — Sentry、Performance API、Source Map(mappings/VLQ)、Chrome DevTools(Performance/Network)
3. 设计模式 — 单例/工厂/观察者/发布-订阅/策略/装饰器、在前端框架中的应用
4. 前端架构设计 — 目录结构、插件化、配置化、低耦合、可扩展性
5. 埋点体系 — 曝光埋点、点击埋点、无痕埋点、性能埋点、数据上报策略`,
      },
    ],
  },

  scenario: {
    fileName: "scenario.ts", varName: "scenarioQuestions", idPrefix: "sc",
    displayName: "场景题（高频面试）",
    batches: [
      { count: 8,
        subCategories: `1. 性能场景 — 首屏优化(排查→分析→优化)、长列表优化(虚拟列表/分页)、白屏排查、卡顿定位(长任务拆分)
2. 工程场景 — 组件库设计(API/按需加载/主题/文档)、权限系统设计(RBAC/路由权限/按钮权限/动态菜单)、埋点系统设计(曝光/点击/无痕/性能)、微前端设计(通信/隔离/公共依赖)
3. 架构场景 — 大型项目拆分(模块划分/公共层)、模块化设计(高内聚低耦合)、插件化设计(扩展点/生命周期)、配置化平台(Schema驱动/低代码)`,
      },
      { count: 7,
        subCategories: `1. 稳定性场景 — 灰度发布(百分比/用户画像)、回滚方案(秒级/版本)、错误监控体系(Sentry/告警/分级)、容灾方案(CDN/多活/降级)
2. 协作场景 — Code Review最佳实践、技术规范落地(ESLint/TS/文档)、知识传承(文档/培训/结对)、技术方案设计(需求/方案/风险/落地)
3. 业务场景 — 后台管理系统设计(CRUD/筛选/批量)、驾驶舱大屏(实时刷新/图表/适配)、国际化方案(多语言/日期/RTL)、多主题系统(CSS Variables/运行时切换)
4. 综合场景 — 从0到1搭建前端项目需要考虑的方方面面、技术选型决策框架`,
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

  return `你是一位资深前端面试官，拥有丰富的国内互联网公司面试经验。请为「${category.displayName}」分类生成 ${batch.count} 道前端面试题。

## 必须严格遵守

1. **所有题目必须是 qa 类型**（问答题），不要生成选择题
2. **全方面覆盖**：以下每个子类都要至少有 1 道题，不能遗漏
3. **真实高频**：题目必须是 2024-2026 年国内前端面试中真实高频出现的问题
4. **答案质量**：答案准确完整（100-300字），解析补充额外知识点或常见误区
5. **难度分布**：difficulty 1(简单)约占25%、2(中等)约占50%、3(困难)约占25%
6. **ID 格式**：${category.idPrefix}-${String(startId).padStart(3, "0")} 到 ${category.idPrefix}-${String(endId).padStart(3, "0")}

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
      "answer": "完整答案（100-300字，专业准确）",
      "explanation": "解析补充（额外知识点、常见误区、最佳实践）",
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
      const escapedTitle = q.title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const escapedAnswer = q.answer.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const escapedExplanation = q.explanation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      insert += `  {
    id: "${q.id}",
    title: "${escapedTitle}",
    type: "qa",
    answer: "${escapedAnswer}",
    explanation: "${escapedExplanation}",
    difficulty: ${q.difficulty},
    tags: ${JSON.stringify(q.tags)},
    category: "${q.category}",
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
      const escapedAnswer = q.answer.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const escapedExplanation = q.explanation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const escapedTitle = q.title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    content += `  {
    id: "${q.id}",
    title: "${escapedTitle}",
    type: "qa",
    answer: "${escapedAnswer}",
    explanation: "${escapedExplanation}",
    difficulty: ${q.difficulty},
    tags: ${JSON.stringify(q.tags)},
    category: "${q.category}",
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
    console.error("用法: npx tsx scripts/generate-category.ts <category> [--all]");
    console.error("可用分类: " + Object.keys(CATEGORIES).join(", "));
    console.error("--all: 生成该分类所有批次");
    process.exit(1);
  }

  const category = CATEGORIES[categoryArg];
  const runAll = process.argv.includes("--all");

  console.log(`📋 分类：${category.displayName}`);
  console.log(`   共 ${category.batches.length} 批，目标 ${category.batches.reduce((s, b) => s + b.count, 0)} 题`);
  console.log(`   ID 前缀：${category.idPrefix}-`);
  console.log("");

  let totalValid = 0;
  let nextId = 1; // ID 从 1 开始
  const allQuestions: NewQuestion[] = [];

  const batches = runAll ? category.batches : [category.batches[0]];
  console.log(`   执行模式：${runAll ? `全部 ${batches.length} 批` : "仅第 1 批（加 --all 执行全部）"}`);
  console.log("");

  for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
    const batch = batches[batchIdx];
    const isFirstBatch = batchIdx === 0;
    const append = !isFirstBatch;

    // 读取已有题目（用于去重和 ID 计算）
    const existing = isFirstBatch ? [] : readExistingQuestions(category);
    const existingIds = new Set(existing.map((q) => q.id));

    // 计算当前批次的起始 ID
    if (isFirstBatch) {
      nextId = 1;
    } else {
      // 从已有题目的最大 ID 推算下一个 ID
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
      continue;
    }

    console.log(`📝 ${append ? "追加到" : "写入"} ${category.fileName}…`);
    writeCategoryFile(category, valid, append);
    totalValid += valid.length;
    allQuestions.push(...valid);

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
    }
    console.log("");
  }

  // 更新 index.ts
  writeIndexFile();

  console.log(`🎉 完成！共写入 ${totalValid} 道题`);
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
