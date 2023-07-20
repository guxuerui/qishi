<script setup lang="ts">
import { galleryItems } from '~/constants/galleryData'

const ifMobile = isMobile()
</script>

<template>
  <h1 text-4xl>
    一言一行
  </h1>
  <div class="columns-2 gap-4 w-full my-6" :class="{ 'columns-1 gap-4': ifMobile }">
    <div
      v-for="(item, index) in galleryItems"
      :key="index"
      mb-4 p-4
      rounded
      b="l-6"
      bg-op-50
      text-gray-800
      dark:text-white
      break-inside-avoid
      :style="{ 'border-left-color': item.color, 'background-color': item.color }"
    >
      <h2>{{ item.title }}</h2>
      <p mt-2 flex="~ justify-between">
        <span>发布于: {{ item.date }}</span>
        <span>作者: {{ item.author }}</span>
      </p>
    </div>
  </div>
</template>
