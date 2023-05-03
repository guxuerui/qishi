---
title: 在JS中判断类型
abstract: 在JS中, 判断变量类型有多种方法, typeof只能区分基本数据类型, 对于null、Array、function、object来说，需要其它方法来进行判断。
tags: js
date: 2023-05-03
chipColor: yellow
---

> 在JS中, 判断变量类型有多种方法, typeof只能区分基本数据类型, 对于null、Array、function、object来说，需要其它方法来进行判断

## 1. typeof

* 对于原始类型，除了typeof null都可以正确返回类型

```js
typeof 1; // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined', 它表示 *缺少值*, 即此处应有一个值, 但还没有定义
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof null; // 'object', 但null实际上不是对象, `null` 表示 *没有对象*, 即该处不应有值，且转为数值时为 `0`
```

* 对于对象，除了typeof 函数会返回function，其它情况都会返回object，所以typeof并不能准确判断变量到底是什么类型

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function''
```

## 2. instanceof

* 如果想判断一个对象的正确类型，可以考虑使用instanceof，因为它的内部机制是通过原型链来判断的

```js
[] instanceof Array // true
{} instanceof Object // true
console.log instanceof Function // true 

const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true, 判断p1是否为函数Person的实例

let str = 'hello world'
str instanceof String // false

let str1 = new String('hello world')
str1 instanceof String // true
```

* 而对于原始类型来说，想直接通过instanceof来判断类型是不行的，需要做个封装

```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
```

`Symbol.hasInstance` 是一个可以让我们自定义instanceof行为的方法，以上代码等同于typeof ‘hello world’ === ‘string’，结果自然是true。

**这从侧面反映了instanceof判断类型也不是百分百可信的。**
