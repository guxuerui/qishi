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

onMounted(() => {
  // 清空画布
  ctx.clearRect(0, 0, 500, 500)
  drawLine()
  drawCircle(240, 40, 30, '#1fa')
  drawRect()
})
</script>

<template>
  <canvas ref="el" width="500" height="500" mx-auto border="1 #585" />
</template>

