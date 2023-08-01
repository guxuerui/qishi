import { randomColor } from 'utils-snap-fn'
import type { Post } from '~/types'

interface GallaryItems extends Pick<Post, 'title' | 'date'> {
  color: string
  author?: string
}

export const galleryItems = ref<GallaryItems[]>([
  {
    title: '人生至善，就是对生活乐观，对工作愉快，对事业兴奋。',
    date: '2023-08-01',
    color: randomColor('rgb', 0.3),
    author: '布兰登',
  },
  {
    title: '将无法实现之事付诸实现正是非凡毅力的真正标志。',
    date: '2023-07-27',
    color: randomColor('rgb', 0.3),
    author: '茨威格',
  },
  {
    title: '友谊是一种生长缓慢的植物，它只有嫁接在彼此熟识，互相敬爱的枝干上才会枝繁叶茂。',
    date: '2023-07-26',
    color: randomColor('rgb', 0.3),
    author: '切斯特菲尔德',
  },
  {
    title: '问学必有师，讲习必有友。',
    date: '2023-07-25',
    color: randomColor('rgb', 0.3),
    author: '陆佃',
  },
  {
    title: '在Vue3中, 当`cpmputed()`的返回值为布尔值时, 可以使用`VueUse`中的`computedEager()`函数来代替, 从而提高计算性能。',
    date: '2023-07-24',
    color: randomColor('rgb', 0.3),
  },
  {
    title: '想到什么就立刻去做，不要等待，在那个时刻是最有想法和激情的。',
    date: '2023-07-24',
    color: randomColor('rgb', 0.3),
  },
  {
    title: '学习一门语言, 最重要的就是一定要用。',
    date: '2023-07-24',
    color: randomColor('rgb', 0.3),
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
