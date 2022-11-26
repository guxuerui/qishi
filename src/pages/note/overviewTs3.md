# 纵览TypeScript之类型的父子关系

## 1. 基础

类型是有父子关系的，子类型的值可以赋值给父类型，但是父类型的值是不能赋值给子类型的。
例如:

```ts
type ParentType = 1 | 2 | string
type SubType = 1

let parentData: ParentType = 2
let subData: SubType = 1

subData = parentData // 报错，父类型不能赋值给子类型
parentData = subData // ok
```

**这一特性对于泛型和条件判断有至关重要的作用**

**类型中的条件语句:**

```ts
type IsSub = SubType extends ParentType ? true : false // IsSub 的类型为true
```

## 2. 扩展

> 了解了父子类型的基本概念后，还需要掌握在`类型数据`和`值`中提到的各种TS类型之间的父子关系

### 1. 具体值是基础类型的子类型

- `1` 是 `number` 的子类型
- `true` 是 `boolean` 的子类型

```ts
// const a: 1 = 1
const b: number = a // ok

// const c: true = true
const d: boolean = c // ok
```

### 3. 联合类型中的部分是整体的子类型

- `1 | 2` 是 `1 | 2 | 3` 的子类型

### 4. `never` 类型是所有类型的子类型

```ts
function foo(): never {
  throw new Error('Have a error')
}

// 可以赋值，类型不会报错，证明 `never` 类型是 `1` 的子类型
const a: 1 = foo()
```

### 5. 对象判断子类型，需要逐个属性比较

```ts
interface ButtonProps {
  size: 'mini' | 'large'
  type: 'primary' | 'default'
}

interface MyButtonProps {
  size: 'mini'
  type: 'primary' | 'default'
  color: 'red' | 'blue'
}

type IsSubButton = MyButtonProps extends ButtonProps ? true : false // true
```

在进行比较时, 首先 `MyButtonProps` 的 `size` 和 `type` 都是 `ButtonProps` 中对应属性的子类型, 虽然 `MyButtonProps` 比 `ButtonProps` 多了个 `color`, 但它不参与比较

### 6. `undefined` 在tsconfig文件中 `strictNullChecks` 设置为 `true` 的情况下是 `void` 和 `any` 类型的子类型，为 `false` 的情况下则是 除`never` 以外的其它类型的子类型

```ts
// strictNullChecks 为true (默认行为)
let a: undefined

// let b: number = 1
const c: void
let d: any = 'qishi'

// b = a // error, undefined不是其它类型的子类型
c = a // ok, undefined是 void 类型的子类型
d = a // ok, undefined是 any 类型的子类型
```

```ts
// strictNullChecks: false

let a: undefined

// let b: number = 1
const c: void

// b = a // ok, undefined是其它类型的子类型
c = a // ok, undefined是 void 类型的子类型
d = a // ok, undefined是 any 类型的子类型
```

### 7. 父子关系与联合类型 

当子类型与父类型组成联合类型时，实际效果等于父类型。例如:

```ts
type A = number | 1 // number
type B = never | string // string(前面说了never是所有类型的子类型)
```
 
