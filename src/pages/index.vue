<script setup lang="ts">
import { isDev, toggleDev } from '~/composables'
const play = new GamePlay(10, 10)
const state = play.state

watchEffect(() => {
  play.checkGameState()
})

const router = useRouter()
const go = (folder: string, name: string) => {
  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div>
    <div mb-5>
      Minesweeper / 扫雷
    </div>
    <div mb-4>
      <button btn @click="go('blog', 'test4')">
        TO MD PAGE
      </button>
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
