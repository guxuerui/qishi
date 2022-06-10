<script setup lang="ts">
import type { BlockState } from '~/types'

const WIDTH = 10
const HEIGHT = 10
const state = ref(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from({ length: WIDTH },
      (_, x): BlockState => ({
        x,
        y,
        adjacentMines: 0,
        reveoled: false,
      }),
    ),
  ),
)

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
const updateNumbers = () => {
  state.value.forEach((row, y) => {
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
const generateMines = (initial: BlockState) => {
  for (const row of state.value) {
    for (const block of row) {
      if (Math.abs(initial.x - block.x) < 1)
        continue
      if (Math.abs(initial.y - block.y) < 1)
        continue
      block.mine = Math.random() < 0.2
    }
  }
  updateNumbers()
}

const numberColors = [
  'text-transparent',
  'text-gray-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-red-500',
  'text-purple-500',
  'text-pink-500',
  'text-orange-500',
  'text-indigo-500',
  'text-teal-500',
]

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
const dev = false

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

const onRightClick = (block: BlockState) => {
  if (block.reveoled)
    return
  block.flagged = true
}

const onClick = (e: MouseEvent, block: BlockState) => {
  if (!mineGernerated) {
    generateMines(block)
    mineGernerated = true
  }
  block.reveoled = true
  if (block.mine) {
    alert('BOOM!!!')
    return
  }
  expandZero(block)
}

const getBlockClass = (block: BlockState) => {
  if (block.flagged)
    return 'bg-gray-500/10'
  if (!block.reveoled)
    return 'bg-gray-500/10 hover:bg-gray-500/20'
  return block.mine ? 'bg-red-500/50' : numberColors[block.adjacentMines]
}

watchEffect(() => {
  checkGameState()
})
</script>

<template>
  <div>
    <div mb-5>
      Minesweeper / 扫雷
    </div>
    <div v-for="row, y in state" :key="y" flex="~" items-center justify-center>
      <button
        v-for="block, x in row"
        :key="x"
        w-10 h-10 m="0.5"
        border="1 gray-400/20"
        flex="~"
        items-center
        justify-center
        :class="getBlockClass(block)"
        @click="onClick($event, block)"
        @contextmenu.prevent="onRightClick(block)"
      >
        <template v-if="block.flagged">
          <div i-mdi-flag text-red />
        </template>
        <template v-else-if="block.reveoled || dev">
          <div v-if="block.mine" i-mdi-mine>
            x
          </div>
          <div v-else>
            {{ block.adjacentMines }}
          </div>
        </template>
      </button>
    </div>
  </div>
</template>
