<script setup lang="ts">
import type { RepoList } from '~/types'

const inputVal = $ref<string>('')
const repoList = ref<RepoList[]>([])
let showLoading = $ref<boolean>(false)
let notFound = $ref<boolean>(false)

const getRepos = async (githubId: string) => {
  showLoading = true
  notFound = false
  try {
    for (let i = 1; i <= 10; i++) {
      const res = await axios.get(`https://api.github.com/users/${githubId}/repos?page=${i}&tab=repositories`)
      if (res.status === 200 && res.data.length) {
        repoList.value = [...repoList.value, ...res.data]
      }
      else {
        showLoading = false
        return
      }
    }
  }
  catch (e) {
    notFound = true
  }
  finally {
    showLoading = false
  }
}

const search = () => {
  repoList.value.length = 0
  getRepos(inputVal)
}

const personalRepoList = $computed(() => {
  return repoList.value.filter(item => !item.fork)
})

const totalStars = $computed(() => {
  return personalRepoList.reduce((total, item) => {
    return total + item.stargazers_count
  }, 0)
})

const totalForks = $computed(() => {
  return personalRepoList.reduce((total, item) => {
    return total + item.forks_count
  }, 0)
})

let sorted = $ref<number>(0)
const sortRepo = (type: string) => {
  sorted += 1
  switch (type) {
    case 'star':
      if (sorted % 2 !== 0)
        repoList.value.sort((a, b) => b.stargazers_count - a.stargazers_count)

      else
        repoList.value.sort((a, b) => a.stargazers_count - b.stargazers_count)

      break
    case 'fork':
      if (sorted % 2 === 0)
        repoList.value.sort((a, b) => b.forks_count - a.forks_count)

      else
        repoList.value.sort((a, b) => a.forks_count - b.forks_count)
      break
    default:
      break
  }
}
</script>

<template>
  <div class="markdown-body">
    <h1>统计GitHub个人项目Star数量</h1>
    <div mb-4>
      User
      <input
        id="input"
        v-model="inputVal"
        placeholder="What's your githubId?"
        type="text"
        autocomplete="false"
        p="x-4 y-2"
        mx-3
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        class="focus:border-green-400 focus:shadow-green-400/50 shadow-md transition-colors"
        @keydown.enter="search"
      >

      <button
        class="text-sm btn"
        :disabled="!inputVal"
        @click="search"
      >
        Count
      </button>
      <button
        class="m-2 text-sm btn"
        :disabled="!personalRepoList.length"
        @click="sortRepo('star')"
      >
        Sort By Star
      </button>
      <button
        class="text-sm btn"
        :disabled="!personalRepoList.length"
        @click="sortRepo('fork')"
      >
        Sort By Fork
      </button>
    </div>
    <div v-if="notFound" text-red font-bold>
      Repository Not Found!
    </div>
    <div v-if="showLoading" pa-6>
      <Loading />
    </div>
    <div v-if="personalRepoList.length">
      <div class="repo-list">
        <span border="~">
          <span i-carbon-folder mr-2 />
          Repository ({{ personalRepoList.length }})
        </span>
        <span border="~ x-0">
          <span i-carbon-star mr-2 />
          Stars
        </span>
        <span border="~">
          <span i-carbon-direction-fork mr-2 />
          Forks
        </span>
      </div>
      <div class="repo-list">
        <span border="~">Totally</span>
        <span border="~ x-0">{{ totalStars }}</span>
        <span border="~">{{ totalForks }}</span>
      </div>
      <div
        v-for="repo in personalRepoList"
        :key="repo.id"
        class="repo-list"
      >
        <span border="~">
          <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
        </span>
        <span border="~ x-0">{{ repo.stargazers_count }}</span>
        <span border="~">{{ repo.forks_count }}</span>
      </div>
    </div>
    <div mt-4>
      <a href="https://github.com/guxuerui/qishi/blob/main/src/pages/vue/countStars.vue" target="_blank">源码地址</a>
    </div>
  </div>
</template>

<style scoped>
  .repo-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .repo-list span {
    padding: 0.5rem;
    text-align: center;
  }
</style>
