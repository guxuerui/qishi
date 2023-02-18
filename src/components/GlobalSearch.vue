<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { vuePostList } from '~/composables/vuePost'
import { cssPostList } from '~/composables/cssPost'
import { jsPostList } from '~/composables/jsPost'
import { notePostList } from '~/composables/notePost'
import { gamePostList } from '~/composables/gamePost'
import type { Post } from '~/types'

interface Props {
  open: boolean
}
withDefaults(defineProps<Props>(), {
  open: false,
})

const emit = defineEmits<{
  (e: 'cancel'): void
}>()

const searchVal = ref('')
const throttled = refThrottled(searchVal, 1000)
const postList = ref<Post[]>([])
const search = () => {
  if (!searchVal.value)
    return postList.value = []

  const list: Post[] = [...vuePostList.value, ...cssPostList.value, ...jsPostList.value, ...notePostList.value, ...gamePostList.value]
  const resList = list.filter((item: Post) => item.title.toLowerCase().includes(searchVal.value.toLowerCase()))
  postList.value = resList.slice()
}

const cancel = () => {
  searchVal.value = ''
  emit('cancel')
}

watch(() => throttled.value, (newVal, oldVal) => {
  if (newVal !== oldVal)
    search()
})

// 监听ESC
const cleanup = useEventListener(document, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape')
    cancel()
})

onBeforeUnmount(() => {
  cleanup()
})
</script>

<template>
  <Teleport to="#app">
    <div
      v-if="open"
      class="out"
      @keydown.esc="cancel"
    >
      <div
        w-120
        mx-auto pa-4
        bg="gray-800"
        position-relative
        style="top: 5rem"
      >
        <input
          id="input"
          v-model.trim="searchVal"
          placeholder="Search Posts"
          type="text"
          autofocus
          autocomplete="true"
          w-full h-10 pl-3
          text="left"
          bg="gray-800"
          border="~ rounded #1DB954"
          outline="none active:none"
          @keydown.enter="search"
        >
        <PostList class="px-1 mt-4" :posts="postList" @jumped="cancel" />
        <div flex="~" justify-between b-t="1 solid gray-500" pt-3>
          <span>esc to close</span>
          <button hover:text="orange" transition="color 1s linear" @click="cancel">
            关闭
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
  .out {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(81, 96, 130, .8);
  }
</style>
