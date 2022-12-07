<script setup lang="ts">
import { PrettyTimeline } from 'pretty-timeline'
import 'pretty-timeline/dist/style.css'
import { timelineArr } from '~/composables/useTimelineData'
</script>

<template>
  <PrettyTimeline :timeline-data="timelineArr" />
</template>

<style scoped>
</style>
