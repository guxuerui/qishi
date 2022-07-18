<script setup lang="ts">
// status indicator
const props = defineProps({
  bgColor: {
    type: String,
    requird: false,
    default: '#326cd6',
  },
})
const indicatorColor = ref<string>('#326cd6')
watchEffect(() => {
  indicatorColor.value = props.bgColor
})
</script>

<template>
  <!-- status-indicator状态指示器 -->
  <span class="indicator" />
</template>

<style scoped>
  .indicator {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: v-bind('indicatorColor');
    animation: indicator 2s ease-in-out infinite;
  }
  @keyframes indicator {
    0%   { box-shadow: 0 0 0 0 v-bind('indicatorColor') }
    70%  { box-shadow: 0 0 0 8px rgba(216, 226, 233, 0) }
    100% { box-shadow: 0 0 0 0 rgba(216, 226, 233, 0) }
  }
</style>

