<script setup lang="ts">
const routes = useRoute()

function setCopy() {
  if (!navigator.clipboard)
    return

  const preTags = document.getElementsByTagName('pre')
  setTimeout(() => {
    const preTagsArr = Array.from(preTags)

    for (let i = 0; i < preTagsArr.length; i++) {
      preTagsArr[i].style.position = 'relative'
      const copyBtn = document.createElement('button')
      copyBtn.innerHTML = '<span i-carbon-copy>copy</span>'
      copyBtn.classList.add('copy-btn')
      preTagsArr[i].appendChild(copyBtn)
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(preTagsArr[i].innerHTML.trim())
          .then(() => alert('Code Copied!'))
          .catch(err => console.error('Failed to cpoy code: ', err))
      })
    }
  }, 100)
}

watch(() => routes.fullPath, setCopy, { immediate: true })
</script>

<template>
  <Header />
  <main class="main slide-enter-content" font-sans p="x-4 y-5" text="center gray-700 dark:gray-200">
    <router-view class="slide-enter-content" />
    <Footer v-if="routes.fullPath !== '/' && !routes.fullPath.includes('list')" />
  </main>
  <BackTop />
  <PageBg />
</template>

<style scoped>
  .main {
    max-width: 65ch;
    text-align: left;
    margin: 0 auto;
    font-size: 1rem;
  }
</style>
