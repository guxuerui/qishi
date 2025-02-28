<script setup lang="ts">
import PinchScrollZoom, { type PinchScrollZoomEmitData, type PinchScrollZoomExposed } from '@coddicat/vue-pinch-scroll-zoom'
import { FilterCards } from '~/constants/FilterCards'
import image from '/imgs/street.jpeg'

const zoomer = ref<PinchScrollZoomExposed>()

const state = reactive<{
  scale?: number
  originX?: number
  originY?: number
  translateX?: number
  translateY?: number
  eventName?: string
  eventData?: PinchScrollZoomEmitData
}>({})

function onEvent(name: string, e: PinchScrollZoomEmitData): void {
  state.eventName = name
  state.eventData = e
  state.scale = e.scale
  state.originX = e.originX
  state.originY = e.originY
  state.translateX = e.translateX
  state.translateY = e.translateY
}

const slidesData = reactive<{
  [key: string]: {
    value: number
    unit: string
  }
}>({
  slide1: { value: 0, unit: '%' },
  slide2: { value: 0, unit: '%' },
  slide3: { value: 1, unit: '%' },
  slide4: { value: 100, unit: 'deg' },
  slide5: { value: 0, unit: '%' },
  slide6: { value: 100, unit: '%' },
  slide7: { value: 100, unit: '%' },
  slide8: { value: 100, unit: '%' },
  slide9: { value: 5, unit: 'px' },
  slide10: { value: 8, unit: 'px' },
})

// 计算属性，用于生成CSS值
const slideVals = computed(() => {
  const result: Record<string, string> = {}

  Object.entries(slidesData).forEach(([key, data]) => {
    result[key] = `${data.value}${data.unit}`
  })

  return result
})
</script>

<template>
  <div grid="~ gap-6 md:cols-2 sm:cols-1">
    <div v-for="item, i in FilterCards" :key="i" min-h-50>
      <div min-h-20>
        {{ i + 1 }}. {{ item.title }}
      </div>
      <div flex="~" justify-between>
        <div>Min: {{ item.min }}</div>
        <div>current: {{ slidesData[`slide${i + 1}`].value }}</div>
        <div v-if="item.max">
          Max: {{ item.max }}
        </div>
      </div>
      <input v-model="slidesData[`slide${i + 1}`].value" type="range" min="0" max="100" step="1">
      <!-- <img :src="image" :class="item.className"> -->
      <PinchScrollZoom
        ref="zoomer"
        within
        centred
        key-actions
        :width="480"
        :height="360"
        :origin-x="180"
        :min-scale="1"
        :max-scale="6"
        @scaling="(e: any) => onEvent('scaling', e)"
        @start-drag="(e: any) => onEvent('startDrag', e)"
        @stop-drag="(e: any) => onEvent('stopDrag', e)"
        @dragging="(e: any) => onEvent('dragging', e)"
      >
        <img :src="image" :class="item.className">
      </PinchScrollZoom>
    </div>
  </div>
</template>

<style scoped>
  .slide1 {
    --slide1: v-bind(slideVals.slide1);
    filter: grayscale(var(--slide1));
  }
  .slide2 {
    --slide2: v-bind(slideVals.slide2);
    filter: sepia(var(--slide2));
  }
  .slide3 {
    --slide3: v-bind(slideVals.slide3);
    filter: saturate(var(--slide3));
  }
  .slide4 {
    --slide4: v-bind(slideVals.slide4);
    filter: hue-rotate(var(--slide4));
  }
  .slide5 {
    --slide5: v-bind(slideVals.slide5);
    filter: invert(var(--slide5));
  }
  .slide6 {
    --slide6: v-bind(slideVals.slide6);
    filter: opacity(var(--slide6));
  }
  .slide7 {
    --slide7: v-bind(slideVals.slide7);
    filter: brightness(var(--slide7));
  }
  .slide8 {
    --slide8: v-bind(slideVals.slide8);
    filter: contrast(var(--slide8));
  }
  .slide9 {
    --slide9: v-bind(slideVals.slide9);
    filter: blur(var(--slide9));
  }
  .slide10 {
    --slide10: v-bind(slideVals.slide10);
    filter: drop-shadow(8px 10px var(--slide10) #585);
  }
</style>
