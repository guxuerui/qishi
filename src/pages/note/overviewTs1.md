---
title: 纵览TypeScript之类型变量定义
abstract: 定义类型变量的方式有三种，分别是 `type`,  `interface`,  `enum`,  它们都相当于JS中的 `const`, **一旦定义就不可再改变**。
tags: note
date: 2023-11-20
chipColor: teal
---

# 纵览TypeScript之类型变量定义

## 1. 定义

定义类型变量的方式有三种，分别是 `type`,  `interface`,  `enum`,  它们都相当于JS中的 `const`, **一旦定义就不可再改变**, 三者的区别是:

- `type`:  **使用绝大多数类型，例如普通的值、对象、函数、数组、元组等**
- `interface`  **可以定义函数、对象、类**
- `enum`: **仅用来定义枚举类型**

## 2. 举个栗子

```ts
// type
// type A = string
// type B = number[]
// type C = (num: number) => number
// type D = {
//   age: number
//   name: string
// }

// interface
interface Sum {
  // 函数
  (num1: number, num2: number): number
}

const getSum: Sum = (a: number, b: number) => a + b

interface Person {
  name: string
  age: number
}

// 数字枚举
// 不指定值，则默认为数字，从 0 开始
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

// 指定一个值，则后续的未指定的枚举项回进行自增
enum Direction2 {
  Up = 1, // 1
  Down, // 2
  Left, // 3
  Right, // 4
}

// 字符枚举, 没有值递增特性，需要明确初始化
enum Color {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

// 复合枚举, 也就是枚举值不是同一类型值的枚举, 但是会破坏枚举的本意，使用场景很少，不推荐使用!
enum Mixed {
  No = 0,
  Yes = 'YES',
}
```

**总结: JS中合法的值，在TS类型中同样合法，也就是说 TS类型的值 = TS基础类型 + JS值, 并且可以混用**
