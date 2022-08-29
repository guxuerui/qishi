<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ init?: number }>()
const counter = ref(props.init || 0)
</script>

<template>
  <div class="counter" p-6>
    <div mb-2>
      Counter: {{ counter }}
    </div>
    <button btn @click="counter += 1">
      Inc
    </button>
    <button btn ml-4 @click="counter -= 1">
      Dec
    </button>
  </div>
</template>

<style scoped>
.counter {
  border: 2px dashed #3eaf7c;
}
</style>
