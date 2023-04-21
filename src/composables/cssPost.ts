import type { Post } from '~/types'

export const cssPostList = ref<Post[]>([
  {
    title: 'CSS水平垂直居中方法大全',
    date: '2022-12-12',
    folder: 'css',
    fileName: 'VerticalCenter',
    fileType: 'md',
  },
  {
    title: '3D立方体',
    date: '2022-09-01',
    folder: 'css',
    fileName: 'cube3D',
    fileType: 'md',
  },
  {
    title: 'CSS语法之filter',
    date: '2022-08-30',
    folder: 'css',
    fileName: 'CssFilter',
    fileType: 'md',
  },
  {
    title: 'CSS语法之attr()',
    date: '2022-08-29',
    folder: 'css',
    fileName: 'attr',
    fileType: 'md',
  },
  {
    title: '纯CSS实现樱花般的齿轮动画',
    date: '2022-07-23',
    folder: 'css',
    fileName: 'cog',
    fileType: 'md',
  },
])
