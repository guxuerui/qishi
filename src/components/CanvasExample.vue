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

function drawArc() {
  ctx.beginPath()
  ctx.arc(-50, 120, 100, 0, 30 * Math.PI / 180)
  ctx.strokeStyle = 'yellow'
  ctx.stroke()
}

function drawAcr2() {
  ctx.beginPath()
  ctx.moveTo(80, 120)
  ctx.arcTo(150, 120, 150, 150, 50)
  ctx.strokeStyle = 'pink'
  ctx.stroke()
}

function drawText() {
  // 在绘制文字的时候，默认是以文字的左下角作为参考点进行绘制
  ctx.font = '60px Arial'
  ctx.strokeStyle = '#ccf'
  ctx.fillStyle = '#191'
  ctx.strokeText('骑誓', 200, 170)
  ctx.fillText('骑誓', 200, 170)
}

function drawImg() {
  const image = new Image()
  image.src = '/imgs/street.jpeg'
  image.onload = () => {
    ctx.drawImage(image, 20, 200, 220, 140)
  }
}

function splitImg() {
  const image = new Image()
  image.src = '/imgs/street.jpeg'
  image.onload = () => {
    ctx.drawImage(image, 800, 100, 500, 400, 250, 200, 220, 140)
  }
}

onMounted(() => {
  // 清空画布
  ctx.clearRect(0, 0, 500, 500)
  drawLine()
  drawCircle(240, 40, 30, '#1fa')
  drawRect()
  drawTriangle()
  drawRhombus()
  drawArc()
  drawAcr2()
  drawText()
  drawImg()
  splitImg()
})
</script>

<template>
  <canvas ref="el" width="500" height="500" mx-auto border="1 #585" />
</template>

