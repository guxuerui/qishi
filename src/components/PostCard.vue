<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
    default: 'Card Title',
  },
  abstract: {
    type: String,
    required: true,
    default: 'Card Abstract',
  },
  date: {
    type: String,
    required: true,
    default: '',
  },
  chipText: {
    type: String,
    required: true,
    default: 'Chip',
  },
  chipColor: {
    type: String,
    required: true,
    default: 'teal',
  },
  fileName: {
    type: String,
    required: true,
    default: '',
  },
})
// 边框宽度
const borderWidth = ref('2px')

const router = useRouter()
const jumpPage = (folder: string, name: string) => {
  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div class="wrapper max-w-xl transition px-6 py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 position-relative">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer">
      {{ title }}
    </h5>
    <div class="font-normal text-gray-700 dark:text-gray-400 min-h-[4rem]">
      {{ abstract }}
    </div>
    <div v-if="chipText === 'vue'" class="chip z-10 position-relative" text-teal bg-teal-900 hover:bg-teal-700 @click="jumpPage(chipText, 'list')">
      {{ chipText }}
    </div>
    <div v-else-if="chipText === 'js'" class="chip z-10 position-relative" text-yellow bg-yellow-900 hover:bg-yellow-700 @click="jumpPage(chipText, 'list')">
      {{ chipText }}
    </div>
    <div v-else-if="chipText === 'css'" class="chip z-10 position-relative" text-cyan bg-cyan-900 hover:bg-cyan-700 @click="jumpPage(chipText, 'list')">
      {{ chipText }}
    </div>
    <div v-else-if="chipText === 'note'" class="chip z-10 position-relative" text-orange bg-orange-900 hover:bg-orange-700 @click="jumpPage(chipText, 'list')">
      {{ chipText }}
    </div>
    <div v-else-if="chipText === 'game'" class="chip z-10 position-relative" text-sky bg-sky-900 hover:bg-sky-700 @click="jumpPage(chipText, 'list')">
      {{ chipText }}
    </div>
    <div flex="~" justify-between items-center>
      <span>{{ date }}</span>
      <a class="text-cyan-700 hover:text-cyan-500 text-sm underline cursor-pointer z-10" @click="jumpPage(chipText, fileName)">Read More 👉</a>
    </div>
  </div>
</template>

<style scoped>
  .wrapper:before, .wrapper:after {
    content: '';
    width: 0%;
    height: 0%;
    position: absolute;
    visibility: hidden;
    border-radius: .5rem;
  }
  .wrapper:before {
    border-top: v-bind(borderWidth) solid #01ffc2;
    border-right: v-bind(borderWidth) solid #01ffc2;
    transition: width .1s ease .1s * 3, height .1s ease .1s * 2, visibility 0s .1s * 4;
    top: 0;
    left: 0;
  }
  .wrapper:after {
    border-left: v-bind(borderWidth) solid #01a4ff;
    border-bottom: v-bind(borderWidth) solid #01a4ff;
    bottom: 0;
    right: 0;
    transition: width .1s ease .1s, height .1s ease, visibility 0s .1s * 2;
  }
  .wrapper:hover:before, .wrapper:hover:after {
    width: 100%;
    height: 100%;
    visibility: visible;
  }
  .wrapper:hover:before {
    transition: width .1s ease, height .1s ease .1s;
  }
  .wrapper:hover:after {
    transition: width .1s ease .1s * 2, height .1s ease .1s * 3, visibility 0s .1s * 2;
  }
</style>
