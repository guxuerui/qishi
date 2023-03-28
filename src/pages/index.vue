<script setup lang="ts">
import { ChipsData, SkillListData } from '~/consants/skillData'
import { getLatestPost } from '~/consants/latestPostData'
import type { IPostCard } from '~/types'

const router = useRouter()
const latestPostData = ref<IPostCard[]>([])
const jumpPage = (folder: string, name: string) => {
  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)
}

onMounted(async () => {
  latestPostData.value = await getLatestPost()
})
</script>

<template>
  <div class="markdown-body">
    <h1>我的个人空间</h1>
    <div class="text-linear" flex="~ gap-x-2">
      <img v-for="(chip, i) in ChipsData" :key="i" my-0 :src="chip" alt="" class="!my-0">
    </div>
    <p class="text-linear">
      欢迎来到我的个人空间，在这里记录我的学习过程，希望能够帮助到更多的朋友~
    </p>
    <p class="text-linear">
      我喜欢做一些有意思的小项目
    </p>
    <a
      class="c-gray-400"
      flex="~ gap-x-1" items-center
      hover="c-black"
      dark:hover="c-white"
      rel="noreferrer"
      href="https://github.com/guxuerui/qishi"
      target="_blank"
      title="GitHub"
    >
      <span class="inline-block" i-carbon-logo-github />
      <span>github</span>
    </a>
    <h3>Latest Posts</h3>
    <div grid="~ cols-1 gap-6" class="sm:grid-cols-2">
      <PostCard
        v-for="(card, i) in latestPostData"
        :key="i"
        :title="card.title"
        :abstract="card.abstract"
        :date="card.date"
        :chip-text="card.chipText"
        :chip-color="card.chipColor"
      />
    </div>
    <h3>Used Language Rank -></h3>
    <div grid="~ cols-1">
      <ProgressBar
        v-for="(bar, i) in SkillListData"
        :key="i"
        :label="bar.label"
        :progress="bar.progress"
        :bar-color="bar.color"
      />
    </div>
  </div>
</template>

<style scoped>
  @counter-style fixed {
    system: fixed;
    symbols: ❶ ❷ ❸ ❹ ❺ ❻ ❼ ❽ ❾ ❿;
    suffix: " ";
  }
  .items {
    margin-left: 1.5rem;
    list-style-type: fixed;
  }
  .items li {
    padding-left: 0.5rem;
  }
  .items li::before {
    display: none;
  }
</style>
