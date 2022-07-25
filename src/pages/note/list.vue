<script setup lang="ts">
import type { Post } from '~/types'

const postList = ref<Post[]>([
  {
    title: 'TS中Type和Inrerface的区别',
    date: '2022-07-25',
    folder: 'note',
    fileName: 'typeVsInterface',
  },
])
</script>

<template>
  <PostList :posts="postList" />
</template>

