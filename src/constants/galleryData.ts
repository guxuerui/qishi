import { randomColor } from 'utils-snap-fn'
import type { Post } from '~/types'

interface GallaryItems extends Pick<Post, 'title' | 'date'> {
  color: string
  author: string
}

export const galleryItems = ref<GallaryItems[]>([
  {
    title: '想到什么就立刻去做，不要等待，在那个时刻是最有想法和激情的。',
    date: '2023-07-24',
    color: randomColor('rgb', 0.3),
    author: '',
  },
  {
    title: '学习一门语言, 最重要的就是一定要用。',
    date: '2023-07-24',
    color: randomColor('rgb', 0.3),
    author: '',
  },
  {
    title: '你无法控制生活中的所有事情，但你可以控制自己的反应。',
    date: '2023-07-21',
    color: randomColor('rgb', 0.3),
    author: '约翰·麦克唐纳',
  },
  {
    title: '机会就是在时间之流中，最好的一刹那。',
    date: '2023-07-20',
    color: randomColor('rgb', 0.3),
    author: '佚名',
  },
  {
    title: '囤尖省，日子长；囤底省，打饥荒。',
    date: '2023-07-19',
    color: randomColor('rgb', 0.3),
    author: '佚名',
  },
])
