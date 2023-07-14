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
  <main
    class="slide-enter-content md:max-w-5xl"
    font-sans
    m="x-auto y-0"
    p="x-4 y-5"
    text="left gray-700 dark:gray-200"
  >
    <router-view class="slide-enter-content" />
    <Footer v-if="routes.fullPath !== '/' && !routes.fullPath.includes('list')" />
  </main>
  <BackTop />
  <PageBg />
</template>
