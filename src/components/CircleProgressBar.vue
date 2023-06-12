<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
  percentValue: {
    type: String,
    default: '0%',
  },
  startColor: {
    type: String,
    default: '#25AABE',
  },
  endColor: {
    type: String,
    default: '#C2FE89',
  },
  valueColor: {
    type: String,
    default: '#80BD68',
  },
  titleColor: {
    type: String,
    default: '#80BD8f',
  },
})

// 圆环进度
const strokeValue = computed(() => {
  return 544 - (+(parseFloat(props.percentValue) / 100 * 544).toFixed(0))
})

function useTranslate() {
  switch (props.percentValue.length) {
    case 5:
      return 'translate(35 84)'
    case 4:
      return 'translate(48 84)'
    case 3:
      return 'translate(58 84)'
    default:
      return 'translate(70 84)'
  }
}
</script>

<template>
  <svg width="195" height="195" class="scale-75" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grident" x1="0%" y1="0%" x2="102%" y2="101%">
        <stop :stop-color="startColor" offset="0%" />
        <stop :stop-color="endColor" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(8 14)" stroke="url(#grident)" stroke-width="12">
        <circle opacity=".5" cx="86.5" cy="86.5" r="86.5" />
        <path d="M86.5 0C134.273 0 173 38.727 173 86.5S134.273 173 86.5 173 0 134.273 0 86.5 38.727 0 86.5 0z" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="226,301,226,299" class="progress-bar" />
      </g>
      <text font-size="40" font-weight="300" :fill="valueColor" :transform="useTranslate()">
        <tspan x="0" y="20">{{ percentValue }}</tspan>
      </text>
      <text font-size="20" font-weight="300" :fill="titleColor" transform="translate(68 104)">
        <tspan x="0" y="30">{{ title }}</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.progress-bar {
  stroke-dasharray: 544;
  animation-name: write;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes write {
  0% {
    stroke-dashoffset: 544;
  }
  100% {
    stroke-dashoffset: v-bind(strokeValue);
  }
}
</style>
