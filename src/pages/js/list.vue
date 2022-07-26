<script setup lang="ts">
import type { Post } from '~/types'

const postList = ref<Post[]>([
  {
    title: '找出数组中只出现过一次的数',
    date: '2022-07-25',
    folder: 'js',
    fileName: 'singleNumber',
  },
])
</script>

<template>
  <PostList :posts="postList" />
</template>
