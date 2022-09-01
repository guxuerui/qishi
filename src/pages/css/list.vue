<script setup lang="ts">
import type { Post } from '~/types'

const postList = ref<Post[]>([
  {
    title: '3D立方体',
    date: '2022-00-01',
    folder: 'css',
    fileName: 'cube3D',
  },
  {
    title: 'CSS语法之filter',
    date: '2022-08-30',
    folder: 'css',
    fileName: 'filter',
  },
  {
    title: 'CSS语法之attr()',
    date: '2022-08-29',
    folder: 'css',
    fileName: 'attr',
  },
  {
    title: '纯CSS实现樱花般的齿轮动画',
    date: '2022-07-23',
    folder: 'css',
    fileName: 'cog',
  },
])
</script>

<template>
  <PostList :posts="postList" />
</template>

