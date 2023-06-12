---
title: svg圆环组件
abstract: 在工作中需要实现一款带有渐变颜色的圆环进度条组件, 由于在现有图表组件库中没有找到合适的, 所以自己使用svg实现一个
tags: vue
date: 2023-06-12
chipColor: green
---

<script setup lang="ts">
import CircleProgressBar from '~/components/CircleProgressBar.vue'
</script>

# svg圆环组件

> 工作中需要实现一款带有渐变颜色的圆环进度条组件, 由于在图表组件库没有找到现成的, 所以使用svg实现一个

<div align="center">
  <CircleProgressBar title="在线率" percentValue="66.6%" />
</div>

## 1. 首先画一个svg圆环

定义一个子组件

```html
<svg width="195" height="195" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grident" x1="0%" y1="0%" x2="102%" y2="101%">
    <stop :stop-color="startColor" offset="0%" />
    <stop :stop-color="endColor" offset="100%" />
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <g transform="translate(8 14)" stroke="url(#grident)" stroke-width="12">
    <circle opacity=".5" cx="86.5" cy="86.5" r="86.5" />
    <path d="M86.5 0C134.273 0 173 38.727 173 86.5S134.273 173 86.5 173 0 134.273 0 86.5 38.727 0 86.5 0z" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="226,301,226,299" class="progress-bar" />
    </g>
    <text font-size="40" font-weight="300" :fill="valueColor" :transform="useTranslate()">
    <tspan x="0" y="20">{{ percentValue }}</tspan>
    </text>
    <text font-size="20" font-weight="300" :fill="titleColor" transform="translate(68 104)">
    <tspan x="0" y="30">{{ title }}</tspan>
    </text>
  </g>
</svg>
```

## 2. 再将所需属性传入子组件中

在 `<script setup lang="ts">` 中定义所需的 `props`

```js
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
  percentValue: {
    type: String,
    default: '0%',
  },
  startColor: {
    type: String,
    default: '#25AABE',
  },
  endColor: {
    type: String,
    default: '#C2FE89',
  },
  valueColor: {
    type: String,
    default: '#80BD68',
  },
  titleColor: {
    type: String,
    default: '#eee',
  },
})
```

## 3. 修改圆环的css样式, 添加加载动画

```css
.progress-bar {
  stroke-dasharray: 544;
  animation-name: write;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes write {
  0% {
    stroke-dashoffset: 544;
  }
  100% {
    stroke-dashoffset: v-bind(strokeValue);
  }
}
```

此处需要动态计算圆环的进度值，使用一个 `computed` 来计算，并用 `v-bind` 来绑定

```js
// 圆环进度
const strokeValue = computed(() => {
  return 544 - (+(parseFloat(props.percentValue) / 100 * 544).toFixed(0))
})
```

## 4. 优化

到这里可能会发现中间的 `value` 值位置会发生偏移，因为这里是用偏移量(`translate`)来定位的，所以需要动态处理一下，此处默认传入值最多有一位小数(比如33.4%)

```js
function useTranslate() {
  switch (props.percentValue.length) {
    case 5:
      return 'translate(35 84)'
    case 4:
      return 'translate(48 84)'
    case 3:
      return 'translate(58 84)'
    default:
      return 'translate(70 84)'
  }
}
```

> [组件完整源码](https://github.com/guxuerui/qishi/blob/main/src/components/CircleProgressBar.vue)