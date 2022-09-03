<script setup lang="ts">
import type { Area, BlockArea, SearchIndex } from '~/types'

const count = $ref<number>(3)
const side = $ref<number>(50)

const transformDirection: SearchIndex = {
  top: `translateY(-${side}px) rotateX(90deg)`,
  bottom: `translateY(${side}px) rotateX(-90deg)`,
  left: `translateX(-${side}px) rotateY(-90deg)`,
  right: `translateX(${side}px) rotateY(90deg)`,
  before: 'translateZ(0px)',
  after: `translateZ(-${side}px)`,
}
const colors: SearchIndex = {
  top: '#FF6D00',
  bottom: '#FCCC08',
  left: '#D63F2E',
  right: '#009D54',
  before: '#fff',
  after: '#3C81F6',
}
function getAreas(x: number, y: number, z: number) {
  const areas = [] as Area[]
  if (x === 0)
    areas.push(getArea('left'))
  if (x === count - 1)
    areas.push(getArea('right'))
  if (y === 0)
    areas.push(getArea('top'))
  if (y === count - 1)
    areas.push(getArea('bottom'))
  if (z === 0)
    areas.push(getArea('before'))
  if (z === count - 1)
    areas.push(getArea('after'))

  return areas
}
function getArea(direct: string) {
  return {
    direct,
    transform: transformDirection[direct],
    color: colors[direct],
  }
}

const blocks = ref<BlockArea[]>([])
blocks.value = Array.from({ length: count }, (_, x) =>
  Array.from({ length: count },
    (_, y) => Array.from({ length: count },
      (_, z) => ({
        x,
        y,
        z,
        areas: getAreas(x, y, z),
      }),
    ),
  ),
).flat(2)
</script>

<template>
  <div class="wrap">
    <div
      class="content"
      :style="{
        width: `${count * side}px`,
        height: `${count * side}px`,
        transformOrigin: `${(count * side) / 2}px ${(count * side) / 2}px -${(count * side) / 2}px`,
      }"
    >
      <div
        v-for="block, i in blocks"
        :key="i"
        :x="block.x"
        :y="block.y"
        :z="block.z"
        :style="{
          width: `${side}px`,
          height: `${side}px`,
          transform: `translateX(${side * block.x}px) translateY(${side * block.y}px) translateZ(-${side * block.z}px)`,
        }"
      >
        <p
          v-for="area, index in block.areas"
          :key="index"
          :class="area.direct"
          :style="{
            background: area.color,
            transform: area.transform,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wrap {
    width: 100%;
    height: 50vh;
    perspective: 1300px;
    display: flex;
  }
  .content {
    transform-style: preserve-3d;
    transform: rotateX(-30deg) rotateY(30deg) rotateZ(0deg);
    position: relative;
    margin: auto;
  }
  .content > div {
    transform-style: preserve-3d;
    position: absolute;
    top: 0;
    left: 0;
  }
  .content > div > p {
    border: 2px solid #000;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .content .top {
    transform-origin: bottom;
  }
  .content .bottom {
    transform-origin: top;
  }
  .content .left {
    transform-origin: right;
  }
  .content .right {
    transform-origin: left;
  }
</style>
