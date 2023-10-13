import type { IProjectCard } from '~/types'

export default function getProjectCardsData(): IProjectCard[] {
  return [
    {
      title: 'nvim-config',
      borderColor: '#5EADEB',
      abstract: 'Neovim是基于`vim`的现代文本编辑器, 它旨在改进`vim`的可扩展性和用户友好性, 这是我的Neovim配置文件.',
      imgUrl: '/imgs/nvim.png',
      projectUrl: 'https://github.com/guxuerui/nvim-config',
    },
    {
      title: 'emoji-picker',
      borderColor: '#d16ba5',
      abstract: 'A simple way to search and pick an emoji of all the Github supports.',
      imgUrl: '/imgs/emoji-picker.png',
      projectUrl: 'https://github.com/guxuerui/emoji-picker',
    },
    {
      title: 'pretty-timeline',
      borderColor: '#41b883',
      abstract: '一个vue3版本的时间轴组件, 可配置性高、使用丝滑, 支持局部导入和全局导入, 支持light和dark模式.',
      imgUrl: '/imgs/pretty-timeline.png',
      projectUrl: 'https://github.com/guxuerui/pretty-timeline',
    },
    {
      title: 'utils-snap-fn',
      borderColor: '#3178c6',
      abstract: 'Front-end tool function code snippets with full typescript support.',
      imgUrl: '/imgs/utils-fn.png',
      projectUrl: 'https://github.com/guxuerui/utils-snap-fn',
    },
    {
      title: 'vue3-signage',
      borderColor: '#125abe',
      abstract: 'Vue3版本的任务看看板, 创建方便, 视图清晰, 可随时进行编辑, 支持light和dark模式, 并且支持拖拽.',
      imgUrl: '/imgs/vue3-signage.png',
      projectUrl: 'https://github.com/guxuerui/vue3-signage',
    },
    {
      title: 'status-indicator',
      borderColor: '#e4393c',
      abstract: 'Vue3版本的状态指示灯组件, 使用vue3 + ts + vite, 可表示账号状态等, 易于使用.',
      imgUrl: '/imgs/status-indicator.png',
      projectUrl: 'https://github.com/guxuerui/vue3-status-indicator',
    },
    {
      title: 'calculate-anything',
      borderColor: '#fa7a18',
      abstract: 'A simple calculator, using Nuxt3, demonstrating basic arithmetic operations in JS.',
      imgUrl: '/imgs/calculator.png',
      projectUrl: 'https://github.com/guxuerui/calculate-anything',
    },
  ]
}
