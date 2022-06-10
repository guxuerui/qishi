export interface BlockState {
  x: number
  y: number
  reveoled: boolean
  flagged?: boolean
  mine?: boolean
  adjacentMines: number
}
