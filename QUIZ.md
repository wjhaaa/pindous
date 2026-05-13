前端知识体系

一、JavaScript（语言核心）

1. 基础语法
- 数据类型（7种原始类型 + Object）
- var / let / const
- 暂时性死区（TDZ）
- 运算符（== vs ===、typeof、instanceof）
- 类型转换（ToPrimitive、隐式转换）

2. 执行上下文与作用域
- 执行上下文
- 调用栈
- 变量对象（VO）/ 活动对象（AO）
- 作用域链
- 词法作用域
- 块级作用域
- 变量提升

3. 闭包
- 闭包形成原理
- 数据私有化
- 柯里化
- 模块模式
- 闭包与内存泄漏

4. this 机制
- 默认绑定
- 隐式绑定
- 显式绑定
- new 绑定
- 箭头函数 this
- call / apply / bind 原理与实现

5. 原型与继承
- prototype / __proto__
- 原型链
- Class 语法
- extends / super
- 静态属性与静态方法
- 私有字段 #privateField
- instanceof 原理
- 寄生组合继承

6. 异步编程
- Promise
- Promise.all / race / any / allSettled
- Promise.withResolvers
- async / await 原理
- Generator
- Iterator / Iterable
- Symbol.iterator
- 可迭代协议

7. Event Loop
- 宏任务与微任务
- Promise.then
- queueMicrotask
- MutationObserver
- requestAnimationFrame
- requestIdleCallback

8. 模块化
- CommonJS
- ES Module
- 动态 import()
- 循环引用

9. 数组与对象
- map / filter / reduce
- some / every / find
- sort 排序机制
- flat / flatMap
- Object.create
- Object.assign
- Object.freeze / seal
- Object.defineProperty

10. 深浅拷贝
- 浅拷贝
- 深拷贝
- structuredClone
- 循环引用处理

11. ES6+ 核心特性
- 解构赋值
- 模板字符串
- 展开运算符
- Map / Set
- WeakMap / WeakSet
- Symbol
- Proxy / Reflect
- receiver 参数
- 可选链 ?.
- 空值合并 ??

12. 函数式编程
- 纯函数
- 副作用
- 高阶函数
- 柯里化
- 偏函数
- compose / pipe
- immutable

13. 错误处理
- try / catch / finally
- Promise 错误传播
- Error 对象
- 自定义错误类型

14. 正则表达式
- 元字符
- 捕获组
- 非捕获组
- 前瞻 / 后顾断言
- 常见匹配场景

15. 数字精度
- IEEE 754
- 0.1 + 0.2 问题
- BigInt
- 安全整数范围

16. 内存管理
- 垃圾回收
- 标记清除
- 引用计数
- 常见内存泄漏
- WeakRef
- FinalizationRegistry



二、浏览器与 Web API

1. DOM
- DOM 树
- DOM 操作
- DOM 性能优化
- 文档碎片

2. BOM
- history
- location
- navigator
- screen

3. 事件机制
- 事件冒泡
- 事件捕获
- 事件委托
- addEventListener 参数
- passive / capture / once
- CustomEvent

4. 浏览器存储
- Cookie
- localStorage
- sessionStorage
- IndexedDB
- Cookie 安全
- SameSite

5. 网络请求
- Fetch API
- XMLHttpRequest
- AbortController
- 请求取消

6. Web API
- Web Worker
- Shared Worker
- Service Worker
- Clipboard API
- Notification API
- File API
- Drag & Drop API

7. Observer API
- MutationObserver
- IntersectionObserver
- ResizeObserver
- PerformanceObserver

8. 浏览器渲染机制
- Parse
- Style
- Layout
- Paint
- Composite
- 合成层

9. 浏览器缓存
- 强缓存
- 协商缓存
- Cache-Control
- ETag
- Last-Modified

10. 浏览器安全
- 同源策略
- XSS
- CSRF
- CSP
- iframe sandbox



三、TypeScript

1. 类型基础
- 原始类型
- 字面量类型
- 联合类型
- 交叉类型
- interface vs type
- any / unknown / never / void
- 类型断言
- satisfies
- as const

2. 类型推断
- 上下文推断
- 类型收窄
- typeof
- instanceof
- in
- 自定义守卫
- Discriminated Union

3. 泛型
- 泛型函数
- 泛型接口
- 泛型类
- 泛型约束
- 泛型默认值

4. 高级类型
- keyof
- typeof
- 映射类型
- 条件类型
- infer
- 模板字面量类型
- 索引访问类型

