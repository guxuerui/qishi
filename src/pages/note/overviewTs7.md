# 纵览TypeScript之类型中的函数(泛型)

## 1. 泛型基础和定义

TS泛型就像JS的函数一样，可以根据输入的类型，决定返回的类型。例如:

```ts
// JS函数
function foo(arg) {
  return org
}

// TS泛型
type Foo<T> = T
```

`foo` 函数作用是，你传给它什么值，它就返回什么值；Foo泛型则是你给它什么类型，它就返回什么类型。

除了上面的定义方式，还可以使用 `interface` 定义。例如:

```ts
interface FormData<T> {
  name: string
  data: T
}
```

## 2. 泛型约束

写JS函数的时候，为了代码的健壮性，通常会对输入参数进行校验，泛型中通过 `extends` 关键字也实现了类似的功能。例如:

```ts
// 函数
class Person {
  name: string
}

function getName(user) {
  if (!(user instanceof Person))
    throw new TypeError(`${user} is not instanceof Person`)
  return user.name
}

// 泛型
type GetName<U extends Person> = U['name']
```

## 3. 泛型参数默认值

ES6后函数支持参数默认值，同样的，在TS中，泛型也有默认值的能力。例如:

```ts
// js 函数参数默认值
function getSum(a = 0, b = 0) {
  return a + b
}
const sum = getSum() // 0

// TS 泛型默认值
type UnionType<T = number, U = string> = T | U
type MyType = UnionType // -> string | number
```

## 4. 泛型与条件判断

当配合条件语句时，泛型的灵活性就更大了。例如:

```ts
type IsBoolean<T> = T extends boolean ? true : false

type A = IsBoolean<true> // true
type B = IsBoolean<1> // false
```

```ts
// 嵌套条件语句
type Upper<T extends string> = T extends 'a'
  ? 'A'
  : (
      T extends 'b' ? 'B' : T // 嵌套了另一个条件语句
    )

type B = Upper<'b'> // 'B'
```
