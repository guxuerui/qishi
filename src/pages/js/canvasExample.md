<script setup lang="ts">
import CanvasExample from '~/components/CanvasExample.vue'
</script>

# canvas从入门到放弃

> Canvas用JS动态生成元素，可绘制路径、矩形、圆形、字符等各种图案，可用于动画、游戏、可视化、图片编辑等领域

## 一. 使用示例

<CanvasExample />

## 二. 代码示例, 与使用示例从左到右一一对应

**公共代码**, `canvas`标签可直接设置宽高, 没设置的时候默认`width`为300, `height`位150

```js
// script
const el = $ref()
const ctx = $computed(() => el!.getContext('2d')!)

onMounted(() => {
  // 绘制图形前，先清空画布, ctx.clearRect(横坐标, 纵坐标, 宽, 高)
  ctx.clearRect(0, 0, 400, 400)
})
```

```html
<!-- 模板 -->
<template>
  <canvas
    ref="el"
    width="400"
    height="400"
    mx-auto
    border="1 #585"
  />
</template>
```

1、 画线

```js
ctx.beginPath() // 开始路径
ctx.moveTo(0, 0) // 移动坐标, 线的开始坐标
ctx.lineTo(60, 80) // 线的结束坐标
ctx.lineTo(60, 20)
ctx.lineWidth = 5 // 线的粗细
ctx.strokeStyle = '#29f' // 线的颜色
ctx.lineCap = 'round' // 线结尾处的样式，默认为butt, 可选roude、square
ctx.stroke() // 描边
ctx.closePath() // 结束路径
```

2、 矩形

```js
// ctx.strokeRect(横坐标, 纵坐标, 宽, 高)
// ctx.fillRect(横坐标, 纵坐标, 宽, 高)
ctx.strokeStyle = '#1fa'
ctx.strokeRect(100, 20, 80, 40) // 描边
ctx.fillStyle = '#9fa'
ctx.fillRect(100, 20, 80, 40) // 填充
```

3、 圆形

```js
// 不使用beginPath()方法新开路径会造成图形之间样式互相影响
// arc(横坐标, 纵坐标, 半径, 开始角度, 结束角度, 绘制方向)
// 绘制方向 -> true: 逆时针, false -> 顺时针，默认为false
ctx.beginPath()
ctx.arc(240, 40, 30, 0, 2 * Math.PI)
ctx.fillStyle = '#1fa'
ctx.fill()
```

4、 三角形

```js
ctx.beginPath()
ctx.moveTo(300, 20)
ctx.lineTo(300, 80)
ctx.lineTo(360, 20)
// closePath() 可以自动将终点和起始点连接起来
ctx.closePath()
ctx.lineWidth = 10
// 线条连接的样式。miter: 默认; bevel: 斜面; round: 圆角
ctx.lineJoin = 'bevel'
ctx.strokeStyle = 'orange'
ctx.stroke()
```

5、菱形

```js
ctx.beginPath()
ctx.moveTo(380, 50)
ctx.lineTo(430, 80)
ctx.lineTo(480, 50)
ctx.lineTo(430, 20)
ctx.lineWidth = 5
ctx.strokeStyle = 'cyan'
ctx.closePath()
ctx.stroke()
```

6、弧形

```js
// 1. arc() 30度的弧形, 不使用closePath()即可
ctx.beginPath()
ctx.arc(-50, 120, 100, 0, 30 * Math.PI / 180)
ctx.strokeStyle = 'yellow'
ctx.stroke()

// 2. arcTo()
ctx.beginPath()
ctx.moveTo(80, 120)
ctx.arcTo(150, 120, 150, 150, 50)
ctx.strokeStyle = 'pink'
ctx.stroke()
```

