<script setup lang="ts">
const router = useRouter()
const jumpPage = (folder: string, name: string) => {
  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)
}

// judge whether the browser is Safari
const isSafari = () => {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
}
</script>

<template>
  <div class="markdown-body">
    <h1>关于我</h1>
    <p>
      嗨, 我是骑誓~  机缘巧合进入IT行业，从事前端开发工作至今, 写过移动端, 也写过PC端, 主要使用vue全家桶, 目前在一家5G+云计算公司任职, 主做B端产品
    </p>
    <p>平时喜欢听歌、看动漫、骑行、看书、写代码, 做一些有意思的小项目</p>
    <h3>个人信息</h3>
    <ul>
      <li>基本信息：古雪瑞 / 男 / 1994.08</li>
      <li>教育经历：兰州理工大学 / 计算机科学与技术 / 本科 / 2013.9-2017.6</li>
      <li>联系电话：18330229220</li>
      <li>工作年限：5年</li>
      <li>个人邮箱：im.guxuerui@gmail.com</li>
    </ul>
    <h3>专业技能</h3>
    <ul :class="{ items: !isSafari() }">
      <li>熟练掌握JS、TS、ES6、HTML5、CSS3，可以脱离框架独立进行项目开发</li>
      <li>熟练使用vue2、vue3等Vue全家桶开发</li>
      <li>熟悉webpack、vite等打包工具使用</li>
      <li>熟练使用Echarts、Apexcharts、antv/g6等可视化图表工具</li>
      <li>熟练使用Canvas，了解Three.js</li>
      <li>熟练使用Git，熟悉常用的shell命令并可熟练使用</li>
      <li>具备Web视频流开发经验，熟悉flv.js和webrtc协议使用</li>
    </ul>
    <div mt-4>
      <a class="cursor-pointer" @click="jumpPage('about', 'personal')">我的个人简历</a>
    </div>
    <div mt-2>
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
