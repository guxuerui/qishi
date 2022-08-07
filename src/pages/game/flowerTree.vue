<script setup lang="ts">
const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el!.getContext('2d')!)
const img = new Image()
img.src = '/imgs/lotus_flower.svg'

onMounted(() => {
  const Tree = new DrawTree(800, 800, 0, ctx, img)
  // start requestAnimationFrame
  Tree.startFrame()
})
</script>

<template>
  <div class="markdown-body">
    <h1>会开花的树</h1>
  </div>
  <canvas ref="el" width="800" height="800" border />
</template>

