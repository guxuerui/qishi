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

## 5. 泛型与条件和类型推断变量

这里要引入一个关键词 `infer`

`infer` 可以在 `X extends Y ? expr1 : expr2` 的 `Y` 中使用类型变量，并且这个类型变量，可以在后续的 `expr1` 中使用

例如当需要得到函数的返回值的类型可以如下操作:

```ts
type ReturnType<T> = T extends ((...args: any) => infer R) ? R : never

type GetSum = (a: number, b: number) => number

type A = ReturnType<GetSum> // number
```

其中，`R` 是类型推断变量, **`extends` 是一个大忙人:**

- 在JS中，担当类的继承重担，例如 `App extends Component`
- 在TS中，担当泛型约束，例如 `type ToUpper<S extends string> === xxx`
- 在TS类型中，条件判断的关键词 `type ReturnType<T> = T extends () => infer R ? R : never`

## 6. 内置泛型工具

TS内置了一些极其有用的泛型工具:

```ts
interface Person {
  name: string
  age: number
  id: number
}

// Pick 挑选出指定属性，生成新对象类型
type UserInfo = Pick<Person, 'name' | 'age'> // 挑选出 { name: string; age: number }

// Omit 排除指定的属性，生成新的对象类型
type UserInfo2 = Omit<Person, 'id'> // 排除id, 生成 { name: string; age: number }

// Partial 将对象所有属性变为可选
type PartialPerson = Partial<Person> // { name?: string; age?: number; id?: number }

// Readonly 将对象所有属性变为只读
type ReadonlyPerson = Readonly<Person> // { readonly name: string; readonly age: number; readonly id: number}

// Record 生成对象类型
type PersonMap = Record<number, Person> // { [index: number]: Person }

// Exclude 排除指定key，返回联合类型
type UserInfoKeys = Exclude<keyof Person, 'id'> // 'name' | 'age'
```

## 7. 实例

- 传递多种类型的参数

```ts
// 参数类型为number
function Person(arg: number): number {
  return arg
}

// 参数类型变为string
function Person(arg: string): string {
  return arg
}

// 参数类型变为number或string
function Person(arg: number | string): number | string {
  return arg
}

// 使用泛型解决上述问题
function Person<T>(arg: T): T {
  return arg
}

// 以泛型方式调用, 都是正常的
Person(22)
Person('33')
Person(true)
```

- 约束检查对象上是否存在 key

```ts
const Obj = { one: 'list', two: 'topic' }
function getType<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
getType(Obj, 'one')
getType(Obj, 'four')
// error, type 类型 `four` 的参数不能赋给类型"one" | "two"的参数
```
