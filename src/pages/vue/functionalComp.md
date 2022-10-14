<script setup lang="ts">
import FunctionalComp from '~/components/FunctionalComp.vue'
</script>

# 创建函数式组件

函数式组件是一种定义自身没有任何状态的组件的方式。它们很像纯函数：接收 props，返回 vnodes。
函数式组件在渲染过程中不会创建组件实例 (也就是说，没有 this)，也不会触发常规的组件生命周期钩子。

> 我们可以使用h()来创建函数式组件, [官网详细介绍](https://cn.vuejs.org/guide/extras/render-function.html#v-model)

## 1. 定义

```ts
// script setup
const ListComponent = (props: any, { slots, emit, attrs }) => {
  const { list, activeIndex } = props
  const handleToggle = (i: number) => emit('toggle', i)
  const listVNodes = list.map((item: any, index: number) => {
    return h('div', {
      key: index,
      style: {
        width: '200px',
        height: '40px',
        paddingLeft: '1rem',
        border: '1px solid #1DB954',
        listStyle: 'none',
        cursor: 'pointer',
        backgroundColor: index === activeIndex ? '#1DB' : null,
      },
      onClick: () => handleToggle(index),
    }, item.name)
  })

  return h('ul', {}, listVNodes)
}

ListComponent.props = ['list', 'activeIndex']

const list = [{
  name: 'vue',
}, {
  name: 'vue2',
}, {
  name: 'vue3',
}]

const activeIndex = ref<number>(0)

function toggle(index: number) {
  activeIndex.value = index
}
```

## 2. 使用

```html
<ListComponent
  :list="list"
  :active-index="activeIndex"
  @toggle="toggle"
/>
```

## 3. 效果预览

> 点击可切换激活状态

<FunctionalComp />
