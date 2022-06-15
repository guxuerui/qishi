import type { BlockState } from '~/types'
const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]
export class GamePlay {
  state = ref<BlockState[][]>([])
  mineGernerated = false
  constructor(public width: number, public height: number) {
    this.reset()
  }

  reset() {
    this.mineGernerated = false
    this.state.value = Array.from({ length: this.height }, (_, y) =>
      Array.from({ length: this.width },
        (_, x): BlockState => ({
          x,
          y,
          adjacentMines: 0,
          reveoled: false,
        }),
      ),
    )
  }

  getSiblings(block: BlockState) {
    return directions.map(([dx, dy]) => {
      const x2 = block.x + dx
      const y2 = block.y + dy
      if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height)
        return undefined
      return this.state.value[y2][x2]
    })
      .filter(Boolean) as BlockState[]
  }

  // 算下每个格子周围的炸弹数
  updateNumbers() {
    this.state.value.forEach((row) => {
      row.forEach((block) => {
        if (block.mine)
          return
        this.getSiblings(block)
          .forEach((sibling) => {
            if (sibling.mine)
              block.adjacentMines++
          })
      })
    })
  }

  // 生成炸弹
  generateMines(state: BlockState[][], initial: BlockState) {
    for (const row of state) {
      for (const block of row) {
        if (Math.abs(initial.x - block.x) < 1)
          continue
        if (Math.abs(initial.y - block.y) < 1)
          continue
        block.mine = Math.random() < 0.2
      }
    }
    this.updateNumbers()
  }

  expandZero(block: BlockState) {
    if (block.adjacentMines)
      return
    this.getSiblings(block)
      .forEach((s) => {
        if (!s.reveoled) {
          s.reveoled = true
          this.expandZero(s)
        }
      })
  }

  checkGameState() {
    if (!this.mineGernerated)
      return
    const blocks = this.state.value.flat()
    if (blocks.every(block => block.reveoled || block.flagged)) {
      if (blocks.some(block => block.flagged && !block.mine))
        alert('You Cheat')
      else
        alert('You Win')
    }
  }

  onRightClick(block: BlockState) {
    if (block.reveoled)
      return
    block.flagged = true
  }

  onClick(block: BlockState) {
    if (!this.mineGernerated) {
      this.generateMines(this.state.value, block)
      this.mineGernerated = true
    }
    block.reveoled = true
    if (block.mine) {
      alert('BOOM!!!')
      return
    }
    this.expandZero(block)
  }
}
