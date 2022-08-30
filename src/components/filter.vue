<script setup lang="ts">
import image from '/imgs/street.jpeg'

const slider1 = $ref(0)
const slider1Val = computed(() => `${slider1}%`)

const slider2 = $ref(0)
const slider2Val = computed(() => `${slider2}%`)

const slider3 = $ref(1)
const slider3Val = computed(() => `${slider3}%`)

const slider4 = $ref(100)
const slider4Val = computed(() => `${slider4}deg`)

const slider5 = $ref(0)
const slider5Val = computed(() => `${slider5}%`)

const slider6 = $ref(100)
const slider6Val = computed(() => `${slider6}%`)

const slider7 = $ref(100)
const slider7Val = computed(() => `${slider7}%`)

const slider8 = $ref(100)
const slider8Val = computed(() => `${slider8}%`)

const slider9 = $ref(0)
const slider9Val = computed(() => `${slider9}px`)

const slider10 = $ref(8)
const slider10Val = computed(() => `${slider10}px`)
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
      <div h-24 overflow-scroll>
        3. saturate() 函数转换图像饱和度。取值应大于等于0，默认为1
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider3 }}</div>
      </div>
      <input v-model="slider3" type="range" min="0" max="10000" step="1">
      <img :src="image" class="slider3">
    </div>
    <div min-h-50 w-85>
      <div h-24 overflow-scroll>
        4. hue-rotate() 函数对图像做色相旋转。默认为0deg，0-360deg为一个循环，超过360deg相当于又从0开始
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider4 }}</div>
      </div>
      <input v-model="slider4" type="range" min="0" max="10000" step="1">
      <img :src="image" class="slider4">
    </div>
  </div>
  <div flex="~ gap-6">
    <div min-h-50 w-85>
      <div h-20 overflow-scroll>
        5. invert() 函数反转图像。取值为0%-100%，默认为0%
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider5 }}</div>
        <div>Max: 100</div>
      </div>
      <input v-model="slider5" type="range" min="0" max="100" step="1">
      <img :src="image" class="slider5">
    </div>
    <div min-h-50 w-85>
      <div h-20 overflow-scroll>
        6. opacity() 函数转化图像的透明度。取值在0%-100%之间，默认为100%
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider6 }}</div>
        <div>Max: 100</div>
      </div>
      <input v-model="slider6" type="range" min="0" max="100" step="1">
      <img :src="image" class="slider6">
    </div>
  </div>
  <div flex="~ gap-6">
    <div min-h-50 w-85>
      <div h-24 overflow-scroll>
        7. brightness() 函数调整图像明亮度。可以为数字或百分比值，默认为1即100%
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider7 }}</div>
      </div>
      <input v-model="slider7" type="range" min="0" max="3000" step="1">
      <img :src="image" class="slider7">
    </div>
    <div min-h-50 w-85>
      <div h-24 overflow-scroll>
        8. contrast() 函数调整图像的对比度。值大于等于0%，默认为100%
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider8 }}</div>
      </div>
      <input v-model="slider8" type="range" min="0" max="3000" step="1">
      <img :src="image" class="slider8">
    </div>
  </div>
  <div flex="~ gap-6">
    <div min-h-50 w-85>
      <div h-24 overflow-scroll>
        9. blur() 函数将高斯模糊应用于图像。默认为0，不能是百分比值
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider9 }}px</div>
      </div>
      <input v-model="slider9" type="range" min="0" max="100" step="1">
      <img :src="image" class="slider9">
    </div>
    <div min-h-50 w-85>
      <div h-24 overflow-scroll>
        10. drop-shadow() 函数设置图像阴影效果。使用drop-shadow(offset-x offset-y blur-raduis? color?)
      </div>
      <div flex="~" justify-between>
        <div>Min: 0</div>
        <div>current: {{ slider10 }}</div>
      </div>
      <input v-model="slider10" type="range" min="0" max="100" step="1">
      <img :src="image" class="slider10">
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
  .slider4 {
    filter: hue-rotate(v-bind(slider4Val));
  }
  .slider5 {
    filter: invert(v-bind(slider5Val));
  }
  .slider6 {
    filter: opacity(v-bind(slider6Val));
  }
  .slider7 {
    filter: brightness(v-bind(slider7Val));
  }
  .slider8 {
    filter: contrast(v-bind(slider8Val));
  }
  .slider9 {
    filter: blur(v-bind(slider9Val));
  }
  .slider10 {
    filter: drop-shadow(8px 10px v-bind(slider10Val) #585);
  }
</style>
