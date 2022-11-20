<script setup lang="ts">
import type { Post } from '~/types'

const postList = ref<Post[]>([
  {
    title: '纵览TypeScript(一)',
    date: '2022-11-20',
    folder: 'note',
    fileName: 'overviewTs1',
  },
  {
    title: '常用vim快捷操作',
    date: '2022-09-21',
    folder: 'note',
    fileName: 'vimOperator',
  },
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
