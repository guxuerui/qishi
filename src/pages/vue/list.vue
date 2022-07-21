<script setup lang="ts">
const postList = ref([
  {
    title: 'Vue3之齿轮环状仪表盘组件',
    date: '2022-07-22',
    folder: 'vue',
    fileName: 'Vue3Guage',
  },
  {
    title: 'Vue3之状态指示灯组件',
    date: '2022-07-18',
    folder: 'vue',
    fileName: 'statusIndicator',
  },
  {
    title: '二次封装BalmUI表格组件',
    date: '2022-07-17',
    folder: 'vue',
    fileName: 'refactorBalmDataTable',
  },
])

const router = useRouter()
const jumpPage = (folder: string, name: string) => {
  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)
}
</script>

<template>
  <ul class="list-title">
    <li v-for="(item, i) in postList" :key="i" class="w-full flex justify-between mb-4">
      <a
        class="cursor-pointer c-gray-600 hover:c-black dark:c-gray-400 dark:hover:c-white"
        @click="jumpPage(item.folder, item.fileName)"
      >
        {{ item.title }}
      </a>
      <div class="flex items-center c-gray-600 dark:c-gray-400">
        {{ item.date }}
      </div>
    </li>
  </ul>
</template>

<style scoped>
</style>
