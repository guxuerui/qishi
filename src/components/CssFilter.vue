<script setup lang="ts">
import PinchScrollZoom, { type PinchScrollZoomEmitData, type PinchScrollZoomExposed } from '@coddicat/vue-pinch-scroll-zoom'
import { FilterCards } from '~/constants/FilterCards'
import type { SearchIndex } from '~/types'
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

const slidesData = reactive<SearchIndex>({
  slide1: 0,
  slide2: 0,
  slide3: 1,
  slide4: 100,
  slide5: 0,
  slide6: 100,
  slide7: 100,
  slide8: 100,
  slide9: 5,
  slide10: 8,
})

// const slide1 = $ref(0)
const slide1Val = computed(() => `${slidesData.slide1}%`)

const slide2Val = computed(() => `${slidesData.slide2}%`)

const slide3Val = computed(() => `${slidesData.slide3}%`)

const slide4Val = computed(() => `${slidesData.slide4}deg`)

const slide5Val = computed(() => `${slidesData.slide5}%`)

const slide6Val = computed(() => `${slidesData.slide6}%`)

const slide7Val = computed(() => `${slidesData.slide7}%`)

const slide8Val = computed(() => `${slidesData.slide8}%`)

const slide9Val = computed(() => `${slidesData.slide9}px`)

const slide10Val = computed(() => `${slidesData.slide10}px`)
</script>

<template>
  <div grid="~ gap-6 md:cols-2 sm:cols-1">
    <div v-for="item, i in FilterCards" :key="i" min-h-50>
      <div min-h-20>
        {{ i + 1 }}. {{ item.title }}
      </div>
      <div flex="~" justify-between>
        <div>Min: {{ item.min }}</div>
        <div>current: {{ slidesData[`slide${i + 1}`] }}</div>
        <div v-if="item.max">
          Max: {{ item.max }}
        </div>
      </div>
      <input v-model="slidesData[`slide${i + 1}`]" type="range" min="0" max="100" step="1">
      <!-- <img :src="image" :class="item.className"> -->
      <PinchScrollZoom
        ref="zoomer"
        within
        centred
        key-actions
        :width="360"
        :height="240"
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
    filter: grayscale(v-bind(slide1Val));
  }
  .slide2 {
    filter: sepia(v-bind(slide2Val));
  }
  .slide3 {
    filter: saturate(v-bind(slide3Val));
  }
  .slide4 {
    filter: hue-rotate(v-bind(slide4Val));
  }
  .slide5 {
    filter: invert(v-bind(slide5Val));
  }
  .slide6 {
    filter: opacity(v-bind(slide6Val));
  }
  .slide7 {
    filter: brightness(v-bind(slide7Val));
  }
  .slide8 {
    filter: contrast(v-bind(slide8Val));
  }
  .slide9 {
    filter: blur(v-bind(slide9Val));
  }
  .slide10 {
    filter: drop-shadow(8px 10px v-bind(slide10Val) #585);
  }
</style>
