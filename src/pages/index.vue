<script setup lang="ts">
import { ChipsData, SkillListData } from '~/constants/skillData'
import { getLatestPost } from '~/constants/latestPostData'
import getProjectCardsData from '~/constants/projectCardsData'
import type { IPostCard } from '~/types'

const latestPostData = ref<IPostCard[]>([])

const projectCardsData = getProjectCardsData()

onMounted(async () => {
  latestPostData.value = await getLatestPost()
})
</script>

<template>
  <div class="markdown-body slide-enter-content">
    <h1>我的个人空间</h1>
    <div class="text-linear sm:grid-cols-9" grid="~ cols-4 gap-2">
      <img v-for="(chip, i) in ChipsData" :key="i" my-0 :src="chip" alt="" class="!my-0">
    </div>
    <p class="text-linear !my-3">
      前端开发 / 业余骑行爱好者 - 「 先让手会, 再让心会 」<br>
      <span text-sm>喜欢做开源以及一些有意思的小项目</span>
    </p>
    <div flex="~ gap-x-4">
      <a
        class="c-gray-400 w-20"
        flex="~ gap-x-1" items-center
        hover="c-black"
        dark:hover="c-white"
        rel="noreferrer"
        href="https://github.com/guxuerui"
        target="_blank"
        title="GitHub"
      >
        <span class="inline-block" i-carbon-logo-github />
        <span>github</span>
      </a>
      <a
        class="c-gray-400 w-50"
        flex="~ gap-x-1" items-center
        hover="c-black"
        dark:hover="c-white"
        rel="noreferrer"
        title="Things I'm Using"
        href="/about/using"
      >
        <span class="inline-block" i-carbon-tool-kit />
        <span>Things I'm Using</span>
      </a>
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
    <h3>Personal Projects</h3>
    <div grid="~ cols-1 gap-6" class="sm:grid-cols-2">
      <ProjectCard
        v-for="(card, i) in projectCardsData"
        :key="i"
        :title="card.title"
        :abstract="card.abstract"
        :border-color="card.borderColor"
        :img-url="card.imgUrl"
        :project-url="card.projectUrl"
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
    <div mt-4>
      Qishi © 2023
    </div>
  </div>
</template>
