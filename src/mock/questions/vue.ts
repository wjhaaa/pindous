import { Question } from "@/types/question";

export const vueQuestions: Question[] = [
  {
    id: "vue-001",
    title: "Vue2 和 Vue3 的响应式原理有什么区别？",
    type: "qa",
    answer:
      "Vue2：使用 Object.defineProperty 劫持对象属性的 getter/setter，递归遍历所有属性。缺点：无法检测属性添加/删除、数组索引和 length 变化，需要 Vue.set/delete。Vue3：使用 Proxy 代理整个对象，可以拦截任意属性的读写、添加、删除，也支持数组索引和 length 的监听。性能更好，不需要递归遍历，仅在访问时才做深度响应式（惰性）。",
    explanation: "Proxy 是 Vue3 响应式的核心升级，解决了 Vue2 中很多响应式边界问题。但 Proxy 不支持 IE11。",
    difficulty: 3,
    tags: ["Vue"],
    category: "Vue",
  },
  {
    id: "vue-002",
    title: "computed 和 watch 的区别？什么场景用哪个？",
    type: "qa",
    answer:
      "computed：有缓存，依赖不变时不会重新计算；返回一个新值；不支持异步；适合基于现有数据派生新数据（如格式化、过滤、求和）。watch：无缓存；监听数据变化后执行副作用；支持异步；适合执行异步请求、操作 DOM、触发外部库等副作用。",
    explanation: "一句话：computed 用于「计算值」，watch 用于「做事情」。不要用 watch 去计算值，那样会失去缓存优化。",
    difficulty: 2,
    tags: ["Vue"],
    category: "Vue",
  },
  {
    id: "vue-003",
    title: "v-if 和 v-show 的区别？",
    type: "qa",
    answer:
      "v-if：条件为 false 时不渲染 DOM（元素被销毁/创建），切换开销大，适合运行时条件很少改变的场景。v-show：始终渲染 DOM，条件为 false 时添加 display: none，切换开销小，适合频繁切换的场景。v-if 可以与 v-else-if/v-else 配合使用，v-show 不可以。",
    explanation: "首次渲染时 v-if（false）的开销小于 v-show（无需创建 DOM），但频繁切换时 v-show 性能更好。",
    difficulty: 1,
    tags: ["Vue"],
    category: "Vue",
  },
  {
    id: "vue-004",
    title: "ref 和 reactive 的区别？",
    type: "qa",
    answer:
      "ref：用于包装基本类型和引用类型，访问/修改需要 .value 属性；在模板中自动解包（不用 .value）；重新赋值会触发响应式更新。reactive：用于包装引用类型（对象/数组），直接访问属性无需 .value，但不能重新整体替换（会丢失响应式）。ref 底层是 reactive 包装了一层对象 { value: xxx }。",
    explanation: "推荐：基本类型用 ref，引用类型也用 ref（便于重新赋值和逻辑复用）。reactive 适合不需要整体替换的复杂对象。",
    difficulty: 2,
    tags: ["Vue"],
    category: "Vue",
  },
  {
    id: "vue-005",
    title: "Options API 和 Composition API 的区别？优缺点？",
    type: "qa",
    answer:
      "Options API（选项式）：按选项类型组织代码（data/methods/computed/watch），直观易上手，但同一功能逻辑分散在不同选项中。Composition API（组合式）：按逻辑功能组织代码（setup 函数或 script setup），逻辑内聚，便于抽取和使用组合函数，TypeScript 支持更好。",
    explanation: "Composition API 是 Vue3 推荐的组织方式，尤其适合大型复杂组件。小型简单组件用 Options API 也没问题，两者可共存。",
    difficulty: 2,
    tags: ["Vue"],
    category: "Vue",
  },
  {
    id: "vue-006",
    title: "Vue 组件的生命周期有哪些？setup 中如何使用？",
    type: "qa",
    answer:
      "挂载阶段：setup → beforeCreate → created → beforeMount → mounted。更新阶段：beforeUpdate → updated。卸载阶段：beforeUnmount → unmounted。Composition API 中对应 Hook：onMounted、onUpdated、onUnmounted 等，setup 本身替代了 beforeCreate 和 created。",
    explanation: "所有生命周期 Hook 必须在 setup 函数执行期间同步调用（不能放在异步回调中）。",
    difficulty: 2,
    tags: ["Vue"],
    category: "Vue",
  },
  {
    id: "vue-007",
    title: "v-for 中为什么要用 key？为什么不能用 index 当 key？",
    type: "qa",
    answer:
      "key 帮助 Vue 的虚拟 DOM Diff 算法识别节点，当数据变化时高效复用/移动 DOM 元素。用 index 当 key：列表顺序变化时 index 会重新分配，导致 Vue 错误复用元素（状态和子组件错乱）。应使用数据唯一标识（如 id）作为 key。",
    explanation: "这与 React 中 key 的原理相同。只有列表稳定（无增删/重排）且元素无内部状态时，用 index 才安全。",
    difficulty: 1,
    tags: ["Vue"],
    category: "Vue",
  },
  {
    id: "vue-008",
    title: "Vue 中组件间通信有哪些方式？",
    type: "qa",
    answer:
      "① 父子：props（父传子）+ emit（子传父）；② 祖孙：provide/inject；③ 任意组件：全局状态管理（Pinia/Vuex）；④ 事件总线（Vue3 中已移除，可用 mitt 替代）；⑤ v-model（父子双向绑定）；⑥ ref 直接访问子组件实例（defineExpose 暴露方法）；⑦ 路由参数传递。",
    explanation: "推荐：父子用 props + emit，跨层级用 provide/inject 或 Pinia，避免全局事件总线的滥用。Pinia 是 Vue3 官方推荐的状态管理方案。",
    difficulty: 2,
    tags: ["Vue"],
    category: "Vue",
  },
  {
    id: "vue-009",
    title: "Vue3 的 script setup 语法糖有什么优势？",
    type: "qa",
    answer:
      "① 代码更简洁，无需手动 return 模板中用到的变量/方法；② 自动注册组件（导入即可用，不用在 components 中注册）；③ 顶层 await 支持（Suspense 配合）；④ 更好的 TypeScript 类型推断；⑤ defineProps/defineEmits 更清晰的类型定义；⑥ 编译时优化，性能更好。",
    explanation: "script setup 是 Vue3 官方推荐的写法，本质是 setup 函数的语法糖，编译后仍是标准组件。",
    difficulty: 2,
    tags: ["Vue"],
    category: "Vue",
  },
  {
    id: "vue-010",
    title: "Vue Router 的 hash 模式和 history 模式有什么区别？",
    type: "qa",
    answer:
      "hash 模式：URL 中使用 #，如 /#/page；# 后面的部分不会发送到服务端，纯前端路由；无需服务端配置，兼容性好；SEO 较差。history 模式：URL 如 /page（无 #）；使用 HTML5 History API（pushState/replaceState）；需要服务端配置（所有路径返回 index.html），否则刷新会 404；URL 更美观，支持 SSR。",
    explanation: "生产环境选 history 模式（配合服务端配置），简单项目或对 SEO 无要求可选 hash。",
    difficulty: 1,
    tags: ["Vue"],
    category: "Vue",
  },
];
