<script setup lang="ts">
interface Props {
  open: boolean
}
withDefaults(defineProps<Props>(), {
  open: false,
})
const emit = defineEmits<{
  (e: 'replay'): void
}>()
const replay = () => {
  emit('replay')
}
</script>

<template>
  <Teleport to="#app">
    <div
      v-if="open"
      w-80 border="1 gray-400"
      mx-auto px-6 pt-6 pb-4
      position-relative
    >
      <div>阿欧, 你输啦! 别气馁, 再来一次吧!</div>
      <div flex="~ gap2" justify-center p4>
        <button btn @click="replay">
          再次挑战
        </button>
      </div>
    </div>
  </Teleport>
</template>

