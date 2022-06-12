<script setup lang="ts">
import type { BlockState } from '~/types'
import { isDev, toggleDev } from '~/composables'

const WIDTH = 10
const HEIGHT = 10
const state = ref<BlockState[][]>([])

const reset = () => {
  state.value = Array.from({ length: HEIGHT }, (_, y) =>
    Array.from({ length: WIDTH },
      (_, x): BlockState => ({
        x,
        y,
        adjacentMines: 0,
        reveoled: false,
      }),
    ),
  )
}

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

const getSiblings = (block: BlockState) => {
  return directions.map(([dx, dy]) => {
    const x2 = block.x + dx
    const y2 = block.y + dy
    if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
      return undefined
    return state.value[y2][x2]
  })
    .filter(Boolean) as BlockState[]
}

// 算下每个格子周围的炸弹数
const updateNumbers = (state: BlockState[][]) => {
  state.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine)
        return
      getSiblings(block)
        .forEach((sibling) => {
          if (sibling.mine)
            block.adjacentMines++
        })
    })
  })
}

// 生成炸弹
const generateMines = (state: BlockState[][], initial: BlockState) => {
  for (const row of state) {
    for (const block of row) {
      if (Math.abs(initial.x - block.x) < 1)
        continue
      if (Math.abs(initial.y - block.y) < 1)
        continue
      block.mine = Math.random() < 0.2
    }
  }
  updateNumbers(state)
}

const expandZero = (block: BlockState) => {
  if (block.adjacentMines)
    return
  getSiblings(block)
    .forEach((s) => {
      if (!s.reveoled) {
        s.reveoled = true
        expandZero(s)
      }
    })
}

let mineGernerated = false

const checkGameState = () => {
  if (!mineGernerated)
    return
  const blocks = state.value.flat()
  if (blocks.every(block => block.reveoled || block.flagged)) {
    if (blocks.some(block => block.flagged && !block.mine))
      alert('You Cheat')
    else
      alert('You Win')
  }
}

watchEffect(() => {
  checkGameState()
})
reset()

const onRightClick = (block: BlockState) => {
  if (block.reveoled)
    return
  block.flagged = true
}

const onClick = (block: BlockState) => {
  if (!mineGernerated) {
    generateMines(state.value, block)
    mineGernerated = true
  }
  block.reveoled = true
  if (block.mine) {
    alert('BOOM!!!')
    return
  }
  expandZero(block)
}
</script>

<template>
  <div>
    <div mb-5>
      Minesweeper / 扫雷
      <span ml-2>
        调试:
        <button ml-2 @click="toggleDev()">
          {{ isDev }}
        </button>
      </span>
    </div>
    <div v-for="row, y in state" :key="y" flex="~" items-center justify-center>
      <MineBlock
        v-for="block, x in row"
        :key="x"
        :block="block"
        @click="onClick(block)"
        @contextmenu.prevent="onRightClick(block)"
      />
    </div>
  </div>
</template>
