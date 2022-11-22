# 纵览TypeScript之类型数据和值

TS基础类型:

- 字符串: string
- 数字: number
- 布尔: boolean
- 数组: number[] | string[]
- 元组: [number, string]
- 枚举: enum Color { RED, GREEN, BLUE }
- any
- void
- null | undefined
- never
- object: interface { name: string }

**还可能有其他类型的值, 比如:**

```ts
type A = 1
const a: A = 1 // 完全正确

// type B = { name: 'gu', age: 18 }
// const b: B = { name: 'gu', age: 18 } // 毫无报错

type C = [1, number, 2, string]
const c: C = [1, 111, 2, 'hello'] // 没毛病

type S = `num - ${A}` // 'num - 1' 可以使用模板字符串, 简直离谱
const s: S = 'num - 1' // okok
```

> 结论: **JS中合法的值，在TS类型中同样合法，也就是说 _TS类型的值 = TS基础类型 + JS值_，并且可以混用**
