# 前端刷题小程序（React + Taro）第一阶段 MVP

目标：

- 7 天内能上线
- 有基础题库
- 有刷题体验
- 能持续扩展

技术栈：

- React
- Taro
- TypeScript

---

# 一、第一阶段功能（必须做）

只做这 6 个页面。

## 1. 刷题首页

功能：

- 分类入口
- 每日一题
- 最近练习
- 学习进度

模块：

```txt
JavaScript
React
Vue
HTML/CSS
工程化
八股文
```

---

## 2. 刷题页

功能：

- 展示题目
- 单选/问答
- 查看答案
- 下一题
- 收藏

---

## 3. 题库列表页

功能：

- 分类筛选
- 难度筛选
- 搜索

---

## 4. 错题本

功能：

- 自动记录
- 再次练习

---

## 5. 收藏页

功能：

- 收藏题目
- 快速复习

---

## 6. 我的页面

功能：

- 连续学习
- 刷题数量
- 学习天数

---

# 二、推荐项目结构

```txt
src
├── api
├── assets
├── components
├── pages
│   ├── home
│   ├── question
│   ├── list
│   ├── wrong
│   ├── favorite
│   └── profile
├── store
├── services
├── mock
├── types
├── utils
└── app.tsx
```

---

# 三、题库数据结构（直接可用）

建议：

- 第一阶段直接 JSON
- 后期再换数据库

## question.ts

```ts
export interface Question {
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
```

---

# 四、第一批种子题库（直接能用）

## src/mock/questions.ts

```ts
import { Question } from "@/types/question";

export const questions: Question[] = [
  {
    id: "js-001",
    title: "typeof null 的结果是什么？",
    type: "single",
    options: ["null", "object", "undefined", "boolean"],
    answer: "object",
    explanation: "历史遗留问题，null 在底层被错误判断为 object。",
    difficulty: 1,
    tags: ["JavaScript"],
    category: "JavaScript",
  },
  {
    id: "js-002",
    title: "闭包是什么？",
    type: "qa",
    answer:
      "闭包是函数与其词法作用域的组合，函数能够访问其定义时的作用域变量。",
    explanation: "闭包常用于缓存、函数柯里化、私有变量等场景。",
    difficulty: 2,
    tags: ["JavaScript"],
    category: "JavaScript",
  },
  {
    id: "js-003",
    title: "=== 和 == 的区别是什么？",
    type: "qa",
    answer: "=== 不会进行类型转换，== 会进行隐式类型转换。",
    explanation: "推荐优先使用 === 避免隐式转换带来的问题。",
    difficulty: 1,
    tags: ["JavaScript"],
    category: "JavaScript",
  },
  {
    id: "react-001",
    title: "React 中 key 的作用是什么？",
    type: "qa",
    answer: "帮助 React 识别哪些元素发生变化，提高 diff 效率。",
    explanation: "不要使用随机值或 index 作为 key。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "react-002",
    title: "useEffect 第二个参数的作用是什么？",
    type: "qa",
    answer: "控制副作用执行时机。",
    explanation: "[] 表示仅执行一次，不传表示每次渲染都执行。",
    difficulty: 2,
    tags: ["React"],
    category: "React",
  },
  {
    id: "css-001",
    title: "position 有哪些属性值？",
    type: "single",
    options: [
      "static/relative/absolute/fixed/sticky",
      "top/left/right/bottom",
      "flex/grid/block",
      "inherit/none",
    ],
    answer: "static/relative/absolute/fixed/sticky",
    explanation: "position 用于定义元素定位方式。",
    difficulty: 1,
    tags: ["CSS"],
    category: "HTML/CSS",
  },
  {
    id: "eng-001",
    title: "什么是 Tree Shaking？",
    type: "qa",
    answer: "Tree Shaking 是移除 JavaScript 未使用代码的优化方式。",
    explanation: "通常依赖 ES Module 静态分析。",
    difficulty: 3,
    tags: ["Webpack"],
    category: "工程化",
  },
  {
    id: "vue-001",
    title: "Vue2 响应式原理是什么？",
    type: "qa",
    answer: "Vue2 使用 Object.defineProperty 劫持数据实现响应式。",
    explanation: "Vue3 改为 Proxy。",
    difficulty: 3,
    tags: ["Vue"],
    category: "Vue",
  },
];
```

