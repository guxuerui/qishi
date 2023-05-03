---
title: 在JS中判断类型
abstract: 在JS中, 判断变量类型有多种方法, typeof只能区分基本数据类型, 对于null、Array、function、object来说，需要其它方法来进行判断。
tags: js
date: 2023-05-03
chipColor: yellow
---

# 在JS中判断类型

> 在JS中, 判断变量类型有多种方法, typeof只能区分基本数据类型, 对于null、Array、function、object来说，需要其它方法来进行判断

## 1. typeof

* 对于原始类型，除了typeof null都可以正确返回类型

```js
typeof 1; // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined', 它表示 *缺少值*, 即此处应有一个值, 但还没有定义, 且转为数值时为 `NaN`
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

## 3. Object.prototype.toString.call()

> 可以使用此方法更精准的判断某个对象属于哪种内置类型

* 判断基本类型

```js
Object.prototype.toString.call(1)         // '[object, Number]'
Object.prototype.toString.call('')        // '[object, String]'
Object.prototype.toString.call(true)      // '[object, Boolean]'
Object.prototype.toString.call(undefined) // '[object, Undefined]'
Object.prototype.toString.call(null)      // '[object, Null]'
```

* 判断原生引用类型

```js
// Function
function foo() {
  console.log('foo')
}
Object.prototype.toString.call(foo) // '[object, Function]'
```

```js
// Date
const date = new Date()
Object.prototype.toString.call(date) // '[object, Date]'
```

```js
// Array
const arr = [1, 2, 3]
Object.prototype.toString.call(arr) // '[object, Array]'
```

```js
// RegExp
const reg = /[0-9]/gi
Object.prototype.toString.call(reg) // '[object, RegExp]'
```

```js
// Customize
function Person(name, age) {
  this.name = name
  this.age = age
}
const person = new Person('qishi', 18)
Object.prototype.toString.call(person) // '[object, Object]'
```

> 很明显此方法并不能准确判断 `person` 是否为 `Person` 的实例, 此时用 `instanceof` 来判断更为合适

* 判断原生JSON对象

```js
const isNativeJSON = window.JSON && Object.prototype.toString.call(JSON)
console.log(isNativeJSON) // '[Object, JSON]'
```
