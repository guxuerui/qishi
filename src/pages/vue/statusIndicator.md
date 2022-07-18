# 使用Vue3重构状态指示灯组件

## 背景
在日常开发中，经常需要展示当前账号或者设备等等的状态，为了能够有更好的展示效果，打算使用呼吸式的指示灯效果，所以使用`vue3+TS`重新开发了此状态指示灯组件

## 组件开发

### 1. 首先在components文件夹下, 创建statusIndicator.vue文件, 新建html模板
```html
<template>
  <span class="indicator" />
</template>
```
### 2. 逻辑
通过`props`将指示灯的颜色动态传递进来, 并通过`watchEffect` API实时监听状态变化
```ts
import { ref, watchEffect } from 'vue'
// 或者可以使用插件 @antfu/unplugin-auto-import 实现自动导入

const props = defineProps({
  bgColor: {
    type: String,
    requird: false,
    default: '#326cd6',
  },
})
const indicatorColor = ref<string>('#326cd6')
watchEffect(() => {
  indicatorColor.value = props.bgColor
})
```
### 2. css样式
通过使用`v-bind`API动态绑定传入的颜色值, 并通过animation动画实现呼吸效果
```css
<style scoped>
  .indicator {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: v-bind('indicatorColor');
    animation: indicator 2s ease-in-out infinite;
  }
  @keyframes indicator {
    0%   { box-shadow: 0 0 0 0 v-bind('indicatorColor') }
    70%  { box-shadow: 0 0 0 8px rgba(216, 226, 233, 0) }
    100% { box-shadow: 0 0 0 0 rgba(216, 226, 233, 0) }
  }
</style>
```
## 使用预览
以下为示例, 状态对应的颜色可以自定义传入
```ts
<script setup lant="ts">
// @c 为自定义的文件路径alias，在vite.config.ts中配置
import { StatusIndicator } from '@c/statusIndicator.vue'
</script>
```
```html
normal:  <StatusIndicator bg-color="#326CD6" class="mx-2"/>
success: <StatusIndicator bg-color="#4FAD59" class="mx-2"/>
error:   <StatusIndicator bg-color="#e4393c" class="mx-2"/>
warning: <StatusIndicator bg-color="orange" class="mx-2"/>
```
normal:  <StatusIndicator bg-color="#326CD6" class="mx-2"/>
success: <StatusIndicator bg-color="#4FAD59" class="mx-2"/>
error:   <StatusIndicator bg-color="#e4393c" class="mx-2"/>
warning: <StatusIndicator bg-color="orange" class="mx-2"/>

## 结束啦
到此为止, 状态指示灯组件就开发完啦✌️, 用起来吧~~