---

# 五、刷题页面核心逻辑（直接能抄）

## pages/question/index.tsx

```tsx
import { useState } from "react";
import { View, Button } from "@tarojs/components";
import { questions } from "@/mock/questions";

export default function QuestionPage() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const current = questions[index];

  const nextQuestion = () => {
    setShowAnswer(false);
    setIndex((prev) => prev + 1);
  };

  return (
    <View className="p-4">
      <View className="text-lg font-bold mb-4">{current.title}</View>

      {current.options?.map((item) => (
        <View key={item} className="border rounded p-3 mb-2">
          {item}
        </View>
      ))}

      <Button onClick={() => setShowAnswer(true)}>查看答案</Button>

      {showAnswer && (
        <View className="mt-4">
          <View>答案：{current.answer}</View>
          <View className="mt-2">解析：{current.explanation}</View>
        </View>
      )}

      <Button className="mt-4" onClick={nextQuestion}>
        下一题
      </Button>
    </View>
  );
}
```

---

# 六、推荐 UI 风格

小程序刷题产品建议：

- 黑白极简
- 卡片化
- 留白大
- 强学习氛围

参考方向：

```txt
Notion + 即刻 + 语雀
```

避免：

- 花里胡哨
- 强渐变
- 复杂动画

---

# 七、第一阶段必须做的数据埋点

你后面增长全靠这些数据。

必须记录：

```txt
- 每日刷题数
- 用户停留时间
- 哪类题最常刷
- 哪类题错误率最高
- 收藏率
- 连续学习天数
```

---

# 八、第一阶段不要做的东西

千万别一开始就做：

```txt
❌ AI 面试官
❌ 实时聊天室
❌ 排行榜
❌ 视频课程
❌ 超复杂动画
❌ 后台 CMS
❌ 多端同步
```

先活下来。

---

# 九、你现在最该做的步骤

## 第一步

直接初始化项目：

```bash
pnpm create taro-app
```

选择：

```txt
React
TypeScript
Webpack/Vite
```

---

## 第二步

把上面的 questions.ts 放进去。

---

## 第三步

先把：

```txt
首页
刷题页
错题页
```

做出来。

---

## 第四步

上线微信小程序。

别等。

很多人半年都卡在“准备阶段”。

你要先把第一版发出去。

---

# 十、第二阶段升级路线（未来）

后面你可以加：

## AI 方向

```txt
AI 解析
AI 出题
AI 面试官
AI 学习规划
```

## 增长方向

```txt
连续签到
闯关系统
等级系统
学习报告
```

## 商业化方向

```txt
会员题库
企业面试题
大厂专项
模拟面试
```

---

# 十一、推荐你立刻加的差异化功能

这个很重要。

你不要只做“题库”。

建议做：

## 1. 高频面试追问

比如：

```txt
什么是闭包？
↓
闭包为什么会导致内存泄漏？
↓
如何解决？
```

形成：

```txt
题目树
```

这很像真实面试。

---

## 2. 3 分钟速刷模式

很多人不愿意深度学习。

但愿意：

```txt
每天刷 3 分钟
```

这是留存核心。

---

## 3. 高频错题强化

自动识别：

```txt
用户总错 Promise
```

然后疯狂推 Promise。

这就是学习系统。

---

# 十二、第一阶段最终目标

不是：

```txt
做完产品
```

而是：

```txt
让第一批用户真的每天刷题
```

这个目标完全不同。
