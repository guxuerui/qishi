---
title: JS中==和===的区别
abstract: JS中==用于一般比较(不严格)，===用于严格比较，==在比较的时候若需要会先转换数据类型；而===是严格比较，只要类型不匹配就返回flase。
tags: js
date: 2023-04-26
chipColor: yellow
---

# 概述

1. JS中 `==` 用于一般比较(不严格), 在比较的时候若需要会先转换数据类型
2. `===` 用于严格比较, 只要类型不匹配就返回flase

## 一、 ==

对于 `==` 来说，若比较双方类型相同，就直接比较值是否相等; 若类型不同, 则会先进行类型转换.

例如比较 x 和 y 是否相等:

* 若类型相同, 则会转换为 `===` 进行比较
* 若一方为 `null`, 且另一方为 `undefined`, 则会返回 `true`
* 若 `x` 是 `number` 类型, `y` 是 `string` 类型, 则比较 `x` == `Number(y)`, 反之亦然
* 若 `x` 为 `boolean` 类型, `y` 为 `number` 类型, 则比较 `Number(x)` == `y`, 反之亦然
* 若 `x` 为 `string`、`symbol` 或 `number` 类型, `y` 为 `Object` 类型, 则比较 `x` == `y.toString()`, 反之亦然
* 除以上情况, 会直接发返回false

**示例**

```js
5 == 5 // true
1 == '1' // true
null == undefined // true
0 == false // true
1 == true // true
'1,2' == [1,2] // true
'[object Object]' == {} // true, {}.toString()会返回'[object Object]'
```

## 二、===

对于 `===` 来说, 就是判断两者类型和值是否都完全相同, 若类型不同会直接返回 `false`, 类型相同再继续比较值是否相等

**示例**

```js
5 === 5 // true
1 === '1' // false
null === undefined // false
0 === false // false
1 === true // false
'1,2' === [1,2] // false
'[object Object]' === {} // false
```

## 三、活学活用

问题: 构造一个对象 `a`, 使它同时满足条件 `a == 1 && a == 2 && a == 3`

```js
let a = {
  i: 1,
  toString: function () {
    return a.i++;
  }
} 

// 对象进行 == 判断时会先调用 toString() 进行类型转换
if (a == 1 && a == 2 && a == 3) {
  console.log(1);
} else {
  console.log(2);
}
// -> 1
```
