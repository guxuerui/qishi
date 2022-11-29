# 纵览TypeScript之对象类型的操作

## 1. 属性修饰

对象的属性是可以有修饰符的，目前有两种修饰符，分别是 `readonly` 关键字对应的只读属性和 `?` 对应的可选属性。例如:

```ts
interface IPerson {
  name: string
  age?: number // 可选属性
  readonly id: number // 只读属性
}

const person: Person = {
  name: 'qishi',
  id: 1
}
person.id = 2 // 报错: 不可修改只读属性
person.age = 18 // ok
```

## 2. 属性修饰与父子关系

父子类型主要讨论属性的存在与否，所以:

- 可选类型会导致父子关系的出现，因为可选类型相当于 `自身 | undefined`, 它是必填类型 `自身` 的父类型
- `readonly` 不会导致对象之间的父子关系

```ts
interface A {
  name: string
}
interface B {
  name?: string
}

let a: A = { name: 'a' }
let b: B = {}

a = b // 报错，类型中name是 `string | undefined`， 是A类型中 `string` 的父类型，所以不能赋值
b = a // 正常
```

```ts
interface A {
  name: string
}
interface B {
  readonly name: string
}

let a: A = { name: 'a' }
let b: B = {}

a = b // OK
b = a // OK

a.name = 'JOJO' // OK, a的类型还是 `A` ，所以可以修改
b.name = 'diao' // 报错，不可修改
```
