import { randomColor } from 'utils-snap-fn'
import type { Post } from '~/types'

interface GallaryItems extends Pick<Post, 'title' | 'date'> {
  color: string
  author: string
}

export const galleryItems = ref<GallaryItems[]>([
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
