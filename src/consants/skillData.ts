import type { IPostCard, ISkill } from '~/types'

export const SkillListData: ISkill[] = [
  {
    label: 'HTML5',
    progress: '99%',
    color: '#f33',
  },
  {
    label: 'CSS3',
    progress: '80%',
    color: '#2196f3',
  },
  {
    label: 'JavaScript',
    progress: '90%',
    color: '#ff3',
  },
  {
    label: 'TypeScript',
    progress: '60%',
    color: '#2196f3',
  },
  {
    label: 'Vue',
    progress: '90%',
    color: '#3f9',
  },
  {
    label: 'Svelte',
    progress: '50%',
    color: '#f03',
  },
  {
    label: 'React',
    progress: '30%',
    color: '#2191a3',
  },
  {
    label: 'Vite',
    progress: '50%',
    color: '#aaf',
  },
  {
    label: 'NodeJs',
    progress: '60%',
    color: '#1aaaaa',
  },
]

export const PostCardData: IPostCard[] = [
  {
    title: 'Vue.js',
    abstract: 'Vue.js is a progressive framework for building user interfaces',
    chipColor: 'green',
    chipText: 'Vue',
  },
  {
    title: 'React.js',
    abstract: 'React.js is a front-end framework for building user interfaces',
    chipColor: 'blue',
    chipText: 'React',
  },
  {
    title: 'Svelte.js',
    abstract: 'Svelte.js is a front-end framework for building user interfaces',
    chipColor: 'red',
    chipText: 'Svelte',
  },
]
