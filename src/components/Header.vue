<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { links } from '~/consants/HeaderLinks'

const routes = useRoute()

const ifMobile = isMobile()
const showMenuList = ref(false)
const targetMenu = ref(null)
onClickOutside(targetMenu, () => {
  if (showMenuList.value)
    showMenuList.value = false
})

// is or not darkMode
const isDarkMode = computed(() => {
  return isDark.value
})

const activeIndex = ref<number | undefined>(0)
const router = useRouter()
const jumpPage = function (folder: string, title: string, index?: number) {
  activeIndex.value = index
  showMenuList.value = false

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

watch(() => routes, (newVal, _oldVal) => {
  if (newVal.fullPath === '/')
    activeIndex.value = undefined
}, { deep: true })

onBeforeUnmount(() => {
  cleanup()
})
</script>

<template>
  <nav class="header link font-mno mx-auto max-w-70ch" :class="ifMobile ? 'pa-4' : 'py-4'">
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
      <span v-if="ifMobile" ref="targetMenu">
        <a
          class="vertical-sub mr-3 c-gray-400"
          hover="c-black"
          position-relative
          dark:hover="c-white"
          @click="showMenuList = !showMenuList"
        >
          <span class="inline-block" i-carbon-menu />
        </a>
        <div
          v-if="showMenuList"
          position-absolute
          bg="gray-100"
          dark:bg="gray-900"
          w-20
          pa-2
          border="rounded"
        >
          <a
            v-for="(item, i) in links"
            :key="i"
            class="c-gray-500 cursor-pointer block mt-1"
            @click="jumpPage(item.folder, item.fileName)"
          >
            {{ item.title }}
          </a>
        </div>
      </span>
      <span
        v-for="(item, i) in links"
        v-else
        :key="i"
        class="mr-3 c-gray-500 cursor-pointer transition"
        :class="[activeIndex === i ? 'c-black border-b-2 border-b-orange dark:c-white' : '']"
        hover="c-black border-b-2 border-b-orange"
        dark:hover="c-white"
        @click="jumpPage(item.folder, item.fileName, i)"
      >
        {{ item.title }}
      </span>
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
  .link div a, .search-icon {
    transition: all 0.2s ease-in-out;
  }
  .search-btn:hover .search-icon {
    border-color: #1DB954;
  }
</style>