5. 工具类型
- Partial
- Required
- Readonly
- Pick
- Omit
- Record
- Exclude
- Extract
- ReturnType
- Parameters
- Awaited
- DeepReadonly
- DeepPartial

6. 函数类型
- 函数重载
- this 类型
- 剩余参数
- 可选参数

7. 类与接口
- readonly
- private
- protected
- abstract
- implements
- extends

8. 类型兼容性
- 结构化类型
- 协变
- 逆变
- 双变
- 多余属性检查

9. 枚举
- 数字枚举
- 字符串枚举
- const enum
- 枚举替代方案

10. 模块系统
- 类型导入导出
- declare
- .d.ts
- global 扩展

11. TS 工程化
- tsconfig
- strict
- strictNullChecks
- paths
- baseUrl
- 类型发布

12. React + TS
- Props 泛型
- children 类型
- hooks 类型
- forwardRef 类型

13. Vue + TS
- defineProps
- withDefaults
- defineExpose
- 组件实例类型

14. API 类型管理
- OpenAPI
- Swagger
- 类型自动生成

15. 装饰器
- Stage 3 Decorators
- experimentalDecorators
- 依赖注入
- 日志装饰器



四、React

1. 组件基础
- 函数组件
- 类组件
- Props
- State
- 状态提升
- 受控组件
- 非受控组件

2. 生命周期
- 类组件生命周期
- Hooks 模拟生命周期

3. Hooks
- useState
- useEffect
- useLayoutEffect
- useRef
- useMemo
- useCallback
- useReducer
- useContext
- useId

4. 进阶 Hooks
- 自定义 Hook
- useTransition
- useDeferredValue
- useSyncExternalStore
- use()

5. 渲染机制
- Render 阶段
- Commit 阶段
- 批处理
- React.memo
- StrictMode

6. Fiber 架构
- Fiber
- 时间切片
- lane 模型
- 可中断渲染
- 并发渲染

7. 虚拟 DOM 与 Diff
- Virtual DOM
- Diff 算法
- key 的作用
- key 为什么不能用 index

8. 状态管理
- Context
- Redux Toolkit
- Zustand
- 状态分层
- 服务端状态 vs 客户端状态

9. React 请求管理
- React Query
- SWR
- 请求竞态
- AbortController
- 缓存策略

10. React Router
- BrowserRouter
- HashRouter
- 动态路由
- 嵌套路由
- 路由守卫
- 懒加载

11. React 性能优化
- React.lazy
- Suspense
- 虚拟列表
- 图片懒加载
- Profiler
- 避免重复渲染

12. React 表单
- React Hook Form
- Formik
- 表单性能优化

13. React 错误处理
- Error Boundary
- 错误边界限制
- useErrorBoundary

14. 合成事件
- React 合成事件
- 事件池
- 与原生事件区别

15. Portals
- createPortal
- 冒泡行为

16. HOC 与 Render Props
- HOC
- Render Props
- 与 Hooks 对比

17. React 新特性
- React Server Components
- React 18 并发
- React 19 ref 改进

18. React 工程架构
- hooks 设计
- 组件设计
- 权限体系
- 动态菜单
- RBAC
- 低耦合设计

19. React 测试
- React Testing Library
- 组件测试
- 快照测试



五、Vue

1. 响应式系统
- Object.defineProperty
- Proxy
- ref
- reactive
- shallowRef
- shallowReactive
- effect
- track
- trigger

2. 响应式问题
- 解构丢失响应式
- 整体替换问题
- toRefs

3. 组件基础
- Options API
- Composition API
- defineProps
- defineEmits
- defineModel
- 动态组件

4. 模板语法
- v-if vs v-show
- v-for
- key
- computed
- watch
- watchEffect
- 插槽

5. 生命周期
- Vue2 vs Vue3
- setup 生命周期
- nextTick
- nextTick 微任务机制

6. 组件通信
- props/emits
- provide/inject
- Pinia
- defineExpose
- mitt

7. Vue Router
- Hash
- History
- 动态路由
- 路由守卫
- 路由懒加载

8. Pinia
- Option Store
- Setup Store
- getters
- actions
- 持久化

9. 内置组件
- keep-alive
- Teleport
- Suspense
- Transition
- TransitionGroup

10. Vue 性能优化
- defineAsyncComponent
- 虚拟列表
- v-once
- v-memo
- shallowRef

11. Diff 与编译优化
- 双端 Diff
- 快速 Diff
- PatchFlag
- Block Tree
- 静态提升
- 预字符串化

