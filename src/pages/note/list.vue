<script setup lang="ts">
import { notePostList } from '~/composables/notePost'
</script>

<template>
  <PostList :posts="notePostList" />
</template>
