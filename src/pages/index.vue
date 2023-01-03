<script setup lang="ts">
const router = useRouter()
const jumpPage = (folder: string, name: string) => {
  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div class="markdown-body">
    <h1>关于我</h1>
    <p class="text-linear">
      嗨, 我是骑誓~  机缘巧合进入IT行业，从事前端开发工作至今, 写过移动端, 也写过PC端, 主要使用vue全家桶, 目前在一家5G+云计算公司任职, 主做B端产品
    </p>
    <p class="text-linear">
      平时喜欢听歌、看动漫、骑行、看书、写代码, 做一些有意思的小项目
    </p>
    <div mt-4 class="text-linear">
      <!-- <a class="cursor-pointer" @click="jumpPage('about', 'personal')">我的个人简历</a> -->
      <a class="mr-3 cursor-pointer" @click="jumpPage('about', 'lifeTimeline')">光阴长河</a>
      <a href="https://github.com/guxuerui" target="_blank">我的Github</a>
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
