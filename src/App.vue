<script setup lang="ts">
import { setCopy } from '~/composables/copyBlockCode'

const routes = useRoute()

watch(() => routes.fullPath, (newVal, _oldVal) => {
  if (newVal !== '/')
    setCopy()
}, { immediate: true })
</script>

<template>
  <Header />
  <main class="main slide-enter-content" font-sans p="x-4 y-5" text="center gray-700 dark:gray-200">
    <router-view class="slide-enter-content" />
    <Footer v-if="routes.fullPath !== '/' && !routes.fullPath.includes('list')" />
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
