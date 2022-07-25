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

