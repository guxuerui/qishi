<script setup lang="ts">
const el = ref<HTMLCanvasElement>()
const ctx = computed(() => el.value!.getContext('2d')!)

onMounted(() => {
  const Tree = new DrawTree(400, 1000, 0, ctx.value, '', 'rgba(153, 153, 153, 0.3)')
  // start requestAnimationFrame
  Tree.startFrame()
})
</script>

<template>
  <canvas
    ref="el"
    width="400"
    height="1000"
    position="fixed top-0 left-0"
    class="-z-1"
  />
</template>
