<script setup lang="ts">
const links = ref([
  {
    name: 'Vue',
    fileName: 'list',
    folder: 'vue',
  },
  {
    name: 'Js',
    fileName: 'list',
    folder: 'js',
  },
  {
    name: 'Css',
    fileName: 'list',
    folder: 'css',
  },
  {
    name: 'Note',
    fileName: 'list',
    folder: 'note',
  },
  {
    name: 'Game',
    fileName: 'list',
    folder: 'game',
  },
])
// is or not darkMode
const isDarkMode = computed(() => {
  return isDark.value
})

const router = useRouter()
const jumpPage = (folder: string, name: string) => {
  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)
}
</script>

<template>
  <nav class="header pa-4 link font-mno">
    <div>
      <a href="/" class="c-gray-500 hover:c-black dark:hover:c-white">
        Home
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
        {{ item.name }}
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
        href="https://github.com/guxuerui"
        target="_blank"
        title="GitHub"
      >
        <span class="inline-block" i-carbon-logo-github />
      </a>
    </div>
  </nav>
</template>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link div a {
    transition: color 0.2s ease-in-out;
  }
</style>
