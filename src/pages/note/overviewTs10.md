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
