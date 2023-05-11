---
title: 纵览TypeScript之元组类型的操作
abstract: 在元组中也可以像对象那样，在元组前加上 `readonly` 代表元组的每一项都是只读的。
tags: note
date: 2023-12-01
chipColor: teal
---

# 纵览TypeScript之元组类型的操作

## 1. 只读修饰符 & 父子关系

在元组中也可以像对象那样，在元组前加上 `readonly` 代表元组的每一项都是只读的。例如:

```ts
type Arr = readonly [1, string]
const a: Arr = [1, '2']

a[0] = 3 // Error: readonly
```

如果两个类型元素完全相同，只读的和非只读的变量是有父子关系的: 非只读变量是只读变量的子类型。

```ts
type A = readonly [1, 2, 3]
type B = [1, 2, 3]

let a: A = [1, 2, 3]
let a: B = [1, 2, 3]

a = b // 非只读变量可以赋值给只读变量
b = a // 反过来则不能
```

## 2. 元组的解构

元组的解构和JS数组的解构十分相似。假设需要将两个元组类型合并为一个，可以如下操作:

```ts
// JS 合并数组
function concat(arr1, arr2) {
  return [...arr1, ...arr2]
}
const arr = concat([1], [2, 3]) // [1, 2, 3]

// TS 合并两个元组
type Concat<T extends any[], U extends any[]> = [...T, ...U]
type Res = Concat<[1], [2, 3]> // [1, 2, 3]
```

`readonly` 的元组转为非 `readonly` 时，可以使用解构完成。例如:

```ts
type A = readonly [number, string]
type B = [...A] // 变为非readonly了

const b: B = [1, 'gxr']
b[0] = 22 // 不报错
```

**因为 `readonly` 是针对整个元组而言的，所以通过解构，就可以将每个元素取出来了，重新赋值给另一个变量类型就解决了，反之亦然**

## 3. 元组的遍历

有些情况下，需要对每个元素进行判断和处理，此时就需要使用元组的遍历，元组的遍历有两种方式

- 递归遍历
- 对象类型遍历

### 1. 递归遍历

以 `多维元组拍平为一维元组` 为例:

```ts
// JS
function flatten(arr) {
  if (arr.length === 0)
    return []
  const [first, ...reset] = arr
  if (Array.isArray(first))
    return [...flatten(first), ...flatten(reset)]

  return [first, ...flatten(reset)]
}

const a = flatten([1, [[2]]]) // [1, 2]

// TS
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest] ?
    (First extends any[] ? [...Flatten<First>, ...Flatten<Rest>] : [First, ...Flatten<Rest>])
  : []

type a = Flatten<[1, [[2]]]> // [1, 2]
```

两种处理逻辑几乎一致:

- 首先判断是否能够解构为符合要求的元组，如果不能，直接返回空元组
- 如果能，再判断元组的第一个元素是否为元组
  - 如果是，调用 `Flatten<First>` 继续处理
  - 如果不是，直接放到返回值的第一个元素
- Rest就是剩下的元素，调用 `Flatten<Rest>` 继续处理

最终返回的类型就是通过递归拍平的元组类型了

### 2. 对象类型遍历

```ts
// JS: 将[1, () => 2 + 3, 4] -> [1, 5, 4]
function getArrVal(arr) {
  for (const key in arr) {
    if (typeof arr[key] == 'function')
      arr[key] = arr[key]()
  }
  return arr
}

// TS: 将[1, () => number, string] -> [1, number, string]
type GetType<T extends any[]> = {
  [K in keyof T]: T[K] extends () => infer R ? R : T[K]
}
```

总结:

- **两种处理方式都能遍历到每个元素，并对每个元素做一些判断和处理**
- **除了会在增加元素数量(`Flatten`示例)的情况时必须使用递归的模式，其他情况可任选**

## 4. 元组与索引、联合类型

元组其实就是个数有限、类型固定的数组类型，所以也可以用数字作为下标来访问，例如:

```ts
type tupleStr = ['a', 'b', 'c']
type A = tupleStr[0] // a
type B = tupleStr[1] // b
```

如果索引是 `number` 呢？

```ts
type tupleStr = ['a', 'b', 'c']
type UnionStr = tupleStr[number] // 联合类型: 'a' | 'b' | 'c'
```

因为 `number` 代表了可能是0，也可能是1或2，所以这些可能性组成的集合就是联合类型
