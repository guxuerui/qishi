<script setup lang="ts">
import { cssPostList } from '~/composables/cssPost'
</script>

<template>
  <PostList :posts="cssPostList" />
</template>
