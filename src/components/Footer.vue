<script setup lang="ts">
const router = useRouter()
const goBack = () => router.back()
</script>

<template>
  <div class="markdown-body cursor-pointer">
    <a @click="goBack">cd ..</a>
  </div>
  <div class="markdown-body">
    <a href="/">cd ~</a>
  </div>
  <div mt-2 c-gray-600 dark:c-gray-400>
    Qishi © 2023
  </div>
</template>
