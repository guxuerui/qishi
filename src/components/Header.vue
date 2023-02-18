<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import type { Post } from '~/types'

const links = ref<Omit<Post, 'date'>[]>([
  {
    title: 'Vue',
    fileName: 'list',
    folder: 'vue',
  },
  {
    title: 'Js',
    fileName: 'list',
    folder: 'js',
  },
  {
    title: 'Css',
    fileName: 'list',
    folder: 'css',
  },
  {
    title: 'Note',
    fileName: 'list',
    folder: 'note',
  },
  {
    title: 'Game',
    fileName: 'list',
    folder: 'game',
  },
])
// is or not darkMode
const isDarkMode = computed(() => {
  return isDark.value
})

const router = useRouter()
const jumpPage = (folder: string, title: string) => {
  if (folder && title)
    router.push(`/${folder}/${encodeURIComponent(title)}`)
}

// open search modal
const openSearch = ref(false)
// 监听 command+K 按键
function handleKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.code === 'KeyK') {
    // 执行操作
    openSearch.value = true
    e.preventDefault()
  }
}

const cleanup = useEventListener(document, 'keydown', (e: KeyboardEvent) => {
  handleKeyDown(e)
})

onBeforeUnmount(() => {
  cleanup()
})
</script>

<template>
  <nav class="header pa-4 link font-mno">
    <div class="c-gray-500">
      <a href="/" class="hover:c-black dark:hover:c-white">
        Home
      </a>
      <a class="cursor-pointer hover:c-#1DB954 search-btn" @click="openSearch = true">
        <span class="inline-block vertical-sub" i-carbon-search />
        <span border="1px solid c-gray-500 rounded" class="px-1 text-sm search-icon ml-1">
          <span class="inline-block vertical-sub" i-carbon-mac-command />
          <span>K</span>
        </span>
      </a>
    </div>
    <div style="padding-top: 0.3rem">
      <a
        v-for="(item, i) in links"
        :key="i"
        class="mr-3 c-gray-500 cursor-pointer"
        hover="c-black border-b-2 border-b-orange"
        dark:hover="c-white"
        @click="jumpPage(item.folder, item.fileName)"
      >
        {{ item.title }}
      </a>
      <button
        class="icon-btn !outline-none vertical-sub c-gray-800 dark:c-gray-400"
        hover="c-black"
        dark:hover="c-white"
        @click="toggleDark()"
      >
        <div v-if="isDarkMode" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>
      <a
        class="vertical-sub ml-3 c-gray-400"
        hover="c-black"
        dark:hover="c-white"
        rel="noreferrer"
        href="https://github.com/guxuerui/qishi"
        target="_blank"
        title="GitHub"
      >
        <span class="inline-block" i-carbon-logo-github />
      </a>
    </div>
  </nav>
  <global-search :open="openSearch" @cancel="openSearch = false" />
</template>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link div a, search-icon {
    transition: all 0.2s ease-in-out;
  }
  .search-btn:hover .search-icon {
    border-color: #1DB954;
  }
</style>
