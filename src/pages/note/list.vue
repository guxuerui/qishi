<script setup lang="ts">
import type { Post } from '~/types'

const postList = ref<Post[]>([
  {
    title: '纵览TypeScript(八)',
    date: '2022-11-29',
    folder: 'note',
    fileName: 'overviewTs8',
  },
  {
    title: '纵览TypeScript(七)',
    date: '2022-11-28',
    folder: 'note',
    fileName: 'overviewTs7',
  },
  {
    title: '纵览TypeScript(六)',
    date: '2022-11-27',
    folder: 'note',
    fileName: 'overviewTs6',
  },
  {
    title: '纵览TypeScript(五)',
    date: '2022-11-26',
    folder: 'note',
    fileName: 'overviewTs5',
  },
  {
    title: '纵览TypeScript(四)',
    date: '2022-11-26',
    folder: 'note',
    fileName: 'overviewTs4',
  },
  {
    title: '纵览TypeScript(三)',
    date: '2022-11-26',
    folder: 'note',
    fileName: 'overviewTs3',
  },
  {
    title: '纵览TypeScript(二)',
    date: '2022-11-22',
    folder: 'note',
    fileName: 'overviewTs2',
  },
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
