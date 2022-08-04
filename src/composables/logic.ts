import type { Ref } from 'vue'
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

interface GameState {
  board: BlockState[][]
  blocks?: BlockState[]
  mineGernerated: boolean
  gameState: 'play' | 'lost' | 'won'
  startMS: number
}
export class GamePlay {
  state = ref() as Ref<GameState>
  constructor(
    public width: number,
    public height: number,
    public mines: number,
  ) {
    this.reset()
  }

  get board() {
    return this.state.value?.board
  }

  get blocks() {
    return this.state.value?.board.flat()
  }

  reset(
    width = this.width,
    height = this.height,
    mines = this.mines,
  ) {
    this.width = width
    this.height = height
    this.mines = mines
    this.state.value = {
      mineGernerated: false,
      gameState: 'play',
      board: Array.from({ length: this.height }, (_, y) =>
        Array.from({ length: this.width },
          (_, x): BlockState => ({
            x,
            y,
            adjacentMines: 0,
            reveoled: false,
          }),
        ),
      ),
      startMS: +Date.now(),
    }
  }

  getSiblings(block: BlockState) {
    return directions.map(([dx, dy]) => {
      const x2 = block.x + dx
      const y2 = block.y + dy
      if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height)
        return undefined
      return this.board[y2][x2]
    })
      .filter(Boolean) as BlockState[]
  }

  // 算下每个格子周围的炸弹数
  updateNumbers() {
    this.board.forEach((row) => {
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

  random(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  randomInt(min: number, max: number) {
    return Math.round(this.random(min, max))
  }

  // 生成炸弹
  generateMines(state: BlockState[][], initial: BlockState) {
    const placeRandom = () => {
      const x = this.randomInt(0, this.width - 1)
      const y = this.randomInt(0, this.height - 1)
      const block = state[y][x]
      if (Math.abs(initial.x - block.x) < 1 && Math.abs(initial.y - block.y) < 1)
        return false
      if (block.mine)
        return false
      block.mine = true
      return true
    }
    Array.from({ length: this.mines }, () => null)
      .forEach(() => {
        let placed = false
        while (!placed)
          placed = placeRandom()
      })
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

  showAllMines() {
    this.board.flat().forEach((item) => {
      if (item.mine)
        item.reveoled = true
    })
  }

  checkGameState() {
    if (!this.state.value.mineGernerated)
      return
    const blocks = this.board.flat()
    if (blocks.every(block => block.reveoled || block.flagged)) {
      if (blocks.some(block => block.flagged && !block.mine)) {
        this.state.value.gameState = 'lost'
        this.showAllMines()
      }
      else {
        this.state.value.gameState = 'won'
      }
    }
  }

  onRightClick(block: BlockState) {
    if (this.state.value.gameState !== 'play')
      return
    if (block.reveoled)
      return
    block.flagged = true
  }

  onClick(block: BlockState) {
    if (this.state.value.gameState !== 'play')
      return
    if (!this.state.value.mineGernerated) {
      this.generateMines(this.board, block)
      this.state.value.mineGernerated = true
    }
    block.reveoled = true
    if (block.mine) {
      this.state.value.gameState = 'lost'
      this.showAllMines()
      return
    }
    this.expandZero(block)
  }

  autoExpand(block: BlockState) {
    const siblings = this.getSiblings(block)
    const flags = siblings.reduce((a, b) => a + (b.flagged ? 1 : 0), 0)
    const notReveoled = siblings.reduce((a, b) => a + (!b.reveoled && !b.flagged ? 1 : 0), 0)
    if (flags === block.adjacentMines) {
      siblings.forEach((s) => {
        s.reveoled = true
      })
    }
    const missingFlags = block.adjacentMines - flags
    if (notReveoled === missingFlags) {
      siblings.forEach((s) => {
        if (!s.reveoled && !s.flagged)
          s.flagged = true
      })
    }
  }
}
