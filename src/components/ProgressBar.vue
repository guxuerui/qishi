<script setup lang="ts">
const props = defineProps({
  progress: {
    type: String,
    required: true,
    default: '25%',
  },
})
</script>

<template>
  <div class="shell">
    <div class="bar" :style="{ width: progress }">
      <span>{{ progress }}%</span>
    </div>
  </div>
</template>

<style scoped>
.shell {
  height: 30px;
  width: 250px;
  border: 1px solid #aaa;
  border-radius: 13px;
  padding: 4px;
}

.bar {
  background: linear-gradient(to right, #B993D6, #8CA6DB);
  height: 20px;
  border-radius: 10px;
  animation: width 1s ease-in-out;
}

.bar span {
  float: right;
  color: #fff;
  font-size: 0.8rem;
  padding-right: 8px;
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
