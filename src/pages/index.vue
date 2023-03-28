<script setup lang="ts">
import { ChipsData, SkillListData } from '~/consants/skillData'
import { getLatestPost } from '~/consants/latestPostData'
import type { IPostCard } from '~/types'

const latestPostData = ref<IPostCard[]>([])

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
    <p class="text-linear !my-3">
      前端开发 / 业余LOL玩家<br>
      <span text-sm>我喜欢做一些有意思的小项目</span>
    </p>
    <a
      class="c-gray-400 w-20"
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
        :file-name="card.fileName"
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
