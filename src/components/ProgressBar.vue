<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
    defalut: '',
  },
  progress: {
    type: String,
    required: true,
    default: '25%',
  },
  barColor: {
    type: String,
    required: true,
    default: '#c87',
  },
})
</script>

<template>
  <div my-1>
    {{ label }}
  </div>
  <div flex="~">
    <div h-6 w-full border="1 solid #aaa rounded-3" px-1 class="shell">
      <div h-3 class="bar rounded-3" :style="{ width: progress, backgroundColor: barColor }" />
    </div>
    <div ml-2>
      {{ progress }}
    </div>
  </div>
</template>

<style scoped>
.bar {
  margin-top: 5px;
  animation: width 1s ease-in-out;
}

@keyframes width {
  from {
    width: 0%;
  }
  to {
    width: v-bind(progress);
  }
}
</style>
