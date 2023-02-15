import type { Post } from '~/types'

export const gamePostList = ref<Post[]>([
  {
    title: '用vue3写个魔方',
    date: '2022-09-01',
    folder: 'game',
    fileName: 'magicCube',
  },
  {
    title: '五彩缤纷的鼠标',
    date: '2022-08-16',
    folder: 'game',
    fileName: 'colorMouse',
  },
  {
    title: '开花的树',
    date: '2022-08-07',
    folder: 'game',
    fileName: 'flowerTree',
  },
  {
    title: '光秃秃的树',
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
