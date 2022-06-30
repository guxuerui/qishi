<script setup lang="ts">
const show = ref<boolean>(false)
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <router-view />
    <Footer />
    <AnimateCursor v-if="show" />
    <button class="icon-btn !outline-none btn-scale" ml-2 @click="show = !show">
      <div v-if="!show" i-carbon-cursor-2 />
      <div v-else i-carbon-location-current />
    </button>
  </main>
</template>

<style scoped>
  .btn-scale {
    position: relative;
    top: -0.1rem;
    transform: scale(1.2);
  }
</style>
