<script setup lang="ts">
import type { Post } from '~/types'

const postList = ref<Post[]>([
  {
    title: 'Vue中监听组合按键',
    date: '2023-02-15',
    folder: 'vue',
    fileName: 'mointorKey',
  },
  {
    title: '发布vue3组件到npm',
    date: '2022-12-04',
    folder: 'vue',
    fileName: 'publishComp',
  },
  {
    title: '创建函数式组件',
    date: '2022-10-14',
    folder: 'vue',
    fileName: 'functionalComp',
  },
  {
    title: '在Vue3和Ts项目中注册全局插件',
    date: '2022-09-28',
    folder: 'vue',
    fileName: 'vuePlugins',
  },
  {
    title: '统计GitHub个人项目Star数量',
    date: '2022-08-13',
    folder: 'vue',
    fileName: 'countStars',
  },
  {
    title: 'Vue3之齿轮环状仪表盘组件',
    date: '2022-07-22',
    folder: 'vue',
    fileName: 'Vue3Guage',
  },
  {
    title: 'Vue3之状态指示灯组件',
    date: '2022-07-18',
    folder: 'vue',
    fileName: 'statusIndicator',
  },
  {
    title: '二次封装BalmUI表格组件',
    date: '2022-07-17',
    folder: 'vue',
    fileName: 'refactorBalmDataTable',
  },
])
</script>

<template>
  <PostList :posts="postList" />
</template>
