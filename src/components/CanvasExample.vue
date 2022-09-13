<script setup lang="ts">
const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el!.getContext('2d')!)

function drawLine() {
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(60, 80)
  ctx.lineTo(60, 20)
  ctx.lineWidth = 5
  ctx.strokeStyle = '#29f'
  ctx.lineCap = 'round'
  ctx.stroke()
  ctx.closePath()
}

function drawCircle(x: number, y: number, radius: number, color: string) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill()
}

function drawRect() {
  ctx.strokeStyle = '#1fa'
  ctx.strokeRect(100, 20, 80, 40)
  ctx.fillStyle = '#9fa'
  ctx.fillRect(100, 20, 80, 40)
}

function drawTriangle() {
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
}

function drawRhombus() {
  ctx.beginPath()
  ctx.moveTo(380, 50)
  ctx.lineTo(430, 80)
  ctx.lineTo(480, 50)
  ctx.lineTo(430, 20)
  ctx.lineWidth = 5
  ctx.strokeStyle = 'cyan'
  ctx.closePath()
  ctx.stroke()
}

onMounted(() => {
  // 清空画布
  ctx.clearRect(0, 0, 500, 500)
  drawLine()
  drawCircle(240, 40, 30, '#1fa')
  drawRect()
  drawTriangle()
  drawRhombus()
})
</script>

<template>
  <canvas ref="el" width="500" height="500" mx-auto border="1 #585" />
</template>

