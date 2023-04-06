<script setup lang="ts">
const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el!.getContext('2d')!)

const WIDTH = 800
const HEIGHT = 800

interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point
  length: number
  theta: number
}

function init() {
  ctx.strokeStyle = `rgb(255, ${Math.floor(255 - 40 * Math.random() * 6)}, ${Math.floor(255 - 40 * Math.random() * 6)})`
  step({
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 50,
    theta: -Math.PI / 2,
  })
}

function getEndPoint(b: Branch) {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta),
  }
}

const pendingTasks: Function[] = []

function step(b: Branch, depth = 0) {
  const end = getEndPoint(b)
  drawBranch(b)
  if (depth < 4 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: end,
      length: b.length * (0.7 + 0.5 * Math.random()),
      theta: b.theta - 0.8 * Math.random(),
    }, depth + 1))
  }
  if (depth < 4 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: end,
      length: b.length * (0.7 + 0.3 * Math.random()),
      theta: b.theta + 0.8 * Math.random(),
    }, depth + 1))
  }
}

function lineTo(p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.lineCap = 'round'
  ctx.stroke()
}

function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b))
}

function frame() {
  const tasks = [...pendingTasks]
  pendingTasks.length = 0
  tasks.forEach(fn => fn())
}

let framesCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    framesCount += 1
    if (framesCount % 3 === 0)
      frame()

    startFrame()
  })
}

startFrame()

onMounted(() => {
  init()
})
</script>

<template>
  <div class="markdown-body">
    <h1>用canvas画一棵树</h1>
  </div>
  <canvas ref="el" width="800" height="800" border />
</template>
