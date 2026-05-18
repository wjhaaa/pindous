前端面试实用知识体系

这份题库大纲的目标不是覆盖所有前端名词，而是帮助半年没写项目的前端开发者快速恢复手感：

- 能回答真实面试中的高频问题
- 能迁移到日常项目开发、排查和优化
- 题目适合 30-90 秒口述，不追求百科式背诵
- 冷门、过深、实验性内容只作为补充，不单独大量出题



一、JavaScript 核心高频

1. 数据类型与类型判断
- 原始类型与引用类型
- typeof / instanceof / Object.prototype.toString
- null 与 undefined
- == 与 ===
- 隐式类型转换

2. 作用域与执行机制
- 执行上下文
- 调用栈
- 变量提升
- 词法作用域
- 作用域链
- 暂时性死区（TDZ）
- var / let / const

3. 闭包
- 闭包形成原因
- 闭包常见用途
- 数据私有化
- 循环中的闭包问题
- 闭包与内存泄漏

4. this 与函数调用
- 默认绑定
- 隐式绑定
- 显式绑定
- new 绑定
- 箭头函数 this
- call / apply / bind 区别

5. 原型与继承
- prototype / __proto__
- 原型链
- constructor
- instanceof 原理
- class / extends / super
- 组合继承与寄生组合继承

6. 异步编程
- Promise 状态
- Promise 链式调用
- Promise.all / race / allSettled / any
- async / await
- try/catch 捕获异步错误
- 并发请求控制
- 请求取消

7. Event Loop
- 宏任务与微任务
- Promise.then
- setTimeout
- async/await 执行顺序
- 浏览器渲染与任务队列

8. 数组与对象常用能力
- map / filter / reduce
- some / every / find
- sort
- flat / flatMap
- Object.assign
- Object.create
- Object.freeze

9. 深浅拷贝
- 浅拷贝
- 深拷贝
- JSON 拷贝的限制
- structuredClone
- 循环引用处理思路

10. ES6+ 常用特性
- 解构赋值
- 展开运算符
- 模板字符串
- Map / Set
- WeakMap
- Symbol
- Proxy / Reflect
- 可选链 ?.
- 空值合并 ??

11. 模块化
- CommonJS
- ES Module
- import / export
- 动态 import()
- Tree Shaking 基本条件
- 循环引用的常见表现

12. 错误处理与健壮性
- try / catch / finally
- Promise 错误传播
- unhandledrejection
- Error 对象
- 业务错误与系统错误区分

13. 常见手写题
- 防抖
- 节流
- bind
- new
- instanceof
- Promise.all
- 深拷贝
- 发布订阅

14. 数字与精度
- 0.1 + 0.2 问题
- IEEE 754 基本概念
- Number.MAX_SAFE_INTEGER
- BigInt
- 金额计算注意事项

15. 内存与性能意识
- 垃圾回收基本原理
- 常见内存泄漏场景
- 定时器清理
- 事件监听清理
- 闭包引用释放



二、浏览器、网络与安全

1. DOM 与事件
- DOM 树
- DOM 操作性能
- 事件冒泡
- 事件捕获
- 事件委托
- addEventListener 参数
- passive / once / capture

2. 浏览器渲染机制
- HTML 解析
- CSSOM
- Render Tree
- Layout
- Paint
- Composite
- 回流与重绘
- 合成层

3. 浏览器存储
- Cookie
- localStorage
- sessionStorage
- IndexedDB 基本场景
- Cookie 安全属性
- SameSite

4. 浏览器缓存
- 强缓存
- 协商缓存
- Cache-Control
- Expires
- ETag
- Last-Modified
- 刷新页面时缓存行为

5. HTTP 基础
- HTTP 状态码
- GET 与 POST
- RESTful
- 请求头与响应头
- HTTP/1.1 与 HTTP/2 基本区别
- HTTPS 基本流程

6. 跨域
- 同源策略
- CORS
- 简单请求与预检请求
- withCredentials
- 代理转发
- JSONP 原理与局限

7. 网络请求
- XMLHttpRequest
- Fetch
- Axios 基本封装
- AbortController
- 请求重试
- 超时处理
- token 失效处理

8. 浏览器安全
- XSS
- CSRF
- CSP
- iframe sandbox
- 输入输出转义
- token 存储安全

9. 性能 API 与观察器
- Performance API
- IntersectionObserver
- ResizeObserver
- MutationObserver
- 图片懒加载
- 曝光统计

10. 常用 Web API
- File API
- Clipboard API
- Web Worker
- Service Worker 基本概念
- History API
- Location



三、HTML/CSS 与移动端适配

1. HTML 基础
- 语义化标签
- meta viewport
- script async / defer / module
- 表单基础
- 常见 input 类型

2. 可访问性基础
- alt
- label
- ARIA 基本作用
- tabindex
- 键盘可操作
- 颜色对比度

3. 盒模型与布局
- 标准盒模型
- IE 盒模型
- box-sizing
- BFC
- Flex
- Grid
- 水平垂直居中

