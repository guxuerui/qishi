<script setup lang="ts">
import image from '/imgs/street.jpeg'

const slider1 = $ref(0)
const slider1Val = computed(() => `${slider1}%`)

const slider2 = $ref(0)
const slider2Val = computed(() => `${slider2}%`)

const slider3 = $ref(1)
const slider3Val = computed(() => `${slider3}%`)
</script>

<template>
  <div flex="~ gap-6">
    <div min-h-50 w-85>
      <div h-20 overflow-scroll>
        1. grayscale() 函数将改变图像灰度值。取值在0%-100%之间，默认为0
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider1 }}</div>
        <div>Max: 100</div>
      </div>
      <input v-model="slider1" type="range" min="0" max="100" step="1">
      <img :src="image" class="slider1">
    </div>
    <div min-h-50 w-85>
      <div h-20 overflow-scroll>
        2. sepia() 函数将图像变为深褐色。取值在0%-100%之间，默认为0
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider2 }}</div>
        <div>Max: 100</div>
      </div>
      <input v-model="slider2" type="range" min="0" max="100" step="1">
      <img :src="image" class="slider2">
    </div>
  </div>
  <div flex="~ gap-6">
    <div min-h-50 w-85>
      <div h-20 overflow-scroll>
        3. saturate() 函数转换图像饱和度。取值应大于0，默认为1
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider3 }}</div>
      </div>
      <input v-model="slider3" type="range" min="0" max="10000" step="1">
      <img :src="image" class="slider3">
    </div>
  </div>
</template>

<style scoped>
  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: #eee;
  }
  /* chrome - slider 滑块样式 */
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 12px;
    width: 12px;
    background: #7D5;
    border-radius: 50%;
    border: none;
  }
  .slider1 {
    filter: grayscale(v-bind(slider1Val));
  }
  .slider2 {
    filter: sepia(v-bind(slider2Val));
  }
  .slider3 {
    filter: saturate(v-bind(slider3Val));
  }
</style>
