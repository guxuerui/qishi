<script setup lang="ts">
import { gamePostList } from '~/composables/gamePost'
</script>

<template>
  <PostList :posts="gamePostList" />
</template>
