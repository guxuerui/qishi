---
title: 在Vue3中动态创建refs
abstract: 在Vue3中, 有时我们需要操作DOM元素, 动态修改DOM元素的属性等等, 这时可以通过为HTML元素添加ref属性来实现, 那么如何设置ref呢?
tags: vue
date: 2023-08-01
chipColor: green
---

# 在Vue3中动态创建refs

> 在Vu2和Vue3中创建refs的方式是不太一样的

## 1. 在Vue2中

以前在Vue2中, 我们可以直接为HTML元素设置ref, 比如:

```html
<template>
  <div ref="wave" />
</template>
```

然后在script中就可以直接访问了, 比如:

```js
this.$refs.wave.style.color = '#fff';
```

## 2. 在Vue3中

首先，需要设置一个ref变量, 比如:

```js
const wave = ref<any>(null)
```

然后在模板中使用, 比如:

```html
<template>
  <div ref="wave" />
</template>
```

## 3. 动态refs

有时在一个组件中, 需要根据传入的属性来动态创建ref, 比如:

- Vue2中

```html
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'test',
  },
}) 
</script>

<template>
  <div :ref="'waveAfter' + title"></div>
</template>
```

- Vue3中

```html
<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

type refItem = Element | ComponentPublicInstance | HTMLElement | null

const { title = 'test' } = defineProps<{ title: string }>()

// 设置动态refs
const refMap: Record<string, refItem> = {}
const setRefMap = (el: refItem, title: string) => {
  if (el)
    refMap[`${title}`] = el
}
</script>

<template>
  <div :ref="(el: refItem) => setRefMap(el, title)" />
</template>
```

## 4. 告警处理

当设置完ref, 获取对应的DOM元素并设置样式时, 可能会收到类型错误告警:

```js
// 类型“Element | HTMLElement | ComponentPublicInstance”上不存在属性“style”。
//   类型“Element”上不存在属性“style”。ts(2339)
```

这是因为此时 `TS` 无法确定 `ref` 的具体类型, 所以可能会出现属性不存在的告警。

这时可以使用类型断言, 告诉 `TS` 此`ref` 的具体类型为 `HTMLElement`, 比如:

```js
(refMap[title] as HTMLElement).style.color = '#f33';
```
