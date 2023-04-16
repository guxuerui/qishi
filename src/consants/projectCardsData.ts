import type { IProjectCard } from '~/types'

export default function getProjectCardsData(): IProjectCard[] {
  return [
    {
      title: 'nvim-0.8',
      borderColor: '#5EADEB',
      abstract: 'Neovim是基于`vim`的现代文本编辑器, 它旨在改进`vim`的可扩展性和用户友好性, 这是我的Neovim配置文件.',
      imgUrl: '/imgs/nvim.png',
      projectUrl: 'https://github.com/guxuerui/nvim-0.8',
    },
  ]
}
