<script setup lang="ts">
import { isDev, toggleDev } from '~/composables'

const play = new GamePlay(10, 10, 30)
useStorage('vuesweeper-state', play.state)
const state = computed(() => play.board)

watchEffect(() => {
  play.checkGameState()
})
</script>

<template>
  <div text="center">
    <div mb-5>
      Minesweeper / 扫雷
    </div>
    <div v-for="row, y in state" :key="y" flex="~" items-center justify-center>
      <MineBlock
        v-for="block, x in row"
        :key="x"
        :block="block"
        @click="play.onClick(block)"
        @contextmenu.prevent="play.onRightClick(block)"
      />
    </div>
    <!-- <div> -->
    <!--   count: {{ play.blocks.reduce((a, b) => a + (b.mine ? 1 : 0), 0) }} -->
    <!-- </div> -->
    <div flex="~ gap-2" mt-4 justify-center>
      <button btn @click="toggleDev()">
        {{ isDev ? '开发模式' : '游戏模式' }}
      </button>
      <button btn @click="play.reset()">
        重新开始
      </button>
    </div>
  </div>
</template>
