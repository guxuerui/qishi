---
title: 纵览TypeScript之字符串的操作
abstract: 字符串的操作主要是类型的推导和解构以及类型的遍历。
tags: note
date: 2023-12-08
chipColor: teal
---

# 纵览TypeScript之字符串的操作

字符串的操作主要是两方面:

- 类型的推导和解构
- 类型的遍历

## 1. 字符串类型的推导和解构

即将一个完整字符串分解为几个部分，然后对各个部分可以进行单独处理。在拆分的时候要注意是否含有 `字符串字面量` 作为分割符，
否则分割后的变量含义各不相同

- **推导类型中有 `字符串字面量` 的情况**

比如，将字符串类型中的 `_` 去除:

```ts
type DelUnderline<T extends string> = T extends `${infer LeftWords}_${infer RightWords}`
  ? `${LeftWords}${RightWords}`
  : T

// helloworld（LeftWords 为 hello，RightWords 为 world）
type HelloWorld = DelUnderline<'hello_world'>

// world（LeftWords 为空字符串，RightWords 为 world）
type World = DelUnderline<'_world'>

// hello（LeftWords 为 hello，RightWords 为空字符串
type Hello = DelUnderline<'hello_'>
```

> 当推断类型中有`字符串字面量`作为边界时，如上例的 `_`，其解构的左边 `LeftWords` 是左侧所有字符串的代表，右边 `RightWords` 是右侧所有字符串的代表，并且可以代表空字符串

- **推导类型中无 `字符串字面量`:**

比如，实现单词首字母大写:

```ts
type Capitalize<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : T

// Hello(First 为`h`，Rest为`ello`)
type A = Capitalize<'hello'>

// G(First 为`g`，Rest为'')
type B = Capitalize<'g'>

// 传入空字符串，会直接返回
type C = Capitalize<''>
```

> 当推断类型中没有 `字符串字面量` 作为边界时，第一个变量作为第一个字符，第二个变量代表剩下的字符，可以为空字符串。
当然如果有三个变量 `${A}${B}${C}`，则第一个变量 `A` 代表第一个字符，`B` 代表第二个字符串，`C` 代表剩下的字符，以此类推

## 2.字符串字面量类型的遍历

核心是使用递归思想以及字符串解构，比如将字符串类型转元组类型:

```ts
type StringToTuple<T extends string> = T extends `${infer First}${infer Rest}`
  ? [First, ...StringToTuple<Rest>]
  : [T]

type Foo = StringToTuple<'gxr'> // ['g', 'x', 'r']
```

- 首先将T拆分为 `First` 和 `Rest`, `First` 代表第一个字符，`Rest` 代表剩余字符
- 当是 `true` 时，将`First` 和 `Rest` 分别放入数组中，然后对 `Rest` 递归判断
- 当是 `false` 时，此时 `T` 为空字符串，返回空数组，而不是空字符串
