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

> 总结: `ref()` 可以设置原始类型变量, `reactive()` 不可以设置原始类型变量, 但都可以设置对象类型变量

## 2. 访问响应式变量的值

第二个不同是访问响应式变量的值的 `方式`

### 2.1 ref()

在 `<scrip>t` 中, 需要使用 `.value` 来访问

```js
import { ref } from 'vue'

const num = ref(0)
console.log(num.value) // -> 0

const obj = ref({ count: 0 })
console.log(obj.value.count) // -> 0
```

但是, 在模板中使用是不需要 `.vlaue` 的, 会自动解包

```html
<template>
  <span>{{ num }}</span>
  <span>{{ obj.count }}</span>
</template>
```

### 2.2 reactive()

可以直接访问

```js
import { reactive } from 'vue'

const obj = reactive({ count: 0 })
console.log(obj.count) // -> 0
```

```html
<template>
  <span>{{ obj.count }}</span>
</template>
```

响应式对象 `obj` 是原始对象 `{ count: 0 }` 的代理对象, 与其有着相同的属性

> 总结: `ref()` 访问值需要使用 `.value`, 且在模板中使用是不需要使用 `.value`, 而 `reactive()` 访问值可以直接使用

## 3. 重新赋值

`ref()` 变量使用 `.value` 访问和更新, 而 `reactive()` 是原始对象的代理, 所以 `ref()` 变量可以重新赋值一个新对象, 但是 `reactive()` 不可以

### 3.1 ref()

给 `ref()` 变量重新赋值新对象是完全可以的

```js
import { ref, onMounted } from 'vue'

const num = ref({ count: 0 })

onMounted(() => {
  num.value = { count: 1 }
})
```

```html
<template>
  <span>{{ num.count }}</span>
</template>
```

这时最后值展示为 `1`, 变量保持了响应性

### 3.2 reactive()

```js
import { reactive, onMounted } from 'vue'

let obj = reactive({ count: 0 }) // 不能用const

onMounted(() => {
  obj = { count: 1 }
})
```

```html
<template>
  <span>{{ obj.count }}</span>
</template>
```

这时页面上值仍然为 `0`, 并不能保持响应性

**那么如何做才能保持响应性?**

```js
import { reactive, onMounted } from 'vue'

let obj = reactive({ count: 0 })
let obj2 = reactive({ count: 2 })

onMounted(() => {
  obj = Object.assign(obj, { count: 1 })
  obj2 = Object.assign(obj1, { count: 3 })
})
// 此时可以做到保持变量响应性, 但是 `obj` 得值会被改变, 和 `obj2` 同为 `{ count: 3 }`
```

> 总结: `ref()` 变量可以直接被重新赋值为一个新对象, 而 `reactive()` 不可以

## 4. 类型

### 4.1 ref()

- 若直接使用 `ref()` 值, 可使用 `Ref` 定义, 比如

```js
import { computed, ref, Ref } from 'vue'

const num: Ref<number> = ref(0)
export const useIsEven = (num: Ref<number>) => {
  return computed(() => num.value % 2 === 0)
}
const isEven = useIsEven(num)
```

- 若使用 `.value` , 可直接定义, 比如

```js
import { computed, ref } from 'vue'

const num = ref<number>(0)
export const useIsEven = (num: number) => {
  return computed(() => num.value % 2 === 0)
}
const isEven = useIsEven(num.value)
```

- 也可在具体使用时, 通过 `toValue()` 自动解包变量, 此时传入 `ref` 变量或 `普通变量` 都可以, 比如

```js
import { computed, ref, toValue } from 'vue'

const num = ref<number>(0)
export const useIsEven = (num: Ref<number>) => {
  return computed(() => toValue(num) % 2 === 0)
}
const isEven = useIsEven(num)
```

### 4.2 reactive()

通常使用 `对象类型` 或 `interface` 为 `reactive()` 对象定义类型, 比如

```js
import { reactive } from 'vue'

const obj: { count: number } = reactive({ count: 0 })
```

`reactive()` 通常会保留原始对象的类型, 但有一种例外, 如果对象中包含 `ref()` 值, 它们会被自动解包, 比如

```js
import { ref, reactive } from 'vue'

const obj: { count: number } = reactive({ count: ref(0) })
```

此时尽管 `count` 的值是 `ref(0)`, 但是返回的类型仍然是 `{ count: number }`, 因为 `reactive()` 会自动解包对象中找到的 `ref()` 引用

> 总结: `ref(value: T)` 返回的引用类型是 `Ref<T>`，而 `reactive(object: T)` 返回的响应式对象类型是 `T`（另外：`reactive()` 中的引用会被自动解包）

## 5. 数据监听

`watch()` 监听响应性数据变化, 但对于 `ref()` 和 `reactive()` 的默认行为是不同的

### 5.1 ref()

`watch()` 会判断 `.value` 是否发生了变化

```js
import { ref, watch } from 'vue'

const num = ref(0)

watch(num, () => {
  console.log('changed!')
})

// or
// watch(() => num.value, (newVal, oldVal) => {
//   console.log('changed!', newVal, oldVal)
// })

function increase() {
  num.value++
}
```

```html
<template>
  <button @click="increase">+1</button>
</template>
```

每点击一次按钮, `num.value` 的变化都会触发 `watch()` 回调.

那么, 如果是监听一个对象数据呢? 还可以触发 `watch()` 回调么, 比如:

```js
import { ref, watch } from 'vue'

const obj = ref({ count: 0 })

watch(obj, () => {
  console.log('changed!')
})

function increase() {
  obj.value.count++
}
```

```html
<template>
  {{ obj.count }}
  <button @click="increase">+1</button>
</template>
```

当点击按钮时, 会发现页面上的输出是响应性变化的, 但是控制台中是没有输出的, 说明 `watch()` 默认是不会深度监听ref对象的.

只需这样:

```js
// ...
watch(obj, () => {
  console.log('changed!')
}, { deep: true })
// ...
```

### 5.2 reactive()

在监听 `reactive()` 数据时, `watch()` 总是会表现为深度监听, 即使没有设置 `{ deep: true }`

```js
import { reactive, watch } from 'vue'

const obj = reactive({ counter: { value: 0 } })

watch(obj, () => {
  console.log('changed!')
})

function increase() {
  obj.counter.value++
}
```

```html
<template>
  {{ obj.counter.value }}
  <button @click="increase">+1</button>
</template>
```

每次点击按钮时, 可以看到页面和控制台的输出都是响应性变化的, 每当 `obj` 的任何属性(包括深层属性)发生变化, 都会触发 `watch()` 回调

> 总结: `watch()` 默认监听 `ref()` 的 `.value` 变化, 需通过 `{ deep: true }` 设置深度监听, 而 `reactive()` 默认是深度监听

## 6. 结论

虽然没有严格的规定，但在某些情况下使用特定的响应性函数是更好的选择:

1. 如果需要一个响应式的原始值，那么使用 `ref()` 是正确的选择
2. 如果需要一个响应式的值对象（通常不会改变属性的对象），那么使用 `ref()` 是一个好选择
3. 如果需要一个响应式的可变对象，并且想要跟踪该对象的深层变异属性，那么使用 `reactive()` 是一个好的选择; 如果一定要使用 `ref()`, 则需要手动设置 `{ deep: true }`
