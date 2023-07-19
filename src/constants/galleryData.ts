import { randomColor } from 'utils-snap-fn'
import type { Post } from '~/types'

interface GallaryItems extends Pick<Post, 'title' | 'date'> {
  color: string
  author: string
}

export const galleryItems = ref<GallaryItems[]>([
  {
    title: '囤尖省，日子长；囤底省，打饥荒。',
    date: '2023-07-19',
    color: randomColor('rgb', 0.3),
    author: '佚名',
  },
])
