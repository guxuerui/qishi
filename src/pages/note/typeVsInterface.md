---
title: TS中Type和Inrerface的区别
abstract: 日常开发中会经常使用到类型约束，但有时候会对type和interface到底有什么区别，到底应该用哪一个产生疑惑。
tags: note
date: 2022-07-25
chipColor: teal
---

## TS中Type和Inrerface的区别

> 日常开发中会经常使用到类型约束，但有时候会对type和interface到底有什么区别，应该用哪一个产生疑惑，所以今天做下总结

### 1. 什么是类型别名(Type Aliases)

简单讲就是给一个类型起的别名。比如`type MyType = string`, 就是给`string`类型起了一个别名`MyType`, 它本质上还是指的是基础类型`string`，<a href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases" target="_blank">更多详细内容可见官方文档</a>。

**语法示例:**

```ts
/*
  type Person = {
    age: number
    height: number
  }
*/

function Hello(person: Person) {
  console.log(`my age is${person.age}, and my height is ${person.height}`)
}

Hello({ age: 18, height: 180 })
```

还可以声明联合类型

```ts
type ID = number | string
```

>Tips: 类型别名就只是类型别名，当使用类型别名时，相当于在使用这个类型

比如下面的例子，实际上都是使用的 `string` 类型约束

```ts
type UserInput = string

function outPut(msg: string): UserInput {
  return `I am the ${msg}`
}

outPut('test input')
```

### 2. 什么是接口(Interface)

`interface`可以对传入的数据结构和数据类型做出约束，方便的帮我们定位问题。

```ts
interface Person {
  age: number
  height: number
}

function Hello(person: Person) {
  console.log(`my age is${person.age}, and my height is ${person.height}`)
}

Hello({ age: 18, height: 180 })
```

### 3. 它们之间的区别

可以看出，`类型别名`和`接口`非常相似，绝大多数情况下都是可以自由选择使用的，`接口`的绝大部分功能都可以通过`类型别名`来实现，关键的区别在于`类型别名`不能重新声明以添加新的属性，而`接口`却总是可以扩展的。

- Interface

  1. 扩展接口

     ```typescript
     interface Animal {
      name: string   
     }
     
     interface Dog extends Animal {
      age: number
     }
     // 结果是 ->
     interface Dog {
      name: string
      age: number
     }
     ```

  2. 增加新的字段，可以自动合并

     ```typescript
     interface Person {
         name: string
     }
     
     interface Person {
         age: number
     }
     // 结果是 ->
     interface Person {
         name: string
         age: number
     }
     
     const person: Person = {
         name: 'jack',
         age: '18'
     } 
     console.log(person.name, person.age)
     ```

- Type

  1. 使用`&`操作符扩展类型别名(就是类型合并)

     ```typescript
     type Animal = {
         name: string
     }
     
     type Dog = Animal & {
         age: number
     }
     
     //结果是 ->
     type Dog = {
         name: string
         age: number
     }
     ```

  2. 类型别名不能重复声明

     ```typescript
     type Person  = {
         name: string
     }
     
     type Person = {
         age: number
     }
     // Error: Duplicate identifier 'Person'
     ```

### 4. 到底应该用哪个

> Because an interface more closely maps how JavaScript objects work by being open to extension, we recommend using an interface over a type alias when possible.
> On the other hand, if you can’t express some shape with an interface and you need to use a union or tuple type, type aliases are usually the way to go.

其实就是说因为`interface`更接近JavaScript对象的工作方式，所以建议只要能用`interface`就用`interface`，不能用的话再用`type`。比如当你不能用`interface`定义某些结构或者需要定义联合类型或元祖类型的时候，通常就使用`type`。

### 5. 总结

一般来说，可以在开发中全程使用`interface`，而如果使用的是面向对象Class开发，则应该更严谨些，除非明确要使用`interface`的场景，否则都应该使用`type`。
