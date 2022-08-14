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
    <p>
      嗨, 我是骑誓~ 2017年本科毕业, 从事前端开发至今, 写过移动端, 也写过PC端, 主要使用vue全家桶, 目前在一家5G+云计算公司任职, 主做B端产品。
    </p>
    <p>平时喜欢刷B站看动漫、听歌、骑行、写代码, 做一些有意思的小项目。</p>
    <div>
      <a class="cursor-pointer" @click="jumpPage('about', 'personal')">我的个人简历</a>
    </div>
    <div mt-2>
      <a href="https://github.com/guxuerui" target="_blank">我的Github</a>
    </div>
  </div>
</template>