4. 定位与层叠
- position
- z-index
- 层叠上下文
- sticky
- fixed 在移动端的注意事项

5. 响应式与移动端适配
- media query
- rem / em / vw / vh
- clamp
- 1px 问题
- safe-area-inset
- 横竖屏适配

6. CSS 常见效果
- 文字省略
- 多行省略
- 三角形
- 毛玻璃
- 固定宽高比
- 吸顶
- 遮罩层

7. 动画与交互
- transition
- animation
- transform
- will-change
- FLIP 基本思想
- 动画性能优化

8. CSS 变量与主题
- CSS Variables
- 动态主题
- 深色模式
- 多主题切换
- 设计令牌基本概念

9. CSS 工程化
- Sass / Less
- CSS Modules
- CSS-in-JS
- Tailwind CSS
- BEM
- 样式隔离

10. CSS 性能
- 回流与重绘
- content-visibility
- contain
- 选择器性能基本意识
- 避免布局抖动



四、TypeScript 实战

1. 类型基础
- 原始类型
- 数组与元组
- 字面量类型
- 联合类型
- 交叉类型
- any / unknown / never / void
- 类型断言

2. interface 与 type
- interface 使用场景
- type 使用场景
- 扩展方式差异
- 声明合并
- 项目中如何选择

3. 类型收窄
- typeof
- instanceof
- in
- switch
- 自定义类型守卫
- 可辨识联合类型

4. 泛型
- 泛型函数
- 泛型接口
- 泛型约束
- 泛型默认值
- 泛型在组件和请求中的使用

5. 常用高级类型
- keyof
- typeof
- 索引访问类型
- 映射类型
- 条件类型
- infer
- 模板字面量类型

6. 工具类型
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

7. React + TypeScript
- Props 类型
- children 类型
- useState 类型
- useRef 类型
- 事件类型
- forwardRef 类型
- 组件泛型

8. 接口与数据建模
- 接口响应类型
- 分页类型
- 表单类型
- 列表项类型
- 枚举替代方案
- 后端字段可空处理

9. TS 工程配置
- tsconfig
- strict
- strictNullChecks
- paths
- baseUrl
- 类型导入导出
- .d.ts

10. 类型安全实践
- 避免滥用 any
- unknown 的使用
- as const
- satisfies
- 类型与运行时校验的边界
- API 类型自动生成



五、React 与 Hooks

1. 组件基础
- 函数组件
- Props
- State
- 状态提升
- 受控组件
- 非受控组件
- 条件渲染
- 列表渲染

2. Hooks 基础
- useState
- useEffect
- useRef
- useMemo
- useCallback
- useReducer
- useContext
- 自定义 Hook

3. useEffect 高频问题
- 依赖数组
- 清理函数
- 闭包陷阱
- 请求竞态
- 无限循环
- useEffect 与 useLayoutEffect

4. 渲染与更新机制
- Render 阶段
- Commit 阶段
- 批处理
- StrictMode
- React.memo
- 状态更新异步表现

5. 虚拟 DOM 与 Diff
- Virtual DOM
- Diff 基本策略
- key 的作用
- 为什么不建议用 index 做 key
- 列表更新问题

6. 组件通信
- props
- callback
- Context
- ref
- 状态提升
- 发布订阅
- 全局状态管理

7. 状态管理
- Context 使用边界
- Redux Toolkit
- Zustand
- 服务端状态与客户端状态
- 状态分层
- 本地缓存状态

8. 请求与缓存
- 请求封装
- loading / error / empty
- 请求竞态
- AbortController
- React Query / SWR 基本思想
- 缓存失效

9. 表单
- 受控表单
- 非受控表单
- 表单校验
- 动态表单
- React Hook Form
- 表单性能优化

10. 性能优化
- 减少重复渲染
- useMemo / useCallback 使用边界
- React.memo
- 懒加载
- 虚拟列表
- 图片懒加载
- Profiler

11. 路由
- BrowserRouter
- HashRouter
- 动态路由
- 嵌套路由
- 路由懒加载
- 权限路由
- 页面状态保持

12. 错误处理
- Error Boundary
- 组件错误兜底
- 请求错误兜底
- 上报错误

13. React 18 常用能力
- createRoot
- 自动批处理
- useTransition
- useDeferredValue
- Suspense 基本使用
- 并发渲染基本概念

14. 组件设计
- 组件拆分
- 容器组件与展示组件
- hooks 抽象
- 组合优于继承
- 通用组件 API 设计
- 业务组件复用

15. React 测试
- React Testing Library
- 组件交互测试
- Mock 请求
- 快照测试适用场景



六、Taro / 小程序开发

1. 小程序基础
- 小程序页面结构
- app / page 生命周期
- 页面路由
- 页面栈
- 分包
- tabBar

2. Taro 与 React
- Taro 编译到小程序的基本思路
- Taro 组件与小程序组件差异
- React Hooks 在 Taro 中的使用
- Taro 路由跳转
- Taro Storage
- Taro request

3. 页面与组件通信
- 父子组件通信
- 全局状态
- 页面参数传递
- 事件回调
- 自定义组件设计

