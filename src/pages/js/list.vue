<script setup lang="ts">
import { jsPostList } from '~/composables/jsPost'
</script>

<template>
  <PostList :posts="jsPostList" />
</template>
