---
title: ref和reactive的区别
abstract: 在Vue3中定义响应式变量可以使用ref或reactive, 那么什么时候用ref, 什么时候用reactive, 它们又有什么区别呢?
tags: vue
date: 2023-06-29
chipColor: green
---

# ref和reactive的区别

> 在Vue3中定义响应式变量可以使用ref或reactive, 那么什么时候用ref, 什么时候用reactive, 它们又有什么区别呢?

## 1. 变量赋值

`ref()` 和 `reactive()` 处理原始值的表现不同

### 1.1 ref()

`ref()` 可以设置原始类型值和对象类型值

```js
import { ref } from 'vue'

const num = ref(1) // 👌
const obj = ref({ count: 1 }) // 👌
```

`ref()` 也可以设置对象类型值是因为, 当赋值对象的时候, 会使用 'reactive()' 的 `toReactive()` 方法自动处理它的 `.value`,
具体代码看👉🏻 [Vue源码](https://github.com/vuejs/core/blob/3127c4113e6ff381cd8f79a445655f759e08372a/packages/reactivity/src/ref.ts#L157C58-L157C64)

### 1.2 reactive()

`reactive()` 不可以设置原始类型值, 只能设置对象类型值

```js
import { reactive } from 'vue'

const num = reactive(1) // ❌ Argument of type 'number' is not assignable to parameter of type 'object' 
const obj = reactive({ count: 1 }) // 👌
```

因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。
这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失

```js
let state = reactive({ count: 0 })

// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
state = reactive({ count: 1 })
```

同时`赋值`或`解构`或`传入函数`, 将失去响应性

```js
// 赋值
const state = reactive({ count: 1 })
let num = state.count 
num++ // state.count -> 1

// 解构
let { count }  = state
count++ // state.count -> 1

// 此函数接收一个普通数字
// state.count 变化将不再被追踪 
testFn(state.count)
```

> 总结: `ref()` 可以设置原始类型变量, `reactive()` 不可以设置原始类型变量, 且都可以设置对象类型变量

## 2. 访问响应式变量的值
