<script setup lang="ts">
import { useTitle } from '@vueuse/core'

const title = useTitle()

const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el!.getContext('2d')!)
const img = new Image()
img.src = '/imgs/lotus_flower.svg'

onMounted(() => {
  title.value = '开花的树'

  const Tree = new DrawTree(800, 800, 0, ctx, img)
  // start requestAnimationFrame
  Tree.startFrame()
})
</script>

<template>
  <div class="markdown-body mb-4">
    <h1>开花的树</h1>
    <canvas ref="el" width="800" height="800" border />
  </div>
</template>
