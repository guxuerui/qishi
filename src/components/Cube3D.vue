<script setup lang="ts">
const classList = ref(['before', 'after', 'right', 'left', 'top', 'bottom'])
const rotateX = ref<number>(0)
const rotateY = ref<number>(0)
const rotateZ = ref<number>(0)
const rotateXdeg = computed(() => `${rotateX.value}deg`)
const rotateYdeg = computed(() => `${rotateY.value}deg`)
const rotateZdeg = computed(() => `${rotateZ.value}deg`)

function reset() {
  rotateX.value = 0
  rotateY.value = 0
  rotateZ.value = 0
}
</script>

<template>
  <div w-full flex="~" items-center>
    <div w-70>
      rotateX: {{ rotateX }}deg
    </div>
    <input v-model="rotateX" type="range" min="0" max="10000" step="1">
  </div>
  <div w-full flex="~" items-center my-2>
    <div w-70>
      rotateY: {{ rotateY }}deg
    </div>
    <input v-model="rotateY" type="range" min="0" max="10000" step="1">
  </div>
  <div w-full flex="~" items-center>
    <div w-70>
      rotateZ: {{ rotateZ }}deg
    </div>
    <input v-model="rotateZ" type="range" min="0" max="10000" step="1">
  </div>
  <button btn my-4 @click="reset">
    重置
  </button>
  <div class="wrap">
    <div class="content">
      <div v-for="item, i in classList" :key="i" :class="item" />
    </div>
  </div>
</template>

<style scoped>
  .wrap {
    width: 100%;
    height: 35vh;
    perspective: 1200px;
    display: flex;
  }
  .content {
    width: 300px;
    height: 300px;
    transform-style: preserve-3d;
    position: relative;
    margin: auto;
    transform: rotateX(v-bind(rotateXdeg)) rotateY(v-bind(rotateYdeg)) rotateZ(v-bind(rotateZdeg))
  }
  .content > div {
    position: absolute;
    width: 300px;
    height: 300px;
    top: 0;
    left: 0;
    border: 1px solid #585;
    box-sizing: border-box;
  }
  .content .top {
    transform-origin: bottom;
    transform: translateY(-300px) rotateX(90deg);
  }
  .content .bottom {
    transform-origin: top;
    transform: translateY(300px) rotateX(-90deg);
  }
  .content .left {
    transform-origin: right;
    transform: translateX(-300px) rotateY(-90deg);
  }
  .content .right {
    transform-origin: left;
    transform: translateX(300px) rotateY(90deg);
  }
  .content .after {
    transform: translateZ(-300px);
  }
</style>
