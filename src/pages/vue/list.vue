<script setup lang="ts">
import { vuePostList } from '~/composables/vuePost'
</script>

<template>
  <PostList :posts="vuePostList" />
</template>
