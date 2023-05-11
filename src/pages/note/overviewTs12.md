---
title: 纵览TypeScript之联合类型的操作
abstract: 联合类型代表着几种可能性的集合，它在泛型推导中和其他类型都不一样，可以理解为它在做泛型推导时，并不是一次性判断，而是将每一项单独判读并返回，然后再将这些返回进行联合。
tags: note
date: 2023-12-12
chipColor: teal
---

# 纵览TypeScript之联合类型的操作

## 1. 联合类型与泛型推导

联合类型代表着几种可能性的集合，它在泛型推导中和其他类型都不一样，可以理解为它在做泛型推导时，并不是一次性判断，而是将每一项单独判读并返回，然后再将这些返回进行联合

1. 举个栗子:

```ts
type Foo<T> = T extends 'a' | 'b' ? `${T}1` : T

type Bar = Foo<'a' | 'b' | 'c'> // 'a1' | 'b1' | 'c'
```

就像上面说的，并不是将 `'a' | 'b' | 'c'` 一次性判断的，而是

- **先判断`a`，如果是true，返回`a1`**
- **然后判断`b`，如果是true，返回`b1`**
- **再判断`c`，如果是false，返回`c`**
- **最后将`'a1', 'b1', 'c'` 联合成 `'a1' | 'b1' | 'c'` 并返回**

2. 再举个栗子

```ts
interface Cat {
  type: '🐱'
  food: string[]
}

interface Dog {
  type: '🐶'
  food: string[]
}

type Animal = Cat | Dog

type LookUp<U, T> = U extends { type: T } ? U : never

type A = LookUp<Animal, '🐶'> // Dog
```

判断步骤为

- **`Cat` 与 `{type: '🐶}`，会走到false，返回 `never`**
- **`Dog` 与 `{type: '🐶}`，会走到true，返回 `Dog`**
- **`Dog | never` 根据前面讲过的联合类型与父子关系，最终返回的就是 `Dog`**
