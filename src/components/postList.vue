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

const emit = defineEmits<{
  (e: 'jumped'): void
}>()

// 对象数组去重
const handleRepeat = (arr: Post[]) => {
  return arr.filter((obj, index, self) =>
    index === self.findIndex(t => t.title === obj.title),
  )
}

const router = useRouter()
const jumpPage = (folder: string, name: string, post: Post) => {
  const recentPost: Post[] = JSON.parse(localStorage.getItem('recentPost') || '[]')
  if (recentPost.length >= 5)
    recentPost.shift()
  recentPost.push(post)
  localStorage.setItem('recentPost', JSON.stringify(handleRepeat(recentPost)))

  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)

  emit('jumped')
}
</script>

<template>
  <ul class="list-title font-mno">
    <li v-for="(item, i) in posts" :key="i" class="w-full flex justify-between mb-4">
      <a
        class="cursor-pointer c-gray-600 dark:c-gray-400 link-style transition-colors"
        @click="jumpPage(item.folder, item.fileName, item)"
      >{{ item.title }}</a>
      <div class="flex items-center c-gray-600 dark:c-gray-400">
        {{ item.date }}
      </div>
    </li>
  </ul>
</template>
