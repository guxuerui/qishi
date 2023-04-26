import type { Post } from '~/types'

export const jsPostList = ref<Post[]>([
  {
    title: 'JS中==和===的区别',
    date: '2023-04-26',
    folder: 'js',
    fileName: 'compareEqula',
    fileType: 'md',
  },
  {
    title: 'canvas基础使用示例',
    date: '2022-09-07',
    folder: 'js',
    fileName: 'canvasExample',
    fileType: 'md',
  },
  {
    title: '序列生成器range方法',
    date: '2022-09-01',
    folder: 'js',
    fileName: 'range',
    fileType: 'md',
  },
  {
    title: '找出数组中只出现过一次的数',
    date: '2022-07-25',
    folder: 'js',
    fileName: 'singleNumber',
    fileType: 'md',
  },
])
