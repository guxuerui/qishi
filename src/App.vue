<script setup lang="ts">
const routes = useRoute()
</script>

<template>
  <Header />
  <main class="main" font-sans p="x-4 y-5" text="center gray-700 dark:gray-200">
    <router-view />
    <Footer v-if="routes.fullPath !== '/'" />
    <div mt-4>
      Qishi © 2023
    </div>
  </main>
  <BackTop />
  <PageBg />
</template>

<style scoped>
  .main {
    max-width: 65ch;
    text-align: left;
    margin: 0 auto;
    font-size: 1rem;
  }
</style>
