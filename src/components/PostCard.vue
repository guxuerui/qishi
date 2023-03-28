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

const router = useRouter()
const jumpPage = (folder: string, name: string) => {
  if (folder && name)
    router.push(`/${folder}/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div class="max-w-xl transition px-6 py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:border-gray-700 dark:hover:border-gray-200">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer">
      {{ title }}
    </h5>
    <div class="font-normal text-gray-700 dark:text-gray-400 min-h-[4rem]">
      {{ abstract }}
    </div>
    <div max-w-14 my-3 text="center sm teal" border="1 solid rounded-3xl" bg-teal-900 cursor-pointer @click="jumpPage(chipText, 'list')">
      {{ chipText }}
    </div>
    <div flex="~" justify-between items-center>
      <span>{{ date }}</span>
      <a class="text-cyan-700 hover:text-cyan-500 text-sm underline cursor-pointer" @click="jumpPage(chipText, fileName)">Read More 👉</a>
    </div>
  </div>
</template>