4. 小程序数据与缓存
- Taro Storage Sync
- 异步 Storage
- 登录态缓存
- 本地学习进度
- 缓存失效策略

5. 小程序请求与登录
- wx.login / Taro.login
- token 管理
- 请求封装
- 错误提示
- loading 处理
- 重试与超时

6. 小程序性能优化
- 首屏加载
- 分包加载
- 图片优化
- 长列表优化
- 减少不必要渲染
- 包体积优化

7. 小程序样式与适配
- rpx
- 安全区域
- 不同机型适配
- 自定义导航栏
- 主题色
- 暗色模式

8. 小程序常见能力
- 授权
- 分享
- 文件上传
- 图片预览
- 下拉刷新
- 上拉加载
- 空状态与错误态

9. Taro 工程问题
- 环境变量
- 页面注册
- 构建配置
- 多端兼容
- 调试工具
- 常见构建报错

10. 项目实战场景
- 收藏功能
- 学习进度统计
- 每日一题
- 列表筛选
- 详情页跳转
- 本地数据 mock



七、前端工程化与调试

1. 构建工具
- Webpack 基本流程
- Loader
- Plugin
- Vite 基本原理
- esbuild
- Tree Shaking
- Code Splitting

2. 包管理
- npm / yarn / pnpm
- package.json
- semver
- lock 文件
- dependencies / devDependencies
- peerDependencies

3. 开发规范
- ESLint
- Prettier
- Husky
- lint-staged
- commitlint
- TypeScript 类型检查

4. Git 工作流
- merge
- rebase
- squash
- cherry-pick
- revert
- 冲突解决
- Code Review

5. 环境与配置
- 环境变量
- dev / test / prod
- 代理配置
- publicPath
- 构建产物分析
- source map 基本用途

6. 测试
- 单元测试
- 组件测试
- E2E 测试
- Jest
- Vitest
- Playwright
- Mock 数据

7. 性能优化
- 首屏优化
- 资源压缩
- CDN
- Gzip / Brotli
- 懒加载
- 预加载
- Core Web Vitals

8. 监控与调试
- Chrome DevTools
- Network 面板
- Performance 面板
- Lighthouse
- Sentry
- 错误上报
- 性能埋点

9. CI/CD 基础
- GitHub Actions
- 自动检查
- 自动构建
- 自动部署
- 回滚
- 灰度发布基本概念

10. Node.js 基础
- Node 运行环境
- npm scripts
- fs/path 基本使用
- Node Event Loop
- Stream 基本概念
- 前端脚本工具

11. SSR/SSG 基础
- CSR
- SSR
- SSG
- Hydration
- 首屏性能
- SEO 影响

12. 架构与协作
- 目录结构
- 模块边界
- 组件库
- 权限系统
- 埋点系统
- 技术方案设计



八、业务场景与面试表达

1. 接口请求场景
- 请求封装
- token 过期
- 重复请求
- 请求竞态
- loading 管理
- 错误提示
- 接口降级

2. 列表与分页场景
- 分页加载
- 下拉刷新
- 上拉加载
- 搜索筛选
- 空状态
- 骨架屏
- 长列表优化

3. 表单场景
- 表单校验
- 动态表单
- 表单回显
- 防重复提交
- 文件上传
- 编辑与新增复用

4. 权限场景
- 登录态
- 路由权限
- 按钮权限
- 菜单权限
- 角色权限
- 权限数据缓存

5. 组件设计场景
- 弹窗组件
- 列表组件
- 表单组件
- 选择器组件
- 业务 hooks
- 组件 API 设计

6. 性能场景
- 首屏慢
- 白屏
- 页面卡顿
- 图片过大
- 包体积过大
- 长任务
- 内存泄漏

7. 稳定性场景
- 错误边界
- 异常兜底
- 请求失败重试
- 监控上报
- 回滚方案
- 灰度发布

8. 协作场景
- Code Review
- 技术方案
- 需求拆解
- 排期评估
- 和后端联调
- 带新人

9. 项目复盘场景
- 项目难点
- 性能优化经历
- 组件封装经历
- 工程化改进
- 线上问题排查
- 技术选型理由

10. 面试表达训练
- 先结论后解释
- 原理 + 场景 + 注意事项
- 用项目经历承接知识点
- 不会的问题如何回答
- 高频追问准备



附录：不建议大量单独出题的低频内容

以下内容可以作为 explanation 补充，不建议作为主要题目大量生成：

- WeakRef / FinalizationRegistry
- Promise.withResolvers
- Iterator / Generator 深层实现
- 正则后顾断言细节
- Stage 3 Decorators
- 复杂协变 / 逆变 / 双变推导
- Vue 编译优化深层细节
- React lane 模型深层细节
- React Server Components 细节
- React 19 实验性 API
- SEO Open Graph / Twitter Card / JSON-LD 细枝末节
- Module Federation 深层原理
- 微前端 JS 沙箱实现细节
- Source Map VLQ 编码
- TLS 握手完整细节
- Docker / Kubernetes 深层运维
- 低代码平台完整架构
- 多活容灾架构
