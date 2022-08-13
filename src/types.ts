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
}

export interface RepoList {
  name: string
  id: number
  fork: boolean
  forks_count: number
  stargazers_count: number
  html_url: string
}

