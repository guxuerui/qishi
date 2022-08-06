<script setup lang="ts">
// import { isDev, toggleDev } from '~/composables'

const play = new GamePlay(9, 9, 10)
play.reset(9, 9, 10)
useStorage('vuesweeper-state', play.state)
const state = computed(() => play.board)

const newGame = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy':
      play.reset(9, 9, 1)
      break
    case 'medium':
      play.reset(16, 16, 40)
      break
    case 'hard':
      play.reset(16, 30, 99)
      break
  }
}

const now = $(useNow())
const timerMS = $computed(() => {
  return Math.round(((play.state.value.endMS || +now) - play.state.value.startMS) / 1000)
})

const mineReset = $computed(() => {
  if (!play.state.value.mineGernerated)
    return play.mines
  return play.blocks.reduce((a, b) => a + (b.mine ? 1 : 0) - (b.flagged ? 1 : 0), 0)
})

watchEffect(() => {
  play.checkGameState()
})
</script>

<template>
  <div text="center">
    <div mb-5>
      Minesweeper / 扫雷
    </div>
    <div flex="~ gap2" justify-center p4>
      <button btn @click="play.reset()">
        新游戏
      </button>
      <button btn @click="newGame('easy')">
        简单
      </button>
      <button btn @click="newGame('medium')">
        中等
      </button>
      <button btn @click="newGame('hard')">
        困难
      </button>
    </div>
    <div flex="~" justify-center items-center font-mono text-xl py-4>
      计时: <div i-carbon-timer bg-blue-500 mx-2 />{{ timerMS }}秒
    </div>
    <div flex="~" justify-center items-center font-mono text-xl pb-4>
      剩余炸弹: <div i-mdi-mine bg-red-500 mx-2 />{{ mineReset }}
    </div>
    <div v-for="row, y in state" :key="y" flex="~" items-center justify-center>
      <MineBlock
        v-for="block, x in row"
        :key="x"
        :block="block"
        @click="play.onClick(block)"
        @dblclick="play.autoExpand(block)"
        @contextmenu.prevent="play.onRightClick(block)"
      />
    </div>
    <!-- <div flex="~ gap-2" mt-4 justify-center> -->
    <!--   <button btn @click="toggleDev()"> -->
    <!--     {{ isDev ? '开发模式' : '游戏模式' }} -->
    <!--   </button> -->
    <!-- </div> -->
    <Confetti :passed="play.state.value.status === 'won'" />
    <LostModal :open="play.state.value.status === 'lost'" @replay="play.reset()" />
  </div>
</template>
