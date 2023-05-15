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
const props = withDefaults(defineProps<Props>(), {
  open: false,
})

const emit = defineEmits<{
  (e: 'cancel'): void
}>()

// autofocus directive
const vFocus = {
  mounted: (el: { focus: () => void }) => {
    el.focus()
  },
}

const target = ref(null)
const searchVal = ref('')
const throttled = refThrottled(searchVal, 1000)
const postList = ref<Post[]>([])
const recentPostList = ref<Post[]>([])
const search = function () {
  if (!searchVal.value)
    return postList.value = []

  const list: Post[] = [...vuePostList.value, ...cssPostList.value, ...jsPostList.value, ...notePostList.value, ...gamePostList.value]
  const resList = list.filter((item: Post) => item.title.toLowerCase().includes(searchVal.value.toLowerCase()))
  postList.value = resList.slice()
}

const cancel = function () {
  searchVal.value = ''
  emit('cancel')
}

onClickOutside(target, () => {
  cancel()
})

const clearRecent = function () {
  localStorage.setItem('recentPost', '')
  recentPostList.value = []
}

watch(() => throttled.value, (newVal, oldVal) => {
  if (newVal !== oldVal)
    search()
})

watch(() => props.open, (newVal, _oldVal) => {
  if (newVal)
    recentPostList.value = JSON.parse(localStorage.getItem('recentPost') || '[]')
}, { immediate: true })

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
      class="position-fixed top-0 left-0 w-full h-full z-10"
    >
      <div
        ref="target"
        max-w-120
        mx-auto pa-4
        bg="white dark:gray-800"
        position-relative top-20
        shadow="2xl"
      >
        <input
          id="input"
          v-model.trim="searchVal"
          v-focus
          placeholder="Search Posts"
          type="text"
          autocomplete="true"
          w-full h-10 pl-3
          text="left"
          bg="white dark:gray-800"
          border="~ rounded #1DB954"
          outline="none active:none"
          @keydown.enter="search"
        >
        <div v-if="!searchVal && recentPostList.length">
          <div text="#1DB954" my-3 flex="~" justify-between items-center>
            <span>Recent Files</span>
            <span text="sm" cursor-pointer @click="clearRecent">
              清空历史记录
            </span>
          </div>
          <PostList class="px-1" :show-footer="false" :posts="recentPostList" @jumped="cancel" />
        </div>
        <PostList v-else class="px-1 mt-4" :posts="postList" @jumped="cancel" />
        <div flex="~" justify-between b-t="1 solid gray-500" pt-3 c-gray-600 dark:c-gray-400>
          <span>press esc to close</span>
          <button hover:text="orange" transition="color 1s linear" @click="cancel">
            关闭
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
