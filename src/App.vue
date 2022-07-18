<script setup lang="ts">
// const show = ref<boolean>(false)
const routes = useRoute()
</script>

<template>
  <Header />
  <main class="main" font-sans p="x-4 y-5" text="center gray-700 dark:gray-200">
    <router-view />
    <Footer v-if="routes.fullPath !== '/'" />
    <!-- <AnimateCursor v-if="show" /> -->
    <!-- <button class="icon-btn !outline-none btn-scale" ml-2 @click="show = !show"> -->
    <!--   <div v-if="!show" i-carbon-cursor-2 /> -->
    <!--   <div v-else i-carbon-location-current /> -->
    <!-- </button> -->
  </main>
</template>

<style scoped>
  .main {
    max-width: 60ch;
    text-align: left;
    margin: 0 auto;
    font-size: 1rem;
  }
  .btn-scale {
    position: relative;
    top: -0.1rem;
    transform: scale(1.2);
  }
</style>
