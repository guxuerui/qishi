<script setup lang="ts">
import type { Post } from '~/types'

const postList = ref<Post[]>([
  {
    title: '纵览TypeScript之元组类型的操作',
    date: '2022-12-01',
    folder: 'note',
    fileName: 'overviewTs10',
  },
  {
    title: '纵览TypeScript之对象类型的遍历',
    date: '2022-11-30',
    folder: 'note',
    fileName: 'overviewTs9',
  },
  {
    title: '纵览TypeScript之对象类型的操作',
    date: '2022-11-29',
    folder: 'note',
    fileName: 'overviewTs8',
  },
  {
    title: '纵览TypeScript之类型中的函数(泛型)',
    date: '2022-11-28',
    folder: 'note',
    fileName: 'overviewTs7',
  },
  {
    title: '纵览TypeScript之条件语句',
    date: '2022-11-27',
    folder: 'note',
    fileName: 'overviewTs6',
  },
  {
    title: '纵览TypeScript之获取类型所有属性key',
    date: '2022-11-26',
    folder: 'note',
    fileName: 'overviewTs5',
  },
  {
    title: '纵览TypeScript之通过变量取属性',
    date: '2022-11-26',
    folder: 'note',
    fileName: 'overviewTs4',
  },
  {
    title: '纵览TypeScript之类型的父子关系',
    date: '2022-11-26',
    folder: 'note',
    fileName: 'overviewTs3',
  },
  {
    title: '纵览TypeScript之类型数据和值',
    date: '2022-11-22',
    folder: 'note',
    fileName: 'overviewTs2',
  },
  {
    title: '纵览TypeScript之类型变量定义',
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
