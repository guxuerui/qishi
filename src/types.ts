export interface BlockState {
  x: number
  y: number
  reveoled: boolean
  flagged?: boolean
  mine?: boolean
  adjacentMines: number
}

export interface Post {
  title: string
  date: string
  folder: string
  fileName: string
  fileType?: string
}

export interface RepoList {
  name: string
  id: number
  fork: boolean
  forks_count: number
  stargazers_count: number
  html_url: string
}

export interface SearchIndex {
  [key: string]: string | number
}

export interface BlockRotate {
  x: number
  y: number
  z: number
}

export interface Area {
  direct: string
  transform: string
  color: string
}

export interface BlockArea {
  x: number
  y: number
  z: number
  rotate: BlockRotate
  areas: Area[]
}

export interface IList {
  date: string
  iconColor?: string
  iconRight?: string
  iconTop?: string
  chipColor?: string
  chipText?: string
  subTitleColor?: string
  subTitle: string
  imgUrl?: string
  content: string
}

export interface ITimeline {
  isCollapsed: boolean
  year: string
  title: string
  list: IList[]
}

export interface ISkill {
  label: string
  progress: string
  color: string
}

export interface IPostCard extends Pick<IList, 'date' | 'chipColor' | 'chipText'> {
  title: string
  abstract: string
  fileName: string
}

export interface IProjectCard extends Pick<IList, 'imgUrl'> {
  borderColor: string
  title: string
  abstract: string
  projectUrl: string
}
