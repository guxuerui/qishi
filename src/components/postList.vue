<script setup lang="ts">
// 列表组件
import type { PropType } from 'vue'
import type { Post } from '~/types'

const props = defineProps({
  showFooter: {
    type: Boolean,
    required: false,
    default: true,
  },
  posts: {
    type: Array as PropType<Post[]>,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'jumped'): void
}>()

const routes = useRoute()

// 对象数组去重
const handleRepeat = function (arr: Post[]) {
  return arr.filter((obj, index, self) =>
    index === self.findIndex(t => t.title === obj.title),
  )
}

const router = useRouter()
const RECENT_MAX_POST = ref(5)
const LOCAL_STORAGE_RECENT_POSTS_KEY = ref('recentPost')
const jumpPage = function (folder: string, name: string, post: Post) {
  const recentPost: Post[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_RECENT_POSTS_KEY.value) || '[]')
  if (recentPost.length >= RECENT_MAX_POST.value)
    recentPost.shift()
  recentPost.push(post)
  localStorage.setItem(LOCAL_STORAGE_RECENT_POSTS_KEY.value, JSON.stringify(handleRepeat(recentPost)))

  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)

  emit('jumped')
}

const shouldShowFoolter = computed(() => {
  return routes.fullPath !== '/' && routes.fullPath.includes('list') && props.showFooter
})
</script>

<template>
  <ul class="list-title font-mno slide-enter-content">
    <li v-for="(item, i) in posts" :key="item.title + i" class="w-full flex justify-between mb-4">
      <a
        class="cursor-pointer c-gray-600 dark:c-gray-400 link-style transition-colors"
        @click="jumpPage(item.folder, item.fileName, item)"
      >{{ item.title }}</a>
      <div class="flex items-center c-gray-600 dark:c-gray-400">
        {{ item.date }}
      </div>
    </li>
    <Footer v-if="shouldShowFoolter" />
  </ul>
</template>
