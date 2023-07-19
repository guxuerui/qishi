// navbar menu links
import type { Post } from '~/types'

export const links = ref<Omit<Post, 'date'>[]>([
  {
    title: 'Vue',
    fileName: 'list',
    folder: 'vue',
  },
  {
    title: 'Js',
    fileName: 'list',
    folder: 'js',
  },
  {
    title: 'Css',
    fileName: 'list',
    folder: 'css',
  },
  {
    title: 'Note',
    fileName: 'list',
    folder: 'note',
  },
  {
    title: 'Game',
    fileName: 'list',
    folder: 'game',
  },
  {
    title: '言',
    fileName: 'gallery',
    folder: 'motto',
  },
])
