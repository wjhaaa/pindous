import { Question } from "@/types/question";

export const typescriptQuestions: Question[] = [
  {
    id: "ts-001",
    title: "interface 和 type 的区别？什么时候用哪个？",
    type: "qa",
    answer:
      "相同点：都可以描述对象形状。不同点：① interface 可被声明合并（同名 interface 自动合并），type 不行；② type 可以定义联合类型（|）、交叉类型（&）、元组（tuple），interface 不行；③ interface 可以 extends，type 不可以（但可用 & 交叉）；④ type 可以用 typeof 和 keyof 操作符。推荐：对象结构用 interface（可扩展性更好），联合类型/工具类型用 type。",
    explanation: "团队中用 interface 描述对象结构是主流做法。type 更适合做类型体操（条件类型、映射类型、联合类型）。",
    difficulty: 2,
    tags: ["TypeScript"],
    category: "TypeScript",
  },
  {
    id: "ts-002",
    title: "any、unknown、never 的区别？",
    type: "qa",
    answer:
      "any：关闭类型检查，可以赋值给任何变量，也可以访问任何属性（不安全）。unknown：表示「未知类型」，安全版的 any，不能直接操作（需要类型断言或类型守卫后才能使用），只能赋值给 any 和 unknown。never：表示「永远不存在的值」，如抛出异常或死循环的函数返回类型、不可能发生的类型收窄（穷尽检查）。",
    explanation: "最佳实践：能用 unknown 就不用 any；用 never 做穷尽检查（switch default 里赋值给 never 确保所有分支已处理）。",
    difficulty: 2,
    tags: ["TypeScript"],
    category: "TypeScript",
  },
  {
    id: "ts-003",
    title: "泛型（Generics）是什么？如何使用和约束？",
    type: "qa",
    answer:
      "泛型允许在定义函数、接口、类时不指定具体类型，使用时再传入类型参数，实现类型安全的同时保持灵活性。用法：function identity<T>(arg: T): T { return arg; }。约束：<T extends { length: number }> 限制 T 必须有 length 属性。常用场景：泛型组件（React.FC<Props<T>>）、泛型 Hook、泛型工具函数。",
    explanation: "泛型约束使用 extends 关键字，如 <T extends object>。默认类型参数：<T = string>。理解泛型是 TypeScript 进阶的基石。",
    difficulty: 3,
    tags: ["TypeScript"],
    category: "TypeScript",
  },
  {
    id: "ts-004",
    title: "keyof 和 typeof 的用法？怎么配合使用？",
    type: "qa",
    answer:
      "keyof：获取类型的所有键组成的联合类型。如 type Keys = keyof { name: string; age: number }; // 'name' | 'age'。typeof：在类型上下文中获取值的类型。如 const obj = { a: 1 }; type ObjType = typeof obj;。配合使用：function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; } 实现类型安全的属性访问。",
    explanation: "keyof 常用于约束泛型参数，确保只访问对象存在的属性。typeof keyof 配合是实现类型安全工具函数的基础。",
    difficulty: 2,
    tags: ["TypeScript"],
    category: "TypeScript",
  },
  {
    id: "ts-005",
    title: "TypeScript 中常用的工具类型（Utility Types）有哪些？",
    type: "qa",
    answer:
      "Partial<T>：所有属性变为可选。Required<T>：所有属性变为必填。Readonly<T>：所有属性变为只读。Pick<T, K>：从 T 中选取指定属性。Omit<T, K>：从 T 中排除指定属性。Record<K, V>：创建键为 K、值为 V 的对象类型。Exclude<T, U>：从联合类型 T 中排除 U。Extract<T, U>：从联合类型 T 中提取 U。NonNullable<T>：排除 null 和 undefined。ReturnType<T>：获取函数返回类型。",
    explanation: "工具类型本质是 TypeScript 内置的高级类型，理解它们的实现（映射类型 + 条件类型）有助于写出更好的类型。",
    difficulty: 2,
    tags: ["TypeScript"],
    category: "TypeScript",
  },
  {
    id: "ts-006",
    title: "什么是类型守卫（Type Guard）？有哪几种方式？",
    type: "qa",
    answer:
      "类型守卫是在代码块中将变量类型缩小为更具体的类型。方式：① typeof 守卫：typeof val === 'string'；② instanceof 守卫：val instanceof Date；③ in 守卫：'property' in val；④ 自定义类型守卫：function isString(val: unknown): val is string { ... }（返回值为「参数 is 类型」的谓词函数）；⑤ 对比守卫：使用 === 或 !== 缩小字面量联合类型。",
    explanation: "类型守卫让 TypeScript 在不使用 any 的情况下也能安全地处理未知类型或联合类型的数据，同时保留类型推断。",
    difficulty: 2,
    tags: ["TypeScript"],
    category: "TypeScript",
  },
  {
    id: "ts-007",
    title: "enum 和 const enum 的区别？enum 有什么问题？",
    type: "qa",
    answer:
      "enum：生成一个对象（包含双向映射），如 enum Color { Red = 0 } 生成 { 0: 'Red', Red: 0 }。const enum：编译时内联，不生成运行时代码，直接替换为常量值。enum 的问题：① 生成额外的运行时代码；② 数字枚举的类型安全性较差（任意数字可以赋值给枚举类型）；③ 字符串枚举通常是更好的选择（严格匹配）。",
    explanation: "现代 TypeScript 项目中，普通 enum 的使用正在减少，越来越多开发者使用 const enum（减少打包体积）或直接用联合类型替代。",
    difficulty: 3,
    tags: ["TypeScript"],
    category: "TypeScript",
  },
  {
    id: "ts-008",
    title: "TypeScript 的装饰器模式和实际应用？",
    type: "qa",
    answer:
      "装饰器是一种特殊声明，可以附加到类、方法、属性、参数上，用于在不修改原始代码的情况下增强功能。TS 5.0+ 原生支持 Stage 3 装饰器提案（与旧版 experimentalDecorators 不同）。实际应用：① 依赖注入（如 Angular）；② 日志记录；③ 权限验证；④ 缓存（自动缓存方法结果）；⑤ 路由定义（装饰器声明路由）。",
    explanation: "TS 5.0 的装饰器（Stage 3）与旧版装饰器不兼容，主要区别：新装饰器不会改变类型，更简洁。大多数框架目前仍在使用旧版装饰器。",
    difficulty: 3,
    tags: ["TypeScript"],
    category: "TypeScript",
  },
];
