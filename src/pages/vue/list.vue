<script setup lang="ts">
const postList = ref([
  {
    title: 'Vue3之呼吸效果状态组件',
    date: '2022-02-18',
    folder: 'vue',
    fileName: 'breathLightComp',
  },
  {
    title: '二次封装BalmUI表格组件',
    date: '2022-02-17',
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
      <div class="sub-title flex items-center c-gray-600 dark:c-gray-400">
        {{ item.date }}
      </div>
    </li>
  </ul>
</template>

<style scoped>
  .sub-title {
    font-size: 0.8rem;
  }
</style>
