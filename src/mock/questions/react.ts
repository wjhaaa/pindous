import { Question } from "@/types/question";

export const reactQuestions: Question[] = [
  {
    id: "react-001",
    title: "React 中 key 的作用是什么？为什么不能用 index 作为 key？",
    type: "qa",
    answer:
      "key 帮助 React 在 Diff 过程中识别哪些元素发生了变化、新增或被删除，提高渲染效率。用 index 作为 key 的问题：当列表顺序改变（增删、排序）时，index 会变化，导致 React 错误地复用组件实例，产生渲染 Bug（如输入框内容错位），且无法利用 key 优化性能。",
    explanation: "应使用数据中的唯一标识（如 id）作为 key。只有在列表不会增删重排、且没有内部状态的情况下才可用 index。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-002",
    title: "useEffect 的依赖数组有哪几种情况？各自代表什么？",
    type: "qa",
    answer:
      "① 不传第二个参数：每次渲染后都执行副作用（很少用）；② 传空数组 []：仅在组件挂载时执行一次（模拟 componentDidMount），返回的清理函数在卸载时执行；③ 传 [dep1, dep2]：仅在依赖变量变化时执行副作用（最常用）。",
    explanation: "常见错误：忘记传依赖数组导致无限循环；依赖了未列出的变量导致闭包问题（读取到旧值）。React 18 Strict Mode 下开发环境会双重调用副作用函数。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-003",
    title: "React 函数组件和类组件的区别？",
    type: "qa",
    answer:
      "函数组件：① 更简洁，无 this 绑定问题；② 使用 Hooks 管理状态和副作用；③ 性能更优（无需实例化）；④ 更容易拆分和复用逻辑（自定义 Hook）。类组件：① 使用 this 和生命周期方法；② 有完整的生命周期（挂载/更新/卸载）；③ 可通过 shouldComponentUpdate 控制渲染；④ Error Boundary 目前只能用类组件实现。",
    explanation: "新项目推荐全部使用函数组件 + Hooks，官方也已明确函数组件是未来方向。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-004",
    title: "什么是虚拟 DOM？React 如何通过 Diff 算法更新真实 DOM？",
    type: "qa",
    answer:
      "虚拟 DOM 是用 JavaScript 对象模拟的真实 DOM 树。React 在状态变化时：① 生成新的虚拟 DOM 树；② 通过 Diff 算法对比新旧虚拟 DOM（同层比较、Type 不同则销毁重建、key 标识列表项）；③ 计算出最小更新量；④ 批量更新真实 DOM。最终目的：用 JS 计算替代 DOM 操作，减少真实 DOM 操作次数。",
    explanation: "React 16+ 引入 Fiber 架构，将 Diff 过程切分为可中断的小任务，避免长时间阻塞主线程，支持优先级调度。",
    difficulty: 3,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-005",
    title: "useState 和 useRef 的区别？各自适用什么场景？",
    type: "qa",
    answer:
      "useState：状态变化会触发组件重新渲染，适合需要渲染到 UI 上的数据。useRef：值变化不会触发重新渲染，可持久保存可变值（在渲染间保持不变），也用于获取 DOM 元素引用。useRef 的 current 属性可以在渲染间保持同一个引用。",
    explanation: "计时器 ID、上一次的值、不需要触发渲染的数据用 useRef；显示在 UI 上需要响应式更新的数据用 useState。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-006",
    title: "useMemo 和 useCallback 的区别？什么时候使用？",
    type: "qa",
    answer:
      "useMemo：缓存计算结果，依赖不变时跳过重新计算，返回缓存的值。useCallback：缓存函数引用，依赖不变时返回同一个函数，避免子组件不必要的重渲染。使用时机：① 计算开销大且依赖稳定的值用 useMemo；② 将函数传递给 React.memo 包裹的子组件时用 useCallback 保持引用稳定。",
    explanation: "不要滥用！仅在确实需要优化时才使用。对于简单计算或很少触发重渲染的组件，useMemo/useCallback 的开销可能大于收益。先用 Profiler 分析再决定。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-007",
    title: "React.memo 和 useMemo 的区别？",
    type: "qa",
    answer:
      "React.memo 是一个高阶组件，用于包裹整个组件，当 props 没变化时跳过组件渲染（浅比较）。useMemo 是一个 Hook，用于在组件内部缓存某个计算结果，避免重复计算。React.memo 控制「是否重新渲染组件」；useMemo 控制「是否重新计算值」。",
    explanation: "两者配合使用效果最佳：父组件用 useCallback 包裹传给子组件的函数，子组件用 React.memo 包裹，避免父组件重渲染导致子组件不必要的更新。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-008",
    title: "React Context 的作用是什么？有什么缺点？",
    type: "qa",
    answer:
      "Context 提供了一种跨层级传递数据的方式（无需逐层 props 传递），解决了 props drilling 问题。缺点：① Context 值变化时，所有消费该 Context 的组件都会重新渲染，无法被 React.memo 阻止；② 不适合频繁更新的数据；③ 多个 Context 嵌套会导致代码嵌套。",
    explanation: "Context 适合全局数据（主题、语言、用户信息），不适合高频变化的数据（如频繁更新的表格数据）。高频场景用状态管理库（Zustand、Redux Toolkit）。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-009",
    title: "受控组件和非受控组件的区别？",
    type: "qa",
    answer:
      "受控组件：表单数据由 React state 控制，value 和 onChange 配对使用，每次输入触发 state 更新。优点：数据实时可控、便于验证。非受控组件：表单数据由 DOM 自身管理，通过 ref 获取值。优点：代码简洁，适合简单场景或与第三方非 React 库集成。",
    explanation: "React 官方推荐使用受控组件。表单元素上设置 value 但未提供 onChange 会导致输入只读（常见错误）。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-010",
    title: "自定义 Hook（Custom Hook）是什么？有什么好处？",
    type: "qa",
    answer:
      "自定义 Hook 是以 use 开头的函数，内部可以调用其他 Hook，用于抽取组件中的可复用状态逻辑。好处：① 逻辑复用（不用高阶组件或 render props）；② 组件更简洁；③ 可独立测试；④ 无侵入性（不需要改变组件层级结构）。",
    explanation: "常见自定义 Hook：useLocalStorage、useFetch、useDebounce、usePrevious、useWindowSize。命名必须以 use 开头，否则 ESLint 无法校验 Hook 规则。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-011",
    title: "React.lazy 和 Suspense 的作用是什么？",
    type: "qa",
    answer:
      "React.lazy(() => import('./Component'))：动态导入组件，实现代码分割（Code Splitting），被懒加载的组件只在首次渲染时才加载对应的 JS 文件。Suspense：包裹 lazy 组件，在加载过程中显示 fallback 内容（如 loading 动画）。两者配合实现按需加载，减小首屏 JS 体积。",
    explanation: "React 19 中 Suspense 扩展了功能，可与服务端组件和数据获取配合使用。路由级别的懒加载是常见的优化手段。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-012",
    title: "React 中的 state 和 props 有什么区别？",
    type: "qa",
    answer:
      "Props（属性）：父组件传递给子组件的数据，子组件只读不能修改，数据流自上而下（单向数据流）。State（状态）：组件内部管理的数据，可通过 setState 修改，修改会触发重新渲染。State 是组件私有的，外部无法直接访问。",
    explanation: "一个常用原则：组件尽可能用 props 传递数据，把 state 提升到最近的公共祖先组件中（状态提升）。",
    difficulty: 1,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-013",
    title: "React 18/19 有哪些重要的新特性？",
    type: "qa",
    answer:
      "React 18：① 并发渲染（Concurrent Rendering）— 渲染可中断；② 自动批处理（Automatic Batching）— 异步回调中的多个 setState 会自动合并；③ useTransition/useDeferredValue — 标记低优先级更新；④ Suspense 支持服务端渲染。React 19：① use() API — 在渲染期间获取数据（替代部分 useEffect 场景）；② Server Components — 服务端组件；③ 改进的 ref（不再需要 forwardRef）；④ 资源预加载 API。",
    explanation: "最重要的概念：并发渲染让 React 可以在渲染过程中暂停处理更高优先级的事件（如用户输入），然后再回来继续渲染。",
    difficulty: 3,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-014",
    title: "useLayoutEffect 和 useEffect 的区别？",
    type: "qa",
    answer:
      "执行时机不同：useEffect 在浏览器绘制（Paint）之后异步执行，不阻塞页面渲染；useLayoutEffect 在 DOM 更新之后、浏览器绘制之前同步执行，会阻塞渲染。useLayoutEffect 用于需要在页面展示前同步修改 DOM 的场景（如读取布局信息、防止闪烁）。",
    explanation: "默认使用 useEffect。仅在需要在绘制前同步操作 DOM（如测量元素尺寸后调整位置避免闪烁）时才用 useLayoutEffect。服务端渲染时 useLayoutEffect 会报警告。",
    difficulty: 3,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-015",
    title: "React 的 setState 是同步还是异步的？",
    type: "qa",
    answer:
      "在 React 18 之前：事件处理函数和生命周期中的 setState 是异步的（批量更新），setTimeout/原生事件/Promise 中的 setState 是同步的。React 18 引入自动批处理后：所有场景下的 setState 都是异步批处理（包括 setTimeout 和 Promise 中），减少了不必要的重渲染。",
    explanation: "React 18 的自动批处理是开箱即用的。如需在极少数场景下同步读取最新 state，可用 flushSync()。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
];
