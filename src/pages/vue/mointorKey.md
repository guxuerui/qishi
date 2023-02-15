# Vue3中监听组合按键

## 1. JS中键盘事件监听

* 键盘事件监听：onkeydown（键盘按键按下） 或 onkeyup（键盘按键释放）。
* 判断指定按键是否被按下：
  * e.ctrlKey: Ctrl 键是否被按下，是则返回 true。
  * e.metaKey: Meta 键 (Mac上是 ⌘ Command 键；Windows上是 ⊞ 键)是否被按下，是则返回 true。
  * e.key：返回按键的标识符。S 键如果被按下则返回的就是字符 'S' (区分大小写)。
* 阻止默认事件：e.preventDefault() 或 return false。

## 2. 在Vue3中监听键盘事件，可以使用@keydown指令来为特定的按键添加键盘事件监听器

以下是在Vue中监听 "command+k" 键盘事件的示例：

* HTML:

```html
<template>
  <div>
    <p>Press Command (Mac) or Ctrl (Windows) + K to trigger the event.</p>
  </div>
</template>
```

* TS

```ts
import { onBeforeUnmount, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'

function handleKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.code === 'KeyK') {
    console.log(e.code, e.key)
    console.log('Command (Mac) or Ctrl (Windows) + K was pressed')
    // 执行你的操作
    e.preventDefault()
  }
}

const cleanup = useEventListener(document, 'keydown', (e: KeyboardEvent) => {
  handleKeyDown()
})

onBeforeUnmount(() => {
  cleanup()
})
```

在这个例子中，我们在组件的 `onMounted` 生命周期钩子中添加了一个键盘事件监听器，当用户按下键盘上的 "command"（Mac）或 "Ctrl"（Windows）键以及 "K"键时，`handleKeyDown` 方法会被调用。

在这个方法中，我们检查 `event` 对象的 `metaKey` 属性是否为 `true`（用于检查 "command" 或 "Ctrl" 键是否被按下）以及 `code` 属性是否为 `KeyK`（用于检查 "K" 键是否被按下），如果都为`true`，就可以执行后续的操作了。

> 注意，在组件销毁前，我们使用 `onBeforeUnmount` 生命周期钩子来移除事件监听器，以防止在组件被销毁后仍然保留监听器。
