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
  if (!(user instanceof Person)) {
    throw new Error(`${user} is not instanceof Person`)
  }
  return user.name
}

// 泛型
type GetName<U extends Person> = U['name']
```
