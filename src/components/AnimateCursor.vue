<script setup lang="ts">
import { useTitle } from '@vueuse/core'

const title = useTitle()
onMounted(() => {
  title.value = '五彩缤纷的鼠标'
})

let color = $ref<number>(0)
let isColor = $ref<string>('')
const round_arr = $ref<any>([])
let context = $ref<any>(null)
const myCanvas = $ref<HTMLCanvasElement>()
const WIDTH = ref<number>(0)
const HEIGHT = ref<number>(0)
const para = $ref({
  num: 100,
  color: '', // 颜色，如果是false则使用随机渐变颜色
  r: 0.9,
  o: 0.09, // 判断圆消失的条件，数值越大，消失的越快
  a: 1,
})
const { x, y } = useMouse()

nextTick(() => {
  context = myCanvas!.getContext('2d')
  WIDTH.value = myCanvas!.width = document.documentElement.clientWidth
  HEIGHT.value = myCanvas!.height = document.documentElement.clientHeight
  animate()
})

useEventListener(window, 'mousemove', (event: MouseEvent) => {
  round_arr.push({
    mouseX: event.pageX,
    mouseY: event.pageY,
    r: para.r,
    o: 1,
  })
})

// 判断参数中是否设置了color，如果有，则用该值
// 如果参数中的color为false，则使用随机颜色
if (para.color)
  isColor = para.color
else
  color = Math.random() * 360

function animate() {
  if (!para.color) {
    color += 0.1
    isColor = `hsl(${color}, 100%, 80%)`
  }

  context.clearRect(0, 0, WIDTH.value, HEIGHT.value)
  for (let i = 0; i < round_arr.length; i++) {
    context.fillStyle = isColor
    context.beginPath()
    context.arc(round_arr[i].mouseX, round_arr[i].mouseY, round_arr[i].r, 0, Math.PI * 2)
    context.closePath()
    context.fill()
    round_arr[i].r += para.r
    round_arr[i].o -= para.o

    if (round_arr[i].o <= 0) {
      round_arr.splice(i, 1)
      i--
    }
  }
  window.requestAnimationFrame(animate)
}
</script>

<template>
  <div class="markdown-body">
    <div :style="{ color: isColor }">
      <p mb-4>
        鼠标跟随特效, 刷新页面可切换鼠标跟随颜色~
      </p>
      鼠标实时坐标  ->  X: {{ x }},  Y: {{ y }}
    </div>
    <canvas id="canvas" ref="myCanvas" />
  </div>
</template>

<style scoped>
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>
