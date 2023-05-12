---
title: 纵览TypeScript之获取类型所有属性key
abstract: 在TS中想要知道对象有哪些属性，可以使用 `keyof` 关键词。
tags: note
date: 2023-11-26
chipColor: teal
---

# 纵览TypeScript之获取类型所有属性key

在TS中想要知道对象有哪些属性，可以使用 `keyof` 关键词。例如:

```ts
interface Person {
  name: string
  age: number
}

// 返回属性的联合类型，结果是: type Keys = 'name' | 'age'
type Keys = keyof Person

// OK
const test: Keys = 'name'
// OK
const test2: Keys = 'age'
// 报错, type '123' is not assignable to type 'keyof Person'
const test3: Keys = 123
```

**⚠️  箭头函数类型和空对象没有 `key`。** 例如:

```ts
type F = () => void
type K = keyof F // never
type Foo = keyof {} // never
```
