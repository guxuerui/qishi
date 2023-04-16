<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Project Title',
  },
  borderColor: {
    type: String,
    default: 'teal',
  },
  abstract: {
    type: String,
    default: 'This is a test project.',
  },
  imgUrl: {
    type: String,
    default: '',
  },
  projectUrl: {
    type: String,
    default: '',
  },
})

const bgColor = computed(() => {
  return isDark.value ? 'rgba(31, 41, 55, 1)' : 'rgba(255, 255, 255, 1)'
})

const openUrl = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div
    border="t-3 solid rounded-lg"
    p="x-6 y-4"
    bg="white dark:gray-800"
    hover="scale-105 cursor-pointer"
    shadow
    relative
    max-w-xl
    transition
    class="active-bg"
    @click="openUrl(projectUrl)"
  >
    <h5
      mb-2
      text="2xl font-bold gray-900 dark:white"
      hover="cursor-pointer translate-x-4"
      transition
      tracking-tight
    >
      {{ title }}
    </h5>
    <p>{{ abstract }}</p>
    <img
      float="right"
      class="w-2/5 !my-4"
      :src="imgUrl"
      alt="street"
    >
  </div>
</template>

<style scoped>
  .active-bg {
    border-color: v-bind(borderColor);
  }
  .active-bg:hover {
    background-image: linear-gradient(to bottom, v-bind(borderColor), v-bind(bgColor));
  }
</style>
