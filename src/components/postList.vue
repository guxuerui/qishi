<script setup lang="ts">
// 列表组件
import type { PropType } from 'vue'
import type { Post } from '~/types'
defineProps({
  posts: {
    type: Array as PropType<Post[]>,
    required: true,
  },
})
// const emit = defineEmits<{
//   (e: 'jump', post: Post): void
// }>()
const router = useRouter()
const jumpPage = (folder: string, name: string) => {
  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)
}
</script>

<template>
  <ul class="list-title">
    <li v-for="(item, i) in posts" :key="i" class="w-full flex justify-between mb-4">
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

