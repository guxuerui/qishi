<script setup lang="ts">
const router = useRouter()
const goBack = () => router.back()
</script>

<template>
  <div class="cursor-pointer link-style">
    <a @click="goBack">cd ..</a>
  </div>
  <div class="link-style">
    <a href="/">cd ~</a>
  </div>
  <div mt-2 c-gray-600 dark:c-gray-400>
    Qishi © 2025
  </div>
</template>
