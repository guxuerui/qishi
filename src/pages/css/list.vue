<script setup lang="ts">
const postList = ref([
  {
    title: '纯CSS实现樱花般的齿轮动画',
    date: '2022-07-23',
    folder: 'css',
    fileName: 'cog',
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
