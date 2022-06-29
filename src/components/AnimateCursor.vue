<script setup lang="ts">
onMounted(() => {
  init()
})

const para = ref({
  num: 100,
  color: false, // 颜色，如果是false则使用随机渐变颜色
  r: 0.9,
  o: 0.09, // 判断圆消失的条件，数值越大，消失的越快
  a: 1,
})

const color = ref<string | number>(0)
const color2 = ref<string | number>(false)
const round_arr = ref<any>([])

function init() {
  // const myCanvas = ref<any>(null)
  const myCanvas = document.getElementById('canvas')
  const ctx = myCanvas.getContext('2d')
  const WIDTH = myCanvas.width = document.documentElement.clientWidth
  const HEIGHT = myCanvas.height = document.documentElement.clientHeight
  let mouseX = 0
  let mouseY = 0

  window.onmousemove = function (event) {
    mouseX = event.clientX
    mouseY = event.clientY
    round_arr.value.push({
      mouseX,
      mouseY,
      r: para.value.r,
      o: 1,
    })
  }

  // 判断参数中是否设置了color，如果有，则用该值
  // 如果参数中的color为false，则使用随机颜色
  if (para.value.color)
    color2.value = para.value.color
  else
    color.value = Math.random() * 360

  animate(WIDTH, HEIGHT)
}

function animate(width, height) {
  if (!para.value.color) {
    color.value += 0.1
    color2.value = `hsl(${color.value}, 100%, 80%)`
  }

  ctx.clearRect(0, 0, width, height)
  for (let i = 0; i < round_arr.value.length; i++) {
    ctx.fillStyle = color2.value
    ctx.beginPath()
    ctx.arc(round_arr.value[i].mouseX, round_arr.value[i].mouseY, round_arr.value[i].r, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    round_arr.value[i].r += para.value.r
    round_arr.value[i].o -= para.value.o

    if (round_arr.value[i].o <= 0) {
      round_arr.value.splice(i, 1)
      i--
    }
  }
  window.requestAnimationFrame(animate)
}
</script>

<template>
  <canvas id="canvas" ref="myCanvas" />
</template>

<style scoped>
</style>
