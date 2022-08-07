<script setup lang="ts">
import type { Post } from '~/types'

const postList = ref<Post[]>([
  {
    title: '用canvas画一颗树',
    date: '2022-08-07',
    folder: 'game',
    fileName: 'drawTree',
  },
  {
    title: 'Minesweeper/扫雷',
    date: '2022-07-20',
    folder: 'game',
    fileName: 'sweeper',
  },
])
</script>

<template>
  <PostList :posts="postList" />
</template>