12. 渲染机制
- h 函数
- JSX
- VNode
- 编译优化

13. Composables
- useFetch
- useLocalStorage
- useMouse
- 设计模式

14. 调度机制
- scheduler
- job queue
- 批量更新

15. 自定义指令
- 指令生命周期
- 权限控制
- 点击外部
- 自动聚焦

16. Vue 测试
- Vue Test Utils
- 组件断言



六、HTML/CSS

1. HTML 基础
- 语义化
- meta
- HTML5 新特性

2. 表单
- input 类型
- 表单校验
- enctype

3. script 加载
- async
- defer
- module

4. 可访问性
- ARIA
- tabindex
- 键盘导航
- 颜色对比度

5. SEO
- Open Graph
- Twitter Card
- JSON-LD

6. CSS 选择器
- 基础选择器
- 属性选择器
- 伪类
- 伪元素
- :has()

7. 盒模型
- content-box
- border-box
- BFC
- IFC

8. 布局
- Flex
- Grid
- 圣杯布局
- 双飞翼布局

9. 定位与层叠
- position
- z-index
- 层叠上下文

10. 单位与函数
- rem/em/vw/vh
- calc
- clamp
- CSS Variables

11. 动画
- transition
- animation
- transform
- will-change
- FLIP

12. 响应式设计
- media query
- container query
- rem/vw 适配
- 1px 问题

13. 深色模式
- prefers-color-scheme
- 动态主题

14. 安全区域
- safe-area-inset

15. 回流与重绘
- Reflow
- Repaint
- content-visibility
- contain

16. 显示与隐藏
- display:none
- visibility:hidden
- opacity:0

17. CSS 工程化
- Sass
- Less
- CSS Modules
- CSS-in-JS
- @layer
- @scope

18. CSS 架构
- BEM
- OOCSS
- ITCSS
- 原子化 CSS
- Tailwind CSS



七、工程化

1. 构建工具
- Webpack
- Vite
- esbuild
- Loader
- Plugin
- Tree Shaking
- Code Splitting
- Module Federation

2. 包管理
- npm
- yarn
- pnpm
- semver
- lock 文件
- peerDependencies

3. Monorepo
- pnpm workspace
- Turborepo
- Nx
- changesets

4. 代码规范
- ESLint
- Prettier
- Husky
- lint-staged
- commitlint

5. Git 工作流
- Git Flow
- Trunk Based
- merge
- rebase
- squash
- cherry-pick

6. 测试体系
- 单元测试
- 集成测试
- E2E
- Jest
- Vitest
- Playwright

7. CI/CD
- GitHub Actions
- Docker
- 灰度发布
- 蓝绿部署

8. HTTP
- HTTP1/2/3
- HTTPS
- TLS
- RESTful
- GraphQL
- WebSocket

9. 跨域与安全
- CORS
- XSS
- CSRF
- CSP
- iframe sandbox

10. 浏览器缓存
- 强缓存
- 协商缓存
- Service Worker

11. 性能优化
- Core Web Vitals
- 首屏优化
- CDN
- Gzip
- Brotli

12. 浏览器原理
- 渲染流水线
- GPU 加速
- 浏览器进程架构

13. Node.js
- Event Loop
- cluster
- worker_threads
- Stream
- Buffer

14. SSR/SSG
- CSR
- SSR
- SSG
- ISR
- Hydration
- Streaming SSR

15. 微前端
- qiankun
- micro-app
- wujie
- JS 沙箱
- 样式隔离

16. 监控与调试
- Sentry
- Performance API
- Source Map
- Chrome DevTools

17. 设计模式
- 单例
- 工厂
- 观察者
- 发布订阅
- 策略
- 装饰器

18. 前端架构设计
- 目录结构
- 插件化
- 配置化
- 低耦合
- 可扩展性

19. 埋点体系
- 曝光埋点
- 点击埋点
- 无痕埋点
- 性能埋点



八、场景题（高频面试）

1. 性能场景
- 首屏优化
- 长列表优化
- 白屏优化
- 卡顿定位

2. 工程场景
- 组件库设计
- 权限系统设计
- 埋点系统设计
- 微前端设计

3. 架构场景
- 大型项目拆分
- 模块化设计
- 插件化设计
- 配置化平台

4. 稳定性场景
- 灰度发布
- 回滚方案
- 错误监控
- 容灾方案

5. 协作场景
- Code Review
- 技术规范
- 带新人
- 技术方案设计

6. 业务场景
- 后台管理系统
- 驾驶舱
- 低代码平台
- 多主题系统
- 国际化